import { useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { MAX_INTENTOS, type AppQuizQ } from '../data/maestria/appData'
import { CheckCircle2, XCircle, RotateCcw, Award, AlertCircle } from 'lucide-react'

const PREGUNTAS_POR_INTENTO = 15

// Sortea `n` preguntas del banco (Fisher-Yates), para que cada intento sea distinto.
function sample<T>(arr: T[], n: number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.slice(0, Math.min(n, a.length))
}

// ============================================================================
// Motor de cuestionario: 15 preguntas, hasta 3 intentos, se guarda el mejor
// puntaje (visible para el admin). Al terminar muestra correcto/incorrecto y
// la justificación de cada pregunta.
// ============================================================================
export function MaestriaQuiz({ cod, quiz }: { cod: string; quiz: AppQuizQ[] }) {
  const { currentUser, quizAttempts, saveQuizAttempt } = useStore()

  const myAttempts = useMemo(
    () => quizAttempts.filter((a) => a.userId === currentUser?.id && a.cod === cod),
    [quizAttempts, currentUser?.id, cod],
  )
  const attemptsUsed = myAttempts.length
  const best = myAttempts.reduce((m, a) => Math.max(m, a.score), 0)
  const intentosRestantes = Math.max(0, MAX_INTENTOS - attemptsUsed)

  const [taking, setTaking] = useState(false)
  const [activeQuiz, setActiveQuiz] = useState<AppQuizQ[]>([])
  const [answers, setAnswers] = useState<(number | null)[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [saving, setSaving] = useState(false)
  const [lastScore, setLastScore] = useState<number | null>(null)

  const banco = quiz.length
  const total = Math.min(PREGUNTAS_POR_INTENTO, banco)
  const answeredCount = answers.filter((a) => a !== null).length

  function start() {
    const aq = sample(quiz, total)
    setActiveQuiz(aq)
    setAnswers(aq.map(() => null))
    setSubmitted(false)
    setLastScore(null)
    setTaking(true)
  }

  async function submit() {
    if (answeredCount < total) return
    const score = activeQuiz.reduce((s, q, i) => s + (answers[i] === q.correcta ? 1 : 0), 0)
    setSaving(true)
    await saveQuizAttempt(cod, score, total, answers.map((a) => a ?? -1))
    setSaving(false)
    setLastScore(score)
    setSubmitted(true)
  }

  const scorePct = (s: number) => Math.round((s / total) * 100)

  // ---- Vista de resumen (no está rindiendo) ----
  if (!taking) {
    return (
      <div className="card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-100">
              <Award size={18} className="text-gold-300" /> Cuestionario de repaso — {total} preguntas por intento
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Banco de {banco} preguntas · se sortean {total} en cada intento (hasta {MAX_INTENTOS}). Se guarda
              tu mejor puntaje y queda registrado para el seguimiento.
            </p>
          </div>
          <div className="text-right">
            {attemptsUsed > 0 ? (
              <>
                <div className="text-2xl font-bold tabular-nums text-gold-300">
                  {best}/{total}
                </div>
                <div className="text-xs text-slate-500">mejor puntaje · {scorePct(best)}%</div>
              </>
            ) : (
              <div className="text-xs text-slate-500">Sin intentos todavía</div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {intentosRestantes > 0 ? (
            <button className="btn" onClick={start}>
              {attemptsUsed === 0 ? 'Comenzar cuestionario' : 'Rehacer'} · quedan {intentosRestantes}{' '}
              {intentosRestantes === 1 ? 'intento' : 'intentos'}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <AlertCircle size={16} className="text-gold-400" /> Usaste los {MAX_INTENTOS} intentos.
              Tu mejor puntaje quedó guardado.
            </div>
          )}
          {attemptsUsed > 0 && (
            <span className="text-xs text-slate-500">
              {attemptsUsed} {attemptsUsed === 1 ? 'intento realizado' : 'intentos realizados'}
            </span>
          )}
        </div>
      </div>
    )
  }

  // ---- Vista rindiendo / resultados ----
  return (
    <div className="space-y-4">
      {submitted && lastScore !== null && (
        <div
          className={`card flex flex-wrap items-center justify-between gap-3 border-l-4 p-5 ${
            scorePct(lastScore) >= 60 ? 'border-l-value-500' : 'border-l-danger-500'
          }`}
        >
          <div>
            <div className="text-lg font-bold text-slate-100">
              Puntaje: {lastScore}/{total} ({scorePct(lastScore)}%)
            </div>
            <div className="text-sm text-slate-400">
              Mejor puntaje acumulado: {Math.max(best, lastScore)}/{total} ·{' '}
              {intentosRestantes > 0
                ? `te quedan ${intentosRestantes} ${intentosRestantes === 1 ? 'intento' : 'intentos'}`
                : 'sin intentos restantes'}
            </div>
          </div>
          <div className="flex gap-2">
            {intentosRestantes > 0 && (
              <button className="btn-ghost" onClick={start}>
                <RotateCcw size={16} /> Rehacer
              </button>
            )}
            <button className="btn-ghost" onClick={() => setTaking(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {!submitted && (
        <div className="card flex items-center justify-between gap-3 p-4">
          <span className="text-sm text-slate-400">
            Respondidas {answeredCount}/{total}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-700">
            <div
              className="h-full rounded-full bg-gold-400 transition-all"
              style={{ width: `${(answeredCount / total) * 100}%` }}
            />
          </div>
        </div>
      )}

      {activeQuiz.map((q, i) => {
        const chosen = answers[i]
        return (
          <div key={q.id} className="card p-5">
            <div className="mb-3 flex gap-2 text-sm font-semibold text-slate-100">
              <span className="text-gold-300">{i + 1}.</span>
              <span>{q.pregunta}</span>
            </div>
            <div className="space-y-2">
              {q.opciones.map((op, k) => {
                const isChosen = chosen === k
                const isCorrect = k === q.correcta
                let cls = 'border-ink-600 bg-ink-800/40 text-slate-300 hover:border-ink-500'
                if (submitted) {
                  if (isCorrect) cls = 'border-value-500/50 bg-value-500/10 text-value-300'
                  else if (isChosen) cls = 'border-danger-500/50 bg-danger-500/10 text-danger-300'
                  else cls = 'border-ink-700 bg-ink-800/30 text-slate-500'
                } else if (isChosen) {
                  cls = 'border-gold-400/60 bg-gold-400/10 text-gold-100'
                }
                return (
                  <button
                    key={k}
                    disabled={submitted}
                    onClick={() =>
                      setAnswers((a) => a.map((v, idx) => (idx === i ? k : v)))
                    }
                    className={`flex w-full items-start gap-2.5 rounded-xl border px-3.5 py-2.5 text-left text-sm transition ${cls}`}
                  >
                    <span className="mt-0.5 font-mono text-xs opacity-70">
                      {String.fromCharCode(65 + k)}
                    </span>
                    <span className="flex-1">{op}</span>
                    {submitted && isCorrect && <CheckCircle2 size={16} className="text-value-400" />}
                    {submitted && isChosen && !isCorrect && (
                      <XCircle size={16} className="text-danger-400" />
                    )}
                  </button>
                )
              })}
            </div>
            {submitted && (
              <div className="mt-3 rounded-xl border border-ink-700 bg-ink-800/50 px-4 py-3 text-sm text-slate-300">
                <span className="font-semibold text-gold-300">Justificación. </span>
                {q.justificacion}
              </div>
            )}
          </div>
        )
      })}

      {!submitted && (
        <div className="flex items-center justify-between gap-3">
          <button className="btn-ghost" onClick={() => setTaking(false)}>
            Cancelar
          </button>
          <button className="btn" disabled={answeredCount < total || saving} onClick={submit}>
            {saving ? 'Guardando…' : answeredCount < total ? `Faltan ${total - answeredCount}` : 'Entregar y ver resultados'}
          </button>
        </div>
      )}
    </div>
  )
}
