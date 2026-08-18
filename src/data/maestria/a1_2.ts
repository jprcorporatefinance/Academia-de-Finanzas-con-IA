import type { Asignatura } from './types'

// ============================================================================
// ASIGNATURA 1.2 — Arquitectura de Datos Financieros, Integración con el ERP
// y Gobierno del Dato
// ============================================================================
export const a1_2: Asignatura = {
  cod: '1.2',
  slug: 'a1-2',
  cuatrimestre: 1,
  fase: 'Descriptiva · ¿Qué sucedió?',
  nombre: 'Arquitectura de Datos Financieros, Integración con el ERP y Gobierno del Dato',
  horas: '36 h · 12 teóricas / 24 prácticas',
  correlativas: 'Sin correlativas · Primer cuatrimestre',
  framework: 'Kimball · Reis & Housley · Model Context Protocol (Anthropic)',
  resumen:
    'La infraestructura que hace que un número sea trazable desde el sistema de gestión hasta el informe. Extracción reproducible del ERP, un servidor MCP propio de sólo lectura, capa semántica financiera y gobierno del dato.',
  objetivos: [
    'Comprender la arquitectura de datos de un ERP y localizar la información financieramente relevante.',
    'Extraer datos de manera automatizada, segura y reproducible mediante SQL, OData y API.',
    'Aprender el Protocolo de Contexto de Modelo (MCP) e implementar un servidor propio de sólo lectura sobre el ERP, con versionado y registro de auditoría.',
    'Construir una capa semántica financiera estable: una definición única, versionada y documentada de cada métrica.',
    'Definir y aplicar políticas de calidad, seguridad, confidencialidad y trazabilidad del dato.',
  ],
  sections: [
    {
      title: 'El ERP como sistema de información financiera',
      intro:
        'Antes de extraer un dato hay que saber dónde vive y qué significa. Un ERP no es una base de datos: es un modelo del negocio, y cada línea del estado de resultados y del balance tiene su origen en una tabla concreta.',
      blocks: [
        {
          t: 'p',
          md: 'La arquitectura funcional de un ERP —ventas, compras, stock, tesorería, cuentas corrientes, nómina, contabilidad— se corresponde punto por punto con las líneas de los estados contables. El **modelo relacional** que hay debajo (tablas, claves primarias y foráneas, integridad referencial) es el mapa que el analista debe leer para saber de dónde sale cada peso.',
        },
        {
          t: 'p',
          md: 'En la PyME argentina conviven **Finnegans**, Tango, Bejerman, Odoo, SAP Business One y Acumatica, además de desarrollos propios. Cambian los nombres de las tablas, no los conceptos: siempre hay un maestro de artículos, uno de clientes, un libro de ventas, uno de compras y un mayor contable. El patrón de trabajo se aprende una vez y se traslada a cualquier sistema.',
        },
        {
          t: 'idea',
          md: 'La trazabilidad empieza en el ERP. Si el número no se puede reconstruir desde la transacción que lo originó, no es auditable — y un modelo no auditable no es profesionalmente utilizable.',
        },
      ],
    },
    {
      title: 'Extracción: SQL, OData y API',
      intro: 'Tres vías para sacar el dato del sistema sin romperlo ni depender de exportaciones manuales a mano.',
      blocks: [
        {
          t: 'ul',
          items: [
            '**SQL para finanzas:** agregaciones (`SUM`, `GROUP BY`), uniones entre maestros y movimientos, **funciones de ventana** (saldos acumulados, rankings) y funciones analíticas. Es el lenguaje de la extracción de fondo.',
            '**OData:** capa de servicios que muchos ERP exponen sobre sus entidades, con filtrado y paginación estándar. Útil cuando no hay acceso directo a la base.',
            '**API REST:** interfaces documentadas del ERP para lectura programática. Requieren autenticación segura y manejo de credenciales.',
            '**Extracción incremental:** traer sólo lo que cambió desde la última corrida (por fecha de modificación o *log* de cambios), para que el proceso sea rápido y repetible.',
          ],
        },
        {
          t: 'warn',
          md: 'La exportación manual a planilla es el enemigo de la reproducibilidad: no deja rastro, no se puede versionar y se rompe cada vez que cambia una persona. Todo lo que se hace a mano una vez, se automatiza para siempre.',
        },
      ],
    },
    {
      title: 'MCP — fundamentos del Protocolo de Contexto de Modelo',
      intro:
        'El Model Context Protocol (MCP), estándar abierto presentado por Anthropic en noviembre de 2024, resuelve un problema concreto: darle a un modelo de IA —y a cualquier cliente— acceso seguro, gobernado y reproducible a los datos, sin construir un conector a medida por cada sistema.',
      blocks: [
        {
          t: 'p',
          md: 'MCP adopta una arquitectura **cliente-servidor** con tres roles: el **host** (la aplicación que orquesta al modelo), el **cliente** (intermediario que gestiona la comunicación bidireccional) y el **servidor** (proceso independiente que expone capacidades). La comunicación usa mensajes **JSON-RPC** (solicitudes, respuestas y notificaciones) sobre dos transportes: `stdio` (local) y HTTP con *streaming* y eventos del servidor (SSE) para lo remoto.',
        },
        {
          t: 'table',
          title: 'Las tres capacidades que expone un servidor MCP',
          headers: ['Capacidad', 'Qué es', 'Ejemplo en el ERP'],
          firstColLeft: true,
          rows: [
            ['Herramientas (tools)', 'Acciones invocables con esquema de entrada y salida', 'consultar_ventas(desde, hasta)'],
            ['Recursos (resources)', 'Contenidos legibles direccionables', 'plan_de_cuentas, maestro_clientes'],
            ['Indicaciones (prompts)', 'Plantillas de interacción reutilizables', 'armar_cobranzas_del_mes'],
          ],
          caption: 'Cada herramienta declara su contrato: parámetros, validaciones y formato de respuesta. El descubrimiento de capacidades es parte del protocolo.',
        },
        {
          t: 'p',
          md: 'La especificación evoluciona rápido: las versiones de 2025 y 2026 incorporan **autorización** robusta, ejecución **asíncrona** de tareas largas y un núcleo *stateless* que escala sobre infraestructura HTTP común. Para la función financiera, lo relevante es que el mismo protocolo sirve para un tablero, un motor de cálculo o un agente.',
        },
      ],
    },
    {
      title: 'MCP — diseño del servidor sobre el ERP',
      intro: 'Un buen servidor no expone “todo”: expone un conjunto acotado de herramientas con contratos precisos.',
      blocks: [
        {
          t: 'steps',
          title: 'Decisiones de diseño',
          items: [
            { k: 'Seleccionar el conjunto de herramientas', d: 'Ventas, compras, stock y movimientos de depósito, cuentas corrientes deudoras y acreedoras, cheques, nómina, mayor contable y resultados. Ni más ni menos.' },
            { k: 'Definir el contrato de cada herramienta', d: 'Parámetros, validaciones y formato de respuesta explícitos. El esquema es el contrato entre quien produce y quien consume el dato.' },
            { k: 'Fijar la granularidad', d: 'Una herramienta que devuelve “todo” es una mala herramienta: obliga a filtrar del lado del cliente, no valida nada y no se puede auditar. Preferí herramientas específicas y componibles.' },
          ],
        },
        {
          t: 'quote',
          author: 'Ralph Kimball',
          credential: 'The Data Warehouse Toolkit',
          md: 'El valor de un sistema de datos se mide por la facilidad con que la gente correcta obtiene la respuesta correcta. La complejidad debe quedar del lado del diseño, no del lado del usuario que consulta.',
        },
      ],
    },
    {
      title: 'MCP — implementación, consumo y verificación',
      intro: 'La implementación es lo que convierte el diseño en algo confiable, gobernado y transferible.',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Acceso de sólo lectura:** el servidor nunca escribe en el ERP. Es una garantía de diseño, no una promesa.',
            '**Límites de volumen** de respuesta para no colapsar el sistema de gestión.',
            '**Versionado del contrato:** cuando cambia una herramienta, cambia su versión, y los consumidores no se rompen en silencio.',
            '**Credenciales fuera del código** y manejo seguro de secretos.',
            '**Registro de auditoría de cada llamada:** consulta, parámetros, herramienta, dato devuelto y momento. Es lo que permite reconstruir de dónde salió cualquier número de un informe.',
          ],
        },
        {
          t: 'chain',
          title: 'El circuito completo del dato',
          nodes: ['ERP', 'Servidor MCP (sólo lectura, auditado)', 'Cliente / capa semántica', 'Motores, tableros y agentes'],
          caption: 'Motores de cálculo, tableros y agentes obtienen el mismo dato por la misma vía. La trazabilidad sobrevive al pasaje del sistema de gestión a la hoja de cálculo (asignatura 2.3).',
        },
        {
          t: 'idea',
          md: 'Frente al conector construido a medida, MCP aporta cuatro cosas que la PyME necesita y rara vez tiene: **permiso explícito por diseño, trazabilidad, reproducibilidad y transferibilidad**. El mismo patrón se aplica después contra Finnegans, Tango, SAP Business One o un desarrollo propio.',
        },
      ],
    },
    {
      title: 'Transformación, modelado dimensional y capa semántica',
      intro: 'Del dato crudo al dato con significado: procesos ETL, modelo dimensional y una definición única de cada métrica.',
      blocks: [
        {
          t: 'p',
          md: 'La **transformación (ETL)** normaliza el plan de cuentas y construye la **tabla de mapeo contable-analítico**: la que traduce las cuentas del ERP a los rubros que necesita el análisis financiero. Sobre ella se arma un **diseño dimensional** al estilo Kimball —tablas de hechos (movimientos, ventas) y de dimensiones (tiempo, cliente, producto, centro de costo)— que hace las consultas rápidas y comprensibles.',
        },
        {
          t: 'formula',
          name: 'La capa semántica financiera',
          expr: 'una métrica = una definición · versionada · documentada',
          note: 'Que “margen bruto” o “capital invertido” signifiquen exactamente lo mismo en el modelo, en el tablero y en el informe. Sin capa semántica, cada área calcula distinto y nadie concilia.',
        },
        {
          t: 'quote',
          author: 'Joe Reis & Matt Housley',
          credential: 'Fundamentals of Data Engineering',
          md: 'La ingeniería de datos existe para servir datos confiables y utilizables. La calidad, la gobernanza y la reproducibilidad no son adornos: son el producto.',
        },
      ],
    },
    {
      title: 'Calidad, gobierno y confidencialidad del dato',
      intro: 'Un dato sin gobierno es un riesgo. La última capa de la asignatura es la que lo vuelve confiable y legal.',
      blocks: [
        {
          t: 'ul',
          items: [
            '**Calidad:** perfilado, detección de valores atípicos y faltantes, integridad referencial y **conciliación con el balance publicado** como prueba de que la extracción no perdió ni duplicó nada.',
            '**Gobierno y seguridad:** roles y permisos con criterio de **menor privilegio**, anonimización de datos sensibles y registro de auditoría.',
            '**Marco legal:** Ley 25.326 de Protección de los Datos Personales, cláusulas de confidencialidad, continuidad y resguardo.',
            '**Explotación:** publicación hacia visualización y hacia los motores de cálculo, con actualización automatizada.',
          ],
        },
        {
          t: 'warn',
          md: 'La conciliación con el balance no es opcional. Si la suma de lo extraído no cierra contra el estado publicado, todo lo que se construya encima hereda ese error. Es la prueba de veracidad de la capa de datos.',
        },
      ],
    },
    {
      title: 'SQL para finanzas en profundidad',
      intro: 'El lenguaje de la extracción de fondo. No hace falta ser un experto en bases de datos, pero sí dominar el puñado de construcciones que resuelven el 90 % de las necesidades financieras.',
      blocks: [
        { t: 'ul', items: [
          '**Agregaciones con GROUP BY:** sumar ventas por mes, por cliente o por producto es la operación más básica y más usada.',
          '**Uniones (JOIN):** conectar el libro de ventas con el maestro de clientes, o los movimientos con el plan de cuentas. La mayoría de los datos financieros vive repartida en varias tablas.',
          '**Funciones de ventana (window functions):** calcular un **saldo acumulado** de caja, un ranking de clientes por facturación o una media móvil sin colapsar el detalle de cada fila. Son la herramienta que separa al analista del principiante.',
          '**Funciones analíticas:** comparar cada período con el anterior (variación interanual), calcular participaciones sobre el total, o identificar el primer y último movimiento de cada cuenta.',
        ] },
        { t: 'formula', name: 'Patrón de saldo acumulado', expr: 'SUM(monto) OVER (PARTITION BY cuenta ORDER BY fecha)', note: 'Una función de ventana reconstruye el saldo de una cuenta corriente sin necesidad de arrastrar fórmulas ni exportar a Excel.' },
        { t: 'p', md: 'La **extracción incremental** cierra el círculo: en vez de traer toda la base cada vez, se trae solo lo que cambió desde la última corrida (por fecha de modificación o por un registro de cambios). Esto hace que el proceso sea rápido, repetible y apto para automatizar —condición para que motores, tableros y agentes trabajen siempre sobre el dato más reciente sin intervención manual—.' },
      ],
    },
    {
      title: 'El ciclo de una llamada MCP',
      intro: 'Entender qué pasa exactamente cuando un cliente invoca una herramienta del servidor desmitifica el protocolo y permite diseñarlo bien.',
      blocks: [
        { t: 'steps', title: 'De la intención al dato, paso a paso', items: [
          { k: 'Descubrimiento', d: 'El cliente pregunta al servidor qué capacidades ofrece (herramientas, recursos, indicaciones) y con qué esquemas. El servidor responde con su catálogo.' },
          { k: 'Invocación', d: 'El cliente llama a una herramienta con parámetros que respetan el esquema de entrada (p. ej. consultar_ventas(desde, hasta).' },
          { k: 'Validación', d: 'El servidor valida los parámetros contra el contrato antes de tocar el ERP. Si algo no cumple, devuelve un error estructurado, no un dato basura.' },
          { k: 'Ejecución de sólo lectura', d: 'El servidor consulta el ERP con permiso acotado, aplica límites de volumen y arma la respuesta según el esquema de salida.' },
          { k: 'Respuesta y auditoría', d: 'Devuelve el dato al cliente y registra la llamada completa (consulta, parámetros, resultado, momento) en el log de auditoría.' },
        ] },
        { t: 'p', md: 'Toda esta conversación viaja en mensajes **JSON-RPC** (solicitudes, respuestas y notificaciones) sobre el transporte elegido: `stdio` para integraciones locales, o HTTP con streaming y eventos del servidor (SSE) para lo remoto. El **manejo y la propagación de errores** son parte del contrato: un buen servidor nunca devuelve un error crudo del ERP, sino uno interpretable por el cliente.' },
        { t: 'idea', md: 'La spec de 2025-2026 agrega ejecución **asíncrona** de tareas largas (para consultas pesadas que no responden al instante) y un núcleo **stateless** que escala sobre infraestructura HTTP común. Para la función financiera, lo importante es que el mismo servidor sirve a un tablero, a un motor de cálculo o a un agente de IA, con idéntica trazabilidad.' },
      ],
    },
    {
      title: 'Diseño del contrato de una herramienta',
      intro: 'La calidad de un servidor MCP se decide en el diseño de sus contratos. Una herramienta bien contratada es específica, validada y auditable; una mal contratada es una puerta a errores silenciosos.',
      blocks: [
        { t: 'table', title: 'Anatomía del contrato de una herramienta', headers: ['Elemento', 'Qué define', 'Ejemplo'], firstColLeft: true, rows: [
          ['Nombre', 'Qué hace, sin ambigüedad', 'consultar_cuenta_corriente_deudor'],
          ['Parámetros', 'Entradas con tipo y validación', 'cliente_id (entero), desde/hasta (fecha)'],
          ['Esquema de salida', 'Forma exacta del resultado', 'lista de movimientos con saldo'],
          ['Validaciones', 'Qué se rechaza y por qué', 'rango de fechas máximo 12 meses'],
          ['Versión', 'Contrato versionado', 'v1, v2… sin romper consumidores'],
        ], caption: 'La granularidad es la decisión de diseño más importante: una herramienta que "devuelve todo" traslada el filtrado al cliente, no valida y es imposible de auditar bien.' },
        { t: 'quote', author: 'Especificación MCP (Anthropic)', credential: 'Building effective agents', md: 'Diseñá herramientas específicas y componibles, no una única herramienta omnipotente. La especificidad hace el sistema predecible, auditable y seguro.' },
        { t: 'p', md: 'Las **credenciales** viven fuera del código (en un gestor de secretos), el acceso es de **sólo lectura**, y cada herramienta declara su **versión**. Cuando el contrato evoluciona, los consumidores migran de forma ordenada en vez de romperse en silencio. Es exactamente la disciplina que permite que el mismo patrón se traslade después a Finnegans, Tango, SAP Business One o un desarrollo propio: cambia la implementación interna, no el contrato.' },
      ],
    },
    {
      title: 'Modelado dimensional aplicado a finanzas',
      intro: 'El dato extraído se organiza para el análisis con un diseño dimensional. No es teoría de bases de datos: es lo que hace que las preguntas del directorio se respondan en segundos.',
      blocks: [
        { t: 'p', md: 'En el enfoque de **Kimball**, los datos se organizan en **tablas de hechos** (los eventos medibles: ventas, movimientos, cobranzas) y **tablas de dimensiones** (el contexto por el que se analizan: tiempo, cliente, producto, centro de costo). El resultado es un **esquema en estrella**: los hechos en el centro, las dimensiones alrededor.' },
        { t: 'chain', title: 'El esquema en estrella de finanzas', nodes: ['Dimensión tiempo', 'HECHOS: movimientos y ventas', 'Dimensión cliente/producto'], caption: 'Cada hecho se puede cortar por cualquier dimensión: ventas por mes, por cliente, por producto, o cualquier combinación.' },
        { t: 'p', md: 'Sobre este modelo se apoya la **tabla de mapeo contable-analítico** —la que traduce cada cuenta del ERP al rubro que necesita el análisis financiero— y la **capa semántica**, que define una única vez, versionada y documentada, qué significa cada métrica. Así, "margen bruto" o "capital invertido" significan exactamente lo mismo en el modelo, en el tablero y en el informe. Sin esa capa, cada área calcula distinto y nadie concilia.' },
        { t: 'quote', author: 'Ralph Kimball', credential: 'The Data Warehouse Toolkit', md: 'La consistencia de las dimensiones conformadas es lo que permite que toda la organización hable el mismo idioma de datos. Una dimensión "cliente" compartida vale más que diez tableros aislados.' },
      ],
    },
    {
      title: 'El panorama de ERPs de la PyME argentina',
      intro: 'Cambian los nombres de las tablas, no los conceptos. Conocer el mapa de los sistemas más difundidos permite trasladar el mismo patrón de extracción a cualquiera.',
      blocks: [
        { t: 'table', title: 'Sistemas y su acceso a datos', headers: ['ERP', 'Perfil', 'Vías de acceso'], firstColLeft: true, rows: [
          ['Finnegans', 'Nube, PyME-media argentina', 'API REST / OData'],
          ['Tango / Bejerman', 'Amplia base instalada local', 'SQL directo / exportaciones'],
          ['SAP Business One', 'Media-grande', 'SQL / Service Layer (OData)'],
          ['Odoo', 'Open source, flexible', 'API XML-RPC / SQL'],
          ['Acumatica', 'Nube', 'API REST'],
          ['Desarrollo propio', 'Variable', 'SQL directo'],
        ], caption: 'Siempre hay un maestro de artículos, uno de clientes, un libro de ventas, uno de compras y un mayor contable. El patrón de trabajo se aprende una vez sobre uno y se traslada al resto.' },
        { t: 'p', md: 'La arquitectura funcional de cualquiera de ellos se corresponde punto por punto con las líneas del estado de resultados y del balance: el módulo de ventas alimenta los ingresos, el de compras y stock el costo de mercadería vendida, el de tesorería la caja, el de cuentas corrientes los créditos y las deudas. Leer ese mapa es el primer paso para saber de dónde sale cada peso.' },
      ],
    },
    {
      title: 'Calidad del dato: perfilar y conciliar',
      intro: 'Un dato extraído no es un dato confiable. La capa de calidad es la que separa un tablero que informa de uno que engaña.',
      blocks: [
        { t: 'ul', items: [
          '**Perfilado (profiling):** caracterizar cada campo —valores atípicos, faltantes, rangos, formatos— antes de usarlo. Un precio negativo o una fecha imposible se detectan acá, no en el informe final.',
          '**Integridad referencial:** verificar que cada movimiento apunte a un cliente, un artículo y una cuenta existentes. Los "huérfanos" son errores que se propagan.',
          '**Conciliación con el balance publicado:** la prueba de veracidad definitiva. Si la suma de lo extraído no cierra contra el estado publicado, todo lo que se construya encima hereda ese error.',
          '**Pruebas automatizadas:** los controles de calidad se codifican y corren en cada actualización, no se hacen a ojo una sola vez.',
        ] },
        { t: 'quote', author: 'Joe Reis & Matt Housley', credential: 'Fundamentals of Data Engineering', md: 'La calidad de datos no es un proyecto que se termina: es una disciplina continua. Un pipeline sin controles de calidad automatizados es una bomba de tiempo que explotará en el peor momento —normalmente frente al directorio—.' },
      ],
    },
    {
      title: 'Gobierno, seguridad y confidencialidad del dato',
      intro: 'El acceso al dato financiero es un privilegio que se gobierna. En la empresa familiar, además, la confidencialidad es una condición del vínculo.',
      blocks: [
        { t: 'ul', items: [
          '**Menor privilegio:** cada rol recibe solo el acceso que necesita para su tarea. El servidor MCP de sólo lectura es la encarnación de este principio.',
          '**Anonimización:** los datos sensibles se enmascaran cuando salen del perímetro (por ejemplo, para el repositorio público del laboratorio, con magnitudes convertidas a índices de base cien).',
          '**Registro de auditoría:** cada acceso queda registrado —quién, qué, cuándo—, lo que permite reconstruir cualquier consulta y detectar usos indebidos.',
          '**Marco legal:** la Ley 25.326 de Protección de los Datos Personales, más las cláusulas de confidencialidad, continuidad y resguardo del convenio con la empresa.',
        ] },
        { t: 'idea', md: 'En la Maestría esto no es teórico: el Trabajo Final se desarrolla bajo convenio de confidencialidad entre la empresa, el maestrando y la Universidad, y su versión pública se anonimiza —identidades sustituidas y magnitudes convertidas a índices de base cien preservando las proporciones reales—. El gobierno del dato es la condición que hace posible trabajar con empresas reales.' },
      ],
    },
    {
      title: 'El circuito completo, de punta a punta',
      intro: 'Todo lo anterior se integra en un circuito reproducible que un tercero puede correr y auditar. Ese circuito es el entregable real de la asignatura.',
      blocks: [
        { t: 'chain', title: 'El flujo del dato trazable', nodes: ['ERP', 'Servidor MCP (auditado)', 'ETL + capa semántica', 'Modelo dimensional', 'Excel (2.3) y Python (1.3)'], caption: 'Motores de cálculo, tableros y agentes obtienen el mismo dato por la misma vía. La trazabilidad sobrevive al pasaje del sistema de gestión a la hoja de cálculo.' },
        { t: 'p', md: 'La prueba de que el circuito funciona es la **verificación cruzada**: el mismo número —digamos, el capital de trabajo— debe dar igual calculado en el Excel de matrices dinámicas (asignatura 2.3) y en el motor de Python (asignatura 1.3), ambos alimentados por la misma capa semántica sobre el mismo servidor MCP. Si difieren, hay un error que la arquitectura permite localizar exactamente, porque cada número es trazable hasta la llamada que lo originó.' },
        { t: 'quote', author: 'Especificación MCP (Anthropic)', credential: 'Model Context Protocol', md: 'La reproducibilidad no es un lujo: es la condición para que un resultado sea confiable. Un análisis que no se puede volver a correr, paso a paso, contra la misma fuente, es una opinión, no un hallazgo.' },
      ],
    },
  ],
  expertos: [
    { author: 'Ralph Kimball', credential: 'The Data Warehouse Toolkit', md: 'El modelo dimensional —hechos y dimensiones— existe para que las preguntas del negocio se respondan rápido y sin ambigüedad. La normalización extrema sirve a la transacción; el análisis necesita otra forma.' },
    { author: 'Joe Reis & Matt Housley', credential: 'Fundamentals of Data Engineering', md: 'El ciclo de vida de la ingeniería de datos —generación, ingesta, transformación, servicio— se sostiene sobre corrientes transversales: seguridad, gestión de datos, DataOps y gobernanza.' },
    { author: 'Especificación MCP (Anthropic)', credential: 'Model Context Protocol, 2024–2026', md: 'Un estándar abierto de conexión reemplaza a la maraña de conectores a medida: herramientas, recursos e indicaciones con contrato explícito, descubribles y gobernados.' },
  ],
  caso: {
    titulo: 'Del ERP al estado analítico, con trazabilidad',
    empresa: 'Maderas del Litoral S.A. — datos de gestión sobre ERP',
    contexto:
      'La contadora de Maderas del Litoral arma los estados a mano, exportando planillas del ERP y pegándolas en una hoja madre. Nadie puede reconstruir de dónde salió cada número, y cada cierre depende de que ella esté disponible.\n\nEl encargo del área de sistemas y del consultor: diseñar un servidor MCP de sólo lectura sobre el ERP que exponga las seis herramientas nucleares (ventas, compras, stock, CxC, CxP y mayor), construir la tabla de mapeo contable-analítico y demostrar la trazabilidad conciliando la suma de lo extraído contra el balance publicado.\n\nEl entregable no es un informe: es un circuito reproducible que un tercero pueda correr y auditar.',
    datos: [
      {
        t: 'table',
        title: 'Cuentas del ERP extraídas y su rubro analítico (miles de $)',
        headers: ['Cuenta ERP', 'Saldo', 'Rubro analítico'],
        firstColLeft: true,
        rows: [
          ['Caja', '380', 'Disponibilidades'],
          ['Banco cuenta corriente', '220', 'Disponibilidades'],
          ['Deudores por ventas', '2.800', 'Créditos por ventas'],
          ['Documentos a cobrar', '300', 'Créditos por ventas'],
          ['Mercaderías', '2.600', 'Bienes de cambio'],
          ['Rodados', '480', 'Bienes de uso'],
          ['Maquinaria', '420', 'Bienes de uso'],
          ['Proveedores', '1.900', 'Deudas comerciales'],
          ['Préstamos bancarios', '4.200', 'Deudas financieras'],
          ['Cheques de pago diferido', '2.300', 'Deudas financieras'],
        ],
      },
    ],
    consigna: [
      '¿Qué seis herramientas MCP expondría el servidor y con qué contrato (parámetros y respuesta) cada una?',
      '¿La suma de lo extraído por rubro analítico concilia con el balance publicado? ¿Dónde aparece la diferencia?',
      '¿Qué política de sólo lectura, versionado y auditoría garantiza la trazabilidad del circuito?',
      '¿Cómo se conecta esta capa con el modelo Excel de la asignatura 2.3 y con el estado analítico de la 1.1?',
    ],
    metodologia: [
      { k: 'Mapear (contable → analítico)', d: 'Asignar cada cuenta del ERP a su rubro analítico con una tabla de mapeo única y versionada.' },
      { k: 'Definir el contrato MCP', d: 'Seis herramientas de sólo lectura, con esquema de entrada/salida y granularidad específica (nada de “devolver todo”).' },
      { k: 'Conciliar', d: 'Sumar lo extraído por rubro y compararlo contra el saldo del balance publicado; marcar los desvíos.' },
      { k: 'Gobernar', d: 'Menor privilegio, credenciales fuera del código, registro de auditoría de cada llamada.' },
      { k: 'Publicar', d: 'Entregar el circuito reproducible que alimenta motores, tableros y el modelo de la 2.3.' },
    ],
  },
  model: {
    sheetTitle: 'Mapa contable-analítico y conciliación con el balance',
    intro:
      'El modelo concilia la extracción del ERP contra el balance publicado usando matrices dinámicas: MAP/LAMBDA suman cada rubro desde el arreglo de cuentas, y una sola fórmula derrama toda la conciliación. Cambiá la tolerancia o los saldos de control (celdas marfil).',
    inputs: [
      { key: 'tol', label: 'Tolerancia de conciliación', value: 10, fmt: 'money', unit: 'miles $', note: 'Diferencia máxima aceptada por rubro antes de marcar REVISAR.' },
      { key: 'balDisp', label: 'Balance — Disponibilidades', value: 600, fmt: 'money' },
      { key: 'balCred', label: 'Balance — Créditos por ventas', value: 3160, fmt: 'money', note: 'Incluye un saldo aún no depurado.' },
      { key: 'balBC', label: 'Balance — Bienes de cambio', value: 2600, fmt: 'money' },
      { key: 'balBU', label: 'Balance — Bienes de uso', value: 900, fmt: 'money' },
      { key: 'balDeC', label: 'Balance — Deudas comerciales', value: 1900, fmt: 'money' },
      { key: 'balDeF', label: 'Balance — Deudas financieras', value: 6500, fmt: 'money' },
    ],
    calcs: [
      { key: 'totalExtr', label: 'Total extraído del ERP', xl: '=SUM({380;220;2800;300;2600;480;420;1900;4200;2300})', fmt: 'money' },
      { key: 'totalBal', label: 'Total del balance (control)', xl: '=[balDisp]+[balCred]+[balBC]+[balBU]+[balDeC]+[balDeF]', fmt: 'money' },
      { key: 'difTotal', label: 'Diferencia total', xl: '=[totalExtr]-[totalBal]', fmt: 'money', highlight: true },
      { key: 'pctConc', label: 'Grado de conciliación', xl: '=1-ABS([difTotal])/[totalBal]', fmt: 'pct2', highlight: true },
    ],
    spills: [
      {
        key: 'concil',
        title: 'Conciliación por rubro analítico',
        columns: ['Rubro analítico', 'Suma desde el ERP', 'Saldo del balance', 'Diferencia', 'Estado'],
        xl: '=LET(rub,{"Disponibilidades";"Créditos por ventas";"Bienes de cambio";"Bienes de uso";"Deudas comerciales";"Deudas financieras"}, code,{1;1;2;2;3;4;4;5;6;6}, saldo,{380;220;2800;300;2600;480;420;1900;4200;2300}, bal,VSTACK([balDisp],[balCred],[balBC],[balBU],[balDeC],[balDeF]), extr,MAP(SEQUENCE(6),LAMBDA(k,SUM(IF(code=k,saldo,0)))), dif,extr-bal, est,IF(ABS(dif)<=[tol],"OK","REVISAR"), HSTACK(rub,extr,bal,dif,est))',
        formats: [undefined, 'money', 'money', 'money', undefined],
        rows: 6,
        note: 'MAP + LAMBDA suman cada rubro desde el arreglo de cuentas del ERP; VSTACK arma el vector de saldos del balance; IF-arreglo marca el estado. Una sola fórmula derrama las seis filas.',
      },
    ],
    conclusions: [
      { label: 'Trazabilidad', xl: '=IF(ABS([difTotal])<=[tol],"La extracción concilia con el balance ("&TEXT([pctConc],"0.00%")&"): el circuito ERP→analítico es trazable.","Hay "&TEXT([difTotal],"#,##0")&" miles de diferencia ("&TEXT([pctConc],"0.00%")&" conciliado): revisar el mapeo del rubro marcado REVISAR antes de construir sobre estos datos.")' },
      { label: 'Gobierno', xl: '="Cada saldo de este modelo debe poder reconstruirse desde una llamada auditada al servidor MCP de sólo lectura: consulta, parámetros, herramienta, dato y momento."' },
    ],
  },
  ejercicio: {
    titulo: 'Conciliar la extracción del ERP con el balance',
    enunciado:
      'Se extraen del ERP tres rubros vía el servidor MCP y se comparan con el balance publicado. El área contable quiere saber si la extracción es fiel o si hay que revisar el mapeo.',
    datos: [
      {
        t: 'table',
        title: 'Extracción vs. balance (miles de $)',
        headers: ['Rubro analítico', 'Suma desde el ERP', 'Saldo del balance'],
        firstColLeft: true,
        rows: [
          ['Disponibilidades (caja 300 + banco 200)', '500', '500'],
          ['Créditos por ventas', '1.800', '1.860'],
          ['Bienes de cambio', '1.200', '1.200'],
        ],
      },
    ],
    preguntas: [
      '¿Cuál es el total extraído y el total del balance?',
      '¿Concilia la extracción? ¿Dónde está la diferencia?',
      '¿Qué habría que revisar antes de construir sobre estos datos?',
    ],
    solucion: [
      { t: 'p', md: 'Total extraído = 500 + 1.800 + 1.200 = **3.500**. Total balance = 500 + 1.860 + 1.200 = **3.560**.' },
      { t: 'formula', name: 'Diferencia', expr: 'Diferencia = 3.500 − 3.560 = − 60', note: 'La diferencia está íntegramente en Créditos por ventas (1.800 vs 1.860).' },
      { t: 'idea', md: 'La extracción **no concilia** por 60 en Créditos por ventas: probablemente una cuenta mal mapeada o un saldo aún no depurado (una previsión o un documento a cobrar fuera del alcance). Hasta resolver ese desvío, no se debe construir el estado analítico sobre estos datos — la conciliación es la prueba de veracidad de la capa de datos.' },
    ],
  },
  quiz: [
    { id: 'q1', pregunta: '¿Qué arquitectura adopta el Model Context Protocol (MCP)?', opciones: ['Peer-to-peer entre modelos.', 'Cliente-servidor con host, cliente y servidor.', 'Monolítica: todo corre en el modelo.', 'Solo baja archivos por FTP.'], correcta: 1, justificacion: 'MCP es cliente-servidor: el host orquesta el modelo, el cliente gestiona la comunicación y el servidor expone capacidades. No es peer-to-peer, ni monolítico, ni un transporte de archivos.' },
    { id: 'q2', pregunta: 'Las tres capacidades que expone un servidor MCP son:', opciones: ['Tablas, vistas y procedimientos.', 'Herramientas, recursos e indicaciones.', 'Lectura, escritura y borrado.', 'GET, POST y DELETE.'], correcta: 1, justificacion: 'El servidor expone herramientas (acciones invocables), recursos (contenidos legibles) e indicaciones (plantillas). Las otras opciones describen bases de datos, operaciones CRUD o verbos HTTP, no las capacidades del protocolo.' },
    { id: 'q3', pregunta: '¿Por qué “una herramienta que devuelve todo” es una mala herramienta MCP?', opciones: ['Porque consume poca memoria.', 'Porque obliga a filtrar del lado del cliente, no valida y no se puede auditar bien.', 'Porque el protocolo lo prohíbe explícitamente.', 'Porque es más segura que una específica.'], correcta: 1, justificacion: 'La granularidad importa: una herramienta genérica traslada el filtrado al cliente, no valida entradas y complica la auditoría. No está prohibida por el protocolo, pero es mal diseño; y no es más segura.' },
    { id: 'q4', pregunta: 'El acceso del servidor MCP sobre el ERP del programa debe ser:', opciones: ['De lectura y escritura, para corregir datos.', 'De sólo lectura, como garantía de diseño.', 'De administrador total.', 'Sin autenticación, para simplificar.'], correcta: 1, justificacion: 'El servidor es de sólo lectura por diseño: nunca escribe en el ERP. Escritura, acceso de administrador o ausencia de autenticación violan el gobierno del dato.' },
    { id: 'q5', pregunta: '¿Cuál es la función del registro de auditoría de cada llamada MCP?', opciones: ['Acelerar las consultas.', 'Permitir reconstruir de dónde salió cualquier número: consulta, parámetros, herramienta, dato y momento.', 'Reemplazar al balance contable.', 'Encriptar la base de datos.'], correcta: 1, justificacion: 'El registro de auditoría es lo que da trazabilidad: deja constancia de cada consulta y su resultado. No acelera consultas, no reemplaza estados contables ni cifra la base.' },
    { id: 'q6', pregunta: 'En un modelo dimensional de Kimball, las ventas y los movimientos son típicamente:', opciones: ['Tablas de dimensiones.', 'Tablas de hechos.', 'Vistas materializadas del mayor.', 'Índices.'], correcta: 1, justificacion: 'Los eventos medibles (ventas, movimientos) son tablas de hechos; el tiempo, el cliente o el producto son dimensiones. No son vistas ni índices.' },
    { id: 'q7', pregunta: '¿Qué resuelve la capa semántica financiera?', opciones: ['Que cada área calcule las métricas a su manera.', 'Que cada métrica tenga una definición única, versionada y documentada, igual en el modelo, el tablero y el informe.', 'Que no haga falta conciliar con el balance.', 'Que el ERP sea más rápido.'], correcta: 1, justificacion: 'La capa semántica garantiza que “margen bruto” o “capital invertido” signifiquen lo mismo en todos lados. No habilita cálculos divergentes, no exime de conciliar ni cambia la performance del ERP.' },
    { id: 'q8', pregunta: 'La extracción incremental consiste en:', opciones: ['Traer toda la base cada vez.', 'Traer sólo lo que cambió desde la última corrida.', 'Copiar la base a mano.', 'Borrar los datos viejos.'], correcta: 1, justificacion: 'La extracción incremental trae únicamente los cambios (por fecha de modificación o log), haciendo el proceso rápido y repetible. No implica traer todo, copiar a mano ni borrar histórico.' },
    { id: 'q9', pregunta: '¿Cuál de estos NO es un transporte de MCP?', opciones: ['stdio (entrada/salida estándar).', 'HTTP con streaming y SSE.', 'JSON-RPC como mensajería.', 'FTP anónimo.'], correcta: 3, justificacion: 'MCP usa stdio y HTTP con streaming/SSE como transportes, y JSON-RPC como formato de mensajes. FTP anónimo no forma parte del protocolo.' },
    { id: 'q10', pregunta: 'La conciliación de lo extraído contra el balance publicado sirve para:', opciones: ['Cumplir una formalidad estética.', 'Probar que la extracción no perdió ni duplicó datos (prueba de veracidad de la capa de datos).', 'Reemplazar la auditoría externa.', 'Calcular el impuesto a las ganancias.'], correcta: 1, justificacion: 'La conciliación es la prueba de que la capa de datos es fiel al estado publicado. No es estética, no reemplaza la auditoría ni tiene fin impositivo.' },
    { id: 'q11', pregunta: 'El versionado del contrato de una herramienta MCP evita que:', opciones: ['El servidor use memoria.', 'Los consumidores se rompan en silencio cuando cambia la herramienta.', 'El ERP crezca.', 'Se registre la auditoría.'], correcta: 1, justificacion: 'Versionar el contrato permite evolucionar una herramienta sin romper a quienes la consumen sin aviso. No tiene que ver con memoria, tamaño del ERP ni con la auditoría.' },
    { id: 'q12', pregunta: '¿Qué marco legal argentino rige la protección de datos personales aplicable al gobierno del dato?', opciones: ['Ley 25.326.', 'RT 6 de la FACPCE.', 'Ordenanza 1075/22.', 'NIC 29.'], correcta: 0, justificacion: 'La Ley 25.326 regula la protección de datos personales. La RT 6 y la NIC 29 son normas contables de reexpresión; la Ordenanza 1075/22 es normativa de posgrado.' },
    { id: 'q13', pregunta: 'El principio de menor privilegio en el acceso a datos significa:', opciones: ['Dar a cada rol el máximo acceso posible.', 'Dar a cada rol sólo el acceso que necesita para su tarea.', 'Que nadie acceda a nada.', 'Compartir una única contraseña.'], correcta: 1, justificacion: 'Menor privilegio = acceso mínimo necesario por rol. No es acceso máximo, ni bloqueo total, ni contraseñas compartidas (que son un antipatrón de seguridad).' },
    { id: 'q14', pregunta: 'Frente a un conector construido a medida, MCP aporta principalmente:', opciones: ['Más líneas de código propietario.', 'Permiso explícito, trazabilidad, reproducibilidad y transferibilidad.', 'Dependencia de un único proveedor.', 'Menor seguridad.'], correcta: 1, justificacion: 'MCP estandariza el acceso con permiso explícito, trazabilidad, reproducibilidad y transferibilidad entre sistemas. No aumenta el código propietario, no ata a un proveedor ni reduce la seguridad.' },
    { id: 'q15', pregunta: '¿Por qué la trazabilidad del dato es condición del análisis financiero profesional?', opciones: ['Porque queda más prolijo.', 'Porque un número que no se puede reconstruir desde su transacción no es auditable, y un modelo no auditable no es utilizable.', 'Porque lo exige el ERP.', 'Porque acelera el cierre contable.'], correcta: 1, justificacion: 'Sin trazabilidad no hay auditabilidad, y sin auditabilidad el modelo no es profesionalmente utilizable. No es una cuestión estética, no la impone el ERP y su fin no es la velocidad de cierre.' },
    { id: 'q16', pregunta: 'La integridad referencial en el modelo relacional del ERP garantiza que:', opciones: ['Todas las tablas tengan el mismo tamaño.', 'Las claves foráneas apunten a registros existentes (no haya “huérfanos”).', 'No haya índices.', 'Los datos se borren solos.'], correcta: 1, justificacion: 'La integridad referencial asegura que una clave foránea (p. ej. el cliente de una factura) exista realmente en su tabla maestra. No tiene que ver con tamaños ni con borrado.' },
    { id: 'q17', pregunta: 'Las funciones de ventana en SQL sirven, por ejemplo, para:', opciones: ['Borrar tablas.', 'Calcular saldos acumulados y rankings sin colapsar las filas.', 'Crear usuarios.', 'Formatear fechas únicamente.'], correcta: 1, justificacion: 'Las window functions calculan agregados móviles (saldos acumulados, rankings) conservando el detalle de cada fila. No borran ni crean objetos.' },
    { id: 'q18', pregunta: 'OData es:', opciones: ['Un lenguaje de programación.', 'Una capa de servicios que muchos ERP exponen sobre sus entidades, con filtrado y paginación estándar.', 'Un tipo de gráfico.', 'Una base de datos NoSQL.'], correcta: 1, justificacion: 'OData estandariza el acceso a las entidades del ERP vía servicios web (filtros, paginación). No es un lenguaje ni una base de datos.' },
    { id: 'q19', pregunta: 'En MCP, el “host” es:', opciones: ['El servidor de base de datos.', 'La aplicación que orquesta al modelo de IA.', 'El cable de red.', 'El archivo de configuración.'], correcta: 1, justificacion: 'El host es la aplicación de IA que orquesta el modelo; el cliente gestiona la comunicación y el servidor expone capacidades. No es la base ni el hardware.' },
    { id: 'q20', pregunta: 'MCP usa como formato de mensajes:', opciones: ['CSV.', 'JSON-RPC (solicitudes, respuestas y notificaciones).', 'XML-SOAP obligatorio.', 'Texto plano sin estructura.'], correcta: 1, justificacion: 'La mensajería de MCP es JSON-RPC. No usa CSV, ni SOAP obligatorio, ni texto sin estructura.' },
    { id: 'q21', pregunta: 'La diferencia entre un “recurso” y una “herramienta” en MCP es que:', opciones: ['Son sinónimos.', 'El recurso es contenido legible; la herramienta es una acción invocable.', 'El recurso ejecuta código y la herramienta no.', 'La herramienta es solo lectura y el recurso escribe.'], correcta: 1, justificacion: 'Recurso = contenido direccionable para leer; herramienta = acción con esquema de entrada/salida. No son sinónimos ni al revés.' },
    { id: 'q22', pregunta: 'Versionar la definición de una métrica en la capa semántica evita que:', opciones: ['La métrica se calcule.', 'Un cambio de definición rompa en silencio los tableros e informes que la usan.', 'Existan tableros.', 'Se pueda consultar el ERP.'], correcta: 1, justificacion: 'El versionado permite evolucionar una métrica sin romper a sus consumidores sin aviso, manteniendo la coherencia entre modelo, tablero e informe.' },
    { id: 'q23', pregunta: 'En un modelo dimensional, “tiempo”, “cliente” y “producto” son típicamente:', opciones: ['Tablas de hechos.', 'Tablas de dimensiones.', 'Índices.', 'Vistas del mayor.'], correcta: 1, justificacion: 'Las dimensiones describen el contexto (tiempo, cliente, producto) por el que se analizan los hechos (ventas, movimientos). No son hechos ni índices.' },
    { id: 'q24', pregunta: 'La tabla de mapeo contable-analítico sirve para:', opciones: ['Ordenar alfabéticamente las cuentas.', 'Traducir las cuentas del ERP a los rubros que necesita el análisis financiero.', 'Borrar cuentas.', 'Calcular impuestos.'], correcta: 1, justificacion: 'El mapeo traduce el plan de cuentas del ERP al esquema analítico (rubros del estado analítico). No ordena ni borra ni liquida impuestos.' },
    { id: 'q25', pregunta: 'El perfilado (profiling) de datos detecta, entre otras cosas:', opciones: ['El color de los gráficos.', 'Valores atípicos, faltantes y problemas de integridad.', 'La marca del ERP.', 'El nombre del usuario.'], correcta: 1, justificacion: 'El profiling caracteriza la calidad del dato: outliers, nulos, integridad. Es parte de la capa de calidad, no de la estética ni del usuario.' },
    { id: 'q26', pregunta: 'La Ley 25.326 (Argentina) regula:', opciones: ['La reexpresión contable.', 'La protección de los datos personales.', 'El impuesto a las ganancias.', 'Las normas de auditoría.'], correcta: 1, justificacion: 'La 25.326 protege datos personales, marco clave del gobierno del dato. No es norma contable ni fiscal ni de auditoría.' },
    { id: 'q27', pregunta: 'Que el patrón MCP sea “transferible” significa que:', opciones: ['Solo sirve para un ERP.', 'El mismo patrón se aplica después a Finnegans, Tango, SAP Business One o un desarrollo propio.', 'No se puede reutilizar.', 'Depende de un proveedor único.'], correcta: 1, justificacion: 'La transferibilidad es que el diseño de servidor MCP se reaplica a cualquier ERP. No queda atado a uno ni a un proveedor.' },
    { id: 'q28', pregunta: 'El transporte HTTP con streaming y SSE en MCP se usa principalmente para:', opciones: ['Integraciones locales por línea de comandos.', 'Comunicación remota cliente-servidor.', 'Imprimir en papel.', 'Nada.'], correcta: 1, justificacion: 'HTTP con streaming/SSE habilita el uso remoto; stdio es para lo local/CLI. No tiene que ver con impresión.' },
    { id: 'q29', pregunta: 'El “núcleo stateless” de la especificación MCP de 2025-2026 permite:', opciones: ['Guardar todo el estado en el modelo.', 'Escalar sobre infraestructura HTTP común.', 'Eliminar la autorización.', 'Prohibir las herramientas.'], correcta: 1, justificacion: 'Un core sin estado escala sobre HTTP estándar. La spec moderna, además, refuerza la autorización, no la elimina.' },
    { id: 'q30', pregunta: 'La anonimización de datos sensibles en el gobierno del dato busca:', opciones: ['Acelerar las consultas.', 'Proteger información personal/confidencial al publicar o compartir datos.', 'Borrar el ERP.', 'Aumentar el patrimonio.'], correcta: 1, justificacion: 'Anonimizar protege datos personales y confidenciales (Ley 25.326, convenios). No acelera consultas ni borra sistemas.' },
  ],
  bibliografia: [
    'Kimball, R. & Ross, M. — *The Data Warehouse Toolkit*',
    'Reis, J. & Housley, M. — *Fundamentals of Data Engineering*',
    'Anthropic — *Model Context Protocol* (especificación 2024–2026)',
    'Gadatsch, A. — *Business Process Management*',
    'Rossi, J. P. — *Analítica Avanzada con Microsoft Excel para el CFO Actual*',
    'Ley 25.326 de Protección de los Datos Personales (Argentina)',
  ],
}
