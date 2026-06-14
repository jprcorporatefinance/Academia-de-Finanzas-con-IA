import { Link } from 'react-router-dom'
import { curriculum } from '../data/curriculum'
import { simulatorList } from '../simulators/registry'
import {
  TrendingUp,
  Sparkles,
  Calculator,
  LineChart,
  ShieldCheck,
  Building2,
  ArrowRight,
  Check,
} from 'lucide-react'

const pillars = [
  {
    icon: LineChart,
    title: 'Leer la verdad, no la contabilidad de presentación',
    text: 'La diferencia entre lo que muestra un balance ante el fisco y la información real que necesitás para decidir y entender cómo se compone el valor.',
  },
  {
    icon: TrendingUp,
    title: 'Cómo se forma —y se destruye— el valor',
    text: 'ROIC, EVA, NOPAT, Free Cash Flow. Cómo se puede estar bien contablemente y estar destruyendo valor sin darte cuenta.',
  },
  {
    icon: Calculator,
    title: 'Costo del capital en LatAm',
    text: 'WACC con riesgo país, prima por tamaño y mercados poco líquidos. Por qué los indicadores de EEUU no se copian, se adaptan.',
  },
  {
    icon: ShieldCheck,
    title: 'Apalancamiento sano y riesgo',
    text: 'Cuándo la deuda multiplica ganancias y cuándo apalanca pérdidas. Modigliani-Miller llevado a tu empresa, todos los días.',
  },
]

const outcomes = [
  'Distinguir lo económico de lo financiero y por qué una empresa rentable puede quedarse sin caja',
  'Reconstruir el verdadero capital invertido y medir si tu negocio crea o destruye valor',
  'Convertir a tus proveedores en aliados financieros y evitar el descubierto bancario caro',
  'Determinar el costo real de tu capital y la valuación de tu compañía',
  'Diseñar la estructura de financiamiento y el nivel óptimo de deuda',
  'Salir de situaciones de sobreendeudamiento antes de que la caída se vuelva exponencial',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-radial-spotlight">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950">
            <TrendingUp size={20} />
          </div>
          <span className="font-bold text-slate-100">Academia FC + IA</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/ingresar" className="btn-ghost">Ingresar</Link>
          <Link to="/ingresar" className="btn-gold">Comenzar</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-12 text-center lg:pt-20">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs font-medium text-gold-200">
          <Sparkles size={14} /> Programa premium · 12 semanas · Finanzas Corporativas potenciadas con Claude
        </div>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-extrabold leading-tight text-slate-100 lg:text-6xl">
          Entendé cómo se forma <span className="gradient-text">el verdadero valor</span> de tu empresa
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
          Una academia de Finanzas Corporativas Avanzada para CEOs y dueños. Aprendé a leer la información que
          de verdad importa, a usar la IA para resolver cada modelo financiero, y a transformar tu compañía en
          una empresa sana y perdurable.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/ingresar" className="btn-gold px-6 py-3 text-base">
            Acceder al programa <ArrowRight size={18} />
          </Link>
          <a href="#temario" className="btn-ghost px-6 py-3 text-base">Ver el temario</a>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4">
          {[
            { n: '12', l: 'semanas de programa' },
            { n: `${simulatorList.length}`, l: 'simuladores interactivos' },
            { n: '∞', l: 'casos resueltos con IA' },
          ].map((s) => (
            <div key={s.l} className="card p-5">
              <div className="text-3xl font-extrabold text-gold-300">{s.n}</div>
              <div className="mt-1 text-xs text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pilares */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="card card-hover p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/10 text-gold-300">
                <p.icon size={22} />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-100">{p.title}</h3>
              <p className="text-sm text-slate-400">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* La diferencia contable vs real */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="border-b border-ink-700 p-8 md:border-b-0 md:border-r">
              <span className="chip mb-3">Lo que muestra la contabilidad</span>
              <h3 className="text-2xl font-bold text-slate-100">"Tengo ganancia y las ventas crecen"</h3>
              <p className="mt-3 text-sm text-slate-400">
                El Estado de Resultados luce bien. El dueño mira el margen y está tranquilo. Es la foto que se
                presenta ante bancos, el fisco y los consejos profesionales.
              </p>
            </div>
            <div className="bg-gold-400/5 p-8">
              <span className="chip mb-3 border-gold-400/40 text-gold-200">Lo que de verdad pasa</span>
              <h3 className="text-2xl font-bold text-gold-200">"Estoy destruyendo valor"</h3>
              <p className="mt-3 text-sm text-slate-300">
                El capital rinde menos de lo que cuesta, la caja está atrapada en stock e incobrables, y el
                descubierto se come la rentabilidad. La verdadera información de gestión cuenta otra historia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temario */}
      <section id="temario" className="mx-auto max-w-6xl px-5 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100">El recorrido de 12 semanas</h2>
          <p className="mt-2 text-slate-400">Casos interrelacionados sobre una misma empresa, de la lectura contable a la valuación.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((l) => (
            <div key={l.id} className="card card-hover p-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Semana {l.week}</span>
                <span className="chip">{l.pillar}</span>
              </div>
              <h3 className="font-bold leading-snug text-slate-100">{l.title}</h3>
              <p className="mt-1.5 text-xs text-slate-400">{l.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Resultados */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="card p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <Building2 className="mb-3 text-gold-300" size={28} />
              <h2 className="text-2xl font-bold text-slate-100">Al terminar vas a poder…</h2>
              <p className="mt-2 text-sm text-slate-400">
                Una visión clara de cómo se descompone y se mejora el valor de una empresa, lista para aplicar
                en tu compañía desde la primera semana.
              </p>
            </div>
            <ul className="space-y-3">
              {outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-sm text-slate-300">
                  <Check size={18} className="mt-0.5 shrink-0 text-value-400" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-5 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-100">Tu empresa vale lo que vale su caja futura</h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-400">
          Aprendé a verla, a medirla y a multiplicarla. Con casos prácticos, simuladores y la IA como copiloto.
        </p>
        <Link to="/ingresar" className="btn-gold mx-auto mt-6 px-7 py-3 text-base">
          Comenzar ahora <ArrowRight size={18} />
        </Link>
      </section>

      <footer className="border-t border-ink-700 py-8 text-center text-xs text-slate-500">
        Academia de Finanzas Corporativas + IA · Programa para CEOs y dueños de empresa
      </footer>
    </div>
  )
}
