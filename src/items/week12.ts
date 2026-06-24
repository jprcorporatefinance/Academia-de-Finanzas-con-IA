import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 12 — Valuación integral (semana de cierre)
// Integra todo el programa: del diagnóstico y los value drivers (S1–S4),
// la política de dividendos (S8) y el costo del capital (S9) hacia la
// estimación del VALOR. Incorpora:
//   - apv-valuation-emerging-markets (Vu a Ku, escudo fiscal, dificultades)
//   - synthetic-tsr-emerging-markets (TSR, TSR Sintético / TBR, DLOC/DLOM)
//   - value-driver-interrelations (spread ROIC−WACC, sensibilidad de Gordon)
// Caso central: Andina Manufacturas S.A. (FCFF base ~305k, WACC ~21%).
// ============================================================================

export const week12: ItemSpec[] = [
  {
    id: 's12-i1',
    week: 12,
    order: 1,
    title: 'Valuación por DCF (FCFF descontado al WACC)',
    subtitle: 'De los flujos proyectados al Enterprise Value y al Equity Value',
    framework: 'DCF · McKinsey · Gordon',
    theory: [
      {
        heading: 'La lógica del DCF: una empresa vale lo que rinde en caja',
        paragraphs: [
          'El **DCF (Discounted Cash Flow)** parte de una idea simple y demoledora: una empresa no vale lo que dice su balance ni lo que ganó el año pasado, sino el **valor presente de toda la caja libre que producirá de acá en adelante**. Esa caja es el **FCFF (Free Cash Flow to the Firm)**, el flujo disponible para *todos* los proveedores de capital —acreedores y accionistas— antes de las decisiones de financiamiento. Se arma como FCFF = EBIT·(1−t) + Amortizaciones − ΔCapital de trabajo − CAPEX.',
          'El método tiene dos bloques. Primero, un **horizonte explícito** (típicamente 5 años) donde se proyecta el FCFF año por año y se lo descuenta al **WACC** de la Semana 9. Segundo, un **valor terminal** que captura todo lo que pasa después del último año explícito, comprimido en un solo número mediante la **perpetuidad de Gordon**. La suma de ambos descontados es el **Enterprise Value (EV)**, el valor de la operación entera.',
          'En el caso de **Andina Manufacturas**, el flujo operativo antes de intereses e impuestos ronda los **305k USD** y la tasa de descuento relevante ronda el **21%**. Trabajamos en **dólares** —regla de la casa— justamente para que el crecimiento que veamos sea crecimiento real y no la ilusión nominal que genera la inflación local.',
        ],
      },
      {
        heading: 'El valor terminal: donde se juega la mitad del valor',
        paragraphs: [
          'El **valor terminal de Gordon** vale TV = FCFFₙ·(1+g)/(WACC−g). El numerador es el flujo del último año explícito, ya **normalizado** (sin picos ni baches), creciendo al ritmo perpetuo **g**. El denominador es el "spread" WACC−g que capitaliza esa perpetuidad: cuanto más chico, más explota el valor. La restricción es dura: **g debe ser menor que el WACC**, y en términos reales no debería superar el crecimiento de largo plazo de la economía (2%–3% en USD).',
          'Este es el punto más delicado de toda la valuación. En empresas de mercados emergentes con WACC alto, el valor terminal suele pesar **entre el 40% y el 60%** del Enterprise Value. Por eso un error de un punto en el WACC o en g —muy fácil de cometer con el riesgo país de por medio— mueve la valuación en decenas de por ciento. La consistencia es innegociable: FCFFₙ, g y WACC tienen que compartir moneda y tratamiento de inflación.',
          'Una salvaguarda numérica obligatoria: si por error se carga un **g mayor o igual al WACC**, la fórmula de Gordon arroja un valor negativo o infinito que no tiene sentido económico. En la planilla esto se resuelve con IF([wacc]>[g], …, NA()) y en el simulador devolviendo NaN, para que el modelo grite "esto no se puede valuar así" en vez de mostrar un número falso.',
        ],
      },
      {
        heading: 'Del Enterprise Value al Equity Value: el puente',
        paragraphs: [
          'El DCF al WACC entrega el **Enterprise Value**, el valor de la operación para todos los financiadores. Pero el dueño no quiere saber cuánto vale la operación: quiere saber **cuánto vale SU parte**. Para llegar al **Equity Value** se cruza el puente: Equity = EV − **Deuda Financiera Neta**, donde la deuda neta es la deuda onerosa (descubierto, cheques, préstamos) menos la caja y las inversiones líquidas.',
          'En Andina, la deuda onerosa suma descubierto (540), cheques diferidos (430), préstamos de corto (620) y de largo plazo (980), contra una caja e inversiones líquidas de unos 240. La deuda neta resultante es alta y se **come una porción grande del Enterprise Value** al pasar al equity: es la materialización del diagnóstico de todo el programa —Andina luce rentable pero está atrapada por su estructura de pasivos caros.',
          '**Interrelación clave:** el FCFF de este DCF viene del **diagnóstico (S1)** y de los **value drivers (S2–S4)** —rotación, márgenes, ciclo de conversión de efectivo—; el WACC viene de la **Semana 9**; y el Equity Value que sale acá es la base sobre la que después se aplican los descuentos **DLOC y DLOM** (ítem 5) para llegar al valor real del paquete de un socio. Este ítem es la columna vertebral de la valuación integral.',
        ],
      },
    ],
    model: {
      excelTitle: 'DCF — FCFF al WACC, EV y Equity Value',
      inputs: [
        { key: 'fcff', label: 'FCFF normalizado (último año)', value: 305, min: 0, max: 1000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.03, min: -0.02, max: 0.12, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC (tasa de descuento)', value: 0.21, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'horizonVP', label: 'VP de los flujos explícitos (años 1–5)', value: 965, min: 0, max: 4000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'deudaNeta', label: 'Deuda financiera neta', value: 1500, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'tv', label: 'Valor terminal (Gordon)', fmt: 'money', calc: (v) => (v.wacc > v.g ? (v.fcff * (1 + v.g)) / (v.wacc - v.g) : NaN), xl: 'IF([wacc]>[g],[fcff]*(1+[g])/([wacc]-[g]),NA())' },
        { key: 'vpTV', label: 'VP del valor terminal', fmt: 'money', calc: (v) => (v.wacc > v.g ? ((v.fcff * (1 + v.g)) / (v.wacc - v.g)) / Math.pow(1 + v.wacc, 5) : NaN), xl: 'IF([wacc]>[g],[tv]/(1+[wacc])^5,NA())' },
        { key: 'ev', label: 'Enterprise Value', fmt: 'money', calc: (v) => v.horizonVP + (v.wacc > v.g ? ((v.fcff * (1 + v.g)) / (v.wacc - v.g)) / Math.pow(1 + v.wacc, 5) : NaN), xl: 'IF([wacc]>[g],[horizonVP]+[vpTV],NA())' },
        { key: 'equity', label: 'Equity Value (EV − deuda neta)', fmt: 'money', highlight: true, calc: (v) => v.horizonVP + (v.wacc > v.g ? ((v.fcff * (1 + v.g)) / (v.wacc - v.g)) / Math.pow(1 + v.wacc, 5) : NaN) - v.deudaNeta, xl: 'IF([wacc]>[g],[ev]-[deudaNeta],NA())' },
        { key: 'pesoTV', label: 'Peso del valor terminal en el EV', fmt: 'pct', calc: (v) => (v.wacc > v.g ? (((v.fcff * (1 + v.g)) / (v.wacc - v.g)) / Math.pow(1 + v.wacc, 5)) / (v.horizonVP + ((v.fcff * (1 + v.g)) / (v.wacc - v.g)) / Math.pow(1 + v.wacc, 5)) : NaN), xl: 'IF([wacc]>[g],[vpTV]/[ev],NA())' },
      ],
      conclusions: [
        {
          test: (v) => v.wacc > v.g,
          good: 'La valuación es válida (WACC > g) y el Equity Value sale de restar la deuda neta al Enterprise Value. Mirá el peso del valor terminal: si supera el 50%, casi todo el valor está en supuestos de muy largo plazo y conviene estresar WACC y g.',
          bad: 'g es mayor o igual al WACC: la perpetuidad de Gordon se rompe (valor infinito o negativo). Ninguna empresa crece para siempre más rápido que su costo de capital. Bajá g por debajo del WACC.',
          xl: 'IF([wacc]>[g],"Valuacion valida (WACC>g). Equity Value = "&TEXT([equity],"#,##0")&"k. El valor terminal pesa "&TEXT([pesoTV],"0%")&" del EV: si supera 50%, estresa WACC y g.","g es mayor o igual al WACC: la perpetuidad de Gordon se rompe. Baja g por debajo del WACC.")',
        },
      ],
      chart: { sweepKey: 'wacc', outKey: 'equity', xLabel: 'WACC', yLabel: 'Equity Value', yFmt: 'money' },
    },
    promptConcepts: [
      'FCFF = EBIT·(1−t) + Amortizaciones − ΔWC − CAPEX',
      'Horizonte explícito descontado al WACC + valor terminal',
      'Perpetuidad de Gordon: TV = FCFFₙ·(1+g)/(WACC−g), con g < WACC',
      'Puente EV → Equity = EV − deuda financiera neta',
      'Peso del valor terminal y sensibilidad al WACC en emergentes',
    ],
  },

  {
    id: 's12-i2',
    week: 12,
    order: 2,
    title: 'APV: el Valor Presente Ajustado',
    subtitle: 'Vu desapalancado + VP del escudo fiscal − VP de dificultades financieras',
    framework: 'APV · Modigliani-Miller · Vélez-Pareja',
    theory: [
      {
        heading: 'Por qué separar la operación del financiamiento',
        paragraphs: [
          'El DCF al WACC mete todo en una sola tasa y supone una **estructura de capital constante**. Pero Andina —como tantas PyMEs emergentes— no tiene estructura estable: amortiza préstamos, toma y devuelve descubierto, reestructura pasivos. Cuando la deuda cambia año a año, el WACC **falla**. Ahí entra el **APV (Adjusted Present Value)**, que desarma el valor en piezas y descuenta cada una a la tasa que refleja SU propio riesgo.',
          'La fórmula maestra, derivada del teorema de **Modigliani-Miller**, es APV = **Vu** + VP(escudos fiscales) − VP(costos de dificultades financieras) ± VP(otros efectos). La intuición: sin fricciones, la estructura financiera no cambia el valor de los activos operativos. Las imperfecciones del mundo real lo mueven hacia **arriba** por el escudo fiscal (los intereses son deducibles) y hacia **abajo** por el costo esperado de la quiebra (más deuda eleva la probabilidad de insolvencia).',
          'La potencia del método es que **no busca una tasa única**. El valor de la operación se descuenta a Ku, el escudo a su propia tasa según la política de deuda, y las dificultades financieras a la tasa de su riesgo. Esto permite un análisis de sensibilidad granular: mover una pieza sin tocar las demás, algo imposible con el WACC monolítico.',
        ],
      },
      {
        heading: 'Componente 1: el valor desapalancado (Vu)',
        paragraphs: [
          'El **Vu** es el valor de Andina **como si se financiara 100% con capital propio**, sin un peso de deuda. Aísla la **operación pura**. Se calcula descontando el mismo FCFF del ítem 1, pero a **Ku** (el costo del capital desapalancado), no al WACC. Ku captura solo el riesgo del negocio —sin el riesgo financiero del apalancamiento— y se construye desapalancando la beta del sector, llevándola a Beta Total (dueño no diversificado) y apilando las primas de país, tamaño e iliquidez UNA sola vez.',
          'Como Ku no incluye el escudo fiscal de la deuda, es **mayor que el WACC**: por eso el Vu, tomado en aislamiento, da **menor** que el Enterprise Value del DCF al WACC. Eso no es un error: el DCF al WACC ya tiene el escudo fiscal "mezclado" dentro de la tasa, mientras que el APV lo va a sumar aparte, de forma explícita y trazable. Es la misma valuación contada de dos maneras.',
          'El Vu hereda la misma estructura del DCF: flujos explícitos más valor terminal de Gordon, pero todo descontado a Ku en lugar de WACC. La regla de consistencia se mantiene: g < Ku, misma moneda, mismo tratamiento de inflación. Y el valor terminal sigue pesando mucho, así que la disciplina de estresar la tasa es igual de obligatoria.',
        ],
      },
      {
        heading: 'Los efectos del financiamiento: escudo y dificultades',
        paragraphs: [
          'El **VP del escudo fiscal** es lo que la deuda **AGREGA**: como los intereses son deducibles, el Estado "subsidia" parte del costo financiero. En su forma más simple vale D·t (la deuda por la tasa impositiva), pero la advertencia de **Vélez-Pareja** para PyMEs emergentes es central: el escudo es **riesgoso**. El derecho a deducir intereses se devenga, pero su realización efectiva depende de generar EBIT suficiente. Si un año el resultado operativo no cubre los intereses, el escudo de ese año se pierde o se difiere.',
          'El **VP de las dificultades financieras** es lo que la deuda **CUESTA**: más apalancamiento eleva la probabilidad de default, y un default tiene costos reales (honorarios, pérdida de clientes, remate de activos). Se estima como probabilidad de quiebra × costo si quiebra, descontado a la tasa del riesgo operativo. En Andina, con activos tangibles (inventario, terreno, maquinaria) y propiedad concentrada, la severidad es moderada, pero el descubierto caro al 85% empuja la probabilidad para arriba.',
          '**La lectura para el directorio:** si VP(escudo) ≈ VP(dificultades), la deuda es **neutral en valor** —no mueve la aguja— y la palanca NO está en apalancar más, sino en **bajar Ku** (operar en USD, dar previsibilidad) y **subir el Vu** comprimiendo el ciclo de conversión de efectivo. Acá el APV se enlaza con todo el programa: el diagnóstico de los value drivers (S1–S4) es lo que efectivamente sube el Vu, la pieza que domina el valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'APV — Vu + escudo fiscal − dificultades financieras',
      inputs: [
        { key: 'fcff', label: 'FCFF normalizado (último año)', value: 305, min: 0, max: 1000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.03, min: -0.02, max: 0.12, step: 0.005, fmt: 'pct' },
        { key: 'ku', label: 'Ku (costo desapalancado)', value: 0.235, min: 0.1, max: 0.45, step: 0.005, fmt: 'pct' },
        { key: 'horizonVuVP', label: 'VP flujos explícitos a Ku (años 1–5)', value: 914, min: 0, max: 4000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'deuda', label: 'Deuda financiera onerosa', value: 2570, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'pDefault', label: 'Probabilidad anual de dificultades', value: 0.05, min: 0, max: 0.3, step: 0.005, fmt: 'pct' },
        { key: 'costoDefault', label: 'Costo si hay default', value: 1200, min: 0, max: 4000, step: 25, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'vu', label: 'Vu (valor desapalancado)', fmt: 'money', calc: (v) => v.horizonVuVP + (v.ku > v.g ? ((v.fcff * (1 + v.g)) / (v.ku - v.g)) / Math.pow(1 + v.ku, 5) : NaN), xl: 'IF([ku]>[g],[horizonVuVP]+(([fcff]*(1+[g])/([ku]-[g]))/(1+[ku])^5),NA())' },
        { key: 'vpEscudo', label: 'VP del escudo fiscal (D × t)', fmt: 'money', calc: (v) => v.deuda * v.tax, xl: '[deuda]*[tax]' },
        { key: 'vpCFD', label: 'VP de dificultades financieras', fmt: 'money', calc: (v) => (v.pDefault * v.costoDefault) / v.ku, xl: '([pDefault]*[costoDefault])/[ku]' },
        { key: 'apv', label: 'APV (valor de la firma)', fmt: 'money', highlight: true, calc: (v) => (v.horizonVuVP + (v.ku > v.g ? ((v.fcff * (1 + v.g)) / (v.ku - v.g)) / Math.pow(1 + v.ku, 5) : NaN)) + v.deuda * v.tax - (v.pDefault * v.costoDefault) / v.ku, xl: 'IF([ku]>[g],[vu]+[vpEscudo]-[vpCFD],NA())' },
        { key: 'efectoNeto', label: 'Efecto neto del financiamiento', fmt: 'money', calc: (v) => v.deuda * v.tax - (v.pDefault * v.costoDefault) / v.ku, xl: '[vpEscudo]-[vpCFD]' },
      ],
      conclusions: [
        {
          test: (v) => v.deuda * v.tax - (v.pDefault * v.costoDefault) / v.ku > 0,
          good: 'El escudo fiscal supera al costo esperado de dificultades: la deuda AGREGA valor neto. Aun así, el grueso del APV es el Vu (la operación): la palanca real está en bajar Ku y subir el Vu, no en apalancar más.',
          bad: 'El costo esperado de dificultades financieras supera al escudo fiscal: la deuda DESTRUYE valor neto. El endeudamiento actual no paga; la palanca está en desapalancar y abaratar el Ku, no en más deuda.',
          xl: 'IF([efectoNeto]>0,"El escudo fiscal ("&TEXT([vpEscudo],"#,##0")&"k) supera al costo de dificultades ("&TEXT([vpCFD],"#,##0")&"k): la deuda AGREGA "&TEXT([efectoNeto],"#,##0")&"k. Aun asi, el grueso del APV es el Vu.","Las dificultades ("&TEXT([vpCFD],"#,##0")&"k) superan al escudo ("&TEXT([vpEscudo],"#,##0")&"k): la deuda DESTRUYE valor. Desapalanca y abarata el Ku.")',
        },
      ],
      chart: { sweepKey: 'ku', outKey: 'apv', xLabel: 'Ku', yLabel: 'APV (valor de la firma)', yFmt: 'money' },
    },
    promptConcepts: [
      'APV = Vu + VP(escudo) − VP(dificultades) (Modigliani-Miller)',
      'Vu: FCFF descontado a Ku (operación pura, sin deuda)',
      'Por qué Ku > WACC y el Vu < EV del DCF',
      'Escudo fiscal riesgoso de Vélez-Pareja en PyMEs emergentes',
      'Cuándo APV vence al WACC: estructura de capital cambiante',
    ],
  },

  {
    id: 's12-i3',
    week: 12,
    order: 3,
    title: 'TSR: descomposición del Retorno Total al Accionista',
    subtitle: 'De dónde vino el valor: ventas, margen, múltiplo y dividendos',
    framework: 'TSR · BCG · Morgan Stanley',
    theory: [
      {
        heading: 'Qué mide el TSR y por qué se descompone',
        paragraphs: [
          'El **TSR (Total Shareholder Return)** es la métrica de desempeño externo que usan firmas como **BCG** para medir la creación de valor real en un período. En una empresa que cotiza combina **apreciación del precio** y **rendimiento de dividendos**, asumiendo reinversión de los dividendos en la misma acción: TSR = (Pₜ − Pₜ₋₁ + Dₜ) / Pₜ₋₁.',
          'Pero el número solo no sirve para gestionar. Lo potente es la **descomposición**: abrir el TSR en sus generadores para que el directorio vea **de dónde vino el valor** y **qué palanca mover**. Como el precio es P = EPS × Múltiplo, y el EPS depende de la utilidad neta y las acciones, y la utilidad neta es Ventas × Margen, el TSR se desarma en una cadena de factores multiplicativos.',
          'La forma multiplicativa es 1 + TSR = (ΔVentas) × (ΔMargen) × (ΔMúltiplo) × (acciones) + DivYield. Cada factor es un **generador de valor**: crecimiento de ventas, expansión de margen, re-rating del múltiplo, efecto de recompras/emisiones y el rendimiento de caja distribuida. Para presentarlo a directorio, BCG aplica logaritmo y lo convierte en un **waterfall aditivo en puntos porcentuales**: "del TSR de X%, tantos puntos vinieron de ventas, tantos de margen, tantos de múltiplo, tantos de yield".',
        ],
      },
      {
        heading: 'Los generadores, uno por uno',
        paragraphs: [
          '**Crecimiento de ventas:** mide la tracción del negocio en su mercado. Pero ojo —y acá se enlaza todo el programa— crecer con **ROIC menor al WACC destruye valor** aunque el factor sea mayor que 1. Y el crecimiento nominal por inflación es una ilusión: por eso medimos en USD. **Cambio de margen:** capta la mejora de rentabilidad por cada dólar vendido. Es el campo donde BCG suele "enterrar" los residuos del redondeo aditivo, así que conviene auditar que la mejora sea real.',
          '**Cambio de múltiplo:** indica si el negocio se volvió más valioso en términos relativos, por menor riesgo percibido o mayor potencial. En una empresa que cotiza es el re-rating del mercado; en una cerrada no hay múltiplo observable, y eso obliga a pasar al TSR Sintético del ítem 4. **Rendimiento de caja (yield):** la porción del flujo que vuelve líquida al accionista; es central cuando el ROIC ≤ WACC, donde distribuir es la mejor decisión de valor.',
          'Hay una **trampa técnica crítica**: la descomposición logarítmica **se rompe cuando la utilidad es negativa o cero**, porque no existe el logaritmo de un número no positivo. Pasa en empresas en etapa temprana o en reestructuración profunda. En esos casos hay que mantener la escala multiplicativa directa o migrar al **EVA** (Valor Económico Agregado), que mide creación de valor en dólares sin depender de logaritmos.',
        ],
      },
      {
        heading: 'Por qué le importa al CEO de Andina',
        paragraphs: [
          'Aunque Andina no cotice, la **lógica de la descomposición** es oro puro para gestionar. Le dice al dueño qué parte de su mejora (o deterioro) de valor vino de vender más, qué parte de ganar más por unidad, y qué parte de que el negocio "valga más" por menos riesgo. Convierte la creación de valor de una sensación ("vendí más, me fue bien") en un diagnóstico accionable.',
          'El TSR conecta directo con los **value drivers (S2–S4)**: el crecimiento de ventas y el margen son justamente los drivers operativos del árbol de McKinsey. Y conecta con la **política de dividendos (S8)**: el generador de "yield" es la caja distribuida, que solo crea valor si el negocio no tenía mejores usos (ROIC > WACC) para esa plata.',
          '**Interrelación de cierre:** el TSR es la mirada *retrospectiva* (qué pasó con el valor) y el DCF/APV de los ítems 1 y 2 es la mirada *prospectiva* (cuánto valdrá). Juntas cierran el círculo de la gestión basada en valor: medir lo que se creó, proyectar lo que se creará, y decidir dónde poner el capital. El ítem 4 lleva esta lógica al caso sin cotización.',
        ],
      },
    ],
    model: {
      excelTitle: 'TSR — descomposición en generadores de valor',
      inputs: [
        { key: 'gVentas', label: 'Crecimiento de ventas', value: 0.108, min: -0.2, max: 0.5, step: 0.005, fmt: 'pct' },
        { key: 'gMargen', label: 'Cambio del margen (relativo)', value: 0.02, min: -0.3, max: 0.3, step: 0.005, fmt: 'pct' },
        { key: 'gMultiplo', label: 'Cambio del múltiplo (relativo)', value: 0.04, min: -0.4, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'divYield', label: 'Rendimiento de dividendos', value: 0.03, min: 0, max: 0.2, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'aprecPrecio', label: 'Apreciación de precio (multiplicativa)', fmt: 'pct', calc: (v) => (1 + v.gVentas) * (1 + v.gMargen) * (1 + v.gMultiplo) - 1, xl: '(1+[gVentas])*(1+[gMargen])*(1+[gMultiplo])-1' },
        { key: 'tsr', label: 'TSR total', fmt: 'pct', highlight: true, calc: (v) => (1 + v.gVentas) * (1 + v.gMargen) * (1 + v.gMultiplo) - 1 + v.divYield, xl: '[aprecPrecio]+[divYield]' },
        { key: 'aporteVentas', label: 'Aporte de ventas (aditivo, ln)', fmt: 'pct', calc: (v) => Math.log(1 + v.gVentas), xl: 'LN(1+[gVentas])' },
        { key: 'aporteMargen', label: 'Aporte de margen (aditivo, ln)', fmt: 'pct', calc: (v) => Math.log(1 + v.gMargen), xl: 'LN(1+[gMargen])' },
        { key: 'aporteMultiplo', label: 'Aporte de múltiplo (aditivo, ln)', fmt: 'pct', calc: (v) => Math.log(1 + v.gMultiplo), xl: 'LN(1+[gMultiplo])' },
      ],
      conclusions: [
        {
          test: (v) => v.gVentas > 0 && v.gMargen >= 0,
          good: 'El TSR está traccionado por fundamentos operativos (ventas y margen positivos), no por un re-rating de múltiplo que el mercado puede retirar. Es la creación de valor más sólida y sostenible.',
          bad: 'El TSR depende del múltiplo o del yield más que de los fundamentos (ventas o margen flojos). Un TSR sostenido por re-rating es frágil: si el mercado cambia de humor, se evapora. Revisá los drivers operativos.',
          xl: 'IF(AND([gVentas]>0,[gMargen]>=0),"TSR de "&TEXT([tsr],"0.0%")&" traccionado por fundamentos (ventas y margen): creacion de valor solida y sostenible.","TSR de "&TEXT([tsr],"0.0%")&" apoyado en multiplo/yield, no en fundamentos: fragil. Revisa los drivers operativos.")',
        },
      ],
      chart: { sweepKey: 'gVentas', outKey: 'tsr', xLabel: 'Crecimiento de ventas', yLabel: 'TSR', yFmt: 'pct' },
    },
    promptConcepts: [
      'TSR = apreciación de precio + rendimiento de dividendos',
      '1 + TSR = ΔVentas × ΔMargen × ΔMúltiplo + DivYield (BCG)',
      'Waterfall aditivo en p.p. vía logaritmo natural',
      'El log se rompe con utilidad ≤ 0 (migrar a EVA)',
      'Crecer con ROIC < WACC destruye valor aunque ΔVentas > 1',
    ],
  },

  {
    id: 's12-i4',
    week: 12,
    order: 4,
    title: 'TSR Sintético y TBR para la empresa que no cotiza',
    subtitle: 'El valor intrínseco por DCF como sustituto del precio de pizarra',
    framework: 'TBR · BCG · McKinsey Valuation',
    theory: [
      {
        heading: 'El problema: no hay precio de pizarra',
        paragraphs: [
          'En una PyME de capital cerrado como **Andina** no existe cotización diaria. No hay un precio de pizarra del que extraer la apreciación, así que el TSR tradicional del ítem 3 **no se puede calcular**: falta el Pₜ y el Pₜ₋₁. Hay que construir un sustituto del precio. La solución es el **TSR Sintético**, que reemplaza el precio de mercado por el **valor intrínseco del patrimonio estimado período a período con un DCF consistente**.',
          'En lugar de preguntar "¿cuánto cotizó la acción?", se pregunta "¿cuánto vale el patrimonio según un DCF —el del ítem 1 o el APV del ítem 2— al inicio y al final del período?". El retorno del accionista es entonces la variación de ese valor intrínseco más la caja que el negocio liberó. La calidad del TSR Sintético es exactamente la calidad del DCF que lo alimenta: supuestos optimistas de valor inflan el retorno, así que hay que auditar la tasa y el g.',
          'BCG formalizó esto en el **TBR (Total Business Return)**, el equivalente interno del TSR que desarrollaron para unidades de negocio y subsidiarias no cotizadas. Es la forma operativa del TSR Sintético: TBR = FCFₜ/Vₜ₋₁ + (Vₜ − Vₜ₋₁)/Vₜ₋₁, es decir, el **yield** de la caja liberada más la **ganancia de capital intrínseco**.',
        ],
      },
      {
        heading: 'La vara dura del TBR y las normalizaciones',
        paragraphs: [
          'El TBR impone una **vara dura** y profundamente útil: toda inversión de capital destinada a mejorar el negocio debe generar una **ganancia de capital intrínseco que supere el "dividendo"** que el accionista habría cobrado si esa caja se hubiera distribuido. Si el ΔV no supera al yield distribuible, **conviene distribuir**. Es exactamente la decisión de la política de dividendos (S8) vista desde el retorno total.',
          'La consistencia temporal es innegociable: Vₜ y Vₜ₋₁ deben calcularse con la **misma metodología, mismo costo de capital y mismos supuestos**. Si no, el ΔV mide cambios de supuesto —que cambiaste el WACC, que subiste el g— y no creación de valor real. Es el error más común y el más fácil de cometer cuando uno valúa la misma empresa dos años seguidos.',
          'Antes de alimentar el DCF, el FCF de la PyME familiar exige **tres normalizaciones obligatorias**: (1) **salarios de socios a valores de mercado** —si el dueño cobra de menos, el EBITDA está inflado; si cobra de más, deprimido—; (2) **gastos personales cargados a la sociedad** (autos, viajes, inmuebles no operativos) reclasificados como distribuciones implícitas; y (3) **modelización en USD** para aislar el crecimiento real de la ilusión inflacionaria. Sin estas tres, el FCF de Andina no es utilizable.',
        ],
      },
      {
        heading: 'El Escenario DCF de McKinsey: el riesgo en los flujos',
        paragraphs: [
          '¿Cómo se mete el riesgo emergente en la valuación intrínseca sin castigarla de más? La tentación tradicional es **subir la tasa** agregando una prima de riesgo país arbitraria al WACC, lo que comprime salvajemente el valor presente y, peor, **duplica el riesgo** si la moneda ya está en USD. McKinsey propone el **Escenario DCF**, metodológicamente superior: no cargar la tasa, sino modelar los riesgos —devaluaciones, crisis de liquidez, cambios regulatorios— **directamente en las proyecciones de flujo**, ponderados por probabilidad.',
          'Una vez que los flujos esperados reflejan el promedio de esos escenarios probables, se descuenta con una tasa alineada a estándares globales. Esto se operacionaliza con **Monte Carlo (mínimo 10.000 iteraciones)**. La regla anti-doble-conteo de la casa manda: el riesgo país se modela **una sola vez**. Si va en los flujos, no se vuelve a sumar como CRP en la tasa; si se prefiere la ruta de tasa (AL-CAPM de Pereiro), va en el Ke con el factor (1−R²). Una ruta o la otra, nunca las dos.',
          '**Interrelación de cierre del programa:** el TSR Sintético cierra el círculo. Toma el valor intrínseco del DCF (ítem 1) o del APV (ítem 2), exige las normalizaciones de la empresa familiar, mide el retorno año contra año y lo enfrenta a la decisión de distribuir o reinvertir (S8). Y el valor Vₜ que produce es, además, la base sobre la que el ítem 5 aplicará los descuentos DLOC y DLOM para llegar al valor del paquete de un socio concreto.',
        ],
      },
    ],
    model: {
      excelTitle: 'TSR Sintético / TBR — retorno del valor intrínseco',
      inputs: [
        { key: 'vIni', label: 'Valor intrínseco inicial (V t−1)', value: 2400, min: 100, max: 8000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'vFin', label: 'Valor intrínseco final (V t)', value: 2760, min: 100, max: 8000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'fcf', label: 'FCF liberado en el período', value: 180, min: 0, max: 1500, step: 5, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'yield', label: 'Yield (FCF / V inicial)', fmt: 'pct', calc: (v) => v.fcf / v.vIni, xl: '[fcf]/[vIni]' },
        { key: 'gananciaCapital', label: 'Ganancia de capital intrínseco', fmt: 'pct', calc: (v) => (v.vFin - v.vIni) / v.vIni, xl: '([vFin]-[vIni])/[vIni]' },
        { key: 'tbr', label: 'TBR (TSR Sintético)', fmt: 'pct', highlight: true, calc: (v) => v.fcf / v.vIni + (v.vFin - v.vIni) / v.vIni, xl: '[yield]+[gananciaCapital]' },
      ],
      conclusions: [
        {
          test: (v) => (v.vFin - v.vIni) / v.vIni >= v.fcf / v.vIni,
          good: 'La ganancia de capital intrínseco supera al yield distribuible: reinvertir en el negocio creó más valor que distribuir esa caja. La vara del TBR se cumple: el capital retenido se justifica.',
          bad: 'El yield distribuible supera a la ganancia de capital intrínseco: el accionista habría estado mejor cobrando esa caja que dejándola en el negocio. La vara del TBR no se cumple; conviene distribuir más.',
          xl: 'IF([gananciaCapital]>=[yield],"La ganancia de capital ("&TEXT([gananciaCapital],"0.0%")&") supera al yield ("&TEXT([yield],"0.0%")&"): reinvertir creo mas valor que distribuir. TBR = "&TEXT([tbr],"0.0%")&".","El yield ("&TEXT([yield],"0.0%")&") supera la ganancia de capital ("&TEXT([gananciaCapital],"0.0%")&"): convenia distribuir. TBR = "&TEXT([tbr],"0.0%")&".")',
        },
      ],
      chart: { sweepKey: 'vFin', outKey: 'tbr', xLabel: 'Valor intrínseco final', yLabel: 'TBR', yFmt: 'pct' },
    },
    promptConcepts: [
      'TSR Sintético: valor intrínseco por DCF en vez de precio de mercado',
      'TBR = FCF/Vₜ₋₁ + (Vₜ−Vₜ₋₁)/Vₜ₋₁ (yield + ganancia de capital)',
      'La vara: ΔV intrínseco debe superar el yield distribuible',
      'Tres normalizaciones de la PyME (salarios, gastos personales, USD)',
      'Escenario DCF de McKinsey: riesgo en los flujos, no en la tasa',
    ],
  },

  {
    id: 's12-i5',
    week: 12,
    order: 5,
    title: 'Descuentos DLOC y DLOM del paquete cerrado',
    subtitle: 'Falta de control y de liquidez: Chaffe, Finnerty, Longstaff',
    framework: 'DLOC/DLOM · Chaffe · Finnerty · Longstaff',
    theory: [
      {
        heading: 'Por qué el valor del DCF todavía no es el valor del paquete',
        paragraphs: [
          'El Equity Value del ítem 1 y el valor intrínseco del ítem 4 representan una **participación minoritaria líquida**, porque las tasas y múltiplos que los alimentan se derivan de **empresas cotizadas comparables**. Pero un paquete de acciones de Andina **no es ni líquido ni necesariamente controlante**. Para llegar al valor real del paquete de un socio concreto hay que aplicar, con rigor, dos descuentos: el **DLOC** (falta de control) y el **DLOM** (falta de negociabilidad).',
          'El **DLOC (Discount for Lack of Control)** cuantifica la pérdida de valor cuando el paquete **carece de derechos políticos y de control** sobre las decisiones estratégicas. Un socio minoritario no decide dividendos, ni CAPEX, ni la venta de la empresa: su participación vale menos que la de quien controla. Se calcula a partir de la prima de control observada en transacciones: DLOC = 1 − 1/(1 + Prima de Control). Con una prima de mercado del 30%, el descuento implícito es 1 − 1/1,30 = 23,1%.',
          'El **DLOM (Discount for Lack of Marketability)** mide la penalización por la **iliquidez intrínseca**: la imposibilidad de vender la participación sin costos significativos ni demoras prolongadas. La gran intuición es que la falta de liquidez equivale al **costo de oportunidad de no tener una opción de venta (put) líquida** durante el período de tenencia esperado. Por eso el DLOM se modela con teoría de opciones financieras, evitando la arbitrariedad de promedios fijos.',
        ],
      },
      {
        heading: 'Los tres modelos de DLOM: Chaffe, Finnerty, Longstaff',
        paragraphs: [
          '**Chaffe (1993)** modela el DLOM como el precio de una **opción de venta europea (Black-Scholes)** sobre la acción, con strike igual al precio actual. Con tasa nula y sin dividendos se reduce a DLOM ≈ 2·N(σ·√T/2) − 1. Es muy sensible a la volatilidad: con σ alta genera descuentos grandes que pueden acercarse al valor de liquidación. Sirve como referencia, no como estimación central.',
          '**Finnerty (2012)** corrigió a Chaffe: el accionista atrapado no vende en el pico, sufre un **costo de oportunidad promedio** a lo largo del horizonte. Por eso usa una **opción asiática de promedio de strike**: DLOM = 1 − 2·N(−σ·√(T/3)/2), equivalente a 2·N(σ·√(T/3)/2) − 1. El √(T/3) viene de la varianza de un promedio aritmético y suaviza el efecto de la volatilidad extrema. Está **acotado por debajo del 100%** aun con T o σ tendiendo a infinito, por lo que es el **favorito de auditores y fiscos**: rangos conservadores del 12% al 38%. Es la estimación central de la casa.',
          '**Longstaff (1995)** usa una **opción retrospectiva (lookback)**: modela el beneficio máximo que el inversor pierde por no poder vender en el día de máxima cotización. Define el **límite superior absoluto** del DLOM. Es altamente volátil y se satura rápido, así que se usa como **cota de stress**, no como estimación central. La recomendación: Finnerty central, Chaffe referencia, Longstaff techo.',
        ],
      },
      {
        heading: 'La trampa: NUNCA sumar los descuentos',
        paragraphs: [
          'El error más recurrente en la valuación de capital cerrado es **sumar los descuentos aritméticamente**. El DLOC y el DLOM responden a dimensiones **distintas** del valor y se aplican en una secuencia **estrictamente multiplicativa, en cascada**: primero el valor base de comparables, luego × (1 − DLOC) para llegar al valor minoritario marketable, y sobre ese resultado × (1 − DLOM) para llegar al valor minoritario NO marketable, que es el definitivo.',
          'El descuento combinado es Descuento Total = 1 − [(1 − DLOC) × (1 − DLOM)]. Con DLOC del 20% y DLOM del 30%, el combinado **no es 50%**: es 1 − [0,80 × 0,70] = 1 − 0,56 = **44%**. La diferencia de 6 puntos sobre una valuación grande es material; sumar destruye la trazabilidad y sobre-castiga el valor. La cascada multiplicativa es la única forma rigurosa.',
          '**Interrelación de cierre absoluto del programa:** este es el último eslabón. El Equity Value del **DCF (ítem 1)** o el valor intrínseco del **TSR Sintético (ítem 4)** entran como valor base; sobre ellos se aplica la cascada DLOC→DLOM para responder la pregunta final del dueño: "¿cuánto vale, de verdad, mi parte si la quisiera vender?". Y todo descansa en el **costo del capital (S9)** y el **diagnóstico de los value drivers (S1–S4)** que produjeron el FCFF. Acá termina el recorrido: del balance en bruto al valor real, defendible, del paquete de un socio.',
        ],
      },
    ],
    model: {
      excelTitle: 'DLOC y DLOM — del valor base al paquete cerrado',
      inputs: [
        { key: 'valorBase', label: 'Valor base (minoritaria líquida)', value: 1500, min: 100, max: 8000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'primaControl', label: 'Prima de control de mercado', value: 0.3, min: 0, max: 0.8, step: 0.01, fmt: 'pct' },
        { key: 'sigma', label: 'Volatilidad anualizada (σ)', value: 0.65, min: 0.2, max: 1.2, step: 0.05, fmt: 'pct' },
        { key: 'horizonte', label: 'Horizonte a la liquidez (T, años)', value: 3, min: 0.5, max: 10, step: 0.5, fmt: 'num2' },
      ],
      calcs: [
        { key: 'dloc', label: 'DLOC (falta de control)', fmt: 'pct', calc: (v) => 1 - 1 / (1 + v.primaControl), xl: '1-1/(1+[primaControl])' },
        { key: 'dlomFinnerty', label: 'DLOM Finnerty (central)', fmt: 'pct', highlight: true, calc: (v) => 2 * (0.5 * (1 + erf((v.sigma * Math.sqrt(v.horizonte / 3) / 2) / Math.SQRT2))) - 1, xl: '2*NORM.S.DIST([sigma]*SQRT([horizonte]/3)/2,TRUE)-1' },
        { key: 'dlomChaffe', label: 'DLOM Chaffe (referencia)', fmt: 'pct', calc: (v) => 2 * (0.5 * (1 + erf((v.sigma * Math.sqrt(v.horizonte) / 2) / Math.SQRT2))) - 1, xl: '2*NORM.S.DIST([sigma]*SQRT([horizonte])/2,TRUE)-1' },
        { key: 'descuentoTotal', label: 'Descuento total (cascada)', fmt: 'pct', calc: (v) => 1 - (1 - (1 - 1 / (1 + v.primaControl))) * (1 - (2 * (0.5 * (1 + erf((v.sigma * Math.sqrt(v.horizonte / 3) / 2) / Math.SQRT2))) - 1)), xl: '1-(1-[dloc])*(1-[dlomFinnerty])' },
        { key: 'valorPaquete', label: 'Valor del paquete (no marketable)', fmt: 'money', calc: (v) => v.valorBase * (1 - (1 - 1 / (1 + v.primaControl))) * (1 - (2 * (0.5 * (1 + erf((v.sigma * Math.sqrt(v.horizonte / 3) / 2) / Math.SQRT2))) - 1)), xl: '[valorBase]*(1-[descuentoTotal])' },
      ],
      conclusions: [
        {
          test: (v) => {
            const dloc = 1 - 1 / (1 + v.primaControl)
            const dlom = 2 * (0.5 * (1 + erf((v.sigma * Math.sqrt(v.horizonte / 3) / 2) / Math.SQRT2))) - 1
            return 1 - (1 - dloc) * (1 - dlom) < dloc + dlom
          },
          good: 'La cascada multiplicativa da un descuento total MENOR que la suma simple de DLOC + DLOM: aplicar los descuentos en secuencia (no sumándolos) preserva la trazabilidad y evita sobre-castigar el valor del paquete.',
          bad: 'Caso límite: con un descuento en cero, la cascada coincide con la suma. En general la cascada siempre es menor o igual; nunca sumes DLOC y DLOM aritméticamente.',
          xl: 'IF(1-(1-[dloc])*(1-[dlomFinnerty])<[dloc]+[dlomFinnerty],"La cascada ("&TEXT([descuentoTotal],"0.0%")&") es MENOR que la suma simple ("&TEXT([dloc]+[dlomFinnerty],"0.0%")&"): aplicar en secuencia preserva trazabilidad. Paquete = "&TEXT([valorPaquete],"#,##0")&"k.","Caso limite: con un descuento en cero la cascada iguala a la suma. Nunca sumes DLOC y DLOM.")',
        },
      ],
      chart: { sweepKey: 'horizonte', outKey: 'descuentoTotal', xLabel: 'Horizonte a la liquidez (T)', yLabel: 'Descuento total', yFmt: 'pct' },
    },
    promptConcepts: [
      'DLOC = 1 − 1/(1 + Prima de Control)',
      'DLOM con teoría de opciones (put sintética sobre la tenencia)',
      'Finnerty (asiática) central; Chaffe referencia; Longstaff techo',
      'Cascada multiplicativa: 1 − [(1−DLOC)(1−DLOM)], NUNCA sumar',
      'Del Equity Value/valor intrínseco al valor real del paquete cerrado',
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper local: función error de Gauss (erf), usada por el modelo DLOM para
// evaluar la normal acumulada estándar N(x) = 0,5·(1 + erf(x/√2)) en vivo.
// En Excel el equivalente es NORM.S.DIST(x, TRUE). Aproximación de
// Abramowitz & Stegun 7.1.26 (error < 1,5e−7).
// ---------------------------------------------------------------------------
function erf(x: number): number {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * ax)
  const y =
    1 -
    ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) *
      t *
      Math.exp(-ax * ax)
  return sign * y
}
