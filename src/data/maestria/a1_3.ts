import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 1.3 — Métodos Cuantitativos y Programación en Python para
// Finanzas Corporativas
// ============================================================================
export const a1_3: Asignatura = {
  cod: '1.3',
  slug: 'a1-3',
  cuatrimestre: 1,
  fase: 'Descriptiva · ¿Qué sucedió?',
  nombre: 'Métodos Cuantitativos y Programación en Python para Finanzas Corporativas',
  horas: '36 h · 12 teóricas / 24 prácticas',
  correlativas: 'Sin correlativas · Primer cuatrimestre',
  framework: 'Hilpisch · McKinney · Hyndman · Wooldridge',
  resumen:
    'Programar en Python con solvencia para implementar, verificar y automatizar cálculos financieros; aplicar el instrumental estadístico con conciencia de sus supuestos; y trabajar de manera reproducible y auditable.',
  objetivos: [
    'Programar en Python con solvencia suficiente para implementar, verificar y automatizar cálculos financieros.',
    'Dominar la matemática financiera: tasas, rentas, VAN, TIR y sus patologías, TIRM, duración y convexidad.',
    'Aplicar estadística y regresión con diagnóstico de supuestos, orientada a betas y estructuras de costos.',
    'Modelar series temporales y elegir el método según la función de pérdida.',
    'Trabajar de forma reproducible y auditable: un modelo no auditable no es profesionalmente utilizable.',
  ],
  sections: [
    {
      title: 'Python como herramienta financiera reproducible',
      intro: 'No se trata de aprender a programar en abstracto, sino de construir cálculo financiero verificable y automatizable.',
      blocks: [
        { t: 'p', md: 'El instrumental base es **pandas** para manipular datos y **numpy** para el cálculo numérico. Sobre ellos se construyen funciones financieras propias, en **entornos reproducibles**, con **control de versiones** y —la pieza que separa al profesional del aficionado— **pruebas unitarias** aplicadas a cada función.' },
        { t: 'idea', md: 'El motor de cálculo se escribe dos veces a propósito: una en Python (verificable con tests) y otra en Excel con matrices dinámicas (asignatura 2.3). Ambas deben coincidir número a número. Si no coinciden, una de las dos miente y hay que descubrir cuál.' },
        { t: 'quote', author: 'Yves Hilpisch', credential: 'Python for Finance (O’Reilly)', md: 'Python se volvió la lengua franca de las finanzas cuantitativas no por elegancia sintáctica, sino porque permite ir del prototipo a la producción sin cambiar de herramienta, con un ecosistema de librerías numéricas maduro.' },
      ],
    },
    {
      title: 'Matemática financiera',
      intro: 'El núcleo del valor tiempo del dinero, sin el cual ningún flujo se puede comparar.',
      blocks: [
        { t: 'formula', name: 'Tasa efectiva anual desde una nominal', expr: 'TEA = (1 + TNA ÷ m)^m − 1', where: 'm = cantidad de capitalizaciones por año', note: 'La nominal (TNA) no es comparable entre sí; la efectiva sí. Confundirlas es un error de principiante caro.' },
        { t: 'formula', name: 'Tasa real (ecuación de Fisher)', expr: 'r_real = (1 + r_nominal) ÷ (1 + π) − 1', where: 'π = inflación del período', note: 'Bajo alta inflación, una tasa nominal enorme puede esconder una tasa real modesta o negativa.' },
        { t: 'formula', name: 'Valor Actual Neto', expr: 'VAN = Σ Flujo_t ÷ (1 + r)^t', where: 't = 0 … n · r = costo del capital', note: 'Regla: se crea valor si VAN > 0. Es el criterio soberano de la decisión de inversión.' },
        { t: 'ul', items: [
          '**TIR y sus patologías:** la tasa que anula el VAN. Falla con flujos no convencionales (múltiples cambios de signo → múltiples TIR) y al comparar proyectos de distinta escala o duración.',
          '**TIRM (TIR modificada):** corrige el supuesto de reinversión de la TIR usando una tasa de reinversión explícita.',
          '**Duración y convexidad:** sensibilidad del valor de un flujo a la tasa; la duración es la primera derivada, la convexidad la segunda.',
          '**Rentas y sistemas de amortización:** francés, alemán y americano, y su distinto perfil de intereses y capital.',
        ] },
        { t: 'warn', md: 'La TIR es intuitiva pero traicionera: ante proyectos mutuamente excluyentes de distinta escala, la regla correcta es el **VAN**, no la TIR. La TIR más alta no siempre crea más valor.' },
      ],
    },
    {
      title: 'Estadística aplicada y regresión',
      intro: 'Los números financieros vienen con incertidumbre; ignorarla es tan peligroso como no medirla.',
      blocks: [
        { t: 'ul', items: [
          'Distribuciones relevantes en finanzas e **inferencia** (intervalos, contrastes) con conciencia de sus supuestos.',
          '**Correlación y sus límites:** correlación no es causalidad, y una correlación alta puede ser espuria.',
          '**Regresión simple y múltiple** con **diagnóstico de supuestos** (linealidad, homocedasticidad, normalidad de residuos, no multicolinealidad).',
          'Aplicaciones directas: **estimación de betas** (regresión de retornos) y **descomposición de estructuras de costos** (fijo vs. variable por regresión sobre volumen).',
        ] },
        { t: 'quote', author: 'Jeffrey Wooldridge', credential: 'Introductory Econometrics', md: 'Un coeficiente de regresión sin el examen de sus supuestos es un número sin garantía. El diagnóstico no es un trámite posterior: es parte del resultado.' },
      ],
    },
    {
      title: 'Series temporales y pronóstico',
      intro: 'Proyectar ventas, demanda o mora exige modelos que respeten la estructura temporal del dato.',
      blocks: [
        { t: 'ul', items: [
          '**Estacionariedad** y descomposición (tendencia, estacionalidad, ruido).',
          'Modelos **autorregresivos**, **suavizado exponencial** y **Holt-Winters** para series con tendencia y estacionalidad.',
          '**Métricas de error** (MAE, RMSE, MAPE) y su elección **según la función de pérdida** del negocio: no es lo mismo penalizar un faltante que un excedente de stock.',
        ] },
        { t: 'quote', author: 'Rob Hyndman', credential: 'Forecasting: Principles and Practice', md: 'El mejor modelo no es el más complejo, sino el que pronostica mejor fuera de la muestra. La elección de la métrica de error debe reflejar el costo real de equivocarse.' },
      ],
    },
    {
      title: 'Álgebra lineal y reproducibilidad',
      intro: 'La base matemática de la consolidación de modelos y del aprendizaje automático que viene en el tercer cuatrimestre.',
      blocks: [
        { t: 'p', md: 'Las **operaciones matriciales** consolidan modelos (varias unidades, varios escenarios) y son el motor del cálculo de **redes neuronales** —que en la asignatura 2.3 se construyen incluso dentro de la planilla—. Entender la mecánica matricial antes de delegarla en una librería es el fundamento pedagógico del programa.' },
        { t: 'formula', name: 'Producto matricial', expr: 'C = A · B  →  c_ij = Σ_k a_ik · b_kj', note: 'La misma operación (MMULT en Excel, @ en numpy) que consolida un modelo o propaga una capa de una red neuronal.' },
        { t: 'idea', md: 'Reproducibilidad = entorno declarado + control de versiones + pruebas unitarias. Un cálculo que no se puede volver a correr y verificar no es un resultado: es una opinión con decimales.' },
      ],
    },
  ],
  expertos: [
    { author: 'Yves Hilpisch', credential: 'The Python Quants', md: 'La ventaja de Python en finanzas es el continuo entre exploración interactiva y sistema productivo: el mismo código que prototipás es el que después automatizás.' },
    { author: 'Wes McKinney', credential: 'creador de pandas', md: 'La mayor parte del trabajo analítico real es preparación y limpieza de datos. Una herramienta que hace fácil lo tedioso libera tiempo para el pensamiento.' },
    { author: 'Rob Hyndman', credential: 'Monash University', md: 'Evaluá siempre el pronóstico contra un conjunto de prueba que el modelo no vio. La bondad de ajuste dentro de la muestra engaña.' },
  ],
  caso: {
    titulo: '¿Conviene ampliar la planta? El VAN de la inversión',
    empresa: 'Maderas del Litoral S.A. — evaluación del proyecto de ampliación',
    contexto:
      'Los tres hermanos evalúan invertir 8.000 (miles) en una nueva línea de aberturas. El proyecto promete flujos incrementales durante cinco años, con recupero parcial de capital de trabajo al final.\n\nLa pregunta del directorio es simple y letal: ¿este proyecto crea o destruye valor? El consultor debe construir la función en Python (con tests) y su espejo en Excel con matrices dinámicas, descontar los flujos al costo del capital de la empresa (WACC ≈ 20 %, que se documenta en la asignatura 3.1) y pronunciarse con VAN, TIR y período de recupero.\n\nEl resultado anticipa el gran tema del cuarto cuatrimestre: crecer no siempre crea valor.',
    datos: [
      { t: 'table', title: 'Flujo de fondos del proyecto (miles de $)', headers: ['Momento', 'Flujo de fondos'], firstColLeft: true, rows: [
        ['Año 0 — inversión', '−8.000'],
        ['Año 1', '1.900'],
        ['Año 2', '2.100'],
        ['Año 3', '2.300'],
        ['Año 4', '2.400'],
        ['Año 5 (incl. recupero)', '3.800'],
      ] },
      { t: 'table', title: 'Parámetros', headers: ['Parámetro', 'Valor'], firstColLeft: true, rows: [
        ['Costo del capital (WACC)', '20%'],
        ['TNA de referencia (pesos)', '85%'],
        ['Capitalizaciones por año', '12'],
        ['Inflación anual', '60%'],
      ] },
    ],
    consigna: [
      '¿Cuál es el VAN del proyecto al 20 %? ¿Crea o destruye valor?',
      '¿Cuál es la TIR y cómo se compara con el costo del capital?',
      '¿Cuál es la tasa efectiva anual de la TNA y cuál la tasa real bajo inflación del 60 %?',
      '¿Por qué la TIR (≈ 15 %) menor que el WACC anticipa la paradoja del crecimiento (asignatura 4.2)?',
    ],
    metodologia: [
      { k: 'Descontar (VAN)', d: 'Traer cada flujo a valor presente con el factor 1/(1+r)^t y sumarlos. VAN > 0 crea valor.' },
      { k: 'Resolver la TIR', d: 'Encontrar la tasa que anula el VAN; barrer un rango de tasas y ubicar el cruce por cero (dynamic array), sin depender de una función caja-negra.' },
      { k: 'Homogeneizar tasas', d: 'Convertir la nominal a efectiva y a real (Fisher) para comparar peras con peras bajo inflación.' },
      { k: 'Verificar (dos motores)', d: 'Contrastar el resultado de Python (con tests) contra el Excel de matrices dinámicas; deben coincidir.' },
      { k: 'Concluir', d: 'Pronunciarse con VAN, TIR y el índice de rentabilidad, y conectar con el costo del capital y el crecimiento.' },
    ],
  },
  model: {
    sheetTitle: 'Matemática financiera del proyecto de ampliación',
    intro:
      'Editá los flujos y las tasas (celdas marfil). El VAN, la TIR y el perfil descontado se calculan con matrices dinámicas: VSTACK arma el vector de flujos, SEQUENCE los años, y MAP/LAMBDA barren las tasas para hallar la TIR sin función caja-negra.',
    inputs: [
      { key: 'f0', label: 'Año 0 — inversión', value: -8000, fmt: 'money', unit: 'miles $' },
      { key: 'f1', label: 'Año 1', value: 1900, fmt: 'money' },
      { key: 'f2', label: 'Año 2', value: 2100, fmt: 'money' },
      { key: 'f3', label: 'Año 3', value: 2300, fmt: 'money' },
      { key: 'f4', label: 'Año 4', value: 2400, fmt: 'money' },
      { key: 'f5', label: 'Año 5 (incl. recupero)', value: 3800, fmt: 'money' },
      { key: 'wacc', label: 'Costo del capital (WACC)', value: 0.2, fmt: 'pct' },
      { key: 'tna', label: 'TNA de referencia (pesos)', value: 0.85, fmt: 'pct' },
      { key: 'm', label: 'Capitalizaciones por año', value: 12, fmt: 'num' },
      { key: 'infl', label: 'Inflación anual', value: 0.6, fmt: 'pct' },
    ],
    calcs: [
      { key: 'tea', label: 'Tasa efectiva anual (TEA)', xl: '=(1+[tna]/[m])^[m]-1', fmt: 'pct1' },
      { key: 'tasaReal', label: 'Tasa real (Fisher, sobre TEA)', xl: '=(1+[tea])/(1+[infl])-1', fmt: 'pct1' },
      { key: 'van', label: 'VAN al WACC', xl: '=LET(cf,VSTACK([f0],[f1],[f2],[f3],[f4],[f5]), t,SEQUENCE(6,1,0), SUM(cf/(1+[wacc])^t))', fmt: 'money', highlight: true },
      { key: 'tir', label: 'TIR (barrido de tasas)', xl: '=LET(cf,VSTACK([f0],[f1],[f2],[f3],[f4],[f5]), t,SEQUENCE(6,1,0), rates,SEQUENCE(2001,1,0,0.0005), npv,MAP(rates,LAMBDA(x,SUM(cf/(1+x)^t))), INDEX(rates,MATCH(MIN(ABS(npv)),ABS(npv),0)))', fmt: 'pct1', highlight: true },
      { key: 'pi', label: 'Índice de rentabilidad (PI)', xl: '=([van]-[f0])/(-[f0])', fmt: 'num2' },
    ],
    spills: [
      {
        key: 'perfil',
        title: 'Perfil del flujo descontado',
        columns: ['Año', 'Flujo de fondos', 'Factor de descuento', 'Valor presente'],
        xl: '=LET(t,SEQUENCE(6,1,0), cf,VSTACK([f0],[f1],[f2],[f3],[f4],[f5]), fac,1/(1+[wacc])^t, HSTACK(t,cf,fac,cf*fac))',
        formats: ['num', 'money', 'coef', 'money'],
        rows: 6,
        note: 'SEQUENCE genera los años 0–5; VSTACK arma el vector de flujos; el factor y el valor presente se calculan de una sola vez. La suma de la última columna es el VAN.',
      },
    ],
    conclusions: [
      { label: 'Decisión', xl: '=IF([van]>0,"VAN positivo ("&TEXT([van],"#,##0")&"): el proyecto CREA valor. TIR "&TEXT([tir],"0.0%")&" > WACC "&TEXT([wacc],"0.0%")&".","VAN negativo ("&TEXT([van],"#,##0")&"): el proyecto DESTRUYE valor. TIR "&TEXT([tir],"0.0%")&" < WACC "&TEXT([wacc],"0.0%")&" — crecer así resta, no suma (anticipa la paradoja de la 4.2).")' },
      { label: 'Tasas', xl: '="TNA "&TEXT([tna],"0.0%")&" equivale a una TEA de "&TEXT([tea],"0.0%")&"; en términos reales (inflación "&TEXT([infl],"0.0%")&") la tasa es "&TEXT([tasaReal],"0.0%")&". La magnitud nominal engaña."' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Regla de decisión del VAN:', opciones: ['Se acepta el proyecto si VAN < 0.', 'Se crea valor si VAN > 0.', 'El VAN debe igualar a la TIR.', 'El VAN solo sirve si no hay inflación.'], correcta: 1, justificacion: 'Se crea valor cuando el VAN es positivo (los flujos descontados superan la inversión). VAN < 0 destruye valor; el VAN no “iguala” a la TIR y es aplicable con o sin inflación (usando tasas reales o nominales coherentes).' },
    { id: 'q2', pregunta: 'La tasa efectiva anual (TEA) desde una nominal (TNA) capitalizable m veces es:', opciones: ['TNA × m', '(1 + TNA/m)^m − 1', 'TNA / m', 'TNA + inflación'], correcta: 1, justificacion: 'La TEA capitaliza los subperíodos: (1+TNA/m)^m − 1. Multiplicar o dividir por m no capitaliza; sumar la inflación mezcla conceptos distintos.' },
    { id: 'q3', pregunta: 'La ecuación de Fisher para la tasa real es:', opciones: ['r_real = r_nominal − π exactamente.', 'r_real = (1 + r_nominal)/(1 + π) − 1.', 'r_real = r_nominal × π.', 'r_real = π − r_nominal.'], correcta: 1, justificacion: 'La forma exacta de Fisher es (1+r_nom)/(1+π)−1. La resta simple (r_nom − π) es solo una aproximación válida a tasas bajas, no bajo inflación alta.' },
    { id: 'q4', pregunta: 'Ante dos proyectos mutuamente excluyentes de distinta escala, ¿qué criterio manda?', opciones: ['La TIR más alta siempre.', 'El VAN.', 'El menor plazo.', 'El que tenga más flujos.'], correcta: 1, justificacion: 'El VAN mide creación de valor en unidades monetarias y es el criterio soberano ante exclusión mutua. La TIR puede favorecer al proyecto más chico aunque cree menos valor total.' },
    { id: 'q5', pregunta: '¿Cuál es una “patología” típica de la TIR?', opciones: ['Siempre da un único valor.', 'Con flujos no convencionales (varios cambios de signo) puede haber múltiples TIR.', 'No se puede calcular nunca.', 'Es idéntica al VAN.'], correcta: 1, justificacion: 'Flujos con varios cambios de signo pueden generar múltiples TIR (o ninguna real), volviéndola ambigua. Por eso se recurre a la TIRM o directamente al VAN.' },
    { id: 'q6', pregunta: 'La TIRM (TIR modificada) corrige:', opciones: ['El signo del flujo inicial.', 'El supuesto de reinversión de los flujos, usando una tasa de reinversión explícita.', 'La inflación.', 'El error de redondeo.'], correcta: 1, justificacion: 'La TIR supone reinvertir a la propia TIR; la TIRM usa una tasa de reinversión explícita más realista. No corrige signos, inflación ni redondeo.' },
    { id: 'q7', pregunta: 'En el caso, el VAN al 20 % es negativo y la TIR ≈ 15 %. Esto significa que:', opciones: ['El proyecto crea valor.', 'El proyecto destruye valor porque su retorno (TIR) es menor que el costo del capital.', 'Falta información para decidir.', 'La TIR es irrelevante.'], correcta: 1, justificacion: 'Con TIR (≈15 %) por debajo del WACC (20 %), el VAN es negativo y el proyecto destruye valor. Es exactamente la lógica RONIC < WACC de la paradoja del crecimiento.' },
    { id: 'q8', pregunta: '¿Por qué se escribe el motor de cálculo “dos veces” (Python y Excel)?', opciones: ['Por redundancia inútil.', 'Para verificar: ambos deben coincidir número a número; si difieren, uno miente.', 'Porque Excel no calcula VAN.', 'Para gastar más horas.'], correcta: 1, justificacion: 'El doble motor es una técnica de verificación cruzada: la coincidencia da confianza y la discrepancia revela un error. Excel sí calcula VAN; no es redundancia inútil.' },
    { id: 'q9', pregunta: 'Correlación alta entre dos variables implica:', opciones: ['Causalidad segura.', 'No necesariamente causalidad; puede ser espuria.', 'Que una causa a la otra siempre.', 'Que son independientes.'], correcta: 1, justificacion: 'La correlación no prueba causalidad y puede ser espuria (una tercera variable, azar). Tampoco implica independencia (eso sería correlación nula).' },
    { id: 'q10', pregunta: 'El diagnóstico de supuestos de una regresión (homocedasticidad, normalidad de residuos, etc.):', opciones: ['Es un trámite posterior opcional.', 'Es parte del resultado: sin él, el coeficiente no tiene garantía.', 'Solo importa en física.', 'Reemplaza a los datos.'], correcta: 1, justificacion: 'Los supuestos condicionan la validez de los coeficientes; verificarlos es parte del resultado, no un opcional. Aplica plenamente a la econometría financiera.' },
    { id: 'q11', pregunta: 'En pronóstico de series temporales, la métrica de error debe elegirse:', opciones: ['Siempre RMSE, sin excepción.', 'Según la función de pérdida del negocio (no cuesta lo mismo un faltante que un excedente).', 'Al azar.', 'Solo MAPE siempre.'], correcta: 1, justificacion: 'La métrica debe reflejar el costo real de equivocarse: un faltante de stock y un excedente tienen costos distintos. No hay una métrica universal obligatoria.' },
    { id: 'q12', pregunta: 'El método Holt-Winters es apropiado para series con:', opciones: ['Solo ruido, sin patrón.', 'Tendencia y estacionalidad.', 'Un único dato.', 'Valores constantes.'], correcta: 1, justificacion: 'Holt-Winters (suavizado exponencial triple) modela nivel, tendencia y estacionalidad. No aporta a series de puro ruido, un solo dato o valores constantes.' },
    { id: 'q13', pregunta: 'El producto matricial C = A·B se usa en finanzas para:', opciones: ['Nada relevante.', 'Consolidar modelos y propagar capas de redes neuronales.', 'Solo graficar.', 'Ordenar alfabéticamente.'], correcta: 1, justificacion: 'La multiplicación de matrices (MMULT / @) consolida modelos multi-unidad y es la operación central de una red neuronal. No es meramente gráfica ni de ordenamiento.' },
    { id: 'q14', pregunta: 'La reproducibilidad de un modelo financiero exige:', opciones: ['Que lo entienda solo su autor.', 'Entorno declarado, control de versiones y pruebas unitarias.', 'Que esté en un solo archivo secreto.', 'Que use la mayor cantidad de librerías.'], correcta: 1, justificacion: 'Reproducible = otro puede correrlo y verificarlo: entorno declarado, versionado y tests. El secreto o la dependencia de una sola persona son lo contrario de reproducible.' },
    { id: 'q15', pregunta: 'Evaluar un pronóstico “dentro de la muestra” en lugar de fuera de ella:', opciones: ['Es lo correcto siempre.', 'Engaña: el modelo puede ajustar bien lo que ya vio y fallar en lo nuevo (sobreajuste).', 'Da el mismo resultado.', 'Es imposible.'], correcta: 1, justificacion: 'El ajuste dentro de la muestra premia el sobreajuste; la prueba honesta es fuera de la muestra, con datos que el modelo no vio. Los resultados difieren y por eso importa.' },
    { id: 'q16', pregunta: 'La librería pandas se usa principalmente para:', opciones: ['Renderizar gráficos 3D.', 'Manipular y transformar datos tabulares.', 'Entrenar redes en GPU.', 'Enviar correos.'], correcta: 1, justificacion: 'pandas es la herramienta central de manipulación de datos tabulares en Python. El cálculo numérico intensivo va con numpy; los gráficos y correos son otras librerías.' },
    { id: 'q17', pregunta: 'Las pruebas unitarias sobre funciones financieras sirven para:', opciones: ['Hacer el código más lento.', 'Verificar que cada función da el resultado esperado y detectar regresiones.', 'Ocultar errores.', 'Reemplazar la documentación.'], correcta: 1, justificacion: 'Los tests comprueban el comportamiento esperado y avisan si un cambio rompe algo (regresión). No ocultan errores ni sustituyen la documentación.' },
    { id: 'q18', pregunta: 'Dos tasas son “equivalentes” cuando:', opciones: ['Tienen el mismo número.', 'Producen el mismo monto final en un mismo plazo, con distinta frecuencia de capitalización.', 'Se aplican al mismo cliente.', 'Están en la misma moneda.'], correcta: 1, justificacion: 'Tasas equivalentes generan idéntico resultado en el mismo período pese a distinta periodicidad. No es cuestión de igual número, cliente ni moneda.' },
    { id: 'q19', pregunta: 'La duración de un flujo mide:', opciones: ['Su rentabilidad.', 'Su sensibilidad ante cambios en la tasa (primera derivada del valor).', 'Su liquidez.', 'Su riesgo de crédito.'], correcta: 1, justificacion: 'La duración aproxima cuánto cambia el valor ante un cambio de tasa (la convexidad es la segunda derivada). No mide rentabilidad, liquidez ni crédito.' },
    { id: 'q20', pregunta: 'La diferencia entre sistema francés y alemán de amortización es que:', opciones: ['Son idénticos.', 'El francés tiene cuota constante; el alemán, amortización de capital constante.', 'El alemán no cobra interés.', 'El francés no amortiza.'], correcta: 1, justificacion: 'Francés = cuota constante (amortización creciente); alemán = amortización constante (cuota decreciente). Ambos cobran interés y amortizan.' },
    { id: 'q21', pregunta: 'Para que un VAN sea coherente, la tasa de descuento y los flujos deben estar:', opciones: ['En distinta moneda.', 'Ambos en términos reales o ambos en términos nominales.', 'Siempre en dólares.', 'Sin relación entre sí.'], correcta: 1, justificacion: 'Mezclar flujos reales con tasa nominal (o viceversa) distorsiona el VAN. Deben ser consistentes en términos y moneda.' },
    { id: 'q22', pregunta: 'Una serie temporal es estacionaria cuando:', opciones: ['Crece siempre.', 'Sus propiedades estadísticas (media, varianza) son estables en el tiempo.', 'No tiene datos.', 'Es perfectamente estacional.'], correcta: 1, justificacion: 'La estacionariedad implica media y varianza constantes; es supuesto de muchos modelos. No es que crezca ni que sea estacional.' },
    { id: 'q23', pregunta: 'Descomponer una serie temporal implica separar:', opciones: ['Filas y columnas.', 'Tendencia, estacionalidad y ruido.', 'Ingresos y egresos.', 'Activo y pasivo.'], correcta: 1, justificacion: 'La descomposición aísla tendencia, estacionalidad y componente irregular (ruido). No es una separación contable.' },
    { id: 'q24', pregunta: 'El RMSE (raíz del error cuadrático medio) penaliza:', opciones: ['Por igual todos los errores.', 'Más fuertemente los errores grandes (por elevar al cuadrado).', 'Solo los errores positivos.', 'Nada.'], correcta: 1, justificacion: 'Al elevar al cuadrado, el RMSE castiga más los desvíos grandes que el MAE. La elección entre ambos depende de la función de pérdida.' },
    { id: 'q25', pregunta: 'El álgebra lineal (operaciones matriciales) se usa en finanzas para:', opciones: ['Nada relevante.', 'Consolidar modelos y calcular redes neuronales.', 'Solo ordenar listas.', 'Escribir texto.'], correcta: 1, justificacion: 'Las matrices consolidan modelos multi-unidad y son el motor de las redes neuronales (MMULT / @). No es ordenar ni escribir.' },
    { id: 'q26', pregunta: 'El control de versiones (p. ej. Git) aporta:', opciones: ['Más errores.', 'Historial, reproducibilidad y trabajo colaborativo sobre el código.', 'Menos seguridad.', 'Nada.'], correcta: 1, justificacion: 'Versionar da trazabilidad del cambio, reproducibilidad y colaboración: pilares de un trabajo auditable. No agrega errores ni resta seguridad.' },
    { id: 'q27', pregunta: 'La multicolinealidad en una regresión múltiple es:', opciones: ['Que haya muchas filas.', 'Alta correlación entre variables explicativas, que vuelve inestables los coeficientes.', 'Falta de datos.', 'Un tipo de gráfico.'], correcta: 1, justificacion: 'La multicolinealidad (predictores muy correlacionados) infla la varianza de los coeficientes y dificulta interpretarlos. No es cantidad de filas ni un gráfico.' },
    { id: 'q28', pregunta: 'Un intervalo de confianza del 95% expresa:', opciones: ['Que el dato es 95% grande.', 'Un rango que, en muestreos repetidos, contendría el parámetro el 95% de las veces.', 'Que hay 95 datos.', 'La media exacta.'], correcta: 1, justificacion: 'El IC comunica la incertidumbre de la estimación: en repeticiones, el 95% de los intervalos contendría el parámetro. No es un conteo ni la media exacta.' },
    { id: 'q29', pregunta: 'La TIR supone que los flujos intermedios se reinvierten a:', opciones: ['El costo del capital.', 'La propia TIR (supuesto muchas veces poco realista).', 'Cero.', 'La inflación.'], correcta: 1, justificacion: 'La TIR asume reinversión a la propia TIR; por eso la TIRM usa una tasa de reinversión explícita más realista. No supone reinversión al WACC ni a cero.' },
    { id: 'q30', pregunta: 'Vectorizar cálculos con numpy (en vez de bucles en Python) aporta:', opciones: ['Más lentitud.', 'Mayor velocidad y código más conciso.', 'Menos precisión.', 'Nada.'], correcta: 1, justificacion: 'La vectorización con numpy es más rápida y compacta que los bucles puros de Python. No sacrifica precisión.' },
  ],
  bibliografia: [
    'Hilpisch, Y. — *Python for Finance*',
    'McKinney, W. — *Python for Data Analysis*',
    'Wooldridge, J. — *Introductory Econometrics*',
    'Hyndman, R. & Athanasopoulos, G. — *Forecasting: Principles and Practice*',
    'Beaumont, P. — *Financial Engineering Principles*',
    'Schlosser, A. — *Corporate Finance: A Model Building Approach*',
  ],
}
