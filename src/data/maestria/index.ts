import type { Asignatura } from './types'
import { a1_1 } from './a1_1'
import { a1_2 } from './a1_2'
import { a1_3 } from './a1_3'
import { a1_4 } from './a1_4'
import { a2_1 } from './a2_1'
import { a2_2 } from './a2_2'
import { a2_3 } from './a2_3'
import { a2_4 } from './a2_4'
import { a3_1 } from './a3_1'
import { a3_2 } from './a3_2'
import { a3_3 } from './a3_3'
import { a3_4 } from './a3_4'
import { a4_1 } from './a4_1'
import { a4_2 } from './a4_2'
import { a4_3 } from './a4_3'
import { a4_4 } from './a4_4'

// Registro completo de las 16 asignaturas de la Maestría (cuatrimestres 1–4).
export const asignaturas: Asignatura[] = [
  a1_1, a1_2, a1_3, a1_4,
  a2_1, a2_2, a2_3, a2_4,
  a3_1, a3_2, a3_3, a3_4,
  a4_1, a4_2, a4_3, a4_4,
]

export type { Asignatura }
