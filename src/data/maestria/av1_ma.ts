import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.1 — Fusiones y Adquisiciones
// ============================================================================
export const av1_ma: Asignatura = {
  cod: 'A.1',
  slug: 'av-1',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Fusiones y Adquisiciones: sinergias, due diligence y por qué la mayoría destruye valor',
  horas: '24 h · 10 teóricas / 14 prácticas',
  correlativas: 'Correlativas: 4.1 y 4.2 · Módulo avanzado',
  framework: 'Damodaran · Bruner · Jensen · Roll',
  resumen:
    'La operación financiera de mayor impacto y peor resultado promedio. Por qué entre la mitad y dos tercios de las adquisiciones destruyen valor para el comprador, cómo se valúan las sinergias sin engañarse, y qué mira un due diligence financiero serio.',
  objetivos: [
    'Comprender la evidencia empírica sobre creación y destrucción de valor en M&A, y sus causas estructurales.',
    'Valuar sinergias por tipo, separando las creíbles de las declarativas, y descontarlas por probabilidad y demora.',
    'Ejecutar un due diligence financiero: calidad de ganancias, capital de trabajo normalizado, deuda oculta y contingencias.',
    'Diseñar la estructura del acuerdo (precio, forma de pago, earn-out, garantías) alineando incentivos y repartiendo riesgo.',
    'Reconocer los sesgos —hubris, winner’s curse, presión del deal— que explican los malos resultados.',
  ],
  sections: [
    {
      title: 'El origen del problema: por qué existen las adquisiciones',
      intro:
        'Antes de valuar una operación hay que entender qué la motiva. La historia intelectual del campo explica por qué el resultado promedio es malo y, sobre todo, por qué se siguen haciendo.',
      blocks: [
        { t: 'p', md: 'La teoría clásica dice que una adquisición crea valor cuando el comprador puede hacer con los activos algo que el vendedor no puede: **sinergia**. Pero la investigación empírica de las últimas cuatro décadas muestra un patrón incómodo: en promedio, el **vendedor captura la mayor parte del valor** (vía la prima) y el comprador, con frecuencia, **destruye** valor para sus propios accionistas.' },
        { t: 'p', md: 'Tres explicaciones compiten, y no son excluyentes. **Michael Jensen (1986)** propuso la teoría del *free cash flow*: los directivos con exceso de caja y pocas oportunidades de inversión prefieren comprar empresas antes que distribuir dividendos, porque el tamaño trae poder, prestigio y remuneración. La adquisición no es un error de cálculo: es un **problema de agencia**.' },
        { t: 'p', md: '**Richard Roll (1986)** propuso la *hipótesis de la arrogancia (hubris)*: los directivos creen sinceramente que su valuación es superior a la del mercado, y pagan de más por exceso de confianza. No hay mala fe, hay mala calibración. Y la **maldición del ganador** (*winner’s curse*) completa el cuadro: en una subasta con valor incierto, el que gana es sistemáticamente el que más sobreestimó.' },
        { t: 'chain', title: 'Las tres explicaciones del mal resultado promedio', nodes: ['Agencia (Jensen): comprar en vez de distribuir', 'Hubris (Roll): exceso de confianza', 'Winner’s curse: gana el que más sobreestima', 'Prima excesiva → destrucción de valor'], caption: 'Las tres actúan a la vez. Por eso el problema es estructural y no se corrige solo con “mejor análisis”.' },
        { t: 'quote', author: 'Michael Jensen', credential: 'Harvard — Agency Costs of Free Cash Flow (1986)', md: 'El conflicto de intereses entre accionistas y directivos por las políticas de distribución es especialmente severo cuando la organización genera un flujo de caja libre sustancial. El problema es cómo motivar a los directivos a devolver el efectivo en vez de invertirlo por debajo del costo del capital, o desperdiciarlo en ineficiencias organizacionales.' },
      ],
    },
    {
      title: 'La anatomía de las sinergias',
      intro:
        'Toda adquisición se justifica con sinergias. La disciplina consiste en clasificarlas, valuarlas por separado y castigarlas por probabilidad y demora —porque no todas son igual de creíbles—.',
      blocks: [
        { t: 'table', title: 'Los cuatro tipos de sinergia y su credibilidad', headers: ['Tipo', 'De dónde sale', 'Credibilidad'], firstColLeft: true, rows: [
          ['De costos', 'Eliminar duplicaciones: estructura, plantas, compras', 'Alta — es la más verificable'],
          ['De ingresos', 'Venta cruzada, acceso a nuevos canales o mercados', 'Baja — la más prometida y la menos cumplida'],
          ['Financieras', 'Menor costo del capital, mayor capacidad de deuda', 'Media — real pero acotada'],
          ['Fiscales', 'Uso de quebrantos, escudo fiscal adicional', 'Alta si es legítima — verificar con asesor tributario'],
        ], caption: 'La asimetría es notable: las sinergias de costos suelen cumplirse (a veces con demora), las de ingresos rara vez. Sin embargo, son las de ingresos las que más se usan para justificar primas altas.' },
        { t: 'formula', name: 'Valor de la sinergia', expr: 'VP(sinergia) = Σ [ Flujo_sinérgico_t × p ] ÷ (1 + WACC)^t − Costos de integración', where: 'p = probabilidad de materialización · el flujo empieza en t+n, no en t=0', note: 'Dos castigos que casi nadie aplica: la PROBABILIDAD (no toda sinergia se logra) y la DEMORA (ninguna sinergia es inmediata). Ambos reducen fuertemente su valor presente.' },
        { t: 'idea', md: 'La regla de oro: **el valor de la sinergia le pertenece al comprador solo si no lo paga en la prima.** Si la sinergia vale 100 y la prima es 100, el comprador hizo todo el trabajo y el riesgo, y el vendedor se llevó todo el beneficio. La pregunta correcta no es "¿hay sinergia?" sino "¿cuánta me queda después de la prima?".' },
        { t: 'warn', md: 'El error más caro del campo: valuar la empresa objetivo **incluyendo** las sinergias y usar ese número como precio máximo. Ese cálculo entrega de antemano todo el valor al vendedor. La valuación *stand-alone* (sin sinergias) es el piso; la valuación con sinergias es el techo teórico; y el precio debe quedar **claramente por debajo del techo**.' },
      ],
    },
    {
      title: 'Due diligence financiero: qué se mira de verdad',
      intro:
        'El due diligence no es una auditoría. La auditoría verifica que los estados cumplan la norma; el due diligence busca lo que cambia el precio o mata el acuerdo.',
      blocks: [
        { t: 'steps', title: 'Las cinco preguntas del due diligence financiero', items: [
          { k: 'Calidad de las ganancias', d: '¿El EBITDA es recurrente y de caja? Se depura de partidas no recurrentes, ajustes de criterio y devengamientos agresivos. El resultado es el "EBITDA ajustado" que se negocia — y donde se juega buena parte del precio.' },
          { k: 'Capital de trabajo normalizado', d: '¿Cuánto capital de trabajo necesita el negocio para operar? Se fija un nivel normal y se ajusta el precio por el desvío al cierre. Sin esta cláusula, el vendedor tiene todos los incentivos para estirar pagos y acelerar cobranzas antes de entregar.' },
          { k: 'Deuda y deuda equivalente', d: 'La deuda financiera declarada, más la oculta: arrendamientos, cheques descontados con recurso, avales, pasivos laborales y previsionales, contingencias impositivas y juicios.' },
          { k: 'Inversión de reposición real', d: '¿Cuánto CapEx hace falta para sostener el negocio? Un vendedor que desinvirtió durante años entrega un EBITDA inflado y una máquina que hay que reponer.' },
          { k: 'Dependencia y concentración', d: 'Concentración de clientes, proveedores y —crítico en la empresa familiar— dependencia del dueño. Un negocio que se va con el dueño no vale lo que muestran sus números.' },
        ] },
        { t: 'p', md: 'Los tres primeros puntos alimentan el mecanismo de precio más usado: el **precio libre de caja y deuda** (*cash-free, debt-free*), donde se acuerda un valor de empresa (EV) y luego se ajusta por la deuda neta y el desvío de capital de trabajo al cierre. Entender esa mecánica es lo que separa a quien negocia de quien firma lo que le ponen adelante.' },
        { t: 'quote', author: 'Robert Bruner', credential: 'Darden School — Deals from Hell', md: 'Los fracasos en M&A rara vez tienen una única causa. Son el resultado de una cadena: una tesis estratégica débil, un due diligence apurado, una valuación optimista, una estructura mal diseñada y una integración subestimada. Cada eslabón parece manejable; juntos, son letales.' },
      ],
    },
    {
      title: 'La estructura del acuerdo: repartir el riesgo, no solo el precio',
      intro:
        'Cuando comprador y vendedor no coinciden en el valor, la solución rara vez es un precio intermedio: es una estructura que reparta el riesgo según quién puede controlarlo.',
      blocks: [
        { t: 'ul', items: [
          '**Forma de pago (caja vs. acciones).** Pagar en caja transfiere todo el riesgo al comprador. Pagar en acciones lo comparte —y además envía una señal: si el comprador prefiere pagar con sus acciones, quizás las considere caras—.',
          '**Earn-out.** Parte del precio queda condicionada a resultados futuros. Alinea incentivos y cierra brechas de valuación, pero exige métricas objetivas, auditables y bajo control del vendedor —si no, es una fuente garantizada de conflicto—.',
          '**Escrow / garantías.** Una porción del precio queda retenida para responder por contingencias que aparezcan después del cierre.',
          '**Declaraciones y garantías (reps & warranties).** El vendedor afirma hechos sobre la empresa; si resultan falsos, indemniza. Es el mecanismo que traslada el riesgo de lo desconocido.',
          '**Cláusulas de ajuste de precio.** Por deuda neta y por capital de trabajo al cierre, para que el vendedor no pueda "vaciar" el negocio entre la firma y la entrega.',
        ] },
        { t: 'idea', md: 'El **earn-out** es la herramienta natural cuando el desacuerdo es sobre el futuro y no sobre el pasado. En la empresa familiar cumple una segunda función, tanto o más valiosa: **mantiene al dueño comprometido durante la transición**, que es exactamente el período donde un IDD alto puede destruir el valor que se acaba de pagar.' },
      ],
    },
    {
      title: 'Estado del arte y evidencia',
      intro: 'Qué dice hoy la investigación sobre cuándo las adquisiciones sí crean valor.',
      blocks: [
        { t: 'ul', items: [
          '**El tamaño relativo importa.** Las adquisiciones pequeñas y frecuentes (*programmatic M&A*) superan sistemáticamente a las grandes apuestas transformacionales. McKinsey documenta que las empresas con programas sostenidos de adquisiciones chicas rinden mejor que las que hacen pocas operaciones grandes.',
          '**La forma de pago predice el resultado.** Las operaciones pagadas en acciones tienden a rendir peor que las pagadas en caja: el mercado lee la emisión de acciones como señal de sobrevaluación.',
          '**El comprador serial disciplinado gana.** No por sinergias mágicas, sino por un proceso repetible: tesis clara, disciplina de precio, integración estandarizada.',
          '**La integración es donde se pierde.** El valor se define en el precio, pero se realiza (o se pierde) en la integración: retención de talento clave, sistemas, cultura y clientes.',
        ] },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — The Value of Synergy', md: 'La sinergia es la justificación más invocada y menos verificada de las finanzas corporativas. Si vas a pagar por sinergia, tenés que poder responder tres preguntas: dónde aparecerá en los flujos, cuándo, y con qué probabilidad. Si no podés, no estás valuando sinergia: estás pagando una esperanza.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Cómo se lee todo esto desde la práctica sobre empresas medianas de capital cerrado en el Nordeste argentino.',
      blocks: [
        { t: 'p', md: 'En la empresa mediana familiar, la operación de M&A rara vez es una adquisición estratégica entre corporaciones: **es la venta total o parcial de la empresa de una familia**. Eso cambia el problema por completo. El vendedor no es un fondo que optimiza: es un dueño que además está resolviendo su sucesión, su retiro y —muchas veces— un conflicto familiar. El precio es una variable; la transferibilidad, otra.' },
        { t: 'idea', md: 'Por eso el **IDD (Índice de Dependencia del Dueño)** es, en una operación de venta, tan determinante como el EBITDA. Una empresa con IDD alto tiene tres problemas simultáneos: es menos valiosa (porque el comprador descuenta el riesgo de transición), es menos vendible (menos compradores la miran) y es más frágil en la integración. **Bajar el IDD antes de vender es la inversión de mayor retorno que puede hacer un dueño que piensa salir en tres años.**' },
        { t: 'warn', md: 'El error que más veces se repite del lado vendedor: preparar la empresa para la venta **solo contablemente** —maquillar el último ejercicio— en vez de prepararla **estructuralmente**: documentar procesos, formar la segunda línea, institucionalizar las relaciones comerciales, normalizar la retribución del dueño y ordenar la deuda oculta. Lo primero lo detecta cualquier due diligence competente y destruye confianza; lo segundo sube el precio de verdad.' },
        { t: 'chain', title: 'La preparación para vender, en orden', nodes: ['Bajar el IDD', 'Normalizar y depurar (1.1)', 'Ordenar capital de trabajo (2.4)', 'Reducir la BFR (4.3)', 'Salir al mercado'], caption: 'Cada paso sube el precio y amplía el universo de compradores. Hacerlo al revés —salir al mercado primero— destruye poder de negociación.' },
      ],
    },
  ],
  expertos: [
    { author: 'Michael Jensen', credential: 'Harvard Business School', md: 'El flujo de caja libre en manos de directivos sin oportunidades de inversión rentables es la materia prima de las malas adquisiciones. La disciplina de la deuda y del dividendo existe, en parte, para impedirlo.' },
    { author: 'Richard Roll', credential: 'UCLA — Hubris Hypothesis (1986)', md: 'Si los directivos sobreestiman su capacidad de identificar valor donde el mercado no lo ve, pagarán primas que no se justifican. No hace falta mala fe: alcanza con exceso de confianza sincero.' },
    { author: 'Robert Bruner', credential: 'Darden School of Business', md: 'La pregunta correcta no es si M&A crea valor en promedio, sino bajo qué condiciones lo crea. La respuesta empírica es consistente: tesis estratégica clara, disciplina de precio, integración planificada desde antes del cierre.' },
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'Valuá la empresa objetivo sin sinergias primero. Ese número es tu piso de realidad. Todo lo que pagues por encima tenés que poder defenderlo con flujos, fechas y probabilidades concretas.' },
  ],
  caso: {
    titulo: 'La oferta por Maderas del Litoral',
    empresa: 'Maderas del Litoral S.A. — evaluación de una oferta de compra',
    contexto:
      'Un grupo maderero brasileño ofrece comprar el 100 % de Maderas del Litoral. Los tres hermanos, después de todo el trabajo de diagnóstico del programa, tienen por fin números confiables: la empresa vale, stand-alone, unos 6.400 (miles) de patrimonio.\n\nEl comprador dice que hay sinergias: puede integrar la producción con su planta de Paso de los Libres (ahorro de costos), y vender aberturas de Maderas del Litoral por su red comercial en Brasil (ingresos). Ofrece 8.000, es decir, una prima de 1.600 sobre el valor stand-alone.\n\nLa pregunta del directorio: ¿es una buena oferta? Y del otro lado, la pregunta que el consultor debe poder responder: ¿cuánto de la sinergia se está quedando el comprador y cuánto está entregando en la prima?',
    datos: [
      { t: 'table', title: 'Datos de la operación (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Valor stand-alone del patrimonio', '6.400'],
        ['Oferta del comprador', '8.000'],
        ['Sinergia de costos estimada (anual, perpetua)', '420'],
        ['Probabilidad de materialización (costos)', '80%'],
        ['Sinergia de ingresos estimada (anual, perpetua)', '350'],
        ['Probabilidad de materialización (ingresos)', '35%'],
        ['Costos de integración (una vez)', '600'],
        ['WACC del comprador', '18%'],
        ['IDD de Maderas del Litoral', '72 (alto)'],
      ] },
    ],
    consigna: [
      '¿Cuál es el valor presente de las sinergias, castigadas por probabilidad y neto de costos de integración?',
      '¿Qué porcentaje de esa sinergia se está entregando el comprador en la prima de 1.600?',
      '¿Es una buena oferta para los vendedores? ¿Y para el comprador?',
      '¿Cómo impacta un IDD de 72 en la negociación, y qué estructura de acuerdo lo contempla?',
    ],
    metodologia: [
      { k: 'Valuar stand-alone', d: 'El valor sin sinergias es el piso de la negociación (asignatura 4.1).' },
      { k: 'Valuar cada sinergia por separado', d: 'Castigar por probabilidad de materialización y por demora; restar costos de integración.' },
      { k: 'Repartir el valor', d: 'Prima ÷ VP(sinergia) = porción del beneficio que se lleva el vendedor.' },
      { k: 'Evaluar desde ambos lados', d: 'El vendedor mira la prima sobre stand-alone; el comprador, la sinergia neta de prima.' },
      { k: 'Diseñar la estructura', d: 'Earn-out y retención del dueño para mitigar el riesgo de un IDD alto en la transición.' },
    ],
  },
  model: {
    sheetTitle: 'Valuación de sinergias y reparto del valor en una adquisición',
    intro:
      'Editá las celdas marfil. El modelo valúa cada sinergia castigada por probabilidad, calcula el reparto del valor entre comprador y vendedor, y la matriz dinámica muestra la sensibilidad del resultado del comprador al precio ofrecido.',
    inputs: [
      { key: 'standalone', label: 'Valor stand-alone del patrimonio', value: 6400, fmt: 'money', unit: 'miles $' },
      { key: 'oferta', label: 'Oferta del comprador', value: 8000, fmt: 'money' },
      { key: 'sinCostos', label: 'Sinergia de costos (anual)', value: 420, fmt: 'money' },
      { key: 'pCostos', label: 'Probabilidad (costos)', value: 0.80, fmt: 'pct' },
      { key: 'sinIngresos', label: 'Sinergia de ingresos (anual)', value: 350, fmt: 'money' },
      { key: 'pIngresos', label: 'Probabilidad (ingresos)', value: 0.35, fmt: 'pct' },
      { key: 'costoInteg', label: 'Costos de integración (una vez)', value: 600, fmt: 'money' },
      { key: 'wacc', label: 'WACC del comprador', value: 0.18, fmt: 'pct1' },
    ],
    calcs: [
      { key: 'vpCostos', label: 'VP sinergia de costos (ajustada)', xl: '=[sinCostos]*[pCostos]/[wacc]', fmt: 'money' },
      { key: 'vpIngresos', label: 'VP sinergia de ingresos (ajustada)', xl: '=[sinIngresos]*[pIngresos]/[wacc]', fmt: 'money' },
      { key: 'vpSinergiaBruta', label: 'VP sinergia total (bruta)', xl: '=[vpCostos]+[vpIngresos]', fmt: 'money' },
      { key: 'vpSinergiaNeta', label: 'VP sinergia neta de integración', xl: '=[vpSinergiaBruta]-[costoInteg]', fmt: 'money', highlight: true },
      { key: 'prima', label: 'Prima pagada sobre stand-alone', xl: '=[oferta]-[standalone]', fmt: 'money', highlight: true },
      { key: 'repartoVendedor', label: 'Porción de la sinergia que capta el vendedor', xl: '=[prima]/[vpSinergiaNeta]', fmt: 'pct1', highlight: true },
      { key: 'valorComprador', label: 'Valor neto para el comprador', xl: '=[vpSinergiaNeta]-[prima]', fmt: 'money', highlight: true },
      { key: 'precioMax', label: 'Precio máximo racional del comprador', xl: '=[standalone]+[vpSinergiaNeta]', fmt: 'money' },
    ],
    spills: [
      {
        key: 'sensPrecio',
        title: 'Reparto del valor según el precio ofrecido',
        columns: ['Precio ofrecido', 'Prima', 'Gana el vendedor', 'Gana el comprador'],
        xl: '=LET(precios,SEQUENCE(8,1,6400,400), prima,precios-[standalone], compra,[vpSinergiaNeta]-prima, HSTACK(precios,prima,prima,compra))',
        formats: ['money', 'money', 'money', 'money'],
        rows: 8,
        note: 'A medida que sube el precio, la prima (lo que gana el vendedor) crece y el beneficio del comprador se reduce. Donde el beneficio del comprador llega a cero está el precio máximo racional.',
      },
    ],
    conclusions: [
      { label: 'Reparto del valor', xl: '="La sinergia neta vale "&TEXT([vpSinergiaNeta],"#,##0")&". Con una prima de "&TEXT([prima],"#,##0")&", el vendedor captura el "&TEXT([repartoVendedor],"0.0%")&" de la sinergia y al comprador le quedan "&TEXT([valorComprador],"#,##0")&"."' },
      { label: 'Veredicto', xl: '=IF([valorComprador]>0,"La operación crea valor para AMBAS partes: el vendedor cobra prima y al comprador le queda "&TEXT([valorComprador],"#,##0")&". Precio máximo racional: "&TEXT([precioMax],"#,##0")&".","El comprador estaría pagando MÁS que toda la sinergia: destruye valor para sus accionistas. Precio máximo racional: "&TEXT([precioMax],"#,##0")&".")' },
    ],
  },
  ejercicio: {
    titulo: 'El precio máximo que un comprador debería pagar',
    enunciado:
      'Un comprador evalúa adquirir una distribuidora que, stand-alone, vale 3.000 (miles). Estima sinergias de costos por 250 anuales perpetuas, con 70 % de probabilidad, y costos de integración por 300. Su WACC es 20 %.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Valor stand-alone', '3.000'], ['Sinergia anual de costos', '250'], ['Probabilidad', '70%'], ['Costos de integración', '300'], ['WACC', '20%'],
      ] },
    ],
    preguntas: ['¿Cuánto vale la sinergia neta?', '¿Cuál es el precio máximo racional?', '¿Qué pasa si paga 3.500?'],
    solucion: [
      { t: 'formula', name: 'Sinergia ajustada por probabilidad', expr: 'VP = 250 × 0,70 ÷ 0,20 = 175 ÷ 0,20 = 875' },
      { t: 'formula', name: 'Sinergia neta de integración', expr: 'Sinergia neta = 875 − 300 = 575' },
      { t: 'formula', name: 'Precio máximo racional', expr: 'Precio máx = 3.000 + 575 = 3.575' },
      { t: 'idea', md: 'Si paga **3.500**, la prima es 500 y le quedan **75** de valor (575 − 500): la operación apenas crea valor y cualquier desvío en la sinergia la vuelve negativa. Si pagara 3.575 o más, **transfiere todo el beneficio al vendedor** y asume todo el riesgo de ejecución: destruye valor para sus accionistas. El margen entre el precio y el máximo racional es la única protección real ante errores de estimación.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'La evidencia empírica sobre M&A muestra que, en promedio:', opciones: ['El comprador captura la mayor parte del valor.', 'El vendedor captura la mayor parte del valor vía la prima, y el comprador con frecuencia destruye valor.', 'Ambos ganan por igual.', 'Nadie gana ni pierde.'], correcta: 1, justificacion: 'Décadas de investigación muestran que la prima transfiere el valor al vendedor y que entre la mitad y dos tercios de las adquisiciones destruyen valor para el comprador. No es un resultado simétrico.' },
    { id: 'q2', pregunta: 'La teoría del free cash flow de Jensen explica las adquisiciones como:', opciones: ['Un error de cálculo.', 'Un problema de agencia: directivos con exceso de caja prefieren comprar antes que distribuir.', 'Un fenómeno aleatorio.', 'Una consecuencia de la inflación.'], correcta: 1, justificacion: 'Jensen (1986) plantea que el exceso de caja en manos de directivos sin oportunidades rentables alimenta adquisiciones destructivas; es un conflicto de intereses, no un error aritmético.' },
    { id: 'q3', pregunta: 'La hipótesis de la arrogancia (hubris) de Roll sostiene que:', opciones: ['Los directivos actúan de mala fe.', 'Los directivos pagan de más por exceso de confianza sincero en su propia valuación.', 'El mercado siempre tiene razón.', 'Las sinergias no existen.'], correcta: 1, justificacion: 'Roll (1986) no supone mala fe sino mala calibración: la creencia sincera de que uno ve valor donde el mercado no lo ve lleva a pagar primas injustificadas.' },
    { id: 'q4', pregunta: 'La “maldición del ganador” (winner’s curse) en una subasta implica que:', opciones: ['Gana el mejor postor informado.', 'El que gana es sistemáticamente el que más sobreestimó el valor.', 'Nadie gana.', 'El precio siempre es justo.'], correcta: 1, justificacion: 'Con valor incierto y múltiples oferentes, ganar la subasta es evidencia de haber sido el más optimista —es decir, el que más probablemente sobreestimó—.' },
    { id: 'q5', pregunta: '¿Cuál tipo de sinergia es históricamente la MENOS cumplida?', opciones: ['De costos.', 'De ingresos.', 'Fiscales.', 'Financieras.'], correcta: 1, justificacion: 'Las sinergias de ingresos (venta cruzada, nuevos mercados) son las más prometidas y las menos cumplidas; las de costos son más verificables y suelen materializarse, aunque con demora.' },
    { id: 'q6', pregunta: 'Al valuar una sinergia, los dos castigos que casi nadie aplica son:', opciones: ['Impuestos e inflación.', 'La probabilidad de materialización y la demora en aparecer.', 'El tipo de cambio y la tasa.', 'Ninguno.'], correcta: 1, justificacion: 'No toda sinergia se logra (probabilidad) y ninguna es inmediata (demora). Ambos reducen fuertemente el valor presente y suelen omitirse en las justificaciones optimistas.' },
    { id: 'q7', pregunta: 'Valuar la empresa objetivo incluyendo las sinergias y usar ese número como precio:', opciones: ['Es la práctica correcta.', 'Entrega de antemano todo el valor al vendedor y deja al comprador con todo el riesgo.', 'Reduce la prima.', 'Es lo que recomienda Damodaran.'], correcta: 1, justificacion: 'Ese cálculo convierte el techo teórico en precio, transfiriendo la totalidad del beneficio al vendedor. Damodaran recomienda exactamente lo contrario: valuar stand-alone primero.' },
    { id: 'q8', pregunta: 'La valuación stand-alone de la empresa objetivo representa:', opciones: ['El techo del precio.', 'El piso de realidad sobre el que se discute la prima.', 'El precio final.', 'Un dato irrelevante.'], correcta: 1, justificacion: 'El valor sin sinergias es el punto de partida: todo lo que se pague por encima debe justificarse con flujos, fechas y probabilidades concretas.' },
    { id: 'q9', pregunta: 'El due diligence financiero se diferencia de la auditoría en que:', opciones: ['Son lo mismo.', 'La auditoría verifica cumplimiento normativo; el due diligence busca lo que cambia el precio o mata el acuerdo.', 'El due diligence es más barato.', 'La auditoría es opcional.'], correcta: 1, justificacion: 'Son ejercicios con objetivos distintos: la auditoría certifica conformidad con la norma; el due diligence busca riesgos y ajustes con impacto económico en la transacción.' },
    { id: 'q10', pregunta: 'El “EBITDA ajustado” que se negocia en una operación es:', opciones: ['El EBITDA contable sin cambios.', 'El EBITDA depurado de partidas no recurrentes y devengamientos agresivos, para reflejar lo recurrente y de caja.', 'El EBITDA más las sinergias.', 'El resultado neto.'], correcta: 1, justificacion: 'Se normaliza el EBITDA para reflejar la capacidad recurrente del negocio; es donde se juega buena parte del precio y por eso es el foco del due diligence.' },
    { id: 'q11', pregunta: 'La cláusula de ajuste por capital de trabajo normalizado existe para:', opciones: ['Complicar el contrato.', 'Evitar que el vendedor "vacíe" el capital de trabajo entre la firma y el cierre.', 'Bajar el precio siempre.', 'Reemplazar la deuda neta.'], correcta: 1, justificacion: 'Sin esa cláusula el vendedor tiene incentivos para estirar pagos y acelerar cobranzas, entregando un negocio descapitalizado en su ciclo operativo.' },
    { id: 'q12', pregunta: 'Un vendedor que desinvirtió durante años (CapEx menor a la depreciación) entrega:', opciones: ['Un negocio en excelente estado.', 'Un EBITDA inflado y una máquina que hay que reponer.', 'Menos deuda.', 'Más capital de trabajo.'], correcta: 1, justificacion: 'La desinversión encubierta infla el resultado presente a costa de una inversión de reposición diferida que el comprador va a tener que afrontar.' },
    { id: 'q13', pregunta: 'En el esquema de precio “cash-free, debt-free” se acuerda:', opciones: ['Solo el precio de las acciones.', 'Un valor de empresa (EV) que luego se ajusta por deuda neta y desvío de capital de trabajo.', 'Pagar sin dinero.', 'No pagar deuda.'], correcta: 1, justificacion: 'Se negocia el valor del negocio (EV) y el precio de las acciones surge de ajustar por deuda neta y por el desvío del capital de trabajo respecto del nivel normalizado.' },
    { id: 'q14', pregunta: 'Pagar una adquisición con acciones en vez de caja:', opciones: ['Transfiere todo el riesgo al comprador.', 'Comparte el riesgo y puede señalar que el comprador considera caras sus acciones.', 'Siempre es mejor.', 'No tiene efecto informativo.'], correcta: 1, justificacion: 'El pago en acciones comparte el riesgo de la operación y el mercado suele leerlo como señal de sobrevaluación del comprador; empíricamente rinde peor que el pago en caja.' },
    { id: 'q15', pregunta: 'El earn-out es especialmente útil cuando:', opciones: ['Hay acuerdo total sobre el valor.', 'El desacuerdo es sobre el desempeño futuro y conviene alinear incentivos.', 'No hay vendedor.', 'El comprador no tiene fondos.'], correcta: 1, justificacion: 'Condicionar parte del precio a resultados futuros cierra la brecha de valuación cuando el desacuerdo es sobre el futuro, y mantiene comprometido al vendedor.' },
    { id: 'q16', pregunta: 'Un earn-out mal diseñado falla típicamente porque:', opciones: ['Es demasiado generoso.', 'Sus métricas no son objetivas, auditables ni están bajo control del vendedor.', 'Es ilegal.', 'No se usa nunca.'], correcta: 1, justificacion: 'Si el vendedor no controla la métrica o esta es manipulable por el comprador, el earn-out se vuelve fuente garantizada de conflicto y litigio.' },
    { id: 'q17', pregunta: 'Las declaraciones y garantías (reps & warranties) sirven para:', opciones: ['Fijar el precio.', 'Trasladar al vendedor el riesgo de que lo declarado sobre la empresa sea falso.', 'Definir sinergias.', 'Calcular el WACC.'], correcta: 1, justificacion: 'El vendedor afirma hechos sobre la empresa y responde si resultan falsos; es el mecanismo contractual que asigna el riesgo de lo desconocido.' },
    { id: 'q18', pregunta: 'El escrow (retención de parte del precio) tiene como fin:', opciones: ['Bajar el precio.', 'Responder por contingencias que aparezcan después del cierre.', 'Pagar impuestos.', 'Financiar la integración.'], correcta: 1, justificacion: 'Una porción del precio queda retenida un tiempo para cubrir reclamos por contingencias no detectadas en el due diligence.' },
    { id: 'q19', pregunta: 'La evidencia sobre “programmatic M&A” indica que:', opciones: ['Las grandes apuestas transformacionales rinden mejor.', 'Las adquisiciones pequeñas y frecuentes superan sistemáticamente a las grandes apuestas.', 'M&A nunca funciona.', 'El tamaño es irrelevante.'], correcta: 1, justificacion: 'Los programas sostenidos de adquisiciones chicas muestran mejor desempeño que las pocas operaciones grandes y transformacionales, según la investigación de McKinsey y otros.' },
    { id: 'q20', pregunta: '¿Dónde se pierde con más frecuencia el valor de una adquisición?', opciones: ['En la negociación del precio.', 'En la integración post-cierre.', 'En el due diligence.', 'En la firma.'], correcta: 1, justificacion: 'El valor se define en el precio pero se realiza (o se pierde) en la integración: retención de talento, sistemas, cultura y clientes.' },
    { id: 'q21', pregunta: 'En la empresa mediana familiar, la operación de M&A típicamente es:', opciones: ['Una fusión entre corporaciones.', 'La venta total o parcial de la empresa de una familia, cruzada con sucesión y retiro.', 'Una oferta pública.', 'Una escisión.'], correcta: 1, justificacion: 'El vendedor no es un fondo que optimiza: es un dueño resolviendo simultáneamente su sucesión, su retiro y a veces un conflicto familiar. Eso cambia la lógica de la negociación.' },
    { id: 'q22', pregunta: 'Un IDD (dependencia del dueño) alto, en una venta:', opciones: ['Sube el precio.', 'Reduce el valor, achica el universo de compradores y aumenta el riesgo de la integración.', 'No influye.', 'Solo afecta al vendedor.'], correcta: 1, justificacion: 'Un negocio que se va con el dueño vale menos, atrae menos compradores y es más frágil en la transición: los tres efectos juegan en contra del precio.' },
    { id: 'q23', pregunta: 'Preparar una empresa para la venta “solo contablemente” (maquillar el último ejercicio):', opciones: ['Es la mejor estrategia.', 'Lo detecta cualquier due diligence competente y destruye confianza.', 'Sube el precio de forma segura.', 'Es lo que recomienda la doctrina.'], correcta: 1, justificacion: 'El maquillaje contable se detecta en el due diligence y erosiona la confianza; la preparación estructural (procesos, segunda línea, deuda ordenada) es la que sube el precio de verdad.' },
    { id: 'q24', pregunta: 'El precio máximo racional que debería pagar un comprador es:', opciones: ['El valor stand-alone.', 'El valor stand-alone más la sinergia neta ajustada.', 'El doble del stand-alone.', 'Lo que pida el vendedor.'], correcta: 1, justificacion: 'Stand-alone + sinergia neta (ajustada por probabilidad, demora y costos de integración) es el techo teórico; pagar eso transfiere todo el beneficio al vendedor.' },
    { id: 'q25', pregunta: 'Si la prima pagada iguala al valor presente de la sinergia:', opciones: ['El comprador gana mucho.', 'El comprador asume todo el riesgo de ejecución sin quedarse ningún beneficio.', 'Ambos ganan.', 'La operación es imposible.'], correcta: 1, justificacion: 'Con prima = sinergia, todo el beneficio va al vendedor y el comprador queda con el riesgo de ejecución sin compensación: destruye valor para sus accionistas.' },
    { id: 'q26', pregunta: 'Los costos de integración, al valuar una operación:', opciones: ['Se ignoran.', 'Se restan del valor presente de las sinergias.', 'Se suman a la sinergia.', 'Se pagan aparte sin afectar el valor.'], correcta: 1, justificacion: 'La sinergia relevante es la NETA de los costos de lograrla (sistemas, indemnizaciones, consultores, disrupción operativa).' },
    { id: 'q27', pregunta: 'La sinergia fiscal por uso de quebrantos acumulados es:', opciones: ['Siempre inventada.', 'Real si es legítima, y debe verificarse con asesoramiento tributario.', 'La menos creíble.', 'Ilegal.'], correcta: 1, justificacion: 'El aprovechamiento de quebrantos puede generar valor real, pero su viabilidad depende de la normativa aplicable y debe verificarse, no suponerse.' },
    { id: 'q28', pregunta: 'Según Bruner, los fracasos en M&A típicamente:', opciones: ['Tienen una única causa.', 'Son una cadena: tesis débil, due diligence apurado, valuación optimista, mala estructura e integración subestimada.', 'Son puro azar.', 'Se deben solo al precio.'], correcta: 1, justificacion: 'Bruner documenta que los desastres son multicausales: cada eslabón parece manejable por separado, pero encadenados resultan letales.' },
    { id: 'q29', pregunta: 'La concentración de clientes detectada en el due diligence importa porque:', opciones: ['No afecta el valor.', 'Aumenta el riesgo del flujo futuro y puede justificar un menor precio o un earn-out.', 'Sube el EBITDA.', 'Solo importa a los bancos.'], correcta: 1, justificacion: 'Un negocio dependiente de pocos clientes tiene flujos más volátiles y frágiles; se refleja en el precio, en la estructura del acuerdo o en ambos. Es lo que mide el indicador CEM.' },
    { id: 'q30', pregunta: 'La secuencia correcta para preparar una empresa familiar para la venta es:', opciones: ['Salir al mercado primero y ordenarse después.', 'Bajar el IDD, normalizar, ordenar capital de trabajo y deuda, y recién después salir al mercado.', 'Solo mejorar el último balance.', 'Contratar un banco de inversión y esperar.'], correcta: 1, justificacion: 'Cada paso previo sube el precio y amplía el universo de compradores; salir al mercado sin preparación destruye poder de negociación.' },
  ],
  bibliografia: [
    'Damodaran, A. — *The Value of Synergy* y *Investment Valuation*',
    'Bruner, R. — *Deals from Hell: M&A Lessons that Rise Above the Ashes*',
    'Jensen, M. — “Agency Costs of Free Cash Flow, Corporate Finance and Takeovers” (1986)',
    'Roll, R. — “The Hubris Hypothesis of Corporate Takeovers” (1986)',
    'Koller, Goedhart & Wessels — *Valuation*, capítulos de M&A',
    'Rosenbaum, J. & Pearl, J. — *Investment Banking: Valuation, LBOs, M&A*',
  ],
}
