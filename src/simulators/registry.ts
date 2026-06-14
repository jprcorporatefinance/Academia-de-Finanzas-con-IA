import type { ComponentType } from 'react'
import EstadosSimulator from './EstadosSimulator'
import RoicSimulator from './RoicSimulator'
import DupontSimulator from './DupontSimulator'
import FcfSimulator from './FcfSimulator'
import WaccSimulator from './WaccSimulator'
import ApalancamientoSimulator from './ApalancamientoSimulator'
import CapitalTrabajoSimulator from './CapitalTrabajoSimulator'
import AmortizacionSimulator from './AmortizacionSimulator'
import TasasSimulator from './TasasSimulator'
import ValuacionSimulator from './ValuacionSimulator'

export interface SimulatorMeta {
  id: string
  title: string
  tagline: string
  pillar: string
  Component: ComponentType
}

export const simulators: Record<string, SimulatorMeta> = {
  estados: {
    id: 'estados',
    title: 'Lector de Estados Contables',
    tagline: 'Recorré Balance, Resultados y Flujo. Comparalo con el valor real de mercado.',
    pillar: 'Lectura Contable',
    Component: EstadosSimulator,
  },
  dupont: {
    id: 'dupont',
    title: 'Descomposición DuPont',
    tagline: 'Margen × rotación × multiplicador financiero: por qué el ROE engaña.',
    pillar: 'Construcción de Valor',
    Component: DupontSimulator,
  },
  roic: {
    id: 'roic',
    title: 'ROIC · NOPAT · EVA',
    tagline: '¿Tu capital rinde más de lo que cuesta? Detectá creación o destrucción de valor.',
    pillar: 'Construcción de Valor',
    Component: RoicSimulator,
  },
  fcf: {
    id: 'fcf',
    title: 'Free Cash Flow (FCFF · FCFE · FCFD)',
    tagline: 'Construí la caja libre de la firma, del accionista y del acreedor.',
    pillar: 'Flujos de Caja',
    Component: FcfSimulator,
  },
  'capital-trabajo': {
    id: 'capital-trabajo',
    title: 'Capital de Trabajo y Rotaciones',
    tagline: 'DSO, DIO, DPO y ciclo de conversión de caja. Dónde queda atrapada tu plata.',
    pillar: 'Capital de Trabajo',
    Component: CapitalTrabajoSimulator,
  },
  wacc: {
    id: 'wacc',
    title: 'WACC para Mercados Emergentes',
    tagline: 'CAPM ajustado por riesgo país y tamaño. El verdadero costo del capital en LatAm.',
    pillar: 'Costo del Capital',
    Component: WaccSimulator,
  },
  apalancamiento: {
    id: 'apalancamiento',
    title: 'Apalancamiento y Riesgo',
    tagline: 'Cuándo la deuda multiplica ganancias y cuándo apalanca pérdidas.',
    pillar: 'Apalancamiento y Riesgo',
    Component: ApalancamientoSimulator,
  },
  amortizacion: {
    id: 'amortizacion',
    title: 'Amortización de Préstamos',
    tagline: 'Francés, alemán y americano. Cuánto pagás de intereses con cada sistema.',
    pillar: 'Estrategia Financiera',
    Component: AmortizacionSimulator,
  },
  tasas: {
    id: 'tasas',
    title: 'Tasas: Nominal · Efectiva · Real · CFT',
    tagline: 'De la tasa del cartel al costo financiero total que realmente pagás.',
    pillar: 'Estrategia Financiera',
    Component: TasasSimulator,
  },
  valuacion: {
    id: 'valuacion',
    title: 'Valuación por DCF',
    tagline: 'Flujos descontados, valor terminal y Equity Value. Cuánto vale tu empresa.',
    pillar: 'Valuación',
    Component: ValuacionSimulator,
  },
}

export const simulatorList = Object.values(simulators)
