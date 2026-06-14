import type { Lesson } from '../../types'

export const semana08: Lesson = {
  id: 'sem-08',
  week: 8,
  title: 'Bienes de uso y CAPEX: lo que dice el libro y lo que vale en serio',
  subtitle: 'Valor contable vs valor de mercado del activo fijo, y cómo leer la variación del CAPEX y del capital de trabajo',
  pillar: 'Capital de Trabajo',
  durationMin: 60,
  objectives: [
    'Distinguir el CAPEX (inversión real en activo fijo del período) de los bienes de uso contables, que arrastran amortización y valuación histórica.',
    'Separar el valor contable del verdadero valor de mercado en cada categoría de bien de uso: terreno, edificio, maquinaria, rodados e intangibles.',
    'Reconocer activos ocultos (que valen más que en libros) y activos sobrevaluados (obsoletos que valen menos).',
    'Leer juntas la variación del capital de trabajo y la del CAPEX para entender cuánta caja consume crecer.',
    'Pensar la administración eficiente de los bienes de uso desde la óptica del dueño, no del balance.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'El balance te muestra el costo, no el valor',
      body: `Cuando mirás los **Bienes de uso** en tu balance, no estás viendo lo que valen: estás viendo lo que costaron, menos las amortizaciones acumuladas. Es la **valuación histórica**, una regla contable pensada para ser prudente y verificable, no para reflejar la realidad económica.

Para un CEO esto genera dos problemas opuestos al mismo tiempo:

- **Activos ocultos:** cosas que valen mucho más de lo que figura. Un terreno comprado hace 20 años sigue en libros a su costo histórico mientras el mercado lo cotiza al triple.
- **Activos sobrevaluados:** cosas que figuran caras pero ya no valen eso. Una máquina tecnológicamente obsoleta tiene un valor neto contable digno, pero si tuvieras que venderla mañana nadie te paga ese número.

El balance no miente: simplemente responde a otra pregunta. Vos necesitás la pregunta de gestión: **¿cuánto valen realmente mis activos y cuánto me cuesta mantenerlos?**`,
    },
    {
      type: 'keypoints',
      title: 'CAPEX y bienes de uso no son lo mismo',
      points: [
        '**CAPEX (Capital Expenditure):** es la inversión REAL en activo fijo que hacés en un período. Es plata que sale de la caja hoy para comprar capacidad futura. Vive en el Flujo de Efectivo (sección de inversión).',
        '**Bienes de uso (contables):** son el stock acumulado de esos activos, valuados a costo histórico y reducidos por amortización. Viven en el Balance.',
        '**Amortización:** es el reconocimiento contable del desgaste. NO es salida de caja, pero sí "consume" valor contable año a año.',
        'El CAPEX de un año alimenta el stock de bienes de uso; la amortización lo erosiona. Por eso el activo fijo neto puede caer aunque sigas invirtiendo.',
      ],
    },
    {
      type: 'theory',
      title: 'Categorías de bienes de uso: cada una se comporta distinto',
      body: `No todos los bienes de uso envejecen igual, y mezclarlos en un solo renglón te ciega:

- **Terreno:** no se amortiza y suele **revaluarse**. Es el candidato número uno a ser un activo oculto.
- **Edificio:** se amortiza lentísimo (décadas). Su valor de mercado suele superar al contable si la zona se valorizó.
- **Maquinaria:** acá está el riesgo. Se amortiza, pero además sufre **obsolescencia tecnológica**: puede valer en libros más de lo que vale en el mercado.
- **Rodados:** se deprecian rápido y de forma predecible. Casi siempre valen menos que el costo, aunque el neto contable puede quedar desfasado.
- **Intangibles (marca, cartera de clientes, know-how):** generados internamente, **muchas veces no figuran en el balance**. Valen, a veces mucho, pero la contabilidad no los reconoce.

La administración eficiente de los bienes de uso arranca por mirarlos de a uno y preguntarte: ¿este activo trabaja para mí o solo ocupa lugar en el balance?`,
    },
    {
      type: 'case',
      title: 'Andina: la brecha entre el libro y el mercado',
      body: `Abramos los bienes de uso de **Andina Manufacturas** y comparemos columna contra columna:

- **Terreno:** figura a **350** en libros, pero a precio de mercado vale **900**. Hay **550 de valor oculto** en un solo renglón: lo compraron hace décadas y nunca se revaluó.
- **Maquinaria:** figura a **1450**, pero parte está tecnológicamente obsoleta; su valor de mercado realista es **1150**. Hay **300 de valor "de mentira"** en el activo.
- **Intangibles:** la marca y la cartera de clientes valen del orden de **650** y **no están contabilizados** (figuran en cero).
- **CAPEX del período:** Andina invirtió **440** en maquinaria nueva este año (sale del Flujo de Efectivo, sección inversión).

El dueño de Andina cree que su patrimonio es el del balance. En realidad tiene **un terreno que vale el doble**, **una máquina que vale menos de lo que cree** y **una marca que no figura**. Tres correcciones que cambian por completo la foto de su empresa.`,
    },
    {
      type: 'table',
      title: 'Bienes de uso de Andina: contable vs mercado',
      headers: ['Categoría', 'Valor contable', 'Valor de mercado', 'Diferencia', 'Lectura'],
      rows: [
        ['Terreno', '350', '900', '+550', 'Activo oculto: revaluación no registrada'],
        ['Edificio', '620', '780', '+160', 'Zona valorizada, ligero valor oculto'],
        ['Maquinaria', '1450', '1150', '-300', 'Parte obsoleta: sobrevaluada en libros'],
        ['Rodados', '140', '110', '-30', 'Depreciación de mercado más rápida'],
        ['Intangibles (marca, cartera)', '0', '650', '+650', 'No contabilizado: valor invisible'],
      ],
    },
    {
      type: 'simulator',
      simulatorId: 'capital-trabajo',
      intro:
        'Usá el simulador para ver cómo conviven la variación del capital de trabajo y el CAPEX de Andina, y cuánta caja consume cada uno. Probá ajustar el CAPEX y observá el efecto sobre el flujo de inversión.',
    },
    {
      type: 'formula',
      name: 'Bien de uso neto del período',
      expr: 'BU neto (cierre) = BU neto (inicio) + CAPEX − Amortización del período − Bajas',
      note: 'El stock de activo fijo sube con la inversión (CAPEX) y baja con amortización y ventas/retiros. Por eso podés invertir todos los años y aun así ver caer el activo fijo neto.',
    },
    {
      type: 'theory',
      title: 'Variación del capital de trabajo + CAPEX: el verdadero costo de crecer',
      body: `Cuando una empresa crece, la caja se va por **dos caños** que el Estado de Resultados no muestra:

- **La variación del capital de trabajo:** más ventas piden más cuentas por cobrar y más inventario. En Andina, las cuentas por cobrar subieron **330** y los inventarios **550** en el año: caja atrapada.
- **El CAPEX:** para sostener o ampliar capacidad hay que invertir. Andina puso **440** en maquinaria.

Sumadas, estas dos partidas explican por qué una empresa **rentable** puede estar siempre tensa de caja. El resultado neto fue positivo, pero entre capital de trabajo y CAPEX se fue muchísima más plata de la que entró por utilidad. Leer juntas estas dos variaciones es lo que separa al que mira el margen del que entiende el flujo.`,
    },
    {
      type: 'insight',
      body: 'El patrimonio neto contable es el residual de números históricos. El patrimonio neto económico de un dueño incorpora el terreno revaluado, descuenta la máquina obsoleta y suma la marca invisible. En Andina, esas tres correcciones (+550, −300, +650) cambian la valuación de la empresa más que un año entero de ganancia.',
    },
    {
      type: 'warning',
      body: 'No confundas "tengo muchos bienes de uso" con "tengo una empresa valiosa". Un activo fijo grande que no rota ni produce rentabilidad es capital inmovilizado: mismo problema que el inventario obsoleto, pero más difícil de vender. Antes de comprar más maquinaria, preguntate cuánto de la que ya tenés está trabajando de verdad.',
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a auditar tus bienes de uso y a separar valor contable de valor de mercado.',
      prompt:
        'Sos un consultor en valuación de activos asesorando al dueño de una PyME industrial. Te voy a pasar el listado de bienes de uso de mi empresa con su valor neto contable. Quiero que: (1) los clasifiques por categoría (terreno, edificio, maquinaria, rodados, intangibles); (2) para cada uno me preguntes lo que necesites para estimar su valor de mercado (antigüedad, estado, obsolescencia, zona); (3) me marques cuáles son probables "activos ocultos" (valen más que en libros) y cuáles están sobrevaluados; (4) me señales qué intangibles valiosos no están contabilizados. Cerrá con una tabla contable vs mercado y la brecha total. Empezá pidiéndome el listado.',
      note: 'Hacelo con tus propios activos. Vas a descubrir que tu empresa probablemente vale bastante distinto de lo que dice el balance, en una dirección o en la otra.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Cuál es la diferencia central entre CAPEX y bienes de uso contables?',
      options: [
        'Son sinónimos: ambos miden el activo fijo.',
        'El CAPEX es la inversión real del período (sale de la caja); los bienes de uso son el stock acumulado a valor histórico menos amortización.',
        'El CAPEX vive en el Balance y los bienes de uso en el Flujo de Efectivo.',
        'El CAPEX incluye la amortización y los bienes de uso no.',
      ],
      correctIndex: 1,
      explanation:
        'El CAPEX es el flujo de inversión real del período (sección de inversión del Flujo de Efectivo). Los bienes de uso son el stock acumulado en el Balance, valuado a costo histórico neto de amortización.',
    },
    {
      id: 'q2',
      question: 'En Andina, el terreno figura a 350 en libros pero vale 900 en el mercado. ¿Cómo se lee?',
      options: [
        'Hay un error contable que debe corregirse de inmediato.',
        'Es un activo oculto: la valuación histórica no refleja la revaluación de mercado (+550 de valor invisible).',
        'El terreno está sobrevaluado.',
        'La diferencia es la amortización acumulada del terreno.',
      ],
      correctIndex: 1,
      explanation:
        'El terreno no se amortiza y suele revaluarse. La contabilidad lo mantiene a costo histórico, por lo que su valor real supera al contable: es un activo oculto de 550.',
    },
    {
      id: 'q3',
      question: '¿Por qué una empresa rentable como Andina puede estar siempre tensa de caja?',
      options: [
        'Porque el resultado neto fue negativo.',
        'Porque la variación del capital de trabajo (más cuentas por cobrar e inventarios) y el CAPEX consumen caja que el Estado de Resultados no muestra.',
        'Porque la amortización es una salida de caja muy grande.',
        'Porque los intangibles no están contabilizados.',
      ],
      correctIndex: 1,
      explanation:
        'Crecer drena caja por dos caños invisibles en el resultado: el aumento del capital de trabajo (créditos e inventarios) y el CAPEX. En Andina, +330 de créditos, +550 de inventarios y 440 de CAPEX explican la tensión de caja pese a la ganancia.',
    },
  ],
  simulators: ['capital-trabajo'],
}
