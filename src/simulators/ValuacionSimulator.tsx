import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { dcf, money, pct, num } from '../lib/finance'
import { NumberField, Slider, Stat } from '../components/ui'

export default function ValuacionSimulator() {
  const [baseFlow, setBaseFlow] = useState(305)
  const [growth, setGrowth] = useState(0.06)
  const [wacc, setWacc] = useState(0.21)
  const [terminalG, setTerminalG] = useState(0.03)
  const [netDebt, setNetDebt] = useState(3090)
  const [years, setYears] = useState(5)

  const flows = useMemo(
    () => Array.from({ length: years }, (_, i) => baseFlow * Math.pow(1 + growth, i + 1)),
    [baseFlow, growth, years],
  )
  const r = dcf({ flows, wacc, terminalGrowth: terminalG, netDebt })

  const chartData = r.perFlowPV.map((pv, i) => ({
    name: `Año ${i + 1}`,
    valor: +pv.toFixed(0),
    terminal: false,
  }))
  chartData.push({ name: 'V. Terminal', valor: +r.pvTerminal.toFixed(0), terminal: true })

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
      <div className="card p-5">
        <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Supuestos de valuación</h4>
        <div className="space-y-3.5">
          <NumberField label="FCFF base (último año real)" value={baseFlow} onChange={setBaseFlow} suffix="k" />
          <Slider label="Crecimiento del FCFF" value={growth} onChange={setGrowth} min={-0.05} max={0.25} format={(v) => pct(v)} />
          <NumberField label="Años de proyección explícita" value={years} onChange={(v) => setYears(Math.min(10, Math.max(1, Math.round(v))))} />
          <Slider label="WACC (tasa de descuento)" value={wacc} onChange={setWacc} min={0.08} max={0.4} format={(v) => pct(v)} />
          <Slider label="Crecimiento perpetuo (g)" value={terminalG} onChange={setTerminalG} min={0} max={Math.max(0.01, wacc - 0.01)} format={(v) => pct(v)} />
          <NumberField label="Deuda neta (para Equity Value)" value={netDebt} onChange={setNetDebt} suffix="k" hint="Deuda financiera − caja" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stat label="VP flujos explícitos" value={money(r.pvExplicit * 1000)} hint={`${years} años descontados al WACC`} />
          <Stat label="VP valor terminal" value={money(r.pvTerminal * 1000)} hint="Perpetuidad de Gordon" />
          <Stat label="Enterprise Value" value={money(r.enterpriseValue * 1000)} tone="gold" hint="Valor de la firma" />
          <Stat label="Equity Value" value={money(r.equityValue * 1000)} tone={r.equityValue >= 0 ? 'good' : 'bad'} hint="EV − deuda neta" />
        </div>

        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            De dónde viene el valor
          </h4>
          <div className="h-56 w-full">
            <ResponsiveContainer>
              <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a2740" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{ background: '#0b1120', border: '1px solid #243453', borderRadius: 12 }}
                  formatter={(v: number) => [num(v), 'Valor presente']}
                />
                <Bar dataKey="valor" radius={[6, 6, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.terminal ? '#d4af37' : '#34d399'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Casi siempre el valor terminal (dorado) pesa más que los flujos explícitos: por eso una valuación
            es tan sensible al WACC y al g. Subí el WACC unos puntos y mirá cómo se derrumba el valor: ese es el
            costo de operar en un mercado de alto riesgo país.
          </p>
        </div>

        <div className="rounded-xl border border-gold-400/30 bg-ink-800/50 p-4 text-sm text-slate-300">
          <strong className="text-gold-200">El cierre del programa:</strong> el valor de tu empresa es el valor
          presente de la caja libre futura, descontada al verdadero costo del capital. Para subirlo tenés cinco
          palancas: más FCFF (mejor margen y rotación), menos capital de trabajo atrapado, CAPEX inteligente,
          un WACC más bajo (menos riesgo, mejor estructura) y crecimiento rentable (ROIC &gt; WACC). Todo lo que
          vimos en 12 semanas converge acá.
        </div>
      </div>
    </div>
  )
}
