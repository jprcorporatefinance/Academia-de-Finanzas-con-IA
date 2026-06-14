import type { Lesson } from '../../types'

export const semana02: Lesson = {
  id: 'sem-02',
  week: 2,
  title: 'Contabilidad de presentación vs. información de gestión',
  subtitle: 'Leer lo que dicen los libros no es lo mismo que entender qué pasa realmente en tu empresa',
  pillar: 'Lectura Contable',
  durationMin: 60,
  objectives: [
    'Distinguir la contabilidad de presentación (para terceros) de la información de gestión (para decidir).',
    'Entender por qué existe una contabilidad pensada para el fisco, los bancos y los consejos profesionales.',
    'Reconocer la brecha entre valor contable y valor real/de mercado con el caso Andina.',
    'Convertir datos contables en conocimiento, y conocimiento en acciones concretas.',
    'Controlar lo estimado contra lo realmente sucedido como hábito de gestión.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'Dos contabilidades que conviven en la misma empresa',
      body: `La semana pasada aprendimos a **leer** los estados contables sin miedo. Esta semana damos un salto incómodo pero liberador: descubrir que **lo que los libros muestran no siempre es lo que realmente pasa**.

Toda empresa tiene, en la práctica, dos contabilidades. La primera es la **contabilidad de presentación**: la que se arma para mostrarle a terceros. El fisco quiere ver una base imponible; los bancos quieren ver garantías y ratios; los consejos profesionales imponen normas de valuación que privilegian la prudencia y el costo histórico. Es una contabilidad pensada para **rendir cuentas hacia afuera**, no para tomar decisiones hacia adentro.

La segunda es la **información de gestión**: la que un CEO necesita para entender qué está creando o destruyendo valor, dónde se atrapa la caja, qué activos rinden y cuáles pesan. Esta no aparece firmada en ningún balance. Hay que buscarla, ajustarla y construirla. Y ese es, justamente, el oficio financiero que vamos a aprender.`,
    },
    {
      type: 'keypoints',
      title: 'Por qué la contabilidad de presentación te oculta cosas',
      points: [
        '**Está hecha para terceros:** fisco, bancos y consejos profesionales tienen objetivos distintos a los del dueño.',
        '**Prioriza la prudencia y el costo histórico:** valúa al precio de compra, no al valor de hoy.',
        '**Subestima activos valiosos:** un terreno comprado hace 22 años figura a precio de entonces.',
        '**No reconoce intangibles internos:** la marca y la cartera de clientes que vos construiste no figuran.',
        '**No castiga a tiempo lo deteriorado:** la mora vieja y el stock obsoleto siguen valuados como si valieran lo mismo.',
      ],
    },
    {
      type: 'insight',
      body: 'Leer la contabilidad de presentación es leer lo que la empresa le cuenta al fisco y al banco. Buscar la información de gestión es averiguar la verdad para vos mismo. El CEO que confunde una con la otra termina decidiendo sobre una foto retocada.',
    },
    {
      type: 'theory',
      title: 'Valor contable vs. valor real: la brecha que importa',
      body: `El **valor contable** (o "valor libro") es lo que figura registrado según las normas. El **valor real** (o de mercado/gestión) es lo que ese activo o pasivo vale verdaderamente hoy si tuvieras que venderlo, cobrarlo o realizarlo.

Esta brecha corre en las dos direcciones y por eso es tan traicionera:

- A veces los libros **subestiman** la riqueza: un terreno viejo, una marca construida a pulso, una cartera de clientes fieles. Son **activos ocultos** que no figuran o figuran muy por debajo de su valor.
- A veces los libros **sobreestiman** la riqueza: cuentas por cobrar que nunca vas a cobrar, inventario que ya nadie compra, maquinaria tecnológicamente vieja. Son **pérdidas latentes** todavía no reconocidas.

El problema no es que exista la brecha. El problema es **decidir como si no existiera**. Un dueño que cree que su patrimonio es el del balance puede estar más rico o más pobre de lo que piensa, y en ambos casos toma malas decisiones.`,
    },
    {
      type: 'case',
      title: 'Andina Manufacturas: cuatro brechas que cambian todo',
      body: `Abramos los libros de **Andina** y comparemos valor contable contra valor real, partida por partida:

- **El terreno** figura en libros a **350** (valor histórico de hace más de dos décadas), pero a precio de mercado vale **900**. Hay **550 de riqueza oculta** que ningún estado contable muestra.
- **Los intangibles** (marca y cartera de clientes) valen alrededor de **650** y en los libros figuran en **0**. La contabilidad no reconoce lo que más diferencia a Andina de un competidor cualquiera.
- **Las cuentas por cobrar** figuran en **1.850**, pero hay **290 de mora mayor a 120 días** con baja probabilidad de cobro. El valor real es **1.560**: 290 que el balance cuenta como activo y la realidad ya casi no.
- **El inventario** figura en **2.400**, pero **420 son mercadería obsoleta o de lenta rotación** valuada a costo histórico. A mercado vale bastante menos.

Sumá las dos primeras y Andina es **más rica** de lo que dice el balance. Sumá las dos últimas y, en su capital de trabajo, es **más pobre**. Ninguna de estas cuatro verdades aparece firmada por el contador, pero todas cambian cómo deberías dirigir la empresa.`,
    },
    {
      type: 'table',
      title: 'Andina: valor contable vs. valor real (USD miles, 2024)',
      headers: ['Partida', 'Valor contable', 'Valor real', 'Brecha'],
      rows: [
        ['Terreno', '350', '900', '+550 (oculto)'],
        ['Intangibles (marca, cartera)', '0', '650', '+650 (oculto)'],
        ['Cuentas por cobrar', '1.850', '1.560', '-290 (incobrable)'],
        ['Inventarios', '2.400', '1.980', '-420 (obsoleto)'],
      ],
    },
    {
      type: 'simulator',
      simulatorId: 'estados',
      intro:
        'Activá la vista "valor real" sobre los estados de Andina. Vas a ver cómo cada partida se mueve respecto del valor libro, y cómo cambia la foto del patrimonio cuando dejás de mirar solo la contabilidad de presentación.',
    },
    {
      type: 'warning',
      body: 'No es que la contabilidad de presentación esté "mal": cumple su función ante el fisco, el banco y la norma profesional. El error es del CEO que la usa para decidir. Para el fisco, prudencia; para vos, la verdad de gestión. Confundir los públicos es el origen de la mitad de las malas decisiones patrimoniales.',
    },
    {
      type: 'theory',
      title: 'De datos a conocimiento, y de conocimiento a acciones',
      body: `Los estados contables son **datos**. Por sí solos no deciden nada. El trabajo del CEO financiero es subir tres escalones:

1. **Dato:** "Las cuentas por cobrar figuran en 1.850". Es un número en una hoja.
2. **Conocimiento:** "290 de esos 1.850 tienen mora mayor a 120 días y probablemente no se cobren; mi cobranza se está deteriorando". Ya es una lectura, una interpretación.
3. **Acción:** "Reviso la política de crédito, le pongo límite a los clientes morosos, previsiono los 290 y dejo de contarlos como caja futura". Eso es gestión.

La contabilidad de presentación te entrega el primer escalón y te deja ahí. La información de gestión existe para que subas hasta el tercero. Si un análisis financiero no termina en una decisión concreta, todavía no terminó.`,
    },
    {
      type: 'theory',
      title: 'Controlar lo estimado contra lo realmente sucedido',
      body: `Hay una segunda disciplina de gestión que la contabilidad de presentación tampoco te da servida: **comparar lo que estimaste con lo que efectivamente pasó**.

Cuando previsionaste incobrables, valuaste un inventario o proyectaste una cobranza, hiciste una **estimación**. La gestión madura consiste en volver, meses después, y preguntarse: ¿se cumplió? Andina estimó que su cartera era cobrable, y la realidad le devolvió **290 de mora dura**. Estimó que su stock rotaba, y le quedaron **420 obsoletos**.

Cada brecha entre lo estimado y lo sucedido es **información valiosísima**: te dice dónde tu modelo mental de la empresa está equivocado. Llevar este control de forma sistemática es lo que separa al dueño que se sorprende cada cierre del que ya vio venir el problema.`,
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a construir tu propia "información de gestión" ajustando tu balance de presentación a valores reales.',
      prompt:
        'Sos un consultor financiero experto en PyMEs. Te voy a pasar mi balance contable. Quiero que me ayudes a construir un "balance de gestión" ajustando los valores libro a valores reales. Para cada partida importante (inmuebles, maquinaria, cuentas por cobrar, inventarios, intangibles no registrados como marca o cartera) preguntame: (1) hace cuánto la valué y a qué precio; (2) qué porción podría no cobrarse o estar obsoleta; (3) si hay activos que valen pero no figuran. Después armame una tabla comparando valor contable vs. valor real, calculá la brecha total y decime qué decisiones de gestión sugiere cada diferencia. Empezá pidiéndome los datos.',
      note: 'Hacelo primero con los números de Andina del simulador para practicar, y después con los tuyos. El objetivo no es un número lindo: es una lista de acciones.',
    },
    {
      type: 'insight',
      body: 'La contabilidad mira hacia atrás y hacia afuera; la gestión mira hacia adelante y hacia adentro. Vas a usar las dos, pero nunca más vas a confundir cuál sirve para qué.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Para quién está pensada principalmente la contabilidad de presentación?',
      options: [
        'Para que el CEO tome decisiones operativas del día a día.',
        'Para terceros: fisco, bancos y consejos profesionales.',
        'Para los clientes de la empresa.',
        'Para calcular el valor de mercado de los activos.',
      ],
      correctIndex: 1,
      explanation:
        'La contabilidad de presentación responde a terceros (fisco, bancos, normas profesionales) y privilegia la prudencia y el costo histórico. Para decidir, el CEO necesita información de gestión.',
    },
    {
      id: 'q2',
      question: 'En Andina, el terreno figura en libros a 350 pero a mercado vale 900. ¿Qué representa esa diferencia?',
      options: [
        'Un error contable que hay que corregir ante el fisco.',
        'Una pérdida latente todavía no reconocida.',
        'Un activo oculto: riqueza real que el balance no muestra.',
        'Un intangible que debe amortizarse.',
      ],
      correctIndex: 2,
      explanation:
        'El terreno valuado a costo histórico (350) vale 900 a mercado: hay 550 de riqueza oculta. Es un activo oculto que la contabilidad de presentación no refleja.',
    },
    {
      id: 'q3',
      question: '¿Cuál es el último escalón del trabajo financiero del CEO según la lección?',
      options: [
        'Tener el dato registrado correctamente en el balance.',
        'Interpretar el dato y convertirlo en conocimiento.',
        'Presentar el balance al fisco a tiempo.',
        'Convertir el conocimiento en una acción o decisión concreta.',
      ],
      correctIndex: 3,
      explanation:
        'El camino es dato → conocimiento → acción. Si un análisis financiero no termina en una decisión concreta, todavía no cumplió su función de gestión.',
    },
  ],
  simulators: ['estados'],
}
