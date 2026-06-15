# Guía de Prompt Engineering — Semana 7
## Capital de trabajo: el ciclo de conversión de caja

Esta guía te da prompts listos para usar con **cualquier modelo** (Gemini, ChatGPT o Claude) y generar:
1. Un **caso práctico** original de los conceptos de la semana.
2. Un **simulador** (en Excel o en código) que resuelva ese caso.

> Reemplazá los textos entre `<corchetes>` por los datos de tu empresa. Cuanto más contexto le des al modelo, mejor el resultado.

---

## Conceptos que debe cubrir esta semana
- DSO, DIO, DPO
- Ciclo de conversión de caja
- Rotación de cuentas por cobrar e inventario
- Financiamiento no oneroso con proveedores
- Cómo liberar caja del capital de trabajo

---

## PROMPT 1 — Generar el caso práctico

```
Actuá como profesor de finanzas corporativas avanzadas y consultor de CFOs. Quiero que generes un CASO PRÁCTICO original y realista sobre los siguientes conceptos: DSO, DIO, DPO; Ciclo de conversión de caja; Rotación de cuentas por cobrar e inventario; Financiamiento no oneroso con proveedores; Cómo liberar caja del capital de trabajo.

Contexto de mi empresa:
- Sector: <sector>
- Tamaño (ventas anuales): <ventas>
- País / moneda: <país>
- Situación actual: <describí el problema o la decisión>

El caso debe:
1. Plantear una situación de negocio concreta con números coherentes (balance y estado de resultados simplificados).
2. Esconder, como en la realidad, la diferencia entre la información contable de presentación y la verdadera información de gestión.
3. Terminar con 4 preguntas de decisión que un CEO debería poder responder con los conceptos de la semana.
No resuelvas todavía: primero mostrame el caso y los datos.
```

## PROMPT 2 — Resolver y explicar el caso

```
Perfecto. Ahora resolvé el caso paso a paso, mostrando todas las fórmulas y el razonamiento. Para cada indicador (DSO, DIO, DPO, Ciclo de conversión de caja, Rotación de cuentas por cobrar e inventario, Financiamiento no oneroso con proveedores...):
1. Definí el concepto en una frase.
2. Mostrá la fórmula.
3. Calculá con los números del caso.
4. Interpretá el resultado para la toma de decisiones.
Cerrá con un diagnóstico: ¿se está creando o destruyendo valor? ¿qué 3 acciones concretas recomendarías?
```

## PROMPT 3 — Construir el simulador en Excel (matrices dinámicas)

```
Ahora quiero un SIMULADOR en Excel para este caso. Devolvémelo como una tabla con:
- Una sección de ENTRADAS claramente marcadas (las que yo voy a editar).
- Una sección de CÁLCULOS con las fórmulas de Excel EXACTAS, usando funciones modernas de matrices dinámicas (LET, SEQUENCE y, si aplica, LAMBDA/SCAN) en lugar de arrastrar fórmulas.
- Una sección de CONCLUSIONES con fórmulas tipo SI() que devuelvan texto interpretando los indicadores.
Mostrame, celda por celda (A1, B1, ...), qué fórmula va en cada una. Indicá qué celdas pintar de amarillo (entradas) y cuáles de verde (conclusiones).
```

## PROMPT 4 — Construir el simulador como app (opcional, para devs)

```
Convertí el simulador anterior en un componente web. Usá <React + TypeScript / el stack que prefieras>. Requisitos:
- Inputs con sliders y campos numéricos para cada entrada.
- Cálculo reactivo de todos los indicadores.
- Un veredicto visual (verde/rojo) según se cree o destruya valor.
- Un gráfico que muestre la sensibilidad del indicador clave ante el cambio de una variable.
Entregá el código completo y autocontenido.
```

## PROMPT 5 — Verificación crítica (anti-alucinación)

```
Revisá tu propia solución como si fueras un auditor escéptico. Para cada cálculo:
- ¿La fórmula es correcta y la unidad coherente?
- ¿Algún número no cierra con la identidad contable (Activo = Pasivo + PN) o con el flujo de caja?
- ¿Qué supuesto, si cambiara, daría vuelta la conclusión?
Listá los errores o riesgos que encuentres y corregilos.
```

---

### Consejos de prompting
- **Dale rol y contexto:** “actuá como CFO/consultor”, más el sector y tamaño de tu empresa.
- **Pedí las fórmulas, no solo el número:** así podés auditar y aprender.
- **Iterá:** si algo no cierra, pegale el error y pedile que lo corrija (Prompt 5).
- **Cuidado con los datos sensibles:** anonimizá cifras si usás un modelo público.
