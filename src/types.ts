// ============================================================================
// Tipos de dominio de la Academia de Finanzas Corporativas + IA
// ============================================================================

export type Role = 'admin' | 'student'

export interface User {
  id: string
  name: string
  email: string
  password: string // demo: en producción usar hash + backend
  role: Role
  company?: string
  position?: string
  avatarColor: string
  createdAt: string
}

// ---------------------------------------------------------------------------
// Currículum
// ---------------------------------------------------------------------------

/** Bloque de contenido didáctico dentro de una lección. */
export type ContentBlock =
  | { type: 'theory'; title?: string; body: string } // markdown-lite
  | { type: 'keypoints'; title: string; points: string[] }
  | { type: 'insight'; body: string } // destacado "la diferencia clave"
  | { type: 'warning'; body: string } // alertas (ej: descubierto bancario)
  | { type: 'formula'; name: string; expr: string; note?: string }
  | { type: 'case'; title: string; body: string }
  | { type: 'table'; title?: string; headers: string[]; rows: string[][] }
  | { type: 'claude'; goal: string; prompt: string; note?: string }
  | { type: 'simulator'; simulatorId: string; intro?: string }

export interface Lesson {
  id: string
  week: number
  title: string
  subtitle: string
  /** "pilar" temático: contable, valor, financiero, riesgo, etc. */
  pillar: Pillar
  durationMin: number
  objectives: string[]
  blocks: ContentBlock[]
  /** preguntas de autoevaluación */
  quiz: QuizQuestion[]
  /** ids de simuladores recomendados */
  simulators: string[]
  custom?: boolean // creada por el admin
}

export type Pillar =
  | 'Lectura Contable'
  | 'Construcción de Valor'
  | 'Económico vs Financiero'
  | 'Flujos de Caja'
  | 'Costo del Capital'
  | 'Apalancamiento y Riesgo'
  | 'Capital de Trabajo'
  | 'Valuación'
  | 'Estrategia Financiera'

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

// ---------------------------------------------------------------------------
// Material adicional (subido por el admin)
// ---------------------------------------------------------------------------

export interface Material {
  id: string
  lessonId?: string // opcional: material global si no se asocia
  title: string
  kind: 'pdf' | 'video' | 'planilla' | 'articulo' | 'plantilla-claude' | 'enlace'
  description: string
  url?: string
  body?: string // contenido embebido (ej: prompt o nota)
  createdAt: string
  createdBy: string
}

// ---------------------------------------------------------------------------
// Progreso del alumno
// ---------------------------------------------------------------------------

export interface LessonProgress {
  lessonId: string
  completed: boolean
  quizScore?: number // 0..100
  lastVisited?: string
  minutesSpent: number
}

export interface SimulatorRun {
  simulatorId: string
  at: string
  /** snapshot de resultados clave para mostrar evolución */
  summary: string
}

export interface StudentState {
  userId: string
  lessons: Record<string, LessonProgress>
  runs: SimulatorRun[]
  notes: string
}

// ---------------------------------------------------------------------------
// Mensajería privada (admin <-> alumno)
// ---------------------------------------------------------------------------

export interface Message {
  id: string
  fromId: string
  toId: string
  body: string
  createdAt: string
  read: boolean
  /** etiqueta opcional sobre el avance al que refiere */
  context?: string
}

// ---------------------------------------------------------------------------
// Estados contables mock
// ---------------------------------------------------------------------------

export interface LineItem {
  label: string
  /** valor contable (de presentación) */
  book: number
  /** valor "real" de gestión / mercado, cuando difiere */
  real?: number
  note?: string
}

export interface BalanceSheet {
  period: string
  assets: {
    current: LineItem[]
    nonCurrent: LineItem[]
  }
  liabilities: {
    current: LineItem[]
    nonCurrent: LineItem[]
  }
  equity: LineItem[]
}

export interface IncomeStatement {
  period: string
  lines: LineItem[]
}

export interface CashFlow {
  period: string
  operating: LineItem[]
  investing: LineItem[]
  financing: LineItem[]
}

export interface MockCompany {
  name: string
  sector: string
  story: string
  currency: string
  balance: BalanceSheet[]
  income: IncomeStatement[]
  cashflow: CashFlow[]
}
