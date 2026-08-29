import type { Asignatura } from './types'

// ============================================================================
// MÓDULO AVANZADO A.5 — Financiamiento Alternativo para la Empresa Mediana
// ============================================================================
export const av5_financiamiento: Asignatura = {
  cod: 'A.5',
  slug: 'av-5',
  cuatrimestre: 5,
  fase: 'Módulo Avanzado · Temas de frontera',
  nombre: 'Financiamiento Alternativo: cómo accede al capital la empresa mediana más allá del banco',
  horas: '24 h · 10 teóricas / 14 prácticas',
  correlativas: 'Correlativas: 2.4 y 4.3 · Módulo avanzado',
  framework: 'Mercado de capitales PyME · SGR · private equity · indicador BFR (JPR)',
  resumen:
    'La empresa mediana argentina paga por su deuda mucho más de lo que sus fundamentos justifican. Este módulo recorre el menú completo de instrumentos, enseña a comparar su costo financiero total efectivo, y cuantifica en pesos el valor de ordenarse para acceder mejor.',
  objetivos: [
    'Conocer el menú completo de financiamiento disponible para la empresa mediana argentina.',
    'Calcular y comparar el costo financiero total efectivo de cada instrumento, más allá de la tasa nominal.',
    'Comprender el papel de las SGR y del mercado de capitales PyME en la reducción del costo.',
    'Cuantificar la Brecha de Financiamiento Real (BFR) y traducirla a valor recuperable.',
    'Diseñar una arquitectura de financiamiento coherente con el ciclo operativo y el riesgo del negocio.',
  ],
  sections: [
    {
      title: 'El problema: por qué la empresa mediana paga de más',
      intro:
        'No es solo el contexto macro. Hay razones estructurales, y varias son corregibles por la propia empresa.',
      blocks: [
        { t: 'p', md: 'La empresa mediana enfrenta un costo de financiamiento sistemáticamente superior al que su riesgo real justificaría. Tres causas se acumulan, y solo la primera es verdaderamente externa.' },
        { t: 'ol', items: [
          '**Riesgo país y contexto macro.** Tasas altas, volatilidad e incertidumbre regulatoria afectan a todos por igual. Es el componente que la empresa no controla.',
          '**Asimetría informativa.** El prestamista no puede distinguir a la empresa buena de la mala, entonces le cobra a todas la tasa promedio del grupo. La empresa ordenada subsidia a la desordenada. **Esto sí es corregible: se corrige informando mejor.**',
          '**Falta de garantías y de historial.** Sin activos líquidos que ofrecer ni antecedentes de cumplimiento verificables, el prestamista exige más retorno o más garantías. **También corregible**, vía SGR, historial y ordenamiento.',
        ] },
        { t: 'idea', md: 'De ahí nace el indicador propio **BFR (Brecha de Financiamiento Real)**: la distancia entre lo que la empresa efectivamente paga y lo que sus fundamentos justifican según su calificación sintética. **La BFR no es un dato inevitable del contexto: es valor recuperable.** Cuantificarla en pesos convierte "ordenarse" de buena intención en una decisión de inversión con retorno medible.' },
        { t: 'formula', name: 'BFR — Brecha de Financiamiento Real (JPR)', expr: 'BFR = CFT efectivo ponderado − Kd según calificación sintética', where: 'BFR($) = BFR(pts) × Deuda financiera promedio', note: 'El Kd sintético surge de la cobertura de intereses (asignaturas 2.2 y 3.1). La brecha es el sobrecosto atribuible a información, garantías y acceso — no al riesgo real del negocio.' },
      ],
    },
    {
      title: 'El menú completo de instrumentos',
      intro:
        'La mayoría de las empresas medianas usa dos o tres instrumentos, cuando el menú disponible es bastante más amplio —y más barato en varios de sus escalones—.',
      blocks: [
        { t: 'table', title: 'Instrumentos por horizonte y propósito', headers: ['Instrumento', 'Para qué sirve', 'Costo relativo'], firstColLeft: true, rows: [
          ['Adelanto en cuenta corriente', 'Descalce puntual de caja', 'Muy alto — el más caro del menú'],
          ['Descuento de cheques (bancario)', 'Adelantar cobranzas', 'Alto'],
          ['Descuento de cheques (mercado de capitales)', 'Adelantar cobranzas', 'Medio — habitualmente menor que el bancario'],
          ['Factoring', 'Ceder cuentas por cobrar (con o sin recurso)', 'Medio'],
          ['Pagaré bursátil', 'Capital de trabajo a corto plazo', 'Medio'],
          ['Obligación negociable PyME', 'Inversión y reestructuración de pasivos', 'Medio-bajo si hay escala'],
          ['Leasing', 'Adquirir bienes de uso sin inmovilizar capital', 'Medio — con ventaja fiscal'],
          ['Préstamo bancario con SGR', 'Capital de trabajo e inversión', 'Bajo — el aval mejora la tasa'],
          ['Prefinanciación de exportaciones', 'Ciclo exportador', 'Bajo — en moneda dura'],
          ['Private equity / capital privado', 'Crecimiento, cambio de escala', 'No es deuda: cede participación'],
        ], caption: 'El adelanto en cuenta corriente —el instrumento más usado por comodidad— es sistemáticamente el más caro. Sustituirlo por instrumentos del mercado de capitales es, muchas veces, la mejora de costo más grande y más rápida.' },
        { t: 'p', md: 'Las **Sociedades de Garantía Recíproca (SGR)** merecen mención aparte: no prestan dinero, **avalan**. Al aportar la garantía que la empresa no tiene, transforman su perfil de riesgo ante el prestamista y le abren tasas a las que no accedería sola. Para la PyME argentina es, en términos de reducción de costo, el instrumento de mayor impacto.' },
      ],
    },
    {
      title: 'El costo financiero total efectivo: comparar peras con peras',
      intro:
        'Ningún instrumento se compara por su tasa nominal. La comparación válida es por el costo financiero total efectivo, y las diferencias son sorprendentes.',
      blocks: [
        { t: 'formula', name: 'Costo Financiero Total efectivo', expr: 'CFT = [(Monto a devolver ÷ Monto recibido)^(365/días) − 1]', where: 'Monto recibido = neto de comisiones, gastos, sellos e IVA sobre intereses retenidos al inicio', note: 'Un descuento "al 4 % mensual" con 1,5 % de comisión, sellos e IVA puede tener un CFT anual muy superior al que sugiere su tasa nominal.' },
        { t: 'steps', title: 'Los componentes que casi nunca se suman', items: [
          { k: 'Interés nominal', d: 'Lo único que suele mirarse, y muchas veces la menor parte del costo total.' },
          { k: 'Comisiones y gastos', d: 'De otorgamiento, de administración, de evaluación. Se cobran sobre el monto nominal pero reducen el neto recibido.' },
          { k: 'Impuesto de sellos', d: 'Según jurisdicción, sobre el monto del instrumento.' },
          { k: 'IVA sobre intereses', d: 'Recuperable si la empresa es responsable inscripta, pero afecta el flujo de caja mientras tanto.' },
          { k: 'Reciprocidad exigida', d: 'Saldos inmovilizados, seguros o productos atados que reducen el monto efectivamente disponible.' },
          { k: 'Costo del aval (si aplica)', d: 'La comisión de la SGR, que debe compararse contra la mejora de tasa que produce.' },
        ] },
        { t: 'idea', md: 'La aritmética que cambia decisiones: **una tasa nominal más alta con menos costos asociados puede resultar más barata que una tasa nominal baja cargada de comisiones**. Sin el cálculo del CFT, la comparación entre instrumentos es literalmente imposible —y la mayoría de las empresas medianas la hace mirando la tasa nominal—.' },
      ],
    },
    {
      title: 'El mercado de capitales PyME',
      intro:
        'La alternativa menos usada y, en varios tramos, la más barata. Su barrera no es el costo sino el desconocimiento y el requisito de ordenamiento.',
      blocks: [
        { t: 'ul', items: [
          '**Cheque de pago diferido.** El instrumento de entrada: se negocian en el mercado, con distintos segmentos (avalado por SGR, patrocinado por la empresa libradora, directo). El avalado suele conseguir las mejores tasas.',
          '**Pagaré bursátil.** Similar en lógica, con plazos más largos y también avalable por SGR.',
          '**Factura de crédito electrónica.** Instrumento pensado específicamente para acelerar el cobro de la PyME proveedora de grandes empresas.',
          '**Obligaciones negociables PyME.** Deuda de mediano plazo emitida bajo un régimen simplificado, apta para financiar inversión o reestructurar pasivos caros.',
        ] },
        { t: 'p', md: 'El requisito de entrada no es tanto financiero como **informativo y de gobierno**: estados contables auditados y presentados en tiempo, información consistente, orden societario. Y ahí aparece el círculo virtuoso: **el ordenamiento que exige el mercado de capitales es exactamente el que reduce la asimetría informativa y, con ella, la BFR**. La empresa se ordena para acceder, y al ordenarse ya paga menos.' },
        { t: 'chain', title: 'El círculo virtuoso del ordenamiento', nodes: ['Ordenar información y gobierno', 'Acceder al mercado de capitales', 'Bajar la BFR', 'Menor Kd → menor WACC', 'Mayor valor de la empresa'], caption: 'Ordenarse no es un costo administrativo: es una inversión con retorno cuantificable en el costo del capital y en el valor de la empresa.' },
      ],
    },
    {
      title: 'Capital privado: cuando la respuesta no es deuda',
      intro:
        'Hay situaciones en las que el problema no se resuelve con más deuda, sino con capital. Y eso implica ceder participación.',
      blocks: [
        { t: 'p', md: 'El **private equity** y el capital de crecimiento aportan fondos a cambio de participación accionaria. No hay servicio de deuda que ahogue la caja —lo cual importa mucho dada la paradoja crecimiento-liquidez (asignatura 4.3)— pero sí hay dilución, gobierno compartido y, casi siempre, un horizonte de salida del inversor en cinco a siete años.' },
        { t: 'table', title: 'Deuda frente a capital, para la empresa familiar', headers: ['Dimensión', 'Deuda', 'Capital privado'], firstColLeft: true, rows: [
          ['Efecto en la caja', 'Servicio fijo obligatorio', 'Sin servicio; presión por crecimiento'],
          ['Control', 'Se conserva', 'Se comparte (directorio, veto)'],
          ['Costo', 'Kd explícito y deducible', 'Ke implícito, más alto'],
          ['Horizonte', 'Definido por el contrato', 'Salida del inversor en 5–7 años'],
          ['Exigencia previa', 'Garantías e historial', 'Gobierno, información y escala'],
        ], caption: 'El capital privado es más caro que la deuda (el accionista exige más que el acreedor) pero no compromete la caja. La decisión depende del DAF-E, del CCE y de la disposición del dueño a compartir el control.' },
        { t: 'warn', md: 'Para el dueño de una empresa familiar, la barrera del capital privado rara vez es financiera: es de **control**. Compartir decisiones, abrir la información y aceptar un horizonte de salida son cambios culturales profundos. Es una decisión legítima negarse — pero debe tomarse sabiendo su costo: financiar el crecimiento solo con deuda, en un contexto de tasas altas, tiene un techo y un riesgo de liquidez concretos.' },
      ],
    },
    {
      title: 'La mirada JPR',
      intro: 'Cómo ordenamos la arquitectura de financiamiento de una empresa mediana del Nordeste.',
      blocks: [
        { t: 'p', md: 'El error de arquitectura que más veces encontramos: **financiar activos de largo plazo con instrumentos de corto plazo**. Una máquina que se paga en siete años financiada con descuento de cheques a 90 días renovados indefinidamente. Funciona mientras el crédito se renueve; el día que no se renueva, la empresa entra en crisis de liquidez sin haber tenido nunca un problema de rentabilidad. **El plazo del financiamiento debe seguir al plazo del activo que financia.**' },
        { t: 'idea', md: 'Nuestra secuencia de trabajo sobre el pasivo de una empresa mediana: **(1)** medir el CFT efectivo de cada línea vigente —casi siempre aparecen instrumentos mucho más caros de lo que el dueño creía—; **(2)** calcular la **BFR** para dimensionar el sobrecosto recuperable; **(3)** sustituir el adelanto en cuenta corriente por instrumentos del mercado de capitales; **(4)** incorporar el aval de una SGR donde mejore la tasa más de lo que cuesta; **(5)** alinear plazos de activo y pasivo. Los primeros tres pasos suelen liberar más valor que muchas mejoras operativas, y en menos tiempo.' },
        { t: 'warn', md: 'La advertencia que damos siempre: **abaratar el costo del capital no es una excusa para tomar más deuda**. La secuencia correcta es primero abaratar y ordenar el pasivo existente, no ampliarlo. Con RONIC por debajo del WACC (asignatura 4.2), más deuda barata sigue financiando destrucción de valor —solo que más lentamente—.' },
        { t: 'chain', title: 'El orden de intervención sobre el pasivo', nodes: ['Medir CFT real de cada línea', 'Calcular la BFR', 'Sustituir lo más caro', 'Sumar aval SGR', 'Alinear plazos'], caption: 'Ninguno de estos pasos requiere vender más ni mejorar el margen: es valor que ya está en la empresa, atrapado en una estructura de financiamiento subóptima.' },
      ],
    },
  ],
  expertos: [
    { author: 'Juan Pablo Rossi', credential: 'JPR Consulting — indicador BFR', md: 'La brecha entre lo que una PyME paga por su deuda y lo que sus fundamentos justifican no es una fatalidad del contexto: es la suma de asimetría informativa y falta de garantías. Ambas se corrigen. Cuantificar esa brecha en pesos es lo que convierte "ordenarse" en una decisión de inversión con retorno medible.' },
    { author: 'Aswath Damodaran', credential: 'NYU Stern — Applied Corporate Finance', md: 'El costo de la deuda de una empresa debería reflejar su riesgo de incumplimiento, no la incapacidad del prestamista de evaluarlo. Cuando ambas cosas divergen, hay valor disponible para quien reduzca esa distancia informativa.' },
    { author: 'Stewart Myers', credential: 'MIT — teoría del orden jerárquico (pecking order)', md: 'Las empresas prefieren financiarse primero con fondos internos, después con deuda y solo en último lugar con capital externo. Esa jerarquía no es irracional: refleja el costo creciente de la asimetría informativa en cada escalón.' },
  ],
  caso: {
    titulo: 'Reordenar el pasivo de Maderas del Litoral',
    empresa: 'Maderas del Litoral S.A. — arquitectura de financiamiento',
    contexto:
      'Maderas del Litoral tiene 6.500 (miles) de deuda financiera repartida en cuatro instrumentos que se fueron acumulando sin plan: lo que hacía falta, cuando hacía falta, con quien estuviera disponible.\n\nEl dueño cree que paga "alrededor del 20 %". Cuando el consultor calcula el CFT efectivo de cada línea y lo pondera, el número real es bastante peor. Y al compararlo contra el Kd que corresponde a su calificación sintética (cobertura de intereses de 3,35x, equivalente a BBB/BB), aparece la Brecha de Financiamiento Real.\n\nEl encargo: medir la brecha, cuantificar el valor recuperable, y proponer una arquitectura de financiamiento alineada con el ciclo del negocio.',
    datos: [
      { t: 'table', title: 'Estructura de deuda actual (miles de $)', headers: ['Instrumento', 'Monto', 'CFT efectivo'], firstColLeft: true, rows: [
        ['Adelanto en cuenta corriente', '1.200', '38,0%'],
        ['Descuento de cheques (bancario)', '2.300', '29,0%'],
        ['Préstamo bancario a 3 años', '2.000', '24,0%'],
        ['Leasing de maquinaria', '1.000', '21,0%'],
        ['Deuda financiera total', '6.500', '—'],
        ['Kd según calificación sintética (BBB/BB)', '—', '15,5%'],
        ['Costo del aval SGR', '—', '2,5%'],
      ] },
    ],
    consigna: [
      '¿Cuál es el CFT ponderado real de la deuda de la empresa?',
      '¿Cuánto vale la BFR, en puntos y en pesos por año?',
      '¿Cuánto se ahorraría sustituyendo el adelanto y el descuento bancario por instrumentos del mercado de capitales con aval SGR?',
      '¿Qué problema de arquitectura de plazos tiene la estructura actual?',
    ],
    metodologia: [
      { k: 'Medir el CFT real', d: 'Ponderar el costo financiero total efectivo de cada línea por su participación en la deuda total.' },
      { k: 'Calcular la BFR', d: 'CFT ponderado − Kd sintético, en puntos; multiplicado por la deuda promedio, en pesos.' },
      { k: 'Identificar lo sustituible', d: 'Las líneas más caras y de corto plazo son las primeras candidatas.' },
      { k: 'Evaluar el aval', d: 'Comparar el costo de la SGR contra la mejora de tasa que habilita.' },
      { k: 'Alinear plazos', d: 'Activo de largo plazo con financiamiento de largo plazo.' },
    ],
  },
  model: {
    sheetTitle: 'Brecha de Financiamiento Real y reordenamiento del pasivo',
    intro:
      'Editá las celdas marfil. El modelo calcula el CFT ponderado real, la BFR en puntos y en pesos, y el ahorro de sustituir las líneas más caras. La matriz dinámica ordena los instrumentos por costo.',
    inputs: [
      { key: 'mAdelanto', label: 'Adelanto en cuenta corriente — monto', value: 1200, fmt: 'money', unit: 'miles $' },
      { key: 'cAdelanto', label: 'Adelanto — CFT efectivo', value: 0.38, fmt: 'pct1' },
      { key: 'mCheques', label: 'Descuento de cheques — monto', value: 2300, fmt: 'money' },
      { key: 'cCheques', label: 'Cheques — CFT efectivo', value: 0.29, fmt: 'pct1' },
      { key: 'mPrestamo', label: 'Préstamo bancario — monto', value: 2000, fmt: 'money' },
      { key: 'cPrestamo', label: 'Préstamo — CFT efectivo', value: 0.24, fmt: 'pct1' },
      { key: 'mLeasing', label: 'Leasing — monto', value: 1000, fmt: 'money' },
      { key: 'cLeasing', label: 'Leasing — CFT efectivo', value: 0.21, fmt: 'pct1' },
      { key: 'kdSintetico', label: 'Kd según calificación sintética', value: 0.155, fmt: 'pct1' },
      { key: 'cftMercado', label: 'CFT del mercado de capitales con SGR', value: 0.205, fmt: 'pct1' },
    ],
    calcs: [
      { key: 'deudaTotal', label: 'Deuda financiera total', xl: '=[mAdelanto]+[mCheques]+[mPrestamo]+[mLeasing]', fmt: 'money' },
      { key: 'costoTotal', label: 'Costo financiero anual actual', xl: '=[mAdelanto]*[cAdelanto]+[mCheques]*[cCheques]+[mPrestamo]*[cPrestamo]+[mLeasing]*[cLeasing]', fmt: 'money' },
      { key: 'cftPonderado', label: 'CFT ponderado real', xl: '=[costoTotal]/[deudaTotal]', fmt: 'pct1', highlight: true },
      { key: 'bfrPuntos', label: 'BFR en puntos', xl: '=[cftPonderado]-[kdSintetico]', fmt: 'pct1', highlight: true },
      { key: 'bfrPesos', label: 'BFR en pesos por año', xl: '=[bfrPuntos]*[deudaTotal]', fmt: 'money', highlight: true },
      { key: 'ahorroSust', label: 'Ahorro anual sustituyendo adelanto y cheques', xl: '=([mAdelanto]*([cAdelanto]-[cftMercado]))+([mCheques]*([cCheques]-[cftMercado]))', fmt: 'money', highlight: true },
      { key: 'cftNuevo', label: 'CFT ponderado tras la sustitución', xl: '=([costoTotal]-[ahorroSust])/[deudaTotal]', fmt: 'pct1' },
    ],
    spills: [
      {
        key: 'ranking',
        title: 'Instrumentos ordenados por costo (candidatos a sustitución)',
        columns: ['Instrumento', 'Monto', 'CFT', 'Exceso sobre Kd sintético'],
        xl: '=LET(nom,{"Adelanto en cta. cte.";"Descuento de cheques";"Préstamo bancario";"Leasing"}, m,VSTACK([mAdelanto],[mCheques],[mPrestamo],[mLeasing]), c,VSTACK([cAdelanto],[cCheques],[cPrestamo],[cLeasing]), exc,c-[kdSintetico], tab,HSTACK(nom,m,c,exc), SORTBY(tab,c,-1))',
        formats: [undefined, 'money', 'pct1', 'pct1'],
        rows: 4,
        note: 'SORTBY ordena de más caro a más barato. Los primeros de la lista son los candidatos naturales a sustitución: cada punto que se les baje se traduce directamente en resultado.',
      },
    ],
    conclusions: [
      { label: 'La brecha real', xl: '="La empresa paga un CFT ponderado del "&TEXT([cftPonderado],"0.0%")&" cuando su calificación sintética justifica "&TEXT([kdSintetico],"0.0%")&". La BFR es de "&TEXT([bfrPuntos],"0.0%")&" = "&TEXT([bfrPesos],"#,##0")&" por año de sobrecosto recuperable."' },
      { label: 'Valor de reordenar', xl: '="Sustituir el adelanto y el descuento bancario por mercado de capitales con aval SGR ahorra "&TEXT([ahorroSust],"#,##0")&" por año y baja el CFT ponderado a "&TEXT([cftNuevo],"0.0%")&". Es resultado que no requiere vender una unidad más."' },
    ],
  },
  ejercicio: {
    titulo: 'El costo real de un descuento de cheques',
    enunciado:
      'Una empresa descuenta un cheque de 100 (miles) a 90 días. Le aplican una tasa nominal del 3,5 % mensual, más una comisión del 1,2 % sobre el valor nominal y sellos por 1,0 %. Recibe el neto por adelantado.',
    datos: [
      { t: 'table', title: 'Datos', headers: ['Concepto', 'Valor'], firstColLeft: true, rows: [
        ['Valor nominal del cheque', '100'], ['Plazo', '90 días'], ['Tasa nominal mensual', '3,5%'], ['Comisión', '1,2%'], ['Sellos', '1,0%'],
      ] },
    ],
    preguntas: ['¿Cuánto recibe efectivamente?', '¿Cuál es el CFT efectivo anual?', '¿Cómo se compara con la tasa nominal anunciada?'],
    solucion: [
      { t: 'formula', name: 'Descuentos aplicados', expr: 'Interés = 100 × 3,5% × 3 = 10,50 · Comisión = 1,20 · Sellos = 1,00 · Total = 12,70' },
      { t: 'formula', name: 'Monto efectivamente recibido', expr: 'Neto recibido = 100 − 12,70 = 87,30' },
      { t: 'formula', name: 'CFT efectivo anual', expr: 'CFT = (100 ÷ 87,30)^(365/90) − 1 = (1,1455)^4,056 − 1 ≈ 74,5%' },
      { t: 'idea', md: 'La tasa "3,5 % mensual" sugiere un 42 % anual (3,5 × 12). El **CFT efectivo real es ≈ 74,5 %**: casi el doble. La diferencia viene de tres fuentes que casi nunca se suman: el interés se cobra **por adelantado** sobre el nominal (no sobre el neto recibido), las **comisiones y sellos** reducen aún más lo recibido, y el **efecto de capitalización** al anualizar. Sin este cálculo, comparar instrumentos es imposible — y es exactamente el tipo de error que alimenta la BFR.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Las tres causas del sobrecosto de financiamiento de la empresa mediana son:', opciones: ['Solo el riesgo país.', 'Riesgo país/macro, asimetría informativa y falta de garantías e historial.', 'Solo la inflación.', 'La mala gestión únicamente.'], correcta: 1, justificacion: 'La primera es externa e incontrolable; las otras dos son corregibles por la propia empresa, y ahí está el valor recuperable.' },
    { id: 'q2', pregunta: 'La asimetría informativa encarece el crédito porque:', opciones: ['Los bancos son ineficientes.', 'El prestamista no puede distinguir la empresa buena de la mala y cobra la tasa promedio del grupo.', 'La inflación es alta.', 'No hay garantías.'], correcta: 1, justificacion: 'Al no poder discriminar, el prestamista promedia: la empresa ordenada termina subsidiando a la desordenada. Informar mejor rompe ese promedio.' },
    { id: 'q3', pregunta: 'La BFR (Brecha de Financiamiento Real) se define como:', opciones: ['La deuda total menos el patrimonio.', 'El CFT efectivo ponderado menos el Kd según calificación sintética.', 'La tasa nominal menos la inflación.', 'El WACC menos el ROIC.'], correcta: 1, justificacion: 'Mide el sobrecosto que la empresa paga por encima de lo que sus fundamentos justifican; es valor recuperable, no riesgo real.' },
    { id: 'q4', pregunta: 'La BFR en pesos se calcula como:', opciones: ['BFR(pts) × Deuda financiera promedio.', 'BFR(pts) ÷ EBITDA.', 'BFR(pts) × Ventas.', 'BFR(pts) + impuestos.'], correcta: 0, justificacion: 'Multiplicar la brecha en puntos por la deuda promedio convierte el sobrecosto en un número en pesos por año, comparable con cualquier otra mejora.' },
    { id: 'q5', pregunta: 'El instrumento sistemáticamente más caro del menú suele ser:', opciones: ['El leasing.', 'El adelanto en cuenta corriente.', 'La obligación negociable.', 'La prefinanciación de exportaciones.'], correcta: 1, justificacion: 'El adelanto en cuenta corriente es el más usado por comodidad y el más caro; sustituirlo suele ser la mejora de costo más rápida y grande.' },
    { id: 'q6', pregunta: 'Las Sociedades de Garantía Recíproca (SGR):', opciones: ['Prestan dinero directamente.', 'Avalan al deudor, transformando su perfil de riesgo ante el prestamista.', 'Son bancos.', 'Cobran impuestos.'], correcta: 1, justificacion: 'No prestan: garantizan. Al aportar la garantía que la empresa no tiene, le abren tasas a las que no accedería sola.' },
    { id: 'q7', pregunta: 'El CFT efectivo se diferencia de la tasa nominal porque incluye:', opciones: ['Solo el interés.', 'Comisiones, sellos, IVA, reciprocidad y el efecto de capitalización.', 'Solo la inflación.', 'El tipo de cambio.'], correcta: 1, justificacion: 'Todos esos componentes reducen el monto efectivamente recibido o aumentan el devuelto; sin sumarlos, la comparación entre instrumentos es inválida.' },
    { id: 'q8', pregunta: 'Una tasa nominal más alta con menos costos asociados:', opciones: ['Siempre es más cara.', 'Puede resultar más barata en CFT que una tasa nominal baja cargada de comisiones.', 'Es imposible.', 'Da lo mismo.'], correcta: 1, justificacion: 'Es exactamente el motivo por el que la comparación debe hacerse por CFT: la tasa nominal puede ser la menor parte del costo total.' },
    { id: 'q9', pregunta: 'En el ejercicio del cheque descontado, la tasa "3,5 % mensual" resultó en un CFT anual de:', opciones: ['42 %.', 'Cerca del 74,5 %.', '3,5 %.', '12 %.'], correcta: 1, justificacion: 'El interés adelantado sobre el nominal, más comisiones y sellos, más la capitalización al anualizar, casi duplican la tasa que sugiere la multiplicación simple.' },
    { id: 'q10', pregunta: 'Que el interés se cobre por adelantado sobre el valor nominal:', opciones: ['No afecta el costo.', 'Encarece el CFT, porque se paga sobre un monto mayor al efectivamente recibido.', 'Abarata la operación.', 'Es ilegal.'], correcta: 1, justificacion: 'Se paga interés sobre 100 pero se reciben 87,30: el costo real sobre el dinero disponible es mucho mayor que la tasa enunciada.' },
    { id: 'q11', pregunta: 'El cheque de pago diferido avalado por SGR, en el mercado de capitales:', opciones: ['Es el segmento más caro.', 'Suele conseguir las mejores tasas del instrumento.', 'No existe.', 'Solo lo usan las grandes empresas.'], correcta: 1, justificacion: 'El aval de la SGR mejora sustancialmente el perfil de riesgo y es el segmento que habitualmente obtiene las tasas más bajas.' },
    { id: 'q12', pregunta: 'La barrera de entrada al mercado de capitales PyME es principalmente:', opciones: ['El costo financiero.', 'Informativa y de gobierno: estados auditados, información consistente, orden societario.', 'El tamaño mínimo de facturación.', 'La nacionalidad.'], correcta: 1, justificacion: 'El requisito no es tanto financiero como de ordenamiento — y ese mismo ordenamiento es el que reduce la asimetría informativa y la BFR.' },
    { id: 'q13', pregunta: 'El "círculo virtuoso del ordenamiento" consiste en que:', opciones: ['Ordenarse es un costo administrativo sin retorno.', 'La empresa se ordena para acceder al mercado, y al ordenarse ya paga menos por su deuda.', 'El mercado ordena a la empresa.', 'Solo aplica a empresas cotizantes.'], correcta: 1, justificacion: 'El orden requerido para acceder reduce la asimetría informativa, que es una de las causas del sobrecosto: el beneficio empieza antes de emitir.' },
    { id: 'q14', pregunta: 'El private equity, a diferencia de la deuda:', opciones: ['Tiene servicio fijo obligatorio.', 'No compromete la caja con servicio fijo, pero diluye y comparte el control.', 'Es más barato que la deuda.', 'No exige nada.'], correcta: 1, justificacion: 'No hay cuota que pagar (alivio para la liquidez) pero hay dilución, gobierno compartido y horizonte de salida del inversor.' },
    { id: 'q15', pregunta: 'El capital privado es, en términos de costo:', opciones: ['Más barato que la deuda.', 'Más caro: el accionista exige más retorno que el acreedor.', 'Gratuito.', 'Igual que la deuda.'], correcta: 1, justificacion: 'El accionista es residual y asume más riesgo, por lo que exige un retorno superior; además no genera escudo fiscal.' },
    { id: 'q16', pregunta: 'Para el dueño de una empresa familiar, la barrera del capital privado suele ser:', opciones: ['Financiera.', 'De control: compartir decisiones, abrir información y aceptar un horizonte de salida.', 'Legal.', 'Impositiva.'], correcta: 1, justificacion: 'Es un cambio cultural profundo. Negarse es legítimo, pero debe hacerse conociendo el costo: financiar el crecimiento solo con deuda tiene techo y riesgo de liquidez.' },
    { id: 'q17', pregunta: 'El error de arquitectura más frecuente en el pasivo de una PyME es:', opciones: ['Tener demasiado capital propio.', 'Financiar activos de largo plazo con instrumentos de corto plazo renovados.', 'Usar leasing.', 'Tomar prefinanciación de exportaciones.'], correcta: 1, justificacion: 'Funciona mientras el crédito se renueve; el día que no se renueva, sobreviene una crisis de liquidez sin haber tenido problema de rentabilidad.' },
    { id: 'q18', pregunta: 'La regla de alineación de plazos indica que:', opciones: ['Todo debe ser a corto plazo.', 'El plazo del financiamiento debe seguir al plazo del activo que financia.', 'Todo debe ser a largo plazo.', 'El plazo es indiferente.'], correcta: 1, justificacion: 'Activos de largo plazo con financiamiento de largo plazo; capital de trabajo con instrumentos de corto plazo. El descalce es fuente de riesgo de refinanciación.' },
    { id: 'q19', pregunta: 'La secuencia JPR de intervención sobre el pasivo empieza por:', opciones: ['Tomar más deuda barata.', 'Medir el CFT efectivo real de cada línea vigente.', 'Emitir obligaciones negociables.', 'Vender activos.'], correcta: 1, justificacion: 'Casi siempre aparecen instrumentos mucho más caros de lo que el dueño creía; medir es el primer paso, antes de sustituir.' },
    { id: 'q20', pregunta: 'Abaratar el costo del capital, según la advertencia del módulo:', opciones: ['Justifica tomar más deuda.', 'No es excusa para ampliar el pasivo: primero se ordena y abarata el existente.', 'Obliga a crecer.', 'Elimina el riesgo.'], correcta: 1, justificacion: 'Con RONIC por debajo del WACC, más deuda barata sigue financiando destrucción de valor, solo que más lentamente.' },
    { id: 'q21', pregunta: 'Evaluar si conviene el aval de una SGR consiste en:', opciones: ['Tomarlo siempre.', 'Comparar su comisión contra la mejora de tasa que habilita.', 'Rechazarlo por su costo.', 'Consultar al banco.'], correcta: 1, justificacion: 'El aval tiene un costo; se justifica si la reducción del CFT que produce supera esa comisión.' },
    { id: 'q22', pregunta: 'La teoría del orden jerárquico (pecking order) de Myers sostiene que las empresas prefieren:', opciones: ['Capital externo primero.', 'Fondos internos, luego deuda y en último lugar capital externo.', 'Solo deuda.', 'Un orden aleatorio.'], correcta: 1, justificacion: 'La jerarquía refleja el costo creciente de la asimetría informativa en cada escalón de financiamiento.' },
    { id: 'q23', pregunta: 'La factura de crédito electrónica está pensada para:', opciones: ['Grandes empresas exportadoras.', 'Acelerar el cobro de la PyME proveedora de grandes empresas.', 'Financiar inversión de largo plazo.', 'Sustituir el leasing.'], correcta: 1, justificacion: 'Es un instrumento diseñado específicamente para el descalce de cobro entre PyMEs proveedoras y grandes compradores.' },
    { id: 'q24', pregunta: 'El leasing como instrumento de financiamiento:', opciones: ['Es el más caro.', 'Permite adquirir bienes de uso sin inmovilizar capital, con ventaja fiscal.', 'No existe en Argentina.', 'Solo sirve para inmuebles.'], correcta: 1, justificacion: 'Financia el activo con el propio activo como garantía y tiene tratamiento fiscal favorable; conviene compararlo por CFT como cualquier otro.' },
    { id: 'q25', pregunta: 'Las obligaciones negociables PyME sirven principalmente para:', opciones: ['Capital de trabajo diario.', 'Financiar inversión o reestructurar pasivos caros a mediano plazo.', 'Pagar sueldos.', 'Descontar cheques.'], correcta: 1, justificacion: 'Su plazo las hace aptas para inversión o para sustituir deuda cara de corto plazo, mejorando a la vez costo y arquitectura de plazos.' },
    { id: 'q26', pregunta: 'La "reciprocidad exigida" por un banco (saldos inmovilizados, seguros atados):', opciones: ['No afecta el costo.', 'Reduce el monto efectivamente disponible y por tanto encarece el CFT.', 'Abarata la operación.', 'Es un beneficio.'], correcta: 1, justificacion: 'Todo lo que reduce el dinero disponible sin reducir lo que se devuelve eleva el costo efectivo del financiamiento.' },
    { id: 'q27', pregunta: 'El IVA sobre intereses, para una empresa responsable inscripta:', opciones: ['Es un costo definitivo.', 'Es recuperable, pero afecta el flujo de caja mientras tanto.', 'No se aplica.', 'Duplica el costo.'], correcta: 1, justificacion: 'Se recupera como crédito fiscal, pero inmoviliza caja en el ínterin — hay que contemplarlo en el flujo aunque no sea costo definitivo.' },
    { id: 'q28', pregunta: 'La BFR conecta directamente con la valuación porque:', opciones: ['No tiene relación.', 'Un menor Kd reduce el WACC y, con ello, aumenta el valor de la empresa.', 'Solo afecta el resultado contable.', 'Cambia el EBITDA.'], correcta: 1, justificacion: 'Reducir el costo de la deuda baja el WACC (asignatura 3.1), que es la tasa de descuento de toda la valuación: el efecto sobre el valor es directo.' },
    { id: 'q29', pregunta: 'Reordenar el pasivo genera resultado que:', opciones: ['Exige vender más.', 'No requiere vender una unidad más ni mejorar el margen.', 'Solo aparece a diez años.', 'Es contable, no de caja.'], correcta: 1, justificacion: 'Es valor que ya está en la empresa, atrapado en una estructura de financiamiento subóptima; liberarlo no depende del mercado ni de la operación.' },
    { id: 'q30', pregunta: 'La decisión entre deuda y capital privado depende centralmente de:', opciones: ['La moda del mercado.', 'El DAF-E, el CCE y la disposición del dueño a compartir control.', 'La tasa nominal únicamente.', 'El tamaño de la empresa.'], correcta: 1, justificacion: 'Si la liquidez está tensionada (DAF-E < CCE), el servicio fijo de la deuda es peligroso; y compartir control es una decisión que excede lo financiero.' },
  ],
  bibliografia: [
    'Damodaran, A. — *Applied Corporate Finance*, capítulos de estructura de financiamiento',
    'Myers, S. — “The Capital Structure Puzzle” y teoría del pecking order',
    'Documentación del Mercado Argentino de Valores: cheque de pago diferido, pagaré bursátil, FCE y ON PyME',
    'Normativa y práctica de Sociedades de Garantía Recíproca (SGR) en Argentina',
    'Rossi, J. P. — indicador BFR (Brecha de Financiamiento Real), JPR Consulting',
    'López Dumrauf, G. — *Finanzas Corporativas: un enfoque latinoamericano*',
  ],
}
