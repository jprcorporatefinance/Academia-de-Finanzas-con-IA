import type { Lesson } from '../../types'

export const semana01: Lesson = {
  id: 'sem-01',
  week: 1,
  title: 'Leer los estados contables sin miedo',
  subtitle: 'Balance, Estado de Resultados y Flujo de Efectivo: qué dice cada uno y cómo se conectan',
  pillar: 'Lectura Contable',
  durationMin: 60,
  objectives: [
    'Entender la lógica de los tres estados contables básicos y cómo se articulan entre sí.',
    'Distinguir una foto (Balance) de una película (Estado de Resultados y Flujo de Efectivo).',
    'Leer el caso "Andina Manufacturas" e identificar sus partidas principales.',
    'Plantear las primeras preguntas de un CEO frente a un estado contable.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'Por qué un CEO tiene que saber leer estos números',
      body: `Como dueño o CEO no necesitás llevar la contabilidad, pero **sí necesitás interrogarla**. Los estados contables son el idioma en el que tu empresa te cuenta qué hizo con la plata. Si no sabés leerlos, dependés de que otro te traduzca... y muchas veces esa traducción te muestra solo el "margen" y te esconde lo importante.

En este programa vamos a recorrer un camino: empezamos aprendiendo a **leer** la contabilidad de presentación, y terminamos sabiendo **buscar la verdadera información de gestión**, esa que convierte datos en decisiones. Pero no se puede saltar etapas: primero, leer bien.`,
    },
    {
      type: 'keypoints',
      title: 'Los tres estados, en una frase cada uno',
      points: [
        '**Balance (Estado de Situación Patrimonial):** una FOTO a una fecha. Qué tengo (Activo), qué debo (Pasivo) y qué es mío (Patrimonio Neto).',
        '**Estado de Resultados:** una PELÍCULA de un período. Cuánto vendí, cuánto me costó, cuánto gané (o perdí) en lo económico.',
        '**Estado de Flujo de Efectivo:** la otra PELÍCULA, la del dinero real que entró y salió. Lo financiero, la caja.',
      ],
    },
    {
      type: 'theory',
      title: 'La ecuación que sostiene todo: Activo = Pasivo + Patrimonio Neto',
      body: `Todo el Balance es esta identidad: lo que la empresa **tiene** (Activo) fue financiado por terceros (**Pasivo**: bancos, proveedores, fisco) o por los dueños (**Patrimonio Neto**: capital + resultados acumulados).

Leído al revés, esto ya es una idea de finanzas corporativas: el Activo es **dónde pusiste la plata** y el Pasivo + PN es **de dónde salió**. Más adelante vamos a ver que no todo el pasivo cuesta lo mismo (los proveedores suelen ser gratis; el descubierto bancario es carísimo), y que no todo el activo rinde lo mismo.`,
    },
    {
      type: 'formula',
      name: 'Identidad contable fundamental',
      expr: 'Activo = Pasivo + Patrimonio Neto',
      note: 'El Patrimonio Neto es el "residual": lo que quedaría para los dueños si se realizara el activo y se cancelara el pasivo.',
    },
    {
      type: 'case',
      title: 'Andina Manufacturas: nuestra empresa-caso durante 3 meses',
      body: `Vamos a acompañar a **Andina Manufacturas S.A.**, una PyME industrial de autopartes. Su Estado de Resultados muestra ganancia y las ventas crecen. El dueño está tranquilo mirando el margen. Pero la caja siempre está tensa, usa descubierto bancario y cheques diferidos, el inventario crece más rápido que las ventas y los clientes pagan cada vez más tarde.

Durante todo el programa vamos a "abrir" a Andina con bisturí: esta semana sólo la leemos. En las próximas, vamos a descubrir que está **destruyendo valor pese a dar ganancia contable**. Abrí el simulador de Estados Contables para recorrer sus números.`,
    },
    {
      type: 'simulator',
      simulatorId: 'estados',
      intro:
        'Recorré el Balance, el Estado de Resultados y el Flujo de Efectivo de Andina. Activá la vista "valor real" para anticipar lo que veremos en la Semana 2.',
    },
    {
      type: 'insight',
      body: 'Una empresa puede tener un Estado de Resultados impecable y estar al borde de un problema de caja. Resultado positivo NO es lo mismo que caja positiva. Esa diferencia entre lo económico y lo financiero es uno de los ejes del programa.',
    },
    {
      type: 'theory',
      title: 'Cómo se conectan los tres estados',
      body: `Los estados no son islas:

- El **resultado neto** del Estado de Resultados se acumula en el Patrimonio Neto del Balance (resultados acumulados).
- Las **amortizaciones** que restan en el Estado de Resultados no salen de la caja: por eso el Flujo de Efectivo las vuelve a sumar.
- El **aumento de cuentas por cobrar e inventarios** no aparece en el resultado, pero **drena caja**: por eso una empresa "rentable" puede quedarse sin efectivo.

Aprender a saltar entre los tres estados es la primera habilidad. La verdadera lectura financiera nace de cruzarlos, no de leerlos por separado.`,
    },
    {
      type: 'warning',
      body: 'Cuidado con quedarte solo en el Estado de Resultados. Es el estado más "lindo" y el que más se mira en las reuniones, pero es también el más fácil de malinterpretar: no muestra la caja, no muestra la rotación, y no muestra cómo se financió el crecimiento.',
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a leer un estado contable real (el tuyo) por primera vez.',
      prompt:
        'Sos un CFO con 20 años de experiencia explicándole a un CEO sin formación contable. Te voy a pegar mi Balance y mi Estado de Resultados. Quiero que: (1) me los expliques en lenguaje simple, partida por partida; (2) me marques las 5 cifras más importantes y por qué; (3) me digas qué preguntas debería hacerle a mi contador. No uses jerga sin definirla. Empezá pidiéndome los datos.',
      note: 'Pegá tus propios números (o los de Andina) y dejá que Claude te guíe. Este es el primer paso del método: leer antes de juzgar.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Qué representa el Balance respecto del Estado de Resultados?',
      options: [
        'El Balance es una película de un período; el Estado de Resultados es una foto.',
        'El Balance es una foto a una fecha; el Estado de Resultados es una película de un período.',
        'Ambos son fotos a la misma fecha.',
        'El Balance solo muestra la caja.',
      ],
      correctIndex: 1,
      explanation:
        'El Balance es una foto a una fecha (situación patrimonial); el Estado de Resultados resume lo ocurrido durante un período.',
    },
    {
      id: 'q2',
      question: 'Una empresa con resultado neto positivo, ¿necesariamente tiene caja positiva?',
      options: [
        'Sí, ganancia y caja son lo mismo.',
        'No: la ganancia puede estar "atrapada" en cuentas por cobrar e inventarios.',
        'Sí, siempre que venda al contado.',
        'Solo si paga dividendos.',
      ],
      correctIndex: 1,
      explanation:
        'El resultado es económico; la caja es financiera. Aumentos de créditos e inventarios consumen caja sin afectar el resultado.',
    },
    {
      id: 'q3',
      question: 'En la identidad Activo = Pasivo + Patrimonio Neto, ¿qué representa el Pasivo?',
      options: [
        'Lo que la empresa tiene.',
        'El financiamiento aportado por los dueños.',
        'El financiamiento aportado por terceros (bancos, proveedores, fisco).',
        'La ganancia del período.',
      ],
      correctIndex: 2,
      explanation:
        'El Pasivo es el financiamiento de terceros. El Patrimonio Neto es el aporte de los dueños más los resultados retenidos.',
    },
  ],
  simulators: ['estados'],
}
