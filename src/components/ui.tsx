import type { ReactNode } from 'react'

export function Section({
  title,
  subtitle,
  children,
  right,
}: {
  title: string
  subtitle?: string
  children?: ReactNode
  right?: ReactNode
}) {
  return (
    <section className="mb-8">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100">{title}</h2>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
        {right}
      </div>
      {children}
    </section>
  )
}

export function Stat({
  label,
  value,
  hint,
  tone = 'neutral',
}: {
  label: string
  value: ReactNode
  hint?: string
  tone?: 'neutral' | 'good' | 'bad' | 'gold'
}) {
  const toneCls = {
    neutral: 'text-slate-100',
    good: 'text-value-400',
    bad: 'text-danger-400',
    gold: 'text-gold-300',
  }[tone]
  return (
    <div className="card p-4">
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</div>
      <div className={`mt-1 text-2xl font-bold tabular-nums ${toneCls}`}>{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  )
}

export function NumberField({
  label,
  value,
  onChange,
  step = 1,
  min,
  max,
  suffix,
  hint,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step?: number
  min?: number
  max?: number
  suffix?: string
  hint?: string
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      <div className="relative">
        <input
          type="number"
          className="input pr-12 tabular-nums"
          value={Number.isFinite(value) ? value : 0}
          step={step}
          min={min}
          max={max}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
            {suffix}
          </span>
        )}
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  )
}

export function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step = 0.01,
  format,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  format?: (v: number) => string
}) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="label mb-0">{label}</span>
        <span className="text-sm font-semibold tabular-nums text-gold-300">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        className="w-full accent-gold-400"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </label>
  )
}

export function Verdict({
  good,
  goodText,
  badText,
}: {
  good: boolean
  goodText: string
  badText: string
}) {
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm font-medium ${
        good
          ? 'border-value-500/40 bg-value-500/10 text-value-400'
          : 'border-danger-500/40 bg-danger-500/10 text-danger-400'
      }`}
    >
      {good ? goodText : badText}
    </div>
  )
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'gold' | 'good' | 'bad' }) {
  const cls = {
    neutral: 'border-ink-600 bg-ink-800/60 text-slate-300',
    gold: 'border-gold-400/40 bg-gold-400/10 text-gold-200',
    good: 'border-value-500/40 bg-value-500/10 text-value-400',
    bad: 'border-danger-500/40 bg-danger-500/10 text-danger-400',
  }[tone]
  return <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>{children}</span>
}
