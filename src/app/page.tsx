'use client'

import { useEffect, useState } from "react";
import { masaniello } from "./lib";

export default function Home() {
  const [operations, setOperations] = useState<Operation[]>([])

  masaniello()

  useEffect(() => {
    setOperations([{
      id: '1',
      status: 'pending',
      investment: 100,
      profit: 10,
      balance: 110
    }])
  }, [])

  const succssessOperation = (operationId: string) => {
    setOperations(operations.map(op => op.id === operationId ? {...op, status: 'success'} : op))
  }

  const failOperation = (operationId: string) => {
    setOperations(operations.map(op => op.id === operationId ? {...op, status: 'failed'} : op))
  }

  return (
    <main className='p-5 text-black dark:text-white flex gap-5'>
      <ol className='bg-slate-900 p-5'>
        {operations.map(op => <li key={op.id} className='flex gap-4'>
          <div className='flex flex-col gap-2'>
            <button onClick={() => succssessOperation(op.id)}>✅</button>
            <button onClick={() => failOperation(op.id)}>❌</button>
          </div>
          <div className='flex gap-3'>
            <p>{op.status}</p>
            <p>{op.investment}</p>
            <p>{op.profit}</p>
            <p>{op.balance}</p>
          </div>
          {operations.length > 1 && <button>Delete</button>}
        </li>)}
      </ol>

      <section className='bg-slate-900 p-5'>
        <h2 className='text-xl font-bold'>Configuracion</h2>

        <form >
          <div className='flex flex-col gap-2 max-w-sm'>
            <label className='flex justify-between gap-x-2'>
              Total a arriesgar:
              <input className='bg-slate-800 py-1 px-3 rounded' type="text" />
            </label>
            <label className='flex justify-between gap-x-2'>
              Operaciones totales:
              <input className='bg-slate-800 py-1 px-3 rounded' type="text" />
            </label>
            <label className='flex justify-between gap-x-2'>
              ITMs esperados:
              <input className='bg-slate-800 py-1 px-3 rounded' type="text" />
            </label>
            <label className='flex justify-between gap-x-2'>
              Paga del broker:
              <input className='bg-slate-800 py-1 px-3 rounded' type="text" />
            </label>
          </div>
        </form>
      </section>

      <section>
        <h2 className='text-xl font-bold'>Objetivo</h2>


      </section>
    </main>
  );
}
