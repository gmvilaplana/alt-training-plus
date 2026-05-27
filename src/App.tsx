import { TeamCardView } from './components/TeamCardView'
import { teamCards } from './data/teamCards'

function App() {
  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-16">
      <header className="flex flex-col gap-4">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-accent">
          alt-training-plus
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">
          The Team Cards Workshop
        </h1>
        <p className="max-w-2xl text-lg text-ink-muted">
          A hands-on git + PR workshop. Clone this repo, create a branch with
          Claude Code in VS Code, add your own card below, open a PR, and watch
          it ship.
        </p>
      </header>

      <section aria-labelledby="gallery-title" className="flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <h2 id="gallery-title" className="text-2xl font-semibold text-ink">
            Team Gallery
          </h2>
          <p className="text-sm text-ink-muted">
            {teamCards.length} card{teamCards.length === 1 ? '' : 's'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamCards.map((card) => (
            <TeamCardView key={card.name} card={card} />
          ))}
        </div>
      </section>

      <footer className="mt-auto border-t border-edge pt-6 text-sm text-ink-muted">
        Built for the alt-training-plus workshop · Edit{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-accent">
          src/data/teamCards.ts
        </code>{' '}
        to add yours.
      </footer>
    </div>
  )
}

export default App
