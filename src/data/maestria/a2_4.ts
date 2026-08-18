import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 2.4 — Gestión del Capital de Trabajo, Ciclo de Conversión de
// Efectivo y Matrices Operativas
// ============================================================================
export const a2_4: Asignatura = {
  cod: '2.4',
  slug: 'a2-4',
  cuatrimestre: 2,
  fase: 'Diagnóstica · ¿Por qué sucedió?',
  nombre: 'Gestión del Capital de Trabajo, Ciclo de Conversión de Efectivo y Matrices Operativas',
  horas: '36 h · 12 teóricas / 24 prácticas',
  correlativas: 'Correlativas: 1.2 y 1.4 · Segundo cuatrimestre',
  framework: 'Sagner · Koller/McKinsey · Chopra & Meindl',
  resumen:
    'Medir, descomponer y gestionar el ciclo de conversión de efectivo; diseñar políticas de inventarios, crédito y pagos fundadas en el dato; y cuantificar el capital liberado por cada mejora y su efecto sobre el ROIC y el EVA.',
  objetivos: [
    'Medir y descomponer el ciclo de conversión de efectivo (CCE).',
    'Diseñar políticas de inventarios, crédito y pagos con la matriz ABC/XYZ y la de vencimiento-reclamo.',
    'Cuantificar el capital liberado por cada mejora y trazar su efecto sobre el ROIC y el EVA.',
    'Conocer los instrumentos argentinos de financiamiento del capital de trabajo.',
  ],
  sections: [
    {
      title: 'El ciclo de conversión de efectivo',
      intro: 'Cuántos días de caja tiene atrapados la operación. En un mercado emergente con capital caro, es la palanca de mayor retorno.',
      blocks: [
        { t: 'formula', name: 'Ciclo de Conversión de Efectivo', expr: 'CCE = DIO + DSO − DPO', where: 'DIO = días de inventario · DSO = días de cobranza · DPO = días de pago a proveedores', note: 'DIO = Inventario/CMV × 365 · DSO = CxC/Ventas × 365 · DPO = Proveedores/CMV × 365.' },
        { t: 'idea', md: 'En un mercado emergente con capital caro y escaso, **la palanca de mayor retorno está en el denominador, no en el margen**. Bajar el CCE libera capital que estaba financiando la operación, y ese capital reduce el capital invertido → sube el ROIC → sube el EVA. Muchas veces rinde más ordenar el capital de trabajo que pelear un punto de margen.' },
        { t: 'p', md: 'Criterio del programa: del denominador se excluyen la **caja operativa mínima** y la **deuda financiera** —solo cuenta el capital de trabajo operativo—.' },
      ],
    },
    {
      title: 'La matriz ABC/XYZ',
      intro: 'No todos los ítems merecen la misma política. La matriz cruza importancia económica con previsibilidad de la demanda.',
      blocks: [
        { t: 'p', md: 'El eje **ABC** clasifica por valor de consumo (regla de Pareto: pocos ítems concentran la mayor parte del valor). El eje **XYZ** clasifica por **variabilidad de la demanda** (coeficiente de variación). Las nueve celdas resultantes definen políticas diferenciadas de reposición, cobertura y control.' },
        { t: 'table', title: 'Política por celda (selección)', headers: ['Celda', 'Perfil', 'Política'], firstColLeft: true, rows: [
          ['AX', 'Alto valor, demanda estable', 'Reposición ajustada, poco stock de seguridad, control estricto'],
          ['AZ', 'Alto valor, demanda errática', 'Control estricto pero más cobertura; foco de gestión'],
          ['CX', 'Bajo valor, demanda estable', 'Reglas simples, lotes grandes, poco seguimiento'],
          ['CZ', 'Bajo valor, demanda errática', 'Stock de seguridad barato o compra bajo pedido'],
        ] },
        { t: 'warn', md: 'La tensión propia del contexto: bajo inflación conviene **cubrirse con stock** (el bien se aprecia), pero el stock **inmoviliza capital caro**. La matriz ABC/XYZ es la herramienta para resolver esa tensión ítem por ítem, no con una regla única.' },
      ],
    },
    {
      title: 'La matriz de vencimiento contra reclamo',
      intro: 'Una radiografía de la cobranza que revela el costo de la inacción.',
      blocks: [
        { t: 'p', md: 'La matriz cruza los **días de vencimiento** de cada factura contra los **días de reclamo** de esa factura. Sus cuadrantes revelan patrones: facturas muy vencidas nunca reclamadas (dinero que se está regalando), o reclamos tempranos sobre facturas no vencidas (fricción innecesaria con buenos clientes). De cada cuadrante se deriva una política y se cuantifica el **costo de la inacción en cobranzas**.' },
        { t: 'ul', items: [
          '**Política de crédito:** límites, plazos, garantías y descuentos por pronto pago (con su costo financiero implícito).',
          '**Incobrabilidad esperada** y su previsión.',
          '**Gestión de pagos:** el crédito comercial como fuente de financiamiento y su costo implícito.',
        ] },
      ],
    },
    {
      title: 'Instrumentos argentinos y el puente al valor',
      intro: 'Las herramientas locales para financiar el capital de trabajo, y cómo cada día ganado se traduce en valor.',
      blocks: [
        { t: 'ul', items: [
          '**Descuento de cheques de pago diferido** (mercado de capitales y sistema bancario).',
          '**Factoring**, **sociedades de garantía recíproca** (SGR), adelantos en cuenta corriente y **prefinanciación de exportaciones**.',
          'De cada instrumento se calcula el **costo financiero total efectivo**, para comparar peras con peras.',
        ] },
        { t: 'formula', name: 'El puente al valor', expr: 'Capital liberado ≈ (Capital de trabajo ÷ CCE) × días reducidos', where: 'EVA adicional ≈ Capital liberado × WACC', note: 'Cada día de CCE que se reduce libera capital; ese capital deja de costar el WACC, y esa es la mejora directa del EVA.' },
        { t: 'quote', author: 'James Sagner', credential: 'Working Capital Management', md: 'El capital de trabajo es la fuente de financiamiento más barata y más ignorada de una empresa: el efectivo que hoy financia inventarios y cuentas por cobrar puede liberarse sin pedir un peso al banco.' },
      ],
    },
  ],
  expertos: [
    { author: 'James Sagner', credential: 'Working Capital Management', md: 'Reducir el ciclo de conversión de efectivo es, muchas veces, la inversión de mayor retorno y menor riesgo que una empresa puede hacer: no compra nada, solo deja de inmovilizar.' },
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'El capital de trabajo es parte del capital invertido: cada peso atrapado en inventarios o cuentas por cobrar exige el mismo retorno que una máquina. Ignorarlo es subestimar el capital.' },
    { author: 'Sunil Chopra', credential: 'Supply Chain Management', md: 'La política de inventario no es una sola: debe segmentarse por valor y por variabilidad de la demanda. Tratar todos los ítems igual es garantía de exceso en unos y faltante en otros.' },
  ],
  caso: {
    titulo: 'El capital atrapado en la operación',
    empresa: 'Maderas del Litoral S.A. — liberar caja del ciclo',
    contexto:
      'Maderas del Litoral tiene la caja siempre ajustada, aunque es rentable. El consultor sospecha que el problema no está en el margen sino en el ciclo: demasiados días de madera en el depósito y de facturas sin cobrar.\n\nMide el CCE, clasifica el stock de madera con la matriz ABC/XYZ (el pino y el eucalipto de alto valor merecen otra política que los insumos menores) y cuantifica cuánto capital se libera —y cuánto EVA se gana— si el ciclo se reduce en diez días.\n\nEl hallazgo conecta con todo el programa: el capital liberado baja el capital invertido, sube el ROIC y mejora el EVA, sin vender una tabla más.',
    datos: [
      { t: 'table', title: 'Datos del capital de trabajo (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Ventas', '42.000'],
        ['Costo de mercadería vendida', '27.000'],
        ['Inventario (bienes de cambio)', '3.770'],
        ['Cuentas por cobrar', '3.100'],
        ['Proveedores', '1.900'],
        ['WACC', '20,0%'],
        ['Reducción objetivo del CCE', '10 días'],
      ] },
    ],
    consigna: [
      '¿Cuál es el CCE de la empresa y cómo se descompone en DIO, DSO y DPO?',
      '¿Cuánto capital se libera reduciendo el CCE en 10 días, y cuánto EVA adicional genera?',
      '¿Qué política de reposición sugiere la matriz ABC/XYZ para el stock de madera?',
      '¿Por qué en este contexto ordenar el capital de trabajo rinde más que pelear un punto de margen?',
    ],
    metodologia: [
      { k: 'Medir el CCE', d: 'DIO + DSO − DPO, con las bases correctas (CMV para inventario y pagos, ventas para cobranzas).' },
      { k: 'Clasificar (ABC/XYZ)', d: 'Ordenar por valor (Pareto) y por variabilidad (CV); asignar la celda y su política.' },
      { k: 'Cuantificar el capital liberado', d: '(Capital de trabajo/CCE) × días reducidos.' },
      { k: 'Traducir a valor', d: 'EVA adicional = capital liberado × WACC.' },
      { k: 'Priorizar', d: 'Ordenar las palancas por retorno sobre esfuerzo.' },
    ],
  },
  model: {
    sheetTitle: 'Ciclo de conversión de efectivo, capital liberado y matriz ABC/XYZ',
    intro:
      'Editá las celdas marfil. Se calcula el CCE y el capital liberado (→ EVA), y la matriz dinámica clasifica el stock ABC (Pareto con SCAN) y XYZ (variabilidad) en una sola fórmula, ordenada por valor con SORTBY.',
    inputs: [
      { key: 'ventas', label: 'Ventas', value: 42000, fmt: 'money', unit: 'miles $' },
      { key: 'cmv', label: 'Costo de mercadería vendida', value: 27000, fmt: 'money' },
      { key: 'inv', label: 'Inventario (bienes de cambio)', value: 3770, fmt: 'money' },
      { key: 'cxc', label: 'Cuentas por cobrar', value: 3100, fmt: 'money' },
      { key: 'prov', label: 'Proveedores', value: 1900, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.2, fmt: 'pct1' },
      { key: 'diasRed', label: 'Reducción objetivo del CCE', value: 10, fmt: 'days' },
    ],
    calcs: [
      { key: 'dio', label: 'DIO — días de inventario', xl: '=[inv]/[cmv]*365', fmt: 'days' },
      { key: 'dso', label: 'DSO — días de cobranza', xl: '=[cxc]/[ventas]*365', fmt: 'days' },
      { key: 'dpo', label: 'DPO — días de pago', xl: '=[prov]/[cmv]*365', fmt: 'days' },
      { key: 'cce', label: 'Ciclo de Conversión de Efectivo', xl: '=[dio]+[dso]-[dpo]', fmt: 'days', highlight: true },
      { key: 'cto', label: 'Capital de trabajo operativo', xl: '=[inv]+[cxc]-[prov]', fmt: 'money' },
      { key: 'capDia', label: 'Capital por día de ciclo', xl: '=[cto]/[cce]', fmt: 'money' },
      { key: 'capLib', label: 'Capital liberado (por la reducción)', xl: '=[capDia]*[diasRed]', fmt: 'money', highlight: true },
      { key: 'evaAd', label: 'EVA adicional (capital liberado × WACC)', xl: '=[capLib]*[wacc]', fmt: 'money', highlight: true },
    ],
    spills: [
      {
        key: 'abcxyz',
        title: 'Clasificación ABC/XYZ del stock (Pareto con SCAN, orden con SORTBY)',
        columns: ['Ítem', 'Valor consumo', '% acumulado', 'ABC', 'CV demanda', 'XYZ', 'Celda'],
        xl: '=LET(it,{"Pino tratado";"Eucalipto";"Álamo";"Herrajes";"Barnices";"Bisagras";"Tornillería";"Sellador"}, val,{9800;7200;3100;1800;1200;600;450;300}, cv,{0.22;0.35;0.6;0.45;0.9;0.55;1.3;1.1}, sIt,SORTBY(it,val,-1), sVal,SORT(val,,-1), sCv,SORTBY(cv,val,-1), cum,SCAN(0,sVal,LAMBDA(a,b,a+b))/SUM(val), abc,IF(cum<=0.8,"A",IF(cum<=0.95,"B","C")), xyz,IF(sCv<0.5,"X",IF(sCv<1,"Y","Z")), HSTACK(sIt,sVal,cum,abc,sCv,xyz,abc&xyz))',
        formats: [undefined, 'money', 'pct', undefined, 'num2', undefined, undefined],
        rows: 8,
        note: 'SORTBY ordena por valor de consumo; SCAN acumula el % (Pareto) para el corte ABC; el CV define XYZ. La celda combina ambos ejes. Todo en una sola fórmula.',
      },
    ],
    conclusions: [
      { label: 'Ciclo', xl: '="CCE de "&TEXT([cce],"0")&" días (DIO "&TEXT([dio],"0")&" + DSO "&TEXT([dso],"0")&" − DPO "&TEXT([dpo],"0")&"). Cada día del ciclo inmoviliza "&TEXT([capDia],"#,##0")&" miles."' },
      { label: 'Valor liberado', xl: '="Reducir el CCE en "&[diasRed]&" días libera "&TEXT([capLib],"#,##0")&" miles de capital y suma "&TEXT([evaAd],"#,##0")&" miles de EVA — sin vender una unidad más. Ordenar el capital de trabajo rinde más que pelear margen."' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El ciclo de conversión de efectivo (CCE) se calcula como:', opciones: ['DIO − DSO + DPO.', 'DIO + DSO − DPO.', 'DSO + DPO − DIO.', 'DIO × DSO × DPO.'], correcta: 1, justificacion: 'CCE = días de inventario + días de cobranza − días de pago. Los proveedores financian parte del ciclo, por eso se restan. Las otras combinaciones no representan el ciclo.' },
    { id: 'q2', pregunta: '¿Por qué en un mercado emergente la mayor palanca de retorno suele estar en el CCE y no en el margen?', opciones: ['Porque el margen no importa.', 'Porque el capital es caro y escaso: liberar capital del ciclo baja el capital invertido y sube el ROIC/EVA.', 'Porque el CCE no afecta el capital.', 'Porque la inflación es baja.'], correcta: 1, justificacion: 'Con capital caro, cada día de ciclo cuesta mucho; liberar capital de trabajo mejora el ROIC/EVA sin tocar el margen. El margen sí importa, pero el ciclo suele rendir más y el capital es justamente lo que el CCE mueve.' },
    { id: 'q3', pregunta: 'El DIO (días de inventario) se calcula sobre:', opciones: ['Las ventas.', 'El costo de mercadería vendida (CMV).', 'El patrimonio.', 'El EBIT.'], correcta: 1, justificacion: 'El inventario se valúa a costo, por eso DIO = Inventario/CMV × 365. Usar ventas mezclaría costo con precio y sobreestimaría la rotación.' },
    { id: 'q4', pregunta: 'El eje ABC de la matriz clasifica los ítems por:', opciones: ['Su variabilidad de demanda.', 'Su valor de consumo (regla de Pareto).', 'Su color.', 'Su antigüedad.'], correcta: 1, justificacion: 'ABC ordena por valor de consumo: pocos ítems (A) concentran la mayor parte del valor. La variabilidad es el eje XYZ, no el ABC.' },
    { id: 'q5', pregunta: 'El eje XYZ clasifica los ítems por:', opciones: ['Su valor.', 'La variabilidad/previsibilidad de su demanda (coeficiente de variación).', 'Su peso.', 'El proveedor.'], correcta: 1, justificacion: 'XYZ mide la previsibilidad de la demanda por el CV: X estable, Z errática. El valor es el eje ABC.' },
    { id: 'q6', pregunta: 'Un ítem “AX” (alto valor, demanda estable) merece:', opciones: ['Mucho stock de seguridad y poco control.', 'Reposición ajustada, poco stock de seguridad y control estricto.', 'Compra al azar.', 'Ninguna política.'], correcta: 1, justificacion: 'Al ser valioso y previsible, conviene reponer justo, con poco colchón y control estricto (cada peso ahí es caro). No requiere gran stock de seguridad.' },
    { id: 'q7', pregunta: 'La tensión del capital de trabajo bajo inflación es:', opciones: ['No existe.', 'Cubrirse con stock (que se aprecia) vs. inmovilizar capital caro.', 'Pagar más impuestos.', 'Vender más barato.'], correcta: 1, justificacion: 'La inflación premia acumular stock (bien real que se aprecia) pero el stock inmoviliza capital costoso; la matriz ABC/XYZ resuelve la tensión ítem por ítem. No es inexistente ni fiscal.' },
    { id: 'q8', pregunta: 'La matriz de vencimiento-reclamo revela, entre otras cosas:', opciones: ['El margen bruto.', 'Facturas muy vencidas nunca reclamadas (dinero que se regala).', 'La tasa de interés.', 'El patrimonio.'], correcta: 1, justificacion: 'Cruza vencimiento con reclamo y expone patrones de cobranza, como facturas vencidas sin gestión. No mide margen, tasa ni patrimonio.' },
    { id: 'q9', pregunta: 'El capital liberado por reducir el CCE se aproxima como:', opciones: ['Ventas × CCE.', '(Capital de trabajo ÷ CCE) × días reducidos.', 'CCE × margen.', 'Patrimonio ÷ CCE.'], correcta: 1, justificacion: 'El capital por día de ciclo es Capital de trabajo/CCE; multiplicado por los días reducidos da el capital liberado. Las otras expresiones no tienen sentido dimensional.' },
    { id: 'q10', pregunta: 'El EVA adicional por liberar capital de trabajo se estima como:', opciones: ['Capital liberado × WACC.', 'Capital liberado ÷ ventas.', 'Capital liberado × inflación.', 'Capital liberado − impuestos.'], correcta: 0, justificacion: 'El capital liberado deja de costar el WACC, así que el ahorro (EVA adicional) es capital liberado × WACC. No se divide por ventas ni se multiplica por inflación.' },
    { id: 'q11', pregunta: 'Del denominador del CCE, el programa excluye:', opciones: ['El inventario.', 'La caja operativa mínima y la deuda financiera.', 'Las cuentas por cobrar.', 'Los proveedores.'], correcta: 1, justificacion: 'El CCE trabaja con capital de trabajo operativo; se excluyen la caja operativa mínima y la deuda financiera. Inventario, CxC y proveedores sí participan.' },
    { id: 'q12', pregunta: 'El descuento de cheques de pago diferido es:', opciones: ['Un impuesto.', 'Un instrumento argentino de financiamiento del capital de trabajo.', 'Una norma contable.', 'Un método de valuación.'], correcta: 1, justificacion: 'Es una fuente de financiamiento del capital de trabajo (bancaria o de mercado de capitales). No es tributo, norma contable ni método de valuación.' },
    { id: 'q13', pregunta: 'Un descuento por pronto pago ofrecido a clientes tiene:', opciones: ['Costo cero.', 'Un costo financiero implícito que debe calcularse.', 'Beneficio garantizado.', 'Efecto nulo sobre el CCE.'], correcta: 1, justificacion: 'Renunciar a parte del precio por cobrar antes tiene un costo financiero implícito (a veces muy alto en tasa anualizada) que hay que cuantificar. Sí acorta el DSO, afectando el CCE.' },
    { id: 'q14', pregunta: 'El crédito comercial de los proveedores (DPO) es:', opciones: ['Gratis siempre.', 'Una fuente de financiamiento con un costo implícito (si se pierden descuentos).', 'Un activo.', 'Irrelevante.'], correcta: 1, justificacion: 'Estirar pagos financia el ciclo, pero puede tener costo implícito (perder descuentos por pronto pago). No es gratis ni irrelevante, y es un pasivo, no un activo.' },
    { id: 'q15', pregunta: 'Reducir el CCE mejora el valor porque:', opciones: ['Aumenta las ventas.', 'Baja el capital invertido, sube el ROIC y mejora el EVA sin vender más.', 'Sube el margen bruto.', 'Reduce los impuestos.'], correcta: 1, justificacion: 'Menos capital atrapado = menor capital invertido = mayor ROIC y EVA, aun con las mismas ventas y margen. No actúa sobre ventas, margen ni impuestos.' },
  ],
  bibliografia: [
    'Koller, Goedhart & Wessels — *Valuation*',
    'Sagner, J. — *Working Capital Management*',
    'Silver, Pyke & Thomas — *Inventory and Production Management in Supply Chains*',
    'Chopra, S. & Meindl, P. — *Supply Chain Management*',
    'Documentación del Mercado Argentino de Valores (cheque de pago diferido, pagaré bursátil, FCE)',
  ],
}
