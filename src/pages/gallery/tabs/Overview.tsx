export default function Overview() {
  return (
    <div className="flex flex-col gap-6">
      <Card title="Overview">
        <p>
          A 2-hour hands-on session for the team. By the end of it, every
          participant will have <strong>cloned this repo</strong>, created a
          feature branch with <strong>Claude Code in VS Code</strong>, opened
          a pull request with their own Team Card, and watched the
          facilitator merge it. The goal isn&rsquo;t the card — the goal is
          the <em>flow</em>: clone → branch → change → commit → PR → merge.
        </p>
      </Card>

      <Card title="Agenda">
        <Section heading="Intro · 10 min">
          <Bullet>What we&rsquo;re doing today and why it matters</Bullet>
          <Bullet>Demo: full cycle code change, PR review to merge</Bullet>
        </Section>

        <Section heading="Setup check · 15 min">
          <Bullet>Node, git, VS Code + Claude Code, GitHub access</Bullet>
          <Bullet>Everyone clones the repo and runs the site locally</Bullet>
        </Section>

        <Section heading="Your First PR walkthrough · 25 min">
          <Bullet>Branching strategy + PR etiquette</Bullet>
          <Bullet>Plan mode in Claude Code before writing any code</Bullet>
          <Bullet>git status / diff / add / commit / push</Bullet>
        </Section>

        <Section heading="Warm-up Challenge · 45 min">
          <Bullet>
            Each participant creates their own Team Card component
          </Bullet>
          <Bullet>
            One file per person — no shared array, no merge conflicts
          </Bullet>
          <Bullet>Open a PR and request a review from the facilitator</Bullet>
        </Section>

        <Section heading="Group merge + wrap-up · 25 min">
          <Bullet>Review and merge each PR live</Bullet>
          <Bullet>See all the cards land in the gallery together</Bullet>
          <Bullet>Q&amp;A, feedback, next steps</Bullet>
        </Section>
      </Card>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-(--color-edge-soft) bg-(--color-surface)/50 p-6 md:p-8">
      <h2 className="mb-4 text-xl font-semibold text-(--color-accent)">{title}</h2>
      <div className="flex flex-col gap-4 text-(--color-ink-soft) leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 font-semibold text-(--color-ink)">{heading}</h3>
      <ul className="flex flex-col gap-1.5 pl-5">{children}</ul>
    </div>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <li className="list-disc">{children}</li>
}
