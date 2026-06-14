import type { Lesson } from '../../types'

export const semana05: Lesson = {
  id: 'sem-05',
  week: 5,
  title: 'Lo económico vs lo financiero',
  subtitle: 'Liquidez y solvencia: por qué una empresa con ganancia puede caer, y cuando cae lo hace en forma exponencial',
  pillar: 'Económico vs Financiero',
  durationMin: 60,
  objectives: [
    'Separar con claridad el resultado (lo económico) de la caja (lo financiero) y entender que viven en planos distintos.',
    'Calcular e interpretar los ratios de liquidez (corriente, ácida, de caja) y de solvencia (deuda/PN, cobertura de intereses).',
    'Entender cómo lo financiero alimenta a lo económico y viceversa, y por qué al cruzar el punto crítico la caída se vuelve exponencial.',
    'Diseñar una salida: costos eficientes, estructura variable y no pesada, y ganar tiempo sin comprometer lo económico.',
    'Leer en Andina cómo intereses de 560 se comen un EBIT de 830 y poner número al riesgo.',
  ],
  blocks: [
    {
      type: 'theory',
      title: 'Dos relojes que no marcan la misma hora',
      body: `Hay dos preguntas que un CEO confunde permanentemente, y confundirlas cuesta empresas enteras: **"¿gané plata?"** y **"¿tengo plata?"**. La primera es económica: la responde el Estado de Resultados. La segunda es financiera: la responde la caja. Son dos relojes distintos, y casi nunca marcan la misma hora.

Lo **económico** es el devengado: vendiste, por lo tanto registrás la venta y la ganancia, aunque el cliente todavía no te haya pagado. Lo **financiero** es el percibido: la plata que de verdad entró y salió de tu cuenta. Una empresa puede estar **ganando en lo económico y muriéndose en lo financiero** al mismo tiempo, y no hay nada contradictorio en eso: es lo más normal del mundo en una PyME que crece.

El error fatal es gestionar mirando un solo reloj. El dueño que mira solo el margen no ve venir el ahogo de caja. El que mira solo la caja no entiende que está quemando rentabilidad para sobrevivir. Hay que mirar los dos, y entender cómo se hablan entre sí.`,
    },
    {
      type: 'keypoints',
      title: 'Económico vs financiero, en cuatro contrastes',
      points: [
        '**Resultado vs caja:** la ganancia es una opinión contable; la caja es un hecho bancario.',
        '**Devengado vs percibido:** vendí (devengo la ganancia) no es lo mismo que cobré (percibo la plata).',
        '**Rentabilidad vs liquidez:** podés ser muy rentable y aun así no tener con qué pagar el sueldo del viernes.',
        '**El crecimiento consume caja:** crecer en ventas exige más cuentas por cobrar y más inventario, y eso drena efectivo antes de devolverlo.',
      ],
    },
    {
      type: 'theory',
      title: 'Liquidez: ¿puedo pagar lo que vence?',
      body: `La **liquidez** mide tu capacidad de afrontar las obligaciones de corto plazo con los activos de corto plazo. Se lee con tres lentes, de más a menos indulgente:

- **Liquidez corriente** = Activo corriente / Pasivo corriente. La foto gruesa. Un valor cerca o por debajo de 1 ya es una alerta.
- **Prueba ácida (liquidez seca)** = (Activo corriente − Inventarios) / Pasivo corriente. Saca el inventario porque es lo más difícil de convertir en plata rápido y sin pérdida.
- **Liquidez de caja (defensiva)** = (Caja + Inversiones transitorias) / Pasivo corriente. La más despiadada: solo cuenta lo que ya es plata.

La diferencia entre la corriente y la ácida te dice **cuánto de tu liquidez depende de vender inventario**. Si el grueso de tu activo corriente es stock que rota lento, tu liquidez es una ilusión óptica.`,
    },
    {
      type: 'formula',
      name: 'Los tres ratios de liquidez',
      expr: 'Corriente = AC / PC   |   Ácida = (AC − Inventarios) / PC   |   Caja = (Disponibilidades) / PC',
      note: 'AC = activo corriente, PC = pasivo corriente. Cuanto más a la derecha, más exigente y más realista frente a una urgencia.',
    },
    {
      type: 'theory',
      title: 'Solvencia: ¿aguanto en el largo plazo?',
      body: `La liquidez es el corto; la **solvencia** es la estructura. Mide si la empresa puede sostener su deuda total a lo largo del tiempo, no solo pagar lo que vence el mes que viene. Dos ratios mandan:

- **Endeudamiento (Deuda / Patrimonio Neto):** cuánto pusieron los terceros por cada peso de los dueños. Cuanto más alto, más frágil sos ante cualquier sacudón, porque la deuda no espera y exige sí o sí.
- **Cobertura de intereses (EBIT / Intereses):** cuántas veces tu resultado operativo cubre el costo de la deuda. Es, probablemente, **el ratio más importante de toda esta semana**. Si te da menos de 2, estás en zona de peligro. Si te da cerca de 1, los intereses se están comiendo todo lo que generás.

La liquidez te dice si llegás a fin de mes. La solvencia te dice si llegás a fin de año. Necesitás las dos.`,
    },
    {
      type: 'case',
      title: 'Andina: el EBIT que se lo come la deuda',
      body: `Mirá los números de Andina 2024 con estos lentes nuevos.

**Solvencia.** El EBIT (resultado operativo) es de **830**. Los intereses financieros son de **560**. La cobertura de intereses es 830 / 560 = **1,48 veces**. Andina genera operativamente apenas un 48% más de lo que paga de intereses. Cualquier suba de tasa, cualquier caída de ventas, y la cobertura se cae por debajo de 1: ahí el negocio operativo ya no alcanza para pagarle al banco.

**El corazón del problema.** Andina tiene un descubierto bancario de **540** a una TNA cercana al **85%**, más préstamos varios. Esos 560 de intereses no son un detalle financiero: son la diferencia entre un resultado neto digno y los 175 raquíticos que terminó mostrando. El negocio (EBIT 830) es bueno. La estructura financiera lo está estrangulando.

**Liquidez.** La caja es de apenas **180**, contra un descubierto de 540 ya tomado. La liquidez de caja es 180 / pasivo corriente: insignificante. Andina vive del oxígeno del descubierto, y el descubierto es el aire más caro del mercado.`,
    },
    {
      type: 'simulator',
      simulatorId: 'estados',
      intro:
        'Abrí los estados de Andina y calculá vos mismo la cobertura de intereses (EBIT / intereses) y los tres ratios de liquidez. Mirá cómo la caja de 180 convive con un descubierto de 540.',
    },
    {
      type: 'theory',
      title: 'El círculo: cómo lo financiero alimenta lo económico y viceversa',
      body: `Acá está la idea que cambia la cabeza de un CEO. Lo económico y lo financiero **no son independientes: se retroalimentan**.

Lo financiero alimenta lo económico: cuando te quedás sin caja, tomás descubierto. El descubierto genera intereses. Los intereses **bajan el resultado económico**. Un problema financiero se convirtió en un problema económico.

Y al revés: cuando el resultado económico cae, tenés menos utilidad para reinvertir y menos respaldo para tomar deuda barata. Entonces dependés más del crédito caro, que **vuelve a drenar caja**. Un problema económico se convirtió en un problema financiero.

Es un círculo. Y el círculo puede ser virtuoso (caja sana → poca deuda cara → buen resultado → más caja) o vicioso (poca caja → deuda cara → mal resultado → menos caja). En el vicioso, cada vuelta es peor que la anterior.`,
    },
    {
      type: 'insight',
      body: 'Mientras la cobertura de intereses está por encima de 1, el círculo gira despacio y parece manejable. Cuando cruza por debajo de 1, los intereses empiezan a comerse el capital de trabajo, hay que tomar más deuda para pagar la deuda, y la curva deja de ser una pendiente para volverse una caída. El deterioro no es lineal: es exponencial.',
    },
    {
      type: 'warning',
      body: 'El punto crítico no avisa con estruendo. Se cruza en silencio: un mes pedís un poco más de descubierto, al siguiente otro poco, y de pronto el costo financiero crece más rápido que tu resultado operativo. Para cuando se ve en el balance, ya estás del otro lado de la curva. Por eso la cobertura de intereses se mira todos los meses, no una vez al año.',
    },
    {
      type: 'theory',
      title: 'Cómo salir: eficiencia, estructura liviana y comprar tiempo',
      body: `Salir de la caída exponencial tiene tres movimientos, y el orden importa:

- **Hacer eficientes los costos sin tocar el músculo.** No es recortar a ciegas: es eliminar lo que no genera valor para que el EBIT respire y la cobertura de intereses suba. Cada punto de margen operativo recuperado aleja el punto crítico.
- **Estructuras variables, no pesadas.** Una empresa con costos fijos altos y deuda dura es rígida: cuando bajan las ventas, no puede achicarse y la caída la arrastra. Convertir fijo en variable (tercerizar, alquilar en vez de comprar, comisiones en vez de sueldos rígidos) le da elasticidad para no quebrarse en la curva.
- **Ganar tiempo sin comprometer lo económico.** Reestructurar deuda cara por deuda más barata o más larga, estirar plazos con proveedores, ordenar el capital de trabajo. La clave: comprar tiempo **sin** rematar inventario ni regalar margen, porque eso apaga el incendio financiero prendiendo el económico.

El objetivo de los tres es el mismo: subir la cobertura de intereses por encima de 1 con holgura, y volver a poner el círculo a girar para el lado virtuoso.`,
    },
    {
      type: 'table',
      title: 'Andina hoy vs. una Andina que se ordenó',
      headers: ['Indicador', 'Hoy', 'Ordenada', 'Qué cambió'],
      rows: [
        ['EBIT', '830', '950', 'Costos más eficientes, menos gasto sin valor'],
        ['Intereses', '560', '320', 'Descubierto del 85% reemplazado por deuda más barata y larga'],
        ['Cobertura (EBIT/Int.)', '1,48', '2,97', 'Salió de la zona de peligro'],
        ['Resultado neto', '175', '410', 'Lo económico deja de drenarse por lo financiero'],
      ],
    },
    {
      type: 'claude',
      goal: 'Que Claude haga el diagnóstico económico-financiero de tu empresa y te diga a qué distancia estás del punto crítico.',
      prompt:
        'Sos un CFO experto en reestructuración de PyMEs. Te voy a dar mi activo y pasivo corriente, mi caja, mi inventario, mi EBIT y mis intereses anuales. Quiero que: (1) calcules liquidez corriente, ácida y de caja, y endeudamiento y cobertura de intereses; (2) me digas en lenguaje claro si estoy del lado seguro o cerca del punto crítico donde la caída se vuelve exponencial; (3) me propongas tres movimientos concretos para subir la cobertura de intereses sin rematar inventario ni regalar margen. Empezá pidiéndome los datos uno por uno.',
      note: 'Cargá tus números reales o los de Andina (EBIT 830, intereses 560, caja 180, inventario 2400). La cobertura de intereses es la cifra que tenés que conocer de memoria.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      question: '¿Qué mide la cobertura de intereses (EBIT / Intereses) y qué pasa cuando se acerca a 1?',
      options: [
        'Mide la liquidez inmediata; cerca de 1 está todo bien.',
        'Mide cuántas veces el resultado operativo cubre el costo de la deuda; cerca de 1 los intereses se comen casi todo lo que genera el negocio.',
        'Mide el margen bruto; cerca de 1 significa que se vende al costo.',
        'Mide el patrimonio neto sobre la deuda; cerca de 1 no tiene importancia.',
      ],
      correctIndex: 1,
      explanation:
        'La cobertura de intereses indica cuántas veces el EBIT cubre los intereses. Cuando se acerca a 1, el resultado operativo apenas alcanza para pagar la deuda; por debajo de 1, el negocio operativo ya no cubre el costo financiero.',
    },
    {
      id: 'q2',
      question: 'En Andina, EBIT 830 e intereses 560. ¿Qué describe mejor su situación?',
      options: [
        'El negocio operativo es malo y por eso gana poco.',
        'El negocio operativo es bueno, pero la estructura financiera (deuda cara) lo está estrangulando: cobertura de apenas 1,48.',
        'No tiene deuda relevante.',
        'La caja es abundante y no hay riesgo.',
      ],
      correctIndex: 1,
      explanation:
        'El EBIT de 830 muestra un negocio operativo sano, pero los 560 de intereses (descubierto al ~85% y préstamos caros) dejan una cobertura de 1,48 y reducen el resultado neto a 175. El problema es financiero, no operativo.',
    },
    {
      id: 'q3',
      question: '¿Por qué la caída se vuelve "exponencial" tras cruzar el punto crítico?',
      options: [
        'Porque la contabilidad se calcula con exponentes.',
        'Porque al cruzar el punto crítico hay que tomar más deuda para pagar deuda, los intereses crecen más rápido que el resultado y cada vuelta del círculo es peor que la anterior.',
        'Porque las ventas siempre se duplican.',
        'Porque el impuesto a las ganancias sube de golpe.',
      ],
      correctIndex: 1,
      explanation:
        'Cuando los intereses superan lo que el negocio genera, se toma deuda para pagar deuda y el costo financiero crece sobre una base cada vez mayor. El deterioro deja de ser lineal y se acelera en cada ciclo.',
    },
  ],
  simulators: ['estados'],
}
