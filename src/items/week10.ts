import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 10 — Apalancamiento y Riesgo
// Incorpora: apv-valuation-emerging-markets (Vu, escudo fiscal, escudo riesgoso
// de Velez-Pareja con tasa psi, dificultades financieras y Altman Z\'\' (EMS),
// value-generation-emerging-markets (GAF, ROE apalancado) y Modigliani-Miller.
// Caso Andina: EBIT 830, intereses 560, t 35%.
// ============================================================================

export const week10: ItemSpec[] = [
  {
    id: 's10-i1',
    week: 10,
    order: 1,
    title: 'El ROE apalancado: la deuda como multiplicador',
    subtitle: 'Por qué endeudarse agranda el retorno del accionista… hasta que se da vuelta',
    framework: 'Modigliani-Miller · DuPont · value-generation',
    theory: [
      {
        heading: 'La fórmula que separa operación de financiamiento',
        paragraphs: [
          'El retorno del accionista (**ROE**) se puede leer como el retorno de la operación más un premio por la deuda: **ROE = ROIC + (ROIC − i·(1−t))·D/E**. El primer término, el **ROIC**, es lo que rinde el capital invertido en el negocio, sin importar cómo se financie. El segundo es el **efecto del apalancamiento**: la diferencia entre lo que rinde el capital y lo que cuesta la deuda **después de impuestos** (i·(1−t)), amplificada por la razón **deuda/equity (D/E)**.',
          'La lectura es directa y poderosa: si el negocio **rinde más de lo que cuesta la deuda** (ROIC > i·(1−t)), cada peso prestado trabaja a favor del dueño y el ROE **supera** al ROIC. La deuda funciona como una **palanca** que agranda el retorno sobre el capital propio, que es más escaso. Por eso un dueño hábil usa deuda barata para potenciar un negocio rentable.',
          'Pero la palanca es de **doble filo**. Si el ROIC **cae por debajo** del costo de la deuda, el segundo término se vuelve negativo y la deuda **destruye** retorno: el ROE se hunde por debajo del ROIC, y cuanto mayor es el D/E, más profundo es el pozo. La misma D/E que magnificaba la ganancia ahora magnifica la pérdida.',
        ],
      },
      {
        heading: 'El espejo del DuPont: ROE de buena y de mala calidad',
        paragraphs: [
          'Esta fórmula es la hermana del **DuPont de cinco factores**, donde el **multiplicador financiero (Activos/Patrimonio)** captura exactamente esta amplificación. Un ROE alto puede venir de un negocio excelente (margen y rotación) o, simplemente, de **mucha deuda** sobre un negocio mediocre. Son perfiles de riesgo opuestos con el mismo número.',
          'En **Andina**, el dueño mira un ROE que luce decente, pero buena parte viene del apalancamiento, no de la operación. Es **ROE de mala calidad**: frágil, dependiente de que el crédito siga fluyendo y de que el ROIC no afloje. Cuando los intereses (560 sobre un EBIT de 830) se comen la utilidad, la palanca empieza a jugar en contra.',
          '**Interrelación clave:** este ítem conecta el **ROIC vs WACC** de la Semana 9 (creación de valor operativa) con el **riesgo financiero** (GAF, ítem 5) y con el **costo del equity**: a más deuda, más volátil el ROE, más beta apalancada y más Ke exigido. La palanca que sube el retorno esperado también sube el riesgo.',
        ],
      },
      {
        heading: 'Errores frecuentes del CEO',
        paragraphs: [
          'Festejar un ROE alto sin descomponerlo: creer que el negocio es brillante cuando en realidad está sobreapalancado. Tomar deuda "porque el ROE sube" sin chequear si el ROIC todavía supera al costo de la deuda. Y olvidar que el premio del apalancamiento es un premio **por riesgo**: existe solo mientras el negocio rinda más que la deuda.',
        ],
      },
    ],
    model: {
      excelTitle: 'ROE apalancado — la deuda como multiplicador',
      inputs: [
        { key: 'roic', label: 'ROIC (rinde el capital)', value: 0.14, min: 0, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'i', label: 'Costo de la deuda (i, antes de impuesto)', value: 0.18, min: 0.05, max: 0.45, step: 0.005, fmt: 'pct' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'de', label: 'Razón deuda/equity (D/E)', value: 1, min: 0, max: 3, step: 0.1, fmt: 'num2' },
      ],
      calcs: [
        { key: 'iAfter', label: 'Costo de deuda después de impuesto', fmt: 'pct', calc: (v) => v.i * (1 - v.tax), xl: '[i]*(1-[tax])' },
        { key: 'spread', label: 'Spread (ROIC − i·(1−t))', fmt: 'pct', calc: (v) => v.roic - v.i * (1 - v.tax), xl: '[roic]-[iAfter]' },
        { key: 'efectoPalanca', label: 'Efecto del apalancamiento', fmt: 'pct', calc: (v) => (v.roic - v.i * (1 - v.tax)) * v.de, xl: '[spread]*[de]' },
        { key: 'roe', label: 'ROE apalancado', fmt: 'pct', highlight: true, calc: (v) => v.roic + (v.roic - v.i * (1 - v.tax)) * v.de, xl: '[roic]+[spread]*[de]' },
      ],
      conclusions: [
        {
          test: (v) => v.roic - v.i * (1 - v.tax) >= 0,
          good: 'El ROIC supera al costo de la deuda después de impuestos: la palanca juega A FAVOR y el ROE supera al ROIC. Subir el D/E agranda el retorno… y también el riesgo.',
          bad: 'El ROIC es MENOR al costo de la deuda: la palanca juega EN CONTRA y el ROE cae por debajo del ROIC. Acá, más deuda hunde más el retorno del dueño. Primero hay que recuperar el ROIC.',
          xl: 'IF([roic]>=[iAfter],"El ROIC ("&TEXT([roic],"0.0%")&") supera al costo de la deuda post impuesto ("&TEXT([iAfter],"0.0%")&"): la palanca juega A FAVOR. ROE "&TEXT([roe],"0.0%")&" > ROIC. Subir D/E agranda retorno y riesgo.","El ROIC es menor al costo de la deuda: la palanca juega EN CONTRA. ROE "&TEXT([roe],"0.0%")&" < ROIC. Mas deuda hunde mas el retorno.")',
        },
      ],
      chart: { sweepKey: 'de', outKey: 'roe', xLabel: 'Deuda/Equity', yLabel: 'ROE apalancado', yFmt: 'pct' },
    },
    promptConcepts: ['ROE = ROIC + (ROIC − i·(1−t))·D/E', 'La deuda como multiplicador del retorno', 'Spread ROIC − costo de deuda (palanca a favor/en contra)', 'Multiplicador financiero del DuPont (ROE de mala calidad)', 'Por qué la palanca sube retorno Y riesgo a la vez'],
  },

  {
    id: 's10-i2',
    week: 10,
    order: 2,
    title: 'El escudo fiscal y el valor: Vu + VP del escudo',
    subtitle: 'Cuánto suma la deuda al valor de la firma por la deducibilidad de los intereses',
    framework: 'APV · Modigliani-Miller (1963) · Fernández',
    theory: [
      {
        heading: 'La fórmula maestra del APV',
        paragraphs: [
          'El **APV (Adjusted Present Value)** valúa la empresa por piezas: **APV = Vu + VP(escudo fiscal) − VP(dificultades financieras)**. El **Vu** es el **valor desapalancado**: lo que vale la operación pura, como si la empresa se financiara 100% con capital propio. Se obtiene descontando el FCFF a **Ku**, la tasa del riesgo operativo, sin nada de apalancamiento.',
          'Sobre ese piso se **suma** el valor que aporta la deuda. Los intereses son **deducibles de impuestos**: el Estado "subsidia" parte del costo financiero. Ese ahorro anual es **Tc·Intereses**, y su valor presente es el **escudo fiscal (VTS, *value of tax shield*)**. Es el componente que **empuja el valor hacia arriba** respecto del Vu.',
          'La lógica viene de **Modigliani-Miller (1963)**: sin impuestos, la estructura financiera no cambia el valor; con impuestos, la deducibilidad de los intereses hace que un poco de deuda **agregue** valor. El APV tiene la elegancia de no esconder ese efecto dentro del WACC, sino mostrarlo explícito y descontado a su propia tasa.',
        ],
      },
      {
        heading: 'El VP del escudo según la política de deuda',
        paragraphs: [
          'No hay una única tasa correcta para descontar el escudo: depende de la **política de deuda**. Si la deuda es **fija** en términos nominales, el ahorro es tan seguro como la deuda y se descuenta a **Kd** (Myers, MM). Si el ratio de apalancamiento es un **objetivo constante** sobre el valor, el escudo hereda el riesgo del negocio y se descuenta a **Ku** (Harris-Pringle, Ruback, Fernández).',
          'Para un escudo en **crecimiento perpetuo**, Fernández propone VTS = D·Tc·Ku / (Ku − g). El simulador permite mover entre descontar a **Kd** (escudo más valioso) y a **Ku** (escudo más conservador) y ver cómo cambia el aporte de la deuda al valor.',
          '**Aclaración importante:** esta versión asume **deducibilidad automática y perfecta** —que la empresa siempre tiene impuesto contra el cual deducir—. En PyMEs volátiles de emergentes ese supuesto se rompe, y el escudo se vuelve **riesgoso** (ítem 3). Esta es la versión "de manual"; el caso real exige el tratamiento condicionado.',
        ],
      },
      {
        heading: 'Interrelación y decisiones',
        paragraphs: [
          'Este escudo es **lo que la deuda agrega**; en el APV se compara contra **lo que la deuda cuesta** vía dificultades financieras (ítem 4). La deuda crea valor neto solo si **VP(escudo) > VP(dificultades)**: ese balance es la decisión de estructura de capital (ítem 5).',
          '**Error frecuente:** tratar el escudo como un regalo ilimitado ("más deuda, más escudo, más valor") sin reconocer su contracara de riesgo. El APV existe justamente para poner las dos fuerzas, una al lado de la otra.',
        ],
      },
    ],
    model: {
      excelTitle: 'Vu + VP del escudo fiscal',
      inputs: [
        { key: 'vu', label: 'Valor desapalancado (Vu)', value: 4200, min: 0, max: 12000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'deuda', label: 'Deuda financiera (D)', value: 2600, min: 0, max: 8000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tax', label: 'Tasa de impuesto (Tc)', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'ku', label: 'Ku (costo desapalancado)', value: 0.2, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.03, min: -0.02, max: 0.08, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ahorroAnual', label: 'Ahorro fiscal anual (Tc·Ku·D)', fmt: 'money', calc: (v) => v.tax * v.ku * v.deuda, xl: '[tax]*[ku]*[deuda]' },
        { key: 'vts', label: 'VP del escudo fiscal (Fernández)', fmt: 'money', calc: (v) => (v.ku > v.g ? (v.deuda * v.tax * v.ku) / (v.ku - v.g) : NaN), xl: 'IF([ku]>[g],[deuda]*[tax]*[ku]/([ku]-[g]),NA())' },
        { key: 'apvParcial', label: 'Vu + escudo (antes de dificultades)', fmt: 'money', highlight: true, calc: (v) => v.vu + (v.ku > v.g ? (v.deuda * v.tax * v.ku) / (v.ku - v.g) : NaN), xl: 'IF([ku]>[g],[vu]+[vts],NA())' },
      ],
      conclusions: [
        {
          test: (v) => v.deuda > 0 && v.ku > v.g,
          good: 'La deuda agrega valor por el escudo fiscal: el VP del ahorro de impuestos se suma al Vu y eleva el valor de la firma. Recordá que este es el beneficio BRUTO; falta restar las dificultades financieras (ítem 4).',
          bad: 'Sin deuda no hay escudo fiscal: el valor es solo el Vu (operación pura). O bien Ku ≤ g, lo que rompe la perpetuidad. Revisá los supuestos.',
          xl: 'IF(AND([deuda]>0,[ku]>[g]),"La deuda agrega "&TEXT([vts],"#,##0")&" por el escudo fiscal: el valor sube a "&TEXT([apvParcial],"#,##0")&". Es el beneficio BRUTO; falta restar dificultades.","Sin deuda no hay escudo (valor = Vu) o Ku<=g rompe la perpetuidad. Revisa supuestos.")',
        },
      ],
      chart: { sweepKey: 'deuda', outKey: 'vts', xLabel: 'Deuda', yLabel: 'VP del escudo', yFmt: 'money' },
    },
    promptConcepts: ['APV = Vu + VP(escudo) − VP(dificultades)', 'Vu: valor desapalancado descontado a Ku', 'Escudo fiscal = VP de Tc·Intereses', 'Tasa del escudo según política de deuda (Kd vs Ku, Fernández)', 'El escudo es el beneficio BRUTO de la deuda'],
  },

  {
    id: 's10-i3',
    week: 10,
    order: 3,
    title: 'El escudo fiscal RIESGOSO (Vélez-Pareja)',
    subtitle: 'Por qué en una PyME volátil el escudo se descuenta cerca de Ku y no de Kd',
    framework: 'Vélez-Pareja · Tham · APV emergente',
    theory: [
      {
        heading: 'El supuesto que se rompe en una PyME emergente',
        paragraphs: [
          'Las fórmulas clásicas del escudo asumen **deducibilidad automática y perfecta**: que la empresa **siempre** tiene impuesto contra el cual deducir los intereses. **Vélez-Pareja** muestra que en PyMEs y mercados emergentes eso **no se cumple**. El derecho a deducir se **devenga** contablemente, pero su **realización efectiva** depende de que el negocio genere **resultado operativo (EBITO)** suficiente para absorber la deducción.',
          'Si la PyME tiene un mal año y el EBITO no alcanza, el escudo de ese año se **reduce o desaparece**. Por eso el riesgo del escudo **no** está atado solo al riesgo de default de la deuda: está atado al **riesgo de realización operativa** del negocio, que es el riesgo de **Ku**. El escudo se parece más a la operación que a la deuda.',
          'Vélez-Pareja lo formaliza con una **función a trozos**: si EBITO ≥ intereses, escudo pleno (Tc·intereses); si 0 < EBITO < intereses, escudo parcial (Tc·EBITO); si EBITO ≤ 0, **escudo cero** ese año (con eventual quebranto diferido, que además se **erosiona por inflación** en emergentes). El escudo deja de ser un flujo seguro y pasa a ser **riesgoso y condicionado**.',
        ],
      },
      {
        heading: 'La tasa ponderada psi: ni Kd ni Ku, sino una mezcla',
        paragraphs: [
          'Como el escudo comparte **dos riesgos** —el de la deuda (Kd) y el operativo de realización (Ku)—, la tasa de descuento correcta es una **ponderada**: **psi = Wdr·Kd + W_EBITO·Ku**. Wdr es el peso del riesgo de deuda (la parte tan segura como la deuda misma) y W_EBITO el del riesgo operativo (la parte que depende de generar EBITO), con Wdr + W_EBITO = 1.',
          'Cuanto **más dependa** el escudo de la realización operativa (mayor W_EBITO), más se parece su riesgo al del negocio, **más alto es psi** y **menor el VP del escudo**. Ese es el mecanismo que **evita sobrevalorar** el beneficio de la deuda en una PyME volátil. Descontar a Kd (como si el escudo fuera seguro) **infla** el valor.',
          'Vélez-Pareja estima los pesos con tres enfoques que dan resultados muy dispares. El más realista para una PyME volátil de emergente es el de la **probabilidad de default histórica**: como la empresa casi nunca quiebra (Wdr muy bajo, ~0,1%), lo que de verdad pone en duda el escudo no es el default sino **no tener EBITO**. Entonces W_EBITO se lleva casi todo el peso y **psi ≈ Ku**.',
        ],
      },
      {
        heading: 'Interrelación y la lección de fondo',
        paragraphs: [
          'Este ítem corrige al ítem 2: el escudo "de manual" (a Kd o Ku perfecto) vale más que el escudo **riesgoso** (a psi cercano a Ku). La diferencia es **cuánto menos** agrega realmente la deuda al valor cuando la operación es volátil. Alimenta directo el balance del APV (ítem 5): un escudo más chico exige más cautela con el endeudamiento.',
          '**La lección:** en emergentes, el beneficio fiscal de la deuda **no es lo que promete el manual**. La misma volatilidad que hace riesgoso al negocio hace riesgoso al escudo. Quien valúa una PyME con el escudo perfecto a Kd, sobreestima sistemáticamente el valor de endeudarse.',
        ],
      },
    ],
    model: {
      excelTitle: 'Escudo fiscal riesgoso (tasa psi de Vélez-Pareja)',
      inputs: [
        { key: 'intereses', label: 'Intereses anuales (FE)', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'tax', label: 'Tasa de impuesto (Tc)', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'kd', label: 'Kd (costo de la deuda)', value: 0.18, min: 0.05, max: 0.45, step: 0.005, fmt: 'pct' },
        { key: 'ku', label: 'Ku (costo desapalancado)', value: 0.22, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
        { key: 'wEbito', label: 'Peso del riesgo operativo (W_EBITO)', value: 0.99, min: 0, max: 1, step: 0.01, fmt: 'pct' },
        { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.03, min: -0.02, max: 0.08, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ahorroAnual', label: 'Ahorro fiscal anual (Tc·FE)', fmt: 'money', calc: (v) => v.tax * v.intereses, xl: '[tax]*[intereses]' },
        { key: 'psi', label: 'Tasa ponderada psi', fmt: 'pct', highlight: true, calc: (v) => (1 - v.wEbito) * v.kd + v.wEbito * v.ku, xl: '(1-[wEbito])*[kd]+[wEbito]*[ku]' },
        { key: 'vtsRiesgoso', label: 'VP escudo riesgoso (a psi)', fmt: 'money', calc: (v) => { const psi = (1 - v.wEbito) * v.kd + v.wEbito * v.ku; return psi > v.g ? (v.tax * v.intereses) / (psi - v.g) : NaN }, xl: 'IF([psi]>[g],[ahorroAnual]/([psi]-[g]),NA())' },
        { key: 'vtsSeguro', label: 'VP escudo "de manual" (a Kd)', fmt: 'money', calc: (v) => (v.kd > v.g ? (v.tax * v.intereses) / (v.kd - v.g) : NaN), xl: 'IF([kd]>[g],[ahorroAnual]/([kd]-[g]),NA())' },
      ],
      conclusions: [
        {
          test: (v) => ((1 - v.wEbito) * v.kd + v.wEbito * v.ku) > v.kd,
          good: 'Al reconocer el riesgo operativo, psi sube por encima de Kd y el escudo riesgoso vale MENOS que el "de manual". Esa diferencia es la sobrevaloración que evitás: la deuda agrega menos de lo que promete el libro.',
          bad: 'Con W_EBITO bajo (o Ku ≤ Kd) el escudo se trata casi como deuda segura y psi no supera a Kd: estás asumiendo deducibilidad casi perfecta. En una PyME volátil eso sobrevalora el escudo.',
          xl: 'IF([psi]>[kd],"Al reconocer el riesgo operativo, psi ("&TEXT([psi],"0.0%")&") supera a Kd ("&TEXT([kd],"0.0%")&"): el escudo riesgoso vale "&TEXT([vtsRiesgoso],"#,##0")&" vs "&TEXT([vtsSeguro],"#,##0")&" del manual. Evitas esa sobrevaloracion.","Con W_EBITO bajo el escudo se trata casi como deuda segura: sobrevalora en una PyME volatil.")',
        },
      ],
      chart: { sweepKey: 'wEbito', outKey: 'vtsRiesgoso', xLabel: 'Peso riesgo operativo', yLabel: 'VP escudo riesgoso', yFmt: 'money' },
    },
    promptConcepts: ['Escudo riesgoso: deducibilidad NO automática (Vélez-Pareja)', 'Función a trozos del escudo según EBITO vs intereses', 'Tasa ponderada psi = Wdr·Kd + W_EBITO·Ku', 'Por qué psi ≈ Ku cuando el default es raro', 'Descontar a Kd sobrevalora el escudo en emergentes'],
  },

  {
    id: 's10-i4',
    week: 10,
    order: 4,
    title: 'Dificultades financieras: probabilidad de default y Altman Z\'\' EMS',
    subtitle: 'El costo esperado de la quiebra que resta valor en el APV',
    framework: 'Altman Z\'\' EMS · dificultades-financieras · APV',
    theory: [
      {
        heading: 'El contrapeso del escudo: lo que la deuda cuesta',
        paragraphs: [
          'Más deuda no es solo más escudo fiscal: también es **más probabilidad de insolvencia** y, con ella, un **costo esperado de dificultades financieras** que **resta** valor en el APV. Omitirlo produce valuaciones optimistas que sobreestiman el beneficio de endeudarse. Las PyMEs de emergentes, con ratios de deuda/activo altos y pocas alternativas a la banca, son especialmente vulnerables.',
          'El costo esperado se arma como **P(default) × costos ex-post**, descontado a Ku (si el riesgo nace de la operación) o a la tasa de la deuda: **VP(dificultades) = Σ [P(default)·Costos] / (1+Ku)^t**. Los **costos ex-post** son los que aparecen **si** ocurre la quiebra: directos (honorarios legales y concursales) e indirectos (pérdida de clientes, corte de proveedores, fuga de talento clave), estos últimos casi siempre mayores.',
          'La severidad de esos costos depende de dos factores: la **tangibilidad de los activos** (más activos fijos = más garantías = menos costo de liquidación) y la **concentración de la propiedad** (una familia dueña acuerda rápido y evita la destrucción de un concurso largo). Dos PyMEs con igual P(default) pueden tener costos esperados muy distintos.',
        ],
      },
      {
        heading: 'Estimar la probabilidad: el Altman Z\'\' para emergentes',
        paragraphs: [
          'Para PyMEs **sin calificación crediticia**, la herramienta es el **Altman Z\'\' ajustado para mercados emergentes (EMS)**. Su clave es que **suprime el indicador de rotación (Ventas/Activos, el X5)** para neutralizar los sesgos de sector y tamaño, e incorpora una constante de estandarización de **3,25**. Todos sus componentes salen de **valores contables**, porque la empresa no cotiza.',
          'La fórmula es **Z\'\' = 3,25 + 6,56·X1 + 3,26·X2 + 6,72·X3 + 1,05·X4**, donde X1 = capital de trabajo/activos (liquidez), X2 = utilidades retenidas/activos (autofinanciamiento histórico), X3 = EBIT/activos (productividad operativa) y X4 = patrimonio en libros/pasivos (solvencia). Las zonas: **Z\'\' > 2,6 segura**, **1,1–2,6 gris/alerta**, **Z\'\' < 1,1 dificultades** (alta probabilidad de quiebra).',
          'El Z\'\' da una **clasificación** del riesgo; para una probabilidad puntual y dinámica que entre a la fórmula del VP suele complementarse con el **logit de panel de Pindado** (que produce una P continua a partir de EBIT/activos, intereses/activos y reservas/activos). El simulador convierte la zona del Z\'\' en una P(default) aproximada para estimar el costo esperado.',
        ],
      },
      {
        heading: 'Interrelación y el balance del APV',
        paragraphs: [
          'Este componente **resta** al APV y es el contrapeso directo del escudo (ítems 2 y 3). La pregunta del APV es: **¿VP(escudo) > VP(dificultades)?** Si el costo esperado de la quiebra supera al ahorro fiscal, **endeudarse destruye valor**, por más tentador que luzca el escudo. Ese balance se cierra en el ítem 5.',
          '**Andina** es un caso de alerta: con un EBIT de 830 contra intereses de 560, la cobertura es apenas ~1,5x y la caja está siempre tensa. Su Z\'\' debería vigilarse de cerca: está justamente en la franja donde la probabilidad de dificultades empieza a pesar sobre el valor.',
        ],
      },
    ],
    model: {
      excelTitle: 'Dificultades financieras — Altman Z\'\' EMS y costo esperado',
      inputs: [
        { key: 'x1', label: 'X1 = Capital de trabajo / Activos', value: 0.12, min: -0.3, max: 0.6, step: 0.01, fmt: 'num2' },
        { key: 'x2', label: 'X2 = Utilidades retenidas / Activos', value: 0.18, min: -0.3, max: 0.8, step: 0.01, fmt: 'num2' },
        { key: 'x3', label: 'X3 = EBIT / Activos', value: 0.08, min: -0.2, max: 0.4, step: 0.01, fmt: 'num2' },
        { key: 'x4', label: 'X4 = Patrimonio (libros) / Pasivos', value: 0.6, min: 0, max: 3, step: 0.05, fmt: 'num2' },
        { key: 'valorActivos', label: 'Valor de los activos', value: 7000, min: 0, max: 20000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'costoExPost', label: 'Costos ex-post (% del valor si quiebra)', value: 0.25, min: 0.05, max: 0.6, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'zEms', label: 'Altman Z\'\' EMS', fmt: 'num2', highlight: true, calc: (v) => 3.25 + 6.56 * v.x1 + 3.26 * v.x2 + 6.72 * v.x3 + 1.05 * v.x4, xl: '3.25+6.56*[x1]+3.26*[x2]+6.72*[x3]+1.05*[x4]' },
        { key: 'pDefault', label: 'P(default) aproximada por zona', fmt: 'pct', calc: (v) => { const z = 3.25 + 6.56 * v.x1 + 3.26 * v.x2 + 6.72 * v.x3 + 1.05 * v.x4; return z > 2.6 ? 0.02 : (z >= 1.1 ? 0.1 : 0.3) }, xl: 'IF([zEms]>2.6,0.02,IF([zEms]>=1.1,0.1,0.3))' },
        { key: 'costoEsperado', label: 'Costo esperado de dificultades', fmt: 'money', calc: (v) => { const z = 3.25 + 6.56 * v.x1 + 3.26 * v.x2 + 6.72 * v.x3 + 1.05 * v.x4; const p = z > 2.6 ? 0.02 : (z >= 1.1 ? 0.1 : 0.3); return p * v.costoExPost * v.valorActivos }, xl: '[pDefault]*[costoExPost]*[valorActivos]' },
      ],
      conclusions: [
        {
          test: (v) => (3.25 + 6.56 * v.x1 + 3.26 * v.x2 + 6.72 * v.x3 + 1.05 * v.x4) > 2.6,
          good: 'El Z\'\' está en zona SEGURA (> 2,6): la probabilidad de dificultades es baja y el costo esperado pesa poco. Hay margen para que el escudo fiscal supere a las dificultades.',
          bad: 'El Z\'\' está en zona GRIS o de DIFICULTADES (≤ 2,6): la probabilidad de insolvencia es relevante y el costo esperado empieza a comerse el beneficio fiscal. Cuidado con sumar más deuda.',
          xl: 'IF([zEms]>2.6,"El Z\'\' ("&TEXT([zEms],"0.00")&") esta en zona SEGURA: P(default) baja y costo esperado "&TEXT([costoEsperado],"#,##0")&". Hay margen para que el escudo supere a las dificultades.","El Z\'\' ("&TEXT([zEms],"0.00")&") esta en zona gris/dificultades: costo esperado "&TEXT([costoEsperado],"#,##0")&". Cuidado con mas deuda.")',
        },
      ],
      chart: { sweepKey: 'x3', outKey: 'zEms', xLabel: 'EBIT / Activos (X3)', yLabel: 'Altman Z\'\' EMS', yFmt: 'num2' },
    },
    promptConcepts: ['VP(dificultades) = Σ P(default)·Costos / (1+Ku)^t', 'Altman Z\'\' EMS = 3,25 + 6,56·X1 + 3,26·X2 + 6,72·X3 + 1,05·X4', 'Por qué se suprime X5 (rotación) en emergentes', 'Zonas: segura (>2,6) / gris / dificultades (<1,1)', 'Costos ex-post directos e indirectos; severidad por tangibilidad'],
  },

  {
    id: 's10-i5',
    week: 10,
    order: 5,
    title: 'Nivel óptimo de deuda y cobertura de intereses',
    subtitle: 'Modigliani-Miller en la práctica: dónde el escudo deja de compensar el riesgo',
    framework: 'Modigliani-Miller (trade-off) · APV · cobertura',
    theory: [
      {
        heading: 'El trade-off: escudo contra dificultades',
        paragraphs: [
          '**Modigliani-Miller** sin fricciones dice que la estructura financiera no cambia el valor. En la práctica, con impuestos y costos de quiebra, aparece un **trade-off**: la deuda **agrega** valor por el escudo fiscal (ítems 2-3) y **resta** valor por el costo esperado de dificultades (ítem 4). El **valor de la firma con deuda** es Vu + VP(escudo) − VP(dificultades).',
          'Al principio domina el escudo: agregar deuda **sube** el valor. Pero a medida que la deuda crece, la probabilidad de insolvencia se acelera y el costo esperado de dificultades crece **más rápido** que el escudo. Hay un punto donde la pendiente se da vuelta: ese es el **nivel óptimo de deuda**, el que **maximiza el valor de la firma**.',
          'Pasado el óptimo, **más deuda destruye valor**: el escudo marginal ya no alcanza a compensar el riesgo marginal de quiebra. La teoría del trade-off explica por qué las empresas no se endeudan al 100% aunque el escudo sea atractivo, y por qué cada negocio tiene su propio óptimo según su volatilidad operativa.',
        ],
      },
      {
        heading: 'La cobertura de intereses: el termómetro práctico',
        paragraphs: [
          'En el día a día, el ratio que resume todo esto es la **cobertura de intereses = EBIT / Intereses**. Mide cuántas veces el resultado operativo cubre la cuenta financiera. Una cobertura alta (>4-5x) indica holgura; una baja (<2x) significa que casi todo el operativo se va en intereses y cualquier traspié deja a la empresa sin con qué pagar.',
          'En **Andina** la cobertura es **830 / 560 ≈ 1,5x**: apenas vez y media. Es una señal de alarma: el resultado operativo apenas supera a los intereses, la caja vive tensa y un mal trimestre puede romper la cadena de pagos. Conecta directo con el **escudo riesgoso** (si el EBITO no alcanza, el escudo desaparece) y con el **Z\'\'** (baja cobertura empuja a zona gris).',
          '**Interrelación clave:** la cobertura es el puente entre el apalancamiento (ítem 1, GAF del ítem… del programa) y las dificultades financieras (ítem 4). Una cobertura de ~1,5x dice que Andina **ya está cerca o pasada de su óptimo de deuda**: el escudo que gana es chico frente al riesgo que carga.',
        ],
      },
      {
        heading: 'Qué decisiones habilita',
        paragraphs: [
          'Define **cuánta deuda tomar**: hasta el óptimo, no más. Orienta la **reestructuración de pasivos**: si la cobertura está por debajo de ~2x, la prioridad es desapalancar o abaratar la deuda antes que perseguir el escudo. Y fija una **alarma de gestión**: por debajo de cierto umbral de cobertura, el riesgo financiero manda sobre cualquier beneficio fiscal.',
          'El simulador permite mover la deuda y ver cómo el valor de la firma sube, llega a un máximo y luego cae: la mejor forma de internalizar que el endeudamiento óptimo **no es ni cero ni el máximo**, sino el punto donde el escudo marginal iguala al riesgo marginal.',
        ],
      },
    ],
    model: {
      excelTitle: 'Nivel óptimo de deuda y cobertura',
      inputs: [
        { key: 'ebit', label: 'EBIT (resultado operativo)', value: 830, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'intereses', label: 'Intereses (deuda actual)', value: 560, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'vu', label: 'Valor desapalancado (Vu)', value: 4200, min: 0, max: 12000, step: 50, unit: 'k', fmt: 'money' },
        { key: 'tax', label: 'Tasa de impuesto (Tc)', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
        { key: 'kd', label: 'Kd (costo de la deuda)', value: 0.18, min: 0.05, max: 0.45, step: 0.005, fmt: 'pct' },
        { key: 'costoDistress', label: 'Costo esperado de dificultades', value: 350, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'cobertura', label: 'Cobertura de intereses (EBIT/Int)', fmt: 'x', highlight: true, calc: (v) => (v.intereses > 0 ? v.ebit / v.intereses : NaN), xl: 'IF([intereses]>0,[ebit]/[intereses],NA())' },
        { key: 'deuda', label: 'Deuda implícita (Intereses/Kd)', fmt: 'money', calc: (v) => (v.kd > 0 ? v.intereses / v.kd : NaN), xl: 'IF([kd]>0,[intereses]/[kd],NA())' },
        { key: 'escudo', label: 'VP del escudo (Tc·D)', fmt: 'money', calc: (v) => (v.kd > 0 ? v.tax * (v.intereses / v.kd) : NaN), xl: 'IF([kd]>0,[tax]*[deuda],NA())' },
        { key: 'valorFirma', label: 'Valor firma (Vu + escudo − dificultades)', fmt: 'money', calc: (v) => v.vu + (v.kd > 0 ? v.tax * (v.intereses / v.kd) : NaN) - v.costoDistress, xl: 'IF([kd]>0,[vu]+[escudo]-[costoDistress],NA())' },
      ],
      conclusions: [
        {
          test: (v) => v.intereses > 0 && v.ebit / v.intereses >= 2,
          good: 'La cobertura es ≥ 2x: el resultado operativo cubre con holgura los intereses y hay margen para que el escudo fiscal compense las dificultades. Estás del lado sano del óptimo de deuda.',
          bad: 'La cobertura es < 2x: el operativo apenas tapa los intereses (Andina ~1,5x). El riesgo financiero pesa más que el escudo: probablemente estés pasado del óptimo. Prioridad: desapalancar o abaratar la deuda.',
          xl: 'IF([cobertura]>=2,"Cobertura "&TEXT([cobertura],"0.0")&"x: el operativo cubre con holgura. Hay margen para que el escudo compense las dificultades. Lado sano del optimo.","Cobertura "&TEXT([cobertura],"0.0")&"x (Andina ~1.5x): el operativo apenas tapa los intereses. El riesgo pesa mas que el escudo: desapalancar o abaratar la deuda.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'cobertura', xLabel: 'Intereses', yLabel: 'Cobertura (x)', yFmt: 'x' },
    },
    promptConcepts: ['Trade-off de Modigliani-Miller: escudo vs dificultades', 'Nivel óptimo de deuda (maximiza Vu + escudo − dificultades)', 'Cobertura de intereses = EBIT / Intereses', 'Andina: 830/560 ≈ 1,5x (señal de alarma)', 'Por qué el óptimo no es ni cero ni el máximo de deuda'],
  },
]
