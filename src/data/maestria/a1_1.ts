import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 1.1 — Contabilidad Financiera Avanzada y Normalización de
// Estados Contables en Economías Inflacionarias
// ============================================================================
export const a1_1: Asignatura = {
  cod: '1.1',
  slug: 'a1-1',
  cuatrimestre: 1,
  fase: 'Descriptiva · ¿Qué sucedió?',
  nombre: 'Contabilidad Financiera Avanzada y Normalización de Estados Contables en Economías Inflacionarias',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Sin correlativas · Primer cuatrimestre',
  framework: 'Palepu & Healy · Fowler Newton · Trugman · Damodaran',
  resumen:
    'El puente entre el estado contable —que rinde cuentas conforme a una norma— y el estado analítico —que mide el capital realmente inmovilizado y el resultado económico recurrente—. Es el cimiento sobre el que se apoya todo el instrumental posterior de la Maestría.',
  objetivos: [
    'Leer críticamente estados contables de capital cerrado e identificar inconsistencias entre lo que la norma exige informar y lo que la decisión financiera necesita medir.',
    'Reexpresar en moneda homogénea bajo inflación y comprender el efecto del RECPAM sobre la utilidad reportada.',
    'Normalizar la empresa familiar separando lo operativo de lo no operativo, y lo empresario de lo personal.',
    'Construir el estado analítico y el capital empleado que alimentan el ROIC, el EVA y la valuación del resto del programa.',
    'Documentar cada adecuación con su fuente, su fecha y su criterio, de modo que un tercero pueda auditar el trabajo.',
  ],
  sections: [
    {
      title: 'El estado contable no es la base de la decisión financiera',
      intro:
        'El estado contable es un sistema de información construido para rendir cuentas conforme a una normativa. El análisis financiero necesita medir otra cosa: el capital efectivamente inmovilizado y el resultado económico recurrente. Entre ambos hay una brecha, y esa brecha es el objeto de esta asignatura.',
      blocks: [
        {
          t: 'p',
          md: 'La contabilidad responde a una pregunta legal y fiscal: *¿cómo se rindió cuenta del patrimonio conforme a las normas profesionales vigentes?* Las finanzas corporativas responden a otra, económica: *¿cuánto capital tiene la empresa efectivamente inmovilizado y cuánto resultado recurrente genera ese capital?* Confundir ambas preguntas es la primera fuente de error del analista principiante. Un balance impecable desde lo normativo puede ser una base engañosa para decidir una inversión, un préstamo o una compraventa.',
        },
        {
          t: 'quote',
          author: 'Krishna Palepu & Paul Healy',
          credential: 'Harvard Business School — Business Analysis and Valuation',
          md: 'El análisis contable existe para **deshacer las distorsiones** que introducen las reglas de reconocimiento y la discrecionalidad de la gerencia. Antes del análisis financiero hay un paso previo e ineludible: evaluar la calidad de los números y ajustarlos para que reflejen la realidad económica del negocio.',
          source: 'Marco de cuatro pasos: estrategia, contabilidad, finanzas, prospectiva',
        },
        {
          t: 'p',
          md: 'En la empresa que **no cotiza** —el objeto central de esta Maestría— el problema se agrava por tres razones simultáneas: la información no pasa por el filtro de un mercado de capitales; la unidad jurídica rara vez coincide con la unidad económica real; y la frontera entre el patrimonio de la empresa y el del dueño es porosa. Por eso el trabajo no empieza analizando: empieza **depurando**.',
        },
        {
          t: 'chain',
          title: 'La cadena de transformación de la información',
          nodes: ['Estado contable de presentación', 'Reexpresión en moneda homogénea', 'Catálogo de adecuaciones', 'Estado analítico', 'Capital empleado y NOPAT'],
          caption: 'Ningún indicador del programa se calcula sobre el estado contable crudo: todos se apoyan en el estado analítico que se construye en esta asignatura.',
        },
        {
          t: 'idea',
          md: 'Un ratio calculado sobre información no depurada no es un dato: es ruido con apariencia de precisión. La depuración no es un preliminar prescindible; es la condición de validez de todo lo que viene después.',
        },
      ],
    },
    {
      title: 'Reexpresión en moneda homogénea',
      intro:
        'Sumar pesos de enero con pesos de diciembre bajo inflación es sumar unidades distintas. La reexpresión convierte todas las partidas a moneda de cierre para que la comparación tenga sentido económico.',
      blocks: [
        {
          t: 'p',
          md: 'La reexpresión se rige en Argentina por la **RT 6** de la FACPCE, hoy leída dentro del cuerpo unificado de la **RT 54**, y es conceptualmente equivalente a la **NIC 29** (información financiera en economías hiperinflacionarias). La Resolución JG 539/2018 de la FACPCE dejó fijado el disparador: cuando la inflación acumulada en tres años supera el 100 %, la reexpresión es obligatoria y no optativa.',
        },
        {
          t: 'p',
          md: 'El mecanismo es un **coeficiente de reexpresión**: cada partida no monetaria se lleva a moneda de cierre multiplicándola por el cociente entre el índice de precios del mes de cierre y el índice del mes en que la partida se originó (su *anclaje*).',
        },
        {
          t: 'formula',
          name: 'Coeficiente de reexpresión',
          expr: 'Coef = Índice de cierre ÷ Índice de origen',
          where: 'Valor reexpresado = Valor de origen × Coef',
          note: 'El índice es el nacional de precios que la norma indique (IPC / índice mayorista según el período). El “origen” es el mes de incorporación de la partida al patrimonio, no el de cierre.',
        },
        {
          t: 'p',
          md: 'La distinción decisiva es entre partidas **monetarias** y **no monetarias**. Las no monetarias (bienes de cambio, bienes de uso, aportes) se reexpresan porque su valor está anclado a un momento del pasado. Las monetarias (caja, créditos y deudas en pesos) **no se reexpresan**: ya están expresadas en moneda de cierre por definición. Pero mantenerlas bajo inflación genera un resultado propio —el RECPAM— que es el tema de la sección siguiente.',
        },
        {
          t: 'warn',
          md: 'El error más frecuente es reexpresar un rubro monetario o anclar una partida al mes de cierre en vez de al mes de origen. Ambos destruyen la homogeneidad y contaminan todo indicador que use esas cifras.',
        },
      ],
    },
    {
      title: 'RECPAM: la pérdida (o ganancia) invisible',
      intro:
        'El Resultado por Exposición al Cambio en el Poder Adquisitivo de la Moneda mide lo que la empresa gana o pierde por su posición monetaria bajo inflación. No aparece en el flujo de caja ni en el EBITDA, pero es real y frecuentemente grande.',
      blocks: [
        {
          t: 'p',
          md: 'Mantener **activos monetarios** (caja, cuentas por cobrar en pesos) bajo inflación implica una **pérdida** de poder adquisitivo: los mismos pesos compran menos. Mantener **pasivos monetarios** (deuda en pesos, proveedores) implica una **ganancia**: se cancela con pesos más baratos. El RECPAM es el neto de ambos efectos sobre la **posición monetaria neta**.',
        },
        {
          t: 'formula',
          name: 'RECPAM (aproximación)',
          expr: 'RECPAM ≈ − (Activos monetarios − Pasivos monetarios) × π',
          where: 'π = tasa de inflación del período · PMN = Activos monetarios − Pasivos monetarios',
          note: 'Si la Posición Monetaria Neta es ACTIVA (PMN > 0) el RECPAM es una pérdida (negativo). Si es PASIVA (PMN < 0), es una ganancia por licuación de deuda.',
        },
        {
          t: 'idea',
          md: 'La empresa que “gana” porque su deuda se licúa no está creando valor operativo: está transfiriendo valor desde sus acreedores. Confundir la ganancia por RECPAM con rentabilidad genuina es una de las ilusiones más caras de la gestión bajo inflación.',
        },
        {
          t: 'quote',
          author: 'Enrique Fowler Newton',
          credential: 'Análisis de Estados Contables · Contabilidad Superior',
          md: 'Sin reexpresión, la comparación entre cifras de distintos momentos carece de sentido: se comparan magnitudes medidas con **reglas distintas**. La moneda homogénea no es un refinamiento académico, es la precondición de cualquier lectura seria.',
        },
      ],
    },
    {
      title: 'El catálogo de adecuaciones en seis familias',
      intro:
        'El puente entre el estado contable y el analítico es un catálogo sistemático de ajustes, agrupado en seis familias. No es una lista de “correcciones sueltas”: es un protocolo que garantiza que nada quede sin revisar.',
      blocks: [
        {
          t: 'table',
          title: 'Las seis familias de adecuaciones',
          headers: ['Familia', 'Qué corrige', 'Ejemplos nucleares'],
          firstColLeft: true,
          rows: [
            ['A · Unidad de medida', 'Homogeneidad de la moneda', 'Reexpresión, segregación del RECPAM por rubro, homogeneización cambiaria'],
            ['B · Valuación de activos', 'Valor económico vs. valor de libros', 'Bienes de uso a valor de mercado, bienes de cambio a VNR, previsión de incobrables, intangibles autogenerados'],
            ['C · Pasivos', 'Deuda real, incluida la oculta', 'Arrendamientos no capitalizados, cheques descontados con recurso, avales al grupo, cuentas con socios'],
            ['D · Resultados', 'Resultado recurrente y a precio de mercado', 'Retribución de mercado del dueño, gastos personales, partes relacionadas, partidas no recurrentes'],
            ['E · Estructura y perímetro', 'Unidad de análisis correcta', 'Consolidación del grupo económico real, caja operativa vs. excedente, informalidad parcial'],
            ['F · Verificación', 'Auditabilidad del trabajo', 'Conciliación línea por línea, documentación de fuente/fecha/criterio, análisis de sensibilidad'],
          ],
          caption: 'Cada adecuación se documenta con su fuente, su fecha y su criterio. La familia F es la que convierte el trabajo en algo reproducible por un tercero.',
        },
        {
          t: 'p',
          md: 'El orden importa: primero se homogeneiza la moneda (A), luego se corrige el valor de activos (B) y pasivos (C), después el resultado (D), se define el perímetro correcto (E) y finalmente se verifica y documenta todo (F). Saltear la familia A contamina las cinco restantes.',
        },
      ],
    },
    {
      title: 'Bienes de uso a valor de mercado: la trampa del activo amortizado',
      intro:
        'La contabilidad mide los bienes de uso a valor de origen menos amortizaciones acumuladas —un criterio de asignación de costo, no de medición de capital—. Para el análisis financiero, los bienes de uso se valúan a valor de mercado.',
      blocks: [
        {
          t: 'p',
          md: 'A medida que un activo envejece, su valor residual contable tiende a cero mientras la máquina sigue produciendo. El capital invertido queda **subvaluado** y el ROIC, artificialmente **inflado**: una planta totalmente amortizada y en plena producción aparenta crear valor sin crearlo. Es la distorsión más silenciosa y más frecuente en la industria de capital cerrado.',
        },
        {
          t: 'formula',
          name: 'La distorsión del ROIC',
          expr: 'ROIC = NOPAT ÷ Capital invertido',
          where: 'Si el denominador se subvalúa (activo a VO − amort en vez de a mercado), el ROIC sube sin que la eficiencia real cambie.',
        },
        {
          t: 'steps',
          title: 'Métodos de revalúo para el estado analítico',
          items: [
            { k: 'Tasación técnica', d: 'Un profesional matriculado valúa el bien a su valor corriente. Es el estándar cuando el activo es específico o de alto valor.' },
            { k: 'Valor de reposición depreciado', d: 'Costo de reponer un bien equivalente nuevo, ajustado por el grado de uso. Útil cuando existe un mercado del bien nuevo.' },
            { k: 'Mercado secundario', d: 'Precio observable de bienes usados equivalentes. El más objetivo cuando ese mercado existe (rodados, maquinaria estándar).' },
            { k: 'Valor de uso', d: 'Valor presente de los flujos que el activo genera, cuando no hay mercado de referencia. Es el último recurso y exige declarar los supuestos.' },
          ],
        },
        {
          t: 'quote',
          author: 'Aswath Damodaran',
          credential: 'NYU Stern — The Dark Side of Valuation',
          md: 'El **valor contable del capital** es un número contable, no económico. En empresas con activos viejos o con inflación no corregida, apoyar el retorno del capital sobre el valor de libros produce retornos que parecen extraordinarios y no lo son.',
        },
      ],
    },
    {
      title: 'El estado de flujo de efectivo: el estado que no miente',
      intro:
        'Es el estado más difícil de manipular y el más subutilizado en la empresa cerrada. Mientras el resultado depende de criterios de devengamiento y valuación, el flujo registra movimientos verificables contra extractos y arqueos.',
      blocks: [
        {
          t: 'p',
          md: 'El EFE cumple una función doble: es herramienta de diagnóstico y, sobre todo, **prueba de veracidad** de los otros dos estados. Una utilidad creciente que no se traduce en flujo operativo es la primera señal de que algo en el devengamiento no cierra.',
        },
        {
          t: 'p',
          md: 'Se construye por **método directo** (reconstrucción de cobranzas y pagos efectivos) o **indirecto** (partiendo del resultado y revirtiendo las partidas no erogables). La norma exige conciliación entre ambos. La reconstrucción del método directo es exactamente el ejercicio que después se repite contra el ERP en la asignatura 1.2.',
        },
        {
          t: 'warn',
          md: 'Distinción innegociable: el EFE es un estado contable histórico y **NO es el FCFF**. Descontar un flujo contable creyendo que se descuenta un flujo económico es un error que arrastra toda la valuación. El puente entre ambos —caja excedente, activos no operativos, intereses y su escudo, inversión de reposición vs. de crecimiento— se construye explícitamente y alimenta las asignaturas 3.3 y 4.1.',
        },
        {
          t: 'quote',
          author: 'Stephen Penman',
          credential: 'Columbia Business School — Financial Statement Analysis and Security Valuation',
          md: 'La calidad de las ganancias se mide, en última instancia, por su distancia respecto del efectivo. Cuanto más se separan de forma persistente el resultado devengado y el flujo operativo, más deben encenderse las alarmas del analista.',
        },
      ],
    },
    {
      title: 'Normalización de la empresa familiar',
      intro:
        'Normalizar es separar dos cosas que en la PyME familiar están fundidas: lo operativo de lo no operativo, y lo de la empresa de lo del dueño. Sin esa separación, el resultado no es comparable ni transferible.',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Retribución del dueño a valor de mercado.** Si el socio-gerente cobra menos que un gerente profesional, el resultado está sobreestimado; si cobra de más, subestimado. Se ajusta a la remuneración de mercado del cargo.',
            '**Gastos personales imputados a la empresa.** Vehículos, viajes o consumos personales cargados como gasto operativo se retiran del resultado del negocio.',
            '**Operaciones con partes relacionadas.** Alquileres, compras o ventas a precios distintos del de mercado se llevan a valor de mercado; la diferencia se aísla.',
            '**Activos de uso personal.** Se excluyen del capital invertido y se valúan por separado.',
            '**Informalidad parcial.** Se reconstruye con declaración explícita del alcance y de la incertidumbre que introduce.',
          ],
        },
        {
          t: 'quote',
          author: 'Gary Trugman',
          credential: 'Understanding Business Valuation (AICPA)',
          md: 'En la empresa de capital cerrado, los ajustes de normalización —discrecionales y de control— son el corazón del análisis. Separar los gastos que existen porque el dueño quiere de los que existen porque el negocio los necesita es lo que revela la verdadera capacidad de generación de resultados.',
        },
        {
          t: 'idea',
          md: 'La normalización no “maquilla” los números: los vuelve comparables. Un comprador, un banco o un jurado valúan la capacidad recurrente del negocio, no las decisiones personales de su dueño actual.',
        },
      ],
    },
    {
      title: 'Del estado analítico al capital empleado',
      intro:
        'El producto final de la asignatura es el estado analítico y, a partir de él, el capital empleado: el insumo directo del ROIC, del EVA y de la valuación.',
      blocks: [
        {
          t: 'formula',
          name: 'Capital empleado (enfoque operativo)',
          expr: 'Capital = Cuentas por cobrar + Bienes de cambio − Proveedores + Bienes de uso',
          where: 'Bienes de cambio reexpresados · Bienes de uso a valor de mercado · Cuentas por cobrar depuradas',
          note: 'Excluye la caja operativa mínima del excedente de caja y separa la deuda financiera del pasivo operativo.',
        },
        {
          t: 'chain',
          title: 'Dónde desemboca esta asignatura',
          nodes: ['Estado analítico', 'Capital empleado + NOPAT', 'ROIC (2.1)', 'Spread ROIC − WACC', 'EVA y valuación (4.1)'],
          caption: 'La 1.1 es la raíz del mapa de generadores de valor: un error acá se propaga a todo el árbol.',
        },
        {
          t: 'p',
          md: 'Por eso el régimen de evaluación de la asignatura culmina en un trabajo práctico integrador: depuración, reexpresión y normalización completa de un juego de estados contables reales anonimizados, con un **memorando de ajustes** que fundamenta cada adecuación en su norma. Ese memorando es la primera pieza del Trabajo Final.',
        },
      ],
    },
  ],
  expertos: [
    {
      author: 'Krishna Palepu & Paul Healy',
      credential: 'Harvard Business School',
      md: 'El análisis financiero sin análisis contable previo es construir sobre arena: primero se evalúa la calidad de los números y se corrigen sus distorsiones, recién después se calculan ratios.',
    },
    {
      author: 'Aswath Damodaran',
      credential: 'NYU Stern School of Business',
      md: 'En finanzas de empresas privadas, la normalización de la retribución del dueño y la separación de lo operativo de lo no operativo suelen mover el valor más que cualquier refinamiento en la tasa de descuento.',
    },
    {
      author: 'Enrique Fowler Newton',
      credential: 'Referente de la doctrina contable argentina',
      md: 'La moneda homogénea es la precondición de toda comparación. Antes de interpretar, hay que homogeneizar.',
    },
  ],
  caso: {
    titulo: 'Del balance de presentación al estado analítico',
    empresa: 'Maderas del Litoral S.A. — aserradero y fábrica de aberturas, Corrientes',
    contexto:
      'Maderas del Litoral es una empresa familiar de segunda generación. Su contadora presenta un balance impecable desde lo normativo: cierra, concilia y cumple. El directorio —los tres hermanos dueños— quiere saber dos cosas antes de decidir si toman deuda para ampliar la planta: cuánto capital tiene realmente inmovilizado el negocio y cuánto retorno genera ese capital.\n\nEl balance muestra un ROIC contable que parece excelente. Pero la planta principal está totalmente amortizada y sigue produciendo a full; el mayor de los hermanos, que dirige la operación, cobra un sueldo simbólico; la empresa alquila el galpón a una sociedad de los mismos dueños a un valor por encima del de mercado; y varios gastos de la familia pasan por la empresa. Además, la inflación del ejercicio fue del 60 % y el balance no está reexpresado en su totalidad.\n\nEl encargo: reconstruir el estado analítico, normalizar la empresa familiar y mostrar el ROIC verdadero.',
    datos: [
      {
        t: 'table',
        title: 'Datos del ejercicio (en miles de pesos, salvo indicación)',
        headers: ['Concepto', 'Valor'],
        firstColLeft: true,
        rows: [
          ['EBIT contable', '4.200'],
          ['Tasa impositiva efectiva', '35%'],
          ['Cuentas por cobrar (depuradas)', '3.100'],
          ['Bienes de cambio (valor nominal, origen)', '2.600'],
          ['Proveedores', '1.900'],
          ['Bienes de uso — valor de libros (VO − amort)', '900'],
          ['Bienes de uso — valor de mercado (tasación)', '6.800'],
          ['Sueldo del dueño-gerente contabilizado', '600'],
          ['Sueldo de mercado del cargo', '2.400'],
          ['Gastos personales imputados a la empresa', '850'],
          ['Alquiler pagado a sociedad relacionada', '1.500'],
          ['Alquiler de mercado del inmueble', '900'],
          ['Activos monetarios promedio', '3.400'],
          ['Pasivos monetarios promedio', '5.200'],
          ['Inflación del período (π)', '60%'],
          ['Índice de cierre / Índice de origen bienes de cambio', '1,45'],
        ],
      },
    ],
    consigna: [
      '¿Cuál es el EBIT normalizado una vez ajustadas la retribución del dueño, los gastos personales y el alquiler con parte relacionada?',
      '¿Cuánto capital tiene realmente inmovilizado el negocio, valuando los bienes de uso a mercado y reexpresando los bienes de cambio?',
      '¿Cuánto sobreestima el ROIC contable a la verdadera eficiencia del capital?',
      '¿La empresa ganó o perdió por su posición monetaria (RECPAM)? ¿Qué implica para la decisión de tomar deuda?',
    ],
    metodologia: [
      { k: 'Homogeneizar (Familia A)', d: 'Reexpresar bienes de cambio y toda partida no monetaria a moneda de cierre con su coeficiente. Calcular el RECPAM sobre la posición monetaria neta.' },
      { k: 'Revaluar activos (Familia B)', d: 'Llevar los bienes de uso de valor de libros a valor de mercado por tasación. Recalcular el capital invertido.' },
      { k: 'Normalizar resultados (Familia D)', d: 'Ajustar la retribución del dueño al valor de mercado, retirar los gastos personales y llevar el alquiler a valor de mercado.' },
      { k: 'Reconstruir el capital empleado (Familia E)', d: 'CxC + bienes de cambio reexpresados − proveedores + bienes de uso a mercado.' },
      { k: 'Comparar y concluir (Familia F)', d: 'Calcular ROIC contable vs. normalizado, documentar cada ajuste y explicar el impacto sobre la decisión de endeudamiento.' },
    ],
  },
  model: {
    sheetTitle: 'Estado analítico y ROIC normalizado — Maderas del Litoral S.A.',
    intro:
      'Editá las celdas marfil (datos del caso). El modelo reexpresa, normaliza y recalcula el ROIC con matrices dinámicas: las tablas de reexpresión derraman desde una sola fórmula (SEQUENCE / LET / HSTACK), sin arrastrar.',
    inputs: [
      { key: 'ebitCont', label: 'EBIT contable', value: 4200, fmt: 'money', unit: 'miles $' },
      { key: 't', label: 'Tasa impositiva efectiva', value: 0.35, fmt: 'pct' },
      { key: 'cxc', label: 'Cuentas por cobrar (depuradas)', value: 3100, fmt: 'money', unit: 'miles $' },
      { key: 'bienesCambioNom', label: 'Bienes de cambio (nominal, origen)', value: 2600, fmt: 'money', unit: 'miles $' },
      { key: 'proveedores', label: 'Proveedores', value: 1900, fmt: 'money', unit: 'miles $' },
      { key: 'valorLibroPlanta', label: 'Bienes de uso — valor de libros', value: 900, fmt: 'money', unit: 'miles $' },
      { key: 'valorMercadoPlanta', label: 'Bienes de uso — valor de mercado', value: 6800, fmt: 'money', unit: 'miles $' },
      { key: 'sueldoContab', label: 'Sueldo del dueño contabilizado', value: 600, fmt: 'money', unit: 'miles $' },
      { key: 'sueldoMercado', label: 'Sueldo de mercado del cargo', value: 2400, fmt: 'money', unit: 'miles $' },
      { key: 'gastosPersonales', label: 'Gastos personales imputados a la empresa', value: 850, fmt: 'money', unit: 'miles $' },
      { key: 'alquilerPagado', label: 'Alquiler pagado a parte relacionada', value: 1500, fmt: 'money', unit: 'miles $' },
      { key: 'alquilerMercado', label: 'Alquiler de mercado del inmueble', value: 900, fmt: 'money', unit: 'miles $' },
      { key: 'activosMon', label: 'Activos monetarios promedio', value: 3400, fmt: 'money', unit: 'miles $' },
      { key: 'pasivosMon', label: 'Pasivos monetarios promedio', value: 5200, fmt: 'money', unit: 'miles $' },
      { key: 'infl', label: 'Inflación del período (π)', value: 0.6, fmt: 'pct' },
      { key: 'coefBienesCambio', label: 'Coeficiente reexpresión bienes de cambio', value: 1.45, fmt: 'coef' },
    ],
    calcs: [
      { key: 'ajusteSueldo', label: 'Ajuste retribución del dueño (a mercado)', xl: '=-([sueldoMercado]-[sueldoContab])', fmt: 'money', note: 'Negativo: el dueño cobra por debajo de mercado, el resultado estaba sobreestimado.' },
      { key: 'ajusteAlquiler', label: 'Ajuste alquiler con parte relacionada', xl: '=[alquilerPagado]-[alquilerMercado]', fmt: 'money', note: 'Positivo: se pagaba de más; se recompone el resultado.' },
      { key: 'ebitNorm', label: 'EBIT normalizado', xl: '=[ebitCont]+[gastosPersonales]+[ajusteSueldo]+[ajusteAlquiler]', fmt: 'money', highlight: true },
      { key: 'nopatCont', label: 'NOPAT contable', xl: '=[ebitCont]*(1-[t])', fmt: 'money' },
      { key: 'nopatNorm', label: 'NOPAT normalizado', xl: '=[ebitNorm]*(1-[t])', fmt: 'money', highlight: true },
      { key: 'bienesCambioReexp', label: 'Bienes de cambio reexpresados', xl: '=[bienesCambioNom]*[coefBienesCambio]', fmt: 'money' },
      { key: 'capitalCont', label: 'Capital empleado — contable', xl: '=[cxc]+[bienesCambioNom]-[proveedores]+[valorLibroPlanta]', fmt: 'money' },
      { key: 'capitalNorm', label: 'Capital empleado — normalizado', xl: '=[cxc]+[bienesCambioReexp]-[proveedores]+[valorMercadoPlanta]', fmt: 'money', highlight: true },
      { key: 'roicCont', label: 'ROIC contable', xl: '=[nopatCont]/[capitalCont]', fmt: 'pct1' },
      { key: 'roicNorm', label: 'ROIC normalizado', xl: '=[nopatNorm]/[capitalNorm]', fmt: 'pct1', highlight: true },
      { key: 'distorsion', label: 'Sobreestimación del ROIC (pp)', xl: '=[roicCont]-[roicNorm]', fmt: 'pct1' },
      { key: 'pmn', label: 'Posición monetaria neta', xl: '=[activosMon]-[pasivosMon]', fmt: 'money' },
      { key: 'recpam', label: 'RECPAM del período', xl: '=-[pmn]*[infl]', fmt: 'money', highlight: true, note: 'PMN pasiva → ganancia por licuación de deuda.' },
    ],
    spills: [
      {
        key: 'reexpNoMon',
        title: 'Reexpresión de partidas no monetarias',
        columns: ['Rubro no monetario', 'Valor nominal', 'Índice de origen', 'Coeficiente', 'Valor reexpresado'],
        xl: '=LET(rub,{"Bienes de cambio";"Bienes de uso (planta, VO)";"Rodados";"Anticipos a proveedores"}, nom,{2600;900;480;320}, io,{142.6;58.3;110.4;150.1}, idxc,206.8, cf,idxc/io, HSTACK(rub,nom,io,cf,nom*cf))',
        formats: [undefined, 'money', 'num2', 'coef', 'money'],
        rows: 4,
        note: 'Una sola fórmula (LET + HSTACK) reexpresa las cuatro partidas. El coeficiente = índice de cierre ÷ índice de origen de cada rubro.',
      },
      {
        key: 'reexpVentas',
        title: 'Reexpresión de la serie mensual de ventas',
        columns: ['Mes', 'Ventas nominales', 'Coeficiente', 'Ventas homogéneas'],
        xl: '=LET(n,12, m,SEQUENCE(n), vn,{1450;1520;1610;1680;1740;1810;1890;1960;2050;2140;2230;2360}, im,{142.6;148.1;154.0;160.2;166.7;173.5;180.6;188.0;195.7;203.8;212.2;221.0}, idxc,221.0, cf,idxc/im, HSTACK(m,vn,cf,vn*cf))',
        formats: ['num', 'money', 'coef', 'money'],
        rows: 12,
        note: 'SEQUENCE genera los 12 meses; el coeficiente lleva cada venta a moneda de diciembre. Sumar las ventas nominales sería sumar pesos de distinto poder adquisitivo.',
      },
    ],
    conclusions: [
      { label: 'Resultado operativo', xl: '="EBIT normalizado "&TEXT([ebitNorm],"#,##0")&" vs "&TEXT([ebitCont],"#,##0")&" contable: la normalización cambia el resultado operativo en "&TEXT([ebitNorm]-[ebitCont],"#,##0")&" miles."' },
      { label: 'Capital y ROIC', xl: '=IF([roicCont]>[roicNorm],"El ROIC contable ("&TEXT([roicCont],"0.0%")&") SOBREESTIMA la eficiencia real ("&TEXT([roicNorm],"0.0%")&") en "&TEXT([roicCont]-[roicNorm],"0.0%")&": la planta amortizada y los rubros a valor nominal inflan el retorno.","El ROIC normalizado supera al contable; revisar supuestos de valuación.")' },
      { label: 'Posición monetaria', xl: '=IF([recpam]>=0,"Posición monetaria PASIVA: ganancia por RECPAM de "&TEXT([recpam],"#,##0")&" miles (licuación de deuda). No es rentabilidad operativa: desaparece si baja la inflación.","Posición monetaria ACTIVA: pérdida por RECPAM de "&TEXT(-[recpam],"#,##0")&" miles por exposición de activos monetarios.")' },
    ],
  },
  ejercicio: {
    titulo: 'Reexpresión y RECPAM de una distribuidora',
    enunciado:
      'La distribuidora **El Norte S.R.L.** cerró su ejercicio con una inflación del 80 %. Tiene bienes de cambio registrados a valor nominal por 1.500 (miles), incorporados cuando el índice de precios era 100; al cierre el índice es 180. Además mantuvo, en promedio, una posición monetaria neta activa (más caja y créditos en pesos que deudas).',
    datos: [
      {
        t: 'table',
        title: 'Datos (miles de $)',
        headers: ['Concepto', 'Valor'],
        firstColLeft: true,
        rows: [
          ['Bienes de cambio (nominal, origen)', '1.500'],
          ['Índice de precios de origen', '100'],
          ['Índice de precios de cierre', '180'],
          ['Activos monetarios promedio', '3.000'],
          ['Pasivos monetarios promedio', '1.000'],
          ['Inflación del período (π)', '80%'],
        ],
      },
    ],
    preguntas: [
      '¿Cuál es el coeficiente de reexpresión y el valor reexpresado de los bienes de cambio?',
      '¿Cuál es el RECPAM del período y qué signo tiene?',
      '¿La empresa ganó o perdió por su posición monetaria?',
    ],
    solucion: [
      { t: 'formula', name: 'Coeficiente de reexpresión', expr: 'Coef = 180 ÷ 100 = 1,80', note: 'Bienes de cambio reexpresados = 1.500 × 1,80 = 2.700 (miles).' },
      { t: 'p', md: 'La posición monetaria neta (PMN) es **activa**: 3.000 − 1.000 = **2.000**. Bajo inflación, mantener activos monetarios netos genera pérdida.' },
      { t: 'formula', name: 'RECPAM', expr: 'RECPAM = − PMN × π = − 2.000 × 0,80 = − 1.600', note: 'Signo negativo: es una pérdida por exposición a la inflación.' },
      { t: 'idea', md: 'Resultado: los bienes de cambio pasan de 1.500 a **2.700** reexpresados, y la empresa **perdió 1.600** de poder adquisitivo por su posición monetaria activa. Mantener caja y créditos en pesos bajo inflación cuesta.' },
    ],
  },
  quiz: [
    {
      id: 'q1',
      pregunta: '¿Cuál es la diferencia esencial entre el estado contable de presentación y el estado analítico?',
      opciones: [
        'El estado contable rinde cuentas conforme a una norma; el analítico mide el capital inmovilizado y el resultado recurrente para decidir.',
        'El estado analítico es el mismo estado contable pero firmado por un auditor externo.',
        'El estado contable se usa para el fisco y el analítico es una versión resumida para el directorio.',
        'No hay diferencia sustantiva: cambian el formato y los colores, no el contenido.',
      ],
      correcta: 0,
      justificacion:
        'El estado contable responde a una pregunta normativa (cómo se rindió cuenta) y el analítico a una económica (cuánto capital hay inmovilizado y cuánto resultado recurrente genera). Las demás opciones confunden auditoría, síntesis o formato con la transformación económica que hace el analista.',
    },
    {
      id: 'q2',
      pregunta: 'El coeficiente de reexpresión de una partida no monetaria se calcula como:',
      opciones: [
        'Índice de origen ÷ Índice de cierre.',
        'Índice de cierre ÷ Índice de origen.',
        'Inflación del período × Valor de libros.',
        '(Índice de cierre − Índice de origen) ÷ 100.',
      ],
      correcta: 1,
      justificacion:
        'La reexpresión lleva la partida a moneda de cierre multiplicándola por índice de cierre ÷ índice de origen (siempre ≥ 1 bajo inflación). La opción invertida achicaría los valores; las otras dos no reconstruyen el poder adquisitivo de cierre.',
    },
    {
      id: 'q3',
      pregunta: 'Una empresa mantiene una posición monetaria neta ACTIVA (activos monetarios > pasivos monetarios) durante un período inflacionario. El RECPAM será:',
      opciones: [
        'Una ganancia, porque la caja rinde intereses.',
        'Nulo, porque las partidas monetarias no se reexpresan.',
        'Una pérdida, por la exposición de activos monetarios a la caída del poder adquisitivo.',
        'Indeterminado sin conocer el tipo de cambio.',
      ],
      correcta: 2,
      justificacion:
        'Mantener activos monetarios bajo inflación erosiona su poder adquisitivo: PMN activa genera pérdida (RECPAM negativo). Que las monetarias no se reexpresen no elimina el resultado por exposición; justamente por eso existe el RECPAM.',
    },
    {
      id: 'q4',
      pregunta: '¿Por qué los bienes de uso se valúan a valor de mercado en el estado analítico y no a valor de origen menos amortizaciones?',
      opciones: [
        'Porque la norma contable lo exige para todas las empresas.',
        'Porque el valor de libros mide asignación de costo, no capital inmovilizado, y subvalúa el capital inflando el ROIC.',
        'Porque el valor de mercado siempre es menor y conviene ser conservador.',
        'Porque así se paga menos impuesto a las ganancias.',
      ],
      correcta: 1,
      justificacion:
        'El valor de libros responde a la asignación del costo en el tiempo, no a medir el capital efectivamente inmovilizado. Un activo amortizado que sigue produciendo subvalúa el denominador del ROIC y lo infla artificialmente. No es una exigencia normativa contable ni un criterio fiscal.',
    },
    {
      id: 'q5',
      pregunta: 'El disparador de la reexpresión obligatoria fijado por la FACPCE (JG 539/2018) es:',
      opciones: [
        'Inflación mensual mayor al 4 %.',
        'Cualquier nivel de inflación, siempre es obligatoria.',
        'Inflación acumulada superior al 100 % en tres años.',
        'Una devaluación mayor al 20 % en el ejercicio.',
      ],
      correcta: 2,
      justificacion:
        'El criterio, alineado con NIC 29, es el 100 % acumulado en tres años. No depende de un umbral mensual, de la devaluación puntual ni es incondicionalmente obligatoria en cualquier contexto.',
    },
    {
      id: 'q6',
      pregunta: 'En la normalización de una empresa familiar, si el dueño-gerente cobra un sueldo muy por debajo del de mercado, el resultado operativo reportado está:',
      opciones: [
        'Subestimado; hay que sumar la diferencia al resultado.',
        'Sobreestimado; hay que reconocer la retribución de mercado, lo que reduce el EBIT normalizado.',
        'Correcto; el sueldo del dueño no afecta el resultado.',
        'Sobreestimado, pero no se ajusta porque es una decisión del dueño.',
      ],
      correcta: 1,
      justificacion:
        'Si el costo laboral real (de mercado) es mayor que el contabilizado, el resultado está inflado. La normalización reconoce la retribución de mercado y baja el EBIT normalizado, para medir la capacidad recurrente con independencia de la decisión personal del dueño.',
    },
    {
      id: 'q7',
      pregunta: '¿Cuál de estas afirmaciones sobre el Estado de Flujo de Efectivo es correcta?',
      opciones: [
        'El EFE es equivalente al FCFF y puede descontarse directamente para valuar.',
        'El EFE es un estado histórico y prueba de veracidad de los otros estados; NO es el FCFF.',
        'El EFE solo se construye por método indirecto.',
        'El EFE es el estado más fácil de manipular contablemente.',
      ],
      correcta: 1,
      justificacion:
        'El EFE es histórico, verificable contra extractos y sirve para validar los otros estados, pero no es el flujo de fondos libre de la valuación: hay que construir un puente explícito. Puede armarse por método directo o indirecto (con conciliación), y es de los más difíciles de manipular, no de los más fáciles.',
    },
    {
      id: 'q8',
      pregunta: 'La fórmula del capital empleado (enfoque operativo) usada en el programa es:',
      opciones: [
        'Activo total − Pasivo total.',
        'Cuentas por cobrar + Bienes de cambio − Proveedores + Bienes de uso.',
        'Patrimonio neto + Deuda financiera + Caja.',
        'Ventas ÷ Rotación de activos.',
      ],
      correcta: 1,
      justificacion:
        'El enfoque operativo suma el capital de trabajo operativo (CxC + bienes de cambio − proveedores) y los bienes de uso a valor de mercado, excluyendo caja excedente y activos no operativos. Las otras opciones son el patrimonio contable, una identidad de financiamiento o una relación ajena al capital invertido.',
    },
    {
      id: 'q9',
      pregunta: 'Una empresa muestra utilidad creciente pero flujo operativo decreciente de forma persistente. ¿Qué señala esto?',
      opciones: [
        'Excelente gestión: está reinvirtiendo todo el efectivo.',
        'Una posible alerta de calidad de ganancias: el resultado devengado se separa del efectivo.',
        'Nada relevante: son dos estados independientes.',
        'Que la empresa está desendeudándose.',
      ],
      correcta: 1,
      justificacion:
        'La divergencia persistente entre resultado devengado y flujo operativo es una señal clásica de baja calidad de ganancias (Penman). No es prueba de buena gestión ni algo irrelevante, y no se deduce de ahí un desendeudamiento.',
    },
    {
      id: 'q10',
      pregunta: 'En el caso de Maderas del Litoral, ¿por qué el ROIC contable sobreestima la eficiencia real del capital?',
      opciones: [
        'Porque el EBIT contable es menor que el normalizado.',
        'Porque la planta amortizada (valor de libros bajo) subvalúa el capital y los rubros están a valor nominal.',
        'Porque la tasa impositiva es demasiado alta.',
        'Porque los proveedores no se restan del capital.',
      ],
      correcta: 1,
      justificacion:
        'Con bienes de uso a valor de libros (900) el denominador del ROIC queda muy chico frente al valor de mercado (6.800), y los bienes de cambio sin reexpresar también lo achican: el ROIC contable sube sin que la eficiencia real cambie. El EBIT normalizado, de hecho, baja por el sueldo de mercado; la tasa y los proveedores no explican la distorsión.',
    },
    {
      id: 'q11',
      pregunta: 'Las seis familias del catálogo de adecuaciones se aplican en un orden que NO es indiferente. ¿Por qué se empieza por la Familia A (unidad de medida)?',
      opciones: [
        'Por costumbre; el orden en realidad da igual.',
        'Porque homogeneizar la moneda es condición para que las correcciones de valor, pasivos y resultados sean coherentes.',
        'Porque es la familia más fácil y conviene empezar por lo simple.',
        'Porque la norma numera las familias alfabéticamente.',
      ],
      correcta: 1,
      justificacion:
        'Si no se homogeneiza primero la moneda, todas las adecuaciones posteriores (B a F) mezclan pesos de distinto poder adquisitivo y quedan contaminadas. El orden es sustantivo, no una convención ni una cuestión de dificultad.',
    },
    {
      id: 'q12',
      pregunta: 'Una ganancia grande por RECPAM (posición monetaria pasiva) en un ejercicio inflacionario debe interpretarse como:',
      opciones: [
        'Rentabilidad operativa genuina que puede proyectarse hacia el futuro.',
        'Una transferencia de valor desde los acreedores por licuación de deuda, no rentabilidad operativa.',
        'Un error contable que hay que corregir eliminándolo.',
        'Una señal de que la empresa tiene demasiada caja.',
      ],
      correcta: 1,
      justificacion:
        'La ganancia por RECPAM en posición pasiva proviene de licuar deuda con pesos más baratos: es real pero no es rentabilidad operativa y desaparece si baja la inflación. No es un error a eliminar ni indica exceso de caja (eso sería posición activa).',
    },
    {
      id: 'q13',
      pregunta: 'Sobre el método directo y el indirecto del EFE, ¿qué es correcto?',
      opciones: [
        'Son excluyentes: elegido uno, el otro no puede calcularse.',
        'La norma exige conciliación entre ambos, y el método directo reconstruye cobranzas y pagos efectivos.',
        'El método indirecto parte de las cobranzas reales.',
        'El método directo parte del resultado neto.',
      ],
      correcta: 1,
      justificacion:
        'El directo reconstruye cobros y pagos efectivos; el indirecto parte del resultado y revierte partidas no erogables; la norma pide conciliar ambos. Las otras opciones invierten las definiciones o los presentan como excluyentes.',
    },
    {
      id: 'q14',
      pregunta: 'Un alquiler pagado a una sociedad de los mismos dueños por encima del valor de mercado, ¿cómo se trata en la normalización?',
      opciones: [
        'Se deja como está: es un gasto real que la empresa paga.',
        'Se lleva a valor de mercado; el exceso pagado se recompone al resultado (lo aumenta).',
        'Se elimina por completo el alquiler del resultado.',
        'Se suma el exceso al capital invertido.',
      ],
      correcta: 1,
      justificacion:
        'Las operaciones con partes relacionadas se llevan a valor de mercado; si se pagaba de más, ese exceso no es un costo genuino del negocio y se recompone al resultado. No se elimina el alquiler entero (a mercado sí existe un costo) ni afecta el capital invertido.',
    },
    {
      id: 'q15',
      pregunta: '¿Cuál es la razón de fondo por la que esta asignatura es la raíz del “mapa de generadores de valor”?',
      opciones: [
        'Porque es la primera en el orden cronológico del plan.',
        'Porque el estado analítico y el capital empleado que produce son el insumo de todos los indicadores posteriores (ROIC, spread, EVA, valuación).',
        'Porque es la única con trabajo práctico.',
        'Porque enseña a usar Excel.',
      ],
      correcta: 1,
      justificacion:
        'Todos los indicadores del programa se calculan sobre el NOPAT y el capital empleado construidos aquí; un error en la depuración se propaga a todo el árbol de valor. No se trata de mera cronología, ni es la única con práctica, ni su objeto es Excel (eso es la 2.3).',
    },
    {
      id: 'q16',
      pregunta: 'Sumar pesos de enero con pesos de diciembre bajo inflación es incorrecto porque:',
      opciones: [
        'Los meses tienen distinta cantidad de días.',
        'Son unidades de distinto poder adquisitivo; hay que homogeneizar antes de sumar.',
        'La suma siempre da error de redondeo.',
        'El fisco no lo permite.',
      ],
      correcta: 1,
      justificacion:
        'Bajo inflación, un peso de enero y uno de diciembre valen distinto; sumarlos mezcla unidades. La reexpresión a moneda de cierre es la precondición de toda suma o comparación (Fowler Newton).',
    },
    {
      id: 'q17',
      pregunta: '¿Cuál de estas partidas NO se reexpresa por inflación?',
      opciones: [
        'Los bienes de cambio.',
        'Las cuentas por cobrar en pesos (partida monetaria).',
        'Los bienes de uso.',
        'Los aportes de capital.',
      ],
      correcta: 1,
      justificacion:
        'Las partidas monetarias (caja, créditos y deudas en pesos) ya están en moneda de cierre y no se reexpresan; en cambio generan RECPAM. Las no monetarias (bienes de cambio, de uso, aportes) sí se reexpresan.',
    },
    {
      id: 'q18',
      pregunta: 'Una empresa con más pasivos monetarios que activos monetarios, bajo inflación, tiene un RECPAM:',
      opciones: [
        'Negativo (pérdida).',
        'Positivo (ganancia por licuación de deuda).',
        'Nulo.',
        'Imposible de calcular.',
      ],
      correcta: 1,
      justificacion:
        'Posición monetaria neta pasiva → la deuda se licúa y hay ganancia (RECPAM positivo). Es real pero no es rentabilidad operativa: desaparece si baja la inflación.',
    },
    {
      id: 'q19',
      pregunta: 'La Familia A del catálogo de adecuaciones (unidad de medida) corrige, entre otros:',
      opciones: [
        'La valuación de los bienes de uso.',
        'La reexpresión en moneda homogénea y la segregación del RECPAM.',
        'La remuneración de los socios.',
        'La deuda fuera de balance.',
      ],
      correcta: 1,
      justificacion:
        'La Familia A homogeneiza la moneda (reexpresión, RECPAM, tipo de cambio). La valuación de activos es Familia B, los resultados Familia D y los pasivos ocultos Familia C.',
    },
    {
      id: 'q20',
      pregunta: 'Los cheques descontados con responsabilidad y el factoring con recurso son ejemplos de:',
      opciones: [
        'Ingresos no recurrentes.',
        'Deuda fuera de balance (Familia C — pasivos).',
        'Activos no operativos.',
        'Reexpresión.',
      ],
      correcta: 1,
      justificacion:
        'Son pasivos ocultos: si el librador no paga, la empresa responde. La Familia C los reconoce como deuda equivalente. No son ingresos ni activos.',
    },
    {
      id: 'q21',
      pregunta: 'Reconocer la remuneración de mercado del socio-gerente pertenece a la familia de adecuaciones:',
      opciones: [
        'A — unidad de medida.',
        'D — resultados.',
        'F — verificación.',
        'E — estructura y perímetro.',
      ],
      correcta: 1,
      justificacion:
        'La normalización del resultado (retribución de mercado, gastos personales, partes relacionadas, partidas no recurrentes) es la Familia D. Las otras familias corrigen moneda, verificación o perímetro.',
    },
    {
      id: 'q22',
      pregunta: 'La conciliación línea por línea entre el balance publicado y el estado analítico (Familia F) sirve para:',
      opciones: [
        'Pagar menos impuestos.',
        'Que el trabajo sea auditable y reproducible por un tercero.',
        'Aumentar el patrimonio.',
        'Evitar la reexpresión.',
      ],
      correcta: 1,
      justificacion:
        'La Familia F documenta fuente, fecha y criterio de cada ajuste y concilia línea por línea: convierte la depuración en algo auditable. No tiene fin fiscal ni patrimonial.',
    },
    {
      id: 'q23',
      pregunta: 'El método directo del Estado de Flujo de Efectivo se caracteriza por:',
      opciones: [
        'Partir del resultado neto y revertir partidas no erogables.',
        'Reconstruir cobranzas y pagos efectivos.',
        'No requerir conciliación.',
        'Ser el único válido bajo inflación.',
      ],
      correcta: 1,
      justificacion:
        'El directo reconstruye cobros y pagos reales (el ejercicio que después se repite contra el ERP). Partir del resultado y revertir es el indirecto; la norma exige conciliar ambos.',
    },
    {
      id: 'q24',
      pregunta: 'Entre los métodos de revalúo de bienes de uso, el “último recurso” cuando no hay mercado de referencia es:',
      opciones: [
        'La tasación técnica.',
        'El valor de uso (valor presente de los flujos que genera el activo).',
        'El mercado secundario.',
        'El valor de reposición depreciado.',
      ],
      correcta: 1,
      justificacion:
        'El valor de uso se emplea cuando no hay mercado y exige declarar los supuestos. La tasación, el mercado secundario y el valor de reposición son preferibles por más objetivos.',
    },
    {
      id: 'q25',
      pregunta: 'En el capital empleado, la caja se trata:',
      opciones: [
        'Toda como capital operativo.',
        'Separando la caja operativa mínima (operativa) del excedente de caja (no operativo).',
        'Toda como excedente.',
        'Se excluye por completo.',
      ],
      correcta: 1,
      justificacion:
        'Solo la caja operativa mínima integra el capital invertido operativo; el excedente se trata como activo no operativo y se valúa aparte. Mezclarlas distorsiona el ROIC.',
    },
    {
      id: 'q26',
      pregunta: 'El criterio de reexpresión obligatoria (JG 539/2018) se activa cuando la inflación acumulada en tres años supera:',
      opciones: ['El 25%.', 'El 100%.', 'El 10%.', 'El 300%.'],
      correcta: 1,
      justificacion:
        'El umbral, alineado con NIC 29, es el 100% acumulado en tres años. No es un porcentaje mensual ni otro nivel.',
    },
    {
      id: 'q27',
      pregunta: 'La reexpresión de la RT 6 es conceptualmente equivalente a:',
      opciones: [
        'La NIC 7 (flujo de efectivo).',
        'La NIC 29 (información financiera en economías hiperinflacionarias).',
        'La NIIF 9.',
        'La RT 37 (auditoría).',
      ],
      correcta: 1,
      justificacion:
        'RT 6 ≡ NIC 29: ambas reexpresan en moneda constante bajo alta inflación. La NIC 7 es flujo de efectivo y la RT 37 es auditoría.',
    },
    {
      id: 'q28',
      pregunta: 'Que el flujo operativo se separe de forma persistente del EBITDA es señal de:',
      opciones: [
        'Excelente calidad de ganancias.',
        'Posible baja calidad de ganancias (a vigilar).',
        'Un error de tipeo.',
        'Exceso de caja.',
      ],
      correcta: 1,
      justificacion:
        'La divergencia persistente entre flujo operativo y EBITDA cuestiona la calidad del resultado devengado. Es alerta, no señal de excelencia ni de exceso de caja.',
    },
    {
      id: 'q29',
      pregunta: 'En la PyME familiar, “consolidar el grupo económico real” (Familia E) responde a que:',
      opciones: [
        'La sociedad jurídica siempre coincide con la unidad económica.',
        'La unidad de análisis rara vez coincide con una sola sociedad jurídica.',
        'Hay que sumar empresas al azar.',
        'La consolidación es opcional.',
      ],
      correcta: 1,
      justificacion:
        'En la empresa cerrada la operación suele repartirse en varias sociedades del mismo dueño; la unidad de análisis es el grupo económico real, no una sociedad aislada.',
    },
    {
      id: 'q30',
      pregunta: 'Los gastos de I+D o de capacitación con carácter de inversión, no reconocidos como activo, se tratan en:',
      opciones: [
        'Familia A — unidad de medida.',
        'Familia B — valuación de activos (intangibles autogenerados / gastos con carácter de inversión).',
        'Familia F — verificación.',
        'No se ajustan.',
      ],
      correcta: 1,
      justificacion:
        'La Familia B contempla intangibles autogenerados y gastos con carácter de inversión (I+D, publicidad institucional, capacitación) que el análisis puede activar. No es unidad de medida ni verificación.',
    },
  ],
  bibliografia: [
    'Palepu, K. & Healy, P. — *Business Analysis and Valuation*',
    'Fowler Newton, E. — *Análisis de Estados Contables* y *Contabilidad Superior*',
    'FACPCE — RT 6, RT 54 e Informes del CENCyA; Resolución JG 539/2018',
    'Trugman, G. — *Understanding Business Valuation* (AICPA)',
    'Damodaran, A. — *The Dark Side of Valuation*',
    'Penman, S. — *Financial Statement Analysis and Security Valuation*',
    'IASB — *NIIF para las PYMES* · NIC 29',
    'Miller, W. — *Value Maps*',
  ],
}
