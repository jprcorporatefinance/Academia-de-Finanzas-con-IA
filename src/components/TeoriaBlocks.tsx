import type { ReactNode } from 'react'
import type { Block, Section } from '../data/maestria/types'

// ============================================================================
// Renderizador de la teoría dentro de la app. Espeja el generador de PDF:
// párrafos, listas, fórmulas, recuadros, citas, tablas, cadenas y pasos.
// ============================================================================

/** markdown-lite inline: **negrita**, *itálica*, `código` */
export function md(text: string): ReactNode[] {
  const out: ReactNode[] = []
  const re = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[2]) out.push(<strong key={k++} className="font-semibold text-slate-100">{m[2]}</strong>)
    else if (m[3]) out.push(<em key={k++}>{m[3]}</em>)
    else if (m[4]) out.push(<code key={k++} className="rounded bg-ink-800 px-1 py-0.5 font-mono text-[0.9em] text-gold-300">{m[4]}</code>)
    last = m.index + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const isNum = (s: string) => /^[\s]*[-−+]?[\d.,]+\s*%?\s*$|^[\s]*[-−]?\$?[\d.,]+/.test(s.replace(/\*/g, ''))

function Callout({ tone, label, children }: { tone: 'idea' | 'warn'; label: string; children: ReactNode }) {
  const cls =
    tone === 'idea'
      ? 'border-l-value-500 bg-value-500/5'
      : 'border-l-gold-400 bg-gold-400/5'
  const labelCls = tone === 'idea' ? 'text-value-400' : 'text-gold-300'
  return (
    <div className={`my-4 rounded-r-xl border-l-[3px] px-4 py-3 text-sm text-slate-300 ${cls}`}>
      <span className={`mr-1.5 font-semibold uppercase tracking-wider ${labelCls}`}>{label}</span>
      {children}
    </div>
  )
}

export function BlockView({ b }: { b: Block }) {
  switch (b.t) {
    case 'p':
      return <p className="mb-3 leading-relaxed text-slate-300">{md(b.md)}</p>

    case 'h':
      return <h4 className="mb-2 mt-5 font-semibold text-slate-100">{b.text}</h4>

    case 'ul':
      return (
        <ul className="mb-4 ml-1 space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
              <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold-400" />
              <span>{md(it)}</span>
            </li>
          ))}
        </ul>
      )

    case 'ol':
      return (
        <ol className="mb-4 ml-1 space-y-1.5">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-300">
              <span className="shrink-0 font-mono text-xs text-gold-300">{i + 1}.</span>
              <span>{md(it)}</span>
            </li>
          ))}
        </ol>
      )

    case 'formula':
      return (
        <div className="my-4 rounded-xl border border-ink-700 border-l-[3px] border-l-value-500 bg-ink-800/50 px-4 py-3.5">
          <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-value-400">{b.name}</div>
          <div className="overflow-x-auto text-center font-mono text-base text-slate-100">{b.expr}</div>
          {b.where && <div className="mt-2 text-center text-xs text-slate-500">{md(b.where)}</div>}
          {b.note && <div className="mt-2 text-xs italic text-slate-400">{md(b.note)}</div>}
        </div>
      )

    case 'idea':
      return <Callout tone="idea" label="Idea clave">{md(b.md)}</Callout>

    case 'warn':
      return <Callout tone="warn" label="Atención">{md(b.md)}</Callout>

    case 'quote':
      return (
        <blockquote className="my-4 rounded-r-xl border-l-[3px] border-l-value-500 bg-ink-800/40 px-4 py-3">
          <p className="text-sm italic leading-relaxed text-slate-300">{md(b.md)}</p>
          <footer className="mt-2 text-xs">
            <span className="font-semibold text-value-400">— {b.author}.</span>{' '}
            <span className="text-slate-500">
              {b.credential}
              {b.source ? `. ${b.source}` : ''}
            </span>
          </footer>
        </blockquote>
      )

    case 'table':
      return (
        <figure className="my-4">
          {b.title && <figcaption className="mb-2 text-sm font-semibold text-slate-100">{b.title}</figcaption>}
          <div className="overflow-x-auto rounded-xl border border-ink-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-value-600/90">
                  {b.headers.map((h, i) => (
                    <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-slate-100">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i} className={i % 2 ? 'bg-ink-800/40' : ''}>
                    {r.map((c, j) => (
                      <td
                        key={j}
                        className={`border-t border-ink-700 px-3 py-2 text-slate-300 ${
                          j > 0 && isNum(c) ? 'text-right font-mono tabular-nums' : ''
                        }`}
                      >
                        {md(c)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.caption && <p className="mt-2 text-xs italic text-slate-500">{md(b.caption)}</p>}
        </figure>
      )

    case 'chain':
      return (
        <figure className="my-4">
          {b.title && <figcaption className="mb-2 text-sm font-semibold text-slate-100">{b.title}</figcaption>}
          <div className="flex flex-wrap items-stretch gap-2">
            {b.nodes.map((n, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex min-h-[3.5rem] min-w-[8rem] max-w-[13rem] flex-1 items-center justify-center rounded-xl border border-value-500/40 bg-ink-800/60 px-3 py-2 text-center text-xs leading-snug text-slate-200">
                  {md(n)}
                </div>
                {i < b.nodes.length - 1 && <span className="font-mono text-value-400">→</span>}
              </div>
            ))}
          </div>
          {b.caption && <p className="mt-2 text-xs italic text-slate-500">{md(b.caption)}</p>}
        </figure>
      )

    case 'steps':
      return (
        <div className="my-4">
          {b.title && <div className="mb-2 text-sm font-semibold text-slate-100">{b.title}</div>}
          <ol className="divide-y divide-ink-700 rounded-xl border border-ink-700">
            {b.items.map((it, i) => (
              <li key={i} className="flex gap-3 px-4 py-3">
                <span className="shrink-0 font-mono text-sm font-semibold text-value-400">{i + 1}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-100">{it.k}</div>
                  <div className="mt-0.5 text-sm leading-relaxed text-slate-400">{md(it.d)}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )
  }
  return null
}

export function SectionView({ s, n }: { s: Section; n: number }) {
  return (
    <section className="mb-8">
      <div className="mb-1 h-[2px] w-7 bg-value-500" />
      <h3 className="mb-2 font-serif text-xl font-bold text-slate-100">
        <span className="mr-2 font-mono text-base text-value-400">{String(n).padStart(2, '0')}</span>
        {s.title}
      </h3>
      {s.intro && <p className="mb-4 leading-relaxed text-slate-400">{md(s.intro)}</p>}
      {s.blocks.map((b, i) => (
        <BlockView key={i} b={b} />
      ))}
    </section>
  )
}
