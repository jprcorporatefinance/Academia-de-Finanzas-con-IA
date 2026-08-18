import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 3.4 — Ingeniería de Agentes de Inteligencia Artificial para la
// Función Financiera
// ============================================================================
export const a3_4: Asignatura = {
  cod: '3.4',
  slug: 'a3-4',
  cuatrimestre: 3,
  fase: 'Predictiva · ¿Qué es probable que ocurra?',
  nombre: 'Ingeniería de Agentes de Inteligencia Artificial para la Función Financiera',
  horas: '36 h · 12 teóricas / 24 prácticas',
  correlativas: 'Correlativas: 1.2 y 3.2 · Tercer cuatrimestre',
  framework: 'Anthropic (MCP) · Russell & Norvig · Chip Huyen',
  resumen:
    'Diseñar, construir y gobernar agentes de inteligencia artificial para la función financiera: un modelo de lenguaje que razona, usa herramientas (el servidor MCP de la 1.2) y actúa bajo guardarraíles, con el humano en el bucle y auditoría de cada paso.',
  objetivos: [
    'Comprender qué es un agente: modelo + herramientas + memoria + bucle de razonamiento y acción.',
    'Conectar el agente a las herramientas del ERP mediante el servidor MCP de la asignatura 1.2.',
    'Diseñar guardarraíles, puntos de control humano y registro de auditoría.',
    'Evaluar el agente y gestionar sus riesgos (alucinación, sobre-automatización, gobernanza).',
  ],
  sections: [
    {
      title: 'Qué es un agente',
      intro: 'Un agente no es un chatbot: es un sistema que percibe, razona, decide qué herramienta usar, actúa y observa el resultado, en un bucle, hasta cumplir un objetivo.',
      blocks: [
        { t: 'formula', name: 'Anatomía de un agente', expr: 'Agente = Modelo (razonamiento) + Herramientas (acción) + Memoria (contexto) + Bucle (percibir → decidir → actuar → observar)', note: 'La diferencia con un simple prompt: el agente elige acciones, las ejecuta contra el mundo real y reacciona a lo que observa.' },
        { t: 'p', md: 'En la tradición de Russell y Norvig, un **agente racional** percibe su entorno y actúa para maximizar su objetivo. Un agente de IA moderno usa un modelo de lenguaje como motor de razonamiento y **herramientas** como manos: consultar el ERP, calcular en la planilla, enviar un correo, generar un informe.' },
        { t: 'idea', md: 'La conexión con el programa: las **herramientas del agente son el servidor MCP** de la asignatura 1.2. El agente no accede a la base directamente; llama a herramientas auditadas de sólo lectura. La trazabilidad del dato sobrevive incluso cuando quien consulta es una IA.' },
      ],
    },
    {
      title: 'Patrones de diseño de agentes',
      intro: 'No todo problema necesita un agente autónomo. La ingeniería consiste en elegir el patrón más simple que funcione.',
      blocks: [
        { t: 'ul', items: [
          '**Razonar y actuar (ReAct):** el agente alterna pensamiento y acción, decidiendo el próximo paso según lo observado.',
          '**Planificación:** descompone un objetivo en subtareas antes de ejecutarlas.',
          '**Reflexión:** el agente critica su propia salida y la corrige (el auditor escéptico incorporado).',
          '**Multi-agente:** varios agentes especializados (uno extrae, otro modela, otro redacta) coordinados.',
        ] },
        { t: 'quote', author: 'Documentación de agentes (Anthropic)', credential: 'Building effective agents', md: 'Empezá con la solución más simple posible y agregá complejidad solo cuando demuestre su valor. Muchos problemas se resuelven con un flujo de trabajo bien definido, no con un agente autónomo.' },
        { t: 'warn', md: 'La autonomía tiene un costo: cuanto más decide el agente por su cuenta, más difícil es predecir y auditar su comportamiento. En finanzas, la autonomía se concede de a poco y sobre acciones reversibles.' },
      ],
    },
    {
      title: 'Guardarraíles, humano en el bucle y auditoría',
      intro: 'En la función financiera, un agente sin controles es un pasivo. El gobierno se diseña junto con el agente, no después.',
      blocks: [
        { t: 'ul', items: [
          '**Sólo lectura por defecto:** el agente consulta y propone; las acciones que mueven dinero o modifican registros pasan por aprobación humana.',
          '**Humano en el bucle** en los puntos críticos: aprobar un pago, enviar un informe al directorio, rechazar un crédito.',
          '**Registro de auditoría de cada paso:** qué herramienta llamó, con qué parámetros, qué obtuvo y qué decidió — el mismo principio del servidor MCP.',
          '**Límites y permisos** explícitos: qué puede y qué no puede hacer el agente.',
        ] },
        { t: 'quote', author: 'Chip Huyen', credential: 'AI Engineering', md: 'La confiabilidad de un sistema de IA no viene del modelo, sino de la ingeniería alrededor: evaluación, monitoreo, guardarraíles y la posibilidad de intervención humana.' },
      ],
    },
    {
      title: 'Evaluación, riesgos y la decisión de automatizar',
      intro: 'No todo se debe automatizar. La decisión es económica y de riesgo, no tecnológica.',
      blocks: [
        { t: 'ul', items: [
          '**Evaluación:** conjuntos de prueba con casos conocidos; medir acierto, no impresión. Un agente que “parece” funcionar no es un agente evaluado.',
          '**Alucinación:** el modelo puede inventar con seguridad; por eso toda cifra debe ser trazable a una herramienta, no generada por el modelo.',
          '**Sobre-automatización:** automatizar una tarea mal entendida multiplica el error. Primero se entiende y ordena el proceso, después se automatiza.',
          '**Gobernanza:** responsabilidad, confidencialidad (Ley 25.326) y la regla de oro: la responsabilidad final es humana.',
        ] },
        { t: 'idea', md: 'La decisión de qué automatizar se prioriza por **retorno y factibilidad**: tareas frecuentes, repetitivas, de reglas claras y bajo riesgo primero. Una tarea infrecuente, ambigua y de alto riesgo es la última candidata, por más “automatizable” que parezca.' },
      ],
    },
  ],
  expertos: [
    { author: 'Documentación de agentes (Anthropic)', credential: 'Building effective agents', md: 'Distinguí flujos de trabajo (pasos predefinidos) de agentes (el modelo dirige el proceso). La mayoría de las aplicaciones exitosas usan patrones simples y componibles, no autonomía máxima.' },
    { author: 'Stuart Russell & Peter Norvig', credential: 'Artificial Intelligence: A Modern Approach', md: 'Un agente racional actúa para maximizar su medida de desempeño dada la información disponible. El diseño empieza por definir con precisión ese objetivo y ese entorno.' },
    { author: 'Chip Huyen', credential: 'AI Engineering', md: 'Antes de preguntar “¿qué modelo uso?”, preguntá “¿cómo sé si funciona?”. Sin evaluación, no hay ingeniería, solo demostraciones.' },
  ],
  caso: {
    titulo: '¿Qué le conviene automatizar a la función financiera?',
    empresa: 'Maderas del Litoral S.A. — el agente financiero',
    contexto:
      'Con el servidor MCP ya construido (asignatura 1.2), Maderas del Litoral podría poner un agente de IA a trabajar sobre su función financiera. Pero, ¿en qué? La contadora hace muchas tareas: concilia bancos, arma el reporte de cobranzas, calcula el CCE, prepara el tablero de valor, responde consultas del directorio.\n\nEl consultor no automatiza por moda: prioriza. Para cada tarea estima la frecuencia, las horas que consume, su factibilidad de automatización y su riesgo, y calcula el ahorro potencial ponderado. Las tareas frecuentes, repetitivas y de bajo riesgo (conciliación, reporte de cobranzas) encabezan la lista; las de alto juicio y riesgo (recomendación al directorio) quedan con el humano al frente y la IA como apoyo.\n\nEl entregable es un plan de automatización priorizado, no un agente que hace todo.',
    datos: [
      { t: 'table', title: 'Tareas de la función financiera', headers: ['Tarea', 'Veces/mes', 'Horas c/u', 'Factib.', 'Riesgo'], firstColLeft: true, rows: [
        ['Conciliación bancaria', '20', '1,5', '0,90', '0,15'],
        ['Reporte de cobranzas', '4', '3,0', '0,85', '0,20'],
        ['Cálculo del CCE y tablero', '1', '6,0', '0,80', '0,25'],
        ['Respuesta a consultas del directorio', '8', '1,0', '0,40', '0,60'],
        ['Recomendación de crédito', '15', '0,8', '0,55', '0,50'],
      ] },
    ],
    consigna: [
      '¿Cuál es el ahorro potencial ponderado (por factibilidad y riesgo) de automatizar cada tarea?',
      '¿Cómo queda el ranking de prioridad de automatización?',
      '¿Qué tareas deben mantener al humano en el bucle y por qué?',
      '¿Por qué las herramientas del agente deben ser el servidor MCP de sólo lectura y no acceso directo a la base?',
    ],
    metodologia: [
      { k: 'Estimar el volumen', d: 'Horas/año = veces/mes × 12 × horas por vez.' },
      { k: 'Ponderar', d: 'Ahorro ponderado = horas/año × costo/hora × factibilidad × (1 − riesgo).' },
      { k: 'Priorizar', d: 'Ordenar por ahorro ponderado (SORTBY): primero lo frecuente, repetible y de bajo riesgo.' },
      { k: 'Gobernar', d: 'Definir puntos de control humano y auditoría para las tareas de mayor riesgo.' },
      { k: 'Conectar', d: 'Las herramientas del agente = servidor MCP de sólo lectura, con trazabilidad.' },
    ],
  },
  model: {
    sheetTitle: 'Priorización de automatización de la función financiera',
    intro:
      'Editá las tareas y el costo/hora (celdas marfil). El modelo calcula el ahorro potencial ponderado por factibilidad y riesgo, y la matriz dinámica ordena las tareas por prioridad (SORTBY).',
    inputs: [
      { key: 'costoHora', label: 'Costo por hora (miles $)', value: 8, fmt: 'num2', unit: 'miles $' },
      { key: 'umbralHumano', label: 'Umbral de riesgo para “humano en el bucle”', value: 0.40, fmt: 'pct' },
    ],
    calcs: [
      { key: 'horasTotales', label: 'Horas/año de las tareas evaluadas', xl: '=SUM({20;4;1;8;15}*12*{1.5;3;6;1;0.8})', fmt: 'num' },
      { key: 'ahorroTotal', label: 'Ahorro potencial ponderado total', xl: '=SUM({20;4;1;8;15}*12*{1.5;3;6;1;0.8}*[costoHora]*{0.9;0.85;0.8;0.4;0.55}*(1-{0.15;0.2;0.25;0.6;0.5}))', fmt: 'money', highlight: true },
    ],
    spills: [
      {
        key: 'ranking',
        title: 'Ranking de automatización (ordenado por ahorro ponderado, SORTBY)',
        columns: ['Tarea', 'Horas/año', 'Ahorro ponderado', 'Gobierno'],
        xl: '=LET(t,{"Conciliación bancaria";"Reporte de cobranzas";"Cálculo del CCE y tablero";"Consultas del directorio";"Recomendación de crédito"}, vm,{20;4;1;8;15}, hc,{1.5;3;6;1;0.8}, fac,{0.9;0.85;0.8;0.4;0.55}, rie,{0.15;0.2;0.25;0.6;0.5}, hAnio,vm*12*hc, ahorro,hAnio*[costoHora]*fac*(1-rie), gob,IF(rie>[umbralHumano],"Humano en el bucle","Automatizable"), tab,HSTACK(t,hAnio,ahorro,gob), SORTBY(tab,ahorro,-1))',
        formats: [undefined, 'num', 'money', undefined],
        rows: 5,
        note: 'Una sola fórmula calcula el ahorro ponderado por factibilidad y riesgo y ordena las tareas de mayor a menor prioridad con SORTBY. Las de riesgo alto quedan marcadas para control humano.',
      },
    ],
    conclusions: [
      { label: 'Prioridad', xl: '="Ahorro potencial ponderado total: "&TEXT([ahorroTotal],"#,##0")&" (sobre "&TEXT([horasTotales],"#,##0")&" horas/año). Automatizá primero lo frecuente, repetible y de bajo riesgo; dejá el juicio de alto riesgo con el humano al frente."' },
      { label: 'Gobierno', xl: '="Las herramientas del agente son el servidor MCP de sólo lectura (1.2): cada cifra es trazable a una llamada auditada, no generada por el modelo. La responsabilidad final es humana."' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Un agente de IA se distingue de un simple prompt porque:', opciones: ['Es más largo.', 'Percibe, razona, elige y ejecuta herramientas, y reacciona a lo observado, en un bucle.', 'Usa más memoria RAM.', 'No usa un modelo de lenguaje.'], correcta: 1, justificacion: 'El agente actúa sobre el mundo mediante herramientas y cierra el bucle percibir-decidir-actuar-observar. Un prompt solo genera texto. Sí usa un modelo como motor.' },
    { id: 'q2', pregunta: 'En este programa, las “herramientas” del agente son:', opciones: ['Macros de Excel.', 'El servidor MCP de sólo lectura de la asignatura 1.2.', 'Acceso directo y total a la base.', 'Un buscador web.'], correcta: 1, justificacion: 'El agente llama a herramientas MCP auditadas de sólo lectura, preservando la trazabilidad. No accede directo a la base ni depende de macros o del buscador.' },
    { id: 'q3', pregunta: 'El patrón ReAct consiste en:', opciones: ['Reaccionar sin pensar.', 'Alternar pensamiento y acción, decidiendo el próximo paso según lo observado.', 'Reiniciar el agente.', 'Recompilar el código.'], correcta: 1, justificacion: 'ReAct (Reason + Act) intercala razonamiento y acciones con herramientas, ajustando según resultados. No es reacción ciega ni un reinicio.' },
    { id: 'q4', pregunta: 'La “reflexión” como patrón de agente significa:', opciones: ['Meditar.', 'Que el agente critica su propia salida y la corrige (auditor incorporado).', 'Copiar la respuesta.', 'Apagar el agente.'], correcta: 1, justificacion: 'La reflexión hace que el agente evalúe y mejore su propio resultado, como un auditor escéptico. No es meditación ni copiar.' },
    { id: 'q5', pregunta: 'Según la guía de agentes de Anthropic, conviene:', opciones: ['Usar siempre el agente más autónomo posible.', 'Empezar por la solución más simple y agregar complejidad solo cuando demuestre valor.', 'Evitar los flujos de trabajo.', 'No evaluar nada.'], correcta: 1, justificacion: 'La recomendación es minimizar complejidad: muchos problemas se resuelven con flujos definidos, no con autonomía máxima. La complejidad se justifica por su valor.' },
    { id: 'q6', pregunta: '¿Por qué en finanzas la autonomía del agente se concede de a poco?', opciones: ['Porque es más lento.', 'Porque más autonomía = más difícil de predecir y auditar; se empieza por acciones reversibles.', 'Porque la IA no sirve.', 'Por moda.'], correcta: 1, justificacion: 'A mayor autonomía, menor previsibilidad y auditabilidad; en finanzas eso es riesgoso, así que se avanza gradualmente y sobre lo reversible.' },
    { id: 'q7', pregunta: 'El “humano en el bucle” se aplica sobre todo a:', opciones: ['Todas las consultas de lectura.', 'Las acciones críticas o irreversibles (aprobar un pago, rechazar un crédito).', 'Nada, el agente decide todo.', 'El encendido de la PC.'], correcta: 1, justificacion: 'El control humano se concentra en decisiones de alto impacto o irreversibles; las lecturas auditadas pueden fluir. No es que el agente decida todo ni que se controle cada lectura trivial.' },
    { id: 'q8', pregunta: 'La alucinación de un modelo obliga a que:', opciones: ['Se confíe en toda cifra que dé.', 'Toda cifra sea trazable a una herramienta, no generada por el modelo.', 'No se use IA.', 'Se redondee.'], correcta: 1, justificacion: 'Como el modelo puede inventar con seguridad, las cifras deben venir de herramientas auditadas y ser trazables. No se confía a ciegas ni se descarta la IA por ello.' },
    { id: 'q9', pregunta: 'La “sobre-automatización” es riesgosa porque:', opciones: ['Ahorra demasiado.', 'Automatizar un proceso mal entendido multiplica el error.', 'Es imposible.', 'Reduce el riesgo siempre.'], correcta: 1, justificacion: 'Automatizar sin entender y ordenar el proceso escala los errores. Primero se comprende, después se automatiza. No siempre reduce el riesgo.' },
    { id: 'q10', pregunta: 'La regla de oro de gobierno de un agente financiero es:', opciones: ['La IA es responsable.', 'La responsabilidad final es humana.', 'Nadie es responsable.', 'El proveedor del modelo es responsable.'], correcta: 1, justificacion: 'La responsabilidad recae en las personas; la IA es una herramienta. Ni la IA, ni el vacío, ni el proveedor asumen la decisión financiera.' },
    { id: 'q11', pregunta: 'La decisión de qué automatizar se prioriza por:', opciones: ['Lo que sea más nuevo.', 'Retorno y factibilidad: frecuente, repetible, de reglas claras y bajo riesgo primero.', 'Lo más difícil primero.', 'Al azar.'], correcta: 1, justificacion: 'Se prioriza por ahorro potencial y factibilidad, empezando por tareas frecuentes y de bajo riesgo. Ni novedad, ni dificultad, ni azar.' },
    { id: 'q12', pregunta: 'Evaluar un agente significa:', opciones: ['Ver si “parece” funcionar.', 'Medir su acierto contra casos conocidos (conjuntos de prueba).', 'Confiar en la demo.', 'Contar sus líneas de código.'], correcta: 1, justificacion: 'La evaluación usa casos con respuesta conocida para medir desempeño real. La impresión o la demo no son evaluación.' },
    { id: 'q13', pregunta: 'El registro de auditoría de un agente debe guardar:', opciones: ['Nada.', 'Qué herramienta llamó, con qué parámetros, qué obtuvo y qué decidió.', 'Solo la respuesta final.', 'El clima.'], correcta: 1, justificacion: 'La auditoría registra cada paso (herramienta, parámetros, dato, decisión), igual que el servidor MCP. Guardar solo la respuesta final no permite reconstruir el proceso.' },
    { id: 'q14', pregunta: 'Un agente racional, en la tradición de Russell y Norvig:', opciones: ['Actúa al azar.', 'Actúa para maximizar su medida de desempeño dada la información disponible.', 'Nunca actúa.', 'Copia a otro agente.'], correcta: 1, justificacion: 'La definición clásica: el agente racional elige acciones que maximizan su objetivo con la información que tiene. No es aleatorio ni pasivo.' },
    { id: 'q15', pregunta: 'La confiabilidad de un sistema de IA (Huyen) proviene principalmente de:', opciones: ['El tamaño del modelo.', 'La ingeniería alrededor: evaluación, monitoreo, guardarraíles e intervención humana.', 'La suerte.', 'La cantidad de datos únicamente.'], correcta: 1, justificacion: 'La confiabilidad la da la ingeniería (evaluación, guardarraíles, monitoreo), no el modelo por sí solo. Ni la suerte ni solo el volumen de datos alcanzan.' },
  ],
  bibliografia: [
    'Anthropic — *Building effective agents* y *Model Context Protocol* (2024–2026)',
    'Russell, S. & Norvig, P. — *Artificial Intelligence: A Modern Approach*',
    'Huyen, C. — *AI Engineering*',
    'Weng, L. — *LLM-powered Autonomous Agents* (nota técnica)',
    'Ley 25.326 de Protección de los Datos Personales (Argentina)',
  ],
}
