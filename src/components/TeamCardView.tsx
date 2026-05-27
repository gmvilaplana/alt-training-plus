import type { TeamCard } from '../data/teamCards'

type Props = {
  card: TeamCard
}

export function TeamCardView({ card }: Props) {
  return (
    <article
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-edge bg-surface p-6 shadow-lg transition-transform hover:-translate-y-1"
      style={{ borderTopColor: card.accent, borderTopWidth: 4 }}
    >
      {card.themeBg && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: card.themeBg }}
        />
      )}

      <header className="relative z-10">
        <div className="mb-2 text-2xl" aria-hidden>
          {card.emoji ?? '👤'}
        </div>
        <h2 className="text-xl font-semibold text-ink">{card.name}</h2>
        <p className="text-sm uppercase tracking-wider text-ink-muted">
          {card.role}
        </p>
      </header>

      <p className="relative z-10 mt-4 text-base leading-relaxed text-ink">
        {card.skill}
      </p>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-1 rounded-b-2xl"
        style={{ background: card.accent }}
      />
    </article>
  )
}
