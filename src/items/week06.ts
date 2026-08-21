import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 6 — Free Cash Flow (los tres flujos y el CFROI)
// Incorpora: value-driver-interrelations (puentes FCFF/FCFE/FCFD, identidad de
// cierre FCFF = FCFE + FCFD, CCE → ΔWC) y value-generation-emerging-markets
// (CFROI a valores corrientes como verificación del ROIC contable).
// Caso central: Andina Manufacturas S.A.
// ============================================================================

export const week06: ItemSpec[] = [
  {
    id: 's06-i1',
    week: 6,
    order: 1,
    title: 'FCFF: el flujo libre de la firma',
    subtitle: 'NOPAT + Amortizaciones − CAPEX − ΔCapital de trabajo',
    framework: 'FCFF · McKinsey (Valuation)',
    theory: [
      {
        heading: 'La caja que genera el negocio para todos',
        paragraphs: [
          'El **Free Cash Flow to the Firm (FCFF)** es la caja que generan las operaciones de la empresa, antes de repartirla entre acreedores y accionistas, y después de hacer las inversiones que el negocio necesita para sostenerse. Es la materia prima de la valuación: descontado al **WACC**, da el **Enterprise Value** (valor de la firma) de la Semana 12. La fórmula canónica es **FCFF = NOPAT + Amortizaciones − CAPEX − ΔCapital de Trabajo**.',
          'Cada término tiene un sentido económico claro. El **NOPAT** (EBIT × (1 − t)) es la ganancia operativa después de impuestos, como si la empresa no tuviera deuda. Se le **suman las amortizaciones** porque son un gasto contable que no implica salida de caja. Se le **resta el CAPEX**, la inversión real en activos fijos que sí drena efectivo. Y se le resta el **ΔCapital de Trabajo**: la caja que el crecimiento atrapa en inventarios y cuentas por cobrar, neta de lo que financian los proveedores.',
          'Acá aparece la cara financiera del problema de Andina. Contablemente luce con utilidad, pero su **FCFF es negativo**: con NOPAT de ~540, amortizaciones de 290, CAPEX de 440 y un ΔCapital de Trabajo enorme (las cobranzas y el inventario crecieron mucho más rápido que las ventas), la empresa **consume caja en lugar de generarla**. El flujo de fondos desenmascara lo que el Estado de Resultados esconde.',
        ],
      },
      {
        heading: 'El ΔCapital de Trabajo, el gran sospechoso',
        paragraphs: [
          'El **ΔCapital de Trabajo** es donde se esconde la mayor fuga de caja en los mercados emergentes. Se calcula como el aumento de cuentas por cobrar más el aumento de inventarios, menos el aumento de proveedores. En Andina, las cuentas por cobrar subieron 330, los inventarios 550 y los proveedores solo 160: el capital de trabajo absorbió **720** de caja en un solo año, más que todo el NOPAT.',
          '**Aclaración importante:** un ΔCapital de Trabajo positivo (el capital de trabajo crece) **resta** del FCFF, porque inmoviliza efectivo. Por eso reducir el **Ciclo de Conversión de Efectivo (CCE)** —cobrar más rápido, rotar mejor el inventario, estirar a proveedores— genera un FCFF extraordinario de una sola vez: libera caja atrapada. En inflación, además, el ΔCapital de Trabajo nominal es enorme aunque el negocio no crezca en términos reales; conviene trabajar los flujos en moneda homogénea o en dólares.',
        ],
      },
      {
        heading: 'Interrelación: FCFF, CCE y valor de la firma',
        paragraphs: [
          'El FCFF es el nodo que conecta la operación con la valuación. Por arriba, se alimenta del **NOPAT** y del **CCE** (vía el ΔWC); por abajo, descontado al WACC, produce el **Enterprise Value**. La identidad de la KVD de McKinsey lo formaliza: FCFF = NOPAT × (1 − tasa de reinversión), donde la reinversión es lo que se va en CAPEX y capital de trabajo.',
          '**Interrelación clave:** el FCFF se reparte entre los dos públicos de la empresa: **FCFF = FCFE + FCFD** (el flujo del accionista más el flujo del acreedor). Esa identidad de cierre, que se desarrolla en los ítems siguientes, es el test de consistencia de todo el modelo de valuación. Si los tres flujos no cierran entre sí, hay un error en el modelo.',
        ],
      },
    ],
    model: {
      excelTitle: 'FCFF de Andina',
      inputs: [
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'amort', label: 'Amortizaciones', value: 290, min: 0, max: 1500, step: 10, unit: 'k', fmt: 'num' },
        { key: 'capex', label: 'CAPEX (inversión en activo fijo)', value: 440, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'dwc', label: 'Δ Capital de trabajo (ΔCxC + ΔInv − ΔProv)', value: 720, min: -1000, max: 3000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT (EBIT × (1 − t))', fmt: 'num', calc: (v) => v.ebit * (1 - v.tax), xl: '[ebit]*(1-[tax])' },
        { key: 'fcff', label: 'FCFF', fmt: 'num', highlight: true, calc: (v) => v.ebit * (1 - v.tax) + v.amort - v.capex - v.dwc, xl: '[nopat]+[amort]-[capex]-[dwc]' },
      ],
      conclusions: [
        {
          test: (v) => v.ebit * (1 - v.tax) + v.amort - v.capex - v.dwc >= 0,
          good: 'El FCFF es positivo: el negocio genera caja para repartir entre acreedores y accionistas después de invertir. Crecer rentablemente agranda este flujo y, vía WACC, el valor de la firma.',
          bad: 'El FCFF es NEGATIVO: aunque haya utilidad contable, la empresa CONSUME caja. El gran culpable suele ser el ΔCapital de Trabajo (cobranzas e inventario que crecen más rápido que las ventas). Acá vive Andina: atacar el CCE es la palanca más urgente.',
          xl: 'IF([fcff]>=0,"FCFF positivo ("&TEXT([fcff],"0")&"): el negocio genera caja tras invertir. Crecer rentablemente agranda el valor de la firma.","FCFF NEGATIVO ("&TEXT([fcff],"0")&"): hay utilidad contable pero se consume caja. El culpable: el Delta Capital de Trabajo ("&TEXT([dwc],"0")&"). Atacar el CCE es lo urgente.")',
        },
      ],
      chart: { sweepKey: 'dwc', outKey: 'fcff', xLabel: 'Δ Capital de trabajo', yLabel: 'FCFF', yFmt: 'num' },
    },
    promptConcepts: ['FCFF = NOPAT + Amort − CAPEX − ΔWC', 'NOPAT = EBIT × (1 − t)', 'ΔCapital de trabajo como fuga de caja', 'FCFF → WACC → Enterprise Value', 'Utilidad contable ≠ generación de caja'],
  },

  {
    id: 's06-i2',
    week: 6,
    order: 2,
    title: 'FCFE: el flujo del accionista',
    subtitle: 'Lo que queda para el dueño después de pagar la deuda',
    framework: 'FCFE · value-driver-interrelations',
    theory: [
      {
        heading: 'La caja que llega al bolsillo del dueño',
        paragraphs: [
          'El **Free Cash Flow to Equity (FCFE)** es la caja que queda **para el accionista** después de que la empresa pagó los intereses a los acreedores y movió su deuda (tomó nueva o amortizó la vieja). Es el flujo que efectivamente puede distribuirse como dividendos sin descapitalizar la empresa. Descontado al **costo del equity (Ke)**, da el **Equity Value** (el valor del patrimonio) de la Semana 12.',
          'Se construye partiendo del FCFF y restándole el costo de la deuda neto de impuestos, ajustando por los movimientos de deuda: **FCFE = FCFF − Intereses × (1 − t) + ΔDeuda neta**. La lógica es directa: del flujo total de la firma, los acreedores se llevan los intereses (después del escudo fiscal); si la empresa toma deuda nueva, eso suma caja para el accionista; si amortiza, resta. Una forma equivalente parte de la utilidad neta: **FCFE = Utilidad Neta + Amortizaciones − CAPEX − ΔWC + ΔDeuda neta**.',
          'En Andina el FCFE es todavía más castigado que el FCFF: el FCFF ya era negativo, y encima los intereses de 560 (después del escudo fiscal) se llevan una porción enorme. Lo que llega al dueño es magro o negativo, lo que explica por qué, pese a la "utilidad contable", la empresa no puede sostener dividendos sin recurrir a más descubierto.',
        ],
      },
      {
        heading: 'Las dos formas y por qué deben coincidir',
        paragraphs: [
          'El FCFE admite dos caminos de cálculo —vía FCFF o vía utilidad neta— que **deben dar el mismo número**. Si no coinciden, hay un error de consistencia en el modelo. Esta doble vía es una de las verificaciones clásicas de una valuación bien armada: el camino "de arriba" (desde el flujo de la firma) y el "de abajo" (desde el resultado del accionista) tienen que reconciliar.',
          '**Aclaración sobre el escudo fiscal:** los intereses se restan **después de impuestos** (× (1 − t)) porque son deducibles: el Estado subsidia parte del costo financiero. Ese mismo escudo fiscal es el que abarata la deuda en el WACC. Por eso el FCFE no se calcula restando los intereses brutos, sino netos del ahorro impositivo que generan.',
        ],
      },
      {
        heading: 'Interrelación: FCFE, Ke y política de dividendos',
        paragraphs: [
          'El FCFE es el puente entre el flujo de la firma y el bolsillo del dueño, y se descuenta al **Ke** (no al WACC), porque es un flujo que pertenece solo al accionista. El test de consistencia del modelo de valuación es que **Equity Value = Enterprise Value − Deuda neta** coincida con descontar el FCFE al Ke directamente.',
          '**Interrelación clave:** el FCFE es la base económica de la **política de dividendos**. No se pueden distribuir dividendos sostenibles por encima del FCFE sin endeudarse o descapitalizarse. Y la regla de oro liga esto con la creación de valor: conviene **reinvertir** el FCFE mientras existan proyectos con RONIC > WACC, y **distribuirlo** cuando los proyectos marginales rinden menos que el costo del capital. El FCFE marca cuánta caja real hay para esa decisión.',
        ],
      },
    ],
    model: {
      excelTitle: 'FCFE de Andina (flujo del accionista)',
      inputs: [
        { key: 'fcff', label: 'FCFF (flujo de la firma)', value: -330.5, min: -2000, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Intereses', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'deudaNueva', label: 'Nueva deuda tomada', value: 230, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'amortDeuda', label: 'Amortización de deuda (capital)', value: 150, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'intNetos', label: 'Intereses después de impuesto', fmt: 'num', calc: (v) => v.intereses * (1 - v.tax), xl: '[intereses]*(1-[tax])' },
        { key: 'dDeuda', label: 'Δ Deuda neta (nueva − amortización)', fmt: 'num', calc: (v) => v.deudaNueva - v.amortDeuda, xl: '[deudaNueva]-[amortDeuda]' },
        { key: 'fcfe', label: 'FCFE (FCFF − Int.(1−t) + ΔDeuda)', fmt: 'num', highlight: true, calc: (v) => v.fcff - v.intereses * (1 - v.tax) + (v.deudaNueva - v.amortDeuda), xl: '[fcff]-[intNetos]+[dDeuda]' },
      ],
      conclusions: [
        {
          test: (v) => v.fcff - v.intereses * (1 - v.tax) + (v.deudaNueva - v.amortDeuda) >= 0,
          good: 'El FCFE es positivo: queda caja real para el accionista después de servir la deuda. Es el techo de dividendos sostenibles. Reinvertirlo crea valor mientras haya proyectos con RONIC > WACC.',
          bad: 'El FCFE es NEGATIVO: una vez pagados los intereses y servida la deuda, no queda caja para el dueño. Distribuir dividendos acá obliga a endeudarse más. Es la trampa de Andina: utilidad contable sin caja para el accionista.',
          xl: 'IF([fcfe]>=0,"FCFE positivo ("&TEXT([fcfe],"0")&"): hay caja para el accionista tras servir la deuda. Es el techo de dividendos sostenibles.","FCFE NEGATIVO ("&TEXT([fcfe],"0")&"): tras pagar intereses ("&TEXT([intNetos],"0")&" netos) no queda caja para el dueno. Distribuir obliga a endeudarse mas.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'fcfe', xLabel: 'Intereses', yLabel: 'FCFE', yFmt: 'num' },
    },
    promptConcepts: ['FCFE = FCFF − Int.×(1−t) + ΔDeuda neta', 'FCFE = UN + Amort − CAPEX − ΔWC + ΔDeuda', 'FCFE → Ke → Equity Value', 'Escudo fiscal de los intereses', 'FCFE como techo de la política de dividendos'],
  },

  {
    id: 's06-i3',
    week: 6,
    order: 3,
    title: 'FCFD: el flujo del acreedor',
    subtitle: 'Lo que recibe el banco: intereses más amortizaciones de capital',
    framework: 'FCFD · value-driver-interrelations',
    theory: [
      {
        heading: 'La caja que se llevan los bancos',
        paragraphs: [
          'El **Free Cash Flow to Debt (FCFD)** es la caja que la empresa entrega a sus **acreedores**: los intereses (después de impuestos) más las amortizaciones de capital, menos la nueva deuda que se emite. Es el flujo del banco y los tenedores de bonos. Descontado al **costo de la deuda (Kd)**, da el **valor de mercado de la deuda**. La fórmula es **FCFD = Intereses × (1 − t) + Amortizaciones de capital − Nueva deuda emitida**.',
          'Cada término refleja un movimiento de caja entre la empresa y sus acreedores. Los **intereses después de impuestos** son la remuneración del préstamo (netos del escudo fiscal). Las **amortizaciones de capital** son la devolución del principal. Y la **nueva deuda emitida** se resta porque es plata que el acreedor le da a la empresa, no que recibe: cuando la empresa toma deuda nueva, el flujo neto hacia los acreedores baja.',
          'En Andina, el FCFD es **positivo y abultado**: la empresa drena caja hacia los bancos vía los intereses de 560 (descubierto caro al 85% incluido) y las amortizaciones de préstamos. Ese flujo hacia los acreedores es, en buena medida, la contracara del FCFE pobre del ítem anterior: lo que se llevan los bancos es lo que no llega al dueño.',
        ],
      },
      {
        heading: 'El flujo "más seguro" de los tres',
        paragraphs: [
          'A diferencia del FCFE —que es residual y volátil, lo que queda al final—, el FCFD es **contractualmente prioritario**: los acreedores cobran antes que los accionistas. Por eso su tasa de descuento, el **Kd**, es menor que el **Ke**: menos riesgo, menos retorno exigido. La jerarquía de cobro (primero el acreedor, último el accionista) es lo que justifica que cada flujo se descuente a una tasa distinta.',
          'En mercados emergentes con tasas altas, el FCFD puede ser desproporcionadamente grande respecto del tamaño del negocio, ahogando al FCFE. Es la situación de las empresas sobreapalancadas a deuda cara: el flujo del acreedor se "come" al del accionista. Reducir el Kd (refinanciar el descubierto, por ejemplo) achica el FCFD y libera flujo para el dueño.',
        ],
      },
      {
        heading: 'Interrelación: FCFD, jerarquía de cobro y valor de la deuda',
        paragraphs: [
          'El FCFD cierra el triángulo de los flujos: cada uno se descuenta a su propia tasa —FCFF al WACC, FCFE al Ke, FCFD al Kd— y cada uno valúa un objeto distinto (la firma, el patrimonio, la deuda). El **valor de la deuda** que sale de descontar el FCFD al Kd debe ser coherente con el que se usa para ponderar el WACC.',
          '**Interrelación clave:** la identidad de cierre **FCFF = FCFE + FCFD** (que se desarrolla en el ítem 5) significa que el flujo total de la firma se reparte exactamente entre accionistas y acreedores. El FCFD es la porción de los acreedores; el FCFE, la de los dueños. Esa partición es el puente entre la estructura de capital (cuánta deuda) y la distribución del flujo (quién se lleva qué).',
        ],
      },
    ],
    model: {
      excelTitle: 'FCFD de Andina (flujo del acreedor)',
      inputs: [
        { key: 'intereses', label: 'Intereses pagados', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'amortDeuda', label: 'Amortización de capital (devolución)', value: 150, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'deudaNueva', label: 'Nueva deuda emitida', value: 230, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'intNetos', label: 'Intereses después de impuesto', fmt: 'num', calc: (v) => v.intereses * (1 - v.tax), xl: '[intereses]*(1-[tax])' },
        { key: 'fcfd', label: 'FCFD (Int.(1−t) + Amort − Nueva deuda)', fmt: 'num', highlight: true, calc: (v) => v.intereses * (1 - v.tax) + v.amortDeuda - v.deudaNueva, xl: '[intNetos]+[amortDeuda]-[deudaNueva]' },
      ],
      conclusions: [
        {
          test: (v) => v.intereses * (1 - v.tax) + v.amortDeuda - v.deudaNueva > 0,
          good: 'El FCFD es positivo: la empresa devuelve caja neta a los acreedores (los intereses y amortizaciones superan a la deuda nueva). Es lo esperable de una empresa que se desapalanca. Si es muy grande, ahoga al FCFE.',
          bad: 'El FCFD es negativo o nulo: la empresa toma más deuda nueva de la que devuelve; los acreedores le inyectan caja neta. Eso suma apalancamiento y riesgo financiero (GAF). Sostenible solo si esa deuda financia proyectos con RONIC > Kd.',
          xl: 'IF([fcfd]>0,"FCFD positivo ("&TEXT([fcfd],"0")&"): se devuelve caja neta a los acreedores. Esperable al desapalancarse; si es muy grande, ahoga al FCFE.","FCFD <=0: se toma mas deuda nueva ("&TEXT([deudaNueva],"0")&") de la que se devuelve. Suma apalancamiento y riesgo (GAF).")',
        },
      ],
      chart: { sweepKey: 'amortDeuda', outKey: 'fcfd', xLabel: 'Amortización de capital', yLabel: 'FCFD', yFmt: 'num' },
    },
    promptConcepts: ['FCFD = Int.×(1−t) + Amort. capital − Nueva deuda', 'FCFD → Kd → valor de mercado de la deuda', 'Jerarquía de cobro: acreedor antes que accionista', 'Por qué Kd < Ke (menos riesgo, menos retorno)', 'FCFD grande ahoga al FCFE en deuda cara'],
  },

  {
    id: 's06-i4',
    week: 6,
    order: 4,
    title: 'CFROI: el retorno de caja sobre la inversión',
    subtitle: 'La TIR real que desenmascara al ROIC contable inflado',
    framework: 'CFROI · HOLT / Credit Suisse',
    theory: [
      {
        heading: 'La empresa vista como un gran proyecto',
        paragraphs: [
          'El **CFROI (Cash Flow Return on Investment)** mira a toda la empresa como si fuera **un solo gran proyecto de inversión** y calcula su **TIR real**: relaciona los flujos de caja brutos que genera contra la base de activos brutos ajustados por inflación, a lo largo de la vida útil de esos activos y considerando un valor residual. Fue desarrollado por HOLT (hoy Credit Suisse/UBS) y es una medida de retorno en **términos reales**, no nominales.',
          'Su gran virtud es que **corrige los dos sesgos del ROIC contable** que distorsionan los mercados emergentes. Primero, usa **activos brutos** (antes de depreciación acumulada), así que los activos viejos y depreciados —que achican artificialmente el denominador y "inflan" el ROIC— no engañan. Segundo, **ajusta por inflación**, reexpresando todo a moneda corriente, de modo que no mezcla pesos de distinto poder adquisitivo. En Andina, con maquinaria antigua y terreno a valor histórico, el ROIC contable está inflado: el CFROI lo desenmascara.',
          'La intuición del cálculo es de TIR: la **inversión bruta ajustada** es el desembolso "de hoy"; los **flujos de caja brutos anuales** (NOPAT + amortizaciones, en términos reales) son los ingresos del proyecto durante n años; el **valor residual** (terrenos, capital de trabajo recuperable) es lo que se rescata al final. El CFROI es la tasa que iguala todo eso, y se compara contra un **costo de capital real**.',
        ],
      },
      {
        heading: 'Un cálculo simplificado',
        paragraphs: [
          'La versión rigurosa del CFROI resuelve una TIR con vida útil estimada y reexpresión por inflación, lo que la vuelve compleja y poco transparente —su principal debilidad—. Para fines didácticos se usa una aproximación: **CFROI ≈ Flujo de Caja Bruto Real / Inversión Bruta Ajustada**, que captura la esencia —retorno de caja sobre activos a valor corriente— sin resolver la TIR completa.',
          'El **Flujo de Caja Bruto** es el NOPAT más las amortizaciones (la caja operativa antes de inversión). La **Inversión Bruta Ajustada** son los activos brutos reexpresados a valor de mercado, no a costo histórico depreciado. La diferencia con el ROIC es justamente el denominador: el ROIC usa el capital neto contable (chico, inflado); el CFROI usa el bruto a valor corriente (grande, realista). Por eso el CFROI suele ser **menor** que el ROIC contable, y esa brecha es la huella de la distorsión.',
        ],
      },
      {
        heading: 'Interrelación: CFROI como verificación cruzada del ROIC',
        paragraphs: [
          'El CFROI no reemplaza al ROIC: lo **verifica**. La jerarquía de robustez en mercados emergentes pone a los flujos de caja (FCFF, CFROI) por encima de los ratios contables nominales (ROIC, DuPont). La regla de diagnóstico es directa: **si el CFROI es mucho menor que el ROIC contable, hay distorsión por inflación o activos viejos**, y conviene confiar en el CFROI real, no en el ROIC nominal.',
          '**Interrelación clave:** el CFROI se compara contra un **costo de capital real** (el WACC en términos reales), igual que el ROIC se compara contra el WACC nominal. Si el CFROI supera al costo de capital real, la empresa crea valor en términos reales; si no, lo destruye —aunque el ROIC contable diga lo contrario—. Es el contraste que evita celebrar una rentabilidad nominal que la inflación se está comiendo.',
        ],
      },
    ],
    model: {
      excelTitle: 'CFROI de Andina (retorno de caja real)',
      inputs: [
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'amort', label: 'Amortizaciones', value: 290, min: 0, max: 1500, step: 10, unit: 'k', fmt: 'num' },
        { key: 'invBruta', label: 'Inversión bruta ajustada (activos a valor corriente)', value: 6500, min: 500, max: 20000, step: 100, unit: 'k', fmt: 'num' },
        { key: 'capitalNeto', label: 'Capital invertido neto contable (para comparar ROIC)', value: 4200, min: 500, max: 20000, step: 100, unit: 'k', fmt: 'num' },
        { key: 'waccReal', label: 'Costo de capital real', value: 0.12, min: 0.02, max: 0.3, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'nopat', label: 'NOPAT (EBIT × (1 − t))', fmt: 'num', calc: (v) => v.ebit * (1 - v.tax), xl: '[ebit]*(1-[tax])' },
        { key: 'fcb', label: 'Flujo de caja bruto (NOPAT + Amort.)', fmt: 'num', calc: (v) => v.ebit * (1 - v.tax) + v.amort, xl: '[nopat]+[amort]' },
        { key: 'cfroi', label: 'CFROI (FCB / Inversión bruta)', fmt: 'pct', highlight: true, calc: (v) => (v.ebit * (1 - v.tax) + v.amort) / v.invBruta, xl: '[fcb]/[invBruta]' },
        { key: 'roicContable', label: 'ROIC contable (NOPAT / capital neto)', fmt: 'pct', calc: (v) => (v.ebit * (1 - v.tax)) / v.capitalNeto, xl: '[nopat]/[capitalNeto]' },
      ],
      conclusions: [
        {
          test: (v) => (v.ebit * (1 - v.tax) + v.amort) / v.invBruta >= v.waccReal,
          good: 'El CFROI supera al costo de capital real: la empresa crea valor en términos REALES, no solo nominales. La rentabilidad resiste el ajuste por inflación y activos a valor corriente.',
          bad: 'El CFROI es menor al costo de capital real: en términos reales la empresa NO crea valor, aunque el ROIC contable luzca mejor. La brecha entre ROIC contable y CFROI es la huella de la distorsión por inflación y activos viejos.',
          xl: 'IF([cfroi]>=[waccReal],"CFROI "&TEXT([cfroi],"0.0%")&" supera al costo real "&TEXT([waccReal],"0.0%")&": se crea valor REAL. Resiste inflacion y activos a valor corriente.","CFROI "&TEXT([cfroi],"0.0%")&" < costo real "&TEXT([waccReal],"0.0%")&": no se crea valor real. La brecha vs ROIC contable "&TEXT([roicContable],"0.0%")&" es la huella de la distorsion.")',
        },
      ],
      chart: { sweepKey: 'invBruta', outKey: 'cfroi', xLabel: 'Inversión bruta ajustada', yLabel: 'CFROI', yFmt: 'pct' },
    },
    promptConcepts: ['CFROI = TIR real de la empresa como proyecto', 'CFROI ≈ Flujo de caja bruto / Inversión bruta ajustada', 'Activos brutos a valor corriente (corrige activos viejos)', 'Ajuste por inflación (retorno real, no nominal)', 'CFROI << ROIC contable = huella de distorsión'],
  },

  {
    id: 's06-i5',
    week: 6,
    order: 5,
    title: 'Reconciliación: FCFF = FCFE + FCFD',
    subtitle: 'Los puentes algebraicos que cierran entre sí',
    framework: 'Reconciliación · value-driver-interrelations',
    theory: [
      {
        heading: 'La identidad de cierre del modelo',
        paragraphs: [
          'Los tres flujos no son independientes: reparten la misma caja generada por la empresa entre sus dos públicos. La **identidad de cierre** es **FCFF = FCFE + FCFD**: el flujo total de la firma es exactamente la suma de lo que reciben los accionistas (FCFE) y los acreedores (FCFD). Si los tres no cierran, hay un error en el modelo de valuación. Es el test de consistencia más importante de toda la Semana 6.',
          'El puente algebraico se ve restando: **FCFE = FCFF − Intereses × (1 − t) + ΔDeuda neta** y **FCFD = Intereses × (1 − t) + Amortizaciones − Nueva deuda**. Al sumar FCFE + FCFD, los términos de intereses se cancelan (uno los resta, el otro los suma) y los movimientos de deuda también (ΔDeuda neta = Nueva deuda − Amortización), de modo que queda exactamente el FCFF. La caja que entra al reparto es la misma que sale, repartida.',
          'Esta reconciliación es la columna vertebral de la valuación coherente: **FCFF descontado al WACC** da el Enterprise Value; **FCFE descontado al Ke** da el Equity Value; **FCFD descontado al Kd** da el valor de la deuda. Y debe cumplirse que **Equity Value = Enterprise Value − Deuda neta**. Si esa igualdad no cierra, el modelo tiene un error de consistencia, no una opinión distinta.',
        ],
      },
      {
        heading: 'Por qué tres tasas distintas para la misma caja',
        paragraphs: [
          'Cada flujo se descuenta a una tasa distinta porque cada uno tiene un **riesgo distinto**, derivado de la **jerarquía de cobro**. El acreedor cobra primero y con menos incertidumbre: su flujo (FCFD) se descuenta al **Kd**, la tasa más baja. El accionista cobra último, lo que sobra: su flujo (FCFE) es el más riesgoso y se descuenta al **Ke**, la tasa más alta. El flujo total de la firma (FCFF) se descuenta al **WACC**, que es el promedio ponderado de ambas tasas.',
          'La coherencia entre las tres tasas y los tres flujos es lo que hace que el modelo "cierre" tanto en flujos como en valores. Un error frecuente es descontar el FCFE al WACC, o el FCFF al Ke: mezclar el flujo de un público con la tasa de otro rompe la reconciliación y produce valuaciones infladas o deprimidas sin sentido económico.',
        ],
      },
      {
        heading: 'Interrelación: la reconciliación como puente al valor',
        paragraphs: [
          'La reconciliación de flujos es el puente que une toda la semana con la valuación integral de la Semana 12. El **FCFF** del ítem 1 alimenta el Enterprise Value; el **FCFE** del ítem 2, el Equity Value; el **FCFD** del ítem 3, el valor de la deuda; y el **CFROI** del ítem 4 verifica que la rentabilidad real sostiene esos valores. Todo converge en la pregunta maestra: ¿la empresa crea o destruye valor?',
          '**Interrelación clave:** en Andina, la reconciliación cuenta una historia brutal. El FCFF es magro o negativo (la operación no genera caja por el ΔCapital de Trabajo); el FCFD es grande (los bancos se llevan los intereses de la deuda cara); y por diferencia, el FCFE que llega al dueño es negativo. La identidad FCFF = FCFE + FCFD no solo verifica el modelo: revela quién se queda con la caja del negocio. En Andina, los acreedores; el dueño, nada.',
        ],
      },
    ],
    model: {
      excelTitle: 'Reconciliación FCFF = FCFE + FCFD',
      inputs: [
        { key: 'fcff', label: 'FCFF (flujo de la firma)', value: -330.5, min: -2000, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Intereses', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'deudaNueva', label: 'Nueva deuda tomada', value: 230, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'amortDeuda', label: 'Amortización de deuda (capital)', value: 150, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'intNetos', label: 'Intereses después de impuesto', fmt: 'num', calc: (v) => v.intereses * (1 - v.tax), xl: '[intereses]*(1-[tax])' },
        { key: 'dDeuda', label: 'Δ Deuda neta (nueva − amortización)', fmt: 'num', calc: (v) => v.deudaNueva - v.amortDeuda, xl: '[deudaNueva]-[amortDeuda]' },
        { key: 'fcfe', label: 'FCFE (accionista)', fmt: 'num', calc: (v) => v.fcff - v.intereses * (1 - v.tax) + (v.deudaNueva - v.amortDeuda), xl: '[fcff]-[intNetos]+[dDeuda]' },
        { key: 'fcfd', label: 'FCFD (acreedor)', fmt: 'num', calc: (v) => v.intereses * (1 - v.tax) + v.amortDeuda - v.deudaNueva, xl: '[intNetos]+[amortDeuda]-[deudaNueva]' },
        { key: 'sumaFlujos', label: 'FCFE + FCFD (debe igualar al FCFF)', fmt: 'num', highlight: true, calc: (v) => (v.fcff - v.intereses * (1 - v.tax) + (v.deudaNueva - v.amortDeuda)) + (v.intereses * (1 - v.tax) + v.amortDeuda - v.deudaNueva), xl: '[fcfe]+[fcfd]' },
      ],
      conclusions: [
        {
          test: (v) => Math.abs(((v.fcff - v.intereses * (1 - v.tax) + (v.deudaNueva - v.amortDeuda)) + (v.intereses * (1 - v.tax) + v.amortDeuda - v.deudaNueva)) - v.fcff) < 0.01,
          good: 'La identidad cierra: FCFE + FCFD = FCFF. El modelo es consistente: la caja total de la firma se reparte exactamente entre accionistas y acreedores. Es la verificación que valida toda la valuación.',
          bad: 'La identidad NO cierra: FCFE + FCFD ≠ FCFF. Hay un error de consistencia en el modelo (probablemente al mezclar movimientos de deuda o el escudo fiscal). Revisá los puentes algebraicos antes de seguir con la valuación.',
          xl: 'IF(ABS([sumaFlujos]-[fcff])<0.01,"La identidad cierra: FCFE ("&TEXT([fcfe],"0")&") + FCFD ("&TEXT([fcfd],"0")&") = FCFF ("&TEXT([fcff],"0")&"). Modelo consistente.","La identidad NO cierra: FCFE+FCFD = "&TEXT([sumaFlujos],"0")&" <> FCFF "&TEXT([fcff],"0")&". Hay error de consistencia; revisa los puentes.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'fcfe', xLabel: 'Intereses', yLabel: 'FCFE', yFmt: 'num' },
    },
    promptConcepts: ['Identidad de cierre: FCFF = FCFE + FCFD', 'Los intereses y ΔDeuda se cancelan al sumar', 'FCFF→WACC, FCFE→Ke, FCFD→Kd', 'Equity Value = Enterprise Value − Deuda neta', 'La reconciliación como test de consistencia'],
  },
]
