import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 2.1 — Diagnóstico Económico, Financiero y Patrimonial Integral
// ============================================================================
export const a2_1: Asignatura = {
  cod: '2.1',
  slug: 'a2-1',
  cuatrimestre: 2,
  fase: 'Diagnóstica · ¿Por qué sucedió?',
  nombre: 'Diagnóstico Económico, Financiero y Patrimonial Integral',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativas: 1.1 y 1.4 · Segundo cuatrimestre',
  framework: 'DuPont · Koller/McKinsey · Higgins · López Dumrauf',
  resumen:
    'Ejecutar el diagnóstico completo en sus tres dimensiones —económica, financiera y patrimonial— y producir un memorándum de nivel directorio. Descomponer la rentabilidad en sus cinco generadores y medir el riesgo estructural.',
  objetivos: [
    'Ejecutar el diagnóstico completo en sus tres dimensiones y producir un memorándum ejecutivo.',
    'Descomponer la rentabilidad del patrimonio en sus cinco generadores y atribuir su variación.',
    'Medir el riesgo estructural mediante apalancamientos y puntos de equilibrio.',
    'Construir el mapa de interrelaciones que conecta cada hallazgo con el valor.',
  ],
  sections: [
    {
      title: 'Márgenes en cascada',
      intro: 'La primera lectura del resultado: cada margen cuenta una parte distinta de la historia.',
      blocks: [
        { t: 'p', md: 'Los márgenes —**bruto, EBITDA, operativo y neto**— se leen en tres registros: en valor absoluto, en porcentaje de ventas y en **variación interanual en puntos porcentuales**. La descomposición de la variación de ventas en **precio, volumen y mezcla** es lo que separa un diagnóstico de una descripción.' },
        { t: 'idea', md: 'Un margen que cae puede hacerlo por precio (perdiste poder de fijación), por volumen (perdiste mercado) o por mezcla (vendés más de lo que menos deja). Cada causa exige una acción distinta. El diagnóstico sin descomposición es una anécdota.' },
      ],
    },
    {
      title: 'DuPont de cinco factores',
      intro: 'La descomposición del ROE en sus cinco generadores, incluido el efecto de los intereses que la versión de tres factores oculta.',
      blocks: [
        { t: 'formula', name: 'DuPont de cinco factores', expr: 'ROE = (NI÷EBT) × (EBT÷EBIT) × (EBIT÷Ventas) × (Ventas÷Activos) × (Activos÷PN)', where: 'carga fiscal · carga financiera · margen operativo · rotación de activos · multiplicador financiero', note: 'La versión de tres factores esconde el efecto de los intereses. La de cinco lo aísla en la “carga financiera” (EBT÷EBIT).' },
        { t: 'table', title: 'Qué mide cada factor', headers: ['Factor', 'Mide', 'Palanca'], firstColLeft: true, rows: [
          ['Carga fiscal (NI/EBT)', 'Cuánto queda tras impuestos', 'Planificación fiscal'],
          ['Carga financiera (EBT/EBIT)', 'Cuánto se lleva el interés', 'Estructura de deuda'],
          ['Margen operativo (EBIT/Ventas)', 'Eficiencia de la operación', 'Precios y costos'],
          ['Rotación (Ventas/Activos)', 'Intensidad de uso del activo', 'Capital de trabajo y activo fijo'],
          ['Multiplicador (Activos/PN)', 'Apalancamiento patrimonial', 'Mezcla deuda/capital'],
        ] },
        { t: 'p', md: 'La clave del método es **atribuir la variación** del ROE a cada factor: no basta decir que el ROE cayó, hay que decir *por cuál de los cinco* y cuánto. Esa atribución es el corazón del árbol de causas del Seminario Integrador II.' },
      ],
    },
    {
      title: 'Apalancamientos: GAO, GAF y GAT',
      intro: 'El riesgo estructural del negocio y de su financiamiento, medido por cómo se amplifican las variaciones.',
      blocks: [
        { t: 'formula', name: 'Grados de apalancamiento', expr: 'GAO = MC ÷ EBIT   ·   GAF = EBIT ÷ EBT   ·   GAT = GAO × GAF', where: 'MC = margen de contribución · GAO ≈ Δ%EBIT/Δ%Ventas · GAF ≈ Δ%EBT/Δ%EBIT', note: 'El GAO mide el riesgo operativo (estructura de costos fijos); el GAF, el riesgo financiero (deuda). El GAT los combina.' },
        { t: 'warn', md: 'Un GAO alto (mucho costo fijo) y un GAF alto (mucha deuda) juntos son un cóctel peligroso: una caída moderada de ventas se amplifica dos veces y puede llevar el resultado a terreno negativo. **El apalancamiento operativo condiciona cuánto financiero se puede tolerar.**' },
      ],
    },
    {
      title: 'Puntos de equilibrio',
      intro: 'Cuánto hay que vender para no perder, y cuánto para cumplir con todas las obligaciones.',
      blocks: [
        { t: 'formula', name: 'Punto de equilibrio económico', expr: 'PE = Costos fijos ÷ (1 − Costos variables ÷ Ventas) = CF ÷ MC%', note: 'El nivel de ventas al que el EBIT es cero.' },
        { t: 'ul', items: [
          '**Punto de equilibrio financiero:** ajusta el económico por partidas **no erogables** (depreciaciones, RECPAM, AXI). Es menor: se puede estar en pérdida contable y aún generar caja.',
          '**Nivel de ventas para cubrir todo el período:** además de los costos, incluye el servicio de deuda, las inversiones comprometidas y las distribuciones previstas. Es el umbral que de verdad importa para la caja.',
        ] },
      ],
    },
    {
      title: 'El mapa de interrelaciones y el memorándum',
      intro: 'Cómo cada hallazgo se conecta con el valor, y cómo se comunica al directorio.',
      blocks: [
        { t: 'chain', title: 'Cómo el diagnóstico llega al valor', nodes: ['CCE ↑', 'Capital invertido ↑', 'ROIC ↓', 'EVA ↓'], caption: 'El ciclo de conversión de efectivo impacta el capital invertido y, por esa vía, el ROIC y el EVA. Todo hallazgo diagnóstico se traduce a valor.' },
        { t: 'p', md: 'Existen dos patologías espejo que el mapa revela: **la empresa solvente que destruye valor** (rentable en libros pero con ROIC < WACC) y **la empresa rentable que quiebra por iliquidez** (gana pero se queda sin caja). El diagnóstico debe distinguirlas.' },
        { t: 'steps', title: 'El memorándum ejecutivo', items: [
          { k: 'Diagnóstico central', d: 'La conclusión en una frase, primero (principio de la pirámide).' },
          { k: 'Contexto y normalización', d: 'Qué se ajustó y por qué.' },
          { k: 'Análisis por dimensión', d: 'Económica, financiera y patrimonial, con hallazgos cuantificados.' },
          { k: 'Benchmarking y cursos de acción', d: 'Comparación sectorial y acciones priorizadas por impacto sobre el valor.' },
          { k: 'Anexo metodológico', d: 'Fórmulas, supuestos y fuentes, auditable por un tercero.' },
        ] },
        { t: 'quote', author: 'Robert Higgins', credential: 'Analysis for Financial Management', md: 'El análisis financiero no consiste en calcular ratios, sino en usarlos para responder preguntas de negocio. Un ratio sin una pregunta detrás es aritmética, no diagnóstico.' },
      ],
    },
    {
      title: 'Atribución de la variación del ROE, paso a paso',
      intro: 'El poder del DuPont no está en calcular el ROE, sino en explicar por qué cambió. La atribución convierte una descripción en un diagnóstico accionable.',
      blocks: [
        { t: 'p', md: 'Cuando el ROE cae de un año a otro, la pregunta correcta no es "¿cuánto cayó?" sino "¿por cuál de los cinco factores?". La atribución aísla el efecto de cada uno manteniendo los demás constantes, y así identifica dónde está el problema —y por lo tanto, dónde está la palanca de mejora—.' },
        { t: 'steps', title: 'El procedimiento de atribución', items: [
          { k: 'Calcular los cinco factores en ambos períodos', d: 'Carga fiscal, carga financiera, margen operativo, rotación y multiplicador, para el año base y el actual.' },
          { k: 'Aislar cada efecto', d: 'Recalcular el ROE cambiando un solo factor por vez, dejando los otros en su valor base.' },
          { k: 'Cuantificar la contribución', d: 'La diferencia que genera cada cambio individual es la contribución de ese factor a la variación total del ROE.' },
          { k: 'Priorizar', d: 'El factor con mayor contribución negativa es el foco del diagnóstico y de la recomendación.' },
        ] },
        { t: 'idea', md: 'Un caso típico: el ROE se mantuvo estable, pero la atribución revela que el margen operativo se deterioró y fue compensado por más apalancamiento. El número global "no cambió", pero la empresa se volvió más frágil. Sin la atribución, ese deterioro pasa inadvertido hasta que es tarde.' },
      ],
    },
    {
      title: 'Apalancamientos y equilibrios: el mapa del riesgo estructural',
      intro: 'Los grados de apalancamiento y los puntos de equilibrio miden, juntos, cuán expuesta está la empresa a una caída de ventas.',
      blocks: [
        { t: 'formula', name: 'La cadena del apalancamiento', expr: 'GAO = MC/EBIT · GAF = EBIT/EBT · GAT = GAO × GAF', where: 'GAO ≈ Δ%EBIT/Δ%Ventas · GAF ≈ Δ%EBT/Δ%EBIT', note: 'El GAT indica cuánto se amplifica una variación de ventas hasta llegar al resultado antes de impuestos.' },
        { t: 'p', md: 'Un **GAT de 6x** significa que una caída del 10 % en ventas se transforma en una caída del 60 % en el resultado. Esa amplificación es el corazón del riesgo estructural: combina el riesgo operativo (costos fijos, GAO) con el financiero (deuda, GAF). Una empresa con ambos altos es rentable en el buen escenario y frágil en el malo.' },
        { t: 'table', title: 'Los tres umbrales de ventas', headers: ['Umbral', 'Qué cubre', 'Fórmula'], firstColLeft: true, rows: [
          ['Equilibrio económico', 'Los costos (EBIT = 0)', 'CF / MC%'],
          ['Equilibrio financiero', 'Costos erogables (ajusta no erogables)', 'CF erogable / MC%'],
          ['Cobertura total del período', 'Costos + servicio deuda + inversiones + dividendos', 'Todo lo comprometido / MC%'],
        ], caption: 'El margen de seguridad —cuánto pueden caer las ventas antes de tocar el equilibrio— es el colchón real de la empresa. Un margen chico con un GAT alto es una combinación peligrosa.' },
        { t: 'quote', author: 'Guillermo López Dumrauf', credential: 'Finanzas Corporativas: un enfoque latinoamericano', md: 'En contextos volátiles, el apalancamiento que parece prudente en el promedio puede ser letal en el peor trimestre. El análisis de equilibrios y apalancamientos es, en el fondo, un análisis de resistencia al shock.' },
      ],
    },
    {
      title: 'El memorándum al directorio: comunicar para decidir',
      intro: 'Un diagnóstico brillante mal comunicado no cambia ninguna decisión. La forma del memorándum es tan importante como su contenido.',
      blocks: [
        { t: 'p', md: 'El memorándum ejecutivo sigue el **principio de la pirámide** (Minto): la conclusión va **primero**, seguida de los argumentos agrupados lógicamente y sostenidos por la evidencia. El directorio no quiere un relato cronológico de cómo se llegó a la conclusión; quiere la conclusión y, si la cuestiona, poder descender al detalle.' },
        { t: 'chain', title: 'La estructura del memorándum', nodes: ['Diagnóstico central (1 frase)', 'Hallazgos cuantificados', 'Cursos de acción priorizados', 'Anexo metodológico auditable'], caption: 'De lo más importante a lo más detallado: cada nivel sostiene al anterior.' },
        { t: 'idea', md: 'La regla del "y entonces qué": cada hallazgo debe conectar con una consecuencia y una acción. "El CCE aumentó 12 días" no es un hallazgo útil; "el CCE aumentó 12 días, inmovilizando 4.500 de capital que redujo el ROIC en 1,2 pp, recuperables ajustando la política de cobranzas" sí lo es. El diagnóstico termina en el valor y en la decisión, no en el ratio.' },
      ],
    },
    {
      title: 'Las tres dimensiones del diagnóstico',
      intro: 'Un diagnóstico completo mira la empresa desde tres ángulos que solo tienen sentido juntos: el económico, el financiero y el patrimonial.',
      blocks: [
        { t: 'table', title: 'Qué pregunta cada dimensión', headers: ['Dimensión', 'Pregunta', 'Herramientas'], firstColLeft: true, rows: [
          ['Económica', '¿Genera resultado la operación?', 'Márgenes, DuPont, apalancamientos'],
          ['Financiera', '¿Tiene caja para operar y pagar?', 'Liquidez, flujos, cobertura de intereses'],
          ['Patrimonial', '¿Es sólida su estructura?', 'Deuda/PN, deuda/EBITDA, descalce de monedas'],
        ], caption: 'Una empresa puede ser fuerte en una dimensión y frágil en otra: rentable pero ilíquida, o sólida patrimonialmente pero destructora de valor. El diagnóstico integra las tres.' },
        { t: 'p', md: 'La **conciliación del flujo operativo con el EBITDA** es la prueba de calidad de utilidades que atraviesa las tres dimensiones: si el resultado dice una cosa y la caja otra, la contradicción se investiga antes de emitir cualquier juicio. Un EBITDA creciente que no se traduce en flujo operativo es la primera señal de que el resultado no es lo que parece.' },
      ],
    },
    {
      title: 'Benchmarking sectorial y el sistema de semáforos',
      intro: 'Los umbrales dan sentido a los ratios, pero importarlos sin ajuste al contexto es uno de los errores más frecuentes del diagnóstico.',
      blocks: [
        { t: 'p', md: 'Un sistema de **semáforos** (verde/amarillo/rojo) por indicador y por sector ordena la lectura y comunica al directorio de un vistazo. Pero cada sector tiene su fisiología: un nivel de endeudamiento normal en una empresa de servicios puede ser temerario en una industrial de alto costo fijo; un CCE de 90 días es alarmante en un supermercado y normal en una constructora.' },
        { t: 'warn', md: 'El riesgo de importar umbrales de otro contexto —de un manual estadounidense, de otro sector, de otra época— es diagnosticar mal. Los umbrales se calibran contra comparables del mismo sector y del mismo mercado. En el Nordeste argentino, con inflación y capital caro, los parámetros de una empresa de un mercado desarrollado no se copian: se adaptan, y esa adaptación es parte del trabajo.' },
        { t: 'quote', author: 'Palepu & Healy', credential: 'Business Analysis and Valuation', md: 'El benchmarking sin comprensión del negocio es peligroso: dos empresas con el mismo ratio pueden estar en situaciones opuestas si sus modelos de negocio, sus sectores o sus contextos difieren. El comparable correcto es tan importante como el ratio.' },
      ],
    },
    {
      title: 'El triángulo: rentabilidad, solvencia y liquidez',
      intro:
        'Las tres dimensiones del diagnóstico no son independientes: están en tensión permanente. Mejorar una suele costar en otra, y ese equilibrio es la esencia de la gestión financiera.',
      blocks: [
        { t: 'p', md: 'Son tres preguntas distintas sobre la misma empresa, y responder bien una no dice nada sobre las otras dos. **Rentabilidad**: ¿el capital invertido rinde más de lo que cuesta? **Solvencia**: ¿el patrimonio alcanza para responder por las obligaciones? **Liquidez**: ¿hay caja para pagar lo que vence mañana?' },
        { t: 'table', title: 'Las tres dimensiones, sus preguntas y sus indicadores', headers: ['Dimensión', 'Pregunta', 'Indicadores', 'Horizonte'], firstColLeft: true, rows: [
          ['Rentabilidad', '¿Crea valor el capital?', 'ROIC, EVA, márgenes, DuPont', 'Largo plazo'],
          ['Solvencia', '¿Alcanza el patrimonio?', 'Deuda/PN, deuda/EBITDA, Altman Z″', 'Mediano plazo'],
          ['Liquidez', '¿Hay caja para pagar?', 'Corriente, ácida, CCE, DSCR, DAF-E', 'Inmediato'],
        ], caption: 'Los horizontes explican por qué una empresa puede fallar en una dimensión sin señales en las otras: la liquidez mata en semanas, la solvencia en años, y la falta de rentabilidad puede tardar una década en manifestarse.' },
        { t: 'p', md: 'Las **tensiones** entre ellas son estructurales, no accidentales:' },
        { t: 'ul', items: [
          '**Rentabilidad contra liquidez.** Vender a más plazo aumenta las ventas y el margen, pero estira el DSO y consume caja. Acumular stock asegura el servicio al cliente, pero inmoviliza capital. Cada mejora de rentabilidad suele pedir caja prestada.',
          '**Rentabilidad contra solvencia.** El apalancamiento eleva el ROE (asignatura 2.1, multiplicador financiero) y simultáneamente deteriora la solvencia. El ROE alto financiado con deuda es rentabilidad comprada con fragilidad.',
          '**Solvencia contra rentabilidad.** Una empresa sin deuda es muy solvente y, casi siempre, menos rentable para el accionista: renuncia al escudo fiscal y al apalancamiento. La máxima solvencia no es el óptimo.',
          '**Liquidez contra rentabilidad.** La caja ociosa da tranquilidad y rinde poco o nada. Un colchón excesivo es solvencia comprada con rentabilidad.',
        ] },
        { t: 'chain', title: 'Las cuatro combinaciones posibles', nodes: ['Rentable y líquida: sana', 'Rentable e ilíquida: la paradoja (4.3)', 'No rentable y líquida: destruye valor lento', 'Ni rentable ni líquida: terminal'] },
        { t: 'idea', md: 'La combinación más peligrosa **no es la peor de las cuatro, es la segunda**: la empresa **rentable e ilíquida**. La primera y la cuarta son evidentes para cualquiera. La tercera se detecta con el ROIC. Pero la rentable e ilíquida **engaña a todos**: muestra buenos resultados, buen patrimonio, buen Altman, y se muere de un día para otro por no poder pagar. Es la que estudia en profundidad la asignatura 4.3 —la paradoja crecimiento-liquidez— y la que más empresas medianas rentables mata.' },
        { t: 'warn', md: 'El corolario operativo: **el diagnóstico nunca se emite sobre una sola dimensión**. Decir "la empresa es rentable" sin decir si es líquida y solvente no es un diagnóstico: es un fragmento. Y en la práctica, el fragmento más peligroso, porque tranquiliza sin fundamento.' },
      ],
    },
    {
      title: 'El mapa de valor: cómo cada hallazgo llega al EVA',
      intro:
        'El diagnóstico no termina en el ratio: termina en el valor. El mapa de interrelaciones es lo que conecta cada hallazgo con la creación o destrucción de valor.',
      blocks: [
        { t: 'p', md: 'Toda palanca de gestión termina moviendo uno de tres números: **el NOPAT, el capital invertido o el costo del capital**. El mapa de valor es la traducción sistemática de cada hallazgo diagnóstico a esos tres destinos. Sin esa traducción, el diagnóstico se queda en descripción.' },
        { t: 'table', title: 'De la palanca operativa al valor', headers: ['Palanca', 'Efecto inmediato', 'Camino al valor'], firstColLeft: true, rows: [
          ['Subir precio o mejorar mezcla', 'Mayor margen', '↑ NOPAT → ↑ ROIC → ↑ EVA'],
          ['Reducir costos fijos', 'Mayor margen y menor GAO', '↑ NOPAT y ↓ riesgo'],
          ['Acortar el DSO (cobranzas)', 'Menos CxC', '↓ Capital → ↑ ROIC → ↑ EVA'],
          ['Reducir el DIO (inventario)', 'Menos stock', '↓ Capital → ↑ ROIC → ↑ EVA'],
          ['Estirar el DPO (proveedores)', 'Más financiación gratuita', '↓ Capital → ↑ ROIC'],
          ['Vender activos no operativos', 'Menos capital inmovilizado', '↓ Capital → ↑ ROIC'],
          ['Sustituir deuda cara (BFR)', 'Menor Kd', '↓ WACC → ↑ spread → ↑ EVA'],
          ['Bajar el IDD', 'Empresa transferible', '↓ Ke → ↓ WACC → ↑ valor'],
        ], caption: 'Cada fila es una recomendación potencial del memorándum, y cada una tiene su cuantificación: cuánto capital libera, cuántos puntos mueve el ROIC, cuánto EVA agrega.' },
        { t: 'formula', name: 'La cuantificación de una palanca', expr: 'Δ EVA = Δ NOPAT − WACC × Δ Capital − Δ WACC × Capital', where: 'Los tres términos corresponden a las tres palancas', note: 'Permite priorizar: no todas las mejoras valen lo mismo, y algunas que parecen menores (un día de CCE) liberan más valor que otras que parecen grandes.' },
        { t: 'idea', md: 'La regla del "y entonces qué" aplicada al valor: **"el CCE aumentó 12 días" no es un hallazgo; "el CCE aumentó 12 días, inmovilizando 4.500 de capital que redujo el ROIC en 1,2 pp y el EVA en 880, recuperables ajustando la política de cobranzas" sí lo es**. La diferencia entre ambas frases es la diferencia entre un informe que se lee y uno que cambia decisiones.' },
      ],
    },
  ],
  expertos: [
    { author: 'Tim Koller', credential: 'McKinsey — Valuation', md: 'La descomposición del retorno revela dónde está la palanca: margen, rotación o apalancamiento. Cada una lleva a una conversación de gestión distinta.' },
    { author: 'Robert Higgins', credential: 'University of Washington', md: 'La rentabilidad, la liquidez y el apalancamiento cuentan tres historias que solo tienen sentido juntas. Aisladas, engañan.' },
    { author: 'Guillermo López Dumrauf', credential: 'Finanzas Corporativas: un enfoque latinoamericano', md: 'En el contexto latinoamericano, el diagnóstico debe leer el apalancamiento a la luz de la volatilidad macro: lo que es prudente en un país estable puede ser temerario en uno inflacionario.' },
  ],
  caso: {
    titulo: 'El diagnóstico integral',
    empresa: 'Maderas del Litoral S.A. — ¿por qué el ROE luce alto?',
    contexto:
      'El ROE de Maderas del Litoral parece envidiable: 33 %. El directorio está satisfecho. El consultor, en cambio, quiere saber de dónde sale ese número: ¿de un margen operativo excelente, de una rotación alta, o del apalancamiento?\n\nLa descomposición DuPont de cinco factores revela la verdad incómoda: buena parte del ROE viene del **multiplicador financiero** (mucha deuda), no de la eficiencia operativa. Y con un GAO alto (mucho costo fijo en la planta) sumado a un GAF alto (deuda), la empresa amplifica dos veces cualquier caída de ventas.\n\nEl encargo: descomponer el ROE, medir los apalancamientos, calcular los puntos de equilibrio y escribir el memorándum al directorio.',
    datos: [
      { t: 'table', title: 'Datos del diagnóstico (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Ventas', '42.000'],
        ['Costos variables', '25.200'],
        ['Costos fijos', '12.950'],
        ['Intereses', '1.150'],
        ['Tasa impositiva efectiva', '35%'],
        ['Activos (analíticos)', '13.500'],
        ['Patrimonio neto ajustado', '5.270'],
      ] },
    ],
    consigna: [
      '¿Cuánto del ROE proviene de la operación y cuánto del apalancamiento (DuPont de 5 factores)?',
      '¿Cuáles son el GAO, el GAF y el GAT, y qué riesgo implican combinados?',
      '¿Cuál es el punto de equilibrio económico y a qué distancia opera la empresa?',
      '¿La empresa es un caso de “rentable pero frágil”? ¿Qué recomendaría al directorio?',
    ],
    metodologia: [
      { k: 'Descomponer (DuPont)', d: 'Separar el ROE en los cinco factores y ver cuál manda.' },
      { k: 'Medir apalancamientos', d: 'GAO = MC/EBIT, GAF = EBIT/EBT, GAT = GAO×GAF.' },
      { k: 'Calcular equilibrios', d: 'PE económico = CF/MC%; distancia al equilibrio.' },
      { k: 'Mapear a valor', d: 'Conectar cada hallazgo con el ROIC y el EVA.' },
      { k: 'Comunicar', d: 'Memorándum ejecutivo con conclusión primero y acciones priorizadas.' },
    ],
  },
  model: {
    sheetTitle: 'Diagnóstico integral: DuPont de 5 factores, apalancamientos y equilibrio',
    intro:
      'Editá las celdas marfil. El DuPont se descompone en cinco factores y SCAN muestra el producto acumulado hasta llegar al ROE. Se calculan GAO/GAF/GAT y el punto de equilibrio.',
    inputs: [
      { key: 'ventas', label: 'Ventas', value: 42000, fmt: 'money', unit: 'miles $' },
      { key: 'cv', label: 'Costos variables', value: 25200, fmt: 'money' },
      { key: 'cf', label: 'Costos fijos', value: 12950, fmt: 'money' },
      { key: 'intereses', label: 'Intereses', value: 1150, fmt: 'money' },
      { key: 't', label: 'Tasa impositiva efectiva', value: 0.35, fmt: 'pct' },
      { key: 'activos', label: 'Activos (analíticos)', value: 13500, fmt: 'money' },
      { key: 'pn', label: 'Patrimonio neto ajustado', value: 5270, fmt: 'money' },
    ],
    calcs: [
      { key: 'mc', label: 'Margen de contribución', xl: '=[ventas]-[cv]', fmt: 'money' },
      { key: 'mcPct', label: 'Margen de contribución %', xl: '=[mc]/[ventas]', fmt: 'pct1' },
      { key: 'ebit', label: 'EBIT', xl: '=[ventas]-[cv]-[cf]', fmt: 'money' },
      { key: 'ebt', label: 'EBT', xl: '=[ebit]-[intereses]', fmt: 'money' },
      { key: 'ni', label: 'Resultado neto', xl: '=[ebt]*(1-[t])', fmt: 'money' },
      { key: 'roe', label: 'ROE', xl: '=[ni]/[pn]', fmt: 'pct1', highlight: true },
      { key: 'gao', label: 'GAO (apalancamiento operativo)', xl: '=[mc]/[ebit]', fmt: 'x', highlight: true },
      { key: 'gaf', label: 'GAF (apalancamiento financiero)', xl: '=[ebit]/[ebt]', fmt: 'x' },
      { key: 'gat', label: 'GAT (apalancamiento total)', xl: '=[gao]*[gaf]', fmt: 'x', highlight: true },
      { key: 'pe', label: 'Punto de equilibrio económico', xl: '=[cf]/[mcPct]', fmt: 'money', highlight: true },
      { key: 'margenSeg', label: 'Margen de seguridad', xl: '=([ventas]-[pe])/[ventas]', fmt: 'pct1' },
    ],
    spills: [
      {
        key: 'dupont',
        title: 'DuPont de 5 factores con producto acumulado (SCAN)',
        columns: ['Factor', 'Valor', 'Producto acumulado'],
        xl: '=LET(nombres,{"Carga fiscal (NI/EBT)";"Carga financiera (EBT/EBIT)";"Margen operativo (EBIT/Ventas)";"Rotación (Ventas/Activos)";"Multiplicador (Activos/PN)"}, f,VSTACK([ni]/[ebt],[ebt]/[ebit],[ebit]/[ventas],[ventas]/[activos],[activos]/[pn]), acum,SCAN(1,f,LAMBDA(a,b,a*b)), HSTACK(nombres,f,acum))',
        formats: [undefined, 'num2', 'num2'],
        rows: 5,
        note: 'VSTACK arma los cinco factores; SCAN multiplica acumulando: la última fila del producto acumulado es exactamente el ROE. Muestra el aporte de cada factor.',
      },
    ],
    conclusions: [
      { label: 'Origen del ROE', xl: '="ROE "&TEXT([roe],"0.0%")&". El multiplicador financiero (Activos/PN = "&TEXT([activos]/[pn],"0.00")&") aporta buena parte: el retorno se apoya en el apalancamiento, no solo en la operación."' },
      { label: 'Riesgo estructural', xl: '=IF([gat]>4,"GAT alto ("&TEXT([gat],"0.0")&"x): una caída de ventas se amplifica fuertemente. Empresa rentable pero frágil.","GAT moderado ("&TEXT([gat],"0.0")&"x).")&" Margen de seguridad: "&TEXT([margenSeg],"0.0%")&" sobre el punto de equilibrio."' },
    ],
  },
  ejercicio: {
    titulo: 'DuPont de cinco factores exprés',
    enunciado: 'Con los datos ya depurados de una empresa, descomponé su ROE en los cinco generadores y verificá el resultado.',
    datos: [
      { t: 'table', title: 'Datos (miles de $)', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Resultado neto (NI)', '800'], ['EBT', '1.200'], ['EBIT', '1.500'], ['Ventas', '20.000'], ['Activos', '8.000'], ['Patrimonio neto', '3.000'],
      ] },
    ],
    preguntas: ['¿Cuánto valen los cinco factores del DuPont?', '¿Cuál es el ROE y de dónde viene sobre todo?'],
    solucion: [
      { t: 'formula', name: 'Los cinco factores', expr: 'Fiscal 800/1.200=0,667 · Financiera 1.200/1.500=0,80 · Margen 1.500/20.000=7,5% · Rotación 20.000/8.000=2,5 · Multiplicador 8.000/3.000=2,667' },
      { t: 'formula', name: 'ROE', expr: 'ROE = 0,667 × 0,80 × 0,075 × 2,5 × 2,667 = 26,7 %', note: 'Verificación directa: NI/PN = 800/3.000 = 26,7 %. ✓' },
      { t: 'idea', md: 'El ROE del 26,7 % se apoya fuertemente en el **multiplicador financiero (2,667)**: buena parte del retorno viene del apalancamiento, no solo de la operación. Empresa rentable pero a vigilar por su dependencia de la deuda.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: '¿Qué agrega el DuPont de cinco factores frente al de tres?', opciones: ['Nada, es lo mismo.', 'Aísla el efecto de los intereses (carga financiera) y la carga fiscal.', 'Elimina el margen operativo.', 'Solo cambia el orden.'], correcta: 1, justificacion: 'La versión de cinco factores separa la carga fiscal (NI/EBT) y la carga financiera (EBT/EBIT), que la de tres factores mezcla dentro del margen neto. No elimina el margen operativo ni es un mero reordenamiento.' },
    { id: 'q2', pregunta: 'La “carga financiera” del DuPont (EBT/EBIT) mide:', opciones: ['La eficiencia operativa.', 'Cuánto del resultado operativo se lleva el interés de la deuda.', 'La tasa impositiva.', 'La rotación de activos.'], correcta: 1, justificacion: 'EBT/EBIT capta el peso de los intereses: cuanto más baja, más se lleva la deuda. No es margen operativo, ni fiscalidad, ni rotación.' },
    { id: 'q3', pregunta: 'Un ROE alto que proviene sobre todo del multiplicador financiero (Activos/PN) indica que:', opciones: ['La empresa es muy eficiente operativamente.', 'El retorno se apoya en el apalancamiento (deuda), lo que agrega riesgo.', 'No hay riesgo.', 'El margen operativo es altísimo.'], correcta: 1, justificacion: 'Si el ROE se explica por el multiplicador, viene del endeudamiento, no de la operación, y eso agrega fragilidad. No implica eficiencia operativa ni ausencia de riesgo.' },
    { id: 'q4', pregunta: 'El GAO (grado de apalancamiento operativo) alto significa:', opciones: ['Mucha deuda.', 'Mucha estructura de costos fijos: el EBIT amplifica las variaciones de ventas.', 'Alta liquidez.', 'Baja rotación.'], correcta: 1, justificacion: 'El GAO mide el riesgo operativo por costos fijos: a más costos fijos, más se amplifica el EBIT ante cambios de ventas. La deuda es el GAF, no el GAO.' },
    { id: 'q5', pregunta: 'El GAT (apalancamiento total) es:', opciones: ['GAO + GAF.', 'GAO × GAF.', 'GAO / GAF.', 'Solo el GAF.'], correcta: 1, justificacion: 'El apalancamiento total es el producto: GAT = GAO × GAF, porque los efectos operativo y financiero se componen multiplicativamente.' },
    { id: 'q6', pregunta: 'El punto de equilibrio económico se calcula como:', opciones: ['Costos fijos × margen de contribución.', 'Costos fijos ÷ margen de contribución porcentual.', 'Ventas − costos.', 'Activos ÷ patrimonio.'], correcta: 1, justificacion: 'PE = CF ÷ MC% es el nivel de ventas con EBIT cero. Las otras expresiones no despejan el equilibrio.' },
    { id: 'q7', pregunta: 'El punto de equilibrio financiero respecto del económico es:', opciones: ['Siempre mayor.', 'Menor, porque descuenta partidas no erogables (depreciaciones, RECPAM).', 'Igual.', 'Independiente de la depreciación.'], correcta: 1, justificacion: 'El financiero ajusta por no erogables y por eso es menor: se puede estar en pérdida contable y aún generar caja. Depende directamente de la depreciación y similares.' },
    { id: 'q8', pregunta: 'Combinar GAO alto y GAF alto produce:', opciones: ['Máxima seguridad.', 'Amplificación doble: una caída de ventas golpea fuerte el resultado (empresa frágil).', 'Un ROE bajo garantizado.', 'Inmunidad a las ventas.'], correcta: 1, justificacion: 'Costos fijos altos + deuda alta amplifican dos veces las variaciones de ventas: es el perfil “rentable pero frágil”. No da seguridad ni inmunidad.' },
    { id: 'q9', pregunta: 'Descomponer la variación de ventas en precio, volumen y mezcla sirve para:', opciones: ['Decorar el informe.', 'Saber la causa de un cambio de margen y elegir la acción correcta.', 'Calcular impuestos.', 'Nada práctico.'], correcta: 1, justificacion: 'Cada causa (precio, volumen, mezcla) exige una acción distinta; sin la descomposición, el diagnóstico es anécdota. No tiene fin decorativo ni fiscal.' },
    { id: 'q10', pregunta: 'La “empresa solvente que destruye valor” es aquella que:', opciones: ['No puede pagar sus deudas.', 'Es rentable en libros pero tiene ROIC < WACC.', 'No tiene deuda.', 'Tiene mucha caja.'], correcta: 1, justificacion: 'Puede lucir rentable y pagar sus cuentas, pero si el ROIC no supera el WACC destruye valor. No es un problema de solvencia inmediata ni de caja.' },
    { id: 'q11', pregunta: 'El “nivel de ventas para cubrir todo el período” incluye, además de los costos:', opciones: ['Nada más.', 'El servicio de deuda, las inversiones comprometidas y las distribuciones previstas.', 'Solo la depreciación.', 'Solo los impuestos.'], correcta: 1, justificacion: 'Es el umbral de caja real: suma servicio de deuda, inversiones y dividendos comprometidos. Es más exigente que el equilibrio económico o financiero.' },
    { id: 'q12', pregunta: 'En el mapa de interrelaciones, un aumento del ciclo de conversión de efectivo (CCE):', opciones: ['Mejora el ROIC.', 'Aumenta el capital invertido y por esa vía reduce el ROIC y el EVA.', 'No afecta el valor.', 'Reduce las ventas.'], correcta: 1, justificacion: 'Un CCE mayor inmoviliza más capital de trabajo, sube el capital invertido y baja el ROIC/EVA. Es una de las conexiones centrales entre operación y valor.' },
    { id: 'q13', pregunta: 'El principio de la pirámide aplicado al memorándum implica:', opciones: ['Poner la conclusión al final.', 'Poner la conclusión primero y luego el sustento.', 'No tener conclusión.', 'Ordenar por fecha.'], correcta: 1, justificacion: 'La pirámide (Minto) exige conclusión primero, agrupamiento lógico y sustento después. Es lo opuesto a reservar la conclusión para el final.' },
    { id: 'q14', pregunta: 'El margen de seguridad mide:', opciones: ['La liquidez.', 'Cuánto pueden caer las ventas antes de llegar al punto de equilibrio.', 'La tasa de interés.', 'El patrimonio.'], correcta: 1, justificacion: 'Margen de seguridad = (Ventas − PE)/Ventas: el colchón de ventas antes de entrar en pérdida. No mide liquidez, tasa ni patrimonio.' },
    { id: 'q15', pregunta: 'Según Higgins, calcular ratios sin una pregunta de negocio detrás es:', opciones: ['Diagnóstico completo.', 'Aritmética, no diagnóstico.', 'Suficiente para decidir.', 'Lo ideal.'], correcta: 1, justificacion: 'Los ratios son medios para responder preguntas de negocio; sin esa pregunta, son aritmética. El diagnóstico exige interpretación orientada a la decisión.' },
    { id: 'q16', pregunta: 'Los “márgenes en cascada” son, en orden:', opciones: ['Neto, operativo, EBITDA, bruto.', 'Bruto, EBITDA, operativo y neto.', 'Solo el neto.', 'Bruto y neto únicamente.'], correcta: 1, justificacion: 'Se leen en cascada desde el bruto hacia el neto (bruto → EBITDA → operativo → neto), cada uno contando una parte de la historia.' },
    { id: 'q17', pregunta: 'La descomposición precio-volumen-mezcla explica el cambio de:', opciones: ['El patrimonio.', 'Las ventas (o el margen), separando efecto precio, cantidad y combinación de productos.', 'La deuda.', 'La tasa de interés.'], correcta: 1, justificacion: 'Separa cuánto del cambio vino por precio, por volumen y por mezcla de productos: cada causa exige una acción distinta.' },
    { id: 'q18', pregunta: 'El factor “carga fiscal” del DuPont es:', opciones: ['EBIT/Ventas.', 'NI/EBT.', 'Ventas/Activos.', 'Activos/PN.'], correcta: 1, justificacion: 'La carga fiscal es NI/EBT (cuánto queda tras impuestos). Los otros son margen operativo, rotación y multiplicador.' },
    { id: 'q19', pregunta: 'El “margen operativo” del DuPont se mide como:', opciones: ['NI/Ventas.', 'EBIT/Ventas.', 'EBT/EBIT.', 'Ventas/Activos.'], correcta: 1, justificacion: 'El margen operativo del DuPont de 5 factores es EBIT/Ventas (eficiencia de la operación antes de intereses e impuestos).' },
    { id: 'q20', pregunta: 'La “rotación de activos” del DuPont mide:', opciones: ['La carga financiera.', 'La intensidad de uso del activo (Ventas/Activos).', 'El margen bruto.', 'La liquidez.'], correcta: 1, justificacion: 'Ventas/Activos indica cuántas ventas genera cada peso de activo. No es carga financiera, margen ni liquidez.' },
    { id: 'q21', pregunta: 'El GAF (apalancamiento financiero) se calcula como:', opciones: ['MC/EBIT.', 'EBIT/EBT.', 'GAO × GAF.', 'Ventas/Activos.'], correcta: 1, justificacion: 'GAF = EBIT/EBT capta el efecto de los intereses. MC/EBIT es el GAO y su producto es el GAT.' },
    { id: 'q22', pregunta: 'El apalancamiento operativo (GAO) condiciona:', opciones: ['La tasa impositiva.', 'Cuánto apalancamiento financiero se puede tolerar.', 'El tipo de cambio.', 'Nada.'], correcta: 1, justificacion: 'Con mucho costo fijo (GAO alto), la empresa tolera menos deuda (GAF): combinados amplifican dos veces las caídas de ventas.' },
    { id: 'q23', pregunta: 'El punto de equilibrio financiero, respecto del económico, ajusta por:', opciones: ['Las ventas.', 'Partidas no erogables (depreciaciones, RECPAM).', 'El patrimonio.', 'Los activos.'], correcta: 1, justificacion: 'El financiero descuenta lo no erogable, por lo que es menor: se puede estar en pérdida contable y aún generar caja.' },
    { id: 'q24', pregunta: 'El “nivel de ventas para cubrir todo el período” suma, además de los costos:', opciones: ['Solo la depreciación.', 'Servicio de deuda, inversiones comprometidas y distribuciones previstas.', 'Solo impuestos.', 'Nada más.'], correcta: 1, justificacion: 'Es el umbral de caja real: incluye servicio de deuda, CapEx comprometido y dividendos. Es más exigente que los equilibrios contables.' },
    { id: 'q25', pregunta: 'Importar umbrales de semáforos de otro sector sin ajustar es:', opciones: ['Buena práctica.', 'Un riesgo: los umbrales dependen del sector y del contexto.', 'Obligatorio.', 'Neutro.'], correcta: 1, justificacion: 'Un ratio “sano” en un sector puede ser alarmante en otro; los umbrales se ajustan al contexto, no se copian.' },
    { id: 'q26', pregunta: 'La deuda neta sobre EBITDA es un indicador de:', opciones: ['Rentabilidad.', 'Apalancamiento / capacidad de repago.', 'Liquidez inmediata.', 'Rotación.'], correcta: 1, justificacion: 'Deuda neta/EBITDA mide cuántos años de generación harían falta para cancelar la deuda: una lectura de apalancamiento y repago.' },
    { id: 'q27', pregunta: 'La cobertura de intereses (EBIT/Intereses) mide:', opciones: ['La liquidez.', 'Cuántas veces el resultado operativo cubre los intereses.', 'El margen bruto.', 'La rotación.'], correcta: 1, justificacion: 'Indica el colchón para pagar intereses; alimenta la calificación sintética (2.2) y el Kd. No es margen ni rotación.' },
    { id: 'q28', pregunta: 'Una empresa rentable que quiebra por iliquidez ilustra que:', opciones: ['Rentabilidad y liquidez son lo mismo.', 'Se puede ganar dinero y quedarse sin caja.', 'La caja no importa.', 'El EBITDA garantiza la caja.'], correcta: 1, justificacion: 'La ganancia contable no asegura la caja para pagar a tiempo; la liquidez es una dimensión distinta (ver 4.3).' },
    { id: 'q29', pregunta: 'El corazón del método DuPont es:', opciones: ['Calcular el ROE y detenerse.', 'Atribuir la variación del ROE a cada uno de sus factores.', 'Ignorar los factores.', 'Sumar los cinco factores.'], correcta: 1, justificacion: 'No basta ver que el ROE cambió: hay que decir por cuál factor y cuánto (los factores se multiplican, no se suman).' },
    { id: 'q30', pregunta: 'El anexo metodológico del memorándum ejecutivo debe permitir que:', opciones: ['Nadie entienda el cálculo.', 'Un tercero reproduzca y audite fórmulas, supuestos y fuentes.', 'Se oculten los supuestos.', 'Se pague menos impuesto.'], correcta: 1, justificacion: 'El anexo hace el diagnóstico reproducible y auditable (fórmulas, supuestos, fuentes). No es para ocultar ni para fines fiscales.' },
  ],
  bibliografia: [
    'Koller, Goedhart & Wessels — *Valuation*',
    'Palepu & Healy — *Business Analysis and Valuation*',
    'Higgins, R. — *Analysis for Financial Management*',
    'Brealey, Myers & Allen — *Principles of Corporate Finance*',
    'Damodaran, A. — *Corporate Finance: Theory and Practice*',
    'López Dumrauf, G. — *Finanzas Corporativas: un enfoque latinoamericano*',
  ],
}
