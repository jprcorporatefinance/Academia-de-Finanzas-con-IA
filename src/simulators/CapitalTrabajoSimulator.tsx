import { useState } from 'react'
import { workingCapital, num } from '../lib/finance'
import { NumberField, Stat } from '../components/ui'

export default function CapitalTrabajoSimulator() {
  const [receivables, setReceivables] = useState(1850)
  const [inventory, setInventory] = useState(2400)
  const [payables, setPayables] = useState(1280)
  const [sales, setSales] = useState(8200)
  const [cogs, setCogs] = useState(5740)

  const r = workingCapital({ receivables, inventory, payables, sales, cogs })

  const cycle = [
    { label: 'Días de cobranza (DSO)', value: r.dso, color: 'bg-danger-500', good: false },
    { label: 'Días de inventario (DIO)', value: r.dio, color: 'bg-gold-400', good: false },
    { label: 'Días de pago a proveedores (DPO)', value: -r.dpo, color: 'bg-value-500', good: true },
  ]
  const maxDays = Math.max(r.dso, r.dio, r.dpo, r.cashConversionCycle, 1)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Datos</h4>
        <div className="space-y-4">
          <NumberField label="Cuentas por cobrar" value={receivables} onChange={setReceivables} suffix="k" />
          <NumberField label="Inventarios" value={inventory} onChange={setInventory} suffix="k" />
          <NumberField label="Proveedores (financiamiento no oneroso)" value={payables} onChange={setPayables} suffix="k" />
          <NumberField label="Ventas anuales" value={sales} onChange={setSales} suffix="k" />
          <NumberField label="Costo de mercadería vendida" value={cogs} onChange={setCogs} suffix="k" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="Ciclo de conversión de caja" value={`${num(r.cashConversionCycle, 0)} días`} tone={r.cashConversionCycle > 60 ? 'bad' : 'good'} hint="DSO + DIO − DPO" />
          <Stat label="Capital de trabajo neto" value={num(r.netWorkingCapital)} hint="CxC + Inv − Proveedores" />
          <Stat label="Rotación de cuentas por cobrar" value={`${num(r.receivablesTurnover, 1)}x`} />
          <Stat label="Rotación de inventario" value={`${num(r.inventoryTurnover, 1)}x`} />
        </div>

        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            Ciclo de conversión de caja
          </h4>
          <div className="space-y-3">
            {cycle.map((c) => (
              <div key={c.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-slate-300">{c.label}</span>
                  <span className={`tabular-nums ${c.good ? 'text-value-400' : 'text-slate-100'}`}>
                    {num(Math.abs(c.value), 0)} días {c.good && '(financian)'}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-ink-800">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${(Math.abs(c.value) / maxDays) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-gold-400/30 bg-ink-800/50 px-4 py-3">
            <span className="text-sm font-semibold text-slate-200">
              Tu plata queda atrapada {num(r.cashConversionCycle, 0)} días antes de volver a caja
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">Proveedores como aliados estratégicos:</strong> cada día que
          estirás el pago a proveedores (DPO) financia tu operación <em>gratis</em>. Cada día que tardás en
          cobrar (DSO) o que la mercadería no rota (DIO) te obliga a financiarte con descubierto caro. Negociar
          plazos con proveedores que <em>quieren</em> venderte es el financiamiento más barato que existe, y no
          aumenta tu riesgo financiero.
        </div>
      </div>
    </div>
  )
}
