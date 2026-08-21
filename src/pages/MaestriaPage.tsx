import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/store'
import { maestriaAsignaturas, CUATRIMESTRES } from '../data/maestria/appData'
import { Section } from '../components/ui'
import { StudentProgress, AdminOverview } from '../components/MaestriaOverview'
import { GraduationCap, Award, ArrowRight } from 'lucide-react'

export default function MaestriaPage() {
  const { currentUser, quizAttempts } = useStore()
  const isAdmin = currentUser?.role === 'admin'

  const bestByCod = useMemo(() => {
    const m = new Map<string, number>()
    for (const a of quizAttempts.filter((x) => x.userId === currentUser?.id)) {
      m.set(a.cod, Math.max(m.get(a.cod) ?? 0, a.score))
    }
    return m
  }, [quizAttempts, currentUser?.id])

  return (
    <div>
      <Section
        title="Maestría en Finanzas Corporativas Aplicadas con IA"
        subtitle="16 asignaturas · caso integrador Maderas del Litoral S.A. · material, cuestionario y entrega por cada una"
      >
        <div className="card border-l-4 border-l-gold-400 p-5">
          <div className="flex items-start gap-3">
            <GraduationCap className="mt-0.5 shrink-0 text-gold-300" size={22} />
            <p className="text-sm text-slate-300">
              Cada asignatura incluye un <strong>PDF didáctico</strong>, un <strong>Excel del caso</strong>{' '}
              con matrices dinámicas, un <strong>cuestionario de 15 preguntas</strong> (hasta 3 intentos,
              se guarda tu mejor puntaje) y la posibilidad de <strong>subir tu solución</strong> del caso.
            </p>
          </div>
          <Link to="/app/mapa-valor" className="btn mt-4 inline-flex">
            Ver el mapa de generadores de valor <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-4">{isAdmin ? <AdminOverview /> : <StudentProgress />}</div>
      </Section>

      {CUATRIMESTRES.map((c) => (
        <Section key={c.n} title={c.titulo} subtitle={c.fase}>
          <div className="grid gap-4 sm:grid-cols-2">
            {maestriaAsignaturas
              .filter((a) => a.cuatrimestre === c.n)
              .map((a) => {
                const best = bestByCod.get(a.cod)
                return (
                  <Link
                    key={a.cod}
                    to={`/app/maestria/${a.slug}`}
                    className="card group p-5 transition hover:border-gold-400/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-semibold text-gold-300">Asignatura {a.cod}</span>
                      {best !== undefined && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-value-500/40 bg-value-500/10 px-2 py-0.5 text-xs font-medium text-value-400">
                          <Award size={12} /> {best}/{Math.min(15, a.quiz.length)}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug text-slate-100">{a.nombre}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-slate-400">{a.resumen}</p>
                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span>{a.horas}</span>
                      <span className="inline-flex items-center gap-1 text-gold-300 opacity-0 transition group-hover:opacity-100">
                        Abrir <ArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                )
              })}
          </div>
        </Section>
      ))}
    </div>
  )
}
