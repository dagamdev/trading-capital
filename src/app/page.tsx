'use client'

import { useEffect, useState, useRef } from "react";
import { getLocalData, handleChangeValue } from "./lib";
import { generateMatris } from "./lib/masaniello";
import OperationsTable from "@/components/operations-table";

export default function Home() {
  const matris = useRef<number[][]>([])
  const profit = useRef<number>(0)
  const [totalToRisk, setTotalToRisk] = useState(() => getLocalData<Settings>('settings', 'object')?.totalToRisk.toString() || '10')
  const [totalOperations, setTotalOperations] = useState(() => getLocalData<Settings>('settings', 'object')?.totalOperations.toString() || '10')
  const [ITMs, setITMs] = useState(() => getLocalData<Settings>('settings', 'object')?.ITMs.toString() || '4')
  const [brokerPayout, setBrokerPayout] = useState(() => getLocalData<Settings>('settings', 'object')?.brokerPayout.toString() || '1.92')
  const [percentageYield, setPercentageYield] = useState(0)
  

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('settings', JSON.stringify({
        totalToRisk: +totalToRisk,
        totalOperations: +totalOperations,
        ITMs: +ITMs,
        brokerPayout: +brokerPayout
      }))
    }

    if (totalOperations && totalToRisk && ITMs && brokerPayout) {
      matris.current = generateMatris(+ITMs, +totalOperations, +brokerPayout)
    }

    const newYield = (matris.current[0]?.[0] || 1.1) - 1
    setPercentageYield(newYield * 100)
    profit.current = +(totalToRisk) * newYield
  }, [totalToRisk, totalOperations, ITMs, brokerPayout])

  return (
    <main className='p-5 text-black dark:text-white'>
      <h1 className='text-center text-3xl font-bold mb-6'>Gestion masaniello</h1>

      <div className='flex gap-5 flex-wrap justify-center'>
        <div className='flex gap-5 flex-wrap justify-center'>
          <section className='bg-slate-900 p-5 rounded-md'>
            <h2 className='text-xl font-bold mb-4 text-center'>Configuracion</h2>

            <form >
              <div className='flex flex-col gap-2 max-w-sm'>
                <label className='flex justify-between gap-x-2'>
                  Total a arriesgar:
                  <input className='bg-slate-800 py-1 px-3 rounded w-[16ch]' type="text" 
                    onChange={handleChangeValue(setTotalToRisk)}
                    value={totalToRisk}
                  />
                </label>
                <label className='flex justify-between gap-x-2'>
                  Operaciones totales:
                  <input className='bg-slate-800 py-1 px-3 rounded w-[16ch]' type="text"
                    onChange={handleChangeValue(setTotalOperations, false)}
                    value={totalOperations}
                  />
                </label>
                <label className='flex justify-between gap-x-2'>
                  ITMs esperados:
                  <input className='bg-slate-800 py-1 px-3 rounded w-[16ch]' type="text"
                    onChange={handleChangeValue(setITMs, false)}
                    value={ITMs}
                  />
                </label>
                <label className='flex justify-between gap-x-2'>
                  Paga del broker:
                  <input className='bg-slate-800 py-1 px-3 rounded w-[16ch]' type="text"
                    onChange={handleChangeValue(setBrokerPayout)}
                    value={brokerPayout}
                  />
                </label>
              </div>
            </form>
          </section>
            
          <section className='bg-slate-900 p-5 rounded-md'>
            <h2 className='text-xl font-bold mb-4 text-center'>Objetivo</h2>

            <ol>
              <li className='flex gap-x-4 justify-between'>
                <span>Rendimiento:</span>
                <b>{percentageYield.toFixed(2)}%</b>
              </li>
              <li className='flex gap-x-4 justify-between'>
                <span>Balance final:</span>
                <b>{((+totalToRisk) + profit.current).toFixed(2)}</b>
              </li>
              <li className='flex gap-x-4 justify-between'>
                <span>Ganancia neta:</span>
                <b>{profit.current.toFixed(2)}</b>
              </li>
            </ol>
          </section>
        </div>

        <OperationsTable matris={matris.current} totalToRisk={+totalToRisk} ITMs={+ITMs} totalOperations={+totalOperations} brokerPayout={+brokerPayout}/>
      </div>
    </main>
  );
}
