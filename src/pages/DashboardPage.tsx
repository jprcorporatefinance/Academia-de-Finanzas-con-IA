import { Link } from 'react-router-dom'
import { useStore } from '../store/store'
import { Stat } from '../components/ui'
import { curriculum } from '../data/curriculum'
import { ArrowRight, GraduationCap, MessageSquare, TrendingUp, Users } from 'lucide-react'

export default function DashboardPage() {
  const { currentUser } = useStore()
  if (!currentUser) return null
  return currentUser.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />
}

function StudentDashboard() {
  const { currentUser, getStudentState, messages } = useStore()
  const state = getStudentState(currentUser!.id)
  const total = curriculum.length
  const completed = Object.values(state.lessons).filter((l) => l.completed).length
  const pctDone = Math.round((completed / total) * 100)
  const scores = Object.values(state.lessons).filter((l) => l.quizScore != null).map((l) => l.quizScore!)
  const avgScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const minutes = Object.values(state.lessons).reduce((a, l) => a + l.minutesSpent, 0)
  const nextLesson = curriculum.find((l) => !state.lessons[l.id]?.completed) ?? curriculum[curriculum.length - 1]
  const unread = messages.filter((m) => m.toId === currentUser!.id && !m.read).length

  return (
    <div>
      <header className="mb-6">
        <p className="text-sm text-gold-400">Bienvenido de nuevo</p>
        <h1 className="text-2xl font-bold text-slate-100">{currentUser!.name}</h1>
        <p className="text-sm text-slate-400">{currentUser!.position} · {currentUser!.company}</p>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Progreso" value={`${pctDone}%`} tone="gold" hint={`${completed} de ${total} semanas`} />
        <Stat label="Promedio quizzes" value={`${avgScore}%`} tone={avgScore >= 70 ? 'good' : 'neutral'} />
        <Stat label="Tiempo de estudio" value={`${Math.round(minutes / 60)}h`} hint={`${minutes} min`} />
        <Stat label="Mensajes nuevos" value={unread} tone={unread ? 'gold' : 'neutral'} />
      </div>

      {/* Próxima clase */}
      <div className="card mb-6 overflow-hidden">
        <div className="grid md:grid-cols-[1.4fr_1fr]">
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Tu próxima clase · Semana {nextLesson.week}</span>
            <h2 className="mt-1 text-xl font-bold text-slate-100">{nextLesson.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{nextLesson.subtitle}</p>
            <Link to={`/app/programa/${nextLesson.id}`} className="btn-gold mt-4">
              Continuar <ArrowRight size={16} />
            </Link>
          </div>
          <div className="border-t border-ink-700 bg-ink-900/50 p-6 md:border-l md:border-t-0">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">En esta clase</p>
            <ul className="space-y-1.5 text-sm text-slate-300">
              {nextLesson.objectives.slice(0, 3).map((o, i) => (
                <li key={i} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" /> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Barra de avance por semana */}
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Tu recorrido</h3>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {curriculum.map((l) => {
          const p = state.lessons[l.id]
          return (
            <Link
              key={l.id}
              to={`/app/programa/${l.id}`}
              className={`card card-hover flex items-center gap-3 p-4 ${p?.completed ? 'border-value-500/30' : ''}`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                  p?.completed ? 'bg-value-500/20 text-value-400' : 'bg-ink-800 text-slate-400'
                }`}
              >
                {l.week}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-100">{l.title}</p>
                <p className="text-xs text-slate-500">{p?.completed ? `Completada · ${p.quizScore ?? 0}%` : p ? 'En curso' : 'Pendiente'}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function AdminDashboard() {
  const { students, getStudentState, messages } = useStore()
  const total = curriculum.length

  const rows = students.map((s) => {
    const st = getStudentState(s.id)
    const completed = Object.values(st.lessons).filter((l) => l.completed).length
    const scores = Object.values(st.lessons).filter((l) => l.quizScore != null).map((l) => l.quizScore!)
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
    return { s, completed, pct: Math.round((completed / total) * 100), avg }
  })

  const avgCohort = rows.length ? Math.round(rows.reduce((a, r) => a + r.pct, 0) / rows.length) : 0

  return (
    <div>
      <header className="mb-6">
        <p className="text-sm text-gold-400">Panel del administrador</p>
        <h1 className="text-2xl font-bold text-slate-100">Evolución de la cohorte</h1>
      </header>

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Stat label="Alumnos" value={students.length} tone="gold" />
        <Stat label="Avance promedio" value={`${avgCohort}%`} />
        <Stat label="Semanas del programa" value={total} />
        <Stat label="Mensajes enviados" value={messages.length} />
      </div>

      <div className="card overflow-hidden">
        <div className="border-b border-ink-700 px-5 py-3 text-sm font-bold text-slate-200">Progreso por alumno</div>
        <div className="divide-y divide-ink-700/60">
          {rows.map(({ s, completed, pct, avg }) => (
            <Link key={s.id} to="/app/alumnos" className="flex items-center gap-4 px-5 py-3.5 transition hover:bg-ink-800/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-ink-950" style={{ background: s.avatarColor }}>
                {s.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-100">{s.name}</p>
                <p className="truncate text-xs text-slate-500">{s.company}</p>
              </div>
              <div className="hidden w-40 sm:block">
                <div className="mb-1 flex justify-between text-xs text-slate-400">
                  <span>{completed}/{total}</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-ink-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-gold-300 to-gold-500" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="w-14 text-right">
                <span className={`text-sm font-bold ${avg >= 70 ? 'text-value-400' : 'text-slate-300'}`}>{avg}%</span>
                <p className="text-[10px] text-slate-500">quiz</p>
              </div>
              <ArrowRight size={16} className="text-slate-500" />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Link to="/app/alumnos" className="card card-hover flex items-center gap-3 p-5">
          <Users className="text-gold-300" size={22} />
          <div>
            <p className="font-semibold text-slate-100">Seguimiento de alumnos</p>
            <p className="text-xs text-slate-400">Ver avance y enviar mensajes</p>
          </div>
        </Link>
        <Link to="/app/materiales" className="card card-hover flex items-center gap-3 p-5">
          <GraduationCap className="text-gold-300" size={22} />
          <div>
            <p className="font-semibold text-slate-100">Agregar material</p>
            <p className="text-xs text-slate-400">Sumá contenido al programa</p>
          </div>
        </Link>
        <Link to="/app/mensajes" className="card card-hover flex items-center gap-3 p-5">
          <MessageSquare className="text-gold-300" size={22} />
          <div>
            <p className="font-semibold text-slate-100">Mensajería</p>
            <p className="text-xs text-slate-400">Comentar el avance de cada uno</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
