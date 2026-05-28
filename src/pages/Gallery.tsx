import { TeamCardView } from '../components/TeamCardView'
import { teamCards } from '../data/teamCards'

export default function Gallery() {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-16 md:px-10 md:py-24">
      {/* Header */}
      <header className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-(--color-accent) shadow-[0_0_12px_rgba(0,229,204,0.7)]" />
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-(--color-accent)">
            alt-training-plus / v1
          </p>
        </div>
        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-(--color-ink) md:text-6xl">
          The Team Cards Workshop
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-(--color-ink-soft) md:text-xl">
          A hands-on git + PR workshop. Clone this repo, create a branch with
          Claude Code in VS Code, add your own card below, open a PR, and
          watch it ship.
        </p>
      </header>

      {/* Divider */}
      <div className="mt-14 mb-10 flex items-center gap-4">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-(--color-edge) to-transparent" />
      </div>

      {/* Gallery */}
      <section
        aria-labelledby="gallery-title"
        className="relative grid-pattern rounded-3xl border border-(--color-edge-soft) bg-(--color-surface)/40 p-6 backdrop-blur-sm md:p-10"
      >
        <div className="mb-8 flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-(--color-accent)">
              Team Gallery
            </p>
            <h2 id="gallery-title" className="text-3xl font-semibold tracking-tight">
              Meet the crew
            </h2>
          </div>
          <p className="font-mono text-sm text-(--color-ink-muted)">
            {String(teamCards.length).padStart(2, '0')} cards
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamCards.map((card) => (
            <TeamCardView key={card.name} card={card} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 flex flex-col gap-3 border-t border-(--color-edge-soft) pt-8 text-sm text-(--color-ink-muted)">
        <p>
          Built for the{' '}
          <span className="font-mono text-(--color-accent)">alt-training-plus</span> workshop.
        </p>
        <p>
          Edit{' '}
          <code className="rounded-md border border-(--color-edge-soft) bg-(--color-surface) px-2 py-1 font-mono text-xs text-(--color-accent)">
            src/data/teamCards.ts
          </code>{' '}
          to add yours. Pick a theme:{' '}
          <code className="font-mono text-(--color-ink-soft)">teal</code>,{' '}
          <code className="font-mono text-(--color-ink-soft)">navy</code>,{' '}
          <code className="font-mono text-(--color-ink-soft)">amber</code>, or{' '}
          <code className="font-mono text-(--color-ink-soft)">peach</code>.
        </p>
      </footer>
    </div>
  )
}
