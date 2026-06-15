/* eslint-disable */
// ============================================================================
// Workbook interactivo de ESTADOS CONTABLES (caso Andina Manufacturas).
//   Hoja 1 "Balance"     — Estado de Situación Patrimonial con drill-down
//                          (Sección > Rubro > Subrubro > Cuenta, agrupado).
//   Hoja 2 "Resultados"  — Estado de Resultados con drill-down.
//   Hoja 3 "Articulacion"— cómo el Resultado del Ejercicio entra al PN y cierra
//                          la partida doble (cajas + flechas con glifos).
//   Hoja 4 "Indicadores" — liquidez, solvencia, económicos, gestión, operativos
//                          y financieros, en cajas vinculadas a las magnitudes.
// Todas las CUENTAS son celdas de entrada (amarillas); el resto son fórmulas.
// ============================================================================
import ExcelJS from 'exceljs'

const INK = '0B1120'
const GOLD = 'D4AF37'
const INPUT = 'FFF3C4'
const SUB = 'EAF1FB'
const TOT = 'DCE7F7'
const SECT = '111A2E'
const GREEN = 'E5F6EC'
const ARROW = 'FBEFD0'

interface Cuenta { label: string; amount: number; note?: string }
interface Subrubro { label: string; cuentas: Cuenta[] }
interface Rubro { label: string; subrubros: Subrubro[] }
interface Seccion { label: string; rubros: Rubro[] }

// --------------------------- PLAN DE CUENTAS (balanceado) -------------------
const balance: Seccion[] = [
  {
    label: 'ACTIVO',
    rubros: [
      {
        label: 'Activo Corriente',
        subrubros: [
          { label: 'Caja y Bancos', cuentas: [
            { label: 'Caja', amount: 40 },
            { label: 'Banco cuenta corriente $', amount: 90 },
            { label: 'Banco cuenta USD', amount: 50 },
          ]},
          { label: 'Inversiones transitorias', cuentas: [{ label: 'Plazo fijo', amount: 60 }]},
          { label: 'Créditos por ventas', cuentas: [
            { label: 'Deudores por ventas', amount: 1560 },
            { label: 'Documentos a cobrar (mora >120d)', amount: 290, note: 'Alta probabilidad de incobrabilidad.' },
          ]},
          { label: 'Otros créditos', cuentas: [
            { label: 'IVA crédito fiscal', amount: 180 },
            { label: 'Anticipos a proveedores', amount: 90 },
            { label: 'Gastos pagados por adelantado', amount: 50 },
          ]},
          { label: 'Bienes de cambio (inventarios)', cuentas: [
            { label: 'Materia prima', amount: 700 },
            { label: 'Productos en proceso', amount: 480 },
            { label: 'Productos terminados', amount: 800 },
            { label: 'Mercadería de lenta rotación', amount: 420, note: 'Obsoleta: a mercado vale menos.' },
          ]},
        ],
      },
      {
        label: 'Activo No Corriente',
        subrubros: [
          { label: 'Bienes de Uso — Terrenos', cuentas: [{ label: 'Terreno planta industrial', amount: 350 }]},
          { label: 'Bienes de Uso — Edificios', cuentas: [
            { label: 'Edificio (costo)', amount: 800 },
            { label: 'Amortización acumulada edificio', amount: -180 },
          ]},
          { label: 'Bienes de Uso — Maquinaria', cuentas: [
            { label: 'Maquinaria (costo)', amount: 2100 },
            { label: 'Amortización acumulada maquinaria', amount: -650 },
          ]},
          { label: 'Bienes de Uso — Rodados', cuentas: [
            { label: 'Rodados (costo)', amount: 260 },
            { label: 'Amortización acumulada rodados', amount: -120 },
          ]},
        ],
      },
    ],
  },
  {
    label: 'PASIVO',
    rubros: [
      {
        label: 'Pasivo Corriente',
        subrubros: [
          { label: 'Deudas bancarias corto plazo', cuentas: [
            { label: 'Descubierto bancario', amount: 540, note: 'Producto caro (TNA ~85%).' },
            { label: 'Préstamo bancario corto plazo', amount: 620 },
          ]},
          { label: 'Deudas comerciales', cuentas: [
            { label: 'Proveedores', amount: 1280, note: 'Financiamiento no oneroso.' },
            { label: 'Cheques diferidos a pagar', amount: 430 },
          ]},
          { label: 'Cargas fiscales y sociales', cuentas: [
            { label: 'IVA a pagar', amount: 150 },
            { label: 'Cargas sociales', amount: 130 },
            { label: 'Impuesto a las ganancias a pagar', amount: 100 },
          ]},
        ],
      },
      {
        label: 'Pasivo No Corriente',
        subrubros: [
          { label: 'Deudas bancarias largo plazo', cuentas: [{ label: 'Préstamo bancario largo plazo', amount: 980 }]},
          { label: 'Previsiones', cuentas: [{ label: 'Previsión para juicios', amount: 90 }]},
        ],
      },
    ],
  },
  {
    label: 'PATRIMONIO NETO',
    rubros: [
      {
        label: 'Patrimonio Neto',
        subrubros: [
          { label: 'Aportes de los propietarios', cuentas: [{ label: 'Capital social', amount: 600 }]},
          { label: 'Reservas', cuentas: [{ label: 'Reserva legal', amount: 320 }]},
          { label: 'Resultados', cuentas: [
            { label: 'Resultados no asignados (ejercicios anteriores)', amount: 1955 },
            { label: 'Resultado del ejercicio (viene del Estado de Resultados)', amount: 175, note: 'Articula con el Estado de Resultados.' },
          ]},
        ],
      },
    ],
  },
]

// Estado de Resultados: rubros con detalle (drill-down).
interface ErLinea { label: string; cuentas: Cuenta[]; subtotal: string }
const resultados: ErLinea[] = [
  { label: 'Ventas netas', subtotal: 'VENTAS', cuentas: [
    { label: 'Ventas de productos', amount: 8000 },
    { label: 'Ventas de servicios', amount: 200 },
  ]},
  { label: 'Costo de mercadería vendida', subtotal: 'CMV', cuentas: [
    { label: 'Materia prima consumida', amount: -3200 },
    { label: 'Mano de obra directa', amount: -1600 },
    { label: 'Costos indirectos de fabricación', amount: -940 },
  ]},
  { label: 'Gastos de comercialización', subtotal: 'GCOM', cuentas: [
    { label: 'Comisiones de venta', amount: -300 },
    { label: 'Fletes y distribución', amount: -200 },
    { label: 'Publicidad', amount: -300 },
  ]},
  { label: 'Gastos de administración', subtotal: 'GADM', cuentas: [
    { label: 'Sueldos administración', amount: -300 },
    { label: 'Honorarios profesionales', amount: -140 },
    { label: 'Otros gastos', amount: -100 },
  ]},
  { label: 'Amortizaciones', subtotal: 'AMORT', cuentas: [
    { label: 'Amortización de bienes de uso', amount: -290 },
  ]},
  { label: 'Resultados financieros', subtotal: 'FIN', cuentas: [
    { label: 'Intereses de préstamos', amount: -300 },
    { label: 'Intereses de descubierto', amount: -200 },
    { label: 'Comisiones bancarias', amount: -60 },
  ]},
  { label: 'Impuesto a las ganancias', subtotal: 'IMP', cuentas: [
    { label: 'Impuesto a las ganancias (35%)', amount: -95 },
  ]},
]

// ---------------------------------------------------------------------------
export async function buildEstadosWorkbook(): Promise<Buffer> {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Academia de Finanzas Corporativas + IA'
  const ref: Record<string, string> = {} // magnitud -> 'Hoja!Bxx'

  buildBalance(wb, ref)
  buildResultados(wb, ref)
  buildArticulacion(wb, ref)
  buildIndicadores(wb, ref)

  return (await wb.xlsx.writeBuffer()) as Buffer
}

function styleSheet(ws: ExcelJS.Worksheet) {
  ws.views = [{ showGridLines: false }]
  ws.properties.outlineProperties = { summaryBelow: false, summaryRight: false }
}
function title(ws: ExcelJS.Worksheet, row: number, text: string, span = 4) {
  ws.mergeCells(row, 1, row, span)
  const c = ws.getCell(row, 1)
  c.value = text
  c.font = { bold: true, size: 14, color: { argb: 'FFFFFFFF' } }
  c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + INK } }
  c.alignment = { vertical: 'middle', indent: 1 }
  ws.getRow(row).height = 26
}
function moneyFmt(cell: ExcelJS.Cell) { cell.numFmt = '#,##0;(#,##0)' }

// ----------------------------- BALANCE -------------------------------------
function buildBalance(wb: ExcelJS.Workbook, ref: Record<string, string>) {
  const ws = wb.addWorksheet('Balance')
  styleSheet(ws)
  ws.columns = [{ width: 52 }, { width: 16 }, { width: 12 }, { width: 40 }]
  title(ws, 1, 'ESTADO DE SITUACIÓN PATRIMONIAL · Andina Manufacturas S.A. (en miles de USD)')
  ws.getCell(2, 1).value = 'Drill-down: usá los botones [+]/[−] del margen izquierdo para abrir o cerrar rubros, subrubros y cuentas. Editá SOLO las celdas amarillas (cuentas).'
  ws.getCell(2, 1).font = { italic: true, size: 10, color: { argb: 'FF555555' } }
  ws.mergeCells(2, 1, 2, 4)
  let r = 4

  const sectionTotals: Record<string, string> = {}
  for (const sec of balance) {
    const rubroTotalCells: string[] = []
    const secRow = r
    // fila de sección (se completa el total al final)
    ws.getCell(r, 1).value = sec.label
    ws.getCell(r, 1).font = { bold: true, size: 12, color: { argb: 'FF' + GOLD } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SECT } }
    ws.getCell(r, 2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SECT } }
    ws.getCell(r, 2).font = { bold: true, size: 12, color: { argb: 'FF' + GOLD } }
    ws.getRow(r).outlineLevel = 0
    r++
    for (const rubro of sec.rubros) {
      const rubroRow = r
      const subTotalCells: string[] = []
      ws.getCell(r, 1).value = '  ' + rubro.label
      ws.getCell(r, 1).font = { bold: true, size: 11 }
      ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + TOT } }
      ws.getCell(r, 2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + TOT } }
      ws.getRow(r).outlineLevel = 1
      r++
      for (const sub of rubro.subrubros) {
        const subRow = r
        ws.getCell(r, 1).value = '    ' + sub.label
        ws.getCell(r, 1).font = { bold: true, size: 10, color: { argb: 'FF1A2740' } }
        ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SUB } }
        ws.getCell(r, 2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SUB } }
        ws.getRow(r).outlineLevel = 2
        r++
        const first = r
        for (const cta of sub.cuentas) {
          ws.getCell(r, 1).value = '        ' + cta.label
          ws.getCell(r, 1).font = { size: 10 }
          const cell = ws.getCell(r, 2)
          cell.value = cta.amount
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + INPUT } }
          cell.border = { top: { style: 'hair' }, bottom: { style: 'hair' }, left: { style: 'thin', color: { argb: 'FFBFA12A' } }, right: { style: 'thin', color: { argb: 'FFBFA12A' } } }
          moneyFmt(cell)
          if (cta.note) { ws.getCell(r, 4).value = cta.note; ws.getCell(r, 4).font = { size: 9, italic: true, color: { argb: 'FF777777' } } }
          ws.getRow(r).outlineLevel = 3
          ws.getRow(r).hidden = true
          r++
        }
        const subCell = ws.getCell(subRow, 2)
        subCell.value = { formula: `SUM(B${first}:B${r - 1})` } as any
        subCell.font = { bold: true, size: 10, color: { argb: 'FF1A2740' } }
        moneyFmt(subCell)
        subTotalCells.push(`B${subRow}`)
        ws.getRow(subRow).hidden = true
      }
      const rubroCell = ws.getCell(rubroRow, 2)
      rubroCell.value = { formula: subTotalCells.join('+') } as any
      rubroCell.font = { bold: true, size: 11 }
      moneyFmt(rubroCell)
      rubroTotalCells.push(`B${rubroRow}`)
      ws.getRow(rubroRow).hidden = true
      if (rubro.label === 'Activo Corriente') ref.AC = `Balance!B${rubroRow}`
      if (rubro.label === 'Activo No Corriente') ref.ANC = `Balance!B${rubroRow}`
      if (rubro.label === 'Pasivo Corriente') ref.PC = `Balance!B${rubroRow}`
      if (rubro.label === 'Pasivo No Corriente') ref.PNC = `Balance!B${rubroRow}`
      if (rubro.label === 'Patrimonio Neto') ref.PN = `Balance!B${rubroRow}`
      // refs a subrubros clave (gestión / liquidez)
      rubro.subrubros.forEach((sub, i) => {
        const addr = `Balance!${subTotalCells[i]}`
        if (sub.label.startsWith('Caja y Bancos')) ref.DISPONIBLE = addr
        if (sub.label.startsWith('Inversiones')) ref.INVERSIONES = addr
        if (sub.label.startsWith('Créditos por ventas')) ref.CXC = addr
        if (sub.label.startsWith('Bienes de cambio')) ref.INVENTARIO = addr
        if (sub.label.startsWith('Deudas comerciales')) ref.COMERCIALES = addr
      })
    }
    const secCell = ws.getCell(secRow, 2)
    secCell.value = { formula: rubroTotalCells.join('+') } as any
    secCell.font = { bold: true, size: 12, color: { argb: 'FF' + GOLD } }
    moneyFmt(secCell)
    sectionTotals[sec.label] = `B${secRow}`
  }

  // Totales y control
  r++
  ref.ACTIVO = `Balance!${sectionTotals['ACTIVO']}`
  ref.PASIVO = `Balance!${sectionTotals['PASIVO']}`
  ref.PNTOTAL = `Balance!${sectionTotals['PATRIMONIO NETO']}`
  const drawTotal = (label: string, formula: string, key?: string) => {
    ws.getCell(r, 1).value = label
    ws.getCell(r, 1).font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF243453' } }
    const c = ws.getCell(r, 2)
    c.value = { formula } as any
    c.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF243453' } }
    moneyFmt(c)
    if (key) ref[key] = `Balance!B${r}`
    r++
  }
  drawTotal('TOTAL ACTIVO', `${sectionTotals['ACTIVO']}`, 'TA')
  drawTotal('TOTAL PASIVO', `${sectionTotals['PASIVO']}`, 'TP')
  drawTotal('TOTAL PATRIMONIO NETO', `${sectionTotals['PATRIMONIO NETO']}`, 'TPN')
  drawTotal('PASIVO + PATRIMONIO NETO', `${sectionTotals['PASIVO']}+${sectionTotals['PATRIMONIO NETO']}`)
  // control partida doble
  ws.getCell(r, 1).value = 'CONTROL: Activo − (Pasivo + PN)'
  ws.getCell(r, 1).font = { bold: true, size: 11 }
  const ctrl = ws.getCell(r, 2)
  ctrl.value = { formula: `${sectionTotals['ACTIVO']}-(${sectionTotals['PASIVO']}+${sectionTotals['PATRIMONIO NETO']})` } as any
  moneyFmt(ctrl)
  ref.CONTROL = `Balance!B${r}`
  r++
  ws.mergeCells(r, 1, r, 4)
  const okCell = ws.getCell(r, 1)
  okCell.value = { formula: `IF(ABS(${ref.CONTROL.split('!')[1]})<1,"✔ PARTIDA DOBLE OK: el Activo iguala a Pasivo + Patrimonio Neto.","✖ NO CIERRA: revisá las cuentas.")` } as any
  okCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + GREEN } }
  okCell.font = { bold: true, color: { argb: 'FF0B5132' } }
  okCell.alignment = { indent: 1 }
}

// --------------------------- RESULTADOS ------------------------------------
function buildResultados(wb: ExcelJS.Workbook, ref: Record<string, string>) {
  const ws = wb.addWorksheet('Resultados')
  styleSheet(ws)
  ws.columns = [{ width: 52 }, { width: 16 }, { width: 12 }, { width: 40 }]
  title(ws, 1, 'ESTADO DE RESULTADOS · Andina Manufacturas S.A. (en miles de USD)')
  ws.getCell(2, 1).value = 'Drill-down por línea. Editá las cuentas (amarillo). Los subtotales y los resultados intermedios se calculan solos.'
  ws.getCell(2, 1).font = { italic: true, size: 10, color: { argb: 'FF555555' } }
  ws.mergeCells(2, 1, 2, 4)
  let r = 4
  const sub: Record<string, string> = {}

  const lineSubtotal = (er: ErLinea) => {
    const headRow = r
    ws.getCell(r, 1).value = er.label
    ws.getCell(r, 1).font = { bold: true, size: 11 }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SUB } }
    ws.getCell(r, 2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SUB } }
    ws.getRow(r).outlineLevel = 0
    r++
    const first = r
    for (const cta of er.cuentas) {
      ws.getCell(r, 1).value = '      ' + cta.label
      ws.getCell(r, 1).font = { size: 10 }
      const c = ws.getCell(r, 2)
      c.value = cta.amount
      c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + INPUT } }
      c.border = { left: { style: 'thin', color: { argb: 'FFBFA12A' } }, right: { style: 'thin', color: { argb: 'FFBFA12A' } } }
      moneyFmt(c)
      ws.getRow(r).outlineLevel = 1
      ws.getRow(r).hidden = true
      r++
    }
    const hc = ws.getCell(headRow, 2)
    hc.value = { formula: `SUM(B${first}:B${r - 1})` } as any
    hc.font = { bold: true, size: 11 }
    moneyFmt(hc)
    sub[er.subtotal] = `B${headRow}`
  }
  const resultRow = (label: string, formula: string, key: string, strong = true) => {
    ws.getCell(r, 1).value = label
    ws.getCell(r, 1).font = { bold: true, size: 11, color: { argb: strong ? 'FFFFFFFF' : 'FF1A2740' } }
    ws.getCell(r, 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + (strong ? '243453' : TOT) } }
    const c = ws.getCell(r, 2)
    c.value = { formula } as any
    c.font = { bold: true, size: 11, color: { argb: strong ? 'FFFFFFFF' : 'FF1A2740' } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + (strong ? '243453' : TOT) } }
    moneyFmt(c)
    ref[key] = `Resultados!B${r}`
    sub[key] = `B${r}`
    r++
  }

  lineSubtotal(resultados[0]) // VENTAS
  lineSubtotal(resultados[1]) // CMV
  resultRow('RESULTADO BRUTO', `${sub.VENTAS}+${sub.CMV}`, 'RB', false)
  lineSubtotal(resultados[2]) // GCOM
  lineSubtotal(resultados[3]) // GADM
  resultRow('EBITDA', `${sub.RB}+${sub.GCOM}+${sub.GADM}`, 'EBITDA')
  lineSubtotal(resultados[4]) // AMORT
  resultRow('EBIT (resultado operativo)', `${sub.EBITDA}+${sub.AMORT}`, 'EBIT')
  lineSubtotal(resultados[5]) // FIN
  resultRow('RESULTADO ANTES DE IMPUESTOS', `${sub.EBIT}+${sub.FIN}`, 'RAI', false)
  lineSubtotal(resultados[6]) // IMP
  resultRow('RESULTADO DEL EJERCICIO', `${sub.RAI}+${sub.IMP}`, 'RESULTADO')
  ref.VENTAS = `Resultados!${sub.VENTAS}`
  ref.CMV = `Resultados!${sub.CMV}`
  ref.INTERESES = `Resultados!${sub.FIN}` // negativo
  r++
  ws.mergeCells(r, 1, r, 4)
  const note = ws.getCell(r, 1)
  note.value = { formula: `"El RESULTADO DEL EJERCICIO ("&TEXT(${sub.RESULTADO},"#,##0")&" k) se traslada al Patrimonio Neto del Balance. Ver la hoja Articulacion."` } as any
  note.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + ARROW } }
  note.font = { italic: true, color: { argb: 'FF6B4E00' } }
  note.alignment = { indent: 1 }
}

// --------------------------- ARTICULACIÓN ----------------------------------
function buildArticulacion(wb: ExcelJS.Workbook, ref: Record<string, string>) {
  const ws = wb.addWorksheet('Articulacion')
  ws.views = [{ showGridLines: false }]
  ws.columns = [{ width: 6 }, { width: 30 }, { width: 16 }, { width: 8 }, { width: 30 }, { width: 16 }]
  title(ws, 1, 'ARTICULACIÓN: cómo el Resultado del Ejercicio cierra la PARTIDA DOBLE', 6)

  const box = (r: number, c: number, titleText: string, valueFormula: string, fill: string) => {
    ws.mergeCells(r, c, r, c + 1)
    const t = ws.getCell(r, c)
    t.value = titleText
    t.font = { bold: true, size: 11, color: { argb: 'FF1A2740' } }
    t.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + fill } }
    t.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true }
    const v = ws.getCell(r + 1, c + 1)
    v.value = { formula: valueFormula } as any
    v.numFmt = '#,##0'
    v.font = { bold: true, size: 14, color: { argb: 'FF0B5132' } }
    v.alignment = { horizontal: 'center' }
    ws.getCell(r + 1, c).value = ''
    const border = { top: { style: 'medium' as const, color: { argb: 'FF' + GOLD } }, bottom: { style: 'medium' as const, color: { argb: 'FF' + GOLD } }, left: { style: 'medium' as const, color: { argb: 'FF' + GOLD } }, right: { style: 'medium' as const, color: { argb: 'FF' + GOLD } } }
    ;[t, ws.getCell(r, c + 1), ws.getCell(r + 1, c), v].forEach((cc) => (cc.border = border))
  }
  const arrow = (r: number, c: number, glyph: string, text: string) => {
    ws.getCell(r, c).value = glyph
    ws.getCell(r, c).font = { bold: true, size: 20, color: { argb: 'FF' + GOLD } }
    ws.getCell(r, c).alignment = { horizontal: 'center' }
    if (text) { ws.mergeCells(r, c + 1, r, c + 2); ws.getCell(r, c + 1).value = text; ws.getCell(r, c + 1).font = { size: 10, italic: true, color: { argb: 'FF555555' } } }
  }

  box(3, 2, 'ESTADO DE RESULTADOS — Resultado del Ejercicio', `${ref.RESULTADO}`, ARROW)
  arrow(6, 2, '⬇', 'El resultado del ejercicio NO se queda en el Estado de Resultados: se capitaliza.')
  box(8, 2, 'PATRIMONIO NETO — incluye el Resultado del Ejercicio', `${ref.PN}`, GREEN)
  arrow(11, 2, '⬇', 'El Patrimonio Neto es una parte del lado derecho del Balance (lo que es de los dueños).')

  box(3, 5, 'TOTAL ACTIVO (lo que la empresa tiene)', `${ref.ACTIVO}`, SUB)
  arrow(6, 5, '⬅⮕', 'Tiene que ser igual a...')
  box(8, 5, 'PASIVO + PATRIMONIO NETO (cómo se financió)', `${ref.PASIVO}+${ref.PNTOTAL}`, SUB)

  // Ecuación y control
  ws.mergeCells(13, 2, 13, 6)
  const eq = ws.getCell(13, 2)
  eq.value = { formula: `"ACTIVO ("&TEXT(${ref.ACTIVO},"#,##0")&")  =  PASIVO ("&TEXT(${ref.PASIVO},"#,##0")&")  +  PATRIMONIO NETO ("&TEXT(${ref.PNTOTAL},"#,##0")&")"` } as any
  eq.font = { bold: true, size: 12, color: { argb: 'FF1A2740' } }
  eq.alignment = { horizontal: 'center' }
  ws.mergeCells(15, 2, 15, 6)
  const ctl = ws.getCell(15, 2)
  ctl.value = { formula: `IF(ABS(${ref.CONTROL})<1,"✔ La partida doble CIERRA. Cada peso del activo esta financiado por terceros (pasivo) o por los duenos (patrimonio neto), y el resultado del ejercicio aumenta el patrimonio.","✖ Hay un descalce de "&TEXT(${ref.CONTROL},"#,##0")&" k: alguna cuenta no fue registrada por partida doble.")` } as any
  ctl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + GREEN } }
  ctl.font = { bold: true, color: { argb: 'FF0B5132' } }
  ctl.alignment = { horizontal: 'center', wrapText: true }
  ws.getRow(15).height = 32
}

// --------------------------- INDICADORES -----------------------------------
function buildIndicadores(wb: ExcelJS.Workbook, ref: Record<string, string>) {
  const ws = wb.addWorksheet('Indicadores')
  ws.views = [{ showGridLines: false }]
  ws.columns = [{ width: 38 }, { width: 14 }, { width: 56 }]
  title(ws, 1, 'INDICADORES — cada caja se vincula (➜) a las magnitudes del Balance y del Estado de Resultados', 3)
  let r = 3

  const family = (name: string) => {
    ws.mergeCells(r, 1, r, 3)
    const c = ws.getCell(r, 1)
    c.value = name
    c.font = { bold: true, size: 12, color: { argb: 'FF' + GOLD } }
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + SECT } }
    c.alignment = { indent: 1 }
    ws.getRow(r).height = 20
    r++
    ws.getCell(r, 1).value = 'Indicador'
    ws.getCell(r, 2).value = 'Valor'
    ws.getCell(r, 3).value = 'Cómo se construye (➜ magnitudes vinculadas)'
    ;[1, 2, 3].forEach((i) => { ws.getCell(r, i).font = { bold: true, size: 9, color: { argb: 'FFFFFFFF' } }; ws.getCell(r, i).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF243453' } } })
    r++
  }
  const ind = (label: string, formula: string, fmt: string, link: string) => {
    const cell0 = ws.getCell(r, 1)
    cell0.value = label
    cell0.font = { bold: true, size: 10 }
    const v = ws.getCell(r, 2)
    v.value = { formula } as any
    v.numFmt = fmt
    v.font = { bold: true, size: 11, color: { argb: 'FF0B5132' } }
    v.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + GREEN } }
    v.alignment = { horizontal: 'center' }
    const l = ws.getCell(r, 3)
    l.value = link
    l.font = { size: 9, color: { argb: 'FF555555' } }
    l.alignment = { wrapText: true }
    const b = { top: { style: 'thin' as const, color: { argb: 'FFCCCCCC' } }, bottom: { style: 'thin' as const, color: { argb: 'FFCCCCCC' } }, left: { style: 'thin' as const, color: { argb: 'FFCCCCCC' } }, right: { style: 'thin' as const, color: { argb: 'FFCCCCCC' } } }
    ;[cell0, v, l].forEach((cc) => (cc.border = b))
    r++
  }

  const P = '0.0%'; const X = '0.00"x"'; const D = '0 "días"'; const N = '#,##0'

  family('LIQUIDEZ')
  ind('Liquidez corriente', `${ref.AC}/${ref.PC}`, X, '➜ Activo Corriente ÷ Pasivo Corriente')
  ind('Liquidez ácida (prueba del ácido)', `(${ref.AC}-${ref.INVENTARIO})/${ref.PC}`, X, '➜ (Activo Corriente − Inventarios) ÷ Pasivo Corriente')
  ind('Liquidez de caja', `(${ref.DISPONIBLE}+${ref.INVERSIONES})/${ref.PC}`, X, '➜ (Caja y Bancos + Inversiones) ÷ Pasivo Corriente')
  ind('Capital de trabajo', `${ref.AC}-${ref.PC}`, N, '➜ Activo Corriente − Pasivo Corriente')

  family('SOLVENCIA')
  ind('Endeudamiento (Pasivo/Activo)', `${ref.PASIVO}/${ref.ACTIVO}`, P, '➜ Pasivo Total ÷ Activo Total')
  ind('Deuda / Patrimonio Neto', `${ref.PASIVO}/${ref.PNTOTAL}`, X, '➜ Pasivo Total ÷ Patrimonio Neto')
  ind('Solvencia (Activo/Pasivo)', `${ref.ACTIVO}/${ref.PASIVO}`, X, '➜ Activo Total ÷ Pasivo Total')
  ind('Inmovilización del activo', `${ref.ANC}/${ref.ACTIVO}`, P, '➜ Activo No Corriente ÷ Activo Total')

  family('ECONÓMICOS (rentabilidad)')
  ind('Margen bruto', `${ref.RB}/${ref.VENTAS}`, P, '➜ Resultado Bruto ÷ Ventas')
  ind('Margen neto', `${ref.RESULTADO}/${ref.VENTAS}`, P, '➜ Resultado del Ejercicio ÷ Ventas')
  ind('ROA (rentabilidad del activo)', `${ref.RESULTADO}/${ref.ACTIVO}`, P, '➜ Resultado del Ejercicio ÷ Activo Total')
  ind('ROE (rentabilidad del patrimonio)', `${ref.RESULTADO}/${ref.PNTOTAL}`, P, '➜ Resultado del Ejercicio ÷ Patrimonio Neto')

  family('GESTIÓN (rotaciones)')
  ind('Rotación de cuentas por cobrar', `${ref.VENTAS}/${ref.CXC}`, X, '➜ Ventas ÷ Créditos por ventas')
  ind('Días de cobranza (DSO)', `${ref.CXC}/${ref.VENTAS}*365`, D, '➜ Créditos por ventas ÷ Ventas × 365')
  ind('Rotación de inventario', `-${ref.CMV}/${ref.INVENTARIO}`, X, '➜ CMV ÷ Inventarios')
  ind('Días de inventario (DIO)', `${ref.INVENTARIO}/(-${ref.CMV})*365`, D, '➜ Inventarios ÷ CMV × 365')
  ind('Días de pago a proveedores (DPO)', `${ref.COMERCIALES}/(-${ref.CMV})*365`, D, '➜ Deudas comerciales ÷ CMV × 365')
  ind('Ciclo de conversión de caja', `${ref.CXC}/${ref.VENTAS}*365+${ref.INVENTARIO}/(-${ref.CMV})*365-${ref.COMERCIALES}/(-${ref.CMV})*365`, D, '➜ DSO + DIO − DPO')
  ind('Rotación del activo', `${ref.VENTAS}/${ref.ACTIVO}`, X, '➜ Ventas ÷ Activo Total')

  family('OPERATIVOS (creación de valor)')
  ind('Margen EBIT', `${ref.EBIT}/${ref.VENTAS}`, P, '➜ EBIT ÷ Ventas')
  ind('Margen EBITDA', `${ref.EBITDA}/${ref.VENTAS}`, P, '➜ EBITDA ÷ Ventas')
  ind('NOPAT (EBIT × (1 − 35%))', `_xlfn.LET(t,0.35,${ref.EBIT}*(1-t))`, N, '➜ EBIT × (1 − tasa de impuesto)')
  ind('Capital invertido', `(${ref.CXC}+${ref.INVENTARIO}-${ref.COMERCIALES})+${ref.ANC}`, N, '➜ (CxC + Inventario − Comerciales) + Activo No Corriente')
  ind('ROIC', `_xlfn.LET(nopat,${ref.EBIT}*(1-0.35),ci,(${ref.CXC}+${ref.INVENTARIO}-${ref.COMERCIALES})+${ref.ANC},nopat/ci)`, P, '➜ NOPAT ÷ Capital invertido')

  family('FINANCIEROS (riesgo de la deuda)')
  ind('Cobertura de intereses', `${ref.EBIT}/(-${ref.INTERESES})`, X, '➜ EBIT ÷ Intereses (resultados financieros)')
  ind('Intereses sobre EBIT', `-${ref.INTERESES}/${ref.EBIT}`, P, '➜ Intereses ÷ EBIT')
  ind('Deuda financiera / EBITDA', `(${ref.PC}+${ref.PNC}-${ref.COMERCIALES})/${ref.EBITDA}`, X, '➜ (Deuda corriente + no corriente − comerciales) ÷ EBITDA  (aprox.)')
  ind('Caja operativa aprox. (EBITDA − CAPEX*)', `${ref.EBITDA}-440`, N, '➜ EBITDA − CAPEX del período (440)')

  r++
  ws.mergeCells(r, 1, r, 3)
  const concl = ws.getCell(r, 1)
  concl.value = { formula: `"Lectura integrada: el ROIC ("&TEXT(_xlfn.LET(nopat,${ref.EBIT}*(1-0.35),ci,(${ref.CXC}+${ref.INVENTARIO}-${ref.COMERCIALES})+${ref.ANC},nopat/ci),"0.0%")&") combina margen y rotacion; la cobertura de intereses ("&TEXT(${ref.EBIT}/(-${ref.INTERESES}),"0.0")&"x) mide si lo operativo soporta lo financiero. Cambia cualquier cuenta del Balance o del Estado de Resultados y todos los indicadores se recalculan."` } as any
  concl.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + ARROW } }
  concl.font = { italic: true, color: { argb: 'FF6B4E00' } }
  concl.alignment = { wrapText: true, indent: 1 }
  ws.getRow(r).height = 46
}
