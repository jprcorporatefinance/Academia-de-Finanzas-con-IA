import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 2.3 — Modelado Financiero Avanzado en Excel 365 con Matrices
// Dinámicas
// ============================================================================
export const a2_3: Asignatura = {
  cod: '2.3',
  slug: 'a2-3',
  cuatrimestre: 2,
  fase: 'Diagnóstica · ¿Por qué sucedió?',
  nombre: 'Modelado Financiero Avanzado en Excel 365 con Matrices Dinámicas',
  horas: '36 h · 10 teóricas / 26 prácticas',
  correlativas: 'Correlativa: 1.3 · Segundo cuatrimestre',
  framework: 'Matrices dinámicas · Claude para Excel · Rossi · Benninga',
  resumen:
    'Construir modelos financieros profesionales, auditables y mantenibles con el motor de matrices dinámicas de Excel 365. Se forma en los estándares modernos de las principales firmas: NO se enseña la metodología FAST.',
  objetivos: [
    'Construir modelos financieros auditables empleando exclusivamente el motor de matrices dinámicas de Excel 365.',
    'Diseñar la arquitectura del modelo conforme a los estándares contemporáneos de las firmas líderes.',
    'Integrar Claude para Excel al flujo de trabajo, verificando y aceptando o rechazando cada cambio.',
    'Auditar modelos ajenos, contrastando la auditoría manual con la asistida.',
    'Documentar cada número con su fórmula y su interpretación económica.',
  ],
  sections: [
    {
      title: 'El motor de matrices dinámicas',
      intro: 'El cambio de paradigma: una fórmula que “derrama” un resultado completo, en lugar de miles de fórmulas replicadas celda a celda.',
      blocks: [
        { t: 'p', md: 'El derrame (*spill*) y las referencias de rango derramado son la base. Sobre ellas se apoyan las funciones que reemplazan al arrastre: `LET` (nombrar subexpresiones), `LAMBDA` (definir funciones propias), `SEQUENCE` y `MAKEARRAY` (generar arreglos), `SCAN` y `REDUCE` (cálculo recursivo: saldos, amortización, arrastre de quebrantos), `BYROW`/`BYCOL`/`MAP`, `MMULT`, `VSTACK`/`HSTACK`, y `FILTER`/`SORT`/`UNIQUE`/`GROUPBY`.' },
        { t: 'idea', md: 'La diferencia no es cosmética: un modelo de matrices dinámicas tiene **una** fórmula por lógica, no diez mil. Cambia la estructura y no hay que “volver a arrastrar”: el modelo se adapta solo. Es más corto, más robusto y **auditable de un vistazo**.' },
        { t: 'warn', md: 'Restricción operativa del programa: los modelos se construyen y abren **exclusivamente en Microsoft Excel 365**. Las suites alternativas que no soportan el motor de matrices dinámicas corrompen las fórmulas.' },
      ],
    },
    {
      title: 'Arquitectura del modelo (y por qué NO FAST)',
      intro: 'La estructura es lo que hace a un modelo mantenible. El programa forma en los estándares modernos, no en la metodología FAST.',
      blocks: [
        { t: 'ul', items: [
          '**Separación estricta:** entradas, cálculos, salidas y documentación en capas distintas. Una **hoja de supuestos única y trazable**.',
          '**Convención de formato:** entradas sobre fondo gris claro con texto azul; vínculos entre hojas en verde. El color comunica el rol de cada celda.',
          '**Control de circularidad sin iteración** y **versionado** del modelo.',
        ] },
        { t: 'p', md: 'Se enseña explícitamente por qué **no se admite la metodología FAST**: su dependencia de fórmulas replicadas celda a celda la vuelve frágil ante cambios estructurales y opaca de auditar. El motor de matrices dinámicas resuelve exactamente esas dos debilidades.' },
        { t: 'quote', author: 'Simon Benninga', credential: 'Financial Modeling (MIT Press)', md: 'Un buen modelo financiero no es el que tiene más fórmulas, sino el que un tercero puede entender, auditar y modificar sin miedo a romperlo.' },
      ],
    },
    {
      title: 'Cálculo recursivo sin arrastrar: SCAN y REDUCE',
      intro: 'La técnica emblemática: una tabla de amortización completa desde una sola fórmula.',
      blocks: [
        { t: 'p', md: 'Los saldos que dependen del período anterior —una tabla de amortización, el arrastre de quebrantos, un saldo de caja acumulado— eran el reino del arrastre. Con `SCAN` se resuelven en una sola fórmula: `SCAN` recorre un arreglo llevando un acumulador, exactamente como un bucle, pero sin celdas intermedias.' },
        { t: 'formula', name: 'Amortización francesa', expr: 'Cuota = P × r ÷ (1 − (1 + r)^−n)', where: 'Interés_t = Saldo_{t−1} × r · Amortización_t = Cuota − Interés_t · Saldo_t = Saldo_{t−1} − Amortización_t', note: 'El saldo se propaga con SCAN; toda la tabla derrama de una sola fórmula. Es el ejemplo canónico de “no arrastrar”.' },
        { t: 'idea', md: '`REDUCE` es el primo de `SCAN` que devuelve solo el resultado final (por ejemplo, el saldo al vencimiento). `SCAN` devuelve toda la trayectoria. Juntos cubren casi todo el cálculo recursivo financiero.' },
      ],
    },
    {
      title: 'Redes neuronales dentro de la planilla',
      intro: 'El fundamento pedagógico: comprender la mecánica antes de delegarla en una librería.',
      blocks: [
        { t: 'p', md: 'Una red neuronal de propagación hacia adelante es, en el fondo, una secuencia de **multiplicaciones de matrices** seguidas de una función de activación. Con `MMULT`, `LAMBDA` y `REDUCE` se construye una red profunda **sin macros**, dentro de la planilla.' },
        { t: 'formula', name: 'Propagación de una capa', expr: 'a = f( x · W + b )', where: 'x = entradas · W = pesos (MMULT) · b = sesgo · f = activación (p. ej. ReLU: max(0, z))', note: 'La misma operación matricial que se estudió en álgebra lineal (1.3). Entenderla en Excel desmitifica el aprendizaje profundo del tercer cuatrimestre.' },
      ],
    },
    {
      title: 'Claude para Excel y la auditoría',
      intro: 'La IA se integra al flujo de modelado, pero el criterio y la responsabilidad son del estudiante.',
      blocks: [
        { t: 'p', md: '**Claude para Excel** es un complemento que opera desde un **panel lateral** dentro del libro: lee el libro entero, entiende las dependencias entre celdas y pestañas, edita **preservando la estructura de fórmulas**, depura errores (`#REF!`, `#VALUE!`, referencias circulares) rastreándolos hasta su origen, y **cita a nivel de celda** cada explicación. Desde enero de 2026 está disponible de forma general para suscriptores Pro, con elección de modelo desde la interfaz.' },
        { t: 'steps', title: 'Régimen de uso en la asignatura', items: [
          { k: 'El estudiante enuncia la intención', d: 'En lenguaje financiero: qué debe calcular el bloque y por qué.' },
          { k: 'El agente propone', d: 'Construye o corrige, con sus cambios resaltados y explicados.' },
          { k: 'El estudiante verifica y decide', d: 'Celda por celda, acepta o rechaza. Ninguna modificación entra sin revisión.' },
        ] },
        { t: 'warn', md: 'Riesgos trabajados explícitamente: fórmulas sintácticamente correctas pero **financieramente equivocadas**; supuestos implícitos no declarados; y la tentación de aceptar una salida que no se comprende. **Un modelo que el estudiante no puede explicar línea por línea no se aprueba, lo haya escrito él o el agente.**' },
        { t: 'quote', author: 'Juan Pablo Rossi', credential: 'Analítica Avanzada con Microsoft Excel para el CFO Actual', md: 'La IA no reemplaza el criterio financiero: lo apalanca. El agente construye y audita; la responsabilidad de que el número sea correcto sigue siendo del profesional.' },
      ],
    },
  ],
  expertos: [
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — texto nuclear del programa', md: 'El estándar moderno de modelado se apoya en matrices dinámicas y en una arquitectura auditable. La metodología FAST quedó atrás: fórmula replicada es deuda técnica.' },
    { author: 'Simon Benninga', credential: 'Financial Modeling', md: 'El modelo es una herramienta de pensamiento, no un fin. Su valor está en las decisiones que habilita, no en su complejidad.' },
    { author: 'Danielle Stein Fairhurst', credential: 'Using Excel for Business Analysis', md: 'La consistencia, la transparencia y la documentación separan un modelo profesional de una planilla que solo su autor entiende —hasta que la olvida.' },
  ],
  caso: {
    titulo: 'La tabla de amortización sin arrastrar',
    empresa: 'Maderas del Litoral S.A. — el préstamo de la ampliación',
    contexto:
      'Para financiar la ampliación de planta (asignatura 1.3), Maderas del Litoral toma un préstamo de 8.000 (miles) a 24 meses por sistema francés. El área financiera necesita el cuadro de marcha completo —cuota, interés, amortización y saldo mes a mes— y un modelo que se recalcule solo si cambian la tasa o el plazo.\n\nEl consultor lo construye con matrices dinámicas: una sola fórmula con `SCAN` derrama las 24 filas. Nada de arrastrar. Y de paso arma, dentro de la misma planilla, una capa de red neuronal con `MMULT` para mostrar que el aprendizaje profundo del tercer cuatrimestre no es magia: es álgebra matricial.',
    datos: [
      { t: 'table', title: 'Datos del préstamo', headers: ['Parámetro', 'Valor'], firstColLeft: true, rows: [
        ['Capital (principal)', '8.000 miles $'],
        ['Tasa mensual', '5,0%'],
        ['Plazo', '24 meses'],
        ['Sistema', 'Francés (cuota constante)'],
      ] },
    ],
    consigna: [
      '¿Cuál es la cuota constante del sistema francés?',
      '¿Cómo se arma la tabla completa (interés, amortización, saldo) con una sola fórmula usando SCAN?',
      '¿Cuánto se paga de interés total a lo largo del préstamo?',
      '¿Cómo se computa la salida de una capa de red neuronal con MMULT dentro de la planilla?',
    ],
    metodologia: [
      { k: 'Cuota', d: 'Cuota = P·r/(1−(1+r)^−n).' },
      { k: 'Saldos (SCAN)', d: 'Propagar el saldo período a período con SCAN, sin celdas intermedias.' },
      { k: 'Derivar', d: 'Interés = saldo previo × r; amortización = cuota − interés.' },
      { k: 'Verificar', d: 'El saldo final debe ser cero; el total amortizado, igual al capital.' },
      { k: 'MMULT', d: 'Salida de capa = activación(entradas · pesos + sesgo).' },
    ],
  },
  model: {
    sheetTitle: 'Amortización francesa con SCAN y capa de red neuronal con MMULT',
    intro:
      'Editá capital, tasa y plazo (celdas marfil). La tabla de amortización deriva de UNA fórmula con SCAN (sin arrastrar): cambiá el plazo y la tabla se ajusta sola. La capa de red neuronal se calcula con MMULT.',
    inputs: [
      { key: 'principal', label: 'Capital (principal)', value: 8000, fmt: 'money', unit: 'miles $' },
      { key: 'tasaPer', label: 'Tasa mensual', value: 0.05, fmt: 'pct1' },
      { key: 'nper', label: 'Plazo (meses)', value: 24, fmt: 'num' },
    ],
    calcs: [
      { key: 'cuota', label: 'Cuota constante (sistema francés)', xl: '=[principal]*[tasaPer]/(1-(1+[tasaPer])^-[nper])', fmt: 'money', highlight: true },
      { key: 'interesTotal', label: 'Interés total del préstamo', xl: '=[cuota]*[nper]-[principal]', fmt: 'money', highlight: true },
      { key: 'costoTotal', label: 'Total pagado', xl: '=[cuota]*[nper]', fmt: 'money' },
    ],
    spills: [
      {
        key: 'amort',
        title: 'Cuadro de marcha (una sola fórmula con SCAN — no se arrastra)',
        columns: ['Período', 'Cuota', 'Interés', 'Amortización', 'Saldo'],
        xl: '=LET(P,[principal], r,[tasaPer], n,[nper], q,P*r/(1-(1+r)^-n), per,SEQUENCE(n), saldos,SCAN(P,per,LAMBDA(acc,i,acc-(q-acc*r))), prev,VSTACK(P,DROP(saldos,-1)), interes,prev*r, amort,q-interes, HSTACK(per, per*0+q, interes, amort, saldos))',
        formats: ['num', 'money', 'money', 'money', 'money'],
        rows: 24,
        note: 'SCAN propaga el saldo período a período llevando un acumulador; VSTACK/DROP arman el saldo previo para el interés. Una sola fórmula derrama las 24 filas: cambiá el plazo y se reajusta.',
      },
      {
        key: 'nn',
        title: 'Capa de red neuronal (MMULT + ReLU)',
        columns: ['Neurona', 'Pre-activación z', 'Activación ReLU a'],
        xl: '=LET(x,{0.5,0.8,0.2}, W,{0.3,-0.2;0.1,0.4;-0.5,0.6}, b,{0.1,-0.1}, z,MMULT(x,W)+b, a,IF(z>0,z,0), HSTACK(SEQUENCE(2),TOCOL(z),TOCOL(a)))',
        formats: ['num', 'num2', 'num2'],
        rows: 2,
        note: 'MMULT multiplica el vector de entradas por la matriz de pesos; se suma el sesgo y se aplica ReLU. Es la misma álgebra del aprendizaje profundo (3.2), dentro de la planilla y sin macros.',
      },
    ],
    conclusions: [
      { label: 'Préstamo', xl: '="Cuota "&TEXT([cuota],"#,##0")&" durante "&[nper]&" meses. Interés total "&TEXT([interesTotal],"#,##0")&" ("&TEXT([interesTotal]/[principal],"0.0%")&" sobre el capital). El saldo final de la tabla debe ser 0."' },
      { label: 'Método', xl: '="Toda la tabla deriva de una sola fórmula con SCAN: si cambiás el plazo o la tasa, se recalcula sola. Esto es lo que la metodología FAST (arrastre celda a celda) no puede hacer sin reconstruirse."' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: '¿Qué ventaja central tienen las matrices dinámicas sobre el arrastre de fórmulas?', opciones: ['Se ven más lindas.', 'Una fórmula por lógica (no miles): el modelo se adapta a cambios estructurales sin “volver a arrastrar”.', 'Calculan más rápido siempre.', 'No necesitan Excel.'], correcta: 1, justificacion: 'La clave es estructural: una sola fórmula por lógica hace el modelo robusto y auditable, y se adapta al cambiar dimensiones. No es estética, no siempre es más rápido y requiere Excel 365.' },
    { id: 'q2', pregunta: '¿Qué función se usa para el cálculo recursivo (saldos que dependen del período anterior) sin arrastrar?', opciones: ['SUMA.', 'SCAN (y REDUCE para el resultado final).', 'BUSCARV.', 'CONCATENAR.'], correcta: 1, justificacion: 'SCAN recorre un arreglo llevando un acumulador (toda la trayectoria) y REDUCE devuelve el final. SUMA, BUSCARV o CONCATENAR no hacen recursión.' },
    { id: 'q3', pregunta: 'La diferencia entre SCAN y REDUCE es:', opciones: ['Ninguna.', 'SCAN devuelve toda la trayectoria; REDUCE solo el resultado final.', 'REDUCE es más lento.', 'SCAN no existe.'], correcta: 1, justificacion: 'SCAN entrega cada paso intermedio (útil para la tabla completa); REDUCE colapsa al valor final (p. ej. saldo al vencimiento). Ambas existen y son eficientes.' },
    { id: 'q4', pregunta: '¿Por qué el programa NO enseña la metodología FAST?', opciones: ['Por moda.', 'Porque depende de fórmulas replicadas celda a celda: frágil ante cambios y opaca de auditar.', 'Porque es demasiado moderna.', 'Porque no usa Excel.'], correcta: 1, justificacion: 'FAST se apoya en el arrastre, lo que la vuelve frágil y difícil de auditar; el motor de matrices dinámicas resuelve esas debilidades. No es cuestión de moda ni de antigüedad.' },
    { id: 'q5', pregunta: 'La cuota del sistema francés es:', opciones: ['P × r × n.', 'P × r / (1 − (1 + r)^−n).', 'P / n.', 'P × (1 + r)^n.'], correcta: 1, justificacion: 'La cuota constante del sistema francés es P·r/(1−(1+r)^−n). Las otras expresiones no producen cuota constante con amortización creciente.' },
    { id: 'q6', pregunta: 'En el sistema francés, a lo largo del préstamo:', opciones: ['El interés crece y la amortización cae.', 'El interés cae y la amortización crece, con cuota constante.', 'Ambos son constantes.', 'La cuota crece.'], correcta: 1, justificacion: 'Con cuota constante, al bajar el saldo el interés decrece y la amortización aumenta. La cuota no crece; interés y amortización no son constantes.' },
    { id: 'q7', pregunta: 'La convención de formato del programa marca las celdas de entrada:', opciones: ['En rojo.', 'Sobre fondo gris claro con texto azul.', 'Sin ningún formato.', 'En negrita únicamente.'], correcta: 1, justificacion: 'Entradas en gris claro con texto azul, y vínculos entre hojas en verde: el color comunica el rol de la celda. No es rojo ni ausencia de formato.' },
    { id: 'q8', pregunta: 'Una red neuronal de propagación hacia adelante es, esencialmente:', opciones: ['Magia estadística.', 'Multiplicaciones de matrices (MMULT) seguidas de una activación.', 'Una macro obligatoria.', 'Una función de BUSCARV.'], correcta: 1, justificacion: 'Cada capa es x·W + b seguido de una activación; se construye con MMULT sin macros. No es magia ni depende de BUSCARV.' },
    { id: 'q9', pregunta: 'La función de activación ReLU se define como:', opciones: ['min(0, z).', 'max(0, z).', 'z².', '1/z.'], correcta: 1, justificacion: 'ReLU = max(0, z): deja pasar los positivos y anula los negativos. No es el mínimo, ni el cuadrado, ni la inversa.' },
    { id: 'q10', pregunta: '¿Qué hace Claude para Excel según su funcionamiento actual (2026)?', opciones: ['Solo escribe texto en un chat aparte.', 'Opera en un panel lateral, lee el libro entero, preserva dependencias y cita a nivel de celda.', 'Reemplaza a Excel.', 'Borra el libro.'], correcta: 1, justificacion: 'El complemento vive en un panel lateral, entiende todo el libro y sus dependencias, y explica citando celdas. No es un chat aislado, no reemplaza Excel ni borra datos (avisa antes de sobrescribir).' },
    { id: 'q11', pregunta: 'El régimen de uso de la IA en la asignatura establece que:', opciones: ['El agente decide y el estudiante firma.', 'El estudiante verifica celda por celda y acepta o rechaza cada cambio.', 'No se revisa nada.', 'La IA no se usa.'], correcta: 1, justificacion: 'El control es del estudiante: verifica y decide cada cambio; ninguna modificación entra sin revisión. No es delegación ciega ni prohibición.' },
    { id: 'q12', pregunta: 'La regla de aprobación respecto de los modelos dice que:', opciones: ['Basta con que funcione.', 'Un modelo que el estudiante no puede explicar línea por línea no se aprueba, lo haya escrito él o el agente.', 'Si lo hizo la IA, se aprueba solo.', 'La explicación es opcional.'], correcta: 1, justificacion: 'La comprensión es condición de aprobación: hay que poder explicar cada línea, sin importar quién la escribió. Que “funcione” no alcanza.' },
    { id: 'q13', pregunta: 'Un riesgo específico de usar IA en modelado financiero es:', opciones: ['Que las fórmulas sean demasiado correctas.', 'Fórmulas sintácticamente correctas pero financieramente equivocadas.', 'Que Excel se vuelva más lento.', 'Que no haya errores nunca.'], correcta: 1, justificacion: 'El riesgo sutil es la fórmula que “compila” pero está mal desde lo económico (supuesto implícito, lógica errada). Por eso se verifica el criterio, no solo la sintaxis.' },
    { id: 'q14', pregunta: 'La auditoría de un modelo incluye:', opciones: ['Solo mirar el resultado final.', 'Rastrear precedentes y dependientes, pruebas de esquina y documentación para un tercero.', 'Confiar en el autor.', 'Cambiar los colores.'], correcta: 1, justificacion: 'Auditar es trazar dependencias, probar casos límite y dejar documentación reproducible. Mirar solo el resultado o confiar sin verificar no es auditoría.' },
    { id: 'q15', pregunta: '¿En qué software se construyen y abren los modelos del programa?', opciones: ['En cualquier hoja de cálculo.', 'Exclusivamente en Microsoft Excel 365 (por el motor de matrices dinámicas).', 'Solo en Google Sheets.', 'En un editor de texto.'], correcta: 1, justificacion: 'Solo Excel 365 soporta plenamente el motor de matrices dinámicas; otras suites corrompen las fórmulas. Por eso el programa lo exige.' },
    { id: 'q16', pregunta: 'El “derrame” (spill) de una fórmula de matriz dinámica es:', opciones: ['Un error.', 'Que una sola fórmula devuelva un rango completo de resultados.', 'Un formato de celda.', 'Una macro.'], correcta: 1, justificacion: 'El spill es la capacidad de una fórmula de “derramar” su resultado a varias celdas. No es un error ni una macro.' },
    { id: 'q17', pregunta: 'La función LET sirve para:', opciones: ['Borrar celdas.', 'Nombrar subexpresiones dentro de una fórmula (legibilidad y eficiencia).', 'Imprimir.', 'Crear gráficos.'], correcta: 1, justificacion: 'LET asigna nombres a cálculos intermedios, haciendo la fórmula más legible y eficiente (se evalúan una vez). No borra ni grafica.' },
    { id: 'q18', pregunta: 'La función LAMBDA permite:', opciones: ['Definir funciones propias reutilizables sin macros.', 'Borrar hojas.', 'Cambiar el idioma.', 'Nada.'], correcta: 0, justificacion: 'LAMBDA define funciones personalizadas (recursivas o no) sin VBA. Es la base de SCAN/REDUCE/MAP/BYROW.' },
    { id: 'q19', pregunta: 'SEQUENCE genera:', opciones: ['Un número aleatorio.', 'Un arreglo de números consecutivos (p. ej. los períodos).', 'Un gráfico.', 'Una macro.'], correcta: 1, justificacion: 'SEQUENCE crea arreglos de números (períodos, índices) para alimentar cálculos vectorizados. No es aleatorio (eso es RANDARRAY).' },
    { id: 'q20', pregunta: 'MMULT realiza:', opciones: ['La suma de celdas.', 'La multiplicación de matrices.', 'Un promedio.', 'Un ordenamiento.'], correcta: 1, justificacion: 'MMULT multiplica matrices; se usa para consolidar modelos y propagar capas de redes neuronales dentro de la planilla.' },
    { id: 'q21', pregunta: 'En la convención de formato del programa, los vínculos entre hojas se marcan:', opciones: ['En rojo.', 'En verde.', 'En amarillo.', 'Sin color.'], correcta: 1, justificacion: 'Entradas en gris con texto azul; vínculos entre hojas en verde. El color comunica el rol de la celda.' },
    { id: 'q22', pregunta: 'Una “hoja de supuestos única y trazable” busca:', opciones: ['Esconder los inputs.', 'Concentrar y documentar los supuestos en un solo lugar auditable.', 'Duplicar datos.', 'Acelerar Excel.'], correcta: 1, justificacion: 'Centralizar los supuestos evita inconsistencias y hace el modelo auditable. No es para esconder ni duplicar.' },
    { id: 'q23', pregunta: 'El control de circularidad “sin iteración” implica:', opciones: ['Activar el cálculo iterativo siempre.', 'Diseñar el modelo para evitar referencias circulares en vez de tolerarlas.', 'Borrar fórmulas.', 'Usar macros.'], correcta: 1, justificacion: 'El estándar evita la circularidad por diseño (p. ej. resolviendo el interés de deuda sin bucle), en vez de habilitar iteración frágil.' },
    { id: 'q24', pregunta: 'La debilidad de fondo de la metodología FAST es:', opciones: ['Ser demasiado moderna.', 'Depender de fórmulas replicadas celda a celda: frágil ante cambios y opaca de auditar.', 'No usar Excel.', 'Ser gratis.'], correcta: 1, justificacion: 'El arrastre celda a celda la vuelve frágil y difícil de auditar; las matrices dinámicas resuelven esas dos debilidades.' },
    { id: 'q25', pregunta: 'Claude para Excel opera:', opciones: ['En una web separada.', 'En un panel lateral dentro del libro, leyendo y editando la planilla.', 'Solo en la nube sin ver el libro.', 'Como una macro.'], correcta: 1, justificacion: 'El complemento vive en un panel lateral, entiende el libro completo y sus dependencias, y edita citando celdas.' },
    { id: 'q26', pregunta: 'El régimen de uso de la IA exige que el estudiante:', opciones: ['Acepte todo sin mirar.', 'Verifique celda por celda y acepte o rechace cada cambio.', 'No use la IA.', 'Delegue la responsabilidad.'], correcta: 1, justificacion: 'El control es del estudiante: verifica y decide cada cambio propuesto por el agente. La responsabilidad es humana.' },
    { id: 'q27', pregunta: 'Auditar un modelo incluye:', opciones: ['Mirar solo el número final.', 'Rastrear precedentes y dependientes y hacer pruebas de esquina.', 'Confiar en el autor.', 'Cambiar colores.'], correcta: 1, justificacion: 'La auditoría traza dependencias y prueba casos límite, con documentación para un tercero. Mirar el resultado o confiar sin más no es auditar.' },
    { id: 'q28', pregunta: 'REDUCE, a diferencia de SCAN:', opciones: ['Devuelve toda la trayectoria.', 'Devuelve solo el resultado final del cálculo recursivo.', 'No existe.', 'Es más lento siempre.'], correcta: 1, justificacion: 'REDUCE colapsa al valor final (p. ej. saldo al vencimiento); SCAN entrega cada paso intermedio.' },
    { id: 'q29', pregunta: 'Un riesgo específico de usar IA para modelar es:', opciones: ['Fórmulas demasiado correctas.', 'Fórmulas sintácticamente correctas pero financieramente equivocadas.', 'Que Excel se cierre.', 'No tener errores nunca.'], correcta: 1, justificacion: 'El peligro sutil es la fórmula que “compila” pero está mal desde lo económico; por eso se verifica el criterio, no solo la sintaxis.' },
    { id: 'q30', pregunta: 'La regla de aprobación del programa respecto de los modelos es:', opciones: ['Basta con que funcione.', 'El estudiante debe poder explicar cada línea, la haya escrito él o la IA.', 'Si lo hizo la IA, aprueba solo.', 'La explicación es opcional.'], correcta: 1, justificacion: 'La comprensión es condición de aprobación: hay que explicar cada línea. Que “funcione” no alcanza.' },
  ],
  bibliografia: [
    'Rossi, J. P. — *Analítica Avanzada con Microsoft Excel para el CFO Actual* — texto nuclear',
    'Pignataro, P. — *Financial Modeling and Valuation*',
    'Benninga, S. — *Financial Modeling*',
    'Schlosser, A. — *Corporate Finance: A Model Building Approach*',
    'Microsoft — documentación técnica de matrices dinámicas, LAMBDA y LET',
    'Anthropic — Claude para Excel (guía y notas de versión, 2026)',
  ],
}
