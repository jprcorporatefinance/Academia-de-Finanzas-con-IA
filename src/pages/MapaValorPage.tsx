import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowDown } from 'lucide-react'

// ============================================================================
// Mapa de interrelaciones de los generadores de valor — la cadena causal que
// atraviesa las 16 asignaturas del núcleo. Cada nodo enlaza a su asignatura.
// Los Módulos Avanzados A.6 y A.7 desarrollan esta misma cadena en profundidad.
// ============================================================================

type Node = {
  title: string
  formula?: string
  sub?: string
  cod?: string // asignatura destino (slug)
  tone?: 'default' | 'master' | 'alert' | 'goal' | 'wide'
}

function NodeCard({ n }: { n: Node }) {
  const base =
    'flex flex-col items-center justify-center rounded-2xl border px-4 py-4 text-center transition h-full'
  const tone = {
    default: 'border-ink-700 bg-ink-800/60 hover:border-gold-400/50',
    master: 'border-gold-400/40 bg-gold-400/5',
    alert: 'border-danger-500/45 bg-danger-500/5',
    goal: 'border-gold-400/40 bg-gradient-to-br from-gold-500/10 to-ink-800',
    wide: 'border-ink-700 bg-ink-800/60',
  }[n.tone ?? 'default']

  const inner = (
    <div className={`${base} ${tone}`}>
      <div
        className={`font-serif font-bold leading-tight ${
          n.tone === 'master' || n.tone === 'goal'
            ? 'text-xl text-gold-200'
            : n.tone === 'alert'
              ? 'text-base text-danger-400'
              : 'text-base text-slate-100'
        }`}
      >
        {n.title}
      </div>
      {n.formula && <div className="mt-1.5 font-mono text-xs text-gold-300">{n.formula}</div>}
      {n.sub && <div className="mt-1.5 text-xs text-slate-400">{n.sub}</div>}
      {n.cod && (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-wider text-gold-400/80">
          Asignatura {n.cod.replace('a', '').replace('-', '.')}
        </div>
      )}
    </div>
  )
  return n.cod ? (
    <Link to={`/app/maestria/${n.cod}`} className="block h-full">
      {inner}
    </Link>
  ) : (
    <div className="h-full">{inner}</div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center py-2">
      <ArrowDown className="text-gold-400/70" size={22} />
    </div>
  )
}

const tiers: { nodes: Node[]; cols: string }[] = [
  {
    cols: 'grid-cols-1',
    nodes: [
      {
        title: 'Estados contables depurados',
        sub: 'reexpresados · normalizados · analíticos',
        cod: 'a1-1',
      },
    ],
  },
  {
    cols: 'grid-cols-1 sm:grid-cols-2',
    nodes: [
      { title: 'NOPAT', formula: 'EBIT × (1 − t efectiva)', sub: 'resultado operativo después de impuestos', cod: 'a1-4' },
      { title: 'Capital invertido', formula: 'CxC + Bs. cambio − Proveedores + Bs. uso', sub: 'capital empleado', cod: 'a1-4' },
    ],
  },
  {
    cols: 'grid-cols-1 sm:grid-cols-2',
    nodes: [
      { title: 'Capital de trabajo', formula: 'CCE = DIO + DSO − DPO', sub: 'matrices ABC/XYZ y vencimiento-reclamo', cod: 'a2-4' },
      { title: 'Activo fijo operativo', sub: 'a valor de mercado, no a valor de origen − amortizaciones', cod: 'a1-1' },
    ],
  },
  {
    cols: 'grid-cols-1 sm:grid-cols-2',
    nodes: [
      { title: 'ROIC', formula: 'NOPAT ÷ Capital invertido', sub: 'DuPont de 5 factores · GAO/GAF/GAT', cod: 'a2-1' },
      { title: 'WACC', formula: 'Ke·E/V + Kd·(1−t)·D/V', sub: 'CAPM emergente · Beta Total · Pereiro/λ', cod: 'a3-1' },
    ],
  },
  {
    cols: 'grid-cols-1',
    nodes: [
      {
        title: 'Spread = ROIC − WACC',
        sub: 'el indicador maestro: se crea valor si y solo si el retorno del capital supera su costo',
        tone: 'master',
      },
    ],
  },
  {
    cols: 'grid-cols-1 sm:grid-cols-3',
    nodes: [
      { title: 'EVA', formula: '(ROIC − WACC) × Capital', sub: 'EVA Margin · EVA Momentum', cod: 'a1-4' },
      { title: 'RONIC', sub: 'retorno del capital nuevo · key value driver', cod: 'a4-2' },
      { title: 'FCFF · FCFE · FCFD', sub: 'los tres flujos de la firma', cod: 'a4-1' },
    ],
  },
  {
    cols: 'grid-cols-1 sm:grid-cols-2',
    nodes: [
      { title: 'Crecer, ¿crea valor?', formula: 'solo si RONIC > WACC', sub: 'crecimiento sostenible y genuino', cod: 'a4-2' },
      { title: 'Valuación', sub: 'DCF y APV · valor del horizonte + terminal · DLOC × DLOM', cod: 'a4-1' },
    ],
  },
  {
    cols: 'grid-cols-1',
    nodes: [
      {
        title: 'Paradoja crecimiento-liquidez',
        formula: 'FCFF negativo pese a EVA positivo',
        sub: 'DSCR y covenants · Altman Z″ y Merton · DAF-E',
        tone: 'alert',
        cod: 'a4-3',
      },
    ],
  },
  {
    cols: 'grid-cols-1',
    nodes: [
      {
        title: 'Las cuatro decisiones',
        sub: 'Estructura de inversión · de financiamiento · política de dividendos · decisiones operativas',
        tone: 'wide',
        cod: 'a4-4',
      },
    ],
  },
  {
    cols: 'grid-cols-1',
    nodes: [
      {
        title: 'Valor para los dueños',
        sub: 'TSR Sintético · Total Business Return — el objetivo único y taxativo',
        tone: 'goal',
      },
    ],
  },
]

export default function MapaValorPage() {
  return (
    <div>
      <Link to="/app/maestria" className="mb-3 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-gold-300">
        <ArrowLeft size={15} /> Maestría
      </Link>
      <h1 className="font-serif text-2xl font-bold text-slate-100">
        Mapa de interrelaciones de los generadores de valor
      </h1>
      <p className="mt-2 max-w-3xl text-slate-400">
        La cadena causal que atraviesa todo el plan — de dónde parte cada número y a dónde llega. Cada
        eslabón enlaza con la asignatura donde se construye. El egresado debe poder reconstruirla de memoria.
      </p>

      <div className="mt-8 space-y-0">
        {tiers.map((tier, i) => (
          <div key={i}>
            <div className={`grid gap-3 ${tier.cols}`}>
              {tier.nodes.map((n, j) => (
                <NodeCard key={j} n={n} />
              ))}
            </div>
            {i < tiers.length - 1 && <Connector />}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-700 bg-ink-800/40 p-5 text-sm text-slate-400">
        <span className="font-semibold text-gold-300">Lectura del mapa. </span>
        Las dos entradas del sistema son el resultado operativo después de impuestos y el capital invertido;
        su cociente es el retorno del capital, que enfrentado a su costo produce el diferencial —el indicador
        maestro—. De ese diferencial cuelgan la medición del valor creado, la respuesta a si conviene crecer y
        la valuación. La paradoja entre crecimiento y liquidez es el punto donde el sistema puede quebrarse aun
        siendo rentable: por eso ocupa el centro y no un margen.
      </div>
    </div>
  )
}
