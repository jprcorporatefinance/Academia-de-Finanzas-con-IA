import { useEffect, useMemo, useState } from 'react'
import { useStore } from '../store/store'
import { Send } from 'lucide-react'

export default function MensajesPage() {
  const { currentUser, students, users, conversationWith, sendMessage, markMessageRead, messages } = useStore()
  const isAdmin = currentUser?.role === 'admin'

  const admin = users.find((u) => u.role === 'admin')
  const contacts = isAdmin ? students : admin ? [admin] : []
  const [activeId, setActiveId] = useState<string>(contacts[0]?.id ?? '')

  const active = users.find((u) => u.id === activeId)
  const thread = useMemo(() => (active ? conversationWith(active.id) : []), [active, conversationWith, messages])

  // marcar como leídos los recibidos del contacto activo
  useEffect(() => {
    if (!currentUser || !active) return
    thread.filter((m) => m.toId === currentUser.id && !m.read).forEach((m) => markMessageRead(m.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, thread.length])

  const [text, setText] = useState('')
  const [context, setContext] = useState('')

  if (!currentUser) return null

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Mensajes privados</h1>
        <p className="text-sm text-slate-400">
          {isAdmin ? 'Comentá el avance de cada alumno de forma individual.' : 'Conversá con la dirección académica sobre tu progreso.'}
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        {/* Contactos */}
        <div className="card h-fit overflow-hidden p-0">
          <div className="border-b border-ink-700 px-4 py-3 text-xs font-bold uppercase tracking-wider text-slate-400">
            {isAdmin ? 'Alumnos' : 'Contacto'}
          </div>
          <div className="divide-y divide-ink-700/60">
            {contacts.map((c) => {
              const unread = messages.filter((m) => m.fromId === c.id && m.toId === currentUser.id && !m.read).length
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition ${activeId === c.id ? 'bg-ink-800/60' : 'hover:bg-ink-800/30'}`}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-ink-950" style={{ background: c.avatarColor }}>
                    {c.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-100">{c.name}</p>
                    <p className="truncate text-xs text-slate-500">{c.role === 'admin' ? 'Dirección' : c.company}</p>
                  </div>
                  {unread > 0 && <span className="rounded-full bg-danger-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{unread}</span>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Conversación */}
        <div className="card flex min-h-[520px] flex-col">
          {active ? (
            <>
              <div className="border-b border-ink-700 px-5 py-3">
                <p className="font-semibold text-slate-100">{active.name}</p>
                <p className="text-xs text-slate-500">{active.role === 'admin' ? 'Dirección académica' : `${active.position} · ${active.company}`}</p>
              </div>
              <div className="flex-1 space-y-3 overflow-y-auto p-5">
                {thread.length === 0 && (
                  <p className="py-10 text-center text-sm text-slate-500">No hay mensajes todavía. Escribí el primero.</p>
                )}
                {thread.map((m) => {
                  const mine = m.fromId === currentUser.id
                  return (
                    <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm ${mine ? 'bg-gold-400/15 text-gold-50' : 'bg-ink-800 text-slate-200'}`}>
                        {m.context && <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">{m.context}</p>}
                        <p className="whitespace-pre-wrap">{m.body}</p>
                        <p className="mt-1 text-[10px] text-slate-500">{new Date(m.createdAt).toLocaleString('es-AR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (!text.trim()) return
                  sendMessage(active.id, text.trim(), context.trim() || undefined)
                  setText(''); setContext('')
                }}
                className="border-t border-ink-700 p-4"
              >
                {isAdmin && (
                  <input
                    className="input mb-2 text-xs"
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Etiqueta de contexto (ej: Avance Semana 4) — opcional"
                  />
                )}
                <div className="flex gap-2">
                  <textarea
                    className="input min-h-[44px] flex-1 resize-none"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        if (text.trim()) {
                          sendMessage(active.id, text.trim(), context.trim() || undefined)
                          setText(''); setContext('')
                        }
                      }
                    }}
                    placeholder="Escribí un mensaje…"
                  />
                  <button className="btn-gold px-4" type="submit"><Send size={16} /></button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-slate-500">Seleccioná un contacto.</div>
          )}
        </div>
      </div>
    </div>
  )
}
