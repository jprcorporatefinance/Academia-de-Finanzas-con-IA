import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 1.4 — Marco de Generación de Valor: NOPAT, Capital Invertido,
// ROIC y EVA
// ============================================================================
export const a1_4: Asignatura = {
  cod: '1.4',
  slug: 'a1-4',
  cuatrimestre: 1,
  fase: 'Descriptiva · ¿Qué sucedió?',
  nombre: 'Marco de Generación de Valor: NOPAT, Capital Invertido, ROIC y EVA',
  horas: '36 h · 16 teóricas / 20 prácticas',
  correlativas: 'Sin correlativas · Primer cuatrimestre',
  framework: 'Koller/McKinsey · Stern Stewart · Rappaport · Madden',
  resumen:
    'La ecuación maestra de creación de valor y el lugar que ocupa en ella cualquier indicador. NOPAT, capital invertido, ROIC y EVA construidos desde estados depurados, con la anatomía completa de cada número.',
  objetivos: [
    'Comprender y aplicar la ecuación maestra de creación de valor y ubicar en ella cualquier indicador.',
    'Construir el NOPAT y el capital invertido desde estados depurados, explicitando el origen de cada término.',
    'Medir la creación de valor en nivel (EVA), margen (EVA Margin) y variación (EVA Momentum).',
    'Reconocer las debilidades de cada indicador bajo inflación y con activos de larga vida.',
  ],
  sections: [
    {
      title: 'La ecuación maestra',
      intro: 'Todo el programa cuelga de una sola cadena. Cualquier palanca de gestión mueve uno de tres números: eleva el NOPAT, reduce el capital invertido o reduce el costo del capital.',
      blocks: [
        { t: 'chain', title: 'La cadena de valor', nodes: ['NOPAT ÷ Capital = ROIC', 'ROIC − WACC = spread', 'spread × Capital = EVA', 'Σ EVA descontados = MVA'], caption: 'El ROIC mide la eficiencia; el spread, si crea o destruye valor; el EVA, cuánto valor en pesos; el MVA, el valor acumulado.' },
        { t: 'formula', name: 'El EVA por dos caminos equivalentes', expr: 'EVA = (ROIC − WACC) × Capital = NOPAT − WACC × Capital', note: 'Por diferencial o por resultado residual: dan lo mismo. Es la prueba de coherencia del marco.' },
        { t: 'idea', md: 'Un CEO no necesita memorizar cien ratios: necesita entender que **toda decisión termina moviendo el NOPAT, el capital o el WACC**. Ese es el mapa mental que ordena la gestión financiera.' },
      ],
    },
    {
      title: 'NOPAT y capital invertido',
      intro: 'Los dos insumos del ROIC, construidos desde el estado analítico de la asignatura 1.1.',
      blocks: [
        { t: 'formula', name: 'NOPAT', expr: 'NOPAT = EBIT × (1 − t efectiva)', where: 't efectiva ≠ t nominal · ajustes por partidas no operativas, arrendamientos y gastos con carácter de inversión', note: 'El resultado que la operación genera para todos los proveedores de capital, con independencia de cómo se financió.' },
        { t: 'p', md: 'El **capital invertido** admite dos enfoques que deben reconciliar: el **operativo** (capital de trabajo operativo + activos fijos a valor de mercado + otros activos operativos) y el **financiero** (deuda financiera + patrimonio − caja excedente − activos no operativos). Que ambos den lo mismo es obligatorio; si no cierran, hay un error de clasificación.' },
        { t: 'warn', md: 'Usar **capital de cierre** en vez de **capital promedio** infla o desinfla el ROIC según el momento de las inversiones. El estándar es el capital promedio del período.' },
      ],
    },
    {
      title: 'ROIC: el indicador maestro',
      intro: 'Por qué el ROIC supera al ROE y al ROA como medida de eficiencia del capital.',
      blocks: [
        { t: 'formula', name: 'ROIC', expr: 'ROIC = NOPAT ÷ Capital invertido promedio', note: 'Aísla la operación del financiamiento: mide qué tan bien la empresa convierte capital en resultado operativo.' },
        { t: 'table', title: 'ROIC frente a ROE y ROA', headers: ['Indicador', 'Qué mezcla', 'Problema'], firstColLeft: true, rows: [
          ['ROE', 'Operación + financiamiento + fiscalidad', 'El apalancamiento lo infla sin crear valor'],
          ['ROA', 'Todos los activos, operativos o no', 'Contamina con activos no operativos y caja'],
          ['ROIC', 'Solo capital operativo y NOPAT', 'El más limpio: aísla la eficiencia real'],
        ] },
        { t: 'warn', md: 'Debilidades del ROIC: se distorsiona por **antigüedad de activos** (planta amortizada, ver 1.1), **inflación no corregida** e **intangibles no capitalizados**. Por eso el ROIC se calcula sobre el estado analítico, no sobre el contable.' },
        { t: 'quote', author: 'Tim Koller', credential: 'McKinsey & Company — Valuation', md: 'El valor se crea cuando las empresas invierten capital a retornos que superan su costo. El ROIC y el crecimiento son los dos motores; de ellos se deriva todo lo demás.' },
      ],
    },
    {
      title: 'EVA, EVA Margin y EVA Momentum',
      intro: 'Del retorno porcentual al valor en pesos, y de éste a la métrica de mejora que premia la gestión.',
      blocks: [
        { t: 'ul', items: [
          '**EVA** = (ROIC − WACC) × Capital. El valor creado en el período, en unidades monetarias. Convierte un diferencial porcentual en pesos.',
          '**EVA Margin** = EVA ÷ Ventas. Eficiencia de creación de valor **comparable entre empresas** de distinto tamaño.',
          '**EVA Momentum** = Δ EVA ÷ Ventas del período anterior. Métrica de **mejora**: premia el avance, no la herencia. Superior al nivel absoluto para evaluar gestión.',
        ] },
        { t: 'quote', author: 'G. Bennett Stewart III', credential: 'Stern Stewart & Co. — The Quest for Value', md: 'El EVA es el único indicador que, al maximizarse período a período, maximiza el valor para el accionista. Todo lo demás son aproximaciones o distracciones.' },
        { t: 'idea', md: 'EVA Momentum resuelve un problema político real: un gerente que hereda un EVA alto puede lucir bien sin hacer nada, y uno que hereda un EVA negativo puede crear muchísimo valor y aun así mostrar EVA negativo. La **variación** es más justa que el **nivel**.' },
      ],
    },
    {
      title: 'CFROI, GMROI y la anatomía obligatoria',
      intro: 'Indicadores complementarios y la disciplina de exigir la anatomía completa de cada número.',
      blocks: [
        { t: 'ul', items: [
          '**CFROI** (Cash Flow Return on Investment): retorno sobre base caja e inversión bruta ajustada por inflación. Corrige el sesgo de antigüedad de los activos, a costo de mayor complejidad.',
          '**GMROI** (Gross Margin Return on Investment): margen bruto sobre inversión en inventario. Clave en empresas comerciales y distribuidoras.',
        ] },
        { t: 'steps', title: 'Anatomía obligatoria de cada indicador', items: [
          { k: 'Definición', d: 'Qué mide, en una frase.' },
          { k: 'Fórmula con trazabilidad', d: 'De dónde sale cada término.' },
          { k: 'Valor que agrega', d: 'Qué decisión permite tomar y cuáles son sus umbrales.' },
          { k: 'Dónde miente', d: 'Sus debilidades y las condiciones en que engaña.' },
          { k: 'Flujograma', d: 'La cadena causa-efecto que lo conecta con el valor.' },
        ] },
        { t: 'quote', author: 'Alfred Rappaport', credential: 'Creating Shareholder Value', md: 'Las utilidades contables son una opinión; el flujo de caja descontado es un hecho. Los indicadores de valor existen para acercar la gestión a lo segundo.' },
      ],
    },
    {
      title: 'La construcción del NOPAT, línea por línea',
      intro: 'El NOPAT parece simple —EBIT por (1 − t)— pero su construcción rigurosa exige una serie de ajustes que la mayoría omite, y cada omisión distorsiona el ROIC.',
      blocks: [
        { t: 'steps', title: 'Del EBIT contable al NOPAT económico', items: [
          { k: 'Partir del EBIT depurado', d: 'El resultado operativo del estado analítico (asignatura 1.1), ya normalizado y reexpresado.' },
          { k: 'Ajustar por partidas no operativas', d: 'Sacar del EBIT los resultados que no vienen de la operación (resultados por tenencia no operativos, resultados de inversiones financieras).' },
          { k: 'Capitalizar arrendamientos operativos', d: 'Sumar al EBIT el componente de interés implícito del alquiler capitalizado, para comparar empresas que compran vs. alquilan.' },
          { k: 'Tratar los gastos con carácter de inversión', d: 'I+D, publicidad institucional y capacitación que son inversión (no gasto) se ajustan para no castigar el resultado del período.' },
          { k: 'Aplicar la tasa efectiva', d: 'Multiplicar por (1 − t efectiva), la que la empresa realmente paga, no la nominal.' },
        ] },
        { t: 'formula', name: 'La equivalencia que debe cerrar', expr: 'EVA = (ROIC − WACC) × Capital = NOPAT − WACC × Capital', where: 'Ambos caminos dan el mismo número: es la prueba de coherencia del marco.', note: 'Si el EVA por diferencial y por resultado residual no coinciden, hay un error de construcción en el NOPAT o en el capital.' },
        { t: 'warn', md: 'El error más común: calcular el NOPAT con la tasa nominal en vez de la efectiva. La empresa con quebrantos acumulados, beneficios promocionales o diferencias temporarias tiene una tasa efectiva muy distinta de la nominal, y usar la equivocada mueve el NOPAT y todo el árbol de valor.' },
      ],
    },
    {
      title: 'ROIC frente a ROE y ROA: la anatomía de por qué gana',
      intro: 'El ROIC es el indicador maestro de eficiencia del capital, pero solo se entiende su superioridad viendo exactamente qué contamina a los otros dos.',
      blocks: [
        { t: 'p', md: 'El **ROE** (resultado neto sobre patrimonio) mezcla tres cosas: la eficiencia operativa, el efecto del apalancamiento y la fiscalidad. Una empresa puede subir su ROE simplemente tomando más deuda —sin crear un centavo de valor operativo—. El **ROA** (sobre activos totales) contamina con activos no operativos y con la caja excedente. El **ROIC** aísla la operación: solo capital operativo y solo NOPAT.' },
        { t: 'p', md: 'Pero el ROIC tampoco es infalible, y el analista debe conocer **dónde miente**: se distorsiona por la **antigüedad de los activos** (una planta amortizada infla el retorno, asignatura 1.1), por la **inflación no corregida** y por los **intangibles no capitalizados** (una empresa que invirtió años en su marca tiene un capital invertido subvaluado y un ROIC artificialmente alto). Por eso el ROIC se calcula sobre el estado analítico depurado, nunca sobre el contable.' },
        { t: 'quote', author: 'Michael Mauboussin', credential: 'Counterpoint Global — sobre ROIC', md: 'El ROIC y su persistencia en el tiempo son la mejor síntesis de la calidad de un negocio. Una empresa con ROIC alto y sostenido tiene una ventaja competitiva real; una con ROIC que revierte a la media, no.' },
      ],
    },
    {
      title: 'La familia EVA: nivel, margen y momentum',
      intro: 'El EVA no es un solo número, sino una familia de métricas que responden preguntas distintas de la gestión.',
      blocks: [
        { t: 'table', title: 'Cuándo usar cada métrica de la familia EVA', headers: ['Métrica', 'Qué responde', 'Cuándo usarla'], firstColLeft: true, rows: [
          ['EVA (nivel)', '¿Cuánto valor creé este período, en pesos?', 'Medir la magnitud absoluta'],
          ['EVA Margin (EVA/Ventas)', '¿Qué tan eficiente soy creando valor?', 'Comparar empresas de distinto tamaño'],
          ['EVA Momentum (ΔEVA/Ventas ant.)', '¿Mejoré respecto del período anterior?', 'Evaluar la gestión, no la herencia'],
          ['MVA (Σ EVA descontados)', '¿Cuánto valor acumulado creé?', 'Valuación y visión de largo plazo'],
        ], caption: 'El EVA Momentum resuelve un problema político real: un gerente que hereda un EVA alto luce bien sin hacer nada, y uno que hereda un EVA negativo puede crear muchísimo valor y aún mostrar EVA negativo. La variación es más justa que el nivel.' },
        { t: 'p', md: 'Complementan la familia el **CFROI** (retorno sobre base caja e inversión bruta ajustada por inflación, que corrige el sesgo de antigüedad a costa de complejidad) y el **GMROI** (margen bruto sobre inversión en inventario), clave en empresas comerciales donde el inventario es el activo central.' },
        { t: 'quote', author: 'G. Bennett Stewart III', credential: 'The EVA Momentum', md: 'El EVA Momentum es la única métrica de desempeño donde "más es siempre mejor" y "cero es realmente cero": mide la creación de valor incremental sobre las ventas, independiente del tamaño y de la herencia.' },
      ],
    },
    {
      title: 'El capital invertido: dos caminos que deben cerrar',
      intro: 'El capital invertido admite dos enfoques, y que ambos den el mismo número no es una coincidencia: es la prueba de que la clasificación es correcta.',
      blocks: [
        { t: 'table', title: 'Los dos enfoques del capital invertido', headers: ['Enfoque', 'Se arma sumando', 'Óptica'], firstColLeft: true, rows: [
          ['Operativo', 'Capital de trabajo + activos fijos a mercado + otros operativos', 'Cómo se usa el capital'],
          ['Financiero', 'Deuda financiera + patrimonio − caja excedente − no operativos', 'De dónde viene el capital'],
        ], caption: 'Ambos deben reconciliar. Si el operativo y el financiero difieren, hay una partida mal clasificada (operativa vs. no operativa, deuda financiera vs. pasivo operativo).' },
        { t: 'p', md: 'Decisiones finas que cambian el número: la **caja operativa mínima** integra el capital invertido (es necesaria para operar); el **excedente de caja** no (es un activo financiero). Los **activos no operativos** —el inmueble de uso personal, una inversión financiera— se excluyen del capital invertido y se valúan por separado. Y se usa el **capital promedio** del período, no el de cierre, para no distorsionar el ROIC según el momento de las inversiones.' },
        { t: 'warn', md: 'El error que infla el ROIC: dejar la caja excedente o los activos no operativos dentro del capital invertido cuando conviene, y sacarlos cuando no. La clasificación se define con criterio y se mantiene consistente; manipularla es maquillar el retorno.' },
      ],
    },
    {
      title: 'De EVA a MVA: el valor acumulado',
      intro: 'El EVA mide el valor creado en un período; el MVA, el valor acumulado a lo largo del tiempo. Juntos cierran la ecuación maestra.',
      blocks: [
        { t: 'formula', name: 'La ecuación maestra completa', expr: 'NOPAT/Capital = ROIC · ROIC − WACC = spread · spread × Capital = EVA · Σ EVA descontados = MVA', note: 'De la eficiencia (ROIC) al valor creado por período (EVA) al valor acumulado (MVA): una sola cadena.' },
        { t: 'p', md: 'El **MVA (Market Value Added)** es el valor presente de la corriente de EVA futuros: cuánto valor, en total, ha creado (o destruido) la empresa por encima del capital aportado. Una empresa con MVA positivo vale más que el capital que se le confió; una con MVA negativo, menos. Es la síntesis última de si el negocio, a lo largo de su vida, creó valor.' },
        { t: 'idea', md: 'La conexión con la valuación (asignatura 4.1): el valor de la firma es el capital invertido más el MVA (el valor presente de los EVA futuros). Por eso proyectar el EVA es equivalente a valuar la empresa —y por eso una empresa con spread persistentemente positivo vale mucho más que su capital contable—.' },
        { t: 'quote', author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'El valor de una empresa es el capital que invirtió más el valor presente de los retornos que espera generar por encima de su costo del capital. Todo lo demás —múltiplos, comparables, reglas del pulgar— son atajos hacia esa verdad.' },
      ],
    },
    {
      title: 'La anatomía obligatoria de cada indicador',
      intro: 'La regla pedagógica innegociable del programa: de cada número se exige su anatomía completa. Un ratio sin interpretación es ruido; una fórmula sin trazabilidad es un acto de fe.',
      blocks: [
        { t: 'steps', title: 'Los cinco componentes de la anatomía', items: [
          { k: 'Definición', d: 'Qué mide el indicador, en una frase clara.' },
          { k: 'Fórmula con trazabilidad', d: 'La fórmula y, sobre todo, de dónde sale cada término.' },
          { k: 'Valor que agrega', d: 'Qué decisión permite tomar y cuáles son sus umbrales.' },
          { k: 'Dónde miente', d: 'Sus debilidades y las condiciones en que engaña —la parte que casi nadie enseña—.' },
          { k: 'Flujograma', d: 'La cadena causa-efecto que lo conecta con el valor.' },
        ] },
        { t: 'idea', md: 'El componente "dónde miente" es el sello del programa. El ROIC miente con activos amortizados; el ROE, con apalancamiento; el EBITDA, ignorando la inversión de reposición; la TIR, con flujos no convencionales. Un egresado que conoce las debilidades de cada indicador no se deja engañar por ninguno —ni engaña con ninguno—.' },
        { t: 'quote', author: 'Bartley Madden', credential: 'CFROI Valuation', md: 'Ningún indicador es completo por sí solo. La disciplina está en conocer exactamente qué mide cada uno, qué omite, y en qué condiciones su señal se vuelve ruido. Esa conciencia de los límites es el verdadero conocimiento financiero.' },
      ],
    },
  ],
  expertos: [
    { author: 'Tim Koller', credential: 'McKinsey — Valuation (texto nuclear)', md: 'ROIC y crecimiento son los dos generadores de valor. Crecer solo crea valor si el retorno del capital nuevo supera su costo; de lo contrario, crecer destruye.' },
    { author: 'G. Bennett Stewart III', credential: 'Stern Stewart & Co.', md: 'El costo del capital no es opcional: es el rendimiento mínimo que los inversores podrían obtener en otra parte con el mismo riesgo. El EVA lo cobra explícitamente.' },
    { author: 'Bartley Madden', credential: 'CFROI Valuation', md: 'Los activos viejos, medidos a costo histórico, inflan artificialmente el retorno. El CFROI ajusta por inflación e inversión bruta para revelar el retorno económico real.' },
  ],
  caso: {
    titulo: 'El tablero de generación de valor',
    empresa: 'Maderas del Litoral S.A. — ¿crea o destruye valor?',
    contexto:
      'Con el estado analítico ya depurado (asignatura 1.1), el directorio quiere una respuesta directa: ¿la empresa crea o destruye valor, y cuánto?\n\nEl consultor construye el tablero completo —NOPAT, capital invertido, ROIC, spread, EVA, EVA Margin y EVA Momentum— y lo enfrenta al costo del capital (WACC ≈ 20 %, documentado en 3.1). El resultado es incómodo: la empresa apenas crea valor. El ROIC normalizado (21,3 %) supera al WACC por un margen fino, y el EVA es positivo pero pequeño.\n\nLa pregunta se vuelve estratégica: ¿qué palanca —más NOPAT, menos capital o menor WACC— mueve más el valor?',
    datos: [
      { t: 'table', title: 'Datos del tablero (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['EBIT normalizado', '3.850'],
        ['Tasa impositiva efectiva', '35%'],
        ['Capital invertido operativo', '11.770'],
        ['WACC', '20,0%'],
        ['Ventas', '42.000'],
        ['EVA del período anterior', '90'],
        ['Ventas del período anterior', '38.000'],
      ] },
    ],
    consigna: [
      '¿Cuál es el ROIC, el spread y el EVA de Maderas del Litoral?',
      '¿Cuánto valen el EVA Margin y el EVA Momentum, y qué dicen sobre la gestión?',
      '¿Qué palanca mueve más el EVA: +5 % de NOPAT, −10 % de capital o −1 pp de WACC?',
      '¿La empresa crea o destruye valor, y qué tan robusta es esa conclusión al costo del capital?',
    ],
    metodologia: [
      { k: 'Construir NOPAT y capital', d: 'Desde el estado analítico depurado; verificar que capital operativo y financiero reconcilien.' },
      { k: 'Calcular ROIC y spread', d: 'ROIC = NOPAT/capital; spread = ROIC − WACC.' },
      { k: 'Medir el valor', d: 'EVA en nivel, EVA Margin (comparabilidad) y EVA Momentum (mejora).' },
      { k: 'Simular las tres palancas', d: 'Recalcular el EVA moviendo NOPAT, capital y WACC para priorizar por impacto.' },
      { k: 'Concluir', d: 'Pronunciarse sobre creación de valor y sensibilidad al WACC.' },
    ],
  },
  model: {
    sheetTitle: 'Tablero de generación de valor y las tres palancas',
    intro:
      'Editá las celdas marfil. El tablero calcula ROIC, spread, EVA, EVA Margin y Momentum, y la matriz dinámica derrama el efecto de las tres palancas de valor sobre el EVA.',
    inputs: [
      { key: 'ebit', label: 'EBIT normalizado', value: 3850, fmt: 'money', unit: 'miles $' },
      { key: 't', label: 'Tasa impositiva efectiva', value: 0.35, fmt: 'pct' },
      { key: 'capital', label: 'Capital invertido operativo', value: 11770, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.2, fmt: 'pct1' },
      { key: 'ventas', label: 'Ventas', value: 42000, fmt: 'money' },
      { key: 'evaPrev', label: 'EVA del período anterior', value: 90, fmt: 'money' },
      { key: 'ventasPrev', label: 'Ventas del período anterior', value: 38000, fmt: 'money' },
    ],
    calcs: [
      { key: 'nopat', label: 'NOPAT', xl: '=[ebit]*(1-[t])', fmt: 'money' },
      { key: 'roic', label: 'ROIC', xl: '=[nopat]/[capital]', fmt: 'pct1', highlight: true },
      { key: 'spread', label: 'Spread (ROIC − WACC)', xl: '=[roic]-[wacc]', fmt: 'pct1', highlight: true },
      { key: 'eva', label: 'EVA', xl: '=[spread]*[capital]', fmt: 'money', highlight: true },
      { key: 'evaCheck', label: 'EVA (por resultado residual, control)', xl: '=[nopat]-[wacc]*[capital]', fmt: 'money', note: 'Debe coincidir con el EVA por diferencial.' },
      { key: 'evaMargin', label: 'EVA Margin', xl: '=[eva]/[ventas]', fmt: 'pct2' },
      { key: 'evaMomentum', label: 'EVA Momentum', xl: '=([eva]-[evaPrev])/[ventasPrev]', fmt: 'pct2' },
      { key: 'mva', label: 'MVA (perpetuidad, aprox.)', xl: '=[eva]/[wacc]', fmt: 'money', note: 'Simplificación: valor de una corriente perpetua de EVA sin crecimiento.' },
    ],
    spills: [
      {
        key: 'palancas',
        title: 'Las tres palancas de valor',
        columns: ['Palanca', 'EVA resultante', 'Δ EVA vs base', '% mejora'],
        xl: '=LET(base,[eva], nopat,[nopat], cap,[capital], w,[wacc], p1,(nopat*1.05)-w*cap, p2,nopat-w*(cap*0.9), p3,nopat-(w-0.01)*cap, nombres,{"+5% en NOPAT";"−10% en capital";"−1 pp en WACC"}, evas,VSTACK(p1,p2,p3), HSTACK(nombres,evas,evas-base,(evas-base)/ABS(base)))',
        formats: [undefined, 'money', 'money', 'pct'],
        rows: 3,
        note: 'Una sola fórmula recalcula el EVA bajo cada palanca (todas parten del NOPAT y el capital base) y ordena su impacto. Muestra cuál mueve más el valor.',
      },
    ],
    conclusions: [
      { label: 'Creación de valor', xl: '=IF([eva]>0,"CREA valor: EVA "&TEXT([eva],"#,##0")&" (spread "&TEXT([spread],"0.0%")&"). Pero es fino: pequeñas variaciones del WACC lo pueden dar vuelta.","DESTRUYE valor: EVA "&TEXT([eva],"#,##0")&" (spread "&TEXT([spread],"0.0%")&").")' },
      { label: 'Gestión (Momentum)', xl: '=IF([evaMomentum]>0,"EVA Momentum positivo ("&TEXT([evaMomentum],"0.00%")&"): la gestión mejoró la creación de valor respecto del período anterior.","EVA Momentum negativo: la creación de valor retrocedió.")' },
    ],
  },
  ejercicio: {
    titulo: 'EVA de una empresa comercial',
    enunciado:
      'La comercializadora **Sur Insumos** presenta los siguientes datos de gestión ya depurados. El directorio quiere saber si crea o destruye valor.',
    datos: [
      {
        t: 'table',
        title: 'Datos (miles de $)',
        headers: ['Concepto', 'Valor'],
        firstColLeft: true,
        rows: [
          ['EBIT', '1.800'],
          ['Tasa impositiva efectiva', '30%'],
          ['Capital invertido', '9.000'],
          ['WACC', '16%'],
        ],
      },
    ],
    preguntas: [
      '¿Cuál es el NOPAT y el ROIC?',
      '¿Cuál es el spread y el EVA?',
      '¿Crea o destruye valor?',
    ],
    solucion: [
      { t: 'formula', name: 'NOPAT', expr: 'NOPAT = 1.800 × (1 − 0,30) = 1.260', note: 'Resultado operativo después de impuestos.' },
      { t: 'formula', name: 'ROIC y spread', expr: 'ROIC = 1.260 ÷ 9.000 = 14,0 %   ·   spread = 14,0 % − 16,0 % = − 2,0 %', note: 'El retorno del capital no alcanza a cubrir su costo.' },
      { t: 'formula', name: 'EVA', expr: 'EVA = − 2,0 % × 9.000 = − 180', note: 'Equivale a NOPAT − WACC × Capital = 1.260 − 0,16 × 9.000 = 1.260 − 1.440 = − 180.' },
      { t: 'idea', md: 'Resultado: ROIC 14 % < WACC 16 %, EVA **−180**. La empresa **destruye valor**: es rentable en libros pero su capital rinde menos de lo que cuesta. Palancas: subir el NOPAT, bajar el capital invertido o reducir el WACC.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'En la ecuación maestra, toda palanca de gestión termina moviendo:', opciones: ['El precio de la acción directamente.', 'Uno de tres números: NOPAT, capital invertido o WACC.', 'Solo las ventas.', 'La tasa impositiva.'], correcta: 1, justificacion: 'El marco reduce la gestión a tres palancas: subir NOPAT, bajar capital o bajar WACC. Es el mapa mental del programa; las demás opciones son parciales o indirectas.' },
    { id: 'q2', pregunta: 'El EVA por diferencial y por resultado residual:', opciones: ['Dan resultados distintos.', 'Son equivalentes: (ROIC−WACC)×Capital = NOPAT − WACC×Capital.', 'Solo el primero es válido.', 'Dependen del sector.'], correcta: 1, justificacion: 'Ambas expresiones son algebraicamente idénticas y sirven de control cruzado. Si no coinciden, hay un error de cálculo.' },
    { id: 'q3', pregunta: '¿Por qué el ROIC es superior al ROE como medida de eficiencia del capital?', opciones: ['Porque siempre da más alto.', 'Porque aísla la operación del financiamiento; el ROE se infla con apalancamiento sin crear valor.', 'Porque es más fácil de calcular.', 'Porque no usa el NOPAT.'], correcta: 1, justificacion: 'El ROIC mide solo la eficiencia operativa del capital; el ROE mezcla apalancamiento y fiscalidad, y el endeudamiento puede inflarlo sin creación de valor. No es cuestión de magnitud ni de facilidad, y sí usa el NOPAT.' },
    { id: 'q4', pregunta: 'El NOPAT se define como:', opciones: ['Resultado neto + intereses.', 'EBIT × (1 − t efectiva).', 'EBITDA − impuestos.', 'Ventas − costos variables.'], correcta: 1, justificacion: 'NOPAT = EBIT × (1 − t efectiva): el resultado operativo después de impuestos, para todos los proveedores de capital. Las otras opciones son otras magnitudes (resultado, margen de contribución, etc.).' },
    { id: 'q5', pregunta: 'Para el ROIC se recomienda usar capital:', opciones: ['De cierre siempre.', 'Promedio del período.', 'De apertura siempre.', 'Máximo del período.'], correcta: 1, justificacion: 'El capital promedio evita distorsiones por el momento de las inversiones. Usar cierre o apertura sesga el ratio según cuándo ocurrieron los movimientos.' },
    { id: 'q6', pregunta: 'EVA Margin sirve principalmente para:', opciones: ['Medir liquidez.', 'Comparar la eficiencia de creación de valor entre empresas de distinto tamaño.', 'Calcular impuestos.', 'Medir el plazo de cobro.'], correcta: 1, justificacion: 'EVA Margin (EVA/Ventas) normaliza por tamaño y permite comparar. No mide liquidez, impuestos ni plazos.' },
    { id: 'q7', pregunta: '¿Por qué EVA Momentum es mejor que el EVA absoluto para evaluar gestión?', opciones: ['Porque es más grande.', 'Porque mide la mejora (variación) y no premia ni castiga la herencia recibida.', 'Porque ignora las ventas.', 'Porque no necesita el WACC.'], correcta: 1, justificacion: 'El Momentum mide el cambio del EVA: un gerente que hereda EVA negativo pero lo mejora mucho luce bien, y uno que vive de un EVA heredado, no. Usa ventas y depende del WACC (vía EVA).' },
    { id: 'q8', pregunta: 'En el caso, con ROIC 21,3 % y WACC 20 %, el EVA es:', opciones: ['Muy negativo.', 'Positivo pero fino, y sensible al costo del capital.', 'Exactamente cero.', 'Independiente del WACC.'], correcta: 1, justificacion: 'Spread de 1,3 pp sobre 11.770 da un EVA positivo pero pequeño (~150), que pequeñas variaciones del WACC pueden dar vuelta. Depende directamente del WACC.' },
    { id: 'q9', pregunta: 'El CFROI corrige principalmente:', opciones: ['El sesgo de antigüedad de los activos e inflación, sobre base caja.', 'El tipo de cambio.', 'La tasa impositiva.', 'El plazo de pago a proveedores.'], correcta: 0, justificacion: 'El CFROI trabaja sobre base caja e inversión bruta ajustada por inflación, corrigiendo el sesgo que la antigüedad y la inflación introducen en los retornos contables. No es un ajuste cambiario, fiscal ni de working capital.' },
    { id: 'q10', pregunta: 'El GMROI es especialmente relevante en:', opciones: ['Bancos.', 'Empresas comerciales y distribuidoras (retorno del margen sobre el inventario).', 'Empresas sin inventario.', 'El sector público.'], correcta: 1, justificacion: 'GMROI = margen bruto sobre inversión en inventario; es clave donde el inventario es el activo central (comercio, distribución). Poco útil sin inventario.' },
    { id: 'q11', pregunta: 'El MVA (Market Value Added) es conceptualmente:', opciones: ['El EVA de un solo período.', 'La suma de los EVA futuros descontados.', 'El capital invertido.', 'El NOPAT acumulado.'], correcta: 1, justificacion: 'El MVA es el valor presente de la corriente de EVA futuros: el valor creado acumulado. No es un EVA de un período, ni el capital, ni el NOPAT.' },
    { id: 'q12', pregunta: 'La “anatomía obligatoria” de un indicador incluye señalar:', opciones: ['Solo su fórmula.', 'Definición, fórmula con trazabilidad, valor que agrega, dónde miente y flujograma.', 'Solo su valor numérico.', 'El nombre del autor.'], correcta: 1, justificacion: 'La disciplina del programa exige la anatomía completa, incluyendo explícitamente “dónde miente” el indicador. La fórmula o el número solos son insuficientes.' },
    { id: 'q13', pregunta: 'Las dos formas de calcular el capital invertido (operativo y financiero):', opciones: ['Pueden diferir libremente.', 'Deben reconciliar; si no cierran, hay un error de clasificación.', 'Solo la financiera es válida.', 'Dependen del auditor.'], correcta: 1, justificacion: 'Ambos enfoques deben dar el mismo capital invertido; una diferencia señala una partida mal clasificada (operativa vs. no operativa, deuda vs. pasivo operativo).' },
    { id: 'q14', pregunta: 'El ROIC calculado sobre el estado contable (no analítico) tiende a:', opciones: ['Ser más confiable.', 'Distorsionarse por activos amortizados, inflación no corregida e intangibles no capitalizados.', 'Ser idéntico al analítico.', 'No poder calcularse.'], correcta: 1, justificacion: 'El ROIC contable se infla por la planta amortizada y la falta de reexpresión (ver 1.1). Por eso se calcula sobre el estado analítico depurado.' },
    { id: 'q15', pregunta: 'Según el marco de McKinsey, el valor se crea cuando la empresa:', opciones: ['Crece a cualquier costo.', 'Invierte capital a retornos que superan su costo (ROIC > WACC).', 'Minimiza impuestos únicamente.', 'Maximiza las ventas.'], correcta: 1, justificacion: 'El valor nace del spread positivo entre el retorno del capital y su costo. Crecer sin ese spread destruye valor; ventas o impuestos por sí solos no lo garantizan.' },
    { id: 'q16', pregunta: 'El “spread” en la ecuación de valor es:', opciones: ['ROIC × WACC.', 'ROIC − WACC.', 'ROIC ÷ WACC.', 'WACC − ROIC.'], correcta: 1, justificacion: 'El spread es la diferencia ROIC − WACC: positivo crea valor, negativo lo destruye. No es producto, cociente ni al revés.' },
    { id: 'q17', pregunta: 'El MVA (Market Value Added) equivale a:', opciones: ['El EVA de un período.', 'La suma de los EVA futuros descontados.', 'El capital invertido.', 'Las ventas.'], correcta: 1, justificacion: 'El MVA es el valor presente de la corriente de EVA futuros: el valor creado acumulado. No es un EVA puntual ni el capital.' },
    { id: 'q18', pregunta: 'El NOPAT se calcula con la tasa impositiva:', opciones: ['Nominal.', 'Efectiva.', 'Cero.', 'Del competidor.'], correcta: 1, justificacion: 'El NOPAT usa la tasa efectiva (la que realmente paga la empresa), no la nominal, para reflejar el resultado operativo después de impuestos real.' },
    { id: 'q19', pregunta: 'El EVA por “resultado residual” se expresa como:', opciones: ['NOPAT + WACC × Capital.', 'NOPAT − WACC × Capital.', 'Ventas − costos.', 'ROIC × Capital.'], correcta: 1, justificacion: 'EVA = NOPAT − (WACC × Capital): el resultado operativo menos el cargo por el capital empleado. Equivale a (ROIC − WACC) × Capital.' },
    { id: 'q20', pregunta: 'Frente al ROIC, el ROA tiene la desventaja de:', opciones: ['Ser más limpio.', 'Contaminarse con activos no operativos y caja.', 'No usar activos.', 'Ignorar el resultado.'], correcta: 1, justificacion: 'El ROA mezcla todos los activos (operativos o no) y la caja; el ROIC aísla el capital operativo. Por eso el ROIC es más limpio para medir eficiencia.' },
    { id: 'q21', pregunta: 'El EVA Momentum se calcula como:', opciones: ['EVA ÷ Ventas.', 'Δ EVA ÷ Ventas del período anterior.', 'EVA × WACC.', 'NOPAT ÷ Capital.'], correcta: 1, justificacion: 'El Momentum mide la mejora: variación del EVA sobre las ventas previas. EVA/Ventas es el EVA Margin; NOPAT/Capital es el ROIC.' },
    { id: 'q22', pregunta: 'Reducir el capital de trabajo, con el mismo NOPAT, produce:', opciones: ['Menor ROIC.', 'Mayor ROIC (baja el denominador).', 'Ningún efecto.', 'Menor NOPAT.'], correcta: 1, justificacion: 'Menos capital invertido con igual NOPAT eleva el ROIC (y el EVA). Es una de las tres palancas de valor.' },
    { id: 'q23', pregunta: 'Los intangibles autogenerados no capitalizados tienden a:', opciones: ['No afectar el ROIC.', 'Distorsionar el ROIC al subvaluar el capital invertido.', 'Bajar el ROIC siempre.', 'Aumentar el WACC.'], correcta: 1, justificacion: 'Si una inversión real (marca, I+D) no está en el capital, el denominador queda chico y el ROIC se infla. Es una de las debilidades a corregir en el estado analítico.' },
    { id: 'q24', pregunta: 'El CFROI se calcula sobre:', opciones: ['Base devengada y valor de libros.', 'Base caja e inversión bruta ajustada por inflación.', 'Solo las ventas.', 'El patrimonio contable.'], correcta: 1, justificacion: 'El CFROI trabaja sobre flujos de caja e inversión bruta ajustada por inflación, corrigiendo el sesgo de antigüedad. No usa base devengada ni valor de libros.' },
    { id: 'q25', pregunta: 'La ecuación maestra reduce la gestión financiera a mover:', opciones: ['Diez indicadores.', 'Tres números: NOPAT, capital invertido y WACC.', 'Solo las ventas.', 'El patrimonio.'], correcta: 1, justificacion: 'Toda palanca sube el NOPAT, baja el capital o baja el WACC. Ese es el mapa mental del marco de valor.' },
    { id: 'q26', pregunta: 'El EVA Margin permite:', opciones: ['Medir liquidez.', 'Comparar la creación de valor entre empresas de distinto tamaño.', 'Calcular impuestos.', 'Medir la deuda.'], correcta: 1, justificacion: 'EVA Margin (EVA/Ventas) normaliza por tamaño y habilita comparaciones. No mide liquidez, impuestos ni deuda.' },
    { id: 'q27', pregunta: 'Un ROIC del 25% con un WACC del 20% implica:', opciones: ['Destrucción de valor.', 'Creación de valor (spread positivo de 5 pp).', 'Valor neutro.', 'Que falta información.'], correcta: 1, justificacion: 'ROIC (25%) > WACC (20%) da spread +5 pp y EVA positivo: crea valor. No es neutro ni destructivo.' },
    { id: 'q28', pregunta: 'Los arrendamientos operativos, para el análisis, suelen:', opciones: ['Ignorarse.', 'Capitalizarse como deuda equivalente y sumar el activo al capital invertido.', 'Sumarse a las ventas.', 'Restarse del patrimonio.'], correcta: 1, justificacion: 'El análisis capitaliza los arrendamientos operativos (deuda + activo equivalentes) para comparar empresas que compran vs. alquilan. No se ignoran ni afectan ventas.' },
    { id: 'q29', pregunta: 'Según Rappaport, las utilidades contables son “una opinión” y el flujo de caja descontado “un hecho”, lo que implica que:', opciones: ['El resultado contable es lo único que importa.', 'Los indicadores de valor buscan acercar la gestión al flujo de caja.', 'No hay que medir nada.', 'El EVA es irrelevante.'], correcta: 1, justificacion: 'Rappaport subraya la primacía del flujo sobre el devengado; los indicadores de valor (EVA, CFROI) acercan la gestión a esa realidad de caja.' },
    { id: 'q30', pregunta: 'El GMROI es más relevante en empresas donde el activo central es:', opciones: ['La planta industrial.', 'El inventario (comercio y distribución).', 'La marca.', 'La deuda.'], correcta: 1, justificacion: 'GMROI = margen bruto sobre inversión en inventario; brilla donde el inventario es el activo clave. En industria intensiva en planta pesan más ROIC/CFROI.' },
  ],
  bibliografia: [
    'Koller, T., Goedhart, M. & Wessels, D. — *Valuation* (McKinsey) — texto nuclear',
    'Stewart, G. B. — *The Quest for Value*',
    'Stern, Shiely & Ross — *The EVA Challenge*',
    'Madden, B. — *CFROI Valuation*',
    'Rappaport, A. — *Creating Shareholder Value*',
    'Damodaran, A. — *Corporate Finance: Theory and Practice*',
    'López Dumrauf, G. — *Finanzas Corporativas: un enfoque latinoamericano*',
  ],
}
