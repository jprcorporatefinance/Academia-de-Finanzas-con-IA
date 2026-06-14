import type { ContentBlock } from '../types'
import { MarkdownLite } from './MarkdownLite'
import { simulators } from '../simulators/registry'
import { useStore } from '../store/store'
import {
  Lightbulb,
  AlertTriangle,
  Sigma,
  Briefcase,
  Sparkles,
  ListChecks,
  Copy,
  Check,
  PlayCircle,
} from 'lucide-react'
import { useState } from 'react'

export function LessonBlockView({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'theory':
      return (
        <div className="mb-6">
          {block.title && <h3 className="mb-2 text-lg font-bold text-gold-200">{block.title}</h3>}
          <MarkdownLite text={block.body} />
        </div>
      )

    case 'keypoints':
      return (
        <div className="card mb-6 p-5">
          <div className="mb-3 flex items-center gap-2 text-gold-300">
            <ListChecks size={18} />
            <h3 className="text-base font-bold">{block.title}</h3>
          </div>
          <ul className="space-y-2">
            {block.points.map((p, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                <span>
                  <MarkdownLite text={p} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'insight':
      return (
        <div className="mb-6 flex gap-3 rounded-2xl border border-value-500/30 bg-value-500/5 p-5">
          <Lightbulb size={20} className="mt-0.5 shrink-0 text-value-400" />
          <div className="text-sm font-medium text-value-100">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-value-400">
              La idea clave
            </span>
            <MarkdownLite text={block.body} />
          </div>
        </div>
      )

    case 'warning':
      return (
        <div className="mb-6 flex gap-3 rounded-2xl border border-danger-500/30 bg-danger-500/5 p-5">
          <AlertTriangle size={20} className="mt-0.5 shrink-0 text-danger-400" />
          <div className="text-sm font-medium text-danger-100">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-danger-400">
              Atención
            </span>
            <MarkdownLite text={block.body} />
          </div>
        </div>
      )

    case 'formula':
      return (
        <div className="mb-6 rounded-2xl border border-gold-400/30 bg-ink-900/60 p-5">
          <div className="mb-2 flex items-center gap-2 text-gold-300">
            <Sigma size={18} />
            <span className="text-xs font-bold uppercase tracking-wider">{block.name}</span>
          </div>
          <div className="rounded-xl bg-ink-950/70 px-4 py-3 text-center font-mono text-lg text-gold-100">
            {block.expr}
          </div>
          {block.note && <p className="mt-2 text-xs text-slate-400">{block.note}</p>}
        </div>
      )

    case 'case':
      return (
        <div className="mb-6 rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5">
          <div className="mb-2 flex items-center gap-2 text-blue-300">
            <Briefcase size={18} />
            <h3 className="text-base font-bold">{block.title}</h3>
          </div>
          <MarkdownLite text={block.body} />
        </div>
      )

    case 'table':
      return (
        <div className="card mb-6 overflow-hidden p-0">
          {block.title && (
            <div className="border-b border-ink-700 px-5 py-3 text-sm font-bold text-gold-200">{block.title}</div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-ink-800/70 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  {block.headers.map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-ink-700/40">
                    {row.map((cell, ci) => (
                      <td key={ci} className={`px-4 py-2.5 ${ci === 0 ? 'text-slate-200' : 'tabular-nums text-slate-300'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )

    case 'claude':
      return <ClaudeBlock goal={block.goal} prompt={block.prompt} note={block.note} />

    case 'simulator':
      return <SimulatorEmbed simulatorId={block.simulatorId} intro={block.intro} />

    default:
      return null
  }
}

function ClaudeBlock({ goal, prompt, note }: { goal: string; prompt: string; note?: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-gold-400/40 bg-gradient-to-br from-ink-800/80 to-ink-900/80">
      <div className="flex items-center gap-2 border-b border-gold-400/20 bg-gold-400/5 px-5 py-3">
        <Sparkles size={18} className="text-gold-300" />
        <span className="text-sm font-bold text-gold-200">Resolvelo con Claude</span>
      </div>
      <div className="p-5">
        <p className="mb-3 text-sm text-slate-300">
          <span className="font-semibold text-slate-100">Objetivo: </span>
          {goal}
        </p>
        <div className="relative rounded-xl border border-ink-600 bg-ink-950/70 p-4">
          <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-300">{prompt}</pre>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(prompt)
              setCopied(true)
              setTimeout(() => setCopied(false), 1800)
            }}
            className="btn-ghost absolute right-3 top-3 px-2.5 py-1.5 text-xs"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>
        {note && <p className="mt-3 text-xs text-slate-400">{note}</p>}
      </div>
    </div>
  )
}

function SimulatorEmbed({ simulatorId, intro }: { simulatorId: string; intro?: string }) {
  const meta = simulators[simulatorId]
  const { recordSimulatorRun } = useStore()
  const [open, setOpen] = useState(false)
  if (!meta) return null
  const Comp = meta.Component
  return (
    <div className="mb-6 rounded-2xl border border-gold-400/30 bg-ink-900/40 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <PlayCircle size={18} className="text-gold-300" />
          <div>
            <h3 className="text-base font-bold text-slate-100">Simulador: {meta.title}</h3>
            {intro && <p className="text-xs text-slate-400">{intro}</p>}
          </div>
        </div>
        <button
          className={open ? 'btn-ghost' : 'btn-gold'}
          onClick={() => {
            setOpen((o) => !o)
            if (!open) recordSimulatorRun(simulatorId, `Abrió el simulador desde la lección`)
          }}
        >
          {open ? 'Ocultar' : 'Abrir simulador'}
        </button>
      </div>
      {open && (
        <div className="mt-5 animate-fade-up">
          <Comp />
        </div>
      )}
    </div>
  )
}
