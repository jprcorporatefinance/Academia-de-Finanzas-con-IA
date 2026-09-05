import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.10 — Comunicación de resultados: informe didáctico y tablero
// Fuente metodológica: skills JPR `informe-didactico-html` y
// `corporate-finance-frontend-react`.
// ============================================================================
export const av10_comunicacion: Asignatura = {
  cod: 'A.10',
  slug: 'av-10',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Comunicación de Resultados: el informe didáctico y el tablero que el directorio sí usa',
  horas: '24 h · 10 teóricas / 14 prácticas',
  correlativas: 'Correlativas: 2.1 y 3.4 · Módulo avanzado',
  framework: 'Estándar JPR de informe didáctico · React + Recharts · principios de visualización analítica',
  resumen:
    'Un análisis que la dirección no entiende no existe. Este módulo enseña a construir el último eslabón de la cadena: el informe didáctico en HTML donde cada número viaja con su fórmula y su lectura económica, y el tablero interactivo en React donde la dirección mueve los supuestos y ve el efecto sobre el valor. No es diseño: es la disciplina de hacer auditable y accionable un resultado técnico.',
  objetivos: [
    'Aplicar la estructura fija del informe didáctico JPR y justificar por qué cada sección va donde va.',
    'Elegir el gráfico correcto según la pregunta que responde, no según el gusto.',
    'Distinguir sistemáticamente hecho de hipótesis, y registrado de implícito.',
    'Construir la doble comprobación de cada cifra clave por dos caminos independientes.',
    'Diseñar los cuatro módulos obligatorios de un tablero financiero en React.',
    'Traducir cada hallazgo a dinero y cerrar con la palanca: cuánto vale un punto de mejora.',
  ],
  sections: [
    {
      title: 'Por qué la comunicación es parte del análisis y no un adorno',
      intro:
        'El entregable no es el modelo: es la decisión que el modelo habilita. Si la dirección no puede reconstruir de dónde sale un número, no lo va a usar para decidir — y con razón.',
      blocks: [
        { t: 'p', md: 'El objetivo del informe es que **una persona no técnica entienda cómo se determina cada número, de dónde sale y qué decisión habilita**. Eso no es simplificar: es la exigencia más alta que se le puede poner a un análisis, porque obliga a que cada cifra tenga trazabilidad hasta el registro primario.' },
        { t: 'idea', md: 'El criterio de calidad no es "quedó lindo". Es: **¿puede el director financiero de la empresa reconstruir este número mañana, sin nosotros, y llegar al mismo resultado?** Si la respuesta es no, el informe está incompleto por más elegante que sea.' },
        { t: 'steps', title: 'Los cinco pasos previos a escribir una línea', items: [
          { k: '1 · Datos primero', d: 'Leer el ERP por conexión directa o los archivos del cliente. Reconstruir cada cifra desde los registros primarios —movimientos, asientos, comprobantes—, nunca desde un reporte resumido si se puede evitar.' },
          { k: '2 · Doble comprobación', d: 'Cada total clave debe cerrar por dos caminos independientes: suma por producto = suma por mes; entradas − salidas = existencia. Si no cierra, se explica la diferencia EN el informe, no se esconde.' },
          { k: '3 · Separar hecho de hipótesis', d: 'Lo que dice el sistema va como dato. Lo que se infiere va con esa etiqueta y, si cambia una conclusión, se presenta como escenarios A/B con su rango.' },
          { k: '4 · Anotar las fuentes', d: 'Modelo, filtros, fechas de corte y fecha de lectura, para el pie del informe. Sin eso, el informe no es reproducible.' },
          { k: '5 · Elegir el registro', d: 'Voseo si el destinatario es argentino; usted formal para el exterior. Se decide antes de escribir, no después.' },
        ] },
      ],
    },
    {
      title: 'La estructura fija del informe didáctico',
      intro:
        'Nueve secciones en un orden que no se altera. Cada título de sección lleva un número y un tipo, y el titular es una frase que ya dice la conclusión.',
      blocks: [
        { t: 'ol', items: [
          '**Masthead.** Firma, cliente, tema y período. Título como nombre propio de dos a cinco palabras —"El kilo que no llega", "El costo vuelve a los libros"—, subtítulo de una frase con la tesis, y barra de metadatos: fuente, período, unidad y moneda, quién lo preparó.',
          '**En una página.** Cuatro indicadores en tarjetas (valor grande + una línea de lectura) y un párrafo con la tesis. Es lo único que un director ocupado va a leer con seguridad: tiene que bastarse solo.',
          '**El método.** Cómo se determina la cifra clave, con la fórmula en bloque monoespaciado y una nota sobre cuándo el dato mensual es ruidoso y el acumulado es el confiable.',
          '**El proceso.** Flujograma con cuadros y flechas que muestra de dónde se parte y a dónde se llega, con magnitudes y porcentajes en cada cuadro. Las pérdidas como cuadros punteados debajo; los circuitos de retorno como una franja aparte.',
          '**Gráficos**, uno por sección, cada uno con título, subtítulo con la unidad y la instrucción de interacción, y un pie con la aclaración técnica.',
          '**Tabla de respaldo** debajo del gráfico principal, con exactamente la misma cifra que el gráfico.',
          '**Cuánto vale.** La traducción a dinero, con el costo unitario usado y su origen. Cuando hay incertidumbre, dos escenarios y "el precio de no saber".',
          '**Lo que hay que cambiar.** Tres a cinco decisiones en prosa, con negrita al inicio de cada una y responsable cuando se conoce.',
          '**Fuentes y método** en el pie, con la firma del responsable.',
        ] },
        { t: 'idea', md: '**La regla de las tres apariciones:** cada cifra clave aparece **tres veces y coherentes** — en el indicador de la primera página, en el gráfico, y en la tabla de respaldo. Si las tres no coinciden, hay un error de armado que el lector va a encontrar antes que nosotros.' },
        { t: 'warn', md: 'Sin viñetas en la prosa. Las listas van solo dentro de tablas o del flujograma. Una conclusión incómoda se dice con datos y sin adjetivos: «el margen de la línea B fue negativo en once de doce meses» pesa más que «la línea B tiene problemas serios de rentabilidad».' },
      ],
    },
    {
      title: 'Qué gráfico para qué pregunta',
      intro:
        'La elección del gráfico no es estética: cada forma responde una pregunta distinta, y usar la equivocada oculta lo que se quería mostrar.',
      blocks: [
        { t: 'table', title: 'La tabla de decisión', headers: ['Pregunta que responde', 'Gráfico', 'Reglas'], firstColLeft: true, rows: [
          ['¿Cómo se compone un resultado? ¿De A a B qué se sumó y qué se restó?', 'Cascada (waterfall)', 'Totales en el color primario, restas en rojo, ajustes en el acento; conectores punteados; etiqueta con signo sobre cada barra'],
          ['¿Por dónde fluye y cómo se reparte entre conceptos relacionados?', 'Cintas (sankey)', 'Ancho = cantidad; columnas por etapa; nodos con etiqueta y total; espaciar columnas de forma desigual para que entren las etiquetas'],
          ['¿Cuánto es X contra Y?', 'Barras horizontales apiladas', 'Apilar "registrado" contra "implícito"; etiqueta al final con valor y porcentaje'],
          ['¿Cómo evoluciona en el tiempo?', 'Líneas', 'Línea fina = mensual, gruesa = acumulado, misma tonalidad; línea de referencia al estándar; etiqueta del último valor'],
          ['¿Dos variables se relacionan y una tercera pesa?', 'Dispersión con burbujas', 'x e y = las dos variables, área = la tercera; etiqueta junto a cada burbuja'],
          ['¿Qué pasa si…?', 'Barras apiladas por escenario', 'Una fila por escenario, mismas categorías y mismos colores'],
        ] },
        { t: 'warn', md: '**Sin tooltip no se publica.** Todo elemento gráfico lleva su valor exacto, su fórmula o su composición al pasar el cursor. Un gráfico sin tooltip obliga al lector a confiar; con tooltip, le permite verificar. La diferencia entre las dos cosas es todo el valor del informe.' },
        { t: 'ul', items: [
          'Nunca 3D, nunca degradés, nunca efectos: distorsionan la percepción de magnitud sin agregar información.',
          'Grilla horizontal fina y sola. La vertical rara vez ayuda y siempre ensucia.',
          'Formato numérico según el país del cliente, unidades y moneda siempre explícitas, cifras alineadas con dígitos de ancho fijo en las tablas.',
          'Los colores se leen de variables definidas una sola vez, nunca escritos literalmente en cada gráfico: así la pieza entera cambia de identidad sin tocar el contenido.',
        ] },
      ],
    },
    {
      title: 'El tablero interactivo: los cuatro módulos obligatorios',
      intro:
        'El informe cuenta lo que pasó. El tablero deja que la dirección pregunte «¿y si…?» y vea la respuesta en el momento. Son dos entregables distintos, no dos versiones del mismo.',
      blocks: [
        { t: 'h', text: 'Módulo 1 — Árbol DuPont y rentabilidad' },
        { t: 'p', md: 'Nodo raíz en el ROE, descomposición de **cinco factores** (carga fiscal × carga de intereses × margen operativo × rotación × multiplicador), **drill-down al hacer clic** en cada nodo, y variación interanual con color según la dirección del cambio. Consume el bloque de DuPont del JSON de diagnóstico.' },
        { t: 'h', text: 'Módulo 2 — Monitor de capital de trabajo' },
        { t: 'p', md: 'Tres bloques: línea de tiempo horizontal con días de inventario, de cobro, de proveedores y ciclo neto; evolución histórica de los tres en los últimos 12 a 24 meses; y tabla de rotación por producto con semáforo —rojo por quiebre o rotación crítica, ámbar por sobrestock, verde por rotación sana—. En distribución, agrupado por rubro con la matriz ABC/XYZ.' },
        { t: 'h', text: 'Módulo 3 — Simulador de sensibilidad y valuación' },
        { t: 'p', md: 'Controles deslizantes de WACC, crecimiento perpetuo y tipo de cambio, con recálculo en tiempo real del valor de la firma y del patrimonio. Mapa de calor de la sensibilidad cruzada WACC × g. Es el módulo que más cambia la conversación: la dirección deja de discutir el valor y empieza a discutir los supuestos.' },
        { t: 'h', text: 'Módulo 4 — Radar de riesgo con distribuciones' },
        { t: 'p', md: 'Resultado de la simulación de Monte Carlo: histograma del valor con los percentiles 10, 50 y 90 marcados, gráfico de abanico de la proyección de caja, y probabilidad de los eventos que importan —quiebre de caja, perforación de covenant, EVA negativo—.' },
        { t: 'idea', md: 'Los cuatro módulos consumen **el mismo JSON** que produce el motor de diagnóstico y el de proyección. Esa es la clave arquitectónica: el tablero no recalcula nada, muestra. Si el tablero y el informe pueden dar números distintos, el diseño está mal.' },
        { t: 'ul', items: [
          'Estado explícito de **carga, error y vacío** en cada módulo: un tablero que muestra cero cuando en realidad falló la lectura de datos es peor que no tener tablero.',
          'Tipado estricto de los datos que entran, y datos de ejemplo incluidos para que el módulo se pueda revisar sin conexión al sistema del cliente.',
          'Todo control deslizante muestra el valor actual, el rango y el efecto: mover el WACC sin ver el efecto sobre el valor no es interactividad, es decoración.',
        ] },
      ],
    },
    {
      title: 'Registrado contra implícito: la distinción que ordena todo el informe',
      intro:
        'La mayoría de los hallazgos valiosos no están registrados en ninguna cuenta: se deducen por diferencia. Decirlo explícitamente es lo que hace defendible el informe.',
      blocks: [
        { t: 'p', md: '**Registrado** es lo que el sistema tiene explícito: una merma cargada, un descuento facturado, una previsión contabilizada. **Implícito** es lo que se deduce por diferencia entre dos mediciones: la merma que no se cargó pero que separa el kardex del inventario físico, el descuento que no se facturó pero que separa el precio de lista del precio neto obtenido.' },
        { t: 'idea', md: 'El hallazgo casi siempre vive en lo implícito, y la resistencia del cliente también. Por eso la presentación tiene que hacer visible **el camino del cálculo**: no «hay una merma del 4 %», sino «entraron 100, salieron 92, se registró una merma de 4, y quedan 4 sin explicación — que a costo unitario de X son Y pesos por mes».' },
        { t: 'warn', md: 'Cuando una cifra no cierra por los dos caminos, hay exactamente dos posibilidades, y ninguna de las dos es "error de carga": o el sistema no refleja el movimiento, o el movimiento no está bien registrado. El informe **declara las dos** y nombra el dato que las separaría. Elegir la lectura conveniente convierte una medición en una opinión.' },
      ],
    },
    {
      title: 'Cerrar con la palanca',
      intro:
        'Un informe que termina en el diagnóstico está a mitad de camino. El cierre es la traducción a dinero y la decisión que habilita.',
      blocks: [
        { t: 'steps', title: 'Las tres preguntas del cierre', items: [
          { k: '¿Cuánto vale?', d: 'La traducción a dinero con el costo unitario usado y su origen explícito. Si hay incertidumbre sobre ese costo, dos escenarios y la diferencia entre ellos: "el precio de no saber".' },
          { k: '¿Cuánto vale un punto?', d: 'Cuánto dinero por mes representa mejorar un punto porcentual del indicador. Es lo que convierte una meta abstracta en un objetivo de gestión.' },
          { k: '¿Quién y cuándo?', d: 'Tres a cinco decisiones concretas, con responsable cuando se conoce. Una recomendación sin responsable es una observación.' },
        ] },
        { t: 'formula', name: 'El patrón del cierre cuantificado', expr: 'Valor de la mejora = Δ indicador × factor de conversión × base × períodos', where: 'Ejemplo: 1 día de ciclo × (Ventas/365) × WACC = EVA anual que libera cada día de ciclo', note: 'Toda recomendación del informe tiene que poder expresarse en esta forma. Si no se puede, no está lista para ir al informe.' },
        { t: 'idea', md: 'La prueba final del informe: **¿puede el lector decir, después de leerlo, qué va a hacer distinto el lunes?** Si no, el análisis fue correcto y el trabajo quedó incompleto.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Por qué éste es el módulo que más cambia el resultado comercial de una consultoría.',
      blocks: [
        { t: 'p', md: 'La consultoría de finanzas corporativas tiene un problema estructural: **el valor del trabajo es proporcional a su profundidad técnica, y su adopción es inversamente proporcional a ella**. El informe didáctico existe para romper esa relación — no bajando el nivel técnico, sino haciendo que cada paso del razonamiento sea reconstruible por quien tiene que decidir.' },
        { t: 'chain', title: 'La cadena completa del trabajo', nodes: ['Datos primarios del sistema', 'Motor de cálculo verificado', 'JSON de resultados con fórmula e interpretación por número', 'Informe didáctico + tablero', 'Decisión de la dirección'], caption: 'Cada número del JSON viaja con su fórmula, su cálculo con números concretos y su lectura económica. El relato del entregable se construye SOBRE eso, no aparte: por eso el informe no puede contradecir al modelo.' },
        { t: 'warn', md: 'El error más caro de este módulo no es estético: es **presentar una hipótesis con la misma tipografía que un dato**. Cuando el cliente descubre —y siempre descubre— que un número que tomó por hecho era una inferencia, pierde confianza en todos los demás, incluidos los que sí eran datos. La honestidad sobre la incertidumbre no debilita el informe: es lo único que lo sostiene.' },
      ],
    },
  ],
  expertos: [
    { author: 'Edward Tufte', credential: 'Yale University — The Visual Display of Quantitative Information', md: 'La excelencia gráfica consiste en comunicar ideas complejas con claridad, precisión y eficiencia. Todo elemento que no aporta información se la quita a los que sí la aportan.' },
    { author: 'Barbara Minto', credential: 'The Pyramid Principle', md: 'Empezar por la conclusión no es una concesión al lector apurado: es la única estructura que permite verificar si el argumento efectivamente la sostiene. El orden del descubrimiento no es el orden de la comunicación.' },
    { author: 'Tim Koller', credential: 'McKinsey & Company', md: 'Un análisis de valuación que el equipo directivo no puede reconstruir no cambia decisiones. Su influencia no depende de su sofisticación sino de que los supuestos sean visibles y discutibles uno por uno.' },
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — Director General', md: 'La prueba de que un informe está terminado es que el director financiero del cliente pueda rehacer cualquier número sin llamarnos. Si necesita llamarnos, lo que entregamos no fue un análisis: fue una dependencia.' },
  ],
  caso: {
    titulo: 'El informe de una página que la familia sí va a leer',
    empresa: 'Maderas del Litoral S.A. — comunicación del diagnóstico integral',
    contexto:
      'El diagnóstico está terminado. El ROIC normalizado es del 21,3 % contra un ROIC contable del 58,1 %; el WACC es del 20,0 %; el EVA es de +150 y el RONIC de la ampliación es del 15 %. Técnicamente el trabajo está cerrado.\n\nEl problema es otro: el hermano mayor entiende de madera y de máquinas, no de finanzas. La del medio maneja comercial y desconfía de todo lo que no sea una factura. El menor no participa de la gestión y solo quiere saber cuánto vale su parte. Si el informe se escribe para un colega, ninguno de los tres va a decidir nada.\n\nEl trabajo es construir el informe didáctico y el tablero: explicar por qué el ROIC contable del 58 % es un espejismo producido por una planta amortizada, mostrar el camino desde la utilidad contable hasta el valor económico, y llegar a la conclusión incómoda —la ampliación destruye valor— con una aritmética que los tres puedan seguir sin ayuda.',
    datos: [
      { t: 'table', title: 'Las cifras que hay que comunicar', headers: ['Indicador', 'Valor', 'Dificultad de comunicación'], firstColLeft: true, rows: [
        ['ROIC contable', '58,1 %', 'Parece excelente y es engañoso: hay que explicar el mecanismo'],
        ['ROIC normalizado', '21,3 %', 'Hay que justificar cada ajuste, uno por uno'],
        ['WACC', '20,0 %', 'El concepto de costo del capital propio es contraintuitivo para un dueño'],
        ['Spread', '+1,3 pp', 'La diferencia entre "ganar plata" y "crear valor"'],
        ['EVA', '+150', 'Un número chico que resume todo el trabajo'],
        ['RONIC de la ampliación', '15,0 %', 'La conclusión incómoda: el proyecto más deseado destruye valor'],
        ['Ciclo de conversión de efectivo', '43 días', 'La palanca más accionable y la más fácil de explicar'],
      ] },
    ],
    consigna: [
      'Escribir el masthead y la sección "en una página": título como nombre propio, tesis en una frase y cuatro indicadores con su lectura.',
      'Diseñar el flujograma que va de la utilidad contable al EVA, con la magnitud de cada ajuste.',
      'Elegir el gráfico para tres preguntas: cómo se llega del EBIT contable al EVA, cuánto pesa cada día de ciclo, y qué pasa con el valor si el WACC se mueve.',
      'Redactar las tres a cinco decisiones del cierre, cada una con su cuantificación en pesos y su responsable.',
      'Definir los cuatro módulos del tablero y qué campo del JSON de diagnóstico consume cada uno.',
    ],
    metodologia: [
      { k: 'Escribir la tesis primero', d: 'Una frase que ya diga la conclusión. Si no se puede escribir, el análisis todavía no está cerrado.' },
      { k: 'Un gráfico por pregunta', d: 'Elegir la forma según la tabla de decisión, no según el gusto ni según lo que quedó lindo la vez pasada.' },
      { k: 'Verificar las tres apariciones', d: 'Cada cifra clave en el indicador, en el gráfico y en la tabla, con el mismo valor.' },
      { k: 'Marcar hipótesis', d: 'Todo lo inferido, etiquetado. Y donde una hipótesis cambia una conclusión, presentar escenarios A/B con su rango.' },
      { k: 'Cerrar con dinero y responsable', d: 'Cada recomendación cuantificada y asignada. Sin eso es una observación, no una recomendación.' },
    ],
  },
  model: {
    sheetTitle: 'Del diagnóstico al informe: cuantificación de las palancas comunicadas',
    intro:
      'Editá las celdas marfil. El modelo produce las cifras exactas que van al informe: el puente de la utilidad contable al EVA, el valor de cada punto de mejora por palanca, y la sensibilidad del valor al costo de capital que alimenta el módulo 3 del tablero.',
    inputs: [
      { key: 'ebitContable', label: 'EBIT contable', value: 4200, fmt: 'money', unit: 'miles $' },
      { key: 'ajusteSueldo', label: 'Ajuste: sueldo del dueño a mercado', value: -220, fmt: 'money' },
      { key: 'ajustePersonales', label: 'Ajuste: gastos personales reclasificados', value: -95, fmt: 'money' },
      { key: 'ajusteAlquiler', label: 'Ajuste: alquiler a valor de mercado', value: -35, fmt: 'money' },
      { key: 'tasa', label: 'Tasa impositiva efectiva', value: 0.35, fmt: 'pct' },
      { key: 'capital', label: 'Capital invertido (bienes de uso a mercado)', value: 11770, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.200, fmt: 'pct1' },
      { key: 'ventas', label: 'Ventas del ejercicio', value: 42000, fmt: 'money' },
      { key: 'cce', label: 'Ciclo de conversión de efectivo', value: 43, fmt: 'days' },
      { key: 'capitalContable', label: 'Capital invertido a valor contable', value: 7230, fmt: 'money', note: 'Con la planta amortizada: el denominador que produce el ROIC contable engañoso.' },
    ],
    calcs: [
      { key: 'ebitNorm', label: 'EBIT normalizado', xl: '=[ebitContable]+[ajusteSueldo]+[ajustePersonales]+[ajusteAlquiler]', fmt: 'money', highlight: true },
      { key: 'nopat', label: 'NOPAT normalizado', xl: '=[ebitNorm]*(1-[tasa])', fmt: 'money', highlight: true },
      { key: 'roicContable', label: 'ROIC contable (el espejismo)', xl: '=[ebitContable]*(1-[tasa])/[capitalContable]', fmt: 'pct1' },
      { key: 'roicNorm', label: 'ROIC normalizado', xl: '=[nopat]/[capital]', fmt: 'pct1', highlight: true },
      { key: 'spread', label: 'Spread ROIC − WACC', xl: '=[roicNorm]-[wacc]', fmt: 'pct1', highlight: true },
      { key: 'eva', label: 'EVA', xl: '=[capital]*[spread]', fmt: 'money', highlight: true },
      { key: 'brechaRoic', label: 'Brecha entre el ROIC contable y el real', xl: '=[roicContable]-[roicNorm]', fmt: 'pct1', note: 'La cifra que el informe tiene que explicar: 100 % producida por el denominador, no por la operación.' },
      { key: 'evaPorDiaCce', label: 'EVA que libera cada día de ciclo', xl: '=[ventas]/365*[wacc]', fmt: 'money2', highlight: true },
      { key: 'evaPorPuntoMargen', label: 'EVA que aporta cada punto de margen operativo', xl: '=[ventas]*0.01*(1-[tasa])', fmt: 'money2' },
      { key: 'evaPorPuntoWacc', label: 'EVA que aporta cada punto menos de WACC', xl: '=[capital]*0.01', fmt: 'money2' },
    ],
    spills: [
      {
        key: 'puente',
        title: 'El puente que va al flujograma del informe: de la utilidad contable al EVA',
        columns: ['Paso', 'Importe', 'Qué se explica'],
        xl: '=LET(nom,{"EBIT contable";"− Sueldo del dueño a mercado";"− Gastos personales";"− Alquiler a mercado";"= EBIT normalizado";"− Impuesto";"= NOPAT";"− Cargo por el capital";"= EVA"}, imp,VSTACK([ebitContable],[ajusteSueldo],[ajustePersonales],[ajusteAlquiler],[ebitNorm],-[ebitNorm]*[tasa],[nopat],-[capital]*[wacc],[eva]), txt,{"Lo que muestran los libros";"El dueño se paga distinto del mercado";"La empresa paga consumo de la familia";"El inmueble de la familia no se cobra";"El resultado real de la operación";"Lo que se lleva el fisco";"La utilidad operativa que queda";"Lo que exige el capital puesto a trabajar";"Lo que sobra después de pagarle a todos"}, HSTACK(nom,imp,txt))',
        formats: [undefined, 'money', undefined],
        rows: 9,
        note: 'Esta tabla ES el flujograma del informe: cada fila es un cuadro, cada importe una flecha, y la tercera columna la leyenda que hace entendible el paso a una persona no técnica.',
      },
      {
        key: 'palancas',
        title: 'Cuánto vale un punto de mejora en cada palanca',
        columns: ['Palanca', 'Unidad de mejora', 'EVA que aporta', 'Ranking'],
        xl: '=LET(nom,{"Ciclo de conversión de efectivo";"Margen operativo";"Costo de capital"}, uni,{"1 día menos";"1 punto más";"1 punto menos"}, val,VSTACK([evaPorDiaCce],[evaPorPuntoMargen],[evaPorPuntoWacc]), rk,RANK(val,val,0), SORTBY(HSTACK(nom,uni,val,rk),val,-1))',
        formats: [undefined, undefined, 'money2', 'num'],
        rows: 3,
        note: 'El cierre del informe sale de acá: las palancas ordenadas por lo que aporta cada unidad de mejora, en pesos. Convierte "hay que mejorar el capital de trabajo" en "cada día vale tanto".',
      },
      {
        key: 'sensibilidadWacc',
        title: 'Sensibilidad del EVA al costo de capital (alimenta el módulo 3 del tablero)',
        columns: ['WACC', 'Spread', 'EVA', 'Veredicto'],
        xl: '=LET(w,SEQUENCE(9,1,0.16,0.01), sp,[roicNorm]-w, ev,[capital]*sp, ver,IF(sp>0,"Crea valor","Destruye valor"), HSTACK(w,sp,ev,ver))',
        formats: ['pct1', 'pct1', 'money', undefined],
        rows: 9,
        note: 'El control deslizante del tablero recorre exactamente este rango. Muestra a la dirección algo que ningún informe estático transmite: qué tan cerca del punto de quiebre está la empresa.',
      },
    ],
    conclusions: [
      { label: 'La tesis del informe', xl: '="Maderas del Litoral muestra un ROIC contable de "&TEXT([roicContable],"0.0%")&" que en realidad es de "&TEXT([roicNorm],"0.0%")&": una brecha de "&TEXT([brechaRoic],"0.0%")&" producida íntegramente por el denominador —la planta amortizada— y no por la operación. Contra un costo de capital de "&TEXT([wacc],"0.0%")&", la empresa crea "&TEXT([eva],"#,##0")&" miles $ de valor por año: es rentable, pero está al borde de no serlo."' },
      { label: 'La palanca del cierre', xl: '="Cada día de ciclo de conversión de efectivo vale "&TEXT([evaPorDiaCce],"#,##0.00")&" miles $ de EVA por año. Bajar el ciclo de "&TEXT([cce],"0")&" a 35 días aporta "&TEXT(([cce]-35)*[evaPorDiaCce],"#,##0")&" miles $ — más que el EVA total del ejercicio, y sin vender un peso más ni invertir un peso."' },
      { label: 'Nota de método para el pie', xl: '="Fuente: sistema de gestión, período completo del ejercicio, moneda homogénea de cierre. Ajustes de normalización declarados uno por uno en la sección 3. Los bienes de uso se valúan a mercado; el ROIC contable se muestra únicamente para explicar la brecha, no como indicador de gestión."' },
    ],
  },
  ejercicio: {
    titulo: 'Reescribir un hallazgo para que se pueda decidir',
    enunciado:
      'Un borrador de informe contiene esta frase: «Se detectaron ineficiencias significativas en la gestión de inventarios, con una rotación por debajo de los estándares del sector, lo que impacta negativamente en la rentabilidad del capital empleado.»\n\nLos datos detrás de la frase son: inventario promedio de 3.770 (miles), costo de ventas de 27.000, días de inventario de 42 contra 28 del sector, WACC del 20 % y ventas de 42.000.',
    datos: [
      { t: 'table', title: 'Datos disponibles', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Inventario promedio', '3.770 miles $'],
        ['Costo de ventas', '27.000 miles $'],
        ['Días de inventario propios', '42'],
        ['Días de inventario del sector', '28'],
        ['WACC', '20 %'],
        ['Ventas', '42.000 miles $'],
      ] },
    ],
    preguntas: [
      '¿Qué le falta a la frase original para habilitar una decisión?',
      'Cuantificar el capital inmovilizado en exceso y el EVA que cuesta.',
      'Reescribir el hallazgo con el estándar del módulo.',
      '¿Qué gráfico acompañaría este hallazgo y por qué?',
    ],
    solucion: [
      { t: 'p', md: 'A la frase original le falta **todo lo que permite decidir**: cuánto es "significativas", cuánto capital está en juego, cuánto cuesta por año, qué se haría distinto y quién lo haría. Contiene cuatro adjetivos y cero números. Un director puede estar de acuerdo con ella y no cambiar nada — y de hecho es lo que ocurre.' },
      { t: 'formula', name: 'Exceso de inventario', expr: 'Inventario objetivo = CMV × 28/365 = 27.000 × 0,0767 = 2.071\nExceso = 3.770 − 2.071 = 1.699 miles $' },
      { t: 'formula', name: 'EVA que cuesta el exceso', expr: 'EVA atrapado = 1.699 × 20 % = 340 miles $ por año' },
      { t: 'idea', md: '**La reescritura:** «El inventario promedio es de 3.770 mil contra 2.071 mil que corresponderían a los 28 días del sector: **1.699 mil de capital inmovilizado en exceso**, que al costo de capital del 20 % cuestan **340 mil por año** — más del doble del EVA total del ejercicio. Cada día de inventario que se elimina libera 74 mil de capital y aporta 15 mil de EVA anual. **Prioridad:** aplicar la matriz ABC/XYZ sobre el stock y llevar los productos AX a stock mínimo. **Responsable:** gerencia de operaciones, primer trimestre.»' },
      { t: 'p', md: 'El gráfico que acompaña es una **barra horizontal apilada**: inventario necesario contra inventario en exceso, con la etiqueta del valor y el porcentaje al final. Responde exactamente la pregunta «¿cuánto es X contra Y?». Una línea de evolución sería un error acá: la pregunta no es cómo cambió en el tiempo, es cuánto sobra hoy.' },
      { t: 'warn', md: 'Nótese que el hallazgo reescrito **no es más largo**: es más específico. La longitud de un informe no correlaciona con su utilidad; la densidad de números verificables, sí.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El objetivo del informe didáctico es que el lector no técnico entienda:', opciones: ['El resultado final.', 'Cómo se determina cada número, de dónde sale y qué decisión habilita.', 'La metodología académica.', 'El software utilizado.'], correcta: 1, justificacion: 'No es simplificar: es la exigencia más alta que se le puede poner a un análisis, porque obliga a que cada cifra tenga trazabilidad hasta el registro primario.' },
    { id: 'q2', pregunta: 'El criterio de calidad de un informe es:', opciones: ['Que quede visualmente atractivo.', 'Que el cliente pueda reconstruir cualquier número mañana, sin nosotros, y llegar al mismo resultado.', 'Que tenga más de veinte páginas.', 'Que use el mayor número de indicadores.'], correcta: 1, justificacion: 'Si necesita llamarnos para rehacer un número, lo entregado no fue un análisis sino una dependencia.' },
    { id: 'q3', pregunta: 'La doble comprobación exige que:', opciones: ['Dos personas revisen el informe.', 'Cada total clave cierre por dos caminos independientes; si no cierra, se explica la diferencia EN el informe.', 'Se use dos softwares.', 'Se revise dos veces.'], correcta: 1, justificacion: 'Por ejemplo: suma por producto = suma por mes, o entradas − salidas = existencia. Esconder la diferencia invalida todo lo demás.' },
    { id: 'q4', pregunta: 'Cuando una cifra no cierra por los dos caminos, las posibilidades son:', opciones: ['Siempre un error de carga.', 'O el sistema no refleja el movimiento, o el movimiento no está bien registrado — y el informe declara las dos.', 'Que falte información.', 'Que el modelo esté mal.'], correcta: 1, justificacion: 'Elegir la lectura conveniente convierte una medición en una opinión. Nombrar el dato que separaría las dos hipótesis es parte del trabajo.' },
    { id: 'q5', pregunta: 'El título del informe debe ser:', opciones: ['Una descripción técnica completa.', 'Un nombre propio de dos a cinco palabras.', 'El nombre del cliente y la fecha.', 'La metodología usada.'], correcta: 1, justificacion: 'Un título como "El kilo que no llega" identifica el trabajo y transmite la tesis; un título descriptivo largo no se recuerda ni se cita.' },
    { id: 'q6', pregunta: 'La sección "en una página" contiene:', opciones: ['Todo el análisis resumido.', 'Cuatro indicadores en tarjetas con su lectura y un párrafo con la tesis, y tiene que bastarse sola.', 'El índice.', 'Las conclusiones metodológicas.'], correcta: 1, justificacion: 'Es lo único que un director ocupado va a leer con seguridad; si no se basta sola, el resto del informe se pierde.' },
    { id: 'q7', pregunta: 'La "regla de las tres apariciones" establece que cada cifra clave:', opciones: ['Se repite tres veces en el texto.', 'Aparece coherente en el indicador, en el gráfico y en la tabla de respaldo.', 'Se calcula de tres formas.', 'Se muestra en tres unidades.'], correcta: 1, justificacion: 'Si las tres no coinciden, hay un error de armado que el lector va a encontrar antes que nosotros — y con él pierde la confianza en el resto.' },
    { id: 'q8', pregunta: 'Para responder "¿cómo se compone un resultado, qué se sumó y qué se restó?" el gráfico correcto es:', opciones: ['Líneas.', 'Cascada (waterfall).', 'Torta.', 'Dispersión.'], correcta: 1, justificacion: 'La cascada muestra el camino de A a B con cada suma y cada resta identificada, que es exactamente la pregunta planteada.' },
    { id: 'q9', pregunta: 'Para responder "¿por dónde fluye y cómo se reparte entre conceptos relacionados?" corresponde:', opciones: ['Barras apiladas.', 'Cintas (sankey).', 'Líneas.', 'Radar.'], correcta: 1, justificacion: 'El ancho de la cinta representa la cantidad y las columnas las etapas, lo que hace visible la proporción de cada derivación.' },
    { id: 'q10', pregunta: 'Un gráfico sin tooltip:', opciones: ['Es aceptable si es simple.', 'No se publica: obliga al lector a confiar en vez de permitirle verificar.', 'Es preferible para imprimir.', 'Mejora la legibilidad.'], correcta: 1, justificacion: 'La diferencia entre confiar y verificar es todo el valor del informe: el tooltip lleva el valor exacto, la fórmula o la composición.' },
    { id: 'q11', pregunta: 'Los efectos 3D y los degradés en gráficos financieros:', opciones: ['Mejoran la comprensión.', 'Distorsionan la percepción de magnitud sin agregar información.', 'Son obligatorios en presentaciones.', 'Ayudan a diferenciar series.'], correcta: 1, justificacion: 'Todo elemento que no aporta información se la quita a los que sí la aportan; en gráficos de magnitud, además, la distorsiona activamente.' },
    { id: 'q12', pregunta: 'Los colores de los gráficos deben:', opciones: ['Escribirse literalmente en cada gráfico.', 'Leerse de variables definidas una sola vez.', 'Elegirse gráfico por gráfico.', 'Ser siempre los del software.'], correcta: 1, justificacion: 'Así la pieza entera cambia de identidad visual sin tocar el contenido, y se garantiza que el mismo concepto tenga el mismo color en todo el informe.' },
    { id: 'q13', pregunta: 'El módulo 1 del tablero (árbol DuPont) debe tener como raíz:', opciones: ['El EBITDA.', 'El ROE, con descomposición de cinco factores y drill-down al hacer clic.', 'Las ventas.', 'El EVA.'], correcta: 1, justificacion: 'La descomposición de cinco factores separa carga fiscal, carga de intereses, margen operativo, rotación y multiplicador de apalancamiento.' },
    { id: 'q14', pregunta: 'El semáforo del monitor de capital de trabajo marca en ámbar:', opciones: ['Quiebre de stock.', 'Sobrestock o rotación en zona de atención.', 'Rotación saludable.', 'Productos discontinuados.'], correcta: 1, justificacion: 'El rojo se reserva para quiebre de stock o rotación por debajo del umbral crítico; el verde, para rotación sana.' },
    { id: 'q15', pregunta: 'El módulo 3 (simulador de sensibilidad) cambia la conversación porque:', opciones: ['Es más rápido.', 'La dirección deja de discutir el valor y empieza a discutir los supuestos.', 'Usa menos datos.', 'No requiere explicación.'], correcta: 1, justificacion: 'Cuando los supuestos son manipulables en vivo, la discusión se traslada a donde efectivamente vive el desacuerdo.' },
    { id: 'q16', pregunta: 'El módulo 4 (radar de riesgo) muestra:', opciones: ['El promedio de los escenarios.', 'El histograma del valor con P10/P50/P90, el abanico de la proyección y las probabilidades de los eventos que importan.', 'Solo el caso base.', 'La evolución histórica.'], correcta: 1, justificacion: 'Los eventos relevantes son quiebre de caja, perforación de covenant y EVA negativo: probabilidades, no promedios.' },
    { id: 'q17', pregunta: 'La clave arquitectónica del tablero es que:', opciones: ['Recalcula todo en el navegador.', 'Consume el mismo JSON que el informe y no recalcula: muestra.', 'Se conecta directo a la base de datos.', 'Usa su propio motor de cálculo.'], correcta: 1, justificacion: 'Si el tablero y el informe pueden dar números distintos, el diseño está mal: la única fuente de verdad debe ser el motor de cálculo.' },
    { id: 'q18', pregunta: 'Un tablero que muestra cero cuando falló la lectura de datos:', opciones: ['Es aceptable.', 'Es peor que no tener tablero: por eso cada módulo necesita estado explícito de carga, error y vacío.', 'Se corrige solo.', 'Es un problema menor.'], correcta: 1, justificacion: 'Un cero falso se lee como información y produce decisiones equivocadas; un estado de error produce una pregunta, que es lo correcto.' },
    { id: 'q19', pregunta: 'La distinción "registrado / implícito" separa:', opciones: ['Lo aprobado de lo pendiente.', 'Lo que el sistema tiene explícito de lo que se deduce por diferencia.', 'Lo interno de lo externo.', 'Lo contable de lo fiscal.'], correcta: 1, justificacion: 'El hallazgo valioso casi siempre vive en lo implícito, y por eso el informe tiene que hacer visible el camino del cálculo que lo produjo.' },
    { id: 'q20', pregunta: 'Presentar una hipótesis con la misma tipografía que un dato:', opciones: ['Simplifica la lectura.', 'Es el error más caro: cuando el cliente lo descubre, pierde confianza en todos los números, incluidos los que eran datos.', 'Es indiferente.', 'Se corrige en el pie.'], correcta: 1, justificacion: 'La honestidad sobre la incertidumbre no debilita el informe: es lo único que lo sostiene frente a una revisión seria.' },
    { id: 'q21', pregunta: '"El precio de no saber" se refiere a:', opciones: ['El costo del estudio.', 'La diferencia entre los dos escenarios cuando hay incertidumbre sobre un dato clave.', 'El costo de oportunidad del capital.', 'La prima de riesgo.'], correcta: 1, justificacion: 'Cuantificar esa diferencia convierte "falta información" en una decisión de inversión: cuánto vale conseguir el dato.' },
    { id: 'q22', pregunta: 'Una recomendación sin responsable asignado es:', opciones: ['Suficiente.', 'Una observación, no una recomendación.', 'Más objetiva.', 'Preferible por prudencia.'], correcta: 1, justificacion: 'El cierre del informe exige tres a cinco decisiones concretas, cada una con su cuantificación y su responsable cuando se conoce.' },
    { id: 'q23', pregunta: 'El patrón del cierre cuantificado es:', opciones: ['Δ indicador × factor de conversión × base × períodos.', 'Ventas − costos.', 'ROIC − WACC.', 'Activo − pasivo.'], correcta: 0, justificacion: 'Toda recomendación tiene que poder expresarse en esa forma; si no se puede, no está lista para ir al informe.' },
    { id: 'q24', pregunta: 'La prueba final del informe es:', opciones: ['Que no tenga errores de ortografía.', 'Que el lector pueda decir qué va a hacer distinto el lunes.', 'Que tenga bibliografía.', 'Que sea extenso.'], correcta: 1, justificacion: 'Si no, el análisis fue correcto y el trabajo quedó incompleto: el entregable no es el modelo, es la decisión que habilita.' },
    { id: 'q25', pregunta: 'El problema estructural de la consultoría que este módulo resuelve es:', opciones: ['El precio del servicio.', 'Que el valor del trabajo es proporcional a su profundidad técnica y su adopción es inversamente proporcional a ella.', 'La falta de datos.', 'La competencia.'], correcta: 1, justificacion: 'El informe didáctico rompe esa relación sin bajar el nivel técnico: hace que cada paso del razonamiento sea reconstruible por quien decide.' },
    { id: 'q26', pregunta: 'En la cadena del trabajo, cada número del JSON de resultados viaja con:', opciones: ['Solo su valor.', 'Su fórmula, su cálculo con números concretos y su interpretación económica.', 'Su fuente únicamente.', 'Su fecha.'], correcta: 1, justificacion: 'El relato del entregable se construye SOBRE eso, no aparte. Por eso el informe no puede contradecir al modelo.' },
    { id: 'q27', pregunta: 'La prosa del informe:', opciones: ['Debe usar viñetas para ser clara.', 'No lleva viñetas: las listas van solo dentro de tablas o del flujograma.', 'Debe evitar los números.', 'Debe ser lo más breve posible.'], correcta: 1, justificacion: 'La viñeta fragmenta el argumento y deja al lector la tarea de reconstruir la conexión entre los puntos, que es justamente lo que el informe debería hacer.' },
    { id: 'q28', pregunta: 'Una conclusión incómoda se comunica:', opciones: ['Suavizándola con adjetivos.', 'Con datos y sin adjetivos.', 'Omitiéndola del resumen.', 'Solo verbalmente.'], correcta: 1, justificacion: '"El margen de la línea B fue negativo en once de doce meses" pesa más y es más defendible que "la línea B tiene problemas serios de rentabilidad".' },
    { id: 'q29', pregunta: 'La longitud de un informe:', opciones: ['Correlaciona con su utilidad.', 'No correlaciona con su utilidad; la densidad de números verificables sí.', 'Debe ser fija.', 'Debe superar las veinte páginas.'], correcta: 1, justificacion: 'Un hallazgo bien escrito no es más largo que uno mal escrito: es más específico.' },
    { id: 'q30', pregunta: 'El registro lingüístico del informe (voseo o usted) se define:', opciones: ['Al final, al revisar.', 'Antes de escribir, según el destinatario.', 'Según la preferencia del redactor.', 'Es indistinto.'], correcta: 1, justificacion: 'Voseo para destinatarios argentinos, usted formal para el exterior. Cambiarlo después obliga a reescribir y produce inconsistencias que se notan.' },
  ],
  bibliografia: [
    'Tufte, E. — *The Visual Display of Quantitative Information* y *Envisioning Information*',
    'Minto, B. — *The Pyramid Principle* (estructura del argumento ejecutivo)',
    'Few, S. — *Information Dashboard Design*',
    'Knaflic, C. N. — *Storytelling with Data*',
    'Koller, Goedhart & Wessels — *Valuation*, capítulos sobre comunicación de resultados al directorio',
    'Documentación de React y Recharts (composición de visualizaciones tipadas)',
    'Estándar interno JPR de informe didáctico HTML y de tablero financiero',
  ],
}
