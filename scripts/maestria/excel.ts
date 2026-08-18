/* eslint-disable */
// ============================================================================
// Generador de Excel dinámico (exceljs) — matrices dinámicas, marca JPR.
// Entradas en marfil/verde, cálculos, tablas derramadas (spill) y conclusiones.
// ============================================================================
import ExcelJS from 'exceljs'
import { C } from './brand'
import type { Asignatura, ExcelModel, Fmt } from '../../src/data/maestria/types'

// Funciones modernas que exigen prefijo _xlfn. para escribirse en el XML.
const MODERN = [
  'LET', 'LAMBDA', 'SEQUENCE', 'MAKEARRAY', 'SCAN', 'REDUCE', 'MAP', 'BYROW', 'BYCOL',
  'HSTACK', 'VSTACK', 'TAKE', 'DROP', 'EXPAND', 'TOROW', 'TOCOL', 'CHOOSEROWS', 'CHOOSECOLS',
  'XLOOKUP', 'XMATCH', 'IFS', 'SWITCH', 'TEXTJOIN',
  'TEXTSPLIT', 'TEXTBEFORE', 'TEXTAFTER', 'NORM.S.DIST', 'NORM.DIST', 'NORM.S.INV',
]
// FILTER/SORT/SORTBY/UNIQUE viven en el sub-espacio _xlws (worksheet-only).
const XLWS = ['FILTER', 'SORT', 'SORTBY', 'UNIQUE']
function modernPrefix(formula: string): string {
  let f = formula
  for (const fn of XLWS) {
    f = f.replace(new RegExp(`(?<!_xlfn\\._xlws\\.)\\b${fn}\\(`, 'g'), `_xlfn._xlws.${fn}(`)
  }
  for (const fn of MODERN) {
    const esc = fn.replace(/\./g, '\\.')
    // no volver a prefijar lo ya prefijado (_xlfn. o _xlfn._xlws.)
    f = f.replace(new RegExp(`(?<!_xlfn\\.)(?<!_xlws\\.)\\b${esc}\\(`, 'g'), `_xlfn.${fn}(`)
  }
  return f
}
function fmtCode(fmt?: Fmt): string | undefined {
  switch (fmt) {
    case 'pct': return '0%'
    case 'pct1': return '0.0%'
    case 'pct2': return '0.00%'
    case 'money': return '#,##0'
    case 'money2': return '#,##0.00'
    case 'num': return '#,##0'
    case 'num2': return '#,##0.00'
    case 'days': return '0 "días"'
    case 'x': return '0.00"x"'
    case 'coef': return '0.0000'
    default: return undefined
  }
}
const A = (hex: string) => 'FF' + hex

function resolve(formula: string, map: Record<string, string>): string {
  return formula.replace(/\[(\w+)\]/g, (_, k) => {
    if (!map[k]) throw new Error(`Token [${k}] sin dirección en el modelo`)
    return map[k]
  })
}

// exceljs espera la fórmula SIN el '=' inicial. Los autores escriben `xl: '=...'`.
function fx(xl: string, map: Record<string, string>): string {
  return modernPrefix(resolve(xl, map)).replace(/^=/, '')
}

export async function buildExcel(a: Asignatura): Promise<Buffer> {
  const m: ExcelModel = a.model
  const wb = new ExcelJS.Workbook()
  wb.creator = 'JPR Consulting · Maestría FC+IA · UNNE'
  wb.title = `Asignatura ${a.cod} — ${m.sheetTitle}`
  const ws = wb.addWorksheet(`Asig ${a.cod}`, { views: [{ showGridLines: false }], properties: { defaultRowHeight: 16 } })
  ws.columns = [{ width: 46 }, { width: 18 }, { width: 14 }, { width: 58 }]

  const map: Record<string, string> = {}
  let r = 1

  // Título
  ws.mergeCells(r, 1, r, 4)
  const t = ws.getCell(r, 1)
  t.value = `JPR CONSULTING · ASIGNATURA ${a.cod} — ${m.sheetTitle}`
  t.font = { name: 'IBM Plex Sans', bold: true, size: 13, color: { argb: A(C.ivory) } }
  t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(C.bg) } }
  t.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  ws.getRow(r).height = 28
  r += 1

  // Leyenda
  ws.mergeCells(r, 1, r, 4)
  const leg = ws.getCell(r, 1)
  leg.value = m.intro || 'Editá SOLO las celdas de ENTRADA (fondo marfil). Todo lo demás se recalcula solo. Modelo con matrices dinámicas: no se arrastran fórmulas.'
  leg.font = { name: 'IBM Plex Sans', italic: true, size: 9.5, color: { argb: A(C.ash) } }
  leg.alignment = { wrapText: true, vertical: 'middle' }
  ws.getRow(r).height = 26
  r += 2

  const sectionHeader = (label: string) => {
    ws.mergeCells(r, 1, r, 4)
    const c = ws.getCell(r, 1)
    c.value = label
    c.font = { name: 'IBM Plex Mono', bold: true, size: 10.5, color: { argb: A(C.greenS) } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(C.green) } }
    c.alignment = { indent: 1, vertical: 'middle' }
    ws.getRow(r).height = 22
    r += 1
  }

  // 1) Entradas
  sectionHeader('1 · DATOS DE ENTRADA  (celdas marfil — editá acá)')
  for (const inp of m.inputs) {
    ws.getCell(r, 1).value = inp.label
    ws.getCell(r, 1).font = { name: 'IBM Plex Sans', size: 10.5 }
    const cell = ws.getCell(r, 2)
    cell.value = inp.value as any
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(C.ivory) } }
    cell.font = { name: 'IBM Plex Sans', bold: true, size: 10.5, color: { argb: A(C.ink) } }
    const bord = { style: 'thin' as const, color: { argb: A(C.greenB) } }
    cell.border = { top: bord, bottom: bord, left: bord, right: bord }
    const fc = fmtCode(inp.fmt)
    if (fc) cell.numFmt = fc
    if (inp.unit) { ws.getCell(r, 3).value = inp.unit; ws.getCell(r, 3).font = { name: 'IBM Plex Sans', size: 9, color: { argb: A(C.ash) } } }
    if (inp.note) { ws.getCell(r, 4).value = inp.note; ws.getCell(r, 4).font = { name: 'IBM Plex Sans', size: 9, italic: true, color: { argb: A(C.ash2) } } }
    map[inp.key] = `B${r}`
    r += 1
  }
  r += 1

  // 2) Cálculos
  sectionHeader('2 · CÁLCULOS E INDICADORES')
  const calcStart = r
  m.calcs.forEach((c, k) => (map[c.key] = `B${calcStart + k}`))
  for (const c of m.calcs) {
    ws.getCell(r, 1).value = c.label
    ws.getCell(r, 1).font = { name: 'IBM Plex Sans', size: 10.5, bold: c.highlight }
    const cell = ws.getCell(r, 2)
    cell.value = { formula: fx(c.xl, map) } as any
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(c.highlight ? C.greenBg : C.paper) } }
    cell.font = { name: 'IBM Plex Sans', bold: true, size: 10.5, color: { argb: A(c.highlight ? C.greenD : C.ink2) } }
    if (c.highlight) {
      const bb = { style: 'thin' as const, color: { argb: A(C.greenB) } }
      cell.border = { top: bb, bottom: bb, left: bb, right: bb }
    }
    const fc = fmtCode(c.fmt)
    if (fc) cell.numFmt = fc
    if (c.note) { ws.getCell(r, 4).value = c.note; ws.getCell(r, 4).font = { name: 'IBM Plex Sans', size: 9, italic: true, color: { argb: A(C.ash2) } } }
    r += 1
  }
  r += 1

  // 3) Tablas dinámicas (spill)
  let idx = 3
  for (const sp of m.spills || []) {
    sectionHeader(`${idx} · ${sp.title}  (matriz dinámica · una fórmula derrama toda la tabla)`)
    idx += 1
    if (sp.note) {
      ws.mergeCells(r, 1, r, 4)
      const n = ws.getCell(r, 1)
      n.value = sp.note
      n.font = { name: 'IBM Plex Sans', italic: true, size: 9, color: { argb: A(C.ash2) } }
      n.alignment = { wrapText: true, vertical: 'middle' }
      ws.getRow(r).height = 24
      r += 1
    }
    // encabezados
    sp.columns.forEach((h, i) => {
      const c = ws.getCell(r, 1 + i)
      c.value = h
      c.font = { name: 'IBM Plex Sans', bold: true, size: 9.5, color: { argb: A(C.ivory) } }
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(C.greenD) } }
      c.alignment = { vertical: 'middle', wrapText: true }
    })
    ws.getRow(r).height = 20
    r += 1
    // fórmula derramada en la esquina superior izquierda
    const cell = ws.getCell(r, 1)
    cell.value = { formula: fx(sp.xl, map) } as any
    map[sp.key] = `A${r}#` // referencia al rango derramado (spill)
    // formatos por columna (aplicados a un bloque razonable de filas)
    const depth = Math.max(1, sp.rows ?? 10)
    for (let rowoff = 0; rowoff < depth; rowoff++) {
      sp.columns.forEach((_, i) => {
        const cc = ws.getCell(r + rowoff, 1 + i)
        const fc = fmtCode(sp.formats?.[i])
        if (fc) cc.numFmt = fc
        cc.font = { name: i === 0 ? 'IBM Plex Sans' : 'IBM Plex Mono', size: 9.5, color: { argb: A(C.ink2) } }
      })
    }
    r += depth + 1
  }

  // 4) Conclusiones
  sectionHeader(`${idx} · CONCLUSIONES AUTOMÁTICAS`)
  for (const cc of m.conclusions) {
    if (cc.label) { ws.getCell(r, 1).value = cc.label; ws.getCell(r, 1).font = { name: 'IBM Plex Sans', bold: true, size: 10.5, color: { argb: A(C.ink) } } }
    ws.mergeCells(r, cc.label ? 2 : 1, r, 4)
    const cell = ws.getCell(r, cc.label ? 2 : 1)
    cell.value = { formula: fx(cc.xl, map) } as any
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: A(C.greenBg) } }
    cell.font = { name: 'IBM Plex Sans', size: 10.5, color: { argb: A(C.greenD) } }
    cell.alignment = { wrapText: true, vertical: 'middle', indent: 1 }
    ws.getRow(r).height = 34
    r += 1
  }

  // Pie de marca
  r += 1
  ws.mergeCells(r, 1, r, 4)
  const foot = ws.getCell(r, 1)
  foot.value = `JPR Consulting · Maestría en Finanzas Corporativas Aplicadas con IA · UNNE — Asignatura ${a.cod}`
  foot.font = { name: 'IBM Plex Mono', size: 8.5, color: { argb: A(C.ash2) } }

  const buf = await wb.xlsx.writeBuffer()
  return Buffer.from(buf as ArrayBuffer)
}
