# Maestría en Finanzas Corporativas Aplicadas con IA — Guía técnica

Sistema de contenidos y app de la Maestría (16 asignaturas), con identidad de
marca **JPR Consulting v2.0** (carbón + verde institucional · Spectral / IBM Plex).

## 1. Qué se genera

Por cada una de las 16 asignaturas (`1.1` … `4.4`) se producen 4 entregables:

| Archivo | Qué es |
|---|---|
| `<slug>-PDF.pdf` | PDF didáctico extenso (teoría, fórmulas, cuadros, expertos, caso, bibliografía) |
| `<slug>-Caso.xlsx` | Excel del caso con **matrices dinámicas** (LET/LAMBDA/SEQUENCE/SCAN/REDUCE/MMULT/RANDARRAY/SORTBY…) |
| `<slug>-Cuestionario.pdf` | 15 preguntas con solucionario justificado |
| `<slug>-Quiz.json` | Banco de preguntas |

Salen a `public/maestria/<slug>/` (p. ej. `public/maestria/a1-1/`).
El índice va a `src/data/maestria/materialsIndex.json` y el consolidado de
cuestionarios a `src/data/maestria/quizzes.json` (lo consume la app).

## 2. Cómo regenerar

```bash
npm run maestria        # genera los 64 archivos + los índices JSON
```

Las tipografías están vendorizadas en `scripts/assets/fonts/` (Spectral, IBM Plex
Sans, IBM Plex Mono) — la generación es 100 % offline.

## 3. Cómo editar / agregar contenido

El contenido de cada asignatura vive en un único archivo TypeScript:

```
src/data/maestria/a1_1.ts … a4_4.ts   # una `Asignatura` por archivo
src/data/maestria/types.ts            # modelo de contenido (bloques, caso, Excel, quiz)
src/data/maestria/index.ts            # registro de las 16
scripts/maestria/CASO-MAESTRO.md      # fuente única de verdad del caso (anclas numéricas)
```

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
- **Cuestionario** (`src/components/MaestriaQuiz.tsx`): 15 preguntas, hasta 3
  intentos, guarda el **mejor puntaje**, muestra correcto/incorrecto + justificación.
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
