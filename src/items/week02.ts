import type { ItemSpec } from './types'

// ============================================================================
// SEMANA 2 — Presentación vs. Gestión (contabilidad de presentación vs.
// información de gestión; PN contable vs. PN económico).
// Caso central: Andina Manufacturas S.A. (cifras en miles de USD).
// Incorpora: value-generation-emerging-markets (valores book vs. real) y
// synthetic-tsr (normalización de la empresa familiar, dolarización).
// ============================================================================

export const week02: ItemSpec[] = [
  {
    id: 's02-i1',
    week: 2,
    order: 1,
    title: 'Presentación vs. gestión',
    subtitle: 'El PN contable no es el PN económico',
    framework: 'Contabilidad de gestión · value-generation',
    theory: [
      {
        heading: 'Dos contabilidades para dos públicos',
        paragraphs: [
          'Toda empresa lleva, de hecho, **dos contabilidades**. La de **presentación** sigue las normas (NIIF, normas locales), valúa a **costo histórico** y está hecha para terceros: el fisco, los bancos, los socios externos. La de **gestión** está hecha para **decidir**: valúa a **mercado**, reconoce activos que la norma no admite y corrige los que están sobrevaluados. La primera responde "¿qué dice la regla?"; la segunda, "¿qué vale realmente y qué conviene hacer?".',
          'El puente entre ambas es la distinción entre el **valor book** (de libros, de presentación) y el **valor real** (de gestión, de mercado). En el caso Andina, cada línea del balance carga ambos valores: el book es el que figura en los estados contables; el real es el que un comprador informado pagaría o el que un gerente debe usar para decidir.',
          'La consecuencia más importante es que el **Patrimonio Neto contable ≠ Patrimonio Neto económico**. El contable es un residuo de valores históricos; el económico ajusta por lo que los activos valen hoy, suma lo que la norma no reconoce (la marca, la cartera) y resta lo que está inflado (incobrables, stock obsoleto). Confundirlos lleva a vender barato, garantizar mal o tomar decisiones sobre una foto distorsionada.',
        ],
      },
      {
        heading: 'Andina: el mismo balance, dos patrimonios',
        paragraphs: [
          'En **Andina 2024**, el Patrimonio Neto **contable** es 2.770 (capital 600 + reservas 320 + resultados acumulados 1.850). Pero si revaluamos cada activo a su valor real y dejamos los pasivos igual (la deuda se debe por su monto nominal), el patrimonio **económico** es muy distinto. El total de activos a valor book es 7.450; a valor real, los ajustes cambian la película.',
          'Los **activos ocultos** suman valor que no está en libros: el terreno vale 900 y figura a 350 (+550), la marca y la cartera valen 650 y figuran en 0 (+650), el edificio vale 780 contra 620 (+160). Los **activos sobrevaluados** restan: las cuentas por cobrar reales son 1.560 contra 1.850 de libros (−290 de incobrables), el inventario real es 1.980 contra 2.400 (−420 de obsoleto), la maquinaria real 1.150 contra 1.450 (−300), los rodados 110 contra 140 (−30).',
          'Sumando ajustes: +550 +650 +160 −290 −420 −300 −30 = **+320 netos**. El activo real es 7.450 + 320 = 7.770, y como el pasivo no cambia (4.840), el **PN económico ≈ 3.090** frente a un PN contable de 2.770. El balance contable **subestima** el patrimonio de Andina en unos 320: los activos ocultos pesan más que los sobrevaluados. Esa brecha es el corazón de la Semana 2.',
        ],
      },
      {
        heading: 'Por qué importa para el dueño',
        paragraphs: [
          'Para un CEO esto no es un ejercicio académico: define el **precio de venta** de la empresa, el **valor de garantía** ante un banco, la **base** sobre la que se mide el ROIC y el punto de partida de cualquier **valuación** (DCF, TSR Sintético). Decidir sobre el PN contable cuando el económico es otro es decidir sobre una foto borrosa.',
          'El ejercicio de presentación vs. gestión es además **anti-doble-error**: revela tanto el valor escondido (no malvender la marca o el terreno) como el valor ficticio (no contar como patrimonio una cartera incobrable o un stock muerto). El gerente que solo mira el balance de presentación se equivoca en ambas direcciones a la vez.',
          'La **interrelación** con el resto del programa es directa: el PN económico es el numerador del valor del equity; los activos sobrevaluados conectan con el CCE (cobranzas e inventario) de la Semana 1; y la normalización (ítem 4) extiende la misma lógica al Estado de Resultados. Toda la academia gira sobre esta distancia entre lo que la contabilidad muestra y lo que el negocio vale.',
        ],
      },
    ],
    model: {
      excelTitle: 'PN contable vs. PN económico',
      inputs: [
        { key: 'pnContable', label: 'Patrimonio Neto contable', value: 2770, min: 0, max: 12000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'ocultos', label: 'Activos ocultos (a sumar)', value: 1360, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'num', note: 'Terreno +550, marca +650, edificio +160' },
        { key: 'sobrevaluados', label: 'Activos sobrevaluados (a restar)', value: 1040, min: 0, max: 6000, step: 10, unit: 'k', fmt: 'num', note: 'Incobrables 290, inventario 420, maquinaria 300, rodados 30' },
      ],
      calcs: [
        { key: 'ajusteNeto', label: 'Ajuste neto al patrimonio', fmt: 'money', calc: (v) => v.ocultos - v.sobrevaluados, xl: '[ocultos]-[sobrevaluados]' },
        { key: 'pnEconomico', label: 'Patrimonio Neto económico', fmt: 'money', highlight: true, calc: (v) => v.pnContable + v.ocultos - v.sobrevaluados, xl: '[pnContable]+[ajusteNeto]' },
        { key: 'brechaPct', label: 'Brecha sobre PN contable', fmt: 'pct', calc: (v) => (v.ocultos - v.sobrevaluados) / v.pnContable, xl: '[ajusteNeto]/[pnContable]' },
      ],
      conclusions: [
        {
          test: (v) => v.ocultos - v.sobrevaluados >= 0,
          good: 'Los activos ocultos pesan más que los sobrevaluados: el balance contable SUBESTIMA el patrimonio. No malvendas la empresa ni la uses de garantía por debajo de su valor económico.',
          bad: 'Los activos sobrevaluados superan a los ocultos: el balance contable SOBREESTIMA el patrimonio. Hay valor ficticio (incobrables, stock muerto) que infla el PN de presentación.',
          xl: 'IF([ajusteNeto]>=0,"Los activos ocultos pesan mas: el balance SUBESTIMA el patrimonio. PN economico "&TEXT([pnEconomico],"#,##0")&" vs contable "&TEXT([pnContable],"#,##0")&". No malvendas.","Los sobrevaluados superan a los ocultos: el balance SOBREESTIMA el patrimonio. Hay valor ficticio inflando el PN.")',
        },
      ],
      chart: { sweepKey: 'ocultos', outKey: 'pnEconomico', xLabel: 'Activos ocultos', yLabel: 'PN económico', yFmt: 'money' },
    },
    promptConcepts: ['Contabilidad de presentación vs. de gestión', 'Valor book (histórico) vs. valor real (mercado)', 'PN contable ≠ PN económico', 'Activos ocultos vs. activos sobrevaluados', 'Por qué el PN económico define precio y garantía'],
  },

  {
    id: 's02-i2',
    week: 2,
    order: 2,
    title: 'Activos ocultos',
    subtitle: 'Lo que vale y la contabilidad no muestra: terreno y marca',
    framework: 'Contabilidad de gestión · value-generation',
    theory: [
      {
        heading: 'El valor que no figura en libros',
        paragraphs: [
          'Un **activo oculto** es un bien que **vale más de lo que dice el balance**, o que directamente **no figura**. Aparece por dos motivos: el **costo histórico** (la norma valúa al precio de compra y no actualiza por inflación ni revalúo de mercado) y el **principio de prudencia** (la contabilidad no reconoce activos generados internamente, como la marca, porque no hubo una transacción que les ponga precio).',
          'En **Andina 2024** hay dos activos ocultos paradigmáticos. El **terreno** figura a su costo histórico de **350** pero a precio de mercado vale **900**: hay 550 de valor escondido por costo histórico. Y la **marca y la cartera de clientes** figuran en **0** —nunca se compraron, se construyeron a lo largo de 22 años— pero valen **650**: relación con clientes, reputación, recompra. Esos 1.200 de valor real no están en el PN contable.',
          'A esto se suma el **edificio**, que vale 780 contra un valor contable de 620 (+160). En total, Andina esconde unos 1.360 de activos: el balance de presentación dibuja una empresa más chica de lo que es. Un comprador que valuara solo por libros pagaría de menos; un dueño que vendiera "a valor contable" regalaría más de un tercio de su patrimonio.',
        ],
      },
      {
        heading: 'Intangibles: el activo más invisible y más valioso',
        paragraphs: [
          'El caso de la **marca** es el más instructivo. La contabilidad solo reconoce un intangible si se **compró** (hay un comprobante, un precio). Una marca **construida internamente** —que es la regla en las PyMEs familiares— vale por la lealtad de clientes, la recompra y la reputación, pero contablemente vale **cero**. Es el activo más invisible y, muchas veces, el más valioso.',
          'En la lógica del TSR Sintético, este intangible es parte del **valor fundamental operativo** del negocio: es lo que sostiene los márgenes y la capacidad de poner precio. Cuando se valúa una empresa por DCF, ese valor de marca aparece **implícito** en los flujos futuros, aunque no figure en ningún renglón del balance. Por eso el valor de mercado de una empresa sana casi siempre supera su PN contable: la diferencia es, en buena parte, intangible.',
          'Reconocer los activos ocultos cambia decisiones concretas: el terreno revaluado puede ser **garantía** de un crédito más barato que reemplace el descubierto al 85%; la marca justifica defender precios y no competir solo por costo; y ambos elevan el **piso de valuación** en una negociación de venta o de entrada de un socio. Lo que no se mide, no se defiende.',
        ],
      },
      {
        heading: 'El uso correcto y las trampas',
        paragraphs: [
          'Revaluar activos ocultos exige **rigor**, no optimismo. El terreno debe tasarse con comparables reales de mercado, no con el deseo del dueño. La marca debe valuarse con métodos defendibles (regalías evitadas, exceso de utilidad, comparables de transacciones), no inventando un número. La diferencia entre revaluar con disciplina y "inflar para vender" es la diferencia entre información de gestión y maquillaje.',
          'Hay además una **simetría obligatoria**: si se reconocen los activos ocultos (que suben el PN), hay que reconocer también los **sobrevaluados** (que lo bajan, ítem 3). Reconocer solo lo que conviene es hacer trampa con uno mismo. El ejercicio honesto de gestión ajusta en **ambas direcciones** y llega a un PN económico defendible —en Andina, +1.360 de ocultos contra −1.040 de sobrevaluados, neto +320.',
          'La **interrelación** es clara: los activos ocultos suben el PN económico (ítem 1), elevan el valor de garantía y el piso de venta, y conectan con la dolarización de la normalización (ítem 4) —en alta inflación, el valor de un terreno o una marca en dólares es mucho más estable que su costo histórico en moneda local. El activo oculto es, muchas veces, la reserva de valor real de la empresa familiar.',
        ],
      },
    ],
    model: {
      excelTitle: 'Activos ocultos — valor escondido en el balance',
      inputs: [
        { key: 'terrenoBook', label: 'Terreno (valor contable)', value: 350, min: 0, max: 3000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'terrenoReal', label: 'Terreno (valor de mercado)', value: 900, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'marcaReal', label: 'Marca y cartera (valor real, book = 0)', value: 650, min: 0, max: 4000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'edificioGap', label: 'Plus del edificio (real − book)', value: 160, min: 0, max: 2000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'gapTerreno', label: 'Activo oculto del terreno', fmt: 'money', calc: (v) => v.terrenoReal - v.terrenoBook, xl: '[terrenoReal]-[terrenoBook]' },
        { key: 'ocultosTotal', label: 'Activos ocultos totales', fmt: 'money', highlight: true, calc: (v) => v.terrenoReal - v.terrenoBook + v.marcaReal + v.edificioGap, xl: '[gapTerreno]+[marcaReal]+[edificioGap]' },
        { key: 'multTerreno', label: 'Terreno: cuántas veces el book', fmt: 'num2', calc: (v) => v.terrenoReal / v.terrenoBook, xl: '[terrenoReal]/[terrenoBook]' },
      ],
      conclusions: [
        {
          test: (v) => v.marcaReal > 0,
          good: 'La marca construida internamente vale, aunque la contabilidad la registre en cero. Sumada al terreno revaluado, eleva el PN económico y el piso de valuación. Usá el terreno como garantía y defendé precios por la marca.',
          bad: 'Sin valor de marca reconocido, los activos ocultos se limitan a la revaluación de bienes físicos. Revisá si hay intangibles (cartera, reputación) que el balance no está capturando.',
          xl: 'IF([marcaReal]>0,"La marca interna vale "&TEXT([marcaReal],"#,##0")&" aunque figure en cero. Con el terreno (x"&TEXT([multTerreno],"0.0")&" el book), los ocultos suman "&TEXT([ocultosTotal],"#,##0")&" y elevan el PN economico.","Sin valor de marca, los ocultos se limitan a bienes fisicos. Revisa intangibles no capturados.")',
        },
      ],
      chart: { sweepKey: 'terrenoReal', outKey: 'ocultosTotal', xLabel: 'Terreno a mercado', yLabel: 'Activos ocultos', yFmt: 'money' },
    },
    promptConcepts: ['Activo oculto: vale más de lo que dice el balance', 'Costo histórico vs. valor de mercado (terreno 350/900)', 'Intangibles internos no reconocidos (marca 0/650)', 'La marca como valor fundamental del negocio', 'Revaluar con rigor, no inflar para vender'],
  },

  {
    id: 's02-i3',
    week: 2,
    order: 3,
    title: 'Activos sobrevaluados',
    subtitle: 'El valor ficticio: incobrables y stock obsoleto',
    framework: 'Contabilidad de gestión · value-generation',
    theory: [
      {
        heading: 'El otro lado del ajuste: lo que vale menos',
        paragraphs: [
          'Si los activos ocultos esconden valor real, los **activos sobrevaluados** esconden **valor ficticio**: figuran en el balance por más de lo que valen. Es el ajuste que el dueño optimista no quiere hacer, pero el gerente honesto **debe** hacer. Un balance con activos sobrevaluados muestra un patrimonio que en parte **no existe**.',
          'En **Andina 2024** hay dos casos de manual. Las **cuentas por cobrar** figuran en **1.850** pero incluyen **290 de mora de más de 120 días** con baja probabilidad de cobro: el valor real es **1.560**. Y el **inventario** figura en **2.400** pero contiene **420 de mercadería obsoleta o de lenta rotación** valuada a costo histórico que a mercado vale menos: el valor real es **1.980**.',
          'A estos se suman la **maquinaria** tecnológicamente obsoleta (real 1.150 vs. book 1.450, −300) y los **rodados** (real 110 vs. book 140, −30). En total, Andina sobrevalúa unos **1.040** de activos. Ese monto es patrimonio fantasma: aparece en el PN contable pero se evapora apenas se intenta cobrar la cartera vieja o vender el stock muerto.',
        ],
      },
      {
        heading: 'Incobrables y stock muerto: dos formas de mentirse',
        paragraphs: [
          'Los **290 de incobrables** son el residuo de una **cobranza mal gestionada**. En la matriz de cobranzas (aging vs. reclamo), son la "zona crítica": cuentas muy vencidas (+120 días) y probablemente poco reclamadas, que requieren previsión y, en muchos casos, acción legal. Contarlas a valor nominal es contarse a uno mismo un cuento: esa plata, con alta probabilidad, no entra. La **previsión por incobrables** existe justamente para reflejar esto.',
          'Los **420 de inventario obsoleto** son capital muerto en celdas tipo CZ/AZ de la matriz ABC/XYZ: stock que no rota, valuado a costo histórico, que a precio de liquidación vale bastante menos. Mantenerlo a costo infla el activo, baja artificialmente el CCE aparente y distorsiona el GMROI. La gestión correcta lo previsiona, lo liquida y libera el espacio y el capital.',
          'Ambos casos comparten una raíz: la contabilidad de **presentación** los mantiene a valor histórico porque no hubo todavía una pérdida "realizada". La de **gestión** los corrige **antes**, porque para decidir hay que saber qué vale de verdad. Reconocer la pérdida temprano duele, pero permite actuar; ignorarla solo posterga —y agranda— el golpe.',
        ],
      },
      {
        heading: 'El impacto en el resultado y la cadena de valor',
        paragraphs: [
          'Sincerar los activos sobrevaluados no solo baja el PN: también **impacta el resultado**. Previsionar 290 de incobrables y desvalorizar 420 de stock son cargos contra la utilidad. El resultado neto de 175 que mostraba Andina podría **desaparecer o volverse negativo** si se reconocieran de golpe estas pérdidas latentes. Es decir: la ganancia de presentación es aún más frágil de lo que parecía en la Semana 1.',
          'La **interrelación** con la creación de valor es de doble filo virtuoso. Atacar los incobrables (matriz de cobranzas) baja el **DSO**, reduce el CCE y, al cobrar mejor, baja también la **previsión** futura —sube el NOPAT. Atacar el inventario obsoleto (matriz ABC/XYZ) baja el **DIO**, sube el **GMROI** y libera capital de trabajo. Ambos reducen el Capital Invertido **y** mejoran el numerador: el ROIC sube por las dos puntas.',
          'La regla de oro de la Semana 2 es la **simetría**: el ajuste honesto reconoce ocultos **y** sobrevaluados. En Andina, +1.360 de ocultos contra −1.040 de sobrevaluados dan un neto positivo de +320; el patrimonio económico sigue por encima del contable, pero la rentabilidad corriente es mucho más débil de lo que el resultado neto sugiere. Esa es la lectura completa que ninguna de las dos contabilidades da por separado.',
        ],
      },
    ],
    model: {
      excelTitle: 'Activos sobrevaluados — valor ficticio en el balance',
      inputs: [
        { key: 'cxcBook', label: 'Cuentas por cobrar (libros)', value: 1850, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'incobrables', label: 'Incobrables (mora +120 días)', value: 290, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'invBook', label: 'Inventarios (libros)', value: 2400, min: 0, max: 8000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'obsoleto', label: 'Inventario obsoleto / lenta rotación', value: 420, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'otrosSobre', label: 'Otros sobrevaluados (maquinaria, rodados)', value: 330, min: 0, max: 3000, step: 5, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'cxcReal', label: 'Cuentas por cobrar reales', fmt: 'money', calc: (v) => v.cxcBook - v.incobrables, xl: '[cxcBook]-[incobrables]' },
        { key: 'invReal', label: 'Inventario real', fmt: 'money', calc: (v) => v.invBook - v.obsoleto, xl: '[invBook]-[obsoleto]' },
        { key: 'sobreTotal', label: 'Activos sobrevaluados totales', fmt: 'money', highlight: true, calc: (v) => v.incobrables + v.obsoleto + v.otrosSobre, xl: '[incobrables]+[obsoleto]+[otrosSobre]' },
        { key: 'impactoResultado', label: 'Impacto en resultado (incob. + obsoleto)', fmt: 'money', calc: (v) => v.incobrables + v.obsoleto, xl: '[incobrables]+[obsoleto]' },
      ],
      conclusions: [
        {
          test: (v) => v.incobrables + v.obsoleto < 175,
          good: 'El cargo por incobrables + obsoleto es menor al resultado neto: sincerar estos activos reduce la utilidad pero no la borra. Igual hay que previsionar y atacar cobranzas e inventario.',
          bad: 'El cargo por incobrables + obsoleto iguala o supera el resultado neto de 175: sincerar estos activos hace DESAPARECER la ganancia de presentación. La rentabilidad real es mucho más frágil de lo que muestra el ER.',
          xl: 'IF([impactoResultado]<175,"El cargo por incobrables + obsoleto ("&TEXT([impactoResultado],"#,##0")&") es menor al resultado neto 175: lo reduce pero no lo borra. Igual previsiona y ataca cobranzas e inventario.","El cargo ("&TEXT([impactoResultado],"#,##0")&") iguala o supera el resultado neto 175: sincerar HACE DESAPARECER la ganancia. La rentabilidad real es fragil.")',
        },
      ],
      chart: { sweepKey: 'obsoleto', outKey: 'sobreTotal', xLabel: 'Inventario obsoleto', yLabel: 'Activos sobrevaluados', yFmt: 'money' },
    },
    promptConcepts: ['Activo sobrevaluado: vale menos de lo que dice el balance', 'Incobrables (290) y la matriz de cobranzas (DSO)', 'Inventario obsoleto (420) y la matriz ABC/XYZ (DIO)', 'Previsión: reconocer la pérdida latente antes', 'Simetría: ajustar ocultos Y sobrevaluados'],
  },

  {
    id: 's02-i4',
    week: 2,
    order: 4,
    title: 'Normalización de la empresa familiar',
    subtitle: 'Gastos del dueño, sueldos de mercado y dolarización',
    framework: 'synthetic-tsr · Normalización (Pereiro / BCG)',
    theory: [
      {
        heading: 'Por qué el balance familiar miente sobre la rentabilidad',
        paragraphs: [
          'En la PyME familiar, los estados contables están **contaminados** por la mezcla entre la persona y la empresa. El dueño pasa **gastos personales** por la firma (auto, viajes, consumos), a veces **no se asigna un sueldo de mercado** por el rol que cumple, y la inflación local distorsiona toda comparación temporal. Antes de valuar o de medir la rentabilidad real, hay que **normalizar**: limpiar el Estado de Resultados de esas distorsiones para ver el negocio "puro".',
          'La normalización es un paso **obligatorio** del TSR Sintético y de cualquier valuación seria de capital cerrado. Su objetivo es responder: ¿cuánto ganaría este negocio en manos de un dueño profesional, pagando sueldos de mercado y sin gastos personales encima? Ese es el EBITDA / resultado **normalizado**, la base honesta sobre la que se descuentan flujos y se mide el spread ROIC − WACC.',
          'En el marco de Pereiro y BCG, normalizar distingue al **ERI** (inversor de riesgo económico: el fundador, que concentra toda su riqueza y mezcla su economía con la de la empresa) del negocio en sí. La empresa que se valúa no es "la del dueño con sus costumbres", sino el activo económico subyacente, ajustado a condiciones de mercado.',
        ],
      },
      {
        heading: 'Los tres ajustes de normalización',
        paragraphs: [
          '**(1) Gastos personales del dueño.** Se **suman de vuelta** al resultado los consumos personales pasados por la empresa que no corresponden a la operación. Si Andina cargó, digamos, gastos del dueño que no son del negocio, ese monto debe sumarse al EBITDA: no es un costo real de fabricar autopartes. Suben la rentabilidad normalizada.',
          '**(2) Sueldo de mercado del dueño.** El espejo del ajuste anterior. Si el fundador trabaja a tiempo completo dirigiendo la empresa y **no se paga** un sueldo (o se paga uno simbólico), hay que **restar** el costo de reemplazarlo por un gerente profesional a precio de mercado. El negocio debe poder pagar ese sueldo y aun así rendir. Baja la rentabilidad normalizada. Estos dos ajustes son simétricos y se netean.',
          '**(3) Dolarización.** En economías de **alta inflación** (Argentina, Ecuador), modelar en moneda local mezcla pesos de distinto poder adquisitivo y crea una **ilusión nominal** de crecimiento. La disciplina del skill es trabajar en **USD** para aislar el crecimiento real de la ilusión nominal. Por eso todo el caso Andina está en miles de USD: un EBITDA que "crece" 80% en pesos puede estar **cayendo** en dólares. Dolarizar es la condición para que el resto del análisis tenga sentido.',
        ],
      },
      {
        heading: 'El resultado normalizado y sus interrelaciones',
        paragraphs: [
          'El producto de la normalización es un **EBITDA normalizado** que reemplaza al contable como base de todo. Partís del EBITDA reportado, **sumás** los gastos personales del dueño, **restás** el sueldo de mercado faltante, y trabajás el todo en dólares. Ese número es el que alimenta el DCF, el TSR Sintético y la decisión de política de dividendos —no el EBITDA de presentación, que está inflado o deflactado por la mezcla familiar.',
          'La **trampa más común** es normalizar en una sola dirección: sumar los gastos personales (que conviene, sube el resultado) pero "olvidar" restar el sueldo de mercado (que no conviene, lo baja). Eso vuelve a ser maquillaje, no gestión. La normalización honesta hace **ambos** ajustes y acepta el número que salga, sea cual sea.',
          'Esto se enlaza con toda la Semana 2: la normalización es a los **flujos** lo que el ajuste de activos ocultos/sobrevaluados es al **patrimonio**. Juntos producen una versión económica completa de la empresa —un balance y un resultado de gestión— sobre la cual recién se puede medir si Andina **crea o destruye valor**. Y conecta con el Ke del dueño no diversificado y con los descuentos DLOC/DLOM que aparecen al valuar la PyME cerrada.',
        ],
      },
    ],
    model: {
      excelTitle: 'EBITDA normalizado de la empresa familiar',
      inputs: [
        { key: 'ebitdaReport', label: 'EBITDA reportado (contable)', value: 1120, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'gastosDueno', label: '(+) Gastos personales del dueño', value: 180, min: 0, max: 2000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'sueldoMercado', label: '(−) Sueldo de mercado del dueño', value: 240, min: 0, max: 2000, step: 5, unit: 'k', fmt: 'num' },
        { key: 'ventas', label: 'Ventas netas (USD)', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'inflLocal', label: 'Inflación local del período', value: 0.8, min: 0, max: 3, step: 0.05, fmt: 'pct' },
      ],
      calcs: [
        { key: 'ajusteNorm', label: 'Ajuste neto de normalización', fmt: 'money', calc: (v) => v.gastosDueno - v.sueldoMercado, xl: '[gastosDueno]-[sueldoMercado]' },
        { key: 'ebitdaNorm', label: 'EBITDA normalizado (en USD)', fmt: 'money', highlight: true, calc: (v) => v.ebitdaReport + v.gastosDueno - v.sueldoMercado, xl: '[ebitdaReport]+[ajusteNorm]' },
        { key: 'margenNorm', label: 'Margen EBITDA normalizado', fmt: 'pct', calc: (v) => (v.ebitdaReport + v.gastosDueno - v.sueldoMercado) / v.ventas, xl: '[ebitdaNorm]/[ventas]' },
      ],
      conclusions: [
        {
          test: (v) => v.ebitdaReport + v.gastosDueno - v.sueldoMercado > 0,
          good: 'El EBITDA normalizado es positivo: el negocio rinde aun pagando un sueldo de mercado al dueño y sin sus gastos personales encima. En USD, esta es la base honesta para valuar y decidir dividendos.',
          bad: 'El EBITDA normalizado es negativo o nulo: una vez que el dueño cobra sueldo de mercado, el negocio no genera resultado operativo. La rentabilidad reportada dependía de no pagarle al fundador.',
          xl: 'IF([ebitdaNorm]>0,"EBITDA normalizado "&TEXT([ebitdaNorm],"#,##0")&" positivo: el negocio rinde pagando sueldo de mercado y sin gastos personales. En USD es la base honesta para valuar.","EBITDA normalizado "&TEXT([ebitdaNorm],"#,##0")&" no positivo: la rentabilidad dependia de no pagarle sueldo de mercado al dueno.")',
        },
      ],
      chart: { sweepKey: 'sueldoMercado', outKey: 'ebitdaNorm', xLabel: 'Sueldo de mercado del dueño', yLabel: 'EBITDA normalizado', yFmt: 'money' },
    },
    promptConcepts: ['Normalización: limpiar el ER de la mezcla familiar', 'Sumar gastos personales del dueño', 'Restar el sueldo de mercado faltante', 'Dolarización: aislar el crecimiento real (USD)', 'EBITDA normalizado como base del DCF y el TSR'],
  },

  {
    id: 's02-i5',
    week: 2,
    order: 5,
    title: 'Control: estimado vs. realmente sucedido',
    subtitle: 'El presupuesto contra la realidad: el desvío que enseña',
    framework: 'Control de gestión · Presupuesto vs. real',
    theory: [
      {
        heading: 'Estimar es fácil; controlar es lo que crea disciplina',
        paragraphs: [
          'La gestión no termina cuando se hace el presupuesto: empieza ahí. **Estimar** (proyectar ventas, costos, caja) es la mitad fácil; la otra mitad, la que de verdad construye una empresa profesional, es **controlar**: comparar lo **estimado** con lo que **realmente sucedió**, medir el **desvío** y entender por qué pasó. Sin control, el presupuesto es un deseo escrito en una planilla.',
          'El instrumento es el **análisis de desvíos** (variance analysis): para cada línea, Desvío = Real − Presupuestado. Un desvío puede ser **favorable** (vendí más, gasté menos) o **desfavorable** (vendí menos, gasté más). Lo que importa no es solo el signo, sino la **magnitud relativa** y, sobre todo, la **causa**: ¿fue precio, volumen, mix, eficiencia, o un supuesto que estaba mal de entrada?',
          'En **Andina**, el control es la herramienta que conecta toda la Semana con la acción. El presupuesto pudo haber estimado una rotación de inventario, un DSO de cobranza, un EBITDA. Comparar contra el real (inventario que creció 30% cuando las ventas crecieron 11%, cobranzas que se estiraron) **cuantifica** dónde la realidad se desvió del plan y dispara las correcciones concretas.',
        ],
      },
      {
        heading: 'Anatomía de un desvío bien leído',
        paragraphs: [
          'Un desvío mal leído lleva a decisiones erradas. Un sobrecumplimiento de ventas (favorable) puede esconder un problema si vino con **descuentos agresivos** que hundieron el margen, o si esas ventas terminaron en la **cartera incobrable** (los 290 de Andina). Un subcumplimiento de gastos (favorable) puede ser malo si fue **postergar mantenimiento** o capacitación que se pagará caro después. El signo del desvío no alcanza: hay que entender la historia detrás.',
          'Por eso el control profesional descompone los desvíos por **driver**. Un desvío de ventas se abre en **precio × volumen × mix**. Un desvío de costo se abre en **eficiencia × precio de insumos**. Esta descomposición —prima hermana del DuPont y del árbol de generadores de valor— dice exactamente qué palanca falló y, por lo tanto, qué corregir. Atacar la causa, no el síntoma.',
          'El control también valida (o destruye) los **supuestos** del modelo. Si el presupuesto asumió un riesgo país, una inflación o un tipo de cambio, comparar contra lo realmente sucedido recalibra esas estimaciones para el próximo ciclo. En mercados emergentes, donde los supuestos macro se mueven brutalmente, esta recalibración es lo que evita repetir el error: un EMBI o una inflación que se desvían 300 puntos básicos obligan a rehacer el plan.',
        ],
      },
      {
        heading: 'El círculo virtuoso: estimar, controlar, corregir',
        paragraphs: [
          'El control cierra el **círculo de gestión**: estimar → ejecutar → controlar → corregir → estimar mejor. Cada vuelta del ciclo, la empresa estima con menos error porque aprendió de los desvíos anteriores. Una PyME que controla sistemáticamente convierte la incertidumbre de los mercados emergentes en aprendizaje acumulado; una que solo presupuesta y nunca compara repite los mismos errores año tras año.',
          'La **interrelación** con todo el programa es el cierre natural de la Semana 2. El control es el mecanismo que convierte la **información de gestión** (PN económico, EBITDA normalizado, CCE, GMROI) en **decisión y corrección**. De nada sirve calcular el valor económico si después no se controla si las acciones para mejorarlo se ejecutaron y funcionaron. La contabilidad de gestión sin control es diagnóstico sin tratamiento.',
          'El cierre conceptual del módulo: la **contabilidad de presentación** mira hacia atrás y hacia afuera (rendir cuentas a terceros); la **de gestión con control** mira hacia adelante y hacia adentro (decidir y corregir). Andina necesita las dos, pero es la segunda —medir lo estimado contra lo realmente sucedido y actuar sobre el desvío— la que separa a una empresa que **administra** de una que solo **registra**. Eso es lo que el resto de la academia va a poner en práctica.',
        ],
      },
    ],
    model: {
      excelTitle: 'Control — desvío de lo estimado vs. lo real',
      inputs: [
        { key: 'ventasPpto', label: 'Ventas presupuestadas', value: 8000, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'ventasReal', label: 'Ventas reales', value: 8200, min: 1000, max: 20000, step: 50, unit: 'k', fmt: 'num' },
        { key: 'ebitdaPpto', label: 'EBITDA presupuestado', value: 1300, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
        { key: 'ebitdaReal', label: 'EBITDA real', value: 1120, min: 0, max: 5000, step: 10, unit: 'k', fmt: 'num' },
      ],
      calcs: [
        { key: 'desvioVentas', label: 'Desvío de ventas (real − ppto)', fmt: 'money', calc: (v) => v.ventasReal - v.ventasPpto, xl: '[ventasReal]-[ventasPpto]' },
        { key: 'desvioEbitda', label: 'Desvío de EBITDA (real − ppto)', fmt: 'money', highlight: true, calc: (v) => v.ebitdaReal - v.ebitdaPpto, xl: '[ebitdaReal]-[ebitdaPpto]' },
        { key: 'desvioEbitdaPct', label: 'Desvío de EBITDA (%)', fmt: 'pct', calc: (v) => (v.ebitdaReal - v.ebitdaPpto) / v.ebitdaPpto, xl: '([ebitdaReal]-[ebitdaPpto])/[ebitdaPpto]' },
        { key: 'margenRealPct', label: 'Margen EBITDA real', fmt: 'pct', calc: (v) => v.ebitdaReal / v.ventasReal, xl: '[ebitdaReal]/[ventasReal]' },
      ],
      conclusions: [
        {
          test: (v) => v.ventasReal >= v.ventasPpto && v.ebitdaReal < v.ebitdaPpto,
          good: 'Cuidado con el desvío engañoso: las ventas superaron el presupuesto pero el EBITDA quedó por debajo. Vendiste más y ganaste menos: el problema está en el margen o en los costos, no en el volumen. Atacá la causa, no celebres el volumen.',
          bad: 'El desvío de ventas y de EBITDA van en la misma dirección: la lectura es directa. Descomponé igual por precio, volumen y mix para confirmar la causa antes de corregir.',
          xl: 'IF(AND([ventasReal]>=[ventasPpto],[ebitdaReal]<[ebitdaPpto]),"Desvio enganoso: ventas sobre presupuesto (+"&TEXT([desvioVentas],"#,##0")&") pero EBITDA por debajo ("&TEXT([desvioEbitda],"#,##0")&"). Vendiste mas y ganaste menos: ataca el margen, no celebres el volumen.","Desvios de ventas y EBITDA en la misma direccion: descompon por precio, volumen y mix antes de corregir.")',
        },
      ],
      chart: { sweepKey: 'ebitdaReal', outKey: 'desvioEbitda', xLabel: 'EBITDA real', yLabel: 'Desvío de EBITDA', yFmt: 'money' },
    },
    promptConcepts: ['Estimar vs. controlar: el círculo de gestión', 'Análisis de desvíos: Real − Presupuestado', 'Desvío favorable que esconde un problema', 'Descomponer el desvío por precio, volumen y mix', 'Control como puente entre gestión y corrección'],
  },
]
