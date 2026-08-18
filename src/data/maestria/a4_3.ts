import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 4.3 — Estructura de Financiamiento, Riesgo de Iliquidez y Acceso
// al Capital de la Empresa Mediana
// ============================================================================
export const a4_3: Asignatura = {
  cod: '4.3',
  slug: 'a4-3',
  cuatrimestre: 4,
  fase: 'Prescriptiva · ¿Qué debemos hacer?',
  nombre: 'Estructura de Financiamiento, Riesgo de Iliquidez y Acceso al Capital de la Empresa Mediana',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativas: 2.2 y 4.2 · Cuarto cuatrimestre',
  framework: 'Damodaran · Koller/McKinsey · indicadores propios JPR',
  resumen:
    'La paradoja donde el sistema se quiebra aun siendo rentable: una empresa con EVA positivo puede tener FCFF negativo y quedarse sin caja. Estructura de financiamiento, capacidad de repago y días de autonomía bajo estrés.',
  objetivos: [
    'Comprender la paradoja crecimiento-liquidez: EVA positivo con FCFF negativo.',
    'Evaluar la capacidad de repago (DSCR) y el cumplimiento de covenants.',
    'Medir los días de autonomía financiera bajo estrés (DAF-E) y compararlos con el ciclo.',
    'Conocer el acceso al capital de la empresa mediana y la brecha de financiamiento real.',
  ],
  sections: [
    {
      title: 'La paradoja crecimiento-liquidez',
      intro: 'El punto donde el sistema puede quebrarse aun siendo rentable. Por eso ocupa el centro del mapa de valor, no un margen.',
      blocks: [
        { t: 'p', md: 'Una empresa puede tener **EVA positivo** (crea valor económico) y al mismo tiempo **FCFF negativo** (consume caja). ¿Cómo? Creciendo: el crecimiento exige invertir en capital de trabajo y en activo fijo antes de cobrar los frutos. La empresa es rentable y valiosa… y se queda sin caja. Es la causa número uno de muerte de empresas medianas rentables.' },
        { t: 'formula', name: 'Por qué crecer consume caja', expr: 'FCFF = NOPAT + Amortizaciones − ΔCapital de trabajo − CapEx', where: 'Al crecer, ΔCapital de trabajo y CapEx crecen y pueden superar al NOPAT', note: 'El EVA mira la creación de valor; el FCFF mira la caja. Una empresa puede crear valor y aun así ahogarse.' },
        { t: 'warn', md: 'La distinción vital: **solvencia no es liquidez**. La empresa solvente (patrimonio > deuda, buen Altman Z′′) puede morir por iliquidez si no puede pagar a tiempo. El diagnóstico de la 2.2 decía “solvente”; este módulo pregunta “¿pero tiene caja?”.' },
      ],
    },
    {
      title: 'Capacidad de repago y covenants',
      intro: 'Antes de tomar deuda, la pregunta del acreedor: ¿podés pagarla?',
      blocks: [
        { t: 'formula', name: 'Debt Service Coverage Ratio', expr: 'DSCR = EBITDA (o CFADS) ÷ Servicio de deuda', where: 'Servicio de deuda = intereses + amortización de capital del período', note: 'DSCR > 1 significa que la generación cubre el servicio. Los bancos suelen exigir un mínimo (p. ej. 1,25x) como covenant.' },
        { t: 'ul', items: [
          '**Covenants:** compromisos contractuales con el acreedor (DSCR mínimo, deuda/EBITDA máxima, patrimonio mínimo). Incumplirlos puede gatillar la exigibilidad anticipada de la deuda.',
          '**Headroom:** el margen entre el ratio real y el límite del covenant. Poco headroom es un riesgo latente.',
          'La estructura de capital óptima balancea el **escudo fiscal** de la deuda contra el **costo de las dificultades financieras** (la lógica del APV de la 4.1).',
        ] },
      ],
    },
    {
      title: 'DAF-E: días de autonomía financiera bajo estrés',
      intro: 'La única pregunta que mata empresas: ¿cuántos días aguanta la caja? Un indicador propio de JPR Consulting.',
      blocks: [
        { t: 'formula', name: 'DAF-E (indicador propio JPR)', expr: 'DAF-E = (Caja + líneas comprometidas + cobranzas ciertas) ÷ Egresos diarios comprometidos bajo estrés', note: 'Indicador de construcción propia, no del canon: se enseña declarando esa condición. Mide cuántos días de operación puede sostener la empresa si se corta el ingreso.' },
        { t: 'idea', md: '**La alerta de primer orden: un DAF-E menor que el CCE.** Si la empresa aguanta menos días de los que tarda en completar una vuelta de su propio ciclo de conversión de efectivo, se queda sin caja antes de recuperar lo invertido en la operación. Es una bomba de tiempo, aunque el EVA sea positivo.' },
        { t: 'p', md: 'El DAF-E impacta directamente en la **probabilidad de default** y, por esa vía, en el VP de dificultades financieras del APV (asignatura 4.1). Complementa a los modelos estructurales (Merton) con una lectura operativa y accionable.' },
      ],
    },
    {
      title: 'Acceso al capital y brecha de financiamiento real',
      intro: 'La empresa mediana paga de más por su deuda. Cuánto de más, y por qué, es cuantificable.',
      blocks: [
        { t: 'formula', name: 'BFR — Brecha de Financiamiento Real (JPR)', expr: 'BFR = CFT efectivo ponderado − Kd según calificación sintética', where: 'CFT = costo financiero total efectivo · BFR($) = BFR(pts) × Deuda financiera promedio', note: 'Cuánto paga la empresa POR ENCIMA de lo que sus fundamentos justifican. Es valor recuperable con SGR, mercado de capitales PyME o mejor información.' },
        { t: 'ul', items: [
          'Instrumentos de acceso: bancario tradicional, mercado de capitales PyME (obligaciones negociables, pagaré bursátil), sociedades de garantía recíproca (SGR), fondos, capital privado.',
          'La **BFR** cuantifica en pesos el valor de ordenarse: no es un dato inevitable del contexto, es recuperable.',
        ] },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Applied Corporate Finance', md: 'La estructura de capital óptima no es un dogma: es el punto donde el beneficio marginal del escudo fiscal iguala al costo marginal esperado de las dificultades financieras. Y ese punto depende de la volatilidad del negocio.' },
      ],
    },
  ],
  expertos: [
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'Muchas empresas confunden estar en ganancia con estar a salvo. La quiebra la determina la caja, no el estado de resultados: se puede quebrar ganando dinero.' },
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'El crecimiento rentable pero no financiado es una trampa clásica: la empresa crea valor en el papel y consume la caja que necesita para sobrevivir hasta cosecharlo.' },
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — indicadores para la empresa que no cotiza', md: 'El DAF-E y la BFR nacen de la práctica sobre empresas medianas de mercados emergentes: miden lo que la batería clásica, pensada para la empresa cotizante, no mide. Se enseñan con sus supuestos y límites a la vista.' },
  ],
  caso: {
    titulo: 'Rentable, valiosa… y sin caja',
    empresa: 'Maderas del Litoral S.A. — la paradoja en acción',
    contexto:
      'Maderas del Litoral crea valor (EVA positivo), es solvente (Altman Z′′ en zona segura) y quiere crecer. Todo indica éxito. Pero el consultor enciende la alarma que ninguna de esas métricas capta: la caja.\n\nCalcula el DSCR para ver si puede pagar la nueva deuda de la ampliación, y el DAF-E para ver cuántos días aguanta si se corta el ingreso. El resultado es contundente: el DAF-E (≈ 32 días) es menor que el CCE (≈ 52 días). La empresa se quedaría sin caja antes de completar una vuelta de su ciclo. Sumado a que la ampliación destruye valor (asignatura 4.2), la recomendación se vuelve nítida: primero ordenar la caja y el capital de trabajo, no crecer.\n\nEs la síntesis del programa: solvencia y liquidez son cosas distintas, y confundirlas mata empresas rentables.',
    datos: [
      { t: 'table', title: 'Datos de liquidez y repago (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['EBITDA', '5.250'],
        ['Servicio de deuda (interés + capital)', '3.150'],
        ['Caja', '600'],
        ['Líneas de crédito comprometidas', '800'],
        ['Cobranzas ciertas (próximas)', '1.500'],
        ['Egresos diarios comprometidos bajo estrés', '90'],
        ['CCE (asignatura 2.4)', '52 días'],
        ['DSCR mínimo del covenant', '1,25x'],
      ] },
    ],
    consigna: [
      '¿Cuál es el DSCR y cumple el covenant mínimo?',
      '¿Cuántos días de autonomía financiera bajo estrés (DAF-E) tiene la empresa?',
      '¿Por qué el DAF-E menor que el CCE es una alerta de primer orden?',
      '¿Cómo se combina esta conclusión con la de la asignatura 4.2 sobre la ampliación?',
    ],
    metodologia: [
      { k: 'Medir el repago', d: 'DSCR = EBITDA / servicio de deuda; comparar con el covenant.' },
      { k: 'Medir la autonomía', d: 'DAF-E = recursos líquidos / egresos diarios bajo estrés.' },
      { k: 'Comparar con el ciclo', d: 'DAF-E vs CCE: si DAF-E < CCE, alerta.' },
      { k: 'Estresar', d: 'Recalcular el DAF-E cortando cobranzas y líneas.' },
      { k: 'Recomendar', d: 'Priorizar liquidez y capital de trabajo antes que crecer.' },
    ],
  },
  model: {
    sheetTitle: 'Liquidez y repago: DSCR, DAF-E y estrés',
    intro:
      'Editá las celdas marfil. El modelo calcula el DSCR contra el covenant y el DAF-E, lo compara con el CCE, y la matriz dinámica recalcula el DAF-E bajo escenarios de estrés.',
    inputs: [
      { key: 'ebitda', label: 'EBITDA', value: 5250, fmt: 'money', unit: 'miles $' },
      { key: 'servicio', label: 'Servicio de deuda (interés + capital)', value: 3150, fmt: 'money' },
      { key: 'caja', label: 'Caja', value: 600, fmt: 'money' },
      { key: 'lineas', label: 'Líneas de crédito comprometidas', value: 800, fmt: 'money' },
      { key: 'cobranzas', label: 'Cobranzas ciertas (próximas)', value: 1500, fmt: 'money' },
      { key: 'egresosDia', label: 'Egresos diarios comprometidos (estrés)', value: 90, fmt: 'money' },
      { key: 'cce', label: 'CCE (días, asignatura 2.4)', value: 52, fmt: 'days' },
      { key: 'dscrMin', label: 'DSCR mínimo del covenant', value: 1.25, fmt: 'x' },
    ],
    calcs: [
      { key: 'dscr', label: 'DSCR (EBITDA / servicio)', xl: '=[ebitda]/[servicio]', fmt: 'x', highlight: true },
      { key: 'headroom', label: 'Headroom sobre el covenant', xl: '=[dscr]-[dscrMin]', fmt: 'x' },
      { key: 'recursos', label: 'Recursos líquidos totales', xl: '=[caja]+[lineas]+[cobranzas]', fmt: 'money' },
      { key: 'dafE', label: 'DAF-E (días de autonomía)', xl: '=[recursos]/[egresosDia]', fmt: 'days', highlight: true },
      { key: 'dafVsCce', label: 'DAF-E − CCE', xl: '=[dafE]-[cce]', fmt: 'days', highlight: true },
    ],
    spills: [
      {
        key: 'estres',
        title: 'DAF-E bajo escenarios de estrés',
        columns: ['Escenario', 'Recursos líquidos', 'Egresos diarios', 'DAF-E (días)'],
        xl: '=LET(esc,{"Base";"Cobranzas −30%";"Sin líneas de crédito";"Estrés combinado"}, rec,VSTACK([caja]+[lineas]+[cobranzas],[caja]+[lineas]+[cobranzas]*0.7,[caja]+[cobranzas],[caja]+[cobranzas]*0.7), egr,[egresosDia]*{1;1;1.1;1.2}, daf,rec/egr, HSTACK(esc,rec,egr,daf))',
        formats: [undefined, 'money', 'money', 'days'],
        rows: 4,
        note: 'Cada escenario recorta un recurso (cobranzas, líneas) y/o sube los egresos. Muestra qué tan rápido se agota la autonomía si el ingreso se interrumpe.',
      },
    ],
    conclusions: [
      { label: 'Repago', xl: '=IF([dscr]>=[dscrMin],"DSCR "&TEXT([dscr],"0.00")&"x cumple el covenant ("&TEXT([dscrMin],"0.00")&"x), headroom "&TEXT([headroom],"0.00")&"x.","DSCR "&TEXT([dscr],"0.00")&"x INCUMPLE el covenant ("&TEXT([dscrMin],"0.00")&"x): riesgo de exigibilidad anticipada.")' },
      { label: 'Liquidez', xl: '=IF([dafE]<[cce],"ALERTA: DAF-E ("&TEXT([dafE],"0")&" días) < CCE ("&TEXT([cce],"0")&" días). La empresa se quedaría sin caja antes de completar una vuelta de su ciclo, pese al EVA positivo. Solvente no es líquido.","DAF-E ("&TEXT([dafE],"0")&" días) supera al CCE ("&TEXT([cce],"0")&" días): autonomía suficiente para el ciclo.")' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'La paradoja crecimiento-liquidez es que una empresa puede tener:', opciones: ['EVA negativo y FCFF positivo.', 'EVA positivo (crea valor) y FCFF negativo (consume caja).', 'Ventas nulas.', 'Deuda cero.'], correcta: 1, justificacion: 'Al crecer, la inversión en capital de trabajo y CapEx puede superar al NOPAT: crea valor pero consume caja. Es la paradoja central de la 4.3.' },
    { id: 'q2', pregunta: 'Solvencia y liquidez son:', opciones: ['Lo mismo.', 'Cosas distintas: se puede ser solvente y morir por falta de caja.', 'Sinónimos contables.', 'Ambas medidas por el Altman.', ], correcta: 1, justificacion: 'La solvencia es patrimonio > deuda (Altman); la liquidez es tener caja para pagar a tiempo. Una empresa solvente puede quebrar por iliquidez.' },
    { id: 'q3', pregunta: 'El FCFF se reduce al crecer porque:', opciones: ['Baja el NOPAT.', 'Aumentan la inversión en capital de trabajo (ΔCT) y el CapEx.', 'Suben los impuestos.', 'Baja la amortización.'], correcta: 1, justificacion: 'FCFF = NOPAT + amort − ΔCT − CapEx; crecer dispara ΔCT y CapEx, que pueden superar al NOPAT y volver el FCFF negativo.' },
    { id: 'q4', pregunta: 'El DSCR se calcula como:', opciones: ['Deuda / patrimonio.', 'EBITDA (o CFADS) / servicio de deuda.', 'Ventas / activos.', 'NOPAT / WACC.'], correcta: 1, justificacion: 'El DSCR compara la generación (EBITDA/CFADS) con el servicio de deuda (interés + capital). Las otras son otros ratios.' },
    { id: 'q5', pregunta: 'Un covenant es:', opciones: ['Un impuesto.', 'Un compromiso contractual con el acreedor (p. ej. DSCR mínimo) cuyo incumplimiento puede gatillar exigibilidad anticipada.', 'Un tipo de acción.', 'Una tasa de interés.'], correcta: 1, justificacion: 'Los covenants son cláusulas del contrato de deuda; violarlos puede acelerar el vencimiento. No son impuestos, acciones ni tasas.' },
    { id: 'q6', pregunta: 'El “headroom” del covenant es:', opciones: ['La tasa de interés.', 'El margen entre el ratio real y el límite del covenant.', 'La deuda total.', 'El patrimonio.'], correcta: 1, justificacion: 'Headroom = distancia al límite; poco headroom implica riesgo de incumplir ante un mal trimestre. No es tasa, deuda ni patrimonio.' },
    { id: 'q7', pregunta: 'El DAF-E (indicador propio JPR) mide:', opciones: ['La rentabilidad.', 'Cuántos días de operación sostiene la caja bajo estrés.', 'El margen bruto.', 'El ROIC.'], correcta: 1, justificacion: 'DAF-E = recursos líquidos / egresos diarios bajo estrés: los días de autonomía si se corta el ingreso. No mide rentabilidad ni retorno.' },
    { id: 'q8', pregunta: 'La alerta de primer orden del DAF-E es:', opciones: ['DAF-E mayor que el ROIC.', 'DAF-E menor que el CCE (se queda sin caja antes de completar una vuelta del ciclo).', 'DAF-E igual a la deuda.', 'DAF-E mayor que 100.'], correcta: 1, justificacion: 'Si la autonomía (DAF-E) es menor que el ciclo (CCE), la empresa se queda sin caja antes de recuperar lo invertido en la operación: bomba de tiempo.' },
    { id: 'q9', pregunta: 'El DAF-E impacta la valuación (APV) a través de:', opciones: ['El escudo fiscal.', 'La probabilidad de default y el VP de dificultades financieras.', 'El crecimiento.', 'La tasa impositiva.'], correcta: 1, justificacion: 'Menor autonomía = mayor probabilidad de default = mayor VP de dificultades, que resta en el APV (4.1). No actúa por el escudo fiscal ni por g.' },
    { id: 'q10', pregunta: 'La BFR (Brecha de Financiamiento Real, JPR) mide:', opciones: ['La deuda total.', 'Cuánto paga la empresa por encima de lo que sus fundamentos justifican.', 'El EBITDA.', 'El plazo de cobro.'], correcta: 1, justificacion: 'BFR = costo financiero efectivo − Kd por calificación sintética: el sobrecosto recuperable con mejor información, SGR o mercado de capitales. No es la deuda ni el EBITDA.' },
    { id: 'q11', pregunta: 'La estructura de capital óptima (Damodaran) balancea:', opciones: ['Solo el escudo fiscal.', 'El escudo fiscal de la deuda contra el costo esperado de las dificultades financieras.', 'Solo las ventas.', 'El ROIC y el ROE.'], correcta: 1, justificacion: 'El óptimo iguala el beneficio marginal del escudo fiscal con el costo marginal esperado de la quiebra; depende de la volatilidad del negocio. No es solo el escudo.' },
    { id: 'q12', pregunta: 'Que la BFR sea recuperable significa que:', opciones: ['Es un costo inevitable del contexto.', 'Es valor que se puede recuperar ordenándose (SGR, mercado de capitales, mejor información).', 'No se puede medir.', 'Es un impuesto.'], correcta: 1, justificacion: 'El sobrecosto no es fatalidad: mejorando información y acceso se recupera. Se cuantifica en pesos para dimensionar el valor de ordenarse.' },
    { id: 'q13', pregunta: 'En el caso, con DAF-E ≈ 32 días y CCE ≈ 52 días, la empresa:', opciones: ['Tiene liquidez de sobra.', 'Está en alerta: se quedaría sin caja antes de completar su ciclo, pese al EVA positivo.', 'No tiene riesgo.', 'Debe crecer más rápido.'], correcta: 1, justificacion: 'DAF-E < CCE es la alerta de primer orden; el EVA positivo no la neutraliza. Crecer más agravaría el problema (4.2).' },
    { id: 'q14', pregunta: 'La síntesis del caso, combinando 4.2 y 4.3, es:', opciones: ['Crecer ya y financiar después.', 'Primero ordenar caja y capital de trabajo; la ampliación (RONIC < WACC) destruye valor y agrava la liquidez.', 'Tomar toda la deuda posible.', 'Distribuir todo el patrimonio.'], correcta: 1, justificacion: 'La ampliación destruye valor (4.2) y empeora la liquidez ya frágil (4.3): la recomendación es ordenar la caja y el ciclo antes que crecer.' },
    { id: 'q15', pregunta: 'La afirmación “se puede quebrar ganando dinero” significa que:', opciones: ['Es imposible.', 'La quiebra la determina la caja, no el estado de resultados.', 'El resultado neto es lo único que importa.', 'La rentabilidad garantiza la supervivencia.'], correcta: 1, justificacion: 'Una empresa rentable puede quedarse sin caja y quebrar; la liquidez, no la ganancia contable, determina la supervivencia inmediata.' },
    { id: 'q16', pregunta: 'Al crecer, lo que puede volver negativo el FCFF es:', opciones: ['La baja del NOPAT.', 'El aumento de la inversión en capital de trabajo (ΔCT) y en CapEx.', 'La baja de la amortización.', 'El escudo fiscal.'], correcta: 1, justificacion: 'Crecer dispara ΔCT y CapEx, que pueden superar al NOPAT y consumir caja pese a crear valor.' },
    { id: 'q17', pregunta: 'Un DSCR mínimo (covenant) típico de un banco podría ser:', opciones: ['0,5x.', '1,25x.', '0x.', 'Negativo.'], correcta: 1, justificacion: 'Los bancos suelen exigir DSCR ≥ 1,20–1,30x como covenant, para asegurar un colchón sobre el servicio de deuda.' },
    { id: 'q18', pregunta: 'Incumplir un covenant puede gatillar:', opciones: ['Un premio.', 'La exigibilidad anticipada de la deuda.', 'Una baja de tasa.', 'Nada.'], correcta: 1, justificacion: 'Violar un covenant puede acelerar el vencimiento (todo el saldo se vuelve exigible), un riesgo grave de liquidez.' },
    { id: 'q19', pregunta: 'El DAF-E se calcula como:', opciones: ['EBITDA / servicio de deuda.', 'Recursos líquidos ÷ egresos diarios comprometidos bajo estrés.', 'Deuda / patrimonio.', 'Ventas / activos.'], correcta: 1, justificacion: 'DAF-E = (caja + líneas + cobranzas ciertas) / egresos diarios bajo estrés: los días de autonomía. EBITDA/servicio es el DSCR.' },
    { id: 'q20', pregunta: 'Los “recursos líquidos” del DAF-E incluyen:', opciones: ['Solo la caja.', 'Caja + líneas de crédito comprometidas + cobranzas ciertas.', 'El patrimonio.', 'Los activos fijos.'], correcta: 1, justificacion: 'El DAF-E suma la liquidez disponible real: caja, líneas comprometidas y cobranzas ciertas próximas.' },
    { id: 'q21', pregunta: 'La estructura de capital óptima equilibra:', opciones: ['Ventas y costos.', 'El escudo fiscal de la deuda contra el costo esperado de las dificultades financieras.', 'Precio y volumen.', 'Activo y pasivo.'], correcta: 1, justificacion: 'El óptimo iguala el beneficio marginal del escudo con el costo marginal esperado de la quiebra; depende de la volatilidad del negocio.' },
    { id: 'q22', pregunta: 'A mayor deuda, en igualdad de condiciones:', opciones: ['Menor riesgo de default.', 'Mayor riesgo de default y de tensión de liquidez.', 'Igual riesgo.', 'Más caja.'], correcta: 1, justificacion: 'Más deuda aumenta el servicio y el riesgo de no poder pagar: más riesgo de default y de iliquidez. Por eso la autonomía (DAF-E) importa.' },
    { id: 'q23', pregunta: 'Estresar el DAF-E consiste en:', opciones: ['Aumentar las ventas.', 'Recalcularlo cortando cobranzas y líneas y/o subiendo egresos.', 'Bajar la deuda.', 'Ignorar la caja.'], correcta: 1, justificacion: 'El stress del DAF-E simula escenarios adversos (menos cobranzas, sin líneas, más egresos) para ver cuánto aguanta la caja.' },
    { id: 'q24', pregunta: 'La BFR en pesos se obtiene como:', opciones: ['BFR (pts) × Deuda financiera promedio.', 'BFR (pts) ÷ EBITDA.', 'BFR (pts) × Ventas.', 'BFR (pts) − impuestos.'], correcta: 0, justificacion: 'BFR($) = BFR en puntos × deuda financiera promedio: cuantifica en pesos el sobrecosto recuperable de ordenarse.' },
    { id: 'q25', pregunta: 'Entre los instrumentos de acceso al capital de la empresa mediana están:', opciones: ['Solo el descubierto bancario.', 'Obligaciones negociables, pagaré bursátil, SGR y mercado de capitales PyME.', 'Solo el factoring.', 'Ninguno.'], correcta: 1, justificacion: 'La empresa mediana puede acceder al mercado de capitales PyME (ON, pagaré bursátil), SGR y fondos, más allá del banco tradicional.' },
    { id: 'q26', pregunta: 'La deuda neta sobre EBITDA elevada indica:', opciones: ['Baja liquidez.', 'Alto apalancamiento (muchos años de generación para cancelar la deuda).', 'Alta rentabilidad.', 'Bajo riesgo.'], correcta: 1, justificacion: 'Un múltiplo alto de deuda neta/EBITDA señala fuerte apalancamiento y menor margen ante shocks. Es un covenant frecuente.' },
    { id: 'q27', pregunta: 'Un DSCR menor que 1 significa que:', opciones: ['Sobra caja.', 'La generación no alcanza a cubrir el servicio de deuda del período.', 'La empresa es muy solvente.', 'No hay deuda.'], correcta: 1, justificacion: 'DSCR < 1 implica que el EBITDA/CFADS no cubre intereses + capital: tensión de repago inmediata.' },
    { id: 'q28', pregunta: 'La autonomía financiera (DAF-E) se expresa en:', opciones: ['Porcentaje.', 'Días.', 'Pesos.', 'Veces (x).'], correcta: 1, justificacion: 'El DAF-E mide días de operación que la caja puede sostener bajo estrés; se compara con el CCE (también en días).' },
    { id: 'q29', pregunta: 'El crecimiento rentable pero no financiado es:', opciones: ['La estrategia ideal.', 'Una trampa clásica: crea valor en el papel y consume la caja necesaria para sobrevivir.', 'Imposible.', 'Sin riesgo.'], correcta: 1, justificacion: 'Crecer creando valor pero sin financiar el capital de trabajo/CapEx puede ahogar la caja: la paradoja en acción.' },
    { id: 'q30', pregunta: 'La paradoja crecimiento-liquidez ocupa el centro del mapa de valor porque:', opciones: ['Es la menos importante.', 'Es el punto donde el sistema puede quebrarse aun siendo rentable.', 'No se relaciona con nada.', 'Es solo teórica.'], correcta: 1, justificacion: 'Es donde una empresa rentable y solvente puede morir por iliquidez: por su gravedad ocupa el centro, no un margen.' },
  ],
  bibliografia: [
    'Damodaran, A. — *Applied Corporate Finance*',
    'Koller, Goedhart & Wessels — *Valuation*',
    'Altman, E. & Hotchkiss, E. — *Corporate Financial Distress and Bankruptcy*',
    'Tirole, J. — *The Theory of Corporate Finance*',
    'Documentación de SGR y del Mercado Argentino de Valores (financiamiento PyME)',
    'Rossi, J. P. — indicadores DAF-E y BFR (JPR Consulting)',
  ],
}
