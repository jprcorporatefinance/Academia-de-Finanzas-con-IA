import { Link } from 'react-router-dom'
import { useStore } from '../store/store'
import { Clock, CheckCircle2, Circle, ArrowRight } from 'lucide-react'

export default function ProgramaPage() {
  const { curriculum, currentUser, getStudentState } = useStore()
  const state = currentUser ? getStudentState(currentUser.id) : null

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Programa · 3 meses</h1>
        <p className="text-sm text-slate-400">
          12 clases, una por semana. Casos interrelacionados sobre Andina Manufacturas, de la lectura contable
          a la valuación.
        </p>
      </header>

      <div className="space-y-3">
        {curriculum.map((l) => {
          const p = state?.lessons[l.id]
          return (
            <Link
              key={l.id}
              to={`/app/programa/${l.id}`}
              className="card card-hover group flex items-center gap-4 p-5"
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">Sem</span>
                <span className="text-2xl font-extrabold text-slate-100">{l.week}</span>
              </div>
              <div className="h-12 w-px bg-ink-700" />
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="chip">{l.pillar}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock size={12} /> {l.durationMin} min
                  </span>
                  {l.custom && <span className="chip border-gold-400/40 text-gold-200">Nuevo</span>}
                </div>
                <h3 className="font-bold text-slate-100">{l.title}</h3>
                <p className="truncate text-sm text-slate-400">{l.subtitle}</p>
              </div>
              <div className="flex items-center gap-3">
                {p?.completed ? (
                  <CheckCircle2 className="text-value-400" size={22} />
                ) : (
                  <Circle className="text-slate-600" size={22} />
                )}
                <ArrowRight className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-gold-300" size={18} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
