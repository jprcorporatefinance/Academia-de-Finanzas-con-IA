import type { Lesson } from '../../types'

export const semana09: Lesson = {
  id: 'sem-09',
  week: 9,
  title: 'El costo del capital: WACC en mercados emergentes',
  subtitle: 'CAPM ajustado, riesgo país, prima por tamaño y por qué tu dinero nunca es gratis',
  pillar: 'Costo del Capital',
  durationMin: 60,
  objectives: [
    'Entender que el capital tiene un costo aunque no aparezca en el Estado de Resultados, y que ese costo es la vara contra la que se mide el ROIC.',
    'Construir el costo del capital propio (Ke) con un CAPM ajustado a LatAm: tasa libre de riesgo, beta, prima de mercado, riesgo país y prima por tamaño.',
    'Comprender por qué se parte de indicadores de EEUU y cómo se trasladan a la economía local de una PyME.',
    'Calcular el WACC combinando el costo del equity y el de la deuda con su ponderación y el escudo fiscal.',
    'Usar el WACC de Andina (~21-22%) como umbral mínimo de rentabilidad para decidir inversiones.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'La plata nunca es gratis, aunque el balance no te lo cobre',
      body: `Hay un costo que no aparece en ninguna línea de tu Estado de Resultados y que, sin embargo, es el más importante de todos: el **costo del capital propio**. Los intereses de los préstamos sí se ven (Andina paga 560 de intereses al año). Pero el dinero que pusieron los dueños, el patrimonio neto, parece "gratis" porque no hay un renglón que lo cobre. **No lo es.**

Cuando un dueño pone plata en su empresa, deja de poder ponerla en otro lado: un plazo fijo, un bono, otro negocio. Ese rendimiento que resigna es su **costo de oportunidad**, y es un costo tan real como un interés bancario, aunque ningún contador lo registre. Si la empresa rinde menos que esa alternativa, el dueño estaría mejor cerrando y poniendo la plata en otra cosa, aunque el balance muestre ganancia.

El **WACC** (costo promedio ponderado del capital) junta las dos fuentes de financiamiento, la deuda y el capital propio, en una sola tasa: **cuánto cuesta, en promedio, cada peso que financia la empresa.** Es la contracara del ROIC que vimos antes: el ROIC mide cuánto rinde el capital invertido; el WACC mide cuánto cuesta. Si el ROIC no le gana al WACC, la empresa **destruye valor** por más que sea contablemente rentable.`,
    },
    {
      type: 'keypoints',
      title: 'Las dos piezas del costo del capital',
      points: [
        '**Ke (costo del equity):** lo que exigen los dueños por su dinero. No se factura, pero es un costo de oportunidad real. Se estima con el modelo CAPM.',
        '**Kd (costo de la deuda):** la tasa que cobran los acreedores. En Andina, 18% en USD. Tiene una ventaja: los intereses son deducibles de Ganancias (escudo fiscal).',
        '**Ponderación (E/V y D/V):** cuánto pesa cada fuente en el financiamiento total. No es lo mismo una empresa financiada 80% con capital propio que otra 50/50.',
        '**WACC:** el promedio ponderado de Ke y Kd (este último neto de impuestos). Es el umbral mínimo de rentabilidad que la empresa debe superar para crear valor.',
      ],
    },
    {
      type: 'theory',
      title: 'CAPM ajustado: por qué arrancamos mirando a EEUU',
      body: `El **CAPM** (Capital Asset Pricing Model) dice que el rendimiento exigido a una inversión de riesgo es la tasa libre de riesgo más una prima proporcional a su riesgo. En su forma de manual: Ke = Rf + β × Prima de mercado.

El problema es que esa fórmula nació para mercados **desarrollados, líquidos y eficientes**, como el de EEUU, donde hay décadas de datos confiables de tasas, betas y primas. En LatAm no tenemos esos datos: nuestros mercados son chicos, ilíquidos y volátiles, y las series están contaminadas por inflación y saltos de tipo de cambio. Construir un beta o una prima de mercado puramente local sería armar un castillo sobre arena.

La salida que usa la práctica profesional es **empezar con los indicadores robustos de EEUU y trasladarlos a la economía local sumándole los riesgos que esa economía agrega:**

- **Riesgo país:** la prima extra que exige el mercado por invertir en una economía emergente (default soberano, controles de cambio, inestabilidad). Se aproxima con el EMBI.
- **Prima por tamaño:** una PyME es más riesgosa que una multinacional cotizante. Menos acceso al crédito, más dependencia de pocos clientes, menos espalda. Eso se paga con tasa.

Así, el CAPM "puro" de EEUU se convierte en un **CAPM ajustado** que sí refleja lo que de verdad le cuesta el capital a una PyME latinoamericana.`,
    },
    {
      type: 'formula',
      name: 'CAPM ajustado para mercados emergentes (Ke)',
      expr: 'Ke = Rf + β × ERP + Riesgo País + Prima por tamaño',
      note: 'Rf y ERP salen de EEUU (mercado maduro); el riesgo país y la prima por tamaño los agrega la realidad local. En Andina: 4,3% + 0,85×5,5% + 6,5% + 3,5% = 19,0% (aprox.).',
    },
    {
      type: 'case',
      title: 'Andina: construimos su Ke paso a paso',
      body: `Tomemos los parámetros de mercado del caso (LatAm, en USD para neutralizar la inflación local):

- **Tasa libre de riesgo (Rf):** 4,3% (bono del Tesoro de EEUU a 10 años).
- **Beta (β):** 0,85 (riesgo del sector autopartes relativo al mercado).
- **Prima de mercado (ERP):** 5,5% (prima por invertir en acciones vs. bonos, mercado maduro, según Damodaran).
- **Riesgo país:** 6,5% (riesgo soberano LatAm, EMBI ajustado).
- **Prima por tamaño:** 3,5% (Andina es una PyME, no una multinacional).

Armamos el costo del equity:

**Ke = 4,3% + 0,85 × 5,5% + 6,5% + 3,5% = 4,3% + 4,68% + 6,5% + 3,5% ≈ 19,0%**

Le pedimos casi 19% al capital propio. Parece alto, pero es lo coherente con poner plata en una PyME industrial de un país emergente: si el dueño no le saca cerca de eso, estaría mejor con la plata en otro lado. Ahora falta combinar este Ke con el costo de la deuda para llegar al WACC.`,
    },
    {
      type: 'theory',
      title: 'Del Ke al WACC: sumamos la deuda y el escudo fiscal',
      body: `La empresa no se financia solo con capital propio: también tiene deuda, que es **más barata** que el equity (los acreedores cobran antes y asumen menos riesgo) y que además trae una ventaja fiscal.

Los intereses son **deducibles del impuesto a las ganancias**. Si Andina paga 18% de tasa y la alícuota es 35%, el costo real de esa deuda para la empresa no es 18% sino:

**Kd después de impuestos = 18% × (1 − 0,35) = 11,7%**

Eso es el **escudo fiscal**: el Estado te "devuelve" parte del costo de la deuda vía menor impuesto. Por eso, en la fórmula del WACC, la deuda entra después de impuestos y el equity no (los dividendos no son deducibles).

El WACC pondera ambos costos por cuánto pesa cada fuente. Con una estructura objetivo en torno a 45% deuda y 55% capital propio, combinamos un Ke de ~19% con un Kd neto de ~11,7% y obtenemos un WACC de Andina del orden de **21-22%**.`,
    },
    {
      type: 'formula',
      name: 'WACC (costo promedio ponderado del capital)',
      expr: 'WACC = (E/V) × Ke + (D/V) × Kd × (1 − t)',
      note: 'E = capital propio, D = deuda, V = E + D. En Andina: ~0,55×19% + ~0,45×18%×(1−0,35) ≈ 10,5% + 5,3% ≈ 21-22%.',
    },
    {
      type: 'simulator',
      simulatorId: 'wacc',
      intro:
        'Construí el WACC de Andina moviendo cada componente: tasa libre de riesgo, beta, riesgo país, prima por tamaño, costo de la deuda y la mezcla deuda/capital. Mirá cómo el riesgo país y la prima por tamaño empujan el costo del capital muy por encima del de una empresa de EEUU.',
    },
    {
      type: 'table',
      title: 'Componentes del costo del capital de Andina',
      headers: ['Componente', 'Valor', 'De dónde sale'],
      rows: [
        ['Tasa libre de riesgo (Rf)', '4,3%', 'Bono del Tesoro de EEUU a 10 años'],
        ['Beta (β)', '0,85', 'Riesgo del sector autopartes'],
        ['Prima de mercado (ERP)', '5,5%', 'Mercado accionario maduro (Damodaran)'],
        ['Riesgo país', '6,5%', 'Riesgo soberano LatAm (EMBI)'],
        ['Prima por tamaño', '3,5%', 'Penalización por ser PyME'],
        ['Ke (costo del equity)', '≈ 19,0%', 'CAPM ajustado'],
        ['Kd antes de impuestos', '18,0%', 'Tasa de la deuda en USD'],
        ['Kd después de impuestos', '11,7%', '18% × (1 − 0,35), escudo fiscal'],
        ['WACC', '≈ 21-22%', 'Promedio ponderado E/V·Ke + D/V·Kd(1−t)'],
      ],
    },
    {
      type: 'insight',
      body: 'El WACC es la contracara exacta del ROIC. El ROIC dice cuánto rinde el capital invertido; el WACC dice cuánto cuesta. Andina necesita un ROIC por encima de 21-22% solo para empatar. Si rinde menos, está destruyendo valor aunque su Estado de Resultados muestre ganancia: ese es el corazón de las finanzas corporativas y la razón por la que conocer el verdadero costo del capital no es un lujo académico.',
    },
    {
      type: 'warning',
      body: 'No subestimes tu costo del capital usando una tasa "de EEUU" o "lo que cuesta el banco". Si Andina midiera su WACC con un costo de capital propio del 10% (ignorando riesgo país y prima por tamaño), creería que crea valor con un ROIC del 12%... cuando en realidad lo destruye, porque su WACC real es el doble. Subestimar el WACC es el error más caro y silencioso de la gestión financiera: te lleva a aprobar inversiones que te empobrecen.',
    },
    {
      type: 'claude',
      goal: 'Que Claude te ayude a construir el WACC realista de tu empresa, sin subestimarlo.',
      prompt:
        'Sos un asesor financiero especializado en valuación de PyMEs en mercados emergentes de LatAm. Quiero que me ayudes a estimar el costo del capital (WACC) de mi empresa con un CAPM ajustado. Guiame paso a paso: (1) pedime la tasa libre de riesgo de EEUU, la prima de mercado y un beta del sector y explicame de dónde sacar cada dato; (2) sumá el riesgo país de mi economía y una prima por tamaño según mi facturación, justificando cada número; (3) calculá mi Ke; (4) pedime mi costo de deuda y mi alícuota de impuesto y aplicá el escudo fiscal; (5) pedime la proporción deuda/capital y calculá el WACC final. Cerrá diciéndome qué ROIC mínimo necesito para no destruir valor. Empezá por el primer dato.',
      note: 'Usá tus propios números o los de Andina (Rf 4,3%, ERP 5,5%, beta 0,85, riesgo país 6,5%, prima tamaño 3,5%, Kd 18%, t 35%). El objetivo es que salgas con un umbral concreto contra el cual medir cada inversión.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Por qué el costo del capital propio (Ke) es un costo real aunque no figure en el Estado de Resultados?',
      options: [
        'Porque la ley obliga a registrarlo.',
        'Porque es el costo de oportunidad de los dueños: el rendimiento que resignan al no poner esa plata en otra inversión de riesgo similar.',
        'Porque equivale a los intereses de la deuda.',
        'No es un costo real: el capital propio es gratis.',
      ],
      correctIndex: 1,
      explanation:
        'El capital propio no se factura, pero tiene un costo de oportunidad: el rendimiento que el dueño resigna al no invertir en otra alternativa de riesgo comparable. Si la empresa no supera ese umbral, destruye valor aunque muestre ganancia.',
    },
    {
      id: 'q2',
      question: '¿Por qué se parte de indicadores de EEUU para estimar el costo del capital de una PyME latinoamericana?',
      options: [
        'Porque las tasas de EEUU son más altas.',
        'Porque los mercados de LatAm son chicos, ilíquidos y volátiles, sin datos confiables; se usan los indicadores robustos de EEUU y se les suma riesgo país y prima por tamaño.',
        'Porque la ley argentina lo exige.',
        'Porque el riesgo país de EEUU es mayor.',
      ],
      correctIndex: 1,
      explanation:
        'Los mercados emergentes no tienen series confiables para estimar betas y primas. La práctica parte de los datos maduros de EEUU (Rf, ERP, beta sectorial) y traslada el resultado a la economía local agregando riesgo país y prima por tamaño.',
    },
    {
      id: 'q3',
      question: 'Si el WACC de Andina es ~21-22% y su ROIC es del 12%, ¿qué está pasando?',
      options: [
        'La empresa crea valor porque tiene ganancia contable.',
        'La empresa está destruyendo valor: el capital rinde menos de lo que cuesta, aunque el Estado de Resultados muestre utilidad.',
        'El WACC no tiene relación con el ROIC.',
        'La empresa debería endeudarse menos para bajar el ROIC.',
      ],
      correctIndex: 1,
      explanation:
        'El WACC es la vara mínima: si el ROIC (12%) es menor que el WACC (~21-22%), cada peso invertido rinde menos de lo que cuesta financiarlo. La empresa destruye valor pese a la ganancia contable.',
    },
  ],
  simulators: ['wacc'],
}
