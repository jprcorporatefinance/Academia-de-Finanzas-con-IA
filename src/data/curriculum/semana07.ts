import type { Lesson } from '../../types'

export const semana07: Lesson = {
  id: 'sem-07',
  week: 7,
  title: 'Capital de trabajo: el ciclo de conversión de caja',
  subtitle: 'Cuentas por cobrar, inventario, caja y proveedores: rotaciones, DSO/DIO/DPO y cómo convertir a tus proveedores en aliados',
  pillar: 'Capital de Trabajo',
  durationMin: 60,
  objectives: [
    'Entender qué es el capital de trabajo y cómo cada uno de sus componentes consume o libera caja.',
    'Calcular e interpretar DSO, DIO, DPO y el ciclo de conversión de caja.',
    'Medir la rotación del activo y de las cuentas por cobrar, y reconocer una buena cobranza de un inventario que no rota.',
    'Usar a los proveedores como financiamiento NO oneroso, convirtiéndolos en aliados estratégicos sin aumentar el riesgo financiero.',
    'Ver en Andina cómo 4.250 inmovilizados en capital de trabajo la empujan al descubierto bancario caro.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'El capital de trabajo es el motor escondido de tu caja',
      body: `El **capital de trabajo** es la plata que tu negocio necesita para funcionar día a día: lo que tenés inmovilizado en **cuentas por cobrar** (lo que te deben los clientes) y en **inventario** (la mercadería en el depósito), menos lo que financiás gratis con **proveedores** (lo que vos les debés a ellos).

Es el componente más invisible y, a la vez, el más decisivo de la caja de una PyME. Nadie celebra una reunión por el capital de trabajo, pero es donde se gana o se pierde el oxígeno financiero. Como vimos la semana pasada, en Andina el capital de trabajo se tragó 880 de caja en un solo año.

La idea central: cada peso que entra en cuentas por cobrar o en inventario es un peso que **sale de tu caja** y que tenés que financiar de algún lado. Si no lo financiás con proveedores, lo financiás con descubierto bancario al 85%. Gestionar bien el capital de trabajo no es contabilidad: es la diferencia entre vivir holgado o vivir ahogado.`,
    },
    {
      type: 'keypoints',
      title: 'Los cuatro componentes del capital de trabajo',
      points: [
        '**Cuentas por cobrar:** plata que vendiste pero todavía no cobraste. Inmoviliza caja. Cuanto más rápido cobrás, mejor.',
        '**Inventario:** mercadería inmovilizada en el depósito. Inmoviliza caja. Cuanto más rápido rota, mejor.',
        '**Caja y bancos:** el disponible. Es el colchón, pero de más es plata ociosa; de menos, es riesgo de quiebre.',
        '**Proveedores:** lo que les debés. Es financiamiento NO oneroso (gratis). Cuanto más plazo negociás, más caja te liberan.',
      ],
    },
    {
      type: 'theory',
      title: 'DSO, DIO, DPO y el ciclo de conversión de caja',
      body: `Para medir el capital de trabajo en días —que es como lo entiende un dueño— usamos tres indicadores:

- **DSO (Days Sales Outstanding)** = días promedio que tardás en **cobrarles a tus clientes**. = (Cuentas por cobrar / Ventas) × 365. Cuanto más alto, más tiempo está tu plata en la calle.
- **DIO (Days Inventory Outstanding)** = días promedio que la mercadería **queda en el depósito** antes de venderse. = (Inventario / CMV) × 365. Cuanto más alto, más caja atrapada en stock.
- **DPO (Days Payable Outstanding)** = días promedio que tardás en **pagarle a tus proveedores**. = (Proveedores / CMV) × 365. Cuanto más alto, más te financian ellos gratis.

Y la suma de todo es el indicador rey:

El **ciclo de conversión de caja** = DSO + DIO − DPO. Es la cantidad de días que tu plata está "atrapada" en el negocio antes de volver a tu caja. Si te da 90 días, significa que financiás 90 días de operación con tu propio bolsillo (o con el del banco). Cuanto más corto, mejor.`,
    },
    {
      type: 'formula',
      name: 'Ciclo de conversión de caja',
      expr: 'Ciclo = DSO + DIO − DPO',
      note: 'DSO = (CxC/Ventas)×365; DIO = (Inventario/CMV)×365; DPO = (Proveedores/CMV)×365. Cada día que recortás del ciclo es caja que vuelve a tu cuenta.',
    },
    {
      type: 'case',
      title: 'Andina: el ciclo que la empuja al descubierto',
      body: `Pongamos los números de Andina 2024 en días. Ventas **8.200**, CMV **5.740**, cuentas por cobrar **1.850**, inventario **2.400**, proveedores **1.280**.

- **DSO** = (1.850 / 8.200) × 365 ≈ **82 días**. Andina tarda casi tres meses en cobrarles a sus clientes. Su plata vive en la calle.
- **DIO** = (2.400 / 5.740) × 365 ≈ **153 días**. La mercadería pasa más de **cinco meses** en el depósito antes de venderse. El inventario no rota.
- **DPO** = (1.280 / 5.740) × 365 ≈ **81 días**. Le paga a los proveedores a 81 días: no está mal, pero es lo único que la sostiene.

**Ciclo de conversión = 82 + 153 − 81 ≈ 154 días.** Andina necesita financiar **154 días** de operación. Como los proveedores solo le cubren 81, los otros 73 días los financia con descubierto bancario al 85%. Ese es el origen directo de los intereses que se comían el EBIT en la Semana 5.

El problema más grave es el inventario: 153 días es una barbaridad. Si Andina llevara su DIO a 90 días, liberaría cerca de **990 de caja** (≈ 63 días × CMV/365), suficiente para cancelar casi todo el descubierto.`,
    },
    {
      type: 'simulator',
      simulatorId: 'capital-trabajo',
      intro:
        'Cargá los datos de Andina (CxC 1.850, inventario 2.400, proveedores 1.280, ventas 8.200, CMV 5.740) y calculá el ciclo de conversión. Probá bajar el DIO y mirá cuánta caja se libera y cuánto descubierto podrías cancelar.',
    },
    {
      type: 'theory',
      title: 'Rotación del activo y de las cuentas por cobrar',
      body: `Las rotaciones son la otra cara de los días: en vez de "cuánto tarda", miden "cuántas vueltas da" tu plata en un año.

- **Rotación del activo** = Ventas / Activo total. Cuántos pesos de venta generás por cada peso de activo. Es una medida de eficiencia: una empresa que vende 8.200 con un activo de 7.500 rota 1,09 veces; cuanto más alto, más exprimís cada peso invertido.
- **Rotación de cuentas por cobrar** = Ventas / Cuentas por cobrar. Cuántas veces al año cobrás tu cartera. En Andina, 8.200 / 1.850 ≈ 4,4 vueltas, que es el inverso del DSO de 82 días. Una rotación alta significa una **buena cobranza**: el dinero vuelve rápido.

Una **buena cobranza** no es solo cobrar: es cobrar en plazo, sin estirar, sin acumular mora. La cartera de Andina incluye 290 de mora mayor a 120 días con baja probabilidad de cobro: eso no es cuenta por cobrar, es una pérdida disfrazada de activo. Vender mucho y cobrar mal es regalar la mercadería con cara de negocio.`,
    },
    {
      type: 'formula',
      name: 'Rotaciones clave',
      expr: 'Rotación de activo = Ventas / Activo total   |   Rotación de CxC = Ventas / Cuentas por cobrar',
      note: 'La rotación de CxC es el inverso del DSO (365 / DSO). Más vueltas = la plata vuelve más rápido = mejor cobranza.',
    },
    {
      type: 'warning',
      body: 'El inventario que no rota es el peor de los males del capital de trabajo: inmoviliza caja, ocupa depósito, corre riesgo de obsolescencia y muchas veces hay que rematarlo bajo su valor de libros. En Andina hay 420 de mercadería obsoleta valuada a costo histórico que a mercado vale menos. Un DIO de 153 días no es "tener buen surtido": es caja muerta esperando convertirse en pérdida.',
    },
    {
      type: 'theory',
      title: 'Convertir a los proveedores en aliados estratégicos',
      body: `Acá está la jugada más inteligente del capital de trabajo. De todas las fuentes de financiamiento, los **proveedores son la única que no cuesta intereses**: es financiamiento **no oneroso**. Cada día que estiramos el pago a proveedores —de forma negociada y cumpliendo— es un día menos que financiamos con descubierto al 85%.

Pero ojo: esto no se hace pagando tarde y mal, generando conflicto. Se hace convirtiendo a los proveedores en **aliados, en socios estratégicos**. El proveedor que confía en vos te da más plazo, mejores condiciones y prioridad en momentos de escasez. Esa relación vale oro:

- Negociás plazos más largos a cambio de volumen, previsibilidad o exclusividad.
- Acordás esquemas de consignación o entregas escalonadas que bajan tu inventario.
- Construís reputación de buen pagador, que te abre crédito comercial cuando más lo necesitás.

El proveedor bien gestionado te financia barato **sin aumentar tu riesgo financiero**: a diferencia del banco, no te ejecuta una garantía ni te sube la tasa de un día para el otro. Convertir proveedores en aliados es reemplazar deuda cara y riesgosa por financiamiento gratis y estable.`,
    },
    {
      type: 'insight',
      body: 'El capital de trabajo es la palanca de caja más barata que tenés, y no requiere ir al banco. Antes de pedir un préstamo, ordená el ciclo de conversión: cobrá un poco antes (bajá el DSO), hacé rotar el inventario (bajá el DIO) y negociá plazo con proveedores (subí el DPO). Cada día que recortás del ciclo libera caja propia, gratis, que reemplaza descubierto al 85%. Es el préstamo que ya tenés adentro de la empresa.',
    },
    {
      type: 'table',
      title: 'Andina: el ciclo de conversión hoy vs. ordenado',
      headers: ['Indicador', 'Hoy', 'Ordenado', 'Cómo se logra'],
      rows: [
        ['DSO (cobranza)', '82 días', '65 días', 'Mejor gestión de cartera, descuentos por pronto pago'],
        ['DIO (inventario)', '153 días', '90 días', 'Liquidar obsoletos, comprar contra pedido, reponer just-in-time'],
        ['DPO (proveedores)', '81 días', '95 días', 'Negociar plazos como aliado estratégico, sin pagar mal'],
        ['Ciclo de conversión', '154 días', '60 días', 'Libera ≈1.480 de caja: cancela el descubierto'],
      ],
    },
    {
      type: 'warning',
      body: 'Cuidado con el descubierto bancario como financiador del capital de trabajo. Es la solución más fácil y la más cara: a una TNA de ~85%, financiar 73 días de ciclo con descubierto es lo que en Andina genera buena parte de los 560 de intereses que destruyen el resultado. El descubierto debería tapar baches puntuales, nunca financiar de forma estructural tu inventario y tu cartera.',
    },
    {
      type: 'claude',
      goal: 'Que Claude calcule tu ciclo de conversión de caja y arme un plan para liberar caja sin pedir un préstamo.',
      prompt:
        'Sos un consultor experto en optimización de capital de trabajo en PyMEs. Te voy a dar mis ventas, mi costo de mercadería vendida, mis cuentas por cobrar, mi inventario y mis proveedores. Quiero que: (1) calcules mi DSO, DIO, DPO y mi ciclo de conversión de caja, mostrando cada cuenta; (2) me digas cuántos días de mi ciclo estoy financiando con deuda cara y cuánta caja liberaría si bajo el DIO y el DSO o subo el DPO; (3) me propongas un plan concreto para convertir a mis proveedores en aliados estratégicos y financiarme barato sin aumentar mi riesgo financiero. Empezá pidiéndome los datos.',
      note: 'Probalo con Andina: ventas 8.200, CMV 5.740, CxC 1.850, inventario 2.400, proveedores 1.280. Mirá cómo aparece el ciclo de 154 días y la caja atrapada en el inventario.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Qué representa el ciclo de conversión de caja (DSO + DIO − DPO)?',
      options: [
        'Los días de vacaciones del personal.',
        'La cantidad de días que tu plata está atrapada en el negocio antes de volver a tu caja, y que tenés que financiar.',
        'El margen bruto en días.',
        'El plazo de un préstamo bancario.',
      ],
      correctIndex: 1,
      explanation:
        'El ciclo de conversión mide cuántos días financiás de operación: lo que tardás en cobrar (DSO) más lo que el inventario tarda en venderse (DIO), menos lo que te financian gratis los proveedores (DPO). Cuanto más corto, menos caja propia o deuda necesitás.',
    },
    {
      id: 'q2',
      question: 'En Andina, el DIO es de ~153 días. ¿Por qué es el problema más grave de su capital de trabajo?',
      options: [
        'Porque significa que vende demasiado rápido.',
        'Porque la mercadería pasa más de cinco meses inmovilizada en el depósito, atrapando caja y corriendo riesgo de obsolescencia.',
        'Porque los proveedores le cobran intereses.',
        'Porque el inventario rota más rápido que las ventas.',
      ],
      correctIndex: 1,
      explanation:
        'Un DIO de 153 días significa que el inventario tarda más de cinco meses en venderse. Eso inmoviliza una enorme cantidad de caja (que Andina financia con descubierto al 85%) y agrega riesgo de obsolescencia, como los 420 de mercadería ya obsoleta.',
    },
    {
      id: 'q3',
      question: '¿Por qué conviene convertir a los proveedores en aliados estratégicos?',
      options: [
        'Porque pagarles tarde y mal mejora la relación.',
        'Porque son financiamiento NO oneroso: te financian gratis y, bien gestionados, sin aumentar tu riesgo financiero, a diferencia del banco.',
        'Porque siempre cobran intereses más bajos que el banco.',
        'Porque reducen las ventas.',
      ],
      correctIndex: 1,
      explanation:
        'El crédito de proveedores no cuesta intereses (financiamiento no oneroso). Convirtiéndolos en aliados se negocian plazos largos de forma estable y cumplida, reemplazando deuda bancaria cara y riesgosa por financiamiento gratis que no te ejecuta una garantía ni te sube la tasa.',
    },
  ],
  simulators: ['capital-trabajo'],
}
