import type { ItemSpec } from './types'
import { week09 } from './week09'

// A medida que se completan, se importan y agregan acá.
const allWeeks: ItemSpec[][] = [week09]

export const allItems: ItemSpec[] = allWeeks.flat().sort((a, b) => a.week - b.week || a.order - b.order)

export const itemsByWeek: Record<number, ItemSpec[]> = allItems.reduce(
  (acc, it) => {
    ;(acc[it.week] ??= []).push(it)
    return acc
  },
  {} as Record<number, ItemSpec[]>,
)

export type { ItemSpec } from './types'
