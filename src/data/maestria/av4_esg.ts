import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.4 — ESG y Riesgo Climático en la Valuación
// ============================================================================
export const av4_esg: Asignatura = {
  cod: 'A.4',
  slug: 'av-4',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'ESG y Riesgo Climático en la Valuación: del discurso a la aritmética',
  horas: '24 h · 12 teóricas / 12 prácticas',
  correlativas: 'Correlativas: 3.1 y 4.1 · Módulo avanzado',
  framework: 'Damodaran (crítico) · TCFD / ISSB · evidencia empírica 2026',
  resumen:
    'El tema más contaminado de marketing de las finanzas corporativas contemporáneas. Este módulo separa lo verificable —el riesgo climático se paga en el costo del capital— de lo declarativo, y muestra cómo se incorpora correctamente a una valuación.',
  objetivos: [
    'Distinguir el riesgo ESG material del ruido reputacional, con criterio de materialidad financiera.',
    'Diferenciar riesgo físico de riesgo de transición y ubicar cada uno en el modelo de valuación.',
    'Decidir dónde se ajusta —en los flujos o en la tasa— y por qué el consenso técnico prefiere los flujos.',
    'Conocer la evidencia empírica actual sobre el efecto del riesgo climático en el costo del capital.',
    'Aplicar el marco a la empresa agroindustrial y forestal del Nordeste argentino, donde el riesgo físico es concreto.',
  ],
  sections: [
    {
      title: 'El origen: de la responsabilidad social a la materialidad financiera',
      intro:
        'El campo nació como ética empresarial y se transformó, en dos décadas, en una discusión sobre riesgo y valuación. Entender ese recorrido explica por qué sigue mezclado con marketing.',
      blocks: [
        { t: 'p', md: 'La **responsabilidad social empresaria (RSE)** de los años noventa era un discurso sobre lo que la empresa *debía* hacer: filantropía, comunidad, buenas prácticas. No pretendía afectar el valor. El giro conceptual llegó cuando la discusión se desplazó de la ética a la **materialidad financiera**: la pregunta dejó de ser "¿esto es correcto?" y pasó a ser **"¿esto afecta los flujos de fondos o el riesgo del negocio?"**.' },
        { t: 'p', md: 'Ese desplazamiento produjo la infraestructura actual: el **TCFD** (Task Force on Climate-related Financial Disclosures, 2017) fijó el marco de divulgación de riesgos climáticos en cuatro pilares —gobernanza, estrategia, gestión de riesgos y métricas—; y el **ISSB** (International Sustainability Standards Board) lo absorbió para convertirlo en estándar contable internacional. El movimiento es claro: **del reporte voluntario de sostenibilidad a la divulgación financiera obligatoria de riesgos**.' },
        { t: 'idea', md: 'La distinción que ordena todo el módulo: **ESG como valor** (un discurso sobre lo que está bien) frente a **ESG como riesgo** (un factor que afecta flujos, costo del capital y valor terminal). El primero es legítimo pero no es finanzas corporativas. El segundo sí, y es el que se enseña acá.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — crítico del ESG como categoría', md: 'Mi objeción no es que la sostenibilidad no importe. Es que ESG, como sigla y como industria, mezcló tantas cosas distintas que perdió capacidad explicativa. Si un riesgo es real, aparecerá en los flujos de fondos esperados o en el costo del capital. Y si no aparece en ninguno de los dos, entonces no es un riesgo financiero: es otra cosa.' },
      ],
    },
    {
      title: 'Riesgo físico y riesgo de transición',
      intro:
        'La taxonomía que hace operativo el análisis. Son dos riesgos de naturaleza distinta, con horizontes distintos y tratamiento distinto en el modelo.',
      blocks: [
        { t: 'table', title: 'Las dos familias del riesgo climático', headers: ['Dimensión', 'Riesgo físico', 'Riesgo de transición'], firstColLeft: true, rows: [
          ['Qué es', 'Daño material por eventos o cambios del clima', 'Costos de adaptarse a una economía baja en carbono'],
          ['Ejemplos', 'Sequía, inundación, incendio, heladas, plagas', 'Impuestos al carbono, regulación, cambio de demanda'],
          ['Agudo vs. crónico', 'Agudo: evento puntual. Crónico: cambio de patrón', 'Regulatorio, tecnológico, de mercado, reputacional'],
          ['Horizonte típico', 'Ya presente y creciente', 'Medio plazo, dependiente de política pública'],
          ['Dónde pega', 'Activos, producción, seguros, capital de trabajo', 'Costos, precios, demanda, valor terminal'],
        ], caption: 'En el Nordeste argentino, el riesgo físico no es una hipótesis de largo plazo: sequías, inundaciones e incendios forestales son eventos recurrentes con impacto directo y medible sobre el flujo.' },
        { t: 'p', md: 'Dentro del riesgo físico se distingue el **agudo** (un evento: una inundación que detiene la planta dos semanas) del **crónico** (un cambio de patrón: un régimen de lluvias que altera permanentemente el rendimiento forestal). El primero se modela como un shock probabilístico sobre el flujo; el segundo, como una modificación de la tendencia de largo plazo —y por lo tanto afecta el **valor terminal**, que es donde vive la mayor parte del valor (asignatura 4.1)—.' },
      ],
    },
    {
      title: 'La evidencia: ¿el mercado paga el riesgo climático?',
      intro:
        'Durante años la respuesta fue "en teoría sí, en la práctica no se ve". La evidencia reciente cambió esa conversación.',
      blocks: [
        { t: 'formula', name: 'El dato que ordena la discusión', expr: '+10 pp de riesgo de daño físico de activos  →  +22 puntos básicos de WACC', where: 'Controlando por sector, tamaño y geografía', note: 'Evidencia de mercado (2026). Ya no es una hipótesis normativa: el riesgo físico climático se está incorporando al costo del capital de manera medible.' },
        { t: 'ul', items: [
          '**El riesgo climático se paga.** La relación entre exposición al daño físico y costo del capital es estadísticamente detectable, controlando por sector, tamaño y geografía.',
          '**La divulgación reduce el costo del capital.** Las empresas que informan con claridad sus datos de sostenibilidad muestran menor costo del capital y mejores valuaciones —parte del efecto es la reducción de asimetría informativa, no la virtud ambiental en sí—.',
          '**El financiamiento de transición se consolidó** como categoría propia: fondeo para empresas que todavía no son "verdes" pero están descarbonizando de forma verificable. Es la categoría más relevante para la industria pesada y el agro.',
          '**Los inversores institucionales siguen ponderando el factor** en sus decisiones de asignación, aunque la etiqueta "ESG" haya perdido popularidad como producto financiero.',
        ] },
        { t: 'warn', md: 'Cuidado con la causalidad. Que las empresas con mejor divulgación tengan menor costo del capital **no prueba** que informar mejor abarate el capital: puede ser que las empresas mejor gestionadas informen mejor *y* tengan menor riesgo. Parte del efecto es reducción de **asimetría informativa** —la misma razón por la que una PyME ordenada consigue mejor tasa (la BFR de la asignatura 4.3)—.' },
      ],
    },
    {
      title: 'Cómo se incorpora a una valuación (y cómo no)',
      intro:
        'El error más frecuente es "castigar la tasa" con una prima ESG improvisada. El consenso técnico va por otro lado.',
      blocks: [
        { t: 'steps', title: 'El procedimiento correcto', items: [
          { k: 'Identificar la materialidad', d: '¿Qué factores ESG afectan de verdad este negocio? Para un aserradero: disponibilidad y precio de la madera, riesgo de incendio, certificación forestal, condiciones laborales. No todo ESG es material para toda empresa.' },
          { k: 'Traducir a flujos', d: 'Cada riesgo material se expresa en el modelo: mayor costo de seguros, menor rendimiento por hectárea, CapEx de adaptación, pérdida de acceso a mercados que exigen certificación.' },
          { k: 'Modelar la incertidumbre', d: 'Los eventos físicos son probabilísticos: entran naturalmente en la simulación de Monte Carlo (asignatura 3.3) como shocks con probabilidad y severidad.' },
          { k: 'Ajustar la tasa solo si corresponde', d: 'Si el riesgo es sistemático (afecta a todo el mercado) y no diversificable, puede justificar un ajuste en el costo del capital. Si es específico de la empresa, va en los flujos.' },
          { k: 'Declarar el supuesto', d: 'Todo ajuste ESG debe poder explicarse: qué riesgo, qué magnitud, qué fuente. Una prima genérica "por ESG" sin fundamento es una opinión disfrazada de técnica.' },
        ] },
        { t: 'idea', md: 'La regla de Damodaran, que compartimos: **el riesgo específico va en los flujos; el sistemático, en la tasa.** Un incendio forestal es un riesgo de la empresa y su región: se modela como un shock probabilístico sobre el flujo. Un impuesto al carbono generalizado afecta a todo el sector: puede justificar un ajuste en la tasa. Meter todo en la tasa es cómodo, opaco y casi siempre incorrecto.' },
        { t: 'warn', md: '**Doble conteo, otra vez.** Si el riesgo de sequía ya está modelado como un shock en el flujo (Monte Carlo) *y además* se agrega una prima ESG a la tasa de descuento, se está castigando dos veces el mismo riesgo. Es exactamente el mismo error conceptual que el doble conteo del riesgo país (asignatura 3.1) — y se comete con la misma frecuencia.' },
      ],
    },
    {
      title: 'Greenwashing y el problema de la medición',
      intro:
        'El obstáculo práctico más serio del campo no es conceptual sino de datos: las calificaciones ESG discrepan entre sí de manera alarmante.',
      blocks: [
        { t: 'p', md: 'Distintos proveedores de calificaciones ESG asignan **puntajes muy divergentes a la misma empresa**. La correlación entre calificadoras ESG es sustancialmente menor que la que existe entre calificadoras de crédito. Las razones: difieren en qué miden, cómo lo ponderan y de dónde toman los datos. La consecuencia práctica es incómoda: **un puntaje ESG no es un dato duro, es una opinión con metodología propia**.' },
        { t: 'p', md: 'El **greenwashing** —presentar como sostenible lo que no lo es— prospera justamente en ese terreno de medición débil. Y su reverso, el *greenhushing* (callar lo que sí se hace, por temor a la acusación de greenwashing), también distorsiona la información disponible.' },
        { t: 'idea', md: 'Por eso el enfoque del programa es deliberadamente conservador: **no usamos puntajes ESG de terceros como insumo de valuación**. Identificamos los riesgos materiales específicos del negocio, los cuantificamos en el flujo con supuestos declarados, y los sometemos a sensibilidad. Es menos vistoso que citar una calificación, y bastante más defendible.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'ESG y clima para la empresa mediana del Nordeste argentino: agro, forestal y madera.',
      blocks: [
        { t: 'p', md: 'En nuestra práctica, el ESG de la empresa mediana del NEA **no es un tema de reputación: es un tema de supervivencia operativa**. Un productor forestal enfrenta riesgo de incendio; un aserradero, la disponibilidad y el precio de la materia prima condicionados por el clima; un exportador, la exigencia creciente de certificación de origen sostenible por parte de sus compradores europeos. Nada de eso es marketing: son flujos.' },
        { t: 'idea', md: 'La **certificación forestal** ilustra bien el punto. Certificarse tiene un costo concreto y verificable. No certificarse tiene un costo distinto: perder acceso a mercados que la exigen. La decisión no se toma con un discurso sobre sostenibilidad, se toma con una comparación de valores presentes —costo de certificar contra pérdida de margen y de mercado—. Convertida en aritmética, la discusión se vuelve manejable.' },
        { t: 'warn', md: 'La advertencia que damos a nuestros clientes: **desconfiar de la prima ESG genérica** que algunos asesores agregan al costo del capital "porque es lo que se hace". Si no puede explicarse qué riesgo específico representa, de dónde sale la magnitud y por qué no está ya en los flujos, no es una prima: es un ajuste arbitrario que castiga la valuación sin fundamento.' },
        { t: 'chain', title: 'Cómo lo tratamos en el modelo', nodes: ['Identificar riesgos materiales', 'Cuantificar en el flujo', 'Simular (Monte Carlo)', 'Ajustar tasa solo si es sistemático', 'Declarar supuestos'], caption: 'El mismo rigor que se le exige a cualquier otro supuesto de la valuación. Ni menos, por moda; ni más, por escepticismo.' },
      ],
    },
  ],
  expertos: [
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'Si un riesgo es real, se manifiesta en los flujos de fondos esperados o en el costo del capital. Pedirle a una valuación que incorpore "ESG" sin especificar por cuál de esos dos canales, y con qué magnitud, es pedirle que incorpore una intención.' },
    { author: 'Marco de TCFD / ISSB', credential: 'Estándares de divulgación climática', md: 'La divulgación de riesgos climáticos debe organizarse en cuatro pilares: gobernanza, estrategia, gestión de riesgos y métricas y objetivos. El propósito es que el inversor pueda evaluar el impacto financiero, no la intención declarada.' },
    { author: 'Evidencia de mercado (2026)', credential: 'Estudios sobre costo del capital y riesgo físico', md: 'Un aumento de 10 puntos porcentuales en el riesgo modelado de daño físico de activos se asocia con un incremento promedio de 22 puntos básicos en el costo promedio ponderado del capital, controlando por sector, tamaño y geografía.' },
  ],
  caso: {
    titulo: 'El riesgo de incendio en la valuación de Maderas del Litoral',
    empresa: 'Maderas del Litoral S.A. — riesgo físico material',
    contexto:
      'El comprador brasileño que evalúa Maderas del Litoral (asignatura A.1) plantea una objeción concreta: la empresa depende del abastecimiento de plantaciones forestales de la región, y los incendios forestales del NEA se han vuelto más frecuentes e intensos. Propone descontar el precio aplicando una "prima ESG" de 2 puntos porcentuales al costo del capital.\n\nEl consultor de la familia no discute que el riesgo exista —lo considera real y material—. Discute el **método**: una prima genérica sobre la tasa castiga todo el flujo por igual, para siempre, sin explicitar qué se está midiendo. Propone en cambio modelar el riesgo donde ocurre: como un shock probabilístico sobre el flujo, con probabilidad y severidad declaradas.\n\nLa diferencia entre ambos métodos, en pesos, es lo que está en juego en la negociación.',
    datos: [
      { t: 'table', title: 'Datos del riesgo y la valuación (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF normalizado anual', '1.834'],
        ['WACC sin ajuste', '19,5%'],
        ['Crecimiento perpetuo (g)', '3,0%'],
        ['Prima ESG propuesta por el comprador', '2,0 pp'],
        ['Probabilidad anual de evento de incendio grave', '8%'],
        ['Impacto del evento sobre el flujo anual', '−35%'],
        ['CapEx de mitigación (cortafuegos, seguro, diversificación)', '250'],
        ['Reducción de probabilidad con mitigación', 'de 8% a 3%'],
      ] },
    ],
    consigna: [
      '¿Cuánto vale la empresa con el método del comprador (prima de 2 pp en la tasa)?',
      '¿Cuánto vale modelando el riesgo en el flujo (probabilidad × severidad)?',
      '¿Cuál de los dos métodos es técnicamente correcto y por qué?',
      '¿Conviene invertir 250 en mitigación? ¿Cuánto valor crea esa inversión?',
    ],
    metodologia: [
      { k: 'Valuar sin ajuste', d: 'Perpetuidad con crecimiento como línea de base.' },
      { k: 'Método del comprador', d: 'Sumar la prima a la tasa y revaluar: castiga todo el flujo, para siempre, sin explicitar el riesgo.' },
      { k: 'Método correcto', d: 'Ajustar el flujo esperado por probabilidad × severidad del evento; el riesgo específico va en el flujo.' },
      { k: 'Valuar la mitigación', d: 'Comparar el CapEx de mitigación contra el aumento de valor por reducir la probabilidad.' },
      { k: 'Declarar supuestos', d: 'Probabilidad, severidad y fuente. Someter a sensibilidad.' },
    ],
  },
  model: {
    sheetTitle: 'Riesgo climático en la valuación: prima en la tasa vs. ajuste en el flujo',
    intro:
      'Editá las celdas marfil. El modelo compara los dos métodos de incorporar el riesgo físico y valúa la inversión en mitigación. La matriz dinámica muestra la sensibilidad al nivel de riesgo.',
    inputs: [
      { key: 'fcff', label: 'FCFF normalizado anual', value: 1834, fmt: 'money', unit: 'miles $' },
      { key: 'wacc', label: 'WACC sin ajuste', value: 0.195, fmt: 'pct1' },
      { key: 'g', label: 'Crecimiento perpetuo', value: 0.03, fmt: 'pct1' },
      { key: 'primaEsg', label: 'Prima ESG propuesta (comprador)', value: 0.02, fmt: 'pct1' },
      { key: 'probEvento', label: 'Probabilidad anual de incendio grave', value: 0.08, fmt: 'pct' },
      { key: 'severidad', label: 'Impacto sobre el flujo del año', value: 0.35, fmt: 'pct' },
      { key: 'capexMit', label: 'CapEx de mitigación', value: 250, fmt: 'money' },
      { key: 'probMitigada', label: 'Probabilidad tras mitigación', value: 0.03, fmt: 'pct' },
    ],
    calcs: [
      { key: 'valorBase', label: 'Valor sin ajuste por riesgo', xl: '=[fcff]*(1+[g])/([wacc]-[g])', fmt: 'money' },
      { key: 'valorPrima', label: 'Valor con prima ESG en la tasa (comprador)', xl: '=[fcff]*(1+[g])/([wacc]+[primaEsg]-[g])', fmt: 'money', highlight: true },
      { key: 'fcffAjustado', label: 'FCFF esperado ajustado por riesgo', xl: '=[fcff]*(1-[probEvento]*[severidad])', fmt: 'money' },
      { key: 'valorFlujo', label: 'Valor ajustando el FLUJO (correcto)', xl: '=[fcffAjustado]*(1+[g])/([wacc]-[g])', fmt: 'money', highlight: true },
      { key: 'brechaMetodos', label: 'Diferencia entre métodos', xl: '=[valorFlujo]-[valorPrima]', fmt: 'money', highlight: true },
      { key: 'fcffMitigado', label: 'FCFF esperado con mitigación', xl: '=[fcff]*(1-[probMitigada]*[severidad])', fmt: 'money' },
      { key: 'valorMitigado', label: 'Valor con mitigación', xl: '=[fcffMitigado]*(1+[g])/([wacc]-[g])', fmt: 'money' },
      { key: 'valorMitigacion', label: 'Valor creado por la mitigación (neto)', xl: '=[valorMitigado]-[valorFlujo]-[capexMit]', fmt: 'money', highlight: true },
    ],
    spills: [
      {
        key: 'sensRiesgo',
        title: 'Valor según la probabilidad del evento',
        columns: ['Probabilidad', 'FCFF ajustado', 'Valor', 'Pérdida vs sin riesgo'],
        xl: '=LET(p,SEQUENCE(9,1,0,0.02), f,[fcff]*(1-p*[severidad]), v,f*(1+[g])/([wacc]-[g]), HSTACK(p,f,v,v-[valorBase]))',
        formats: ['pct', 'money', 'money', 'money'],
        rows: 9,
        note: 'El valor cae de forma lineal con la probabilidad del evento, porque el impacto entra en el flujo esperado. Con la prima en la tasa, en cambio, el castigo es no lineal y no explicita qué riesgo se está midiendo.',
      },
    ],
    conclusions: [
      { label: 'Comparación de métodos', xl: '="Con prima en la tasa (comprador): "&TEXT([valorPrima],"#,##0")&". Ajustando el flujo (correcto): "&TEXT([valorFlujo],"#,##0")&". Diferencia: "&TEXT([brechaMetodos],"#,##0")&". El método del comprador castiga "&IF([brechaMetodos]>0,"MÁS","MENOS")&" que el riesgo modelado explícitamente."' },
      { label: 'Mitigación', xl: '=IF([valorMitigacion]>0,"Invertir "&TEXT([capexMit],"#,##0")&" en mitigación CREA "&TEXT([valorMitigacion],"#,##0")&" de valor neto: bajar la probabilidad de "&TEXT([probEvento],"0%")&" a "&TEXT([probMitigada],"0%")&" vale más de lo que cuesta.","La mitigación no se justifica a este costo: destruye "&TEXT(-[valorMitigacion],"#,##0")&".")' },
    ],
  },
  ejercicio: {
    titulo: '¿Prima en la tasa o ajuste en el flujo?',
    enunciado:
      'Una empresa agroindustrial tiene un flujo normalizado de 1.000 (miles) anuales, WACC 18 %, crecimiento perpetuo 2 %. Enfrenta un riesgo de sequía con 10 % de probabilidad anual y un impacto del 40 % sobre el flujo de ese año. Un asesor propone castigar con 2 pp de prima en la tasa.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF', '1.000'], ['WACC', '18%'], ['g', '2%'], ['Probabilidad de sequía', '10%'], ['Severidad', '40%'], ['Prima propuesta', '2 pp'],
      ] },
    ],
    preguntas: ['¿Cuánto vale con cada método?', '¿Cuál es correcto y por qué?'],
    solucion: [
      { t: 'formula', name: 'Método del asesor (prima en la tasa)', expr: 'V = 1.000 × 1,02 ÷ (0,20 − 0,02) = 1.020 ÷ 0,18 = 5.667' },
      { t: 'formula', name: 'Método correcto (ajuste en el flujo)', expr: 'FCFF esperado = 1.000 × (1 − 0,10×0,40) = 960 · V = 960 × 1,02 ÷ 0,16 = 6.120' },
      { t: 'idea', md: 'La prima en la tasa arroja **5.667**; el ajuste en el flujo, **6.120**. La diferencia de **453** no es menor: la prima castiga más de lo que el riesgo modelado justifica. Y sobre todo, **el método del flujo es explícito**: dice exactamente qué se supuso (10 % de probabilidad, 40 % de impacto) y permite discutirlo, sensibilizarlo y mitigarlo. La prima genérica esconde el supuesto dentro de la tasa, donde nadie lo puede auditar. Regla: **el riesgo específico va en el flujo; solo el sistemático justifica tocar la tasa.**' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El giro conceptual del ESG en finanzas corporativas fue pasar de:', opciones: ['La ética a la filantropía.', 'La responsabilidad social a la materialidad financiera.', 'La regulación a lo voluntario.', 'Lo financiero a lo reputacional.'], correcta: 1, justificacion: 'La pregunta dejó de ser "¿esto es correcto?" para ser "¿esto afecta los flujos o el riesgo del negocio?". Ese desplazamiento es lo que lo vuelve materia de finanzas corporativas.' },
    { id: 'q2', pregunta: 'El marco TCFD organiza la divulgación climática en cuatro pilares:', opciones: ['Ingresos, costos, activos y pasivos.', 'Gobernanza, estrategia, gestión de riesgos y métricas.', 'Aire, agua, suelo y energía.', 'Corto, medio, largo plazo y perpetuidad.'], correcta: 1, justificacion: 'Los cuatro pilares del TCFD son gobernanza, estrategia, gestión de riesgos, y métricas y objetivos; el ISSB los absorbió como estándar.' },
    { id: 'q3', pregunta: 'El riesgo físico climático se refiere a:', opciones: ['Costos de adaptarse a la regulación.', 'Daño material por eventos o cambios del clima.', 'Riesgo reputacional.', 'Cambio de preferencias del consumidor.'], correcta: 1, justificacion: 'El riesgo físico es el daño material (sequía, inundación, incendio); los costos de adaptación regulatoria son riesgo de transición.' },
    { id: 'q4', pregunta: 'El riesgo de transición incluye:', opciones: ['Inundaciones y sequías.', 'Impuestos al carbono, regulación y cambios de demanda.', 'Terremotos.', 'Solo riesgo reputacional.'], correcta: 1, justificacion: 'La transición hacia una economía baja en carbono trae riesgos regulatorios, tecnológicos, de mercado y reputacionales.' },
    { id: 'q5', pregunta: 'La diferencia entre riesgo físico agudo y crónico es:', opciones: ['No existe.', 'Agudo es un evento puntual; crónico es un cambio permanente de patrón.', 'Agudo dura más.', 'Crónico es menos grave.'], correcta: 1, justificacion: 'El agudo (una inundación) se modela como shock; el crónico (cambio del régimen de lluvias) altera la tendencia de largo plazo y afecta el valor terminal.' },
    { id: 'q6', pregunta: 'Según la evidencia de mercado, un aumento de 10 pp en el riesgo de daño físico se asocia con:', opciones: ['Ningún efecto medible.', 'Un aumento promedio de 22 puntos básicos en el WACC.', 'Una caída del WACC.', 'Un aumento de 10 pp en el WACC.'], correcta: 1, justificacion: 'El dato empírico (2026), controlando por sector, tamaño y geografía, muestra que el riesgo físico ya se está incorporando al costo del capital de forma medible.' },
    { id: 'q7', pregunta: 'La relación entre mejor divulgación y menor costo del capital:', opciones: ['Prueba que informar abarata el capital.', 'Puede reflejar reducción de asimetría informativa y que las empresas mejor gestionadas informan mejor.', 'Es aleatoria.', 'No existe.'], correcta: 1, justificacion: 'Hay que cuidar la causalidad: parte del efecto es menor asimetría informativa, y parte puede ser que las empresas mejor gestionadas tengan a la vez mejor información y menor riesgo.' },
    { id: 'q8', pregunta: 'El "financiamiento de transición" se refiere a:', opciones: ['Préstamos puente.', 'Fondeo para empresas que aún no son verdes pero descarbonizan de forma verificable.', 'Financiar mudanzas.', 'Deuda de corto plazo.'], correcta: 1, justificacion: 'Es la categoría que financia el proceso de descarbonización de sectores intensivos, y la más relevante para industria pesada y agro.' },
    { id: 'q9', pregunta: 'La regla técnica sobre dónde incorporar el riesgo es:', opciones: ['Todo en la tasa.', 'El riesgo específico en los flujos; el sistemático puede justificar ajuste en la tasa.', 'Todo en los flujos.', 'Es indistinto.'], correcta: 1, justificacion: 'El riesgo diversificable/específico se modela en el flujo esperado; solo el riesgo sistemático no diversificable justifica tocar el costo del capital.' },
    { id: 'q10', pregunta: 'Modelar un riesgo como shock en el flujo Y además agregar una prima a la tasa es:', opciones: ['Prudente.', 'Doble conteo del mismo riesgo.', 'Obligatorio.', 'El método recomendado.'], correcta: 1, justificacion: 'Es el mismo error conceptual que el doble conteo del riesgo país: castigar dos veces el mismo riesgo subvalúa la empresa sin fundamento.' },
    { id: 'q11', pregunta: 'Un evento de incendio con probabilidad y severidad conocidas entra naturalmente en:', opciones: ['La tasa de descuento.', 'La simulación de Monte Carlo como shock probabilístico.', 'El valor terminal únicamente.', 'El patrimonio contable.'], correcta: 1, justificacion: 'Los eventos probabilísticos se modelan en la simulación (asignatura 3.3), donde su probabilidad y severidad son explícitas y auditables.' },
    { id: 'q12', pregunta: 'Las calificaciones ESG de distintos proveedores:', opciones: ['Coinciden casi perfectamente.', 'Discrepan sustancialmente, mucho más que las calificaciones de crédito.', 'Son idénticas por norma.', 'No existen.'], correcta: 1, justificacion: 'La correlación entre calificadoras ESG es baja porque difieren en qué miden, cómo lo ponderan y de dónde toman los datos.' },
    { id: 'q13', pregunta: 'Un puntaje ESG de un tercero debe entenderse como:', opciones: ['Un dato duro.', 'Una opinión con metodología propia.', 'Una obligación legal.', 'Un estado contable.'], correcta: 1, justificacion: 'Dada la divergencia entre proveedores, el puntaje refleja la metodología de quien lo emite más que una medida objetiva del riesgo.' },
    { id: 'q14', pregunta: 'El greenwashing consiste en:', opciones: ['Certificarse correctamente.', 'Presentar como sostenible lo que no lo es.', 'Callar lo que se hace bien.', 'Medir emisiones.'], correcta: 1, justificacion: 'Es la presentación engañosa de credenciales ambientales, favorecida por la debilidad de la medición.' },
    { id: 'q15', pregunta: 'El "greenhushing" es:', opciones: ['Lo mismo que greenwashing.', 'Callar lo que sí se hace, por temor a ser acusado de greenwashing.', 'Un estándar contable.', 'Una certificación.'], correcta: 1, justificacion: 'Es el reverso del greenwashing y también distorsiona la información disponible para el analista.' },
    { id: 'q16', pregunta: 'El enfoque del programa respecto de los puntajes ESG de terceros es:', opciones: ['Usarlos como insumo principal de valuación.', 'No usarlos: identificar riesgos materiales específicos y cuantificarlos en el flujo con supuestos declarados.', 'Ignorar todo lo ESG.', 'Usar el promedio de varios.'], correcta: 1, justificacion: 'Ante la divergencia metodológica, es más defendible identificar y cuantificar los riesgos materiales propios del negocio que importar una calificación ajena.' },
    { id: 'q17', pregunta: 'La materialidad, en el análisis ESG, significa que:', opciones: ['Todo factor ESG aplica a toda empresa.', 'Solo importan los factores que afectan de verdad los flujos o el riesgo de ESE negocio.', 'Solo importa lo ambiental.', 'Importa el tamaño de la empresa.'], correcta: 1, justificacion: 'La materialidad financiera filtra: para un aserradero importa el riesgo de incendio y la certificación forestal, no cualquier indicador ESG genérico.' },
    { id: 'q18', pregunta: 'El riesgo físico crónico afecta especialmente:', opciones: ['El capital de trabajo del mes.', 'La tendencia de largo plazo y por tanto el valor terminal.', 'Solo el año en curso.', 'La tasa impositiva.'], correcta: 1, justificacion: 'Un cambio permanente de patrón climático altera la trayectoria de largo plazo, que es donde vive la mayor parte del valor (valor terminal).' },
    { id: 'q19', pregunta: 'En el Nordeste argentino, el riesgo físico climático es:', opciones: ['Una hipótesis lejana.', 'Un evento recurrente con impacto directo y medible sobre el flujo.', 'Irrelevante.', 'Solo reputacional.'], correcta: 1, justificacion: 'Sequías, inundaciones e incendios forestales son recurrentes en la región y afectan producción, abastecimiento y seguros de forma concreta.' },
    { id: 'q20', pregunta: 'La decisión de certificarse (p. ej. certificación forestal) debe tomarse:', opciones: ['Por convicción ambiental únicamente.', 'Comparando el costo de certificar contra la pérdida de margen y mercado por no hacerlo.', 'Porque lo hace la competencia.', 'Nunca.'], correcta: 1, justificacion: 'Convertida en comparación de valores presentes, la discusión deja de ser ideológica y se vuelve una decisión de inversión evaluable.' },
    { id: 'q21', pregunta: 'Según Damodaran, si un riesgo ESG es real:', opciones: ['Aparecerá en el discurso corporativo.', 'Se manifestará en los flujos esperados o en el costo del capital.', 'No se puede medir.', 'Solo afecta la reputación.'], correcta: 1, justificacion: 'Su crítica es metodológica: exige especificar por cuál canal y con qué magnitud opera el riesgo, en vez de invocar la sigla.' },
    { id: 'q22', pregunta: 'Una "prima ESG" genérica agregada al WACC sin fundamento es:', opciones: ['Buena práctica conservadora.', 'Un ajuste arbitrario que castiga la valuación sin explicitar qué mide.', 'Requerida por el ISSB.', 'Equivalente a modelarlo en el flujo.'], correcta: 1, justificacion: 'Si no puede explicarse qué riesgo representa, de dónde sale su magnitud y por qué no está ya en los flujos, es una opinión disfrazada de técnica.' },
    { id: 'q23', pregunta: 'Comparado con la prima en la tasa, modelar el riesgo en el flujo tiene la ventaja de:', opciones: ['Ser más rápido.', 'Ser explícito, auditable, sensibilizable y mitigable.', 'Dar siempre un valor menor.', 'Evitar la simulación.'], correcta: 1, justificacion: 'El supuesto queda a la vista (probabilidad y severidad), se puede discutir y permite evaluar inversiones de mitigación.' },
    { id: 'q24', pregunta: 'Evaluar una inversión en mitigación (cortafuegos, seguro) se hace:', opciones: ['Por obligación normativa.', 'Comparando su costo contra el aumento de valor por reducir la probabilidad del evento.', 'Sin análisis.', 'Solo si sobra caja.'], correcta: 1, justificacion: 'Es una decisión de inversión más: crea valor si el aumento del valor de la empresa supera el CapEx de mitigación.' },
    { id: 'q25', pregunta: 'La reducción de asimetría informativa como causa del menor costo del capital conecta con:', opciones: ['El teorema de Modigliani-Miller.', 'La BFR: la empresa ordenada e informada consigue mejor tasa.', 'El modelo de Merton.', 'El EVA Momentum.'], correcta: 1, justificacion: 'Es el mismo mecanismo de la Brecha de Financiamiento Real (4.3): mejor información reduce el sobrecosto que paga la empresa.' },
    { id: 'q26', pregunta: 'El ISSB, respecto del TCFD:', opciones: ['Lo contradice.', 'Lo absorbió para convertirlo en estándar contable internacional.', 'Es una ONG ambiental.', 'No tiene relación.'], correcta: 1, justificacion: 'El movimiento va del reporte voluntario de sostenibilidad hacia la divulgación financiera estandarizada de riesgos climáticos.' },
    { id: 'q27', pregunta: 'La distinción central que ordena el módulo es entre:', opciones: ['Ambiental y social.', 'ESG como valor (discurso) y ESG como riesgo (factor que afecta flujos y tasa).', 'Corto y largo plazo.', 'Público y privado.'], correcta: 1, justificacion: 'El primero es legítimo pero no es finanzas corporativas; el segundo es el que se incorpora a la valuación con rigor.' },
    { id: 'q28', pregunta: 'Los inversores institucionales, respecto del factor climático:', opciones: ['Lo abandonaron por completo.', 'Lo siguen ponderando en la asignación, aunque la etiqueta ESG haya perdido popularidad como producto.', 'Nunca lo consideraron.', 'Solo lo usan en Europa.'], correcta: 1, justificacion: 'El producto financiero "ESG" perdió tracción comercial, pero el riesgo climático sigue influyendo materialmente en decisiones de asignación.' },
    { id: 'q29', pregunta: 'Para un exportador del NEA, la certificación de origen sostenible es:', opciones: ['Puro marketing.', 'Una condición de acceso a mercados, es decir, un tema de flujos.', 'Un impuesto.', 'Irrelevante.'], correcta: 1, justificacion: 'Si el comprador europeo la exige, no certificarse significa perder el mercado: es una variable de ingresos, no de reputación.' },
    { id: 'q30', pregunta: 'El tratamiento que propone el programa para el riesgo ESG en el modelo es:', opciones: ['Ignorarlo por escepticismo.', 'Identificar riesgos materiales, cuantificarlos en el flujo, simularlos, y ajustar la tasa solo si son sistemáticos.', 'Agregar siempre una prima a la tasa.', 'Usar el puntaje de una calificadora.'], correcta: 1, justificacion: 'El mismo rigor que se exige a cualquier otro supuesto: ni menos por moda, ni más por escepticismo, con los supuestos declarados y sometidos a sensibilidad.' },
  ],
  bibliografia: [
    'Damodaran, A. — escritos críticos sobre ESG y valuación (Musings on Markets)',
    'TCFD — *Recommendations of the Task Force on Climate-related Financial Disclosures*',
    'ISSB / IFRS — Normas NIIF S1 y S2 de divulgación de sostenibilidad y clima',
    'Estudios de mercado sobre costo del capital y riesgo físico climático (2026)',
    'Berg, Kölbel & Rigobon — “Aggregate Confusion: The Divergence of ESG Ratings”',
    'Koller, Goedhart & Wessels — *Valuation*, capítulo sobre ESG y valor',
  ],
}
