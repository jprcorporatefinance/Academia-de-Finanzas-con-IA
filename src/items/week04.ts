import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 4 — EVA y RONIC (creación de valor y valor del crecimiento)
// Incorpora: value-generation-emerging-markets (EVA), ronic (RONIC, key value
// driver, política de dividendos) y value-driver-interrelations (spread, KVD).
// Caso central: Andina Manufacturas S.A. (NOPAT ~540, capital invertido ~5530,
// ROIC ~9,7%, WACC ~21%).
// ============================================================================

export const week04: ItemSpec[] = [
  {
    id: 's04-i1',
    week: 4,
    order: 1,
    title: 'EVA: la ganancia que sobra después de pagar el capital',
    subtitle: 'La utilidad económica real, en pesos, de un período',
    framework: 'Stern Stewart · EVA',
    theory: [
      {
        heading: 'La ganancia económica, no la contable',
        paragraphs: [
          'El **EVA (Economic Value Added)** es la ganancia que queda **después de remunerar a TODO el capital** a su costo de oportunidad (el WACC). La fórmula más reveladora es **EVA = (ROIC − WACC) × Capital Invertido**: el primer término es el **spread económico**; el segundo, la **escala**. Equivale a NOPAT − (Capital Invertido × WACC), donde ese cargo es lo mínimo que el capital debía rendir.',
          'La diferencia con la utilidad contable es radical. La contabilidad le cobra a la empresa el costo de la **deuda** (los intereses), pero **no le cobra el costo del patrimonio**: trata la plata de los accionistas como si fuera gratis. El EVA corrige esa ceguera: le cobra a la empresa el costo de oportunidad de **todo** el capital. Por eso una empresa puede tener utilidad contable positiva y EVA negativo: gana, pero gana **menos de lo que el capital exige**.',
          'En Andina es exactamente lo que pasa. Con un ROIC de **~9,7%**, un WACC de **~21%** y un capital invertido de **~5530**, el EVA es (0,097 − 0,21) × 5530 ≈ **−625**. La empresa muestra utilidad neta de 175 en el balance, pero en términos económicos **destruye unos 625** por año: no alcanza a cubrir el costo del capital que tiene puesto a trabajar.',
        ],
      },
      {
        heading: 'Para qué sirve y cómo usarlo',
        paragraphs: [
          'El EVA **alinea las decisiones con la creación de valor**: no basta con tener utilidad, hay que ganar por encima del costo del capital. Es la base de muchos esquemas de **compensación gerencial** (los bonus por EVA de Stern Stewart), porque internaliza el costo del capital en el management: el gerente deja de festejar ventas y empieza a cuidar el capital que consumen.',
          'La buena práctica es medir su **evolución (ΔEVA)** más que su nivel, y aplicar ajustes contables solo cuando sean materiales. El EVA conecta directamente la operación (ROIC) con el mercado de capitales (WACC): es el spread medido en pesos, el puente entre lo que rinde la fábrica y lo que cuesta financiarla.',
        ],
      },
      {
        heading: 'Debilidades e interrelaciones',
        paragraphs: [
          '**Debilidad central:** el EVA es una métrica de **un solo período** y penaliza las inversiones nuevas, que cargan capital hoy y rinden mañana (mismo sesgo del ROIC contra activos viejos vs. nuevos). Tampoco captura opciones de crecimiento ni valor estratégico futuro. Por eso se complementa con la mirada del RONIC (ítem 3) y la valuación por DCF.',
          '**Interrelación clave:** la suma de los EVAs futuros descontados al WACC es el **MVA (Market Value Added)**, y MVA + capital invertido ≈ valor de la firma. El EVA es la pieza que monetiza el spread ROIC − WACC y lo convierte en la unidad de cuenta de toda la creación de valor (Semana 12).',
        ],
      },
    ],
    model: {
      excelTitle: 'EVA = (ROIC − WACC) × Capital',
      inputs: [
        { key: 'roic', label: 'ROIC', value: 0.097, min: 0, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC', value: 0.21, min: 0.05, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'capInv', label: 'Capital invertido', value: 5530, min: 500, max: 12000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'spread', label: 'Spread (ROIC − WACC)', fmt: 'pct', calc: (v) => v.roic - v.wacc, xl: '[roic]-[wacc]' },
        { key: 'cargoCap', label: 'Cargo por el capital (WACC × Capital)', fmt: 'money', calc: (v) => v.wacc * v.capInv, xl: '[wacc]*[capInv]' },
        { key: 'eva', label: 'EVA', fmt: 'money', highlight: true, calc: (v) => (v.roic - v.wacc) * v.capInv, xl: '([roic]-[wacc])*[capInv]' },
      ],
      conclusions: [
        {
          test: (v) => v.roic - v.wacc >= 0,
          good: 'El EVA es positivo: Andina gana por encima del costo de TODO su capital y CREA valor económico, no solo contable. Cada peso adicional de capital a este spread agranda el valor.',
          bad: 'El EVA es negativo: Andina tiene utilidad contable pero DESTRUYE valor económico, porque no cubre el costo del capital. El cargo por el capital supera al NOPAT; primero hay que cerrar el spread.',
          xl: 'IF([spread]>=0,"EVA positivo ("&TEXT([eva],"#,##0")&"): se gana por encima del costo del capital. Se CREA valor economico.","EVA negativo ("&TEXT([eva],"#,##0")&"): hay utilidad contable pero se DESTRUYE valor. El cargo por el capital ("&TEXT([cargoCap],"#,##0")&") supera al NOPAT. Primero cerra el spread.")',
        },
      ],
      chart: { sweepKey: 'roic', outKey: 'eva', xLabel: 'ROIC', yLabel: 'EVA', yFmt: 'money' },
    },
    promptConcepts: ['EVA = (ROIC − WACC) × Capital Invertido', 'EVA = NOPAT − cargo por el capital (WACC × Capital)', 'La contabilidad no cobra el costo del patrimonio', 'Utilidad contable positiva + EVA negativo', 'EVA descontado = MVA = creación de valor'],
  },

  {
    id: 's04-i2',
    week: 4,
    order: 2,
    title: 'El spread de valor: ROIC − WACC',
    subtitle: 'El corazón de la creación de valor, antes de la escala',
    framework: 'McKinsey · spread económico',
    theory: [
      {
        heading: 'El número que decide todo',
        paragraphs: [
          'El **spread de valor** es la diferencia **ROIC − WACC**: cuánto rinde el capital por encima (o por debajo) de lo que cuesta. Es el corazón de la creación de valor, **antes** de multiplicar por la escala (el capital invertido). Si el spread es positivo, cada peso invertido crea valor; si es negativo, cada peso lo destruye. El EVA (ítem 1) es simplemente este spread llevado a pesos.',
          'La belleza del spread es que **separa la rentabilidad de la decisión de financiación**. El ROIC mide qué rinde el negocio operativamente; el WACC, cuánto cuesta el capital con todo el riesgo país y de tamaño adentro (Semana 9). El spread los enfrenta cara a cara. En Andina: 9,7% − 21% = **−11,3 puntos**. Un spread profundamente negativo, la firma de la destrucción de valor.',
          'Acá está la regla que ordena todo el programa: **spread positivo → crear valor → conviene invertir y crecer; spread negativo → destruir valor → crecer empeora las cosas**. El crecimiento no crea valor por sí mismo: es un **multiplicador del spread**. Si el spread es negativo, crecer significa destruir valor más rápido.',
        ],
      },
      {
        heading: 'Por qué un punto importa tanto en emergentes',
        paragraphs: [
          'El spread es **brutalmente sensible** al WACC, y el WACC en mercados emergentes es alto y volátil por el riesgo país. Un mismo negocio con ROIC del 12% **crea valor** en Estados Unidos (WACC ~8%) y **destruye valor** en Argentina (WACC 21%+). El flujo operativo es idéntico; lo que cambia el veredicto es la tasa de corte.',
          'Por eso un error de estimación del WACC —fácil de cometer con el doble conteo del riesgo país— puede dar vuelta el signo del spread y "fabricar" destrucción de valor donde no la hay, o esconderla donde sí la hay. Un WACC subestimado fabrica spread positivo falso; uno sobreestimado frena inversión sana.',
        ],
      },
      {
        heading: 'Interrelaciones: SI y DÓNDE',
        paragraphs: [
          '**Interrelación clave:** el spread responde **SI** se crea o destruye valor; el **DuPont** (Semana 3) responde **DÓNDE** está la palanca: margen, rotación o estructura. Es el primer cruce del tablero de diagnóstico. En Andina el spread negativo grita "hay un problema", y el DuPont localiza que está en el costo financiero y en la rotación, no en el margen.',
          'El spread también gobierna la **escala correcta**: con spread positivo, conviene invertir más capital (subir la escala del EVA); con spread negativo, conviene **desinvertir** y achicar el capital empleado. La empresa que destruye valor no tiene que crecer: tiene que primero cerrar el spread.',
        ],
      },
    ],
    model: {
      excelTitle: 'Spread de valor (ROIC − WACC)',
      inputs: [
        { key: 'roic', label: 'ROIC', value: 0.097, min: 0, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC', value: 0.21, min: 0.05, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'capInv', label: 'Capital invertido (escala)', value: 5530, min: 500, max: 12000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'spread', label: 'Spread (ROIC − WACC)', fmt: 'pct', highlight: true, calc: (v) => v.roic - v.wacc, xl: '[roic]-[wacc]' },
        { key: 'evaEscala', label: 'Valor creado/destruido (spread × capital)', fmt: 'money', calc: (v) => (v.roic - v.wacc) * v.capInv, xl: '[spread]*[capInv]' },
      ],
      conclusions: [
        {
          test: (v) => v.roic - v.wacc >= 0,
          good: 'El spread es positivo: el capital rinde por encima de su costo. Conviene SUBIR la escala (invertir más a este spread) para agrandar el valor creado.',
          bad: 'El spread es negativo: el capital rinde por debajo de su costo. Acá crecer destruye valor más rápido; lo correcto es desinvertir y cerrar el spread antes de pensar en escala.',
          xl: 'IF([spread]>=0,"Spread positivo ("&TEXT([spread],"0.0%")&"): el capital rinde sobre su costo. Subi la escala para crear mas valor ("&TEXT([evaEscala],"#,##0")&").","Spread negativo ("&TEXT([spread],"0.0%")&"): el capital rinde bajo su costo. Crecer destruye valor mas rapido ("&TEXT([evaEscala],"#,##0")&"). Primero cerra el spread.")',
        },
      ],
      chart: { sweepKey: 'wacc', outKey: 'spread', xLabel: 'WACC', yLabel: 'Spread', yFmt: 'pct' },
    },
    promptConcepts: ['Spread de valor = ROIC − WACC', 'El crecimiento es un multiplicador del spread', 'Sensibilidad del spread al WACC en emergentes', 'Spread (SI) + DuPont (DÓNDE) = diagnóstico', 'Spread negativo → desinvertir, no crecer'],
  },

  {
    id: 's04-i3',
    week: 4,
    order: 3,
    title: 'RONIC: el retorno del capital NUEVO',
    subtitle: 'El parabrisas, no el espejo retrovisor',
    framework: 'McKinsey · RONIC',
    theory: [
      {
        heading: 'Lo marginal, no lo histórico',
        paragraphs: [
          'El **RONIC (Return on New Invested Capital)** mide el retorno sobre el capital **incremental** —el capital nuevo— que la empresa pone a trabajar en un período. El ROIC mide el retorno sobre **todo** el stock de capital acumulado a lo largo de su historia. El ROIC mira el **espejo retrovisor**; el RONIC mira el **parabrisas**. La fórmula es **RONIC = ΔNOPAT / ΔCapital Invertido**.',
          'La distinción es filosa. Una empresa puede tener un ROIC histórico **altísimo** —heredado de inversiones viejas hechas cuando tenía una ventaja competitiva que la competencia todavía no erosionó— y a la vez un RONIC **bajo**, porque los proyectos nuevos ya enfrentan competencia plena y rinden mucho menos. El ROIC dice "¿qué rinde, en promedio, todo lo que tengo invertido?"; el RONIC, la pregunta del CEO: "¿qué rinde el **próximo peso** que invierto?".',
          'Por eso el RONIC es el indicador más accionable para decisiones de inversión. Para Andina, que evalúa si vale la pena seguir poniendo capital en la planta, el ROIC histórico es casi irrelevante: lo que importa es el RONIC de los proyectos nuevos contra el WACC.',
        ],
      },
      {
        heading: 'La identidad de crecimiento',
        paragraphs: [
          'El RONIC entra en el corazón del modelo de valor a través de la **identidad de crecimiento**: **g = RONIC × IR**, donde g es la tasa de crecimiento del NOPAT e IR es la tasa de reinversión (= Inversión neta / NOPAT). Despejando, IR = g / RONIC: cuánto NOPAT hay que reinvertir para sostener el crecimiento g.',
          'Cuanto **más alto** el RONIC, **menos capital** necesitás reinvertir para crecer al mismo ritmo, y más caja libre te queda. Una empresa con RONIC alto crece "barato"; una con RONIC bajo tiene que reinvertir casi todo su NOPAT solo para sostener el mismo crecimiento, y no le queda caja para los accionistas. El RONIC gobierna cuánto FCFF sobrevive después de financiar el crecimiento (ítem 4).',
        ],
      },
      {
        heading: 'Estimación, valor terminal e interrelaciones',
        paragraphs: [
          '**Cómo se estima:** de forma histórica incremental (ΔNOPAT/ΔCapital, el más directo pero ruidoso —promediá varios años—), forward-looking por cartera de proyectos (el más prolijo), o implícito en supuestos de continuidad. **Uso crítico en el valor terminal:** el error clásico es proyectar la perpetuidad con el ROIC histórico alto; pero la competencia erosiona los retornos excedentes, y el RONIC de largo plazo hace *fade* hacia el WACC. McKinsey recomienda asumir RONIC = WACC en la continuidad de industrias maduras.',
          '**Interrelación clave:** el RONIC gobierna la **política de dividendos** (ítem 5: reinvertir si RONIC > WACC, distribuir si no), el **valor del crecimiento** (ítem 4: la KVD) y la **asignación de capital** por unidad de negocio. En Andina, restricciones cambiarias mediante, la regla teórica se ajusta: a veces conviene reinvertir aun con RONIC marginal bajo si la alternativa es dejar caja licuándose.',
        ],
      },
    ],
    model: {
      excelTitle: 'RONIC = ΔNOPAT / ΔCapital',
      inputs: [
        { key: 'deltaNopat', label: 'ΔNOPAT (aumento de NOPAT)', value: 36, min: 0, max: 400, step: 1, unit: 'k', fmt: 'money' },
        { key: 'deltaCap', label: 'Inversión neta del período (ΔCapital)', value: 300, min: 10, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'wacc', label: 'WACC', value: 0.21, min: 0.05, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ronic', label: 'RONIC', fmt: 'pct', highlight: true, calc: (v) => v.deltaNopat / v.deltaCap, xl: '[deltaNopat]/[deltaCap]' },
        { key: 'spreadNew', label: 'Spread del capital nuevo (RONIC − WACC)', fmt: 'pct', calc: (v) => v.deltaNopat / v.deltaCap - v.wacc, xl: '[ronic]-[wacc]' },
      ],
      conclusions: [
        {
          test: (v) => v.deltaNopat / v.deltaCap >= v.wacc,
          good: 'El RONIC supera al WACC: el capital NUEVO rinde más de lo que cuesta. Conviene reinvertir y crecer; cada peso adicional crea valor. La política óptima es retener, no distribuir.',
          bad: 'El RONIC es menor al WACC: el capital nuevo destruye valor. Crecer empeora las cosas (más grande y más pobre). La política óptima es distribuir la caja, no reinvertirla.',
          xl: 'IF([ronic]>=[wacc],"RONIC ("&TEXT([ronic],"0.0%")&") supera al WACC ("&TEXT([wacc],"0.0%")&"): el capital nuevo crea valor. Reinverti y crece; retene la caja.","RONIC ("&TEXT([ronic],"0.0%")&") menor al WACC ("&TEXT([wacc],"0.0%")&"): el capital nuevo destruye valor. Distribui la caja, no la reinviertas.")',
        },
      ],
      chart: { sweepKey: 'deltaNopat', outKey: 'ronic', xLabel: 'ΔNOPAT', yLabel: 'RONIC', yFmt: 'pct' },
    },
    promptConcepts: ['RONIC = ΔNOPAT / ΔCapital (capital nuevo)', 'RONIC (parabrisas) vs. ROIC (retrovisor)', 'Identidad de crecimiento: g = RONIC × IR', 'RONIC de largo plazo hace fade hacia el WACC', 'RONIC gobierna dividendos y valor terminal'],
  },

  {
    id: 's04-i4',
    week: 4,
    order: 4,
    title: 'Key Value Driver: cuánto vale crecer',
    subtitle: 'La fórmula de McKinsey que une rentabilidad, crecimiento y costo del capital',
    framework: 'McKinsey · Key Value Driver (KVD)',
    theory: [
      {
        heading: 'Una sola ecuación que ata todo',
        paragraphs: [
          'El **Key Value Driver (KVD)** de McKinsey es la ecuación que une, en una sola línea, rentabilidad, crecimiento y costo del capital: **Valor = NOPAT × (1 − g/RONIC) / (WACC − g)**. Es la fórmula que reemplaza a la perpetuidad ingenua (NOPAT/WACC) cuando la empresa crece, y es también la fórmula del **valor terminal** en cualquier DCF.',
          'El término **(1 − g/RONIC)** es la clave: es la fracción del NOPAT que **NO** necesitás reinvertir para sostener el crecimiento g, o sea el **FCFF como porcentaje del NOPAT**. Sale de la identidad g = RONIC × IR, que implica IR = g/RONIC, y como (1 − g/RONIC) = (1 − IR), ese término es la caja libre que queda después de financiar el crecimiento. Cuanto más alto el RONIC, menos reinvertís y más caja libre te queda.',
          'El denominador **(WACC − g)** es la perpetuidad: cuando WACC y g están cerca, el denominador se achica y el valor se dispara o se derrumba con cambios mínimos. Por eso la KVD es a la vez la herramienta más poderosa y la más sensible de la valuación.',
        ],
      },
      {
        heading: 'La demostración que cambia la cabeza',
        paragraphs: [
          'Acá está el teorema que ordena toda la asignación de capital. Poné **RONIC = WACC** en la KVD: el término (1 − g/WACC) sobre (WACC − g) se simplifica algebraicamente y queda **Valor = NOPAT / WACC**, que es exactamente el valor de la empresa **sin** crecimiento. Conclusión demoledora: cuando RONIC = WACC, la empresa vale **lo mismo crezca o no crezca**. El crecimiento no agrega ni un peso.',
          'Esto prueba que lo que crea valor **no es el crecimiento en sí, sino el spread RONIC − WACC**. El crecimiento es apenas un **multiplicador** de ese spread: amplifica la creación de valor si el spread es positivo, y amplifica la **destrucción** si es negativo. Tres empresas que crecen exactamente al mismo 4% pueden valer 13×, 10× o 5,5× su NOPAT según su RONIC. Crecer con RONIC < WACC empobrece: una empresa más grande y más pobre.',
        ],
      },
      {
        heading: 'Aplicación a Andina e interrelaciones',
        paragraphs: [
          'En Andina, con NOPAT ~540 y un WACC de 21%, el valor depende **enteramente** de si los proyectos nuevos tienen RONIC por encima o por debajo del 21%. Si el RONIC marginal está debajo del WACC —probable, dado el costo de capital altísimo del país—, crecer destruye valor, y la KVD lo muestra con números: el valor cae respecto del piso NOPAT/WACC.',
          '**Interrelación clave:** la KVD es el puente entre el árbol de generadores (NOPAT, RONIC, g, WACC, Semanas 3 y 9) y la valuación integral por DCF (Semana 12). El valor terminal se calcula con la **misma** KVD usando el RONIC de largo plazo. Es la ecuación maestra: todo el resto del programa existe para alimentar uno de sus cuatro inputs.',
        ],
      },
    ],
    model: {
      excelTitle: 'Key Value Driver de McKinsey',
      inputs: [
        { key: 'nopat', label: 'NOPAT', value: 540, min: 0, max: 1500, step: 5, unit: 'k', fmt: 'money' },
        { key: 'ronic', label: 'RONIC (capital nuevo)', value: 0.12, min: 0.02, max: 0.5, step: 0.005, fmt: 'pct' },
        { key: 'g', label: 'Crecimiento (g)', value: 0.03, min: 0, max: 0.15, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC', value: 0.21, min: 0.06, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ir', label: 'Tasa de reinversión (g/RONIC)', fmt: 'pct', calc: (v) => v.g / v.ronic, xl: '[g]/[ronic]' },
        { key: 'fcffPct', label: 'FCFF como % del NOPAT (1 − g/RONIC)', fmt: 'pct', calc: (v) => 1 - v.g / v.ronic, xl: '1-[g]/[ronic]' },
        { key: 'valor', label: 'Valor (KVD)', fmt: 'money', highlight: true, calc: (v) => (v.wacc > v.g ? (v.nopat * (1 - v.g / v.ronic)) / (v.wacc - v.g) : NaN), xl: 'IF([wacc]>[g],[nopat]*(1-[g]/[ronic])/([wacc]-[g]),NA())' },
        { key: 'valorSinG', label: 'Valor sin crecimiento (NOPAT/WACC)', fmt: 'money', calc: (v) => v.nopat / v.wacc, xl: '[nopat]/[wacc]' },
      ],
      conclusions: [
        {
          test: (v) => v.ronic >= v.wacc,
          good: 'El RONIC supera al WACC: crecer AGRANDA el valor por encima del piso NOPAT/WACC. El crecimiento amplifica un spread positivo; conviene reinvertir.',
          bad: 'El RONIC es menor al WACC: crecer HUNDE el valor por debajo del piso NOPAT/WACC. Una empresa más grande y más pobre; el crecimiento amplifica la destrucción.',
          xl: 'IF([ronic]>=[wacc],"RONIC ("&TEXT([ronic],"0.0%")&") supera al WACC: crecer agranda el valor a "&TEXT([valor],"#,##0")&", sobre el piso "&TEXT([valorSinG],"#,##0")&". Reinverti.","RONIC ("&TEXT([ronic],"0.0%")&") menor al WACC: crecer hunde el valor a "&TEXT([valor],"#,##0")&", bajo el piso "&TEXT([valorSinG],"#,##0")&". Mas grande y mas pobre.")',
        },
      ],
      chart: { sweepKey: 'ronic', outKey: 'valor', xLabel: 'RONIC', yLabel: 'Valor', yFmt: 'money' },
    },
    promptConcepts: ['Valor = NOPAT × (1 − g/RONIC) / (WACC − g)', '(1 − g/RONIC) = FCFF como % del NOPAT', 'RONIC = WACC ⟹ Valor = NOPAT/WACC (crecer es neutral)', 'El crecimiento es multiplicador del spread RONIC − WACC', 'La KVD como fórmula del valor terminal'],
  },

  {
    id: 's04-i5',
    week: 4,
    order: 5,
    title: 'Crecer o distribuir: la política de dividendos',
    subtitle: 'La decisión de dividendos es el residuo de la decisión de inversión',
    framework: 'RONIC · política de dividendos óptima',
    theory: [
      {
        heading: 'La regla de decisión',
        paragraphs: [
          'La **política de dividendos óptima** tiene una regla de una sola línea: **reinvertir mientras haya proyectos con RONIC > WACC; distribuir (dividendos o recompras) cuando los proyectos marginales caen por debajo del WACC**. La política de dividendos **no es independiente**: es el **residuo** de la decisión de inversión. Primero decidís dónde rinde el capital; lo que sobra, se reparte.',
          'La lógica es directa. Si la empresa tiene proyectos que rinden por encima del costo del capital (RONIC > WACC), **retener** la caja y reinvertirla crea valor para el accionista: vale más que el dividendo. Pero si los proyectos marginales rinden por debajo (RONIC < WACC), reinvertir **destruye** valor; al accionista le conviene cobrar el dividendo y reinvertir él mismo a una tasa mejor afuera.',
          'Conecta con el **crecimiento sostenible**: g = RONIC × IR, y el Sustainable Growth Rate SGR = ROE × (1 − payout). El crecimiento que **crea** valor es solo el que sale de reinvertir a RONIC > WACC. Crecer reteniendo caja para proyectos malos es el peor de los mundos.',
        ],
      },
      {
        heading: 'El caso de Andina',
        paragraphs: [
          'Andina reparte dividendos por **120** (lo vemos en el flujo de financiación) mientras recurre al **descubierto al 85%** para tapar baches de caja. Es una contradicción típica: distribuir caja con una mano y tomar deuda carísima con la otra. La pregunta correcta no es cuánto repartir, sino si el capital que retiene rinde por encima del WACC.',
          'Con un RONIC marginal probablemente **por debajo** del WACC del 21%, la teoría diría que Andina debería distribuir y dejar de hundir capital en proyectos que destruyen valor. Pero acá entra el ajuste emergente: si la alternativa es dejar la caja en pesos **licuándose** o atrapada por restricciones cambiarias, a veces conviene reinvertir aun con RONIC marginal bajo, simplemente porque el retorno de la caja ociosa es **todavía peor**. La regla teórica se ajusta por la opción de salida real del capital.',
        ],
      },
      {
        heading: 'Interrelaciones y caveats',
        paragraphs: [
          '**Interrelación clave:** la política de dividendos cierra el círculo del programa. Se conecta con el **RONIC** (ítem 3) que la gobierna, con la **KVD** (ítem 4) que pone número al valor de retener vs. distribuir, con la **asignación de capital** por unidad de negocio (dar capital a las unidades con RONIC > WACC, desinvertir las de RONIC < WACC, como en las matrices BCG/GE-McKinsey) y con el bloque de caja del TSR.',
          '**Caveat:** la regla se ajusta en mercados emergentes por el cepo y las restricciones al giro de dividendos, que distorsionan la "opción de salida" del capital. Y el eje de riesgo se lee en paralelo: una empresa puede **no quebrar** (solvente) y aun así estar reteniendo caja para destruir valor. No confundir supervivencia con creación de valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'Crecer vs. distribuir (RONIC vs WACC)',
      inputs: [
        { key: 'nopat', label: 'NOPAT disponible', value: 540, min: 0, max: 1500, step: 5, unit: 'k', fmt: 'money' },
        { key: 'ronic', label: 'RONIC de los proyectos nuevos', value: 0.15, min: 0.02, max: 0.5, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC', value: 0.21, min: 0.06, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'ir', label: 'Tasa de reinversión propuesta (IR)', value: 0.4, min: 0, max: 1, step: 0.05, fmt: 'pct' },
      ],
      calcs: [
        { key: 'reinvierte', label: 'Caja a reinvertir', fmt: 'money', calc: (v) => v.nopat * v.ir, xl: '[nopat]*[ir]' },
        { key: 'distribuye', label: 'Caja a distribuir (payout)', fmt: 'money', calc: (v) => v.nopat * (1 - v.ir), xl: '[nopat]*(1-[ir])' },
        { key: 'spreadNew', label: 'Spread del capital nuevo (RONIC − WACC)', fmt: 'pct', highlight: true, calc: (v) => v.ronic - v.wacc, xl: '[ronic]-[wacc]' },
        { key: 'gSost', label: 'Crecimiento sostenible (RONIC × IR)', fmt: 'pct', calc: (v) => v.ronic * v.ir, xl: '[ronic]*[ir]' },
      ],
      conclusions: [
        {
          test: (v) => v.ronic >= v.wacc,
          good: 'El RONIC supera al WACC: REINVERTIR crea valor. La política óptima es retener caja y crecer; bajar el payout y subir la reinversión agranda el valor del accionista.',
          bad: 'El RONIC es menor al WACC: REINVERTIR destruye valor. La política óptima es DISTRIBUIR (salvo que la caja en pesos se licúe aún más: ahí el ajuste emergente puede invertir la regla).',
          xl: 'IF([ronic]>=[wacc],"RONIC ("&TEXT([ronic],"0.0%")&") supera al WACC: REINVERTIR crea valor. Reten caja y crece (g sostenible "&TEXT([gSost],"0.0%")&").","RONIC ("&TEXT([ronic],"0.0%")&") menor al WACC: REINVERTIR destruye valor. DISTRIBUI "&TEXT([distribuye],"#,##0")&", salvo que la caja en pesos se licue aun mas.")',
        },
      ],
      chart: { sweepKey: 'ronic', outKey: 'spreadNew', xLabel: 'RONIC', yLabel: 'Spread del capital nuevo', yFmt: 'pct' },
    },
    promptConcepts: ['Regla: reinvertir si RONIC > WACC, distribuir si no', 'Los dividendos son el residuo de la inversión', 'g = RONIC × IR y crecimiento sostenible (SGR)', 'Contradicción de Andina: dividendos vs. descubierto al 85%', 'Ajuste emergente: caja que se licúa invierte la regla'],
  },
]
