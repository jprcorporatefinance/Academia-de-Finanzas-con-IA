# Academia de Finanzas Corporativas Avanzada + IA

Plataforma educativa **premium para CEOs y dueños de empresa** que combina finanzas
corporativas aplicadas con inteligencia artificial (Claude). El programa dura **3 meses
(12 clases, una por semana)** y recorre el camino que va de *leer la contabilidad de
presentación* a *entender, medir y construir el verdadero valor de una empresa*.

> El hilo conductor de todo el programa es un caso central interrelacionado —**Andina
> Manufacturas S.A.**, una PyME industrial latinoamericana— que contablemente luce sana
> pero está **destruyendo valor**. Cada semana abrimos la empresa con un nuevo bisturí.

## ¿Qué incluye?

- **Programa de 12 semanas** con teoría profunda, casos prácticos, fórmulas, alertas y
  prompts listos para resolver cada modelo con Claude. (~24.000 palabras de contenido.)
- **10 simuladores interactivos**:
  1. Lector de Estados Contables (valor contable vs. valor real de mercado)
  2. Descomposición DuPont (margen × rotación × multiplicador)
  3. ROIC · NOPAT · EVA (creación / destrucción de valor)
  4. Free Cash Flow (FCFF · FCFE · FCFD)
  5. Capital de Trabajo y Rotaciones (DSO/DIO/DPO, ciclo de caja)
  6. WACC para Mercados Emergentes (CAPM + riesgo país + prima por tamaño)
  7. Apalancamiento y Riesgo (la deuda como multiplicador)
  8. Amortización de Préstamos (francés / alemán / americano)
  9. Tasas: Nominal · Efectiva · Real · CFT
  10. Valuación por DCF (Enterprise Value → Equity Value)
- **Panel de administrador**: agregar material y crear nuevas clases, ver la evolución de
  cada alumno (gráficos de desempeño y actividad en simuladores) y enviar **mensajes
  privados** comentando el avance.
- **Panel de alumno**: progreso, próxima clase, autoevaluaciones y mensajería con la
  dirección académica.

## Recorrido del programa

| Semana | Pilar | Tema |
|---|---|---|
| 1 | Lectura Contable | Leer los estados contables básicos |
| 2 | Lectura Contable | Contabilidad de presentación vs. información de gestión |
| 3 | Construcción de Valor | De la utilidad al valor: NOPAT, Capital Invertido, ROIC, DuPont |
| 4 | Construcción de Valor | EVA y el spread ROIC − WACC: estar bien y destruir valor |
| 5 | Económico vs Financiero | Liquidez, solvencia y la caída exponencial |
| 6 | Flujos de Caja | Free Cash Flow: FCFF, FCFE, FCFD y CFROI |
| 7 | Capital de Trabajo | Cobranzas, inventario, proveedores y rotaciones |
| 8 | Capital de Trabajo | Bienes de uso y CAPEX: valor contable vs. de mercado |
| 9 | Costo del Capital | WACC en LatAm: riesgo país y prima por tamaño |
| 10 | Apalancamiento y Riesgo | Deuda como multiplicador, nivel óptimo, Modigliani-Miller |
| 11 | Estrategia Financiera | Tasas, tiempo y sistemas de amortización |
| 12 | Valuación | Valuación integral por DCF y plan de creación de valor |

## Stack técnico

- **React 18 + TypeScript + Vite**
- **TailwindCSS** (diseño premium oscuro con acento dorado)
- **Recharts** para visualizaciones
- **React Router** para la navegación
- Persistencia en `localStorage` (capa de datos aislada en `src/store/` para migrar a un
  backend como Supabase sin tocar la UI).

## Cómo ejecutar

```bash
npm install
npm run dev      # desarrollo en http://localhost:5173
npm run build    # build de producción + type-check
npm run preview  # previsualizar el build
```

## Accesos de demostración

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@academia.com` | `admin123` |
| Alumna (CEO) | `mfacosta@empresa.com` | `demo123` |

> Los datos de demostración (alumnos, progreso y mensajes) se inicializan automáticamente.
> El registro de nuevos alumnos está habilitado desde la pantalla de ingreso.

## Estructura

```
src/
  components/     Layout, renderizador de lecciones, UI compartida
  data/
    curriculum/   Las 12 clases (semana01…semana12)
    mockCompany   Caso central "Andina Manufacturas" + supuestos de mercado
  lib/finance.ts  Motor financiero (NOPAT, ROIC, EVA, WACC, FCF, DCF, tasas…)
  pages/          Landing, login, dashboard, programa, lección, simuladores, alumnos, mensajes
  simulators/     Los 10 simuladores interactivos + registro
  store/          Estado global, persistencia y datos semilla
  types.ts        Tipos de dominio
```
