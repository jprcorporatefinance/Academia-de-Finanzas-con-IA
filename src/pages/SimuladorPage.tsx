import { Link, useParams } from 'react-router-dom'
import { simulators } from '../simulators/registry'
import { ArrowLeft } from 'lucide-react'

export default function SimuladorPage() {
  const { simId } = useParams()
  const meta = simId ? simulators[simId] : undefined

  if (!meta) {
    return (
      <div className="card p-8 text-center">
        <p className="text-slate-300">Simulador no encontrado.</p>
        <Link to="/app/simuladores" className="btn-gold mt-4 inline-flex">Ver simuladores</Link>
      </div>
    )
  }

  const Comp = meta.Component
  return (
    <div>
      <Link to="/app/simuladores" className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold-300">
        <ArrowLeft size={15} /> Simuladores
      </Link>
      <header className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-gold-400">{meta.pillar}</span>
        <h1 className="text-2xl font-bold text-slate-100">{meta.title}</h1>
        <p className="text-sm text-slate-400">{meta.tagline}</p>
      </header>
      <Comp />
    </div>
  )
}
