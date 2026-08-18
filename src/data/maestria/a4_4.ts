import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 4.4 — Política de Dividendos, Decisiones Operativas y Gobierno de
// la Empresa Familiar
// ============================================================================
export const a4_4: Asignatura = {
  cod: '4.4',
  slug: 'a4-4',
  cuatrimestre: 4,
  fase: 'Prescriptiva · ¿Qué debemos hacer?',
  nombre: 'Política de Dividendos, Decisiones Operativas y Gobierno de la Empresa Familiar',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativas: 4.2 y 4.3 · Cuarto cuatrimestre',
  framework: 'Miller & Modigliani · Damodaran · Tagiuri & Davis',
  resumen:
    'El cierre del sistema: la política de dividendos, las decisiones operativas y el gobierno de la empresa familiar, integrados en las cuatro decisiones y orientados al único objetivo taxativo: el valor para los dueños (TSR).',
  objetivos: [
    'Decidir la política de dividendos integrando teoría (Miller-Modigliani) y fricciones reales.',
    'Entender las cuatro decisiones financieras como un sistema, no como piezas sueltas.',
    'Diagnosticar y mejorar el gobierno de la empresa familiar (dependencia del dueño, sucesión).',
    'Medir el objetivo final: el valor para los dueños mediante el TSR / Total Business Return.',
  ],
  sections: [
    {
      title: 'Política de dividendos: teoría y fricciones',
      intro: 'En un mundo perfecto, la política de dividendos sería irrelevante. En el mundo real, no lo es.',
      blocks: [
        { t: 'p', md: 'El teorema de **Miller y Modigliani** demuestra que, en mercados perfectos (sin impuestos, sin costos de transacción, con información simétrica), la política de dividendos es **irrelevante** para el valor: da igual distribuir o retener. Es un punto de partida, no una conclusión.' },
        { t: 'ul', items: [
          '**Impuestos:** el tratamiento fiscal de dividendos frente a ganancias de capital altera la decisión.',
          '**Señalización:** subir el dividendo comunica confianza; recortarlo, problemas. El mercado lo lee.',
          '**Agencia:** distribuir disciplina a la gerencia (menos caja ociosa para malas inversiones).',
          '**Efecto clientela:** distintos dueños prefieren distintas políticas.',
        ] },
        { t: 'idea', md: 'La conexión decisiva con la 4.2: **si el RONIC es menor que el WACC, distribuir es crear valor.** Retener para reinvertir en proyectos que rinden menos que su costo destruye valor; devolver ese capital a los dueños lo preserva. La política de dividendos no es independiente de la de inversión.' },
      ],
    },
    {
      title: 'Las cuatro decisiones como sistema',
      intro: 'Todo el programa converge acá: las cuatro decisiones financieras no se toman por separado.',
      blocks: [
        { t: 'table', title: 'Las cuatro decisiones', headers: ['Decisión', 'Pregunta', 'Asignatura'], firstColLeft: true, rows: [
          ['Inversión', '¿En qué invertir? (RONIC > WACC)', '4.2'],
          ['Financiamiento', '¿Con qué capital? (deuda vs. patrimonio)', '4.3'],
          ['Dividendos', '¿Cuánto distribuir vs. retener?', '4.4'],
          ['Operativas', '¿Cómo gestionar el capital de trabajo y los costos?', '2.4'],
        ] },
        { t: 'p', md: 'Están entrelazadas: la decisión de inversión determina cuánta caja se necesita; la de financiamiento, de dónde sale; la de dividendos, cuánto sobra para los dueños; y las operativas, cuánta caja libera el negocio. Cambiar una mueve a las demás.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Applied Corporate Finance', md: 'Las finanzas corporativas son tres decisiones —inversión, financiamiento y dividendos— unidas por un objetivo: maximizar el valor. Todo lo demás es detalle técnico al servicio de esas tres.' },
      ],
    },
    {
      title: 'Gobierno de la empresa familiar',
      intro: 'La empresa que no cotiza tiene un riesgo que ningún balance muestra: depender de una persona.',
      blocks: [
        { t: 'p', md: 'El modelo de los **tres círculos** (Tagiuri & Davis) —familia, propiedad y empresa— explica los conflictos típicos: un mismo individuo es dueño, familiar y gerente, con intereses que no siempre coinciden. El buen gobierno separa esos roles con reglas explícitas: protocolo familiar, directorio, y una **segunda línea** profesional.' },
        { t: 'formula', name: 'IDD — Índice de Dependencia del Dueño (JPR)', expr: 'IDD = 0,30·s₁ + 0,25·s₂ + 0,25·s₃ + 0,20·s₄', where: 's₁ ventas por relaciones del dueño · s₂ decisiones que requieren su aprobación · s₃ procesos críticos sin procedimiento · s₄ ausencia de segunda línea', note: 'Por encima de 60, la empresa no es transferible sin destruir valor. Impacta en Ke, DLOC y DLOM (asignaturas 3.1 y 4.1).' },
        { t: 'warn', md: 'La sucesión es el momento de mayor mortalidad de la empresa familiar. Un IDD alto convierte al dueño en un punto único de falla: si no está, la empresa vale mucho menos. Reducir el IDD —documentar procesos, formar la segunda línea, institucionalizar relaciones— es una de las inversiones de mayor retorno.' },
      ],
    },
    {
      title: 'Valor para los dueños: el objetivo taxativo',
      intro: 'Todo el método —cuatro fases, dieciséis asignaturas— apunta a un solo número.',
      blocks: [
        { t: 'formula', name: 'Total Shareholder Return / Total Business Return', expr: 'TSR ≈ rendimiento por dividendos + crecimiento del valor', where: 'combina lo que el dueño recibe (dividendos) y lo que la empresa se aprecia (valor)', note: 'El objetivo único y taxativo del programa. Toda decisión se juzga por su efecto sobre el TSR de largo plazo.' },
        { t: 'chain', title: 'El cierre del mapa de valor', nodes: ['Estado analítico (1.1)', 'ROIC − WACC (2.1–3.1)', 'EVA y valuación (1.4, 4.1)', 'Las cuatro decisiones (4.2–4.4)', 'Valor para los dueños (TSR)'], caption: 'El egresado debe poder reconstruir esta cadena de memoria: de la depuración contable al TSR, sin saltos.' },
        { t: 'quote', author: 'Alfred Rappaport', credential: 'Creating Shareholder Value', md: 'El objetivo de la empresa no es maximizar utilidades contables ni el tamaño, sino el valor de largo plazo para sus dueños. Todo lo demás —crecimiento, market share, eficiencia— vale en la medida en que sirva a ese fin.' },
      ],
    },
  ],
  expertos: [
    { author: 'Merton Miller & Franco Modigliani', credential: 'teorema de irrelevancia', md: 'En mercados perfectos, el valor lo determina la capacidad de generar flujos de los activos, no cómo se reparte entre dividendos y retención. Las desviaciones de la irrelevancia miden el peso de las fricciones reales.' },
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'Si no tenés proyectos que rindan más que el costo del capital, devolvé el efectivo a los dueños. Retener caja para destruir valor es el peor de los pecados corporativos.' },
    { author: 'John Davis', credential: 'Harvard — modelo de los tres círculos', md: 'Los conflictos de la empresa familiar nacen de superponer familia, propiedad y gestión. El gobierno consiste en separar esos roles con reglas antes de que el conflicto los separe por la fuerza.' },
  ],
  caso: {
    titulo: 'Distribuir o reinvertir, y cómo transferir la empresa',
    empresa: 'Maderas del Litoral S.A. — el cierre de la consultoría',
    contexto:
      'Todo el trabajo desemboca en la recomendación final al directorio. Dos preguntas: ¿cuánto conviene distribuir, y cómo hacer la empresa transferible?\n\nComo el RONIC de las oportunidades de la empresa (≈ 15 %) está por debajo del WACC (19,5 %), retener para reinvertir destruiría valor: la política óptima se inclina fuertemente hacia la **distribución**. El consultor calcula el FCFE y muestra que distribuir preserva valor que reinvertir destruiría. Al mismo tiempo, el IDD elevado hace la empresa poco transferible: el plan incluye reducir esa dependencia como condición para cualquier venta futura.\n\nLa recomendación integra las cuatro decisiones y se mide contra el objetivo único: el valor para los dueños (TSR).',
    datos: [
      { t: 'table', title: 'Datos para dividendos y TSR (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF', '1.834'],
        ['Intereses', '1.150'],
        ['Tasa impositiva', '35%'],
        ['Nueva deuda neta (net borrowing)', '0'],
        ['Valor del patrimonio (equity)', '6.388'],
        ['RONIC de las oportunidades', '15,0%'],
        ['WACC', '19,5%'],
      ] },
    ],
    consigna: [
      '¿Cuál es el FCFE (flujo disponible para los dueños)?',
      '¿Cuánto valor se destruye por cada peso reinvertido, dado que RONIC < WACC?',
      '¿Qué política de distribución maximiza el valor para los dueños?',
      '¿Cómo impacta el IDD en la transferibilidad y qué se recomienda?',
    ],
    metodologia: [
      { k: 'Calcular el FCFE', d: 'FCFE = FCFF − intereses×(1−t) + nueva deuda neta.' },
      { k: 'Valuar la reinversión', d: 'Con RONIC < WACC, cada peso reinvertido crea (RONIC/WACC − 1) < 0.' },
      { k: 'Elegir la política', d: 'Comparar distribuir vs. reinvertir por su efecto en el valor.' },
      { k: 'Medir el TSR', d: 'Rendimiento por dividendos + crecimiento del valor.' },
      { k: 'Transferibilidad', d: 'Reducir el IDD (procesos, segunda línea) para hacer la empresa vendible.' },
    ],
  },
  model: {
    sheetTitle: 'Política de dividendos, valor de la reinversión y TSR',
    intro:
      'Editá las celdas marfil. El modelo calcula el FCFE y, dado que RONIC < WACC, muestra cuánto valor destruye reinvertir frente a distribuir. La matriz dinámica compara políticas de payout.',
    inputs: [
      { key: 'fcff', label: 'FCFF', value: 1834, fmt: 'money', unit: 'miles $' },
      { key: 'interes', label: 'Intereses', value: 1150, fmt: 'money' },
      { key: 't', label: 'Tasa impositiva', value: 0.35, fmt: 'pct' },
      { key: 'netBorrow', label: 'Nueva deuda neta', value: 0, fmt: 'money' },
      { key: 'equity', label: 'Valor del patrimonio (equity)', value: 6388, fmt: 'money' },
      { key: 'ronic', label: 'RONIC de las oportunidades', value: 0.15, fmt: 'pct1' },
      { key: 'wacc', label: 'WACC', value: 0.195, fmt: 'pct1' },
    ],
    calcs: [
      { key: 'interesAT', label: 'Intereses después de impuestos', xl: '=[interes]*(1-[t])', fmt: 'money' },
      { key: 'fcfe', label: 'FCFE (disponible para los dueños)', xl: '=[fcff]-[interesAT]+[netBorrow]', fmt: 'money', highlight: true },
      { key: 'multReinv', label: 'Valor creado por $ reinvertido (RONIC/WACC − 1)', xl: '=[ronic]/[wacc]-1', fmt: 'pct1', highlight: true },
      { key: 'valorSiReinvierteTodo', label: 'Valor creado si se reinvierte todo el FCFE', xl: '=[fcfe]*([ronic]/[wacc]-1)', fmt: 'money' },
      { key: 'divYield', label: 'Rendimiento por dividendos (payout 100%)', xl: '=[fcfe]/[equity]', fmt: 'pct1', highlight: true },
    ],
    spills: [
      {
        key: 'payout',
        title: 'Comparación de políticas de distribución',
        columns: ['Política (payout)', 'Dividendo', 'Reinvertido', 'Valor creado por reinversión'],
        xl: '=LET(po,{0;0.25;0.5;0.75;1}, div,po*[fcfe], reinv,(1-po)*[fcfe], val,reinv*([ronic]/[wacc]-1), HSTACK(po,div,reinv,val))',
        formats: ['pct', 'money', 'money', 'money'],
        rows: 5,
        note: 'A mayor payout, menor reinversión y menor destrucción de valor (porque RONIC < WACC). El valor creado por reinversión es negativo: distribuir preserva valor.',
      },
    ],
    conclusions: [
      { label: 'Política óptima', xl: '=IF([ronic]<[wacc],"Con RONIC ("&TEXT([ronic],"0.0%")&") < WACC ("&TEXT([wacc],"0.0%")&"), reinvertir DESTRUYE valor: cada peso reinvertido crea "&TEXT([multReinv],"0.0%")&". La política óptima es distribuir el FCFE ("&TEXT([fcfe],"#,##0")&"), con un rendimiento por dividendos del "&TEXT([divYield],"0.0%")&".","Con RONIC > WACC, reinvertir crea valor: retener es preferible a distribuir.")' },
      { label: 'Transferibilidad y objetivo', xl: '="Reducir el IDD (procesos, segunda línea) es condición para transferir la empresa sin destruir valor. Toda decisión se mide contra el objetivo taxativo: el valor para los dueños (TSR)."' },
    ],
  },
  ejercicio: {
    titulo: '¿Distribuir o reinvertir?',
    enunciado: 'Calculá el flujo disponible para los dueños (FCFE) y decidí la política de distribución, dado que las oportunidades rinden por debajo del costo del capital.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF', '900'], ['Intereses', '400'], ['Tasa impositiva', '35%'], ['Nueva deuda neta', '0'], ['RONIC de las oportunidades', '12%'], ['WACC', '18%'],
      ] },
    ],
    preguntas: ['¿Cuál es el FCFE?', '¿Conviene reinvertir o distribuir? ¿Cuánto valor crea cada peso reinvertido?'],
    solucion: [
      { t: 'formula', name: 'FCFE', expr: 'FCFE = FCFF − intereses×(1−t) + nueva deuda = 900 − 400×0,65 + 0 = 900 − 260 = 640' },
      { t: 'formula', name: 'Valor por peso reinvertido', expr: 'RONIC/WACC − 1 = 0,12/0,18 − 1 = − 33,3 %' },
      { t: 'idea', md: 'Cada peso reinvertido **destruye 33 centavos** (RONIC 12 % < WACC 18 %). La política óptima es **distribuir el FCFE (640)**: devolver capital preserva valor que reinvertir destruiría. Es la conexión entre dividendos e inversión.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El teorema de Miller-Modigliani sobre dividendos dice que, en mercados perfectos:', opciones: ['Siempre conviene distribuir.', 'La política de dividendos es irrelevante para el valor.', 'Siempre conviene retener.', 'Los dividendos destruyen valor.'], correcta: 1, justificacion: 'En mercados perfectos (sin impuestos ni fricciones), distribuir o retener da igual: el valor lo determinan los activos. Es un punto de partida que las fricciones reales modifican.' },
    { id: 'q2', pregunta: '¿Cuál de estas es una fricción real que vuelve relevante la política de dividendos?', opciones: ['La gravedad.', 'Los impuestos, la señalización, la agencia y el efecto clientela.', 'El color del logo.', 'Nada la vuelve relevante.'], correcta: 1, justificacion: 'Impuestos, señales al mercado, disciplina de agencia y preferencias de clientela hacen que la política sí importe en el mundo real.' },
    { id: 'q3', pregunta: 'Si el RONIC es menor que el WACC, la política de dividendos óptima tiende a:', opciones: ['Retener todo para crecer.', 'Distribuir, porque reinvertir en proyectos que rinden menos que su costo destruye valor.', 'No pagar nunca.', 'Endeudarse para pagar.'], correcta: 1, justificacion: 'Con RONIC < WACC, retener para reinvertir destruye valor; devolver el capital a los dueños lo preserva. La política de dividendos depende de la de inversión.' },
    { id: 'q4', pregunta: 'La política de dividendos y la de inversión son:', opciones: ['Totalmente independientes.', 'Interdependientes: cuánto distribuir depende de si hay proyectos que crean valor.', 'La misma decisión.', 'Irrelevantes ambas.'], correcta: 1, justificacion: 'Se distribuye lo que no conviene reinvertir; si hay proyectos con RONIC > WACC, retener; si no, distribuir. Están enlazadas.' },
    { id: 'q5', pregunta: 'Subir el dividendo suele interpretarse como:', opciones: ['Una señal de problemas.', 'Una señal de confianza de la gerencia (señalización).', 'Un error contable.', 'Un impuesto.'], correcta: 1, justificacion: 'El aumento de dividendos señala confianza en flujos futuros; recortarlo señala problemas. Es el efecto señalización.' },
    { id: 'q6', pregunta: 'Las cuatro decisiones financieras son:', opciones: ['Inversión, financiamiento, dividendos y operativas.', 'Compra, venta, alquiler y préstamo.', 'Marketing, ventas, RRHH y producción.', 'Activo, pasivo, patrimonio y resultado.'], correcta: 0, justificacion: 'El sistema son inversión, financiamiento, dividendos y decisiones operativas, todas unidas por el objetivo de maximizar el valor.' },
    { id: 'q7', pregunta: 'Las cuatro decisiones se caracterizan por estar:', opciones: ['Aisladas unas de otras.', 'Entrelazadas: cambiar una mueve a las demás.', 'En conflicto permanente.', 'Ordenadas por tamaño.'], correcta: 1, justificacion: 'Invertir determina la caja necesaria, financiar de dónde sale, dividendos cuánto sobra y operativas cuánto libera el negocio: forman un sistema.' },
    { id: 'q8', pregunta: 'El modelo de los tres círculos (Tagiuri & Davis) describe la superposición de:', opciones: ['Activo, pasivo y patrimonio.', 'Familia, propiedad y empresa.', 'Ventas, costos y margen.', 'Deuda, capital y caja.'], correcta: 1, justificacion: 'Los tres círculos son familia, propiedad y empresa; su superposición genera los conflictos típicos de la empresa familiar.' },
    { id: 'q9', pregunta: 'Un IDD (Índice de Dependencia del Dueño) por encima de 60 indica que la empresa:', opciones: ['Es muy transferible.', 'No es transferible sin destruir valor (depende demasiado del dueño).', 'No tiene dueño.', 'Cotiza en bolsa.'], correcta: 1, justificacion: 'Un IDD alto hace al dueño un punto único de falla: sin él la empresa vale mucho menos, dificultando la venta. Impacta Ke, DLOC y DLOM.' },
    { id: 'q10', pregunta: 'Reducir el IDD (documentar procesos, formar segunda línea) es:', opciones: ['Una pérdida de tiempo.', 'Una de las inversiones de mayor retorno: hace la empresa transferible y más valiosa.', 'Irrelevante para el valor.', 'Solo un tema de RRHH.'], correcta: 1, justificacion: 'Bajar la dependencia del dueño aumenta la transferibilidad y el valor (menos descuentos, menor Ke). No es un tema menor ni ajeno a las finanzas.' },
    { id: 'q11', pregunta: 'El FCFE (flujo de fondos del accionista) se calcula como:', opciones: ['FCFF + intereses.', 'FCFF − intereses×(1−t) + nueva deuda neta.', 'EBITDA − impuestos.', 'NOPAT / WACC.'], correcta: 1, justificacion: 'El FCFE parte del FCFF, resta el costo de la deuda después de impuestos y suma el nuevo endeudamiento neto: lo que queda para los dueños.' },
    { id: 'q12', pregunta: 'El TSR (Total Shareholder Return) combina:', opciones: ['Solo los dividendos.', 'El rendimiento por dividendos y el crecimiento del valor.', 'Solo las ventas.', 'El EBITDA y la deuda.'], correcta: 1, justificacion: 'El TSR suma lo que el dueño recibe (dividendos) y lo que la empresa se aprecia (valor). Es el objetivo final del programa.' },
    { id: 'q13', pregunta: 'Según Damodaran, retener caja sin proyectos que superen el costo del capital es:', opciones: ['La mejor estrategia.', 'El peor de los pecados corporativos (destruye valor).', 'Neutral.', 'Obligatorio.'], correcta: 1, justificacion: 'Guardar caja para reinvertir en proyectos que destruyen valor es peor que distribuirla; hay que devolverla a los dueños. No es neutral ni obligatorio retener.' },
    { id: 'q14', pregunta: 'El objetivo único y taxativo del programa es:', opciones: ['Maximizar utilidades contables.', 'Maximizar el valor para los dueños (TSR) de largo plazo.', 'Maximizar el tamaño.', 'Maximizar las ventas.'], correcta: 1, justificacion: 'Todo el método apunta al valor de largo plazo para los dueños; utilidades, tamaño o ventas valen solo en cuanto sirven a ese fin (Rappaport).' },
    { id: 'q15', pregunta: 'La cadena que el egresado debe reconstruir de memoria va de:', opciones: ['Las ventas al EBITDA.', 'La depuración contable (1.1) al valor para los dueños (TSR), pasando por ROIC−WACC, EVA, valuación y las cuatro decisiones.', 'El activo al pasivo.', 'La caja a la deuda.'], correcta: 1, justificacion: 'El mapa de valor completo: del estado analítico al TSR, sin saltos. Es la síntesis integradora de toda la Maestría.' },
    { id: 'q16', pregunta: 'El teorema de irrelevancia de Miller-Modigliani supone:', opciones: ['Impuestos altos.', 'Mercados perfectos (sin impuestos, sin costos de transacción, información simétrica).', 'Inflación alta.', 'Empresas familiares.'], correcta: 1, justificacion: 'La irrelevancia vale en el mundo idealizado de mercados perfectos; las fricciones reales (impuestos, señales, agencia) la modifican.' },
    { id: 'q17', pregunta: 'El “efecto clientela” en dividendos significa que:', opciones: ['Todos los dueños quieren lo mismo.', 'Distintos accionistas prefieren distintas políticas de distribución.', 'No hay dividendos.', 'Los clientes cobran dividendos.'], correcta: 1, justificacion: 'Cada tipo de inversor (por impuestos, necesidad de renta) prefiere cierta política; la empresa atrae la “clientela” acorde.' },
    { id: 'q18', pregunta: 'Distribuir dividendos puede disciplinar a la gerencia porque:', opciones: ['Le da más caja para gastar.', 'Reduce la caja ociosa disponible para malas inversiones (efecto agencia).', 'Elimina el directorio.', 'Sube los impuestos.'], correcta: 1, justificacion: 'Menos caja libre limita la inversión en proyectos que destruyen valor: el dividendo actúa como disciplina de agencia.' },
    { id: 'q19', pregunta: 'El tratamiento fiscal distinto de dividendos y ganancias de capital:', opciones: ['No afecta la decisión.', 'Puede inclinar la política de distribución (una fricción real).', 'Es irrelevante siempre.', 'Elimina el TSR.'], correcta: 1, justificacion: 'Si dividendos y ganancias de capital tributan distinto, la política deja de ser irrelevante: es una de las fricciones que rompen MM.' },
    { id: 'q20', pregunta: 'La decisión de inversión responde a la pregunta:', opciones: ['¿Cuánto distribuir?', '¿En qué invertir? (aceptar si RONIC > WACC).', '¿Con qué deuda?', '¿Qué inventario?'], correcta: 1, justificacion: 'La decisión de inversión elige los proyectos que crean valor (RONIC > WACC). Las otras son financiamiento, dividendos y operativas.' },
    { id: 'q21', pregunta: 'La decisión de financiamiento define:', opciones: ['Cuánto distribuir.', 'Con qué capital financiar (mezcla deuda/patrimonio).', 'Qué proyectos tomar.', 'El nivel de stock.'], correcta: 1, justificacion: 'El financiamiento decide la estructura de capital (deuda vs. patrimonio) y su costo/riesgo. Es una de las cuatro decisiones.' },
    { id: 'q22', pregunta: 'Las decisiones operativas se refieren a:', opciones: ['La política de dividendos.', 'La gestión del capital de trabajo y los costos (cuánta caja libera el negocio).', 'La estructura de deuda.', 'La valuación.'], correcta: 1, justificacion: 'Las operativas gestionan el CCE y los costos, determinando cuánta caja libera la operación (asignatura 2.4).' },
    { id: 'q23', pregunta: 'El momento de mayor mortalidad de la empresa familiar suele ser:', opciones: ['La fundación.', 'La sucesión (traspaso generacional).', 'El primer año rentable.', 'Nunca.'], correcta: 1, justificacion: 'La sucesión concentra el riesgo: un IDD alto convierte al dueño en punto único de falla y la transición puede destruir valor.' },
    { id: 'q24', pregunta: 'Formar una “segunda línea” profesional busca:', opciones: ['Aumentar la dependencia del dueño.', 'Reducir el IDD y hacer la empresa más transferible y valiosa.', 'Bajar las ventas.', 'Eliminar el directorio.'], correcta: 1, justificacion: 'Una segunda línea capaz reduce la dependencia del dueño (baja el IDD), mejorando transferibilidad y valor.' },
    { id: 'q25', pregunta: 'El protocolo familiar sirve para:', opciones: ['Confundir los roles.', 'Separar con reglas explícitas los roles de familia, propiedad y empresa.', 'Eliminar a la familia.', 'Evadir impuestos.'], correcta: 1, justificacion: 'El protocolo ordena la relación entre los tres círculos (Tagiuri & Davis) con reglas, previniendo conflictos.' },
    { id: 'q26', pregunta: 'El “payout” es:', opciones: ['La tasa de reinversión.', 'La proporción del resultado (o FCFE) que se distribuye.', 'El WACC.', 'La deuda.'], correcta: 1, justificacion: 'El payout es la fracción que se reparte; su complemento (1 − payout) es la reinversión.' },
    { id: 'q27', pregunta: 'El TSR (Total Shareholder Return) combina:', opciones: ['Solo el dividendo.', 'El rendimiento por dividendos y el crecimiento del valor.', 'Solo el crecimiento.', 'Ventas y costos.'], correcta: 1, justificacion: 'El TSR suma lo que el dueño recibe (dividendos) y lo que la empresa se aprecia: el objetivo taxativo del programa.' },
    { id: 'q28', pregunta: 'El conflicto típico de la empresa familiar nace de que un mismo individuo:', opciones: ['Es solo empleado.', 'Es a la vez dueño, familiar y gerente, con intereses no siempre alineados.', 'No participa.', 'Es un tercero.'], correcta: 1, justificacion: 'La superposición de roles (familia, propiedad, gestión) genera intereses en tensión; el gobierno los separa con reglas.' },
    { id: 'q29', pregunta: 'Recortar el dividendo suele leerse por el mercado como:', opciones: ['Señal de confianza.', 'Señal de problemas (señalización negativa).', 'Un dato neutro.', 'Un aumento de ventas.'], correcta: 1, justificacion: 'Por el efecto señalización, un recorte comunica dificultades; subirlo comunica confianza en los flujos futuros.' },
    { id: 'q30', pregunta: 'El objetivo último de la empresa, según el marco del programa, es:', opciones: ['Maximizar utilidades contables.', 'Maximizar el valor de largo plazo para los dueños (TSR).', 'Maximizar el tamaño.', 'Maximizar las ventas.'], correcta: 1, justificacion: 'Todo se juzga por el valor de largo plazo para los dueños; crecimiento, market share o eficiencia valen solo en cuanto sirven a ese fin (Rappaport).' },
  ],
  bibliografia: [
    'Damodaran, A. — *Applied Corporate Finance*',
    'Miller, M. & Modigliani, F. — “Dividend Policy, Growth, and the Valuation of Shares” (1961)',
    'Rappaport, A. — *Creating Shareholder Value*',
    'Tagiuri, R. & Davis, J. — modelo de los tres círculos de la empresa familiar',
    'Ward, J. — *Keeping the Family Business Healthy*',
    'López Dumrauf, G. — *Finanzas Corporativas: un enfoque latinoamericano*',
  ],
}
