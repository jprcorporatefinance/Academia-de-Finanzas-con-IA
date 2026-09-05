import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.8 — TSR Sintético, TBR y descuentos de capital cerrado
// Fuente metodológica: skill JPR `synthetic-tsr-emerging-markets`.
// ============================================================================
export const av8_tsr: Asignatura = {
  cod: 'A.8',
  slug: 'av-8',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'TSR Sintético y Total Business Return: medir el retorno del accionista sin precio de pizarra',
  horas: '24 h · 12 teóricas / 12 prácticas',
  correlativas: 'Correlativas: 4.1 y 4.4 · Módulo avanzado',
  framework: 'BCG Value Creators · Pereiro (AL-CAPM) · Damodaran (Beta Total) · Chaffe / Finnerty / Longstaff',
  resumen:
    'El TSR es la métrica con la que el mundo mide creación de valor, y no se puede calcular en una empresa que no cotiza. Este módulo construye el sustituto riguroso: el TSR Sintético y el Total Business Return de BCG, con el valor intrínseco por DCF en lugar del precio, las tres normalizaciones obligatorias de la empresa familiar, y los descuentos DLOC y DLOM aplicados en la secuencia multiplicativa correcta.',
  objetivos: [
    'Derivar la descomposición del TSR en sus cinco generadores y presentarla en forma aditiva.',
    'Construir el TSR Sintético y el TBR para una empresa de capital cerrado.',
    'Aplicar las tres normalizaciones obligatorias de la PyME familiar antes de valuar.',
    'Calcular el DLOM por Chaffe, Finnerty y Longstaff, y elegir el modelo con criterio.',
    'Aplicar DLOC y DLOM en secuencia multiplicativa y explicar por qué no se suman.',
    'Definir la política de dividendos óptima según el arquetipo y el spread ROIC − WACC.',
  ],
  sections: [
    {
      title: 'El problema: medir el retorno cuando no hay precio',
      intro:
        'El TSR combina apreciación del precio y dividendos. En una empresa familiar de capital cerrado no existe precio diario del que extraer la apreciación. Hay que construir un sustituto.',
      blocks: [
        { t: 'formula', name: 'TSR tradicional (empresa cotizante)', expr: 'TSR_t = (P_t − P_{t−1} + D_t) / P_{t−1}', where: 'P = precio de la acción · D = dividendo del período', note: 'Supone reinversión inmediata del dividendo en la misma acción. Sin precio de pizarra, la primera parte del numerador no existe.' },
        { t: 'p', md: 'Lo potente del TSR no es el número: es su **descomposición**. Desagregado, el directorio ve de dónde vino el valor y qué palanca mover. La construcción se hace en cuatro pasos algebraicos que abren el precio hasta llegar a las ventas.' },
        { t: 'steps', title: 'La derivación paso a paso', items: [
          { k: '1 · Abrir el precio', d: 'Como P = EPS × M, entonces P_t/P_{t−1} = (EPS_t/EPS_{t−1}) × (M_t/M_{t−1}): se separa el crecimiento de la utilidad del cambio en las expectativas de valoración.' },
          { k: '2 · Abrir el EPS', d: 'Como EPS = NI/S, entonces EPS_t/EPS_{t−1} = (NI_t/NI_{t−1}) × (S_{t−1}/S_t): el segundo término aísla el efecto de recompras o emisiones.' },
          { k: '3 · Abrir la utilidad neta', d: 'Como NI = Ventas × Margen, entonces NI_t/NI_{t−1} = (Ventas_t/Ventas_{t−1}) × (Margen_t/Margen_{t−1}).' },
          { k: '4 · Consolidar', d: 'Sumando el rendimiento de dividendos se obtiene la forma multiplicativa completa, con cinco generadores.' },
        ] },
        { t: 'formula', name: 'Forma multiplicativa del TSR (BCG)', expr: '1 + TSR = (Ventas_t/Ventas_{t−1}) × (Margen_t/Margen_{t−1}) × (M_t/M_{t−1}) × (S_{t−1}/S_t) + DivYield', where: 'Los cinco generadores: crecimiento de ventas · cambio de margen · cambio de múltiplo · efecto del número de acciones · rendimiento de caja' },
        { t: 'p', md: 'Para que las contribuciones **se sumen exactamente** —que es lo que va a un directorio— se aplica logaritmo natural. BCG convierte la formulación multiplicativa en una presentación aditiva en puntos porcentuales, asignando los residuos de interacción a los campos de margen y de múltiplo. El resultado es un *waterfall* limpio: «del TSR del X %, tantos puntos vinieron de ventas, tantos de margen, tantos de múltiplo, tantos de yield».' },
        { t: 'warn', md: '**Trampa técnica crítica.** La descomposición logarítmica **se quiebra cuando la utilidad es negativa o cero**: no existe el logaritmo de un número no positivo. Pasa en empresas en etapa temprana y en reestructuración profunda. En esos casos hay que quedarse en escala multiplicativa directa, o migrar el análisis al EVA, que mide creación de valor en pesos y no depende de logaritmos.' },
      ],
    },
    {
      title: 'El TSR Sintético y el Total Business Return',
      intro:
        'La respuesta de BCG al problema de la empresa que no cotiza: reemplazar el precio de mercado por el valor intrínseco calculado período a período.',
      blocks: [
        { t: 'p', md: 'El **TSR Sintético** sustituye el precio de mercado por el **valor intrínseco del patrimonio, estimado periódicamente con un DCF estructurado**. En vez de preguntar «¿cuánto cotizó la acción?», pregunta «¿cuánto vale el patrimonio según un DCF consistente, período a período?». El valor `V_t` sale de un APV cuando la estructura de capital cambia, o de un DCF/WACC clásico cuando es estable.' },
        { t: 'formula', name: 'Total Business Return (TBR)', expr: 'TBR_t = FCF_t / V_{t−1} + (V_t − V_{t−1}) / V_{t−1}', where: 'Primer término = yield (el FCF hace de dividendo interno) · Segundo término = ganancia de capital intrínseco', note: 'Es el equivalente interno del TSR que BCG desarrolló para unidades de negocio y subsidiarias no cotizadas. Es la forma operativa del TSR Sintético.' },
        { t: 'idea', md: '**La vara dura que impone el TBR:** toda inversión de capital destinada a mejorar el negocio debe generar una ganancia de valor intrínseco que **supere el "dividendo" que el accionista habría cobrado** si esa caja se hubiera distribuido. Si no la supera, conviene distribuir. Es la disciplina de asignación de capital expresada como métrica de retorno.' },
        { t: 'formula', name: 'TBR con proxy de valor (empresas de capital intensivo)', expr: 'TBR ≈ (Δ EBITDA + FCF) / (EBITDA × M_transaccional)', where: 'M_transaccional = múltiplo de transacciones comparables del sector', note: 'En servicios o activos ligeros conviene reemplazar el EBITDA por EBIT o NOPAT, donde representan mejor el valor.' },
        { t: 'warn', md: '**Consistencia temporal, la condición sin la cual el TBR no significa nada:** `V_t` y `V_{t−1}` deben calcularse con la **misma metodología, el mismo costo de capital y los mismos supuestos**. Si no, el ΔV mide cambios de supuesto y no creación de valor real. El TBR es tan bueno como el DCF que lo alimenta.' },
      ],
    },
    {
      title: 'Las tres normalizaciones obligatorias de la empresa familiar',
      intro:
        'El flujo de caja de una PyME familiar no es directamente utilizable. Arrastra anomalías estructurales que una cotizada de mercado desarrollado no tiene.',
      blocks: [
        { t: 'ol', items: [
          '**Sobrecompensación (o subcompensación) de socios y directores.** Los socios-gerentes suelen pagarse por encima o por debajo del mercado para optimizar su carga impositiva personal. Hay que normalizar esos costos a **valores de mercado por el trabajo efectivamente realizado**. Si el dueño cobra de menos, el EBITDA está inflado; si cobra de más, está deprimido. En los dos casos, el retorno operativo que se está midiendo no es el del negocio.',
          '**Gastos personales cargados a la sociedad.** Vehículos familiares, viajes, inmuebles no operativos: se eliminan del gasto y se **reclasifican como distribuciones de capital implícitas**. Eso hace aparecer el EBITDA real y, de paso, hace visible cuánta caja sale por decisión de consumo y no de asignación.',
          '**Modelización en dólares.** En economías de alta volatilidad monetaria, la modelización y el presupuesto de capital se hacen directamente en dólares. Eso neutraliza la distorsión inflacionaria y **aísla el crecimiento operativo real de la ilusión nominal** que produce la devaluación de la moneda de cuenta.',
        ] },
        { t: 'idea', md: 'Estas tres normalizaciones no son ajustes contables menores: son **la condición de posibilidad** del TSR Sintético. Un ΔV calculado sobre un EBITDA que incluye el auto de la familia y el sueldo político del hijo no mide creación de valor: mide decisiones de consumo disfrazadas de resultado.' },
      ],
    },
    {
      title: 'Los descuentos de capital cerrado: DLOC y DLOM',
      intro:
        'Cuando el valor sale de comparables cotizadas, representa una participación minoritaria líquida. Un paquete de una empresa cerrada no es ni líquido ni necesariamente controlante.',
      blocks: [
        { t: 'h', text: 'DLOC — descuento por falta de control' },
        { t: 'formula', name: 'DLOC', expr: 'DLOC = 1 − 1 / (1 + Prima de Control)', where: 'Prima de control = prima promedio observada en transacciones comparables', note: 'Con una prima de control del 30 %: DLOC = 1 − 1/1,30 = 23,1 %. En economías con pocas transacciones comparables hay que triangular fuentes y sensibilizar.' },
        { t: 'h', text: 'DLOM — descuento por falta de negociabilidad' },
        { t: 'p', md: '**La gran intuición:** la falta de liquidez equivale al **costo de no contar con una opción de venta (put) líquida** sobre la participación durante el horizonte de tenencia `T`. Por eso el DLOM se modela con teoría de opciones y no con promedios fijos, que serían arbitrarios.' },
        { t: 'formula', name: 'Chaffe (1993) — put europea Black-Scholes', expr: 'DLOM = Put_BSM(S, K = S, T, r, σ) / S  ≈  2·N(σ·√T / 2) − 1', where: 'σ = volatilidad anualizada de los rendimientos del activo (suele fijarse por encima del 60 % en PyMEs privadas) · T = horizonte hasta la liquidez', note: 'Alta sensibilidad a volatilidades elevadas: con σ > 80 % genera descuentos que se acercan a la liquidación total.' },
        { t: 'table', title: 'Los tres modelos de DLOM', headers: ['Modelo', 'Instrumento base', 'Comportamiento con σ alta'], firstColLeft: true, rows: [
          ['Chaffe (1993)', 'Put europea convencional (BSM)', 'Alta sensibilidad; descuentos elevados'],
          ['Finnerty (2012)', 'Put asiática de promedio de strike', 'Estable; modera el crecimiento; rangos conservadores 12 %–38 %'],
          ['Longstaff (1995)', 'Put retrospectiva (lookback) extrema', 'Muy volátil; se satura rápido; da la COTA SUPERIOR teórica'],
        ], caption: 'Longstaff no es "el más conservador": es el máximo teórico. Usarlo como estimación central sobrecastiga sistemáticamente.' },
        { t: 'h', text: 'La secuencia: por qué no se suman' },
        { t: 'formula', name: 'Aplicación multiplicativa', expr: 'Descuento total = 1 − [(1 − DLOC) × (1 − DLOM)]', where: 'Orden: valor controlante marketable → aplicar DLOC → valor minoritario marketable → aplicar DLOM → valor minoritario no marketable', note: 'Con DLOC 20 % y DLOM 30 %: el combinado NO es 50 %, es 1 − (0,80 × 0,70) = 44 %. Sumar sobrecastiga y destruye la trazabilidad.' },
        { t: 'warn', md: '**El error más recurrente en la valuación de capital cerrado es sumar los descuentos aritméticamente.** Sobre una valuación grande, la diferencia entre 44 % y 50 % es material — y, lo que es peor, hace imposible defender el número frente a un perito o a un comprador.' },
      ],
    },
    {
      title: 'Gestionar la liquidez es crear valor',
      intro:
        'El DLOM escala con el horizonte hasta el evento de salida. Ese horizonte es una variable de gestión, no un dato del entorno.',
      blocks: [
        { t: 'p', md: 'Cuanto más lejos está la liquidez, mayor el descuento. La dirección puede **mitigar activamente** el impacto del DLOM comprimiendo `T` de forma **creíble y demostrable** —creíble es la palabra clave: una intención no comprime nada—.' },
        { t: 'ul', items: [
          '**Recompras periódicas** de participaciones con cargo a utilidades retenidas, con reglas escritas y ejecutadas.',
          '**Planes de pre-salida** con fondos de capital privado locales.',
          '**Política estable de dividendos** que devuelva liquidez de forma continua y previsible.',
        ] },
        { t: 'idea', md: '**El efecto es de palanca.** Comprimir `T` de tres años a uno, de forma demostrable, hace **caer drásticamente el DLOM** y produce un incremento inmediato del valor minoritario no marketable — un salto discreto positivo en el TSR Sintético del accionista privado, **sin haber vendido un peso más ni bajado un peso de costo**.' },
      ],
    },
    {
      title: 'Política de dividendos: la decisión que cierra el círculo',
      intro:
        'La palanca central es el diferencial ROIC − WACC, con el WACC calculado para un dueño que no puede diversificar.',
      blocks: [
        { t: 'table', title: 'Los dos casos y su decisión', headers: ['Situación', 'Decisión óptima', 'Por qué'], firstColLeft: true, rows: [
          ['ROIC ≫ WACC', 'Retener y crecer', 'Cada peso reinvertido expande V_t más de lo que valía el dividendo que se habría distribuido'],
          ['ROIC ≤ WACC', 'Distribuir el 100 % del FCF y frenar el capex de expansión', 'El capital nuevo destruye valor; devolverlo al accionista para que lo reasigne eleva el TSR Sintético por la vía del yield'],
        ] },
        { t: 'p', md: '**"Ganarse el derecho a crecer".** La evidencia sobre eficiencia de capital muestra que las empresas con retorno operativo bajo deben priorizar la **eficiencia de los activos existentes** y la **mejora de márgenes** *antes* de destinar capital nuevo a expansión. Primero subir el ROIC por encima del WACC; recién entonces crecer. Crecer con ROIC deprimido es destruir valor a escala.' },
        { t: 'idea', md: 'En una distribuidora o importadora, «ganarse el derecho a crecer» pasa casi siempre por el **denominador**: liberar capital de trabajo, acortar el ciclo de conversión de efectivo, depurar inventarios con ABC/XYZ. Sube el ROIC sin tocar una sola línea del estado de resultados.' },
        { t: 'p', md: '**Arquetipos de inversor.** El análisis comparativo de BCG entre regiones muestra que los mercados en desarrollo atraen flujos con perfiles muy distintos: los de alta dinámica de expansión capturan capital enfocado en crecimiento de múltiplos, mientras que **América Latina atrae predominantemente arquetipos rentistas**, orientados a dividendos inmediatos y disciplina de caja. Una PyME que planea una transición o venta parcial debe alinear su política financiera y su comunicación con el arquetipo prevaleciente: en la región, eso significa **priorizar flujos líquidos por sobre la promesa de múltiplos futuros**.' },
        { t: 'chain', title: 'El árbol de decisión completo', nodes: ['¿ROIC vs WACC (no diversificado)?', 'ROIC ≫ WACC → retener · ROIC ≤ WACC → distribuir 100 %', 'Comprimir T de forma demostrable → cae el DLOM', 'Alinear con el arquetipo de inversor del mercado relevante'], caption: 'Las tres decisiones son secuenciales y acumulativas: la política de dividendos define el yield, la gestión de la liquidez define el descuento, y el arquetipo define cómo se comunica.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Qué cambia cuando una empresa familiar empieza a medirse con TSR Sintético.',
      blocks: [
        { t: 'p', md: 'La empresa familiar de la región mide su desempeño con dos números: la utilidad del ejercicio y lo que quedó en la caja. Ninguno de los dos responde la pregunta del dueño, que es **«¿me conviene tener mi patrimonio acá o en otro lado?»**. El TSR Sintético responde exactamente eso, y es la razón por la que introduce una conversación que la contabilidad nunca abre.' },
        { t: 'warn', md: 'El uso más peligroso del TSR Sintético es el autocomplaciente: recalcular `V_t` cada año cambiando los supuestos hasta que dé un ΔV agradable. Sin consistencia temporal declarada y auditable, el TSR Sintético no mide creación de valor: **mide optimismo**. La disciplina de fijar la metodología antes de conocer el resultado es lo que separa la medición de la justificación.' },
        { t: 'p', md: 'El TBR conecta directamente con la asignación de capital (módulo A.2) y con el canal del riesgo (módulo A.6): el `V_t` que alimenta el TSR Sintético es el resultado de una valuación cuya ruta de riesgo hay que declarar. Si `V_{t−1}` se calculó con escenarios en el flujo y `V_t` con prima en la tasa, el ΔV mide el cambio de método y nada más.' },
      ],
    },
  ],
  expertos: [
    { author: 'BCG — Value Creators Report', credential: 'Boston Consulting Group', md: 'El TSR se desagrega en crecimiento fundamental, cambio de múltiplo y contribución de caja. La utilidad de la descomposición no es explicar el pasado: es mostrar cuál de los tres bloques está efectivamente bajo control de la dirección.' },
    { author: 'Luis Pereiro', credential: 'Universidad Torcuato Di Tella', md: 'El dueño de una PyME emergente no es un inversor diversificado, y valuar su empresa con el costo de capital de un fondo global es describir a un comprador que no existe. La corrección no es opcional: cambia el valor en decenas de puntos.' },
    { author: 'Shannon Pratt', credential: 'Valuing a Business', md: 'El descuento por falta de control y el descuento por falta de negociabilidad responden a preguntas distintas y se aplican en secuencia. Sumarlos es el error más frecuente y el más caro de la valuación de empresas cerradas.' },
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — Director General', md: 'Comprimir el horizonte hasta la liquidez de tres años a uno, de forma demostrable, sube el valor de la participación del dueño más que la mayoría de los proyectos de inversión que discute el directorio. Gestionar la liquidez es, literalmente, crear valor.' },
  ],
  caso: {
    titulo: 'Cuánto rindió realmente el patrimonio de los Rossi',
    empresa: 'Maderas del Litoral S.A. — TSR Sintético del ejercicio',
    contexto:
      'Los tres hermanos nunca calcularon cuánto les rindió el patrimonio que tienen adentro de la empresa. Saben la utilidad del ejercicio y saben cuánto retiraron. Con eso creen tener la película completa.\n\nEl trabajo del caso es construir el TSR Sintético del ejercicio: valuar el patrimonio al inicio y al cierre con la misma metodología, medir el flujo de caja distribuible, y descomponer el retorno resultante en sus generadores. Después hay que aplicar los descuentos que corresponden a la participación del hermano menor —que no trabaja en la empresa y por lo tanto no controla nada— y compararlo con lo que ese mismo capital habría rendido colocado afuera.\n\nEl número final suele ser incómodo. Y es exactamente el número que hay que tener antes de discutir política de dividendos, entrada de un socio o compra de la parte de un hermano.',
    datos: [
      { t: 'table', title: 'Datos del ejercicio (miles de $, moneda homogénea)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Valor intrínseco del patrimonio al inicio (V₀)', '9.400'],
        ['Valor intrínseco del patrimonio al cierre (V₁)', '9.850'],
        ['Flujo de caja libre del ejercicio (FCF)', '620'],
        ['Retiros efectivos de los socios', '780'],
        ['Ventas año anterior / actual', '38.500 / 42.000'],
        ['Margen neto normalizado año anterior / actual', '5,4 % / 4,6 %'],
        ['Múltiplo transaccional del sector', '4,2x EBITDA'],
        ['Prima de control observada en comparables', '28 %'],
        ['Volatilidad estimada del patrimonio (σ)', '65 %'],
        ['Horizonte hasta un evento de liquidez (T)', '3 años'],
        ['ROIC normalizado / WACC', '21,3 % / 20,0 %'],
      ] },
    ],
    consigna: [
      'Calcular el TBR del ejercicio y descomponerlo en yield y ganancia de capital intrínseco.',
      'Descomponer el TSR Sintético en sus generadores: crecimiento de ventas, cambio de margen y contribución de caja.',
      'Calcular el DLOM por Chaffe con T = 3 y luego con T = 1, y cuantificar cuánto valor gana el hermano menor si la familia instituye una política creíble de recompras.',
      'Aplicar DLOC y DLOM en secuencia multiplicativa sobre la participación minoritaria y comparar contra la suma aritmética.',
      'Con el spread ROIC − WACC de +1,3 pp, recomendar la política de dividendos y justificarla con el marco del módulo.',
    ],
    metodologia: [
      { k: 'Fijar la metodología antes', d: 'Declarar por escrito cómo se calcula V, con qué tasa y con qué supuestos, ANTES de conocer el resultado. Sin eso, el ΔV no es medición.' },
      { k: 'Normalizar los tres frentes', d: 'Retribución de socios a mercado, gastos personales reclasificados, modelización en dólares.' },
      { k: 'Separar yield de apreciación', d: 'El TBR abre el retorno en la caja que se liberó y el valor que se acumuló: son palancas distintas con responsables distintos.' },
      { k: 'Aplicar los descuentos en orden', d: 'Controlante marketable → DLOC → minoritario marketable → DLOM → minoritario no marketable. Nunca sumar.' },
      { k: 'Cerrar con la decisión', d: 'Con spread apenas positivo y RONIC por debajo del WACC, la recomendación de dividendos no es una opinión: sale del marco.' },
    ],
  },
  model: {
    sheetTitle: 'TSR Sintético, TBR y descuentos de capital cerrado',
    intro:
      'Editá las celdas marfil. El modelo calcula el TBR del ejercicio, descompone el TSR Sintético en sus generadores y despliega la curva del DLOM en función del horizonte de liquidez con una sola fórmula de matriz dinámica.',
    inputs: [
      { key: 'v0', label: 'Valor intrínseco al inicio (V₀)', value: 9400, fmt: 'money', unit: 'miles $' },
      { key: 'v1', label: 'Valor intrínseco al cierre (V₁)', value: 9850, fmt: 'money', unit: 'miles $' },
      { key: 'fcf', label: 'Flujo de caja libre del ejercicio', value: 620, fmt: 'money' },
      { key: 'ventas0', label: 'Ventas año anterior', value: 38500, fmt: 'money' },
      { key: 'ventas1', label: 'Ventas año actual', value: 42000, fmt: 'money' },
      { key: 'margen0', label: 'Margen neto normalizado anterior', value: 0.054, fmt: 'pct1' },
      { key: 'margen1', label: 'Margen neto normalizado actual', value: 0.046, fmt: 'pct1' },
      { key: 'primaControl', label: 'Prima de control de comparables', value: 0.28, fmt: 'pct' },
      { key: 'sigma', label: 'Volatilidad del patrimonio (σ)', value: 0.65, fmt: 'pct' },
      { key: 'horizonte', label: 'Horizonte hasta la liquidez (T, años)', value: 3, fmt: 'num' },
      { key: 'roic', label: 'ROIC normalizado', value: 0.213, fmt: 'pct1' },
      { key: 'wacc', label: 'WACC del dueño no diversificado', value: 0.200, fmt: 'pct1' },
    ],
    calcs: [
      { key: 'yieldTbr', label: 'Yield del TBR (FCF / V₀)', xl: '=[fcf]/[v0]', fmt: 'pct1' },
      { key: 'apreciacion', label: 'Ganancia de capital intrínseco', xl: '=([v1]-[v0])/[v0]', fmt: 'pct1' },
      { key: 'tbr', label: 'Total Business Return del ejercicio', xl: '=[yieldTbr]+[apreciacion]', fmt: 'pct1', highlight: true },
      { key: 'gVentas', label: 'Generador: crecimiento de ventas', xl: '=LN([ventas1]/[ventas0])', fmt: 'pct1', note: 'Contribución en forma logarítmica, que es la que se suma exactamente.' },
      { key: 'gMargen', label: 'Generador: cambio de margen', xl: '=LN([margen1]/[margen0])', fmt: 'pct1' },
      { key: 'gCaja', label: 'Generador: contribución de caja', xl: '=[yieldTbr]', fmt: 'pct1' },
      { key: 'dloc', label: 'DLOC (falta de control)', xl: '=1-1/(1+[primaControl])', fmt: 'pct1', highlight: true },
      { key: 'dlomChaffe', label: 'DLOM por Chaffe con el T actual', xl: '=2*NORM.S.DIST([sigma]*SQRT([horizonte])/2,TRUE)-1', fmt: 'pct1', highlight: true },
      { key: 'dlomT1', label: 'DLOM por Chaffe si T = 1 año', xl: '=2*NORM.S.DIST([sigma]*SQRT(1)/2,TRUE)-1', fmt: 'pct1' },
      { key: 'descuentoTotal', label: 'Descuento total (multiplicativo)', xl: '=1-((1-[dloc])*(1-[dlomChaffe]))', fmt: 'pct1', highlight: true },
      { key: 'descuentoSuma', label: 'Descuento si se sumara (INCORRECTO)', xl: '=[dloc]+[dlomChaffe]', fmt: 'pct1', note: 'Se muestra solo para dimensionar el sobrecastigo del error más frecuente.' },
      { key: 'spread', label: 'Spread ROIC − WACC', xl: '=[roic]-[wacc]', fmt: 'pct1', highlight: true },
    ],
    spills: [
      {
        key: 'curvaDlom',
        title: 'El DLOM como función del horizonte de liquidez',
        columns: ['T (años)', 'DLOM Chaffe', 'Valor minoritario por cada 100', 'Ganancia vs T actual'],
        xl: '=LET(t,SEQUENCE(6,1,0.5,0.5), d,2*NORM.S.DIST([sigma]*SQRT(t)/2,TRUE)-1, val,100*(1-[dloc])*(1-d), base,100*(1-[dloc])*(1-[dlomChaffe]), HSTACK(t,d,val,val-base))',
        formats: ['num2', 'pct1', 'money2', 'money2'],
        rows: 6,
        note: 'SEQUENCE recorre el horizonte de 0,5 a 3 años. La última columna es la palanca: cuánto valor gana el minoritario por cada 100 de valor base al acortar la salida — sin vender un peso más.',
      },
      {
        key: 'waterfall',
        title: 'Descomposición aditiva del TSR Sintético',
        columns: ['Generador', 'Contribución (pp)'],
        xl: '=LET(nom,{"Crecimiento de ventas";"Cambio de margen";"Contribución de caja";"TSR Sintético"}, v,VSTACK([gVentas],[gMargen],[gCaja],[gVentas]+[gMargen]+[gCaja]), HSTACK(nom,v))',
        formats: [undefined, 'pct1'],
        rows: 4,
        note: 'La forma logarítmica hace que las contribuciones sumen exactamente. Si el margen o la utilidad fueran negativos, esta descomposición se rompe y hay que migrar al EVA.',
      },
    ],
    conclusions: [
      { label: 'Retorno del ejercicio', xl: '="El TBR fue de "&TEXT([tbr],"0.0%")&": "&TEXT([yieldTbr],"0.0%")&" de yield (la caja que liberó el negocio) más "&TEXT([apreciacion],"0.0%")&" de apreciación del valor intrínseco. Contra un costo de capital del dueño de "&TEXT([wacc],"0.0%")&", el veredicto es "&IF([tbr]>[wacc],"POSITIVO: el patrimonio rindió por encima de su costo de oportunidad.","NEGATIVO: el patrimonio rindió por debajo de lo que exige el propio dueño.")' },
      { label: 'Descuentos de capital cerrado', xl: '="Participación minoritaria: DLOC "&TEXT([dloc],"0.0%")&" y DLOM "&TEXT([dlomChaffe],"0.0%")&" se aplican en secuencia, dando "&TEXT([descuentoTotal],"0.0%")&" — no "&TEXT([descuentoSuma],"0.0%")&", que es lo que da sumarlos y sobrecastiga "&TEXT([descuentoSuma]-[descuentoTotal],"0.0%")&" de más."' },
      { label: 'Palanca de liquidez', xl: '="Comprimir el horizonte de salida de "&TEXT([horizonte],"0")&" a 1 año de forma demostrable baja el DLOM de "&TEXT([dlomChaffe],"0.0%")&" a "&TEXT([dlomT1],"0.0%")&": un salto de "&TEXT([dlomChaffe]-[dlomT1],"0.0%")&" de valor para el socio minoritario, sin vender un peso más."' },
      { label: 'Política de dividendos', xl: '=IF([spread]>0.03,"ROIC muy por encima del WACC (spread "&TEXT([spread],"0.0%")&"): retener y crecer optimiza el TSR Sintético.",IF([spread]>0,"Spread apenas positivo ("&TEXT([spread],"0.0%")&"): antes de crecer hay que GANARSE EL DERECHO A CRECER — subir el ROIC por eficiencia de activos y margen, y mientras tanto priorizar distribución.","ROIC por debajo del WACC: distribuir el 100% del FCF y frenar el capex de expansión. Cada peso nuevo destruye valor."))' },
    ],
  },
  ejercicio: {
    titulo: 'El costo de sumar los descuentos',
    enunciado:
      'Un perito valúa el 25 % de una empresa familiar en una disputa societaria. El valor de la empresa completa, obtenido de múltiplos de comparables cotizadas, es de 20.000 (miles). El perito aplica un DLOC del 22 % y un DLOM del 35 %, y los suma: 57 %.\n\nLa parte contraria impugna el cálculo.',
    datos: [
      { t: 'table', title: 'Datos', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Valor de la empresa (base comparables)', '20.000 miles $'],
        ['Participación valuada', '25 %'],
        ['DLOC aplicado', '22 %'],
        ['DLOM aplicado', '35 %'],
        ['Descuento del perito (suma)', '57 %'],
      ] },
    ],
    preguntas: [
      '¿Cuál es el descuento total correcto?',
      '¿Cuánto valor de más le quitó el perito al paquete?',
      '¿En qué orden deben aplicarse los descuentos y por qué el orden importa conceptualmente?',
      '¿Qué otro dato haría falta para auditar el DLOM del 35 %?',
    ],
    solucion: [
      { t: 'formula', name: 'Descuento total correcto', expr: 'Descuento = 1 − [(1 − 0,22) × (1 − 0,35)] = 1 − (0,78 × 0,65) = 1 − 0,507 = 49,3 %' },
      { t: 'formula', name: 'Valor del paquete por las dos vías', expr: 'Base: 20.000 × 25 % = 5.000\nCorrecto: 5.000 × (1 − 0,493) = 2.535\nDel perito: 5.000 × (1 − 0,57) = 2.150' },
      { t: 'p', md: 'El perito le quitó **385 mil de más** al paquete: un **15,2 % del valor correcto**, por un error puramente aritmético. En una disputa societaria, esa diferencia es la disputa entera.' },
      { t: 'idea', md: 'El orden importa porque los descuentos responden a **dimensiones distintas y encadenadas del valor**. Primero se pasa de *controlante marketable* a *minoritario marketable* (DLOC: se pierden los derechos de decisión). Recién sobre ese valor —el de una participación que ya no controla— se pregunta cuánto cuesta que además no se pueda vender (DLOM). Aplicar el DLOM sobre el valor controlante mediría la iliquidez de un paquete que no es el que se está valuando.' },
      { t: 'warn', md: 'Para auditar el DLOM del 35 % hacen falta tres datos que el informe debería declarar y casi nunca declara: el **modelo usado** (Chaffe, Finnerty o Longstaff), la **volatilidad σ** con su fuente, y el **horizonte T** hasta el evento de liquidez con su justificación. Un DLOM sin esos tres parámetros no es una estimación: es un número elegido.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El TSR tradicional no se puede calcular en una PyME de capital cerrado porque:', opciones: ['No paga dividendos.', 'No existe un precio de mercado del que extraer la apreciación.', 'No tiene utilidad contable.', 'No lleva contabilidad.'], correcta: 1, justificacion: 'El TSR combina apreciación del precio y dividendos; sin cotización, la primera parte del numerador no existe y hay que construir un sustituto.' },
    { id: 'q2', pregunta: 'La forma multiplicativa del TSR de BCG contiene cinco generadores:', opciones: ['Activo, pasivo, patrimonio, ventas y costos.', 'Crecimiento de ventas, cambio de margen, cambio de múltiplo, efecto del número de acciones y rendimiento de caja.', 'ROIC, WACC, EVA, CFROI y RONIC.', 'Precio, cantidad, costo, gasto e impuesto.'], correcta: 1, justificacion: 'Cada factor de la descomposición es una palanca distinta, con un responsable y un plan de acción diferentes.' },
    { id: 'q3', pregunta: 'La conversión de la forma multiplicativa a la aditiva se hace:', opciones: ['Redondeando.', 'Aplicando logaritmo natural a la tasa de acumulación de capital.', 'Sumando directamente los factores.', 'Con una regresión.'], correcta: 1, justificacion: 'El logaritmo convierte productos en sumas, que es lo que permite el waterfall aditivo que BCG presenta ante directorios.' },
    { id: 'q4', pregunta: 'La descomposición logarítmica del TSR se quiebra cuando:', opciones: ['El crecimiento supera el 50 %.', 'La utilidad es negativa o cero: no existe el logaritmo de un número no positivo.', 'Hay más de tres generadores.', 'La empresa no cotiza.'], correcta: 1, justificacion: 'Pasa en empresas en etapa temprana o en reestructuración profunda; ahí hay que quedarse en escala multiplicativa o migrar al EVA.' },
    { id: 'q5', pregunta: 'El TSR Sintético sustituye el precio de mercado por:', opciones: ['El valor contable del patrimonio.', 'El valor intrínseco del patrimonio estimado periódicamente por DCF.', 'El EBITDA.', 'El precio de la última transacción.'], correcta: 1, justificacion: 'Se pregunta cuánto vale el patrimonio según un DCF consistente, período a período, en lugar de cuánto cotizó la acción.' },
    { id: 'q6', pregunta: 'La fórmula del Total Business Return es:', opciones: ['TBR = EBITDA / Ventas.', 'TBR = FCF_t/V_{t−1} + (V_t − V_{t−1})/V_{t−1}.', 'TBR = ROIC − WACC.', 'TBR = Utilidad / Patrimonio.'], correcta: 1, justificacion: 'Combina el yield —donde el FCF hace de dividendo interno— con la ganancia de capital intrínseco del período.' },
    { id: 'q7', pregunta: 'La vara que impone el TBR a toda inversión de capital es:', opciones: ['Que recupere la inversión en tres años.', 'Que la ganancia de valor intrínseco supere el dividendo que el accionista habría cobrado con esa caja.', 'Que aumente las ventas.', 'Que baje los costos.'], correcta: 1, justificacion: 'Es la disciplina de asignación de capital expresada como métrica de retorno: si no supera esa vara, conviene distribuir.' },
    { id: 'q8', pregunta: 'La condición sin la cual el TBR no significa nada es:', opciones: ['Que la empresa cotice.', 'La consistencia temporal: V_t y V_{t−1} calculados con la misma metodología, tasa y supuestos.', 'Que haya más de cinco años de historia.', 'Que el FCF sea positivo.'], correcta: 1, justificacion: 'Sin consistencia, el ΔV mide cambios de supuesto y no creación de valor real. El TBR es tan bueno como el DCF que lo alimenta.' },
    { id: 'q9', pregunta: 'La primera normalización obligatoria de la PyME familiar es:', opciones: ['Ajustar por inflación.', 'Llevar la retribución de socios y directores a valores de mercado por el trabajo efectivamente realizado.', 'Eliminar la deuda.', 'Cambiar el plan de cuentas.'], correcta: 1, justificacion: 'Si el dueño cobra de menos, el EBITDA está inflado; si cobra de más, está deprimido. En los dos casos el retorno medido no es el del negocio.' },
    { id: 'q10', pregunta: 'Los gastos personales cargados a la sociedad deben:', opciones: ['Dejarse como están.', 'Eliminarse del gasto y reclasificarse como distribuciones de capital implícitas.', 'Sumarse al capex.', 'Considerarse gasto financiero.'], correcta: 1, justificacion: 'Eso hace aparecer el EBITDA real y, de paso, visibiliza cuánta caja sale por decisión de consumo y no de asignación.' },
    { id: 'q11', pregunta: 'La modelización en dólares en economías de alta inflación sirve para:', opciones: ['Pagar menos impuestos.', 'Aislar el crecimiento operativo real de la ilusión nominal de la devaluación.', 'Cumplir una norma contable.', 'Simplificar el cálculo.'], correcta: 1, justificacion: 'El crecimiento nominal en pesos puede ser enorme sin que la empresa haya crecido un metro cúbico; el dólar neutraliza esa distorsión.' },
    { id: 'q12', pregunta: 'El DLOC se calcula como:', opciones: ['1 − 1/(1 + Prima de control).', 'Prima de control × valor.', '1 + Prima de control.', 'Prima de control / 2.'], correcta: 0, justificacion: 'Con una prima de control del 30 %, el descuento implícito de la minoritaria es 1 − 1/1,30 = 23,1 %.' },
    { id: 'q13', pregunta: 'La intuición central del DLOM es que la iliquidez equivale:', opciones: ['A un impuesto.', 'Al costo de no contar con una opción de venta (put) líquida durante el horizonte de tenencia.', 'A la prima de riesgo país.', 'A la amortización.'], correcta: 1, justificacion: 'Por eso el DLOM se modela con teoría de opciones y no con promedios fijos, que serían arbitrarios y no auditables.' },
    { id: 'q14', pregunta: 'El modelo de Chaffe se basa en:', opciones: ['Una put asiática.', 'Una put europea convencional (Black-Scholes-Merton) con K = S.', 'Una call americana.', 'Un forward.'], correcta: 1, justificacion: 'Con tasa libre de riesgo nula y sin dividendos se reduce a DLOM ≈ 2·N(σ√T/2) − 1.' },
    { id: 'q15', pregunta: 'El modelo de Longstaff se caracteriza por:', opciones: ['Dar el descuento más conservador.', 'Ser una put retrospectiva que da la COTA SUPERIOR teórica del descuento.', 'No depender de la volatilidad.', 'Aplicarse solo a empresas cotizantes.'], correcta: 1, justificacion: 'Usarlo como estimación central sobrecastiga sistemáticamente: es un máximo teórico, no un valor esperado.' },
    { id: 'q16', pregunta: 'El modelo de Finnerty se distingue por:', opciones: ['Ser el más agresivo.', 'Ser estable y dar rangos conservadores del 12 % al 38 %, con una put asiática de promedio de strike.', 'No usar volatilidad.', 'Ser idéntico a Chaffe.'], correcta: 1, justificacion: 'Modera el crecimiento del descuento ante volatilidades altas, lo que lo hace el más robusto de los tres para PyMEs privadas.' },
    { id: 'q17', pregunta: 'DLOC y DLOM se aplican:', opciones: ['Sumándolos.', 'En secuencia multiplicativa: 1 − [(1−DLOC)×(1−DLOM)].', 'Tomando el mayor de los dos.', 'Promediándolos.'], correcta: 1, justificacion: 'Con DLOC 20 % y DLOM 30 %, el combinado es 44 % y no 50 %. Sumar sobrecastiga y destruye la trazabilidad del cálculo.' },
    { id: 'q18', pregunta: 'El orden correcto de aplicación es:', opciones: ['DLOM y después DLOC.', 'Valor controlante marketable → DLOC → minoritario marketable → DLOM → minoritario no marketable.', 'Los dos a la vez sobre el valor base.', 'Es indistinto.'], correcta: 1, justificacion: 'Primero se pierden los derechos de decisión, y recién sobre ese valor se pregunta cuánto cuesta no poder vender el paquete.' },
    { id: 'q19', pregunta: 'El DLOM escala con:', opciones: ['El tamaño de la empresa.', 'El horizonte hasta el evento de liquidez (T) y la volatilidad (σ).', 'La cantidad de socios.', 'El nivel de deuda.'], correcta: 1, justificacion: 'Cuanto más lejos la liquidez y más volátil el activo, mayor el valor de la put que el tenedor no tiene, y por lo tanto mayor el descuento.' },
    { id: 'q20', pregunta: 'Comprimir T de tres años a uno de forma demostrable produce:', opciones: ['Ningún efecto.', 'Una caída drástica del DLOM y un salto inmediato del valor minoritario no marketable.', 'Un aumento del WACC.', 'Una baja del ROIC.'], correcta: 1, justificacion: 'Gestionar la liquidez es literalmente crear valor: sube el valor del paquete sin vender un peso más ni bajar un peso de costo.' },
    { id: 'q21', pregunta: 'Las herramientas para comprimir T de forma creíble incluyen:', opciones: ['Anunciar la intención de vender.', 'Recompras periódicas con reglas escritas, planes de pre-salida y política estable de dividendos.', 'Aumentar la deuda.', 'Cambiar de auditor.'], correcta: 1, justificacion: 'La palabra clave es demostrable: una intención no comprime el descuento, un mecanismo ejecutado sí.' },
    { id: 'q22', pregunta: 'Con ROIC muy por encima del WACC, la política óptima es:', opciones: ['Distribuir el 100 % del FCF.', 'Retener y crecer: cada peso reinvertido expande V_t más de lo que valía el dividendo.', 'Recomprar deuda.', 'Vender la empresa.'], correcta: 1, justificacion: 'La retención optimiza el TSR Sintético porque expande la base de capital propio en mayor medida que el dividendo distribuido.' },
    { id: 'q23', pregunta: 'Con ROIC igual o menor al WACC, la política óptima es:', opciones: ['Crecer más rápido para mejorar el ROIC.', 'Distribuir el 100 % del FCF y frenar el capex de expansión.', 'Tomar deuda para invertir.', 'Mantener la política actual.'], correcta: 1, justificacion: 'Si la empresa rinde menos que su costo de capital, devolverle la caja al accionista detiene la dilapidación y eleva el TSR Sintético vía yield.' },
    { id: 'q24', pregunta: '"Ganarse el derecho a crecer" significa:', opciones: ['Conseguir financiamiento antes de invertir.', 'Priorizar eficiencia de los activos existentes y mejora de márgenes ANTES de destinar capital nuevo a expansión.', 'Esperar a que baje la tasa.', 'Contratar más vendedores.'], correcta: 1, justificacion: 'Crecer con ROIC deprimido es destruir valor a escala. Primero subir el ROIC por encima del WACC; recién entonces crecer.' },
    { id: 'q25', pregunta: 'En una distribuidora, ganarse el derecho a crecer suele pasar por:', opciones: ['El numerador: subir precios.', 'El denominador: liberar capital de trabajo y acortar el ciclo de conversión de efectivo.', 'Reducir el personal.', 'Cambiar de rubro.'], correcta: 1, justificacion: 'Sube el ROIC sin tocar una sola línea del estado de resultados, y libera caja de una sola vez en el proceso.' },
    { id: 'q26', pregunta: 'Según el análisis comparativo de BCG, América Latina atrae predominantemente:', opciones: ['Capital enfocado en crecimiento de múltiplos.', 'Arquetipos rentistas, orientados a dividendos inmediatos y disciplina de caja.', 'Inversores de riesgo tecnológico.', 'Fondos soberanos.'], correcta: 1, justificacion: 'Por eso una PyME regional que planea una transición debe priorizar flujos líquidos por sobre la promesa de múltiplos futuros en su comunicación y su política financiera.' },
    { id: 'q27', pregunta: 'El uso más peligroso del TSR Sintético es:', opciones: ['Calcularlo todos los años.', 'Recalcular V_t cambiando supuestos hasta que el ΔV dé agradable.', 'Compararlo con el TSR de cotizantes.', 'Descomponerlo en generadores.'], correcta: 1, justificacion: 'Sin consistencia temporal declarada y auditable, el TSR Sintético no mide creación de valor: mide optimismo.' },
    { id: 'q28', pregunta: 'El TBR con proxy de valor para empresas de capital intensivo se aproxima como:', opciones: ['(Δ EBITDA + FCF) / (EBITDA × múltiplo transaccional).', 'EBITDA / Ventas.', 'FCF / Patrimonio contable.', 'Utilidad / Activos.'], correcta: 0, justificacion: 'En servicios o activos ligeros conviene reemplazar el EBITDA por EBIT o NOPAT, donde representan mejor el valor del negocio.' },
    { id: 'q29', pregunta: 'Para auditar un DLOM del 35 % hay que exigir que se declaren:', opciones: ['El nombre del perito.', 'El modelo usado, la volatilidad σ con su fuente y el horizonte T con su justificación.', 'El valor contable del patrimonio.', 'La cantidad de socios.'], correcta: 1, justificacion: 'Un DLOM sin esos tres parámetros no es una estimación: es un número elegido, y como tal es indefendible.' },
    { id: 'q30', pregunta: 'Si V_{t−1} se calculó con escenarios en el flujo y V_t con prima en la tasa, el ΔV:', opciones: ['Mide creación de valor.', 'Mide el cambio de método y nada más.', 'Es más preciso.', 'Es equivalente.'], correcta: 1, justificacion: 'Es la conexión directa con el módulo del canal del riesgo: sin una ruta de riesgo declarada y sostenida, la comparación entre períodos no significa nada.' },
  ],
  bibliografia: [
    'BCG — *Value Creators Report* (descomposición del TSR y Total Business Return)',
    'Pereiro, L. — *Valuation of Companies in Emerging Markets* (AL-CAPM, corrección 1−R², Beta Total)',
    'Damodaran, A. — *Investment Valuation* (Beta Total y valuación de empresas privadas)',
    'Pratt, S. — *Valuing a Business* (DLOC, DLOM y su aplicación secuencial)',
    'Chaffe, D. (1993) · Finnerty, J. (2012) · Longstaff, F. (1995) — modelos de DLOM por teoría de opciones',
    'Rojo-Ramírez, A. / AECA — modelo de tres componentes (3CM) para el costo del capital propio no cotizado',
    'Koller, Goedhart & Wessels — *Valuation*, capítulo de mercados emergentes (Escenario DCF)',
  ],
}
