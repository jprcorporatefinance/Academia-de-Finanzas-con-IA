import type { Lesson } from '../../types'

export const semana04: Lesson = {
  id: 'sem-04',
  week: 4,
  title: 'EVA y el spread ROIC − WACC: ganar plata y destruir valor a la vez',
  subtitle: 'Cómo una empresa puede estar bien contablemente y, al mismo tiempo, estar evaporando el capital de sus dueños',
  pillar: 'Construcción de Valor',
  durationMin: 60,
  objectives: [
    'Entender que la ganancia contable no garantiza la creación de valor.',
    'Introducir el WACC como el costo de todo el capital que financia la empresa.',
    'Comprender el spread ROIC − WACC como la verdadera medida de creación o destrucción de valor.',
    'Calcular el EVA de Andina y descubrir que destruye valor pese a tener ganancia neta.',
    'Salir con un criterio de decisión: solo crea valor el capital que rinde más de lo que cuesta.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'La trampa de la ganancia contable',
      body: `Llegamos al concepto que cambia para siempre cómo un CEO mira su empresa. La semana pasada calculamos que el ROIC de Andina ronda el **9%**. La pregunta que quedó abierta era: ¿9% es bueno o malo?

La contabilidad no puede responder esa pregunta, porque a la contabilidad le falta un dato fundamental: **cuánto cuesta el capital**. El Estado de Resultados resta el costo de la deuda (los intereses), pero **nunca resta el costo del capital propio**, el de los dueños. Para la contabilidad, la plata de los socios es "gratis". Y no lo es.

Acá está el quiebre: una empresa puede mostrar **ganancia neta positiva** y, al mismo tiempo, estar **destruyendo el valor de sus dueños**, porque el negocio rinde menos de lo que cuesta el capital que lo financia. La contabilidad dice "ganancia"; las finanzas dicen "destrucción de valor". Y tienen razón las dos, porque están midiendo cosas distintas.`,
    },
    {
      type: 'insight',
      body: 'La utilidad contable no descuenta el costo del capital propio. Por eso una empresa "rentable" según los libros puede estar evaporando la riqueza de sus dueños. La ganancia no es lo mismo que el valor: ganar plata y crear valor son dos cosas distintas.',
    },
    {
      type: 'theory',
      title: 'WACC: el costo de TODO el capital (no solo de la deuda)',
      body: `Toda empresa se financia con dos fuentes: **deuda** (bancos, proveedores onerosos, descubierto) y **capital propio** (la plata de los dueños). Cada una tiene un costo:

- La deuda cuesta su tasa de interés. En Andina, deuda cara: descubierto al ~85% anual, préstamos al ~18% en dólares.
- El capital propio también tiene un costo, aunque no se pague una factura: es el **retorno que los dueños podrían obtener invirtiendo su plata en otro negocio de riesgo similar**. Es un costo de oportunidad, y es real.

El **WACC** (Weighted Average Cost of Capital, costo promedio ponderado del capital) combina ambos costos según cuánto pesa cada fuente. Es **la valla que tu negocio tiene que superar**. Si tu capital cuesta, en promedio, 21% por año, todo peso invertido que rinda menos de 21% te está empobreciendo.

No vamos a calcular el WACC al detalle hoy —eso lo hacemos en profundidad en la Semana 9—. Por ahora alcanza con entenderlo como **la tasa mínima que tu negocio debe rendir para no destruir valor**.`,
    },
    {
      type: 'formula',
      name: 'WACC (idea conceptual)',
      expr: 'WACC = Peso deuda × Costo deuda (neto de impuestos) + Peso capital propio × Costo capital propio',
      note: 'Es el costo promedio de todo el dinero que financia la empresa. En Andina, con su deuda cara y el riesgo país de la región, ronda el 21%.',
    },
    {
      type: 'theory',
      title: 'El spread ROIC − WACC: el corazón de la creación de valor',
      body: `Acá está la idea más importante de todo el programa, en una sola resta:

**Spread = ROIC − WACC**

- Si el **ROIC es mayor que el WACC**, cada peso invertido rinde más de lo que cuesta: la empresa **crea valor**.
- Si el **ROIC es igual al WACC**, la empresa apenas cubre el costo de su capital: no crea ni destruye.
- Si el **ROIC es menor que el WACC**, cada peso invertido rinde menos de lo que cuesta: la empresa **destruye valor**, aunque tenga ganancia contable.

Es exactamente la misma lógica que con una deuda personal: si pedís plata al 21% para invertirla en algo que rinde 9%, todos los meses estás perdiendo. No importa que el negocio "dé ganancia" en términos contables; en términos económicos, te estás empobreciendo. Esa resta —ROIC menos WACC— es la brújula del CEO.`,
    },
    {
      type: 'formula',
      name: 'EVA (Economic Value Added)',
      expr: 'EVA = (ROIC − WACC) × Capital Invertido',
      note: 'El valor económico creado (o destruido) en el período, medido en dinero. EVA positivo = creaste valor; EVA negativo = lo destruiste.',
    },
    {
      type: 'case',
      title: 'Andina: gana 175 contablemente y destruye valor',
      body: `Pongamos todo junto sobre **Andina 2024**:

- **ROIC ≈ 9%** (lo calculamos la semana pasada: NOPAT ~540 sobre un capital invertido pesado).
- **WACC ≈ 21%** (su deuda es cara y opera en una región de alto riesgo país).
- **Spread = 9% − 21% = −12%.** Negativo.

El EVA es claramente **negativo**: cada peso que Andina tiene invertido en el negocio rinde 9% pero cuesta 21%. Está perdiendo 12 puntos sobre todo su capital invertido. Y sin embargo, el Estado de Resultados muestra una **ganancia neta de 175**.

Esta es la paradoja que da sentido a todo el programa: **Andina está bien contablemente y mal económicamente**. La contabilidad de presentación dice "ganamos 175". Las finanzas corporativas dicen "destruimos valor, porque el negocio rinde 9% y nuestro capital cuesta 21%". El dueño que solo mira el resultado neto duerme tranquilo mientras su patrimonio se erosiona.`,
    },
    {
      type: 'table',
      title: 'Andina 2024: dos veredictos sobre la misma empresa',
      headers: ['Mirada', 'Métrica', 'Resultado', 'Veredicto'],
      rows: [
        ['Contable', 'Resultado neto', '+175', 'Ganancia'],
        ['Financiera', 'ROIC', '~9%', 'Rendimiento del negocio'],
        ['Financiera', 'WACC', '~21%', 'Costo del capital'],
        ['Financiera', 'Spread (ROIC − WACC)', '−12%', 'Destrucción de valor'],
        ['Financiera', 'EVA', 'Negativo', 'Se evapora capital de los dueños'],
      ],
    },
    {
      type: 'warning',
      body: 'El mayor riesgo no es la empresa que pierde plata: esa lo sabe y reacciona. El riesgo es la empresa que gana plata contablemente mientras destruye valor económico, porque nadie suena la alarma. Andina lleva años "ganando" y empobreciendo a sus dueños sin que el Estado de Resultados lo diga.',
    },
    {
      type: 'simulator',
      simulatorId: 'roic',
      intro:
        'Comparable lado a lado: el ROIC de Andina (~9%) contra su WACC (~21%). Mové las palancas y buscá cuánto tendría que mejorar el ROIC —o cuánto bajar el WACC abaratando la deuda— para que el spread se vuelva positivo y Andina empiece a crear valor.',
    },
    {
      type: 'keypoints',
      title: 'Las dos salidas de Andina (y de cualquier empresa que destruye valor)',
      points: [
        '**Subir el ROIC:** mejorar el margen, acelerar la rotación (cobrar antes, liquidar el inventario obsoleto, reducir el capital de trabajo inflado) o desprenderse de activos que no rinden.',
        '**Bajar el WACC:** cambiar la deuda cara (descubierto al ~85%) por financiamiento más barato y mejor estructurado, reduciendo el costo promedio del capital.',
        '**Lo ideal es atacar las dos a la vez:** acercar el ROIC al WACC desde arriba y desde abajo hasta que el spread se vuelva positivo.',
      ],
    },
    {
      type: 'insight',
      body: 'Crear valor es simple de enunciar y difícil de lograr: que cada peso invertido rinda más de lo que cuesta financiarlo. Todo lo que hagas como CEO —comprar una máquina, dar más crédito a un cliente, tomar un préstamo— debería pasar por ese único filtro: ¿esto sube el ROIC por encima del WACC o lo aleja?',
    },
    {
      type: 'claude',
      goal: 'Que Claude calcule tu spread ROIC − WACC y tu EVA, y te diga si estás creando o destruyendo valor.',
      prompt:
        'Sos un asesor de finanzas corporativas. Quiero saber si mi empresa crea o destruye valor. Te paso: ROIC (o los datos para calcularlo: EBIT, tasa impositiva, capital de trabajo y activo fijo) y una estimación de mi WACC (o te ayudo a aproximarla con mi mix de deuda y su costo). Quiero que: (1) calcules mi spread = ROIC − WACC; (2) calcules mi EVA = (ROIC − WACC) × Capital Invertido y me digas si es positivo o negativo; (3) me expliques en lenguaje claro qué significa para el patrimonio de mis dueños; (4) me propongas 3 acciones para subir el ROIC y 2 para bajar el WACC. Sé concreto con los números. Empezá pidiéndome los datos.',
      note: 'Probá primero con Andina: ROIC ~9%, WACC ~21%, spread −12%, EVA negativo pese a una ganancia neta de 175. Si Claude reproduce ese diagnóstico, está listo para tu empresa.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Por qué una empresa con ganancia neta positiva puede estar destruyendo valor?',
      options: [
        'Porque la ganancia neta siempre está mal medida.',
        'Porque la contabilidad no descuenta el costo del capital propio: si el ROIC es menor que el WACC, se destruye valor aunque haya ganancia.',
        'Porque toda empresa con deuda destruye valor.',
        'Porque el valor solo se crea con ventas crecientes.',
      ],
      correctIndex: 1,
      explanation:
        'La utilidad contable no resta el costo del capital propio. Si el ROIC es menor que el WACC, cada peso invertido rinde menos de lo que cuesta y se destruye valor.',
    },
    {
      id: 'q2',
      question: 'Andina tiene ROIC ~9% y WACC ~21%. ¿Qué indica su spread?',
      options: [
        'Spread positivo: crea valor.',
        'Spread de +12%: crea mucho valor.',
        'Spread de −12%: destruye valor, porque el negocio rinde menos de lo que cuesta su capital.',
        'El spread no se puede calcular sin el resultado neto.',
      ],
      correctIndex: 2,
      explanation:
        'Spread = ROIC − WACC = 9% − 21% = −12%. Negativo: cada peso invertido rinde menos de lo que cuesta. Andina destruye valor pese a su ganancia de 175.',
    },
    {
      id: 'q3',
      question: 'La fórmula del EVA es:',
      options: [
        'EVA = Ventas − Costos.',
        'EVA = Resultado neto × Capital propio.',
        'EVA = (ROIC − WACC) × Capital Invertido.',
        'EVA = EBIT × (1 − t).',
      ],
      correctIndex: 2,
      explanation:
        'EVA = (ROIC − WACC) × Capital Invertido. Mide en dinero el valor creado (positivo) o destruido (negativo) en el período. La última opción es la fórmula del NOPAT.',
    },
  ],
  simulators: ['roic'],
}
