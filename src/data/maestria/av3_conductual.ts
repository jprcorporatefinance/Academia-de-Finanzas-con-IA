import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.3 — Finanzas Conductuales
// ============================================================================
export const av3_conductual: Asignatura = {
  cod: 'A.3',
  slug: 'av-3',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Finanzas Conductuales: por qué gente inteligente toma malas decisiones financieras',
  horas: '24 h · 12 teóricas / 12 prácticas',
  correlativas: 'Correlativas: 3.3 y 4.2 · Módulo avanzado',
  framework: 'Kahneman & Tversky · Thaler · Lovallo · Mauboussin',
  resumen:
    'Todo el instrumental del programa supone un decisor racional. Este módulo estudia al decisor real: sus sesgos sistemáticos, por qué el análisis correcto no alcanza, y qué mecanismos concretos protegen una decisión financiera de su propio autor.',
  objetivos: [
    'Comprender el origen y la evidencia de la economía conductual, y su traslado a las decisiones corporativas.',
    'Identificar los sesgos que más daño hacen en finanzas: exceso de confianza, costos hundidos, anclaje, aversión a la pérdida y dotación.',
    'Reconocer los propios sesgos del analista al valuar y proyectar.',
    'Aplicar mecanismos de protección: pre-mortem, abogado del diablo, listas de verificación, visión externa y diario de decisiones.',
    'Diseñar un proceso de decisión financiera que resista al sesgo, en vez de confiar en la voluntad de no tenerlos.',
  ],
  sections: [
    {
      title: 'El origen: cuando la psicología entró en la economía',
      intro:
        'Durante décadas la teoría financiera supuso un agente racional que maximiza utilidad esperada. La evidencia experimental demolió ese supuesto, y el campo tuvo que reconstruirse.',
      blocks: [
        { t: 'p', md: 'En 1979, **Daniel Kahneman y Amos Tversky** publicaron la *teoría de las perspectivas* (*prospect theory*), el trabajo que fundó la economía conductual y que le valdría a Kahneman el Nobel de Economía en 2002. Su hallazgo central: las personas no evalúan resultados en términos de riqueza final, sino de **ganancias y pérdidas respecto de un punto de referencia**, y **duele más perder que lo que gratifica ganar** —aproximadamente el doble—.' },
        { t: 'formula', name: 'Aversión a la pérdida', expr: 'Dolor(perder $X) ≈ 2 × Placer(ganar $X)', note: 'De esta asimetría se derivan buena parte de las decisiones financieras aparentemente irracionales: sostener inversiones perdedoras, rechazar apuestas favorables, no cerrar unidades que destruyen valor.' },
        { t: 'p', md: 'Kahneman sistematizó después la distinción entre el **Sistema 1** —rápido, automático, intuitivo— y el **Sistema 2** —lento, deliberado, analítico—. La mayoría de nuestras decisiones las toma el Sistema 1, y el Sistema 2 se dedica, muchas veces, a **justificar** lo que el Sistema 1 ya decidió. Esa es la razón de fondo por la que "hacer mejor el análisis" no corrige un sesgo: el análisis llega después.' },
        { t: 'quote', author: 'Daniel Kahneman', credential: 'Nobel de Economía 2002 — Thinking, Fast and Slow', md: 'No podemos evitar los sesgos por el mero hecho de conocerlos. La ilusión de validez sobrevive a la evidencia de que está equivocada. Lo que sí podemos hacer es diseñar procesos e instituciones que los detecten y los compensen.' },
        { t: 'idea', md: 'La consecuencia metodológica es profunda: **el sesgo no se combate con voluntad ni con inteligencia, se combate con proceso.** Un decisor brillante y consciente de sus sesgos sigue sesgado. Un proceso bien diseñado —con pre-mortem, visión externa y checklist— corrige lo que la voluntad no puede.' },
      ],
    },
    {
      title: 'Los sesgos que más caro salen en finanzas corporativas',
      intro:
        'De la larga lista de sesgos documentados, un puñado explica la mayor parte de las malas decisiones financieras en empresas.',
      blocks: [
        { t: 'table', title: 'Catálogo de sesgos y su manifestación financiera', headers: ['Sesgo', 'Cómo se manifiesta', 'Dónde pega'], firstColLeft: true, rows: [
          ['Exceso de confianza', 'Proyecciones sistemáticamente optimistas; subestimar el plazo y el costo', 'M&A, CapEx, presupuestos'],
          ['Costos hundidos', 'Seguir financiando un proyecto perdedor porque "ya invertimos mucho"', 'Proyectos, unidades de negocio'],
          ['Anclaje', 'La primera cifra mencionada condiciona toda la negociación o valuación', 'Valuación, negociación de precio'],
          ['Aversión a la pérdida', 'No cerrar lo que destruye valor; vender lo bueno y retener lo malo', 'Desinversión, cartera de negocios'],
          ['Efecto dotación', 'Sobrevaluar lo propio por el solo hecho de ser propio', 'Venta de la empresa familiar'],
          ['Sesgo de confirmación', 'Buscar datos que respalden la decisión ya tomada', 'Due diligence, valuación'],
          ['Contabilidad mental', 'Tratar distinto pesos que son idénticos según su "cajón"', 'Asignación de capital'],
        ], caption: 'Ninguno de estos sesgos es señal de poca inteligencia: son atajos cognitivos que funcionan bien en la vida cotidiana y fallan sistemáticamente en decisiones financieras complejas y poco frecuentes.' },
        { t: 'p', md: '**Lovallo y Kahneman** documentaron el fenómeno que llamaron *delusions of success*: la combinación de exceso de optimismo y **falacia de planificación** hace que las organizaciones subestimen de manera sistemática costos y plazos, y sobreestimen beneficios. No es un error aleatorio que se compense en promedio: es un **sesgo direccional** que siempre apunta al mismo lado.' },
        { t: 'warn', md: 'La trampa de los **costos hundidos** merece atención especial porque contradice frontalmente el criterio del VAN. Lo ya invertido es irrecuperable y, por lo tanto, **económicamente irrelevante** para la decisión de seguir o abandonar. La única pregunta válida es prospectiva: *¿el flujo futuro justifica la inversión adicional que falta?* Sin embargo, en la práctica, "ya pusimos tres millones" es el argumento que más veces sostiene proyectos que deberían cerrarse.' },
      ],
    },
    {
      title: 'La visión externa: el antídoto más potente',
      intro:
        'De todas las técnicas de corrección, una destaca por su efectividad y su simplicidad: dejar de mirar el propio caso como único.',
      blocks: [
        { t: 'p', md: 'Kahneman distingue la **visión interna** —analizar el proyecto desde sus particularidades, su equipo, su plan— de la **visión externa** —preguntarse cómo terminaron proyectos similares—. La visión interna produce sistemáticamente pronósticos optimistas; la visión externa, ancla en la realidad estadística.' },
        { t: 'steps', title: 'Cómo aplicar la visión externa a una decisión de inversión', items: [
          { k: 'Definir la clase de referencia', d: 'Identificar un conjunto de proyectos comparables: ampliaciones de planta similares, adquisiciones del mismo tamaño, lanzamientos parecidos.' },
          { k: 'Obtener la distribución de resultados', d: '¿Cuánto se pasaron de presupuesto en promedio? ¿Cuánto se demoraron? ¿Qué porcentaje alcanzó sus metas?' },
          { k: 'Ubicar el proyecto propio en esa distribución', d: 'Partir del promedio de la clase, no de la estimación propia.' },
          { k: 'Ajustar solo con evidencia específica', d: 'Corregir el promedio únicamente si hay razones documentadas y verificables para creer que este caso es distinto.' },
        ] },
        { t: 'idea', md: 'La conexión con la asignatura 3.3 es directa: la **simulación de Monte Carlo** es, en el fondo, un dispositivo institucional contra el exceso de confianza. Obliga a declarar un rango en vez de un número, y hace visible la probabilidad de los malos resultados que la visión interna tiende a ignorar. **La estadística no es solo una técnica: es una defensa contra la propia psicología.**' },
      ],
    },
    {
      title: 'Mecanismos de protección de una decisión',
      intro:
        'Si el sesgo se combate con proceso, estos son los procesos que la evidencia respalda.',
      blocks: [
        { t: 'ul', items: [
          '**Pre-mortem (Gary Klein).** Antes de decidir, el equipo se traslada mentalmente dos años al futuro y asume que el proyecto **fracasó**. La consigna: escribir la historia de por qué fracasó. Al legitimar el pesimismo, libera información que la presión de grupo suprime.',
          '**Abogado del diablo formal.** Asignar explícitamente a alguien el rol de construir el mejor caso en contra. Formalizarlo evita que discrepar sea un acto de deslealtad.',
          '**Listas de verificación (checklists).** Como en aviación y cirugía: preguntas obligatorias antes de decidir, que no dependen de que alguien se acuerde de hacerlas.',
          '**Diario de decisiones.** Registrar, en el momento, qué se decidió, con qué información y qué se esperaba. Es la única defensa contra el **sesgo retrospectivo** ("yo siempre supe que iba a pasar").',
          '**Separar quien analiza de quien decide.** Reduce el sesgo de confirmación: el analista no tiene que defender una posición previa.',
        ] },
        { t: 'quote', author: 'Richard Thaler', credential: 'Nobel de Economía 2017 — Misbehaving', md: 'La economía conductual no dice que la gente sea tonta. Dice que es humana, y que los modelos deberían describir a los humanos que existen y no a los que serían convenientes para la matemática.' },
        { t: 'chain', title: 'El proceso protegido de decisión', nodes: ['Análisis (visión interna)', 'Visión externa (clase de referencia)', 'Pre-mortem', 'Decisión + diario', 'Revisión posterior'], caption: 'Cada etapa corrige un sesgo distinto. El diario cierra el ciclo: permite aprender de verdad, en vez de reescribir el pasado.' },
      ],
    },
    {
      title: 'Los sesgos del analista financiero',
      intro:
        'No solo decide sesgado el CEO. El analista que valúa y proyecta tiene los suyos, y son especialmente peligrosos porque vienen vestidos de rigor técnico.',
      blocks: [
        { t: 'ul', items: [
          '**Anclaje en el precio o en la expectativa.** Si el analista conoce de antemano el precio pedido o el número que "debería dar", la valuación converge misteriosamente hacia ahí. Los supuestos se ajustan hasta que el resultado cierra.',
          '**Confirmación en el due diligence.** Cuando la decisión de comprar ya está tomada, el due diligence deja de buscar problemas y empieza a buscar tranquilidad.',
          '**Falsa precisión.** Presentar un valor con dos decimales sobre una empresa ilíquida transmite una certeza que los datos no soportan, e inhibe el cuestionamiento.',
          '**Sobreajuste (asignatura 3.2).** Buscar el modelo que mejor explica el pasado hasta encontrar uno que funciona por azar. Es el sesgo de confirmación con matemática encima.',
        ] },
        { t: 'warn', md: 'El más insidioso es el **anclaje del resultado esperado**: cuando el analista sabe qué número quiere el que paga el informe. No hace falta mala fe —basta con elegir, en cada supuesto discutible, la punta del rango que acerca al resultado deseado—. Diez supuestos razonables, todos inclinados hacia el mismo lado, producen una valuación que nadie puede objetar línea por línea y que, sin embargo, está enteramente sesgada.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Los sesgos en la empresa familiar de capital cerrado, donde el decisor y el dueño son la misma persona.',
      blocks: [
        { t: 'p', md: 'En la empresa que no cotiza, los sesgos se amplifican por una razón estructural: **no hay mercado que corrija**. En una empresa cotizante, un precio de acción que cae es una señal externa, incómoda y difícil de ignorar. En la empresa familiar no existe ese espejo: el dueño puede sostener durante años una creencia sobre el valor de su empresa sin que nada la contradiga.' },
        { t: 'idea', md: 'El **efecto dotación** es, en nuestra experiencia, el sesgo más costoso del segmento. El dueño que construyó su empresa durante treinta años le asigna un valor que incluye —sin saberlo— el esfuerzo, la historia y la identidad, además del flujo de fondos. Cuando llega una oferta calculada sobre flujos, la brecha no es técnica sino emocional. **Una valuación rigurosa, hecha antes de que aparezca un comprador, es el mejor antídoto**: obliga a fijar el valor en frío, sin la carga emocional de la negociación.' },
        { t: 'warn', md: 'El segundo sesgo más caro: **costos hundidos aplicados a una línea de negocio**. "Esa unidad la abrió mi papá", "en esa máquina invertimos una fortuna". El capital atrapado en negocios que no remuneran su costo es, en la empresa familiar, una decisión de identidad disfrazada de decisión financiera. Reconocerlo como tal no la vuelve fácil, pero al menos la vuelve discutible.' },
        { t: 'p', md: 'Por eso el método de cuatro fases del programa —descriptiva, diagnóstica, predictiva, prescriptiva— **no es solo una secuencia lógica: es un dispositivo anti-sesgo**. Obliga a establecer los hechos antes de explicarlos, a explicarlos antes de proyectar, y a proyectar antes de recomendar. Cada fase le pone un freno a la tentación de saltar directamente a la conclusión que ya se traía.' },
      ],
    },
  ],
  expertos: [
    { author: 'Daniel Kahneman', credential: 'Nobel de Economía 2002', md: 'La visión externa —preguntar cómo terminaron proyectos similares— es el corrector más potente del optimismo. Y el más resistido, porque parece negar lo que tiene de único el proyecto propio.' },
    { author: 'Richard Thaler', credential: 'Nobel de Economía 2017', md: 'Los costos hundidos no deberían influir en las decisiones, y sin embargo lo hacen sistemáticamente. Reconocer el error requiere admitirlo, y eso tiene un costo psicológico que la teoría económica ignora.' },
    { author: 'Dan Lovallo & Daniel Kahneman', credential: 'Delusions of Success (HBR)', md: 'Las organizaciones no sobreestiman los beneficios y subestiman los costos por accidente: lo hacen sistemáticamente, en la misma dirección. El optimismo no es ruido aleatorio, es sesgo direccional.' },
    { author: 'Michael Mauboussin', credential: 'Counterpoint Global', md: 'Distinguí entre la calidad de la decisión y la calidad del resultado. Una buena decisión puede tener mal resultado y una mala decisión puede tener suerte. Evaluar procesos y no solo resultados es lo que permite aprender.' },
  ],
  caso: {
    titulo: 'La ampliación que nadie quiere cuestionar',
    empresa: 'Maderas del Litoral S.A. — la decisión bajo la lupa conductual',
    contexto:
      'La ampliación de planta que el análisis financiero rechazó (RONIC 15 % contra un WACC de 19,5 %) sigue viva en la mesa familiar. El hermano mayor la impulsa desde hace dos años, ya se gastaron 180 (miles) en proyecto de ingeniería y permisos, y en la última reunión dijo la frase que define el problema: *"después de todo lo que ya invertimos, no podemos echarnos atrás"*.\n\nEl consultor tiene el análisis correcto, y no alcanza. La decisión no se está tomando con la aritmética: se está tomando con la identidad, el compromiso público y los costos hundidos.\n\nEl encargo cambia de naturaleza: no es producir un número mejor, es **diseñar un proceso** que permita a la familia decidir sin que los sesgos decidan por ella.',
    datos: [
      { t: 'table', title: 'Los elementos del caso', headers: ['Elemento', 'Dato'], firstColLeft: true, rows: [
        ['Ya gastado en proyecto y permisos', '180 (irrecuperable)'],
        ['Inversión pendiente', '8.000'],
        ['RONIC estimado del proyecto', '15,0%'],
        ['WACC', '19,5%'],
        ['Años que el proyecto lleva impulsándose', '2'],
        ['Ampliaciones similares del sector: sobrecosto promedio', '+35%'],
        ['Ampliaciones similares: demora promedio', '+8 meses'],
      ] },
    ],
    consigna: [
      '¿Son relevantes los 180 ya gastados para la decisión de seguir o abandonar? Justificá.',
      '¿Cómo cambia el análisis al aplicar la visión externa (sobrecosto +35 %, demora +8 meses)?',
      '¿Qué sesgos están operando en la mesa familiar y cómo se manifiestan?',
      'Diseñá el proceso de decisión que protegería a la familia de sus propios sesgos.',
    ],
    metodologia: [
      { k: 'Separar lo hundido de lo prospectivo', d: 'Los 180 son irrecuperables: la decisión se toma solo sobre los 8.000 pendientes y sus flujos futuros.' },
      { k: 'Aplicar la visión externa', d: 'Recalcular el RONIC con el sobrecosto y la demora promedio de la clase de referencia, no con la estimación propia.' },
      { k: 'Nombrar los sesgos', d: 'Costos hundidos, compromiso público, exceso de confianza, identidad familiar.' },
      { k: 'Diseñar el proceso', d: 'Pre-mortem, abogado del diablo, criterio de decisión acordado ANTES de ver el resultado.' },
      { k: 'Documentar', d: 'Diario de decisión: qué se decidió, con qué información y qué se espera. Revisión pautada a 12 meses.' },
    ],
  },
  model: {
    sheetTitle: 'Visión externa: el efecto del sesgo sobre el retorno de un proyecto',
    intro:
      'Editá las celdas marfil. El modelo compara el RONIC estimado internamente contra el RONIC ajustado por la experiencia de la clase de referencia (sobrecosto y demora), y muestra cuánto del optimismo era sesgo.',
    inputs: [
      { key: 'inversion', label: 'Inversión pendiente', value: 8000, fmt: 'money', unit: 'miles $' },
      { key: 'hundido', label: 'Ya gastado (irrecuperable)', value: 180, fmt: 'money' },
      { key: 'flujoAnual', label: 'Flujo anual esperado (visión interna)', value: 1200, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.195, fmt: 'pct1' },
      { key: 'sobrecosto', label: 'Sobrecosto promedio de la clase', value: 0.35, fmt: 'pct' },
      { key: 'demoraAnios', label: 'Demora promedio (años)', value: 0.67, fmt: 'num2' },
    ],
    calcs: [
      { key: 'ronicInterno', label: 'RONIC — visión interna', xl: '=[flujoAnual]/[inversion]', fmt: 'pct1', highlight: true },
      { key: 'inversionReal', label: 'Inversión ajustada por sobrecosto', xl: '=[inversion]*(1+[sobrecosto])', fmt: 'money' },
      { key: 'flujoDescontado', label: 'Flujo anual ajustado por demora', xl: '=[flujoAnual]/(1+[wacc])^[demoraAnios]', fmt: 'money' },
      { key: 'ronicExterno', label: 'RONIC — visión externa', xl: '=[flujoDescontado]/[inversionReal]', fmt: 'pct1', highlight: true },
      { key: 'brechaSesgo', label: 'Brecha atribuible al sesgo', xl: '=[ronicInterno]-[ronicExterno]', fmt: 'pct1', highlight: true },
      { key: 'spreadInterno', label: 'Spread visión interna (vs WACC)', xl: '=[ronicInterno]-[wacc]', fmt: 'pct1' },
      { key: 'spreadExterno', label: 'Spread visión externa (vs WACC)', xl: '=[ronicExterno]-[wacc]', fmt: 'pct1', highlight: true },
    ],
    spills: [
      {
        key: 'sensSobrecosto',
        title: 'RONIC según el sobrecosto real (visión externa)',
        columns: ['Sobrecosto', 'Inversión real', 'RONIC ajustado', 'Spread vs WACC'],
        xl: '=LET(sc,SEQUENCE(7,1,0,0.1), inv,[inversion]*(1+sc), fl,[flujoAnual]/(1+[wacc])^[demoraAnios], r,fl/inv, HSTACK(sc,inv,r,r-[wacc]))',
        formats: ['pct', 'money', 'pct1', 'pct1'],
        rows: 7,
        note: 'Cada 10 % de sobrecosto erosiona el retorno del proyecto. La visión interna parte de 0 % de sobrecosto; la clase de referencia dice otra cosa.',
      },
    ],
    conclusions: [
      { label: 'El costo del optimismo', xl: '="RONIC interno "&TEXT([ronicInterno],"0.0%")&" vs RONIC con visión externa "&TEXT([ronicExterno],"0.0%")&": "&TEXT([brechaSesgo],"0.0%")&" de la rentabilidad esperada era optimismo, no proyecto."' },
      { label: 'Costos hundidos', xl: '="Los "&TEXT([hundido],"#,##0")&" ya gastados son IRRECUPERABLES y no deben entrar en la decisión. La única pregunta válida es si los "&TEXT([inversion],"#,##0")&" pendientes se justifican con los flujos futuros."' },
    ],
  },
  ejercicio: {
    titulo: 'La trampa de los costos hundidos',
    enunciado:
      'Una empresa invirtió 400 (miles) en desarrollar un producto. Para lanzarlo faltan 200 más. El producto, una vez lanzado, generaría un valor presente de flujos de 300. El WACC es 20 %.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Ya invertido (hundido)', '400'], ['Inversión pendiente', '200'], ['VP de los flujos futuros', '300'], ['WACC', '20%'],
      ] },
    ],
    preguntas: ['¿Conviene lanzar el producto?', '¿Cuál es el error si se razona incluyendo los 400 ya gastados?'],
    solucion: [
      { t: 'formula', name: 'La decisión correcta (solo prospectiva)', expr: 'VAN de continuar = 300 − 200 = +100 → CONVIENE lanzar' },
      { t: 'p', md: 'Los 400 ya invertidos son **irrecuperables**: se gastaron, no vuelven, y por lo tanto son irrelevantes para decidir. La única pregunta válida es si los **200 que faltan** se justifican con los **300** de flujos futuros. La respuesta es sí: crea 100 de valor.' },
      { t: 'idea', md: 'El razonamiento sesgado dice: *"invertimos 400 + 200 = 600 para obtener 300, es un desastre, no lo lancemos"*. Y así **destruye 100 de valor** por no distinguir lo hundido de lo prospectivo. Nótese la asimetría: el sesgo de costos hundidos suele hacer **continuar** proyectos malos, pero también puede hacer **abandonar** proyectos buenos cuando el total gastado abruma. En ambos casos, el error es el mismo: mirar hacia atrás para decidir hacia adelante.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'La teoría de las perspectivas (Kahneman y Tversky) sostiene que las personas evalúan:', opciones: ['La riqueza final absoluta.', 'Ganancias y pérdidas respecto de un punto de referencia.', 'Solo probabilidades.', 'Nada sistemático.'], correcta: 1, justificacion: 'El hallazgo central es que importa el cambio respecto de un punto de referencia, no el nivel final de riqueza. De ahí se derivan muchas decisiones aparentemente irracionales.' },
    { id: 'q2', pregunta: 'La aversión a la pérdida implica que:', opciones: ['Ganar y perder pesan igual.', 'Perder duele aproximadamente el doble de lo que gratifica ganar la misma cantidad.', 'Nadie quiere ganar.', 'Las pérdidas se ignoran.'], correcta: 1, justificacion: 'La asimetría documentada es de aproximadamente 2 a 1, y explica la resistencia a cerrar posiciones o unidades perdedoras.' },
    { id: 'q3', pregunta: 'El Sistema 1 y el Sistema 2 de Kahneman se refieren a:', opciones: ['Dos software contables.', 'Pensamiento rápido/automático y pensamiento lento/deliberado.', 'Dos métodos de valuación.', 'Dos tipos de empresa.'], correcta: 1, justificacion: 'El Sistema 1 es intuitivo y automático; el Sistema 2, analítico y costoso. Muchas veces el Sistema 2 justifica lo que el Sistema 1 ya decidió.' },
    { id: 'q4', pregunta: 'Conocer los propios sesgos:', opciones: ['Los elimina.', 'No los elimina: hay que diseñar procesos que los detecten y compensen.', 'Es irrelevante.', 'Garantiza decisiones correctas.'], correcta: 1, justificacion: 'Kahneman es explícito: la ilusión de validez sobrevive al saber que existe. El remedio es institucional (proceso), no individual (voluntad).' },
    { id: 'q5', pregunta: 'El sesgo de costos hundidos consiste en:', opciones: ['Ignorar lo ya invertido.', 'Dejar que lo ya invertido e irrecuperable influya en la decisión de continuar.', 'Calcular mal el VAN.', 'Invertir poco.'], correcta: 1, justificacion: 'Lo hundido es irrecuperable y por tanto económicamente irrelevante; la decisión debe basarse solo en flujos futuros e inversión pendiente.' },
    { id: 'q6', pregunta: 'Ante un proyecto con 400 ya gastados, 200 pendientes y 300 de flujos futuros, lo correcto es:', opciones: ['No lanzar, porque 600 > 300.', 'Lanzar: 300 − 200 = +100 de valor.', 'Esperar.', 'Depende de los 400.'], correcta: 1, justificacion: 'Solo cuentan los 200 pendientes contra los 300 futuros: crea 100 de valor. Incluir los 400 hundidos lleva a destruir valor por no lanzar.' },
    { id: 'q7', pregunta: 'La falacia de planificación (Lovallo y Kahneman) describe:', opciones: ['Errores aleatorios que se compensan.', 'La subestimación sistemática y direccional de costos y plazos.', 'La ausencia de plan.', 'Un método de proyección.'], correcta: 1, justificacion: 'No es ruido aleatorio: el sesgo apunta siempre en la misma dirección (más barato y más rápido de lo real), por lo que no se compensa en promedio.' },
    { id: 'q8', pregunta: 'La visión externa consiste en:', opciones: ['Analizar el proyecto por sus particularidades.', 'Preguntar cómo terminaron proyectos similares (clase de referencia).', 'Consultar a un externo cualquiera.', 'Ignorar los datos.'], correcta: 1, justificacion: 'La visión externa ancla el pronóstico en la distribución estadística de casos comparables, corrigiendo el optimismo de la visión interna.' },
    { id: 'q9', pregunta: 'Al aplicar la visión externa, el punto de partida debe ser:', opciones: ['La estimación propia.', 'El promedio de la clase de referencia, ajustado solo con evidencia específica.', 'El mejor caso posible.', 'Cero.'], correcta: 1, justificacion: 'Se parte del promedio de casos comparables y se corrige únicamente si hay razones documentadas para creer que este caso difiere.' },
    { id: 'q10', pregunta: 'El pre-mortem (Gary Klein) consiste en:', opciones: ['Analizar después del fracaso.', 'Antes de decidir, asumir que el proyecto fracasó y escribir por qué.', 'Celebrar el éxito anticipado.', 'Hacer una auditoría.'], correcta: 1, justificacion: 'Al legitimar el pesimismo antes de decidir, el pre-mortem libera información que la presión de grupo suprimiría.' },
    { id: 'q11', pregunta: 'El diario de decisiones protege principalmente contra:', opciones: ['El anclaje.', 'El sesgo retrospectivo ("yo siempre supe que iba a pasar").', 'Los costos hundidos.', 'La aversión a la pérdida.'], correcta: 1, justificacion: 'Registrar qué se decidió y qué se esperaba, en el momento, impide reescribir el pasado y permite aprender de verdad.' },
    { id: 'q12', pregunta: 'El efecto dotación (endowment) implica que:', opciones: ['Se subvalúa lo propio.', 'Se sobrevalúa lo propio por el solo hecho de ser propio.', 'Todo se valúa igual.', 'Solo aplica a bienes físicos.'], correcta: 1, justificacion: 'La propiedad misma eleva el valor percibido, algo especialmente fuerte en el dueño de una empresa que construyó durante décadas.' },
    { id: 'q13', pregunta: 'El anclaje en la valuación se manifiesta cuando:', opciones: ['Se usa el VAN.', 'La primera cifra conocida (precio pedido o resultado esperado) condiciona los supuestos.', 'Se hace sensibilidad.', 'Se aplica Monte Carlo.'], correcta: 1, justificacion: 'Conocer el número "que debería dar" hace que los supuestos discutibles se elijan sistemáticamente hacia ese lado, sin necesidad de mala fe.' },
    { id: 'q14', pregunta: 'Diez supuestos razonables inclinados todos hacia el mismo lado producen:', opciones: ['Una valuación equilibrada.', 'Una valuación sesgada que no puede objetarse línea por línea.', 'Un error aleatorio.', 'Mayor precisión.'], correcta: 1, justificacion: 'Cada supuesto es defendible en aislamiento, pero su acumulación direccional sesga el resultado — la forma más difícil de detectar de sesgo técnico.' },
    { id: 'q15', pregunta: 'El sesgo de confirmación en un due diligence se manifiesta cuando:', opciones: ['Se buscan problemas activamente.', 'La decisión ya está tomada y el proceso busca tranquilidad en vez de riesgos.', 'Se contrata un asesor externo.', 'Se revisan los estados contables.'], correcta: 1, justificacion: 'Con la decisión tomada de antemano, el due diligence deja de ser una búsqueda de problemas y se vuelve una búsqueda de confirmación.' },
    { id: 'q16', pregunta: 'La falsa precisión en una valuación:', opciones: ['Aumenta el rigor.', 'Transmite una certeza que los datos no soportan e inhibe el cuestionamiento.', 'Es obligatoria.', 'Reduce el sesgo.'], correcta: 1, justificacion: 'Dos decimales sobre una empresa ilíquida sugieren una exactitud inexistente y desalientan la discusión sobre los supuestos.' },
    { id: 'q17', pregunta: 'La simulación de Monte Carlo funciona como dispositivo anti-sesgo porque:', opciones: ['Es más compleja.', 'Obliga a declarar un rango y hace visible la probabilidad de malos resultados.', 'Elimina la incertidumbre.', 'Da un número exacto.'], correcta: 1, justificacion: 'Sustituye el número único (que invita al exceso de confianza) por una distribución que muestra explícitamente el riesgo de escenarios adversos.' },
    { id: 'q18', pregunta: 'Separar quien analiza de quien decide reduce principalmente:', opciones: ['El costo del proceso.', 'El sesgo de confirmación.', 'La aversión a la pérdida.', 'El anclaje del precio.'], correcta: 1, justificacion: 'El analista que no debe defender una posición previa puede buscar evidencia en contra sin costo político.' },
    { id: 'q19', pregunta: 'El abogado del diablo formal se institucionaliza para que:', opciones: ['Alguien moleste.', 'Discrepar no sea percibido como acto de deslealtad.', 'Se demore la decisión.', 'Haya más reuniones.'], correcta: 1, justificacion: 'Asignar formalmente el rol de oponerse legitima la crítica y evita el silencio por conformidad de grupo.' },
    { id: 'q20', pregunta: 'Las listas de verificación (checklists) en decisiones financieras:', opciones: ['Son burocracia inútil.', 'Aseguran que las preguntas críticas se hagan sin depender de la memoria de alguien.', 'Reemplazan el análisis.', 'Solo sirven en aviación.'], correcta: 1, justificacion: 'Como en aviación y cirugía, el checklist convierte lo importante en obligatorio, independizándolo de que alguien se acuerde.' },
    { id: 'q21', pregunta: 'En la empresa que no cotiza, los sesgos se amplifican porque:', opciones: ['Los dueños son menos capaces.', 'No hay un precio de mercado que corrija las creencias sobre el valor.', 'Hay más regulación.', 'Los estados contables son mejores.'], correcta: 1, justificacion: 'Sin el espejo incómodo del precio de mercado, una creencia errónea sobre el valor puede sostenerse indefinidamente.' },
    { id: 'q22', pregunta: 'El antídoto propuesto contra el efecto dotación en la empresa familiar es:', opciones: ['Esperar una oferta.', 'Hacer una valuación rigurosa en frío, antes de que aparezca un comprador.', 'Aumentar el precio pedido.', 'No vender nunca.'], correcta: 1, justificacion: 'Fijar el valor sin la carga emocional de una negociación en curso reduce la brecha entre el valor percibido y el valor económico.' },
    { id: 'q23', pregunta: '"Esa unidad la abrió mi papá" como argumento para sostenerla es:', opciones: ['Un criterio financiero válido.', 'Una decisión de identidad disfrazada de decisión financiera.', 'Un análisis de sensibilidad.', 'Una aplicación del VAN.'], correcta: 1, justificacion: 'Es el sesgo de costos hundidos con carga emocional familiar; reconocerlo no lo vuelve fácil, pero lo vuelve discutible.' },
    { id: 'q24', pregunta: 'El método de cuatro fases del programa funciona como dispositivo anti-sesgo porque:', opciones: ['Es más largo.', 'Obliga a establecer hechos antes de explicarlos, y a explicarlos antes de recomendar.', 'Usa más software.', 'Lo exige la norma.'], correcta: 1, justificacion: 'La secuencia impide saltar a la conclusión que ya se traía: cada fase frena la tentación de decidir antes de haber comprendido.' },
    { id: 'q25', pregunta: 'Distinguir calidad de la decisión de calidad del resultado (Mauboussin) implica que:', opciones: ['Solo importa el resultado.', 'Una buena decisión puede tener mal resultado, y una mala decisión puede tener suerte.', 'Son lo mismo.', 'El proceso es irrelevante.'], correcta: 1, justificacion: 'Bajo incertidumbre, evaluar solo por resultado premia la suerte y castiga el buen proceso; hay que evaluar ambas dimensiones.' },
    { id: 'q26', pregunta: 'La contabilidad mental lleva a:', opciones: ['Llevar mejor la contabilidad.', 'Tratar de forma distinta pesos que son económicamente idénticos según su "cajón".', 'Usar dos sistemas contables.', 'Auditar más.'], correcta: 1, justificacion: 'Separar mentalmente el dinero por origen o destino lleva a decisiones inconsistentes, cuando el dinero es fungible.' },
    { id: 'q27', pregunta: 'El exceso de confianza pega con más fuerza en:', opciones: ['Decisiones frecuentes y rutinarias.', 'Decisiones poco frecuentes y complejas, como M&A y grandes CapEx.', 'La contabilidad diaria.', 'El pago de sueldos.'], correcta: 1, justificacion: 'Las decisiones raras no permiten calibrar el juicio con retroalimentación frecuente, terreno fértil para el exceso de confianza.' },
    { id: 'q28', pregunta: 'Según Thaler, la economía conductual sostiene que la gente es:', opciones: ['Tonta.', 'Humana, y los modelos deberían describir a los humanos reales.', 'Perfectamente racional.', 'Impredecible.'], correcta: 1, justificacion: 'No es una teoría de la estupidez sino del realismo psicológico: modelar al decisor que existe, no al que sería conveniente.' },
    { id: 'q29', pregunta: 'El sesgo de costos hundidos puede llevar tanto a:', opciones: ['Solo continuar proyectos malos.', 'Continuar proyectos malos y también abandonar proyectos buenos, si el total gastado abruma.', 'Solo abandonar proyectos.', 'Ningún error.'], correcta: 1, justificacion: 'El error es mirar hacia atrás para decidir hacia adelante; eso puede sostener lo insostenible o hundir lo que todavía crea valor.' },
    { id: 'q30', pregunta: 'La conclusión metodológica central del módulo es que el sesgo se combate:', opciones: ['Con voluntad e inteligencia.', 'Con proceso: pre-mortem, visión externa, checklist, diario y separación de roles.', 'Ignorándolo.', 'Con más datos únicamente.'], correcta: 1, justificacion: 'Un decisor brillante y consciente sigue sesgado; lo que corrige es el diseño institucional del proceso de decisión.' },
  ],
  bibliografia: [
    'Kahneman, D. — *Thinking, Fast and Slow*',
    'Kahneman, D. & Tversky, A. — “Prospect Theory: An Analysis of Decision under Risk” (1979)',
    'Thaler, R. — *Misbehaving: The Making of Behavioral Economics*',
    'Lovallo, D. & Kahneman, D. — “Delusions of Success” (Harvard Business Review)',
    'Klein, G. — “Performing a Project Premortem” (HBR)',
    'Mauboussin, M. — *Think Twice: Harnessing the Power of Counterintuition*',
  ],
}
