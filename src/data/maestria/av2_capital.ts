import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.2 — Asignación de Capital
// ============================================================================
export const av2_capital: Asignatura = {
  cod: 'A.2',
  slug: 'av-2',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Asignación de Capital: la decisión que define al CEO',
  horas: '24 h · 10 teóricas / 14 prácticas',
  correlativas: 'Correlativas: 4.2 y 4.4 · Módulo avanzado',
  framework: 'Thorndike · Buffett · Mauboussin · Koller',
  resumen:
    'De todas las tareas de un CEO, la asignación de capital es la que más explica la diferencia de resultados en el largo plazo —y para la que casi ningún CEO fue formado—. Las cinco fuentes de capital, los cinco usos, y la disciplina de elegir entre ellos.',
  objetivos: [
    'Comprender la asignación de capital como la decisión central del CEO y por qué explica la dispersión de resultados.',
    'Dominar el marco de las cinco fuentes y los cinco usos del capital.',
    'Evaluar cada uso con el mismo criterio: retorno sobre el capital empleado frente a su costo.',
    'Reconocer los sesgos institucionales que llevan a decisiones de asignación deficientes.',
    'Aplicar el marco a la empresa familiar, donde el capital compite además con el consumo del dueño.',
  ],
  sections: [
    {
      title: 'El problema: CEOs formados para operar, evaluados por asignar',
      intro:
        'La mayoría de los CEOs llega al cargo por ser excelente en algo —vender, producir, liderar equipos— y descubre que su trabajo principal es otro: decidir dónde va cada peso.',
      blocks: [
        { t: 'p', md: 'Warren Buffett lo planteó con crudeza: un CEO que dirige la empresa durante diez años, reteniendo cada año una utilidad equivalente al 10 % del patrimonio, habrá **asignado más del 60 % del capital que opera su empresa**. Y sin embargo, casi ningún CEO fue entrenado para esa tarea: llegó al puesto por su excelencia operativa, comercial o técnica.' },
        { t: 'p', md: '**William Thorndike**, en *The Outsiders* (2012), estudió ocho CEOs cuyas empresas superaron dramáticamente al mercado durante décadas. No tenían en común el sector, el carisma ni la estrategia de producto. Tenían en común una cosa: eran **asignadores de capital excepcionales y contraintuitivos**. Compraban cuando el mercado vendía, recompraban acciones solo cuando estaban baratas, evitaban las adquisiciones de moda, y trataban cada peso retenido como un peso que debía justificar su permanencia.' },
        { t: 'quote', author: 'Warren Buffett', credential: 'Berkshire Hathaway — Carta a los accionistas', md: 'Los CEOs que carecen de habilidad para asignar capital no son raros. Muchos llegan a la cima por destacar en áreas como marketing, producción, ingeniería o administración. Una vez CEO, enfrentan nuevas responsabilidades. Ahora deben tomar decisiones de asignación de capital, una tarea crítica que quizás nunca abordaron y que no es fácil de dominar.' },
        { t: 'idea', md: 'La consecuencia práctica: **dos empresas idénticas en operación pueden divergir enormemente en valor** por la sola calidad de su asignación de capital a lo largo de una década. La operación explica el resultado del trimestre; la asignación explica el resultado de la década.' },
      ],
    },
    {
      title: 'El marco: cinco fuentes, cinco usos',
      intro:
        'Toda la asignación de capital cabe en una matriz simple. La disciplina no está en conocerla, sino en aplicarla con el mismo criterio a todas las alternativas.',
      blocks: [
        { t: 'table', title: 'De dónde viene el capital y a dónde puede ir', headers: ['Cinco fuentes', 'Cinco usos'], firstColLeft: true, rows: [
          ['Flujo de caja operativo', 'Reinvertir en el negocio actual (CapEx, capital de trabajo)'],
          ['Emisión de deuda', 'Adquirir otras empresas'],
          ['Emisión de acciones', 'Pagar dividendos'],
          ['Venta de activos', 'Recomprar acciones'],
          ['Caja acumulada', 'Cancelar deuda'],
        ], caption: 'La regla de oro: cada uso compite contra los demás bajo el mismo criterio —¿cuál genera el mayor valor presente por peso asignado?—. Tratar el CapEx con un estándar y las recompras con otro es el error más común.' },
        { t: 'formula', name: 'El criterio único de asignación', expr: 'Asignar al uso con mayor valor creado por peso · Umbral mínimo: retorno > costo del capital', where: 'Reinvertir: RONIC > WACC · Adquirir: sinergia neta > prima · Recomprar: precio < valor intrínseco · Distribuir: cuando ningún uso supera el umbral', note: 'Es el mismo teorema de la asignatura 4.2 aplicado a TODAS las alternativas, no solo a la inversión productiva.' },
        { t: 'chain', title: 'El árbol de decisión de la asignación', nodes: ['¿Hay proyectos con RONIC > WACC?', 'Sí: reinvertir', 'No: ¿la acción está barata?', 'Sí: recomprar / No: distribuir'], caption: 'La distribución no es un residuo ni una concesión: es la decisión correcta cuando ningún uso interno supera el costo del capital.' },
      ],
    },
    {
      title: 'Los sesgos institucionales que arruinan la asignación',
      intro:
        'Las malas decisiones de asignación rara vez son irracionales a nivel individual: son racionales para quien las toma y destructivas para la empresa.',
      blocks: [
        { t: 'ul', items: [
          '**El imperativo institucional (Buffett).** Las organizaciones imitan lo que hacen sus pares, aunque no tenga sentido. Si la competencia se expande, expandirse parece prudente; no hacerlo, temerario. La presión social supera al análisis.',
          '**Presupuesto por inercia.** El presupuesto del año que viene se arma sobre el del año pasado, con ajustes marginales. Nadie vuelve a preguntar si esa línea de negocio todavía justifica su capital.',
          '**Aversión a desinvertir.** Cerrar o vender una unidad se percibe como fracaso personal, aunque libere capital para usos mejores. El capital queda atrapado en negocios que no lo remuneran.',
          '**Sesgo de tamaño.** Remuneración, prestigio y poder crecen con el tamaño de la empresa, no con su retorno sobre el capital. Los incentivos empujan a crecer aunque el crecimiento destruya valor.',
          '**Horizonte corto.** Decisiones que crean valor en cinco años castigan el resultado de este trimestre. Quien evalúa al CEO mira el trimestre.',
        ] },
        { t: 'warn', md: 'El síntoma más claro de mala asignación: una empresa que **reinvierte sistemáticamente en su negocio principal con RONIC por debajo del WACC**, mientras se niega a distribuir "porque el dinero está mejor adentro". Esa frase, sin un RONIC que la respalde, es la coartada más cara de las finanzas corporativas.' },
      ],
    },
    {
      title: 'Recompra de acciones: la decisión peor entendida',
      intro:
        'La recompra es simultáneamente una de las mejores y una de las peores decisiones de asignación, según una sola variable: el precio.',
      blocks: [
        { t: 'p', md: 'Recomprar acciones **crea valor para los accionistas que se quedan solo si el precio pagado está por debajo del valor intrínseco**. Es una inversión como cualquier otra: comprás un activo (tu propia empresa) a un precio. Si pagás menos de lo que vale, creás valor; si pagás más, lo destruís —transferís riqueza de los que se quedan a los que venden—.' },
        { t: 'formula', name: 'La condición de la recompra', expr: 'Crea valor si: Precio de recompra < Valor intrínseco por acción', note: 'La recompra NO crea valor "porque sube el precio de la acción" ni "porque mejora el beneficio por acción". Ambas son consecuencias contables, no creación de valor.' },
        { t: 'warn', md: 'El patrón empírico es demoledor: las empresas **recompran más cuando sus acciones están caras** (porque sobra caja en la parte alta del ciclo) **y menos cuando están baratas** (porque escasea la caja en la parte baja). Es exactamente lo contrario de lo que crearía valor. Los CEOs de Thorndike hacían lo opuesto, y esa fue una de sus principales fuentes de retorno superior.' },
        { t: 'p', md: 'En la empresa que no cotiza, el equivalente es el **rescate de participaciones a un socio saliente**: la misma lógica se aplica, con el agravante de que no hay precio de mercado y el precio se negocia. Pagar de más a un socio que sale destruye valor para los que se quedan, exactamente igual que una recompra cara.' },
      ],
    },
    {
      title: 'Estado del arte',
      intro: 'Qué está cambiando hoy en la disciplina de asignación de capital.',
      blocks: [
        { t: 'ul', items: [
          '**Del crecimiento a cualquier costo a la durabilidad del flujo.** Las decisiones de asignación de capital se orientan cada vez más por rentabilidad, durabilidad del flujo de caja, calidad del gobierno y transparencia informativa, en lugar de crecimiento sin condiciones.',
          '**Reasignación dinámica.** La investigación de McKinsey muestra que las empresas que **reasignan capital activamente entre unidades** —moviendo recursos de las que rinden poco a las que rinden más— superan sistemáticamente a las que mantienen asignaciones estables por inercia.',
          '**Presupuesto base cero, revisado.** La idea de justificar cada peso desde cero, en vez de partir del presupuesto anterior, resurge como antídoto contra la inercia.',
          '**Opcionalidad y flexibilidad.** Cada vez más, la asignación incorpora el valor de mantener opciones abiertas bajo incertidumbre, en vez de comprometer todo el capital de una vez.',
        ] },
        { t: 'quote', author: 'Michael Mauboussin', credential: 'Counterpoint Global — Capital Allocation', md: 'La asignación de capital es la responsabilidad más importante de la dirección y, sin embargo, la que menos atención analítica recibe. La pregunta correcta ante cada peso es simple y brutal: ¿este peso vale más adentro de la empresa o en el bolsillo del accionista?' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'La asignación de capital en la empresa mediana familiar del Nordeste argentino.',
      blocks: [
        { t: 'p', md: 'En la empresa familiar aparece un **sexto uso del capital** que la literatura anglosajona no contempla: **el consumo del dueño**. El capital no compite solo entre reinvertir, adquirir, distribuir, recomprar y desendeudarse: compite con la casa, el auto, el viaje y el nivel de vida de la familia. Y esa competencia rara vez se hace explícita.' },
        { t: 'idea', md: 'De ahí que la **normalización de la retribución del dueño** (asignatura 1.1) no sea un tecnicismo contable: es lo que hace **visible** esa competencia. Cuando el retiro del dueño se separa de la retribución de mercado por su trabajo, aparece con claridad cuánto capital está saliendo de la empresa por decisión de consumo y no de asignación. Recién ahí puede discutirse racionalmente.' },
        { t: 'warn', md: 'El patrón que más veces destruye empresas medianas rentables: **reinvertir por inercia en el negocio de siempre** —una máquina más, un galpón más— sin haber calculado nunca el RONIC de esa inversión, mientras se financia con deuda cara y se descapitaliza el capital de trabajo. Es asignación de capital sin marco: se invierte donde se sabe invertir, no donde conviene.' },
        { t: 'chain', title: 'El orden de prioridad que proponemos', nodes: ['Asegurar la liquidez (DAF-E > CCE)', 'Reducir la BFR (deuda cara)', 'Reinvertir solo si RONIC > WACC', 'Distribuir el excedente'], caption: 'Primero sobrevivir, después abaratar el capital, después crecer si conviene, y recién entonces distribuir. Invertir esta secuencia es la causa más frecuente de la paradoja crecimiento-liquidez (asignatura 4.3).' },
      ],
    },
  ],
  expertos: [
    { author: 'William Thorndike', credential: 'The Outsiders', md: 'Los CEOs excepcionales que estudié no compartían sector, carisma ni estrategia de producto. Compartían una obsesión: tratar cada peso de capital como si fuera propio, y comparar sistemáticamente todas las alternativas de uso antes de comprometerlo.' },
    { author: 'Warren Buffett', credential: 'Berkshire Hathaway', md: 'El imperativo institucional lleva a las organizaciones a imitar el comportamiento de sus pares, por irracional que sea. Resistirlo es una de las tareas más difíciles —y más valiosas— de un CEO.' },
    { author: 'Michael Mauboussin', credential: 'Counterpoint Global', md: 'Una recompra de acciones no crea valor porque suba el precio o mejore el beneficio por acción. Crea valor si, y solo si, el precio pagado está por debajo del valor intrínseco. Todo lo demás es contabilidad, no economía.' },
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'Las empresas que reasignan capital activamente entre sus unidades de negocio superan a las que mantienen asignaciones estables. La inercia presupuestaria es una de las formas más silenciosas de destrucción de valor.' },
  ],
  caso: {
    titulo: 'Dónde va el excedente de Maderas del Litoral',
    empresa: 'Maderas del Litoral S.A. — decisión de asignación de capital',
    contexto:
      'Después de un buen año, Maderas del Litoral tiene 1.200 (miles) de excedente disponible. Los tres hermanos discuten qué hacer, y cada uno defiende una alternativa distinta.\n\nEl mayor quiere ampliar la planta (el proyecto de la asignatura 4.2, con RONIC estimado del 15 %). El del medio quiere cancelar la deuda más cara, que tiene un costo financiero total efectivo del 26 % anual. El menor —que no trabaja en la empresa— quiere que se distribuya.\n\nEl consultor no toma partido por ninguno: aplica el marco. Cada alternativa se mide con el mismo criterio, y el resultado ordena la discusión familiar sobre una base objetiva en vez de sobre quién tiene más peso en la mesa.',
    datos: [
      { t: 'table', title: 'Alternativas de asignación (miles de $)', headers: ['Alternativa', 'Monto', 'Retorno / costo'], firstColLeft: true, rows: [
        ['Excedente disponible', '1.200', '—'],
        ['Ampliar la planta', 'hasta 1.200', 'RONIC 15,0%'],
        ['Cancelar deuda cara', 'hasta 900', 'CFT 26,0%'],
        ['Distribuir a los socios', 'hasta 1.200', 'costo de oportunidad'],
        ['WACC de la empresa', '—', '19,5%'],
        ['DAF-E actual', '26 días', 'CCE 45 días'],
      ] },
    ],
    consigna: [
      '¿Qué alternativa crea más valor por peso asignado?',
      '¿Cuánto valor se crea o destruye en cada opción?',
      '¿Por qué la ampliación de planta, aun siendo la más deseada, es la peor alternativa?',
      '¿Qué rol juega el DAF-E (26 días) en la decisión, y qué debería hacerse primero?',
    ],
    metodologia: [
      { k: 'Medir todas con el mismo criterio', d: 'Cada uso compite por su retorno frente al costo del capital.' },
      { k: 'Cancelar deuda cara', d: 'Retorno seguro y libre de riesgo igual al CFT que se deja de pagar (26 %).' },
      { k: 'Reinvertir', d: 'Crea valor solo si RONIC > WACC. Con 15 % vs 19,5 %, destruye.' },
      { k: 'Distribuir', d: 'Es la decisión correcta cuando ningún uso interno supera el umbral.' },
      { k: 'Chequear la liquidez primero', d: 'DAF-E < CCE es alerta de primer orden: la caja mínima no se compromete.' },
    ],
  },
  model: {
    sheetTitle: 'Asignación de capital: comparación de alternativas',
    intro:
      'Editá las celdas marfil. El modelo compara todas las alternativas de asignación bajo el mismo criterio y ordena por valor creado por peso. La matriz dinámica muestra el ranking.',
    inputs: [
      { key: 'excedente', label: 'Excedente disponible', value: 1200, fmt: 'money', unit: 'miles $' },
      { key: 'wacc', label: 'WACC de la empresa', value: 0.195, fmt: 'pct1' },
      { key: 'ronic', label: 'RONIC de la ampliación', value: 0.15, fmt: 'pct1' },
      { key: 'cftDeuda', label: 'CFT de la deuda cara', value: 0.26, fmt: 'pct1' },
      { key: 'montoDeuda', label: 'Deuda cara cancelable', value: 900, fmt: 'money' },
      { key: 'dafE', label: 'DAF-E actual (días)', value: 26, fmt: 'days' },
      { key: 'cce', label: 'CCE (días)', value: 45, fmt: 'days' },
    ],
    calcs: [
      { key: 'spreadReinv', label: 'Spread de reinvertir (RONIC − WACC)', xl: '=[ronic]-[wacc]', fmt: 'pct1', highlight: true },
      { key: 'spreadDeuda', label: 'Spread de cancelar deuda (CFT − WACC)', xl: '=[cftDeuda]-[wacc]', fmt: 'pct1', highlight: true },
      { key: 'valorReinv', label: 'Valor creado si reinvierte todo', xl: '=[excedente]*[spreadReinv]/[wacc]', fmt: 'money' },
      { key: 'valorDeuda', label: 'Valor creado si cancela deuda', xl: '=MIN([excedente],[montoDeuda])*[spreadDeuda]/[wacc]', fmt: 'money', highlight: true },
      { key: 'sobrante', label: 'Excedente tras cancelar deuda', xl: '=MAX(0,[excedente]-[montoDeuda])', fmt: 'money' },
      { key: 'alertaLiquidez', label: 'Brecha de liquidez (DAF-E − CCE)', xl: '=[dafE]-[cce]', fmt: 'days', highlight: true },
    ],
    spills: [
      {
        key: 'ranking',
        title: 'Ranking de alternativas por valor creado por peso',
        columns: ['Alternativa', 'Retorno', 'Spread vs WACC', 'Veredicto'],
        xl: '=LET(nom,{"Cancelar deuda cara";"Reinvertir (ampliación)";"Distribuir a socios"}, ret,VSTACK([cftDeuda],[ronic],[wacc]), spr,ret-[wacc], ver,IF(spr>0,"CREA valor",IF(spr=0,"Neutro","DESTRUYE valor")), tab,HSTACK(nom,ret,spr,ver), SORTBY(tab,spr,-1))',
        formats: [undefined, 'pct1', 'pct1', undefined],
        rows: 3,
        note: 'SORTBY ordena las alternativas de mayor a menor spread. Cancelar deuda al 26 % es equivalente a una inversión libre de riesgo que rinde 26 %: supera a cualquier proyecto con RONIC menor.',
      },
    ],
    conclusions: [
      { label: 'Prioridad', xl: '="Cancelar la deuda cara rinde "&TEXT([cftDeuda],"0.0%")&" seguro contra un WACC de "&TEXT([wacc],"0.0%")&" (spread "&TEXT([spreadDeuda],"0.0%")&"): es la mejor asignación. Reinvertir en la ampliación rinde "&TEXT([ronic],"0.0%")&", por DEBAJO del WACC: destruye valor."' },
      { label: 'Alerta de liquidez', xl: '=IF([alertaLiquidez]<0,"ATENCIÓN: DAF-E ("&TEXT([dafE],"0")&" días) < CCE ("&TEXT([cce],"0")&" días). Antes de asignar el excedente hay que asegurar la liquidez: la caja mínima no se compromete en ninguna alternativa.","Liquidez suficiente para asignar el excedente.")' },
    ],
  },
  ejercicio: {
    titulo: 'Recomprar o distribuir',
    enunciado:
      'Una empresa tiene 500 (miles) de excedente. Sus acciones (o participaciones) valen, según la valuación interna, 100 por unidad, y un socio ofrece vender su paquete a 80 por unidad. La empresa no tiene proyectos con RONIC superior a su WACC del 18 %.',
    datos: [
      { t: 'table', title: 'Datos', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Excedente', '500 miles $'], ['Valor intrínseco por unidad', '100'], ['Precio ofrecido por el socio saliente', '80'], ['Unidades que se podrían rescatar', '6,25'], ['WACC', '18%'],
      ] },
    ],
    preguntas: ['¿Conviene rescatar la participación del socio saliente?', '¿Cuánto valor se crea?', '¿Qué pasaría si el socio pidiera 120 por unidad?'],
    solucion: [
      { t: 'formula', name: 'Valor creado al rescatar por debajo del valor intrínseco', expr: 'Valor creado = (Valor intrínseco − Precio) × Unidades = (100 − 80) × 6,25 = 125' },
      { t: 'p', md: 'Rescatar a 80 lo que vale 100 **crea 125** de valor para los socios que se quedan: se compra un activo (la propia empresa) con un 20 % de descuento. Es una asignación excelente, superior a distribuir.' },
      { t: 'idea', md: 'Si el socio pidiera **120**, la lógica se invierte: pagar 120 por algo que vale 100 **destruye** (120 − 100) × 4,17 = **83** de valor, transfiriendo riqueza de los que se quedan al que sale. La misma operación crea o destruye valor según una sola variable: **el precio frente al valor intrínseco**. Es exactamente la lógica de la recompra de acciones en la empresa cotizante.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Según Buffett, un CEO que dirige diez años reteniendo el 10 % del patrimonio por año:', opciones: ['Asigna una parte menor del capital.', 'Habrá asignado más del 60 % del capital que opera su empresa.', 'No asigna capital.', 'Solo administra.'], correcta: 1, justificacion: 'La acumulación de decisiones de retención convierte al CEO en el principal asignador del capital de la empresa, aunque casi nunca fue formado para eso.' },
    { id: 'q2', pregunta: 'Los CEOs estudiados por Thorndike en The Outsiders tenían en común:', opciones: ['El sector y el carisma.', 'Ser asignadores de capital excepcionales y contraintuitivos.', 'Estrategias de producto idénticas.', 'Alto endeudamiento.'], correcta: 1, justificacion: 'No compartían sector, carisma ni estrategia de producto: compartían la disciplina de asignación de capital, incluso yendo contra la corriente del mercado.' },
    { id: 'q3', pregunta: 'Las cinco fuentes de capital incluyen:', opciones: ['Solo el flujo operativo.', 'Flujo operativo, deuda, acciones, venta de activos y caja acumulada.', 'Solo deuda y acciones.', 'Únicamente dividendos.'], correcta: 1, justificacion: 'El capital disponible proviene de esas cinco fuentes; la asignación consiste en dirigirlo hacia los cinco usos posibles.' },
    { id: 'q4', pregunta: 'Los cinco usos del capital son:', opciones: ['Reinvertir, adquirir, dividendos, recomprar y cancelar deuda.', 'Solo reinvertir y distribuir.', 'Comprar, vender, prestar, pedir y guardar.', 'Producir, vender, cobrar, pagar y ahorrar.'], correcta: 0, justificacion: 'Reinvertir en el negocio, adquirir empresas, pagar dividendos, recomprar acciones y cancelar deuda: cada uno compite contra los demás bajo el mismo criterio.' },
    { id: 'q5', pregunta: 'El criterio único para comparar usos del capital es:', opciones: ['La preferencia del CEO.', 'El valor creado por peso asignado, con umbral en el costo del capital.', 'El tamaño de la inversión.', 'La urgencia.'], correcta: 1, justificacion: 'Todas las alternativas se miden con la misma vara: cuánto valor presente crea cada peso, exigiendo como mínimo superar el costo del capital.' },
    { id: 'q6', pregunta: 'Distribuir dividendos, en el marco de asignación de capital, es:', opciones: ['Un residuo o una concesión.', 'La decisión correcta cuando ningún uso interno supera el costo del capital.', 'Siempre un error.', 'Obligatorio por ley.'], correcta: 1, justificacion: 'La distribución es una decisión de asignación con pleno derecho: si adentro el capital rinde menos que su costo, devolverlo preserva valor.' },
    { id: 'q7', pregunta: 'El "imperativo institucional" de Buffett describe:', opciones: ['La obligación legal de invertir.', 'La tendencia de las organizaciones a imitar a sus pares aunque no tenga sentido.', 'El presupuesto anual.', 'La norma contable.'], correcta: 1, justificacion: 'La presión de hacer lo que hace la competencia supera con frecuencia al análisis, llevando a expansiones y adquisiciones injustificadas.' },
    { id: 'q8', pregunta: 'El presupuesto por inercia consiste en:', opciones: ['Justificar cada peso desde cero.', 'Armar el presupuesto sobre el del año anterior con ajustes marginales, sin revisar si cada línea justifica su capital.', 'No tener presupuesto.', 'Recortar todo por igual.'], correcta: 1, justificacion: 'La inercia presupuestaria perpetúa asignaciones que quizá ya no se justifican; es una forma silenciosa de destrucción de valor.' },
    { id: 'q9', pregunta: 'La aversión a desinvertir lleva a que:', opciones: ['Se venda demasiado rápido.', 'El capital quede atrapado en negocios que no lo remuneran, porque cerrar se percibe como fracaso.', 'Aumente el ROIC.', 'Se distribuya más.'], correcta: 1, justificacion: 'Cerrar o vender una unidad se vive como fracaso personal, aunque liberar ese capital para usos mejores sea la decisión correcta.' },
    { id: 'q10', pregunta: 'El sesgo de tamaño en la asignación de capital surge porque:', opciones: ['Las empresas grandes son más rentables.', 'Remuneración, prestigio y poder crecen con el tamaño, no con el retorno sobre el capital.', 'La ley lo exige.', 'Los accionistas lo piden.'], correcta: 1, justificacion: 'Los incentivos del directivo están atados al tamaño más que al retorno, empujando a crecer aunque el crecimiento destruya valor.' },
    { id: 'q11', pregunta: 'Una recompra de acciones crea valor si:', opciones: ['Sube el precio de la acción.', 'El precio pagado está por debajo del valor intrínseco.', 'Mejora el beneficio por acción.', 'Siempre crea valor.'], correcta: 1, justificacion: 'La recompra es una inversión: crea valor solo si se compra por debajo del valor intrínseco. La suba del precio o la mejora del BPA son consecuencias contables, no creación de valor.' },
    { id: 'q12', pregunta: 'El patrón empírico de las recompras muestra que las empresas:', opciones: ['Recompran cuando están baratas.', 'Recompran más cuando sus acciones están caras y menos cuando están baratas.', 'Nunca recompran.', 'Recompran de forma óptima.'], correcta: 1, justificacion: 'La caja sobra en la parte alta del ciclo (acciones caras) y escasea en la baja (acciones baratas), produciendo exactamente el comportamiento contrario al que crearía valor.' },
    { id: 'q13', pregunta: 'En una empresa que no cotiza, el equivalente de la recompra es:', opciones: ['El dividendo.', 'El rescate de la participación de un socio saliente.', 'La emisión de deuda.', 'La venta de activos.'], correcta: 1, justificacion: 'Rescatar la parte de un socio sigue la misma lógica: crea valor si se paga por debajo del valor intrínseco, y lo destruye si se paga de más.' },
    { id: 'q14', pregunta: 'Pagar de más a un socio que sale:', opciones: ['Beneficia a los que se quedan.', 'Transfiere riqueza de los que se quedan al que sale.', 'Es neutro.', 'Aumenta el valor de la empresa.'], correcta: 1, justificacion: 'Es idéntico a una recompra cara: los socios remanentes financian con su valor el sobreprecio pagado al saliente.' },
    { id: 'q15', pregunta: 'La reasignación dinámica de capital entre unidades de negocio:', opciones: ['Empeora los resultados.', 'Supera sistemáticamente a las asignaciones estables por inercia.', 'Es imposible de medir.', 'Solo aplica a multinacionales.'], correcta: 1, justificacion: 'La investigación muestra que mover capital de las unidades de bajo retorno a las de alto retorno mejora el desempeño frente a mantener asignaciones fijas.' },
    { id: 'q16', pregunta: 'El presupuesto base cero se propone como antídoto contra:', opciones: ['La inflación.', 'La inercia presupuestaria.', 'La deuda.', 'El crecimiento.'], correcta: 1, justificacion: 'Justificar cada peso desde cero obliga a revisar si cada línea sigue mereciendo su capital, rompiendo la inercia del "lo de siempre más un ajuste".' },
    { id: 'q17', pregunta: 'La tendencia actual en asignación de capital se orienta hacia:', opciones: ['Crecimiento a cualquier costo.', 'Rentabilidad, durabilidad del flujo, calidad del gobierno y transparencia.', 'Máximo endeudamiento.', 'Ignorar el retorno.'], correcta: 1, justificacion: 'La recalibración post-tasas altas privilegia la calidad y durabilidad del flujo por sobre el crecimiento incondicional.' },
    { id: 'q18', pregunta: 'En la empresa familiar aparece un sexto uso del capital:', opciones: ['La publicidad.', 'El consumo del dueño.', 'La capacitación.', 'El seguro.'], correcta: 1, justificacion: 'El capital compite además con la casa, el auto y el nivel de vida de la familia — una competencia que rara vez se hace explícita.' },
    { id: 'q19', pregunta: 'La normalización de la retribución del dueño sirve, en este marco, para:', opciones: ['Pagar menos impuestos.', 'Hacer visible cuánto capital sale por decisión de consumo y no de asignación.', 'Aumentar el EBITDA.', 'Cumplir una norma contable.'], correcta: 1, justificacion: 'Separar la retribución de mercado por el trabajo del retiro por ser dueño permite discutir racionalmente la competencia entre consumo y reinversión.' },
    { id: 'q20', pregunta: 'Reinvertir por inercia en el negocio de siempre sin calcular el RONIC es:', opciones: ['Prudente.', 'Asignación de capital sin marco: se invierte donde se sabe, no donde conviene.', 'Lo que recomienda Thorndike.', 'Neutro para el valor.'], correcta: 1, justificacion: 'Invertir por familiaridad en vez de por retorno es uno de los patrones que más destruye valor en empresas medianas rentables.' },
    { id: 'q21', pregunta: 'Cancelar una deuda con CFT del 26 % cuando el WACC es 19,5 %:', opciones: ['Destruye valor.', 'Crea valor: equivale a una inversión libre de riesgo que rinde 26 %.', 'Es indiferente.', 'Solo conviene si hay excedente.'], correcta: 1, justificacion: 'Cancelar deuda cara rinde, con certeza, el costo que se deja de pagar. Si ese costo supera al WACC, es una de las mejores asignaciones posibles.' },
    { id: 'q22', pregunta: 'En el caso de Maderas del Litoral, la ampliación de planta (RONIC 15 %) frente a un WACC de 19,5 %:', opciones: ['Es la mejor alternativa.', 'Es la peor: destruye valor aunque sea la más deseada.', 'Es neutra.', 'No se puede evaluar.'], correcta: 1, justificacion: 'RONIC por debajo del WACC destruye valor; el deseo de crecer no cambia la aritmética. Es la conclusión incómoda del marco.' },
    { id: 'q23', pregunta: 'Antes de asignar un excedente, si el DAF-E es menor que el CCE:', opciones: ['Se ignora y se invierte igual.', 'Hay que asegurar la liquidez primero: la caja mínima no se compromete.', 'Se distribuye todo.', 'Se toma más deuda.'], correcta: 1, justificacion: 'DAF-E < CCE es alerta de primer orden (asignatura 4.3): comprometer la caja mínima en cualquier alternativa pone en riesgo la supervivencia.' },
    { id: 'q24', pregunta: 'El orden de prioridad propuesto por JPR para asignar capital es:', opciones: ['Crecer, distribuir, pagar deuda, sobrevivir.', 'Asegurar liquidez, reducir deuda cara (BFR), reinvertir si RONIC > WACC, distribuir el excedente.', 'Distribuir siempre primero.', 'Reinvertir siempre primero.'], correcta: 1, justificacion: 'Primero sobrevivir, después abaratar el capital, después crecer si conviene, y recién entonces distribuir. Invertir la secuencia genera la paradoja crecimiento-liquidez.' },
    { id: 'q25', pregunta: 'La frase "el dinero está mejor adentro" sin un RONIC que la respalde es:', opciones: ['Un principio sólido.', 'Una coartada costosa para evitar distribuir.', 'Una norma contable.', 'Lo que dice Mauboussin.'], correcta: 1, justificacion: 'Sin un retorno del capital nuevo que supere al costo del capital, retener destruye valor: la frase encubre una mala asignación.' },
    { id: 'q26', pregunta: 'La asignación de capital explica, respecto de la operación:', opciones: ['El resultado del trimestre.', 'El resultado de la década.', 'Nada relevante.', 'Solo los impuestos.'], correcta: 1, justificacion: 'La operación define el trimestre; la acumulación de decisiones de asignación define la divergencia de valor en el largo plazo.' },
    { id: 'q27', pregunta: 'El horizonte corto perjudica la asignación porque:', opciones: ['Mejora las decisiones.', 'Decisiones que crean valor a cinco años castigan el resultado de este trimestre, que es lo que se evalúa.', 'No existe.', 'Solo afecta a empresas cotizantes.'], correcta: 1, justificacion: 'El desalineamiento entre el horizonte de creación de valor y el de evaluación del directivo sesga las decisiones hacia lo inmediato.' },
    { id: 'q28', pregunta: 'La pregunta central de Mauboussin ante cada peso es:', opciones: ['¿Cuánto crece la empresa?', '¿Este peso vale más adentro de la empresa o en el bolsillo del accionista?', '¿Cuánto paga de impuestos?', '¿Qué hace la competencia?'], correcta: 1, justificacion: 'Esa comparación —valor adentro vs. valor afuera— es la síntesis de toda la disciplina de asignación de capital.' },
    { id: 'q29', pregunta: 'Comparar el CapEx con un estándar de retorno y las recompras con otro es:', opciones: ['La práctica correcta.', 'El error más común: todos los usos deben medirse con el mismo criterio.', 'Recomendado por Koller.', 'Irrelevante.'], correcta: 1, justificacion: 'La disciplina exige un criterio único: valor creado por peso asignado. Usar varas distintas según el uso invalida la comparación.' },
    { id: 'q30', pregunta: 'La opcionalidad, en la asignación moderna de capital, implica:', opciones: ['Comprometer todo el capital de una vez.', 'Valorar mantener opciones abiertas bajo incertidumbre en vez de comprometerlo todo.', 'No invertir nunca.', 'Diversificar sin criterio.'], correcta: 1, justificacion: 'Bajo incertidumbre, conservar flexibilidad tiene valor económico; la asignación moderna lo incorpora en vez de tratar toda inversión como irreversible.' },
  ],
  bibliografia: [
    'Thorndike, W. — *The Outsiders: Eight Unconventional CEOs*',
    'Buffett, W. — Cartas a los accionistas de Berkshire Hathaway',
    'Mauboussin, M. — *Capital Allocation: Results, Analysis, and Assessment*',
    'Koller, Goedhart & Wessels — *Valuation*, capítulos de asignación y reasignación',
    'Rappaport, A. — *Creating Shareholder Value*',
    'Jensen, M. — “Agency Costs of Free Cash Flow” (1986)',
  ],
}
