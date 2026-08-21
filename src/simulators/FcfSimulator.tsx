import { useState } from 'react'
import { computeFcf, money, num } from '../lib/finance'
import { NumberField, Slider, Stat } from '../components/ui'
import { pct } from '../lib/finance'

export default function FcfSimulator() {
  const [ebit, setEbit] = useState(830)
  const [tax, setTax] = useState(0.35)
  const [dep, setDep] = useState(290)
  const [capex, setCapex] = useState(440)
  const [dwc, setDwc] = useState(720) // ΔCxC + Δinventario - Δprov ≈ 330+550-160
  const [interest, setInterest] = useState(560)
  const [netDebt, setNetDebt] = useState(80)

  const r = computeFcf({
    ebit,
    taxRate: tax,
    depreciation: dep,
    capex,
    deltaWorkingCapital: dwc,
    interest,
    netDebtIssued: netDebt,
  })

  const steps = [
    { label: 'NOPAT (EBIT × (1−t))', value: r.nopat, sign: 1 },
    { label: '(+) Amortizaciones', value: dep, sign: 1 },
    { label: '(−) CAPEX', value: -capex, sign: -1 },
    { label: '(−) Δ Capital de trabajo', value: -dwc, sign: -1 },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Datos del período</h4>
        <div className="space-y-4">
          <NumberField label="EBIT" value={ebit} onChange={setEbit} suffix="k" />
          <Slider label="Impuesto" value={tax} onChange={setTax} min={0} max={0.5} format={(v) => pct(v)} />
          <NumberField label="Amortizaciones" value={dep} onChange={setDep} suffix="k" />
          <NumberField label="CAPEX (inversión en activo fijo)" value={capex} onChange={setCapex} suffix="k" />
          <NumberField
            label="Δ Capital de trabajo"
            value={dwc}
            onChange={setDwc}
            suffix="k"
            hint="Aumento de CxC + inventario − proveedores"
          />
          <NumberField label="Intereses" value={interest} onChange={setInterest} suffix="k" />
          <NumberField label="Nueva deuda neta (toma − amortización)" value={netDebt} onChange={setNetDebt} suffix="k" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            Construcción del FCFF
          </h4>
          {steps.map((s) => (
            <div key={s.label} className="flex justify-between border-b border-ink-700/50 py-2 text-sm">
              <span className="text-slate-300">{s.label}</span>
              <span className={`tabular-nums ${s.value < 0 ? 'text-danger-400' : 'text-slate-100'}`}>
                {num(s.value)}
              </span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-gold-400/30 pt-2 text-base font-bold">
            <span className="text-slate-100">Free Cash Flow to the Firm</span>
            <span className="tabular-nums text-gold-300">{num(r.fcff)}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="FCFF (firma)" value={money(r.fcff * 1000)} tone="gold" hint="Caja para TODOS los que financian" />
          <Stat label="FCFE (accionistas)" value={money(r.fcfe * 1000)} tone={r.fcfe >= 0 ? 'good' : 'bad'} hint="Caja libre del dueño" />
          <Stat label="FCFD (acreedores)" value={money(r.fcfd * 1000)} hint="Intereses − nueva deuda" />
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">Por qué el FCFF es la medida clave:</strong> es la caja que genera
          el negocio <em>antes</em> de decidir cómo se reparte entre accionistas y acreedores. No depende de la
          estructura de financiamiento: mide la salud del negocio en sí. Si tu resultado neto es 175 pero el
          FCFF es {num(r.fcff)}, la diferencia la explica el CAPEX y, sobre todo, el capital de trabajo que se
          comió la caja.
        </div>
      </div>
    </div>
  )
}
