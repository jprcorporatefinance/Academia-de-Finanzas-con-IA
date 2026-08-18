import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 3.3 — Proyección Corporativa, Simulación de Monte Carlo y
// Cuantificación del Riesgo
// ============================================================================
export const a3_3: Asignatura = {
  cod: '3.3',
  slug: 'a3-3',
  cuatrimestre: 3,
  fase: 'Predictiva · ¿Qué es probable que ocurra?',
  nombre: 'Proyección Corporativa, Simulación de Monte Carlo y Cuantificación del Riesgo',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativas: 2.3 y 3.1 · Tercer cuatrimestre',
  framework: 'Koller/McKinsey · Savage · Hubbard',
  resumen:
    'Proyectar el futuro probable de la empresa por sus generadores de valor y, en vez de un número único, producir una distribución de resultados con simulación de Monte Carlo y métricas de riesgo.',
  objetivos: [
    'Proyectar los estados por generadores de valor, no línea por línea.',
    'Construir escenarios y análisis de sensibilidad (tornado, tablas bidimensionales).',
    'Ejecutar una simulación de Monte Carlo de no menos de diez mil iteraciones.',
    'Cuantificar el riesgo con métricas de distribución y pruebas de tensión.',
  ],
  sections: [
    {
      title: 'Proyectar por generadores, no línea por línea',
      intro: 'Una proyección no es extrapolar cada renglón: es modelar los pocos generadores que mueven el valor y dejar que el resto se derive.',
      blocks: [
        { t: 'p', md: 'La proyección se ancla en los **generadores de valor** —crecimiento de ventas, margen operativo, intensidad de capital (capital de trabajo y CapEx), tasa impositiva y costo del capital—. Se proyectan esos drivers y los estados **integrados** (resultados, balance y flujo) se derivan de ellos con verificación de cierre. Es el mismo esqueleto del Key Value Driver de McKinsey (asignatura 4.2).' },
        { t: 'idea', md: 'Proyectar cada línea por separado produce estados que no cierran y supuestos que se contradicen. Proyectar por generadores impone coherencia: si crecen las ventas, crecen las cuentas por cobrar y el inventario, y eso consume caja. El modelo lo obliga.' },
      ],
    },
    {
      title: 'Escenarios y sensibilidad',
      intro: 'Antes de la simulación completa, dos herramientas más simples ya dicen mucho.',
      blocks: [
        { t: 'ul', items: [
          '**Análisis de sensibilidad:** mover un supuesto por vez y ver el efecto sobre el resultado. El **diagrama de tornado** ordena los supuestos por su impacto: muestra dónde está el riesgo.',
          '**Escenarios:** combinaciones coherentes de supuestos (base, optimista, pesimista). Menos que una distribución, pero útiles para comunicar.',
          '**Tablas bidimensionales:** el efecto conjunto de dos variables (p. ej. crecimiento × WACC) sobre el valor.',
        ] },
        { t: 'warn', md: 'La sensibilidad de una variable por vez ignora que las variables se mueven juntas y a veces correlacionadas. Es un buen comienzo, pero no captura el riesgo real de la combinación. Para eso está Monte Carlo.' },
      ],
    },
    {
      title: 'Monte Carlo: de un número a una distribución',
      intro: 'El futuro no es un número: es un rango con probabilidades. Monte Carlo lo hace explícito.',
      blocks: [
        { t: 'p', md: 'En vez de un valor puntual para cada supuesto, se define una **distribución** (normal, triangular, etc.) y su **correlación** con los demás. Luego se sortean **no menos de diez mil** combinaciones, se calcula el resultado en cada una y se obtiene la **distribución del resultado**: no “el valor es 12.838”, sino “el valor está entre X e Y con tal probabilidad, y hay un 30 % de chance de destruir valor”.' },
        { t: 'formula', name: 'Simular un supuesto normal', expr: 'x_i = μ + σ × Φ⁻¹(u_i)', where: 'u_i = número aleatorio uniforme (0,1) · Φ⁻¹ = inversa de la normal estándar · μ, σ = media y desvío', note: 'En Excel 365: NORM.S.INV(RANDARRAY(N)) genera N draws normales de una sola vez, vectorizado (asignatura 2.3).' },
        { t: 'quote', author: 'Sam Savage', credential: 'The Flaw of Averages', md: 'Los planes basados en promedios están, en promedio, equivocados. Un único número esconde el riesgo; la distribución lo revela.' },
      ],
    },
    {
      title: 'Cuantificar el riesgo',
      intro: 'De la distribución salen las métricas que un directorio necesita para decidir bajo incertidumbre.',
      blocks: [
        { t: 'ul', items: [
          '**Percentiles** (P5, P95): el rango de resultados plausibles.',
          '**Probabilidad de un mal resultado:** P(valor < capital invertido), P(FCF < 0), P(default).',
          '**Value at Risk (VaR)** y **Expected Shortfall (ES):** la pérdida en el peor 5 % de los casos, y su promedio.',
          '**Pruebas de tensión (stress tests):** shocks extremos pero plausibles (devaluación, caída de demanda) y su efecto sobre la caja.',
        ] },
        { t: 'quote', author: 'Douglas Hubbard', credential: 'How to Measure Anything', md: 'Medir la incertidumbre no es admitir ignorancia: es cuantificarla. Un rango con probabilidades es más honesto —y más útil para decidir— que un número único con falsa precisión.' },
      ],
    },
  ],
  expertos: [
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'Proyectá los generadores de valor y dejá que los estados se deriven. Una buena proyección es una historia económica coherente, no una extrapolación de renglones.' },
    { author: 'Sam Savage', credential: 'Stanford — The Flaw of Averages', md: 'Reemplazar cada número incierto por su promedio y esperar el promedio del resultado es una falacia sistemática. La incertidumbre hay que simularla, no promediarla.' },
    { author: 'Douglas Hubbard', credential: 'Applied Information Economics', md: 'Todo lo que importa para una decisión se puede medir lo suficiente como para reducir la incertidumbre. La pregunta no es “¿se puede medir?”, sino “¿cuánto reduce la incertidumbre medirlo?”.' },
  ],
  caso: {
    titulo: 'El valor de la empresa no es un número, es una distribución',
    empresa: 'Maderas del Litoral S.A. — ¿cuán probable es destruir valor?',
    contexto:
      'La valuación puntual dirá que Maderas del Litoral vale unos 12.800 (miles), por encima de su capital invertido de 11.770: crea valor. Pero ese número único esconde el riesgo.\n\nEl margen operativo de la empresa es volátil —depende del precio de la madera, del tipo de cambio y de la demanda de la construcción—. El consultor modela el margen como una distribución normal y corre una simulación de Monte Carlo de 10.000 iteraciones sobre el valor de la firma. El resultado cambia la conversación: en promedio crea valor, pero hay una probabilidad relevante de destruirlo.\n\nEl directorio ya no decide sobre un número, sino sobre un rango con probabilidades.',
    datos: [
      { t: 'table', title: 'Parámetros de la simulación', headers: ['Parámetro', 'Valor'], firstColLeft: true, rows: [
        ['Iteraciones', '10.000'],
        ['Ventas', '42.000'],
        ['Margen operativo medio (EBIT/Ventas)', '9,17%'],
        ['Desvío del margen (σ)', '1,50%'],
        ['Tasa impositiva', '35%'],
        ['WACC', '19,5%'],
        ['Capital invertido (umbral)', '11.770'],
      ] },
    ],
    consigna: [
      '¿Cuál es el valor medio de la firma según la simulación?',
      '¿Cuál es el rango entre el percentil 5 y el 95?',
      '¿Cuál es la probabilidad de que el valor sea menor que el capital invertido (destruir valor)?',
      '¿Por qué la distribución cambia la decisión respecto de un número único?',
    ],
    metodologia: [
      { k: 'Definir la distribución', d: 'Margen ~ Normal(media, σ); identificar el driver de mayor riesgo (tornado).' },
      { k: 'Simular (≥10.000)', d: 'Sortear N márgenes con NORM.S.INV(RANDARRAY(N)) y calcular el valor en cada uno.' },
      { k: 'Resumir la distribución', d: 'Media, percentiles P5/P95, probabilidad de mal resultado.' },
      { k: 'Estresar', d: 'Aplicar shocks plausibles y ver el efecto sobre el valor y la caja.' },
      { k: 'Comunicar', d: 'Presentar un rango con probabilidades, no un número.' },
    ],
  },
  model: {
    sheetTitle: 'Monte Carlo del valor de la firma (simulación vectorizada)',
    intro:
      'Editá los parámetros (celdas marfil). La simulación sortea el margen operativo N veces con RANDARRAY + NORM.S.INV, calcula el valor en cada iteración y resume la distribución. Presioná F9 para volver a simular.',
    inputs: [
      { key: 'N', label: 'Iteraciones', value: 10000, fmt: 'num' },
      { key: 'ventas', label: 'Ventas', value: 42000, fmt: 'money' },
      { key: 'margenMedia', label: 'Margen operativo medio', value: 0.0917, fmt: 'pct2' },
      { key: 'margenSigma', label: 'Desvío del margen (σ)', value: 0.015, fmt: 'pct2' },
      { key: 't', label: 'Tasa impositiva', value: 0.35, fmt: 'pct' },
      { key: 'wacc', label: 'WACC', value: 0.195, fmt: 'pct1' },
      { key: 'capital', label: 'Capital invertido (umbral)', value: 11770, fmt: 'money' },
    ],
    calcs: [
      { key: 'valorPuntual', label: 'Valor puntual (con el margen medio)', xl: '=[ventas]*[margenMedia]*(1-[t])/[wacc]', fmt: 'money', highlight: true },
    ],
    spills: [
      {
        key: 'resumen',
        title: 'Distribución del valor (Monte Carlo de N iteraciones)',
        columns: ['Estadístico', 'Valor'],
        xl: '=LET(n,[N], u,RANDARRAY(n), m,NORM.S.INV(u)*[margenSigma]+[margenMedia], val,[ventas]*m*(1-[t])/[wacc], nom,{"Valor medio";"Percentil 5";"Percentil 95";"Desvío estándar";"P(valor < capital) — destruye valor"}, st,VSTACK(AVERAGE(val),PERCENTILE(val,0.05),PERCENTILE(val,0.95),STDEV(val),AVERAGE(IF(val<[capital],1,0))), HSTACK(nom,st))',
        formats: [undefined, 'money'],
        rows: 5,
        note: 'Una sola fórmula sortea N márgenes (RANDARRAY + NORM.S.INV), calcula el valor en cada uno y devuelve los estadísticos. La última fila es la probabilidad de destruir valor. La fila “P(...)” muestra una proporción (0–1).',
      },
      {
        key: 'muestra',
        title: 'Muestra de 12 iteraciones (ilustrativa)',
        columns: ['Iteración', 'Margen simulado', 'NOPAT', 'Valor'],
        xl: '=LET(u,RANDARRAY(12), m,NORM.S.INV(u)*[margenSigma]+[margenMedia], nop,[ventas]*m*(1-[t]), val,nop/[wacc], HSTACK(SEQUENCE(12),m,nop,val))',
        formats: ['num', 'pct2', 'money', 'money'],
        rows: 12,
        note: 'Doce sorteos de ejemplo para ver el mecanismo. Cada F9 genera una muestra nueva.',
      },
    ],
    conclusions: [
      { label: 'Interpretación', xl: '="El valor puntual ("&TEXT([valorPuntual],"#,##0")&") es un solo número; la simulación muestra un rango. La probabilidad de que el valor caiga por debajo del capital invertido ("&TEXT([capital],"#,##0")&") es material: en promedio crea valor, pero el riesgo de destruirlo es real."' },
      { label: 'Método', xl: '="Un plan basado en el promedio está, en promedio, equivocado (Savage). Presentá al directorio la distribución —media, P5, P95 y P(destruir valor)—, no un número único."' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Proyectar “por generadores de valor” significa:', opciones: ['Extrapolar cada línea del estado por separado.', 'Modelar los pocos drivers que mueven el valor y derivar los estados de ellos.', 'Copiar el año anterior.', 'Proyectar solo las ventas.'], correcta: 1, justificacion: 'Se proyectan crecimiento, margen, intensidad de capital, etc., y los estados integrados se derivan con coherencia. Extrapolar línea por línea produce estados que no cierran.' },
    { id: 'q2', pregunta: '¿Por qué proyectar cada línea por separado es problemático?', opciones: ['Es más rápido.', 'Los estados no cierran y los supuestos se contradicen.', 'Es lo que recomienda McKinsey.', 'No usa Excel.'], correcta: 1, justificacion: 'Sin el vínculo por generadores, los estados dejan de cerrar y aparecen inconsistencias (crecen ventas pero no el capital de trabajo). No es la recomendación de McKinsey.' },
    { id: 'q3', pregunta: 'El diagrama de tornado sirve para:', opciones: ['Graficar el clima.', 'Ordenar los supuestos por su impacto sobre el resultado (dónde está el riesgo).', 'Calcular impuestos.', 'Simular Monte Carlo.'], correcta: 1, justificacion: 'El tornado ordena las variables por sensibilidad, mostrando cuáles mueven más el resultado. No es Monte Carlo (que combina todas a la vez) ni un cálculo fiscal.' },
    { id: 'q4', pregunta: 'La limitación de la sensibilidad “una variable por vez” es que:', opciones: ['Es demasiado compleja.', 'Ignora que las variables se mueven juntas y a veces correlacionadas.', 'No se puede hacer en Excel.', 'Da siempre el mismo resultado.'], correcta: 1, justificacion: 'Mover una variable a la vez no captura el riesgo de la combinación ni las correlaciones; para eso está Monte Carlo. Es simple, no compleja.' },
    { id: 'q5', pregunta: 'La simulación de Monte Carlo produce:', opciones: ['Un número único.', 'Una distribución de resultados con probabilidades.', 'Solo el promedio.', 'La tasa de interés.'], correcta: 1, justificacion: 'Monte Carlo sortea miles de combinaciones y entrega la distribución del resultado (rango + probabilidades), no un valor puntual ni solo el promedio.' },
    { id: 'q6', pregunta: 'El plan de estudios exige una simulación de al menos:', opciones: ['100 iteraciones.', '10.000 iteraciones.', '10 iteraciones.', '1 iteración.'], correcta: 1, justificacion: 'El estándar del programa es no menos de diez mil iteraciones, para una distribución estable. Menos da estimaciones ruidosas.' },
    { id: 'q7', pregunta: 'Para simular un supuesto normal, en Excel 365 se usa:', opciones: ['SUMA(RANDARRAY).', 'NORM.S.INV(RANDARRAY(N)) × σ + μ.', 'PROMEDIO de dos celdas.', 'BUSCARV.'], correcta: 1, justificacion: 'La inversa de la normal aplicada a uniformes (RANDARRAY) genera draws normales vectorizados. Las otras no producen una muestra normal.' },
    { id: 'q8', pregunta: 'La “falacia de los promedios” (Savage) dice que:', opciones: ['Los promedios son siempre exactos.', 'Un plan basado en promedios está, en promedio, equivocado, porque el promedio esconde el riesgo.', 'No hay que medir nada.', 'La media no existe.'], correcta: 1, justificacion: 'Reemplazar cada incierto por su promedio ignora la no linealidad y el riesgo; el resultado promedio no coincide con el del promedio de inputs. La media existe, pero no basta.' },
    { id: 'q9', pregunta: 'El Value at Risk (VaR) al 5 % mide:', opciones: ['La ganancia esperada.', 'La pérdida en el peor 5 % de los casos (un percentil de la distribución).', 'El promedio.', 'La tasa impositiva.'], correcta: 1, justificacion: 'El VaR es un percentil de la cola: la pérdida que no se supera con cierta probabilidad. No es la ganancia esperada ni el promedio.' },
    { id: 'q10', pregunta: 'El Expected Shortfall (ES) respecto del VaR:', opciones: ['Es lo mismo.', 'Es el promedio de las pérdidas en la cola (más allá del VaR), captando su severidad.', 'Ignora la cola.', 'Es la media global.'], correcta: 1, justificacion: 'El ES promedia las pérdidas más allá del VaR, midiendo qué tan malas son las peores. No ignora la cola ni es la media global.' },
    { id: 'q11', pregunta: 'En el caso, la simulación muestra que la empresa:', opciones: ['Crea valor con certeza.', 'En promedio crea valor, pero con probabilidad relevante de destruirlo.', 'Destruye valor con certeza.', 'No se puede evaluar.'], correcta: 1, justificacion: 'El valor medio supera al capital, pero la volatilidad del margen deja una probabilidad material de caer por debajo: crea valor en promedio, no con certeza.' },
    { id: 'q12', pregunta: 'Las pruebas de tensión (stress tests) consisten en:', opciones: ['Sortear valores al azar sin criterio.', 'Aplicar shocks extremos pero plausibles (devaluación, caída de demanda) y ver el efecto.', 'Promediar escenarios.', 'Calcular la media.'], correcta: 1, justificacion: 'El stress test evalúa escenarios severos específicos (no aleatorios) para ver la resiliencia de la caja. Es distinto de la simulación aleatoria y del promedio.' },
    { id: 'q13', pregunta: 'La correlación entre supuestos en Monte Carlo importa porque:', opciones: ['No importa.', 'Ignorarla puede subestimar o sobreestimar el riesgo de la combinación.', 'Siempre es cero.', 'Solo afecta la media.'], correcta: 1, justificacion: 'Si dos drivers se mueven juntos (o en contra), tratarlos como independientes distorsiona la distribución del resultado. La correlación no es siempre nula.' },
    { id: 'q14', pregunta: 'Presentar al directorio la distribución en vez de un número único es:', opciones: ['Menos honesto.', 'Más honesto y más útil: muestra el rango y la probabilidad de malos resultados.', 'Innecesario.', 'Una complicación sin valor.'], correcta: 1, justificacion: 'Un rango con probabilidades comunica el riesgo real y mejora la decisión (Hubbard, Savage). El número único da falsa precisión.' },
    { id: 'q15', pregunta: 'Según Hubbard, medir la incertidumbre:', opciones: ['Es imposible.', 'Es cuantificarla para reducirla, no admitir ignorancia.', 'Requiere certeza previa.', 'No sirve para decidir.'], correcta: 1, justificacion: 'Medir reduce la incertidumbre y mejora la decisión; la pregunta es cuánto la reduce, no si es posible. No exige certeza previa.' },
  ],
  bibliografia: [
    'Koller, Goedhart & Wessels — *Valuation*',
    'Savage, S. — *The Flaw of Averages*',
    'Hubbard, D. — *How to Measure Anything*',
    'Rees, M. — *Business Risk and Simulation Modelling in Practice*',
    'Damodaran, A. — *Strategic Risk Taking*',
    'Rossi, J. P. — *Analítica Avanzada con Microsoft Excel para el CFO Actual*',
  ],
}
