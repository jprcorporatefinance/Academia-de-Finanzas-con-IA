/* eslint-disable */
// ============================================================================
// Generador de PDF didáctico con identidad JPR Consulting (pdfmake / PdfPrinter)
// ============================================================================
import PdfPrinter from 'pdfmake/src/printer'
import { C, H, fonts, BRAND } from './brand'
import type { Asignatura, Block, Section, QuizQ } from '../../src/data/maestria/types'

const printer = new PdfPrinter(fonts as any)

// ---------------------------------------------------------------------------
// Markdown-lite inline -> runs de pdfmake  (**negrita**, *itálica*, `código`)
// ---------------------------------------------------------------------------
function inline(md: string, base: any = {}): any[] {
  const out: any[] = []
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(md)) !== null) {
    if (m.index > last) out.push({ text: md.slice(last, m.index), ...base })
    if (m[2]) out.push({ text: m[2], bold: true, ...base })
    else if (m[3]) out.push({ text: m[3], italics: true, ...base })
    else if (m[4]) out.push({ text: m[4], font: 'Mono', color: H('greenD'), fontSize: (base.fontSize ?? 10.5) - 0.5 })
    last = m.index + m[0].length
  }
  if (last < md.length) out.push({ text: md.slice(last), ...base })
  return out
}

const isNum = (s: string) => /^[\s]*[-−+]?[\d.,]+\s*%?\s*$|^[\s]*[-−]?\$?[\d.,]+/.test(s.replace(/\*/g, ''))

// ---------------------------------------------------------------------------
// Layouts de tabla
// ---------------------------------------------------------------------------
const dataTableLayout = {
  hLineWidth: (i: number, node: any) => (i === 0 || i === 1 || i === node.table.body.length ? 0.8 : 0.5),
  vLineWidth: () => 0,
  hLineColor: (i: number) => (i <= 1 ? H('green') : H('lineL')),
  paddingTop: () => 5,
  paddingBottom: () => 5,
  paddingLeft: () => 8,
  paddingRight: () => 8,
  fillColor: (rowIndex: number) => (rowIndex === 0 ? H('green') : rowIndex % 2 === 0 ? H('paper') : null),
}

function calloutBox(accent: keyof typeof C, bg: keyof typeof C, stack: any[]): any {
  return {
    table: { widths: ['*'], body: [[{ stack, margin: [10, 8, 10, 8] }]] },
    layout: {
      hLineWidth: () => 0,
      vLineWidth: (i: number) => (i === 0 ? 3 : 0),
      vLineColor: () => H(accent),
      fillColor: () => H(bg),
    },
    margin: [0, 6, 0, 8],
  }
}

// ---------------------------------------------------------------------------
// Bloques -> contenido pdfmake
// ---------------------------------------------------------------------------
function blockNode(b: Block): any[] {
  switch (b.t) {
    case 'p':
      return [{ text: inline(b.md), style: 'p' }]
    case 'h':
      return [{ text: b.text, style: 'h3' }]
    case 'ul':
      return [{ ul: b.items.map((i) => ({ text: inline(i) })), style: 'list', markerColor: H('greenB') }]
    case 'ol':
      return [{ ol: b.items.map((i) => ({ text: inline(i) })), style: 'list', markerColor: H('greenB') }]
    case 'formula':
      return [
        {
          table: {
            widths: ['*'],
            body: [[{
              stack: [
                { text: b.name.toUpperCase(), font: 'Mono', fontSize: 8, color: H('greenD'), characterSpacing: 1, margin: [0, 0, 0, 4] },
                { text: b.expr, font: 'Mono', fontSize: 12, color: H('ink'), alignment: 'center', margin: [0, 2, 0, b.where || b.note ? 6 : 0] },
                ...(b.where ? [{ text: inline(b.where, { fontSize: 8.5, color: H('ash') }), alignment: 'center' }] : []),
                ...(b.note ? [{ text: inline(b.note, { fontSize: 9, italics: true, color: H('ash') }), margin: [0, 4, 0, 0] }] : []),
              ],
              margin: [12, 10, 12, 10],
            }]],
          },
          layout: {
            hLineWidth: () => 0.8,
            vLineWidth: (i: number) => (i === 0 ? 3 : 0.8),
            hLineColor: () => H('lineL'),
            vLineColor: (i: number) => (i === 0 ? H('green') : H('lineL')),
            fillColor: () => H('white'),
          },
          margin: [0, 8, 0, 10],
        },
      ]
    case 'idea':
      return [calloutBox('green', 'greenBg', [{ text: [{ text: 'IDEA CLAVE  ', bold: true, color: H('greenD'), font: 'PlexSemi', fontSize: 8.5, characterSpacing: 0.5 }, ...inline(b.md)] }])]
    case 'warn':
      return [calloutBox('amber', 'amberBg', [{ text: [{ text: 'ATENCIÓN  ', bold: true, color: H('amber'), font: 'PlexSemi', fontSize: 8.5, characterSpacing: 0.5 }, ...inline(b.md)] }])]
    case 'quote':
      return [
        calloutBox('greenB', 'paper', [
          { text: inline(b.md, { italics: true, fontSize: 10.5, color: H('ink2') }) },
          { text: [{ text: '— ' + b.author + '. ', bold: true, color: H('greenD'), fontSize: 9 }, { text: b.credential + (b.source ? '. ' + b.source : ''), color: H('ash'), fontSize: 8.5, italics: true }], margin: [0, 5, 0, 0] },
        ]),
      ]
    case 'chain': {
      const cells: any[] = []
      b.nodes.forEach((n, i) => {
        cells.push({
          table: { widths: ['*'], body: [[{ text: inline(n), alignment: 'center', fontSize: 9, color: H('ink'), margin: [4, 6, 4, 6] }]] },
          layout: { hLineWidth: () => 0.8, vLineWidth: () => 0.8, hLineColor: () => H('greenB'), vLineColor: () => H('greenB'), fillColor: () => H('white') },
        })
        if (i < b.nodes.length - 1) cells.push({ text: '→', font: 'Mono', color: H('greenB'), alignment: 'center', margin: [0, 10, 0, 0], width: 16 })
      })
      const widths = b.nodes.flatMap((_, i) => (i < b.nodes.length - 1 ? ['*', 16] : ['*']))
      return [
        ...(b.title ? [{ text: b.title, style: 'h3' }] : []),
        { columns: cells, columnGap: 0, margin: [0, 4, 0, b.caption ? 3 : 10] },
        ...(b.caption ? [{ text: inline(b.caption, { fontSize: 8.5, italics: true, color: H('ash') }), margin: [0, 0, 0, 10] }] : []),
      ]
    }
    case 'steps':
      return [
        ...(b.title ? [{ text: b.title, style: 'h3' }] : []),
        {
          table: {
            widths: [22, '*'],
            body: b.items.map((it, i) => [
              { text: String(i + 1), font: 'Mono', color: H('green'), bold: true, alignment: 'center', fontSize: 11, margin: [0, 4, 0, 0] },
              { stack: [{ text: it.k, bold: true, color: H('ink'), font: 'PlexSemi', fontSize: 10 }, { text: inline(it.d, { fontSize: 9.5, color: H('ink2') }), margin: [0, 1, 0, 0] }], margin: [2, 2, 0, 2] },
            ]),
          },
          layout: {
            hLineWidth: (i: number, node: any) => (i === 0 || i === node.table.body.length ? 0 : 0.5),
            vLineWidth: () => 0,
            hLineColor: () => H('lineL'),
            paddingTop: () => 4, paddingBottom: () => 4, paddingLeft: () => 4, paddingRight: () => 4,
          },
          margin: [0, 2, 0, 10],
        },
      ]
    case 'table':
      return [
        ...(b.title ? [{ text: b.title, style: 'h3' }] : []),
        {
          table: {
            headerRows: 1,
            widths: b.headers.map((_, i) => (i === 0 ? '*' : 'auto')),
            body: [
              b.headers.map((h) => ({ text: h, color: H('white'), font: 'PlexSemi', fontSize: 9, margin: [0, 1, 0, 1] })),
              ...b.rows.map((r) =>
                r.map((c, i) => ({
                  text: inline(c, { fontSize: 9 }),
                  alignment: i > 0 && !b.firstColLeft && isNum(c) ? 'right' : 'left',
                  font: i > 0 && isNum(c) ? 'Mono' : 'Plex',
                  color: H('ink2'),
                })),
              ),
            ],
          },
          layout: dataTableLayout,
          margin: [0, 4, 0, b.caption ? 3 : 12],
        },
        ...(b.caption ? [{ text: inline(b.caption, { fontSize: 8.5, italics: true, color: H('ash') }), margin: [0, 0, 0, 12] }] : []),
      ]
  }
  return []
}

function sectionNodes(s: Section, n: number): any[] {
  const out: any[] = [
    {
      stack: [
        { canvas: [{ type: 'rect', x: 0, y: 0, w: 26, h: 2.4, color: H('green') }], margin: [0, 0, 0, 6] },
        { text: [{ text: String(n).padStart(2, '0') + '  ', font: 'Mono', color: H('greenB'), fontSize: 15 }, { text: s.title, font: 'Spectral', bold: true, color: H('ink'), fontSize: 16 }] },
      ],
      margin: [0, 14, 0, s.intro ? 4 : 8],
      // no rompas el título de su primer bloque
    },
  ]
  if (s.intro) out.push({ text: inline(s.intro, { color: H('ash'), fontSize: 10.5 }), margin: [0, 0, 0, 8] })
  s.blocks.forEach((b) => blockNode(b).forEach((x) => out.push(x)))
  return out
}

// ---------------------------------------------------------------------------
// Portada + documento didáctico
// ---------------------------------------------------------------------------
function cover(a: Asignatura): any[] {
  return [
    { text: BRAND.firm + '  ·  ' + a.framework, font: 'Mono', color: H('greenS'), fontSize: 9, characterSpacing: 2, margin: [0, 40, 0, 0] },
    { canvas: [{ type: 'rect', x: 0, y: 0, w: 30, h: 2.5, color: H('greenS') }], margin: [0, 18, 0, 18] },
    { text: 'Asignatura ' + a.cod, font: 'Mono', color: H('greenL'), fontSize: 12, margin: [0, 0, 0, 8] },
    { text: a.nombre, font: 'Spectral', bold: true, color: H('ivory'), fontSize: 30, lineHeight: 1.05, margin: [0, 0, 0, 16] },
    { text: a.resumen, font: 'Spectral', italics: true, color: H('greenS'), fontSize: 13, lineHeight: 1.3, margin: [0, 0, 0, 26] },
    {
      columns: [
        chip(a.fase.split('·')[0].trim().toUpperCase()),
        chip(a.horas),
        chip('Cuatrimestre ' + a.cuatrimestre),
      ],
      columnGap: 8,
    },
    { text: a.correlativas, font: 'Mono', color: H('ash2'), fontSize: 8.5, margin: [0, 16, 0, 0] },
    { text: '', margin: [0, 0, 0, 0], pageBreak: 'after' },
  ]
}
function chip(t: string): any {
  return {
    width: 'auto',
    table: { body: [[{ text: t, font: 'Mono', color: H('greenS'), fontSize: 8.5, noWrap: true, margin: [8, 4, 8, 4] }]] },
    layout: { hLineWidth: () => 0.8, vLineWidth: () => 0.8, hLineColor: () => H('green'), vLineColor: () => H('green'), fillColor: () => null },
  }
}

function intro(a: Asignatura): any[] {
  return [
    { text: 'Objetivos de aprendizaje', style: 'h2' },
    { ul: a.objetivos.map((o) => ({ text: inline(o) })), style: 'list', markerColor: H('greenB'), margin: [0, 2, 0, 12] },
  ]
}

function casoNodes(a: Asignatura): any[] {
  const c = a.caso
  const out: any[] = [
    { text: '', pageBreak: 'before' },
    {
      stack: [
        { text: 'CASO PRÁCTICO', font: 'Mono', color: H('greenB'), fontSize: 9, characterSpacing: 2 },
        { text: c.titulo, font: 'Spectral', bold: true, color: H('ink'), fontSize: 19, margin: [0, 4, 0, 2] },
        { text: c.empresa, font: 'PlexSemi', color: H('greenD'), fontSize: 10.5 },
      ],
      margin: [0, 8, 0, 10],
    },
  ]
  c.contexto.split(/\n\n+/).forEach((p) => out.push({ text: inline(p), style: 'p' }))
  c.datos.forEach((b) => blockNode(b).forEach((x) => out.push(x)))
  out.push({ text: 'Consigna', style: 'h2' })
  out.push({ ol: c.consigna.map((q) => ({ text: inline(q) })), style: 'list', markerColor: H('greenB'), margin: [0, 2, 0, 12] })
  out.push(...blockNode({ t: 'steps', title: 'Metodología de resolución', items: c.metodologia }))
  out.push(calloutBox('greenB', 'greenBg', [{ text: [{ text: 'Resolución numérica  ', bold: true, color: H('greenD'), font: 'PlexSemi', fontSize: 8.5 }, ...inline('El caso se desarrolla íntegramente en el **Excel dinámico** de la asignatura (matrices dinámicas, sin arrastrar fórmulas). El presente PDF fija el marco conceptual, la metodología y el criterio de interpretación.')] }]))
  return out
}

function expertosNodes(a: Asignatura): any[] {
  if (!a.expertos?.length) return []
  const out: any[] = [{ text: 'Voces de referencia', style: 'h2' }]
  a.expertos.forEach((e) => blockNode({ t: 'quote', author: e.author, credential: e.credential, md: e.md, source: e.source }).forEach((x) => out.push(x)))
  return out
}

function bibliografiaNodes(a: Asignatura): any[] {
  return [
    { text: 'Bibliografía nuclear', style: 'h2' },
    { ul: a.bibliografia.map((b) => ({ text: inline(b) })), style: 'list', markerColor: H('greenB'), margin: [0, 2, 0, 4] },
  ]
}

function docDef(content: any[], a: Asignatura, opts: { coverBg?: boolean } = {}): any {
  return {
    pageSize: 'A4',
    pageMargins: [56, 82, 56, 60],
    defaultStyle: { font: 'Plex', fontSize: 10.5, color: H('ink2'), lineHeight: 1.35 },
    info: { title: `${BRAND.firm} · Asignatura ${a.cod} — ${a.nombre}`, author: BRAND.author },
    background: (page: number, size: any) => {
      if (page === 1 && opts.coverBg) return [{ canvas: [{ type: 'rect', x: 0, y: 0, w: size.width, h: size.height, color: H('bg') }] }]
      return [{ canvas: [{ type: 'rect', x: 0, y: 0, w: size.width, h: size.height, color: H('white') }] }]
    },
    header: (page: number) =>
      page === 1 && opts.coverBg
        ? null
        : {
            margin: [56, 30, 56, 0],
            columns: [
              { text: BRAND.firm, font: 'Mono', color: H('greenD'), fontSize: 8, characterSpacing: 1.5 },
              { text: 'Asignatura ' + a.cod, font: 'Mono', color: H('ash2'), fontSize: 8, alignment: 'right' },
            ],
          },
    footer: (page: number) =>
      page === 1 && opts.coverBg
        ? null
        : {
            margin: [56, 12, 56, 0],
            columns: [
              { text: BRAND.program, font: 'Mono', color: H('ash2'), fontSize: 7.5 },
              { text: String(page), font: 'Mono', color: H('greenD'), fontSize: 8, alignment: 'right' },
            ],
          },
    content,
    styles: {
      h2: { font: 'Spectral', bold: true, fontSize: 15, color: H('greenD'), margin: [0, 16, 0, 6] },
      h3: { font: 'PlexSemi', fontSize: 11, color: H('ink'), margin: [0, 8, 0, 4] },
      p: { margin: [0, 0, 0, 7], alignment: 'justify' },
      list: { margin: [0, 0, 0, 8], lineHeight: 1.3 },
    },
  }
}

function render(doc: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const pdf = printer.createPdfKitDocument(doc)
    const chunks: Buffer[] = []
    pdf.on('data', (c: Buffer) => chunks.push(c))
    pdf.on('end', () => resolve(Buffer.concat(chunks)))
    pdf.on('error', reject)
    pdf.end()
  })
}

export async function buildAsignaturaPDF(a: Asignatura): Promise<Buffer> {
  const content: any[] = []
  cover(a).forEach((x) => content.push(x))
  intro(a).forEach((x) => content.push(x))
  a.sections.forEach((s, i) => sectionNodes(s, i + 1).forEach((x) => content.push(x)))
  expertosNodes(a).forEach((x) => content.push(x))
  casoNodes(a).forEach((x) => content.push(x))
  bibliografiaNodes(a).forEach((x) => content.push(x))
  return render(docDef(content, a, { coverBg: true }))
}

// ---------------------------------------------------------------------------
// Cuestionario + solucionario (para cátedra / repaso)
// ---------------------------------------------------------------------------
export async function buildQuizPDF(a: Asignatura): Promise<Buffer> {
  const content: any[] = [
    { text: BRAND.firm + '  ·  CUESTIONARIO', font: 'Mono', color: H('greenD'), fontSize: 9, characterSpacing: 2, margin: [0, 0, 0, 6] },
    { text: 'Asignatura ' + a.cod + ' — ' + a.nombre, font: 'Spectral', bold: true, color: H('ink'), fontSize: 17, margin: [0, 0, 0, 2] },
    { text: '15 preguntas de opción múltiple · una sola correcta · con justificación', font: 'Plex', italics: true, color: H('ash'), fontSize: 10, margin: [0, 0, 0, 12] },
  ]
  a.quiz.forEach((q, i) => {
    content.push({ text: [{ text: `Pregunta ${i + 1}.  `, font: 'PlexSemi', color: H('greenD') }, ...inline(q.pregunta, { color: H('ink') })], margin: [0, 8, 0, 4], style: 'p' })
    content.push({
      ol: q.opciones.map((o, k) => ({ text: [{ text: k === q.correcta ? '✓ ' : '', color: H('greenB'), bold: true }, ...inline(o, { color: k === q.correcta ? H('greenD') : H('ink2') })] })),
      type: 'upper-alpha', style: 'list', markerColor: H('ash'), margin: [8, 0, 0, 4],
    })
    content.push(calloutBox('greenB', 'paper', [{ text: [{ text: 'Justificación. ', bold: true, color: H('greenD'), fontSize: 9 }, ...inline(q.justificacion, { fontSize: 9.5, color: H('ink2') })] }]))
  })
  return render({
    pageSize: 'A4',
    pageMargins: [56, 56, 56, 56],
    defaultStyle: { font: 'Plex', fontSize: 10.5, color: H('ink2'), lineHeight: 1.35 },
    info: { title: `${BRAND.firm} · Cuestionario ${a.cod}`, author: BRAND.author },
    background: (_p: number, size: any) => [{ canvas: [{ type: 'rect', x: 0, y: 0, w: size.width, h: size.height, color: H('white') }] }],
    footer: (page: number) => ({ margin: [56, 12, 56, 0], columns: [{ text: BRAND.program, font: 'Mono', color: H('ash2'), fontSize: 7.5 }, { text: String(page), font: 'Mono', color: H('greenD'), fontSize: 8, alignment: 'right' }] }),
    content,
    styles: { p: { margin: [0, 0, 0, 4] }, list: { margin: [0, 0, 0, 6], lineHeight: 1.3 } },
  })
}
