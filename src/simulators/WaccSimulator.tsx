import { useState } from 'react'
import { computeWacc, pct, num } from '../lib/finance'
import { marketAssumptions } from '../data/mockCompany'
import { NumberField, Slider, Stat } from '../components/ui'

export default function WaccSimulator() {
  const m = marketAssumptions
  const [rf, setRf] = useState(m.riskFreeUS)
  const [erp, setErp] = useState(m.equityRiskPremiumUS)
  const [crp, setCrp] = useState(m.countryRiskPremium)
  const [size, setSize] = useState(m.sizePremium)
  const [beta, setBeta] = useState(m.unleveredBeta)
  const [kd, setKd] = useState(m.costOfDebtPreTax)
  const [tax, setTax] = useState(m.taxRate)
  const [dw, setDw] = useState(m.targetDebtWeight)

  const res = computeWacc({
    riskFreeUS: rf,
    equityRiskPremiumUS: erp,
    countryRiskPremium: crp,
    sizePremium: size,
    unleveredBeta: beta,
    costOfDebtPreTax: kd,
    taxRate: tax,
    debtWeight: dw,
  })

  // Componentes del Ke para visualizar el "armado" LatAm
  const keComponents = [
    { label: 'Tasa libre de riesgo (EEUU)', value: rf, color: 'bg-slate-500' },
    { label: 'Prima por riesgo de mercado (β × ERP)', value: res.leveredBeta * erp, color: 'bg-blue-500' },
    { label: 'Riesgo país (LatAm)', value: crp, color: 'bg-gold-400' },
    { label: 'Prima por tamaño (PyME)', value: size, color: 'bg-value-500' },
  ]
  const keTotal = keComponents.reduce((a, c) => a + c.value, 0)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">
          Parámetros (modelo emergente)
        </h4>
        <div className="space-y-3.5">
          <Slider label="Tasa libre de riesgo EEUU (Rf)" value={rf} onChange={setRf} min={0} max={0.1} format={(v) => pct(v)} />
          <Slider label="Equity Risk Premium (ERP)" value={erp} onChange={setErp} min={0.03} max={0.09} format={(v) => pct(v)} />
          <Slider label="Riesgo país" value={crp} onChange={setCrp} min={0} max={0.15} format={(v) => pct(v)} />
          <Slider label="Prima por tamaño" value={size} onChange={setSize} min={0} max={0.08} format={(v) => pct(v)} />
          <Slider label="Beta desapalancada (sector)" value={beta} onChange={setBeta} min={0.4} max={1.6} format={(v) => num(v, 2)} />
          <Slider label="Costo de la deuda (antes de impuesto)" value={kd} onChange={setKd} min={0.05} max={0.4} format={(v) => pct(v)} />
          <Slider label="Tasa de impuesto" value={tax} onChange={setTax} min={0} max={0.5} format={(v) => pct(v)} />
          <Slider label="Peso de la deuda (D/V)" value={dw} onChange={setDw} min={0} max={0.8} format={(v) => pct(v)} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="Beta apalancada" value={num(res.leveredBeta, 2)} hint="Hamada: βU × (1 + (1−t)·D/E)" />
          <Stat label="Costo del Equity (Ke)" value={pct(res.costOfEquity)} tone="gold" />
          <Stat label="Costo de deuda después de impuesto" value={pct(res.afterTaxCostOfDebt)} hint="Kd × (1 − t)" />
          <Stat label="WACC" value={pct(res.wacc)} tone="gold" hint="E/V·Ke + D/V·Kd·(1−t)" />
        </div>

        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            Cómo se arma el costo del Equity en LatAm
          </h4>
          <div className="mb-3 flex h-6 overflow-hidden rounded-full">
            {keComponents.map((c) => (
              <div
                key={c.label}
                className={c.color}
                style={{ width: `${(c.value / keTotal) * 100}%` }}
                title={`${c.label}: ${pct(c.value)}`}
              />
            ))}
          </div>
          {keComponents.map((c) => (
            <div key={c.label} className="flex items-center justify-between py-1 text-sm">
              <span className="flex items-center gap-2 text-slate-300">
                <span className={`h-3 w-3 rounded-sm ${c.color}`} /> {c.label}
              </span>
              <span className="tabular-nums text-slate-100">{pct(c.value)}</span>
            </div>
          ))}
          <div className="mt-2 flex justify-between border-t border-gold-400/30 pt-2 text-sm font-bold">
            <span className="text-slate-100">Ke total</span>
            <span className="tabular-nums text-gold-300">{pct(keTotal)}</span>
          </div>
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">La trampa de copiar indicadores de EEUU:</strong> la tasa libre de
          riesgo y la prima de mercado vienen de una economía desarrollada y líquida. Para tu PyME
          latinoamericana hay que <em>sumar</em> el riesgo país y la prima por tamaño. Por eso el verdadero
          costo del capital ({pct(res.wacc)}) suele ser mucho más alto que el de un manual: ahí está la vara
          real que tu ROIC tiene que superar para crear valor.
        </div>
      </div>
    </div>
  )
}
