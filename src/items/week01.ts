import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 1 — Lectura Contable (leer un balance y un estado de resultados)
// Caso central: Andina Manufacturas S.A. (cifras en miles de USD).
// Incorpora: value-generation-emerging-markets (GMROI, CCE) y la distancia
// entre resultado económico y caja financiera.
// ============================================================================

export const week01: ItemSpec[] = [
  {
    id: 's01-i1',
    week: 1,
    order: 1,
    title: 'Leer el Balance',
    subtitle: 'La ecuación que nunca se rompe: Activo = Pasivo + Patrimonio Neto',
    framework: 'Contabilidad básica · Estados financieros',
    theory: [
      {
        heading: 'La fotografía del patrimonio',
        paragraphs: [
          'El **Balance** (o Estado de Situación Patrimonial) es una **fotografía** de la empresa en un instante: qué tiene (**Activo**), qué debe (**Pasivo**) y qué les queda a los dueños (**Patrimonio Neto**). A diferencia del Estado de Resultados, que es una película de todo el año, el balance congela un momento —en Andina, el cierre del 31 de diciembre de 2024.',
          'La ley de hierro de la contabilidad es la **ecuación patrimonial**: **Activo = Pasivo + Patrimonio Neto**. Nunca se rompe, por construcción: todo lo que la empresa posee fue financiado por alguien, sea un acreedor (pasivo) o un dueño (patrimonio). El PN es, entonces, un **residuo**: lo que sobra del activo después de pagarle a todos los terceros.',
          'En **Andina 2024** el activo total suma 7.450 (corriente 4.810 + no corriente 2.640), el pasivo total 4.840 (corriente 3.250 + no corriente 1.070) y el patrimonio neto 2.770 (capital 600 + reservas 320 + resultados acumulados 1.850). La ecuación cierra: 7.450 = 4.840 + 2.770. Lo importante no es que cierre —siempre cierra—, sino **leer la historia** que cuentan esos números.',
        ],
      },
      {
        heading: 'Corriente vs. no corriente: la dimensión del tiempo',
        paragraphs: [
          'Tanto el activo como el pasivo se parten en **corriente** (se realiza o se paga dentro de los 12 meses) y **no corriente** (más allá del año). Esta partición no es burocracia: es la base de la **liquidez**. Comparar el activo corriente con el pasivo corriente dice si la empresa puede afrontar sus compromisos de corto plazo sin ahogarse.',
          'En Andina el activo corriente (4.810) supera al pasivo corriente (3.250), lo que da un **capital de trabajo** positivo de 1.560 y una razón corriente de 1,48. A primera vista, tranquiliza. Pero el diablo está en la composición: gran parte de ese activo corriente está **inmovilizado** en cuentas por cobrar (1.850) e inventarios (2.400) que rotan lento, mientras el pasivo corriente incluye deuda cara (descubierto 540, cheques diferidos 430).',
          'Esa es la primera lección de lectura crítica: un ratio sano en el agregado puede esconder **caja tensa**. Andina tiene capital de trabajo positivo y sin embargo recurre al descubierto bancario. El balance avisa, pero hay que saber mirar la calidad de cada línea, no solo su monto.',
        ],
      },
      {
        heading: 'Activo, pasivo y patrimonio: qué mirar en cada bloque',
        paragraphs: [
          'En el **activo**, la pregunta es: ¿está el capital trabajando o durmiendo? Inventarios y cuentas por cobrar que crecen más rápido que las ventas son una señal de alarma —capital atrapado que no genera retorno. En Andina, el inventario saltó de 1.850 (2023) a 2.400 (2024), +30%, mientras las ventas crecieron solo 11% (de 7.400 a 8.200): el stock crece casi tres veces más rápido que las ventas.',
          'En el **pasivo**, hay que distinguir la deuda **onerosa** (préstamos, descubierto, cheques: cuesta intereses) de la **no onerosa** (proveedores: financiamiento gratuito si se negocia bien). Andina tiene 1.280 de proveedores —el "buen" pasivo— pero también 540 de descubierto al 85% de TNA, que se come el resultado.',
          'En el **patrimonio neto**, los resultados acumulados (1.850) muestran que la empresa históricamente ganó plata y la fue capitalizando. Pero ojo: ese PN es **contable**, valuado a costo histórico. El terreno figura a 350 cuando vale 900 en el mercado, y la marca figura en 0 cuando vale 650. El PN contable de 2.770 no es el PN económico —ese desfase es el tema central de la Semana 2.',
        ],
      },
    ],
    model: {
      excelTitle: 'Balance — ecuación patrimonial de Andina',
      inputs: [
        { key: 'actCorr', label: 'Activo corriente', value: 4810, min: 0, max: 12000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'actNoCorr', label: 'Activo no corriente', value: 2640, min: 0, max: 8000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'pasCorr', label: 'Pasivo corriente', value: 3250, min: 0, max: 10000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'pasNoCorr', label: 'Pasivo no corriente', value: 1070, min: 0, max: 6000, step: 50, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'activoTotal', label: 'Activo total', fmt: 'money', calc: (v) => v.actCorr + v.actNoCorr, xl: '[actCorr]+[actNoCorr]' },
        { key: 'pasivoTotal', label: 'Pasivo total', fmt: 'money', calc: (v) => v.pasCorr + v.pasNoCorr, xl: '[pasCorr]+[pasNoCorr]' },
        { key: 'patrimonio', label: 'Patrimonio Neto (residuo)', fmt: 'money', highlight: true, calc: (v) => v.actCorr + v.actNoCorr - (v.pasCorr + v.pasNoCorr), xl: '[activoTotal]-[pasivoTotal]' },
        { key: 'capTrabajo', label: 'Capital de trabajo (AC − PC)', fmt: 'money', calc: (v) => v.actCorr - v.pasCorr, xl: '[actCorr]-[pasCorr]' },
        { key: 'razonCorr', label: 'Razón corriente (AC / PC)', fmt: 'num2', calc: (v) => v.actCorr / v.pasCorr, xl: '[actCorr]/[pasCorr]' },
      ],
      conclusions: [
        {
          test: (v) => v.actCorr - v.pasCorr > 0 && v.actCorr / v.pasCorr >= 1.2,
          good: 'El capital de trabajo es positivo y la razón corriente supera 1,2: en el agregado, la liquidez luce sana. Pero revisá la CALIDAD del activo corriente (cuánto está atrapado en stock y cobranzas lentas) antes de relajarte.',
          bad: 'La liquidez de corto plazo está ajustada: el activo corriente no holga sobre el pasivo corriente. Con deuda cara de por medio, esto explica la tensión de caja.',
          xl: 'IF(AND([capTrabajo]>0,[razonCorr]>=1.2),"Capital de trabajo positivo ("&TEXT([capTrabajo],"#,##0")&") y razon corriente "&TEXT([razonCorr],"0.00")&": liquidez agregada sana, pero revisa la CALIDAD del activo corriente.","Liquidez ajustada: el activo corriente no holga sobre el pasivo corriente. Con deuda cara, explica la tension de caja.")',
        },
      ],
      chart: { sweepKey: 'actCorr', outKey: 'capTrabajo', xLabel: 'Activo corriente', yLabel: 'Capital de trabajo', yFmt: 'money' },
    },
    promptConcepts: ['Ecuación patrimonial: Activo = Pasivo + PN', 'Balance como fotografía vs. ER como película', 'Corriente vs. no corriente y liquidez', 'Capital de trabajo y razón corriente', 'PN como residuo (y por qué el contable ≠ económico)'],
  },

  {
    id: 's01-i2',
    week: 1,
    order: 2,
    title: 'Leer el Estado de Resultados',
    subtitle: 'De ventas a resultado neto: la cascada de márgenes',
    framework: 'Contabilidad básica · Estado de Resultados',
    theory: [
      {
        heading: 'La cascada: de la venta al resultado neto',
        paragraphs: [
          'El **Estado de Resultados (ER)** es una **película**: muestra todo lo que pasó entre dos cierres de balance. Se lee como una **cascada** que arranca en las ventas y va restando capas de costos hasta llegar al resultado neto. Cada escalón responde una pregunta distinta sobre la salud del negocio.',
          'En **Andina 2024**: Ventas 8.200 → menos CMV 5.740 = **Resultado bruto 2.460** → menos gastos de comercialización y administración (980 + 610) = **EBITDA 1.120** → menos amortizaciones 290 = **EBIT 830** → menos resultados financieros 560 = **resultado antes de impuestos 270** → menos impuesto 95 = **Resultado neto 175**.',
          'La lección clave es **dónde se desangra la utilidad**. En Andina, el negocio operativo luce bien (EBITDA de 1.120, EBIT de 830), pero los **intereses se comen 560** —dos tercios del EBIT— y dejan un resultado neto magro de 175. La empresa gana operando y lo entrega a los bancos. Eso no se ve mirando solo la última línea.',
        ],
      },
      {
        heading: 'Los márgenes: el negocio en porcentajes',
        paragraphs: [
          'Los montos absolutos engañan; los **márgenes** (cada escalón sobre las ventas) permiten comparar en el tiempo y contra el sector. El **margen bruto** de Andina es 2.460 / 8.200 = **30%** (el CMV consume el 70%). El **margen EBITDA** es 1.120 / 8.200 = 13,7%. El **margen neto** es apenas 175 / 8.200 = **2,1%**.',
          'Comparar 2024 contra 2023 revela la tendencia: el margen bruto cayó de 31,0% a 30,0%, y el margen neto se desplomó de 4,2% (308 / 7.400) a 2,1%. Es decir: **Andina vendió más pero ganó menos**. El crecimiento de ventas no se tradujo en más utilidad porque los costos financieros crecieron (de 410 a 560) más rápido que el negocio.',
          'Acá aparece un anticipo de la lógica DuPont (Semana posterior): el resultado neto se explica por el **margen operativo**, la **carga de intereses** y el **efecto fiscal**. En Andina, el problema no está en la operación sino en la **carga de intereses**: el EBIT/Ventas es decente, pero la línea financiera lo aniquila.',
        ],
      },
      {
        heading: 'EBITDA, EBIT y por qué importan tanto',
        paragraphs: [
          'El **EBIT** (Resultado operativo) es la ganancia del negocio **antes** de decidir cómo se financia (intereses) y antes de impuestos. Es el numerador conceptual del NOPAT y la base de la creación de valor. Mide el negocio en sí mismo, despojado de la estructura de capital.',
          'El **EBITDA** suma de vuelta las amortizaciones al EBIT: es una aproximación gruesa al **flujo operativo** antes de inversiones en activo fijo y capital de trabajo. Andina tiene un EBITDA sólido de 1.120, lo que confunde al dueño: "el negocio anda bien". Pero el EBITDA **no es caja** —ignora que la caja queda atrapada en cobranzas e inventarios (eso lo desarma el ítem 5).',
          'El gran error del CEO es **mirar solo la última línea** (resultado neto) o, peor, solo el EBITDA. La lectura profesional recorre toda la cascada: identifica en qué escalón se pierde la rentabilidad. En Andina, el escalón fatal es el financiero, y eso apunta directo a la estructura de deuda y al capital de trabajo, no al margen del producto.',
        ],
      },
    ],
    model: {
      excelTitle: 'Estado de Resultados — cascada y márgenes',
      inputs: [
        { key: 'ventas', label: 'Ventas netas', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'cmv', label: 'Costo de mercadería vendida', value: 5740, min: 0, max: 16000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'gastosOp', label: 'Gastos comerc. + admin.', value: 1590, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'amort', label: 'Amortizaciones', value: 290, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: 'Resultados financieros (intereses)', value: 560, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'tax', label: 'Tasa de impuesto', value: 0.35, min: 0, max: 0.5, step: 0.01, fmt: 'pct' },
      ],
      calcs: [
        { key: 'brutoMon', label: 'Resultado bruto', fmt: 'money', calc: (v) => v.ventas - v.cmv, xl: '[ventas]-[cmv]' },
        { key: 'ebit', label: 'EBIT (resultado operativo)', fmt: 'money', calc: (v) => v.ventas - v.cmv - v.gastosOp - v.amort, xl: '[brutoMon]-[gastosOp]-[amort]' },
        { key: 'neto', label: 'Resultado neto', fmt: 'money', highlight: true, calc: (v) => (v.ventas - v.cmv - v.gastosOp - v.amort - v.intereses) * (1 - v.tax), xl: '([ebit]-[intereses])*(1-[tax])' },
        { key: 'margenBruto', label: 'Margen bruto', fmt: 'pct', calc: (v) => (v.ventas - v.cmv) / v.ventas, xl: '[brutoMon]/[ventas]' },
        { key: 'margenNeto', label: 'Margen neto', fmt: 'pct', calc: (v) => ((v.ventas - v.cmv - v.gastosOp - v.amort - v.intereses) * (1 - v.tax)) / v.ventas, xl: '[neto]/[ventas]' },
      ],
      conclusions: [
        {
          test: (v) => v.intereses > 0.4 * (v.ventas - v.cmv - v.gastosOp - v.amort),
          good: 'Los intereses se comen más del 40% del EBIT: el negocio gana operando pero lo entrega a los bancos. El problema NO es el margen del producto, es la estructura de deuda y el capital de trabajo.',
          bad: 'La carga de intereses está bajo control (menos del 40% del EBIT): la rentabilidad se define en la operación. Cuidá igual el margen bruto y los gastos.',
          xl: 'IF([intereses]>0.4*[ebit],"Los intereses se comen mas del 40% del EBIT ("&TEXT([intereses]/[ebit],"0.0%")&"): el negocio gana operando pero lo entrega a los bancos. El problema es la deuda, no el margen.","Carga de intereses bajo control (menos del 40% del EBIT): la rentabilidad se define en la operacion.")',
        },
      ],
      chart: { sweepKey: 'intereses', outKey: 'neto', xLabel: 'Intereses', yLabel: 'Resultado neto', yFmt: 'money' },
    },
    promptConcepts: ['La cascada del ER: de ventas a resultado neto', 'Margen bruto, EBITDA, EBIT y margen neto', 'Dónde se desangra la utilidad (carga de intereses)', 'Vender más y ganar menos: la tendencia de márgenes', 'EBIT como base del negocio antes del financiamiento'],
  },

  {
    id: 's01-i3',
    week: 1,
    order: 3,
    title: 'GMROI: margen × rotación de inventario',
    subtitle: 'Cuánto margen bruto rinde cada peso inmovilizado en stock',
    framework: 'value-generation-emerging-markets · GMROI',
    theory: [
      {
        heading: 'La métrica reina del inventario',
        paragraphs: [
          'El **GMROI (Gross Margin Return on Inventory Investment)** responde una pregunta brutal y concreta: ¿cuántos dólares de **margen bruto** genera la empresa por cada dólar invertido (al costo) en **inventario**? Un GMROI de 2,5 significa 2,50 de margen bruto por cada 1,00 inmovilizado en stock. Es la métrica reina del retail y de la distribución —incluido el sector autopartes de Andina, con miles de SKUs.',
          'Su fórmula tiene dos lecturas equivalentes. La directa: **GMROI = Margen Bruto ($) / Inventario promedio (al costo)**. Y la reveladora, que la descompone en dos palancas: **GMROI = Margen Bruto (%) × Rotación de inventario**, donde la **Rotación = CMV / Inventario promedio**. Esta segunda forma une **rentabilidad** (margen) con **eficiencia de capital** (rotación) en un solo número.',
          'En **Andina 2024**: el margen bruto es 2.460, el inventario promedio es (1.850 + 2.400) / 2 = 2.125, y el CMV es 5.740. Entonces la rotación es 5.740 / 2.125 = 2,70 vueltas al año, el margen bruto porcentual es 2.460 / 8.200 = 30%, y el **GMROI = 0,30 × 2,70 = 0,81** (equivalente: 2.460 / 2.125 = 1,16 sobre inventario de cierre; con promedio, 0,81 sobre margen-costo). El umbral de salud es GMROI > 1: Andina está en zona de alerta.',
        ],
      },
      {
        heading: 'Dos productos, dos formas de ganar',
        paragraphs: [
          'La potencia del GMROI es que distingue **dos modelos de negocio** que el margen solo no separa. Un producto de **margen alto y rotación baja** (la joyería: vende poco pero deja mucho) puede tener el mismo GMROI que uno de **margen bajo y rotación alta** (el consumo masivo: deja poco pero vuela). El GMROI los pone en la misma vara: lo que importa es el margen que rinde el capital inmovilizado, no el margen aislado.',
          'En autopartes esto es decisivo. Un filtro de aceite premium de alta rotación (clase AX en la matriz ABC/XYZ) puede rendir un GMROI excelente con stock mínimo, mientras un sensor electrónico raro de baja rotación inmoviliza capital aunque tenga buen margen unitario. El GMROI por SKU le dice al dueño qué mantener, qué repriorizar y qué descontinuar.',
          'La **interrelación** es directa: subir el GMROI casi siempre pasa por subir la **rotación**, lo que significa bajar el **inventario promedio** sin perder ventas. Eso reduce los **días de inventario (DIO)**, comprime el **Ciclo de Conversión de Efectivo** (ítem 4), libera capital de trabajo, baja el Capital Invertido y —con igual NOPAT— sube el ROIC. La cadena va del estante al valor de la firma.',
        ],
      },
      {
        heading: 'La palanca ABC/XYZ y los límites del GMROI',
        paragraphs: [
          'La herramienta operativa que mueve el GMROI es la **matriz ABC/XYZ**: clasificar los SKUs por **valor** (ABC, regla de Pareto: pocos ítems concentran el 80% del valor) y por **variabilidad de la demanda** (XYZ, según el coeficiente de variación). El cruce 3×3 define una política de stock por celda: JIT y stock mínimo para los AX (alto valor, demanda estable), gestión bajo pedido para los CZ (bajo valor, errático, candidatos a liquidar).',
          'En Andina, los 420 de **mercadería obsoleta o de lenta rotación** valuada a costo histórico son justamente capital muerto en celdas tipo CZ/AZ: stock que infla el inventario, baja la rotación, hunde el GMROI y a precio de mercado vale menos (de ahí que el inventario real sea 1.980 y no 2.400). Liquidar ese stock sube el GMROI por dos vías: reduce el denominador y libera caja.',
          'El GMROI tiene **límites** que conviene tener presentes: solo considera el margen **bruto** (ignora costos de almacenamiento, seguros y obsolescencia más allá de lo bruto); es sensible al método de valuación del inventario (FIFO / PPP), crítico en alta inflación; y puede incentivar un recorte excesivo de stock que dispare quiebres y pérdida de ventas. Por eso se lee junto al servicio al cliente, no contra él.',
        ],
      },
    ],
    model: {
      excelTitle: 'GMROI — margen × rotación de inventario',
      inputs: [
        { key: 'margenBrutoMon', label: 'Margen bruto ($)', value: 2460, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'ventas', label: 'Ventas netas', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'cmv', label: 'Costo de mercadería vendida', value: 5740, min: 0, max: 16000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'invProm', label: 'Inventario promedio (al costo)', value: 2125, min: 100, max: 8000, step: 25, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'margenPct', label: 'Margen bruto (%)', fmt: 'pct', calc: (v) => v.margenBrutoMon / v.ventas, xl: '[margenBrutoMon]/[ventas]' },
        { key: 'rotacion', label: 'Rotación de inventario (CMV / inv.)', fmt: 'num2', calc: (v) => v.cmv / v.invProm, xl: '[cmv]/[invProm]' },
        { key: 'gmroi', label: 'GMROI (margen × rotación)', fmt: 'num2', highlight: true, calc: (v) => (v.margenBrutoMon / v.ventas) * (v.cmv / v.invProm), xl: '[margenPct]*[rotacion]' },
        { key: 'dio', label: 'Días de inventario (DIO)', fmt: 'days', calc: (v) => (v.invProm / v.cmv) * 365, xl: '[invProm]/[cmv]*365' },
      ],
      conclusions: [
        {
          test: (v) => (v.margenBrutoMon / v.ventas) * (v.cmv / v.invProm) >= 1,
          good: 'El GMROI supera 1: cada peso inmovilizado en stock recupera al menos su valor en margen bruto. Aun así, comparalo contra el benchmark sectorial (suele pedir 2-3) y atacá los SKUs de baja rotación.',
          bad: 'El GMROI es menor a 1: el inventario inmoviliza más capital del que rinde en margen. Subí la rotación bajando stock obsoleto (matriz ABC/XYZ); eso comprime el DIO y libera caja.',
          xl: 'IF([gmroi]>=1,"GMROI "&TEXT([gmroi],"0.00")&" supera 1: cada peso en stock recupera su valor en margen. Compara contra el benchmark sectorial (2-3) y ataca la baja rotacion.","GMROI "&TEXT([gmroi],"0.00")&" menor a 1: el inventario inmoviliza mas capital del que rinde. Subi rotacion bajando stock obsoleto (ABC/XYZ).")',
        },
      ],
      chart: { sweepKey: 'invProm', outKey: 'gmroi', xLabel: 'Inventario promedio', yLabel: 'GMROI', yFmt: 'num2' },
    },
    promptConcepts: ['GMROI = Margen bruto (%) × Rotación de inventario', 'Margen bruto $ / Inventario promedio al costo', 'Margen alto-rotación baja vs. margen bajo-rotación alta', 'Matriz ABC/XYZ como palanca del GMROI', 'GMROI → DIO → CCE → ROIC (cadena de valor)'],
  },

  {
    id: 's01-i4',
    week: 1,
    order: 4,
    title: 'Ciclo de Conversión de Efectivo',
    subtitle: 'Cuántos días queda atrapada la caja: DIO + DSO − DPO',
    framework: 'value-generation-emerging-markets · CCE',
    theory: [
      {
        heading: 'El corazón del capital de trabajo',
        paragraphs: [
          'El **Ciclo de Conversión de Efectivo (CCE)** mide cuántos **días** transcurren desde que la empresa **paga** a sus proveedores hasta que **cobra** de sus clientes: cuánto tiempo la caja queda inmovilizada en el ciclo operativo. Es el corazón del capital de trabajo y, en mercados emergentes con crédito caro y escaso, la palanca de mayor retorno que tiene una PyME.',
          'Se descompone en tres componentes: **CCE = DIO + DSO − DPO**. El **DIO (Días de Inventario)** = Inventario / CMV × 365: cuánto tarda en venderse el stock. El **DSO (Días de Cobranza)** = Cuentas por Cobrar / Ventas × 365: cuánto tarda en cobrarse una venta. Y el **DPO (Días de Pago)** = Proveedores / CMV × 365: cuánto tarda la empresa en pagarle a sus proveedores —financiamiento gratuito que se **resta**.',
          'En **Andina 2024**: DIO = 2.400 / 5.740 × 365 = **153 días**; DSO = 1.850 / 8.200 × 365 = **82 días**; DPO = 1.280 / 5.740 × 365 = **81 días**. Entonces **CCE = 153 + 82 − 81 = 154 días**. Es decir: Andina financia más de cinco meses de operación con caja propia (o con descubierto). Ahí está la raíz de la tensión de caja que ningún margen del ER explica.',
        ],
      },
      {
        heading: 'De días a dólares: el costo del ciclo',
        paragraphs: [
          'El CCE se traduce a plata multiplicando los días por el costo o la venta diaria. Con un CMV diario de 5.740 / 365 = 15,7 por día, cada día de ciclo equivale a capital de trabajo inmovilizado. Un CCE de 154 días sobre la base operativa de Andina son cientos de miles de dólares atrapados en cobranzas e inventarios que podrían estar en la caja —o no estar tomados al 85% de descubierto.',
          'Por eso reducir el CCE **libera caja sin financiamiento externo**: es oro puro en Argentina y Ecuador. Cada día menos de DIO o de DSO es un día menos de capital atrapado. Si Andina bajara su inventario al nivel real de rotación y acelerara la cobranza de los 290 en mora, recortaría decenas de días de ciclo y aliviaría el descubierto que le come el resultado.',
          'Un CCE **negativo** (cobrar antes de pagar, modelo supermercado o e-commerce) significa que los proveedores financian la operación entera: capital de trabajo a favor. Andina está en el extremo opuesto: un ciclo largo y positivo, agravado por cobranzas lentas e inventario inflado. El DPO de 81 días apenas compensa el DIO de 153.',
        ],
      },
      {
        heading: 'Las palancas y la cadena hacia el valor',
        paragraphs: [
          'Cada componente tiene su palanca operativa concreta. El **DIO** se ataca con la matriz **ABC/XYZ** (ítem 3): mejor gestión de stock por SKU. El **DSO** se ataca con la matriz de **cobranzas (aging vs. reclamo)**: priorizar la gestión sobre las cuentas muy vencidas y poco reclamadas —en Andina, los 290 en mora de más de 120 días son justamente la "zona crítica" que requiere acción legal y previsión. El **DPO** se gestiona negociando plazo con proveedores sin perder descuentos por pronto pago.',
          '**La interrelación es la columna vertebral del programa.** El CCE es el puente entre la operación cotidiana y el balance: días de inventario + cobranza − pago → capital de trabajo → parte del **Capital Invertido**. Bajar el CCE baja el Capital Invertido y, con igual NOPAT, **sube el ROIC**, amplía el spread ROIC − WACC, aumenta el EVA y sube el valor de la firma. Es la rama más accionable del árbol de generadores de valor en emergentes.',
          'El CCE tiene **límites**: usa promedios que pueden ocultar **estacionalidad**, es sensible al maquillaje de cierre de período, y un CCE negativo no siempre es virtuoso (puede reflejar poder abusivo sobre proveedores o quiebres de stock). Además no distingue la **calidad** de las cuentas por cobrar —de ahí que la matriz de cobranzas lo complemente. Pero como diagnóstico de dónde está atrapada la caja, no tiene rival.',
        ],
      },
    ],
    model: {
      excelTitle: 'Ciclo de Conversión de Efectivo (CCE)',
      inputs: [
        { key: 'inventario', label: 'Inventarios', value: 2400, min: 0, max: 8000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'cxc', label: 'Cuentas por cobrar', value: 1850, min: 0, max: 8000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'proveedores', label: 'Proveedores comerciales', value: 1280, min: 0, max: 6000, step: 25, unit: 'k', fmt: 'num' },
        { key: 'ventas', label: 'Ventas netas (anuales)', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'cmv', label: 'Costo de mercadería vendida (anual)', value: 5740, min: 100, max: 16000, step: 50, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'dio', label: 'DIO (días de inventario)', fmt: 'days', calc: (v) => (v.inventario / v.cmv) * 365, xl: '[inventario]/[cmv]*365' },
        { key: 'dso', label: 'DSO (días de cobranza)', fmt: 'days', calc: (v) => (v.cxc / v.ventas) * 365, xl: '[cxc]/[ventas]*365' },
        { key: 'dpo', label: 'DPO (días de pago)', fmt: 'days', calc: (v) => (v.proveedores / v.cmv) * 365, xl: '[proveedores]/[cmv]*365' },
        { key: 'cce', label: 'Ciclo de Conversión de Efectivo', fmt: 'days', highlight: true, calc: (v) => (v.inventario / v.cmv) * 365 + (v.cxc / v.ventas) * 365 - (v.proveedores / v.cmv) * 365, xl: '[dio]+[dso]-[dpo]' },
        { key: 'capAtrapado', label: 'Caja atrapada (CCE × CMV diario)', fmt: 'money', calc: (v) => ((v.inventario / v.cmv) * 365 + (v.cxc / v.ventas) * 365 - (v.proveedores / v.cmv) * 365) * (v.cmv / 365), xl: '[cce]*([cmv]/365)' },
      ],
      conclusions: [
        {
          test: (v) => (v.inventario / v.cmv) * 365 + (v.cxc / v.ventas) * 365 - (v.proveedores / v.cmv) * 365 <= 90,
          good: 'El CCE es de 90 días o menos: la caja rota razonablemente rápido. Seguí monitoreando el componente más débil (DIO, DSO o DPO) para liberar aún más capital de trabajo.',
          bad: 'El CCE supera los 90 días: hay caja atrapada en stock y cobranzas lentas que obliga a financiarse caro. Atacá el DIO (matriz ABC/XYZ) y el DSO (matriz de cobranzas) para liberar capital sin deuda.',
          xl: 'IF([cce]<=90,"CCE de "&TEXT([cce],"0")&" dias: la caja rota razonablemente rapido. Monitorea el componente mas debil.","CCE de "&TEXT([cce],"0")&" dias: caja atrapada en stock y cobranzas lentas que obliga a financiarse caro. Ataca DIO (ABC/XYZ) y DSO (cobranzas).")',
        },
      ],
      chart: { sweepKey: 'inventario', outKey: 'cce', xLabel: 'Inventarios', yLabel: 'CCE (días)', yFmt: 'days' },
    },
    promptConcepts: ['CCE = DIO + DSO − DPO', 'DIO, DSO y DPO: las tres palancas', 'De días a dólares de capital de trabajo', 'CCE → Capital Invertido → ROIC (cadena de valor)', 'Matriz ABC/XYZ (DIO) y de cobranzas (DSO)'],
  },

  {
    id: 's01-i5',
    week: 1,
    order: 5,
    title: 'Resultado vs. caja: por qué difieren',
    subtitle: 'Lo económico (devengado) no es lo financiero (percibido)',
    framework: 'Contabilidad básica · Devengado vs. percibido',
    theory: [
      {
        heading: 'Dos verdades simultáneas: ganar y quedarse sin caja',
        paragraphs: [
          'La paradoja que desvela a todo dueño de PyME: el Estado de Resultados muestra **ganancia**, pero la caja está siempre **tensa**. Andina ganó 175 en 2024 y, sin embargo, recurre al descubierto bancario. No es un error contable ni una trampa: son **dos verdades simultáneas** que miden cosas distintas.',
          'El **resultado** es **económico** y se mide por **devengado**: una venta se reconoce cuando se entrega la mercadería y se emite la factura, **aunque todavía no se haya cobrado**. La **caja** es **financiera** y se mide por **percibido**: solo cuenta el dinero que efectivamente entró o salió. Una empresa puede devengar una ganancia enorme y no haber cobrado un peso de ella.',
          'El **Estado de Flujo de Efectivo** es el puente entre ambos mundos. Parte del resultado neto y le hace ajustes hasta llegar a la caja real. En Andina, ese puente revela exactamente por qué hay ganancia sin plata: la utilidad se quedó atrapada en cobranzas, inventarios y en el pago de intereses.',
        ],
      },
      {
        heading: 'El puente, línea por línea, en Andina',
        paragraphs: [
          'Se arranca del **resultado neto: 175**. Se **suman** las partidas que no son salida de caja: **amortizaciones +290** (un gasto contable que no se paga) e **intereses +560** (se aíslan de lo operativo). Luego se **restan** las inmovilizaciones de capital de trabajo: el **aumento de cuentas por cobrar −330** (ventas devengadas que no se cobraron) y el **aumento de inventarios −550** (caja convertida en stock parado). Y se **suma** el **aumento de proveedores +160** (compras que aún no se pagaron, financiamiento gratis).',
          'El resultado de ese puente es un **flujo operativo de 305** (antes de intereses e impuestos), muy distinto del resultado neto de 175. Pero la historia no termina ahí: hay que pagar el **CAPEX de 440** (maquinaria), los **intereses de 560**, amortizar préstamos por 150 y repartir **dividendos por 120**. La caja operativa no alcanza para cubrir las inversiones y el servicio de deuda: por eso Andina **toma 230 de descubierto** para tapar el bache.',
          'La lección es contundente: el **+290 de amortizaciones** y el **+560 de intereses** muestran que el EBITDA (1.120) **no es caja**; los **−330 y −550** son la prueba en dólares de que el **CCE largo del ítem 4** drena la caja; y el descubierto que aparece en el financiamiento es la **consecuencia**, no la causa. La caja no miente: cuenta la historia real que el margen del ER disimula.',
        ],
      },
      {
        heading: 'Por qué esto define todo el programa',
        paragraphs: [
          'Esta distinción es la **bisagra conceptual** de toda la academia. La contabilidad de **presentación** (devengado, resultado) muestra una empresa rentable; la mirada **financiera y de gestión** (caja, valor) muestra una empresa que destruye valor por mala rotación, cobranzas lentas y deuda cara. Andina "luce sana" y a la vez está en problemas: ambas cosas son ciertas según qué lente uses.',
          'La caja conecta con todo lo demás. El **+290 de amortizaciones** anticipa que el resultado contable está "contaminado" por gastos no erogables (clave para el NOPAT y el CFROI ajustado por inflación). Los **−330 y −550** son la traducción a dólares del **CCE** (ítem 4): días de cobranza e inventario convertidos en caja drenada. Y el **−560 de intereses** apunta a la estructura de deuda y al WACC.',
          'El cierre de la Semana 1: el resultado neto contesta "¿la empresa ganó?", pero la pregunta de valor es **"¿la empresa generó caja y rindió por encima del costo del capital?"**. Devengar una ganancia y consumir caja al mismo tiempo no es contradicción: es el síntoma de una empresa que necesita arreglar su capital de trabajo y su financiamiento antes de celebrar el margen. Eso es lo que el resto del programa va a desarmar.',
        ],
      },
    ],
    model: {
      excelTitle: 'Resultado vs. caja — el puente del flujo operativo',
      inputs: [
        { key: 'neto', label: 'Resultado neto', value: 175, min: -1000, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'amort', label: '(+) Amortizaciones', value: 290, min: 0, max: 2000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'intereses', label: '(+) Intereses', value: 560, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'deltaCxc', label: '(−) Aumento cuentas por cobrar', value: 330, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'deltaInv', label: '(−) Aumento de inventarios', value: 550, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'deltaProv', label: '(+) Aumento de proveedores', value: 160, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'ajustesNoCaja', label: 'Ajustes no erogables (+amort +int.)', fmt: 'money', calc: (v) => v.amort + v.intereses, xl: '[amort]+[intereses]' },
        { key: 'varCapTrabajo', label: 'Variación de capital de trabajo', fmt: 'money', calc: (v) => -v.deltaCxc - v.deltaInv + v.deltaProv, xl: '-[deltaCxc]-[deltaInv]+[deltaProv]' },
        { key: 'flujoOperativo', label: 'Flujo operativo (antes int. e imp.)', fmt: 'money', highlight: true, calc: (v) => v.neto + v.amort + v.intereses - v.deltaCxc - v.deltaInv + v.deltaProv, xl: '[neto]+[ajustesNoCaja]+[varCapTrabajo]' },
        { key: 'brecha', label: 'Brecha flujo − resultado neto', fmt: 'money', calc: (v) => (v.amort + v.intereses - v.deltaCxc - v.deltaInv + v.deltaProv), xl: '[flujoOperativo]-[neto]' },
      ],
      conclusions: [
        {
          test: (v) => v.deltaCxc + v.deltaInv > v.neto + v.amort,
          good: 'El aumento de cobranzas + inventarios supera al resultado más amortizaciones: el capital de trabajo se está COMIENDO la caja. La ganancia es real, pero quedó atrapada en stock y cuentas por cobrar (CCE largo).',
          bad: 'El capital de trabajo no drena más caja de la que genera el resultado: el ciclo está bajo control. La diferencia entre resultado y caja se explica sobre todo por amortizaciones e intereses.',
          xl: 'IF([deltaCxc]+[deltaInv]>[neto]+[amort],"El aumento de cobranzas + inventarios ("&TEXT([deltaCxc]+[deltaInv],"#,##0")&") supera al resultado + amortizaciones: el capital de trabajo se COME la caja. La ganancia quedo atrapada (CCE largo).","El capital de trabajo no drena mas caja de la que genera el resultado: el ciclo esta bajo control.")',
        },
      ],
      chart: { sweepKey: 'deltaInv', outKey: 'flujoOperativo', xLabel: 'Aumento de inventarios', yLabel: 'Flujo operativo', yFmt: 'money' },
    },
    promptConcepts: ['Devengado (económico) vs. percibido (financiero)', 'Por qué hay ganancia contable sin caja', 'El puente: resultado neto → flujo operativo', 'Amortizaciones e intereses como ajustes no erogables', 'El capital de trabajo (CCE) que drena la caja'],
  },
]
