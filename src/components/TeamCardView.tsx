import type { CardTheme, TeamCard } from '../data/teamCards'

type Props = {
  card: TeamCard
}

const themeStyles: Record<CardTheme, { bg: string; ink: string; glow: string }> = {
  teal: {
    bg: 'var(--color-theme-teal)',
    ink: 'var(--color-theme-teal-ink)',
    glow: '0 0 30px rgba(0, 229, 204, 0.25)',
  },
  navy: {
    bg: 'var(--color-theme-navy)',
    ink: 'var(--color-theme-navy-ink)',
    glow: '0 0 30px rgba(99, 142, 232, 0.22)',
  },
  amber: {
    bg: 'var(--color-theme-amber)',
    ink: 'var(--color-theme-amber-ink)',
    glow: '0 0 30px rgba(245, 215, 149, 0.18)',
  },
  peach: {
    bg: 'var(--color-theme-peach)',
    ink: 'var(--color-theme-peach-ink)',
    glow: '0 0 30px rgba(239, 134, 101, 0.28)',
  },
}

export function TeamCardView({ card }: Props) {
  const t = themeStyles[card.theme]
  return (
    <article
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: t.bg,
        color: t.ink,
        boxShadow: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
      }}
    >
      {/* Optional per-card hover background (e.g. Kevin's Mars space scene) */}
      {card.themeBg ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: card.themeBg }}
        />
      ) : null}

      {/* Accent corner glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 z-0 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ background: t.glow.includes('229') ? '#00e5cc' : t.ink }}
      />

      {/* Eyebrow with bright teal accent (signature playbook detail) */}
      <p className="relative z-10 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-(--color-accent)">
        Team · {card.theme}
      </p>

      {card.emoji ? (
        <div className="relative z-10 text-3xl" aria-hidden>
          {card.emoji}
        </div>
      ) : null}

      <header className="relative z-10 flex flex-col gap-1.5">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">{card.name}</h2>
        <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-70">
          {card.role}
        </p>
      </header>

      <p className="relative z-10 text-base leading-relaxed opacity-90">{card.skill}</p>

      {/* Bottom accent bar */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-(--color-accent) to-transparent opacity-40 transition-opacity duration-300 group-hover:opacity-90"
      />
    </article>
  )
}
