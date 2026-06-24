import type { ItemSpec } from './types'
import { week01 } from './week01'
import { week02 } from './week02'
import { week03 } from './week03'
import { week04 } from './week04'
import { week05 } from './week05'
import { week06 } from './week06'
import { week07 } from './week07'
import { week08 } from './week08'
import { week09 } from './week09'
import { week10 } from './week10'
import { week11 } from './week11'
import { week12 } from './week12'

const allWeeks: ItemSpec[][] = [
  week01, week02, week03, week04, week05, week06,
  week07, week08, week09, week10, week11, week12,
]

export const allItems: ItemSpec[] = allWeeks.flat().sort((a, b) => a.week - b.week || a.order - b.order)

export const itemsByWeek: Record<number, ItemSpec[]> = allItems.reduce(
  (acc, it) => {
    ;(acc[it.week] ??= []).push(it)
    return acc
  },
  {} as Record<number, ItemSpec[]>,
)

export type { ItemSpec } from './types'
