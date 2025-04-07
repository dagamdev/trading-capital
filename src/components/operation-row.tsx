'use client'

import { useResultsStore } from "@/store/results"
import { useEffect, useState } from "react"

export default function OperationRow ({matris, totalToRisk, ITMs, index, brokerPayout}: {
  matris: number[][]
  totalToRisk: number
  ITMs: number
  index: number
  brokerPayout: number
}) {
  // const [state, setState] = useState<'W' | 'L'>()
  const results = useResultsStore(state => state.results)
  // const addOperation = useResultsStore(state => state.addOperation)
  const winnings = results.filter(r => r).length
  const losings = results.filter(r => !r).length
  const [investment, setInvestment] = useState(0)

  useEffect(() => {
    if (results.length === index) {
      const valor1 = winnings + 1 >= ITMs ? 1 : matris[losings + winnings + 1]?.[winnings + 1]
      const valor2 = winnings + 1 >= ITMs ? 1 : matris[losings + winnings + 1]?.[winnings]
      console.log({valor1, valor2})
      setInvestment((1 - brokerPayout * valor1 / (valor2 + (brokerPayout - 1) * valor1)) * totalToRisk)
    }
    
  }, [ITMs, results, matris, totalToRisk, winnings, losings, brokerPayout, index])


  return (
    <tr>
      <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>{index + 1}</th>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'
        onFocus={() => {
          console.log('focus')
        }}
      >
        <input type="text" />
      </td>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'>{results.length === index && investment.toFixed(2)}</td>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'></td>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'></td>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'></td>
      <td className='border border-slate-800 dark:border-slate-200 py-1 px-3'></td>
    </tr>
  )
}