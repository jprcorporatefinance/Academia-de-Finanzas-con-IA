import type { ReactNode } from 'react'

// Renderizador minimalista: **negrita**, *itálica*, listas con "- " y párrafos por \n\n.
function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|_([^_]+)_)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[2]) nodes.push(<strong key={`${keyPrefix}-b${i}`}>{match[2]}</strong>)
    else if (match[3]) nodes.push(<em key={`${keyPrefix}-i${i}`}>{match[3]}</em>)
    else if (match[4]) nodes.push(<em key={`${keyPrefix}-u${i}`}>{match[4]}</em>)
    lastIndex = match.index + match[0].length
    i++
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

export function MarkdownLite({ text }: { text: string }) {
  const blocks = text.trim().split(/\n\n+/)
  return (
    <div className="prose-fin">
      {blocks.map((block, bi) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => l.trim().startsWith('- '))
        if (isList) {
          return (
            <ul key={bi}>
              {lines.map((l, li) => (
                <li key={li}>{renderInline(l.replace(/^\s*-\s/, ''), `${bi}-${li}`)}</li>
              ))}
            </ul>
          )
        }
        return <p key={bi}>{renderInline(block, `${bi}`)}</p>
      })}
    </div>
  )
}
