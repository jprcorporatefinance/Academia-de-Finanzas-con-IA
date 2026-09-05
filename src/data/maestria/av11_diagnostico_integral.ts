import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.11 — Diagnóstico integral: recomposición y consultoría 360
// Fuente metodológica: skills JPR `diagnostico-integral`, `mapa-de-valor` y
// `analisis-financiero-corporativo-360`.
// ============================================================================
export const av11_diagnostico_integral: Asignatura = {
  cod: 'A.11',
  slug: 'av-11',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Diagnóstico Integral: recomponer los números desde el movimiento primario',
  horas: '24 h · 10 teóricas / 14 prácticas',
  correlativas: 'Correlativas: 1.2, 2.2 y A.10 · Módulo avanzado',
  framework: 'Método JPR de cuatro fases · recomposición desde el ERP · Beneish · Damodaran/Pereiro',
  resumen:
    'El módulo que cierra el programa. Todo lo aprendido descansa sobre una premisa que casi nunca se verifica: que los saldos contables describen el negocio. Este módulo enseña a no leerlos, sino a RECOMPONERLOS desde los movimientos primarios del sistema de gestión —despachos, comprobantes, kardex, cobranzas— y a exponer la diferencia contra lo que declara la contabilidad. Es el trabajo completo de punta a punta, en el orden en que se hace.',
  objetivos: [
    'Diseñar la extracción de datos primarios de un sistema de gestión y su mapeo al esquema canónico.',
    'Ejecutar las seis pruebas de recomposición y producir, en cada una, la prueba discriminante.',
    'Encadenar las cinco fases del trabajo en el orden correcto y respetar sus bloqueos.',
    'Tratar el país como un input del que cuelgan tasa impositiva, riesgo país, beta sectorial y múltiplos.',
    'Declarar la ruta de riesgo país y sostenerla sin doble conteo a lo largo de todo el trabajo.',
    'Producir el expediente completo: recomposición, diagnóstico, proyección, valuación y plan de creación de valor.',
  ],
  sections: [
    {
      title: 'La premisa que nadie verifica',
      intro:
        'Todo el programa se apoya en estados contables. Este módulo pregunta lo que ningún módulo anterior preguntó: ¿describen el negocio?',
      blocks: [
        { t: 'p', md: 'Un diagnóstico que lee los saldos contables hereda todos sus errores sin poder detectarlos. Si el costo de ventas contable no coincide con el kardex valorizado, **hay dos lecturas posibles del negocio, y la diferencia entre ellas puede ser la mitad del EBITDA**. Un informe honesto no elige la cómoda: declara las dos y dice cuál es el dato que las separa.' },
        { t: 'idea', md: '**El principio general de toda prueba de recomposición:** comparar **dos mediciones independientes de la misma cosa**. Cuando coinciden, la cifra está verificada. Cuando no, hay exactamente dos posibilidades y ninguna es "error de carga": o la contabilidad no refleja el movimiento, o el movimiento no está bien registrado.' },
        { t: 'warn', md: '**Nunca se elige la lectura conveniente.** Cuando el analista elige, deja de ser una medición y pasa a ser una opinión con formato de informe. La disciplina de declarar las dos lecturas es lo que hace defendible el trabajo frente a un comprador, un vendedor o un perito.' },
      ],
    },
    {
      title: 'Las seis pruebas de recomposición',
      intro:
        'Cada prueba recompone una cifra desde los movimientos primarios y la enfrenta a lo que dice la contabilidad. Todas devuelven la misma estructura, y todas devuelven la prueba discriminante.',
      blocks: [
        { t: 'table', title: 'El tablero de pruebas', headers: ['Prueba', 'Recompone', 'Contra'], firstColLeft: true, rows: [
          ['Costo contra kardex', 'Σ (cantidad despachada × costo unitario)', 'Costo de ventas contable, escalado a la misma base'],
          ['Margen contra precio', 'Precio neto obtenido, producto por producto', 'Costo unitario del maestro de productos'],
          ['Facturado contra despachado', 'Cantidad facturada, mes a mes', 'Cantidad con movimiento de salida a cliente'],
          ['Facturado contra ingreso', 'Σ comprobantes emitidos del ejercicio', 'Ingreso reconocido en el mayor'],
          ['Calidad de la serie contable', 'Regularidad del devengamiento mensual', '—'],
          ['Cuentas anómalas', 'Cuentas puente, clasificaciones cruzadas, ausencias estructurales', '—'],
        ] },
        { t: 'h', text: '1 · Costo contra kardex — la prueba central' },
        { t: 'p', md: 'Se recompone `Σ (cantidad despachada a cliente × costo unitario)` y se compara contra el costo directo contable **escalado a la venta de los productos relevados** — las dos cifras tienen que medir la misma base o la comparación no significa nada. Es el error más frecuente al hacer esto a mano.' },
        { t: 'warn', md: '**El límite grande y declarado:** si el sistema no expone la **capa de valuación**, el costo unitario que se usa es el **estándar** y no el real de cada salida. Eso convierte la prueba de una medición en una aproximación, y cambia qué hipótesis es más probable: un costo estándar viejo o con absorción completa explica por sí solo una brecha grande, sin que la contabilidad tenga nada malo. Declararlo no es una nota al pie: cambia la naturaleza del hallazgo.' },
        { t: 'steps', title: 'La prueba discriminante, en orden', items: [
          { k: 'La capa de valuación', d: 'Si el sistema la expone, la ambigüedad desaparece: hay costo real por salida.' },
          { k: 'La composición del costo unitario', d: 'Si incluye mano de obra y gastos indirectos que además están en gastos operativos, hay doble conteo y el costo estándar está inflado.' },
          { k: 'El recuento físico valorizado', d: 'El del último cierre, contra el saldo contable de inventario.' },
        ] },
        { t: 'h', text: '3 · Facturado contra despachado — el estadístico que decide' },
        { t: 'p', md: 'Lo que decide la lectura **no es el mes, es el acumulado**. Si la diferencia oscila alrededor de cero, es corte de período y no afecta el ejercicio. Si **deriva en una dirección y no vuelve**, hay una diferencia real: mercadería entregada sin facturar (ingreso no reconocido, stock sobrevaluado) o facturación sin entrega (reconocimiento anticipado).' },
        { t: 'idea', md: '**La persistencia del signo es el estadístico que separa una cosa de la otra.** Por encima del 80 % de los meses con el mismo signo, ya no es ruido de fecha: es un patrón. Ese umbral convierte una intuición ("me parece que hay algo raro") en un hallazgo defendible.' },
        { t: 'h', text: '6 · Cuentas anómalas' },
        { t: 'ul', items: [
          '**Cuentas puente:** nombres que contienen «ajuste», «varios», «diversos», «por aplicar», «transitoria», «suspenso», «regularización», «diferencia», «provisional», «puente». Una cuenta puente dentro del resultado **por encima del 10 % de las ventas** hace que ninguna línea del estado signifique lo que dice.',
          '**Clasificaciones cruzadas:** una cuenta con código de egreso clasificada dentro de ingresos, o al revés. Es un error de armado del plan de cuentas o una decisión deliberada de presentación; en los dos casos hay que abrirla.',
          '**Ausencias que no pueden ser ciertas:** la principal es la depreciación en cero en una empresa con bienes de uso en producción. Una ausencia estructural no es un dato faltante: es una afirmación implícita, y casi siempre falsa.',
        ] },
        { t: 'p', md: '**Calidad de la serie contable mensual.** Dos indicadores: meses con egresos negativos, y coeficiente de variación del egreso sobre el ingreso. Deciden si el análisis predictivo puede apoyarse en la contabilidad. En la PyME familiar casi nunca puede: los costos se cargan en bloques al cierre y se revierten, así que el mes no significa nada. Cuando eso pasa, la proyección se construye sobre los movimientos operativos y el informe declara por qué — **no se proyecta sobre ruido y después se le ponen intervalos de confianza, que es la forma elegante de mentir con un modelo**.' },
      ],
    },
    {
      title: 'La arquitectura del trabajo: extracción, motor e informe',
      intro:
        'Tres etapas separadas, con una razón técnica concreta detrás de la separación.',
      blocks: [
        { t: 'chain', title: 'Las tres etapas', nodes: ['1 · EXTRACCIÓN — consultas al sistema del cliente, volcado a JSON', '2 · MOTOR — recomposición, parámetros de país y las cinco fases sobre ese JSON', '3 · INFORME — HTML interactivo autocontenido'], caption: 'La conexión al sistema es una herramienta del agente, no una biblioteca que el motor pueda invocar. Por eso la extracción se materializa en un archivo y el motor trabaja sobre él: el análisis queda reproducible y auditable con los datos exactos que se usaron.' },
        { t: 'idea', md: 'Lo dinámico del informe **no es la conexión**: es que el país, la ruta de riesgo y la lectura del costo se cambian en vivo en la página y recalculan Ke, WACC y valuación sobre todos los mercados, sin volver a correr nada. La interactividad vive en el entregable, no en la extracción.' },
        { t: 'h', text: 'Conectar un sistema nuevo' },
        { t: 'p', md: 'Hay que escribir qué se le pide al sistema y cómo se mapea al esquema canónico. El motor no cambia. Lo que hay que conseguir, **en orden de importancia**:' },
        { t: 'ol', items: [
          '**Movimientos de stock con destino cliente**, con cantidad y fecha. Sin esto no hay recomposición del costo, que es la prueba central.',
          '**Comprobantes emitidos** con producto, cantidad e importe neto de impuesto.',
          '**Costo unitario por producto** — con la distinción crítica entre capa de valuación (medición) y costo estándar (aproximación).',
          'Estado de resultados por ejercicio y por mes.',
          'Balance, antigüedad de cartera y de proveedores — habilitan el ciclo de conversión de efectivo y el ROIC.',
        ] },
        { t: 'warn', md: 'Cuando la fuente es una carpeta de archivos, hay que **confirmar el mapeo propuesto ANTES de correr el motor**: un archivo mal asignado produce un diagnóstico entero equivocado, y el motor no puede detectarlo. Es el único punto del proceso donde un error humano se propaga silenciosamente hasta el informe final.' },
        { t: 'p', md: '**El impuesto, un detalle que arruina márgenes.** En muchos sistemas el precio unitario viene con impuesto incluido y el subtotal viene neto. El precio neto es `subtotal / cantidad`, **nunca el precio unitario**, o el margen sale sobrestimado exactamente en el porcentaje del impuesto.' },
      ],
    },
    {
      title: 'El país como input',
      intro:
        'De la elección del país cuelgan la tasa impositiva, el riesgo país, la beta sectorial y los múltiplos. No es un dato de contexto: es un parámetro del modelo.',
      blocks: [
        { t: 'p', md: 'Un archivo de parámetros por mercado cubre los países latinoamericanos que publica Damodaran más España, Estados Unidos y Canadá. Por país: calificación, spread, prima de riesgo país por calificación y por permutas, prima total, tasa impositiva, y el **R² de Pereiro estimado con datos de mercado** donde hay serie disponible.' },
        { t: 'table', title: 'Las tres rutas de riesgo país (mutuamente excluyentes)', headers: ['Ruta', 'Dónde entra el riesgo', 'Cuándo se usa'], firstColLeft: true, rows: [
          ['A · Numerador', 'Escenarios en el flujo, sin prima en la tasa', 'Cuando hay base para asignar probabilidades defendibles'],
          ['B · Denominador', 'Prima en la tasa: Damodaran (CRP pleno) o Pereiro (con 1−R²)', 'Cuando se necesita replicabilidad por un tercero con fuentes públicas'],
          ['C · Híbrido', 'Declarado como tal, con la porción de cada lado explícita', 'Cuando cada riesgo se asigna por su naturaleza'],
        ], caption: 'Aplicar dos rutas es contar el mismo riesgo dos veces, y el sesgo va siempre en la misma dirección: subvaluar. El módulo A.6 desarrolla la decisión en detalle.' },
        { t: 'formula', name: 'La variante Pereiro, escrita correctamente', expr: 'Ke = Rf + RC + β_LL · (RM_L − Rf_L) · (1 − R²)', where: 'El factor (1 − R²) multiplica el TÉRMINO COMPLETO DE LA PRIMA DE MERCADO, nunca al beta solo y nunca al riesgo país', note: 'Es el error más frecuente y el más caro de la valuación regional.' },
        { t: 'warn', md: 'Donde no hay serie de mercado para estimar el R², **no se inventa uno**: se marca el origen como mediana regional o como no estimable, y el informe lo dice en la cara. La mediana regional sale de los mercados más integrados, así que aplicarla tiende a **subestimar** el costo del capital — el sesgo va en contra del usuario y por eso se declara.' },
      ],
    },
    {
      title: 'Las cinco fases, en orden y con sus bloqueos',
      intro:
        'El orden no es de conveniencia expositiva: cada fase consume el expediente de la anterior y puede quedar bloqueada por ella.',
      blocks: [
        { t: 'steps', title: 'El encadenamiento completo', items: [
          { k: '0 · Beneish primero', d: 'No es un adorno de apertura: fija el techo de confianza de todo lo demás. Requiere dos ejercicios completos porque es un modelo de variación entre períodos. Si la información no es admisible, el trabajo puede terminar acá — y ése es un resultado legítimo, no una falla.' },
          { k: '1 · Descriptivo — ¿qué pasó?', d: 'Recomposición y tablero descriptivo: ventas, márgenes, capital de trabajo, ciclo de conversión de efectivo, estructura de financiamiento, matrices ABC/XYZ y de vencimiento contra reclamo.' },
          { k: '2 · Diagnóstico — ¿por qué pasó?', d: 'DuPont de cinco factores, ROIC contra WACC, EVA, EVA Momentum y EVA Margin, GAO/GAF/GAT, puntos de equilibrio, Altman Z\'\' sin X5, y el puente de valor que atribuye cada punto de variación del EVA a su driver.' },
          { k: '3 · Predictivo — ¿qué es probable que pase?', d: 'Protocolo de tres escalones: lineal de referencia, luego métodos de conjunto sobre panel, y recién entonces red neuronal profunda si el panel lo justifica. Validación de origen móvil y Monte Carlo que corre A TRAVÉS del modelo ajustado, no alrededor de él.' },
          { k: '4 · Prescriptivo — ¿qué hay que hacer?', d: 'Valuación sobre las trayectorias simuladas, con WACC recalculado período a período y circularidad resuelta por iteración o por valor presente ajustado. Palancas ordenadas por impacto simulado y plan de creación de valor.' },
        ] },
        { t: 'warn', md: '**Los bloqueos son reales y hay que respetarlos.** Si la información contable no supera el test de admisibilidad, no se emite valuación. Si la serie contable mensual es ruido, no se proyecta sobre ella. Si no hay base para asignar probabilidades, la ruta A del riesgo país queda vetada. Un análisis que ignora sus propios bloqueos produce un número, no un diagnóstico.' },
        { t: 'idea', md: 'La fase predictiva **declara la serie mínima exigida y rechaza el aprendizaje profundo cuando el panel no lo justifica**. Es una de las decisiones metodológicas que más credibilidad aporta: decir "no hay datos suficientes para esto" vale más que producir una red neuronal sobre 36 observaciones.' },
      ],
    },
    {
      title: 'El entregable: el mapa de valor',
      intro:
        'El expediente completo se sintetiza en una sola pieza donde la dirección ve la cadena entera y puede simular las palancas.',
      blocks: [
        { t: 'p', md: 'El **Mapa de Valor** es el entregable que cierra el trabajo: diagnóstico económico-financiero completo con EVA, ROIC y WACC, árbol de palancas simulable, valuación por DCF con la verificación de que coincide con la valuación por EVA, probabilidad de default por el modelo estructural, y calidad de la información por Beneish — todo en una pieza interactiva.' },
        { t: 'formula', name: 'La verificación que cierra el trabajo', expr: 'Valor por DCF de FCFF ≡ Capital invertido + Σ EVA descontados al WACC', where: 'Las dos rutas tienen que dar el mismo valor de la firma', note: 'Si no coinciden, hay una inconsistencia entre la definición de capital, la de NOPAT y la de flujo. Es el mejor test de armado de todo el modelo.' },
        { t: 'chain', title: 'Del movimiento primario a la decisión', nodes: ['Movimiento en el sistema', 'Recomposición y prueba discriminante', 'Diagnóstico causal', 'Proyección con incertidumbre', 'Valuación y palancas', 'Decisión del directorio'], caption: 'Seis eslabones. La calidad del último no puede superar la del primero: por eso el trabajo empieza en el movimiento y no en el balance.' },
        { t: 'p', md: 'La primera pregunta de todo trabajo nuevo es siempre la misma, y no es financiera: **¿dónde vive la información de este cliente?** Sistema de gestión conectado, carpeta compartida, archivos sueltos, base de datos. De esa respuesta depende qué pruebas se pueden correr, y por lo tanto qué tan lejos puede llegar el diagnóstico.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Por qué este módulo cierra el programa y qué significa hacer consultoría con este estándar.',
      blocks: [
        { t: 'p', md: 'Los quince módulos anteriores enseñaron a analizar. Éste enseña a **verificar antes de analizar**, que es lo que separa un informe de una consultora seria de una planilla de ratios con membrete. La diferencia no está en la sofisticación del modelo: está en que cada número del informe puede rastrearse hasta un movimiento del sistema, y donde no puede, se dice.' },
        { t: 'warn', md: 'La tentación permanente de este trabajo es la contraria a la que se supone: no es exagerar los hallazgos, es **suavizarlos**. Cuando la recomposición muestra que el EBITDA declarado puede ser la mitad, hay una presión real —comercial y humana— para presentar la lectura amable. Ceder a eso destruye el único activo que tiene la firma, que es que sus números se puedan creer sin verificarlos.' },
        { t: 'idea', md: 'El campo obligatorio de toda prueba es la **prueba discriminante**: el dato concreto que resolvería la ambigüedad. Es lo que convierte un hallazgo incómodo en una tarea concreta: no «los números no cierran», sino «con la capa de valuación del sistema esto se resuelve en una hora, y hasta tenerla las dos lecturas siguen abiertas». Ese campo es lo que separa este informe de una opinión.' },
      ],
    },
  ],
  expertos: [
    { author: 'Howard Schilit', credential: 'Financial Shenanigans', md: 'Las manipulaciones contables casi nunca aparecen en una línea sola. Aparecen como una divergencia sostenida entre dos mediciones que deberían coincidir, y solo se ven si uno se toma el trabajo de hacer las dos mediciones.' },
    { author: 'Krishna Palepu', credential: 'Harvard Business School — Business Analysis and Valuation', md: 'El análisis contable precede al análisis financiero. Calcular ratios sobre estados que no se auditaron por calidad es aplicar precisión matemática a un insumo desconocido, y el resultado hereda esa incertidumbre sin mostrarla.' },
    { author: 'Messod Beneish', credential: 'Indiana University — The Detection of Earnings Manipulation', md: 'El modelo no acusa a nadie de fraude. Dice que el perfil de variación de estas ocho magnitudes se parece al de las empresas que manipularon, y eso es suficiente para exigir explicaciones antes de seguir.' },
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — Director General', md: 'La primera pregunta de una consultoría no es cuánto vale la empresa. Es dónde vive su información. Todo lo que se pueda afirmar después depende de esa respuesta, y ninguna sofisticación posterior compensa una extracción pobre.' },
  ],
  caso: {
    titulo: 'Las dos lecturas del EBITDA de Maderas del Litoral',
    empresa: 'Maderas del Litoral S.A. — recomposición desde el sistema de gestión',
    contexto:
      'Antes de cerrar el trabajo, el equipo corre las seis pruebas de recomposición sobre el sistema de gestión de la empresa. Los resultados obligan a revisar la conclusión.\n\nEl costo de ventas contable del ejercicio es de 27.000 (miles). La recomposición desde el kardex —cantidad despachada a cliente por costo unitario del maestro— arroja 24.850, escalada a la misma base de productos. La brecha es de 2.150, más del 8 % de las ventas y más de la mitad del EBIT normalizado.\n\nEl sistema no expone la capa de valuación: el costo unitario disponible es el estándar. Además, el análisis de facturado contra despachado muestra una deriva persistente: en diez de doce meses la cantidad despachada supera a la facturada, y el acumulado no vuelve a cero. Y en el estado de resultados aparece una cuenta llamada "Ajustes varios de producción" que representa el 6,8 % de las ventas.\n\nEl trabajo es producir las dos lecturas del negocio, nombrar la prueba discriminante de cada una, y decir explícitamente qué se puede afirmar y qué no con la información disponible.',
    datos: [
      { t: 'table', title: 'Resultados de las pruebas de recomposición (miles de $)', headers: ['Prueba', 'Contable', 'Recompuesto', 'Brecha'], firstColLeft: true, rows: [
        ['Costo de ventas', '27.000', '24.850', '2.150 (8,0 % de ventas)'],
        ['Ingreso del ejercicio', '42.000', '42.380', '380 (0,9 %)'],
        ['Facturado vs despachado', '—', '10 de 12 meses con el mismo signo', 'Deriva persistente'],
        ['Cuenta puente "Ajustes varios de producción"', '2.856', '—', '6,8 % de las ventas'],
        ['Meses con egresos negativos', '3 de 12', '—', 'Serie no apta para proyección mensual'],
        ['Depreciación del ejercicio', '0', '—', 'Ausencia estructural: hay planta en producción'],
      ] },
    ],
    consigna: [
      'Enunciar las dos lecturas posibles del negocio que surgen de la brecha del costo, con el EBIT que implica cada una.',
      'Nombrar la prueba discriminante de cada hallazgo, en el orden en que debería pedirse.',
      'Determinar si la deriva de facturado contra despachado es corte de período o diferencia real, y qué implica para el stock y para el ingreso.',
      'Decidir si la serie contable mensual habilita la fase predictiva y, si no, sobre qué se construye la proyección.',
      'Escribir el párrafo del informe que declara qué se puede afirmar y qué queda abierto, sin elegir la lectura conveniente.',
    ],
    metodologia: [
      { k: 'Escalar a la misma base', d: 'Antes de comparar, verificar que las dos cifras midan el mismo conjunto de productos y el mismo período. Es el error más frecuente al hacer esto a mano.' },
      { k: 'Declarar la naturaleza de la medición', d: 'Con costo estándar, la prueba es una aproximación y no una medición. Eso cambia qué hipótesis es más probable, y hay que decirlo.' },
      { k: 'Usar la persistencia del signo', d: 'Por encima del 80 % de los meses con el mismo signo, ya no es ruido de corte: es un patrón que exige explicación.' },
      { k: 'Abrir toda cuenta puente', d: 'Una cuenta puente por encima del 10 % de ventas invalida la lectura del estado; con 6,8 % hay que abrirla y reclasificar antes de concluir.' },
      { k: 'Cerrar con lo que no se puede afirmar', d: 'La sección más valiosa del informe es la que declara los límites: es lo que lo hace sostenible frente a una revisión adversa.' },
    ],
  },
  model: {
    sheetTitle: 'Recomposición: las dos lecturas del negocio y sus consecuencias',
    intro:
      'Editá las celdas marfil. El modelo produce las dos lecturas del resultado, mide la persistencia del signo en la serie mensual y despliega el efecto de cada lectura sobre ROIC, EVA y valor con matrices dinámicas.',
    inputs: [
      { key: 'ventas', label: 'Ventas del ejercicio', value: 42000, fmt: 'money', unit: 'miles $' },
      { key: 'cmvContable', label: 'Costo de ventas contable', value: 27000, fmt: 'money' },
      { key: 'cmvRecompuesto', label: 'Costo de ventas recompuesto (kardex)', value: 24850, fmt: 'money' },
      { key: 'gastos', label: 'Gastos operativos', value: 10800, fmt: 'money' },
      { key: 'cuentaPuente', label: 'Cuenta puente en el resultado', value: 2856, fmt: 'money' },
      { key: 'tasa', label: 'Tasa impositiva efectiva', value: 0.35, fmt: 'pct' },
      { key: 'capital', label: 'Capital invertido', value: 11770, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.200, fmt: 'pct1' },
      { key: 'mesesMismoSigno', label: 'Meses con el mismo signo (facturado − despachado)', value: 10, fmt: 'num' },
      { key: 'mesesNegativos', label: 'Meses con egresos negativos en la serie', value: 3, fmt: 'num' },
    ],
    calcs: [
      { key: 'brechaCmv', label: 'Brecha del costo de ventas', xl: '=[cmvContable]-[cmvRecompuesto]', fmt: 'money', highlight: true },
      { key: 'brechaPct', label: 'Brecha sobre ventas', xl: '=[brechaCmv]/[ventas]', fmt: 'pct1', highlight: true },
      { key: 'ebitA', label: 'EBIT — lectura A (costo contable)', xl: '=[ventas]-[cmvContable]-[gastos]', fmt: 'money', highlight: true },
      { key: 'ebitB', label: 'EBIT — lectura B (costo recompuesto)', xl: '=[ventas]-[cmvRecompuesto]-[gastos]', fmt: 'money', highlight: true },
      { key: 'nopatA', label: 'NOPAT lectura A', xl: '=[ebitA]*(1-[tasa])', fmt: 'money' },
      { key: 'nopatB', label: 'NOPAT lectura B', xl: '=[ebitB]*(1-[tasa])', fmt: 'money' },
      { key: 'roicA', label: 'ROIC lectura A', xl: '=[nopatA]/[capital]', fmt: 'pct1' },
      { key: 'roicB', label: 'ROIC lectura B', xl: '=[nopatB]/[capital]', fmt: 'pct1' },
      { key: 'evaA', label: 'EVA lectura A', xl: '=[capital]*([roicA]-[wacc])', fmt: 'money', highlight: true },
      { key: 'evaB', label: 'EVA lectura B', xl: '=[capital]*([roicB]-[wacc])', fmt: 'money', highlight: true },
      { key: 'persistencia', label: 'Persistencia del signo', xl: '=[mesesMismoSigno]/12', fmt: 'pct', highlight: true, note: 'Por encima del 80 % deja de ser ruido de corte de período.' },
      { key: 'puentePct', label: 'Cuenta puente sobre ventas', xl: '=[cuentaPuente]/[ventas]', fmt: 'pct1', highlight: true },
      { key: 'cvSerie', label: 'Meses inválidos sobre el total', xl: '=[mesesNegativos]/12', fmt: 'pct' },
    ],
    spills: [
      {
        key: 'dosLecturas',
        title: 'Las dos lecturas del negocio, línea por línea',
        columns: ['Concepto', 'Lectura A (contable)', 'Lectura B (recompuesta)', 'Diferencia'],
        xl: '=LET(nom,{"Ventas";"Costo de ventas";"Margen bruto";"Gastos operativos";"EBIT";"NOPAT";"Cargo por el capital";"EVA"}, cargo,[capital]*[wacc], a,VSTACK([ventas],[cmvContable],[ventas]-[cmvContable],[gastos],[ebitA],[nopatA],cargo,[evaA]), b,VSTACK([ventas],[cmvRecompuesto],[ventas]-[cmvRecompuesto],[gastos],[ebitB],[nopatB],cargo,[evaB]), HSTACK(nom,a,b,b-a))',
        formats: [undefined, 'money2', 'money2', 'money2'],
        rows: 8,
        note: 'Las dos columnas son el corazón del informe: no se elige una, se presentan las dos y se nombra el dato que las separaría. Todas las filas están en miles de pesos; el cargo por el capital es el mismo en ambas lecturas porque el capital invertido no cambia — lo único que cambia es cuánto NOPAT hay para cubrirlo.',
      },
      {
        key: 'semaforo',
        title: 'Semáforo de admisibilidad de la información',
        columns: ['Prueba', 'Medición', 'Umbral', 'Estado'],
        xl: '=LET(nom,{"Brecha del costo sobre ventas";"Persistencia del signo";"Cuenta puente sobre ventas";"Meses inválidos en la serie"}, med,VSTACK([brechaPct],[persistencia],[puentePct],[cvSerie]), umb,VSTACK(0.03,0.8,0.1,0.15), est,IF(nom="Persistencia del signo",IF(med>=umb,"PATRÓN — exige explicación","Ruido de corte"),IF(med>umb,"ALERTA","Dentro de tolerancia")), HSTACK(nom,med,umb,est))',
        formats: [undefined, 'pct1', 'pct1', undefined],
        rows: 4,
        note: 'Cada prueba con su umbral declarado. El semáforo no concluye por sí solo: dispara la prueba discriminante correspondiente, que es lo que efectivamente resuelve la ambigüedad.',
      },
    ],
    conclusions: [
      { label: 'Las dos lecturas', xl: '="Lectura A (costo contable): EBIT de "&TEXT([ebitA],"#,##0")&" y EVA de "&TEXT([evaA],"#,##0")&". Lectura B (costo recompuesto desde el kardex): EBIT de "&TEXT([ebitB],"#,##0")&" y EVA de "&TEXT([evaB],"#,##0")&". La diferencia entre las dos es de "&TEXT([ebitB]-[ebitA],"#,##0")&" miles $ de EBIT: el trabajo NO elige una, presenta las dos y nombra el dato que las separa."' },
      { label: 'Prueba discriminante prioritaria', xl: '=IF([brechaPct]>0.03,"La brecha del costo es de "&TEXT([brechaPct],"0.0%")&" sobre ventas. Prueba discriminante, en orden: (1) la capa de valuación del sistema —si es legible, la ambigüedad desaparece—; (2) la composición del costo unitario, para detectar doble conteo de mano de obra y gastos indirectos; (3) el recuento físico valorizado del último cierre contra el saldo contable.","La brecha del costo está dentro de tolerancia: la recomposición confirma la contabilidad.")' },
      { label: 'Facturado contra despachado', xl: '=IF([persistencia]>=0.8,"La diferencia mantiene el mismo signo en el "&TEXT([persistencia],"0%")&" de los meses: ya no es ruido de corte de período. Hay mercadería entregada sin facturar (ingreso no reconocido y stock sobrevaluado) o facturación sin entrega (reconocimiento anticipado). Ambas hipótesis quedan abiertas hasta revisar los remitos sin comprobante asociado.","La diferencia oscila alrededor de cero: es corte de período y no afecta el ejercicio.")' },
      { label: 'Aptitud para la fase predictiva', xl: '=IF(OR([cvSerie]>0.15,[puentePct]>0.10),"La serie contable mensual NO habilita la proyección: hay "&TEXT([mesesNegativos],"0")&" meses con egresos negativos y una cuenta puente del "&TEXT([puentePct],"0.0%")&" de las ventas. La proyección se construye sobre los movimientos operativos y el informe declara por qué.","La serie contable mensual es apta para la fase predictiva.")' },
    ],
  },
  ejercicio: {
    titulo: 'La depreciación que no está',
    enunciado:
      'Al revisar el estado de resultados de una empresa metalúrgica, la línea de depreciación del ejercicio es cero. La empresa opera una planta con tornos, prensas y una línea de pintura, todos en producción. El balance muestra bienes de uso por 4.200 (miles) a valor de origen.\n\nEl contador de la empresa explica que "los bienes ya están totalmente amortizados".',
    datos: [
      { t: 'table', title: 'Datos', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Bienes de uso a valor de origen', '4.200 miles $'],
        ['Amortización acumulada', '4.200 miles $'],
        ['Valor residual contable', '0'],
        ['Depreciación del ejercicio', '0'],
        ['EBIT declarado', '1.850 miles $'],
        ['Valor de reposición estimado de la planta', '6.900 miles $'],
        ['Vida útil remanente estimada', '8 años'],
      ] },
    ],
    preguntas: [
      '¿La explicación del contador es válida contablemente? ¿Y económicamente?',
      '¿Qué le pasa al EBIT si se reconoce la depreciación económica?',
      '¿Qué le pasa al ROIC, y por qué el efecto va en dos direcciones a la vez?',
      '¿Cómo debería presentarse este hallazgo en el informe?',
    ],
    solucion: [
      { t: 'p', md: '**Contablemente la explicación es correcta:** un bien totalmente amortizado no genera cargo. **Económicamente es falsa**, y de la peor manera: la planta se sigue consumiendo, se va a tener que reponer, y el resultado que se está declarando no descuenta ese consumo. El EBIT de 1.850 está midiendo un negocio que no paga por sus activos.' },
        { t: 'formula', name: 'Depreciación económica', expr: 'Dep. económica = Valor de reposición / Vida útil remanente = 6.900 / 8 = 862,5 miles $ por año' },
      { t: 'p', md: 'El EBIT económico es `1.850 − 862,5 = 987,5`: **la mitad**. Todo el análisis de márgenes, punto de equilibrio y creación de valor construido sobre el EBIT declarado estaba midiendo otra empresa.' },
      { t: 'idea', md: '**El efecto sobre el ROIC va en dos direcciones a la vez, y por eso es tan traicionero.** El numerador cae (menos NOPAT). Pero el denominador también cambia: valuar la planta a mercado sube el capital invertido de 0 a 6.900. El ROIC contable, con numerador inflado y denominador en cero, tiende al infinito — es literalmente el indicador más engañoso que puede producir un balance. **Ése es exactamente el fenómeno del ROIC del 58 % de Maderas del Litoral.**' },
      { t: 'warn', md: 'Presentación en el informe: la ausencia de depreciación **no es un dato faltante, es una afirmación implícita** —"esta empresa no consume sus activos"— y es falsa. Va declarada como ausencia estructural, con las dos lecturas del EBIT, la depreciación económica calculada con su fuente de valor de reposición, y la aclaración de que el ROIC contable no es utilizable como indicador de gestión mientras esa línea sea cero.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El principio general de toda prueba de recomposición es:', opciones: ['Revisar dos veces el mismo cálculo.', 'Comparar dos mediciones independientes de la misma cosa.', 'Confiar en el balance auditado.', 'Usar promedios del sector.'], correcta: 1, justificacion: 'Cuando coinciden, la cifra está verificada. Cuando no, hay dos posibilidades y ninguna es "error de carga".' },
    { id: 'q2', pregunta: 'Cuando la recomposición no coincide con la contabilidad, las dos posibilidades son:', opciones: ['Error de carga o error de sistema.', 'O la contabilidad no refleja el movimiento, o el movimiento no está bien registrado.', 'Fraude o negligencia.', 'Inflación o tipo de cambio.'], correcta: 1, justificacion: 'El informe declara las dos y nombra el dato que las separaría. Elegir la lectura conveniente convierte una medición en una opinión.' },
    { id: 'q3', pregunta: 'La prueba central de la recomposición es:', opciones: ['Facturado contra ingreso.', 'Costo de ventas contra kardex valorizado.', 'Calidad de la serie contable.', 'Cuentas anómalas.'], correcta: 1, justificacion: 'Si el costo de ventas contable no coincide con el kardex valorizado, hay dos lecturas del negocio y la diferencia puede ser la mitad del EBITDA.' },
    { id: 'q4', pregunta: 'Al comparar costo recompuesto con costo contable, el error más frecuente es:', opciones: ['Usar el tipo de cambio equivocado.', 'No escalar las dos cifras a la misma base de productos y período.', 'Olvidar los impuestos.', 'Usar valores nominales.'], correcta: 1, justificacion: 'Si las dos cifras no miden la misma base, la comparación no significa nada por más que el cálculo esté bien hecho.' },
    { id: 'q5', pregunta: 'Si el sistema no expone la capa de valuación, la prueba del costo:', opciones: ['No se puede hacer.', 'Pasa de ser una medición a ser una aproximación, y hay que declararlo porque cambia la naturaleza del hallazgo.', 'Es igualmente concluyente.', 'Debe omitirse del informe.'], correcta: 1, justificacion: 'Un costo estándar viejo o con absorción completa explica por sí solo una brecha grande, sin que la contabilidad tenga nada malo.' },
    { id: 'q6', pregunta: 'La prueba discriminante de la brecha de costo, en primer lugar, es:', opciones: ['El recuento físico.', 'La capa de valuación del sistema: si es legible, la ambigüedad desaparece.', 'El estado de resultados.', 'El informe del auditor.'], correcta: 1, justificacion: 'Después vienen la composición del costo unitario (para detectar doble conteo) y el recuento físico valorizado del último cierre.' },
    { id: 'q7', pregunta: 'En la prueba de facturado contra despachado, lo que decide la lectura es:', opciones: ['El mes con mayor diferencia.', 'El acumulado y la persistencia del signo.', 'El promedio simple.', 'El último trimestre.'], correcta: 1, justificacion: 'Si oscila alrededor de cero es corte de período; si deriva en una dirección y no vuelve, hay una diferencia real.' },
    { id: 'q8', pregunta: 'La persistencia del signo por encima del 80 % de los meses indica:', opciones: ['Ruido estadístico normal.', 'Un patrón que ya no es ruido de fecha y exige explicación.', 'Un error de sistema.', 'Estacionalidad.'], correcta: 1, justificacion: 'Ese umbral convierte una intuición en un hallazgo defendible: es el estadístico que separa el corte de período de la diferencia real.' },
    { id: 'q9', pregunta: 'Mercadería despachada sin facturar implica:', opciones: ['Reconocimiento anticipado.', 'Ingreso no reconocido y stock sobrevaluado.', 'Un error de cobranza.', 'Nada relevante.'], correcta: 1, justificacion: 'La contraria —facturación sin entrega— es reconocimiento anticipado. Las dos hipótesis se distinguen revisando los remitos sin comprobante asociado.' },
    { id: 'q10', pregunta: 'Una cuenta puente dentro del resultado por encima del 10 % de las ventas:', opciones: ['Es normal en PyMEs.', 'Hace que ninguna línea del estado signifique lo que dice.', 'Solo afecta el balance.', 'Se puede ignorar si está documentada.'], correcta: 1, justificacion: 'Nombres como "ajustes", "varios", "por aplicar" o "transitoria" concentran importes que deberían estar clasificados; hasta abrirlos, el estado no es interpretable.' },
    { id: 'q11', pregunta: 'La depreciación en cero en una empresa con planta en producción es:', opciones: ['Un dato faltante.', 'Una ausencia estructural: una afirmación implícita —"esta empresa no consume sus activos"— que es falsa.', 'Correcto si están amortizados.', 'Un problema solo fiscal.'], correcta: 1, justificacion: 'Contablemente puede ser correcto y económicamente es falso: el resultado declarado no descuenta el consumo de activos que habrá que reponer.' },
    { id: 'q12', pregunta: 'Con la planta totalmente amortizada, el ROIC contable:', opciones: ['Se subestima.', 'Se infla con numerador alto y denominador cerca de cero: tiende al infinito.', 'Es correcto.', 'No se puede calcular.'], correcta: 1, justificacion: 'Es literalmente el indicador más engañoso que puede producir un balance, y explica el ROIC del 58 % del caso integrador.' },
    { id: 'q13', pregunta: 'Los indicadores de calidad de la serie contable mensual son:', opciones: ['Ventas y margen.', 'Meses con egresos negativos y coeficiente de variación del egreso sobre el ingreso.', 'Liquidez y solvencia.', 'ROIC y EVA.'], correcta: 1, justificacion: 'Deciden si el análisis predictivo puede apoyarse en la contabilidad; en la PyME familiar casi nunca puede.' },
    { id: 'q14', pregunta: 'Cuando la serie contable mensual es ruido, la proyección:', opciones: ['Se hace igual con intervalos de confianza amplios.', 'Se construye sobre los movimientos operativos y el informe declara por qué.', 'Se omite.', 'Se toma del sector.'], correcta: 1, justificacion: 'Proyectar sobre ruido y después ponerle intervalos de confianza es la forma elegante de mentir con un modelo.' },
    { id: 'q15', pregunta: 'La razón por la que la extracción se materializa en un archivo antes de correr el motor es:', opciones: ['Ahorrar tiempo.', 'La conexión al sistema es una herramienta del agente, no una biblioteca que el motor pueda invocar — y así el análisis queda reproducible.', 'Reducir el costo.', 'Requisito legal.'], correcta: 1, justificacion: 'Con los datos exactos volcados, cualquiera puede reproducir el análisis y auditar de dónde salió cada número.' },
    { id: 'q16', pregunta: 'Lo dinámico del informe interactivo es:', opciones: ['La conexión en vivo al ERP.', 'Que el país, la ruta de riesgo y la lectura del costo se cambian en la página y recalculan Ke, WACC y valuación.', 'La actualización automática de precios.', 'El envío por correo.'], correcta: 1, justificacion: 'La interactividad vive en el entregable, no en la extracción: se cambia un supuesto y todo se recalcula sin volver a correr el motor.' },
    { id: 'q17', pregunta: 'El dato más importante a conseguir de un sistema nuevo es:', opciones: ['El estado de resultados.', 'Los movimientos de stock con destino cliente, con cantidad y fecha.', 'El balance auditado.', 'El plan de cuentas.'], correcta: 1, justificacion: 'Sin eso no hay recomposición del costo, que es la prueba central de todo el trabajo.' },
    { id: 'q18', pregunta: 'Cuando la fuente es una carpeta de archivos, hay que confirmar el mapeo:', opciones: ['Después de correr el motor.', 'ANTES de correr: un archivo mal asignado produce un diagnóstico entero equivocado y el motor no puede detectarlo.', 'Solo si hay dudas.', 'No hace falta.'], correcta: 1, justificacion: 'Es el único punto del proceso donde un error humano se propaga silenciosamente hasta el informe final.' },
    { id: 'q19', pregunta: 'Si el sistema informa precio unitario con impuesto y subtotal neto, el precio neto es:', opciones: ['El precio unitario.', 'Subtotal / cantidad.', 'El promedio de ambos.', 'El precio de lista.'], correcta: 1, justificacion: 'Usar el precio unitario sobrestima el margen exactamente en el porcentaje del impuesto, en todos los productos a la vez.' },
    { id: 'q20', pregunta: 'El país, en este marco, es:', opciones: ['Un dato de contexto.', 'Un parámetro del modelo del que cuelgan tasa impositiva, riesgo país, beta sectorial y múltiplos.', 'Irrelevante si se trabaja en dólares.', 'Una nota metodológica.'], correcta: 1, justificacion: 'Cambiar el país cambia el Ke, el WACC y la valuación completa; por eso es un input y no una aclaración.' },
    { id: 'q21', pregunta: 'Las tres rutas de riesgo país son:', opciones: ['Complementarias.', 'Mutuamente excluyentes: aplicar dos es contar el mismo riesgo dos veces.', 'Equivalentes.', 'Opcionales.'], correcta: 1, justificacion: 'El sesgo del doble conteo va siempre en la misma dirección: subvaluar. Por eso pasa desapercibido.' },
    { id: 'q22', pregunta: 'En la variante Pereiro, el factor (1 − R²) multiplica:', opciones: ['El beta solo.', 'El término completo de la prima de mercado.', 'El riesgo país.', 'La tasa libre de riesgo.'], correcta: 1, justificacion: 'Es el error más frecuente y el más caro de la valuación regional: aplicarlo al riesgo país produce el sesgo opuesto al que se busca corregir.' },
    { id: 'q23', pregunta: 'Donde no hay serie de mercado para estimar el R², corresponde:', opciones: ['Usar 0,5 por convención.', 'Marcar el origen como mediana regional o no estimable, y declararlo en el informe.', 'Omitir el ajuste.', 'Usar el R² de Estados Unidos.'], correcta: 1, justificacion: 'La mediana regional sale de los mercados más integrados, así que tiende a subestimar el costo del capital: el sesgo va en contra del usuario y por eso se declara.' },
    { id: 'q24', pregunta: 'La fase 0 del trabajo es:', opciones: ['La proyección.', 'Beneish: fija el techo de confianza de todo lo demás y requiere dos ejercicios completos.', 'La valuación.', 'La entrevista con el dueño.'], correcta: 1, justificacion: 'Si la información no es admisible, el trabajo puede terminar ahí — y ése es un resultado legítimo del trabajo, no una falla.' },
    { id: 'q25', pregunta: 'Un análisis que ignora sus propios bloqueos metodológicos:', opciones: ['Es más práctico.', 'Produce un número, no un diagnóstico.', 'Es aceptable si se aclara.', 'Gana en velocidad.'], correcta: 1, justificacion: 'Los bloqueos son reales: sin información admisible no se valúa, sin serie válida no se proyecta, sin base probabilística la ruta A queda vetada.' },
    { id: 'q26', pregunta: 'El protocolo de la fase predictiva exige, en orden:', opciones: ['Red neuronal directamente.', 'Lineal de referencia, luego métodos de conjunto sobre panel, y recién entonces aprendizaje profundo si el panel lo justifica.', 'Promedio móvil.', 'Juicio experto.'], correcta: 1, justificacion: 'Decir "no hay datos suficientes para esto" vale más que producir una red neuronal sobre treinta y seis observaciones.' },
    { id: 'q27', pregunta: 'El Monte Carlo de la fase predictiva debe correr:', opciones: ['Alrededor del modelo, sobre el resultado final.', 'A TRAVÉS del modelo ajustado.', 'Solo sobre las ventas.', 'Con exactamente 1.000 iteraciones.'], correcta: 1, justificacion: 'Simular alrededor del modelo describe la incertidumbre de un supuesto, no la del proceso; y el criterio de parada es por tolerancia, no por un número fijo de iteraciones.' },
    { id: 'q28', pregunta: 'La verificación que cierra el modelo de valuación es:', opciones: ['Que el valor terminal no supere el 70 %.', 'Que el DCF de FCFF coincida con Capital invertido + Σ EVA descontados.', 'Que el WACC sea menor al ROIC.', 'Que el crecimiento sea positivo.'], correcta: 1, justificacion: 'Si no coinciden, hay una inconsistencia entre las definiciones de capital, NOPAT y flujo. Es el mejor test de armado de todo el modelo.' },
    { id: 'q29', pregunta: 'La primera pregunta de todo trabajo nuevo es:', opciones: ['¿Cuánto vale la empresa?', '¿Dónde vive la información de este cliente?', '¿Cuál es el sector?', '¿Quiénes son los socios?'], correcta: 1, justificacion: 'De esa respuesta depende qué pruebas se pueden correr, y por lo tanto qué tan lejos puede llegar el diagnóstico. Ninguna sofisticación posterior compensa una extracción pobre.' },
    { id: 'q30', pregunta: 'El campo obligatorio de toda prueba de recomposición es:', opciones: ['El importe de la brecha.', 'La prueba discriminante: el dato concreto que resolvería la ambigüedad.', 'El nombre del responsable.', 'La fecha de corte.'], correcta: 1, justificacion: 'Es lo que convierte un hallazgo incómodo en una tarea concreta, y lo que separa este informe de una opinión.' },
  ],
  bibliografia: [
    'Palepu, K. & Healy, P. — *Business Analysis and Valuation Using Financial Statements*',
    'Schilit, H. & Perler, J. — *Financial Shenanigans*',
    'Beneish, M. — “The Detection of Earnings Manipulation” (1999)',
    'Damodaran, A. — parámetros por mercado y primas de riesgo país (actualización anual)',
    'Pereiro, L. — *Valuation of Companies in Emerging Markets*',
    'Koller, Goedhart & Wessels — *Valuation*, capítulo de reorganización de estados financieros',
    'Método de cuatro fases de JPR Consulting — documentación interna del expediente de trabajo',
  ],
}
