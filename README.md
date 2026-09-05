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

## La Maestría en Finanzas Corporativas Aplicadas con IA

Además del programa de 12 semanas, la plataforma aloja el corpus completo de la
**Maestría**: **27 módulos** (16 asignaturas del núcleo, en cuatro cuatrimestres, más
11 Módulos Avanzados de temas de frontera), con un caso integrador único —**Maderas
del Litoral S.A.**— que atraviesa todo el programa con anclas numéricas coherentes.

Por cada módulo se generan cinco piezas: **PDF didáctico**, **Excel del caso** con
matrices dinámicas de Excel 365, **cuestionario** con solucionario justificado,
**banco de 30 preguntas** (el motor sortea 15 por intento, hasta 3 intentos) y la
**teoría completa para leer dentro de la app**.

| Cuatrimestre | Fase | Asignaturas |
|---|---|---|
| 1 | Descriptiva · ¿Qué sucedió? | 1.1 a 1.4 |
| 2 | Diagnóstica · ¿Por qué sucedió? | 2.1 a 2.4 |
| 3 | Predictiva · ¿Qué es probable que ocurra? | 3.1 a 3.4 |
| 4 | Prescriptiva · ¿Qué debemos hacer? | 4.1 a 4.4 |
| — | Módulos Avanzados | A.1 a A.11 |

**Módulos Avanzados:** A.1 Fusiones y adquisiciones · A.2 Asignación de capital ·
A.3 Finanzas conductuales · A.4 ESG y riesgo climático · A.5 Financiamiento
alternativo · A.6 El canal del riesgo (numerador o denominador) · A.7 Mapa maestro
de interrelaciones entre generadores de valor · A.8 TSR Sintético y Total Business
Return · A.9 La paradoja del crecimiento · A.10 Comunicación de resultados ·
A.11 Diagnóstico integral por recomposición.

Regenerar todos los materiales:

```bash
npm run maestria
```

Detalle técnico del sistema de contenidos en [`docs/MAESTRIA.md`](docs/MAESTRIA.md).

## Stack técnico

- **React 18 + TypeScript + Vite**
- **TailwindCSS** (identidad JPR: base carbón, lectura marfil, verde institucional
  `#12614A` como único acento · Spectral / IBM Plex)
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

## Despliegue automático (GitHub Actions → Netlify)

El repo incluye `.github/workflows/deploy.yml`, que en cada push hace **build + type-check**
y, al integrar en `main` (o ejecutándolo manualmente desde la pestaña **Actions →
Run workflow**), publica el sitio en Netlify.

El proyecto de Netlify ya está creado: **`academia-finanzas-corporativas-ia`**
(URL: `https://academia-finanzas-corporativas-ia.netlify.app`, Site ID
`3831feb3-951b-41f3-a9ff-7009d110b2b0`).

**Único paso manual:** agregar el token de Netlify como secret del repositorio.

1. En Netlify: *User settings → Applications → Personal access tokens → New access token*.
2. En GitHub: *Settings → Secrets and variables → Actions → New repository secret*,
   nombre **`NETLIFY_AUTH_TOKEN`**, valor el token generado.
3. Hacé push a `main` (o corré el workflow a mano) y el deploy queda en vivo.

> Alternativa sin secret: conectar el repo directamente al proyecto de Netlify desde el
> dashboard (*Connect to a Git repository*); el `netlify.toml` ya define build y redirects.

## Backend con Supabase (opcional, recomendado para producción)

La app funciona en dos modos según haya o no variables de entorno:

- **Sin configurar** → persistencia en `localStorage` (demo, monodispositivo). Incluye
  los accesos de demostración de abajo.
- **Con Supabase** → backend real: autenticación por email/contraseña, datos
  multiusuario y multidispositivo, con Row-Level Security. El **primer usuario que se
  registra queda como administrador** del programa; el resto, como alumnos.

### Puesta en marcha de Supabase

1. Creá un proyecto gratis en [supabase.com](https://supabase.com) (región sugerida:
   *South America (São Paulo)*).
2. En el **SQL Editor**, pegá y ejecutá el contenido de
   [`supabase/migrations/0001_init.sql`](supabase/migrations/0001_init.sql). Crea las
   tablas, las políticas RLS y el trigger que da de alta el perfil al registrarse.
3. (Opcional) *Authentication → Providers → Email*: desactivá **Confirm email** para que
   el alta entre directo sin paso de confirmación (más cómodo para un programa cerrado).
4. *Project Settings → API*: copiá el **Project URL** y la **anon public key**.
5. Definí las variables de entorno (ver `.env.example`):
   - Local: creá un archivo `.env` con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
   - Netlify: *Site settings → Environment variables* y agregá esas dos. Luego redeploy.
6. Entrá al sitio y **registrate con tu email**: esa primera cuenta queda como admin.

> La capa de datos está aislada en `src/store/` (`localStore.tsx` / `remoteStore.tsx`),
> así que cambiar de backend no toca ni la UI ni los simuladores.

## Accesos de demostración (solo modo `localStorage`)

| Rol | Email | Contraseña |
|---|---|---|
| Administrador | `admin@academia.com` | `admin123` |
| Alumna (CEO) | `mfacosta@empresa.com` | `demo123` |

> Los datos de demostración (alumnos, progreso y mensajes) se inicializan automáticamente
> cuando NO hay Supabase configurado. Con Supabase, la base arranca limpia.

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
    maestria/     Los 27 módulos de la Maestría (16 del núcleo + 11 avanzados),
                  el modelo de contenido y los índices generados
  store/          Capa de datos: context.ts (API), localStore (localStorage),
                  remoteStore (Supabase), store.tsx (selector de backend)
  lib/supabase.ts Cliente de Supabase (activo solo si hay env vars)
  types.ts        Tipos de dominio
scripts/
  maestria/       Generador de PDF, Excel y cuestionarios (npm run maestria)
  deepdive/       Teoría extendida de las 12 semanas
supabase/
  migrations/     0001_init.sql — esquema, RLS y triggers
                  0002_maestria.sql — intentos de cuestionario y entregas de casos
```
