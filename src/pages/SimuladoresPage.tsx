import { Link } from 'react-router-dom'
import { simulatorList } from '../simulators/registry'
import { Calculator, ArrowRight } from 'lucide-react'

export default function SimuladoresPage() {
  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Simuladores</h1>
        <p className="text-sm text-slate-400">
          Herramientas interactivas para resolver cada modelo de finanzas corporativas. Tocá las variables y
          mirá cómo cambia el valor.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {simulatorList.map((s) => (
          <Link key={s.id} to={`/app/simuladores/${s.id}`} className="card card-hover group flex flex-col p-5">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300">
              <Calculator size={22} />
            </div>
            <span className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">{s.pillar}</span>
            <h3 className="font-bold leading-snug text-slate-100">{s.title}</h3>
            <p className="mt-1.5 flex-1 text-sm text-slate-400">{s.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300">
              Abrir <ArrowRight size={15} className="transition group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
