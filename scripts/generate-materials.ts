/* eslint-disable */
// ============================================================================
// Generador de materiales descargables por semana:
//   1) Word (.docx)  — teoría detallada (derivada del contenido de la lección)
//   2) Excel (.xlsx) — modelo interactivo: inputs en amarillo, cálculos,
//                      conclusiones automáticas y matrices dinámicas (LET/SEQUENCE)
//   3) Prompts (.md) — guía de prompt engineering para Gemini/ChatGPT/Claude
// Ejecutar con: npm run materials
// ============================================================================
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
} from 'docx'
import ExcelJS from 'exceljs'
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { curriculum } from '../src/data/curriculum/index'
import type { ContentBlock, Lesson } from '../src/types'
import { weekMaterials } from './materials'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const OUT = join(ROOT, 'public', 'materiales')

const GOLD = 'D4AF37'
const INK = '0B1120'
const INPUT_FILL = 'FFF3C4' // amarillo: celdas de entrada
const CALC_FILL = 'EAF1FB' // celeste suave: cálculos
const CONCL_FILL = 'E5F6EC' // verde: conclusiones
const HEAD_FILL = '111A2E'

const pad = (n: number) => String(n).padStart(2, '0')

// ---------------------------------------------------------------------------
// Inline markdown-lite -> TextRun[]  (**negrita**, *itálica*)
// ---------------------------------------------------------------------------
function runs(text: string, base: { bold?: boolean; italics?: boolean; color?: string; size?: number } = {}): TextRun[] {
  const out: TextRun[] = []
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }))
    if (m[2]) out.push(new TextRun({ text: m[2], ...base, bold: true }))
    else if (m[3]) out.push(new TextRun({ text: m[3], ...base, italics: true }))
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }))
  return out
}

function para(text: string, opts: any = {}) {
  return new Paragraph({ children: runs(text), spacing: { after: 140, line: 276 }, ...opts })
}

function blockToDocx(b: ContentBlock): Paragraph[] {
  switch (b.type) {
    case 'theory':
      return [
        ...(b.title ? [new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs(b.title), spacing: { before: 220, after: 120 } })] : []),
        ...b.body.split(/\n\n+/).map((p) => {
          if (p.split('\n').every((l) => l.trim().startsWith('- ')))
            return p.split('\n').map((l) => new Paragraph({ children: runs(l.replace(/^\s*-\s/, '')), bullet: { level: 0 }, spacing: { after: 60 } }))
          return [para(p)]
        }).flat(),
      ]
    case 'keypoints':
      return [
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(b.title), spacing: { before: 180, after: 100 } }),
        ...b.points.map((p) => new Paragraph({ children: runs(p), bullet: { level: 0 }, spacing: { after: 60 } })),
      ]
    case 'insight':
      return [shaded('IDEA CLAVE', b.body, 'E5F6EC')]
    case 'warning':
      return [shaded('ATENCIÓN', b.body, 'FBE4E4')]
    case 'formula':
      return [
        new Paragraph({ children: runs(b.name, { bold: true, color: '94741F' }), spacing: { before: 140, after: 40 } }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: b.expr, font: 'Consolas', bold: true, size: 26 })], spacing: { after: 60 } }),
        ...(b.note ? [new Paragraph({ children: runs(b.note, { italics: true, size: 19 }), spacing: { after: 120 } })] : []),
      ]
    case 'case':
      return [new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs('Caso: ' + b.title), spacing: { before: 160, after: 80 } }), ...b.body.split(/\n\n+/).map((p) => para(p))]
    case 'table':
      return [
        ...(b.title ? [new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(b.title), spacing: { before: 160, after: 80 } })] : []),
        docxTable(b.headers, b.rows),
        new Paragraph({ text: '', spacing: { after: 120 } }),
      ]
    case 'claude':
      return [
        new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs('Resolvelo con IA'), spacing: { before: 160, after: 60 } }),
        para('**Objetivo:** ' + b.goal),
        new Paragraph({ shading: { type: ShadingType.SOLID, color: 'F4F4F4', fill: 'F4F4F4' }, border: boxBorder('CCCCCC'), children: [new TextRun({ text: b.prompt, font: 'Consolas', size: 19 })], spacing: { after: 100 } }),
        ...(b.note ? [new Paragraph({ children: runs(b.note, { italics: true, size: 19 }) })] : []),
      ]
    case 'simulator':
      return [para('▶ **Simulador interactivo en la plataforma.** ' + (b.intro ?? ''))]
    default:
      return []
  }
}

function boxBorder(color: string) {
  const s = { style: BorderStyle.SINGLE, size: 6, color }
  return { top: s, bottom: s, left: s, right: s }
}
function shaded(tag: string, body: string, fill: string): Paragraph {
  return new Paragraph({
    shading: { type: ShadingType.SOLID, color: fill, fill },
    border: boxBorder('DDDDDD'),
    spacing: { before: 120, after: 120 },
    children: [new TextRun({ text: tag + ': ', bold: true }), ...runs(body)],
  })
}
function docxTable(headers: string[], rows: string[][]): Table {
  const border = { style: BorderStyle.SINGLE, size: 4, color: 'CCCCCC' }
  const borders = { top: border, bottom: border, left: border, right: border, insideHorizontal: border, insideVertical: border }
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h) => new TableCell({ shading: { type: ShadingType.SOLID, color: INK, fill: INK }, children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 18 })] })] })),
      }),
      ...rows.map((r) => new TableRow({ children: r.map((c, i) => new TableCell({ children: [new Paragraph({ children: runs(c, { size: 18 }), alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT })] })) })),
    ],
  })
}

async function buildWord(lesson: Lesson, modernIntro: string[]) {
  const children: (Paragraph | Table)[] = []
  children.push(new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'ACADEMIA DE FINANZAS CORPORATIVAS + IA', bold: true, color: GOLD, size: 20 })], spacing: { after: 60 } }))
  children.push(new Paragraph({ heading: HeadingLevel.TITLE, children: runs(`Semana ${lesson.week} · ${lesson.title}`), spacing: { after: 60 } }))
  children.push(new Paragraph({ children: runs(lesson.subtitle, { italics: true, color: '555555', size: 22 }), spacing: { after: 160 } }))

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs('Objetivos de aprendizaje') }))
  lesson.objectives.forEach((o) => children.push(new Paragraph({ children: runs(o), bullet: { level: 0 }, spacing: { after: 60 } })))

  if (modernIntro.length) {
    children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs('Enfoque y técnicas modernas'), spacing: { before: 200 } }))
    modernIntro.forEach((p) => children.push(para(p)))
  }

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs('Desarrollo conceptual'), spacing: { before: 220, after: 100 } }))
  lesson.blocks.forEach((b) => blockToDocx(b).forEach((p) => children.push(p)))

  children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs('Cómo usar el material de la semana'), spacing: { before: 240 } }))
  children.push(para('Este documento se complementa con: (1) el **Excel interactivo** de la semana —editá las celdas amarillas y observá cómo cambian los indicadores y las conclusiones—; y (2) la **guía de prompt engineering** para generar, con cualquier IA, un caso propio y su simulador. Trabajá los tres materiales en conjunto: leé la teoría, modelá en el Excel con tus números y profundizá con la IA.'))

  const doc = new Document({
    styles: {
      default: { document: { run: { font: 'Calibri', size: 22 } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', run: { size: 40, bold: true, color: INK } },
        { id: 'Heading2', name: 'Heading 2', run: { size: 28, bold: true, color: '94741F' }, paragraph: { spacing: { before: 200, after: 100 } } },
        { id: 'Heading3', name: 'Heading 3', run: { size: 24, bold: true, color: INK } },
      ],
    },
    sections: [{ properties: {}, children }],
  })
  return Packer.toBuffer(doc)
}

// ---------------------------------------------------------------------------
// Excel
// ---------------------------------------------------------------------------
const MODERN = ['LET', 'LAMBDA', 'SEQUENCE', 'IFS', 'SWITCH', 'TEXTJOIN', 'XLOOKUP', 'FILTER', 'SORT', 'UNIQUE', 'SCAN', 'MAP', 'BYROW', 'TOROW']
function modernPrefix(formula: string): string {
  let f = formula
  for (const fn of MODERN) f = f.replace(new RegExp(`(?<!_xlfn\\.)\\b${fn}\\(`, 'g'), `_xlfn.${fn}(`)
  return f
}
function fmtCode(fmt?: string): string | undefined {
  switch (fmt) {
    case 'pct': return '0.0%'
    case 'pct2': return '0.00%'
    case 'money': return '#,##0'
    case 'num': return '#,##0'
    case 'num2': return '#,##0.00'
    case 'days': return '0 "días"'
    case 'x': return '0.00"x"'
    default: return undefined
  }
}

async function buildExcel(lesson: Lesson, mat: (typeof weekMaterials)[number]) {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Academia de Finanzas Corporativas + IA'
  const ws = wb.addWorksheet(`Semana ${lesson.week}`, { views: [{ showGridLines: false }] })
  ws.columns = [{ width: 42 }, { width: 16 }, { width: 14 }, { width: 52 }]

  const map: Record<string, string> = {}
  let r = 1

  // Título
  ws.mergeCells(r, 1, r, 4)
  const t = ws.getCell(r, 1)
  t.value = `MODELO INTERACTIVO · Semana ${lesson.week} — ${mat.excel.sheetTitle}`
  t.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } }
  t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + INK } }
  t.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
  ws.getRow(r).height = 26
  r += 1

  // Leyenda
  ws.mergeCells(r, 1, r, 4)
  const leg = ws.getCell(r, 1)
  leg.value = 'Editá SOLO las celdas amarillas (entradas). Los cálculos y las conclusiones se actualizan solos.'
  leg.font = { italic: true, size: 10, color: { argb: 'FF555555' } }
  r += 2

  const sectionHeader = (label: string) => {
    ws.mergeCells(r, 1, r, 4)
    const c = ws.getCell(r, 1)
    c.value = label
    c.font = { bold: true, size: 11, color: { argb: 'FF' + GOLD } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + HEAD_FILL } }
    c.alignment = { indent: 1 }
    ws.getRow(r).height = 20
    r += 1
  }

  // Inputs
  sectionHeader('1) DATOS DE ENTRADA  (celdas amarillas)')
  for (const inp of mat.excel.inputs) {
    ws.getCell(r, 1).value = inp.label
    ws.getCell(r, 1).font = { size: 11 }
    const cell = ws.getCell(r, 2)
    cell.value = inp.value
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + INPUT_FILL } }
    cell.font = { bold: true, size: 11 }
    cell.border = { top: { style: 'thin', color: { argb: 'FFBFA12A' } }, bottom: { style: 'thin', color: { argb: 'FFBFA12A' } }, left: { style: 'thin', color: { argb: 'FFBFA12A' } }, right: { style: 'thin', color: { argb: 'FFBFA12A' } } }
    const fc = fmtCode(inp.fmt)
    if (fc) cell.numFmt = fc
    if (inp.unit) ws.getCell(r, 3).value = inp.unit
    if (inp.note) { ws.getCell(r, 4).value = inp.note; ws.getCell(r, 4).font = { size: 9, color: { argb: 'FF777777' }, italic: true } }
    map[inp.key] = `B${r}`
    r += 1
  }
  r += 1

  // Cálculos
  sectionHeader('2) CÁLCULOS E INDICADORES')
  const calcStart = r
  for (const c of mat.excel.calcs) map[c.key] = `B${calcStart + mat.excel.calcs.indexOf(c)}`
  for (const c of mat.excel.calcs) {
    ws.getCell(r, 1).value = c.label
    ws.getCell(r, 1).font = { size: 11 }
    const cell = ws.getCell(r, 2)
    cell.value = { formula: modernPrefix(resolve(c.formula, map)) } as any
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + CALC_FILL } }
    cell.font = { bold: true, size: 11, color: { argb: 'FF1A2740' } }
    const fc = fmtCode(c.fmt)
    if (fc) cell.numFmt = fc
    if (c.unit) ws.getCell(r, 3).value = c.unit
    if (c.note) { ws.getCell(r, 4).value = c.note; ws.getCell(r, 4).font = { size: 9, color: { argb: 'FF777777' }, italic: true } }
    r += 1
  }
  r += 1

  // Dinámico
  if (mat.excel.dynamic) {
    const d = mat.excel.dynamic
    sectionHeader('3) ' + d.title + '  (matriz dinámica · si no ves valores, presioná F9)')
    if (d.note) { ws.mergeCells(r, 1, r, 4); const n = ws.getCell(r, 1); n.value = d.note; n.font = { italic: true, size: 9, color: { argb: 'FF777777' } }; r += 1 }
    // headers
    d.columns.forEach((h, i) => { const c = ws.getCell(r, 1 + i); c.value = h; c.font = { bold: true, size: 10, color: { argb: 'FFFFFFFF' } }; c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF243453' } } })
    r += 1
    d.spillFormulas.forEach((f, i) => {
      const cell = ws.getCell(r, 1 + i)
      cell.value = { formula: modernPrefix(resolve(f, map)) } as any
      const fc = fmtCode(d.formats?.[i])
      if (fc) cell.numFmt = fc
      cell.font = { size: 10 }
    })
    r += Math.max(1, d.spillRows ?? 8) + 1
  }

  // Conclusiones
  sectionHeader((mat.excel.dynamic ? '4' : '3') + ') CONCLUSIONES AUTOMÁTICAS')
  for (const cc of mat.excel.conclusions) {
    if (cc.label) { ws.getCell(r, 1).value = cc.label; ws.getCell(r, 1).font = { bold: true, size: 11 } }
    ws.mergeCells(r, cc.label ? 2 : 1, r, 4)
    const cell = ws.getCell(r, cc.label ? 2 : 1)
    cell.value = { formula: modernPrefix(resolve(cc.formula, map)) } as any
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + CONCL_FILL } }
    cell.font = { size: 11, color: { argb: 'FF0B5132' } }
    cell.alignment = { wrapText: true, vertical: 'middle', indent: 1 }
    ws.getRow(r).height = 30
    r += 1
  }

  return wb.xlsx.writeBuffer()
}

function resolve(formula: string, map: Record<string, string>): string {
  return formula.replace(/\[(\w+)\]/g, (_, k) => {
    if (!map[k]) throw new Error(`Token [${k}] sin dirección en el modelo`)
    return map[k]
  })
}

// ---------------------------------------------------------------------------
// Prompts (.md)
// ---------------------------------------------------------------------------
function buildPrompt(lesson: Lesson, mat: (typeof weekMaterials)[number]): string {
  const concepts = mat.promptConcepts.map((c) => `- ${c}`).join('\n')
  return `# Guía de Prompt Engineering — Semana ${lesson.week}
## ${lesson.title}

Esta guía te da prompts listos para usar con **cualquier modelo** (Gemini, ChatGPT o Claude) y generar:
1. Un **caso práctico** original de los conceptos de la semana.
2. Un **simulador** (en Excel o en código) que resuelva ese caso.

> Reemplazá los textos entre \`<corchetes>\` por los datos de tu empresa. Cuanto más contexto le des al modelo, mejor el resultado.

---

## Conceptos que debe cubrir esta semana
${concepts}

---

## PROMPT 1 — Generar el caso práctico

\`\`\`
Actuá como profesor de finanzas corporativas avanzadas y consultor de CFOs. Quiero que generes un CASO PRÁCTICO original y realista sobre los siguientes conceptos: ${mat.promptConcepts.join('; ')}.

Contexto de mi empresa:
- Sector: <sector>
- Tamaño (ventas anuales): <ventas>
- País / moneda: <país>
- Situación actual: <describí el problema o la decisión>

El caso debe:
1. Plantear una situación de negocio concreta con números coherentes (balance y estado de resultados simplificados).
2. Esconder, como en la realidad, la diferencia entre la información contable de presentación y la verdadera información de gestión.
3. Terminar con 4 preguntas de decisión que un CEO debería poder responder con los conceptos de la semana.
No resuelvas todavía: primero mostrame el caso y los datos.
\`\`\`

## PROMPT 2 — Resolver y explicar el caso

\`\`\`
Perfecto. Ahora resolvé el caso paso a paso, mostrando todas las fórmulas y el razonamiento. Para cada indicador (${mat.promptConcepts.slice(0, 4).join(', ')}...):
1. Definí el concepto en una frase.
2. Mostrá la fórmula.
3. Calculá con los números del caso.
4. Interpretá el resultado para la toma de decisiones.
Cerrá con un diagnóstico: ¿se está creando o destruyendo valor? ¿qué 3 acciones concretas recomendarías?
\`\`\`

## PROMPT 3 — Construir el simulador en Excel (matrices dinámicas)

\`\`\`
Ahora quiero un SIMULADOR en Excel para este caso. Devolvémelo como una tabla con:
- Una sección de ENTRADAS claramente marcadas (las que yo voy a editar).
- Una sección de CÁLCULOS con las fórmulas de Excel EXACTAS, usando funciones modernas de matrices dinámicas (LET, SEQUENCE y, si aplica, LAMBDA/SCAN) en lugar de arrastrar fórmulas.
- Una sección de CONCLUSIONES con fórmulas tipo SI() que devuelvan texto interpretando los indicadores.
Mostrame, celda por celda (A1, B1, ...), qué fórmula va en cada una. Indicá qué celdas pintar de amarillo (entradas) y cuáles de verde (conclusiones).
\`\`\`

## PROMPT 4 — Construir el simulador como app (opcional, para devs)

\`\`\`
Convertí el simulador anterior en un componente web. Usá <React + TypeScript / el stack que prefieras>. Requisitos:
- Inputs con sliders y campos numéricos para cada entrada.
- Cálculo reactivo de todos los indicadores.
- Un veredicto visual (verde/rojo) según se cree o destruya valor.
- Un gráfico que muestre la sensibilidad del indicador clave ante el cambio de una variable.
Entregá el código completo y autocontenido.
\`\`\`

## PROMPT 5 — Verificación crítica (anti-alucinación)

\`\`\`
Revisá tu propia solución como si fueras un auditor escéptico. Para cada cálculo:
- ¿La fórmula es correcta y la unidad coherente?
- ¿Algún número no cierra con la identidad contable (Activo = Pasivo + PN) o con el flujo de caja?
- ¿Qué supuesto, si cambiara, daría vuelta la conclusión?
Listá los errores o riesgos que encuentres y corregilos.
\`\`\`

---

### Consejos de prompting
- **Dale rol y contexto:** “actuá como CFO/consultor”, más el sector y tamaño de tu empresa.
- **Pedí las fórmulas, no solo el número:** así podés auditar y aprender.
- **Iterá:** si algo no cierra, pegale el error y pedile que lo corrija (Prompt 5).
- **Cuidado con los datos sensibles:** anonimizá cifras si usás un modelo público.
`
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const index: { week: number; slug: string; title: string; word: string; excel: string; prompt: string }[] = []
  for (const lesson of curriculum.filter((l) => l.week >= 1 && l.week <= 12)) {
    const mat = weekMaterials.find((m) => m.week === lesson.week)
    if (!mat) { console.warn(`Sin material para semana ${lesson.week}`); continue }
    const dir = join(OUT, `semana-${pad(lesson.week)}`)
    mkdirSync(dir, { recursive: true })

    const wordBuf = await buildWord(lesson, mat.modernIntro)
    const excelBuf = await buildExcel(lesson, mat)
    const promptStr = buildPrompt(lesson, mat)

    const wordName = `Semana-${pad(lesson.week)}-Teoria.docx`
    const excelName = `Semana-${pad(lesson.week)}-Modelo.xlsx`
    const promptName = `Semana-${pad(lesson.week)}-Prompts.md`

    writeFileSync(join(dir, wordName), wordBuf as Buffer)
    writeFileSync(join(dir, excelName), Buffer.from(excelBuf as ArrayBuffer))
    writeFileSync(join(dir, promptName), promptStr, 'utf8')

    index.push({
      week: lesson.week,
      slug: `semana-${pad(lesson.week)}`,
      title: lesson.title,
      word: `/materiales/semana-${pad(lesson.week)}/${wordName}`,
      excel: `/materiales/semana-${pad(lesson.week)}/${excelName}`,
      prompt: `/materiales/semana-${pad(lesson.week)}/${promptName}`,
    })
    console.log(`✓ Semana ${pad(lesson.week)} — Word, Excel y Prompts generados`)
  }
  writeFileSync(join(ROOT, 'src', 'data', 'materialsIndex.json'), JSON.stringify(index, null, 2), 'utf8')
  console.log(`\n✔ ${index.length} semanas. Índice en src/data/materialsIndex.json`)
}

main().catch((e) => { console.error(e); process.exit(1) })
