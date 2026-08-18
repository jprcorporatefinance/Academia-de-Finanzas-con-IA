// ============================================================================
// Maestría en Finanzas Corporativas Aplicadas con IA · UNNE — Modelo de contenido
// ----------------------------------------------------------------------------
// Una `Asignatura` es la unidad de desarrollo. De cada una se derivan CUATRO
// entregables con identidad de marca JPR Consulting:
//   1) PDF didáctico extenso (teoría, metodología, fórmulas, cuadros, expertos)
//   2) Caso práctico (enunciado + datos + consigna + metodología de resolución)
//   3) Excel dinámico (matrices dinámicas: LET/LAMBDA/SEQUENCE/SCAN/REDUCE/MMULT)
//   4) Cuestionario de 15 preguntas de opción múltiple con justificación
// El mismo modelo alimentará luego la vista in-app (teoría + quiz + subida).
// ============================================================================

export type Fmt = 'pct' | 'pct1' | 'pct2' | 'money' | 'money2' | 'num' | 'num2' | 'days' | 'x' | 'coef'

// ---------------------------------------------------------------------------
// Bloques de contenido didáctico (markdown-lite en los `md`: **negrita**, *itálica*, `código`)
// ---------------------------------------------------------------------------
export type Block =
  | { t: 'p'; md: string }
  | { t: 'h'; text: string } // subtítulo dentro de una sección
  | { t: 'ul'; items: string[] }
  | { t: 'ol'; items: string[] }
  | { t: 'formula'; name: string; expr: string; where?: string; note?: string }
  | { t: 'idea'; md: string } // recuadro verde "idea clave"
  | { t: 'warn'; md: string } // recuadro ámbar "atención"
  | { t: 'quote'; author: string; credential: string; md: string; source?: string }
  | { t: 'table'; title?: string; headers: string[]; rows: string[][]; caption?: string; firstColLeft?: boolean }
  | { t: 'chain'; title?: string; nodes: string[]; caption?: string } // cadena causal A → B → C
  | { t: 'steps'; title?: string; items: { k: string; d: string }[] } // metodología numerada

export interface Section {
  title: string
  intro?: string
  blocks: Block[]
}

export interface ExpertQuote {
  author: string
  credential: string
  md: string
  source?: string
}

// ---------------------------------------------------------------------------
// Modelo de Excel del caso (matrices dinámicas)
// ---------------------------------------------------------------------------
export interface XlInput {
  key: string
  label: string
  value: number | string
  fmt?: Fmt
  unit?: string
  note?: string
}

export interface XlCalc {
  key: string
  label: string
  /** Fórmula Excel con tokens [clave]. Debe usar funciones de matriz dinámica. */
  xl: string
  fmt?: Fmt
  note?: string
  highlight?: boolean
}

/** Tabla que "derrama" (spill) desde una sola fórmula de matriz dinámica. */
export interface XlSpill {
  key: string
  title: string
  /** Encabezados de columnas del rango derramado. */
  columns: string[]
  /** UNA fórmula que derrama toda la matriz (SEQUENCE/LET/MAP/MMULT/HSTACK…). */
  xl: string
  /** Formato por columna; `undefined` deja la columna sin formato (texto). */
  formats?: (Fmt | undefined)[]
  note?: string
  /** Filas aproximadas que ocupa el derrame (para dejar espacio de layout). */
  rows?: number
}

export interface XlConclusion {
  label?: string
  /** Fórmula que devuelve texto (LET/IF/TEXT/SWITCH). */
  xl: string
}

export interface ExcelModel {
  sheetTitle: string
  intro?: string
  inputs: XlInput[]
  calcs: XlCalc[]
  spills?: XlSpill[]
  conclusions: XlConclusion[]
}

// ---------------------------------------------------------------------------
// Caso práctico
// ---------------------------------------------------------------------------
export interface Caso {
  titulo: string
  empresa: string
  contexto: string // narrativa del caso (markdown-lite, párrafos con \n\n)
  datos: Block[] // tablas/detalle de datos del caso
  consigna: string[] // preguntas de decisión que el alumno debe responder
  metodologia: { k: string; d: string }[] // pasos guía de resolución
}

// ---------------------------------------------------------------------------
// Cuestionario
// ---------------------------------------------------------------------------
export interface QuizQ {
  id: string
  pregunta: string
  opciones: string[]
  correcta: number // índice 0-based
  /** Justificación de por qué la correcta lo es y por qué las demás no. */
  justificacion: string
}

// ---------------------------------------------------------------------------
// Asignatura (unidad completa)
// ---------------------------------------------------------------------------
export interface Asignatura {
  cod: string // '1.1'
  slug: string // 'a1-1'
  cuatrimestre: number // 1..4
  fase: string // 'Descriptiva · ¿Qué sucedió?'
  nombre: string
  horas: string
  correlativas: string
  framework: string // marco/skill que aporta (McKinsey, Damodaran, Pereiro…)
  resumen: string
  objetivos: string[]
  sections: Section[]
  expertos: ExpertQuote[]
  caso: Caso
  model: ExcelModel
  quiz: QuizQ[]
  bibliografia: string[]
}
