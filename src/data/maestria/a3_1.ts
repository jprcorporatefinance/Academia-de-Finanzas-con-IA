import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 3.1 — Costo del Capital en Mercados Emergentes y Empresas sin
// Cotización
// ============================================================================
export const a3_1: Asignatura = {
  cod: '3.1',
  slug: 'a3-1',
  cuatrimestre: 3,
  fase: 'Predictiva · ¿Qué es probable que ocurra?',
  nombre: 'Costo del Capital en Mercados Emergentes y Empresas sin Cotización',
  horas: '36 h · 16 teóricas / 20 prácticas',
  correlativas: 'Correlativas: 1.4 y 2.2 · Tercer cuatrimestre',
  framework: 'Damodaran · Pereiro · Koller/McKinsey',
  resumen:
    'Estimar el costo del capital de una empresa que no cotiza en un mercado emergente, con las correcciones que el CAPM clásico exige: Beta Total para el dueño no diversificado, y riesgo país sin doble conteo (Pereiro y lambda de Damodaran).',
  objetivos: [
    'Comprender el WACC como umbral de decisión y el error de usar una tasa única.',
    'Estimar el Ke con CAPM emergente, Beta Total y las correcciones de riesgo país.',
    'Construir el Kd desde una calificación sintética y su escudo fiscal.',
    'Integrar Ke y Kd en un WACC documentado, y distinguir el SPAM del costo del capital.',
  ],
  sections: [
    {
      title: 'El costo del capital como umbral',
      intro: 'El WACC no es un dato de mercado que se copia: es el rendimiento mínimo que la empresa debe superar para crear valor. Es el otro lado del spread.',
      blocks: [
        { t: 'formula', name: 'WACC', expr: 'WACC = Ke × E/V + Kd × (1 − t) × D/V', where: 'E = patrimonio · D = deuda · V = E + D · t = tasa impositiva (escudo fiscal)', note: 'El costo de la deuda entra después de impuestos porque el interés es deducible: ese es el escudo fiscal.' },
        { t: 'warn', md: 'Usar una **tasa única** para toda la empresa —o peor, la tasa de un banco— es uno de los errores más caros de la valuación. El WACC depende de la estructura de capital, del riesgo del negocio y del país, y cambia cuando cambia el apalancamiento.' },
      ],
    },
    {
      title: 'El CAPM y su fractura en mercados emergentes',
      intro: 'El modelo estándar del costo del capital propio funciona razonablemente en un mercado desarrollado y se rompe en uno emergente.',
      blocks: [
        { t: 'formula', name: 'CAPM clásico', expr: 'Ke = Rf + β × ERP', where: 'Rf = tasa libre de riesgo · β = riesgo sistemático · ERP = prima de riesgo de mercado', note: 'Supone un inversor diversificado en un mercado eficiente y líquido. Dos supuestos que la empresa familiar de un emergente no cumple.' },
        { t: 'ul', items: [
          'No hay un mercado local profundo del que extraer betas confiables.',
          'El **riesgo país** (soberano, cambiario, institucional) no está en el ERP maduro y hay que sumarlo — sin contarlo dos veces.',
          'El dueño de la empresa cerrada **no está diversificado**: soporta todo el riesgo, no solo el sistemático.',
        ] },
        { t: 'p', md: 'Se trabaja con Rf de un mercado maduro (bono del Tesoro de EE. UU.), un **ERP maduro** (≈ 4,2 % según los datos de Damodaran a 2026) y una **prima de riesgo país** para Argentina que a comienzos de 2026 ronda el **9,7 %**. Sobre esa base se aplican las correcciones.' },
      ],
    },
    {
      title: 'Beta Total: el dueño que no está diversificado',
      intro: 'La corrección de Damodaran para el inversor que tiene todos los huevos en una canasta.',
      blocks: [
        { t: 'formula', name: 'Beta apalancada y Beta Total', expr: 'β_L = β_U × [1 + (1 − t) × D/E]   ·   β_Total = β_L ÷ ρ', where: 'β_U = beta desapalancada del sector · ρ = correlación de la empresa con el mercado', note: 'La Beta Total (β/ρ) captura TODO el riesgo, no solo el sistemático. Es la medida correcta cuando el dueño no está diversificado —el caso normal de la empresa familiar—.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Valuation', md: 'Cuando el inversor no está diversificado, el beta de mercado subestima el riesgo que efectivamente soporta. La Beta Total corrige eso dividiendo por la correlación: el precio de tener todo el patrimonio en una sola empresa.' },
      ],
    },
    {
      title: 'Riesgo país sin doble conteo: Pereiro y lambda',
      intro: 'El error más común en emergentes es contar el riesgo país dos veces. Dos métodos rigurosos lo evitan.',
      blocks: [
        { t: 'formula', name: 'Corrección de Pereiro', expr: 'Ke = Rf + (1 − R²) × β × ERP + CRP', where: 'R² = bondad de ajuste de la regresión del riesgo local contra el global · CRP = prima de riesgo país', note: 'El factor (1 − R²) ESCALA el término β×ERP, no el riesgo país. Elimina la porción de riesgo país ya contenida en el término de mercado.' },
        { t: 'formula', name: 'Lambda de Damodaran', expr: 'Ke = Rf + β × ERP_maduro + λ × CRP', where: 'λ = exposición efectiva de la empresa al riesgo país', note: 'No toda empresa de un país riesgoso está igualmente expuesta: una exportadora con ingresos en dólares tiene λ menor que una que vende solo al mercado interno.' },
        { t: 'warn', md: '**Precisión terminológica exigida:** el *SPAM* de Pereiro es el *Stackable Premiums and Adjustments Model* —ajustes **multiplicativos** al valor del patrimonio por tamaño, control e iliquidez—. **NO es un modelo de costo del capital** ni la corrección contra el doble conteo del riesgo país. Confundirlos es motivo de desaprobación.' },
      ],
    },
    {
      title: 'Del Kd sintético al WACC',
      intro: 'El costo de la deuda se construye igual que en la asignatura 2.2, y se integra con el Ke en el WACC.',
      blocks: [
        { t: 'formula', name: 'Costo de la deuda', expr: 'Kd = Rf + default spread(rating sintético) · Kd después de impuestos = Kd × (1 − t)', note: 'El rating sintético sale de la cobertura de intereses (2.2); el escudo fiscal abarata la deuda.' },
        { t: 'p', md: 'Con las ponderaciones de mercado (E/V y D/V) se arma el WACC. Para Maderas del Litoral —dueño no diversificado, alto apalancamiento— el **Ke del dueño** (con Beta Total) es alto, pero el peso de la deuda barata después de impuestos modera el WACC. El resultado: un WACC apenas por debajo del ROIC, que explica por qué la empresa crea tan poco valor.' },
        { t: 'quote', author: 'Luis Pereiro', credential: 'Valuation of Companies in Emerging Markets', md: 'En los mercados emergentes, el analista que importa mecánicamente el instrumental de los mercados desarrollados comete errores sistemáticos. El ajuste no es opcional: es la diferencia entre una valuación defendible y un número inventado.' },
      ],
    },
    {
      title: 'Las escuelas del riesgo país: un debate abierto',
      intro: 'No hay un único método aceptado para incorporar el riesgo país. Conocer las tres escuelas principales permite elegir con criterio y defender la elección.',
      blocks: [
        { t: 'table', title: 'Tres enfoques para el riesgo país', headers: ['Enfoque', 'Cómo trata el CRP', 'Crítica'], firstColLeft: true, rows: [
          ['Prima país agregada (Damodaran base)', 'Suma el CRP completo al Ke', 'Puede sobreestimar: no toda empresa está igual de expuesta'],
          ['Lambda (Damodaran)', 'Pondera el CRP por la exposición (λ) de cada empresa', 'Requiere estimar λ, que no es trivial'],
          ['Pereiro (1 − R²)', 'Escala el término de mercado para evitar doble conteo', 'Depende de la calidad de la regresión (R²)'],
        ], caption: 'El programa enseña los tres y exige justificar el elegido. Para una exportadora con ingresos en dólares, la lambda baja tiene sentido; para una empresa 100 % volcada al mercado interno, la prima agregada se acerca más.' },
        { t: 'warn', md: 'El error de **doble conteo** es el más común y el más caro: parte del riesgo país ya está capturado en el término β×ERP (porque el ERP maduro y la beta reflejan algo del riesgo sistémico). Sumar el CRP completo sin la corrección de Pereiro o el ajuste de lambda infla el Ke y subvalúa la empresa. Es un error que puede cambiar una valuación en decenas de puntos porcentuales.' },
        { t: 'quote', author: 'Javier Estrada', credential: 'IESE — modelos de riesgo país', md: 'No existe el método perfecto para el costo del capital en emergentes; existen métodos defendibles y métodos arbitrarios. La diferencia está en documentar los supuestos y hacer sensibilidad, no en pretender una precisión que los datos no permiten.' },
      ],
    },
    {
      title: 'La Beta Total y el dueño concentrado',
      intro: 'La corrección de Beta Total es, quizás, la más importante para la empresa familiar —y la más ignorada en la práctica—.',
      blocks: [
        { t: 'p', md: 'El CAPM clásico supone un inversor **perfectamente diversificado**: solo le importa el riesgo sistemático (la beta de mercado), porque el resto lo diversifica en su cartera. Pero el dueño de una PyME familiar tiene **todo su patrimonio en una sola empresa**: soporta el riesgo total, no solo el sistemático.' },
        { t: 'formula', name: 'Beta Total (Damodaran)', expr: 'β_Total = β_L ÷ ρ', where: 'ρ = correlación de la empresa con el mercado (típicamente 0,4–0,7)', note: 'Como ρ < 1, la Beta Total es siempre mayor que la beta apalancada: es el precio de no estar diversificado.' },
        { t: 'idea', md: 'La consecuencia es profunda: el mismo negocio vale distinto según quién lo tenga. Para un fondo diversificado, el Ke relevante usa la beta de mercado; para el dueño familiar concentrado, usa la Beta Total (mucho mayor). Esta diferencia explica por qué un comprador estratégico o financiero puede pagar más que el valor "para el dueño actual": tiene un costo del capital menor porque diversifica. Es una de las razones por las que vender puede crear valor.' },
        { t: 'quote', author: 'Aswath Damodaran', credential: 'NYU Stern — Valuation', md: 'La Beta Total es la herramienta para valuar negocios privados donde el propietario no está diversificado. Ignorarla —usar la beta de mercado para un dueño concentrado— subestima sistemáticamente el costo del capital y sobrevalúa la empresa.' },
      ],
    },
    {
      title: 'Precisión terminológica: qué NO es el costo del capital',
      intro: 'La evaluación del programa exige rigor terminológico. Confundir conceptos cercanos es motivo de desaprobación, porque en la práctica lleva a errores de valuación.',
      blocks: [
        { t: 'warn', md: 'El **SPAM de Pereiro** (*Stackable Premiums and Adjustments Model*) es un modelo de **ajustes multiplicativos al valor del patrimonio** por tamaño, control e iliquidez —opera sobre el VALOR, no sobre la tasa—. **NO es un modelo de costo del capital** ni la corrección contra el doble conteo del riesgo país. Confundirlos es un error conceptual grave.' },
        { t: 'table', title: 'Conceptos que no hay que confundir', headers: ['Concepto', 'Qué es', 'Sobre qué opera'], firstColLeft: true, rows: [
          ['CAPM emergente', 'Modelo de costo del capital propio (Ke)', 'La tasa de descuento'],
          ['Corrección de Pereiro (1−R²)', 'Ajuste anti-doble-conteo del riesgo país', 'El Ke'],
          ['Lambda de Damodaran', 'Ponderación de la exposición al riesgo país', 'El Ke'],
          ['SPAM de Pereiro', 'Ajustes por tamaño/control/iliquidez', 'El VALOR del patrimonio (no la tasa)'],
          ['DLOC × DLOM', 'Descuentos de control e iliquidez', 'El VALOR (asignatura 4.1)'],
        ], caption: 'Los tres primeros ajustan la TASA; los dos últimos ajustan el VALOR. Mezclarlos —por ejemplo, aplicar un descuento de iliquidez subiendo el Ke y además bajando el valor— es contar dos veces el mismo efecto.' },
        { t: 'quote', author: 'Pablo Fernández', credential: 'IESE Business School', md: 'La mayoría de los errores de valuación no están en los modelos, sino en aplicarlos sin entender qué mide cada término. El rigor conceptual no es pedantería: es la diferencia entre un número defendible y uno inventado.' },
      ],
    },
    {
      title: 'El costo de la deuda sintético, en detalle',
      intro: 'Sin una calificadora, el costo de la deuda se construye. El método sintético lo deriva de la propia capacidad de repago de la empresa.',
      blocks: [
        { t: 'p', md: 'El punto de partida es la **cobertura de intereses** (EBIT/Intereses): a cada rango le corresponde una calificación equivalente (de AAA a D) y un **diferencial de incumplimiento** (default spread). Una empresa con cobertura de 3,35x se ubica en torno a BBB/BB, con un spread que se suma a la tasa libre de riesgo.' },
        { t: 'formula', name: 'Del rating al Kd después de impuestos', expr: 'Kd = Rf + spread(cobertura) · Kd d.imp. = Kd × (1 − t)', where: 'El escudo fiscal abarata la deuda porque el interés es deducible', note: 'Es el puente entre el diagnóstico de riesgo (asignatura 2.2) y el costo del capital.' },
        { t: 'warn', md: 'En Argentina, la brecha entre el Kd que los fundamentos justifican y el que la empresa efectivamente paga puede ser enorme —es la Brecha de Financiamiento Real (BFR) que se cuantifica en la asignatura 4.3—. El Kd sintético mide lo que "debería" costar la deuda; compararlo con lo que cuesta revela cuánto valor se pierde por falta de información, de garantías o de acceso al mercado de capitales.' },
      ],
    },
    {
      title: 'Armar el WACC y hacerle sensibilidad',
      intro: 'El WACC no es un número que se calcula una vez: es una estimación cargada de supuestos que hay que documentar y estresar.',
      blocks: [
        { t: 'formula', name: 'WACC', expr: 'WACC = Ke × E/V + Kd × (1 − t) × D/V', where: 'Ponderaciones a valor de mercado · E = patrimonio, D = deuda, V = E + D', note: 'Para la empresa cerrada con dueño no diversificado, el Ke relevante usa la Beta Total.' },
        { t: 'p', md: 'La estructura de capital óptima existe porque, hasta cierto punto, más deuda (barata después de impuestos) **baja** el WACC; pero pasado ese punto, el riesgo de dificultades financieras encarece tanto el Ke como el Kd y lo **revierte**. El WACC mínimo no está ni en cero deuda ni en máxima deuda, sino en el equilibrio que depende de la volatilidad del negocio.' },
        { t: 'quote', author: 'Pablo Fernández', credential: 'IESE Business School', md: 'Presentar un WACC sin análisis de sensibilidad es presentar una opinión disfrazada de cálculo. Mostrá cómo cambia el valor cuando movés cada supuesto clave —beta, prima de riesgo país, estructura— y el lector podrá calibrar tu conclusión en vez de tener que creerla.' },
      ],
    },
  ],
  expertos: [
    { author: 'Aswath Damodaran', credential: 'NYU Stern', md: 'La prima de riesgo país no se suma a ciegas: se pondera por la exposición real de la empresa (lambda). Y para el dueño no diversificado, el beta correcto es el total.' },
    { author: 'Luis Pereiro', credential: 'Universidad Torcuato Di Tella', md: 'El factor (1 − R²) corrige el doble conteo del riesgo país: parte de ese riesgo ya está en el término de mercado. Sumar el CRP completo sin corregir infla el costo del capital.' },
    { author: 'Pablo Fernández', credential: 'IESE Business School', md: 'El costo del capital está lleno de supuestos discutibles; por eso hay que documentarlo término por término y hacer sensibilidad. Un WACC sin sus supuestos a la vista es un acto de fe.' },
  ],
  caso: {
    titulo: 'El WACC de la empresa que no cotiza',
    empresa: 'Maderas del Litoral S.A. — el umbral de valor',
    contexto:
      'Toda la cadena del programa desemboca en una pregunta: ¿cuál es el costo del capital de Maderas del Litoral? Es el umbral contra el que se mide el ROIC (21,3 %) y la tasa a la que se descuentan los flujos en la valuación (asignatura 4.1).\n\nEl consultor no puede copiar un WACC de un libro: la empresa no cotiza, sus dueños no están diversificados y opera en un país de alto riesgo. Debe estimar el Ke con Beta Total, corregir el riesgo país sin contarlo dos veces (Pereiro y lambda), construir el Kd desde el rating sintético y ponderar todo en el WACC.\n\nEl resultado —WACC ≈ 19,5 %— apenas por debajo del ROIC, explica por qué la empresa crea tan poco valor y por qué crecer, con un RONIC aún menor, lo destruiría.',
    datos: [
      { t: 'table', title: 'Parámetros del costo del capital', headers: ['Parámetro', 'Valor'], firstColLeft: true, rows: [
        ['Tasa libre de riesgo (Rf, EE. UU.)', '4,5%'],
        ['ERP maduro', '5,5%'],
        ['Beta desapalancada del sector (β_U)', '0,85'],
        ['Relación deuda/patrimonio (D/E)', '1,23'],
        ['Tasa impositiva', '35%'],
        ['Correlación con el mercado (ρ)', '0,50'],
        ['R² (para Pereiro)', '0,40'],
        ['Prima de riesgo país (CRP)', '9,7%'],
        ['Lambda (exposición al riesgo país)', '1,0'],
        ['Default spread (rating sintético)', '11,0%'],
        ['Patrimonio (E)', '5.270'],
        ['Deuda (D)', '6.500'],
      ] },
    ],
    consigna: [
      '¿Cuál es la Beta apalancada y la Beta Total de la empresa?',
      '¿Cuánto da el Ke por CAPM emergente, por Beta Total y por la corrección de Pereiro?',
      '¿Cuál es el Kd después de impuestos y el WACC resultante?',
      '¿Por qué el WACC ≈ 19,5 % frente a un ROIC de 21,3 % anticipa que crecer podría destruir valor?',
    ],
    metodologia: [
      { k: 'Apalancar la beta', d: 'β_L = β_U × [1 + (1−t)·D/E]; β_Total = β_L / ρ.' },
      { k: 'Estimar el Ke', d: 'CAPM emergente, Beta Total (dueño no diversificado) y Pereiro (sin doble conteo).' },
      { k: 'Construir el Kd', d: 'Rf + default spread; aplicar el escudo fiscal.' },
      { k: 'Ponderar', d: 'WACC = Ke·E/V + Kd·(1−t)·D/V.' },
      { k: 'Interpretar', d: 'Comparar con el ROIC y anticipar el efecto del crecimiento (4.2).' },
    ],
  },
  model: {
    sheetTitle: 'Costo del capital (WACC) de una empresa cerrada en un emergente',
    intro:
      'Editá las celdas marfil. Se apalanca la beta, se calcula el Ke por tres métodos y se arma el WACC. La matriz dinámica compara los métodos de Ke lado a lado.',
    inputs: [
      { key: 'rf', label: 'Tasa libre de riesgo (Rf)', value: 0.045, fmt: 'pct1' },
      { key: 'erp', label: 'ERP maduro', value: 0.055, fmt: 'pct1' },
      { key: 'betaU', label: 'Beta desapalancada del sector', value: 0.85, fmt: 'num2' },
      { key: 'de', label: 'Deuda/Patrimonio (D/E)', value: 1.23, fmt: 'num2' },
      { key: 't', label: 'Tasa impositiva', value: 0.35, fmt: 'pct' },
      { key: 'rho', label: 'Correlación con el mercado (ρ)', value: 0.50, fmt: 'num2' },
      { key: 'r2', label: 'R² (para Pereiro)', value: 0.40, fmt: 'num2' },
      { key: 'crp', label: 'Prima de riesgo país (CRP)', value: 0.097, fmt: 'pct1' },
      { key: 'lambda', label: 'Lambda (exposición al riesgo país)', value: 1.0, fmt: 'num2' },
      { key: 'spreadKd', label: 'Default spread (rating sintético)', value: 0.11, fmt: 'pct1' },
      { key: 'E', label: 'Patrimonio (E)', value: 5270, fmt: 'money' },
      { key: 'D', label: 'Deuda (D)', value: 6500, fmt: 'money' },
    ],
    calcs: [
      { key: 'betaL', label: 'Beta apalancada (β_L)', xl: '=[betaU]*(1+(1-[t])*[de])', fmt: 'num2' },
      { key: 'betaTotal', label: 'Beta Total (β_L/ρ)', xl: '=[betaL]/[rho]', fmt: 'num2', highlight: true },
      { key: 'keCapm', label: 'Ke — CAPM emergente (β_L, lambda)', xl: '=[rf]+[betaL]*[erp]+[lambda]*[crp]', fmt: 'pct1' },
      { key: 'keOwner', label: 'Ke — dueño no diversificado (Beta Total)', xl: '=[rf]+[betaTotal]*[erp]+[lambda]*[crp]', fmt: 'pct1', highlight: true },
      { key: 'kePereiro', label: 'Ke — corrección de Pereiro (1−R²)', xl: '=[rf]+(1-[r2])*[betaTotal]*[erp]+[crp]', fmt: 'pct1' },
      { key: 'kd', label: 'Kd antes de impuestos', xl: '=[rf]+[spreadKd]', fmt: 'pct1' },
      { key: 'kdAT', label: 'Kd después de impuestos', xl: '=[kd]*(1-[t])', fmt: 'pct1' },
      { key: 'wE', label: 'Peso del patrimonio (E/V)', xl: '=[E]/([E]+[D])', fmt: 'pct1' },
      { key: 'wD', label: 'Peso de la deuda (D/V)', xl: '=[D]/([E]+[D])', fmt: 'pct1' },
      { key: 'wacc', label: 'WACC (con Ke del dueño)', xl: '=[wE]*[keOwner]+[wD]*[kdAT]', fmt: 'pct1', highlight: true },
      { key: 'spread', label: 'Spread vs ROIC (21,3%)', xl: '=0.213-[wacc]', fmt: 'pct1' },
    ],
    spills: [
      {
        key: 'keMetodos',
        title: 'Comparación de métodos de Ke',
        columns: ['Método', 'Ke', 'Comentario'],
        xl: '=LET(nom,{"CAPM emergente (β_L)";"Beta Total (no diversificado)";"Pereiro (1−R²)"}, ke,VSTACK([keCapm],[keOwner],[kePereiro]), com,{"Inversor diversificado";"Dueño familiar: TODO el riesgo";"Evita el doble conteo del riesgo país"}, HSTACK(nom,ke,com))',
        formats: [undefined, 'pct1', undefined],
        rows: 3,
        note: 'Los tres métodos conviven en el programa; para la empresa familiar cerrada, el Ke relevante es el de Beta Total (dueño no diversificado).',
      },
    ],
    conclusions: [
      { label: 'WACC', xl: '="WACC ≈ "&TEXT([wacc],"0.0%")&" (Ke dueño "&TEXT([keOwner],"0.0%")&", Kd después de impuestos "&TEXT([kdAT],"0.0%")&"). Ponderaciones: "&TEXT([wE],"0%")&" patrimonio, "&TEXT([wD],"0%")&" deuda."' },
      { label: 'Umbral de valor', xl: '=IF([spread]>0,"ROIC (21,3%) supera al WACC por "&TEXT([spread],"0.0%")&": crea valor, pero por un margen fino. Con un RONIC menor, crecer destruiría valor (4.2).","El WACC supera al ROIC: la empresa destruye valor al costo actual del capital.")' },
    ],
  },
  ejercicio: {
    titulo: 'WACC de una empresa cerrada',
    enunciado: 'Estimá el costo del capital de una empresa familiar que no cotiza, con dueño no diversificado, en un mercado emergente.',
    datos: [
      { t: 'table', title: 'Parámetros', headers: ['Parámetro', 'Valor'], firstColLeft: true, rows: [
        ['Rf', '5%'], ['ERP maduro', '5,5%'], ['Beta desapalancada (β_U)', '0,90'], ['D/E', '1,00'], ['Tasa impositiva', '35%'], ['Correlación (ρ)', '0,60'], ['CRP', '9%'], ['Lambda', '1,0'], ['Default spread (Kd)', '10%'], ['E y D', '4.000 y 4.000'],
      ] },
    ],
    preguntas: ['¿Cuál es la beta apalancada y la Beta Total?', '¿Cuál es el Ke del dueño y el WACC?'],
    solucion: [
      { t: 'formula', name: 'Betas', expr: 'β_L = 0,90×[1+(1−0,35)×1] = 0,90×1,65 = 1,485 · β_Total = 1,485/0,60 = 2,475' },
      { t: 'formula', name: 'Ke del dueño (Beta Total)', expr: 'Ke = 5% + 2,475×5,5% + 1,0×9% = 5 + 13,6 + 9 = 27,6%' },
      { t: 'formula', name: 'WACC', expr: 'Kd d.imp. = 15%×(1−0,35) = 9,75% · WACC = 0,5×27,6% + 0,5×9,75% = 18,7%' },
      { t: 'idea', md: 'El WACC ≈ **18,7 %**. El Ke del dueño no diversificado es alto (27,6 %), pero el peso de la deuda barata después de impuestos modera el WACC. Ese es el umbral contra el que se mide el ROIC.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'El WACC representa:', opciones: ['El costo de un préstamo bancario.', 'El rendimiento mínimo que la empresa debe superar para crear valor (umbral).', 'La rentabilidad histórica.', 'La tasa de inflación.'], correcta: 1, justificacion: 'El WACC es el costo promedio ponderado del capital: el umbral (hurdle rate) contra el que se mide el ROIC. No es la tasa de un banco, ni un dato histórico, ni la inflación.' },
    { id: 'q2', pregunta: 'En el WACC, el costo de la deuda entra:', opciones: ['Antes de impuestos.', 'Después de impuestos, porque el interés es deducible (escudo fiscal).', 'Multiplicado por la inflación.', 'Sin ponderar.'], correcta: 1, justificacion: 'Kd entra como Kd×(1−t): el interés deducible genera un escudo fiscal que abarata la deuda. Se pondera por D/V, no va sin ponderar.' },
    { id: 'q3', pregunta: '¿Por qué el CAPM clásico se “fractura” en mercados emergentes?', opciones: ['Porque la fórmula es incorrecta.', 'Porque no hay betas locales confiables, falta el riesgo país y el dueño no está diversificado.', 'Porque no existe la tasa libre de riesgo.', 'Porque los emergentes no tienen empresas.'], correcta: 1, justificacion: 'El CAPM supone mercado profundo, inversor diversificado y ERP que capta todo el riesgo; en emergentes fallan esos supuestos. La fórmula no es “incorrecta”, sino insuficiente sin correcciones.' },
    { id: 'q4', pregunta: 'La Beta Total (β/ρ) se usa cuando:', opciones: ['El inversor está perfectamente diversificado.', 'El dueño NO está diversificado (empresa familiar cerrada).', 'No hay deuda.', 'La empresa cotiza.'], correcta: 1, justificacion: 'La Beta Total captura todo el riesgo (no solo el sistemático), apropiada para el dueño concentrado. Para un inversor diversificado alcanza el beta de mercado.' },
    { id: 'q5', pregunta: 'La fórmula de la Beta apalancada es:', opciones: ['β_U × ρ.', 'β_U × [1 + (1 − t) × D/E].', 'β_U / (1 − t).', 'β_U + D/E.'], correcta: 1, justificacion: 'β_L = β_U × [1 + (1−t)·D/E] incorpora el efecto del apalancamiento y del escudo fiscal. Las otras expresiones no son la relación de Hamada.' },
    { id: 'q6', pregunta: 'En la corrección de Pereiro, el factor (1 − R²):', opciones: ['Escala el riesgo país (CRP).', 'Escala el término β × ERP, eliminando la parte del riesgo país ya contenida en él.', 'Multiplica la tasa libre de riesgo.', 'No tiene efecto.'], correcta: 1, justificacion: 'El (1−R²) reduce el término de mercado (β×ERP) para no contar dos veces el riesgo país; el CRP se suma aparte. No escala el CRP ni la Rf.' },
    { id: 'q7', pregunta: 'La lambda de Damodaran mide:', opciones: ['La tasa impositiva.', 'La exposición efectiva de la empresa al riesgo país.', 'La beta del sector.', 'La liquidez.'], correcta: 1, justificacion: 'λ pondera cuánto del riesgo país afecta realmente a la empresa (p. ej. una exportadora en dólares tiene λ menor). No es impuesto, beta ni liquidez.' },
    { id: 'q8', pregunta: 'El error de “doble conteo” del riesgo país consiste en:', opciones: ['Olvidar el riesgo país.', 'Sumar el CRP completo sin corregir la parte ya incluida en el término de mercado.', 'Usar Beta Total.', 'Descontar dos veces los flujos.'], correcta: 1, justificacion: 'Parte del riesgo país ya está en β×ERP; sumar el CRP entero sin corrección lo cuenta dos veces e infla el Ke. Por eso existen Pereiro y lambda.' },
    { id: 'q9', pregunta: 'El SPAM de Pereiro es:', opciones: ['Un modelo de costo del capital.', 'El Stackable Premiums and Adjustments Model: ajustes multiplicativos al valor del patrimonio por tamaño, control e iliquidez.', 'La corrección contra el doble conteo del riesgo país.', 'Una prima de mercado.'], correcta: 1, justificacion: 'El SPAM ajusta el VALOR del patrimonio (por tamaño, control, iliquidez), NO es un modelo de costo del capital ni la corrección de doble conteo. Confundirlo es motivo de desaprobación.' },
    { id: 'q10', pregunta: 'El Kd sintético se construye a partir de:', opciones: ['La beta.', 'La calificación sintética (cobertura de intereses) más un default spread sobre Rf.', 'El ROIC.', 'La inflación.'], correcta: 1, justificacion: 'Kd = Rf + default spread del rating sintético (derivado de la cobertura de intereses, asignatura 2.2). No sale de la beta, el ROIC ni la inflación.' },
    { id: 'q11', pregunta: 'Un WACC apenas por debajo del ROIC indica que la empresa:', opciones: ['Destruye mucho valor.', 'Crea valor, pero por un margen fino y frágil.', 'No tiene deuda.', 'Está quebrada.'], correcta: 1, justificacion: 'Spread pequeño positivo = creación de valor mínima y sensible a los supuestos. No implica destrucción, ausencia de deuda ni quiebra.' },
    { id: 'q12', pregunta: 'El WACC cambia cuando:', opciones: ['Nunca cambia.', 'Cambia la estructura de capital, el riesgo del negocio o el país.', 'Solo cambia la inflación.', 'Cambia el nombre de la empresa.'], correcta: 1, justificacion: 'El WACC depende de las ponderaciones deuda/capital, del riesgo operativo y del país; todos pueden variar. No es constante.' },
    { id: 'q13', pregunta: 'Usar una tasa única (p. ej. la de un banco) como costo del capital es:', opciones: ['Buena práctica.', 'Un error caro: ignora estructura, riesgo del negocio y país.', 'Obligatorio.', 'Lo que recomienda Damodaran.'], correcta: 1, justificacion: 'El costo del capital es específico de cada empresa y estructura; una tasa única es un atajo que distorsiona la valuación. No es recomendado por la doctrina.' },
    { id: 'q14', pregunta: 'Para una empresa exportadora con ingresos en dólares, la lambda tiende a ser:', opciones: ['Mayor que 1.', 'Menor (menos expuesta al riesgo país local).', 'Siempre exactamente 1.', 'Negativa.'], correcta: 1, justificacion: 'Al facturar en dólares, la empresa está menos expuesta al riesgo país local, por lo que λ es menor. No es fija en 1 ni negativa.' },
    { id: 'q15', pregunta: 'Según Pablo Fernández, un WACC bien hecho exige:', opciones: ['Copiarlo de un comparable.', 'Documentar cada término y hacer análisis de sensibilidad.', 'Un solo supuesto.', 'Ignorar los supuestos.'], correcta: 1, justificacion: 'El WACC está lleno de supuestos discutibles; documentarlos y hacer sensibilidad es lo que lo vuelve defendible. Copiar o esconder supuestos es lo contrario del rigor.' },
    { id: 'q16', pregunta: 'La tasa libre de riesgo (Rf) en el enfoque del programa se toma de:', opciones: ['Un plazo fijo local.', 'Un mercado maduro (p. ej. el bono del Tesoro de EE. UU.).', 'La inflación.', 'El WACC.'], correcta: 1, justificacion: 'Se usa la Rf de un mercado maduro y luego se agregan el ERP y el riesgo país. La Rf no es la inflación ni el WACC.' },
    { id: 'q17', pregunta: 'La relación de Hamada apalanca la beta según:', opciones: ['βL = βU × ρ.', 'βL = βU × [1 + (1 − t) × D/E].', 'βL = βU ÷ ERP.', 'βL = βU + CRP.'], correcta: 1, justificacion: 'βL = βU[1+(1−t)D/E] incorpora apalancamiento y escudo fiscal. Las otras no son la fórmula de Hamada.' },
    { id: 'q18', pregunta: 'En la Beta Total (βL/ρ), ρ representa:', opciones: ['La inflación.', 'La correlación de la empresa con el mercado.', 'La tasa impositiva.', 'El apalancamiento.'], correcta: 1, justificacion: 'ρ es la correlación con el mercado; dividir por ρ (< 1) eleva la beta para capturar TODO el riesgo del dueño no diversificado.' },
    { id: 'q19', pregunta: 'El Ke calculado con Beta Total (dueño no diversificado), respecto del Ke con beta de mercado, es:', opciones: ['Menor.', 'Mayor.', 'Igual.', 'Cero.'], correcta: 1, justificacion: 'Como βTotal = βL/ρ > βL, el Ke del dueño concentrado es mayor: refleja el precio de no estar diversificado.' },
    { id: 'q20', pregunta: 'Las ponderaciones del WACC (E/V y D/V) deben tomarse:', opciones: ['A valor contable.', 'A valor de mercado.', 'Al azar.', 'Iguales siempre.'], correcta: 1, justificacion: 'El WACC pondera con valores de mercado del patrimonio y la deuda, no con los contables, para reflejar la estructura real.' },
    { id: 'q21', pregunta: 'La prima de riesgo país (CRP) captura:', opciones: ['El riesgo del sector.', 'El riesgo soberano, cambiario e institucional del país.', 'El escudo fiscal.', 'La rotación de activos.'], correcta: 1, justificacion: 'El CRP mide el riesgo adicional de operar en ese país (soberano, moneda, instituciones). No es riesgo sectorial ni fiscal.' },
    { id: 'q22', pregunta: 'El Ke con el método lambda se expresa como:', opciones: ['Rf + CRP solamente.', 'Rf + β × ERP_maduro + λ × CRP.', 'Rf × β.', 'Rf − CRP.'], correcta: 1, justificacion: 'La lambda pondera la exposición efectiva al riesgo país: Ke = Rf + β·ERP_maduro + λ·CRP.' },
    { id: 'q23', pregunta: 'El default spread del rating sintético se combina con la Rf para obtener:', opciones: ['El Ke.', 'El Kd (costo de la deuda antes de impuestos).', 'El WACC directamente.', 'La beta.'], correcta: 1, justificacion: 'Kd = Rf + default spread; luego se aplica el escudo fiscal. No es el Ke ni el WACC directo.' },
    { id: 'q24', pregunta: 'Se usa la beta desapalancada de un sector porque:', opciones: ['La empresa cotiza.', 'Permite tomar el riesgo operativo del negocio de comparables y reapalancarlo a la estructura propia.', 'No hay betas.', 'Es más alta.'], correcta: 1, justificacion: 'La βU sectorial captura el riesgo del negocio sin financiamiento; se reapalanca con el D/E propio (Hamada). Es la vía cuando la empresa no cotiza.' },
    { id: 'q25', pregunta: 'El costo de la deuda (Kd) suele ser menor que el costo del capital propio (Ke) porque:', opciones: ['La deuda no tiene riesgo.', 'El acreedor tiene prelación de cobro y garantías, menor riesgo que el accionista.', 'El Ke es siempre cero.', 'La deuda no se paga.'], correcta: 1, justificacion: 'El acreedor cobra antes y con garantías, por lo que exige menos retorno que el accionista residual. Además el interés es deducible (escudo).' },
    { id: 'q26', pregunta: 'Un WACC mal estimado impacta directamente en:', opciones: ['El color del informe.', 'La valuación (tasa de descuento) y en la comparación con el ROIC.', 'La nómina.', 'El inventario.'], correcta: 1, justificacion: 'El WACC es la tasa de descuento de la valuación y el umbral del ROIC; un error se propaga a todo el valor.' },
    { id: 'q27', pregunta: 'Aumentar el apalancamiento con deuda barata, hasta cierto punto:', opciones: ['Siempre sube el WACC.', 'Puede bajar el WACC (más peso de la deuda tras escudo), hasta que el riesgo de dificultades lo revierte.', 'No afecta el WACC.', 'Elimina el Ke.'], correcta: 1, justificacion: 'Más deuda barata (después de impuestos) puede reducir el WACC, pero pasado un punto el riesgo de quiebra encarece Ke y Kd y lo revierte (estructura óptima).' },
    { id: 'q28', pregunta: 'El Ke representa:', opciones: ['El costo de la deuda.', 'El retorno exigido por los accionistas dado el riesgo.', 'La tasa impositiva.', 'El EVA.'], correcta: 1, justificacion: 'El Ke es el costo del capital propio: lo que los accionistas exigen por su riesgo. No es el Kd ni un impuesto.' },
    { id: 'q29', pregunta: 'Para que el spread ROIC − WACC tenga sentido, ambos deben expresarse:', opciones: ['En distinta moneda.', 'En los mismos términos (real/nominal, misma moneda).', 'Sin relación.', 'En dólares el ROIC y en pesos el WACC.'], correcta: 1, justificacion: 'Comparar un ROIC real con un WACC nominal (o distinta moneda) distorsiona el spread; deben ser consistentes.' },
    { id: 'q30', pregunta: 'La corrección de Pereiro con el factor (1 − R²) busca evitar:', opciones: ['Que la beta sea alta.', 'El doble conteo del riesgo país ya contenido en el término de mercado.', 'Que exista Ke.', 'El escudo fiscal.'], correcta: 1, justificacion: 'El (1 − R²) reduce β×ERP para no sumar dos veces el riesgo país; el CRP se agrega aparte. No tiene que ver con el escudo.' },
  ],
  bibliografia: [
    'Damodaran, A. — *Investment Valuation* y datos de riesgo país (2026)',
    'Pereiro, L. — *Valuation of Companies in Emerging Markets*',
    'Koller, Goedhart & Wessels — *Valuation*',
    'Fernández, P. — trabajos sobre WACC, betas y prima de riesgo de mercado (IESE)',
    'Damodaran, A. — *The Dark Side of Valuation*',
    'López Dumrauf, G. — *Finanzas Corporativas: un enfoque latinoamericano*',
  ],
}
