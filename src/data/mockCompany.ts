import type { MockCompany } from '../types'

// ============================================================================
// CASO CENTRAL: "Andina Manufacturas S.A."
// PyME industrial latinoamericana. Los números cuentan una historia:
// contablemente luce sana, pero está destruyendo valor por mala rotación,
// cobranzas lentas, activos sobrevaluados y apalancamiento caro.
// El valor "book" es el de presentación; el "real" es el de gestión/mercado.
// Cifras en miles de USD para neutralizar inflación local.
// ============================================================================

export const mockCompany: MockCompany = {
  name: 'Andina Manufacturas S.A.',
  sector: 'Industria metalmecánica (autopartes)',
  currency: 'USD (miles)',
  story:
    'Andina Manufacturas es una PyME familiar fundada hace 22 años que fabrica autopartes para el mercado de reposición. Su Estado de Resultados muestra utilidad y crecimiento de ventas, y el dueño está conforme mirando el "margen". Sin embargo, la caja está siempre tensa, recurre al descubierto bancario y al cheque diferido, el inventario crece más rápido que las ventas y las cuentas por cobrar se estiran. El programa usa a Andina para mostrar la distancia entre lo que dice la contabilidad de presentación y lo que realmente está pasando con el valor.',

  balance: [
    {
      period: '2024',
      assets: {
        current: [
          { label: 'Caja y bancos', book: 180, real: 180, note: 'Saldo operativo mínimo; rota muy rápido.' },
          {
            label: 'Inversiones transitorias',
            book: 60,
            real: 60,
          },
          {
            label: 'Cuentas por cobrar comerciales',
            book: 1850,
            real: 1560,
            note: 'Incluye 290 de mora > 120 días con baja probabilidad de cobro. El valor real es menor.',
          },
          {
            label: 'Otros créditos (IVA, anticipos)',
            book: 320,
            real: 320,
          },
          {
            label: 'Inventarios',
            book: 2400,
            real: 1980,
            note: 'Hay 420 de mercadería obsoleta / lenta rotación valuada a costo histórico. A mercado vale menos.',
          },
        ],
        nonCurrent: [
          {
            label: 'Bienes de uso - Terreno',
            book: 350,
            real: 900,
            note: 'Valor contable histórico. A precio de mercado el terreno vale mucho más (activo oculto).',
          },
          {
            label: 'Bienes de uso - Edificio',
            book: 620,
            real: 780,
          },
          {
            label: 'Bienes de uso - Maquinaria',
            book: 1450,
            real: 1150,
            note: 'Parte de la maquinaria está tecnológicamente obsoleta; su valor de mercado es inferior al neto contable.',
          },
          {
            label: 'Rodados',
            book: 140,
            real: 110,
          },
          {
            label: 'Activos intangibles (marca, cartera)',
            book: 0,
            real: 650,
            note: 'No figura en libros: la marca y la relación con clientes valen, pero la contabilidad no los reconoce.',
          },
        ],
      },
      liabilities: {
        current: [
          {
            label: 'Descubierto bancario',
            book: 540,
            real: 540,
            note: 'Producto caro (TNA ~85%). Tapa baches de caja pero erosiona el resultado.',
          },
          {
            label: 'Cheques de pago diferido a pagar',
            book: 430,
            real: 430,
          },
          {
            label: 'Proveedores comerciales',
            book: 1280,
            real: 1280,
            note: 'Financiamiento NO oneroso. Es el "buen" pasivo si se negocia bien.',
          },
          { label: 'Préstamos bancarios corto plazo', book: 620, real: 620 },
          { label: 'Cargas fiscales y sociales', book: 380, real: 380 },
        ],
        nonCurrent: [
          { label: 'Préstamos bancarios largo plazo', book: 980, real: 980 },
          { label: 'Previsiones', book: 90, real: 90 },
        ],
      },
      equity: [
        { label: 'Capital social', book: 600, real: 600 },
        { label: 'Reservas', book: 320, real: 320 },
        { label: 'Resultados acumulados', book: 1850, real: 1850 },
      ],
    },
    {
      period: '2023',
      assets: {
        current: [
          { label: 'Caja y bancos', book: 240, real: 240 },
          { label: 'Inversiones transitorias', book: 90, real: 90 },
          { label: 'Cuentas por cobrar comerciales', book: 1520, real: 1380 },
          { label: 'Otros créditos (IVA, anticipos)', book: 260, real: 260 },
          { label: 'Inventarios', book: 1850, real: 1650 },
        ],
        nonCurrent: [
          { label: 'Bienes de uso - Terreno', book: 350, real: 820 },
          { label: 'Bienes de uso - Edificio', book: 650, real: 770 },
          { label: 'Bienes de uso - Maquinaria', book: 1300, real: 1120 },
          { label: 'Rodados', book: 120, real: 100 },
          { label: 'Activos intangibles (marca, cartera)', book: 0, real: 600 },
        ],
      },
      liabilities: {
        current: [
          { label: 'Descubierto bancario', book: 310, real: 310 },
          { label: 'Cheques de pago diferido a pagar', book: 280, real: 280 },
          { label: 'Proveedores comerciales', book: 1120, real: 1120 },
          { label: 'Préstamos bancarios corto plazo', book: 480, real: 480 },
          { label: 'Cargas fiscales y sociales', book: 330, real: 330 },
        ],
        nonCurrent: [
          { label: 'Préstamos bancarios largo plazo', book: 1050, real: 1050 },
          { label: 'Previsiones', book: 80, real: 80 },
        ],
      },
      equity: [
        { label: 'Capital social', book: 600, real: 600 },
        { label: 'Reservas', book: 300, real: 300 },
        { label: 'Resultados acumulados', book: 1560, real: 1560 },
      ],
    },
  ],

  income: [
    {
      period: '2024',
      lines: [
        { label: 'Ventas netas', book: 8200 },
        { label: 'Costo de mercadería vendida', book: -5740, note: 'CMV 70% de ventas.' },
        { label: 'Resultado bruto', book: 2460 },
        { label: 'Gastos de comercialización', book: -980 },
        { label: 'Gastos de administración', book: -610 },
        { label: 'EBITDA', book: 1120, note: 'Antes de amortizaciones e intereses. Lo "operativo" aún luce bien.' },
        { label: 'Amortizaciones', book: -290 },
        { label: 'EBIT (Resultado operativo)', book: 830 },
        {
          label: 'Resultados financieros (intereses)',
          book: -560,
          note: 'Acá se "come" la utilidad: el costo del descubierto y los préstamos caros.',
        },
        { label: 'Resultado antes de impuestos', book: 270 },
        { label: 'Impuesto a las ganancias (35%)', book: -95 },
        { label: 'Resultado neto', book: 175, note: 'Contablemente hay ganancia... pero ¿se creó valor?' },
      ],
    },
    {
      period: '2023',
      lines: [
        { label: 'Ventas netas', book: 7400 },
        { label: 'Costo de mercadería vendida', book: -5106 },
        { label: 'Resultado bruto', book: 2294 },
        { label: 'Gastos de comercialización', book: -880 },
        { label: 'Gastos de administración', book: -560 },
        { label: 'EBITDA', book: 1144 },
        { label: 'Amortizaciones', book: -260 },
        { label: 'EBIT (Resultado operativo)', book: 884 },
        { label: 'Resultados financieros (intereses)', book: -410 },
        { label: 'Resultado antes de impuestos', book: 474 },
        { label: 'Impuesto a las ganancias (35%)', book: -166 },
        { label: 'Resultado neto', book: 308 },
      ],
    },
  ],

  cashflow: [
    {
      period: '2024',
      operating: [
        { label: 'Resultado neto', book: 175 },
        { label: '(+) Amortizaciones', book: 290 },
        { label: '(+) Intereses', book: 560 },
        { label: '(-) Aumento de cuentas por cobrar', book: -330, note: 'Las ventas no se cobraron: drenan caja.' },
        { label: '(-) Aumento de inventarios', book: -550, note: 'Mercadería inmovilizada: caja atrapada en stock.' },
        { label: '(+) Aumento de proveedores', book: 160, note: 'Financiamiento no oneroso que ayuda a la caja.' },
        { label: 'Flujo operativo (antes de intereses e impuestos)', book: 305 },
      ],
      investing: [
        { label: 'CAPEX (compra de maquinaria)', book: -440, note: 'Inversión en activo fijo del período.' },
        { label: 'Venta de rodados', book: 30 },
      ],
      financing: [
        { label: 'Toma de descubierto bancario', book: 230 },
        { label: 'Amortización de préstamos', book: -150 },
        { label: 'Pago de intereses', book: -560 },
        { label: 'Dividendos a accionistas', book: -120 },
      ],
    },
  ],
}

// Parámetros de mercado para WACC / valuación (caso LatAm)
export const marketAssumptions = {
  riskFreeUS: 0.043, // T-Bond 10Y EEUU
  equityRiskPremiumUS: 0.055, // ERP maduro (Damodaran)
  countryRiskPremium: 0.065, // riesgo país LatAm (EMBI ajustado)
  sizePremium: 0.035, // prima por tamaño (PyME)
  unleveredBeta: 0.85, // beta del sector autopartes
  costOfDebtPreTax: 0.18, // costo de deuda promedio en USD
  taxRate: 0.35,
  targetDebtWeight: 0.45,
}
