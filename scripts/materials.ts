/* eslint-disable */
// Especificación declarativa de los materiales por semana (Excel + intro Word + prompts).
// Las fórmulas usan tokens [clave] que el generador reemplaza por direcciones de celda.
// NO llevan "=" inicial. Las funciones modernas (LET, SEQUENCE, ...) se prefijan solas.

type Fmt = 'pct' | 'pct2' | 'money' | 'num' | 'num2' | 'days' | 'x'
interface Input { key: string; label: string; value: number; unit?: string; note?: string; fmt?: Fmt }
interface Calc { key: string; label: string; formula: string; unit?: string; note?: string; fmt?: Fmt }
interface Conclusion { label?: string; formula: string }
interface Dynamic { title: string; note?: string; columns: string[]; spillFormulas: string[]; formats?: (Fmt | undefined)[]; spillRows?: number }
export interface WeekMaterial {
  week: number
  modernIntro: string[]
  promptConcepts: string[]
  excel: { sheetTitle: string; inputs: Input[]; calcs: Calc[]; conclusions: Conclusion[]; dynamic?: Dynamic }
}

export const weekMaterials: WeekMaterial[] = [
  // ===================== SEMANA 1 =====================
  {
    week: 1,
    modernIntro: [
      'La lectura moderna de estados contables parte de una idea: el balance es un **sistema**, no una lista. Cada peso del activo fue financiado por alguien (pasivo o patrimonio), y la pregunta de gestión es si ese activo **rinde más de lo que cuesta financiarlo**. En este modelo trabajamos esa lógica con la ecuación contable como control de integridad.',
      'La técnica que usamos es el **análisis estructural**: totales, capital de trabajo y ratios de liquidez calculados en vivo, para que el número deje de ser una foto estática y se vuelva una herramienta de decisión.',
    ],
    promptConcepts: ['Lectura del Balance, Estado de Resultados y Flujo de Efectivo', 'Ecuación contable Activo = Pasivo + Patrimonio Neto', 'Capital de trabajo', 'Liquidez corriente y ácida', 'Diferencia entre resultado y caja'],
    excel: {
      sheetTitle: 'Lectura de Estados Contables',
      inputs: [
        { key: 'caja', label: 'Caja y bancos', value: 180, unit: 'k', fmt: 'num' },
        { key: 'inv_trans', label: 'Inversiones transitorias', value: 60, unit: 'k', fmt: 'num' },
        { key: 'cxc', label: 'Cuentas por cobrar', value: 1850, unit: 'k', fmt: 'num' },
        { key: 'otros_cred', label: 'Otros créditos', value: 320, unit: 'k', fmt: 'num' },
        { key: 'inventario', label: 'Inventarios', value: 2400, unit: 'k', fmt: 'num' },
        { key: 'bienes_uso', label: 'Bienes de uso (neto)', value: 2560, unit: 'k', fmt: 'num' },
        { key: 'descubierto', label: 'Descubierto bancario', value: 540, unit: 'k', fmt: 'num' },
        { key: 'cheques', label: 'Cheques a pagar', value: 430, unit: 'k', fmt: 'num' },
        { key: 'proveedores', label: 'Proveedores', value: 1280, unit: 'k', fmt: 'num' },
        { key: 'prest_cp', label: 'Préstamos corto plazo', value: 620, unit: 'k', fmt: 'num' },
        { key: 'fiscal', label: 'Cargas fiscales y sociales', value: 380, unit: 'k', fmt: 'num' },
        { key: 'prest_lp', label: 'Préstamos largo plazo', value: 980, unit: 'k', fmt: 'num' },
        { key: 'previsiones', label: 'Previsiones', value: 90, unit: 'k', fmt: 'num' },
        { key: 'capital', label: 'Capital social', value: 600, unit: 'k', fmt: 'num' },
        { key: 'reservas', label: 'Reservas', value: 320, unit: 'k', fmt: 'num' },
        { key: 'res_acum', label: 'Resultados acumulados', value: 1850, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'ac', label: 'Activo corriente', formula: '[caja]+[inv_trans]+[cxc]+[otros_cred]+[inventario]', fmt: 'num' },
        { key: 'anc', label: 'Activo no corriente', formula: '[bienes_uso]', fmt: 'num' },
        { key: 'ta', label: 'TOTAL ACTIVO', formula: '[ac]+[anc]', fmt: 'num' },
        { key: 'pc', label: 'Pasivo corriente', formula: '[descubierto]+[cheques]+[proveedores]+[prest_cp]+[fiscal]', fmt: 'num' },
        { key: 'pnc', label: 'Pasivo no corriente', formula: '[prest_lp]+[previsiones]', fmt: 'num' },
        { key: 'tp', label: 'TOTAL PASIVO', formula: '[pc]+[pnc]', fmt: 'num' },
        { key: 'pn', label: 'PATRIMONIO NETO', formula: '[capital]+[reservas]+[res_acum]', fmt: 'num' },
        { key: 'control', label: 'Control ecuación (≈0)', formula: '[ta]-([tp]+[pn])', fmt: 'num' },
        { key: 'ct', label: 'Capital de trabajo', formula: '[ac]-[pc]', fmt: 'num' },
        { key: 'liq_corr', label: 'Liquidez corriente', formula: '[ac]/[pc]', fmt: 'x' },
        { key: 'liq_acida', label: 'Liquidez ácida (prueba del ácido)', formula: '([ac]-[inventario])/[pc]', fmt: 'x' },
      ],
      conclusions: [
        { label: 'Integridad', formula: 'IF(ABS([control])<1,"OK: el balance cierra. Activo = Pasivo + Patrimonio Neto.","ERROR: la ecuacion no cierra por "&TEXT([control],"#,##0")' },
        { label: 'Liquidez', formula: 'IF([liq_corr]>=1.5,"Liquidez holgada. ","Liquidez ajustada: vigilar la caja. ")&"Razon corriente "&TEXT([liq_corr],"0.00")&"x, acida "&TEXT([liq_acida],"0.00")&"x. Capital de trabajo "&TEXT([ct],"#,##0")&" k."' },
      ],
    },
  },

  // ===================== SEMANA 2 =====================
  {
    week: 2,
    modernIntro: [
      'La técnica central de esta semana es separar la **contabilidad de presentación** (para fisco, bancos y consejos profesionales) de la **información de gestión** (para decidir). El modelo compara, partida por partida, el **valor contable** contra el **valor real de mercado**, y reconstruye el Patrimonio Neto económico.',
      'Esto revela los **activos ocultos** (un terreno a costo histórico, una marca que no figura) y los **activos sobrevaluados** (inventario obsoleto, incobrables). El verdadero valor del patrimonio casi nunca es el de los libros.',
    ],
    promptConcepts: ['Contabilidad de presentación vs. información de gestión', 'Valor contable vs. valor de mercado', 'Activos ocultos e intangibles no contabilizados', 'Incobrables y obsolescencia de inventario', 'Patrimonio neto económico'],
    excel: {
      sheetTitle: 'Valor Contable vs. Valor Real',
      inputs: [
        { key: 'cxc_libro', label: 'Cuentas por cobrar (libro)', value: 1850, fmt: 'num' },
        { key: 'cxc_real', label: 'Cuentas por cobrar (real, neto incobrables)', value: 1560, fmt: 'num' },
        { key: 'inv_libro', label: 'Inventario (libro)', value: 2400, fmt: 'num' },
        { key: 'inv_real', label: 'Inventario (real, neto obsoletos)', value: 1980, fmt: 'num' },
        { key: 'terr_libro', label: 'Terreno (libro, costo histórico)', value: 350, fmt: 'num' },
        { key: 'terr_real', label: 'Terreno (real, mercado)', value: 900, fmt: 'num' },
        { key: 'maq_libro', label: 'Maquinaria (libro)', value: 1450, fmt: 'num' },
        { key: 'maq_real', label: 'Maquinaria (real, parte obsoleta)', value: 1150, fmt: 'num' },
        { key: 'intang_libro', label: 'Marca y cartera (libro)', value: 0, fmt: 'num' },
        { key: 'intang_real', label: 'Marca y cartera (real)', value: 650, fmt: 'num' },
        { key: 'otros_libro', label: 'Resto de activos (igual en ambos)', value: 1180, fmt: 'num' },
        { key: 'pasivo_total', label: 'Pasivo total', value: 4320, fmt: 'num' },
      ],
      calcs: [
        { key: 'activo_libro', label: 'Activo total (libro)', formula: '[cxc_libro]+[inv_libro]+[terr_libro]+[maq_libro]+[intang_libro]+[otros_libro]', fmt: 'num' },
        { key: 'activo_real', label: 'Activo total (real)', formula: '[cxc_real]+[inv_real]+[terr_real]+[maq_real]+[intang_real]+[otros_libro]', fmt: 'num' },
        { key: 'pn_libro', label: 'Patrimonio Neto contable', formula: '[activo_libro]-[pasivo_total]', fmt: 'num' },
        { key: 'pn_real', label: 'Patrimonio Neto económico', formula: '[activo_real]-[pasivo_total]', fmt: 'num' },
        { key: 'brecha', label: 'Brecha (real − contable)', formula: '[pn_real]-[pn_libro]', fmt: 'num' },
        { key: 'brecha_pct', label: 'Brecha sobre PN contable', formula: '[brecha]/[pn_libro]', fmt: 'pct' },
      ],
      conclusions: [
        { label: 'Diagnóstico', formula: 'IF([brecha]>0,"Hay VALOR OCULTO: el patrimonio real supera al contable en "&TEXT([brecha],"#,##0")&" k ("&TEXT([brecha_pct],"0.0%")&"). La contabilidad de presentacion subestima la empresa.","El patrimonio real es MENOR al contable en "&TEXT(-[brecha],"#,##0")&" k: hay activos sobrevaluados (incobrables/obsoletos).")' },
        { label: 'Acción', formula: '"Para gestionar, valua a mercado: el terreno y los intangibles suman, los incobrables y el inventario obsoleto restan. Decidi sobre el PN economico, no sobre el de libros."' },
      ],
    },
  },

  // ===================== SEMANA 3 =====================
  {
    week: 3,
    modernIntro: [
      'Pasamos de la utilidad al **valor operativo**. La técnica moderna no mira el resultado neto sino el **NOPAT** (utilidad operativa después de impuestos, sin el ruido del financiamiento) sobre el **capital invertido**: el **ROIC**.',
      'Y descomponemos la rentabilidad con **DuPont**: ROE = margen × rotación × multiplicador financiero. Así se ve por qué dos empresas con el mismo margen pueden valer muy distinto: una rota su activo y la otra no.',
    ],
    promptConcepts: ['NOPAT = EBIT × (1 − t)', 'Capital invertido', 'ROIC', 'Descomposición DuPont (margen × rotación × multiplicador)', 'Por qué el margen solo no alcanza'],
    excel: {
      sheetTitle: 'NOPAT · ROIC · DuPont',
      inputs: [
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, fmt: 'pct' },
        { key: 'wc', label: 'Capital de trabajo operativo', value: 2970, fmt: 'num' },
        { key: 'fixed', label: 'Activo fijo neto', value: 2560, fmt: 'num' },
        { key: 'sales', label: 'Ventas netas', value: 8200, fmt: 'num' },
        { key: 'assets', label: 'Activo total', value: 7370, fmt: 'num' },
        { key: 'equity', label: 'Patrimonio neto', value: 2770, fmt: 'num' },
        { key: 'net_income', label: 'Resultado neto', value: 175, fmt: 'num' },
        { key: 'wacc', label: 'WACC (costo del capital)', value: 0.21, fmt: 'pct' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT', formula: 'LET(e,[ebit],t,[tax],e*(1-t))', fmt: 'num' },
        { key: 'capital', label: 'Capital invertido', formula: '[wc]+[fixed]', fmt: 'num' },
        { key: 'roic', label: 'ROIC', formula: '[nopat]/[capital]', fmt: 'pct' },
        { key: 'margin', label: 'Margen neto', formula: '[net_income]/[sales]', fmt: 'pct' },
        { key: 'turnover', label: 'Rotación del activo', formula: '[sales]/[assets]', fmt: 'x' },
        { key: 'multiplier', label: 'Multiplicador financiero', formula: '[assets]/[equity]', fmt: 'x' },
        { key: 'roe', label: 'ROE (DuPont)', formula: '[margin]*[turnover]*[multiplier]', fmt: 'pct' },
        { key: 'spread', label: 'Spread ROIC − WACC', formula: '[roic]-[wacc]', fmt: 'pct' },
      ],
      conclusions: [
        { label: 'Valor', formula: 'IF([roic]>[wacc],"CREA VALOR: ROIC "&TEXT([roic],"0.0%")&" supera al WACC "&TEXT([wacc],"0.0%")&".","DESTRUYE VALOR: ROIC "&TEXT([roic],"0.0%")&" es menor al WACC "&TEXT([wacc],"0.0%")&". Hay ganancia contable pero el capital rinde menos de lo que cuesta.")' },
        { label: 'DuPont', formula: '"ROE "&TEXT([roe],"0.0%")&" = margen "&TEXT([margin],"0.0%")&" x rotacion "&TEXT([turnover],"0.00")&" x apalancamiento "&TEXT([multiplier],"0.00")&". No mires solo el margen: la rotacion y el multiplicador cambian todo."' },
      ],
    },
  },

  // ===================== SEMANA 4 =====================
  {
    week: 4,
    modernIntro: [
      'El **EVA (Economic Value Added)** es la traducción monetaria del spread ROIC − WACC: cuánto valor en dinero crea o destruye la empresa por encima del costo de su capital. Es la métrica que reconcilia la contabilidad con las finanzas.',
      'La técnica clave: una empresa puede mostrar **resultado neto positivo y EVA negativo** al mismo tiempo. El modelo lo hace evidente con los números de Andina.',
    ],
    promptConcepts: ['EVA = (ROIC − WACC) × Capital invertido', 'Spread de valor', 'Diferencia entre ganancia contable y creación de valor', 'Capital invertido', 'Cómo se puede destruir valor con utilidad positiva'],
    excel: {
      sheetTitle: 'EVA y el Spread ROIC − WACC',
      inputs: [
        { key: 'ebit', label: 'EBIT', value: 830, fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, fmt: 'pct' },
        { key: 'capital', label: 'Capital invertido', value: 5530, fmt: 'num' },
        { key: 'wacc', label: 'WACC', value: 0.21, fmt: 'pct' },
        { key: 'net_income', label: 'Resultado neto contable', value: 175, fmt: 'num' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT', formula: '[ebit]*(1-[tax])', fmt: 'num' },
        { key: 'roic', label: 'ROIC', formula: '[nopat]/[capital]', fmt: 'pct' },
        { key: 'spread', label: 'Spread (ROIC − WACC)', formula: '[roic]-[wacc]', fmt: 'pct' },
        { key: 'eva', label: 'EVA (valor económico creado)', formula: '[spread]*[capital]', fmt: 'num' },
        { key: 'costo_capital', label: 'Costo del capital en $', formula: '[wacc]*[capital]', fmt: 'num' },
      ],
      conclusions: [
        { label: 'Veredicto', formula: 'IF([eva]>=0,"CREA VALOR: EVA "&TEXT([eva],"#,##0")&" k. El ROIC ("&TEXT([roic],"0.0%")&") supera al WACC.","DESTRUYE VALOR: EVA "&TEXT([eva],"#,##0")&" k. Aunque el resultado neto es "&TEXT([net_income],"#,##0")&" k positivo, el capital cuesta "&TEXT([costo_capital],"#,##0")&" k y rinde menos.")' },
        { label: 'Lección', formula: '"La contabilidad dice ganancia; las finanzas dicen si esa ganancia supera el costo de oportunidad del capital. El EVA es el juez."' },
      ],
    },
  },

  // ===================== SEMANA 5 =====================
  {
    week: 5,
    modernIntro: [
      'Separamos lo **económico** (resultado) de lo **financiero** (caja). Una empresa rentable puede caer por iliquidez. Las técnicas: ratios de liquidez (corriente, ácida, de caja) y de solvencia (cobertura de intereses, deuda/patrimonio).',
      'El concepto crítico es el **punto de inflexión**: cuando la cobertura de intereses cae por debajo de ~2x, lo financiero empieza a comerse lo económico y la caída se vuelve exponencial. El modelo lo señala.',
    ],
    promptConcepts: ['Económico (resultado) vs. financiero (caja)', 'Liquidez corriente, ácida y de caja', 'Cobertura de intereses', 'Solvencia y deuda/patrimonio', 'Punto de inflexión y caída exponencial'],
    excel: {
      sheetTitle: 'Económico vs. Financiero — Liquidez y Solvencia',
      inputs: [
        { key: 'ac', label: 'Activo corriente', value: 4810, fmt: 'num' },
        { key: 'inventario', label: 'Inventario', value: 2400, fmt: 'num' },
        { key: 'caja', label: 'Caja y bancos', value: 180, fmt: 'num' },
        { key: 'pc', label: 'Pasivo corriente', value: 3250, fmt: 'num' },
        { key: 'deuda_fin', label: 'Deuda financiera total', value: 2570, fmt: 'num' },
        { key: 'patrimonio', label: 'Patrimonio neto', value: 2770, fmt: 'num' },
        { key: 'ebit', label: 'EBIT', value: 830, fmt: 'num' },
        { key: 'intereses', label: 'Intereses', value: 560, fmt: 'num' },
      ],
      calcs: [
        { key: 'liq_corr', label: 'Liquidez corriente', formula: '[ac]/[pc]', fmt: 'x' },
        { key: 'liq_acida', label: 'Liquidez ácida', formula: '([ac]-[inventario])/[pc]', fmt: 'x' },
        { key: 'liq_caja', label: 'Liquidez de caja', formula: '[caja]/[pc]', fmt: 'x' },
        { key: 'cobertura', label: 'Cobertura de intereses', formula: '[ebit]/[intereses]', fmt: 'x' },
        { key: 'deuda_pat', label: 'Deuda / Patrimonio', formula: '[deuda_fin]/[patrimonio]', fmt: 'x' },
        { key: 'pct_ebit_int', label: 'Intereses sobre EBIT', formula: '[intereses]/[ebit]', fmt: 'pct' },
      ],
      conclusions: [
        { label: 'Liquidez', formula: 'IF([liq_acida]<1,"ALERTA financiera: la liquidez acida ("&TEXT([liq_acida],"0.00")&"x) es menor a 1. Sin contar inventario, el corriente no cubre el pasivo corriente.","Liquidez razonable (acida "&TEXT([liq_acida],"0.00")&"x).")' },
        { label: 'Punto de inflexión', formula: 'IF([cobertura]<2,"RIESGO: cobertura "&TEXT([cobertura],"0.0")&"x. Los intereses ya se llevan "&TEXT([pct_ebit_int],"0%")&" del EBIT. Lo financiero come a lo economico; cerca del limite la caida es exponencial.","Cobertura "&TEXT([cobertura],"0.0")&"x: manejable, pero vigila la tendencia.")' },
      ],
    },
  },

  // ===================== SEMANA 6 =====================
  {
    week: 6,
    modernIntro: [
      'El **Free Cash Flow to the Firm (FCFF)** es la medida reina: la caja que genera el negocio antes de decidir cómo se reparte entre accionistas y acreedores. Es independiente de la estructura de financiamiento.',
      'Descomponemos también el **FCFE** (flujo del accionista) y el **FCFD** (flujo del acreedor), y mostramos por qué el FCFF difiere del resultado neto: el CAPEX y, sobre todo, la variación del capital de trabajo.',
    ],
    promptConcepts: ['FCFF = NOPAT + Amortizaciones − CAPEX − Δ Capital de trabajo', 'FCFE (flujo del accionista)', 'FCFD (flujo del acreedor)', 'Por qué el FCFF es la medida clave', 'Diferencia entre resultado neto y caja libre'],
    excel: {
      sheetTitle: 'Free Cash Flow (FCFF · FCFE · FCFD)',
      inputs: [
        { key: 'ebit', label: 'EBIT', value: 830, fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, fmt: 'pct' },
        { key: 'dep', label: 'Amortizaciones', value: 290, fmt: 'num' },
        { key: 'capex', label: 'CAPEX (inversión en activo fijo)', value: 440, fmt: 'num' },
        { key: 'dwc', label: 'Δ Capital de trabajo', value: 720, fmt: 'num', note: 'Aumento de CxC + inventario − proveedores' },
        { key: 'interes', label: 'Intereses', value: 560, fmt: 'num' },
        { key: 'deuda_neta', label: 'Nueva deuda neta (toma − amortización)', value: 80, fmt: 'num' },
        { key: 'net_income', label: 'Resultado neto contable', value: 175, fmt: 'num' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT', formula: '[ebit]*(1-[tax])', fmt: 'num' },
        { key: 'fcff', label: 'FCFF (firma)', formula: 'LET(np,[nopat],np+[dep]-[capex]-[dwc])', fmt: 'num' },
        { key: 'fcfd', label: 'FCFD (acreedores)', formula: '[interes]-[deuda_neta]', fmt: 'num' },
        { key: 'fcfe', label: 'FCFE (accionistas)', formula: '[fcff]-[interes]*(1-[tax])+[deuda_neta]', fmt: 'num' },
        { key: 'brecha', label: 'FCFF − Resultado neto', formula: '[fcff]-[net_income]', fmt: 'num' },
      ],
      conclusions: [
        { label: 'FCFF', formula: '"FCFF "&TEXT([fcff],"#,##0")&" k vs resultado neto "&TEXT([net_income],"#,##0")&" k. La diferencia ("&TEXT([brecha],"#,##0")&" k) la explican el CAPEX y la variacion del capital de trabajo."' },
        { label: 'Reparto', formula: 'IF([fcfe]<0,"El FCFE es negativo ("&TEXT([fcfe],"#,##0")&" k): el accionista no recibe caja; la empresa depende de nueva deuda.","El accionista dispone de "&TEXT([fcfe],"#,##0")&" k de caja libre.")&" Los acreedores reciben "&TEXT([fcfd],"#,##0")&" k."' },
      ],
    },
  },

  // ===================== SEMANA 7 =====================
  {
    week: 7,
    modernIntro: [
      'El **capital de trabajo** es donde se atrapa o se libera la caja. Las técnicas: días de cobranza (DSO), de inventario (DIO) y de pago a proveedores (DPO), que arman el **ciclo de conversión de caja (CCC)**.',
      'La idea estratégica: los **proveedores** son el financiamiento más barato (no oneroso). Estirar el DPO y acortar DSO y DIO libera caja sin recurrir al descubierto.',
    ],
    promptConcepts: ['DSO, DIO, DPO', 'Ciclo de conversión de caja', 'Rotación de cuentas por cobrar e inventario', 'Financiamiento no oneroso con proveedores', 'Cómo liberar caja del capital de trabajo'],
    excel: {
      sheetTitle: 'Capital de Trabajo y Rotaciones',
      inputs: [
        { key: 'cxc', label: 'Cuentas por cobrar', value: 1850, fmt: 'num' },
        { key: 'inventario', label: 'Inventarios', value: 2400, fmt: 'num' },
        { key: 'proveedores', label: 'Proveedores', value: 1280, fmt: 'num' },
        { key: 'ventas', label: 'Ventas anuales', value: 8200, fmt: 'num' },
        { key: 'cmv', label: 'Costo de mercadería vendida', value: 5740, fmt: 'num' },
      ],
      calcs: [
        { key: 'dso', label: 'Días de cobranza (DSO)', formula: '[cxc]/[ventas]*365', fmt: 'days' },
        { key: 'dio', label: 'Días de inventario (DIO)', formula: '[inventario]/[cmv]*365', fmt: 'days' },
        { key: 'dpo', label: 'Días de pago (DPO)', formula: '[proveedores]/[cmv]*365', fmt: 'days' },
        { key: 'ccc', label: 'Ciclo de conversión de caja', formula: '[dso]+[dio]-[dpo]', fmt: 'days' },
        { key: 'rot_cxc', label: 'Rotación de cuentas por cobrar', formula: '[ventas]/[cxc]', fmt: 'x' },
        { key: 'rot_inv', label: 'Rotación de inventario', formula: '[cmv]/[inventario]', fmt: 'x' },
        { key: 'nwc', label: 'Capital de trabajo neto', formula: '[cxc]+[inventario]-[proveedores]', fmt: 'num' },
      ],
      conclusions: [
        { label: 'Ciclo', formula: '"Tu plata queda atrapada "&TEXT([ccc],"0")&" dias (DSO "&TEXT([dso],"0")&" + DIO "&TEXT([dio],"0")&" - DPO "&TEXT([dpo],"0")&"). "&IF([ccc]>90,"Es un ciclo largo: prioriza cobrar mas rapido y rotar el inventario.","Ciclo razonable.")' },
        { label: 'Palanca', formula: '"Cada dia menos de DSO o DIO, y cada dia mas de DPO negociado con proveedores, libera caja sin pagar descubierto. El capital de trabajo neto hoy es "&TEXT([nwc],"#,##0")&" k."' },
      ],
    },
  },

  // ===================== SEMANA 8 =====================
  {
    week: 8,
    modernIntro: [
      'Distinguimos el **CAPEX** (inversión real en activo fijo del período) del **bien de uso contable** (valuado a costo histórico y amortizado). El CAPEX mira el futuro; la amortización, el pasado.',
      'Y volvemos al valor contable vs. mercado por categoría de activo fijo, porque el verdadero valor de los bienes de uso rara vez es el neto contable.',
    ],
    promptConcepts: ['CAPEX vs. bien de uso contable', 'Amortización y valor neto contable', 'Valor contable vs. valor de mercado de activos fijos', 'Activos intangibles no contabilizados', 'CAPEX > amortización como señal de crecimiento'],
    excel: {
      sheetTitle: 'Bienes de Uso y CAPEX — Libro vs. Mercado',
      inputs: [
        { key: 'terr_l', label: 'Terreno (libro)', value: 350, fmt: 'num' },
        { key: 'terr_m', label: 'Terreno (mercado)', value: 900, fmt: 'num' },
        { key: 'edif_l', label: 'Edificio (libro)', value: 620, fmt: 'num' },
        { key: 'edif_m', label: 'Edificio (mercado)', value: 780, fmt: 'num' },
        { key: 'maq_l', label: 'Maquinaria (libro)', value: 1450, fmt: 'num' },
        { key: 'maq_m', label: 'Maquinaria (mercado, parte obsoleta)', value: 1150, fmt: 'num' },
        { key: 'rod_l', label: 'Rodados (libro)', value: 140, fmt: 'num' },
        { key: 'rod_m', label: 'Rodados (mercado)', value: 110, fmt: 'num' },
        { key: 'intang_m', label: 'Marca y cartera (mercado, no contable)', value: 650, fmt: 'num' },
        { key: 'capex', label: 'CAPEX del período', value: 440, fmt: 'num' },
        { key: 'amort', label: 'Amortización del período', value: 290, fmt: 'num' },
      ],
      calcs: [
        { key: 'total_l', label: 'Bienes de uso (libro)', formula: '[terr_l]+[edif_l]+[maq_l]+[rod_l]', fmt: 'num' },
        { key: 'total_m', label: 'Bienes de uso (mercado)', formula: '[terr_m]+[edif_m]+[maq_m]+[rod_m]', fmt: 'num' },
        { key: 'brecha_tangible', label: 'Brecha tangibles (mercado − libro)', formula: '[total_m]-[total_l]', fmt: 'num' },
        { key: 'brecha_total', label: 'Brecha total + intangibles', formula: '[total_m]-[total_l]+[intang_m]', fmt: 'num' },
        { key: 'capex_neto', label: 'CAPEX neto (CAPEX − amortización)', formula: '[capex]-[amort]', fmt: 'num' },
      ],
      conclusions: [
        { label: 'Valor real', formula: '"Los bienes de uso valen "&TEXT([total_m],"#,##0")&" k a mercado vs "&TEXT([total_l],"#,##0")&" k en libros. Sumando la marca/cartera no contabilizada, el valor oculto es "&TEXT([brecha_total],"#,##0")&" k."' },
        { label: 'CAPEX', formula: 'IF([capex_neto]>0,"La empresa esta INVIRTIENDO para crecer: el CAPEX ("&TEXT([capex],"#,##0")&" k) supera a la amortizacion ("&TEXT([amort],"#,##0")&" k) en "&TEXT([capex_neto],"#,##0")&" k.","El CAPEX no alcanza a reponer la amortizacion: la capacidad productiva se esta consumiendo.")' },
      ],
    },
  },

  // ===================== SEMANA 9 =====================
  {
    week: 9,
    modernIntro: [
      'El **WACC en mercados emergentes** no se copia de un manual de EE.UU.: se construye. Partimos del CAPM y le sumamos **riesgo país** y **prima por tamaño**, porque operamos en mercados menos líquidos y con empresas más chicas.',
      'Técnica: Ke = Rf + β·ERP + Riesgo País + Prima por tamaño, con beta apalancada (Hamada), y luego WACC = E/V·Ke + D/V·Kd·(1−t). Es la vara real que el ROIC tiene que superar.',
    ],
    promptConcepts: ['CAPM ajustado a mercados emergentes', 'Riesgo país y prima por tamaño', 'Beta apalancada (Hamada)', 'Costo del equity (Ke)', 'WACC = E/V·Ke + D/V·Kd·(1−t)'],
    excel: {
      sheetTitle: 'WACC para Mercados Emergentes',
      inputs: [
        { key: 'rf', label: 'Tasa libre de riesgo EE.UU.', value: 0.043, fmt: 'pct' },
        { key: 'erp', label: 'Equity Risk Premium (maduro)', value: 0.055, fmt: 'pct' },
        { key: 'pais', label: 'Riesgo país', value: 0.065, fmt: 'pct' },
        { key: 'size', label: 'Prima por tamaño (PyME)', value: 0.035, fmt: 'pct' },
        { key: 'beta_u', label: 'Beta desapalancada (sector)', value: 0.85, fmt: 'num2' },
        { key: 'kd', label: 'Costo de deuda (antes de impuesto)', value: 0.18, fmt: 'pct' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, fmt: 'pct' },
        { key: 'peso_deuda', label: 'Peso de la deuda D/V', value: 0.45, fmt: 'pct' },
      ],
      calcs: [
        { key: 'peso_eq', label: 'Peso del equity E/V', formula: '1-[peso_deuda]', fmt: 'pct' },
        { key: 'de', label: 'Relación D/E', formula: '[peso_deuda]/[peso_eq]', fmt: 'x' },
        { key: 'beta_l', label: 'Beta apalancada (Hamada)', formula: '[beta_u]*(1+(1-[tax])*[de])', fmt: 'num2' },
        { key: 'ke', label: 'Costo del equity (Ke)', formula: 'LET(b,[beta_l],[rf]+b*[erp]+[pais]+[size])', fmt: 'pct' },
        { key: 'kd_after', label: 'Costo de deuda después de impuesto', formula: '[kd]*(1-[tax])', fmt: 'pct' },
        { key: 'wacc', label: 'WACC', formula: '[peso_eq]*[ke]+[peso_deuda]*[kd_after]', fmt: 'pct' },
      ],
      conclusions: [
        { label: 'Composición', formula: '"Ke "&TEXT([ke],"0.0%")&" = Rf "&TEXT([rf],"0.0%")&" + beta·ERP "&TEXT([beta_l]*[erp],"0.0%")&" + riesgo pais "&TEXT([pais],"0.0%")&" + tamano "&TEXT([size],"0.0%")&". El riesgo pais y el tamano explican gran parte del costo."' },
        { label: 'Vara', formula: '"WACC "&TEXT([wacc],"0.0%")&": esta es la rentabilidad minima (ROIC) que el negocio debe superar para crear valor en tu mercado."' },
      ],
    },
  },

  // ===================== SEMANA 10 =====================
  {
    week: 10,
    modernIntro: [
      'El **apalancamiento** es un multiplicador de doble filo: ROE = ROIC + (ROIC − i(1−t))·D/E. Si el ROIC supera el costo de la deuda, la deuda multiplica el retorno; si no, lo destruye.',
      'Modelamos la **sensibilidad del ROE al nivel de deuda** con una matriz dinámica, y vigilamos la **cobertura de intereses** para detectar cuándo el apalancamiento se vuelve riesgo (Modigliani-Miller en la práctica).',
    ],
    promptConcepts: ['ROE apalancado = ROIC + (ROIC − i(1−t))·D/E', 'La deuda como multiplicador de ganancias y pérdidas', 'Riesgo económico vs. financiero', 'Nivel óptimo de deuda y cobertura de intereses', 'Modigliani-Miller en la práctica'],
    excel: {
      sheetTitle: 'Apalancamiento y Riesgo',
      inputs: [
        { key: 'roic', label: 'ROIC (rinde el capital)', value: 0.16, fmt: 'pct' },
        { key: 'kd', label: 'Costo de deuda (antes de impuesto)', value: 0.18, fmt: 'pct' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, fmt: 'pct' },
        { key: 'capital', label: 'Capital total (D + E)', value: 5000, fmt: 'num' },
        { key: 'ebit', label: 'EBIT', value: 830, fmt: 'num' },
        { key: 'peso_deuda', label: 'Nivel de deuda D/(D+E)', value: 0.45, fmt: 'pct' },
      ],
      calcs: [
        { key: 'kd_after', label: 'Costo de deuda después de impuesto', formula: '[kd]*(1-[tax])', fmt: 'pct' },
        { key: 'deuda', label: 'Deuda', formula: '[capital]*[peso_deuda]', fmt: 'num' },
        { key: 'equity', label: 'Patrimonio', formula: '[capital]*(1-[peso_deuda])', fmt: 'num' },
        { key: 'de', label: 'Relación D/E', formula: '[deuda]/[equity]', fmt: 'x' },
        { key: 'roe', label: 'ROE apalancado', formula: '[roic]+([roic]-[kd_after])*[de]', fmt: 'pct' },
        { key: 'intereses', label: 'Intereses', formula: '[deuda]*[kd]', fmt: 'num' },
        { key: 'cobertura', label: 'Cobertura de intereses', formula: '[ebit]/[intereses]', fmt: 'x' },
        { key: 'spread', label: 'Spread ROIC − Kd(1−t)', formula: '[roic]-[kd_after]', fmt: 'pct' },
      ],
      dynamic: {
        title: 'Sensibilidad del ROE al nivel de deuda',
        note: 'Matriz dinámica: la columna de ROE se calcula con LET + SEQUENCE para cada nivel de deuda de 0% a 80%.',
        columns: ['Nivel de deuda D/(D+E)', 'ROE resultante'],
        spillFormulas: [
          'SEQUENCE(9,1,0,0.1)',
          'LET(dr,SEQUENCE(9,1,0,0.1),de,dr/(1-dr),[roic]+([roic]-[kd_after])*de)',
        ],
        formats: ['pct', 'pct'],
        spillRows: 9,
      },
      conclusions: [
        { label: 'Multiplicador', formula: 'IF([spread]>0,"La deuda MULTIPLICA: el capital rinde "&TEXT([roic],"0.0%")&" y la deuda cuesta "&TEXT([kd_after],"0.0%")&" (post impuesto). Mas deuda sube el ROE.","La deuda DESTRUYE: el capital rinde "&TEXT([roic],"0.0%")&" pero la deuda cuesta "&TEXT([kd_after],"0.0%")&". Endeudarse baja el ROE.")' },
        { label: 'Riesgo', formula: 'IF([cobertura]<2,"RIESGO: cobertura "&TEXT([cobertura],"0.0")&"x. El apalancamiento ya es peligroso; ante una baja de ventas, la caida es exponencial.","Cobertura "&TEXT([cobertura],"0.0")&"x: el nivel de deuda es manejable.")' },
      ],
    },
  },

  // ===================== SEMANA 11 =====================
  {
    week: 11,
    modernIntro: [
      'El **tiempo y la tasa** definen el verdadero costo del dinero. Distinguimos tasa nominal (TNA), efectiva (TEA), real (Fisher) y el **Costo Financiero Total** con comisiones e impuestos.',
      'Y comparamos sistemas de amortización. El modelo arma el cuadro de marcha del sistema **francés** con **matrices dinámicas** (SEQUENCE + IPMT/PPMT), de modo que se recalcula entero al cambiar capital, tasa o plazo.',
    ],
    promptConcepts: ['Tasa nominal (TNA) vs. efectiva (TEA)', 'Tasa real de Fisher', 'Costo Financiero Total (CFT) con comisiones e impuestos', 'Sistemas de amortización: francés, alemán, americano', 'Valor tiempo del dinero'],
    excel: {
      sheetTitle: 'Tasas y Amortización (Sistema Francés)',
      inputs: [
        { key: 'principal', label: 'Capital del préstamo', value: 1000, fmt: 'num' },
        { key: 'tna', label: 'Tasa Nominal Anual (TNA)', value: 0.36, fmt: 'pct' },
        { key: 'm', label: 'Capitalizaciones por año', value: 12, fmt: 'num' },
        { key: 'n', label: 'Cantidad de cuotas (meses)', value: 12, fmt: 'num' },
        { key: 'inflacion', label: 'Inflación anual esperada', value: 0.45, fmt: 'pct' },
        { key: 'comisiones', label: 'Comisiones/gastos (% capital)', value: 0.03, fmt: 'pct' },
        { key: 'impuestos', label: 'Impuestos sobre intereses', value: 0.21, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ratem', label: 'Tasa mensual (TNA/m)', formula: '[tna]/[m]', fmt: 'pct2' },
        { key: 'tea', label: 'Tasa Efectiva Anual (TEA)', formula: '(1+[ratem])^[m]-1', fmt: 'pct' },
        { key: 'real', label: 'Tasa real (Fisher)', formula: '(1+[tea])/(1+[inflacion])-1', fmt: 'pct' },
        { key: 'cft', label: 'Costo Financiero Total (CFT)', formula: '[tea]*(1+[impuestos])+[comisiones]', fmt: 'pct' },
        { key: 'pmt', label: 'Cuota mensual (sistema francés)', formula: 'PMT([ratem],[n],-[principal])', fmt: 'num2' },
        { key: 'total_int', label: 'Intereses totales', formula: '[pmt]*[n]-[principal]', fmt: 'num2' },
      ],
      dynamic: {
        title: 'Cuadro de marcha — Sistema Francés',
        note: 'Matriz dinámica: cada columna se genera con SEQUENCE e IPMT/PPMT; el saldo usa la fórmula cerrada. Cambiá capital, tasa o cuotas y todo se recalcula.',
        columns: ['Período', 'Cuota', 'Interés', 'Capital', 'Saldo'],
        spillFormulas: [
          'SEQUENCE([n])',
          '0*SEQUENCE([n])+[pmt]',
          'IPMT([ratem],SEQUENCE([n]),[n],-[principal])',
          'PPMT([ratem],SEQUENCE([n]),[n],-[principal])',
          '[principal]*(1+[ratem])^SEQUENCE([n])-[pmt]*((1+[ratem])^SEQUENCE([n])-1)/[ratem]',
        ],
        formats: ['num', 'num2', 'num2', 'num2', 'num2'],
        spillRows: 12,
      },
      conclusions: [
        { label: 'De la TNA al CFT', formula: '"La TNA es "&TEXT([tna],"0.0%")&", pero la TEA es "&TEXT([tea],"0.0%")&" y el CFT real (con comisiones e impuestos) es "&TEXT([cft],"0.0%")&". Nunca decidas mirando solo la tasa del cartel."' },
        { label: 'Tasa real', formula: 'IF([real]<0,"La tasa real es NEGATIVA ("&TEXT([real],"0.0%")&"): con esta inflacion, te endeudas en moneda que se deprecia.","La tasa real es POSITIVA ("&TEXT([real],"0.0%")&"): la deuda cuesta de verdad; usala solo si el activo rinde mas.")' },
      ],
    },
  },

  // ===================== SEMANA 12 =====================
  {
    week: 12,
    modernIntro: [
      'Integramos todo en una **valuación por flujo de fondos descontado (DCF)**: proyectamos el FCFF, lo descontamos al WACC, sumamos el valor terminal de Gordon y pasamos de Enterprise Value a Equity Value restando la deuda neta.',
      'La proyección se arma con **matrices dinámicas** (SEQUENCE) y el valor presente con **LET**, para que la valuación entera reaccione a cada supuesto. Es el cierre: cómo se compone y se mejora el valor.',
    ],
    promptConcepts: ['Valuación por DCF', 'Proyección de FCFF y descuento al WACC', 'Valor terminal (perpetuidad de Gordon)', 'Enterprise Value vs. Equity Value', 'Sensibilidad del valor al WACC y al crecimiento'],
    excel: {
      sheetTitle: 'Valuación por DCF',
      inputs: [
        { key: 'base', label: 'FCFF base (último año)', value: 305, fmt: 'num' },
        { key: 'growth', label: 'Crecimiento del FCFF', value: 0.06, fmt: 'pct' },
        { key: 'years', label: 'Años de proyección', value: 5, fmt: 'num' },
        { key: 'wacc', label: 'WACC (tasa de descuento)', value: 0.21, fmt: 'pct' },
        { key: 'tg', label: 'Crecimiento perpetuo (g)', value: 0.03, fmt: 'pct' },
        { key: 'deuda_neta', label: 'Deuda neta', value: 3090, fmt: 'num' },
      ],
      calcs: [
        { key: 'pv_explicit', label: 'VP de flujos explícitos', formula: 'LET(t,SEQUENCE([years]),SUM([base]*(1+[growth])^t/(1+[wacc])^t))', fmt: 'num' },
        { key: 'tv', label: 'Valor terminal (Gordon)', formula: '[base]*(1+[growth])^[years]*(1+[tg])/([wacc]-[tg])', fmt: 'num' },
        { key: 'pv_tv', label: 'VP del valor terminal', formula: '[tv]/(1+[wacc])^[years]', fmt: 'num' },
        { key: 'ev', label: 'Enterprise Value', formula: '[pv_explicit]+[pv_tv]', fmt: 'num' },
        { key: 'equity', label: 'Equity Value', formula: '[ev]-[deuda_neta]', fmt: 'num' },
        { key: 'peso_tv', label: 'Peso del valor terminal', formula: '[pv_tv]/[ev]', fmt: 'pct' },
      ],
      dynamic: {
        title: 'Proyección de flujos descontados',
        note: 'Matriz dinámica: año, FCFF proyectado y valor presente generados con SEQUENCE.',
        columns: ['Año', 'FCFF proyectado', 'Factor de descuento', 'Valor presente'],
        spillFormulas: [
          'SEQUENCE([years])',
          '[base]*(1+[growth])^SEQUENCE([years])',
          '1/(1+[wacc])^SEQUENCE([years])',
          '[base]*(1+[growth])^SEQUENCE([years])/(1+[wacc])^SEQUENCE([years])',
        ],
        formats: ['num', 'num', 'num2', 'num'],
        spillRows: 5,
      },
      conclusions: [
        { label: 'Valor', formula: '"Enterprise Value "&TEXT([ev],"#,##0")&" k; Equity Value "&TEXT([equity],"#,##0")&" k (tras restar deuda neta). El valor terminal pesa "&TEXT([peso_tv],"0%")&" del total."' },
        { label: 'Sensibilidad', formula: 'IF([wacc]-[tg]<0.05,"CUIDADO: WACC y g estan muy cerca; el valor terminal se dispara y la valuacion se vuelve fragil.","Relacion WACC-g razonable. Movi el WACC unos puntos y observa cuanto cambia el valor: ese es el costo del riesgo pais.")' },
      ],
    },
  },
]
