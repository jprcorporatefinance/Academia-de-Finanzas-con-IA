import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 4.2 — Decisiones de Inversión, RONIC y Crecimiento con Creación
// de Valor
// ============================================================================
export const a4_2: Asignatura = {
  cod: '4.2',
  slug: 'a4-2',
  cuatrimestre: 4,
  fase: 'Prescriptiva · ¿Qué debemos hacer?',
  nombre: 'Decisiones de Inversión, RONIC y Crecimiento con Creación de Valor',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativas: 1.4 y 4.1 · Cuarto cuatrimestre',
  framework: 'Koller/McKinsey · Mauboussin · Rappaport',
  resumen:
    'El teorema central de la creación de valor: crecer crea valor si y solo si el retorno del capital nuevo (RONIC) supera su costo (WACC). El resto es corolario.',
  objetivos: [
    'Comprender y aplicar el Key Value Driver de McKinsey.',
    'Distinguir el RONIC (retorno del capital nuevo) del ROIC (retorno del capital existente).',
    'Calcular la tasa de crecimiento sostenible y la genuina.',
    'Decidir inversiones sabiendo cuándo crecer crea y cuándo destruye valor.',
  ],
  sections: [
    {
      title: 'El teorema central del crecimiento',
      intro: 'El resultado más importante de las finanzas corporativas cabe en una frase: crecer crea valor solo si el retorno del capital nuevo supera su costo.',
      blocks: [
        { t: 'formula', name: 'Key Value Driver (McKinsey)', expr: 'V = NOPAT × (1 − g/RONIC) ÷ (WACC − g)', where: 'g = crecimiento · RONIC = retorno del capital nuevo · el término (1 − g/RONIC) es la porción del NOPAT que queda como flujo tras reinvertir', note: 'De aquí se deriva el teorema: si RONIC > WACC, más g aumenta V; si RONIC < WACC, más g DESTRUYE V.' },
        { t: 'idea', md: 'La intuición: crecer exige reinvertir. Si cada peso reinvertido rinde más que su costo (RONIC > WACC), crecer suma. Si rinde menos (RONIC < WACC), cada peso de crecimiento es un peso que destruye valor. **Una empresa con RONIC < WACC vale más si NO crece.**' },
        { t: 'quote', author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'El crecimiento no es bueno ni malo en sí mismo. El crecimiento con retornos sobre el capital superiores al costo del capital crea valor; el crecimiento con retornos inferiores lo destruye, y cuanto más rápido, peor.' },
      ],
    },
    {
      title: 'RONIC frente a ROIC',
      intro: 'La distinción que lo cambia todo: el retorno del capital que ya está invertido no es el mismo que el del capital que se va a invertir.',
      blocks: [
        { t: 'p', md: 'El **ROIC** mide el retorno del capital **existente** (lo que ya se hizo). El **RONIC** mide el retorno del capital **nuevo** (lo que se está por hacer). Una empresa puede tener un ROIC histórico alto y un RONIC bajo: las oportunidades buenas ya se tomaron, y las nuevas rinden menos. Para decidir si crecer, importa el RONIC, no el ROIC.' },
        { t: 'warn', md: 'Error estratégico común: justificar una expansión con el ROIC histórico alto. El proyecto nuevo no rinde el ROIC del pasado, rinde su propio RONIC. Si ese RONIC es menor que el WACC, la expansión destruye valor por más brillante que sea el historial.' },
      ],
    },
    {
      title: 'Crecimiento sostenible y genuino',
      intro: 'No todo crecimiento es igual: hay un techo financiable y hay un crecimiento que es real y otro que es inflación.',
      blocks: [
        { t: 'formula', name: 'Tasa de crecimiento sostenible', expr: 'g_sostenible = tasa de reinversión × ROIC', where: 'tasa de reinversión = 1 − payout (lo que no se distribuye)', note: 'El crecimiento que la empresa puede financiar con sus propios recursos, sin cambiar su estructura de capital.' },
        { t: 'ul', items: [
          '**Crecimiento genuino:** aumento real de volumen y valor, no nominal.',
          'Bajo inflación hay que distinguir el crecimiento **real** del meramente **nominal** (vender lo mismo a precios más altos no es crecer).',
          'Crecer por encima de la tasa sostenible exige financiamiento externo (deuda o capital), con su costo y su riesgo.',
        ] },
      ],
    },
    {
      title: 'La decisión de inversión',
      intro: 'Toda inversión se juzga por el valor que crea, y crecer mal es peor que no crecer.',
      blocks: [
        { t: 'chain', title: 'La lógica de la decisión', nodes: ['Proyecto', 'RONIC del proyecto', '¿RONIC > WACC?', 'Sí: crea valor / No: destruye'], caption: 'La regla del VAN (asignatura 1.3) y el teorema del RONIC son la misma cosa vista desde dos ángulos.' },
        { t: 'quote', author: 'Michael Mauboussin', credential: 'Expectations Investing / Counterpoint Global', md: 'El mercado paga por la creación de valor, no por el crecimiento. Un peso de crecimiento con retornos por debajo del costo del capital vale menos que cero: sería mejor devolver ese peso a los dueños.' },
        { t: 'idea', md: 'Corolario para Maderas del Litoral: con un RONIC estimado (≈ 15 %) por debajo del WACC (≈ 19,5 %), la ampliación de planta —por más deseada que sea— **destruye valor**. La empresa valdría más devolviendo ese capital a los dueños que invirtiéndolo en crecer. Es una conclusión incómoda y central.' },
      ],
    },
    {
      title: 'La anatomía del Key Value Driver',
      intro: 'La fórmula de McKinsey no es una caja negra: cada término tiene un significado económico, y entenderlos permite ver por qué el crecimiento puede sumar o restar.',
      blocks: [
        { t: 'formula', name: 'Key Value Driver (McKinsey)', expr: 'V = NOPAT × (1 − g/RONIC) ÷ (WACC − g)', where: 'g = crecimiento · RONIC = retorno del capital nuevo', note: 'El término (1 − g/RONIC) es la porción del NOPAT que queda como flujo libre tras reinvertir para crecer.' },
        { t: 'p', md: 'Descompongámoslo. Para crecer a una tasa g reinvirtiendo a un retorno RONIC, la empresa debe reinvertir una fracción **g/RONIC** de su NOPAT. Lo que sobra, **(1 − g/RONIC)**, es el FCFF disponible. Ahora la clave: si RONIC = WACC, el crecimiento es **neutro** (el numerador y el denominador se mueven en proporción); si RONIC > WACC, más g **aumenta** V; si RONIC < WACC, más g lo **reduce**.' },
        { t: 'table', title: 'El efecto del crecimiento según el RONIC', headers: ['Escenario', 'Efecto de crecer más'], firstColLeft: true, rows: [
          ['RONIC > WACC', 'Crear valor: acelerar el crecimiento suma'],
          ['RONIC = WACC', 'Neutro: crecer no cambia el valor'],
          ['RONIC < WACC', 'Destruir valor: cuanto más rápido, peor'],
        ], caption: 'El cruce en RONIC = WACC es el punto donde el valor del crecimiento cambia de signo. Es el resultado más importante y más contraintuitivo de las finanzas corporativas.' },
        { t: 'quote', author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'El crecimiento no es bueno ni malo en sí mismo. El crecimiento con retornos sobre el costo del capital crea valor; el crecimiento con retornos inferiores lo destruye, y cuanto más rápido, peor. Es la lección que más empresas ignoran mientras celebran su expansión.' },
      ],
    },
    {
      title: 'ROIC frente a RONIC: la distinción que decide',
      intro: 'El error estratégico más costoso es justificar una inversión con el retorno del pasado en vez del retorno del capital nuevo.',
      blocks: [
        { t: 'p', md: 'El **ROIC** mide el retorno del capital **existente** —lo que ya se hizo—. El **RONIC** mide el retorno del capital **nuevo** —lo que se está por hacer—. Son cosas distintas: una empresa puede tener un ROIC histórico envidiable y un RONIC mediocre, porque las oportunidades buenas ya se tomaron y las nuevas rinden menos.' },
        { t: 'warn', md: 'La trampa: el directorio de una empresa exitosa (ROIC alto) asume que su próxima inversión también rendirá alto. Pero el proyecto nuevo no hereda el ROIC del pasado —rinde su propio RONIC—. Si ese RONIC es menor que el WACC, la expansión destruye valor por más brillante que sea el historial. Estimar bien el RONIC del proyecto (con la disciplina del VAN de la asignatura 1.3) es lo que evita el error.' },
        { t: 'formula', name: 'Crecimiento sostenible y genuino', expr: 'g_sostenible = tasa de reinversión × ROIC = (1 − payout) × ROIC', note: 'El crecimiento autofinanciable. Superarlo exige financiamiento externo (deuda o capital), con su costo y riesgo. Y bajo inflación, hay que distinguir el crecimiento REAL del meramente nominal.' },
        { t: 'quote', author: 'Michael Mauboussin', credential: 'Counterpoint Global', md: 'Separá el capital que crea valor del que lo destruye. Muchas empresas crecen destruyendo valor y lo celebran como éxito; el analista riguroso mira el RONIC, no la tasa de crecimiento ni el tamaño.' },
      ],
    },
  ],
  expertos: [
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'Las dos palancas del valor son el retorno sobre el capital y el crecimiento, pero no son simétricas: el crecimiento solo agrega valor cuando el retorno supera el costo del capital. Con retornos bajos, el crecimiento destruye.' },
    { author: 'Michael Mauboussin', credential: 'Counterpoint Global', md: 'Separá el capital que crea valor del que lo destruye. Muchas empresas crecen destruyendo valor y lo celebran; el analista riguroso mira el RONIC, no la tasa de crecimiento.' },
    { author: 'Alfred Rappaport', credential: 'Creating Shareholder Value', md: 'El crecimiento rentable es el objetivo; el crecimiento por el crecimiento mismo es una trampa que consume caja y destruye valor mientras luce como éxito.' },
  ],
  caso: {
    titulo: '¿La ampliación crea o destruye valor?',
    empresa: 'Maderas del Litoral S.A. — la trampa del crecimiento',
    contexto:
      'Los hermanos están entusiasmados con la ampliación de planta: más capacidad, más ventas, más presencia. El ROIC histórico (21,3 %) parece respaldarlos. Pero el consultor hace la pregunta correcta: ¿cuánto rinde el capital NUEVO de la ampliación?\n\nLa estimación del RONIC del proyecto (≈ 15 %, consistente con el VAN negativo de la asignatura 1.3) está por debajo del WACC (19,5 %). Aplicando el Key Value Driver de McKinsey, crecer al 4 % con ese RONIC no suma: resta. La empresa valdría más sin la ampliación.\n\nEs la conclusión más contraintuitiva y valiosa del programa: a veces la mejor decisión de inversión es no invertir en crecer, y devolver el capital a los dueños.',
    datos: [
      { t: 'table', title: 'Datos del análisis (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['NOPAT', '2.502'],
        ['WACC', '19,5%'],
        ['ROIC histórico', '21,3%'],
        ['RONIC del proyecto (capital nuevo)', '15,0%'],
        ['Crecimiento propuesto (g)', '4,0%'],
      ] },
    ],
    consigna: [
      '¿Cuál es el valor de la empresa creciendo al 4 % con RONIC 15 % (Key Value Driver)?',
      '¿Cuál es el valor sin crecer (g = 0)? ¿Cuál es mayor?',
      '¿A partir de qué RONIC el crecimiento empieza a crear valor?',
      '¿Por qué el ROIC histórico alto no justifica la ampliación?',
    ],
    metodologia: [
      { k: 'Aplicar el KVD', d: 'V = NOPAT × (1 − g/RONIC) / (WACC − g).' },
      { k: 'Comparar con no crecer', d: 'V(g=0) = NOPAT / WACC.' },
      { k: 'Hallar el cruce', d: 'El valor del crecimiento cambia de signo en RONIC = WACC.' },
      { k: 'Distinguir ROIC de RONIC', d: 'Decidir con el retorno del capital nuevo, no del existente.' },
      { k: 'Concluir', d: 'Recomendar crecer, no crecer o devolver capital según el RONIC.' },
    ],
  },
  model: {
    sheetTitle: 'Key Value Driver: cuándo crecer crea valor',
    intro:
      'Editá NOPAT, WACC, RONIC y g (celdas marfil). El modelo calcula el valor con y sin crecimiento, y la matriz dinámica barre el RONIC para mostrar el cruce donde el crecimiento empieza a crear valor (RONIC = WACC).',
    inputs: [
      { key: 'nopat', label: 'NOPAT', value: 2502, fmt: 'money', unit: 'miles $' },
      { key: 'wacc', label: 'WACC', value: 0.195, fmt: 'pct1' },
      { key: 'ronic', label: 'RONIC (capital nuevo)', value: 0.15, fmt: 'pct1' },
      { key: 'g', label: 'Crecimiento propuesto (g)', value: 0.04, fmt: 'pct1' },
    ],
    calcs: [
      { key: 'reinv', label: 'Tasa de reinversión (g/RONIC)', xl: '=[g]/[ronic]', fmt: 'pct1' },
      { key: 'fcff', label: 'FCFF (NOPAT tras reinversión)', xl: '=[nopat]*(1-[g]/[ronic])', fmt: 'money' },
      { key: 'valorCrece', label: 'Valor creciendo (KVD)', xl: '=[nopat]*(1-[g]/[ronic])/([wacc]-[g])', fmt: 'money', highlight: true },
      { key: 'valorNoCrece', label: 'Valor sin crecer (g=0)', xl: '=[nopat]/[wacc]', fmt: 'money', highlight: true },
      { key: 'valorDelCrecimiento', label: 'Valor del crecimiento', xl: '=[valorCrece]-[valorNoCrece]', fmt: 'money', highlight: true },
    ],
    spills: [
      {
        key: 'sensRonic',
        title: 'Valor según el RONIC (cruce en RONIC = WACC)',
        columns: ['RONIC', 'Valor creciendo', 'Valor sin crecer', 'Valor del crecimiento'],
        xl: '=LET(rs,{0.10;0.125;0.15;0.175;0.195;0.22;0.25;0.30}, vc,MAP(rs,LAMBDA(r,[nopat]*(1-[g]/r)/([wacc]-[g]))), vng,[nopat]/[wacc], HSTACK(rs,vc,rs*0+vng,vc-(rs*0+vng)))',
        formats: ['pct1', 'money', 'money', 'money'],
        rows: 8,
        note: 'MAP recalcula el valor para cada RONIC. Donde RONIC = WACC, el valor del crecimiento es cero; por debajo es negativo (crecer destruye), por encima positivo.',
      },
    ],
    conclusions: [
      { label: 'Veredicto', xl: '=IF([ronic]>[wacc],"RONIC ("&TEXT([ronic],"0.0%")&") > WACC ("&TEXT([wacc],"0.0%")&"): crecer CREA valor ("&TEXT([valorDelCrecimiento],"#,##0")&").","RONIC ("&TEXT([ronic],"0.0%")&") < WACC ("&TEXT([wacc],"0.0%")&"): crecer DESTRUYE valor ("&TEXT([valorDelCrecimiento],"#,##0")&"). La empresa vale más sin la ampliación.")' },
      { label: 'Recomendación', xl: '=IF([ronic]<[wacc],"Con este RONIC, la mejor decisión de inversión es NO crecer y evaluar devolver capital a los dueños. El ROIC histórico alto no cambia esto: el proyecto nuevo rinde su RONIC, no el ROIC del pasado.","Crecer es la decisión correcta: cada peso reinvertido rinde por encima de su costo.")' },
    ],
  },
  ejercicio: {
    titulo: '¿Crecer crea valor? (Key Value Driver)',
    enunciado: 'Con el KVD de McKinsey, decidí si crecer al 4 % conviene, dado que el capital nuevo rinde por debajo de su costo.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['NOPAT', '1.000'], ['WACC', '18%'], ['RONIC', '14%'], ['Crecimiento (g)', '4%'],
      ] },
    ],
    preguntas: ['¿Cuál es el valor creciendo y el valor sin crecer?', '¿Cuánto es el valor del crecimiento? ¿Conviene crecer?'],
    solucion: [
      { t: 'formula', name: 'Valor creciendo (KVD)', expr: 'V = 1.000×(1−0,04/0,14)/(0,18−0,04) = 1.000×0,7143/0,14 = 5.102' },
      { t: 'formula', name: 'Valor sin crecer', expr: 'V(g=0) = 1.000/0,18 = 5.556' },
      { t: 'formula', name: 'Valor del crecimiento', expr: '5.102 − 5.556 = − 454' },
      { t: 'idea', md: 'Como RONIC (14 %) < WACC (18 %), crecer **destruye 454** de valor: la empresa **vale más si NO crece**. Cada peso reinvertido rinde menos que su costo. Conviene distribuir, no crecer.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El teorema central del crecimiento dice que crecer crea valor si y solo si:', opciones: ['Las ventas suben.', 'RONIC > WACC (el retorno del capital nuevo supera su costo).', 'El ROIC histórico es alto.', 'La empresa toma deuda.'], correcta: 1, justificacion: 'Solo cuando el capital nuevo rinde más que su costo el crecimiento agrega valor. Ventas, ROIC histórico o deuda no lo garantizan.' },
    { id: 'q2', pregunta: 'En el Key Value Driver, si RONIC < WACC, aumentar g:', opciones: ['Aumenta el valor.', 'Destruye valor (y cuanto más rápido, peor).', 'No tiene efecto.', 'Elimina la deuda.'], correcta: 1, justificacion: 'Con RONIC < WACC cada peso de crecimiento destruye valor; acelerar empeora. Es el resultado central del modelo.' },
    { id: 'q3', pregunta: 'La diferencia entre ROIC y RONIC es:', opciones: ['Ninguna.', 'ROIC = retorno del capital existente; RONIC = retorno del capital nuevo.', 'ROIC es antes de impuestos.', 'RONIC es el ROIC del competidor.'], correcta: 1, justificacion: 'El ROIC mira lo ya invertido; el RONIC, lo que se va a invertir. Para decidir crecer, importa el RONIC.' },
    { id: 'q4', pregunta: '¿Por qué el ROIC histórico alto NO justifica una expansión?', opciones: ['Porque el ROIC no importa.', 'Porque el proyecto nuevo rinde su propio RONIC, no el ROIC del pasado.', 'Porque el ROIC siempre baja.', 'Porque la expansión no usa capital.'], correcta: 1, justificacion: 'El retorno relevante para el capital nuevo es el RONIC del proyecto; el historial no se transfiere. Si el RONIC < WACC, la expansión destruye valor.' },
    { id: 'q5', pregunta: 'Una empresa con RONIC persistentemente menor que su WACC:', opciones: ['Debe crecer lo más rápido posible.', 'Vale más si NO crece (y podría convenir devolver capital).', 'Debe endeudarse para crecer.', 'Tiene ROIC negativo.'], correcta: 1, justificacion: 'Si crecer destruye valor, la empresa vale más sin crecer; devolver capital a los dueños puede ser lo óptimo. No implica ROIC negativo.' },
    { id: 'q6', pregunta: 'La tasa de crecimiento sostenible es:', opciones: ['WACC × g.', 'Tasa de reinversión × ROIC.', 'Ventas / activos.', 'Siempre 10%.'], correcta: 1, justificacion: 'g sostenible = (1 − payout) × ROIC: el crecimiento financiable con recursos propios sin cambiar la estructura de capital.' },
    { id: 'q7', pregunta: 'Bajo inflación, distinguir crecimiento real del nominal importa porque:', opciones: ['Son lo mismo.', 'Vender lo mismo a precios más altos no es crecer realmente.', 'La inflación no afecta.', 'El nominal es siempre real.'], correcta: 1, justificacion: 'El crecimiento nominal por precios no es crecimiento genuino de volumen/valor; hay que separarlos (asignatura 1.1, IPR). No son equivalentes.' },
    { id: 'q8', pregunta: 'El término (1 − g/RONIC) del KVD representa:', opciones: ['La tasa impositiva.', 'La porción del NOPAT que queda como flujo tras reinvertir para crecer.', 'El WACC.', 'La deuda.'], correcta: 1, justificacion: 'g/RONIC es la tasa de reinversión; (1 − g/RONIC) es lo que sobra como FCFF. No es impuesto, WACC ni deuda.' },
    { id: 'q9', pregunta: 'El valor del crecimiento (V creciendo − V sin crecer) cambia de signo cuando:', opciones: ['g = 0.', 'RONIC = WACC.', 'NOPAT = 0.', 'WACC = 0.'], correcta: 1, justificacion: 'En RONIC = WACC el crecimiento es neutro; por encima crea valor, por debajo lo destruye. Es el punto de cruce.' },
    { id: 'q10', pregunta: 'Según Mauboussin, el mercado paga por:', opciones: ['El crecimiento sin más.', 'La creación de valor (crecer con retornos sobre el costo del capital).', 'Las ventas.', 'El tamaño.'], correcta: 1, justificacion: 'El mercado premia la creación de valor, no el crecimiento por sí mismo; crecer destruyendo valor vale menos que cero. Tamaño y ventas no bastan.' },
    { id: 'q11', pregunta: 'La regla del VAN (1.3) y el teorema del RONIC son:', opciones: ['Contradictorias.', 'La misma idea vista desde dos ángulos: aceptar lo que rinde más que su costo.', 'Independientes.', 'Solo una es válida.'], correcta: 1, justificacion: 'VAN > 0 equivale a RONIC > WACC: ambos aceptan proyectos que rinden por encima del costo del capital. Son coherentes, no contradictorias.' },
    { id: 'q12', pregunta: 'Crecer por encima de la tasa sostenible exige:', opciones: ['Nada especial.', 'Financiamiento externo (deuda o capital), con su costo y riesgo.', 'Bajar el ROIC.', 'Eliminar dividendos y nada más.'], correcta: 1, justificacion: 'Superar el crecimiento autofinanciable requiere capital externo, que trae costo y riesgo. No es gratis ni automático.' },
    { id: 'q13', pregunta: 'Para Maderas del Litoral, con RONIC ≈ 15% y WACC ≈ 19,5%, la ampliación:', opciones: ['Crea mucho valor.', 'Destruye valor: la empresa valdría más sin ella.', 'Es neutra.', 'No se puede evaluar.'], correcta: 1, justificacion: 'RONIC por debajo del WACC hace que crecer reste valor; el KVD lo confirma numéricamente (valor del crecimiento negativo).' },
    { id: 'q14', pregunta: 'El “crecimiento por el crecimiento mismo” (Rappaport) es:', opciones: ['El objetivo correcto.', 'Una trampa que consume caja y destruye valor mientras luce como éxito.', 'Neutral.', 'Siempre rentable.'], correcta: 1, justificacion: 'Crecer sin retorno adecuado quema caja y destruye valor, aunque parezca éxito. El objetivo es el crecimiento rentable.' },
    { id: 'q15', pregunta: 'A veces la mejor decisión de inversión es:', opciones: ['Invertir siempre en crecer.', 'No invertir en crecer y devolver capital a los dueños (si RONIC < WACC).', 'Endeudarse al máximo.', 'Comprar competidores.'], correcta: 1, justificacion: 'Cuando el capital nuevo destruiría valor, no crecer y devolver capital es lo óptimo. Es la conclusión contraintuitiva del teorema.' },
    { id: 'q16', pregunta: 'El Key Value Driver de McKinsey es:', opciones: ['V = NOPAT × WACC × g.', 'V = NOPAT × (1 − g/RONIC) ÷ (WACC − g).', 'V = NOPAT ÷ WACC.', 'V = Ventas × margen.'], correcta: 1, justificacion: 'El KVD relaciona valor, crecimiento, RONIC y WACC: V = NOPAT(1 − g/RONIC)/(WACC − g). De él se deriva el teorema del crecimiento.' },
    { id: 'q17', pregunta: 'La tasa de reinversión implícita para crecer a g con retorno RONIC es:', opciones: ['g × RONIC.', 'g / RONIC.', 'RONIC / g.', 'g − RONIC.'], correcta: 1, justificacion: 'Para crecer a g reinvirtiendo a RONIC hace falta reinvertir g/RONIC del NOPAT; lo que sobra (1 − g/RONIC) es el FCFF.' },
    { id: 'q18', pregunta: 'Las dos palancas del valor, según McKinsey, son:', opciones: ['Ventas y costos.', 'El retorno sobre el capital (ROIC/RONIC) y el crecimiento.', 'Deuda y patrimonio.', 'Precio y volumen.'], correcta: 1, justificacion: 'Valor = retorno del capital + crecimiento, pero no simétricos: el crecimiento solo suma si el retorno supera el costo del capital.' },
    { id: 'q19', pregunta: 'Con RONIC < WACC, acelerar el crecimiento:', opciones: ['Mejora el valor.', 'Lo empeora (destruye más valor, más rápido).', 'No cambia nada.', 'Sube el ROIC.'], correcta: 1, justificacion: 'Si cada peso reinvertido destruye valor, crecer más rápido destruye más. Cuanto más rápido, peor.' },
    { id: 'q20', pregunta: 'La tasa de reinversión de una empresa es:', opciones: ['El payout.', '1 − payout (lo que no se distribuye).', 'El WACC.', 'La inflación.'], correcta: 1, justificacion: 'Lo que no se reparte se reinvierte: reinversión = 1 − payout. Junto con el ROIC determina el crecimiento sostenible.' },
    { id: 'q21', pregunta: 'Un proyecto con VAN positivo tiene, necesariamente:', opciones: ['RONIC < WACC.', 'RONIC > WACC.', 'RONIC = 0.', 'WACC = 0.'], correcta: 1, justificacion: 'VAN > 0 equivale a que el retorno del capital nuevo supera su costo: RONIC > WACC. Son la misma idea.' },
    { id: 'q22', pregunta: 'Ganar market share sin retorno sobre el costo del capital:', opciones: ['Siempre crea valor.', 'No crea valor (crecer no es un fin en sí mismo).', 'Es el objetivo.', 'Reduce el WACC.'], correcta: 1, justificacion: 'El objetivo es el valor, no el tamaño; crecer en participación destruyendo valor no sirve. Market share vale si viene con retorno.' },
    { id: 'q23', pregunta: 'Para decidir una nueva inversión, el retorno relevante es:', opciones: ['El ROIC histórico.', 'El RONIC del proyecto (capital nuevo).', 'El ROE.', 'El margen bruto.'], correcta: 1, justificacion: 'El capital nuevo rinde su RONIC, no el ROIC del pasado; por eso el RONIC gobierna la decisión de invertir.' },
    { id: 'q24', pregunta: 'Una empresa madura con RONIC persistentemente menor que su WACC debería:', opciones: ['Reinvertir todo.', 'Distribuir el excedente (devolver capital a los dueños).', 'Endeudarse para crecer.', 'Comprar competidores.'], correcta: 1, justificacion: 'Si reinvertir destruye valor, lo óptimo es distribuir: devolver capital preserva valor. Es la conexión con la política de dividendos (4.4).' },
    { id: 'q25', pregunta: 'En el KVD, el FCFF equivale a:', opciones: ['NOPAT × WACC.', 'NOPAT × (1 − g/RONIC).', 'NOPAT × g.', 'NOPAT + amortizaciones.'], correcta: 1, justificacion: 'El flujo libre tras reinvertir para crecer es NOPAT × (1 − g/RONIC): lo que queda después de financiar el crecimiento.' },
    { id: 'q26', pregunta: 'El “valor del crecimiento” (V con g menos V sin g) puede ser:', opciones: ['Siempre positivo.', 'Negativo, cuando RONIC < WACC.', 'Siempre cero.', 'Siempre igual al NOPAT.'], correcta: 1, justificacion: 'Cuando el capital nuevo rinde menos que su costo, crecer resta: el valor del crecimiento es negativo.' },
    { id: 'q27', pregunta: 'Más crecimiento, con RONIC dado, implica:', opciones: ['Menos reinversión.', 'Más reinversión y por tanto menos FCFF en el corto plazo.', 'Igual FCFF.', 'Más dividendos hoy.'], correcta: 1, justificacion: 'Crecer más exige reinvertir más (g/RONIC mayor), reduciendo el flujo libre presente. Solo vale la pena si RONIC > WACC.' },
    { id: 'q28', pregunta: '¿Es posible tener un ROIC histórico alto y un RONIC bajo?', opciones: ['No, son iguales.', 'Sí: las oportunidades buenas ya se tomaron y las nuevas rinden menos.', 'Solo si hay deuda.', 'Solo en empresas cotizantes.'], correcta: 1, justificacion: 'El ROIC mira lo ya invertido; el RONIC, lo nuevo. Una empresa exitosa puede enfrentar oportunidades nuevas de menor retorno.' },
    { id: 'q29', pregunta: 'Crecer por encima de la tasa sostenible requiere:', opciones: ['Nada.', 'Financiamiento externo, con su costo y su riesgo.', 'Bajar el ROIC.', 'Eliminar el WACC.'], correcta: 1, justificacion: 'Superar el crecimiento autofinanciable obliga a tomar deuda o capital nuevo, que traen costo y riesgo adicionales.' },
    { id: 'q30', pregunta: 'La conclusión más contraintuitiva del teorema del crecimiento es:', opciones: ['Crecer siempre conviene.', 'A veces la empresa vale más si NO crece (y devuelve capital).', 'El tamaño es el objetivo.', 'La TIR manda sobre el VAN.'], correcta: 1, justificacion: 'Cuando RONIC < WACC, no crecer y devolver capital maximiza el valor: incómodo pero central.' },
  ],
  bibliografia: [
    'Koller, Goedhart & Wessels — *Valuation* (Key Value Driver)',
    'Mauboussin, M. & Rappaport, A. — *Expectations Investing*',
    'Rappaport, A. — *Creating Shareholder Value*',
    'Damodaran, A. — *Investment Valuation*',
    'Brealey, Myers & Allen — *Principles of Corporate Finance*',
  ],
}
