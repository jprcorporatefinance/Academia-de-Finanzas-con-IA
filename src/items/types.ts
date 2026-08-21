// ============================================================================
// ItemSpec: especificación única por ÍTEM. De acá salen los 4 entregables:
//   1) Word (theory)   2) Excel dinámico (model.xl)   3) Prompts (promptConcepts)
//   4) Modelo interactivo in-app (model.calc / conclusions.test / chart)
// El motor numérico se escribe DOS veces, a propósito:
//   - calc(v): función JS evaluada en vivo por el simulador in-app.
//   - xl:      fórmula de Excel (con tokens [clave]) para la planilla.
// Ambas deben coincidir numéricamente.
// ============================================================================

export type Fmt = 'pct' | 'pct2' | 'money' | 'num' | 'num2' | 'days' | 'x'

export interface ItemInput {
  key: string
  label: string
  value: number
  min: number
  max: number
  step: number
  unit?: string
  fmt?: Fmt
  note?: string
}

export interface ItemCalc {
  key: string
  label: string
  fmt?: Fmt
  /** evaluación en vivo (in-app). v contiene inputs + calcs previos. */
  calc: (v: Record<string, number>) => number
  /** fórmula de Excel con tokens [clave]. */
  xl: string
  note?: string
  /** destacar como resultado principal en el simulador. */
  highlight?: boolean
}

export interface ItemConclusion {
  /** in-app: si test(v) es true => good, si no => bad. */
  test: (v: Record<string, number>) => boolean
  good: string
  bad: string
  /** Excel: fórmula que devuelve el texto (usa IF/TEXT). */
  xl: string
  label?: string
}

export interface ItemChart {
  /** input que se barre en el eje X. */
  sweepKey: string
  /** calc que se grafica en el eje Y. */
  outKey: string
  points?: number
  xLabel?: string
  yLabel?: string
  yFmt?: Fmt
}

export interface ItemModel {
  inputs: ItemInput[]
  calcs: ItemCalc[]
  conclusions: ItemConclusion[]
  chart?: ItemChart
  excelTitle: string
}

export interface ItemSpec {
  id: string // p.ej. 's09-i1'
  week: number
  order: number
  title: string
  subtitle: string
  /** etiqueta de la skill / marco que aporta (para mostrar el origen). */
  framework: string
  theory: { heading: string; paragraphs: string[] }[]
  model: ItemModel
  promptConcepts: string[]
}

// Helper: evalúa el modelo completo (inputs + calcs en orden) -> mapa de valores.
export function evalModel(model: ItemModel, values: Record<string, number>): Record<string, number> {
  const v: Record<string, number> = { ...values }
  for (const c of model.calcs) {
    try {
      v[c.key] = c.calc(v)
    } catch {
      v[c.key] = NaN
    }
  }
  return v
}
