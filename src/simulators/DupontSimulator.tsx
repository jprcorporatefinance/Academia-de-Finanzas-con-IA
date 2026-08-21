import { useState } from 'react'
import { dupont, pct, num } from '../lib/finance'
import { NumberField, Stat } from '../components/ui'

export default function DupontSimulator() {
  const [netIncome, setNetIncome] = useState(175)
  const [sales, setSales] = useState(8200)
  const [assets, setAssets] = useState(7470)
  const [equity, setEquity] = useState(2770)

  const d = dupont(netIncome, sales, assets, equity)

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Datos</h4>
        <div className="space-y-4">
          <NumberField label="Resultado neto" value={netIncome} onChange={setNetIncome} suffix="k" />
          <NumberField label="Ventas netas" value={sales} onChange={setSales} suffix="k" />
          <NumberField label="Activo total" value={assets} onChange={setAssets} suffix="k" />
          <NumberField label="Patrimonio neto" value={equity} onChange={setEquity} suffix="k" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <p className="mb-4 text-sm text-slate-400">
            El ROE no es una sola cosa: es el producto de tres palancas. Muchos CEOs miran sólo el{' '}
            <strong className="text-gold-200">margen</strong> y se olvidan de la{' '}
            <strong className="text-gold-200">rotación</strong> y del{' '}
            <strong className="text-gold-200">multiplicador financiero</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-center">
            <Factor label="Margen neto" value={pct(d.netMargin, 1)} sub="Rentabilidad" />
            <Op>×</Op>
            <Factor label="Rotación del activo" value={`${num(d.assetTurnover, 2)}x`} sub="Eficiencia" />
            <Op>×</Op>
            <Factor label="Multiplicador financiero" value={`${num(d.equityMultiplier, 2)}x`} sub="Apalancamiento" />
            <Op>=</Op>
            <Factor label="ROE" value={pct(d.roe, 1)} sub="Retorno al dueño" highlight />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stat label="Margen neto" value={pct(d.netMargin, 1)} hint="Resultado / Ventas" />
          <Stat label="Rotación activo" value={`${num(d.assetTurnover, 2)}x`} hint="Ventas / Activo" />
          <Stat label="Apalancamiento" value={`${num(d.equityMultiplier, 2)}x`} hint="Activo / PN" />
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">Lectura de gestión:</strong> probá subir el margen vs. mejorar la
          rotación. A veces vender más caro destruye rotación; a veces una empresa de margen bajo es excelente
          porque rota muchísimo (modelo supermercado). Y el multiplicador financiero infla el ROE... pero
          también el riesgo. El ROE no distingue valor de riesgo: por eso usamos ROIC vs WACC.
        </div>
      </div>
    </div>
  )
}

function Factor({
  label,
  value,
  sub,
  highlight,
}: {
  label: string
  value: string
  sub: string
  highlight?: boolean
}) {
  return (
    <div
      className={`min-w-[110px] rounded-xl border p-3 ${
        highlight ? 'border-gold-400/50 bg-gold-400/10' : 'border-ink-600 bg-ink-900/60'
      }`}
    >
      <div className={`text-lg font-bold tabular-nums ${highlight ? 'text-gold-300' : 'text-slate-100'}`}>
        {value}
      </div>
      <div className="text-[11px] font-semibold text-slate-300">{label}</div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500">{sub}</div>
    </div>
  )
}
const Op = ({ children }: { children: string }) => (
  <span className="text-xl font-bold text-slate-500">{children}</span>
)
