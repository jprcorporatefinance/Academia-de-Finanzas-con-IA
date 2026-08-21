import type { Lesson } from '../../types'

export const semana12: Lesson = {
  id: 'sem-12',
  week: 12,
  title: 'Valuación integral por DCF y plan de creación de valor',
  subtitle: 'Caso integrador: proyectar el flujo de fondos, descontarlo al WACC, llegar al valor de la empresa y trazar el plan para que Andina deje de destruir valor',
  pillar: 'Valuación',
  durationMin: 60,
  objectives: [
    'Comprender cómo se compone el valor de una empresa y por qué la valuación es la síntesis de todo lo aprendido.',
    'Construir una valuación por flujo de fondos descontado (DCF): proyectar el FCFF, descontarlo al WACC y sumar el valor terminal.',
    'Pasar del Enterprise Value al Equity Value restando la deuda neta, para saber cuánto vale la parte de los dueños.',
    'Integrar ROIC vs WACC, capital de trabajo, apalancamiento sano y costo del capital LatAm en una sola foto de valor.',
    'Trazar un plan de acción concreto para llevar a Andina de destruir valor a ser una empresa sana, rentable y perdurable.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'Llegamos al final del camino: cuánto vale tu empresa, de verdad',
      body: `Durante once semanas aprendimos a **leer la verdadera información** detrás de la contabilidad de presentación: distinguir lo económico de lo financiero, medir si el negocio rinde más que su costo de capital (ROIC vs WACC), entender cómo el capital de trabajo y el apalancamiento drenan o crean caja. Todo eso confluye en una sola pregunta, la más importante que un dueño puede hacerse: **¿cuánto vale mi empresa y qué la hace valer más?**

El valor de una empresa no es su patrimonio contable, ni la suma de sus activos, ni el último resultado neto. **El valor de una empresa es la caja futura que va a generar, traída a hoy.** Una empresa vale por lo que va a producir mañana, no por lo que acumuló ayer. Esta semana cerramos el programa construyendo, paso a paso, la herramienta que materializa esa idea: el **flujo de fondos descontado (DCF)**.`,
    },
    {
      type: 'keypoints',
      title: 'Los cinco pasos de una valuación por DCF',
      points: [
        '**1. Proyectar el FCFF:** estimar el flujo de caja libre para la empresa (free cash flow to the firm) de los próximos años: lo que el negocio genera para todos los que lo financian, antes de la estructura de deuda.',
        '**2. Determinar el WACC:** el costo promedio ponderado del capital, la tasa a la que se descuentan esos flujos. En LatAm incorpora riesgo país y prima por tamaño.',
        '**3. Calcular el valor terminal:** el valor de todos los flujos más allá del horizonte de proyección, con la fórmula de Gordon (crecimiento perpetuo).',
        '**4. Descontar todo a hoy:** traer los FCFF proyectados y el valor terminal al presente con el WACC. La suma es el Enterprise Value (valor de la empresa).',
        '**5. Pasar a Equity Value:** restar la deuda neta al Enterprise Value para obtener lo que vale la parte de los dueños.',
      ],
    },
    {
      type: 'theory',
      title: 'El FCFF: el combustible de la valuación',
      body: `El **Free Cash Flow to the Firm (FCFF)** es la caja que el negocio genera para repartir entre **todos** sus financiadores —bancos y dueños— después de pagar lo que el negocio necesita para seguir funcionando y creciendo. Se construye así:

- Partís del **EBIT** (resultado operativo) y le aplicás los impuestos como si no tuvieras deuda: EBIT × (1 − tasa de impuesto). Esto es el **NOPAT**.
- Le **sumás las amortizaciones** (no son salida de caja).
- Le **restás el CAPEX** (la inversión en activo fijo que el negocio necesita).
- Le **restás (o sumás) la variación del capital de trabajo** (más créditos e inventarios consumen caja; más proveedores la liberan).

El FCFF es el corazón de la valuación porque es lo único realmente disponible. No es el resultado contable (que tiene partidas que no son caja), ni el EBITDA (que ignora la inversión necesaria para sostener el negocio). Es la **caja libre, limpia, repartible**. Todo lo que aprendimos sobre capital de trabajo y CAPEX en las semanas previas vive acá.`,
    },
    {
      type: 'formula',
      name: 'Flujo de caja libre para la empresa (FCFF)',
      expr: 'FCFF = EBIT × (1 − t) + Amortizaciones − CAPEX − Δ Capital de trabajo',
      note: 'EBIT × (1 − t) es el NOPAT: el resultado operativo después de impuestos, sin contaminar por la deuda. La estructura de financiamiento se incorpora después, vía el WACC.',
    },
    {
      type: 'theory',
      title: 'Descontar al WACC: por qué la tasa lo cambia todo',
      body: `Un peso dentro de cinco años no vale un peso hoy: vale menos, porque hoy podrías invertirlo y porque hay riesgo de que ese peso futuro no llegue. La tasa que captura ambas cosas es el **WACC (costo promedio ponderado del capital)**: el rendimiento mínimo que la empresa debe generar para satisfacer tanto a los bancos (costo de la deuda) como a los dueños (costo del capital propio), ponderado por cuánto pesa cada uno.

En **LatAm** el WACC es alto porque el costo del capital propio carga **riesgo país** (el EMBI), una **prima por tamaño** para las PyMEs y un costo de deuda elevado. Para Andina, con los supuestos del programa, el WACC ronda el **18-20%**. Esa tasa es la **vara**: si el negocio rinde un ROIC por encima del WACC, **crea valor**; si rinde por debajo, **destruye valor cada año que opera**, aunque dé ganancia contable. Toda la Semana 9 vive en esta comparación, y ahora la usamos para descontar.

Descontar al WACC significa dividir cada flujo futuro por (1 + WACC) elevado al número de años. Cuanto más lejano el flujo y más alta la tasa, menos vale hoy. Por eso en LatAm el valor se concentra en los **primeros años**: el WACC alto castiga durísimo lo lejano.`,
    },
    {
      type: 'formula',
      name: 'Valor presente de los flujos + valor terminal',
      expr: 'EV = Σ [ FCFF_t / (1 + WACC)^t ]  +  VT / (1 + WACC)^n',
      note: 'EV = Enterprise Value. Se suman los FCFF descontados año a año más el valor terminal (VT) descontado desde el último año de proyección n.',
    },
    {
      type: 'theory',
      title: 'El valor terminal de Gordon: la mayor parte del valor',
      body: `No podemos proyectar flujos para siempre, así que proyectamos un horizonte explícito (5 a 10 años) y, para todo lo que viene después, usamos el **valor terminal** con la fórmula de **Gordon**: suponemos que a partir del último año los flujos crecen a una tasa constante y modesta **g** (perpetuidad).

El valor terminal suele representar **la mayor parte del Enterprise Value** —a veces el 60% o el 70%—, así que el supuesto de **g** es delicadísimo: una **g** demasiado alta infla artificialmente la valuación. La regla de prudencia: **g nunca debería superar el crecimiento de largo plazo de la economía** (no podés crecer para siempre más rápido que el país donde operás). Para una PyME LatAm, una **g** de 2-3% en dólares es razonable.

Una advertencia de la fórmula: el denominador es (WACC − g), así que cuanto más cerca está **g** del WACC, más explota el valor terminal. Por eso pequeños cambios en supuestos pueden cambiar enormemente la valuación: la valuación es un rango razonado, no un número mágico.`,
    },
    {
      type: 'formula',
      name: 'Valor terminal (perpetuidad de Gordon)',
      expr: 'VT = FCFF_{n+1} / (WACC − g) = FCFF_n × (1 + g) / (WACC − g)',
      note: 'g = tasa de crecimiento perpetuo (prudente: menor o igual al crecimiento de la economía). El valor terminal se calcula al año n y luego se descuenta a hoy con el WACC.',
    },
    {
      type: 'theory',
      title: 'De Enterprise Value a Equity Value: lo que vale tu parte',
      body: `El **Enterprise Value (EV)** es el valor de la empresa como negocio operativo: lo que valen los activos productivos que generan ese FCFF, independientemente de cómo estén financiados. Pero el dueño no se queda con eso: parte de la empresa **le pertenece a los bancos**. Para saber cuánto vale **tu** parte, hay que restar la **deuda neta**.

- **Equity Value = Enterprise Value − Deuda neta**
- **Deuda neta = deuda financiera total − caja y equivalentes**

Esta resta es el momento de la verdad para muchos dueños endeudados: una empresa puede tener un Enterprise Value respetable y un Equity Value flaco, porque buena parte del valor ya está comprometida con los acreedores. Andina lo ilustra de manera cruel: tiene activos, marca y un terreno valioso (Enterprise Value decente), pero arrastra descubierto, préstamos de corto y largo plazo y cheques diferidos. Cuando restás esa deuda neta, **lo que realmente le queda al dueño se achica fuerte**. Por eso desapalancar y abaratar la deuda no es solo aliviar la caja: es **transferir valor desde los bancos hacia los dueños**.`,
    },
    {
      type: 'formula',
      name: 'Del valor de la empresa al valor del dueño',
      expr: 'Equity Value = Enterprise Value − (Deuda financiera − Caja)',
      note: 'La deuda neta de Andina incluye descubierto, préstamos de corto y largo plazo y cheques diferidos, menos la caja y las inversiones transitorias. Cada peso de deuda que se cancela es un peso de Equity Value que vuelve al dueño.',
    },
    {
      type: 'simulator',
      simulatorId: 'valuacion',
      intro:
        'Construí la valuación de Andina paso a paso: proyectá el FCFF, elegí el WACC y la g, mirá cómo se forman el Enterprise Value y el valor terminal, y restá la deuda neta para llegar al Equity Value. Movés un supuesto y ves cómo se mueve el valor: esa sensibilidad es la lección más importante de la valuación.',
    },
    {
      type: 'case',
      title: 'Andina, vista entera: la película completa del programa',
      body: `Pongamos todo junto. Lo que el dueño de Andina creía y lo que la valuación revela:

- **Lo que creía:** "Vendo cada vez más (8200 este año), gano plata (175 de resultado neto), tengo activos. Mi empresa vale lo que dice mi patrimonio: unos 2770."
- **Lo que el análisis muestra:** sus **cuentas por cobrar e inventarios** atrapan caja (las ventas crecen pero no se cobran); su **descubierto al 85%** y sus préstamos caros se comen **560 de intereses sobre 830 de EBIT** (el 67% de lo operativo); su **ROIC está por debajo del WACC** de ~18-20%, así que **destruye valor cada año**; y al descontar su flujo libre y restar la **deuda neta**, su Equity Value real es **bastante menor** que el patrimonio contable que él imaginaba.
- **Pero también:** tiene un **terreno que vale 900 y figura a 350** (+550 oculto), una **marca y cartera que valen ~650 y no están en libros**, y proveedores (1280) que podría aprovechar mejor para desplazar deuda cara.

Andina no es una empresa muerta: es una empresa **sana por dentro y enferma por fuera**. El negocio operativo tiene buen pulso; lo que la mata es **cómo está financiada y cómo administra su capital de trabajo**. Y eso, a diferencia del mercado o del producto, **el dueño lo controla**.`,
    },
    {
      type: 'table',
      title: 'Plan de creación de valor: de destruir valor a empresa perdurable',
      headers: ['Palanca', 'Situación actual de Andina', 'Acción concreta', 'Efecto sobre el valor'],
      rows: [
        [
          'Capital de trabajo',
          'CxC y stock crecen más que las ventas; caja atrapada',
          'Reducir días de cobro, depurar inventario obsoleto (420), estirar plazo de proveedores',
          'Libera caja → mejora FCFF → sube el Enterprise Value',
        ],
        [
          'Costo de la deuda',
          'Descubierto ~85% y préstamos caros; 560 de intereses',
          'Sustituir descubierto por financiamiento de proveedores y deuda más barata',
          'Baja intereses → sube NOPAT y baja deuda neta → sube Equity Value',
        ],
        [
          'Apalancamiento',
          'Intereses = 67% del EBIT; zona de riesgo',
          'Desapalancar con la caja liberada y, si hace falta, vender activos ociosos',
          'Reduce riesgo → puede bajar el WACC → sube el valor',
        ],
        [
          'Activos ociosos / ocultos',
          'Terreno revaluable (+550), maquinaria obsoleta, intangibles sin registrar',
          'Monetizar lo ocioso, reconocer el valor de la marca, no comprar CAPEX innecesario',
          'Genera caja para desapalancar y mejora el Equity Value real',
        ],
        [
          'ROIC vs WACC',
          'ROIC por debajo del WACC: destruye valor',
          'Combinar todas las palancas: más margen operativo, menos capital invertido',
          'ROIC supera al WACC → la empresa pasa a CREAR valor cada año',
        ],
      ],
    },
    {
      type: 'insight',
      body: 'El mensaje de cierre del programa: una empresa no vale por lo que acumuló, vale por la caja que va a generar y por cuánto esa caja supera el costo de su capital. Andina puede pasar de destruir valor a crearlo sin vender una unidad más: solo cobrando mejor, financiándose más barato, desapalancando y poniendo a trabajar sus activos ociosos. La creación de valor casi nunca viene de afuera (más ventas, mejor mercado); viene de adentro, de decisiones que el dueño controla. Esa es la diferencia entre un dueño que mira el margen y un CEO que entiende el valor.',
    },
    {
      type: 'warning',
      body: 'Una valuación es un rango razonado, no un número sagrado. El valor terminal puede ser el 70% del total y depende de g y del WACC; pequeños cambios mueven mucho el resultado. Nunca defiendas "mi empresa vale exactamente X": defendé los supuestos. Si alguien te presenta una valuación sin mostrarte el FCFF proyectado, el WACC y la g, no te están valuando la empresa: te están vendiendo un número.',
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a construir la valuación por DCF de tu propia empresa y a priorizar tu plan de creación de valor.',
      prompt:
        'Sos un analista de valuación senior asesorando al dueño de una PyME industrial de LatAm. Vamos a construir juntos una valuación por flujo de fondos descontado y un plan de creación de valor. Pedime por partes: (1) mis últimos resultados (EBIT, amortizaciones, CAPEX, variación de capital de trabajo) para estimar el FCFF actual y proyectarlo a 5 años con un crecimiento razonable; (2) mis supuestos de WACC (riesgo país, costo de deuda, costo de capital propio, prima por tamaño) o ayudame a estimarlos para LatAm; (3) una g prudente para el valor terminal de Gordon. Con eso quiero que: calcules el Enterprise Value descontando los flujos y el valor terminal al WACC; me restes la deuda neta para llegar al Equity Value; me hagas un análisis de sensibilidad del valor frente a cambios en WACC y g; y finalmente me armes un plan priorizado de creación de valor (capital de trabajo, costo de deuda, apalancamiento, activos ociosos, ROIC vs WACC) indicando cuánto podría subir mi Equity Value con cada palanca. Empezá pidiéndome los datos del paso 1.',
      note: 'Este es el ejercicio que integra todo el programa. Hacelo con tus números reales: vas a salir sabiendo cuánto vale tu empresa hoy, por qué, y exactamente qué hacer para que valga más. Ese es el objetivo final de Finanzas Corporativas para un CEO.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: 'En una valuación por DCF, ¿qué representa el FCFF (free cash flow to the firm)?',
      options: [
        'El resultado neto contable del último ejercicio.',
        'El EBITDA del período sin ajustes.',
        'La caja libre que el negocio genera para todos sus financiadores: EBIT × (1 − t) + amortizaciones − CAPEX − variación de capital de trabajo.',
        'El patrimonio neto contable de la empresa.',
      ],
      correctIndex: 2,
      explanation:
        'El FCFF parte del NOPAT (EBIT después de impuestos, sin deuda), suma amortizaciones, resta CAPEX y resta la variación del capital de trabajo. Es la caja libre y repartible: ni el resultado contable ni el EBITDA, porque estos ignoran la inversión real que el negocio necesita.',
    },
    {
      id: 'q2',
      question: '¿Cómo se pasa del Enterprise Value al Equity Value (lo que vale la parte de los dueños)?',
      options: [
        'Se suma la deuda neta al Enterprise Value.',
        'Se resta la deuda neta (deuda financiera menos caja) al Enterprise Value.',
        'Son siempre el mismo número.',
        'Se multiplica el Enterprise Value por la tasa de impuesto.',
      ],
      correctIndex: 1,
      explanation:
        'Equity Value = Enterprise Value − Deuda neta. El Enterprise Value es el valor del negocio operativo; al restar la deuda neta (lo que le corresponde a los bancos) queda lo que vale la parte de los dueños. Por eso desapalancar transfiere valor desde los acreedores hacia el dueño.',
    },
    {
      id: 'q3',
      question: '¿Por qué hay que ser prudente con la tasa g del valor terminal de Gordon?',
      options: [
        'Porque g no afecta la valuación.',
        'Porque el valor terminal suele ser la mayor parte del EV y el denominador (WACC − g) hace que una g alta infle artificialmente el valor.',
        'Porque g siempre debe ser mayor que el WACC.',
        'Porque g solo se usa en empresas que cotizan en bolsa.',
      ],
      correctIndex: 1,
      explanation:
        'El valor terminal puede representar el 60-70% del Enterprise Value y se calcula como FCFF × (1+g) / (WACC − g). Cuanto más cerca está g del WACC, más explota el resultado. Una g prudente nunca debe superar el crecimiento de largo plazo de la economía; de lo contrario la valuación queda inflada.',
    },
  ],
  simulators: ['valuacion'],
}
