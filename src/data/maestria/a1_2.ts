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
