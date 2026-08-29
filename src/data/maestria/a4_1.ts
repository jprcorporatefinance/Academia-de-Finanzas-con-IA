import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 4.1 — Valuación de Empresas de Capital Cerrado: Flujo de Fondos
// Descontado, APV y Descuentos de Iliquidez
// ============================================================================
export const a4_1: Asignatura = {
  cod: '4.1',
  slug: 'a4-1',
  cuatrimestre: 4,
  fase: 'Prescriptiva · ¿Qué debemos hacer?',
  nombre: 'Valuación de Empresas de Capital Cerrado: Flujo de Fondos Descontado, APV y Descuentos de Iliquidez',
  horas: '36 h · 16 teóricas / 20 prácticas',
  correlativas: 'Correlativas: 3.1 y 3.3 · Cuarto cuatrimestre',
  framework: 'Damodaran · Koller/McKinsey · Pratt',
  resumen:
    'Valuar una empresa que no cotiza separando el valor del horizonte del valor terminal, con DCF y APV, y aplicando los descuentos por falta de control y de liquidez que la empresa cerrada exige.',
  objetivos: [
    'Valuar por flujo de fondos descontado, separando valor del horizonte y valor terminal.',
    'Aplicar el Valor Presente Ajustado (APV) cuando la estructura de capital cambia.',
    'Aplicar los descuentos por falta de control (DLOC) y de liquidez (DLOM), jerárquicos y multiplicativos.',
    'Reconciliar la valuación puntual con la distribución de la simulación (asignatura 3.3).',
  ],
  sections: [
    {
      title: 'DCF: valor del horizonte y valor terminal',
      intro: 'El valor de una empresa es el valor presente de los flujos que generará. La dificultad está en que esos flujos son infinitos: por eso se parten en dos.',
      blocks: [
        { t: 'formula', name: 'Valor de la firma por DCF', expr: 'EV = Σ FCFF_t/(1+WACC)^t + VT/(1+WACC)^n', where: 'FCFF = flujo de fondos libre de la firma · VT = valor terminal · n = fin del horizonte explícito', note: 'El valor del horizonte (explícito) más el valor terminal descontado. El terminal suele ser la mayor parte del valor.' },
        { t: 'formula', name: 'Valor terminal (Gordon)', expr: 'VT = FCFF_{n+1} ÷ (WACC − g)', where: 'g = crecimiento perpetuo (nunca mayor que el crecimiento de la economía)', note: 'Sensible a g: un punto de más en g puede cambiar el valor drásticamente. Por eso g se justifica, no se elige.' },
        { t: 'warn', md: 'El **FCFF no es el flujo de caja contable** (asignatura 1.1): se construye desde el NOPAT sumando amortizaciones y restando la inversión en capital de trabajo y en activo fijo. Descontar un flujo contable creyendo que es el FCFF arruina la valuación.' },
      ],
    },
    {
      title: 'APV: cuando la estructura de capital cambia',
      intro: 'El WACC supone una estructura de capital constante. Cuando no lo es —una empresa que se desapalanca, una adquisición—, el APV es el método correcto.',
      blocks: [
        { t: 'formula', name: 'Valor Presente Ajustado', expr: 'APV = V_u + VP(escudo fiscal) − VP(dificultades financieras)', where: 'V_u = FCFF descontado al costo del capital SIN deuda (Ku)', note: 'Separa el valor del negocio (como si no tuviera deuda) del valor que agrega el escudo fiscal y del que resta el riesgo de quiebra. Es más transparente que esconder todo en el WACC.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Investment Valuation', md: 'El APV es honesto: muestra por separado cuánto vale el negocio, cuánto agrega la deuda por el escudo fiscal y cuánto resta por el riesgo de dificultades. El WACC esconde esos tres efectos en una sola tasa.' },
      ],
    },
    {
      title: 'Los descuentos de la empresa cerrada',
      intro: 'Una participación en una empresa que no cotiza vale menos que su parte proporcional del valor total. Dos descuentos lo capturan.',
      blocks: [
        { t: 'formula', name: 'Descuentos de capital cerrado', expr: 'Valor = V_100% × (1 − DLOC) × (1 − DLOM)', where: 'DLOC = descuento por falta de control · DLOM = descuento por falta de negociabilidad (liquidez)', note: 'Jerárquicos y MULTIPLICATIVOS: primero falta de control, después falta de liquidez. NUNCA aditivos.' },
        { t: 'ul', items: [
          '**DLOC (falta de control):** una participación minoritaria no decide dividendos, sueldos ni estrategia; por eso vale menos que una de control.',
          '**DLOM (falta de liquidez):** no hay mercado donde vender la participación rápido y sin castigo; esa iliquidez se descuenta.',
          'El **IDD** (Índice de Dependencia del Dueño, indicador propio JPR) agrava ambos: si la empresa no funciona sin su dueño, es aún menos transferible.',
        ] },
        { t: 'warn', md: 'Error frecuente y penalizado: **sumar** los descuentos (DLOC + DLOM) en vez de aplicarlos en cascada multiplicativa. Un 15 % y un 25 % no son un 40 %: son 1 − 0,85 × 0,75 = 36,25 %.' },
      ],
    },
    {
      title: 'Del número a la distribución',
      intro: 'La valuación puntual es una foto; la simulación (3.3) es la película. Se presentan juntas.',
      blocks: [
        { t: 'p', md: 'La valuación por DCF da un número; la simulación de Monte Carlo (asignatura 3.3) lo envuelve en una distribución. El informe al directorio no dice “la empresa vale X”: dice “la empresa vale X en el escenario base, con un rango de P5 a P95, y una probabilidad Y de estar por debajo del capital invertido”.' },
        { t: 'quote', author: 'Shannon Pratt', credential: 'Valuing a Business', md: 'La valuación de una empresa cerrada no es un cálculo, es un juicio informado por cálculos. Los descuentos por control y liquidez son donde más se juega ese juicio, y donde más hay que fundamentar.' },
        { t: 'chain', title: 'El puente al valor', nodes: ['FCFF proyectado', 'DCF: horizonte + terminal', 'Equity = EV − deuda neta', 'Valor de la participación (× DLOC × DLOM)'], caption: 'La valuación es el penúltimo eslabón: de acá surge cuánto vale hoy la empresa, y en la 4.2–4.3 cuánto valdría ejecutando el plan.' },
      ],
    },
    {
      title: 'La tiranía del valor terminal',
      intro: 'En una valuación típica, la mayor parte del valor está en el valor terminal —lo que pasa después del horizonte explícito—. Es donde se esconden los pecados de la valuación.',
      blocks: [
        { t: 'formula', name: 'Valor terminal (Gordon) y su peso', expr: 'VT = FCFF_{n+1} ÷ (WACC − g)', where: 'g nunca mayor que el crecimiento de largo plazo de la economía', note: 'El VT suele representar el 60–80 % del Enterprise Value: pequeños cambios en g o WACC lo mueven enormemente.' },
        { t: 'p', md: 'Dos disciplinas innegociables sobre el valor terminal. Primera: **g se justifica, no se elige** —una empresa no puede crecer para siempre más rápido que la economía, o terminaría siendo más grande que el mundo—. Segunda: en el año terminal, el **ROIC debe converger** hacia el costo del capital (o hacia un premio sostenible defendible); suponer que una empresa mantiene un ROIC extraordinario a perpetuidad ignora la competencia.' },
        { t: 'warn', md: 'El truco más común para inflar una valuación es un g terminal apenas más alto o un margen de largo plazo que nunca converge. Un punto de más en g puede cambiar el valor en un 20–30 %. Por eso el valor terminal siempre se acompaña de una **tabla de sensibilidad** de g × WACC: mostrar el rango es más honesto que fingir un número exacto.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Investment Valuation', md: 'El valor terminal es donde mueren las buenas valuaciones. Un crecimiento perpetuo demasiado alto, un margen que nunca converge, un ROIC extraordinario a perpetuidad: todos son formas de esconder optimismo dentro de un número que parece técnico.' },
      ],
    },
    {
      title: 'APV: cuando el WACC induce error',
      intro: 'El WACC supone una estructura de capital constante. Cuando no lo es, el Valor Presente Ajustado (APV) es el método correcto —y el más transparente—.',
      blocks: [
        { t: 'formula', name: 'Valor Presente Ajustado', expr: 'APV = V_u + VP(escudo fiscal) − VP(dificultades financieras)', where: 'V_u = FCFF descontado a Ku (costo del capital SIN deuda)', note: 'Separa el valor del negocio, el aporte del escudo fiscal y el costo del riesgo de quiebra en tres términos visibles.' },
        { t: 'p', md: 'La ventaja del APV es la **transparencia**: en vez de esconder tres efectos distintos (el negocio, el beneficio de la deuda y su riesgo) dentro de una sola tasa (el WACC), los muestra por separado. Es el método correcto cuando la estructura de capital **cambia en el tiempo** —una empresa que se desapalanca, una adquisición apalancada (LBO), un proyecto financiado con deuda que se repaga—.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'El APV es honesto: muestra por separado cuánto vale el negocio, cuánto agrega la deuda por el escudo fiscal y cuánto resta por el riesgo de dificultades. El WACC esconde esos tres efectos en una sola tasa, y cuando la estructura cambia, esa tasa miente.' },
      ],
    },
    {
      title: 'Los descuentos de la empresa cerrada, en detalle',
      intro: 'Una participación en una empresa que no cotiza vale menos que su parte proporcional del valor total. Dos descuentos jerárquicos y multiplicativos lo capturan.',
      blocks: [
        { t: 'formula', name: 'Descuentos de capital cerrado', expr: 'Valor = V_100% × (1 − DLOC) × (1 − DLOM)', where: 'DLOC = falta de control · DLOM = falta de negociabilidad (liquidez)', note: 'Jerárquicos y MULTIPLICATIVOS: primero falta de control, después falta de liquidez. NUNCA aditivos.' },
        { t: 'ul', items: [
          '**DLOC (falta de control):** una participación minoritaria no decide dividendos, sueldos ni estrategia; por eso vale menos que una de control. Los rangos típicos van del 10 % al 30 %, según cuánto poder efectivo tenga el minoritario.',
          '**DLOM (falta de liquidez):** no hay un mercado donde vender la participación rápido y sin castigo. Los estudios empíricos (restricted stock, pre-IPO) sitúan el DLOM entre el 20 % y el 35 %, mayor cuanto más ilíquida y dependiente del dueño sea la empresa.',
          '**El IDD como agravante:** un Índice de Dependencia del Dueño alto aumenta ambos descuentos —si la empresa no funciona sin su dueño, es aún menos transferible y menos negociable—.',
        ] },
        { t: 'warn', md: 'El error penalizado: **sumar** los descuentos (DLOC + DLOM) en vez de aplicarlos en cascada multiplicativa. Un 20 % y un 30 % no son un 50 %: son 1 − 0,80 × 0,70 = **44 %**. La cascada refleja que el segundo descuento se aplica sobre un valor ya reducido por el primero.' },
      ],
    },
    {
      title: 'La valuación es un juicio, no un cálculo',
      intro: 'La aritmética de la valuación es la parte fácil. Lo difícil —y lo que distingue al profesional— es el juicio sobre los supuestos.',
      blocks: [
        { t: 'p', md: 'Dos analistas con la misma planilla llegan a valores muy distintos según sus supuestos sobre crecimiento, márgenes de largo plazo, WACC y descuentos. La valuación de una empresa cerrada no produce un número, sino un **rango razonable** que el trabajo del valuador consiste en angostar con evidencia —y en fundamentar, sobre todo, en los descuentos por control e iliquidez, donde más se juega el juicio—.' },
        { t: 'chain', title: 'El puente completo al valor de la participación', nodes: ['FCFF proyectado', 'EV (horizonte + terminal)', 'Equity = EV − deuda neta', 'Participación × (1−DLOC) × (1−DLOM)'], caption: 'Cada eslabón agrega un supuesto que hay que defender. El valor de una participación minoritaria e ilíquida puede ser una fracción del valor proporcional del 100 %.' },
        { t: 'quote', author: 'Shannon Pratt', credential: 'Valuing a Business', md: 'La valuación de una empresa cerrada no es un cálculo, es un juicio informado por cálculos. Pretender una precisión de dos decimales sobre un negocio ilíquido y dependiente de su dueño es deshonestidad técnica: el rango honesto es amplio, y el trabajo es angostarlo con evidencia, no fingir que no existe.' },
      ],
    },
    {
      title: 'Del número a la distribución',
      intro: 'La valuación puntual es una foto; la simulación de Monte Carlo (asignatura 3.3) es la película. Al directorio se le presentan las dos.',
      blocks: [
        { t: 'p', md: 'El informe no dice "la empresa vale X". Dice "la empresa vale X en el escenario base, con un rango de P5 a P95, y una probabilidad Y de estar por debajo del capital invertido". Envolver el DCF en la distribución de Monte Carlo es lo que convierte una opinión con falsa precisión en un juicio honesto sobre la incertidumbre.' },
        { t: 'idea', md: 'La conexión con el Trabajo Final: la Fase Prescriptiva exige valuar por al menos dos métodos (DCF y APV, o DCF y múltiplos), separar el valor del horizonte del terminal, fundamentar los descuentos, y presentar el resultado como un rango con probabilidades. El "puente al valor" —cuánto vale hoy la empresa y cuánto valdría ejecutando el plan de creación de valor— es el corazón de la recomendación al directorio.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'Una valuación es un puente entre la historia que contás sobre una empresa y los números que esa historia implica. Si los números no se sostienen en una historia creíble, o la historia no se traduce en números, la valuación es un ejercicio vacío.' },
      ],
    },
    {
      title: 'Los tres flujos de la firma: FCFF, FCFE y FCFD',
      intro:
        'Una empresa genera un solo flujo económico, pero ese flujo se reparte entre quienes financiaron el negocio. Entender los tres flujos y su reconciliación es la base de toda valuación.',
      blocks: [
        { t: 'p', md: 'El negocio genera caja. Esa caja se reparte entre **acreedores** (que cobran intereses y capital) y **accionistas** (que cobran lo que queda). De ahí surgen tres flujos distintos, cada uno con su tasa de descuento y su destinatario. Confundirlos —descontar un flujo con la tasa de otro— es el error de valuación más frecuente y más caro.' },
        { t: 'table', title: 'Los tres flujos, sus destinatarios y sus tasas', headers: ['Flujo', 'Para quién', 'Se descuenta a', 'Da como resultado'], firstColLeft: true, rows: [
          ['FCFF (Free Cash Flow to the Firm)', 'Todos los proveedores de capital', 'WACC', 'Valor de la firma (EV)'],
          ['FCFE (Free Cash Flow to Equity)', 'Solo los accionistas', 'Ke', 'Valor del patrimonio'],
          ['FCFD (Free Cash Flow to Debt)', 'Solo los acreedores', 'Kd', 'Valor de la deuda'],
        ], caption: 'La regla innegociable: FCFF con WACC, FCFE con Ke. Descontar el FCFE al WACC (error frecuentísimo) sobrevalúa el patrimonio, porque el WACC ya incorpora el efecto de la deuda que el FCFE también descontó.' },
        { t: 'formula', name: 'FCFF — el flujo de la firma', expr: 'FCFF = NOPAT + Amortizaciones − Δ Capital de trabajo − CapEx', where: 'NOPAT = EBIT × (1 − t) · Es el flujo ANTES de atender a los acreedores', note: 'Se llama "libre" porque es lo que queda libre para repartir entre todos los proveedores de capital, después de invertir lo necesario para sostener y hacer crecer el negocio.' },
        { t: 'formula', name: 'FCFE — el flujo del accionista', expr: 'FCFE = FCFF − Intereses × (1 − t) + Nueva deuda neta', where: 'Nueva deuda neta = deuda tomada − deuda cancelada', note: 'Del flujo total se resta lo que se lleva el acreedor (después del escudo fiscal) y se suma lo que el acreedor aporta de nuevo. Lo que queda es del accionista.' },
        { t: 'formula', name: 'FCFD — el flujo del acreedor', expr: 'FCFD = Intereses × (1 − t) − Nueva deuda neta', where: 'Es el espejo exacto del término que se resta en el FCFE', note: 'Positivo cuando la empresa le está devolviendo caja neta al acreedor; negativo cuando el acreedor está aportando (la empresa se está endeudando más).' },
        { t: 'idea', md: '**La reconciliación algebraica obligatoria** del programa: **FCFF = FCFE + FCFD**. No es una coincidencia contable sino una identidad: todo lo que el negocio genera va a alguien. Si en un modelo esa igualdad no cierra, hay un error de construcción —típicamente un movimiento de deuda mal clasificado o un intereses mal tratado—. Es la mejor prueba de consistencia de un modelo de valuación.' },
        { t: 'chain', title: 'El reparto del flujo generado', nodes: ['El negocio genera FCFF', 'Acreedores cobran FCFD', 'Accionistas cobran FCFE', 'FCFF = FCFE + FCFD'], caption: 'Una sola torta, dos comensales. La identidad debe cerrar siempre.' },
        { t: 'warn', md: '**Dos caminos, un mismo destino.** Se puede llegar al valor del patrimonio de dos maneras: descontar el FCFF al WACC y restar la deuda neta, o descontar el FCFE al Ke directamente. **Bien hechos, ambos dan lo mismo.** Si no coinciden, hay una inconsistencia entre la estructura de capital supuesta en el WACC y la implícita en los movimientos de deuda del FCFE. En la práctica se prefiere la vía del FCFF porque es menos sensible a errores de modelado de la deuda.' },
        { t: 'p', md: 'Y la advertencia que atraviesa todo el programa: **ninguno de los tres es el flujo de caja contable del EFE** (asignatura 1.1). El Estado de Flujo de Efectivo es un estado histórico construido bajo normas contables; el FCFF es una magnitud económica y proyectada. El puente entre ambos —efectivo excedente, activos no operativos, intereses y su escudo, inversión de reposición frente a la de crecimiento— debe construirse explícitamente. Descontar un flujo contable creyendo que se descuenta uno económico arruina la valuación desde la raíz.' },
      ],
    },
  ],
  expertos: [
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'El valor terminal es donde se esconden los pecados de la valuación: un g demasiado alto o un margen que nunca converge inflan el valor. Disciplina en el terminal, siempre.' },
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'Valuá por flujos, no por múltiplos, cuando puedas. El múltiplo es un atajo que importa los errores del comparable; el DCF te obliga a explicitar tus supuestos.' },
    { author: 'Shannon Pratt', credential: 'Valuing a Business', md: 'En la empresa cerrada, el rango de valor razonable es amplio; el trabajo del valuador es angostarlo con evidencia y fundamentar cada descuento, no fingir una precisión que no existe.' },
  ],
  caso: {
    titulo: '¿Cuánto vale Maderas del Litoral?',
    empresa: 'Maderas del Litoral S.A. — la valuación integral',
    contexto:
      'Los hermanos reciben una oferta informal por el 30 % de la empresa y necesitan saber cuánto vale realmente, tanto el 100 % como una participación minoritaria.\n\nEl consultor proyecta el FCFF a cinco años, calcula el valor terminal con Gordon, descuenta todo al WACC (19,5 %, asignatura 3.1) y obtiene el valor de la firma. Le resta la deuda neta para llegar al patrimonio, y como la oferta es por una participación minoritaria e ilíquida, aplica los descuentos por falta de control y de liquidez en cascada multiplicativa.\n\nEl número final se presenta junto con la distribución de la simulación: no un valor, sino un rango con probabilidades.',
    datos: [
      { t: 'table', title: 'Datos de la valuación (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF año 1', '1.850'],
        ['FCFF año 2', '1.950'],
        ['FCFF año 3', '2.050'],
        ['FCFF año 4', '2.150'],
        ['FCFF año 5', '2.250'],
        ['WACC', '19,5%'],
        ['Crecimiento perpetuo (g)', '4,0%'],
        ['Deuda neta', '5.900'],
        ['DLOC (falta de control)', '15%'],
        ['DLOM (falta de liquidez)', '25%'],
      ] },
    ],
    consigna: [
      '¿Cuál es el valor de la firma (EV) separando horizonte y valor terminal?',
      '¿Cuál es el valor del patrimonio (equity) tras restar la deuda neta?',
      '¿Cuánto vale una participación minoritaria del 30 % aplicando DLOC y DLOM?',
      '¿Por qué los descuentos se aplican en cascada multiplicativa y no sumados?',
    ],
    metodologia: [
      { k: 'Proyectar y descontar', d: 'FCFF explícito a valor presente al WACC.' },
      { k: 'Valor terminal', d: 'VT = FCFF_{n+1}/(WACC−g); descontarlo al presente.' },
      { k: 'De EV a equity', d: 'Equity = EV − deuda neta.' },
      { k: 'Descuentos', d: 'Valor participación = equity × %part × (1−DLOC) × (1−DLOM).' },
      { k: 'Distribución', d: 'Presentar el rango de la simulación junto al valor puntual.' },
    ],
  },
  model: {
    sheetTitle: 'Valuación DCF + valor terminal + descuentos de iliquidez',
    intro:
      'Editá los FCFF y los parámetros (celdas marfil). La matriz dinámica descuenta el horizonte explícito; se añade el valor terminal, se pasa a patrimonio y se aplican los descuentos en cascada.',
    inputs: [
      { key: 'f1', label: 'FCFF año 1', value: 1850, fmt: 'money', unit: 'miles $' },
      { key: 'f2', label: 'FCFF año 2', value: 1950, fmt: 'money' },
      { key: 'f3', label: 'FCFF año 3', value: 2050, fmt: 'money' },
      { key: 'f4', label: 'FCFF año 4', value: 2150, fmt: 'money' },
      { key: 'f5', label: 'FCFF año 5', value: 2250, fmt: 'money' },
      { key: 'wacc', label: 'WACC', value: 0.195, fmt: 'pct1' },
      { key: 'g', label: 'Crecimiento perpetuo (g)', value: 0.04, fmt: 'pct1' },
      { key: 'deudaNeta', label: 'Deuda neta', value: 5900, fmt: 'money' },
      { key: 'part', label: 'Participación a valuar', value: 0.30, fmt: 'pct' },
      { key: 'dloc', label: 'DLOC (falta de control)', value: 0.15, fmt: 'pct' },
      { key: 'dlom', label: 'DLOM (falta de liquidez)', value: 0.25, fmt: 'pct' },
    ],
    calcs: [
      { key: 'pvHorizonte', label: 'Valor del horizonte (VP de los FCFF)', xl: '=LET(cf,VSTACK([f1],[f2],[f3],[f4],[f5]), t,SEQUENCE(5), SUM(cf/(1+[wacc])^t))', fmt: 'money' },
      { key: 'vt', label: 'Valor terminal (Gordon)', xl: '=[f5]*(1+[g])/([wacc]-[g])', fmt: 'money' },
      { key: 'pvVt', label: 'VP del valor terminal', xl: '=[vt]/(1+[wacc])^5', fmt: 'money' },
      { key: 'ev', label: 'Valor de la firma (EV)', xl: '=[pvHorizonte]+[pvVt]', fmt: 'money', highlight: true },
      { key: 'pesoTerminal', label: 'Peso del valor terminal en el EV', xl: '=[pvVt]/[ev]', fmt: 'pct1' },
      { key: 'equity', label: 'Valor del patrimonio (100%)', xl: '=[ev]-[deudaNeta]', fmt: 'money', highlight: true },
      { key: 'valPartControl', label: 'Valor de la participación (sin descuentos)', xl: '=[equity]*[part]', fmt: 'money' },
      { key: 'valPartMin', label: 'Valor de la participación minoritaria e ilíquida', xl: '=[equity]*[part]*(1-[dloc])*(1-[dlom])', fmt: 'money', highlight: true },
      { key: 'descTotal', label: 'Descuento total efectivo (cascada)', xl: '=1-(1-[dloc])*(1-[dlom])', fmt: 'pct1' },
    ],
    spills: [
      {
        key: 'flujo',
        title: 'Descuento del horizonte explícito',
        columns: ['Año', 'FCFF', 'Factor de descuento', 'Valor presente'],
        xl: '=LET(t,SEQUENCE(5), cf,VSTACK([f1],[f2],[f3],[f4],[f5]), fac,1/(1+[wacc])^t, HSTACK(t,cf,fac,cf*fac))',
        formats: ['num', 'money', 'coef', 'money'],
        rows: 5,
        note: 'SEQUENCE y VSTACK arman años y flujos; el factor y el VP se calculan de una vez. La suma de la última columna es el valor del horizonte.',
      },
    ],
    conclusions: [
      { label: 'Valor', xl: '="EV "&TEXT([ev],"#,##0")&" (de los cuales el "&TEXT([pesoTerminal],"0%")&" es valor terminal). Patrimonio 100%: "&TEXT([equity],"#,##0")&"."' },
      { label: 'Participación', xl: '="El "&TEXT([part],"0%")&" vale "&TEXT([valPartMin],"#,##0")&" tras un descuento efectivo del "&TEXT([descTotal],"0.0%")&" (DLOC y DLOM en cascada multiplicativa, no sumados)."' },
    ],
  },
  ejercicio: {
    titulo: 'Valuación DCF con valor terminal',
    enunciado: 'Valuá una empresa por flujo de fondos descontado con un horizonte explícito de tres años más valor terminal, y llegá al valor del patrimonio.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['FCFF año 1', '300'], ['FCFF año 2', '330'], ['FCFF año 3', '360'], ['WACC', '18%'], ['Crecimiento perpetuo (g)', '3%'], ['Deuda neta', '800'],
      ] },
    ],
    preguntas: ['¿Cuál es el valor del horizonte y el valor terminal?', '¿Cuál es el EV y el valor del patrimonio?'],
    solucion: [
      { t: 'formula', name: 'Valor del horizonte', expr: 'VP = 300/1,18 + 330/1,18² + 360/1,18³ = 254,2 + 237,0 + 219,1 = 710,3' },
      { t: 'formula', name: 'Valor terminal', expr: 'VT = 360×1,03/(0,18−0,03) = 370,8/0,15 = 2.472 · VP(VT) = 2.472/1,18³ = 1.504,6' },
      { t: 'formula', name: 'EV y equity', expr: 'EV = 710,3 + 1.504,6 = 2.214,9 · Equity = 2.214,9 − 800 = 1.414,9' },
      { t: 'idea', md: 'La empresa vale **≈ 2.215** (EV) y su patrimonio **≈ 1.415**. Notá que el **valor terminal (1.505) es el 68 % del EV**: por eso g y WACC son tan sensibles y hay que fundamentarlos.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El valor de una empresa por DCF se compone de:', opciones: ['Solo el valor terminal.', 'El valor del horizonte explícito más el valor terminal descontado.', 'Solo los flujos del primer año.', 'El patrimonio contable.'], correcta: 1, justificacion: 'EV = VP de los FCFF del horizonte + VP del valor terminal. No es solo el terminal, ni un año, ni el patrimonio contable.' },
    { id: 'q2', pregunta: 'El valor terminal por el modelo de Gordon es:', opciones: ['FCFF_{n+1} × (WACC − g).', 'FCFF_{n+1} ÷ (WACC − g).', 'FCFF_{n+1} × g.', 'FCFF_{n+1} ÷ WACC.'], correcta: 1, justificacion: 'VT = FCFF_{n+1}/(WACC−g), el valor de una perpetuidad creciente. Multiplicar o usar solo WACC da un valor incorrecto.' },
    { id: 'q3', pregunta: 'El crecimiento perpetuo g del valor terminal:', opciones: ['Puede ser cualquier número.', 'Nunca debe superar el crecimiento de largo plazo de la economía.', 'Debe ser igual al WACC.', 'Es siempre 10%.'], correcta: 1, justificacion: 'Una empresa no puede crecer para siempre más rápido que la economía (sería más grande que el mundo). g = WACC daría valor infinito; no hay un g universal.' },
    { id: 'q4', pregunta: 'El FCFF que se descuenta en el DCF:', opciones: ['Es el flujo de caja contable (EFE).', 'Se construye desde el NOPAT: + amortizaciones − inversión en capital de trabajo y activo fijo.', 'Es el resultado neto.', 'Es el EBITDA.'], correcta: 1, justificacion: 'El FCFF es un flujo económico derivado del NOPAT, distinto del EFE contable, del resultado neto y del EBITDA. Confundirlos arruina la valuación.' },
    { id: 'q5', pregunta: '¿Cuándo es preferible el APV al WACC?', opciones: ['Nunca.', 'Cuando la estructura de capital cambia (el WACC constante induce error).', 'Solo para empresas que cotizan.', 'Cuando no hay deuda.'], correcta: 1, justificacion: 'El WACC supone estructura constante; si cambia (desapalancamiento, LBO), el APV es más correcto y transparente. Sin deuda, ambos coinciden.' },
    { id: 'q6', pregunta: 'El APV descompone el valor en:', opciones: ['Un solo número.', 'Valor sin deuda (V_u) + VP del escudo fiscal − VP de dificultades financieras.', 'Solo el escudo fiscal.', 'Deuda + patrimonio.'], correcta: 1, justificacion: 'El APV separa el valor del negocio no apalancado, el aporte del escudo fiscal y el costo del riesgo de quiebra. Es más transparente que el WACC.' },
    { id: 'q7', pregunta: 'El DLOC (descuento por falta de control) refleja que:', opciones: ['La empresa no tiene control interno.', 'Una participación minoritaria no decide dividendos, sueldos ni estrategia.', 'No hay auditoría.', 'La empresa es pública.'], correcta: 1, justificacion: 'El DLOC castiga la ausencia de poder de decisión del minoritario. No se refiere al control interno ni a la auditoría, y aplica a empresas cerradas.' },
    { id: 'q8', pregunta: 'El DLOM (descuento por falta de liquidez) refleja que:', opciones: ['La empresa no tiene caja.', 'No hay un mercado para vender la participación rápido y sin castigo.', 'La empresa es ilíquida contablemente.', 'No paga dividendos.'], correcta: 1, justificacion: 'El DLOM castiga la imposibilidad de vender la participación con facilidad (no cotiza). No es falta de caja ni de dividendos.' },
    { id: 'q9', pregunta: 'Los descuentos DLOC y DLOM se aplican:', opciones: ['Sumados (DLOC + DLOM).', 'En cascada multiplicativa: (1−DLOC) × (1−DLOM).', 'Restando el mayor.', 'Promediados.'], correcta: 1, justificacion: 'Son jerárquicos y multiplicativos; sumarlos sobreestima el descuento. 15% y 25% dan 36,25%, no 40%.' },
    { id: 'q10', pregunta: 'Un DLOC de 15% y un DLOM de 25% producen un descuento efectivo de:', opciones: ['40%.', '36,25%.', '10%.', '20%.'], correcta: 1, justificacion: '1 − (0,85 × 0,75) = 1 − 0,6375 = 36,25%. La suma (40%) es el error típico.' },
    { id: 'q11', pregunta: 'En una valuación típica, el valor terminal suele representar:', opciones: ['Una parte menor del valor.', 'Con frecuencia la mayor parte del valor de la firma.', 'Exactamente la mitad.', 'Cero.'], correcta: 1, justificacion: 'El terminal suele ser la mayor porción del EV, por eso su g y sus supuestos son tan sensibles y hay que fundamentarlos.' },
    { id: 'q12', pregunta: 'El IDD (Índice de Dependencia del Dueño) impacta la valuación porque:', opciones: ['No tiene efecto.', 'Agrava los descuentos: si la empresa no funciona sin su dueño, es menos transferible.', 'Aumenta el valor.', 'Solo afecta el WACC.'], correcta: 1, justificacion: 'Un IDD alto hace la empresa menos transferible, agravando DLOC y DLOM (y el Ke). No aumenta el valor ni es neutro.' },
    { id: 'q13', pregunta: 'Del EV al valor del patrimonio (equity) se pasa:', opciones: ['Sumando la deuda.', 'Restando la deuda neta.', 'Multiplicando por el WACC.', 'Sin ajuste.'], correcta: 1, justificacion: 'Equity = EV − deuda neta: el valor que queda para los dueños tras los acreedores. Sumar deuda o no ajustar es incorrecto.' },
    { id: 'q14', pregunta: 'Frente a los múltiplos, el DCF tiene la ventaja de:', opciones: ['Ser más rápido.', 'Obligar a explicitar los supuestos, en vez de importar los del comparable.', 'No necesitar datos.', 'Dar siempre un valor mayor.'], correcta: 1, justificacion: 'El DCF hace transparentes los supuestos propios; el múltiplo importa (y esconde) los del comparable. No es más rápido ni sesga el valor al alza.' },
    { id: 'q15', pregunta: 'La valuación de una empresa cerrada debe presentarse como:', opciones: ['Un número exacto.', 'Un rango razonable con probabilidades, fundamentando los descuentos.', 'Solo el valor terminal.', 'El patrimonio contable.'], correcta: 1, justificacion: 'Pratt: es un juicio informado por cálculos; se presenta un rango fundamentado (con la distribución de la 3.3), no una falsa precisión.' },
    { id: 'q16', pregunta: 'El FCFF se construye, a partir del NOPAT, como:', opciones: ['NOPAT − amortizaciones.', 'NOPAT + amortizaciones − ΔCapital de trabajo − CapEx.', 'NOPAT + intereses.', 'NOPAT × WACC.'], correcta: 1, justificacion: 'FCFF = NOPAT + amortizaciones − inversión en capital de trabajo − CapEx: el flujo libre para todos los proveedores de capital.' },
    { id: 'q17', pregunta: 'En el APV, el valor sin deuda (V_u) se descuenta a:', opciones: ['El WACC.', 'Ku, el costo del capital sin apalancamiento.', 'El Kd.', 'La inflación.'], correcta: 1, justificacion: 'V_u descuenta el FCFF al costo del capital no apalancado (Ku); luego se suman el escudo y se restan las dificultades.' },
    { id: 'q18', pregunta: 'El valor presente del escudo fiscal, en el APV:', opciones: ['Se resta.', 'Se suma (la deuda deducible agrega valor).', 'No se considera.', 'Es siempre cero.'], correcta: 1, justificacion: 'El escudo fiscal de la deuda suma valor en el APV; el riesgo de dificultades financieras es lo que resta.' },
    { id: 'q19', pregunta: 'El valor presente de las dificultades financieras, en el APV:', opciones: ['Suma valor.', 'Resta valor (costo esperado de la quiebra).', 'No existe.', 'Es el escudo fiscal.'], correcta: 1, justificacion: 'El riesgo de quiebra tiene un costo esperado que resta en el APV, contrapesando el beneficio del escudo fiscal.' },
    { id: 'q20', pregunta: 'El descuento efectivo de un DLOC del 20% y un DLOM del 30% es:', opciones: ['50%.', '44%.', '10%.', '25%.'], correcta: 1, justificacion: '1 − (0,80 × 0,70) = 1 − 0,56 = 44%. Sumarlos (50%) es el error típico; son multiplicativos.' },
    { id: 'q21', pregunta: 'El valor de la firma (Enterprise Value) representa el valor para:', opciones: ['Solo los accionistas.', 'Todos los proveedores de capital (deuda y patrimonio).', 'Solo los acreedores.', 'El fisco.'], correcta: 1, justificacion: 'El EV es el valor del negocio para deuda + patrimonio; restándole la deuda neta se llega al valor del equity.' },
    { id: 'q22', pregunta: 'Valuar por múltiplos tiene el riesgo de:', opciones: ['Ser demasiado transparente.', 'Importar los errores y supuestos del comparable.', 'No necesitar datos.', 'Dar siempre menos valor.'], correcta: 1, justificacion: 'El múltiplo traslada (y esconde) los supuestos del comparable; el DCF obliga a explicitar los propios.' },
    { id: 'q23', pregunta: 'El valor terminal es muy sensible a:', opciones: ['El color del modelo.', 'La tasa de crecimiento perpetuo (g) y el WACC.', 'La cantidad de hojas.', 'El nombre de la empresa.'], correcta: 1, justificacion: 'Pequeños cambios en g o WACC mueven mucho el valor terminal (y por ende el EV); por eso se fundamentan con cuidado.' },
    { id: 'q24', pregunta: 'La deuda neta que se resta al EV es:', opciones: ['Deuda + caja.', 'Deuda financiera − caja y equivalentes.', 'Solo la caja.', 'El patrimonio.'], correcta: 1, justificacion: 'Deuda neta = deuda financiera − caja/equivalentes; es lo que se resta al EV para obtener el equity.' },
    { id: 'q25', pregunta: 'El horizonte explícito de la proyección debe extenderse hasta que:', opciones: ['El primer año.', 'La empresa alcance un estado estable (crecimiento y márgenes normalizados).', 'Nunca termine.', 'Se agote la caja.'], correcta: 1, justificacion: 'El horizonte explícito llega hasta el estado estable; de ahí en más se usa el valor terminal.' },
    { id: 'q26', pregunta: 'El APV es preferible al WACC cuando:', opciones: ['La estructura de capital es constante.', 'La estructura de capital cambia en el tiempo.', 'No hay deuda.', 'Siempre.'], correcta: 1, justificacion: 'El WACC supone estructura constante; si cambia (desapalancamiento, LBO), el APV es más correcto y transparente.' },
    { id: 'q27', pregunta: 'Un IDD (dependencia del dueño) alto, en la valuación:', opciones: ['Sube el valor.', 'Agrava los descuentos por control e iliquidez (menos transferible).', 'No influye.', 'Baja el WACC.'], correcta: 1, justificacion: 'Si la empresa depende del dueño, es menos transferible: aumentan DLOC y DLOM (y el Ke). No sube el valor.' },
    { id: 'q28', pregunta: 'En una valuación típica, el peso del valor terminal en el EV suele ser:', opciones: ['Cercano a cero.', 'La mayor parte del valor.', 'Exactamente 10%.', 'Negativo.'], correcta: 1, justificacion: 'El terminal suele dominar el EV, por eso sus supuestos (g, margen de largo plazo) son tan críticos.' },
    { id: 'q29', pregunta: 'La regla de que g no supere el crecimiento de la economía evita:', opciones: ['Un valor terminal chico.', 'Que la empresa termine siendo, en el infinito, más grande que la economía.', 'Que haya FCFF.', 'El escudo fiscal.'], correcta: 1, justificacion: 'Un g mayor al de la economía implicaría que la empresa la supera en tamaño en el largo plazo: imposible. Por eso g se acota.' },
    { id: 'q30', pregunta: 'Descontar el EFE contable como si fuera el FCFF:', opciones: ['Es correcto.', 'Es un error: hay que construir el puente entre ambos.', 'Da el mismo valor.', 'Solo aplica a empresas cotizantes.'], correcta: 1, justificacion: 'El EFE es histórico y contable; el FCFF es económico y proyectado. Confundirlos (sin el puente de la 1.1) arruina la valuación.' },
  ],
  bibliografia: [
    'Damodaran, A. — *Investment Valuation*',
    'Koller, Goedhart & Wessels — *Valuation*',
    'Pratt, S. — *Valuing a Business*',
    'Damodaran, A. — *The Dark Side of Valuation*',
    'Fernández, P. — *Valoración de Empresas*',
    'Pereiro, L. — *Valuation of Companies in Emerging Markets*',
  ],
}
