import { useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { Stat } from '../components/ui'
import { simulators } from '../simulators/registry'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import { Send, Activity } from 'lucide-react'

export default function AlumnosPage() {
  const { students, getStudentState, curriculum, sendMessage } = useStore()
  const [activeId, setActiveId] = useState(students[0]?.id ?? '')
  const student = students.find((s) => s.id === activeId)
  const state = student ? getStudentState(student.id) : null

  const data = useMemo(
    () =>
      curriculum.map((l) => ({
        sem: `S${l.week}`,
        score: state?.lessons[l.id]?.quizScore ?? 0,
        done: !!state?.lessons[l.id]?.completed,
      })),
    [curriculum, state],
  )

  const completed = state ? Object.values(state.lessons).filter((l) => l.completed).length : 0
  const minutes = state ? Object.values(state.lessons).reduce((a, l) => a + l.minutesSpent, 0) : 0
  const scores = state ? Object.values(state.lessons).filter((l) => l.quizScore != null).map((l) => l.quizScore!) : []
  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0

  const [msg, setMsg] = useState('')
  const [context, setContext] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Seguimiento de alumnos</h1>
        <p className="text-sm text-slate-400">Mirá la evolución de cada alumno y mandale un comentario sobre su avance.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="card h-fit overflow-hidden p-0">
          <div className="border-b border-ink-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">Cohorte</div>
          <div className="divide-y divide-ink-700/60">
            {students.map((s) => {
              const st = getStudentState(s.id)
              const c = Object.values(st.lessons).filter((l) => l.completed).length
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${activeId === s.id ? 'bg-ink-800/60' : 'hover:bg-ink-800/30'}`}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-ink-950" style={{ background: s.avatarColor }}>
                    {s.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-100">{s.name}</p>
                    <p className="text-xs text-slate-500">{c}/{curriculum.length} semanas</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {student && state ? (
          <div className="space-y-4">
            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-ink-950" style={{ background: student.avatarColor }}>
                {student.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-100">{student.name}</h2>
                <p className="text-sm text-slate-400">{student.position} · {student.company} · {student.email}</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
              <Stat label="Semanas completas" value={`${completed}/${curriculum.length}`} tone="gold" />
              <Stat label="Promedio quizzes" value={`${avg}%`} tone={avg >= 70 ? 'good' : 'neutral'} />
              <Stat label="Tiempo de estudio" value={`${Math.round(minutes / 60)}h`} />
              <Stat label="Simuladores usados" value={state.runs.length} />
            </div>

            <div className="card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">Desempeño por semana</h3>
              <div className="h-56 w-full">
                <ResponsiveContainer>
                  <BarChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1a2740" />
                    <XAxis dataKey="sem" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} unit="%" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#0b1120', border: '1px solid #243453', borderRadius: 12 }}
                      formatter={(v: number) => [`${v}%`, 'Quiz']}
                    />
                    <Bar dataKey="score" radius={[5, 5, 0, 0]}>
                      {data.map((d, i) => (
                        <Cell key={i} fill={d.done ? '#34d399' : '#243453'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {state.runs.length > 0 && (
              <div className="card p-5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-gold-300">
                  <Activity size={15} /> Actividad en simuladores
                </h3>
                <div className="space-y-2">
                  {state.runs.slice(0, 6).map((r, i) => (
                    <div key={i} className="flex items-start justify-between gap-3 border-b border-ink-700/40 py-2 text-sm">
                      <div>
                        <span className="font-semibold text-slate-200">{simulators[r.simulatorId]?.title ?? r.simulatorId}</span>
                        <p className="text-xs text-slate-500">{r.summary}</p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-500">
                        {new Date(r.at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mensaje rápido */}
            <div className="card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gold-300">Comentar el avance</h3>
              <input
                className="input mb-2 text-sm"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Contexto (ej: Avance Semanas 1-4) — opcional"
              />
              <textarea
                className="input min-h-[90px]"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={`Escribile un comentario a ${student.name.split(' ')[0]} sobre su progreso…`}
              />
              <div className="mt-3 flex items-center gap-3">
                <button
                  className="btn-gold"
                  disabled={!msg.trim()}
                  onClick={() => {
                    sendMessage(student.id, msg.trim(), context.trim() || undefined)
                    setMsg(''); setContext('')
                    setSent(true); setTimeout(() => setSent(false), 2200)
                  }}
                >
                  <Send size={16} /> Enviar mensaje privado
                </button>
                {sent && <span className="text-sm text-value-400">✓ Mensaje enviado</span>}
              </div>
            </div>
          </div>
        ) : (
          <div className="card flex items-center justify-center p-10 text-sm text-slate-500">No hay alumnos aún.</div>
        )}
      </div>
    </div>
  )
}
