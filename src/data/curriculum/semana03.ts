import type { Lesson } from '../../types'

export const semana03: Lesson = {
  id: 'sem-03',
  week: 3,
  title: 'De la utilidad al valor operativo: NOPAT, Capital Invertido y ROIC',
  subtitle: 'Por qué mirar solo el margen te engaña, y cómo el ROIC revela si tu negocio realmente rinde',
  pillar: 'Construcción de Valor',
  durationMin: 60,
  objectives: [
    'Entender por qué el margen, por sí solo, no dice si un negocio es bueno.',
    'Descomponer la rentabilidad con DuPont: margen × rotación × multiplicador financiero.',
    'Calcular el NOPAT como la utilidad operativa neta de impuestos, sin el ruido financiero.',
    'Definir el Capital Invertido (capital de trabajo + activo fijo) que el negocio realmente usa.',
    'Calcular el ROIC de Andina y leerlo como el verdadero termómetro del negocio.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'El margen es solo un tercio de la historia',
      body: `Muchísimas direcciones de PyME viven mirando una sola cifra: el **margen** del Estado de Resultados. "Gané 8% sobre ventas, estoy bien." Es la cifra más cómoda porque está arriba, en el estado más lindo, y porque es fácil de calcular. Pero el margen, solo, **no te dice si tu negocio es bueno**.

Pensalo así: un supermercado tiene márgenes minúsculos (2-3%) y es un gran negocio; una joyería tiene márgenes enormes (40%) y puede ser un mal negocio. ¿Por qué? Porque lo que importa no es solo cuánto ganás por cada venta, sino **cuántas veces hacés girar tu capital** y **cuánto capital necesitaste poner** para lograrlo.

Esta semana vamos a romper la obsesión por el margen y reemplazarla por una pregunta mucho más potente: ¿cuánto rinde cada peso que invertí en este negocio? Esa pregunta se responde con el **ROIC**.`,
    },
    {
      type: 'keypoints',
      title: 'La descomposición DuPont: tres palancas, no una',
      points: [
        '**Margen:** cuánto ganás por cada peso de venta. Es lo único que muchas administraciones miran.',
        '**Rotación:** cuántas veces "girás" tu activo en ventas durante el año. Mide la eficiencia con que usás lo que tenés.',
        '**Multiplicador financiero:** cuánto apalancás con deuda. Amplifica la rentabilidad sobre el capital propio... y también el riesgo.',
      ],
    },
    {
      type: 'formula',
      name: 'Descomposición DuPont del ROE',
      expr: 'ROE = Margen neto × Rotación del activo × Multiplicador financiero',
      note: 'ROE = (Resultado/Ventas) × (Ventas/Activo) × (Activo/Patrimonio Neto). Tres motores distintos detrás de una sola rentabilidad.',
    },
    {
      type: 'theory',
      title: 'Por qué DuPont cambia la conversación de dirección',
      body: `Cuando una empresa solo mira el margen, todas las decisiones giran en torno a subir precios o bajar costos. Útil, pero limitado. DuPont abre **dos palancas más** que suelen estar abandonadas:

- **La rotación.** ¿Estás usando bien tus activos? Si tu inventario tarda en venderse y tus clientes pagan tarde, tu rotación se desploma y tu rentabilidad con ella, aunque el margen sea bueno. Acá es donde el capital de trabajo mal gestionado mata negocios rentables.
- **El multiplicador financiero.** ¿Cuánta deuda usás? Apalancarse puede mejorar la rentabilidad sobre el capital propio, pero si la deuda es cara (como el descubierto de Andina), el efecto se invierte y empieza a destruir.

La lección de gestión es esta: si tu rentabilidad es baja, DuPont te dice **dónde está el problema**: en el margen, en la rotación o en el apalancamiento. Sin DuPont, andás a ciegas tocando precios cuando quizás el problema es que tu stock no rota.`,
    },
    {
      type: 'simulator',
      simulatorId: 'dupont',
      intro:
        'Abrí la descomposición DuPont de Andina. Movés cada palanca por separado (margen, rotación, multiplicador) y ves cómo cambia la rentabilidad. Buscá identificar cuál de las tres es la más floja en el caso.',
    },
    {
      type: 'theory',
      title: 'NOPAT: la utilidad operativa, limpia de ruido financiero',
      body: `Para medir bien el negocio necesitamos aislarlo de cómo está **financiado**. La utilidad neta mezcla dos cosas: cómo opera la empresa y cuánta deuda cara tiene. Para juzgar el negocio en sí, las finanzas usan el **NOPAT** (Net Operating Profit After Taxes): el resultado operativo (EBIT) menos los impuestos que pagaría ese resultado, **como si la empresa no tuviera deuda**.

¿Por qué importa? Porque dos empresas con el mismo negocio pero distinta deuda tienen utilidades netas muy distintas, y eso no significa que una sea mejor negocio que la otra. El NOPAT mide la **capacidad de generación operativa pura**, antes de la decisión de financiamiento. Es la base sobre la que después construimos el ROIC.`,
    },
    {
      type: 'formula',
      name: 'NOPAT',
      expr: 'NOPAT = EBIT × (1 − t)',
      note: 't es la tasa impositiva. Es la utilidad operativa después de impuestos, sin restar intereses: mide el negocio, no el financiamiento.',
    },
    {
      type: 'case',
      title: 'Andina: del EBIT al NOPAT',
      body: `Tomemos el Estado de Resultados 2024 de **Andina**:

- **EBIT (resultado operativo): 830.** Esto es lo que el negocio genera antes de intereses e impuestos. Notá que es bastante decente.
- **Tasa impositiva (t): 35%.**
- **NOPAT = 830 × (1 − 0,35) = 830 × 0,65 ≈ 540.**

Andina genera unos **540 de utilidad operativa neta de impuestos**. Fijate que esto es muy distinto del **resultado neto contable de 175**: la diferencia (los **560 de intereses**) se la come el financiamiento caro, no el negocio. El negocio operativo de Andina genera 540; la estructura financiera se lleva la mayor parte. Esa distinción es el corazón de las finanzas corporativas.`,
    },
    {
      type: 'theory',
      title: 'Capital Invertido: cuánta plata pusiste a trabajar',
      body: `El NOPAT nos dice cuánto genera el negocio. Ahora necesitamos saber **cuánto capital tuvimos que poner** para generarlo. Ese es el **Capital Invertido**: la suma de los recursos que la empresa realmente tiene operando.

De forma simplificada y operativa:

**Capital Invertido = Capital de Trabajo + Activo Fijo**

- El **capital de trabajo** es lo que queda inmovilizado en el ciclo operativo: cuentas por cobrar + inventarios − proveedores (lo que financiás vos a tus clientes y a tu stock, menos lo que te financian tus proveedores).
- El **activo fijo** es la maquinaria, los edificios, los rodados: la infraestructura productiva.

En Andina, el capital de trabajo está inflado (cobranzas lentas, inventario que crece más que las ventas) y el activo fijo es pesado. Eso significa **mucho capital invertido**, y un capital invertido grande es difícil de hacer rendir.`,
    },
    {
      type: 'formula',
      name: 'ROIC (Return on Invested Capital)',
      expr: 'ROIC = NOPAT / Capital Invertido',
      note: 'Cuánto rinde, después de impuestos, cada peso de capital puesto a trabajar en el negocio. El termómetro real de la operación.',
    },
    {
      type: 'case',
      title: 'El ROIC de Andina: el número que el margen escondía',
      body: `Con un **NOPAT de ~540** y un **Capital Invertido elevado** (capital de trabajo inflado por las cobranzas lentas y el inventario obsoleto, más un activo fijo pesado, del orden de 6.000), el **ROIC de Andina ronda apenas el 9%**.

Contablemente, Andina "gana": muestra 175 de resultado neto y ventas en crecimiento. El dueño está conforme mirando el margen. Pero el ROIC dice otra cosa: cada peso invertido en el negocio rinde solo 9% después de impuestos. ¿Es bueno o malo ese 9%? Depende de **cuánto cuesta el capital** que financia ese negocio. Esa comparación —ROIC contra el costo del capital— es la que vamos a hacer la semana que viene, y es donde la historia de Andina se vuelve dramática.`,
    },
    {
      type: 'simulator',
      simulatorId: 'roic',
      intro:
        'Calculá el ROIC de Andina paso a paso: EBIT, NOPAT, capital de trabajo, activo fijo y capital invertido. Probá qué pasa con el ROIC si Andina reduce su inventario obsoleto o acelera la cobranza.',
    },
    {
      type: 'insight',
      body: 'El ROIC es la pregunta de oro de un dueño: "¿Cuánto me rinde, de verdad, el capital que tengo metido en este negocio?" El margen te dice cuánto ganás por venta; el ROIC te dice si el negocio entero vale la pena. Una empresa con buen margen y ROIC bajo está atrapando capital que rendiría más en otro lado.',
    },
    {
      type: 'claude',
      goal: 'Que Claude descomponga tu rentabilidad con DuPont y calcule tu ROIC para encontrar dónde se pierde valor.',
      prompt:
        'Sos un analista financiero senior. Te voy a dar mi Estado de Resultados y mi Balance. Quiero que: (1) calcules mi ROE y lo descompongas con DuPont en margen, rotación y multiplicador financiero, y me digas cuál de las tres palancas es mi punto débil; (2) calcules mi NOPAT = EBIT × (1 − tasa impositiva); (3) estimes mi Capital Invertido como capital de trabajo (cuentas por cobrar + inventario − proveedores) más activo fijo; (4) calcules mi ROIC = NOPAT / Capital Invertido; (5) me des 3 acciones concretas para subir el ROIC. Mostrá cada cálculo con sus números. Empezá pidiéndome los datos que te falten.',
      note: 'Practicá primero con Andina (EBIT 830, t 35%, NOPAT ~540, ROIC ~9%) para validar que el método de Claude da bien, y después corré tu propia empresa.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Por qué no alcanza con mirar el margen para juzgar un negocio?',
      options: [
        'Porque el margen siempre está mal calculado.',
        'Porque el margen ignora la rotación (qué tan eficientemente usás tus activos) y el apalancamiento.',
        'Porque el margen solo importa en empresas grandes.',
        'Porque el margen es lo mismo que el ROIC.',
      ],
      correctIndex: 1,
      explanation:
        'DuPont muestra que la rentabilidad depende de margen × rotación × multiplicador. Un buen margen con rotación baja puede dar un negocio pobre.',
    },
    {
      id: 'q2',
      question: 'Andina tiene un EBIT de 830 y una tasa impositiva del 35%. ¿Cuál es su NOPAT aproximado?',
      options: [
        '290, igual a las amortizaciones.',
        '175, igual al resultado neto.',
        '540, que es 830 × (1 − 0,35).',
        '830, porque el NOPAT es igual al EBIT.',
      ],
      correctIndex: 2,
      explanation:
        'NOPAT = EBIT × (1 − t) = 830 × 0,65 ≈ 540. Es la utilidad operativa neta de impuestos, sin restar los intereses del financiamiento.',
    },
    {
      id: 'q3',
      question: '¿Qué mide el ROIC?',
      options: [
        'Cuánto ganás por cada peso de venta.',
        'Cuánto rinde, después de impuestos, cada peso de capital invertido en el negocio.',
        'Cuánta deuda tiene la empresa.',
        'El resultado neto contable dividido por las ventas.',
      ],
      correctIndex: 1,
      explanation:
        'ROIC = NOPAT / Capital Invertido. Mide la rentabilidad del capital realmente puesto a trabajar en el negocio, aislado del financiamiento.',
    },
  ],
  simulators: ['roic', 'dupont'],
}
