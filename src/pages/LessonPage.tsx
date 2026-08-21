import { useMemo, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../store/store'
import { LessonBlockView } from '../components/LessonBlock'
import type { QuizQuestion } from '../types'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Target, FileText, FileSpreadsheet, Sparkles, Download, Boxes, ChevronDown } from 'lucide-react'
import materialsIndex from '../data/materialsIndex.json'
import itemsIndex from '../data/itemsIndex.json'
import { itemsByWeek } from '../items'
import { ItemModelView } from '../components/ItemModelView'

export default function LessonPage() {
  const { lessonId } = useParams()
  const { curriculum, markLessonProgress, getStudentState, currentUser } = useStore()
  const navigate = useNavigate()

  const idx = curriculum.findIndex((l) => l.id === lessonId)
  const lesson = curriculum[idx]
  const next = curriculum[idx + 1]
  const prev = curriculum[idx - 1]
  const state = currentUser ? getStudentState(currentUser.id) : null
  const progress = lesson && state ? state.lessons[lesson.id] : undefined

  if (!lesson) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-300">Lección no encontrada.</p>
        <Link to="/app/programa" className="btn-gold mt-4 inline-flex">Volver al programa</Link>
      </div>
    )
  }

  return (
    <article>
      <Link to="/app/programa" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold-300">
        <ArrowLeft size={15} /> Programa
      </Link>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Semana {lesson.week}</span>
          <span className="chip">{lesson.pillar}</span>
          <span className="flex items-center gap-1 text-xs text-slate-500"><Clock size={12} /> {lesson.durationMin} min</span>
          {progress?.completed && (
            <span className="chip border-value-500/40 text-value-400"><CheckCircle2 size={12} /> Completada</span>
          )}
        </div>
        <h1 className="text-3xl font-extrabold leading-tight text-slate-100">{lesson.title}</h1>
        <p className="mt-2 text-lg text-slate-400">{lesson.subtitle}</p>
      </header>

      {/* Objetivos */}
      <div className="card mb-8 p-5">
        <div className="mb-3 flex items-center gap-2 text-gold-300">
          <Target size={18} /> <h2 className="text-sm font-bold uppercase tracking-wider">Objetivos de la clase</h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {lesson.objectives.map((o, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-slate-300">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /> {o}
            </li>
          ))}
        </ul>
      </div>

      {/* Material descargable de la semana */}
      <MaterialDownloads week={lesson.week} />

      {/* Ítems de la semana: teoría + modelo interactivo + descargas */}
      <WeekItems week={lesson.week} />

      {/* Contenido */}
      <div>
        {lesson.blocks.map((b, i) => (
          <LessonBlockView key={i} block={b} />
        ))}
      </div>

      {/* Quiz */}
      {lesson.quiz.length > 0 && (
        <Quiz
          questions={lesson.quiz}
          onComplete={(score) => markLessonProgress(lesson.id, { completed: true, quizScore: score, minutesSpent: (progress?.minutesSpent ?? 0) + lesson.durationMin })}
        />
      )}

      {/* Navegación */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-ink-700 pt-6">
        {prev ? (
          <Link to={`/app/programa/${prev.id}`} className="btn-ghost">
            <ArrowLeft size={16} /> Semana {prev.week}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <button className="btn-gold" onClick={() => navigate(`/app/programa/${next.id}`)}>
            Semana {next.week} <ArrowRight size={16} />
          </button>
        ) : (
          <Link to="/app" className="btn-gold">Finalizar programa <CheckCircle2 size={16} /></Link>
        )}
      </div>
    </article>
  )
}

type ItemIdxEntry = { id: string; week: number; order: number; title: string; word?: string; excel?: string; prompt?: string }

function WeekItems({ week }: { week: number }) {
  const items = itemsByWeek[week]
  const [open, setOpen] = useState<string | null>(null)
  if (!items || items.length === 0) return null
  const idx = itemsIndex as ItemIdxEntry[]
  return (
    <div className="mb-8">
      <div className="mb-3 flex items-center gap-2 text-gold-300">
        <Boxes size={18} /> <h2 className="text-sm font-bold uppercase tracking-wider">Ítems de la semana</h2>
      </div>
      <p className="mb-4 text-sm text-slate-400">
        Cada ítem profundiza un concepto con su teoría (Word), su modelo en Excel con matrices dinámicas, sus
        prompts para avanzar con IA y un <strong className="text-slate-200">modelo interactivo</strong> para
        visualizar las variables en vivo.
      </p>
      <div className="space-y-3">
        {items.map((it) => {
          const dl = idx.find((e) => e.id === it.id)
          const isOpen = open === it.id
          return (
            <div key={it.id} className="card overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-400/10 text-sm font-bold text-gold-300">
                  {it.order}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-slate-100">{it.title}</h3>
                    <span className="chip border-gold-400/30 text-gold-200">{it.framework}</span>
                  </div>
                  <p className="text-xs text-slate-400">{it.subtitle}</p>
                </div>
                <button
                  className={isOpen ? 'btn-ghost' : 'btn-gold'}
                  onClick={() => setOpen(isOpen ? null : it.id)}
                >
                  <Boxes size={15} /> {isOpen ? 'Ocultar modelo' : 'Modelo interactivo'}
                  <ChevronDown size={14} className={`transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Descargas del ítem */}
              {dl && (dl.word || dl.excel || dl.prompt) && (
                <div className="flex flex-wrap gap-2 border-t border-ink-700/60 px-4 py-3">
                  {dl.word && (
                    <a href={dl.word} download className="btn-ghost px-3 py-1.5 text-xs">
                      <FileText size={13} className="text-blue-300" /> Word (teoría)
                    </a>
                  )}
                  {dl.excel && (
                    <a href={dl.excel} download className="btn-ghost px-3 py-1.5 text-xs">
                      <FileSpreadsheet size={13} className="text-value-400" /> Excel dinámico
                    </a>
                  )}
                  {dl.prompt && (
                    <a href={dl.prompt} download className="btn-ghost px-3 py-1.5 text-xs">
                      <Sparkles size={13} className="text-gold-300" /> Prompts
                    </a>
                  )}
                </div>
              )}

              {isOpen && (
                <div className="border-t border-ink-700/60 bg-ink-950/40 p-4 animate-fade-up">
                  <ItemModelView model={it.model} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MaterialDownloads({ week }: { week: number }) {
  const entry = (materialsIndex as { week: number; word: string; excel: string; prompt: string; workbook?: string }[]).find(
    (m) => m.week === week,
  )
  if (!entry) return null
  const items = [
    ...(entry.workbook
      ? [
          {
            href: entry.workbook,
            icon: FileSpreadsheet,
            label: 'Workbook Estados Contables',
            desc: 'Balance y Resultados con drill-down, articulación de la partida doble e indicadores vinculados.',
            tone: 'text-gold-300',
          },
        ]
      : []),
    {
      href: entry.word,
      icon: FileText,
      label: 'Documento Word',
      desc: 'Teoría detallada y didáctica con técnicas modernas.',
      tone: 'text-blue-300',
    },
    {
      href: entry.excel,
      icon: FileSpreadsheet,
      label: 'Modelo Excel interactivo',
      desc: 'Editá las celdas amarillas; matrices dinámicas y conclusiones automáticas.',
      tone: 'text-value-400',
    },
    {
      href: entry.prompt,
      icon: Sparkles,
      label: 'Guía de Prompt Engineering',
      desc: 'Generá tu propio caso y simulador con Gemini, ChatGPT o Claude.',
      tone: 'text-gold-300',
    },
  ]
  return (
    <div className="card mb-8 p-5">
      <div className="mb-3 flex items-center gap-2 text-gold-300">
        <Download size={18} /> <h2 className="text-sm font-bold uppercase tracking-wider">Material descargable de la semana</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((it) => (
          <a
            key={it.href}
            href={it.href}
            download
            className="group flex flex-col rounded-xl border border-ink-600 bg-ink-900/60 p-4 transition hover:border-gold-400/40 hover:shadow-glow"
          >
            <it.icon size={24} className={`mb-2 ${it.tone}`} />
            <span className="text-sm font-semibold text-slate-100">{it.label}</span>
            <span className="mt-1 flex-1 text-xs text-slate-400">{it.desc}</span>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-300">
              <Download size={13} /> Descargar
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

function Quiz({ questions, onComplete }: { questions: QuizQuestion[]; onComplete: (score: number) => void }) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    const correct = questions.filter((q) => answers[q.id] === q.correctIndex).length
    return Math.round((correct / questions.length) * 100)
  }, [answers, questions])

  return (
    <div className="card mt-6 p-6">
      <h2 className="mb-1 text-lg font-bold text-gold-200">Autoevaluación</h2>
      <p className="mb-5 text-sm text-slate-400">Respondé para fijar los conceptos y marcar la clase como completada.</p>
      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={q.id}>
            <p className="mb-2.5 font-semibold text-slate-100">{qi + 1}. {q.question}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[q.id] === oi
                const isCorrect = oi === q.correctIndex
                let cls = 'border-ink-600 bg-ink-900/60 hover:border-gold-400/40'
                if (submitted) {
                  if (isCorrect) cls = 'border-value-500/50 bg-value-500/10'
                  else if (selected) cls = 'border-danger-500/50 bg-danger-500/10'
                  else cls = 'border-ink-700 bg-ink-900/40 opacity-70'
                } else if (selected) {
                  cls = 'border-gold-400/60 bg-gold-400/10'
                }
                return (
                  <button
                    key={oi}
                    disabled={submitted}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    className={`flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition ${cls}`}
                  >
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${selected ? 'border-gold-400 text-gold-300' : 'border-slate-600 text-slate-500'}`}>
                      {String.fromCharCode(65 + oi)}
                    </span>
                    <span className="text-slate-200">{opt}</span>
                  </button>
                )
              })}
            </div>
            {submitted && (
              <p className="mt-2 rounded-lg bg-ink-800/60 px-3 py-2 text-xs text-slate-400">
                <span className="font-semibold text-gold-200">Explicación: </span>{q.explanation}
              </p>
            )}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          className="btn-gold mt-6"
          disabled={Object.keys(answers).length < questions.length}
          onClick={() => {
            setSubmitted(true)
            onComplete(score)
          }}
        >
          Enviar respuestas
        </button>
      ) : (
        <div className={`mt-6 rounded-xl border px-4 py-3 text-sm font-semibold ${score >= 70 ? 'border-value-500/40 bg-value-500/10 text-value-400' : 'border-gold-400/40 bg-gold-400/10 text-gold-200'}`}>
          Obtuviste {score}%. {score >= 70 ? '¡Muy bien! Clase completada.' : 'Clase completada. Repasá las explicaciones para afianzar.'}
        </div>
      )}
    </div>
  )
}
