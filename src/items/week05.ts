import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 5 — Económico vs Financiero (liquidez, solvencia y apalancamiento)
// Incorpora: value-generation-emerging-markets (GAO/GAF/GAT, doble apalancamiento,
// riesgo operativo vs financiero) y value-driver-interrelations (GAT → riesgo
// integrado, eje de riesgo en paralelo al eje de valor).
// Caso central: Andina Manufacturas S.A.
// ============================================================================

export const week05: ItemSpec[] = [
  {
    id: 's05-i1',
    week: 5,
    order: 1,
    title: 'Liquidez: ¿la empresa puede pagar mañana?',
    subtitle: 'Razón corriente, prueba ácida y ratio de caja en Andina',
    framework: 'Análisis de liquidez · capital de trabajo',
    theory: [
      {
        heading: 'Tres lupas con distinto aumento',
        paragraphs: [
          'La **liquidez** mide si la empresa puede cubrir sus obligaciones de corto plazo con los activos que se convierten en efectivo pronto. No habla de si el negocio es rentable —eso es lo **económico**—, sino de si la caja alcanza para llegar a fin de mes: es la dimensión **financiera**. Una empresa puede ganar plata y, aun así, ahogarse por falta de liquidez. Andina Manufacturas es exactamente ese caso: muestra utilidad contable pero vive tensionando la caja con descubierto y cheques diferidos.',
          'La **razón corriente** (Activo Corriente / Pasivo Corriente) es la lupa más gruesa: cuántos pesos de activo corriente hay por cada peso que vence en el corto plazo. La **prueba ácida** afina y resta los inventarios, porque el stock es lo más difícil de convertir en caja rápido —y en Andina hay 420 de mercadería obsoleta inflando ese inventario—. El **ratio de caja** es la lupa más exigente: solo cuenta caja, bancos e inversiones transitorias contra el pasivo corriente. Responde la pregunta brutal: "si todos los acreedores golpean la puerta hoy, ¿con qué les pago?".',
          'En Andina la caja operativa es de apenas **180** y el descubierto bancario, de **540**: la sola caja no cubre ni el producto financiero más caro y urgente. Por eso el ratio de caja es la métrica que más rápido enciende la alarma, mientras la razón corriente —cargada de cuentas por cobrar lentas e inventario obsoleto— todavía luce engañosamente cómoda.',
        ],
      },
      {
        heading: 'De dónde sale cada número',
        paragraphs: [
          'El **Activo Corriente** suma caja y bancos, inversiones transitorias, cuentas por cobrar, otros créditos e inventarios (del balance). El **Pasivo Corriente** suma descubierto, cheques diferidos, proveedores, préstamos de corto plazo y cargas fiscales y sociales. La prueba ácida quita del numerador el **inventario**; el ratio de caja deja solo los **activos líquidos inmediatos** (caja + inversiones transitorias).',
          'El umbral clásico de razón corriente es **1,5–2** y el de prueba ácida, cerca de **1**, pero son referencias, no leyes: un supermercado sano vive con razón corriente menor a 1 porque cobra al contado y paga a proveedores a 60 días. Lo que importa es la **calidad** de los activos corrientes, no solo su monto. Andina tiene una razón corriente aceptable en el papel, pero está sostenida por activos de baja calidad: cobranzas que se estiran e inventario que no rota.',
        ],
      },
      {
        heading: 'Interrelación: liquidez, ciclo de efectivo y valor',
        paragraphs: [
          'La liquidez no es un compartimento aislado: es la consecuencia financiera del **Ciclo de Conversión de Efectivo (CCE)**. Cuando los días de inventario y de cobranza se estiran más rápido que los días de pago a proveedores, la caja queda atrapada en el capital de trabajo y la liquidez se deteriora. Ese capital atrapado, además, infla el **Capital Invertido** y por esa vía castiga el **ROIC** y el **EVA** (la creación de valor de las próximas semanas).',
          '**Interrelación clave:** la baja liquidez empuja a Andina al descubierto caro (TNA ~85%), lo que dispara los **intereses** —560 sobre un EBIT de 830— y prepara el terreno para el apalancamiento financiero peligroso de los ítems 4 y 5. Liquidez frágil hoy es destrucción de valor mañana. Por eso el eje **financiero** (¿puedo pagar?) se lee en paralelo, nunca confundido, con el eje **económico** (¿estoy creando valor?).',
        ],
      },
    ],
    model: {
      excelTitle: 'Liquidez de Andina (corriente, ácida, de caja)',
      inputs: [
        { key: 'caja', label: 'Caja, bancos e inversiones transitorias', value: 240, min: 0, max: 1500, step: 10, unit: 'k', fmt: 'num' },
        { key: 'cxc', label: 'Cuentas por cobrar y otros créditos', value: 2170, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'inv', label: 'Inventarios', value: 2400, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'pc', label: 'Pasivo corriente', value: 3250, min: 100, max: 8000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'ac', label: 'Activo corriente', fmt: 'num', calc: (v) => v.caja + v.cxc + v.inv, xl: '[caja]+[cxc]+[inv]' },
        { key: 'corriente', label: 'Razón corriente (AC / PC)', fmt: 'x', highlight: true, calc: (v) => (v.caja + v.cxc + v.inv) / v.pc, xl: '[ac]/[pc]' },
        { key: 'acida', label: 'Prueba ácida ((AC − Inv) / PC)', fmt: 'x', calc: (v) => (v.caja + v.cxc) / v.pc, xl: '([ac]-[inv])/[pc]' },
        { key: 'caja_ratio', label: 'Ratio de caja (Caja / PC)', fmt: 'x', calc: (v) => v.caja / v.pc, xl: '[caja]/[pc]' },
      ],
      conclusions: [
        {
          test: (v) => v.caja / v.pc >= 0.15,
          good: 'El ratio de caja es razonable: hay colchón líquido inmediato frente al pasivo corriente. Vigilá igual la CALIDAD de las cuentas por cobrar y del inventario, que sostienen la razón corriente.',
          bad: 'El ratio de caja es muy bajo: la sola caja no cubre las obligaciones inmediatas y la empresa depende del descubierto caro. La razón corriente puede lucir bien, pero está sostenida por activos de baja calidad (mora e inventario obsoleto).',
          xl: 'IF([caja_ratio]>=0.15,"Ratio de caja razonable ("&TEXT([caja_ratio],"0.00")&"x): hay colchon liquido. Vigila la CALIDAD de cobranzas e inventario que sostienen la razon corriente "&TEXT([corriente],"0.00")&"x.","Ratio de caja muy bajo ("&TEXT([caja_ratio],"0.00")&"x): la caja no cubre lo inmediato y se depende del descubierto. La razon corriente "&TEXT([corriente],"0.00")&"x luce bien pero con activos de baja calidad.")',
        },
      ],
      chart: { sweepKey: 'inv', outKey: 'acida', xLabel: 'Inventarios', yLabel: 'Prueba ácida', yFmt: 'x' },
    },
    promptConcepts: ['Razón corriente = AC / PC', 'Prueba ácida (AC − inventarios) / PC', 'Ratio de caja = activos líquidos / PC', 'Calidad vs. monto de los activos corrientes', 'Liquidez (financiero) ≠ rentabilidad (económico)'],
  },

  {
    id: 's05-i2',
    week: 5,
    order: 2,
    title: 'Solvencia: ¿aguanta el peso de la deuda?',
    subtitle: 'Deuda / Patrimonio y cobertura de intereses en Andina',
    framework: 'Análisis de solvencia · estructura de capital',
    theory: [
      {
        heading: 'De la foto de hoy al largo plazo',
        paragraphs: [
          'Si la liquidez mira el corto plazo, la **solvencia** mira el largo: ¿la empresa puede sostener toda su deuda con su patrimonio y su capacidad de generar resultado operativo? Es la diferencia entre poder pagar la cuenta de mañana y poder sostener la estructura de financiamiento durante años. Dos ratios la capturan: la **relación Deuda / Patrimonio** (cuánto debe la empresa por cada peso propio) y la **cobertura de intereses** (cuántas veces el EBIT alcanza para pagar los intereses).',
          'La **Deuda / Patrimonio** (D/PN) habla de la estructura: una empresa muy apalancada amplifica tanto las ganancias como las pérdidas, y queda a merced de los acreedores. La **cobertura de intereses** (EBIT / Intereses) habla del flujo: mide cuánto colchón hay entre lo que el negocio genera operativamente y lo que se lleva el costo financiero. Una cobertura de 1,5 significa que el EBIT apenas supera en 50% a los intereses: cualquier caída de ventas deja a la empresa sin con qué pagarlos.',
          'En Andina el **EBIT es 830** y los **intereses, 560**: la cobertura es de apenas **1,48 veces**. El negocio operativo es sólido, pero el costo de la deuda cara se come casi dos tercios del resultado operativo. Esa es la huella de una empresa que económicamente funciona pero financieramente está al filo.',
        ],
      },
      {
        heading: 'Solo importa la deuda onerosa',
        paragraphs: [
          'Una sutileza clave: no toda deuda pesa igual. Los **proveedores comerciales** son financiamiento **no oneroso** (no cobran interés explícito si se paga en término): son el "buen" pasivo. La **deuda onerosa** —descubierto, cheques diferidos, préstamos bancarios— es la que devenga intereses y la que verdaderamente compromete la solvencia. Para el análisis fino conviene mirar la deuda **financiera** sobre patrimonio, no el pasivo total.',
          'En Andina la deuda onerosa (descubierto 540 + cheques + préstamos de corto y largo plazo) es alta y, sobre todo, **cara**: el descubierto tiene una TNA cercana al 85%. No es un problema de cantidad de deuda solamente, sino de su **costo**. Una misma relación D/PN es muchísimo más peligrosa con tasas locales altas que con tasas de manual estadounidense.',
        ],
      },
      {
        heading: 'Interrelación: solvencia, GAF y riesgo de quiebra',
        paragraphs: [
          'La cobertura de intereses es la antesala del **Grado de Apalancamiento Financiero (GAF)** del ítem 4: matemáticamente, GAF = EBIT / (EBIT − Intereses), y la cobertura es EBIT / Intereses. Cuando la cobertura se acerca a 1, el GAF se dispara y el riesgo financiero explota. La solvencia, el GAF y, más adelante, el **Altman Z′′** forman el **eje de riesgo** integrado del negocio.',
          '**Interrelación clave:** una empresa puede ser **solvente** (sobrevive, no quiebra) y a la vez **destruir valor** (su ROIC no supera al WACC). Son ejes ortogonales: la solvencia dice si la empresa sobrevive; la creación de valor, si vale la pena que sobreviva. Por eso este análisis financiero se lee en paralelo al análisis económico de las semanas siguientes, nunca como sustituto.',
        ],
      },
    ],
    model: {
      excelTitle: 'Solvencia de Andina (D/PN y cobertura)',
      inputs: [
        { key: 'deuda', label: 'Deuda onerosa (descubierto + cheques + préstamos)', value: 2570, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'pn', label: 'Patrimonio neto', value: 2770, min: 100, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Intereses (resultados financieros)', value: 560, min: 1, max: 2000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'dpn', label: 'Deuda / Patrimonio (D/PN)', fmt: 'x', calc: (v) => v.deuda / v.pn, xl: '[deuda]/[pn]' },
        { key: 'cobertura', label: 'Cobertura de intereses (EBIT / Int.)', fmt: 'x', highlight: true, calc: (v) => v.ebit / v.intereses, xl: '[ebit]/[intereses]' },
        { key: 'colchon', label: 'Colchón sobre intereses (EBIT − Int.)', fmt: 'num', calc: (v) => v.ebit - v.intereses, xl: '[ebit]-[intereses]' },
      ],
      conclusions: [
        {
          test: (v) => v.ebit / v.intereses >= 2,
          good: 'La cobertura de intereses es ≥ 2: el EBIT más que duplica los intereses y hay colchón ante una caída de ventas. La solvencia está bajo control, pero vigilá la relación D/PN y el COSTO de la deuda.',
          bad: 'La cobertura de intereses es < 2: el resultado operativo apenas alcanza para pagar los intereses. Cualquier caída de ventas deja a la empresa sin con qué cubrir el costo financiero. Acá vive Andina: EBIT 830 vs intereses 560.',
          xl: 'IF([cobertura]>=2,"Cobertura "&TEXT([cobertura],"0.00")&"x (>=2): el EBIT mas que duplica los intereses, hay colchon. Vigila D/PN "&TEXT([dpn],"0.00")&"x y el costo de la deuda.","Cobertura "&TEXT([cobertura],"0.00")&"x (<2): el operativo apenas paga intereses. Una caida de ventas deja sin con que cubrir el costo financiero.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'cobertura', xLabel: 'Intereses', yLabel: 'Cobertura', yFmt: 'x' },
    },
    promptConcepts: ['Deuda / Patrimonio (estructura de capital)', 'Cobertura de intereses = EBIT / Intereses', 'Deuda onerosa vs. financiamiento no oneroso (proveedores)', 'El costo de la deuda importa tanto como su monto', 'Solvencia (sobrevivir) ≠ creación de valor (valer la pena)'],
  },

  {
    id: 's05-i3',
    week: 5,
    order: 3,
    title: 'GAO: cómo los costos fijos amplifican el EBIT',
    subtitle: 'Grado de Apalancamiento Operativo y el riesgo del negocio',
    framework: 'GAO · value-generation-emerging-markets',
    theory: [
      {
        heading: 'La palanca de los costos fijos',
        paragraphs: [
          'El **Grado de Apalancamiento Operativo (GAO)** mide cuánto se amplifica el **EBIT** ante un cambio en las **ventas**. Es la elasticidad del resultado operativo: GAO = Δ%EBIT / Δ%Ventas. Si el GAO es 3, una suba de ventas del 10% hace subir el EBIT un 30%… pero una caída del 10% lo hunde otro 30%. La palanca amplifica en las dos direcciones.',
          'El motor de esa amplificación son los **costos fijos operativos**: la planta, la estructura, los sueldos del personal no productivo. Cuanto mayor es la proporción de costos fijos sobre el total, más se amplifican las variaciones de ventas en el EBIT, porque esos costos no bajan cuando las ventas caen. La fórmula operativa lo muestra: **GAO = Margen de Contribución / EBIT = (Ventas − Costos Variables) / EBIT**.',
          'El GAO es la medida del **riesgo operativo** o **riesgo del negocio**: cuán expuesto está el resultado a los vaivenes de la demanda. Una empresa intensiva en capital fijo (como Andina, con su planta metalmecánica) tiene GAO alto y es más vulnerable a las recesiones; un negocio con costos mayormente variables amortigua mejor las caídas.',
        ],
      },
      {
        heading: 'De dónde sale cada número',
        paragraphs: [
          'El **Margen de Contribución** es Ventas menos Costos Variables (lo que varía con el volumen: materia prima, mano de obra directa, comisiones). El **EBIT** es el Margen de Contribución menos los Costos Fijos operativos. La diferencia entre ambos —los costos fijos— es justamente lo que genera la palanca: a más costos fijos, mayor distancia entre margen de contribución y EBIT, y mayor GAO.',
          'En Andina, con ventas de 8200 y un EBIT de 830, hay que estimar qué parte del CMV y de los gastos es fija. Cuanto más alta sea esa porción fija, más alto el GAO y más sensible el EBIT a una caída de ventas. Moverlo en el simulador muestra cómo la estructura de costos define el perfil de riesgo del negocio antes de hablar de deuda.',
        ],
      },
      {
        heading: 'Interrelación: GAO, GAF y el doble apalancamiento',
        paragraphs: [
          'El GAO no se lee solo: se combina con el **GAF** (ítem 4) para formar el **GAT** (ítem 5). La regla de oro de la gestión de riesgo dice: si tenés **alto GAO** (negocio muy expuesto a costos fijos), conviene mantener **bajo GAF** (poca deuda), y viceversa. Acumular alto GAO con alto GAF es el temido **doble apalancamiento**, destructor de empresas en las recesiones de los mercados emergentes.',
          '**Interrelación clave:** el GAO conecta con el **punto de equilibrio** (a más costos fijos, más ventas se necesitan para no perder) y, vía el riesgo, con el **WACC**: un negocio operativamente riesgoso tiene beta más alta y exige más retorno. Decisiones como tercerizar producción (bajar fijos) o invertir en planta (subir fijos) cambian el GAO y, con él, todo el perfil de riesgo-retorno de la firma.',
        ],
      },
    ],
    model: {
      excelTitle: 'GAO de Andina (apalancamiento operativo)',
      inputs: [
        { key: 'ventas', label: 'Ventas netas', value: 8200, min: 1000, max: 20000, step: 100, unit: 'k', fmt: 'num' },
        { key: 'cv', label: 'Costos variables', value: 5740, min: 0, max: 18000, step: 100, unit: 'k', fmt: 'num' },
        { key: 'cf', label: 'Costos fijos operativos', value: 1630, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'caidaVentas', label: 'Escenario: caída de ventas', value: 0.1, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'mc', label: 'Margen de contribución (V − CV)', fmt: 'num', calc: (v) => v.ventas - v.cv, xl: '[ventas]-[cv]' },
        { key: 'ebit', label: 'EBIT (MC − CF)', fmt: 'num', calc: (v) => v.ventas - v.cv - v.cf, xl: '[mc]-[cf]' },
        { key: 'gao', label: 'GAO (MC / EBIT)', fmt: 'x', highlight: true, calc: (v) => (v.ventas - v.cv) / (v.ventas - v.cv - v.cf), xl: '[mc]/[ebit]' },
        { key: 'caidaEbit', label: 'Caída del EBIT en el escenario', fmt: 'pct', calc: (v) => ((v.ventas - v.cv) / (v.ventas - v.cv - v.cf)) * v.caidaVentas, xl: '[gao]*[caidaVentas]' },
      ],
      conclusions: [
        {
          test: (v) => (v.ventas - v.cv) / (v.ventas - v.cv - v.cf) <= 2,
          good: 'El GAO es moderado (≤ 2): los costos fijos amplifican poco las variaciones de ventas. El negocio amortiguará razonablemente una caída de demanda. Hay margen para tomar algo de deuda (GAF) sin acumular riesgo.',
          bad: 'El GAO es alto (> 2): los costos fijos amplifican fuerte las caídas de ventas. Una baja de demanda hunde el EBIT mucho más que proporcionalmente. CUIDADO con sumar deuda (GAF): el doble apalancamiento es destructor en recesión.',
          xl: 'IF([gao]<=2,"GAO moderado "&TEXT([gao],"0.00")&"x: los costos fijos amplifican poco. Hay margen para algo de deuda sin acumular riesgo.","GAO alto "&TEXT([gao],"0.00")&"x: una caida de ventas hunde el EBIT mas que proporcional ("&TEXT([caidaEbit],"0.0%")&" ante "&TEXT([caidaVentas],"0.0%")&" de caida). Cuidado con sumar deuda: doble apalancamiento.")',
        },
      ],
      chart: { sweepKey: 'cf', outKey: 'gao', xLabel: 'Costos fijos', yLabel: 'GAO', yFmt: 'x' },
    },
    promptConcepts: ['GAO = Δ%EBIT / Δ%Ventas', 'GAO = Margen de Contribución / EBIT', 'Costos fijos como motor de la amplificación', 'GAO = riesgo operativo / riesgo del negocio', 'Alto GAO → conviene bajo GAF (evitar doble apalancamiento)'],
  },

  {
    id: 's05-i4',
    week: 5,
    order: 4,
    title: 'GAF: cómo los intereses amplifican el resultado neto',
    subtitle: 'Grado de Apalancamiento Financiero y el riesgo de la deuda',
    framework: 'GAF · value-generation-emerging-markets',
    theory: [
      {
        heading: 'La segunda palanca: los intereses fijos',
        paragraphs: [
          'El **Grado de Apalancamiento Financiero (GAF)** mide cuánto se amplifica el **resultado del accionista** (utilidad neta o UPA) ante un cambio en el **EBIT**. Es la elasticidad financiera: GAF = Δ%Utilidad Neta / Δ%EBIT. Si el GAF es 2, una suba del EBIT del 10% hace subir la utilidad neta un 20%… y una caída del 10% la hunde otro 20%. Igual que el GAO, amplifica en ambas direcciones.',
          'El motor acá son los **intereses**, que son un **costo fijo financiero**: hay que pagarlos llueva o truene, suba o baje el EBIT. La fórmula lo muestra: **GAF = EBIT / (EBIT − Intereses)**. Cuanto más grandes son los intereses respecto del EBIT, más chico es el denominador y más se dispara el GAF. Cuando los intereses se acercan al EBIT, el GAF tiende a infinito: la empresa está al borde de no cubrir su costo financiero.',
          'El GAF es la medida del **riesgo financiero**, el que la empresa **elige** al endeudarse (a diferencia del riesgo operativo, que viene con el negocio). Andina, con EBIT 830 e intereses 560, tiene un GAF alto: GAF = 830 / (830 − 560) = 830 / 270 ≈ **3,07**. Una caída del 10% en el EBIT le hunde la utilidad un 30%. Esa es la cara financiera de su problema.',
        ],
      },
      {
        heading: 'El espejo de la cobertura de intereses',
        paragraphs: [
          'El GAF es el reflejo matemático de la **cobertura de intereses** del ítem 2. Donde la cobertura mide cuántas veces el EBIT cubre los intereses (EBIT / Intereses), el GAF mide cuánto amplifican esos mismos intereses la volatilidad del resultado. Una cobertura baja (poco colchón) implica un GAF alto (mucha amplificación): son dos lecturas del mismo riesgo financiero.',
          'A diferencia del GAO —que depende de la estructura productiva y es difícil de cambiar en el corto plazo—, el GAF se puede gestionar directamente: refinanciando deuda cara, bajando el descubierto, reestructurando pasivos. En Andina, atacar el descubierto bancario al 85% sería la palanca más rápida para bajar el GAF y aliviar el resultado neto.',
        ],
      },
      {
        heading: 'Interrelación: GAF, estructura de capital y WACC',
        paragraphs: [
          'El GAF es la traducción operativa de la **estructura de capital**: cuánta deuda lleva la empresa y a qué costo. En el árbol de generadores de valor, más deuda sube el ROE (por el multiplicador del **DuPont**) pero también sube el riesgo financiero y, pasado el óptimo, el propio **WACC**. El GAF es la medida de "cuánto amplifica" esa estructura, y dialoga directamente con el costo del capital de las semanas siguientes.',
          '**Interrelación clave:** el GAF combinado con el **GAO** del ítem 3 da el **GAT** del ítem 5. Y hay un círculo virtuoso posible: si Andina libera caja del capital de trabajo (mejor CCE), reduce su necesidad de deuda cara, baja su Kd y su GAF, lo que reduce su riesgo y puede bajar el WACC —ampliando el spread de valor—. El riesgo financiero no es un destino: es una decisión que se gestiona.',
        ],
      },
    ],
    model: {
      excelTitle: 'GAF de Andina (apalancamiento financiero)',
      inputs: [
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Intereses (costo fijo financiero)', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'caidaEbit', label: 'Escenario: caída del EBIT', value: 0.1, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'uai', label: 'Resultado antes de impuestos (EBIT − Int.)', fmt: 'num', calc: (v) => v.ebit - v.intereses, xl: '[ebit]-[intereses]' },
        { key: 'gaf', label: 'GAF (EBIT / (EBIT − Int.))', fmt: 'x', highlight: true, calc: (v) => v.ebit / (v.ebit - v.intereses), xl: '[ebit]/[uai]' },
        { key: 'caidaUtil', label: 'Caída de la utilidad en el escenario', fmt: 'pct', calc: (v) => (v.ebit / (v.ebit - v.intereses)) * v.caidaEbit, xl: '[gaf]*[caidaEbit]' },
      ],
      conclusions: [
        {
          test: (v) => v.ebit / (v.ebit - v.intereses) <= 2,
          good: 'El GAF es moderado (≤ 2): los intereses amplifican poco la volatilidad del resultado. El riesgo financiero está controlado y hay margen para soportar una caída del EBIT sin comprometer la utilidad.',
          bad: 'El GAF es alto (> 2): los intereses amplifican fuerte cada movimiento del EBIT. Una caída del operativo se traslada multiplicada a la utilidad. Acá vive Andina (GAF ≈ 3): atacar la deuda cara (descubierto) es la palanca más urgente.',
          xl: 'IF([gaf]<=2,"GAF moderado "&TEXT([gaf],"0.00")&"x: los intereses amplifican poco. Riesgo financiero controlado.","GAF alto "&TEXT([gaf],"0.00")&"x: una caida del EBIT del "&TEXT([caidaEbit],"0.0%")&" hunde la utilidad "&TEXT([caidaUtil],"0.0%")&". Atacar la deuda cara es la palanca mas urgente.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'gaf', xLabel: 'Intereses', yLabel: 'GAF', yFmt: 'x' },
    },
    promptConcepts: ['GAF = Δ%Utilidad / Δ%EBIT', 'GAF = EBIT / (EBIT − Intereses)', 'Intereses como costo fijo financiero', 'GAF = riesgo financiero (elegido, no heredado)', 'GAF como espejo de la cobertura de intereses'],
  },

  {
    id: 's05-i5',
    week: 5,
    order: 5,
    title: 'GAT: el apalancamiento total y el punto de inflexión',
    subtitle: 'GAO × GAF y la caída exponencial cuando se acumula riesgo',
    framework: 'GAT · value-driver-interrelations',
    theory: [
      {
        heading: 'Las dos palancas en serie',
        paragraphs: [
          'El **Grado de Apalancamiento Total (GAT)** es el producto de las dos palancas anteriores: **GAT = GAO × GAF**. Mide cuánto se amplifica la **utilidad del accionista** ante un cambio en las **ventas**, atravesando los dos amplificadores en serie: primero los costos fijos operativos (GAO) llevan el cambio de ventas al EBIT, y luego los intereses (GAF) llevan ese cambio de EBIT a la utilidad neta.',
          'La fórmula compacta es **GAT = Margen de Contribución / (EBIT − Intereses)**. Si el GAT es 4, una caída de ventas del 10% derrumba la utilidad del accionista un 40%. Las dos palancas se **multiplican**, no se suman: por eso la combinación de un negocio con muchos costos fijos y mucha deuda es tan peligrosa. En Andina, con un GAO moderado-alto y un GAF cercano a 3, el GAT se ubica en una zona de alerta.',
          'El punto crucial es que el GAT no crece de forma lineal sino **exponencial** a medida que el EBIT se acerca a los intereses. Cuando el colchón (EBIT − Intereses) se achica, el GAT se dispara hacia el infinito: es el **punto de inflexión** donde una pequeña caída de ventas se convierte en una pérdida catastrófica. Cruzar ese umbral es lo que lleva a las empresas de "tensión de caja" a "default" en una sola mala temporada.',
        ],
      },
      {
        heading: 'El doble apalancamiento: la bomba de tiempo',
        paragraphs: [
          'Combinar **alto GAO** con **alto GAF** es el **doble apalancamiento**: el destructor de empresas en las recesiones de los mercados emergentes. En la expansión todo luce bien —las dos palancas amplifican las ganancias—, pero cuando las ventas caen, los costos fijos hunden el EBIT y los intereses fijos rematan la utilidad. La empresa que parecía sólida se desploma exponencialmente.',
          'La regla de gestión de riesgo es clara: **no acumular riesgo en los dos ejes a la vez**. Si el negocio es intensivo en costos fijos (alto GAO), hay que financiarse con poca deuda (bajo GAF). Si se va a tomar mucha deuda (alto GAF), conviene tener una estructura de costos flexible (bajo GAO). Andina viola esta regla: tiene planta pesada y deuda cara al mismo tiempo.',
        ],
      },
      {
        heading: 'Interrelación: GAT, riesgo integrado y valor',
        paragraphs: [
          'El GAT es el corazón del **eje de riesgo** integrado, que se completa con el **punto de equilibrio** (cuánto colchón hay sobre las ventas mínimas) y el **Altman Z′′** (la probabilidad de distress). Un GAT alto, con ventas cerca del breakeven y un Z′′ en zona gris, es una **bomba de tiempo**: cualquier shock externo —típico en LatAm— la detona.',
          '**Interrelación clave:** el eje de riesgo (GAT) se lee **en paralelo** al eje de valor (ROIC − WACC), nunca confundido con él. Una empresa puede no quebrar y aun así destruir valor; y otra puede crear valor pero con un GAT tan alto que un mal trimestre la liquide. El análisis financiero de esta semana —liquidez, solvencia, GAO, GAF, GAT— construye el mapa de riesgo sobre el que, en las semanas siguientes, se monta el análisis económico de creación de valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'GAT de Andina (apalancamiento total)',
      inputs: [
        { key: 'mc', label: 'Margen de contribución (V − CV)', value: 2460, min: 0, max: 10000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'cf', label: 'Costos fijos operativos', value: 1630, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Intereses', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'caidaVentas', label: 'Escenario: caída de ventas', value: 0.1, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ebit', label: 'EBIT (MC − CF)', fmt: 'num', calc: (v) => v.mc - v.cf, xl: '[mc]-[cf]' },
        { key: 'gao', label: 'GAO (MC / EBIT)', fmt: 'x', calc: (v) => v.mc / (v.mc - v.cf), xl: '[mc]/[ebit]' },
        { key: 'gaf', label: 'GAF (EBIT / (EBIT − Int.))', fmt: 'x', calc: (v) => (v.mc - v.cf) / (v.mc - v.cf - v.intereses), xl: '[ebit]/([ebit]-[intereses])' },
        { key: 'gat', label: 'GAT (GAO × GAF)', fmt: 'x', highlight: true, calc: (v) => v.mc / (v.mc - v.cf - v.intereses), xl: '[mc]/([ebit]-[intereses])' },
        { key: 'caidaUtil', label: 'Caída de la utilidad en el escenario', fmt: 'pct', calc: (v) => (v.mc / (v.mc - v.cf - v.intereses)) * v.caidaVentas, xl: '[gat]*[caidaVentas]' },
      ],
      conclusions: [
        {
          test: (v) => v.mc / (v.mc - v.cf - v.intereses) <= 3,
          good: 'El GAT es manejable (≤ 3): las dos palancas combinadas no amplifican de forma extrema. La empresa puede absorber una caída de ventas sin que la utilidad del accionista colapse. Estás lejos del punto de inflexión.',
          bad: 'El GAT es alto (> 3): GAO y GAF se multiplican y la utilidad cae exponencialmente ante una baja de ventas. Estás cerca del punto de inflexión: una mala temporada puede gatillar default. Es el doble apalancamiento de Andina.',
          xl: 'IF([gat]<=3,"GAT manejable "&TEXT([gat],"0.00")&"x: las dos palancas no amplifican de forma extrema. Lejos del punto de inflexion.","GAT alto "&TEXT([gat],"0.00")&"x (GAO "&TEXT([gao],"0.00")&"x x GAF "&TEXT([gaf],"0.00")&"x): una caida de ventas del "&TEXT([caidaVentas],"0.0%")&" hunde la utilidad "&TEXT([caidaUtil],"0.0%")&". Doble apalancamiento: cerca del default.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'gat', xLabel: 'Intereses', yLabel: 'GAT', yFmt: 'x' },
    },
    promptConcepts: ['GAT = GAO × GAF', 'GAT = Margen de Contribución / (EBIT − Intereses)', 'Caída exponencial cerca del punto de inflexión', 'Doble apalancamiento: alto GAO + alto GAF', 'Eje de riesgo (GAT) en paralelo al eje de valor'],
  },
]
