import type { Lesson } from '../../types'

export const semana10: Lesson = {
  id: 'sem-10',
  week: 10,
  title: 'Apalancamiento: la deuda como multiplicador de ganancias y de pérdidas',
  subtitle: 'Nivel óptimo de deuda, riesgo económico vs financiero y Modigliani-Miller en la práctica',
  pillar: 'Apalancamiento y Riesgo',
  durationMin: 60,
  objectives: [
    'Entender cómo la deuda multiplica el rendimiento del capital propio (ROE) cuando el negocio rinde más que el costo de la deuda, y lo hunde cuando rinde menos.',
    'Distinguir el riesgo económico (del negocio) del riesgo financiero (que agrega la deuda).',
    'Identificar el nivel óptimo de deuda y reconocer cuándo el apalancamiento se convierte en riesgo de quiebra, usando la cobertura de intereses.',
    'Comprender qué demostraron Modigliani y Miller y cómo se traduce en decisiones cotidianas de financiamiento.',
    'Diseñar un plan para salir del sobreendeudamiento partiendo de la situación real de Andina.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'La deuda es una palanca: amplifica en las dos direcciones',
      body: `Una palanca multiplica la fuerza: con poco esfuerzo movés mucho peso. La deuda hace exactamente eso con el rendimiento del capital de los dueños. Si la empresa toma plata prestada a una tasa más baja de lo que ese dinero rinde dentro del negocio, la diferencia queda para los accionistas, que pusieron menos capital propio. El **ROE** (rendimiento sobre el patrimonio) se dispara. Eso es el lado luminoso del apalancamiento.

Pero la palanca no distingue direcciones. Si el negocio rinde **menos** que el costo de la deuda, esa misma palanca amplifica la pérdida: los intereses se comen el resultado, el ROE se hunde y, en el extremo, la empresa no puede pagar y entra en crisis. La deuda **no crea valor por sí sola**: solo multiplica el valor (o el desastre) que ya genera el negocio.

Por eso la pregunta del CEO no es "¿me endeudo o no?", sino **"¿mi negocio rinde más que lo que me cuesta la deuda, y tengo espalda para pagarla incluso en un mal año?"**. Endeudarse cuando el ROIC le gana al costo de la deuda es inteligente; endeudarse para tapar un negocio que no rinde es acelerar hacia la pared.`,
    },
    {
      type: 'keypoints',
      title: 'Cómo funciona la palanca',
      points: [
        '**Apalancamiento positivo:** cuando el ROIC supera el costo de la deuda después de impuestos. Cada peso prestado suma al ROE. La deuda trabaja para los dueños.',
        '**Apalancamiento negativo:** cuando el ROIC cae por debajo del costo de la deuda. Cada peso prestado resta. La deuda trabaja contra los dueños.',
        '**El multiplicador es D/E:** cuanto mayor la relación deuda/capital propio, más potente la palanca, para bien y para mal.',
        '**La deuda no genera rentabilidad, la amplifica:** primero el negocio tiene que rendir; la deuda solo decide si ese rendimiento se multiplica o se destruye.',
      ],
    },
    {
      type: 'formula',
      name: 'ROE apalancado (efecto del endeudamiento sobre el rendimiento del dueño)',
      expr: 'ROE = ROIC + (ROIC − i × (1 − t)) × (D / E)',
      note: 'Si ROIC > i·(1−t), el segundo término suma y la deuda eleva el ROE. Si ROIC < i·(1−t), el término es negativo y la deuda hunde el ROE. D/E amplifica el efecto en ambos sentidos.',
    },
    {
      type: 'theory',
      title: 'Riesgo económico vs riesgo financiero: dos riesgos distintos',
      body: `Toda empresa convive con dos clases de riesgo que conviene no mezclar:

- **Riesgo económico (o del negocio):** la incertidumbre propia de la actividad. Que caigan las ventas, que suba el costo de la materia prima, que un cliente grande se vaya. Existe aunque la empresa no tenga ni un peso de deuda. Depende del sector, la competencia, la estructura de costos.
- **Riesgo financiero:** el que **agrega la deuda**. Una empresa muy endeudada tiene compromisos fijos (intereses y capital) que hay que pagar sí o sí, llueva o truene. En un mal año, el negocio puede aguantar la caída de ventas; lo que muchas veces no aguanta es la cuota del banco.

La clave es que el riesgo financiero **se monta sobre** el económico. Una empresa con negocio muy volátil (alto riesgo económico) debería endeudarse poco, porque agregarle riesgo financiero la vuelve frágil. Una con ingresos estables y predecibles puede tolerar más deuda. El error grave es tomar mucha deuda en un negocio ya de por sí inestable: ahí los dos riesgos se potencian.`,
    },
    {
      type: 'theory',
      title: 'Modigliani-Miller: por qué revolucionaron las finanzas',
      body: `En 1958, Franco **Modigliani** y Merton **Miller** demostraron algo que en su momento sonó a herejía: en un mundo ideal (sin impuestos, sin costos de quiebra, con información perfecta), **el valor de una empresa no depende de cómo se financia**. Da igual cuánta deuda y cuánto capital propio tenga: el valor lo crea el negocio, no la mezcla del financiamiento. Les valió el premio Nobel y partió en dos la historia de las finanzas corporativas, porque obligó a todos a preguntarse: entonces, ¿cuándo importa el financiamiento?

La respuesta vino de **relajar los supuestos**, y ahí aparece la versión práctica que nos sirve:

- **Con impuestos**, la deuda tiene una ventaja: los intereses son deducibles (el escudo fiscal que vimos con el WACC). Eso empuja a usar **algo** de deuda, porque abarata el costo del capital.
- **Pero la deuda en exceso trae costos de quiebra:** proveedores que se ponen nerviosos, bancos que cierran el grifo, clientes que dudan, decisiones tomadas con la soga al cuello. Eso empuja en la dirección contraria.

El punto donde el beneficio fiscal de la deuda deja de compensar el aumento del riesgo de quiebra es el **nivel óptimo de deuda**. Modigliani-Miller no nos dice "endeudate" ni "no te endeudes": nos enseña a buscar ese equilibrio. Esa es la teoría llevada a la práctica cotidiana del dueño.`,
    },
    {
      type: 'insight',
      body: 'La gran lección de Modigliani-Miller para el día a día es que el financiamiento no crea valor de la nada: lo hace un buen negocio. La deuda solo agrega valor en el margen, por el escudo fiscal, hasta que el riesgo de quiebra se lo come. Un dueño que cree que se va a salvar "consiguiendo más crédito" para un negocio que no rinde, entendió todo al revés.',
    },
    {
      type: 'theory',
      title: 'El nivel óptimo de deuda y la cobertura de intereses',
      body: `¿Cómo sabe un CEO si está en zona sana o ya pasó la raya? El indicador más directo es la **cobertura de intereses**: cuántas veces el resultado operativo (EBIT) alcanza para pagar los intereses.

- **Cobertura alta (3x o más):** el negocio paga los intereses con holgura y le sobra. Hay margen para tomar más deuda si conviene.
- **Cobertura ajustada (1,5x a 2x):** zona de alerta. Un mal trimestre y los intereses se comen casi todo el resultado operativo.
- **Cobertura menor a 1x:** el negocio ni siquiera genera para pagar los intereses. Sobreendeudamiento. Se está pagando deuda con más deuda.

¿Por qué hay empresas que casi no se endeudan? Porque priorizan dormir tranquilas: cero riesgo financiero, total autonomía. El costo es que renuncian al escudo fiscal y suelen crecer más lento. ¿Y por qué es **sano** tener algo de deuda? Porque el capital propio es más caro que la deuda (lo vimos en el WACC), el escudo fiscal abarata el financiamiento, y la disciplina de pagar una cuota obliga a gestionar mejor. El extremo de no endeudarse nunca tampoco es óptimo: es dejar valor sobre la mesa.`,
    },
    {
      type: 'case',
      title: 'Andina: una cobertura de 1,5x que enciende la alarma',
      body: `Andina muestra el lado oscuro del apalancamiento. Su resultado operativo (EBIT) del año fue de **830**, y pagó **560 de intereses**. La cobertura es:

**Cobertura = EBIT / Intereses = 830 / 560 ≈ 1,5x**

Es una cobertura **riesgosa**. De cada peso de resultado operativo, dos tercios se van en intereses antes de pagar un solo peso de impuesto o de dividendo. Le queda muy poco colchón: si las ventas caen un poco o sube la tasa, los intereses se comen todo el EBIT y la empresa entra en pérdida financiera.

Peor: buena parte de esa deuda es **descubierto bancario carísimo** (TNA del orden del 85% en pesos), el peor tipo de financiamiento, tomado para tapar baches de caja, no para invertir. Andina no se endeudó para crecer y multiplicar el ROE: se endeudó para sobrevivir, y la palanca está jugando en su contra. Abrí el simulador para ver cómo cambia su ROE y su cobertura al mover el nivel de deuda.`,
    },
    {
      type: 'simulator',
      simulatorId: 'apalancamiento',
      intro:
        'Movés el nivel de deuda de Andina y observás dos efectos a la vez: cómo cambia el ROE (la palanca multiplicando) y cómo se deteriora la cobertura de intereses (el riesgo creciendo). Buscá el punto donde el ROE mejora sin que la cobertura caiga a zona peligrosa.',
    },
    {
      type: 'table',
      title: 'La misma deuda, dos negocios distintos',
      headers: ['Escenario', 'ROIC', 'Costo deuda neto', 'Efecto sobre el ROE', 'Lectura'],
      rows: [
        ['Negocio rinde bien', '25%', '11,7%', 'Sube fuerte', 'Apalancamiento positivo: la deuda multiplica ganancias'],
        ['Negocio empata', '12%', '11,7%', 'Casi neutro', 'La deuda casi no agrega valor'],
        ['Negocio rinde mal (Andina)', '8%', '11,7%', 'Baja', 'Apalancamiento negativo: la deuda multiplica pérdidas'],
      ],
    },
    {
      type: 'warning',
      body: 'La cobertura de intereses de 1,5x de Andina no es solo un número incómodo: es una empresa que perdió margen de maniobra. Cuando la cobertura es baja y la deuda es cara y de corto plazo (descubierto, cheques), cualquier sacudón (una venta caída, un cliente que paga tarde, una suba de tasa) puede transformar un problema de rentabilidad en un problema de supervivencia. El sobreendeudamiento no avisa: aprieta de golpe.',
    },
    {
      type: 'theory',
      title: 'Cómo salir del sobreendeudamiento',
      body: `Salir del sobreendeudamiento no es solo "pagar deuda": es **cambiar la calidad** del endeudamiento y atacar la causa. Un orden de prioridades para un caso como Andina:

- **Matar primero la deuda más cara:** el descubierto bancario (TNA ~85%) es lo primero que hay que eliminar. Cada peso que sale de ahí rinde más que casi cualquier inversión.
- **Estirar el plazo:** reemplazar deuda de corto plazo y carísima por deuda más larga y barata baja la presión de caja inmediata, aunque la deuda total no baje al principio.
- **Liberar capital atrapado:** acelerar cobranzas, bajar inventario obsoleto y vender activos improductivos genera caja para desendeudarse sin pedir más crédito. Acá se conecta todo lo que vimos sobre capital de trabajo y bienes de uso.
- **No repartir dividendos mientras la cobertura sea frágil:** retener resultados fortalece el patrimonio y baja la dependencia de la deuda.
- **Atacar la causa, no el síntoma:** si la empresa se endeuda para tapar un negocio que no rinde, ninguna refinanciación la salva. Primero hay que hacer que el negocio rinda más que el costo del capital.`,
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a diagnosticar tu nivel de deuda y armar un plan de desapalancamiento.',
      prompt:
        'Sos un asesor financiero experto en reestructuración de deuda de PyMEs. Te voy a pasar mi EBIT (resultado operativo), mis intereses anuales, el detalle de mis deudas (monto, tasa y plazo de cada una) y mi patrimonio neto. Quiero que: (1) calcules mi cobertura de intereses y me digas en qué zona estoy (sana, alerta o sobreendeudamiento); (2) estimes si mi apalancamiento es positivo o negativo comparando mi ROIC con el costo de mi deuda después de impuestos; (3) ordenes mis deudas de la más cara a la más barata y me digas cuál atacar primero; (4) me armes un plan de desapalancamiento en pasos concretos, distinguiendo lo que es síntoma de lo que es causa. Empezá pidiéndome los datos.',
      note: 'Cargá tus números o los de Andina (EBIT 830, intereses 560, cobertura 1,5x, con descubierto bancario carísimo). El objetivo es salir con un orden de prioridades claro, no con una sensación difusa de "tengo mucha deuda".',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Según ROE = ROIC + (ROIC − i(1−t)) × D/E, ¿cuándo la deuda multiplica las ganancias del dueño?',
      options: [
        'Siempre que la empresa tome deuda.',
        'Cuando el ROIC supera al costo de la deuda después de impuestos: el segundo término es positivo y la deuda eleva el ROE.',
        'Cuando el ROIC es menor al costo de la deuda.',
        'Solo cuando no hay impuestos.',
      ],
      correctIndex: 1,
      explanation:
        'Si el ROIC le gana al costo de la deuda después de impuestos, el término (ROIC − i(1−t)) es positivo y, multiplicado por D/E, eleva el ROE. Si el ROIC queda por debajo, ese mismo término se vuelve negativo y la deuda hunde el ROE.',
    },
    {
      id: 'q2',
      question: '¿Cuál es la diferencia entre riesgo económico y riesgo financiero?',
      options: [
        'Son lo mismo medido de dos formas.',
        'El riesgo económico es el del negocio (existe sin deuda); el riesgo financiero es el que agrega la deuda con sus compromisos fijos de pago.',
        'El riesgo financiero es el del negocio y el económico el de la deuda.',
        'El riesgo económico solo aparece cuando hay deuda.',
      ],
      correctIndex: 1,
      explanation:
        'El riesgo económico es propio de la actividad y existe aunque no haya deuda. El riesgo financiero lo agrega el endeudamiento, con sus pagos fijos de intereses y capital, y se monta sobre el económico.',
    },
    {
      id: 'q3',
      question: 'Andina tiene EBIT de 830 e intereses de 560 (cobertura ≈ 1,5x). ¿Cómo se interpreta?',
      options: [
        'Cobertura holgada: puede tomar mucha más deuda sin riesgo.',
        'Cobertura riesgosa: los intereses consumen dos tercios del resultado operativo y queda poco colchón ante un mal año.',
        'Cobertura menor a 1: la empresa no genera para pagar intereses.',
        'La cobertura no dice nada sobre el riesgo de la empresa.',
      ],
      correctIndex: 1,
      explanation:
        'Una cobertura de 1,5x significa que el EBIT apenas alcanza 1,5 veces los intereses: dos tercios del resultado operativo se van en deuda. Es zona de alerta, sobre todo con deuda cara y de corto plazo como el descubierto de Andina.',
    },
  ],
  simulators: ['apalancamiento'],
}
