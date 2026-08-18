import { useMemo, useRef, useState } from 'react'
import { useStore } from '../store/store'
import type { CaseSubmission, SubmissionFile } from '../types'
import { Upload, FileText, FileSpreadsheet, FileCode, File as FileIcon, Download, Loader2 } from 'lucide-react'

const ACCEPT = '.pdf,.xlsx,.xls,.csv,.html,.htm'

function iconFor(kind: SubmissionFile['kind']) {
  if (kind === 'pdf') return FileText
  if (kind === 'excel') return FileSpreadsheet
  if (kind === 'html') return FileCode
  return FileIcon
}

function SubmissionFileRow({ f }: { f: SubmissionFile }) {
  const { downloadSubmissionFile } = useStore()
  const [loading, setLoading] = useState(false)
  const Icon = iconFor(f.kind)
  async function open() {
    setLoading(true)
    const url = await downloadSubmissionFile(f)
    setLoading(false)
    if (url) window.open(url, '_blank')
  }
  return (
    <button
      onClick={open}
      className="flex items-center gap-2 rounded-lg border border-ink-600 bg-ink-800/50 px-3 py-1.5 text-xs text-slate-300 hover:border-gold-400/50"
    >
      <Icon size={14} className="text-gold-300" />
      <span className="max-w-[200px] truncate">{f.name}</span>
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Download size={13} className="opacity-60" />}
    </button>
  )
}

// ============================================================================
// Subida de la solución del caso: acepta PDF (desarrollo), Excel (numérico) y
// HTML. Muestra las entregas previas del alumno.
// ============================================================================
export function CaseUpload({ cod }: { cod: string }) {
  const { currentUser, caseSubmissions, submitCase, backend } = useStore()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [note, setNote] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const mine = useMemo<CaseSubmission[]>(
    () =>
      caseSubmissions
        .filter((s) => s.userId === currentUser?.id && s.cod === cod)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [caseSubmissions, currentUser?.id, cod],
  )

  function pick(list: FileList | null) {
    if (!list) return
    setFiles(Array.from(list))
    setMsg(null)
  }

  async function send() {
    if (files.length === 0) return
    setBusy(true)
    const res = await submitCase(cod, files, note.trim())
    setBusy(false)
    if (res.ok) {
      setFiles([])
      setNote('')
      if (inputRef.current) inputRef.current.value = ''
      setMsg({ ok: true, text: '¡Entrega registrada!' })
    } else {
      setMsg({ ok: false, text: res.error ?? 'No se pudo subir la entrega.' })
    }
  }

  return (
    <div className="card p-5">
      <div className="mb-1 text-sm font-semibold text-slate-100">Resolver el caso — subí tu solución</div>
      <p className="mb-4 text-sm text-slate-400">
        Adjuntá el <strong>PDF</strong> con el desarrollo y el <strong>Excel</strong> con la parte
        numérica. También se acepta <strong>HTML</strong>.
      </p>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault()
          pick(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-600 bg-ink-800/40 px-4 py-6 text-center transition hover:border-gold-400/50"
      >
        <Upload size={22} className="text-gold-300" />
        <div className="text-sm text-slate-300">Arrastrá tus archivos o hacé clic para elegir</div>
        <div className="text-xs text-slate-500">PDF · Excel (.xlsx/.csv) · HTML</div>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPT}
          className="hidden"
          onChange={(e) => pick(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {files.map((f, i) => (
            <span key={i} className="rounded-lg border border-ink-600 bg-ink-800/60 px-2.5 py-1 text-xs text-slate-300">
              {f.name}
            </span>
          ))}
        </div>
      )}

      <textarea
        className="input mt-3 min-h-[70px]"
        placeholder="Nota para el docente (opcional): supuestos, aclaraciones…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="mt-3 flex items-center justify-between gap-3">
        {msg ? (
          <span className={`text-sm ${msg.ok ? 'text-value-400' : 'text-danger-400'}`}>{msg.text}</span>
        ) : (
          <span className="text-xs text-slate-500">
            {backend === 'local' ? 'Modo demo: se registra la entrega (sin almacenar el archivo).' : ''}
          </span>
        )}
        <button className="btn" disabled={files.length === 0 || busy} onClick={send}>
          {busy ? 'Subiendo…' : 'Entregar solución'}
        </button>
      </div>

      {mine.length > 0 && (
        <div className="mt-5 border-t border-ink-700 pt-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Tus entregas ({mine.length})
          </div>
          <div className="space-y-3">
            {mine.map((s) => (
              <div key={s.id} className="rounded-xl border border-ink-700 bg-ink-800/40 p-3">
                <div className="mb-2 text-xs text-slate-500">
                  {new Date(s.createdAt).toLocaleString('es-AR')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.files.map((f, i) => (
                    <SubmissionFileRow key={i} f={f} />
                  ))}
                </div>
                {s.note && <div className="mt-2 text-sm text-slate-400">{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
