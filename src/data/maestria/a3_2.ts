import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 3.2 — Aprendizaje Automático y Aprendizaje Profundo Aplicados a
// Finanzas Corporativas
// ============================================================================
export const a3_2: Asignatura = {
  cod: '3.2',
  slug: 'a3-2',
  cuatrimestre: 3,
  fase: 'Predictiva · ¿Qué es probable que ocurra?',
  nombre: 'Aprendizaje Automático y Aprendizaje Profundo Aplicados a Finanzas Corporativas',
  horas: '36 h · 14 teóricas / 22 prácticas',
  correlativas: 'Correlativa: 1.3 · Tercer cuatrimestre',
  framework: 'Géron · Hastie/Tibshirani · López de Prado',
  resumen:
    'Aplicar aprendizaje automático a problemas de finanzas corporativas —predicción de mora, demanda y quiebra— con conciencia de sus supuestos, del sobreajuste y de la exigencia de interpretabilidad que impone la decisión financiera.',
  objetivos: [
    'Distinguir aprendizaje supervisado, no supervisado y por refuerzo, y elegir el modelo según el problema.',
    'Entrenar y validar modelos evitando el sobreajuste, con partición y validación cruzada.',
    'Evaluar clasificadores con las métricas correctas (matriz de confusión, AUC, precisión/recall).',
    'Exigir interpretabilidad: en finanzas, un modelo que no se puede explicar no se puede usar para decidir.',
  ],
  sections: [
    {
      title: 'El mapa del aprendizaje automático',
      intro: 'Antes del algoritmo, el tipo de problema. La elección del modelo se deriva de la pregunta, no de la moda.',
      blocks: [
        { t: 'ul', items: [
          '**Supervisado:** se aprende de ejemplos etiquetados. Regresión (predecir un número: demanda, ventas) y clasificación (predecir una clase: paga / no paga).',
          '**No supervisado:** se buscan estructuras sin etiquetas. Segmentación de clientes (clustering), detección de anomalías (fraude).',
          '**Por refuerzo:** se aprende de la interacción con un entorno mediante recompensas. Menos frecuente en finanzas corporativas.',
        ] },
        { t: 'p', md: 'Los modelos van de los **lineales** (regresión logística, interpretable y robusta) a los **ensambles de árboles** (random forest, *gradient boosting* como XGBoost, potentes y no lineales) y las **redes neuronales** (aprendizaje profundo, para patrones complejos y datos no estructurados).' },
        { t: 'idea', md: 'La navaja de Occam financiera: empezá por el modelo más simple que resuelva el problema. Un modelo lineal interpretable que un directorio entiende suele ser preferible a un ensamble opaco que gana 1 % de precisión y nadie puede explicar.' },
      ],
    },
    {
      title: 'Entrenar sin engañarse: sobreajuste y validación',
      intro: 'El pecado capital del aprendizaje automático es memorizar en lugar de aprender.',
      blocks: [
        { t: 'ul', items: [
          '**Partición** en entrenamiento, validación y prueba. El modelo nunca se evalúa con datos que vio.',
          '**Sobreajuste (overfitting):** el modelo memoriza el ruido del entrenamiento y falla en datos nuevos. Se combate con **regularización** y modelos más simples.',
          '**Validación cruzada:** rotar el conjunto de validación para una estimación robusta del desempeño.',
        ] },
        { t: 'warn', md: 'En finanzas hay un sobreajuste especialmente traicionero: el **sesgo de anticipación** (usar información que no estaría disponible al momento de decidir) y el **data snooping** (probar mil modelos hasta que uno “funciona” por azar). López de Prado documenta cómo estos errores producen backtests brillantes y modelos inútiles.' },
      ],
    },
    {
      title: 'Evaluar un clasificador',
      intro: 'La exactitud (accuracy) sola miente, sobre todo con clases desbalanceadas como la mora.',
      blocks: [
        { t: 'formula', name: 'Matriz de confusión', expr: 'VP · FP · FN · VN  →  Precisión = VP/(VP+FP) · Recall = VP/(VP+FN)', where: 'VP verdaderos positivos · FP falsos positivos · FN falsos negativos · VN verdaderos negativos', note: 'Si solo el 3 % de los clientes cae en mora, un modelo que dice “nadie cae” acierta el 97 %… y es inútil. Por eso se miran precisión, recall y AUC.' },
        { t: 'p', md: 'El **AUC** (área bajo la curva ROC) mide la capacidad de ordenar el riesgo con independencia del umbral. La elección del **umbral de corte** es una decisión de negocio: depende del costo de un falso positivo (rechazar a un buen cliente) frente al de un falso negativo (aprobar a uno que no paga).' },
      ],
    },
    {
      title: 'Interpretabilidad y gobierno del modelo',
      intro: 'En finanzas, la caja negra es un pasivo. Explicar por qué el modelo decide es parte del producto.',
      blocks: [
        { t: 'p', md: 'Técnicas como **SHAP** e **importancia de variables** abren la caja negra: muestran cuánto pesa cada factor en cada decisión. Un modelo de crédito debe poder explicar por qué rechazó a un cliente —lo exige la ética, y muchas veces la regulación—.' },
        { t: 'quote', author: 'Marcos López de Prado', credential: 'Advances in Financial Machine Learning', md: 'La mayoría de los descubrimientos en finanzas cuantitativas son falsos positivos. El rigor —validación adecuada, control del data snooping, comprensión del modelo— es lo que separa la ciencia del autoengaño.' },
        { t: 'idea', md: 'La conexión con el resto del programa: la red neuronal se construyó a mano en Excel (2.3) para desmitificarla; acá se usa en serio, pero con la misma disciplina de auditar y explicar. La potencia sin interpretabilidad no es un activo en finanzas: es un riesgo.' },
      ],
    },
    {
      title: 'El zoológico de modelos: de lo lineal a lo profundo',
      intro: 'Elegir el modelo es elegir un lugar en el compromiso entre potencia e interpretabilidad. Conocer el menú evita usar un bazooka para matar una mosca —o al revés—.',
      blocks: [
        { t: 'table', title: 'Modelos y su compromiso', headers: ['Familia', 'Potencia', 'Interpretabilidad'], firstColLeft: true, rows: [
          ['Regresión lineal / logística', 'Baja–media', 'Alta (cada coeficiente se lee)'],
          ['Árboles de decisión', 'Media', 'Alta (reglas explícitas)'],
          ['Random Forest', 'Alta', 'Media (importancia de variables)'],
          ['Gradient Boosting (XGBoost)', 'Muy alta', 'Media–baja (requiere SHAP)'],
          ['Redes neuronales (deep learning)', 'Máxima (datos no estructurados)', 'Baja (caja negra)'],
        ], caption: 'La navaja de Occam financiera: empezá por el modelo más simple que resuelva el problema. Un modelo lineal interpretable que el directorio entiende suele ser preferible a un ensamble opaco que gana 1 % de precisión y nadie puede explicar.' },
        { t: 'p', md: 'El **compromiso sesgo-varianza** guía la elección: modelos muy flexibles (redes profundas) reducen el sesgo pero disparan la varianza (sobreajuste); modelos simples (lineales) tienen más sesgo pero generalizan mejor con pocos datos. En finanzas corporativas —donde los datos suelen ser escasos y ruidosos— la simplicidad interpretable suele ganar.' },
        { t: 'quote', author: 'Trevor Hastie & Robert Tibshirani', credential: 'The Elements of Statistical Learning', md: 'La flexibilidad de un modelo es un arma de doble filo: reduce el error en los datos que ya viste y lo aumenta en los nuevos. El arte de la estadística es encontrar el punto de equilibrio.' },
      ],
    },
    {
      title: 'Validar sin engañarse: el pecado capital del ML financiero',
      intro: 'En finanzas, validar mal es peor que no validar: da falsa confianza. Los errores de validación producen modelos que brillan en el backtest y fracasan en producción.',
      blocks: [
        { t: 'ul', items: [
          '**Sesgo de anticipación (look-ahead bias):** usar información que no estaría disponible al momento de decidir. Un modelo que "predice" la mora usando datos que solo se conocen después es inútil en la práctica.',
          '**Data snooping:** probar mil modelos hasta que uno "funciona" por azar. Con suficientes intentos, siempre aparece un falso positivo.',
          '**Fuga de datos (data leakage):** que información del conjunto de prueba se filtre al entrenamiento (por ejemplo, normalizar con la media de todo el dataset).',
          '**Ignorar la estructura temporal:** en datos financieros, mezclar aleatoriamente pasado y futuro rompe la validez. Hay que validar respetando el orden temporal.',
        ] },
        { t: 'idea', md: 'La regla de oro: la **matriz de confusión y el AUC** cuentan la verdad que la exactitud esconde. Si solo el 3 % de los clientes cae en mora, un modelo que dice "nadie cae" acierta el 97 %… y es completamente inútil. Por eso se miran precisión, recall y AUC, y se elige el umbral de corte según el costo real de un falso positivo (rechazar a un buen cliente) frente al de un falso negativo (aprobar a uno que no paga).' },
        { t: 'quote', author: 'Marcos López de Prado', credential: 'Cornell / ADIA', md: 'El backtest overfitting es la principal causa de estrategias que fallan en producción. La solución no es más datos ni modelos más complejos: es rigor en la validación y honestidad sobre lo que el modelo realmente sabe.' },
      ],
    },
    {
      title: 'Interpretabilidad: abrir la caja negra',
      intro: 'En finanzas, un modelo que no se puede explicar no se puede usar para decidir. La interpretabilidad no es un lujo: es un requisito.',
      blocks: [
        { t: 'p', md: 'Técnicas como **SHAP** (Shapley Additive Explanations) y la **importancia de variables** atribuyen la decisión a cada factor: muestran cuánto pesó la utilización del límite, los atrasos o la antigüedad en el rechazo de un cliente concreto. Un modelo de crédito debe poder responder "¿por qué me rechazaron?" —lo exige la ética y, cada vez más, la regulación—.' },
        { t: 'idea', md: 'El compromiso central: los modelos más potentes (ensambles, redes profundas) son los menos interpretables. La navaja de Occam financiera sugiere empezar por el modelo más simple que resuelva el problema. Una regresión logística que el directorio entiende y puede defender suele ser preferible a un ensamble opaco que gana 1 % de AUC y que nadie puede explicar cuando un cliente reclama.' },
        { t: 'quote', author: 'Aurélien Géron', credential: 'Hands-On Machine Learning', md: 'En dominios de alto riesgo —crédito, salud, justicia— la interpretabilidad puede importar más que la exactitud. Un modelo un poco menos preciso pero explicable y auditable es, muchas veces, la elección profesional correcta.' },
      ],
    },
    {
      title: 'El pipeline de un proyecto de ML financiero',
      intro: 'El algoritmo de moda importa mucho menos que la disciplina del proceso. Un buen pipeline es 80 % datos y validación, 20 % modelo.',
      blocks: [
        { t: 'steps', title: 'Las etapas de un proyecto honesto', items: [
          { k: 'Definir el problema', d: 'Qué se predice, con qué datos disponibles al momento de decidir, y cuál es el costo de cada tipo de error.' },
          { k: 'Preparar los datos', d: 'Limpieza, feature engineering, y partición respetando la estructura temporal.' },
          { k: 'Entrenar y validar', d: 'Con validación cruzada, cuidando el sobreajuste y el data snooping.' },
          { k: 'Evaluar con la métrica correcta', d: 'Matriz de confusión, precisión, recall y AUC —no solo la exactitud, que engaña con clases desbalanceadas—.' },
          { k: 'Interpretar y monitorear', d: 'Explicar las decisiones y vigilar el desempeño en producción, porque los modelos se degradan con el tiempo.' },
        ] },
        { t: 'warn', md: 'El error que arruina proyectos aparentemente exitosos: el **data leakage** —que información del futuro o del conjunto de prueba se filtre al entrenamiento—. Produce un desempeño brillante en el laboratorio y un fracaso en producción. La disciplina de separar rigurosamente los datos es lo que distingue la ciencia del autoengaño.' },
        { t: 'quote', author: 'Marcos López de Prado', credential: 'Advances in Financial Machine Learning', md: 'En finanzas, la mayoría de los descubrimientos son falsos positivos. No por falta de datos ni de potencia de cómputo, sino por falta de rigor metodológico. El proceso, no el algoritmo, es donde se gana o se pierde.' },
      ],
    },
  ],
  expertos: [
    { author: 'Aurélien Géron', credential: 'Hands-On Machine Learning', md: 'El flujo real de un proyecto de ML es 80 % preparación de datos y validación honesta, 20 % modelo. El algoritmo de moda importa mucho menos que la disciplina del proceso.' },
    { author: 'Marcos López de Prado', credential: 'Cornell / ADIA', md: 'En finanzas, validar mal es peor que no validar: da falsa confianza. El backtest overfitting es la principal causa de estrategias que fallan en producción.' },
    { author: 'Trevor Hastie & Robert Tibshirani', credential: 'The Elements of Statistical Learning', md: 'Existe un compromiso ineludible entre sesgo y varianza: modelos muy flexibles reducen el sesgo pero disparan la varianza. El arte está en el punto medio.' },
  ],
  caso: {
    titulo: 'Scoring de riesgo crediticio de la cartera',
    empresa: 'Maderas del Litoral S.A. — ¿a quién le vendo a crédito?',
    contexto:
      'Maderas del Litoral vende a plazo a corralones y constructoras. La mora ata capital de trabajo (asignatura 2.4) y a veces se vuelve incobrable. El área comercial decide a ojo a quién dar crédito y con qué límite.\n\nEl consultor propone un **modelo de scoring**: una regresión logística que, a partir de unas pocas variables por cliente (antigüedad, utilización del límite, atrasos recientes, exposición relativa), estima la probabilidad de default y sugiere aprobar, revisar o rechazar. Se entrena, se evalúa con la matriz de confusión y —clave— se explica: cada rechazo tiene un porqué.\n\nEl entregable respeta la regla del programa: un modelo que el directorio no entiende no se aprueba.',
    datos: [
      { t: 'table', title: 'Coeficientes del modelo (logit) y umbrales', headers: ['Elemento', 'Valor'], firstColLeft: true, rows: [
        ['Intercepto (b₀)', '−1,50'],
        ['Antigüedad del cliente (años)', '−0,30'],
        ['Utilización del límite', '2,50'],
        ['Atrasos recientes (cantidad)', '1,20'],
        ['Exposición relativa', '1,00'],
        ['Umbral “Revisar”', 'PD > 30%'],
        ['Umbral “Rechazar”', 'PD > 55%'],
      ] },
    ],
    consigna: [
      '¿Cuál es la probabilidad de default (PD) de cada cliente según el modelo?',
      '¿Qué decisión (aprobar/revisar/rechazar) sugiere cada PD?',
      '¿Cuál es la exactitud del modelo contra la mora efectiva observada (matriz de confusión)?',
      '¿Por qué la interpretabilidad del modelo es condición para usarlo en la decisión de crédito?',
    ],
    metodologia: [
      { k: 'Puntuar (logit)', d: 'z = Xβ + b₀ para cada cliente (MMULT de la matriz de features por los coeficientes).' },
      { k: 'Convertir a PD', d: 'PD = 1/(1+e^−z) (función sigmoide).' },
      { k: 'Decidir', d: 'Aplicar los umbrales de negocio (aprobar/revisar/rechazar).' },
      { k: 'Evaluar', d: 'Matriz de confusión y exactitud contra la mora observada.' },
      { k: 'Explicar', d: 'Mostrar el aporte de cada variable a la decisión.' },
    ],
  },
  model: {
    sheetTitle: 'Scoring crediticio de la cartera (regresión logística con MMULT)',
    intro:
      'Editá los coeficientes y umbrales (celdas marfil). El score de cada cliente se calcula con MMULT (features × coeficientes) y la sigmoide; una sola fórmula derrama toda la cartera con su PD y decisión, y se computa la exactitud contra la mora observada.',
    inputs: [
      { key: 'b0', label: 'Intercepto (b₀)', value: -1.5, fmt: 'num2' },
      { key: 'cAnt', label: 'Coef. antigüedad', value: -0.30, fmt: 'num2' },
      { key: 'cUtil', label: 'Coef. utilización del límite', value: 2.50, fmt: 'num2' },
      { key: 'cAtr', label: 'Coef. atrasos recientes', value: 1.20, fmt: 'num2' },
      { key: 'cExp', label: 'Coef. exposición relativa', value: 1.00, fmt: 'num2' },
      { key: 'thrRev', label: 'Umbral “Revisar” (PD >)', value: 0.30, fmt: 'pct' },
      { key: 'thrRech', label: 'Umbral “Rechazar” (PD >)', value: 0.55, fmt: 'pct' },
    ],
    calcs: [
      { key: 'accuracy', label: 'Exactitud del modelo (vs mora observada)', xl: '=LET(X,{2,0.30,0,0.20;1,0.85,2,0.60;5,0.20,0,0.15;3,0.95,3,0.80;8,0.10,0,0.05;2,0.70,1,0.45;1,0.60,0,0.35;4,0.40,1,0.25}, real,{0;1;0;1;0;1;0;0}, z,MMULT(X,VSTACK([cAnt],[cUtil],[cAtr],[cExp]))+[b0], pd,1/(1+EXP(-z)), pred,IF(pd>0.5,1,0), AVERAGE(IF(pred=real,1,0)))', fmt: 'pct', highlight: true },
    ],
    spills: [
      {
        key: 'cartera',
        title: 'Scoring de la cartera (una fórmula: MMULT + sigmoide + decisión)',
        columns: ['Cliente', 'Score z', 'PD', 'Decisión', 'Mora real'],
        xl: '=LET(nom,{"Corralón Norte";"Constructora Sur";"Maderera Este";"Obras del Río";"Aberturas Centro";"Techos SA";"Pinos SRL";"Casa y Campo"}, X,{2,0.30,0,0.20;1,0.85,2,0.60;5,0.20,0,0.15;3,0.95,3,0.80;8,0.10,0,0.05;2,0.70,1,0.45;1,0.60,0,0.35;4,0.40,1,0.25}, real,{"No";"Sí";"No";"Sí";"No";"Sí";"No";"No"}, z,MMULT(X,VSTACK([cAnt],[cUtil],[cAtr],[cExp]))+[b0], pd,1/(1+EXP(-z)), dec,IF(pd>[thrRech],"Rechazar",IF(pd>[thrRev],"Revisar","Aprobar")), HSTACK(nom,z,pd,dec,real))',
        formats: [undefined, 'num2', 'pct', undefined, undefined],
        rows: 8,
        note: 'La matriz de features por los coeficientes (MMULT) da el score; la sigmoide lo convierte en PD; los umbrales deciden. Cambiá un coeficiente y toda la cartera se recalcula.',
      },
    ],
    conclusions: [
      { label: 'Desempeño', xl: '="Exactitud del modelo contra la mora observada: "&TEXT([accuracy],"0%")&". En cartera desbalanceada, mirar también precisión y recall, no solo la exactitud."' },
      { label: 'Gobierno', xl: '="Cada decisión debe poder explicarse por el aporte de sus variables (utilización, atrasos, antigüedad, exposición). Un scoring que no se explica no se usa para decidir crédito."' },
    ],
  },
  ejercicio: {
    titulo: 'Puntuar un cliente con la regresión logística',
    enunciado: 'Aplicá el modelo de scoring del caso a un cliente concreto y decidí si aprobar, revisar o rechazar.',
    datos: [
      { t: 'table', title: 'Cliente y modelo', headers: ['Elemento', 'Valor'], firstColLeft: true, rows: [
        ['Intercepto (b₀)', '−1,50'], ['Antigüedad (coef −0,30)', '3 años'], ['Utilización del límite (coef 2,50)', '0,80'], ['Atrasos recientes (coef 1,20)', '1'], ['Exposición relativa (coef 1,00)', '0,40'], ['Umbral Revisar / Rechazar', 'PD > 30% / 55%'],
      ] },
    ],
    preguntas: ['¿Cuál es el score z?', '¿Cuál es la PD y qué decisión sugiere?'],
    solucion: [
      { t: 'formula', name: 'Score z', expr: 'z = −1,5 + (−0,3×3) + (2,5×0,8) + (1,2×1) + (1,0×0,4) = −1,5 − 0,9 + 2,0 + 1,2 + 0,4 = 1,2' },
      { t: 'formula', name: 'Probabilidad de default', expr: 'PD = 1/(1+e^−1,2) = 1/(1+0,301) = 0,769 → 76,9%' },
      { t: 'idea', md: 'PD ≈ **77 % > 55 % → RECHAZAR**. Pesan la alta utilización del límite (0,80) y el atraso reciente. La decisión es explicable variable por variable, condición para usarla en crédito.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: 'Predecir si un cliente pagará o no (paga/no paga) es un problema de:', opciones: ['Regresión.', 'Clasificación supervisada.', 'Clustering.', 'Aprendizaje por refuerzo.'], correcta: 1, justificacion: 'Predecir una clase con datos etiquetados es clasificación supervisada. La regresión predice números; el clustering no usa etiquetas; el refuerzo aprende de recompensas.' },
    { id: 'q2', pregunta: 'El sobreajuste (overfitting) es:', opciones: ['Cuando el modelo generaliza muy bien.', 'Cuando el modelo memoriza el ruido del entrenamiento y falla en datos nuevos.', 'Un tipo de gráfico.', 'Falta de datos.'], correcta: 1, justificacion: 'Overfitting = ajustar el ruido en vez de la señal, con mal desempeño fuera de muestra. Es lo opuesto a generalizar bien.' },
    { id: 'q3', pregunta: '¿Por qué la exactitud (accuracy) sola engaña con la mora?', opciones: ['Porque es difícil de calcular.', 'Porque con clases desbalanceadas un modelo que dice “nadie cae” acierta mucho y es inútil.', 'Porque no existe.', 'Porque siempre da 100%.'], correcta: 1, justificacion: 'Si la mora es rara (3%), predecir “nadie cae” da 97% de exactitud pero no detecta a ningún moroso. Por eso se usan precisión, recall y AUC.' },
    { id: 'q4', pregunta: 'La función que convierte el score z en una probabilidad (0–1) en la regresión logística es:', opciones: ['La raíz cuadrada.', 'La sigmoide: 1/(1+e^−z).', 'El logaritmo.', 'La media.'], correcta: 1, justificacion: 'La sigmoide mapea cualquier z real a (0,1), interpretable como probabilidad. Las otras funciones no cumplen esa propiedad.' },
    { id: 'q5', pregunta: 'La validación cruzada sirve para:', opciones: ['Aumentar los datos.', 'Estimar el desempeño de forma robusta rotando el conjunto de validación.', 'Entrenar más rápido.', 'Eliminar variables.'], correcta: 1, justificacion: 'La validación cruzada rota qué datos se usan para validar, dando una estimación más estable del desempeño. No crea datos ni acelera el entrenamiento por sí sola.' },
    { id: 'q6', pregunta: 'El “data snooping” en finanzas consiste en:', opciones: ['Ordenar los datos.', 'Probar muchos modelos hasta que uno funciona por azar.', 'Limpiar valores faltantes.', 'Graficar series.'], correcta: 1, justificacion: 'Probar mil configuraciones y quedarse con la que “funcionó” genera falsos positivos por azar (López de Prado). No es ordenar ni limpiar datos.' },
    { id: 'q7', pregunta: 'El sesgo de anticipación (look-ahead bias) es:', opciones: ['Usar información que no estaría disponible al momento de decidir.', 'Predecir el pasado.', 'Un tipo de regularización.', 'Un gráfico de barras.'], correcta: 0, justificacion: 'Look-ahead bias = filtrar información futura en el entrenamiento, inflando el desempeño irrealmente. No es regularización ni un gráfico.' },
    { id: 'q8', pregunta: 'El AUC (área bajo la curva ROC) mide:', opciones: ['El costo del modelo.', 'La capacidad de ordenar el riesgo con independencia del umbral.', 'La cantidad de variables.', 'El tiempo de entrenamiento.'], correcta: 1, justificacion: 'El AUC evalúa qué tan bien el modelo ordena positivos sobre negativos sin fijar un umbral. No mide costo, cantidad de variables ni tiempo.' },
    { id: 'q9', pregunta: 'La elección del umbral de corte en un scoring de crédito es:', opciones: ['Puramente técnica.', 'Una decisión de negocio: depende del costo de un falso positivo vs. un falso negativo.', 'Siempre 0,5.', 'Irrelevante.'], correcta: 1, justificacion: 'El umbral balancea rechazar buenos clientes (FP) contra aprobar malos (FN); es una decisión de negocio, no un 0,5 universal.' },
    { id: 'q10', pregunta: 'En finanzas, ¿por qué importa la interpretabilidad del modelo?', opciones: ['Por estética.', 'Porque hay que explicar por qué se decide (ética, a veces regulación) y auditar el modelo.', 'Porque los modelos simples son siempre mejores.', 'No importa.'], correcta: 1, justificacion: 'Explicar una decisión de crédito es una exigencia ética y a menudo regulatoria; la caja negra es un pasivo. No es estética ni implica que lo simple siempre gane.' },
    { id: 'q11', pregunta: 'SHAP y la importancia de variables sirven para:', opciones: ['Entrenar más rápido.', 'Abrir la caja negra: mostrar cuánto pesa cada factor en la decisión.', 'Borrar datos.', 'Cambiar el umbral.'], correcta: 1, justificacion: 'Son técnicas de interpretabilidad que atribuyen la decisión a cada variable. No aceleran el entrenamiento ni borran datos.' },
    { id: 'q12', pregunta: 'El compromiso sesgo-varianza dice que:', opciones: ['Más flexibilidad siempre es mejor.', 'Modelos muy flexibles bajan el sesgo pero suben la varianza; hay un punto medio.', 'El sesgo y la varianza son lo mismo.', 'No existe.'], correcta: 1, justificacion: 'Aumentar la flexibilidad reduce el sesgo pero aumenta la varianza (y el sobreajuste); el arte está en equilibrarlos. No es que más flexibilidad siempre gane.' },
    { id: 'q13', pregunta: 'La “navaja de Occam financiera” sugiere:', opciones: ['Usar siempre el modelo más complejo.', 'Empezar por el modelo más simple que resuelva el problema.', 'No usar modelos.', 'Elegir por moda.'], correcta: 1, justificacion: 'Preferir la simplicidad interpretable frente a la complejidad opaca que gana marginalmente. No es rechazar modelos ni seguir modas.' },
    { id: 'q14', pregunta: 'Un ensamble de árboles (random forest, gradient boosting) es:', opciones: ['Un modelo lineal simple.', 'Un modelo no lineal potente, típicamente menos interpretable que una regresión.', 'Una hoja de cálculo.', 'Un tipo de gráfico.'], correcta: 1, justificacion: 'Los ensambles de árboles capturan no linealidades con gran poder predictivo, a costa de interpretabilidad. No son lineales ni un gráfico.' },
    { id: 'q15', pregunta: 'Según López de Prado, la principal causa de estrategias que fallan en producción es:', opciones: ['Usar Excel.', 'El backtest overfitting (validar mal, dando falsa confianza).', 'Tener demasiados datos.', 'La interpretabilidad.'], correcta: 1, justificacion: 'Validar mal produce backtests brillantes y modelos inútiles: es la causa central de fracasos. No se debe a Excel, al exceso de datos ni a explicar el modelo.' },
    { id: 'q16', pregunta: 'Segmentar clientes sin etiquetas previas es un problema de:', opciones: ['Clasificación supervisada.', 'Aprendizaje no supervisado (clustering).', 'Regresión.', 'Refuerzo.'], correcta: 1, justificacion: 'El clustering agrupa sin etiquetas: es aprendizaje no supervisado. La clasificación y la regresión son supervisadas.' },
    { id: 'q17', pregunta: 'Predecir la demanda (un número) es un problema de:', opciones: ['Clasificación.', 'Regresión.', 'Clustering.', 'Refuerzo.'], correcta: 1, justificacion: 'Predecir un valor numérico continuo es regresión. La clasificación predice clases; el clustering no usa etiquetas.' },
    { id: 'q18', pregunta: 'La regularización sirve para:', opciones: ['Aumentar el sobreajuste.', 'Penalizar la complejidad del modelo y combatir el sobreajuste.', 'Borrar datos.', 'Acelerar la GPU.'], correcta: 1, justificacion: 'La regularización penaliza modelos demasiado complejos, reduciendo el sobreajuste. No borra datos ni es un tema de hardware.' },
    { id: 'q19', pregunta: 'La partición en entrenamiento, validación y prueba busca:', opciones: ['Tener más datos.', 'Evaluar el modelo con datos que no vio y evitar el autoengaño.', 'Entrenar más rápido.', 'Eliminar variables.'], correcta: 1, justificacion: 'Separar los datos permite ajustar (train), elegir hiperparámetros (validación) y medir honestamente (test) con datos no vistos.' },
    { id: 'q20', pregunta: 'La precisión (precision) de un clasificador es:', opciones: ['VP/(VP+FN).', 'VP/(VP+FP).', 'VN/(VN+FP).', 'VP/Total.'], correcta: 1, justificacion: 'Precisión = VP/(VP+FP): de lo que predijo positivo, cuánto lo era. VP/(VP+FN) es el recall.' },
    { id: 'q21', pregunta: 'El recall (sensibilidad) es:', opciones: ['VP/(VP+FP).', 'VP/(VP+FN).', 'FP/(FP+VN).', 'VN/Total.'], correcta: 1, justificacion: 'Recall = VP/(VP+FN): de los positivos reales, cuántos detectó. Es clave con clases raras como la mora.' },
    { id: 'q22', pregunta: 'En un scoring de crédito, un falso positivo significa:', opciones: ['Aprobar a un cliente que no paga.', 'Rechazar a un cliente que sí pagaría (buen cliente).', 'Acertar.', 'No decidir.'], correcta: 1, justificacion: 'Si “positivo” es riesgo/rechazo, un falso positivo es rechazar a un buen cliente: costo de oportunidad. El falso negativo es aprobar a uno malo.' },
    { id: 'q23', pregunta: 'El “feature engineering” es:', opciones: ['Entrenar el modelo.', 'Construir y transformar las variables (features) que alimentan el modelo.', 'Graficar resultados.', 'Elegir el color.'], correcta: 1, justificacion: 'El feature engineering crea las variables informativas a partir de los datos crudos; suele pesar más que el algoritmo elegido.' },
    { id: 'q24', pregunta: 'En el scoring del caso, MMULT se usa para:', opciones: ['Ordenar clientes.', 'Multiplicar la matriz de features por el vector de coeficientes (el score z).', 'Borrar filas.', 'Formatear celdas.'], correcta: 1, justificacion: 'z = X·β se calcula con MMULT (features × coeficientes); luego la sigmoide lo convierte en probabilidad.' },
    { id: 'q25', pregunta: 'Un modelo de crédito debe poder explicar por qué rechaza a un cliente porque:', opciones: ['Es opcional.', 'Lo exige la ética y a menudo la regulación.', 'Mejora la GPU.', 'Reduce el AUC.'], correcta: 1, justificacion: 'La explicabilidad de una decisión de crédito es una exigencia ética y regulatoria; la caja negra es un pasivo.' },
    { id: 'q26', pregunta: 'El aprendizaje profundo (deep learning) es especialmente útil para:', opciones: ['Problemas triviales.', 'Patrones complejos y datos no estructurados (imágenes, texto).', 'Sumar dos números.', 'Nada.'], correcta: 1, justificacion: 'Las redes profundas capturan patrones complejos y datos no estructurados, a costa de interpretabilidad y datos. No se justifican para lo trivial.' },
    { id: 'q27', pregunta: 'El aprendizaje por refuerzo aprende de:', opciones: ['Etiquetas fijas.', 'La interacción con un entorno mediante recompensas.', 'Clustering.', 'Regresión.'], correcta: 1, justificacion: 'El refuerzo optimiza acciones según recompensas del entorno. Es menos frecuente en finanzas corporativas.' },
    { id: 'q28', pregunta: 'La curva ROC relaciona:', opciones: ['Ventas y costos.', 'La tasa de verdaderos positivos con la de falsos positivos a distintos umbrales.', 'Activo y pasivo.', 'Precio y volumen.'], correcta: 1, justificacion: 'La ROC traza TPR vs FPR variando el umbral; el área bajo ella (AUC) resume la capacidad de ordenar el riesgo.' },
    { id: 'q29', pregunta: 'Según Géron, la mayor parte del trabajo real de un proyecto de ML es:', opciones: ['Elegir el algoritmo de moda.', 'La preparación de datos y la validación honesta.', 'Comprar GPUs.', 'Hacer gráficos.'], correcta: 1, justificacion: 'La disciplina del proceso (datos + validación) pesa mucho más que el algoritmo de moda. Es donde se juega el resultado.' },
    { id: 'q30', pregunta: 'Con clases desbalanceadas (mora rara), conviene mirar:', opciones: ['Solo la exactitud.', 'Precisión, recall y AUC, además de la exactitud.', 'Solo el color.', 'Nada.'], correcta: 1, justificacion: 'La exactitud engaña con clases raras; precisión, recall y AUC dan una imagen honesta del desempeño.' },
  ],
  bibliografia: [
    'Géron, A. — *Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow*',
    'Hastie, T., Tibshirani, R. & Friedman, J. — *The Elements of Statistical Learning*',
    'López de Prado, M. — *Advances in Financial Machine Learning*',
    'James, Witten, Hastie & Tibshirani — *An Introduction to Statistical Learning*',
    'Goodfellow, Bengio & Courville — *Deep Learning*',
  ],
}
