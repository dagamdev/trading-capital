import OperationRow from "./operation-row"

export default function OperationsTable ({matris, totalToRisk, ITMs, totalOperations, brokerPayout}: {
  matris: number[][]
  totalToRisk: number
  ITMs: number
  totalOperations: number
  brokerPayout: number
}) {


  return (
    <table>
      <thead>
        <tr>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>N</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>W - L</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>Inversión</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>Retorno</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>Saldo</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>%ITM</th>
          <th className='border border-slate-800 dark:border-slate-200 py-1 px-3'>Fallos pendientes</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({length: totalOperations}, (_, i) => <OperationRow
          key={i}
          matris={matris}
          totalToRisk={totalToRisk}
          ITMs={ITMs}
          index={i}
          brokerPayout={brokerPayout}
        />)}
      </tbody>
    </table>
  )
}