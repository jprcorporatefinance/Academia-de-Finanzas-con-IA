import { useMemo, useState } from 'react'
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { leverageCurve, pct, num } from '../lib/finance'
import { NumberField, Slider, Stat, Verdict } from '../components/ui'

export default function ApalancamientoSimulator() {
  const [roic, setRoic] = useState(0.16)
  const [kdPre, setKdPre] = useState(0.18)
  const [tax, setTax] = useState(0.35)
  const [capital, setCapital] = useState(5000)
  const [ebit, setEbit] = useState(830)
  const [debtRatio, setDebtRatio] = useState(0.45)

  const kdAfter = kdPre * (1 - tax)
  const curve = useMemo(
    () => leverageCurve(roic, kdAfter, capital, ebit, kdPre),
    [roic, kdAfter, capital, ebit, kdPre],
  )
  const data = curve.map((p) => ({
    dr: Math.round(p.debtRatio * 100),
    roe: +(p.roe * 100).toFixed(1),
    cobertura: p.interestCoverage === Infinity ? null : +p.interestCoverage.toFixed(1),
  }))

  const equity = capital * (1 - debtRatio)
  const debt = capital * debtRatio
  const de = equity ? debt / equity : 0
  const roe = roic + (roic - kdAfter) * de
  const interest = debt * kdPre
  const coverage = interest ? ebit / interest : Infinity
  const favorable = roic > kdAfter
  const riskyCoverage = coverage < 2

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
        <div className="card p-5">
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold-300">Parámetros</h4>
          <div className="space-y-3.5">
            <Slider label="ROIC (rinde el capital)" value={roic} onChange={setRoic} min={0} max={0.4} format={(v) => pct(v)} />
            <Slider label="Costo de deuda (antes de impuesto)" value={kdPre} onChange={setKdPre} min={0.05} max={0.45} format={(v) => pct(v)} />
            <Slider label="Impuesto" value={tax} onChange={setTax} min={0} max={0.5} format={(v) => pct(v)} />
            <NumberField label="Capital total (D + E)" value={capital} onChange={setCapital} suffix="k" />
            <NumberField label="EBIT" value={ebit} onChange={setEbit} suffix="k" />
            <Slider label="Nivel de deuda D/(D+E)" value={debtRatio} onChange={setDebtRatio} min={0} max={0.85} format={(v) => pct(v)} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Stat label="ROE con este nivel de deuda" value={pct(roe)} tone={roe >= roic ? 'good' : 'bad'} />
            <Stat label="Cobertura de intereses" value={coverage === Infinity ? '∞' : `${num(coverage, 1)}x`} tone={riskyCoverage ? 'bad' : 'good'} hint="EBIT / Intereses" />
            <Stat label="Spread ROIC − Kd(1−t)" value={pct(roic - kdAfter)} tone={favorable ? 'good' : 'bad'} />
          </div>
          <Verdict
            good={favorable}
            goodText={`✓ La deuda MULTIPLICA ganancias: el capital rinde ${pct(roic)} y la deuda cuesta ${pct(kdAfter)} (después de impuesto). Cada peso de deuda extra sube el ROE... mientras dure la condición.`}
            badText={`✗ La deuda APALANCA pérdidas: el capital rinde ${pct(roic)} pero la deuda cuesta ${pct(kdAfter)}. Endeudarte más DESTRUYE el ROE. Es el caso peligroso.`}
          />
          {riskyCoverage && (
            <div className="rounded-xl border border-danger-500/40 bg-danger-500/10 px-4 py-3 text-sm text-danger-400">
              ⚠ Cobertura de intereses {num(coverage, 1)}x: por debajo de 2x el EBIT apenas alcanza para pagar
              intereses. Acá empieza el riesgo financiero serio y la caída puede volverse exponencial.
            </div>
          )}
        </div>
      </div>

      <div className="card p-5">
        <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
          ROE en función del nivel de deuda
        </h4>
        <div className="h-72 w-full">
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#242830" />
              <XAxis dataKey="dr" unit="%" stroke="#8b9099" tick={{ fontSize: 12 }} label={{ value: 'Deuda / Capital', position: 'insideBottom', offset: -5, fill: '#8b9099', fontSize: 12 }} />
              <YAxis unit="%" stroke="#8b9099" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#0a0c0f', border: '1px solid #242830', borderRadius: 12 }}
                labelStyle={{ color: '#2ebe8c' }}
                formatter={(v: number) => [`${v}%`, 'ROE']}
              />
              <ReferenceLine x={Math.round(debtRatio * 100)} stroke="#1e8f6b" strokeDasharray="4 4" />
              <Line type="monotone" dataKey="roe" stroke="#2ebe8c" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          La línea dorada marca tu nivel de deuda actual. Si el ROIC supera al costo de la deuda, la curva sube
          (la deuda multiplica). Si no, baja (la deuda destruye). Modigliani-Miller mostró que el valor no
          depende solo de la estructura: depende de que el capital rinda más de lo que cuesta.
        </p>
      </div>
    </div>
  )
}
