import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 11 — Tasas, Tiempo y Financiamiento
// Capitalización (TNA→TEA), tasa real de Fisher, Costo Financiero Total (CFT),
// sistemas de amortización (francés/alemán/americano) y valor tiempo del dinero.
// Caso Andina: deuda cara (descubierto TNA ~85%, préstamos), intereses 560.
// ============================================================================

export const week11: ItemSpec[] = [
  {
    id: 's11-i1',
    week: 11,
    order: 1,
    title: 'De la TNA a la TEA: el efecto de la capitalización',
    subtitle: 'Por qué la tasa que cobra el banco es mayor que la que dice el cartel',
    framework: 'Matemática financiera · interés compuesto',
    theory: [
      {
        heading: 'Nominal no es lo mismo que efectivo',
        paragraphs: [
          'La **TNA (Tasa Nominal Anual)** es la que figura en el cartel del banco, pero es una tasa **incompleta**: no dice cada cuánto se **capitalizan** los intereses. La **TEA (Tasa Efectiva Anual)** sí: incorpora que los intereses generados en cada subperíodo se suman al capital y **a su vez generan intereses**. La fórmula es **TEA = (1 + TNA/m)^m − 1**, donde m es la cantidad de capitalizaciones por año.',
          'El mecanismo es el **interés compuesto**: si una TNA del 60% se capitaliza mensualmente (m = 12), cada mes se aplica 60%/12 = 5%, pero sobre un capital que ya creció. Al cabo del año la tasa efectiva no es 60% sino (1,05)^12 − 1 ≈ **79,6%**. La diferencia —casi 20 puntos— es pura capitalización.',
          'Cuanto **más frecuente** la capitalización (mayor m), **mayor** la TEA para una misma TNA. De capitalización anual (m=1, TEA=TNA) se pasa a mensual, diaria, y en el límite a la capitalización continua. Por eso comparar productos por su TNA es engañoso: hay que llevarlos todos a **TEA**, la única tasa comparable.',
        ],
      },
      {
        heading: 'Andina y la deuda cara',
        paragraphs: [
          'El **descubierto bancario** de Andina se publicita con una TNA alta, pero como capitaliza muy seguido, su **TEA real es todavía mayor**. Es el producto más caro de su pasivo y la razón de fondo por la que los intereses (560) se comen el resultado operativo (EBIT 830). El dueño mira la TNA del cartel y subestima lo que de verdad paga.',
          '**Interrelación clave:** la TEA es el insumo para comparar fuentes de financiamiento, para calcular el **Kd efectivo** (Semana 9) y para todo el **valor tiempo del dinero** (ítem 5). Confundir TNA con TEA distorsiona el costo de la deuda y, con él, el WACC y la valuación entera.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Comparar un préstamo de TNA 50% con capitalización mensual contra otro de TNA 52% con capitalización anual mirando solo el número nominal: el segundo puede ser más barato. Olvidar que a igual TNA, más capitalizaciones = más caro. Y citar la TNA en una negociación cuando lo que importa es la TEA (y, peor aún, el CFT del ítem 3).',
        ],
      },
    ],
    model: {
      excelTitle: 'TNA → TEA (efecto de la capitalización)',
      inputs: [
        { key: 'tna', label: 'Tasa Nominal Anual (TNA)', value: 0.6, min: 0, max: 2, step: 0.01, fmt: 'pct' },
        { key: 'm', label: 'Capitalizaciones por año (m)', value: 12, min: 1, max: 365, step: 1, fmt: 'num' },
      ],
      calcs: [
        { key: 'tasaPeriodo', label: 'Tasa por período (TNA/m)', fmt: 'pct2', calc: (v) => v.tna / v.m, xl: '[tna]/[m]' },
        { key: 'tea', label: 'Tasa Efectiva Anual (TEA)', fmt: 'pct', highlight: true, calc: (v) => Math.pow(1 + v.tna / v.m, v.m) - 1, xl: '(1+[tna]/[m])^[m]-1' },
        { key: 'brecha', label: 'Brecha TEA − TNA (capitalización)', fmt: 'pct', calc: (v) => Math.pow(1 + v.tna / v.m, v.m) - 1 - v.tna, xl: '[tea]-[tna]' },
      ],
      conclusions: [
        {
          test: (v) => v.m > 1,
          good: 'La capitalización subperiódica hace que la TEA SUPERE a la TNA: la tasa efectiva que pagás es mayor que la del cartel. Cuanto más seguido capitaliza, más grande la brecha.',
          bad: 'Con m = 1 (capitalización anual) la TEA coincide con la TNA: no hay efecto de capitalización. Es el único caso en que el cartel dice la verdad completa.',
          xl: 'IF([m]>1,"La capitalizacion hace que la TEA ("&TEXT([tea],"0.0%")&") supere a la TNA ("&TEXT([tna],"0.0%")&"): brecha de "&TEXT([brecha],"0.0%")&". Mas seguido capitaliza, mayor la brecha.","Con m=1 la TEA coincide con la TNA: sin efecto de capitalizacion.")',
        },
      ],
      chart: { sweepKey: 'm', outKey: 'tea', xLabel: 'Capitalizaciones/año', yLabel: 'TEA', yFmt: 'pct' },
    },
    promptConcepts: ['TEA = (1 + TNA/m)^m − 1', 'TNA nominal vs TEA efectiva', 'Interés compuesto y capitalización subperiódica', 'A mayor m, mayor TEA (a igual TNA)', 'Por qué la TEA es la única tasa comparable entre productos'],
  },

  {
    id: 's11-i2',
    week: 11,
    order: 2,
    title: 'La tasa real de Fisher: ganarle a la inflación',
    subtitle: 'Separar el rendimiento verdadero de la ilusión nominal',
    framework: 'Ecuación de Fisher · tasa real',
    theory: [
      {
        heading: 'La ilusión del número nominal',
        paragraphs: [
          'Una tasa **nominal** del 80% en un país con 70% de inflación **no** te hace 80% más rico: la mayor parte solo compensa la pérdida de poder adquisitivo. La **ecuación de Fisher** separa esas dos fuerzas: **tasa real = (1 + nominal)/(1 + inflación) − 1**. Es lo que realmente rinde una inversión o lo que realmente cuesta una deuda, una vez descontada la inflación.',
          'La forma exacta es multiplicativa, no la resta aproximada (nominal − inflación). Con una nominal de 80% y una inflación de 70%, la real **no** es 10% sino (1,80/1,70) − 1 ≈ **5,9%**. La aproximación por resta sobrestima el rendimiento real; en alta inflación, donde los números son grandes, el error es enorme.',
          'La tasa real puede ser **negativa**: si la inflación supera a la nominal, el ahorrista **pierde** poder de compra aunque su saldo en pesos crezca. Es la trampa de las economías inflacionarias: ver crecer el número en la cuenta mientras el capital real se achica. Por eso en emergentes se razona en **moneda homogénea o en dólares**.',
        ],
      },
      {
        heading: 'Por qué importa para valuar y financiar',
        paragraphs: [
          'En valuación, la regla de consistencia es **inviolable**: flujos nominales se descuentan con tasa nominal; flujos reales, con tasa real. Mezclar un FCFF nominal con una Ku real (o viceversa) rompe la valuación, y en alta inflación el error es de decenas de por ciento. Fisher es el puente que permite pasar correctamente de una a otra.',
          '**Interrelación clave:** la tasa real conecta con el **CFROI** (Semana 8, retorno real ajustado por inflación), con la **erosión de los quebrantos** del escudo riesgoso (Semana 10) y con la decisión de **endeudarse en pesos vs dólares**. Una deuda con tasa real negativa puede convenir; una con tasa real muy positiva es un ancla.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Usar la resta (nominal − inflación) en vez de la fórmula exacta, sobrestimando el rendimiento real. Festejar una tasa nominal alta sin mirar la inflación. Y descontar flujos reales con tasa nominal: el error más caro y más común en valuaciones de empresas en economías inflacionarias.',
        ],
      },
    ],
    model: {
      excelTitle: 'Tasa real de Fisher',
      inputs: [
        { key: 'nominal', label: 'Tasa nominal', value: 0.8, min: -0.2, max: 3, step: 0.01, fmt: 'pct' },
        { key: 'inflacion', label: 'Inflación esperada', value: 0.7, min: 0, max: 3, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'aproxResta', label: 'Aproximación por resta (nominal − inflación)', fmt: 'pct', calc: (v) => v.nominal - v.inflacion, xl: '[nominal]-[inflacion]' },
        { key: 'tasaReal', label: 'Tasa real de Fisher', fmt: 'pct', highlight: true, calc: (v) => (1 + v.nominal) / (1 + v.inflacion) - 1, xl: '(1+[nominal])/(1+[inflacion])-1' },
      ],
      conclusions: [
        {
          test: (v) => (1 + v.nominal) / (1 + v.inflacion) - 1 >= 0,
          good: 'La tasa real es positiva: el rendimiento le gana a la inflación y hay ganancia de poder adquisitivo. Ojo: es bastante menor que la aproximación por resta; en alta inflación la diferencia es grande.',
          bad: 'La tasa real es NEGATIVA: la inflación supera al rendimiento nominal y el capital pierde poder de compra aunque el saldo en pesos crezca. Es la trampa inflacionaria.',
          xl: 'IF([tasaReal]>=0,"Tasa real positiva ("&TEXT([tasaReal],"0.0%")&"): le gana a la inflacion. Es menor que la resta ("&TEXT([aproxResta],"0.0%")&"); en alta inflacion la diferencia es grande.","Tasa real NEGATIVA ("&TEXT([tasaReal],"0.0%")&"): la inflacion supera al rendimiento. El capital pierde poder de compra.")',
        },
      ],
      chart: { sweepKey: 'inflacion', outKey: 'tasaReal', xLabel: 'Inflación', yLabel: 'Tasa real', yFmt: 'pct' },
    },
    promptConcepts: ['Fisher: tasa real = (1 + nominal)/(1 + inflación) − 1', 'Por qué la resta (nominal − inflación) sobrestima', 'Tasa real negativa: la trampa inflacionaria', 'Consistencia: flujos reales ↔ tasa real', 'Razonar en moneda homogénea / dólares en emergentes'],
  },

  {
    id: 's11-i3',
    week: 11,
    order: 3,
    title: 'El Costo Financiero Total (CFT)',
    subtitle: 'Lo que de verdad cuesta un préstamo: tasa más comisiones e impuestos',
    framework: 'CFT · transparencia financiera',
    theory: [
      {
        heading: 'La tasa no es todo el costo',
        paragraphs: [
          'El **Costo Financiero Total (CFT)** es la tasa que resume **todo** lo que un préstamo cuesta de verdad: no solo los intereses (la TEA), sino también las **comisiones**, los **gastos administrativos**, los **seguros** obligatorios y los **impuestos** (como el impuesto al sello o a los débitos y créditos). Por eso el CFT es **siempre mayor que la TEA**, y a veces por mucho.',
          'La mecánica es simple pero reveladora: esos cargos adicionales **reducen el neto** que el tomador efectivamente recibe (o aumentan lo que debe devolver), de modo que la **tasa efectiva** sobre el dinero realmente disponible sube. Un préstamo con TEA del 60% y 8% de comisiones y gastos puede tener un CFT cercano al **73%**. La diferencia es lo que el cartel no muestra.',
          'Por eso la normativa de defensa del consumidor financiero exige informar el **CFT**, no la TNA, como número comparable. Es el único costo honesto: dos préstamos con igual TEA pueden tener CFT muy distintos según su carga de comisiones e impuestos. Comparar por CFT es comparar manzanas con manzanas.',
        ],
      },
      {
        heading: 'Andina y el costo oculto de financiarse',
        paragraphs: [
          'Buena parte del pasivo de **Andina** —descubierto, cheques descontados, préstamos de corto plazo— viene cargado de comisiones y sellados que el dueño no contabiliza como "tasa". El **CFT real** de su financiamiento está varios puntos por encima de la TEA que cree pagar. Esa brecha es plata que se va sin aparecer en el cartel.',
          '**Interrelación clave:** el CFT es el verdadero **Kd efectivo** que debería entrar al WACC (Semana 9) y la base honesta para comparar fuentes de financiamiento. Subestimar el costo financiero usando la TEA en vez del CFT lleva a tomar deuda que parece barata y no lo es, deteriorando la cobertura de intereses (Semana 10).',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Comparar préstamos por la TEA ignorando comisiones e impuestos. Olvidar los seguros y sellados obligatorios al estimar el costo. Y, en la planilla de la empresa, registrar el Kd como la tasa pactada cuando el costo real —el CFT— es bastante mayor: eso subestima el WACC y sobrevalúa la empresa.',
        ],
      },
    ],
    model: {
      excelTitle: 'Costo Financiero Total (CFT)',
      inputs: [
        { key: 'monto', label: 'Monto del préstamo', value: 1000, min: 100, max: 10000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tea', label: 'TEA (solo intereses)', value: 0.6, min: 0, max: 2, step: 0.01, fmt: 'pct' },
        { key: 'comisiones', label: 'Comisiones y gastos (% del monto)', value: 0.05, min: 0, max: 0.2, step: 0.005, fmt: 'pct' },
        { key: 'impuestos', label: 'Impuestos y sellados (% del monto)', value: 0.03, min: 0, max: 0.15, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'cargosFijos', label: 'Cargos no financieros (% del monto)', fmt: 'pct', calc: (v) => v.comisiones + v.impuestos, xl: '[comisiones]+[impuestos]' },
        { key: 'netoRecibido', label: 'Neto efectivamente recibido', fmt: 'money', calc: (v) => v.monto * (1 - v.comisiones - v.impuestos), xl: '[monto]*(1-[comisiones]-[impuestos])' },
        { key: 'cft', label: 'Costo Financiero Total (CFT)', fmt: 'pct', highlight: true, calc: (v) => (1 + v.tea) / (1 - v.comisiones - v.impuestos) - 1, xl: '(1+[tea])/(1-[comisiones]-[impuestos])-1' },
        { key: 'brecha', label: 'Brecha CFT − TEA', fmt: 'pct', calc: (v) => (1 + v.tea) / (1 - v.comisiones - v.impuestos) - 1 - v.tea, xl: '[cft]-[tea]' },
      ],
      conclusions: [
        {
          test: (v) => v.comisiones + v.impuestos > 0,
          good: 'Las comisiones e impuestos hacen que el CFT SUPERE a la TEA: el costo real del préstamo es mayor que la tasa de interés sola. Esa brecha es lo que el cartel no muestra; comparar por CFT es lo correcto.',
          bad: 'Sin comisiones ni impuestos el CFT coincide con la TEA: el préstamo no tiene cargos ocultos. Es un caso ideal poco frecuente en la práctica.',
          xl: 'IF([cargosFijos]>0,"Las comisiones e impuestos hacen que el CFT ("&TEXT([cft],"0.0%")&") supere a la TEA ("&TEXT([tea],"0.0%")&"): brecha de "&TEXT([brecha],"0.0%")&". Eso es lo que el cartel no muestra.","Sin cargos el CFT coincide con la TEA: caso ideal poco frecuente.")',
        },
      ],
      chart: { sweepKey: 'comisiones', outKey: 'cft', xLabel: 'Comisiones y gastos', yLabel: 'CFT', yFmt: 'pct' },
    },
    promptConcepts: ['CFT = costo real: TEA + comisiones + impuestos + seguros', 'Por qué el CFT siempre supera a la TEA', 'Los cargos reducen el neto recibido y suben la tasa efectiva', 'El CFT como Kd efectivo para el WACC', 'Comparar fuentes por CFT, no por TEA ni TNA'],
  },

  {
    id: 's11-i4',
    week: 11,
    order: 4,
    title: 'Sistemas de amortización: francés vs alemán vs americano',
    subtitle: 'Misma deuda y misma tasa, perfiles de cuota e intereses muy distintos',
    framework: 'Matemática financiera · PMT / IPMT',
    theory: [
      {
        heading: 'Tres formas de devolver el mismo préstamo',
        paragraphs: [
          'Un mismo monto a una misma tasa se puede devolver de maneras muy distintas según el **sistema de amortización**. En el **sistema francés**, la **cuota es constante**: al principio paga mucho interés y poco capital, y esa proporción se invierte con el tiempo. Es el más común en préstamos personales e hipotecarios porque la cuota fija es previsible.',
          'En el **sistema alemán**, la **amortización de capital es constante** (monto/n cada período) y los intereses se calculan sobre el saldo, que baja parejo. La cuota arranca **más alta** que en el francés y va **decreciendo**. Pagás más al principio, pero el capital se reduce más rápido, así que los **intereses totales son menores** que en el francés.',
          'En el **sistema americano (bullet)**, durante toda la vida del préstamo se pagan **solo intereses**, y el **capital se devuelve íntegro al final**. La cuota periódica es la más baja de las tres, pero como el capital nunca baja, los **intereses totales son los más altos**. Concentra el riesgo en el vencimiento: hay que tener el capital entero para el final.',
        ],
      },
      {
        heading: 'El trade-off: cuota hoy vs intereses totales',
        paragraphs: [
          'Hay un trade-off claro: el americano alivia la cuota corriente pero es el más caro en intereses totales; el alemán es el más barato en intereses pero exige el mayor esfuerzo inicial; el francés está en el medio, con la ventaja de la previsibilidad. **No hay un sistema "mejor" en abstracto**: depende del flujo de caja de quien toma la deuda.',
          'Para una empresa con caja tensa **hoy** y mejores expectativas a futuro, el americano o el francés alivian el presente. Para una con caja holgada que quiere **minimizar el costo total**, el alemán es superior. El simulador permite ver, a igual monto y tasa, cómo cambian la **primera cuota** y los **intereses totales** entre los tres.',
          '**Interrelación clave:** la elección del sistema afecta directamente la **cobertura de intereses** y la **cadena de pagos** (Semana 10), y se conecta con el **valor tiempo del dinero** (ítem 5): pagar más tarde tiene un valor presente menor, pero acumula más intereses nominales. En emergentes con alta inflación, "ganar tiempo" puede convenir si la tasa real es baja.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Elegir el francés "porque la cuota es fija" sin notar que paga más intereses que el alemán. Tomar un americano por la cuota baja y llegar al vencimiento sin el capital para devolver. Y comparar sistemas mirando solo la primera cuota, sin sumar los **intereses totales** a lo largo de toda la vida del préstamo.',
        ],
      },
    ],
    model: {
      excelTitle: 'Amortización: francés vs alemán vs americano',
      inputs: [
        { key: 'monto', label: 'Monto del préstamo', value: 1000, min: 100, max: 10000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tasa', label: 'Tasa por período', value: 0.05, min: 0.005, max: 0.2, step: 0.005, fmt: 'pct2' },
        { key: 'n', label: 'Cantidad de períodos (n)', value: 12, min: 2, max: 60, step: 1, fmt: 'num' },
      ],
      calcs: [
        { key: 'cuotaFrances', label: 'Cuota francés (constante)', fmt: 'money', calc: (v) => (v.monto * v.tasa) / (1 - Math.pow(1 + v.tasa, -v.n)), xl: 'PMT([tasa],[n],-[monto])' },
        { key: 'cuota1Aleman', label: 'Primera cuota alemán', fmt: 'money', calc: (v) => v.monto / v.n + v.monto * v.tasa, xl: '[monto]/[n]+[monto]*[tasa]' },
        { key: 'intTotalFrances', label: 'Intereses totales francés', fmt: 'money', calc: (v) => ((v.monto * v.tasa) / (1 - Math.pow(1 + v.tasa, -v.n))) * v.n - v.monto, xl: '[cuotaFrances]*[n]-[monto]' },
        { key: 'intTotalAleman', label: 'Intereses totales alemán', fmt: 'money', calc: (v) => v.monto * v.tasa * (v.n + 1) / 2, xl: '[monto]*[tasa]*([n]+1)/2' },
        { key: 'intTotalAmericano', label: 'Intereses totales americano', fmt: 'money', highlight: true, calc: (v) => v.monto * v.tasa * v.n, xl: '[monto]*[tasa]*[n]' },
      ],
      conclusions: [
        {
          test: (v) => v.monto * v.tasa * v.n > v.monto * v.tasa * (v.n + 1) / 2,
          good: 'El americano paga MÁS intereses totales que el alemán: solo paga intereses y devuelve el capital al final, así que el saldo nunca baja. Alivia la cuota hoy pero es el más caro. El alemán es el más barato en intereses totales.',
          bad: 'Con n = 1 los tres sistemas coinciden: un solo pago de capital más interés. La diferencia entre sistemas aparece recién con varios períodos.',
          xl: 'IF([intTotalAmericano]>[intTotalAleman],"El americano paga "&TEXT([intTotalAmericano],"#,##0")&" de intereses vs "&TEXT([intTotalAleman],"#,##0")&" del aleman (el mas barato) y "&TEXT([intTotalFrances],"#,##0")&" del frances. Alivia la cuota hoy pero es el mas caro.","Con n=1 los tres sistemas coinciden.")',
        },
      ],
      chart: { sweepKey: 'n', outKey: 'intTotalAmericano', xLabel: 'Períodos', yLabel: 'Intereses totales (americano)', yFmt: 'money' },
    },
    promptConcepts: ['Francés: cuota constante (PMT); más interés al inicio', 'Alemán: amortización de capital constante; cuota decreciente; menos intereses totales', 'Americano (bullet): solo intereses, capital al final; más intereses totales', 'Trade-off: cuota corriente vs intereses totales', 'Elegir el sistema según el flujo de caja del tomador'],
  },

  {
    id: 's11-i5',
    week: 11,
    order: 5,
    title: 'Valor tiempo del dinero: cuándo conviene ganar tiempo',
    subtitle: 'Un peso hoy vale más que un peso mañana… salvo cuando no',
    framework: 'Valor presente · valor tiempo del dinero',
    theory: [
      {
        heading: 'El principio que ordena todas las finanzas',
        paragraphs: [
          'El **valor tiempo del dinero** dice que **un peso hoy vale más que un peso mañana**, porque el peso de hoy se puede invertir y rendir. Para comparar montos en distintos momentos, se traen todos a **valor presente**: **VP = Valor futuro / (1 + tasa)^n**. La tasa de descuento es el costo de oportunidad del dinero; n, la cantidad de períodos de espera.',
          'De acá sale toda la lógica de las finanzas: por eso descontamos flujos en una valuación (Semana 12), por eso una cuota lejana "pesa" menos que una cercana (ítem 4), y por eso **postergar un pago tiene valor**: pagar 100 dentro de un año, con una tasa del 50%, equivale a pagar **66,7 hoy**. "Ganar tiempo" en un pago es, literalmente, pagar menos en términos presentes.',
          'La contracara: **cobrar** tarde te perjudica con la misma lógica. Por eso Andina, que tarda en cobrar (DSO alto) y financia ese desfase con descubierto carísimo, pierde por los dos lados: cobra valor presente bajo y paga intereses altos. El valor tiempo del dinero explica por qué la **velocidad de cobro** (Semana 6, CCE) crea o destruye valor.',
        ],
      },
      {
        heading: 'Cuándo "ganar tiempo" conviene y cuándo no',
        paragraphs: [
          'Postergar un pago conviene cuando **la tasa de descuento (tu costo de oportunidad o la tasa real) es alta**: cuanto más alta la tasa, menos pesa el pago futuro en valor presente, más valioso es demorar. Pero **no siempre** conviene: si demorar implica pagar **intereses o recargos** mayores que tu tasa de oportunidad, o si la **tasa real es negativa** y la inflación licúa la deuda de todos modos, la cuenta cambia.',
          'La regla práctica: comparás el **valor presente de pagar hoy** contra el **valor presente de pagar después con su recargo**. Si el recargo por demorar es menor que tu costo de oportunidad, ganás tiempo; si es mayor, conviene pagar ya. Es la misma lógica de descuento aplicada a una decisión cotidiana de tesorería.',
          '**Interrelación clave:** este principio es el cimiento de la **valuación por DCF** (Semana 12), de la elección de **sistema de amortización** (ítem 4), del **descuento de cheques** y de la gestión del **capital de trabajo** (CCE, Semana 6). Toda decisión financiera que cruce el tiempo se resuelve trayendo los flujos a valor presente.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Comparar montos en distintos momentos sin descontarlos ("son los mismos 100"). Demorar un pago que cobra un recargo mayor que tu costo de oportunidad. Y, al revés, pagar al contado con descuento cuando ese descuento supera a tu tasa de oportunidad: dejar pasar un descuento por pronto pago caro es regalar valor presente.',
        ],
      },
    ],
    model: {
      excelTitle: 'Valor tiempo del dinero — ¿conviene ganar tiempo?',
      inputs: [
        { key: 'pago', label: 'Monto del pago', value: 1000, min: 100, max: 10000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tasaOport', label: 'Tasa de oportunidad por período', value: 0.05, min: 0.005, max: 0.2, step: 0.005, fmt: 'pct2' },
        { key: 'periodos', label: 'Períodos de demora (n)', value: 6, min: 1, max: 36, step: 1, fmt: 'num' },
        { key: 'recargo', label: 'Recargo por demorar (% por período)', value: 0.03, min: 0, max: 0.2, step: 0.005, fmt: 'pct2' },
      ],
      calcs: [
        { key: 'pagoFuturo', label: 'Monto a pagar si demoro (con recargo)', fmt: 'money', calc: (v) => v.pago * Math.pow(1 + v.recargo, v.periodos), xl: '[pago]*(1+[recargo])^[periodos]' },
        { key: 'vpDemorar', label: 'VP de pagar demorado', fmt: 'money', highlight: true, calc: (v) => (v.pago * Math.pow(1 + v.recargo, v.periodos)) / Math.pow(1 + v.tasaOport, v.periodos), xl: '[pagoFuturo]/(1+[tasaOport])^[periodos]' },
        { key: 'ahorro', label: 'Ahorro en VP por ganar tiempo', fmt: 'money', calc: (v) => v.pago - (v.pago * Math.pow(1 + v.recargo, v.periodos)) / Math.pow(1 + v.tasaOport, v.periodos), xl: '[pago]-[vpDemorar]' },
      ],
      conclusions: [
        {
          test: (v) => v.recargo < v.tasaOport,
          good: 'El recargo por demorar es MENOR que tu tasa de oportunidad: ganar tiempo conviene. El VP de pagar demorado es menor que pagar hoy, así que postergar libera valor presente.',
          bad: 'El recargo por demorar es MAYOR o igual a tu tasa de oportunidad: NO conviene ganar tiempo. Demorar te cuesta más que lo que rinde tu dinero; mejor pagar ya.',
          xl: 'IF([recargo]<[tasaOport],"El recargo ("&TEXT([recargo],"0.0%")&") es menor que tu tasa de oportunidad ("&TEXT([tasaOport],"0.0%")&"): ganar tiempo conviene. VP de demorar "&TEXT([vpDemorar],"#,##0")&" < pagar hoy "&TEXT([pago],"#,##0")&".","El recargo supera a tu tasa de oportunidad: NO conviene demorar. Mejor pagar ya.")',
        },
      ],
      chart: { sweepKey: 'recargo', outKey: 'vpDemorar', xLabel: 'Recargo por período', yLabel: 'VP de pagar demorado', yFmt: 'money' },
    },
    promptConcepts: ['Valor presente: VP = VF / (1 + tasa)^n', 'Un peso hoy vale más que un peso mañana', 'Ganar tiempo conviene si el recargo < tasa de oportunidad', 'Cobrar tarde destruye valor (DSO, CCE)', 'Cimiento del DCF y de toda decisión que cruce el tiempo'],
  },
]
