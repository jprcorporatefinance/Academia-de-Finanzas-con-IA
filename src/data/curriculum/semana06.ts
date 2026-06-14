import type { Lesson } from '../../types'

export const semana06: Lesson = {
  id: 'sem-06',
  week: 6,
  title: 'Free Cash Flow: FCFF, FCFE y FCFD',
  subtitle: 'Por qué el Free Cash Flow to the Firm es la medida clave, y qué te dice realmente el CFROI',
  pillar: 'Flujos de Caja',
  durationMin: 60,
  objectives: [
    'Construir el Free Cash Flow to the Firm (FCFF) desde el NOPAT y entender por qué es la medida de caja más importante.',
    'Distinguir el flujo de la firma (FCFF), el del accionista (FCFE) y el del acreedor (FCFD), y cómo se reparten.',
    'Comprender qué determina e implica el CFROI como retorno de caja sobre la inversión.',
    'Ver en Andina cómo un FCFF de 305 convive con un resultado neto de 175, y dónde se drena el flujo.',
    'Pensar el negocio en términos de caja libre, no de utilidad contable.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'La caja libre es lo que de verdad sobra',
      body: `Hasta acá vimos que la ganancia no es la caja. Esta semana damos el paso decisivo: aprender a medir la **caja libre**, es decir, **cuánta plata genera el negocio después de mantenerse en pie**. No la ganancia contable; no el EBITDA; la plata que de verdad queda disponible para repartir entre quienes financiaron la empresa.

El **Free Cash Flow** es esa caja. Es el flujo que sobra una vez que el negocio pagó sus costos operativos, sus impuestos sobre la operación, reinvirtió en activos fijos (CAPEX) y financió el crecimiento de su capital de trabajo. Lo que queda después de todo eso es lo único que se puede usar para pagarle intereses al banco, devolverle capital, o repartir dividendos a los dueños.

Si una empresa no genera caja libre de forma sostenida, no importa cuánta "ganancia" muestre: no está creando valor, está consumiendo el de alguien más.`,
    },
    {
      type: 'keypoints',
      title: 'Las tres caras del flujo de caja libre',
      points: [
        '**FCFF (Free Cash Flow to the Firm):** la caja que genera el negocio para TODOS los que lo financian (accionistas + acreedores), antes de decidir cómo se reparte. Es la medida madre.',
        '**FCFE (Free Cash Flow to Equity):** la caja que queda para los ACCIONISTAS, después de pagarles a los acreedores (intereses y amortización de deuda).',
        '**FCFD (Free Cash Flow to Debt):** la caja que va a los ACREEDORES: intereses pagados más amortización de deuda, neto de nueva deuda tomada.',
        'Identidad de reparto: **FCFF = FCFE + FCFD**. El flujo de la firma se reparte entre dueños y acreedores.',
      ],
    },
    {
      type: 'theory',
      title: 'Cómo se arma el FCFF, paso a paso',
      body: `El FCFF se construye desde el **NOPAT** (Net Operating Profit After Taxes), que es el EBIT después de impuestos pero **antes** de intereses. ¿Por qué antes de intereses? Porque el FCFF mide la caja del **negocio**, no la del dueño: los intereses son una decisión de financiamiento, no de operación.

La receta es:

- Partís del **NOPAT** = EBIT × (1 − tasa de impuesto). Esta es la ganancia operativa "limpia" de financiamiento.
- **Sumás las amortizaciones**, porque restaron en el resultado pero no salieron de la caja (no son un egreso real de plata).
- **Restás el CAPEX**, la inversión en activos fijos necesaria para sostener y hacer crecer el negocio. Esto sí es plata que sale.
- **Restás el aumento del capital de trabajo** (ΔCapital de trabajo). Más cuentas por cobrar y más inventario inmovilizan caja; más proveedores la liberan.

Lo que queda es el FCFF: la caja real que produjo la operación, disponible para repartir.`,
    },
    {
      type: 'formula',
      name: 'Free Cash Flow to the Firm (FCFF)',
      expr: 'FCFF = NOPAT + Amortizaciones − CAPEX − ΔCapital de trabajo',
      note: 'NOPAT = EBIT × (1 − t). Se parte del resultado operativo, no del neto, porque el FCFF es la caja del negocio, antes de cómo se financia.',
    },
    {
      type: 'theory',
      title: 'Del FCFF al FCFE y al FCFD: quién se lleva qué',
      body: `Una vez que el negocio generó el FCFF, hay que repartirlo. Acá entran los acreedores y los accionistas.

El **FCFD (flujo a la deuda)** es lo que se llevan los acreedores: los intereses pagados más la amortización de capital de la deuda, restando la nueva deuda tomada en el período. Si la empresa tomó más deuda de la que pagó, el FCFD puede ser negativo (los acreedores netos pusieron plata).

El **FCFE (flujo al accionista)** es lo que queda para los dueños después de atender a los acreedores. Se puede calcular como FCFF − FCFD, o directamente desde el resultado neto sumando amortizaciones, restando CAPEX y ΔCapital de trabajo, y sumando la nueva deuda neta.

La idea clave para un CEO: el FCFF es la torta que produce el negocio; el FCFD y el FCFE son cómo se corta esa torta entre el banco y vos. Si la deuda es cara, el banco se lleva una porción enorme y al dueño le queda poco, aunque el negocio sea bueno.`,
    },
    {
      type: 'formula',
      name: 'Reparto del flujo entre acreedores y accionistas',
      expr: 'FCFF = FCFE + FCFD   →   FCFE = FCFF − FCFD',
      note: 'FCFD = Intereses pagados + Amortización de deuda − Nueva deuda. FCFE = lo que efectivamente queda para los dueños.',
    },
    {
      type: 'case',
      title: 'Andina: FCFF de 305 con resultado neto de 175',
      body: `Acá se ve por qué la caja libre cuenta otra historia que la utilidad. Andina cerró 2024 con un **resultado neto de 175**, pero su flujo operativo (antes de intereses e impuestos), que se aproxima al FCFF del negocio, fue de **305**. ¿Cómo puede ser que la caja del negocio supere la ganancia? Por las amortizaciones: el flujo le vuelve a sumar los **290** que el resultado había restado sin que saliera plata.

Pero ahí está la trampa, y es brutal. Mirá qué le pasó al flujo operativo por el capital de trabajo:

- El **aumento de cuentas por cobrar drenó −330**: Andina vendió más, pero no cobró. Esa venta es ganancia en el papel y agujero en la caja.
- El **aumento de inventarios drenó −550**: medio millón de dólares quedó inmovilizado en mercadería en el depósito.

Entre cuentas por cobrar e inventario, el capital de trabajo se llevó **880 de caja**. Si Andina hubiera ordenado su capital de trabajo, su FCFF habría sido muchísimo mayor. El negocio genera caja; la mala gestión del capital de trabajo la atrapa antes de que llegue al bolsillo.`,
    },
    {
      type: 'simulator',
      simulatorId: 'fcf',
      intro:
        'Construí el FCFF de Andina paso a paso: partí del NOPAT, sumá amortizaciones, restá CAPEX y restá el ΔCapital de trabajo. Mirá cómo el −330 de cuentas por cobrar y el −550 de inventario se comen la caja.',
    },
    {
      type: 'insight',
      body: 'El EBITDA es la promesa; el FCFF es la realidad. El EBITDA ignora el CAPEX que tenés que invertir para no quedarte atrás y el capital de trabajo que el crecimiento te exige. Dos empresas con el mismo EBITDA pueden tener FCFF radicalmente distintos: la que rota bien su capital de trabajo y necesita poco CAPEX vale mucho más que la que inmoviliza caja en stock y cuentas por cobrar.',
    },
    {
      type: 'theory',
      title: 'CFROI: el retorno de caja sobre la inversión',
      body: `El **CFROI (Cash Flow Return on Investment)** lleva la lógica de la caja libre un paso más allá: en vez de preguntar "¿cuánta caja generé?", pregunta **"¿qué tasa de retorno de caja obtuve sobre todo lo que invertí en el negocio?"**.

Conceptualmente, el CFROI compara el flujo de caja operativo que produce la empresa contra la base de activos brutos que se invirtieron para producirlo. Es como la TIR del negocio mirado en términos de caja: una tasa que después se compara contra el costo del capital (el WACC, que vemos en la próxima semana).

Qué **implica** y qué **determina**: el CFROI implica que un negocio crea valor solo si su retorno de caja **supera** el costo de financiar esa inversión. Lo determinan dos cosas: cuánta caja genera la operación por cada peso invertido (eficiencia operativa) y cuánto capital quedó inmovilizado para generarla (eficiencia de la inversión). Una empresa con buen margen pero con capital de trabajo desbordado, como Andina, tiene un CFROI mediocre: genera caja, pero necesitó atrapar demasiada para hacerlo.`,
    },
    {
      type: 'warning',
      body: 'No confundas crecer con crear valor. Cuando una empresa crece y su capital de trabajo crece más rápido que su flujo operativo, el crecimiento se vuelve un agujero negro de caja. En Andina, las ventas subieron de 7.400 a 8.200, pero ese crecimiento exigió 880 de caja extra en cuentas por cobrar e inventario. Crecer mal es destruir caja con cara de éxito.',
    },
    {
      type: 'table',
      title: 'Por qué el FCFF supera al resultado neto en Andina (2024)',
      headers: ['Concepto', 'Monto', 'Efecto en la caja'],
      rows: [
        ['Resultado neto', '175', 'Punto de partida contable'],
        ['(+) Amortizaciones', '+290', 'No salieron de la caja: se vuelven a sumar'],
        ['(+) Intereses', '+560', 'Se aíslan: el FCFF es antes de financiamiento'],
        ['(−) Aumento de cuentas por cobrar', '−330', 'Vendí pero no cobré: drena caja'],
        ['(−) Aumento de inventarios', '−550', 'Caja atrapada en el depósito'],
        ['(+) Aumento de proveedores', '+160', 'Financiamiento no oneroso que ayuda a la caja'],
        ['Flujo operativo (≈ FCFF del negocio)', '305', 'La caja libre real, antes de repartir'],
      ],
    },
    {
      type: 'claude',
      goal: 'Que Claude te calcule el FCFF de tu empresa y te diga dónde se está drenando la caja libre.',
      prompt:
        'Sos un analista de valuación experto en flujos de caja descontados. Te voy a dar mi EBIT, mi tasa de impuesto, mis amortizaciones, mi CAPEX y la variación de mis cuentas por cobrar, inventario y proveedores. Quiero que: (1) calcules mi NOPAT y mi FCFF paso a paso, mostrando cada línea; (2) me digas cuánta caja se me está yendo o quedando por el capital de trabajo, con el número exacto; (3) me expliques en lenguaje de dueño si mi negocio genera caja libre o la está atrapando, y qué movimiento de capital de trabajo liberaría más caja. Empezá pidiéndome los datos.',
      note: 'Probalo con Andina: EBIT 830, impuesto 35%, amortizaciones 290, CAPEX 440, ΔCxC −330, Δinventario −550, Δproveedores +160. Vas a ver el FCFF salir y el agujero del capital de trabajo aparecer solo.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Por qué el FCFF se construye desde el NOPAT (EBIT después de impuestos) y no desde el resultado neto?',
      options: [
        'Porque el resultado neto no existe en las PyMEs.',
        'Porque el FCFF mide la caja del negocio antes de decidir cómo se financia; los intereses son una decisión de financiamiento, no de operación.',
        'Porque el NOPAT siempre es mayor que el resultado neto.',
        'Porque los impuestos no afectan la caja.',
      ],
      correctIndex: 1,
      explanation:
        'El FCFF es la caja que genera la operación para todos los que financian la empresa, antes de pagar a los acreedores. Por eso parte del NOPAT (operativo, sin intereses), no del resultado neto que ya descontó el financiamiento.',
    },
    {
      id: 'q2',
      question: 'En Andina, el FCFF (≈305) supera al resultado neto (175). ¿Cuál es la razón principal?',
      options: [
        'Porque las ventas se duplicaron.',
        'Porque las amortizaciones (290) restaron en el resultado pero no salieron de la caja, y el FCFF las vuelve a sumar.',
        'Porque Andina no tiene deuda.',
        'Porque el CAPEX fue cero.',
      ],
      correctIndex: 1,
      explanation:
        'Las amortizaciones son un cargo contable que no consume caja. El FCFF parte del NOPAT y vuelve a sumar las amortizaciones, por eso puede superar al resultado neto, incluso cuando el capital de trabajo drena caja.',
    },
    {
      id: 'q3',
      question: '¿Qué implica el CFROI sobre la creación de valor?',
      options: [
        'Que la empresa crea valor solo si su retorno de caja sobre la inversión supera el costo del capital.',
        'Que basta con tener EBITDA positivo para crear valor.',
        'Que el valor depende únicamente del crecimiento de las ventas.',
        'Que el capital de trabajo no influye en el retorno.',
      ],
      correctIndex: 0,
      explanation:
        'El CFROI compara el retorno de caja del negocio contra el capital invertido. Solo hay creación de valor cuando ese retorno supera el costo de financiar la inversión (el WACC). Lo determinan la eficiencia operativa y cuánto capital quedó inmovilizado.',
    },
  ],
  simulators: ['fcf'],
}
