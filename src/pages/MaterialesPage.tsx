import { useState } from 'react'
import { useStore } from '../store/store'
import type { Material, Lesson, Pillar } from '../types'
import { FileText, Video, Table, Link2, Sparkles, Trash2, Plus, BookOpen } from 'lucide-react'

const kindMeta: Record<Material['kind'], { icon: typeof FileText; label: string }> = {
  pdf: { icon: FileText, label: 'PDF' },
  video: { icon: Video, label: 'Video' },
  planilla: { icon: Table, label: 'Planilla' },
  articulo: { icon: BookOpen, label: 'Artículo' },
  'plantilla-claude': { icon: Sparkles, label: 'Plantilla Claude' },
  enlace: { icon: Link2, label: 'Enlace' },
}

const pillars: Pillar[] = [
  'Lectura Contable',
  'Construcción de Valor',
  'Económico vs Financiero',
  'Flujos de Caja',
  'Costo del Capital',
  'Apalancamiento y Riesgo',
  'Capital de Trabajo',
  'Valuación',
  'Estrategia Financiera',
]

export default function MaterialesPage() {
  const { materials, currentUser, addMaterial, deleteMaterial, curriculum, addLesson } = useStore()
  const isAdmin = currentUser?.role === 'admin'
  const [tab, setTab] = useState<'material' | 'leccion'>('material')

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Materiales y biblioteca</h1>
        <p className="text-sm text-slate-400">
          Recursos complementarios del programa.{isAdmin && ' Como administrador podés sumar material y nuevas clases.'}
        </p>
      </header>

      {isAdmin && (
        <div className="card mb-6 p-5">
          <div className="mb-4 flex rounded-xl border border-ink-700 bg-ink-950/50 p-1">
            {(['material', 'leccion'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 rounded-lg py-2 text-sm font-semibold transition ${tab === t ? 'bg-gold-400 text-ink-950' : 'text-slate-400'}`}
              >
                {t === 'material' ? 'Agregar material' : 'Crear nueva clase'}
              </button>
            ))}
          </div>
          {tab === 'material' ? (
            <MaterialForm onSubmit={addMaterial} lessons={curriculum} />
          ) : (
            <LessonForm onSubmit={addLesson} existingWeeks={curriculum.map((l) => l.week)} pillars={pillars} />
          )}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {materials.map((m) => {
          const Meta = kindMeta[m.kind]
          return (
            <div key={m.id} className="card p-5">
              <div className="mb-2 flex items-start justify-between">
                <span className="chip border-gold-400/30 text-gold-200">
                  <Meta.icon size={13} /> {Meta.label}
                </span>
                {isAdmin && (
                  <button onClick={() => deleteMaterial(m.id)} className="text-slate-500 hover:text-danger-400">
                    <Trash2 size={15} />
                  </button>
                )}
              </div>
              <h3 className="font-bold text-slate-100">{m.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{m.description}</p>
              {m.body && (
                <pre className="mt-3 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg border border-ink-600 bg-ink-950/60 p-3 font-mono text-xs text-slate-300">
                  {m.body}
                </pre>
              )}
              {m.url && (
                <a href={m.url} target="_blank" rel="noreferrer" className="btn-ghost mt-3 text-sm">
                  <Link2 size={14} /> Abrir recurso
                </a>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MaterialForm({
  onSubmit,
  lessons,
}: {
  onSubmit: (m: Omit<Material, 'id' | 'createdAt' | 'createdBy'>) => void
  lessons: Lesson[]
}) {
  const [title, setTitle] = useState('')
  const [kind, setKind] = useState<Material['kind']>('articulo')
  const [description, setDescription] = useState('')
  const [url, setUrl] = useState('')
  const [body, setBody] = useState('')
  const [lessonId, setLessonId] = useState('')
  const [done, setDone] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!title) return
        onSubmit({ title, kind, description, url: url || undefined, body: body || undefined, lessonId: lessonId || undefined })
        setTitle(''); setDescription(''); setUrl(''); setBody(''); setLessonId('')
        setDone(true); setTimeout(() => setDone(false), 2000)
      }}
      className="space-y-3"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Título</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Guía de ratios" />
        </div>
        <div>
          <label className="label">Tipo</label>
          <select className="input" value={kind} onChange={(e) => setKind(e.target.value as Material['kind'])}>
            {Object.entries(kindMeta).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Descripción</label>
        <input className="input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descripción" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">URL (opcional)</label>
          <input className="input" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
        </div>
        <div>
          <label className="label">Asociar a clase (opcional)</label>
          <select className="input" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            <option value="">Material general</option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>Semana {l.week} · {l.title}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Contenido embebido / prompt (opcional)</label>
        <textarea className="input min-h-[80px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Texto, nota o prompt para Claude" />
      </div>
      <button className="btn-gold" type="submit"><Plus size={16} /> Agregar material</button>
      {done && <span className="ml-3 text-sm text-value-400">✓ Agregado</span>}
    </form>
  )
}

function LessonForm({
  onSubmit,
  existingWeeks,
  pillars,
}: {
  onSubmit: (l: Lesson) => void
  existingWeeks: number[]
  pillars: Pillar[]
}) {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [pillar, setPillar] = useState<Pillar>('Estrategia Financiera')
  const [body, setBody] = useState('')
  const [done, setDone] = useState(false)
  const nextWeek = Math.max(0, ...existingWeeks) + 1

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (!title) return
        const lesson: Lesson = {
          id: `custom-${Date.now()}`,
          week: nextWeek,
          title,
          subtitle,
          pillar,
          durationMin: 60,
          objectives: ['Clase agregada por la dirección académica.'],
          blocks: body ? [{ type: 'theory', body }] : [],
          quiz: [],
          simulators: [],
          custom: true,
        }
        onSubmit(lesson)
        setTitle(''); setSubtitle(''); setBody('')
        setDone(true); setTimeout(() => setDone(false), 2000)
      }}
      className="space-y-3"
    >
      <p className="text-xs text-slate-500">Se agregará como Semana {nextWeek} del programa.</p>
      <div>
        <label className="label">Título de la clase</label>
        <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej: Fusiones y adquisiciones" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">Subtítulo</label>
          <input className="input" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Bajada de la clase" />
        </div>
        <div>
          <label className="label">Pilar temático</label>
          <select className="input" value={pillar} onChange={(e) => setPillar(e.target.value as Pillar)}>
            {pillars.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Contenido (teoría)</label>
        <textarea className="input min-h-[120px]" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Escribí la teoría. Podés usar **negrita** y listas con guiones." />
      </div>
      <button className="btn-gold" type="submit"><Plus size={16} /> Crear clase</button>
      {done && <span className="ml-3 text-sm text-value-400">✓ Clase agregada al programa</span>}
    </form>
  )
}
