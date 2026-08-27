import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../store/store'
import { maestriaAsignaturas, materialByCod } from '../data/maestria/appData'
import { MaestriaQuiz } from '../components/MaestriaQuiz'
import { CaseUpload } from '../components/CaseUpload'
import { SectionView, BlockView, md } from '../components/TeoriaBlocks'
import type { Block, Section, ExpertQuote, Ejercicio } from '../data/maestria/types'
import { FileText, FileSpreadsheet, HelpCircle, ArrowLeft, Target, ClipboardList, BookOpen } from 'lucide-react'

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

interface TeoriaDoc {
  sections: Section[]
  expertos: ExpertQuote[]
  ejercicio: Ejercicio | null
  bibliografia: string[]
  caso: { titulo: string; empresa: string; contexto: string; datos: Block[]; metodologia: { k: string; d: string }[] }
}

// Teoría completa, leída dentro de la app. Se descarga bajo demanda para no
// cargar todo el corpus en el bundle.
function Teoria({ src }: { src: string }) {
  const [doc, setDoc] = useState<TeoriaDoc | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true
    setDoc(null)
    setError(false)
    fetch(src)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d) => active && setDoc(d))
      .catch(() => active && setError(true))
    return () => {
      active = false
    }
  }, [src])

  if (error)
    return (
      <div className="card p-5 text-sm text-slate-400">
        No se pudo cargar la teoría. Podés descargar el PDF didáctico desde los enlaces de arriba.
      </div>
    )
  if (!doc)
    return (
      <div className="card flex items-center gap-3 p-5 text-sm text-slate-400">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-value-400 border-t-transparent" />
        Cargando el material teórico…
      </div>
    )

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-value-400">
        <BookOpen size={14} /> Material teórico
      </div>

      {doc.sections.map((s, i) => (
        <SectionView key={i} s={s} n={i + 1} />
      ))}

      {doc.expertos?.length > 0 && (
        <section className="mb-8">
          <div className="mb-1 h-[2px] w-7 bg-value-500" />
          <h3 className="mb-3 font-serif text-xl font-bold text-slate-100">Voces de referencia</h3>
          {doc.expertos.map((e, i) => (
            <BlockView key={i} b={{ t: 'quote', author: e.author, credential: e.credential, md: e.md, source: e.source }} />
          ))}
        </section>
      )}

      <section className="mb-8 border-t border-ink-700 pt-6">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-value-400">Caso práctico</div>
        <h3 className="mb-1 mt-1 font-serif text-xl font-bold text-slate-100">{doc.caso.titulo}</h3>
        <p className="mb-4 text-sm font-semibold text-value-400">{doc.caso.empresa}</p>
        {doc.caso.contexto.split(/\n\n+/).map((p, i) => (
          <p key={i} className="mb-3 leading-relaxed text-slate-300">{md(p)}</p>
        ))}
        {doc.caso.datos.map((b, i) => (
          <BlockView key={i} b={b} />
        ))}
        <BlockView b={{ t: 'steps', title: 'Metodología de resolución', items: doc.caso.metodologia }} />
      </section>

      {doc.ejercicio && (
        <section className="mb-8 border-t border-ink-700 pt-6">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-value-400">Ejercicio adicional</div>
          <h3 className="mb-3 mt-1 font-serif text-xl font-bold text-slate-100">{doc.ejercicio.titulo}</h3>
          {doc.ejercicio.enunciado.split(/\n\n+/).map((p, i) => (
            <p key={i} className="mb-3 leading-relaxed text-slate-300">{md(p)}</p>
          ))}
          {doc.ejercicio.datos.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
          <h4 className="mb-2 mt-5 font-semibold text-slate-100">Consigna</h4>
          <BlockView b={{ t: 'ol', items: doc.ejercicio.preguntas }} />
          <h4 className="mb-2 mt-5 font-semibold text-slate-100">Solución</h4>
          {doc.ejercicio.solucion.map((b, i) => (
            <BlockView key={i} b={b} />
          ))}
        </section>
      )}

      {doc.bibliografia?.length > 0 && (
        <section className="border-t border-ink-700 pt-6">
          <h3 className="mb-3 font-serif text-xl font-bold text-slate-100">Bibliografía nuclear</h3>
          <BlockView b={{ t: 'ul', items: doc.bibliografia }} />
        </section>
      )}
    </div>
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

      {/* Teoría completa (se lee acá, no hace falta descargar el PDF) */}
      {mat?.teoria && <Teoria src={mat.teoria} />}

      {/* Cuestionario */}
      <MaestriaQuiz cod={a.cod} quiz={a.quiz} />

      {/* Entrega del caso */}
      <CaseUpload cod={a.cod} />

      {/* Panel admin */}
      {isAdmin && <AdminResultados cod={a.cod} total={Math.min(15, a.quiz.length)} />}
    </div>
  )
}
