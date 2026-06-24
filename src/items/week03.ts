import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 3 — NOPAT, ROIC y DuPont (la rentabilidad operativa pura)
// Incorpora: value-generation-emerging-markets (NOPAT, Capital Invertido, ROIC,
// DuPont de 5 factores) y value-driver-interrelations (árbol de generadores).
// Caso central: Andina Manufacturas S.A. (EBIT 830, t 35%, ventas 8200,
// activo ~7370, PN 2770, capital invertido ~5530).
// ============================================================================

export const week03: ItemSpec[] = [
  {
    id: 's03-i1',
    week: 3,
    order: 1,
    title: 'NOPAT: la ganancia del negocio sin la deuda',
    subtitle: 'Cuánto gana Andina antes de decidir cómo se financió',
    framework: 'McKinsey · Koller-Goedhart-Wessels',
    theory: [
      {
        heading: 'Qué es el NOPAT y por qué no es la utilidad neta',
        paragraphs: [
          'El **NOPAT (Net Operating Profit After Taxes)** es la utilidad operativa después de impuestos, calculada **como si la empresa no tuviera deuda**. Mide la rentabilidad del negocio en sí mismo, despojada del efecto de cómo se lo financió. La fórmula es simple y poderosa: **NOPAT = EBIT × (1 − t)**.',
          'La diferencia con la utilidad neta es la clave de toda la semana. La utilidad neta de Andina en 2024 fue de apenas **175** (sobre un EBIT de **830**), porque los intereses de la deuda cara —descubierto al 85%, préstamos— se comieron **560** del resultado. El NOPAT ignora ese drenaje financiero a propósito: quiere saber cuánto gana **la fábrica**, no cuánto sobrevive después de pagarle al banco.',
          'Por eso el NOPAT es comparable entre empresas con estructuras de capital distintas. Dos fábricas idénticas, una sin deuda y otra apalancada hasta el cuello, tienen el **mismo NOPAT** aunque su utilidad neta sea abismalmente diferente. El NOPAT mide el motor; la utilidad neta mezcla el motor con la mochila financiera.',
        ],
      },
      {
        heading: 'De dónde sale cada número',
        paragraphs: [
          'El **EBIT** (Resultado operativo) sale del Estado de Resultados: Ventas − costo de ventas − gastos de administración y comercialización − amortizaciones. **No** se le restan los intereses (eso es financiamiento) ni los resultados financieros. En Andina, el EBIT 2024 es **830**.',
          'La **t** es la tasa impositiva efectiva sobre las operaciones. En el caso, el impuesto a las ganancias societario tiene tope del **35%**. Conviene usar la tasa operativa, no la contable total, porque esta última está "contaminada" por el escudo fiscal de los intereses (que no corresponde a las operaciones). McKinsey lleva esto al extremo con el **NOPLAT**, que parte del EBITA y calcula impuestos operativos en efectivo.',
          '**Interrelación clave:** el NOPAT es el **numerador del ROIC** (ítem 3) y el punto de partida del **EVA** (Semana 4). Todo el árbol de generadores de valor nace acá: para crear valor hay que subir el NOPAT, bajar el capital invertido o bajar el WACC. El NOPAT abre la primera de esas tres palancas.',
        ],
      },
      {
        heading: 'Debilidades y errores frecuentes',
        paragraphs: [
          'El NOPAT solo **no basta**: no considera las inversiones (capex, capital de trabajo) que el negocio necesita para sostenerse; por eso necesita al ROIC, que lo divide por el capital. Es muy sensible a la tasa elegida y, en alta inflación, el EBIT contable mezcla resultados reales con nominales.',
          'El error típico del CEO es mirar la utilidad neta y creer que ese es el rendimiento del negocio. En Andina pasa al revés: un negocio que **opera bien** (NOPAT sólido) luce pobre en la última línea por culpa del financiamiento. Separar ambos mundos es el primer paso para diagnosticar dónde está el problema.',
        ],
      },
    ],
    model: {
      excelTitle: 'NOPAT — Andina Manufacturas',
      inputs: [
        { key: 'ebit', label: 'EBIT (Resultado operativo)', value: 830, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'tax', label: 'Tasa de impuesto (t)', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'interes', label: 'Intereses de la deuda', value: 560, min: 0, max: 1200, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT = EBIT × (1 − t)', fmt: 'money', highlight: true, calc: (v) => v.ebit * (1 - v.tax), xl: '[ebit]*(1-[tax])' },
        { key: 'utilNeta', label: 'Utilidad neta (con intereses)', fmt: 'money', calc: (v) => (v.ebit - v.interes) * (1 - v.tax), xl: '([ebit]-[interes])*(1-[tax])' },
        { key: 'brecha', label: 'Brecha NOPAT − utilidad neta', fmt: 'money', calc: (v) => v.nopat - v.utilNeta, xl: '[nopat]-[utilNeta]' },
      ],
      conclusions: [
        {
          test: (v) => v.nopat > v.utilNeta,
          good: 'El NOPAT supera a la utilidad neta: el negocio opera mejor de lo que muestra la última línea. La brecha es el costo de la deuda (después de impuestos); el motor está sano, la mochila financiera lo aplasta.',
          bad: 'Sin intereses, el NOPAT coincide con la utilidad neta: no hay drenaje financiero. El resultado de la operación llega entero al accionista.',
          xl: 'IF([nopat]>[utilNeta],"El NOPAT ("&TEXT([nopat],"#,##0")&") supera la utilidad neta ("&TEXT([utilNeta],"#,##0")&"). La brecha de "&TEXT([brecha],"#,##0")&" es el costo de la deuda: el motor esta sano, la mochila financiera lo aplasta.","Sin intereses, el NOPAT iguala a la utilidad neta: el resultado operativo llega entero al accionista.")',
        },
      ],
      chart: { sweepKey: 'tax', outKey: 'nopat', xLabel: 'Tasa de impuesto', yLabel: 'NOPAT', yFmt: 'money' },
    },
    promptConcepts: ['NOPAT = EBIT × (1 − t)', 'NOPAT vs. utilidad neta (sin efecto de la deuda)', 'EBIT operativo: qué se resta y qué no', 'Tasa efectiva operativa vs. contable', 'El NOPAT como numerador del ROIC y base del EVA'],
  },

  {
    id: 's03-i2',
    week: 3,
    order: 2,
    title: 'El capital invertido: en qué se puso la plata',
    subtitle: 'Capital de trabajo operativo + activo fijo, el denominador que casi nadie mide',
    framework: 'McKinsey · enfoque operativo del capital',
    theory: [
      {
        heading: 'Dos formas de medir el mismo capital',
        paragraphs: [
          'El **Capital Invertido** es la plata que la empresa tiene efectivamente puesta a trabajar en las operaciones. Se puede calcular de dos maneras equivalentes. El **enfoque de financiamiento** mira el pasivo: Deuda financiera + Patrimonio − caja excedente; responde "cómo se financió". El **enfoque operativo** mira el activo: **Capital de trabajo operativo + Activo fijo neto**; responde "en qué se invirtió". Usamos el operativo, porque conecta con el ciclo de caja y las palancas de gestión.',
          'El **capital de trabajo operativo** es **Cuentas por cobrar + Inventarios − Cuentas por pagar (proveedores)**. Es la caja atrapada en el ciclo: lo que financiás a tus clientes (cobranzas) más lo inmovilizado en stock (inventario), menos lo que te financian gratis tus proveedores. En Andina 2024: 1850 de créditos + 2400 de inventarios − 1280 de proveedores = **2970** de capital de trabajo.',
          'El **activo fijo neto** (bienes de uso: terreno, edificio, maquinaria, rodados) suma alrededor de **2560** a valor contable. Sumando ambos bloques, el capital invertido operativo de Andina ronda los **5530**. Ese es el denominador que el ROIC va a exigir que rinda.',
        ],
      },
      {
        heading: 'Por qué el denominador es la palanca olvidada',
        paragraphs: [
          'La mayoría de los dueños mira solo el numerador (la ganancia) y se olvida del capital que la genera. Es un error caro. En mercados emergentes, donde el crédito es escaso y carísimo, **bajar el capital invertido** —cobrando más rápido, achicando stock, estirando proveedores— es la palanca de mayor retorno: libera caja sin pedir un peso al banco.',
          'En Andina el problema vive justo acá: el inventario crece más rápido que las ventas (hay **420** de mercadería obsoleta) y las cuentas por cobrar se estiran (con **290** de mora mayor a 120 días). Cada peso inmovilizado de más infla el capital invertido y, con el mismo NOPAT, hunde el ROIC.',
        ],
      },
      {
        heading: 'Interrelaciones y cuidados',
        paragraphs: [
          '**Interrelación clave:** el capital invertido es el **denominador del ROIC** (ítem 3) y la **escala del EVA** (Semana 4). Se nutre del Ciclo de Conversión de Efectivo: CCE más largo → más capital de trabajo → más capital invertido → menos ROIC. Acortar el ciclo es creación de valor directa.',
          '**Cuidado contable:** a costo histórico, los activos viejos quedan subvaluados y achican el denominador, lo que **infla artificialmente** el ROIC. En Andina, el terreno vale en libros 350 pero a mercado 900 (activo oculto). Para decisiones serias conviene reexpresar a valor corriente, sobre todo en economías inflacionarias.',
        ],
      },
    ],
    model: {
      excelTitle: 'Capital invertido (enfoque operativo)',
      inputs: [
        { key: 'cxc', label: 'Cuentas por cobrar', value: 1850, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'inv', label: 'Inventarios', value: 2400, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'prov', label: 'Proveedores (no oneroso)', value: 1280, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'afijo', label: 'Activo fijo neto', value: 2560, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'wcOper', label: 'Capital de trabajo operativo', fmt: 'money', calc: (v) => v.cxc + v.inv - v.prov, xl: '[cxc]+[inv]-[prov]' },
        { key: 'capInv', label: 'Capital invertido', fmt: 'money', highlight: true, calc: (v) => v.cxc + v.inv - v.prov + v.afijo, xl: '[wcOper]+[afijo]' },
      ],
      conclusions: [
        {
          test: (v) => v.cxc + v.inv - v.prov > v.afijo,
          good: 'El capital de trabajo pesa MÁS que el activo fijo: la plata de Andina está atrapada en el ciclo (cobranzas e inventario), no en la planta. Ahí está la palanca: acelerar cobranzas y achicar stock libera capital sin pedir crédito.',
          bad: 'El activo fijo pesa más que el capital de trabajo: el capital está sobre todo en la planta. La palanca pasa a ser la productividad de los activos, no tanto el ciclo de caja.',
          xl: 'IF([wcOper]>[afijo],"El capital de trabajo ("&TEXT([wcOper],"#,##0")&") pesa mas que el activo fijo ("&TEXT([afijo],"#,##0")&"): la plata esta atrapada en el ciclo. La palanca es acelerar cobranzas y achicar stock.","El activo fijo pesa mas que el capital de trabajo: la palanca es la productividad de la planta.")',
        },
      ],
      chart: { sweepKey: 'inv', outKey: 'capInv', xLabel: 'Inventarios', yLabel: 'Capital invertido', yFmt: 'money' },
    },
    promptConcepts: ['Capital invertido = capital de trabajo operativo + activo fijo', 'Capital de trabajo = CxC + inventarios − proveedores', 'Enfoque operativo vs. enfoque de financiamiento', 'El denominador como palanca de valor en emergentes', 'Activos a valor histórico inflan el ROIC'],
  },

  {
    id: 's03-i3',
    week: 3,
    order: 3,
    title: 'ROIC: cuánto rinde cada peso invertido',
    subtitle: 'La medida central de la creación de valor en el marco McKinsey',
    framework: 'McKinsey · ROIC = NOPAT / Capital Invertido',
    theory: [
      {
        heading: 'El indicador que sintetiza todo',
        paragraphs: [
          'El **ROIC (Return on Invested Capital)** mide cuánto NOPAT genera la empresa por cada peso de capital efectivamente invertido en las operaciones: **ROIC = NOPAT / Capital Invertido**. Es la medida central de la creación de valor en el marco McKinsey, porque junta en un solo número la rentabilidad (NOPAT) y la eficiencia del capital (cuánto capital hizo falta para generarla).',
          'En Andina: NOPAT ≈ **540** sobre un capital invertido de ≈ **5530** da un ROIC de **~9,7%**. Por sí solo, ese número no dice si está bien o mal: el veredicto llega al compararlo con el **WACC** (el costo del capital, Semana 9). Si el ROIC supera al WACC, la empresa **crea valor**; si no, lo **destruye**, aunque tenga ganancia contable.',
          'Esta es la regla de oro de todo el programa: **ROIC > WACC crea valor; ROIC < WACC lo destruye**. El ROIC no se mira solo: se mira contra su costo. Andina, con un ROIC del 9,7% y un WACC que ronda el 21%, está en zona de destrucción de valor a pesar de mostrar utilidad en el balance.',
        ],
      },
      {
        heading: 'El árbol: margen por rotación',
        paragraphs: [
          'El ROIC se abre en dos palancas multiplicativas: **ROIC = margen operativo × rotación del capital**, donde margen = NOPAT/Ventas y rotación = Ventas/Capital Invertido. Esto es el corazón del árbol de generadores de valor: se puede ganar por **margen** (vender caro o con bajo costo) o por **rotación** (usar poco capital para mucha venta).',
          'Andina es un caso de libro de **mala rotación**: tiene margen operativo razonable, pero rota poco su capital porque lo tiene inmovilizado en inventario obsoleto y cuentas por cobrar morosas. Atacar la rotación (el denominador, ítem 2) es su camino más corto para subir el ROIC, mucho más que pelear el margen.',
        ],
      },
      {
        heading: 'Debilidades e interrelaciones',
        paragraphs: [
          '**Cuidado con los activos viejos:** la maquinaria depreciada a costo histórico achica el denominador y genera una **ilusión de rentabilidad** (ROIC inflado). En entornos inflacionarios conviene contrastar el ROIC contable con el CFROI, que trabaja a valores corrientes. Si CFROI << ROIC, hay distorsión.',
          '**Interrelación clave:** el ROIC alimenta el **spread ROIC − WACC** y, vía la escala, el **EVA** (Semana 4). El DuPont (ítem 4) descompone su primo el ROE para mostrar dónde está la palanca. Y el **RONIC** (Semana 4) hace la pregunta del futuro: el ROIC dice cómo le fue al capital ya invertido; el RONIC, si conviene seguir invirtiendo.',
        ],
      },
    ],
    model: {
      excelTitle: 'ROIC = NOPAT / Capital Invertido',
      inputs: [
        { key: 'nopat', label: 'NOPAT', value: 540, min: 0, max: 1500, step: 5, unit: 'k', fmt: 'money' },
        { key: 'capInv', label: 'Capital invertido', value: 5530, min: 500, max: 12000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'wacc', label: 'WACC (costo del capital)', value: 0.21, min: 0.05, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'roic', label: 'ROIC', fmt: 'pct', highlight: true, calc: (v) => v.nopat / v.capInv, xl: '[nopat]/[capInv]' },
        { key: 'spread', label: 'Spread (ROIC − WACC)', fmt: 'pct', calc: (v) => v.nopat / v.capInv - v.wacc, xl: '[roic]-[wacc]' },
      ],
      conclusions: [
        {
          test: (v) => v.nopat / v.capInv >= v.wacc,
          good: 'El ROIC supera al WACC: el capital rinde más de lo que cuesta y Andina CREA valor. Para agrandarlo, subí el NOPAT o bajá el capital invertido (mejor rotación).',
          bad: 'El ROIC es menor al WACC: Andina DESTRUYE valor aunque tenga utilidad contable. El camino más corto es bajar el capital invertido (cobrar antes, achicar stock), no pelear el margen.',
          xl: 'IF([roic]>=[wacc],"El ROIC ("&TEXT([roic],"0.0%")&") supera al WACC ("&TEXT([wacc],"0.0%")&"): se CREA valor. Subi el NOPAT o baja el capital invertido.","El ROIC ("&TEXT([roic],"0.0%")&") es menor al WACC ("&TEXT([wacc],"0.0%")&"): se DESTRUYE valor pese a la utilidad contable. Baja el capital invertido: cobra antes, achica stock.")',
        },
      ],
      chart: { sweepKey: 'capInv', outKey: 'roic', xLabel: 'Capital invertido', yLabel: 'ROIC', yFmt: 'pct' },
    },
    promptConcepts: ['ROIC = NOPAT / Capital Invertido', 'Regla de oro: ROIC > WACC crea valor', 'ROIC = margen operativo × rotación del capital', 'Rotación como palanca de Andina', 'Activos viejos inflan el ROIC (contrastar con CFROI)'],
  },

  {
    id: 's03-i4',
    week: 3,
    order: 4,
    title: 'DuPont de 5 factores: anatomía del ROE',
    subtitle: 'De dónde viene de verdad la rentabilidad del accionista',
    framework: 'DuPont extendido · value-generation-emerging-markets',
    theory: [
      {
        heading: 'Cinco palancas que arman el ROE',
        paragraphs: [
          'El **DuPont de cinco factores** descompone el **ROE** (= Utilidad Neta / Patrimonio) en cinco palancas multiplicativas que revelan de dónde proviene la rentabilidad del accionista: **ROE = (UN/UAI) × (UAI/EBIT) × (EBIT/Ventas) × (Ventas/Activos) × (Activos/Patrimonio)**. Al multiplicarse, los términos intermedios se cancelan y queda UN/Patrimonio = ROE.',
          'Los cinco factores son: **(1) Efecto fiscal** (UN/UAI ≈ 1 − tasa efectiva), qué fracción sobrevive a impuestos; **(2) Carga de intereses** (UAI/EBIT), cuánto del resultado operativo sobrevive después de pagar la deuda; **(3) Margen operativo** (EBIT/Ventas), la eficiencia de costos y precios; **(4) Rotación de activos** (Ventas/Activos), cuánta venta genera cada peso de activo; y **(5) Multiplicador financiero** (Activos/Patrimonio), cuánto activo se sostiene por cada peso de patrimonio.',
          'Los factores 3 y 4 (margen × rotación) son el **núcleo operativo** —primo hermano del ROIC—; los factores 1 y 2 capturan el drenaje fiscal y financiero; el factor 5 es la amplificación por estructura de capital. Esta apertura permite ver si un ROE atractivo viene de la operación, del apalancamiento o de una baja carga impositiva.',
        ],
      },
      {
        heading: 'El ROE de Andina, factor por factor',
        paragraphs: [
          'Con las cifras de 2024: UN = **175**, UAI = **270**, EBIT = **830**, Ventas = **8200**, Activos = **7370**, Patrimonio = **2770**. El ROE es 175/2770 = **~6,3%**. Pero la magia está en la apertura: efecto fiscal = 175/270 = **0,65**; carga de intereses = 270/830 = **0,33**; margen operativo = 830/8200 = **10,1%**; rotación = 8200/7370 = **1,11**; multiplicador = 7370/2770 = **2,66**.',
          'El factor demoledor es la **carga de intereses de 0,33**: de cada peso de EBIT, solo 33 centavos sobreviven después de pagar la deuda cara. Ahí se evapora dos tercios del resultado operativo. El DuPont diagnostica con precisión quirúrgica que el problema de Andina **no es la operación** (margen y rotación razonables) sino el **costo financiero** que la asfixia.',
        ],
      },
      {
        heading: 'Interrelaciones y trampas',
        paragraphs: [
          '**Interrelación clave:** el núcleo operativo (margen × rotación) es **primo hermano del ROIC** (ítem 3). La diferencia entre ROE y ROIC se explica justamente por el apalancamiento y el costo de la deuda: el puente es ROE = ROIC + (ROIC − Kd(1−t)) × (D/E). Apalancarse agrega ROE solo si el ROIC supera el costo de la deuda después de impuestos.',
          '**Trampa frecuente:** un ROE alto puede ser **de mala calidad**, sostenido por un multiplicador financiero alto (mucha deuda) y no por la operación. Se ve "rentable" pero es frágil: cualquier caída de ventas lo hunde. El DuPont es la herramienta para no confundir un ROE rentable con uno simplemente muy endeudado.',
        ],
      },
    ],
    model: {
      excelTitle: 'DuPont de 5 factores — Andina',
      inputs: [
        { key: 'un', label: 'Utilidad neta', value: 175, min: 0, max: 1000, step: 5, unit: 'k', fmt: 'money' },
        { key: 'uai', label: 'Utilidad antes de impuestos (UAI)', value: 270, min: 1, max: 1500, step: 5, unit: 'k', fmt: 'money' },
        { key: 'ebit', label: 'EBIT', value: 830, min: 1, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'ventas', label: 'Ventas', value: 8200, min: 100, max: 15000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'activos', label: 'Activos totales', value: 7370, min: 100, max: 15000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'pn', label: 'Patrimonio neto', value: 2770, min: 100, max: 8000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'fFiscal', label: 'Efecto fiscal (UN/UAI)', fmt: 'num2', calc: (v) => v.un / v.uai, xl: '[un]/[uai]' },
        { key: 'fInteres', label: 'Carga de intereses (UAI/EBIT)', fmt: 'num2', calc: (v) => v.uai / v.ebit, xl: '[uai]/[ebit]' },
        { key: 'fMargen', label: 'Margen operativo (EBIT/Ventas)', fmt: 'pct', calc: (v) => v.ebit / v.ventas, xl: '[ebit]/[ventas]' },
        { key: 'fRot', label: 'Rotación (Ventas/Activos)', fmt: 'num2', calc: (v) => v.ventas / v.activos, xl: '[ventas]/[activos]' },
        { key: 'fApal', label: 'Apalancamiento (Activos/PN)', fmt: 'num2', calc: (v) => v.activos / v.pn, xl: '[activos]/[pn]' },
        { key: 'roe', label: 'ROE (producto de los 5 factores)', fmt: 'pct', highlight: true, calc: (v) => (v.un / v.uai) * (v.uai / v.ebit) * (v.ebit / v.ventas) * (v.ventas / v.activos) * (v.activos / v.pn), xl: '[fFiscal]*[fInteres]*[fMargen]*[fRot]*[fApal]' },
      ],
      conclusions: [
        {
          test: (v) => v.uai / v.ebit >= 0.6,
          good: 'La carga de intereses es razonable (UAI/EBIT ≥ 0,6): el resultado operativo llega casi entero a la última línea. El ROE viene de la operación, no es un espejismo financiero.',
          bad: 'La carga de intereses asfixia (UAI/EBIT < 0,6): la deuda cara se come buena parte del EBIT antes de llegar al accionista. El problema de Andina NO es la operación, es el costo financiero.',
          xl: 'IF([fInteres]>=0.6,"La carga de intereses es razonable (UAI/EBIT="&TEXT([fInteres],"0.00")&"): el resultado operativo llega casi entero. El ROE de "&TEXT([roe],"0.0%")&" viene de la operacion.","La carga de intereses asfixia (UAI/EBIT="&TEXT([fInteres],"0.00")&"): la deuda cara se come el EBIT. El problema NO es la operacion, es el costo financiero.")',
        },
      ],
      chart: { sweepKey: 'ebit', outKey: 'roe', xLabel: 'EBIT', yLabel: 'ROE', yFmt: 'pct' },
    },
    promptConcepts: ['ROE = fiscal × intereses × margen × rotación × apalancamiento', 'Núcleo operativo (margen × rotación) ≈ ROIC', 'Carga de intereses: el drenaje financiero de Andina', 'Multiplicador financiero = riesgo, no calidad', 'ROE de mala calidad: rentable por deuda, no por operación'],
  },

  {
    id: 's03-i5',
    week: 3,
    order: 5,
    title: 'Por qué el margen solo engaña',
    subtitle: 'Cómo margen × rotación × apalancamiento arman (o destruyen) el ROE',
    framework: 'value-driver-interrelations · árbol de generadores',
    theory: [
      {
        heading: 'El margen es solo una de las tres palancas',
        paragraphs: [
          'El dueño de Andina mira el **margen** y está conforme. Pero el margen es apenas **una** de las tres grandes palancas que arman la rentabilidad. El ROE se puede leer, simplificando el DuPont, como **margen × rotación × apalancamiento**: se gana plata por vender con buen margen, **o** por rotar mucho el capital, **o** por amplificar con deuda. Mirar solo el margen es mirar un tercio de la película.',
          'Dos empresas con el **mismo margen** pueden tener rentabilidades opuestas. Una que rota su capital dos veces al año genera el doble de ventas —y de ganancia— por cada peso invertido que otra que rota una sola vez, aunque el margen por venta sea idéntico. El margen dice cuánto ganás **por venta**; la rotación, cuántas veces das vuelta el capital. El ROE necesita las dos.',
          'Y está la tercera palanca, la traicionera: el **apalancamiento**. Subir deuda **amplifica** el ROE… mientras las cosas van bien. Un ROE alto sostenido por un multiplicador financiero grande no es rentabilidad: es **riesgo disfrazado de rentabilidad**. En la primera caída de ventas, ese mismo apalancamiento amplifica las pérdidas.',
        ],
      },
      {
        heading: 'El diagnóstico cruzado: SI, DÓNDE y de qué CALIDAD',
        paragraphs: [
          'Acá está la inteligencia del marco: los indicadores **no se leen sueltos, se cruzan**. El **spread ROIC − WACC** dice **SI** se crea o destruye valor. El **DuPont** dice **DÓNDE** está la palanca: margen (pricing/costos), rotación (eficiencia del capital, ciclo de caja) o estructura (apalancamiento). Y la composición dice de qué **CALIDAD** es el ROE: operativo y sólido, o financiero y frágil.',
          'En Andina el cruce es revelador. El margen operativo es **decente** (~10%), pero la rotación está trabada por inventario obsoleto y cobranzas morosas, y el apalancamiento es alto y caro. El margen **solo** te haría creer que el negocio va bien; el cruce completo muestra que el valor se destruye por el lado del capital y del financiamiento, no del margen.',
        ],
      },
      {
        heading: 'La cadena causal y la decisión',
        paragraphs: [
          'La interrelación se encadena en segundo y tercer orden: mejorar la matriz de cobranzas → baja los días de cobro → reduce el capital de trabajo → baja el capital invertido → **sube el ROIC** sin tocar el margen → amplía el spread → más EVA → más valor. La palanca más accionable en emergentes casi nunca es el margen: es el **denominador**.',
          '**Lectura clave:** el eje de riesgo (apalancamiento) se lee **en paralelo** al eje de valor, nunca confundido con él. Una empresa puede tener un ROE alto por deuda (no quiebra, parece rentable) y a la vez **destruir valor** (ROIC < WACC). Por eso el margen solo engaña: cuenta una parte de la historia y esconde justamente la parte donde se decide el valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'ROE = margen × rotación × apalancamiento',
      inputs: [
        { key: 'margen', label: 'Margen neto (UN/Ventas)', value: 0.0213, min: 0, max: 0.2, step: 0.001, fmt: 'pct2' },
        { key: 'rotacion', label: 'Rotación de activos (Ventas/Activos)', value: 1.11, min: 0.2, max: 4, step: 0.01, fmt: 'num2' },
        { key: 'apal', label: 'Apalancamiento (Activos/PN)', value: 2.66, min: 1, max: 6, step: 0.05, fmt: 'num2' },
      ],
      calcs: [
        { key: 'roa', label: 'ROA (margen × rotación)', fmt: 'pct', calc: (v) => v.margen * v.rotacion, xl: '[margen]*[rotacion]' },
        { key: 'roe', label: 'ROE (margen × rotación × apal.)', fmt: 'pct', highlight: true, calc: (v) => v.margen * v.rotacion * v.apal, xl: '[margen]*[rotacion]*[apal]' },
        { key: 'aporteApal', label: 'Plus del apalancamiento (ROE − ROA)', fmt: 'pct', calc: (v) => v.margen * v.rotacion * v.apal - v.margen * v.rotacion, xl: '[roe]-[roa]' },
      ],
      conclusions: [
        {
          test: (v) => v.apal <= 2.5,
          good: 'El apalancamiento es moderado (≤ 2,5×): el ROE se sostiene sobre todo en margen y rotación. Es un ROE de buena CALIDAD, operativo, no un espejismo financiero.',
          bad: 'El apalancamiento es alto (> 2,5×): buena parte del ROE viene de la deuda, no de la operación. Cuidado: ese plus es riesgo disfrazado de rentabilidad y se da vuelta en la primera caída de ventas.',
          xl: 'IF([apal]<=2.5,"Apalancamiento moderado ("&TEXT([apal],"0.00")&"x): el ROE de "&TEXT([roe],"0.0%")&" se sostiene en margen y rotacion. Buena CALIDAD.","Apalancamiento alto ("&TEXT([apal],"0.00")&"x): "&TEXT([aporteApal],"0.0%")&" del ROE viene de la deuda. Riesgo disfrazado de rentabilidad.")',
        },
      ],
      chart: { sweepKey: 'rotacion', outKey: 'roe', xLabel: 'Rotación de activos', yLabel: 'ROE', yFmt: 'pct' },
    },
    promptConcepts: ['ROE = margen × rotación × apalancamiento', 'Por qué el margen solo cuenta un tercio de la historia', 'Rotación: el doble de ventas por peso invertido', 'Apalancamiento = riesgo disfrazado de rentabilidad', 'Diagnóstico cruzado: SI (spread), DÓNDE (DuPont), CALIDAD'],
  },
]
