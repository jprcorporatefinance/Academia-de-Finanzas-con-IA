import { useMemo, useState } from 'react'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import type { ItemModel, Fmt } from '../items/types'
import { evalModel } from '../items/types'
import { Slider, Stat } from './ui'
import { pct, num, money } from '../lib/finance'

function fmtVal(x: number, f?: Fmt): string {
  if (!Number.isFinite(x)) return '—'
  switch (f) {
    case 'pct': return pct(x, 1)
    case 'pct2': return pct(x, 2)
    case 'money': return money(x * 1000)
    case 'num': return num(x, 0)
    case 'num2': return num(x, 2)
    case 'days': return `${num(x, 0)} días`
    case 'x': return `${num(x, 2)}x`
    default: return num(x, 0)
  }
}

export function ItemModelView({ model }: { model: ItemModel }) {
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(model.inputs.map((i) => [i.key, i.value])),
  )

  const computed = useMemo(() => evalModel(model, vals), [model, vals])

  const chartData = useMemo(() => {
    if (!model.chart) return []
    const { sweepKey, outKey, points = 24 } = model.chart
    const inp = model.inputs.find((i) => i.key === sweepKey)
    if (!inp) return []
    const data: { x: number; y: number }[] = []
    for (let k = 0; k <= points; k++) {
      const x = inp.min + ((inp.max - inp.min) * k) / points
      const r = evalModel(model, { ...vals, [sweepKey]: x })
      data.push({ x, y: r[outKey] })
    }
    return data
  }, [model, vals])

  const chartInput = model.chart ? model.inputs.find((i) => i.key === model.chart!.sweepKey) : undefined
  const chartOut = model.chart ? model.calcs.find((c) => c.key === model.chart!.outKey) : undefined

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
      <div className="card p-5">
        <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-gold-300">Variables (editá y mirá el efecto)</h4>
        <div className="space-y-3.5">
          {model.inputs.map((i) => (
            <Slider
              key={i.key}
              label={`${i.label}${i.unit ? ` (${i.unit})` : ''}`}
              value={vals[i.key]}
              min={i.min}
              max={i.max}
              step={i.step}
              onChange={(x) => setVals((s) => ({ ...s, [i.key]: x }))}
              format={(x) => fmtVal(x, i.fmt)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {model.calcs.map((c) => (
            <Stat
              key={c.key}
              label={c.label}
              value={fmtVal(computed[c.key], c.fmt)}
              tone={c.highlight ? 'gold' : 'neutral'}
              hint={c.note}
            />
          ))}
        </div>

        {model.conclusions.map((cc, idx) => {
          const good = (() => {
            try {
              return cc.test(computed)
            } catch {
              return false
            }
          })()
          return (
            <div
              key={idx}
              className={`rounded-xl border px-4 py-3 text-sm font-medium ${
                good
                  ? 'border-value-500/40 bg-value-500/10 text-value-300'
                  : 'border-danger-500/40 bg-danger-500/10 text-danger-300'
              }`}
            >
              {good ? cc.good : cc.bad}
            </div>
          )
        })}

        {model.chart && chartInput && chartOut && (
          <div className="card p-4">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gold-300">
              Sensibilidad: {chartOut.label} según {chartInput.label}
            </h4>
            <div className="h-48 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a2740" />
                  <XAxis
                    dataKey="x"
                    stroke="#64748b"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(x) => fmtVal(x, chartInput.fmt)}
                  />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} tickFormatter={(y) => fmtVal(y, model.chart!.yFmt ?? chartOut.fmt)} width={48} />
                  <Tooltip
                    contentStyle={{ background: '#0b1120', border: '1px solid #243453', borderRadius: 12 }}
                    labelFormatter={(x) => `${chartInput.label}: ${fmtVal(Number(x), chartInput.fmt)}`}
                    formatter={(y: number) => [fmtVal(y, model.chart!.yFmt ?? chartOut.fmt), chartOut.label]}
                  />
                  <Line type="monotone" dataKey="y" stroke="#d4af37" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
