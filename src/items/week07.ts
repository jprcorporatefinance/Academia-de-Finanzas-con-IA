import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 7 — Capital de Trabajo
// Caso central: "Andina Manufacturas S.A." (CxC 1850, inventario 2400,
// proveedores 1280, ventas 8200, CMV 5740).
// Incorpora: value-generation-emerging-markets / matrices-operativas
// (ABC/XYZ, aging-cobranzas, GMROI, CCE) y value-driver-interrelations.
// ============================================================================

export const week07: ItemSpec[] = [
  {
    id: 's07-i1',
    week: 7,
    order: 1,
    title: 'Días de cobranza, inventario y pago (DSO / DIO / DPO)',
    subtitle: 'Cuántos días tarda la plata en recorrer el negocio',
    framework: 'Capital de trabajo · McKinsey (palancas operativas)',
    theory: [
      {
        heading: 'Los tres relojes del capital de trabajo',
        paragraphs: [
          'El capital de trabajo operativo no se mide bien en pesos: se mide en **días**. Tres indicadores cuentan toda la historia. El **DSO (Days Sales Outstanding)** dice cuántos días tardás en **cobrar** una venta: DSO = Cuentas por cobrar / Ventas × 365. El **DIO (Days Inventory Outstanding)** dice cuántos días la mercadería queda **inmovilizada** en el depósito: DIO = Inventario / CMV × 365. Y el **DPO (Days Payable Outstanding)** dice cuántos días tardás en **pagarle** al proveedor: DPO = Proveedores / CMV × 365.',
          'La gracia de medir en días es que neutraliza el tamaño y la inflación: una empresa que duplica ventas puede tener el mismo DSO, y una economía con inflación alta no distorsiona un ratio expresado en días. Por eso es el lenguaje universal del capital de trabajo, y el primer tablero que mira un CFO antes de hablar de caja.',
          'En **Andina**, las cuentas por cobrar (1850) sobre ventas de 8200 dan un DSO de más de **82 días**: tarda casi tres meses en cobrar. El inventario (2400) sobre un CMV de 5740 da un DIO de más de **150 días**: la mercadería duerme cinco meses en el galpón. Mientras tanto, a proveedores (1280) les paga en unos **81 días**. Esos números, no el "margen", explican por qué la caja está siempre tensa.',
        ],
      },
      {
        heading: 'Cobrar rápido, pagar tarde, no acopiar de más',
        paragraphs: [
          'La lógica de gestión es directa: **bajar el DSO** (cobrar antes) y **bajar el DIO** (rotar el stock más rápido) liberan caja; **subir el DPO** (pagar más tarde, sin recargo) también libera caja, porque es el proveedor el que financia la operación. Cada día menos de DSO o DIO, y cada día más de DPO, devuelve plata que estaba atrapada.',
          'Pero hay tensiones reales. Apurar la cobranza puede espantar clientes; vaciar el inventario puede provocar quiebres de stock y ventas perdidas; estirar el pago a proveedores tiene un límite antes de perder descuentos o el crédito comercial. El arte del capital de trabajo es optimizar los tres relojes **sin romper la operación**.',
          'El **DIO** es casi siempre la palanca más gorda en una industria como la de Andina, y es donde entra la matriz **ABC/XYZ** (ítem 3): no todo el stock pesa igual ni se mueve igual. El **DSO** se ataca con la matriz de **aging-reclamo** (ítem 4). El **DPO** es financiamiento gratis si se negocia bien (ítem 5).',
        ],
      },
      {
        heading: 'Interrelaciones: de los días al valor',
        paragraphs: [
          '**Interrelación clave:** estos tres días se combinan en el **Ciclo de Conversión de Caja** del ítem 2 (CCE = DSO + DIO − DPO), que es el número que de verdad mide cuántos días de caja necesita financiar el negocio. Y el capital de trabajo así medido es parte del **Capital Invertido**: cuanto más alto, más bajo el ROIC y más débil el spread ROIC − WACC de la Semana 9.',
          'Un **error frecuente del CEO** es festejar el crecimiento de ventas sin mirar que el DSO y el DIO crecen más rápido: la empresa vende más, gana "en el papel" y se queda sin caja. Andina es el caso de manual: utilidad contable, pero descubierto bancario al 85% tapando el agujero que dejan las cobranzas lentas y el stock inmovilizado.',
        ],
      },
    ],
    model: {
      excelTitle: 'DSO / DIO / DPO — los tres relojes',
      inputs: [
        { key: 'cxc', label: 'Cuentas por cobrar', value: 1850, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'inv', label: 'Inventario', value: 2400, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'prov', label: 'Proveedores', value: 1280, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'ventas', label: 'Ventas netas anuales', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'cmv', label: 'Costo de mercadería vendida (CMV)', value: 5740, min: 500, max: 15000, step: 50, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'dso', label: 'DSO (días de cobranza)', fmt: 'days', highlight: true, calc: (v) => (v.cxc / v.ventas) * 365, xl: '[cxc]/[ventas]*365' },
        { key: 'dio', label: 'DIO (días de inventario)', fmt: 'days', highlight: true, calc: (v) => (v.inv / v.cmv) * 365, xl: '[inv]/[cmv]*365' },
        { key: 'dpo', label: 'DPO (días de pago)', fmt: 'days', highlight: true, calc: (v) => (v.prov / v.cmv) * 365, xl: '[prov]/[cmv]*365' },
      ],
      conclusions: [
        {
          test: (v) => (v.inv / v.cmv) * 365 > (v.cxc / v.ventas) * 365,
          good: 'El DIO supera al DSO: la mayor masa de caja atrapada está en el INVENTARIO. Esa es la palanca más gorda (matriz ABC/XYZ del ítem 3) antes que la cobranza.',
          bad: 'El DSO supera al DIO: la caja se atasca sobre todo en la COBRANZA. Atacá primero el aging de cuentas por cobrar (ítem 4) y la política de crédito.',
          xl: 'IF([dio]>[dso],"El DIO ("&TEXT([dio],"0")&" dias) supera al DSO ("&TEXT([dso],"0")&" dias): la caja atrapada esta sobre todo en el INVENTARIO. Palanca = ABC/XYZ.","El DSO ("&TEXT([dso],"0")&") supera al DIO ("&TEXT([dio],"0")&"): la caja se atasca en la COBRANZA. Atacar el aging.")',
        },
      ],
      chart: { sweepKey: 'inv', outKey: 'dio', xLabel: 'Inventario', yLabel: 'DIO (días)', yFmt: 'days' },
    },
    promptConcepts: ['DSO = CxC / Ventas × 365 (días de cobranza)', 'DIO = Inventario / CMV × 365 (días de inventario)', 'DPO = Proveedores / CMV × 365 (días de pago)', 'Por qué medir el capital de trabajo en días y no en pesos', 'Cuál de los tres relojes atrapa más caja en Andina'],
  },

  {
    id: 's07-i2',
    week: 7,
    order: 2,
    title: 'Ciclo de conversión de caja (CCE)',
    subtitle: 'DSO + DIO − DPO: los días que el negocio financia de su bolsillo',
    framework: 'Cash Conversion Cycle · CCE',
    theory: [
      {
        heading: 'El número que mide cuánta caja necesita el negocio',
        paragraphs: [
          'El **Ciclo de Conversión de Caja (CCE)** une los tres relojes en un solo número: **CCE = DSO + DIO − DPO**. Mide cuántos días pasan entre que la empresa **paga** por la mercadería y que **cobra** por venderla. Es el lapso que tiene que financiar de su propio bolsillo (o con el banco), y por eso es el indicador más honesto del apetito de caja de un negocio.',
          'La intuición: comprás mercadería y la tenés en stock (DIO), la vendés a crédito y tardás en cobrar (DSO), pero al proveedor recién le pagás varios días después (DPO, que **resta** porque es plata que todavía no salió). Si el ciclo da 150 días, hay 150 días de operación que alguien tiene que bancar. Si diera **negativo**, son los proveedores y los clientes los que financian a la empresa (el modelo de los supermercados y de Amazon).',
          'En **Andina**, con un DSO de ~82, un DIO de ~153 y un DPO de ~81, el CCE ronda los **154 días**: más de cinco meses de operación financiados con descubierto al 85%. Ese es el verdadero costo escondido detrás de la "ganancia contable" de 175.',
        ],
      },
      {
        heading: 'De días a pesos: el costo financiero del ciclo',
        paragraphs: [
          'El CCE en días se traduce en pesos: la **caja inmovilizada** ≈ CCE / 365 × Ventas (o CMV, según el criterio). Y esa caja inmovilizada **cuesta**: multiplicada por la tasa del descubierto da el **costo financiero anual** de tener el ciclo tan largo. Acortar el CCE no es un ejercicio contable: es liberar plata cara.',
          'Cada día que se recorta del CCE —cobrando antes, rotando mejor el stock o estirando el pago— devuelve caja real y baja el costo financiero. Por eso las dos matrices operativas (ABC/XYZ para el DIO, aging-reclamo para el DSO) y la negociación con proveedores (DPO) son las palancas concretas que comprimen este ciclo.',
          '**Interrelación clave:** el CCE es la parte operativa del **Capital Invertido**. Reducirlo sube el **ROIC** y, vía el spread ROIC − WACC (Semana 9), **crea valor**. En mercados emergentes, donde el WACC trae el riesgo país adentro y la tasa del descubierto es altísima, comprimir el CCE suele ser la palanca de valor más rápida y barata: no requiere CAPEX, solo gestión.',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Mirar solo el margen y nunca el ciclo. Confundir un CCE corto con un negocio sano (puede esconder quiebres de stock o cobranzas agresivas que pierden clientes). Y el más caro en una economía emergente: no poner precio al ciclo, ignorando que cada día de CCE financiado con descubierto al 85% se come la rentabilidad operativa.',
        ],
      },
    ],
    model: {
      excelTitle: 'Ciclo de conversión de caja (CCE)',
      inputs: [
        { key: 'dso', label: 'DSO (días de cobranza)', value: 82, min: 0, max: 200, step: 1, fmt: 'days' },
        { key: 'dio', label: 'DIO (días de inventario)', value: 153, min: 0, max: 300, step: 1, fmt: 'days' },
        { key: 'dpo', label: 'DPO (días de pago)', value: 81, min: 0, max: 200, step: 1, fmt: 'days' },
        { key: 'ventas', label: 'Ventas netas anuales', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tasa', label: 'Costo del descubierto (TNA)', value: 0.85, min: 0, max: 1.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'cce', label: 'CCE = DSO + DIO − DPO', fmt: 'days', highlight: true, calc: (v) => v.dso + v.dio - v.dpo, xl: '[dso]+[dio]-[dpo]' },
        { key: 'cajaInmov', label: 'Caja inmovilizada en el ciclo', fmt: 'money', calc: (v) => ((v.dso + v.dio - v.dpo) / 365) * v.ventas, xl: '[cce]/365*[ventas]' },
        { key: 'costoCiclo', label: 'Costo financiero anual del ciclo', fmt: 'money', calc: (v) => ((v.dso + v.dio - v.dpo) / 365) * v.ventas * v.tasa, xl: '[cajaInmov]*[tasa]' },
      ],
      conclusions: [
        {
          test: (v) => v.dso + v.dio - v.dpo > 0,
          good: 'El CCE es POSITIVO: el negocio financia días de operación de su bolsillo, y a la tasa del descubierto eso cuesta plata. Cada día menos de ciclo libera caja cara.',
          bad: 'El CCE es NEGATIVO: son los proveedores y clientes los que financian la operación (modelo supermercado). El negocio cobra antes de pagar: caja a favor.',
          xl: 'IF([cce]>0,"CCE POSITIVO de "&TEXT([cce],"0")&" dias: el negocio financia "&TEXT([cajaInmov],"#,##0")&" de su bolsillo, con un costo anual de "&TEXT([costoCiclo],"#,##0")&". Cada dia menos libera caja.","CCE NEGATIVO: proveedores y clientes financian la operacion. Caja a favor.")',
        },
      ],
      chart: { sweepKey: 'dio', outKey: 'cce', xLabel: 'DIO (días)', yLabel: 'CCE (días)', yFmt: 'days' },
    },
    promptConcepts: ['CCE = DSO + DIO − DPO', 'Días de operación que financia el propio negocio', 'Caja inmovilizada = CCE/365 × Ventas', 'Costo del ciclo = caja inmovilizada × tasa del descubierto', 'CCE negativo: el modelo donde proveedores y clientes te financian'],
  },

  {
    id: 's07-i3',
    week: 7,
    order: 3,
    title: 'Matriz ABC/XYZ de inventario',
    subtitle: 'Clasificar el stock por valor (ABC) y por variabilidad de demanda (XYZ)',
    framework: 'matrices-operativas · ABC/XYZ',
    theory: [
      {
        heading: 'No todo el stock pesa ni se mueve igual',
        paragraphs: [
          'La matriz **ABC/XYZ** parte de una verdad incómoda: gestionar todos los SKUs con el mismo cuidado es desperdiciar esfuerzo. La clasificación **ABC** ordena los ítems por **valor** (consumo anual = precio × volumen) con la regla de **Pareto**: la clase **A** son pocos ítems (~10-20%) que concentran ~70-80% del valor; la **B** son intermedios; la **C** son muchos ítems que pesan poco (~5-10%). Ahí está el dinero.',
          'La clasificación **XYZ** ordena por **variabilidad de la demanda**, medida con el coeficiente de variación (CV = desvío / media): **X** es demanda estable y predecible (CV bajo), **Y** es variable o estacional (CV medio), **Z** es errática e impredecible (CV alto). Ahí está el riesgo de quiebre o de capital muerto.',
          'Cruzadas, dan una matriz **3×3** (AX, AY, AZ … CZ) donde cada celda recibe una política distinta. La **AX** (mucho valor, demanda estable) es el candidato ideal a **JIT / stock mínimo**: libera capital sin riesgo de quiebre. La **CZ** (poco valor, errática) es candidata a **descontinuación**: capital muerto. En **Andina**, parte del inventario de 2400 incluye ~420 de mercadería obsoleta de lenta rotación: pura clase C/Z a costo histórico que a mercado vale menos.',
        ],
      },
      {
        heading: 'Un modelo de indicadores, no una grilla',
        paragraphs: [
          'Para volverlo accionable sin armar la grilla completa, basta con un **modelo de concentración**: si la clase A es, digamos, el 15% de los SKUs pero el 80% del valor del inventario, ese 80% es donde se concentra toda la gestión fina. El **valor inmovilizado en A** = % valor A × inventario total dice cuánta plata depende de un puñado de ítems.',
          'El segundo indicador es el **capital liberable**: sobre la porción **AX** (alto valor + demanda estable) se puede aplicar una política JIT que recorte el stock un porcentaje sin riesgo de quiebre. Ese recorte es **caja que vuelve** directo. Y sobre la cola **C/Z** (bajo valor, errática) se identifica el **stock muerto** candidato a liquidación.',
          'El resultado es un mapa de prioridades: dónde apretar (A), dónde el riesgo es la variabilidad (Z) y dónde simplemente dejar de gestionar fino (C). Combinado con el **GMROI** por SKU (margen bruto que devuelve cada peso invertido en stock), define qué se compra, cuánto y con qué frecuencia.',
        ],
      },
      {
        heading: 'Interrelaciones y debilidades',
        paragraphs: [
          '**Interrelación clave:** la ABC/XYZ ataca directamente el **DIO** (ítem 1): recortar stock en la clase A y liquidar la cola C/Z baja los días de inventario, comprime el **CCE** (ítem 2), libera capital de trabajo, baja el Capital Invertido y **sube el ROIC** (spread ROIC − WACC, Semana 9). Es la cadena value-driver completa, arrancando en un depósito.',
          '**Debilidades a tener presentes:** la ABC ignora la variabilidad (por eso se complementa con XYZ); la XYZ necesita historia de datos (problemático para SKUs nuevos o en mercados volátiles); los cortes son arbitrarios; y los ítems **migran de celda** (un producto pasa de AX a AZ por un cambio de demanda), así que la clasificación se revisa trimestral o semestralmente. No es una foto: es una película.',
        ],
      },
    ],
    model: {
      excelTitle: 'Matriz ABC/XYZ — concentración y capital liberable',
      inputs: [
        { key: 'invTotal', label: 'Inventario total', value: 2400, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'pctSkuA', label: '% de SKUs en clase A', value: 0.15, min: 0.05, max: 0.4, step: 0.01, fmt: 'pct' },
        { key: 'pctValorA', label: '% del valor en clase A (Pareto)', value: 0.8, min: 0.4, max: 0.95, step: 0.01, fmt: 'pct' },
        { key: 'pctAX', label: '% del valor A que es AX (demanda estable)', value: 0.5, min: 0, max: 1, step: 0.05, fmt: 'pct' },
        { key: 'recorteJIT', label: 'Recorte de stock posible en AX (JIT)', value: 0.4, min: 0, max: 0.7, step: 0.05, fmt: 'pct' },
        { key: 'pctMuertoCZ', label: '% del inventario que es stock muerto (C/Z)', value: 0.18, min: 0, max: 0.4, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'valorA', label: 'Valor inmovilizado en clase A', fmt: 'money', highlight: true, calc: (v) => v.invTotal * v.pctValorA, xl: '[invTotal]*[pctValorA]' },
        { key: 'concentracion', label: 'Concentración (valor A ÷ SKUs A)', fmt: 'x', calc: (v) => v.pctValorA / v.pctSkuA, xl: '[pctValorA]/[pctSkuA]' },
        { key: 'capitalLiberable', label: 'Capital liberable por JIT en AX', fmt: 'money', highlight: true, calc: (v) => v.invTotal * v.pctValorA * v.pctAX * v.recorteJIT, xl: '[invTotal]*[pctValorA]*[pctAX]*[recorteJIT]' },
        { key: 'stockMuerto', label: 'Stock muerto a liquidar (C/Z)', fmt: 'money', calc: (v) => v.invTotal * v.pctMuertoCZ, xl: '[invTotal]*[pctMuertoCZ]' },
        { key: 'cajaTotal', label: 'Caja total recuperable', fmt: 'money', calc: (v) => v.invTotal * v.pctValorA * v.pctAX * v.recorteJIT + v.invTotal * v.pctMuertoCZ, xl: '[capitalLiberable]+[stockMuerto]' },
      ],
      conclusions: [
        {
          test: (v) => v.pctValorA / v.pctSkuA >= 3,
          good: 'Hay fuerte concentración Pareto: un puñado de SKUs (clase A) acapara la mayor parte del valor. Ahí va la gestión fina (JIT en AX) y de ahí sale el grueso de la caja liberable.',
          bad: 'La concentración es baja: el valor está repartido entre muchos SKUs. La palanca JIT rinde menos; conviene atacar primero el stock muerto C/Z y revisar los cortes ABC.',
          xl: 'IF([concentracion]>=3,"Fuerte concentracion Pareto ("&TEXT([concentracion],"0.0")&"x): la clase A acapara "&TEXT([valorA],"#,##0")&". JIT en AX libera "&TEXT([capitalLiberable],"#,##0")&"; total recuperable "&TEXT([cajaTotal],"#,##0")&".","Concentracion baja ("&TEXT([concentracion],"0.0")&"x): valor repartido. Atacar primero el stock muerto C/Z.")',
        },
      ],
      chart: { sweepKey: 'recorteJIT', outKey: 'capitalLiberable', xLabel: 'Recorte JIT en AX', yLabel: 'Capital liberable', yFmt: 'money' },
    },
    promptConcepts: ['Clasificación ABC por valor (Pareto: clase A = pocos SKUs, mucho valor)', 'Clasificación XYZ por variabilidad de demanda (CV = desvío/media)', 'Matriz 3×3 y política por celda (AX → JIT, CZ → descontinuar)', 'Concentración y capital liberable por JIT en la clase AX', 'Cómo la ABC/XYZ baja el DIO, comprime el CCE y sube el ROIC'],
  },

  {
    id: 's07-i4',
    week: 7,
    order: 4,
    title: 'Matriz de aging-reclamo de cobranzas',
    subtitle: 'Tramos de vencido × intensidad de gestión, y cuánto se espera recuperar',
    framework: 'matrices-operativas · aging-reclamo',
    theory: [
      {
        heading: 'La cartera como mapa de acción',
        paragraphs: [
          'La matriz de **aging-reclamo** convierte las cuentas por cobrar en un mapa de acción cruzando dos dimensiones. En un eje, el **aging** de la deuda (tramos: corriente / no vencida, 1-30, 31-60, 61-90, +90 días de vencido). En el otro, la **intensidad de la gestión de cobranza** (días desde el último reclamo, o cantidad de reclamos). El cruce identifica la **zona crítica**: cuentas muy vencidas **y** poco o nada reclamadas, el máximo riesgo de incobrabilidad por **negligencia de gestión**, no solo de crédito.',
          'Cada celda recibe una **acción concreta**: recordatorio preventivo en lo corriente, llamada de cortesía en lo recién vencido, intimación formal y freno de crédito en los tramos medios, derivación a legales y previsión total en el +90 sin reclamo. La diagonal "bien gestionada" (vencido pero reclamado a tiempo) tiene mejor pronóstico de recupero que la columna de los abandonados.',
          'En **Andina**, de los 1850 de cuentas por cobrar hay **290 de mora mayor a 120 días con baja probabilidad de cobro**: el valor real de la cartera es menor al contable. Esos 290 son, casi con seguridad, la celda crítica +90 sin gestión: plata que la contabilidad sigue mostrando como activo pero que la cobranza ya perdió de vista.',
        ],
      },
      {
        heading: 'Un modelo numérico de recupero esperado',
        paragraphs: [
          'Sin armar la grilla completa, el modelo accionable asigna a cada **tramo de aging** un monto y una **probabilidad de recupero** decreciente con el vencimiento (lo corriente cobra casi todo; el +90 sin gestión, casi nada). El **recupero esperado** = Σ (monto del tramo × prob. de recupero del tramo), y el complemento es la **previsión por incobrables** que hay que reconocer.',
          'El segundo indicador es la **calidad de la cartera**: % recuperable esperado = recupero esperado ÷ cartera total. Una cartera "joven" y gestionada puede recuperar más del 90%; una envejecida y abandonada, mucho menos. Y el **riesgo concentrado en la zona crítica** (monto del +90 sin reclamo) mide cuánta plata está en el peor cuadrante, donde la acción de cobranza tiene el mayor retorno marginal.',
          'La lectura es directa: concentrar el equipo de cobranzas en la columna de los tramos vencidos y mal gestionados es la **acción de mayor retorno**. Reducir ese monto acelera el cobro, sube el % recuperable y baja la previsión que castiga el resultado.',
        ],
      },
      {
        heading: 'Interrelaciones y debilidades',
        paragraphs: [
          '**Interrelación clave:** la matriz ataca el **DSO** (ítem 1): acelerar el cobro de los tramos vencidos baja los días de cobranza, comprime el **CCE** (ítem 2), libera capital de trabajo y **sube el ROIC** (Semana 9). Además ancla el cálculo de la **previsión por incobrables**, que impacta directo el resultado y el valor real del activo (la brecha book vs. real de Andina).',
          '**Debilidades:** requiere datos de gestión bien registrados (CRM/cobranzas), inexistentes en muchas PyMEs; no captura la capacidad real de pago (un cliente bien gestionado puede igual quebrar); puede tensar relaciones con clientes estratégicos si la acción es desproporcionada; y el aging se distorsiona con refinanciaciones. Es una herramienta de **priorización**, no un oráculo de cobro.',
        ],
      },
    ],
    model: {
      excelTitle: 'Aging-reclamo — recupero esperado y previsión',
      inputs: [
        { key: 'corriente', label: 'Corriente / no vencido', value: 1000, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 't1', label: 'Vencido 1-60 días', value: 360, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 't2', label: 'Vencido 61-120 días', value: 200, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'critico', label: '+120 días sin gestión (zona crítica)', value: 290, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'pRec1', label: 'Prob. recupero tramo 1-60', value: 0.85, min: 0, max: 1, step: 0.05, fmt: 'pct' },
        { key: 'pRec2', label: 'Prob. recupero tramo 61-120', value: 0.55, min: 0, max: 1, step: 0.05, fmt: 'pct' },
        { key: 'pRecCrit', label: 'Prob. recupero zona crítica', value: 0.15, min: 0, max: 1, step: 0.05, fmt: 'pct' },
      ],
      calcs: [
        { key: 'cartera', label: 'Cartera total', fmt: 'money', calc: (v) => v.corriente + v.t1 + v.t2 + v.critico, xl: '[corriente]+[t1]+[t2]+[critico]' },
        { key: 'recuperoEsp', label: 'Recupero esperado', fmt: 'money', highlight: true, calc: (v) => v.corriente + v.t1 * v.pRec1 + v.t2 * v.pRec2 + v.critico * v.pRecCrit, xl: '[corriente]+[t1]*[pRec1]+[t2]*[pRec2]+[critico]*[pRecCrit]' },
        { key: 'pctRecuperable', label: '% recuperable esperado', fmt: 'pct', highlight: true, calc: (v) => (v.corriente + v.t1 * v.pRec1 + v.t2 * v.pRec2 + v.critico * v.pRecCrit) / (v.corriente + v.t1 + v.t2 + v.critico), xl: '[recuperoEsp]/[cartera]' },
        { key: 'prevision', label: 'Previsión por incobrables', fmt: 'money', calc: (v) => v.corriente + v.t1 + v.t2 + v.critico - (v.corriente + v.t1 * v.pRec1 + v.t2 * v.pRec2 + v.critico * v.pRecCrit), xl: '[cartera]-[recuperoEsp]' },
        { key: 'riesgoCritico', label: 'Riesgo en zona crítica (% cartera)', fmt: 'pct', calc: (v) => v.critico / (v.corriente + v.t1 + v.t2 + v.critico), xl: '[critico]/[cartera]' },
      ],
      conclusions: [
        {
          test: (v) => v.critico / (v.corriente + v.t1 + v.t2 + v.critico) <= 0.1,
          good: 'La zona crítica (+120 sin gestión) pesa poco en la cartera: el riesgo de incobrabilidad por negligencia está contenido. El % recuperable se sostiene alto.',
          bad: 'La zona crítica concentra demasiada cartera: hay plata abandonada en el peor cuadrante. Ahí está el mayor retorno de cobranza y la mayor previsión que castiga el resultado.',
          xl: 'IF([riesgoCritico]<=0.1,"Zona critica contenida ("&TEXT([riesgoCritico],"0.0%")&" de la cartera). Recupero esperado "&TEXT([recuperoEsp],"#,##0")&" ("&TEXT([pctRecuperable],"0.0%")&" recuperable).","Zona critica alta ("&TEXT([riesgoCritico],"0.0%")&"): plata abandonada. Prevision "&TEXT([prevision],"#,##0")&". Ahi esta el mayor retorno de cobranza.")',
        },
      ],
      chart: { sweepKey: 'critico', outKey: 'pctRecuperable', xLabel: 'Zona crítica (+120 días)', yLabel: '% recuperable', yFmt: 'pct' },
    },
    promptConcepts: ['Aging × intensidad de reclamo: la zona crítica (+vencido y sin gestión)', 'Recupero esperado = Σ (monto del tramo × prob. de recupero)', '% recuperable y previsión por incobrables como complemento', 'Acción concreta por celda (recordatorio → intimación → legales)', 'Cómo acelerar cobranza baja el DSO, comprime el CCE y sube el ROIC'],
  },

  {
    id: 's07-i5',
    week: 7,
    order: 5,
    title: 'Proveedores como financiamiento NO oneroso',
    subtitle: 'Estirar el DPO sin costo: el "buen" pasivo del capital de trabajo',
    framework: 'Capital de trabajo · financiamiento espontáneo',
    theory: [
      {
        heading: 'El pasivo que no cobra interés',
        paragraphs: [
          'No todos los pasivos son iguales. El descubierto, los préstamos y los cheques descontados son **deuda onerosa**: cobran tasa, y en una economía emergente esa tasa es brutal. Los **proveedores comerciales**, en cambio, son **financiamiento NO oneroso**: si pagás a 60 o 90 días sin recargo, el proveedor te está financiando la operación **gratis**. Es el "buen" pasivo, el que conviene maximizar antes de tocar el banco.',
          'Estirar el **DPO** (ítem 1) dentro del plazo pactado libera caja sin costo financiero: cada día más de plazo de proveedor es un día menos de descubierto al 85%. En **Andina**, los proveedores comerciales (1280) son justamente el componente que la nota del balance marca como "el buen pasivo si se negocia bien", frente al descubierto caro (540 al 85%) que tapa los baches de caja.',
          'La clave es que este financiamiento es **espontáneo**: crece naturalmente con la operación (a más compras, más proveedores), no requiere garantías ni trámite bancario, y sustituye deuda cara. Por eso negociar plazo con proveedores suele ser la fuente de financiamiento más barata y subutilizada de una PyME.',
        ],
      },
      {
        heading: 'El límite: cuándo estirar deja de ser gratis',
        paragraphs: [
          'El financiamiento de proveedores es gratis **solo si no hay penalidad**. Muchos proveedores ofrecen un **descuento por pronto pago** (por ejemplo, 2% si pagás a 10 días en vez de a 60). Renunciar a ese descuento para estirar el pago **tiene un costo implícito**, y suele ser altísimo en tasa anualizada: el costo de oportunidad de no aprovechar el descuento.',
          'La fórmula del **costo de renunciar al descuento** es: [descuento / (1 − descuento)] × [365 / (plazo total − plazo pronto pago)]. Un 2% por pagar 50 días antes equivale a una tasa anual del orden del **37%**. Si esa tasa es **menor** que la del descubierto, conviene tomar el descuento (financiarse con el banco sale más caro); si es **mayor**, conviene estirar el pago y resignar el descuento.',
          'Ese es el verdadero análisis: comparar el **costo implícito de estirar** (perder el descuento) contra el **costo de la deuda onerosa** que se evita. El DPO se estira hasta el punto donde el financiamiento de proveedores deja de ser más barato que la alternativa, no un día más, para no dañar la relación comercial ni el crédito.',
        ],
      },
      {
        heading: 'Interrelaciones y errores frecuentes',
        paragraphs: [
          '**Interrelación clave:** subir el DPO (ítem 1) baja el **CCE** (ítem 2) restando días, libera capital de trabajo y reduce la deuda onerosa, bajando el costo financiero que en Andina se "come" la utilidad (intereses de 560 sobre un EBIT de 830). Menos capital de trabajo financiado con descubierto significa mayor ROIC y mejor spread ROIC − WACC (Semana 9).',
          '**Errores frecuentes:** estirar a ciegas resignando descuentos jugosos (financiarse con proveedores caros sin darse cuenta); pagar siempre al contado "por las dudas" desperdiciando financiamiento gratis; y no diferenciar el pasivo oneroso del no oneroso al mirar el endeudamiento total. El objetivo no es deber menos: es deber **barato** y cobrar **rápido**.',
        ],
      },
    ],
    model: {
      excelTitle: 'Proveedores — financiamiento no oneroso vs. descuento',
      inputs: [
        { key: 'compras', label: 'Compras anuales (a CMV)', value: 5740, min: 500, max: 15000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'dpoActual', label: 'DPO actual (días de pago)', value: 81, min: 0, max: 200, step: 1, fmt: 'days' },
        { key: 'dpoObjetivo', label: 'DPO objetivo (días)', value: 110, min: 0, max: 200, step: 1, fmt: 'days' },
        { key: 'descuento', label: 'Descuento por pronto pago', value: 0.02, min: 0, max: 0.1, step: 0.005, fmt: 'pct' },
        { key: 'plazoPP', label: 'Plazo de pronto pago (días)', value: 10, min: 0, max: 60, step: 1, fmt: 'days' },
        { key: 'plazoTotal', label: 'Plazo total ofrecido (días)', value: 60, min: 1, max: 180, step: 1, fmt: 'days' },
        { key: 'tasaDesc', label: 'Costo del descubierto (TNA)', value: 0.85, min: 0, max: 1.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'cajaLiberada', label: 'Caja liberada por estirar el DPO', fmt: 'money', highlight: true, calc: (v) => ((v.dpoObjetivo - v.dpoActual) / 365) * v.compras, xl: '([dpoObjetivo]-[dpoActual])/365*[compras]' },
        { key: 'ahorroFin', label: 'Ahorro financiero anual (vs descubierto)', fmt: 'money', calc: (v) => ((v.dpoObjetivo - v.dpoActual) / 365) * v.compras * v.tasaDesc, xl: '[cajaLiberada]*[tasaDesc]' },
        { key: 'costoEstirar', label: 'Costo implícito de resignar el descuento', fmt: 'pct', highlight: true, calc: (v) => (v.descuento / (1 - v.descuento)) * (365 / (v.plazoTotal - v.plazoPP)), xl: '[descuento]/(1-[descuento])*(365/([plazoTotal]-[plazoPP]))' },
      ],
      conclusions: [
        {
          test: (v) => (v.descuento / (1 - v.descuento)) * (365 / (v.plazoTotal - v.plazoPP)) > v.tasaDesc,
          good: 'Resignar el descuento sale MÁS caro que el descubierto: conviene tomar el pronto pago. El financiamiento de proveedores ya no es el más barato en este caso.',
          bad: 'Estirar el pago sale más barato que el descubierto: conviene resignar el descuento y financiarse con el proveedor. Es financiamiento no oneroso bien usado.',
          xl: 'IF([costoEstirar]>[tasaDesc],"Resignar el descuento ("&TEXT([costoEstirar],"0.0%")&" anual) sale MAS caro que el descubierto ("&TEXT([tasaDesc],"0.0%")&"): tomar el pronto pago.","Estirar el DPO libera "&TEXT([cajaLiberada],"#,##0")&" y ahorra "&TEXT([ahorroFin],"#,##0")&" vs descubierto. Costo de estirar "&TEXT([costoEstirar],"0.0%")&" < "&TEXT([tasaDesc],"0.0%")&": conviene financiarse con el proveedor.")',
        },
      ],
      chart: { sweepKey: 'dpoObjetivo', outKey: 'cajaLiberada', xLabel: 'DPO objetivo', yLabel: 'Caja liberada', yFmt: 'money' },
    },
    promptConcepts: ['Proveedores = financiamiento NO oneroso (sin interés) vs. deuda onerosa', 'Estirar el DPO libera caja y sustituye descubierto caro', 'Financiamiento espontáneo que crece con la operación', 'Costo implícito de resignar el descuento por pronto pago', 'Cuándo estirar el pago deja de ser más barato que el banco'],
  },
]
