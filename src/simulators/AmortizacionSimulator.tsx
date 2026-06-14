import { useMemo, useState } from 'react'
import { amortization, amortTotals, num, money, type AmortSystem } from '../lib/finance'
import { NumberField, Slider, Stat } from '../components/ui'

const systems: { id: AmortSystem; label: string; desc: string }[] = [
  { id: 'frances', label: 'Francés', desc: 'Cuota constante. La más común en bancos.' },
  { id: 'aleman', label: 'Alemán', desc: 'Amortización de capital constante; cuota decreciente.' },
  { id: 'americano', label: 'Americano', desc: 'Solo intereses; todo el capital al final (bullet).' },
]

export default function AmortizacionSimulator() {
  const [principal, setPrincipal] = useState(1000)
  const [annualRate, setAnnualRate] = useState(0.36)
  const [periods, setPeriods] = useState(12)
  const [system, setSystem] = useState<AmortSystem>('frances')

  const ratePerPeriod = annualRate / 12
  const rows = useMemo(
    () => amortization(principal, ratePerPeriod, periods, system),
    [principal, ratePerPeriod, periods, system],
  )
  const totals = amortTotals(rows)

  // comparativa entre sistemas
  const compare = systems.map((s) => ({
    ...s,
    totalInterest: amortTotals(amortization(principal, ratePerPeriod, periods, s.id)).totalInterest,
  }))

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="card p-5">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Préstamo</h4>
          <div className="space-y-4">
            <NumberField label="Capital" value={principal} onChange={setPrincipal} suffix="k" />
            <Slider label="Tasa nominal anual (TNA)" value={annualRate} onChange={setAnnualRate} min={0} max={1.2} step={0.01} format={(v) => `${(v * 100).toFixed(0)}%`} />
            <NumberField label="Cantidad de cuotas (meses)" value={periods} onChange={(v) => setPeriods(Math.max(1, Math.round(v)))} />
            <div>
              <span className="label">Sistema de amortización</span>
              <div className="grid gap-2">
                {systems.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSystem(s.id)}
                    className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                      system === s.id ? 'border-gold-400/60 bg-gold-400/10' : 'border-ink-600 bg-ink-900/60 hover:border-gold-400/30'
                    }`}
                  >
                    <span className="font-semibold text-slate-100">{s.label}</span>
                    <p className="text-xs text-slate-400">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="Total pagado" value={money(totals.totalPaid * 1000)} tone="gold" />
            <Stat label="Total intereses" value={money(totals.totalInterest * 1000)} tone="bad" />
            <Stat label="Primera cuota" value={money(rows[0].payment * 1000)} />
          </div>

          <div className="card p-5">
            <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
              Intereses totales por sistema
            </h4>
            {compare.map((c) => {
              const maxI = Math.max(...compare.map((x) => x.totalInterest), 1)
              return (
                <div key={c.id} className="mb-2">
                  <div className="mb-1 flex justify-between text-sm">
                    <span className={system === c.id ? 'font-semibold text-gold-200' : 'text-slate-300'}>{c.label}</span>
                    <span className="tabular-nums text-slate-100">{num(c.totalInterest)}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-ink-800">
                    <div className={`h-full rounded-full ${system === c.id ? 'bg-gold-400' : 'bg-slate-600'}`} style={{ width: `${(c.totalInterest / maxI) * 100}%` }} />
                  </div>
                </div>
              )
            })}
            <p className="mt-2 text-xs text-slate-500">
              El sistema americano paga más intereses totales (el capital queda vivo todo el tiempo), pero
              libera caja en el corto plazo. El alemán paga menos intereses pero exige cuotas iniciales más
              pesadas. No hay sistema "mejor": depende de tu caja y de cuándo necesitás aliviarla.
            </p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="max-h-72 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-ink-800 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-2 text-left">Cuota</th>
                <th className="px-4 py-2 text-right">Pago</th>
                <th className="px-4 py-2 text-right">Interés</th>
                <th className="px-4 py-2 text-right">Capital</th>
                <th className="px-4 py-2 text-right">Saldo</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.period} className="border-b border-ink-700/40">
                  <td className="px-4 py-1.5 text-slate-300">{r.period}</td>
                  <td className="px-4 py-1.5 text-right tabular-nums text-slate-100">{num(r.payment, 1)}</td>
                  <td className="px-4 py-1.5 text-right tabular-nums text-danger-400">{num(r.interest, 1)}</td>
                  <td className="px-4 py-1.5 text-right tabular-nums text-value-400">{num(r.principal, 1)}</td>
                  <td className="px-4 py-1.5 text-right tabular-nums text-slate-400">{num(r.balance, 1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
