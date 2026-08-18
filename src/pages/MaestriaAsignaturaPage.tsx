import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/store'
import { maestriaAsignaturas, materialByCod } from '../data/maestria/appData'
import { MaestriaQuiz } from '../components/MaestriaQuiz'
import { CaseUpload } from '../components/CaseUpload'
import { FileText, FileSpreadsheet, HelpCircle, ArrowLeft, Target, ClipboardList } from 'lucide-react'

function DownloadCard({ href, icon: Icon, title, sub }: { href: string; icon: any; title: string; sub: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card flex items-center gap-3 p-4 transition hover:border-gold-400/40"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 text-gold-300">
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-slate-100">{title}</div>
        <div className="truncate text-xs text-slate-500">{sub}</div>
      </div>
    </a>
  )
}

// Panel del administrador: resultados y entregas de los alumnos.
function AdminResultados({ cod, total }: { cod: string; total: number }) {
  const { students, quizAttempts, caseSubmissions } = useStore()
  const rows = students.map((s) => {
    const att = quizAttempts.filter((a) => a.userId === s.id && a.cod === cod)
    const best = att.reduce((m, a) => Math.max(m, a.score), -1)
    const subs = caseSubmissions.filter((c) => c.userId === s.id && c.cod === cod)
    return { s, intentos: att.length, best, subs: subs.length }
  })
  return (
    <div className="card overflow-hidden">
      <div className="border-b border-ink-700 px-5 py-3 text-sm font-semibold text-slate-100">
        Seguimiento de alumnos (administrador)
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-ink-700 text-left text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-2 font-semibold">Alumno</th>
              <th className="px-5 py-2 font-semibold">Intentos</th>
              <th className="px-5 py-2 font-semibold">Mejor puntaje</th>
              <th className="px-5 py-2 font-semibold">Entregas</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, intentos, best, subs }) => (
              <tr key={s.id} className="border-b border-ink-800 last:border-0">
                <td className="px-5 py-2.5 text-slate-200">{s.name}</td>
                <td className="px-5 py-2.5 tabular-nums text-slate-400">{intentos}/3</td>
                <td className="px-5 py-2.5 tabular-nums">
                  {best >= 0 ? (
                    <span className={best / total >= 0.6 ? 'text-value-400' : 'text-slate-300'}>
                      {best}/{total}
                    </span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="px-5 py-2.5 tabular-nums text-slate-400">{subs}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-4 text-center text-slate-500">
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

export default function MaestriaAsignaturaPage() {
  const { slug } = useParams<{ slug: string }>()
  const { currentUser } = useStore()
  const a = useMemo(() => maestriaAsignaturas.find((x) => x.slug === slug), [slug])
  const mat = a ? materialByCod(a.cod) : undefined

  if (!a) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-400">Asignatura no encontrada.</p>
        <Link to="/app/maestria" className="btn mt-4 inline-flex">
          Volver a la Maestría
        </Link>
      </div>
    )
  }

  const isAdmin = currentUser?.role === 'admin'

  return (
    <div className="space-y-6">
      <div>
        <Link to="/app/maestria" className="mb-3 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold-300">
          <ArrowLeft size={15} /> Maestría
        </Link>
        <div className="font-mono text-sm font-semibold text-gold-300">Asignatura {a.cod}</div>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-slate-100">{a.nombre}</h1>
        <p className="mt-2 max-w-3xl text-slate-400">{a.resumen}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-ink-600 bg-ink-800/60 px-3 py-1 text-slate-300">{a.fase}</span>
          <span className="rounded-full border border-ink-600 bg-ink-800/60 px-3 py-1 text-slate-300">{a.horas}</span>
          <span className="rounded-full border border-ink-600 bg-ink-800/60 px-3 py-1 text-slate-300">{a.framework}</span>
        </div>
      </div>

      {/* Descargas */}
      {mat && (
        <div className="grid gap-3 sm:grid-cols-3">
          <DownloadCard href={mat.pdf} icon={FileText} title="PDF didáctico" sub="Teoría, fórmulas y expertos" />
          <DownloadCard href={mat.caso} icon={FileSpreadsheet} title="Excel del caso" sub="Matrices dinámicas" />
          <DownloadCard href={mat.cuestionario} icon={HelpCircle} title="Cuestionario (PDF)" sub="15 preguntas + solucionario" />
        </div>
      )}

      {/* Objetivos y caso */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
            <Target size={16} className="text-gold-300" /> Objetivos de aprendizaje
          </div>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {a.objetivos.map((o, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold-400" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-100">
            <ClipboardList size={16} className="text-gold-300" /> Caso: {a.caso.titulo}
          </div>
          <div className="mb-3 text-xs text-slate-500">{a.caso.empresa}</div>
          <ol className="space-y-1.5 text-sm text-slate-300">
            {a.caso.consigna.map((q, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-mono text-xs text-gold-300">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Cuestionario */}
      <MaestriaQuiz cod={a.cod} quiz={a.quiz} />

      {/* Entrega del caso */}
      <CaseUpload cod={a.cod} />

      {/* Panel admin */}
      {isAdmin && <AdminResultados cod={a.cod} total={Math.min(15, a.quiz.length)} />}
    </div>
  )
}
