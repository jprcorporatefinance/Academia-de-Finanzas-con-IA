// ============================================================================
// Motor financiero — funciones puras reutilizadas por los simuladores.
// Cada función documenta el concepto que el CEO debe internalizar.
// ============================================================================

export const pct = (x: number, d = 1) => `${(x * 100).toFixed(d)}%`
export const money = (x: number, currency = 'USD') =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(x)
export const num = (x: number, d = 0) =>
  new Intl.NumberFormat('es-AR', { maximumFractionDigits: d }).format(x)

// ---------------------------------------------------------------------------
// 1) NOPAT / ROIC / EVA — el corazón de "lo operativo"
// ---------------------------------------------------------------------------

/** NOPAT = EBIT * (1 - t). Utilidad operativa después de impuestos, SIN efecto del financiamiento. */
export const nopat = (ebit: number, taxRate: number) => ebit * (1 - taxRate)

/** Capital invertido = Capital de trabajo operativo + Activo fijo neto.
 *  Es el dinero realmente "puesto a trabajar" en el negocio. */
export const investedCapital = (workingCapital: number, netFixedAssets: number) =>
  workingCapital + netFixedAssets

/** ROIC = NOPAT / Capital Invertido. Rendimiento del capital operativo. */
export const roic = (nopatValue: number, invested: number) =>
  invested === 0 ? 0 : nopatValue / invested

/** EVA = (ROIC - WACC) * Capital Invertido. Valor económico CREADO (o destruido). */
export const eva = (roicValue: number, wacc: number, invested: number) =>
  (roicValue - wacc) * invested

/** Spread de valor: ROIC - WACC. Si es positivo, se crea valor. */
export const valueSpread = (roicValue: number, wacc: number) => roicValue - wacc

// ---------------------------------------------------------------------------
// 2) Descomposición DuPont — margen × rotación × multiplicador
//    "No alcanza con mirar el margen": el ROE depende también de la rotación
//    del activo y del apalancamiento financiero.
// ---------------------------------------------------------------------------

export interface DuPont {
  netMargin: number
  assetTurnover: number
  equityMultiplier: number
  roe: number
}
export const dupont = (
  netIncome: number,
  sales: number,
  assets: number,
  equity: number,
): DuPont => {
  const netMargin = sales ? netIncome / sales : 0
  const assetTurnover = assets ? sales / assets : 0
  const equityMultiplier = equity ? assets / equity : 0
  return {
    netMargin,
    assetTurnover,
    equityMultiplier,
    roe: netMargin * assetTurnover * equityMultiplier,
  }
}

// ---------------------------------------------------------------------------
// 3) WACC en mercados emergentes (LatAm) — CAPM ajustado
//    Ke = Rf + beta*(ERP) + Riesgo País + Prima por tamaño
// ---------------------------------------------------------------------------

export interface WaccInputs {
  riskFreeUS: number
  equityRiskPremiumUS: number
  countryRiskPremium: number
  sizePremium: number
  unleveredBeta: number
  costOfDebtPreTax: number
  taxRate: number
  debtWeight: number // 0..1 (E/V se calcula como 1 - debtWeight)
}
export interface WaccResult {
  leveredBeta: number
  costOfEquity: number
  afterTaxCostOfDebt: number
  wacc: number
}
export const computeWacc = (i: WaccInputs): WaccResult => {
  const e = 1 - i.debtWeight
  const d = i.debtWeight
  // Beta apalancada (Hamada): βL = βU * (1 + (1-t) * D/E)
  const de = e === 0 ? 0 : d / e
  const leveredBeta = i.unleveredBeta * (1 + (1 - i.taxRate) * de)
  const costOfEquity =
    i.riskFreeUS +
    leveredBeta * i.equityRiskPremiumUS +
    i.countryRiskPremium +
    i.sizePremium
  const afterTaxCostOfDebt = i.costOfDebtPreTax * (1 - i.taxRate)
  const wacc = e * costOfEquity + d * afterTaxCostOfDebt
  return { leveredBeta, costOfEquity, afterTaxCostOfDebt, wacc }
}

// ---------------------------------------------------------------------------
// 4) Flujos de caja: FCFF (firma), FCFE (accionistas), FCFD (acreedores)
// ---------------------------------------------------------------------------

export interface FcfInputs {
  ebit: number
  taxRate: number
  depreciation: number
  capex: number
  deltaWorkingCapital: number // aumento de capital de trabajo (resta caja)
  interest: number
  netDebtIssued: number // nueva deuda - amortizaciones
}
export interface FcfResult {
  nopat: number
  fcff: number // Free Cash Flow to the Firm
  fcfe: number // Free Cash Flow to Equity
  fcfd: number // Free Cash Flow to Debt
}
export const computeFcf = (i: FcfInputs): FcfResult => {
  const np = nopat(i.ebit, i.taxRate)
  // FCFF = NOPAT + Amortizaciones - CAPEX - ΔCapital de trabajo
  const fcff = np + i.depreciation - i.capex - i.deltaWorkingCapital
  // FCFD = Intereses - Nueva deuda neta (lo que reciben los acreedores)
  const fcfd = i.interest - i.netDebtIssued
  // FCFE = FCFF - Intereses*(1-t) + Nueva deuda neta
  const fcfe = fcff - i.interest * (1 - i.taxRate) + i.netDebtIssued
  return { nopat: np, fcff, fcfe, fcfd }
}

// ---------------------------------------------------------------------------
// 5) Apalancamiento: la deuda como multiplicador (de ganancias y de pérdidas)
//    ROE = ROIC + (ROIC - i*(1-t)) * D/E
// ---------------------------------------------------------------------------

export interface LeveragePoint {
  debtRatio: number // D/(D+E)
  roe: number
  interestCoverage: number
  evaSpread: number
}
export const leverageCurve = (
  roicValue: number,
  costOfDebtAfterTax: number,
  totalCapital: number,
  ebit: number,
  costOfDebtPreTax: number,
): LeveragePoint[] => {
  const points: LeveragePoint[] = []
  for (let dr = 0; dr <= 0.85; dr += 0.05) {
    const debt = totalCapital * dr
    const equity = totalCapital * (1 - dr)
    const de = equity === 0 ? 0 : debt / equity
    const roe = roicValue + (roicValue - costOfDebtAfterTax) * de
    const interest = debt * costOfDebtPreTax
    const interestCoverage = interest === 0 ? Infinity : ebit / interest
    points.push({
      debtRatio: dr,
      roe,
      interestCoverage,
      evaSpread: roicValue - costOfDebtAfterTax,
    })
  }
  return points
}

// ---------------------------------------------------------------------------
// 6) Capital de trabajo y ciclos de conversión de caja
// ---------------------------------------------------------------------------

export interface WorkingCapitalInputs {
  receivables: number
  inventory: number
  payables: number
  sales: number
  cogs: number
}
export interface WorkingCapitalResult {
  dso: number // días de cobranza
  dio: number // días de inventario
  dpo: number // días de pago a proveedores
  cashConversionCycle: number
  netWorkingCapital: number
  receivablesTurnover: number
  inventoryTurnover: number
}
export const workingCapital = (i: WorkingCapitalInputs): WorkingCapitalResult => {
  const dso = i.sales ? (i.receivables / i.sales) * 365 : 0
  const dio = i.cogs ? (i.inventory / i.cogs) * 365 : 0
  const dpo = i.cogs ? (i.payables / i.cogs) * 365 : 0
  return {
    dso,
    dio,
    dpo,
    cashConversionCycle: dso + dio - dpo,
    netWorkingCapital: i.receivables + i.inventory - i.payables,
    receivablesTurnover: i.receivables ? i.sales / i.receivables : 0,
    inventoryTurnover: i.inventory ? i.cogs / i.inventory : 0,
  }
}

// ---------------------------------------------------------------------------
// 7) Sistemas de amortización de préstamos: Francés, Alemán, Americano
// ---------------------------------------------------------------------------

export interface AmortRow {
  period: number
  payment: number
  interest: number
  principal: number
  balance: number
}
export type AmortSystem = 'frances' | 'aleman' | 'americano'

export const amortization = (
  principal: number,
  ratePerPeriod: number,
  periods: number,
  system: AmortSystem,
): AmortRow[] => {
  const rows: AmortRow[] = []
  let balance = principal
  if (system === 'frances') {
    // Cuota constante
    const r = ratePerPeriod
    const payment =
      r === 0 ? principal / periods : (principal * r) / (1 - Math.pow(1 + r, -periods))
    for (let p = 1; p <= periods; p++) {
      const interest = balance * r
      const principalPart = payment - interest
      balance -= principalPart
      rows.push({ period: p, payment, interest, principal: principalPart, balance: Math.max(0, balance) })
    }
  } else if (system === 'aleman') {
    // Amortización de capital constante; cuota decreciente
    const principalPart = principal / periods
    for (let p = 1; p <= periods; p++) {
      const interest = balance * ratePerPeriod
      const payment = principalPart + interest
      balance -= principalPart
      rows.push({ period: p, payment, interest, principal: principalPart, balance: Math.max(0, balance) })
    }
  } else {
    // Americano: sólo intereses; capital al final (bullet)
    for (let p = 1; p <= periods; p++) {
      const interest = balance * ratePerPeriod
      const principalPart = p === periods ? principal : 0
      const payment = interest + principalPart
      if (p === periods) balance = 0
      rows.push({ period: p, payment, interest, principal: principalPart, balance })
    }
  }
  return rows
}

export const amortTotals = (rows: AmortRow[]) => ({
  totalPaid: rows.reduce((a, r) => a + r.payment, 0),
  totalInterest: rows.reduce((a, r) => a + r.interest, 0),
})

// ---------------------------------------------------------------------------
// 8) Tasas: nominal, efectiva, real y Costo Financiero Total (CFT)
// ---------------------------------------------------------------------------

/** Tasa Efectiva Anual a partir de TNA con m capitalizaciones. TEA = (1 + TNA/m)^m - 1 */
export const tnaToTea = (tna: number, m: number) => Math.pow(1 + tna / m, m) - 1

/** Tasa real de Fisher: (1 + nominal)/(1 + inflación) - 1 */
export const realRate = (nominalRate: number, inflation: number) =>
  (1 + nominalRate) / (1 + inflation) - 1

/** CFT: incorpora comisiones, gastos e impuestos al costo efectivo del crédito.
 *  Aproximación: se agregan los costos como % sobre el capital, anualizados. */
export const costoFinancieroTotal = (
  tea: number,
  feesPctOfPrincipal: number,
  taxesPctOfInterest: number,
) => {
  // Los gastos iniciales encarecen la tasa efectiva; los impuestos sobre intereses también.
  return tea * (1 + taxesPctOfInterest) + feesPctOfPrincipal
}

// ---------------------------------------------------------------------------
// 9) Valor tiempo del dinero y valuación por DCF
// ---------------------------------------------------------------------------

export const presentValue = (cashflow: number, rate: number, period: number) =>
  cashflow / Math.pow(1 + rate, period)

export interface DcfInputs {
  flows: number[] // FCFF proyectados por período
  wacc: number
  terminalGrowth: number // g de la perpetuidad de Gordon
  netDebt: number // deuda neta para pasar de valor firma a equity
}
export interface DcfResult {
  pvExplicit: number
  terminalValue: number
  pvTerminal: number
  enterpriseValue: number
  equityValue: number
  perFlowPV: number[]
}
export const dcf = (i: DcfInputs): DcfResult => {
  const perFlowPV = i.flows.map((f, idx) => presentValue(f, i.wacc, idx + 1))
  const pvExplicit = perFlowPV.reduce((a, b) => a + b, 0)
  const lastFlow = i.flows[i.flows.length - 1] ?? 0
  // Valor terminal de Gordon: FCFF * (1+g) / (WACC - g)
  const terminalValue =
    i.wacc > i.terminalGrowth
      ? (lastFlow * (1 + i.terminalGrowth)) / (i.wacc - i.terminalGrowth)
      : 0
  const pvTerminal = presentValue(terminalValue, i.wacc, i.flows.length)
  const enterpriseValue = pvExplicit + pvTerminal
  return {
    pvExplicit,
    terminalValue,
    pvTerminal,
    enterpriseValue,
    equityValue: enterpriseValue - i.netDebt,
    perFlowPV,
  }
}

// ---------------------------------------------------------------------------
// 10) Ratios de liquidez y solvencia
// ---------------------------------------------------------------------------

export const liquidityRatios = (
  currentAssets: number,
  inventory: number,
  cash: number,
  currentLiabilities: number,
) => ({
  current: currentLiabilities ? currentAssets / currentLiabilities : 0,
  quick: currentLiabilities ? (currentAssets - inventory) / currentLiabilities : 0,
  cash: currentLiabilities ? cash / currentLiabilities : 0,
})

export const solvencyRatios = (totalDebt: number, equity: number, ebit: number, interest: number) => ({
  debtToEquity: equity ? totalDebt / equity : 0,
  interestCoverage: interest ? ebit / interest : Infinity,
})
