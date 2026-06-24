import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 9 — Costo del Capital (WACC en mercados emergentes)
// Incorpora: value-generation-emerging-markets (WACC sin doble conteo),
// synthetic-tsr (Ke no cotizada, Beta Total), apv (Ku) y value-driver-interrelations.
// ============================================================================

export const week09: ItemSpec[] = [
  {
    id: 's09-i1',
    week: 9,
    order: 1,
    title: 'El costo del equity base (CAPM)',
    subtitle: 'Cuánto exige un accionista por el riesgo de mercado, antes del riesgo emergente',
    framework: 'CAPM · Sharpe-Lintner',
    theory: [
      {
        heading: 'El punto de partida: el modelo CAPM',
        paragraphs: [
          'El **CAPM (Capital Asset Pricing Model)** dice que el retorno que exige un accionista tiene tres componentes: una **tasa libre de riesgo** (Rf), más la **prima por el riesgo de mercado** (ERP, *equity risk premium*) multiplicada por la **beta** del activo. La fórmula es Ke = Rf + β·ERP.',
          'La **beta** mide cuánto se mueve la acción cuando se mueve el mercado: una beta de 1 replica al índice; mayor a 1 amplifica; menor a 1 amortigua. Es la medida del **riesgo sistemático**, el que no se puede diluir diversificando.',
          'Este Ke base es el de una empresa **comparable de un mercado desarrollado** (típicamente EE.UU.). Es el piso conceptual: todavía no incorpora el riesgo de operar en un país emergente ni el de ser una empresa chica y cerrada. Eso se suma en los ítems siguientes.',
        ],
      },
      {
        heading: 'De dónde sale cada número',
        paragraphs: [
          'La **Rf** se toma del bono del Tesoro de EE.UU. a 10 años, porque es el activo más cercano a "sin riesgo" del mundo. La **ERP** se estima histórica o implícita (Damodaran publica ambas); ronda 4,5%–6% para mercados maduros. La **beta** se obtiene del sector (Damodaran publica betas desapalancadas por industria) y se reapalanca con la estructura de la empresa.',
          '**Interrelación clave:** este Ke base alimenta el **WACC** (ítem 3) y, vía el WACC, toda la valuación por DCF de la Semana 12. Un error de un punto en la beta o la ERP se propaga a todo el valor.',
        ],
      },
      {
        heading: 'Errores frecuentes del CEO',
        paragraphs: [
          'Tomar la beta de una sola empresa "parecida" en vez del promedio del sector. Usar una ERP de memoria sin chequear la fuente. Y el más caro: creer que este número ya es el costo del capital de tu PyME argentina, cuando en realidad es apenas el cimiento.',
        ],
      },
    ],
    model: {
      excelTitle: 'CAPM — Costo del equity base',
      inputs: [
        { key: 'rf', label: 'Tasa libre de riesgo (EE.UU.)', value: 0.043, min: 0, max: 0.1, step: 0.001, fmt: 'pct' },
        { key: 'erp', label: 'Prima por riesgo de mercado (ERP)', value: 0.055, min: 0.03, max: 0.09, step: 0.001, fmt: 'pct' },
        { key: 'beta', label: 'Beta del sector', value: 0.85, min: 0.3, max: 2, step: 0.05, fmt: 'num2' },
      ],
      calcs: [
        { key: 'primaMercado', label: 'Prima de mercado (β × ERP)', fmt: 'pct', calc: (v) => v.beta * v.erp, xl: '[beta]*[erp]' },
        { key: 'keUS', label: 'Ke base (mercado desarrollado)', fmt: 'pct', highlight: true, calc: (v) => v.rf + v.beta * v.erp, xl: '[rf]+[beta]*[erp]' },
      ],
      conclusions: [
        {
          test: (v) => v.beta <= 1,
          good: 'La beta es ≤ 1: el negocio amortigua los vaivenes del mercado. Este Ke base es el PISO; todavía falta sumarle el riesgo país y el de tamaño.',
          bad: 'La beta es > 1: el negocio amplifica los ciclos del mercado y exige más retorno. Recordá que este Ke base aún NO incluye el riesgo emergente.',
          xl: 'IF([beta]<=1,"La beta es menor o igual a 1: el negocio amortigua el mercado. Este Ke base ("&TEXT([keUS],"0.0%")&") es el PISO; falta el riesgo pais y tamano.","La beta es mayor a 1: amplifica los ciclos. Ke base "&TEXT([keUS],"0.0%")&", aun sin riesgo emergente.")',
        },
      ],
      chart: { sweepKey: 'beta', outKey: 'keUS', xLabel: 'Beta', yLabel: 'Ke base', yFmt: 'pct' },
    },
    promptConcepts: ['CAPM: Ke = Rf + β·ERP', 'Tasa libre de riesgo y prima de mercado (ERP)', 'Beta del sector (Damodaran)', 'Riesgo sistemático vs. diversificable', 'Por qué el Ke base es solo el punto de partida'],
  },

  {
    id: 's09-i2',
    week: 9,
    order: 2,
    title: 'Riesgo país sin doble conteo',
    subtitle: 'EMBI, lambda de Damodaran y el ajuste 1−R² de Pereiro',
    framework: 'Damodaran · Pereiro',
    theory: [
      {
        heading: 'El error de sumar el EMBI completo',
        paragraphs: [
          'La tentación es simple: tomar el **EMBI** (el spread de la deuda soberana sobre el bono de EE.UU., que mide el riesgo país) y sumárselo entero al Ke de todas las empresas. Eso es **doble conteo**: parte de ese riesgo ya está capturado en la beta y en los flujos, y no todas las empresas están igual de expuestas al riesgo soberano.',
          'Un exportador con ingresos en dólares y clientes afuera está mucho menos expuesto al riesgo país que un comercio que vende solo en el mercado local. Cobrarles a ambos el EMBI completo distorsiona la valuación.',
        ],
      },
      {
        heading: 'Dos correcciones: lambda y 1−R²',
        paragraphs: [
          '**Lambda de Damodaran (λ):** mide la exposición específica de la empresa al riesgo país (por ejemplo, qué porcentaje de sus ingresos depende de la economía local). El riesgo país que se suma es EMBI × λ. Una λ de 0,7 significa 70% de exposición.',
          '**Ajuste 1−R² de Pereiro:** parte de que la beta del mercado emergente ya explica una porción del riesgo total (el R² de la regresión). Para no contar dos veces, solo se agrega la parte **no explicada**: EMBI × (1−R²). En mercados poco líquidos el R² es bajo, así que queda casi todo el spread; en mercados más integrados, menos.',
          '**Aclaración del marco (SPAM):** el *Stackable Premiums and Adjustments Model* es el método de ir **apilando primas** (país, tamaño, iliquidez) sobre el CAPM; NO es la corrección anti-doble-conteo. La corrección anti-doble-conteo son justamente el 1−R² de Pereiro y la λ de Damodaran.',
        ],
      },
      {
        heading: 'Interrelación y decisiones',
        paragraphs: [
          'Este componente se suma al Ke base del ítem 1 para llegar al **Ke local**, que alimenta el WACC (ítem 3). Elegir bien entre EMBI completo, λ o 1−R² puede mover el WACC varios puntos y, con él, la valuación entera (Semana 12).',
          '**Error frecuente:** sumar el EMBI completo "por las dudas". Resultado: se subestima el valor de la empresa y se rechazan proyectos que en realidad crean valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'Riesgo país sin doble conteo',
      inputs: [
        { key: 'embi', label: 'EMBI (spread soberano)', value: 0.065, min: 0, max: 0.15, step: 0.005, fmt: 'pct' },
        { key: 'lambda', label: 'Lambda (exposición de la empresa)', value: 0.7, min: 0, max: 1.5, step: 0.05, fmt: 'num2' },
        { key: 'r2', label: 'R² de la regresión (mercado)', value: 0.4, min: 0, max: 0.95, step: 0.05, fmt: 'pct' },
      ],
      calcs: [
        { key: 'crpFull', label: 'Sumar EMBI completo (doble conteo)', fmt: 'pct', calc: (v) => v.embi, xl: '[embi]' },
        { key: 'crpLambda', label: 'Riesgo país × lambda (Damodaran)', fmt: 'pct', calc: (v) => v.embi * v.lambda, xl: '[embi]*[lambda]' },
        { key: 'crpPereiro', label: 'Riesgo país × (1−R²) (Pereiro)', fmt: 'pct', highlight: true, calc: (v) => v.embi * (1 - v.r2), xl: '[embi]*(1-[r2])' },
      ],
      conclusions: [
        {
          test: (v) => v.embi * (1 - v.r2) < v.embi,
          good: 'Evitás el doble conteo: con 1−R² (Pereiro) sumás solo el riesgo país NO explicado por la beta, no el EMBI entero. La diferencia se traslada directo al WACC y al valor.',
          bad: 'Con R² = 0 el ajuste de Pereiro coincide con el EMBI completo: el mercado es tan ilíquido que la beta casi no explica el riesgo. Revisá la calidad de la regresión.',
          xl: 'IF([crpPereiro]<[crpFull],"Evitas el doble conteo: con 1-R2 (Pereiro) sumas "&TEXT([crpPereiro],"0.0%")&" en vez del EMBI completo "&TEXT([crpFull],"0.0%")&". Esa diferencia se traslada al WACC.","Con R2=0 el ajuste de Pereiro iguala al EMBI completo: la beta casi no explica el riesgo.")',
        },
      ],
      chart: { sweepKey: 'r2', outKey: 'crpPereiro', xLabel: 'R²', yLabel: 'Riesgo país ajustado', yFmt: 'pct' },
    },
    promptConcepts: ['EMBI y riesgo país soberano', 'Lambda de Damodaran (exposición de la empresa)', 'Ajuste 1−R² de Pereiro (anti doble conteo)', 'SPAM: apilado de primas (no es la corrección)', 'Por qué no sumar el EMBI completo a todas las empresas'],
  },

  {
    id: 's09-i3',
    week: 9,
    order: 3,
    title: 'El WACC ponderado',
    subtitle: 'Combinar el costo del equity y de la deuda con el escudo fiscal',
    framework: 'WACC · Modigliani-Miller',
    theory: [
      {
        heading: 'El costo promedio ponderado del capital',
        paragraphs: [
          'El **WACC (Weighted Average Cost of Capital)** combina lo que cuesta financiarse con los dueños (Ke) y con los acreedores (Kd), ponderado por cuánto pesa cada fuente: WACC = (E/V)·Ke + (D/V)·Kd·(1−t).',
          'La deuda entra **después de impuestos** porque los intereses son deducibles: el Estado "subsidia" parte del costo financiero. Ese es el **escudo fiscal**, y es la razón por la que un poco de deuda baja el WACC.',
          'El WACC es la **tasa de descuento** del flujo de fondos de la firma (FCFF) y la **vara mínima** que el ROIC debe superar para crear valor. Es la bisagra entre el costo del capital (esta semana) y la valuación (Semana 12).',
        ],
      },
      {
        heading: 'El Kd verdadero en un mercado emergente',
        paragraphs: [
          'El Kd no es la tasa del cartel del banco: es el costo efectivo de TODA la deuda onerosa (préstamos, descubierto, cheques descontados), ponderado por su peso. En economías con tasas altas, el Kd local puede ser muy superior al de un manual estadounidense.',
          '**Cuidado con la estructura:** el WACC supone una estructura de capital **constante** en el tiempo. Si la empresa está desapalancándose o reestructurando pasivos (LBO, plan de pagos), el WACC falla y conviene valuar por **APV** (Semanas 10 y 12).',
        ],
      },
    ],
    model: {
      excelTitle: 'WACC ponderado',
      inputs: [
        { key: 'ke', label: 'Costo del equity (Ke, con riesgo país)', value: 0.2, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'kd', label: 'Costo de la deuda (antes de impuesto)', value: 0.18, min: 0.05, max: 0.45, step: 0.005, fmt: 'pct' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'wd', label: 'Peso de la deuda (D/V)', value: 0.45, min: 0, max: 0.8, step: 0.05, fmt: 'pct' },
      ],
      calcs: [
        { key: 'we', label: 'Peso del equity (E/V)', fmt: 'pct', calc: (v) => 1 - v.wd, xl: '1-[wd]' },
        { key: 'kdAfter', label: 'Kd después de impuesto', fmt: 'pct', calc: (v) => v.kd * (1 - v.tax), xl: '[kd]*(1-[tax])' },
        { key: 'wacc', label: 'WACC', fmt: 'pct', highlight: true, calc: (v) => (1 - v.wd) * v.ke + v.wd * v.kd * (1 - v.tax), xl: '[we]*[ke]+[wd]*[kdAfter]' },
      ],
      conclusions: [
        {
          test: (v) => v.kd * (1 - v.tax) < v.ke,
          good: 'La deuda (después del escudo fiscal) cuesta menos que el equity: por eso algo de deuda BAJA el WACC. Pero ojo: más allá de cierto punto, el riesgo financiero hace subir Ke y Kd (Semana 10).',
          bad: 'La deuda después de impuesto cuesta MÁS que el equity: en este escenario endeudarse sube el WACC. Revisá el Kd local o la estructura.',
          xl: 'IF([kdAfter]<[ke],"La deuda con escudo fiscal ("&TEXT([kdAfter],"0.0%")&") cuesta menos que el equity ("&TEXT([ke],"0.0%")&"): algo de deuda BAJA el WACC, hoy en "&TEXT([wacc],"0.0%")&".","La deuda post impuesto cuesta mas que el equity: endeudarse sube el WACC.")',
        },
      ],
      chart: { sweepKey: 'wd', outKey: 'wacc', xLabel: 'Peso de la deuda', yLabel: 'WACC', yFmt: 'pct' },
    },
    promptConcepts: ['WACC = E/V·Ke + D/V·Kd·(1−t)', 'Escudo fiscal de la deuda', 'Kd efectivo de la deuda onerosa', 'WACC como vara mínima del ROIC', 'Cuándo el WACC falla (estructura cambiante → APV)'],
  },

  {
    id: 's09-i4',
    week: 9,
    order: 4,
    title: 'Ke de la PyME no cotizada (Beta Total)',
    subtitle: 'Por qué el dueño no diversificado exige una tasa mayor',
    framework: 'Damodaran · Pereiro (AL-CAPM)',
    theory: [
      {
        heading: 'El dueño que tiene todos los huevos en una canasta',
        paragraphs: [
          'El CAPM supone un inversor **diversificado** que solo cobra por el riesgo sistemático (la beta). Pero el dueño de una PyME tiene **casi todo su patrimonio en una sola empresa**: soporta el riesgo total, no solo el de mercado. Por eso exige más.',
          'La herramienta es la **Beta Total** de Damodaran: β_total = β / ρ, donde ρ es la correlación de la empresa con el mercado (la raíz del R²). Como ρ < 1, la Beta Total es **siempre mayor** que la beta de mercado, y tanto más cuanto menos correlacionada (más idiosincrática) es la empresa.',
          'Equivalentemente, Pereiro lo formaliza en el **AL-CAPM** (CAPM ajustado para Latinoamérica) y AECA en el **3CM**. La idea común: un dueño concentrado descuenta sus flujos a una tasa más alta que un fondo diversificado.',
        ],
      },
      {
        heading: 'Beta Total y la prima por tamaño',
        paragraphs: [
          'Sobre la Beta Total se apila además la **prima por tamaño**: las empresas chicas son más frágiles (menos acceso al crédito, más dependientes de pocos clientes), y el mercado les exige un plus. Damodaran y Duff & Phelps publican estas primas por decil de capitalización.',
          '**Interrelación:** este Ke "del dueño" es el que se usa para valuar la PyME por DCF o TSR Sintético (Semana 12) y para fijar la **política de dividendos** (si el ROIC del negocio supera a este Ke, conviene reinvertir; si no, distribuir). También se conecta con los descuentos DLOC/DLOM por falta de control y de liquidez.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Valuar una PyME familiar con el Ke de una empresa que cotiza (subvaluar el riesgo). Olvidar la prima por tamaño. O, al revés, apilar primas sin criterio y llegar a un Ke absurdo de 40%+ que mata cualquier proyecto.',
        ],
      },
    ],
    model: {
      excelTitle: 'Ke PyME no cotizada (Beta Total)',
      inputs: [
        { key: 'rf', label: 'Tasa libre de riesgo', value: 0.043, min: 0, max: 0.1, step: 0.001, fmt: 'pct' },
        { key: 'erp', label: 'Prima de mercado (ERP)', value: 0.055, min: 0.03, max: 0.09, step: 0.001, fmt: 'pct' },
        { key: 'betaMkt', label: 'Beta de mercado', value: 0.85, min: 0.3, max: 2, step: 0.05, fmt: 'num2' },
        { key: 'rho', label: 'Correlación con el mercado (ρ)', value: 0.5, min: 0.15, max: 1, step: 0.05, fmt: 'num2' },
        { key: 'crp', label: 'Riesgo país', value: 0.065, min: 0, max: 0.15, step: 0.005, fmt: 'pct' },
        { key: 'size', label: 'Prima por tamaño', value: 0.035, min: 0, max: 0.08, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'betaTotal', label: 'Beta Total (β / ρ)', fmt: 'num2', calc: (v) => v.betaMkt / v.rho, xl: '[betaMkt]/[rho]' },
        { key: 'keDiv', label: 'Ke inversor diversificado', fmt: 'pct', calc: (v) => v.rf + v.betaMkt * v.erp + v.crp + v.size, xl: '[rf]+[betaMkt]*[erp]+[crp]+[size]' },
        { key: 'keTotal', label: 'Ke dueño no diversificado', fmt: 'pct', highlight: true, calc: (v) => v.rf + (v.betaMkt / v.rho) * v.erp + v.crp + v.size, xl: '[rf]+[betaTotal]*[erp]+[crp]+[size]' },
        { key: 'premium', label: 'Plus por no diversificar', fmt: 'pct', calc: (v) => (v.betaMkt / v.rho - v.betaMkt) * v.erp, xl: '([betaTotal]-[betaMkt])*[erp]' },
      ],
      conclusions: [
        {
          test: (v) => v.rho < 1,
          good: 'El dueño no diversificado exige más: la Beta Total (β/ρ) supera a la beta de mercado y su Ke sube. Cuanto menos correlacionada con el mercado es la empresa, mayor es el plus.',
          bad: 'Con ρ = 1 (empresa perfectamente correlacionada con el mercado) la Beta Total iguala a la beta de mercado: no hay plus por concentración. Es un caso teórico extremo.',
          xl: 'IF([rho]<1,"El dueno no diversificado exige mas: Beta Total "&TEXT([betaTotal],"0.00")&" > beta de mercado "&TEXT([betaMkt],"0.00")&". Su Ke sube a "&TEXT([keTotal],"0.0%")&" ("&TEXT([premium],"0.0%")&" de plus).","Con rho=1 la Beta Total iguala a la de mercado: sin plus por concentracion.")',
        },
      ],
      chart: { sweepKey: 'rho', outKey: 'keTotal', xLabel: 'Correlación ρ', yLabel: 'Ke del dueño', yFmt: 'pct' },
    },
    promptConcepts: ['Beta Total = β / ρ (Damodaran)', 'Dueño no diversificado vs. inversor de mercado', 'AL-CAPM de Pereiro / 3CM de AECA', 'Prima por tamaño', 'Por qué la PyME cerrada se descuenta a tasa mayor'],
  },

  {
    id: 's09-i5',
    week: 9,
    order: 5,
    title: 'Del WACC a la decisión: ROIC vs WACC',
    subtitle: 'El spread de valor y cuánto cuesta equivocarse en la tasa',
    framework: 'McKinsey KVD · value-driver-interrelations',
    theory: [
      {
        heading: 'El WACC no es un número de planilla: es una decisión',
        paragraphs: [
          'Todo el trabajo de estimar Rf, beta, riesgo país y tamaño tiene un único propósito: obtener la **vara** que el negocio debe superar. Si el **ROIC** (lo que rinde el capital) supera al **WACC** (lo que cuesta), la empresa **crea valor**; si no, lo **destruye**, aunque tenga ganancia contable.',
          'El **spread ROIC − WACC** es, según McKinsey, el corazón del *key value driver*: el valor crece con el spread y con el crecimiento rentable, y se hunde cuando el spread es negativo. Es el puente entre el costo del capital (esta semana) y la creación de valor (Semanas 3, 4 y 12).',
        ],
      },
      {
        heading: 'La sensibilidad: por qué un punto importa tanto',
        paragraphs: [
          'En la valuación por perpetuidad de Gordon, Valor = FCFF·(1+g)/(WACC−g). Cuando el WACC y el crecimiento g están cerca, el denominador se achica y el valor se **dispara o se derrumba** con cambios mínimos de la tasa. Por eso un error de un punto en el WACC —muy fácil de cometer con el riesgo país— puede cambiar la valuación en decenas de por ciento.',
          'En mercados emergentes, donde el riesgo país agrega volatilidad a la tasa, esta sensibilidad es la principal fuente de error de una valuación. Moverla en el simulador es la mejor forma de internalizar el riesgo.',
        ],
      },
      {
        heading: 'Qué decisiones habilita',
        paragraphs: [
          'Define el **piso de rentabilidad** de cualquier proyecto o inversión (CAPEX). Orienta la **política de dividendos** (reinvertir solo si el RONIC supera al WACC, Semana 8). Y fija la **tasa de descuento** de la valuación integral de la Semana 12. Sin un WACC bien estimado, ninguna de estas decisiones es confiable.',
        ],
      },
    ],
    model: {
      excelTitle: 'ROIC vs WACC y sensibilidad del valor',
      inputs: [
        { key: 'roic', label: 'ROIC (rinde el capital)', value: 0.1, min: 0, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC (cuesta el capital)', value: 0.21, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'fcff', label: 'FCFF anual', value: 305, min: 0, max: 1000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.03, min: -0.02, max: 0.08, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'spread', label: 'Spread (ROIC − WACC)', fmt: 'pct', highlight: true, calc: (v) => v.roic - v.wacc, xl: '[roic]-[wacc]' },
        { key: 'valor', label: 'Valor (perpetuidad de Gordon)', fmt: 'money', calc: (v) => (v.wacc > v.g ? (v.fcff * (1 + v.g)) / (v.wacc - v.g) : NaN), xl: 'IF([wacc]>[g],[fcff]*(1+[g])/([wacc]-[g]),NA())' },
      ],
      conclusions: [
        {
          test: (v) => v.roic - v.wacc >= 0,
          good: 'El ROIC supera al WACC: el capital rinde más de lo que cuesta y la empresa CREA valor. Crecer (subir g) agranda el valor.',
          bad: 'El ROIC es menor al WACC: la empresa DESTRUYE valor aunque tenga ganancia contable. Acá, crecer EMPEORA las cosas: primero hay que cerrar el spread.',
          xl: 'IF([roic]>=[wacc],"El ROIC ("&TEXT([roic],"0.0%")&") supera al WACC ("&TEXT([wacc],"0.0%")&"): se CREA valor. Crecer agranda el valor.","El ROIC es menor al WACC: se DESTRUYE valor. Crecer empeora; primero hay que cerrar el spread.")',
        },
      ],
      chart: { sweepKey: 'wacc', outKey: 'valor', xLabel: 'WACC', yLabel: 'Valor', yFmt: 'money' },
    },
    promptConcepts: ['Spread ROIC − WACC (key value driver de McKinsey)', 'Crear vs. destruir valor', 'Perpetuidad de Gordon y sensibilidad al WACC', 'Por qué un punto de WACC cambia tanto el valor', 'El WACC como piso de rentabilidad de proyectos'],
  },
]
