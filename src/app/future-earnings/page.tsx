'use client'

import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"

const commas = ',.'

interface Day {
  id: number
  balance: number
  earnings: number
  capitalGrowthPercentage: number
}

export default function FutureEarningsPage () {
  const [balance, setBalance] = useState('100')
  const [profitPercent, setProfitPercent] = useState('15')
  const [numberOfDays, setNumberOfDays] = useState(5)
  const [days, setDays] = useState<Day[]>([])

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const balance = localStorage.getItem('balance')
      const profitPercent = localStorage.getItem('profitPercent')
      const numberOfDays = localStorage.getItem('numberOfDays')

      if (balance) setBalance(balance)
      if (profitPercent) setProfitPercent(profitPercent)
      if (numberOfDays) setNumberOfDays(+numberOfDays)
    }
  }, [])

  useEffect(() => {
    const days: Day[] = []
    const initialBalance = +balance.replace(',', '.')
    let bal = initialBalance
    const profit = +profitPercent.replace(',', '.') / 100
    
    for (let i=0; i < numberOfDays; i++) {
      const earnings = bal * profit
      days.push({
        id: i+1,
        balance: bal += earnings,
        earnings,
        capitalGrowthPercentage: (bal - initialBalance) / initialBalance * 100
      })
    }
    setDays(days)

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('balance', balance)
      localStorage.setItem('profitPercent', profitPercent)
      localStorage.setItem('numberOfDays', numberOfDays.toString())
    }
  }, [balance, profitPercent, numberOfDays])

  const handleChangeValue = (setValue: Dispatch<SetStateAction<string>>) => ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    if (!value) return setValue(value)
      
    const character = value.at(-1)
    const isComma = commas.includes(character || '')
    
    if (!character || isNaN(+character) && !isComma) return
    value = value.replace(/[^0-9.,]/g, '')

    if (isComma) {
      if (value.split(',').length > 2) return
      value = value.replace('.', ',')
    }

    setValue(value)
  }

  return (
    <main className='flex flex-col items-center gap-5'>
      <h1 className='text-2xl font-bold'>Future earnings</h1>

      <form className='bg-slate-200 dark:bg-slate-800 p-4 rounded flex flex-col gap-2'>
        <label className='flex flex-col'>
          Initial balance:
          <input 
            type="text" 
            value={balance.toLocaleString()}
            onChange={handleChangeValue(setBalance)}
            className='rounded bg-slate-100 dark:bg-slate-900 py-1 px-2 outline-none'
          />
        </label>
        <label className='flex flex-col'>
          Profit percent:
          <input 
            type="text" 
            value={profitPercent.toLocaleString()}
            onChange={handleChangeValue(setProfitPercent)}
            className='rounded bg-slate-100 dark:bg-slate-900 py-1 px-2 outline-none'
          />
        </label>
        <label className='flex flex-col'>
          Number of days:
          <input 
            type="number" 
            value={numberOfDays}
            onChange={e => setNumberOfDays(+e.target.value)}
            className='rounded bg-slate-100 dark:bg-slate-900 py-1 px-2 outline-none'
          />
        </label>
      </form>

      <ol className='flex flex-col gap-4'>
        {days.map(day => <li
          key={day.id}
          className='bg-slate-200 dark:bg-slate-800 p-3 rounded flex flex-row gap-5'
        >
          <p>Day: <strong className='block'>{day.id}</strong></p>
          <p>Balance: <strong className='block'>{day.balance.toLocaleString()}</strong></p>
          <p>Earnings: <strong className='block'>{day.earnings.toLocaleString()}</strong></p>
          <p>Aumento del capital inicial: <strong className='block'>{parseFloat(day.capitalGrowthPercentage.toFixed(2))}%</strong></p>
        </li>)}
      </ol>
    </main>
  )
}