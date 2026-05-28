import type { ComponentType } from 'react'

type CardModule = { default: ComponentType }

// Auto-discover every card component in `src/cards/`. Eager so the bundler
// includes them in the initial chunk. Files starting with `_` are skipped
// (e.g. `_template.tsx`).
const modules = import.meta.glob<CardModule>('../cards/*.tsx', { eager: true })

const cards: ComponentType[] = Object.entries(modules)
  .filter(([path]) => !/\/_/.test(path))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, mod]) => mod.default)

export function CardGallery() {
  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-(--color-edge) p-10 text-center">
        <p className="text-(--color-ink-soft)">
          No cards yet. Be the first to add yours.
        </p>
        <p className="mt-2 font-mono text-xs text-(--color-ink-muted)">
          Copy{' '}
          <code className="rounded bg-(--color-surface) px-1.5 py-0.5 text-(--color-accent)">
            src/cards/_template.tsx
          </code>{' '}
          to{' '}
          <code className="rounded bg-(--color-surface) px-1.5 py-0.5 text-(--color-accent)">
            src/cards/your-name.tsx
          </code>{' '}
          and open a PR.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {cards.map((Card, i) => (
        <Card key={i} />
      ))}
    </div>
  )
}
