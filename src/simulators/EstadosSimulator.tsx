import { useMemo, useState } from 'react'
import { mockCompany } from '../data/mockCompany'
import type { BalanceSheet, LineItem } from '../types'
import { money, num, pct } from '../lib/finance'
import { Stat } from '../components/ui'
import { Eye, EyeOff } from 'lucide-react'

const sum = (items: LineItem[], real: boolean) =>
  items.reduce((a, i) => a + (real ? (i.real ?? i.book) : i.book), 0)

function Row({ item, real }: { item: LineItem; real: boolean }) {
  const v = real ? item.real ?? item.book : item.book
  const diff = (item.real ?? item.book) - item.book
  const hasGap = item.real !== undefined && item.real !== item.book
  return (
    <div className="flex items-start justify-between gap-3 border-b border-ink-700/50 py-2 text-sm">
      <div className="flex-1">
        <span className="text-slate-200">{item.label}</span>
        {item.note && <p className="mt-0.5 text-xs text-slate-500">{item.note}</p>}
      </div>
      <div className="text-right">
        <span className="font-semibold tabular-nums text-slate-100">{num(v)}</span>
        {real && hasGap && (
          <span className={`ml-2 text-xs tabular-nums ${diff >= 0 ? 'text-value-400' : 'text-danger-400'}`}>
            {diff >= 0 ? '+' : ''}
            {num(diff)}
          </span>
        )}
      </div>
    </div>
  )
}

function BalanceView({ b, real }: { b: BalanceSheet; real: boolean }) {
  const ca = sum(b.assets.current, real)
  const nca = sum(b.assets.nonCurrent, real)
  const cl = sum(b.liabilities.current, real)
  const ncl = sum(b.liabilities.nonCurrent, real)
  const totalAssets = ca + nca
  const totalLiab = cl + ncl
  // Patrimonio neto se ajusta como residual cuando miramos valor real
  const eqBook = sum(b.equity, false)
  const equity = real ? totalAssets - totalLiab : eqBook
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card p-5">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-gold-300">Activo</h4>
        <p className="mb-1 text-xs font-semibold text-slate-400">Activo corriente</p>
        {b.assets.current.map((i) => (
          <Row key={i.label} item={i} real={real} />
        ))}
        <p className="mb-1 mt-3 text-xs font-semibold text-slate-400">Activo no corriente</p>
        {b.assets.nonCurrent.map((i) => (
          <Row key={i.label} item={i} real={real} />
        ))}
        <div className="mt-3 flex justify-between border-t border-gold-400/30 pt-2 text-sm font-bold">
          <span className="text-slate-200">Total Activo</span>
          <span className="tabular-nums text-gold-300">{num(totalAssets)}</span>
        </div>
      </div>
      <div className="card p-5">
        <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-gold-300">Pasivo + Patrimonio Neto</h4>
        <p className="mb-1 text-xs font-semibold text-slate-400">Pasivo corriente</p>
        {b.liabilities.current.map((i) => (
          <Row key={i.label} item={i} real={real} />
        ))}
        <p className="mb-1 mt-3 text-xs font-semibold text-slate-400">Pasivo no corriente</p>
        {b.liabilities.nonCurrent.map((i) => (
          <Row key={i.label} item={i} real={real} />
        ))}
        <div className="mt-3 flex justify-between border-t border-ink-700 pt-2 text-sm font-semibold">
          <span className="text-slate-300">Total Pasivo</span>
          <span className="tabular-nums text-slate-200">{num(totalLiab)}</span>
        </div>
        <p className="mb-1 mt-3 text-xs font-semibold text-slate-400">Patrimonio Neto {real && '(residual a valor real)'}</p>
        {!real && b.equity.map((i) => <Row key={i.label} item={i} real={real} />)}
        <div className="mt-3 flex justify-between border-t border-gold-400/30 pt-2 text-sm font-bold">
          <span className="text-slate-200">Patrimonio Neto</span>
          <span className="tabular-nums text-value-400">{num(equity)}</span>
        </div>
      </div>
    </div>
  )
}

export default function EstadosSimulator() {
  const [tab, setTab] = useState<'balance' | 'resultados' | 'flujo'>('balance')
  const [real, setReal] = useState(false)
  const [period, setPeriod] = useState(0)

  const c = mockCompany
  const balance = c.balance[period]

  const equityBook = useMemo(() => sum(balance.equity, false), [balance])
  const equityReal = useMemo(() => {
    const ta = sum(balance.assets.current, true) + sum(balance.assets.nonCurrent, true)
    const tl = sum(balance.liabilities.current, true) + sum(balance.liabilities.nonCurrent, true)
    return ta - tl
  }, [balance])

  const income = c.income[period] ?? c.income[0]
  const cashflow = c.cashflow[0]

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {(['balance', 'resultados', 'flujo'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                tab === t ? 'bg-gold-400 text-ink-950' : 'bg-ink-800 text-slate-300 hover:text-gold-200'
              }`}
            >
              {t === 'balance' ? 'Balance' : t === 'resultados' ? 'Estado de Resultados' : 'Flujo de Efectivo'}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {tab === 'balance' && c.balance.length > 1 && (
            <select
              className="input w-auto py-1.5"
              value={period}
              onChange={(e) => setPeriod(Number(e.target.value))}
            >
              {c.balance.map((b, i) => (
                <option key={b.period} value={i}>
                  {b.period}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={() => setReal((r) => !r)}
            className={`btn ${real ? 'btn-gold' : 'btn-ghost'}`}
          >
            {real ? <Eye size={16} /> : <EyeOff size={16} />}
            {real ? 'Viendo valor REAL' : 'Ver valor contable'}
          </button>
        </div>
      </div>

      {real && (
        <div className="mb-4 rounded-xl border border-gold-400/30 bg-gold-400/5 px-4 py-3 text-sm text-gold-100">
          <strong>Modo valor real:</strong> mostramos lo que cada partida vale de verdad (mercado/gestión), no
          el número de presentación. Mirá cómo cambia el Patrimonio Neto cuando aparecen los activos ocultos
          (terreno, marca) y los activos sobrevaluados (inventario obsoleto, incobrables).
        </div>
      )}

      {tab === 'balance' && (
        <>
          <div className="mb-4 grid gap-3 sm:grid-cols-3">
            <Stat label="PN contable" value={num(equityBook)} tone="neutral" />
            <Stat label="PN a valor real" value={num(equityReal)} tone={equityReal >= equityBook ? 'good' : 'bad'} />
            <Stat
              label="Brecha contable vs real"
              value={`${equityReal - equityBook >= 0 ? '+' : ''}${num(equityReal - equityBook)}`}
              tone={equityReal - equityBook >= 0 ? 'good' : 'bad'}
              hint={`${pct((equityReal - equityBook) / equityBook)} sobre el PN de libros`}
            />
          </div>
          <BalanceView b={balance} real={real} />
        </>
      )}

      {tab === 'resultados' && (
        <div className="card p-5">
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">
            Estado de Resultados {income.period}
          </h4>
          {income.lines.map((l) => {
            const emphasize = /EBITDA|EBIT|neto|bruto/i.test(l.label)
            return (
              <div
                key={l.label}
                className={`flex items-start justify-between gap-3 border-b border-ink-700/50 py-2 text-sm ${
                  emphasize ? 'font-bold text-slate-100' : ''
                }`}
              >
                <div className="flex-1">
                  <span>{l.label}</span>
                  {l.note && <p className="mt-0.5 text-xs font-normal text-slate-500">{l.note}</p>}
                </div>
                <span className={`tabular-nums ${l.book < 0 ? 'text-danger-400' : 'text-slate-100'}`}>
                  {num(l.book)}
                </span>
              </div>
            )
          })}
          <div className="mt-4 rounded-xl border border-gold-400/30 bg-ink-800/50 p-3 text-xs text-slate-400">
            Fijate: hay <strong className="text-slate-200">resultado neto positivo (175)</strong>, pero los{' '}
            <strong className="text-danger-400">intereses (560)</strong> se comieron casi todo el EBIT. La
            pregunta de las próximas semanas: ¿esta ganancia creó valor?
          </div>
        </div>
      )}

      {tab === 'flujo' && (
        <div className="grid gap-4 lg:grid-cols-3">
          {(['operating', 'investing', 'financing'] as const).map((sec) => (
            <div key={sec} className="card p-5">
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider text-gold-300">
                {sec === 'operating' ? 'Operativo' : sec === 'investing' ? 'Inversión' : 'Financiación'}
              </h4>
              {cashflow[sec].map((l) => (
                <Row key={l.label} item={l} real={false} />
              ))}
              <div className="mt-2 flex justify-between border-t border-gold-400/30 pt-2 text-sm font-bold">
                <span className="text-slate-200">Subtotal</span>
                <span className="tabular-nums text-gold-300">{num(sum(cashflow[sec], false))}</span>
              </div>
            </div>
          ))}
          <div className="lg:col-span-3 rounded-xl border border-gold-400/30 bg-ink-800/50 p-3 text-xs text-slate-400">
            El flujo operativo ({money(305, 'USD')}) es mayor al resultado neto porque sumamos amortizaciones e
            intereses, pero se drena por el aumento de cuentas por cobrar (−330) y de inventarios (−550): la
            ganancia quedó <strong className="text-slate-200">atrapada en el capital de trabajo</strong>.
          </div>
        </div>
      )}
    </div>
  )
}
