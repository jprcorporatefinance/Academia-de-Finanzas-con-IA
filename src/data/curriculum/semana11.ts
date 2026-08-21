import type { Lesson } from '../../types'

export const semana11: Lesson = {
  id: 'sem-11',
  week: 11,
  title: 'Tasas, tiempo y financiamiento inteligente',
  subtitle: 'TNA vs TEA, tasa real con inflación, el costo financiero total y los sistemas de amortización: cómo pagar menos y ganar tiempo sin comprometer lo económico',
  pillar: 'Estrategia Financiera',
  durationMin: 60,
  objectives: [
    'Distinguir tasa nominal (TNA) de tasa efectiva (TEA) y entender por qué la capitalización cambia lo que realmente pagás.',
    'Separar tasa nominal de tasa real usando la ecuación de Fisher, para saber cuánto cuesta el dinero descontada la inflación.',
    'Calcular la tasa financieramente afrontada (CFT): gastos, comisiones e impuestos, incluso cuando algunos se recuperan en el tiempo.',
    'Elegir entre sistemas de amortización (francés, alemán, americano) y entre tasa fija y variable según el caso.',
    'Usar el valor tiempo del dinero para ganar plazo, controlar los cheques emitidos y convertir proveedores en aliados de financiamiento barato.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'La tasa que te dicen no es la tasa que pagás',
      body: `Cuando un banco te ofrece un préstamo, te dice un número. Casi nunca es el número que terminás pagando. Entre lo que te anuncian y lo que sale de tu caja hay tres capas que un CEO tiene que saber leer: **la capitalización** (cómo se suman los intereses sobre los intereses), **la inflación** (que licúa o encarece el costo real) y **los gastos, comisiones e impuestos** que rodean a la operación.

El error más caro de un dueño no es tomar deuda: es **tomar deuda sin saber su verdadero costo**. Esta semana vamos a desarmar la tasa hasta el hueso, para que cuando te ofrezcan financiamiento puedas mirar a los ojos al gerente del banco y preguntarle por el único número que importa: cuánto me cuesta esto de verdad, todo incluido.`,
    },
    {
      type: 'keypoints',
      title: 'Cuatro tasas que NO son lo mismo',
      points: [
        '**TNA (Tasa Nominal Anual):** el número "de vidriera". No contempla la capitalización dentro del año. Es el menos informativo y el más publicitado.',
        '**TEA (Tasa Efectiva Anual):** lo que realmente pagás cuando los intereses capitalizan (mensual, diaria). Siempre es mayor o igual a la TNA.',
        '**Tasa real:** la TEA descontada la inflación (Fisher). Es el costo verdadero en poder de compra; con inflación alta una tasa nominal feroz puede ser una tasa real moderada... o al revés.',
        '**CFT (Costo Financiero Total):** la TEA MÁS gastos, comisiones, sellados, seguros e impuestos. Es la única tasa que mide lo que te cuesta la operación completa.',
      ],
    },
    {
      type: 'theory',
      title: 'TNA vs TEA: el efecto de la capitalización',
      body: `La **TNA** es una tasa nominal: se anuncia "anual" pero se aplica por subperíodos. Si te dicen "TNA 60% con capitalización mensual", el banco te cobra **5% por mes** (60% / 12), y cada mes ese interés se suma al capital y vuelve a generar interés. Esa reinversión del interés es la **capitalización**, y hace que la tasa efectiva sea más alta que la nominal.

- Con TNA 60% capitalizando una vez al año, pagás 60% efectivo.
- Con TNA 60% capitalizando **mensualmente**, pagás (1 + 0,05)^12 − 1 = **79,6% efectivo**.

Casi 20 puntos de diferencia por el solo hecho de cómo se capitaliza. La regla del CEO: **nunca compares dos ofertas por su TNA**. Pasalas a TEA o, mejor todavía, a CFT. La TNA sirve para la publicidad; la TEA sirve para decidir.`,
    },
    {
      type: 'formula',
      name: 'De tasa nominal a tasa efectiva anual',
      expr: 'TEA = (1 + TNA / m)^m − 1',
      note: 'm = cantidad de capitalizaciones por año (12 si es mensual, 365 si es diaria). Cuanto mayor es m, más se separa la TEA de la TNA. Por eso un descubierto que capitaliza a diario es tan brutal.',
    },
    {
      type: 'theory',
      title: 'Tasa nominal vs tasa real: Fisher y la inflación',
      body: `Una tasa del 80% anual suena terrible. Pero si la inflación es del 70%, en poder de compra estás pagando muchísimo menos: la deuda se "licúa" sola. Al revés, una tasa del 8% en dólares con inflación cero en esa moneda es **8% real puro**, y puede ser más cara en términos económicos que aquel 80% nominal en moneda blanda.

La **ecuación de Fisher** separa las dos cosas: la tasa nominal contiene un componente que solo compensa la inflación y otro que es el costo real del dinero. Para un dueño que opera en LatAm esto es vital: tomar deuda en pesos a tasa alta puede ser racional si la inflación corre más rápido, y tomar deuda barata en dólares puede ser una trampa si tus ingresos están en moneda local y esa moneda se devalúa.

La pregunta correcta nunca es "¿la tasa es alta?". Es: **¿en qué moneda están mis ingresos, en qué moneda es la deuda, y cuál es la tasa real en cada caso?**`,
    },
    {
      type: 'formula',
      name: 'Ecuación de Fisher (tasa real)',
      expr: '(1 + tasa nominal) = (1 + tasa real) × (1 + inflación)  →  tasa real = (1 + i_nom) / (1 + π) − 1',
      note: 'Con i_nom = 80% e inflación π = 70%: tasa real = 1,80 / 1,70 − 1 = 5,9%. La tasa "feroz" del 80% es, en términos reales, apenas 5,9%.',
    },
    {
      type: 'simulator',
      simulatorId: 'tasas',
      intro:
        'Jugá con la TNA, la frecuencia de capitalización y la inflación para ver cómo se mueven la TEA y la tasa real. Probá comparar un descubierto que capitaliza a diario contra un préstamo que capitaliza mensual: la diferencia te va a sorprender.',
    },
    {
      type: 'theory',
      title: 'El CFT: la verdadera tasa que afrontás (aunque recuperes impuestos después)',
      body: `La TEA es el interés puro. Pero ninguna operación financiera es solo interés. Encima hay **gastos de otorgamiento, comisiones, seguros de vida, sellados, IVA sobre los intereses y el impuesto a los débitos y créditos** (el famoso impuesto al cheque). Todo eso, sumado a la tasa, es el **Costo Financiero Total (CFT)**, y suele estar **varios puntos por encima de la TEA**.

Un detalle clave para el dueño: hay impuestos que **se recuperan en el tiempo** (el IVA de los intereses, por ejemplo, es crédito fiscal; parte del impuesto al cheque se computa contra otros tributos). Pero recuperarlos "en el tiempo" no es gratis: **mientras tanto financiaste vos ese dinero**. El valor tiempo del dinero dice que un peso que te devuelven dentro de seis meses vale menos que un peso hoy. Por eso, aunque el impuesto sea recuperable, **su costo financiero existe y hay que contarlo**.

La disciplina: antes de firmar, pedí siempre el **CFT por escrito**, y si recuperás impuestos, calculá cuándo y descontá ese flujo a hoy. Recién ahí sabés lo que de verdad te cuesta la plata.`,
    },
    {
      type: 'table',
      title: 'Andina: la misma deuda vista en sus cuatro tasas',
      headers: ['Concepto', 'Tasa', 'Lectura para el dueño'],
      rows: [
        ['TNA anunciada (préstamo banco)', '60%', 'El número de la publicidad. No decide nada.'],
        ['TEA (capitaliza mensual)', '79,6%', 'Lo que pagás de interés puro por la capitalización.'],
        ['CFT (con gastos, sellado, IVA, imp. al cheque)', '~92%', 'Lo que de verdad sale de tu caja, todo incluido.'],
        ['Tasa real (inflación 70%)', '~5,9%', 'El costo en poder de compra: bajo si tus ingresos siguen a la inflación.'],
      ],
    },
    {
      type: 'theory',
      title: 'Sistemas de amortización: francés, alemán y americano',
      body: `No solo importa la tasa: importa **cómo devolvés el capital**. Tres sistemas, tres lógicas:

- **Sistema francés (cuota constante):** pagás siempre la misma cuota. Al principio casi todo es interés y poco capital; con el tiempo se invierte. Es el más usado (créditos, leasing, la mayoría de los préstamos bancarios) porque la cuota fija es fácil de presupuestar. Pagás **más intereses totales** que en el alemán.
- **Sistema alemán (amortización constante):** devolvés siempre la misma porción de capital, así que la cuota arranca alta y va **bajando**. Pagás **menos intereses totales** porque amortizás el capital más rápido. Ideal si tu caja es fuerte al principio.
- **Sistema americano (bullet):** durante toda la vida del préstamo pagás **solo intereses**, y el capital lo devolvés **todo junto al final**. Libera caja durante el plazo, pero te deja una "bala" final que tenés que tener lista. Útil para puentear un período hasta un ingreso grande conocido.

La elección no es financiera abstracta: depende de **cómo es tu flujo de caja**. Si esperás caja floja ahora y fuerte después, el bullet o el francés ayudan; si tenés caja fuerte ya y querés pagar menos intereses, el alemán es superior.`,
    },
    {
      type: 'simulator',
      simulatorId: 'amortizacion',
      intro:
        'Simulá el mismo préstamo bajo los tres sistemas (francés, alemán, americano). Mirá cómo cambia la cuota mes a mes y cuántos intereses totales pagás en cada uno. La pregunta no es "¿cuál es mejor?" sino "¿cuál encaja con mi caja?".',
    },
    {
      type: 'theory',
      title: 'Tasa fija vs variable, y el arte de ganar tiempo',
      body: `**Tasa fija** te da certeza: sabés exactamente cuánto vas a pagar, pase lo que pase. Pagás una prima por esa tranquilidad y perdés si las tasas bajan. **Tasa variable** sigue al mercado: te beneficiás si las tasas caen, pero quedás expuesto si suben. Regla práctica: tomá **fija cuando tu margen es ajustado y no podés tolerar sorpresas**, y considerá variable cuando tenés colchón y esperás que las tasas bajen.

Y acá entra una idea poderosa que el dueño suele subestimar: **el valor tiempo del dinero**. Lo mismo vale distinto según el período en que lo tengas. A veces conviene **pagar un poco de costo financiero para "ganar tiempo"** —estirar un pago, financiar una compra— porque ese tiempo te permite **seguir operando, sostener la rueda del negocio y no descapitalizarte**. La clave es que el costo de ganar ese tiempo sea **menor que lo que el negocio gana operando** con esa caja. Ganar tiempo es inteligente cuando lo financiero sirve a lo económico; es ruinoso cuando es solo tapar un agujero con otro más caro.`,
    },
    {
      type: 'warning',
      body: 'Cuidado con los productos fáciles y caros: el descubierto bancario y el descuento de cheques se contratan en cinco minutos y se pagan durante años. El descubierto de Andina rinde una TNA de ~85% que capitaliza a diario: en TEA real supera el 130%. Son la heroína financiera de la PyME: alivio inmediato, dependencia crónica. Úsalos solo como puente cortísimo y con fecha de salida, nunca como financiamiento estructural.',
    },
    {
      type: 'theory',
      title: 'Controlar los cheques que emitís y vigilar el endeudamiento',
      body: `El **cheque de pago diferido** es una herramienta noble si la controlás, y una bomba si no. Cada cheque que firmás es una **promesa de caja en una fecha futura**. El problema del dueño desprolijo es que firma cheques mirando la necesidad de hoy, sin un **calendario consolidado** de lo que vence. Cuando esos vencimientos se amontonan en la misma semana, aparece el descubierto caro para "salvar el cheque", y ahí empieza la espiral.

La disciplina es simple y salvadora: llevá un **flujo de cheques emitidos por fecha**, cruzalo con tu proyección de cobranzas, y nunca firmes un cheque sin saber con qué caja lo vas a cubrir. Andina tiene **430 en cheques diferidos a pagar**: si no los calendariza contra sus cobranzas, cada cheque es una mini-crisis esperando su turno.

¿Cuándo el endeudamiento empieza a ser riesgo? Tres señales: cuando **los intereses se comen una porción creciente del EBIT** (en Andina, 560 de intereses sobre 830 de EBIT: el 67% de lo operativo se va en deuda), cuando **tomás deuda nueva para pagar deuda vieja**, y cuando **el costo de la deuda supera el retorno que el negocio genera con ella** (ROIC menor que el costo de la deuda). Cualquiera de las tres es luz amarilla; las tres juntas son luz roja.`,
    },
    {
      type: 'insight',
      body: 'El mejor financiamiento del mundo es el que no tiene tasa: tus proveedores. Convertir proveedores en aliados —negociar 60 o 90 días de plazo en vez de pagar al contado— es tomar un crédito a costo cero (o casi). Andina financia 1280 con proveedores: si estirara ese plazo 30 días más, liberaría caja que hoy cubre con descubierto al 85%. Cada peso que te financia un proveedor es un peso que no le pedís al banco. La negociación con proveedores no es "comprar barato": es ingeniería financiera disfrazada de gestión de compras.',
    },
    {
      type: 'claude',
      goal: 'Que Claude te arme el costo real de cada fuente de financiamiento que estás usando y te ordene un plan para abaratarlo.',
      prompt:
        'Sos un asesor financiero experto en PyMEs de LatAm. Te voy a pasar todas mis fuentes de financiamiento actuales (préstamos, descubierto, cheques diferidos, leasing, proveedores) con sus tasas nominales, gastos, comisiones e impuestos asociados, mi moneda de ingresos y la inflación estimada. Quiero que: (1) calcules para cada fuente la TEA y el CFT, y la ordenes de más cara a más barata; (2) estimes la tasa real de cada una según mi moneda de ingresos; (3) me digas cuáles son "productos fáciles y caros" que debería desarmar primero; (4) me propongas un plan de sustitución, incluyendo cuánto podría ahorrar negociando más plazo con proveedores; (5) me marques si mi nivel de endeudamiento ya es zona de riesgo (intereses sobre EBIT, deuda para pagar deuda, costo de deuda vs retorno). Si algún impuesto es recuperable en el tiempo, descontá ese recupero a hoy. Empezá pidiéndome el listado de fuentes.',
      note: 'Hacelo con tus deudas reales. La mayoría de los dueños descubre que está pagando dos o tres veces lo que creía, y que tiene financiamiento barato (proveedores) sin aprovechar.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'Un banco ofrece TNA 60% con capitalización mensual. ¿Cuál es la TEA aproximada?',
      options: [
        '60%: la TNA y la TEA coinciden.',
        '79,6%: la capitalización mensual eleva la tasa efectiva por encima de la nominal.',
        '50%: la capitalización reduce la tasa.',
        '5%: es la tasa mensual y esa es la efectiva anual.',
      ],
      correctIndex: 1,
      explanation:
        'TEA = (1 + 0,60/12)^12 − 1 = (1,05)^12 − 1 ≈ 79,6%. La capitalización mensual hace que los intereses generen intereses, separando la TEA de la TNA. Por eso nunca se comparan ofertas por la TNA.',
    },
    {
      id: 'q2',
      question: 'Con una tasa nominal del 80% anual y una inflación del 70%, ¿cuál es la tasa real aproximada (Fisher)?',
      options: [
        '10%: es la simple resta de 80% menos 70%.',
        '5,9%: (1,80 / 1,70) − 1, el costo verdadero en poder de compra es bajo.',
        '150%: se suman ambas tasas.',
        '80%: la inflación no afecta la tasa real.',
      ],
      correctIndex: 1,
      explanation:
        'Fisher no es una resta: tasa real = (1 + nominal) / (1 + inflación) − 1 = 1,80/1,70 − 1 ≈ 5,9%. La tasa "feroz" del 80% nominal, descontada la inflación, es apenas 5,9% real.',
    },
    {
      id: 'q3',
      question: '¿En qué sistema de amortización pagás MENOS intereses totales y por qué?',
      options: [
        'Francés, porque la cuota es constante.',
        'Americano (bullet), porque devolvés el capital al final.',
        'Alemán, porque amortizás capital constante y reducís el saldo más rápido, generando menos intereses.',
        'Todos cobran los mismos intereses totales.',
      ],
      correctIndex: 2,
      explanation:
        'En el sistema alemán la amortización de capital es constante, por lo que el saldo adeudado baja más rápido que en el francés y mucho más que en el bullet. Menos saldo durante menos tiempo significa menos intereses totales, a cambio de cuotas iniciales más altas.',
    },
  ],
  simulators: ['tasas', 'amortizacion'],
}
