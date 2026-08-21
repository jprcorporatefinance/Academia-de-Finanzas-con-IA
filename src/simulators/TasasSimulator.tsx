import { useState } from 'react'
import { tnaToTea, realRate, costoFinancieroTotal, pct } from '../lib/finance'
import { NumberField, Slider, Stat } from '../components/ui'

export default function TasasSimulator() {
  const [tna, setTna] = useState(0.6)
  const [m, setM] = useState(12)
  const [inflation, setInflation] = useState(0.45)
  const [fees, setFees] = useState(0.03)
  const [taxesOnInterest, setTaxesOnInterest] = useState(0.21)

  const tea = tnaToTea(tna, m)
  const real = realRate(tea, inflation)
  const cft = costoFinancieroTotal(tea, fees, taxesOnInterest)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Parámetros</h4>
        <div className="space-y-4">
          <Slider label="Tasa Nominal Anual (TNA)" value={tna} onChange={setTna} min={0} max={1.5} step={0.01} format={(v) => `${(v * 100).toFixed(0)}%`} />
          <NumberField label="Capitalizaciones por año (m)" value={m} onChange={(v) => setM(Math.max(1, Math.round(v)))} hint="12 = mensual, 4 = trimestral, 1 = anual" />
          <Slider label="Inflación anual esperada" value={inflation} onChange={setInflation} min={0} max={1.5} step={0.01} format={(v) => `${(v * 100).toFixed(0)}%`} />
          <Slider label="Comisiones / gastos (% sobre capital)" value={fees} onChange={setFees} min={0} max={0.15} step={0.005} format={(v) => pct(v)} />
          <Slider label="Impuestos sobre intereses (IVA, etc.)" value={taxesOnInterest} onChange={setTaxesOnInterest} min={0} max={0.4} step={0.01} format={(v) => pct(v)} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="TNA (nominal)" value={pct(tna)} hint="Lo que dice el cartel" />
          <Stat label="TEA (efectiva anual)" value={pct(tea)} tone="gold" hint={`Capitaliza ${m} veces al año`} />
          <Stat label="Tasa real (Fisher)" value={pct(real)} tone={real >= 0 ? 'good' : 'bad'} hint="Descontada la inflación" />
          <Stat label="Costo Financiero Total (CFT)" value={pct(cft)} tone="bad" hint="Con comisiones e impuestos" />
        </div>

        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            De la tasa "del cartel" a la tasa que realmente pagás
          </h4>
          <div className="space-y-2">
            <ScaleBar label="TNA" value={tna} max={cft} tone="bg-slate-500" />
            <ScaleBar label="TEA (efecto capitalización)" value={tea} max={cft} tone="bg-blue-500" />
            <ScaleBar label="CFT (efecto comisiones + impuestos)" value={cft} max={cft} tone="bg-danger-500" />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            La capitalización ya sube la tasa por encima de la nominal. Pero el costo que de verdad afrontás
            incluye comisiones, sellos e impuestos. Aunque algunos impuestos se recuperen más adelante, hoy te
            sacan caja: y por el valor tiempo del dinero, recuperar $100 dentro de un año no equivale a tener
            $100 hoy.
          </p>
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">Tasa real:</strong> si la inflación supera a tu tasa efectiva, la
          tasa real es negativa: te conviene tomar deuda (te endeudás en moneda que se deprecia). Si es
          positiva, la deuda te cuesta de verdad. Nunca decidas mirando solo la TNA del cartel.
        </div>
      </div>
    </div>
  )
}

function ScaleBar({ label, value, max, tone }: { label: string; value: number; max: number; tone: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-slate-300">{label}</span>
        <span className="tabular-nums text-slate-100">{pct(value)}</span>
      </div>
      <div className="h-3 rounded-full bg-ink-800">
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${Math.min(100, (value / (max || 1)) * 100)}%` }} />
      </div>
    </div>
  )
}
