import { useMemo } from 'react'
import { useStore } from '../store/store'
import { maestriaAsignaturas } from '../data/maestria/appData'
import { Award, Upload, CheckCircle2, TrendingUp } from 'lucide-react'

const APROBADO = 0.6 // 60%

// ---------------------------------------------------------------------------
// Resumen de progreso del ALUMNO en la Maestría.
// ---------------------------------------------------------------------------
export function StudentProgress() {
  const { currentUser, quizAttempts, caseSubmissions } = useStore()
  const stats = useMemo(() => {
    const mine = quizAttempts.filter((a) => a.userId === currentUser?.id)
    const bestByCod = new Map<string, { score: number; total: number }>()
    for (const a of mine) {
      const cur = bestByCod.get(a.cod)
      if (!cur || a.score > cur.score) bestByCod.set(a.cod, { score: a.score, total: a.total })
    }
    const hechos = bestByCod.size
    const aprobados = [...bestByCod.values()].filter((b) => b.score / b.total >= APROBADO).length
    const prom =
      bestByCod.size > 0
        ? [...bestByCod.values()].reduce((s, b) => s + b.score / b.total, 0) / bestByCod.size
        : 0
    const entregas = new Set(
      caseSubmissions.filter((c) => c.userId === currentUser?.id).map((c) => c.cod),
    ).size
    return { hechos, aprobados, prom, entregas }
  }, [quizAttempts, caseSubmissions, currentUser?.id])

  const cards = [
    { icon: CheckCircle2, label: 'Cuestionarios hechos', value: `${stats.hechos}/16` },
    { icon: Award, label: 'Aprobados (≥60%)', value: `${stats.aprobados}/16` },
    { icon: TrendingUp, label: 'Promedio', value: `${Math.round(stats.prom * 100)}%` },
    { icon: Upload, label: 'Casos entregados', value: `${stats.entregas}/16` },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {cards.map((c) => (
        <div key={c.label} className="card p-4">
          <c.icon size={18} className="mb-2 text-gold-300" />
          <div className="text-2xl font-bold tabular-nums text-slate-100">{c.value}</div>
          <div className="mt-0.5 text-xs text-slate-400">{c.label}</div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Matriz del ADMIN: alumnos × los 27 módulos del programa (mejor puntaje) + entregas.
// ---------------------------------------------------------------------------
export function AdminOverview() {
  const { students, quizAttempts, caseSubmissions } = useStore()

  const data = useMemo(() => {
    return students.map((s) => {
      const best: Record<string, number | undefined> = {}
      for (const a of maestriaAsignaturas) {
        const att = quizAttempts.filter((q) => q.userId === s.id && q.cod === a.cod)
        best[a.cod] = att.length ? Math.max(...att.map((x) => x.score)) : undefined
      }
      const entregas = new Set(
        caseSubmissions.filter((c) => c.userId === s.id).map((c) => c.cod),
      ).size
      const scores = Object.values(best).filter((v): v is number => v !== undefined)
      const prom = scores.length ? scores.reduce((x, y) => x + y, 0) / scores.length / 15 : 0
      return { s, best, entregas, prom, hechos: scores.length }
    })
  }, [students, quizAttempts, caseSubmissions])

  const cellCls = (v: number | undefined) => {
    if (v === undefined) return 'text-slate-700'
    if (v / 15 >= 0.6) return 'text-value-400'
    return 'text-danger-400'
  }

  return (
    <div className="card overflow-hidden">
      <div className="border-b border-ink-700 px-5 py-3 text-sm font-semibold text-slate-100">
        Seguimiento general (administrador) — mejor puntaje por asignatura /15
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-700 text-xs uppercase tracking-wider text-slate-500">
              <th className="sticky left-0 z-10 bg-ink-900 px-4 py-2 text-left font-semibold">Alumno</th>
              {maestriaAsignaturas.map((a) => (
                <th key={a.cod} className="px-2 py-2 text-center font-mono font-semibold" title={a.nombre}>
                  {a.cod}
                </th>
              ))}
              <th className="px-3 py-2 text-center font-semibold">Prom.</th>
              <th className="px-3 py-2 text-center font-semibold">Casos</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ s, best, entregas, prom }) => (
              <tr key={s.id} className="border-b border-ink-800 last:border-0">
                <td className="sticky left-0 z-10 whitespace-nowrap bg-ink-900 px-4 py-2 text-slate-200">
                  {s.name}
                </td>
                {maestriaAsignaturas.map((a) => (
                  <td key={a.cod} className={`px-2 py-2 text-center tabular-nums ${cellCls(best[a.cod])}`}>
                    {best[a.cod] ?? '·'}
                  </td>
                ))}
                <td className="px-3 py-2 text-center font-semibold tabular-nums text-slate-200">
                  {Math.round(prom * 100)}%
                </td>
                <td className="px-3 py-2 text-center tabular-nums text-slate-400">{entregas}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={19} className="px-5 py-4 text-center text-slate-500">
                  Todavía no hay alumnos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
