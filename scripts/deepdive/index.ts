/* eslint-disable */
// Índice del contenido ampliado (deep dive) por semana, consumido por el
// generador de los documentos Word.
import { deepDive01 } from './semana01'
import { deepDive02 } from './semana02'
import { deepDive03 } from './semana03'
import { deepDive04 } from './semana04'
import { deepDive05 } from './semana05'
import { deepDive06 } from './semana06'
import { deepDive07 } from './semana07'
import { deepDive08 } from './semana08'
import { deepDive09 } from './semana09'
import { deepDive10 } from './semana10'
import { deepDive11 } from './semana11'
import { deepDive12 } from './semana12'

export type DeepSection = { heading: string; paragraphs: string[] }

export const deepDiveByWeek: Record<number, DeepSection[]> = {
  1: deepDive01,
  2: deepDive02,
  3: deepDive03,
  4: deepDive04,
  5: deepDive05,
  6: deepDive06,
  7: deepDive07,
  8: deepDive08,
  9: deepDive09,
  10: deepDive10,
  11: deepDive11,
  12: deepDive12,
}
