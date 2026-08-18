/* eslint-disable */
// ============================================================================
// Generador de entregables de la Maestría (por asignatura):
//   • <slug>-PDF.pdf         → PDF didáctico extenso con marca JPR
//   • <slug>-Caso.xlsx       → Excel dinámico del caso (matrices dinámicas)
//   • <slug>-Cuestionario.pdf→ 15 preguntas con solucionario justificado
//   • <slug>-Quiz.json       → banco de preguntas (alimenta el motor in-app)
// Ejecutar: npm run maestria
// ============================================================================
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { asignaturas } from '../../src/data/maestria/index'
import { buildAsignaturaPDF, buildQuizPDF } from './pdf'
import { buildExcel } from './excel'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..', '..')
const OUT = join(ROOT, 'public', 'maestria')

async function main() {
  const index: any[] = []
  for (const a of asignaturas) {
    const dir = join(OUT, a.slug)
    mkdirSync(dir, { recursive: true })

    const pdfBuf = await buildAsignaturaPDF(a)
    const quizPdfBuf = await buildQuizPDF(a)
    const xlBuf = await buildExcel(a)

    const pdfName = `${a.slug}-PDF.pdf`
    const casoName = `${a.slug}-Caso.xlsx`
    const cuestName = `${a.slug}-Cuestionario.pdf`
    const quizJson = `${a.slug}-Quiz.json`

    writeFileSync(join(dir, pdfName), pdfBuf)
    writeFileSync(join(dir, cuestName), quizPdfBuf)
    writeFileSync(join(dir, casoName), xlBuf)
    writeFileSync(join(dir, quizJson), JSON.stringify({ cod: a.cod, nombre: a.nombre, preguntas: a.quiz }, null, 2), 'utf8')

    index.push({
      cod: a.cod,
      slug: a.slug,
      cuatrimestre: a.cuatrimestre,
      nombre: a.nombre,
      fase: a.fase,
      horas: a.horas,
      resumen: a.resumen,
      pdf: `/maestria/${a.slug}/${pdfName}`,
      caso: `/maestria/${a.slug}/${casoName}`,
      cuestionario: `/maestria/${a.slug}/${cuestName}`,
      quiz: `/maestria/${a.slug}/${quizJson}`,
      preguntas: a.quiz.length,
    })
    console.log(`✓ Asignatura ${a.cod} — PDF (${(pdfBuf.length / 1024) | 0} KB), Caso.xlsx, Cuestionario, Quiz.json`)
  }
  const idxDir = join(ROOT, 'src', 'data', 'maestria')
  mkdirSync(idxDir, { recursive: true })
  writeFileSync(join(idxDir, 'materialsIndex.json'), JSON.stringify(index, null, 2), 'utf8')
  console.log(`\n✔ ${index.length} asignatura(s). Índice en src/data/maestria/materialsIndex.json`)
}

main().catch((e) => { console.error(e); process.exit(1) })
