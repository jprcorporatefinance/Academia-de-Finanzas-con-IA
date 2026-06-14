import { useState } from 'react'
import { nopat, roic, eva, valueSpread, money, pct, num } from '../lib/finance'
import { NumberField, Slider, Stat, Verdict } from '../components/ui'

export default function RoicSimulator() {
  const [ebit, setEbit] = useState(830)
  const [tax, setTax] = useState(0.35)
  const [workingCapital, setWorkingCapital] = useState(2090) // CxC+Inv-Prov aprox de Andina
  const [fixedAssets, setFixedAssets] = useState(2560)
  const [wacc, setWacc] = useState(0.21)

  const np = nopat(ebit, tax)
  const invested = workingCapital + fixedAssets
  const r = roic(np, invested)
  const spread = valueSpread(r, wacc)
  const evaVal = eva(r, wacc, invested)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Datos operativos</h4>
        <div className="space-y-4">
          <NumberField label="EBIT (resultado operativo)" value={ebit} onChange={setEbit} suffix="k" />
          <Slider label="Tasa de impuesto" value={tax} onChange={setTax} min={0} max={0.5} format={(v) => pct(v)} />
          <NumberField
            label="Capital de trabajo operativo"
            value={workingCapital}
            onChange={setWorkingCapital}
            suffix="k"
            hint="Cuentas por cobrar + Inventarios − Proveedores"
          />
          <NumberField
            label="Activo fijo neto (capital invertido)"
            value={fixedAssets}
            onChange={setFixedAssets}
            suffix="k"
          />
          <Slider label="WACC (costo del capital)" value={wacc} onChange={setWacc} min={0.05} max={0.4} format={(v) => pct(v)} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="NOPAT" value={money(np * 1000)} hint="EBIT × (1 − t)" tone="gold" />
          <Stat label="Capital invertido" value={num(invested)} hint="Capital de trabajo + activo fijo" />
          <Stat label="ROIC" value={pct(r)} tone="gold" hint="NOPAT / Capital invertido" />
          <Stat label="WACC" value={pct(wacc)} hint="Costo del capital" />
        </div>

        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Spread de valor (ROIC − WACC)</span>
            <span className={`text-xl font-bold tabular-nums ${spread >= 0 ? 'text-value-400' : 'text-danger-400'}`}>
              {pct(spread)}
            </span>
          </div>
          {/* barra comparativa */}
          <div className="space-y-2">
            <Bar label="ROIC" value={r} max={Math.max(r, wacc) * 1.3} tone="gold" />
            <Bar label="WACC" value={wacc} max={Math.max(r, wacc) * 1.3} tone="slate" />
          </div>
          <div className="mt-4">
            <Stat
              label="EVA (valor económico creado)"
              value={money(evaVal * 1000)}
              tone={evaVal >= 0 ? 'good' : 'bad'}
              hint="(ROIC − WACC) × Capital invertido"
            />
          </div>
        </div>

        <Verdict
          good={spread >= 0}
          goodText={`✓ Se está CREANDO valor: cada peso invertido rinde ${pct(r)} y cuesta ${pct(wacc)}. El EVA es positivo.`}
          badText={`✗ Se está DESTRUYENDO valor. El capital rinde ${pct(r)} pero cuesta ${pct(wacc)}. Hay ganancia contable, pero el EVA es negativo (${money(evaVal * 1000)}). Esta es la paradoja de Andina.`}
        />
      </div>
    </div>
  )
}

function Bar({ label, value, max, tone }: { label: string; value: number; max: number; tone: 'gold' | 'slate' }) {
  const w = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="tabular-nums text-slate-200">{pct(value)}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-ink-800">
        <div
          className={`h-full rounded-full ${tone === 'gold' ? 'bg-gradient-to-r from-gold-300 to-gold-500' : 'bg-slate-500'}`}
          style={{ width: `${w}%` }}
        />
      </div>
    </div>
  )
}
