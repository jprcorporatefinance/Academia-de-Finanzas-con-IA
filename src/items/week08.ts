import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 8 — Bienes de Uso y CAPEX
// Caso central: "Andina Manufacturas S.A." (terreno 350/900, maquinaria
// 1450/1150, CAPEX 440, amortizaciones 290, NOPAT vía EBIT 830).
// Incorpora: ronic (RONIC, tasa de reinversión, g = RONIC × IR) y
// value-generation-emerging-markets / value-driver-interrelations.
// ============================================================================

export const week08: ItemSpec[] = [
  {
    id: 's08-i1',
    week: 8,
    order: 1,
    title: 'CAPEX vs. bien de uso contable',
    subtitle: 'La inversión real del período frente a la amortización del libro',
    framework: 'Bienes de uso · CAPEX vs. D&A',
    theory: [
      {
        heading: 'Dos cosas que se confunden todo el tiempo',
        paragraphs: [
          'El **CAPEX (Capital Expenditure)** es la **plata real que sale de la caja** para comprar o mejorar activos fijos en el período: una máquina nueva, una ampliación, un rodado. Es un movimiento de **caja**, va en el flujo de inversión. La **amortización (D&A)** es otra cosa: es el reparto contable del costo de un activo ya comprado a lo largo de su vida útil. **No mueve caja**: es un asiento que reconoce el desgaste.',
          'La confusión es clásica porque ambos hablan de activos fijos, pero viven en estados distintos. El CAPEX aparece en el **cash flow de inversión**; la amortización aparece en el **estado de resultados** (resta para llegar al EBIT) y se **suma de vuelta** en el flujo operativo porque no fue una salida de plata. En **Andina** conviven los dos: CAPEX de **440** (compra de maquinaria, sale caja) y amortizaciones de **290** (cargo contable, no sale caja).',
          'La diferencia entre ambos cuenta una historia. Si el **CAPEX supera a la amortización**, la empresa está **invirtiendo más rápido de lo que se desgasta**: el stock de activos crece (Andina, 440 vs. 290, está creciendo su base de activos). Si el CAPEX es **menor** que la amortización, la empresa está **dejando envejecer** sus activos sin reponerlos: vive de su capital, lo que tarde o temprano se paga.',
        ],
      },
      {
        heading: 'Por qué importa para la caja y para el valor',
        paragraphs: [
          'En el flujo de fondos libre (**FCFF**), el CAPEX **resta caja real** y la amortización se **suma de vuelta** (porque se había restado en el resultado sin ser salida). La **inversión neta** en activos fijos = CAPEX − amortización es lo que efectivamente se sumó a la base de activos. Ese número, más el cambio en capital de trabajo (Semana 7), es la **inversión neta total** que alimenta el RONIC (ítem 3).',
          'Un **CAPEX mal clasificado** distorsiona todo: si se carga como gasto algo que es inversión (o al revés), se rompe el EBIT, la amortización futura y el flujo. Y un CAPEX crónicamente menor a la amortización ininfla la caja de corto plazo a costa de descapitalizar la empresa: caja "linda" hoy, máquinas obsoletas mañana (parte de la maquinaria de Andina ya está tecnológicamente obsoleta).',
          '**Interrelación clave:** el CAPEX y la amortización son los ladrillos de la **inversión neta** que va al denominador del RONIC (ítem 3) y a la **tasa de reinversión** (ítem 4). Distinguir mantenimiento de expansión (ítem 5) decide cuánto de ese CAPEX sostiene el negocio y cuánto lo hace crecer.',
        ],
      },
    ],
    model: {
      excelTitle: 'CAPEX vs. amortización — inversión neta',
      inputs: [
        { key: 'capex', label: 'CAPEX del período', value: 440, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'amort', label: 'Amortización del período', value: 290, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'activosFijos', label: 'Activos fijos netos (inicio)', value: 2700, min: 0, max: 8000, step: 50, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'invNeta', label: 'Inversión neta en activos fijos', fmt: 'money', highlight: true, calc: (v) => v.capex - v.amort, xl: '[capex]-[amort]' },
        { key: 'ratioCapexAmort', label: 'CAPEX / Amortización', fmt: 'x', calc: (v) => v.capex / v.amort, xl: '[capex]/[amort]' },
        { key: 'crecActivos', label: 'Crecimiento de la base de activos', fmt: 'pct', calc: (v) => (v.capex - v.amort) / v.activosFijos, xl: '([capex]-[amort])/[activosFijos]' },
      ],
      conclusions: [
        {
          test: (v) => v.capex >= v.amort,
          good: 'El CAPEX supera a la amortización: la empresa invierte más rápido de lo que se desgasta y su base de activos CRECE. Esa inversión neta alimenta el RONIC y el crecimiento.',
          bad: 'El CAPEX es menor a la amortización: la empresa deja envejecer sus activos sin reponerlos. La caja de corto plazo luce mejor, pero se está descapitalizando.',
          xl: 'IF([capex]>=[amort],"El CAPEX ("&TEXT([capex],"#,##0")&") supera a la amortizacion ("&TEXT([amort],"#,##0")&"): inversion neta "&TEXT([invNeta],"#,##0")&", la base de activos crece "&TEXT([crecActivos],"0.0%")&".","El CAPEX es menor a la amortizacion: la empresa se descapitaliza. Caja linda hoy, activos obsoletos manana.")',
        },
      ],
      chart: { sweepKey: 'capex', outKey: 'invNeta', xLabel: 'CAPEX', yLabel: 'Inversión neta', yFmt: 'money' },
    },
    promptConcepts: ['CAPEX = salida real de caja por activos fijos (flujo de inversión)', 'Amortización = cargo contable sin movimiento de caja (resultado)', 'Inversión neta = CAPEX − amortización', 'CAPEX > amortización: la base de activos crece; CAPEX < amortización: se descapitaliza', 'Cómo la inversión neta alimenta el RONIC y la tasa de reinversión'],
  },

  {
    id: 's08-i2',
    week: 8,
    order: 2,
    title: 'Valor contable vs. valor de mercado de los activos fijos',
    subtitle: 'El terreno escondido y la maquinaria sobrevaluada (book vs. real)',
    framework: 'value-generation-emerging-markets · book vs. real',
    theory: [
      {
        heading: 'El libro miente en las dos direcciones',
        paragraphs: [
          'El **valor contable** (book) de un activo fijo es su costo histórico menos la amortización acumulada. El **valor de mercado** (real) es lo que efectivamente valdría si se vendiera hoy. Casi nunca coinciden, y la brecha va en **las dos direcciones**: hay activos que valen **mucho más** que su libro (activos ocultos) y otros que valen **mucho menos** (sobrevaluados).',
          'En **Andina** conviven los dos casos. El **terreno** figura a costo histórico de **350** pero a precio de mercado vale **900**: un activo oculto de 550 que la contabilidad no muestra (los terrenos no se amortizan y quedan congelados a un costo viejísimo). La **maquinaria** figura a **1450** de valor contable neto, pero parte está tecnológicamente obsoleta y a mercado vale solo **1150**: una sobrevaluación de 300 que el libro todavía arrastra.',
          'La razón de fondo es que la contabilidad de presentación usa el **costo histórico** y reglas de amortización fijas, que ignoran la inflación, la apreciación inmobiliaria y la obsolescencia tecnológica real. En una economía emergente con inflación, esa distorsión se agranda: los activos viejos quedan a valores irrisorios y la base contable pierde todo significado económico.',
        ],
      },
      {
        heading: 'Por qué la brecha cambia decisiones',
        paragraphs: [
          'La brecha book vs. real importa por varias razones. Para **valuar** la empresa, lo que cuenta es el valor real, no el libro: un comprador paga por el terreno 900, no 350. Para calcular el **ROIC** correctamente, el Capital Invertido debería medirse a valores económicos, no contables sobrevaluados o subvaluados. Y para decidir **vender o redesplegar** un activo, lo único relevante es el valor de mercado.',
          'El **activo oculto** (terreno 350 → 900) es valor que está ahí, invisible en el balance, y que un análisis de gestión debe sacar a la luz: puede ser garantía de crédito más barato, candidato a venta y *leaseback*, o simplemente patrimonio real que el dueño no está computando. La **sobrevaluación** (maquinaria 1450 → 1150) es lo opuesto: un activo que el libro infla y que, si el negocio rinde menos por usar máquinas obsoletas, hay que reconocer y eventualmente reemplazar (CAPEX de expansión, ítem 5).',
          '**Interrelación clave:** esta brecha es la misma lógica book vs. real que recorre todo el caso Andina (inventario obsoleto, cuentas incobrables de la Semana 7). Medir el Capital Invertido a valor real ajusta el **ROIC** hacia abajo o hacia arriba y, con él, el spread ROIC − WACC (Semana 9) y la valuación integral (Semana 12).',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Valuar una empresa por su patrimonio contable, ignorando activos ocultos (subvaluar) y sobrevaluaciones (sobrevaluar). Calcular el ROIC sobre un Capital Invertido contable distorsionado. Y no revaluar nunca los inmuebles, dejando un terreno que vale 900 escondido como 350 en el libro: patrimonio real que no se gestiona.',
        ],
      },
    ],
    model: {
      excelTitle: 'Valor contable vs. valor de mercado',
      inputs: [
        { key: 'terrenoBook', label: 'Terreno — valor contable', value: 350, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'terrenoReal', label: 'Terreno — valor de mercado', value: 900, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'maqBook', label: 'Maquinaria — valor contable', value: 1450, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'maqReal', label: 'Maquinaria — valor de mercado', value: 1150, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'money' },
      ],
      calcs: [
        { key: 'activoOculto', label: 'Activo oculto del terreno (real − book)', fmt: 'money', highlight: true, calc: (v) => v.terrenoReal - v.terrenoBook, xl: '[terrenoReal]-[terrenoBook]' },
        { key: 'sobrevaluacion', label: 'Sobrevaluación de la maquinaria (book − real)', fmt: 'money', calc: (v) => v.maqBook - v.maqReal, xl: '[maqBook]-[maqReal]' },
        { key: 'brechaNeta', label: 'Brecha neta de valor (real − book)', fmt: 'money', highlight: true, calc: (v) => v.terrenoReal + v.maqReal - (v.terrenoBook + v.maqBook), xl: '([terrenoReal]+[maqReal])-([terrenoBook]+[maqBook])' },
      ],
      conclusions: [
        {
          test: (v) => v.terrenoReal + v.maqReal - (v.terrenoBook + v.maqBook) > 0,
          good: 'El valor real de los activos SUPERA al contable: hay patrimonio oculto neto (el terreno apreciado pesa más que la maquinaria sobrevaluada). El libro subestima a la empresa.',
          bad: 'El valor real es MENOR al contable: la sobrevaluación de la maquinaria supera al activo oculto del terreno. El balance infla el patrimonio; el ROIC real es peor que el contable.',
          xl: 'IF([brechaNeta]>0,"El valor real supera al contable en "&TEXT([brechaNeta],"#,##0")&": hay patrimonio oculto neto (terreno +"&TEXT([activoOculto],"#,##0")&" vs maquinaria -"&TEXT([sobrevaluacion],"#,##0")&"). El libro subestima.","El valor real es menor al contable: la sobrevaluacion de la maquinaria pesa mas. El balance infla el patrimonio.")',
        },
      ],
      chart: { sweepKey: 'terrenoReal', outKey: 'brechaNeta', xLabel: 'Terreno a mercado', yLabel: 'Brecha neta de valor', yFmt: 'money' },
    },
    promptConcepts: ['Valor contable (costo histórico − amortización) vs. valor de mercado', 'Activo oculto: terreno a 350 en libros vale 900 a mercado', 'Sobrevaluación: maquinaria a 1450 en libros vale 1150 a mercado', 'Por qué la inflación y el costo histórico distorsionan la base contable', 'Medir el Capital Invertido a valor real para un ROIC correcto'],
  },

  {
    id: 's08-i3',
    week: 8,
    order: 3,
    title: 'RONIC: retorno sobre el capital nuevo invertido',
    subtitle: 'Qué rinde el próximo peso, no el promedio histórico',
    framework: 'ronic · Return on New Invested Capital',
    theory: [
      {
        heading: 'El espejo retrovisor y el parabrisas',
        paragraphs: [
          'El **RONIC (Return on New Invested Capital)** mide el retorno que la empresa obtiene sobre el capital **incremental** —el capital nuevo— que pone a trabajar en un período. Es distinto del **ROIC**, que mide el retorno sobre **todo** el stock de capital acumulado a lo largo de la historia. El ROIC mira el **espejo retrovisor** ("¿qué rinde, en promedio, todo lo que ya invertí?"); el RONIC mira el **parabrisas** ("¿qué rinde el próximo peso que invierto?").',
          'La distinción es filosa porque una empresa puede tener un ROIC histórico altísimo —heredado de inversiones viejas hechas cuando gozaba de una ventaja competitiva— y a la vez un RONIC bajo, porque los proyectos nuevos ya enfrentan competencia plena y rinden mucho menos. Para decidir si **conviene seguir invirtiendo**, el indicador correcto es el RONIC, no el ROIC.',
          'La fórmula es **RONIC = ΔNOPAT / ΔCapital Invertido**: el cambio en el resultado operativo después de impuestos dividido por la inversión neta del período (CAPEX + ΔCapital de trabajo − amortización, lo que efectivamente se sumó al capital). Con el rezago correcto, el capital que invertís en un período recién genera NOPAT en el siguiente.',
        ],
      },
      {
        heading: 'El teorema central: crecer no siempre crea valor',
        paragraphs: [
          'El RONIC gobierna la regla más importante de la asignación de capital: **el crecimiento solo crea valor si RONIC > WACC**. Si RONIC < WACC, **crecer destruye valor**. Si RONIC = WACC, el crecimiento es **irrelevante** (la empresa vale lo mismo crezca o no, NOPAT/WACC). Lo que crea valor no es el crecimiento en sí, sino el **spread RONIC − WACC**; el crecimiento es apenas un multiplicador de ese spread.',
          'La consecuencia es demoledora: dos empresas que crecen al mismo ritmo pueden valer cosas muy distintas según su RONIC. Una que reinvierte a RONIC del 20% con WACC del 10% crea valor; una que reinvierte al 6% con el mismo WACC se vuelve **más grande y más pobre** a la vez. En mercados emergentes el umbral es altísimo: el RONIC se compara contra un WACC que ya trae el riesgo país adentro (20%+), así que un proyecto con RONIC del 12% que en EE.UU. crearía valor, en Argentina probablemente lo destruye.',
          '**Interrelación clave:** el RONIC se construye con la inversión neta (CAPEX − amortización del ítem 1, más el ΔCapital de trabajo de la Semana 7) y se compara contra el **WACC** (Semana 9). Gobierna el **valor terminal** de la valuación (Semana 12): proyectar el TV con el ROIC histórico alto lo infla; el RONIC obliga a asumir que la competencia comprime los retornos hacia el WACC (*fade*).',
        ],
      },
      {
        heading: 'Errores frecuentes',
        paragraphs: [
          'Usar el ROIC histórico para decidir nuevas inversiones (mira el pasado, no el margen del próximo proyecto). Proyectar el valor terminal con un ROIC alto que la competencia normalmente erosiona. Y en una economía emergente, olvidar que el RONIC se mide contra un WACC con riesgo país: muchas inversiones "rentables" en términos operativos destruyen valor contra el costo de capital correcto.',
        ],
      },
    ],
    model: {
      excelTitle: 'RONIC — retorno del capital nuevo',
      inputs: [
        { key: 'deltaNopat', label: 'Δ NOPAT del período', value: 95, min: -200, max: 600, step: 5, unit: 'k', fmt: 'money' },
        { key: 'capex', label: 'CAPEX del período', value: 440, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'amort', label: 'Amortización del período', value: 290, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'deltaWC', label: 'Δ Capital de trabajo', value: 720, min: -500, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'wacc', label: 'WACC (con riesgo país)', value: 0.21, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'invNeta', label: 'Inversión neta (CAPEX − amort + ΔWC)', fmt: 'money', calc: (v) => v.capex - v.amort + v.deltaWC, xl: '[capex]-[amort]+[deltaWC]' },
        { key: 'ronic', label: 'RONIC = ΔNOPAT / inversión neta', fmt: 'pct', highlight: true, calc: (v) => v.deltaNopat / (v.capex - v.amort + v.deltaWC), xl: '[deltaNopat]/[invNeta]' },
        { key: 'spread', label: 'Spread RONIC − WACC', fmt: 'pct', highlight: true, calc: (v) => v.deltaNopat / (v.capex - v.amort + v.deltaWC) - v.wacc, xl: '[ronic]-[wacc]' },
      ],
      conclusions: [
        {
          test: (v) => v.deltaNopat / (v.capex - v.amort + v.deltaWC) > v.wacc,
          good: 'El RONIC supera al WACC: el capital NUEVO rinde más de lo que cuesta. Acá crecer CREA valor: conviene subir la reinversión mientras el spread se mantenga positivo.',
          bad: 'El RONIC es menor al WACC: el capital nuevo rinde menos de lo que cuesta. Acá crecer DESTRUYE valor (empresa más grande y más pobre): conviene distribuir la caja, no reinvertir.',
          xl: 'IF([ronic]>[wacc],"El RONIC ("&TEXT([ronic],"0.0%")&") supera al WACC ("&TEXT([wacc],"0.0%")&"): el capital nuevo CREA valor. Subir la reinversion mientras el spread sea positivo.","El RONIC ("&TEXT([ronic],"0.0%")&") es menor al WACC ("&TEXT([wacc],"0.0%")&"): crecer DESTRUYE valor. Distribuir la caja, no reinvertir.")',
        },
      ],
      chart: { sweepKey: 'deltaNopat', outKey: 'ronic', xLabel: 'Δ NOPAT', yLabel: 'RONIC', yFmt: 'pct' },
    },
    promptConcepts: ['RONIC = ΔNOPAT / ΔCapital Invertido (retorno del capital nuevo)', 'RONIC (parabrisas) vs. ROIC (espejo retrovisor)', 'Teorema: crecer crea valor solo si RONIC > WACC', 'Spread RONIC − WACC como motor del valor', 'Por qué el WACC con riesgo país eleva el umbral en mercados emergentes'],
  },

  {
    id: 's08-i4',
    week: 8,
    order: 4,
    title: 'Tasa de reinversión y crecimiento',
    subtitle: 'La identidad g = RONIC × tasa de reinversión',
    framework: 'ronic · identidad de crecimiento',
    theory: [
      {
        heading: 'El crecimiento no se desea: se financia',
        paragraphs: [
          'El crecimiento no es una aspiración: es el **resultado mecánico** de reinvertir capital a cierto retorno. La **identidad de crecimiento** del modelo de McKinsey lo formaliza: **g = RONIC × IR**, donde **g** es la tasa de crecimiento del NOPAT y **IR** es la **tasa de reinversión** (= inversión neta / NOPAT, la fracción del resultado operativo que se vuelve a poner a trabajar en lugar de distribuirse).',
          'La lectura es potente: para crecer a una tasa **g**, hay que reinvertir una fracción **IR = g / RONIC** del NOPAT. Si el RONIC es alto, se necesita reinvertir poco para crecer al mismo ritmo, y queda **más caja libre** (FCFF). Si el RONIC es bajo, hay que reinvertir muchísimo para lograr el mismo crecimiento, y queda poca caja. El RONIC gobierna cuánto FCFF sobrevive después de financiar el crecimiento.',
          'Despejando, **FCFF = NOPAT × (1 − IR) = NOPAT × (1 − g/RONIC)**: el término (1 − g/RONIC) es la fracción del NOPAT que **no** hace falta reinvertir y queda libre. Esa es la bisagra del *key value driver*: Value = NOPAT₁ × (1 − g/RONIC) / (WACC − g). Crecimiento, reinversión, RONIC y valor son **un solo sistema**, no piezas sueltas.',
        ],
      },
      {
        heading: 'Crecimiento que crea valor vs. crecimiento que lo destruye',
        paragraphs: [
          'No todo crecimiento es bueno. Si el **RONIC > WACC**, reinvertir más (subir IR) **crea valor**: cada peso reinvertido rinde por encima del costo del capital. Si el **RONIC < WACC**, reinvertir más **destruye valor**: conviene bajar la reinversión y **distribuir** la caja. La política de dividendos no es independiente de la inversión: es el **residuo** de la decisión de reinvertir solo en proyectos con spread positivo.',
          'Esto se conecta con el **crecimiento sostenible** (SGR = ROE × (1 − payout)): el único crecimiento genuino es el que sale de reinvertir a RONIC > WACC. Crecer endeudándose o reinvirtiendo a retornos por debajo del costo de capital es crecimiento "de cartón": agranda la empresa y la empobrece. En **Andina**, reinvertir agresivamente (CAPEX 440, capital de trabajo creciente) solo crea valor si el RONIC supera al WACC emergente del 20%+; si no, ese crecimiento es parte del problema.',
          'En mercados emergentes hay un matiz: el **cepo** y las restricciones al giro de dividendos distorsionan la regla. En teoría, si RONIC < WACC habría que distribuir; pero si la alternativa es dejar la caja en pesos licuándose o atrapada por restricciones cambiarias, a veces conviene reinvertir aun con RONIC marginal bajo, porque el retorno de la caja ociosa es todavía peor. La regla teórica se ajusta por la opción real de salida del capital.',
        ],
      },
      {
        heading: 'Interrelaciones y errores frecuentes',
        paragraphs: [
          '**Interrelación clave:** la tasa de reinversión usa la inversión neta del ítem 1 (CAPEX − amortización + ΔCapital de trabajo) sobre el NOPAT, y el RONIC del ítem 3. Juntos definen el **g** que alimenta la valuación por perpetuidad (Semana 12) y la **política de dividendos** (reinvertir mientras haya proyectos con RONIC > WACC, ítem 5: el mantenimiento es obligado, la expansión es opcional).',
          '**Errores frecuentes:** fijar una g de crecimiento "deseada" sin chequear que el RONIC la sostenga (querer crecer al 8% con un RONIC que solo banca el 3%). Reinvertir por inercia cuando el spread es negativo. Y confundir crecimiento de ventas con creación de valor: se puede crecer mucho y destruir valor si cada peso reinvertido rinde menos que el WACC.',
        ],
      },
    ],
    model: {
      excelTitle: 'Tasa de reinversión y crecimiento (g = RONIC × IR)',
      inputs: [
        { key: 'nopat', label: 'NOPAT del período', value: 540, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'invNeta', label: 'Inversión neta (CAPEX − amort + ΔWC)', value: 870, min: -500, max: 3000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'ronic', label: 'RONIC (retorno del capital nuevo)', value: 0.18, min: -0.1, max: 0.5, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC (con riesgo país)', value: 0.21, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ir', label: 'Tasa de reinversión (IR = inv. neta / NOPAT)', fmt: 'pct', highlight: true, calc: (v) => v.invNeta / v.nopat, xl: '[invNeta]/[nopat]' },
        { key: 'g', label: 'Crecimiento (g = RONIC × IR)', fmt: 'pct', highlight: true, calc: (v) => v.ronic * (v.invNeta / v.nopat), xl: '[ronic]*[ir]' },
        { key: 'fcff', label: 'FCFF = NOPAT × (1 − IR)', fmt: 'money', calc: (v) => v.nopat * (1 - v.invNeta / v.nopat), xl: '[nopat]*(1-[ir])' },
      ],
      conclusions: [
        {
          test: (v) => v.ronic > v.wacc,
          good: 'El RONIC supera al WACC: reinvertir CREA valor, así que subir la tasa de reinversión y crecer agranda el valor. La caja que se reinvierte rinde por encima del costo del capital.',
          bad: 'El RONIC es menor al WACC: reinvertir DESTRUYE valor. Conviene BAJAR la tasa de reinversión y distribuir la caja; crecer así solo agranda una empresa que rinde poco.',
          xl: 'IF([ronic]>[wacc],"El RONIC ("&TEXT([ronic],"0.0%")&") supera al WACC ("&TEXT([wacc],"0.0%")&"): reinvertir (IR "&TEXT([ir],"0.0%")&", g "&TEXT([g],"0.0%")&") CREA valor. Subir la reinversion agranda el valor.","El RONIC es menor al WACC: reinvertir DESTRUYE valor. Bajar la IR y distribuir; crecer asi empobrece.")',
        },
      ],
      chart: { sweepKey: 'ir', outKey: 'g', xLabel: 'Tasa de reinversión', yLabel: 'Crecimiento g', yFmt: 'pct' },
    },
    promptConcepts: ['Identidad g = RONIC × IR (tasa de reinversión)', 'IR = inversión neta / NOPAT; despeje IR = g / RONIC', 'FCFF = NOPAT × (1 − g/RONIC): la caja que sobrevive al crecimiento', 'Reinvertir crea valor solo si RONIC > WACC (si no, distribuir)', 'El ajuste por cepo: a veces reinvertir con RONIC bajo gana a la caja licuándose'],
  },

  {
    id: 's08-i5',
    week: 8,
    order: 5,
    title: 'CAPEX de mantenimiento vs. de expansión',
    subtitle: 'Lo que sostiene el negocio frente a lo que lo hace crecer',
    framework: 'CAPEX · mantenimiento vs. expansión',
    theory: [
      {
        heading: 'No todo el CAPEX es igual',
        paragraphs: [
          'El CAPEX total esconde dos animales muy distintos. El **CAPEX de mantenimiento** es el que sostiene la capacidad actual: reponer una máquina que se desgastó, mantener el galpón, renovar rodados. **No hace crecer** el negocio; solo evita que se caiga. El **CAPEX de expansión** es el que **agrega capacidad nueva**: una segunda línea de producción, una planta nueva, una máquina que amplía el volumen. Es el que **hace crecer** y, por lo tanto, el único que puede crear (o destruir) valor.',
          'Una aproximación práctica al **CAPEX de mantenimiento** es la propia **amortización**: en estado estacionario, reponer lo que se desgasta cuesta aproximadamente lo que se amortiza. Entonces el **CAPEX de expansión** ≈ CAPEX total − amortización = la **inversión neta** del ítem 1. En **Andina**, con CAPEX de 440 y amortización de 290, el mantenimiento absorbe ~290 y solo **~150 son expansión** real: el grueso del CAPEX apenas mantiene la máquina andando.',
          'La distinción es decisiva para el RONIC y la regla de crecimiento. El CAPEX de **mantenimiento es obligado** (sin él, el negocio se cae) y no debería evaluarse contra el WACC como una inversión opcional. El CAPEX de **expansión sí es opcional** y se rige por el teorema del ítem 3: solo conviene si su **RONIC supera al WACC**. Mezclar los dos lleva a evaluar mal ambos.',
        ],
      },
      {
        heading: 'Decidir bien sobre la parte que crea valor',
        paragraphs: [
          'El análisis correcto separa: primero se reserva el CAPEX de mantenimiento (no negociable, sostiene el flujo). Lo que queda —la **expansión**— es la verdadera decisión de asignación de capital, y se mide por su retorno marginal. Si la expansión rinde por encima del WACC, crea valor y conviene hacerla; si no, ese dinero rinde más distribuido o aplicado a comprimir el capital de trabajo (Semana 7).',
          'Esta separación también ordena el flujo de fondos: el **FCFF** descuenta el CAPEX total, pero para juzgar la **calidad** del crecimiento hay que mirar solo la expansión y su RONIC. Una empresa que dedica casi todo su CAPEX a mantenimiento está en modo "sostener", no "crecer", y su valor depende más de defender el spread actual que de expandir. En Andina, con poca expansión real y máquinas obsoletas, la pregunta es si conviene un salto de CAPEX de expansión que renueve tecnología (subiendo el RONIC futuro) o seguir apenas manteniendo activos viejos.',
          'En mercados emergentes, el CAPEX de expansión enfrenta una **opción real de diferir**: como el RONIC futuro es incierto por el riesgo país, esperar a que baje el costo de capital antes de hundir capital puede valer más que invertir ya. El mantenimiento no se difiere (el desgaste no espera); la expansión sí, y ese *timing* es parte de la decisión.',
        ],
      },
      {
        heading: 'Interrelaciones y errores frecuentes',
        paragraphs: [
          '**Interrelación clave:** la separación mantenimiento/expansión refina el RONIC (ítem 3) y la tasa de reinversión (ítem 4): la **inversión neta** que crea valor es esencialmente el CAPEX de expansión. Define qué parte del CAPEX se evalúa contra el WACC (Semana 9) y alimenta el crecimiento genuino en la valuación (Semana 12). Conecta con la brecha book vs. real (ítem 2): renovar maquinaria obsoleta es CAPEX de expansión que sube el valor real de los activos.',
          '**Errores frecuentes:** tratar todo el CAPEX como "inversión" y evaluar el mantenimiento contra el WACC (es obligado, no opcional). No reservar mantenimiento y creer que todo el CAPEX hace crecer. Y postergar el mantenimiento para inflar el flujo de corto plazo, descapitalizando el negocio (el CAPEX < amortización del ítem 1) hasta que las máquinas obsoletas terminan hundiendo el RONIC.',
        ],
      },
    ],
    model: {
      excelTitle: 'CAPEX de mantenimiento vs. de expansión',
      inputs: [
        { key: 'capexTotal', label: 'CAPEX total del período', value: 440, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'amort', label: 'Amortización (≈ CAPEX de mantenimiento)', value: 290, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'money' },
        { key: 'roEsperado', label: 'Retorno esperado del CAPEX de expansión', value: 0.16, min: -0.1, max: 0.5, step: 0.005, fmt: 'pct' },
        { key: 'wacc', label: 'WACC (con riesgo país)', value: 0.21, min: 0.08, max: 0.4, step: 0.005, fmt: 'pct' },
      ],
      calcs: [
        { key: 'capexMant', label: 'CAPEX de mantenimiento (obligado)', fmt: 'money', calc: (v) => Math.min(v.amort, v.capexTotal), xl: 'MIN([amort],[capexTotal])' },
        { key: 'capexExp', label: 'CAPEX de expansión (opcional)', fmt: 'money', highlight: true, calc: (v) => v.capexTotal - Math.min(v.amort, v.capexTotal), xl: '[capexTotal]-[capexMant]' },
        { key: 'pctExpansion', label: '% del CAPEX que es expansión', fmt: 'pct', calc: (v) => (v.capexTotal - Math.min(v.amort, v.capexTotal)) / v.capexTotal, xl: '[capexExp]/[capexTotal]' },
        { key: 'spreadExp', label: 'Spread de la expansión (retorno − WACC)', fmt: 'pct', highlight: true, calc: (v) => v.roEsperado - v.wacc, xl: '[roEsperado]-[wacc]' },
      ],
      conclusions: [
        {
          test: (v) => v.roEsperado > v.wacc,
          good: 'El CAPEX de expansión rinde por encima del WACC: la parte opcional del CAPEX CREA valor y conviene ejecutarla. El mantenimiento, aparte, es obligado y sostiene el flujo.',
          bad: 'El CAPEX de expansión rinde por debajo del WACC: la parte opcional DESTRUYE valor. Conviene hacer solo el mantenimiento y distribuir el resto, o diferir la expansión (opción real).',
          xl: 'IF([roEsperado]>[wacc],"El CAPEX de expansion ("&TEXT([capexExp],"#,##0")&", "&TEXT([pctExpansion],"0.0%")&" del total) rinde "&TEXT([roEsperado],"0.0%")&" > WACC "&TEXT([wacc],"0.0%")&": CREA valor, ejecutar.","La expansion rinde "&TEXT([roEsperado],"0.0%")&" < WACC "&TEXT([wacc],"0.0%")&": DESTRUYE valor. Solo mantenimiento; diferir o distribuir.")',
        },
      ],
      chart: { sweepKey: 'roEsperado', outKey: 'spreadExp', xLabel: 'Retorno de la expansión', yLabel: 'Spread vs. WACC', yFmt: 'pct' },
    },
    promptConcepts: ['CAPEX de mantenimiento: sostiene la capacidad actual (≈ amortización, obligado)', 'CAPEX de expansión: agrega capacidad nueva (≈ inversión neta, opcional)', 'Solo la expansión se evalúa contra el WACC (el mantenimiento es obligado)', 'La expansión crea valor solo si su retorno supera al WACC', 'Opción real de diferir la expansión cuando el RONIC futuro es incierto'],
  },
]
