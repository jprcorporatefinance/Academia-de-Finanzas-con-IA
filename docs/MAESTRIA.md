# Maestría en Finanzas Corporativas Aplicadas con IA — Guía técnica

Sistema de contenidos y app de la Maestría (**27 módulos**: 16 asignaturas del
núcleo + 11 Módulos Avanzados), con identidad de marca **JPR Consulting**
(carbón + verde institucional · Spectral / IBM Plex).

> **Nota de identidad.** La app usa la paleta carbón `#0A0C0F` + verde `#12614A`
> con Spectral / IBM Plex Sans. El *Manual de Identidad Visual v2.0 (rediseño
> agosto 2026)* de la firma define una identidad posterior —papel marfil
> `#FBF9F4` + verde bosque `#14463A` + bronce `#9A6E3A`, con Newsreader /
> Source Serif 4 / IBM Plex Mono—. La migración de la plataforma a esa paleta
> es una tarea pendiente y deliberada: toca `tailwind.config.js`, `src/index.css`,
> todas las páginas y `scripts/maestria/brand.ts` (con vendorización de las dos
> tipografías nuevas).

## 1. Qué se genera

Por cada uno de los 27 módulos (`1.1` … `4.4` y `A.1` … `A.11`) se producen
**5 archivos**:

| Archivo | Qué es |
|---|---|
| `<slug>-PDF.pdf` | PDF didáctico extenso (teoría, fórmulas, cuadros, expertos, caso, bibliografía) |
| `<slug>-Caso.xlsx` | Excel del caso con **matrices dinámicas** (LET/LAMBDA/SEQUENCE/SCAN/REDUCE/MMULT/RANDARRAY/SORTBY…) |
| `<slug>-Cuestionario.pdf` | 15 preguntas con solucionario justificado |
| `<slug>-Quiz.json` | Banco de 30 preguntas (el motor sortea 15 por intento) |
| `<slug>-Teoria.json` | Teoría completa para leer **dentro** de la app (carga bajo demanda) |

Salen a `public/maestria/<slug>/` (p. ej. `public/maestria/a1-1/`).
El índice va a `src/data/maestria/materialsIndex.json` y el consolidado de
cuestionarios a `src/data/maestria/quizzes.json` (lo consume la app).

## 2. Cómo regenerar

```bash
npm run maestria        # genera los 135 archivos (27 × 5) + los índices JSON
```

Las tipografías están vendorizadas en `scripts/assets/fonts/` (Spectral, IBM Plex
Sans, IBM Plex Mono) — la generación es 100 % offline.

## 3. Cómo editar / agregar contenido

El contenido de cada asignatura vive en un único archivo TypeScript:

```
src/data/maestria/a1_1.ts … a4_4.ts   # núcleo: una `Asignatura` por archivo
src/data/maestria/av1_ma.ts … av11_*  # Módulos Avanzados A.1 … A.11
src/data/maestria/types.ts            # modelo de contenido (bloques, caso, Excel, quiz)
src/data/maestria/index.ts            # registro de los 27
scripts/maestria/CASO-MAESTRO.md      # fuente única de verdad del caso (anclas numéricas)
```

### Los Módulos Avanzados y las skills que los originan

Cada Módulo Avanzado profundiza un cuerpo metodológico de la firma:

| Módulo | Tema | Skill JPR de origen |
|---|---|---|
| A.1 | Fusiones y adquisiciones | (marco Damodaran / Bruner) |
| A.2 | Asignación de capital | (marco Thorndike / Mauboussin) |
| A.3 | Finanzas conductuales | (marco Kahneman / Lovallo) |
| A.4 | ESG y riesgo climático | (marco TCFD / ISSB) |
| A.5 | Financiamiento alternativo | indicador propio BFR |
| A.6 | Canal del riesgo: numerador o denominador | `jpr-canal-del-riesgo` |
| A.7 | Mapa maestro de interrelaciones | `jpr-value-driver-interrelations` |
| A.8 | TSR Sintético y TBR | `jpr-synthetic-tsr-emerging-markets` |
| A.9 | Paradoja del crecimiento | `jpr-growth-liquidity-paradox` |
| A.10 | Comunicación de resultados | `jpr-informe-didactico-html` + `jpr-corporate-finance-frontend-react` |
| A.11 | Diagnóstico integral por recomposición | `jpr-diagnostico-integral` + `jpr-mapa-de-valor` + `jpr-analisis-financiero-corporativo-360` |

Las skills que **ya estaban cubiertas** por el núcleo: `analisis-descriptivo` (C1),
`diagnostico-causal` y `corporate-finance-diagnostics` (2.1), `beneish-m-score` (2.2),
`excel-dynamic-arrays-modern` (2.3), `value-generation-emerging-markets` (1.4 y 2.4),
`costo-de-capital` (3.1), `analisis-predictivo` y `corporate-finance-forecasting` (3.3),
`apv-valuation-emerging-markets` y `analisis-prescriptivo` (4.1), `ronic` (4.2),
`metodo-4-fases` (estructura de los cuatro cuatrimestres).

Editás el `.ts`, corrés `npm run maestria`, y se regeneran los 4 entregables.
El **caso Maderas del Litoral S.A.** es el hilo conductor: sus anclas numéricas
(ROIC 21,3 %, WACC ≈ 19,5 %, RONIC 15 %, EVA ≈ +150, etc.) están en
`CASO-MAESTRO.md` y deben mantenerse coherentes entre asignaturas.

### El motor de generación

```
scripts/maestria/brand.ts     # tokens de marca + config de fuentes (pdfmake)
scripts/maestria/pdf.ts       # PDF didáctico + cuestionario (pdfmake)
scripts/maestria/excel.ts     # Excel con matrices dinámicas (exceljs)
scripts/maestria/generate.ts  # entry point (npm run maestria)
```

Notas del generador de Excel:
- Las fórmulas se escriben con tokens `[clave]` y se resuelven a celdas.
- `FILTER/SORT/SORTBY/UNIQUE` reciben el prefijo `_xlfn._xlws.`; el resto de
  funciones modernas, `_xlfn.` (lo maneja `modernPrefix`).
- Las letras griegas (μ σ β λ Σ ρ Δ) se renderizan en IBM Plex Sans dentro de las
  fórmulas, porque IBM Plex Mono no las incluye.

## 4. La app

- **Ruta**: `/app/maestria` (lista por cuatrimestre) y `/app/maestria/:slug` (detalle).
- **Cuestionario** (`src/components/MaestriaQuiz.tsx`): banco de 30 preguntas del
  que se sortean **15 por intento**, hasta 3 intentos, guarda el **mejor puntaje**,
  muestra correcto/incorrecto + justificación.
- **Teoría in-app**: `<slug>-Teoria.json` se descarga bajo demanda al abrir el
  módulo, así el corpus completo no entra al bundle.
- **Subida del caso** (`src/components/CaseUpload.tsx`): PDF/Excel/HTML a Supabase
  Storage (bucket `entregas`), con descarga por URL firmada.
- **Panel admin** (dentro del detalle): intentos, mejor puntaje y entregas por alumno.

## 5. Base de datos (Supabase)

La migración `supabase/migrations/0002_maestria.sql` crea:
- `quiz_attempts` y `case_submissions` (con RLS: el alumno ve lo suyo, el admin todo).
- Bucket privado de Storage `entregas` con políticas por carpeta de usuario + admin.

**Aplicarla**: Supabase → SQL Editor → pegar el contenido del archivo → Run.
Es aditiva (no modifica ni borra nada existente).

## 6. Identidad de marca

Paleta JPR v2.0 (en `tailwind.config.js` y `scripts/maestria/brand.ts`):
carbón `#0A0C0F` · marfil `#F4F1EA` · verde institucional `#12614A` (acento único,
con `#1E8F6B`/`#2EBE8C`/`#8FD3B7`) · rojo `#E24C3F` · ámbar `#B9822E`.
Tipografías: **Spectral** (titulares), **IBM Plex Sans** (texto), **IBM Plex Mono** (datos).

El logo (barras ascendentes + "JPR." con punto rojo + "CONSULTING") está
reconstruido como vector. Para usar el logo oficial, reemplazar el SVG inline en
`src/components/Layout.tsx`, `src/pages/LandingPage.tsx` y `src/pages/LoginPage.tsx`,
y el bloque `logoIconSvg` en `scripts/maestria/pdf.ts`.
