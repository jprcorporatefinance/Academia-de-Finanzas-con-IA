// Acceso tipado a los datos de la Maestría para la app (generados por
// `npm run maestria`). No incluye la prosa completa (esa vive en los PDF).
import quizzesRaw from './quizzes.json'
import materialsRaw from './materialsIndex.json'

export interface AppQuizQ {
  id: string
  pregunta: string
  opciones: string[]
  correcta: number
  justificacion: string
}

export interface AppAsignatura {
  cod: string
  slug: string
  cuatrimestre: number
  fase: string
  nombre: string
  horas: string
  framework: string
  resumen: string
  objetivos: string[]
  caso: { titulo: string; empresa: string; consigna: string[] }
  quiz: AppQuizQ[]
}

export interface AppMaterial {
  cod: string
  slug: string
  cuatrimestre: number
  nombre: string
  fase: string
  horas: string
  resumen: string
  pdf: string
  caso: string
  cuestionario: string
  quiz: string
  preguntas: number
}

export const maestriaAsignaturas = quizzesRaw as AppAsignatura[]
export const maestriaMaterials = materialsRaw as AppMaterial[]

export const asignaturaByCod = (cod: string) => maestriaAsignaturas.find((a) => a.cod === cod)
export const materialByCod = (cod: string) => maestriaMaterials.find((m) => m.cod === cod)

export const CUATRIMESTRES: { n: number; titulo: string; fase: string }[] = [
  { n: 1, titulo: 'Primer cuatrimestre', fase: 'Descriptiva · ¿Qué sucedió?' },
  { n: 2, titulo: 'Segundo cuatrimestre', fase: 'Diagnóstica · ¿Por qué sucedió?' },
  { n: 3, titulo: 'Tercer cuatrimestre', fase: 'Predictiva · ¿Qué es probable que ocurra?' },
  { n: 4, titulo: 'Cuarto cuatrimestre', fase: 'Prescriptiva · ¿Qué debemos hacer?' },
]

export const MAX_INTENTOS = 3
