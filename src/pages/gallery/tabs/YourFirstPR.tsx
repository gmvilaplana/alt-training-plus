export default function YourFirstPR() {
  return (
    <div className="flex flex-col gap-6">
      <Step n={1} title="Getting Started">
        <P>
          Before making any changes, make sure you&rsquo;re on the latest
          version of <C>main</C> and create a new feature branch for your
          work.
        </P>
        <Code label="Run these commands in your terminal">
          <Line cmd="git checkout main" desc="Switch to the main branch" />
          <Line cmd="git pull" desc="Pull the latest changes from remote" />
          <Line
            cmd="git checkout -b feat/your-name-card"
            desc="Create and switch to a new feature branch (e.g. feat/juan-card)"
          />
        </Code>
        <Tip>
          ✨ <strong>Prompt Tip:</strong> Before running commands, you can ask
          Claude Code: &ldquo;What branch am I on and is it up to date?&rdquo;
          — it will check for you and suggest the right commands.
        </Tip>
      </Step>

      <Step n={2} title="Plan Before You Build">
        <P>
          Resist the urge to jump straight into code. Use{' '}
          <strong>Plan Mode</strong> in Claude Code to scope your change
          before anything gets generated. This helps you understand the size
          of what you&rsquo;re about to do and catch issues early.
        </P>
        <SubCard title="How to use Plan Mode">
          <ol className="ml-5 flex list-decimal flex-col gap-1.5">
            <li>Write your prompt describing the change you want to make</li>
            <li>Switch Claude Code to Plan Mode (toggle in the agent panel)</li>
            <li>Review the plan — Claude will list the files it intends to change</li>
            <li>Ask clarifying questions: &ldquo;How many files will this touch?&rdquo;</li>
            <li>Once you&rsquo;re satisfied with the scope, accept the plan and let it build</li>
          </ol>
        </SubCard>
        <Tip>
          ✨ <strong>Prompt Tip:</strong> A good first PR is a{' '}
          <em>&ldquo;small gulp&rdquo;</em> — one focused change, not a
          buffet.
        </Tip>
      </Step>

      <Step n={3} title="Review, Stage & Commit">
        <P>
          After Claude makes your changes, don&rsquo;t push blindly. Review
          what changed, understand the diff, and write a meaningful commit
          message.
        </P>
        <Code label="Review and stage your changes">
          <Line cmd="git status" desc="See which files were added, modified, or deleted" />
          <Line cmd="git diff" desc="Review the exact lines changed" />
          <Line cmd="git add src/cards/your-name.tsx" desc="Stage your new card file" />
        </Code>
        <P>Once your changes are staged, write a clear commit message:</P>
        <Code label="Commit">
          <Line
            cmd={`git commit -m "Add team card for [your name]"`}
            desc="Short, descriptive — ask Claude Code to generate one if stuck"
          />
        </Code>
        <Tip>
          ✨ <strong>Prompt Tip:</strong> After running <C>git add ...</C>,
          ask: &ldquo;Write me a detailed commit message for the changes I
          just staged.&rdquo; Claude will read the diff and propose one.
        </Tip>
      </Step>

      <Step n={4} title="Push & Open Your PR">
        <P>
          Now it&rsquo;s time to push your branch to GitHub and open a Pull
          Request. Claude Code can auto-generate a PR description from your
          commits.
        </P>
        <Code label="Push your branch">
          <Line
            cmd="git push -u origin feat/your-name-card"
            desc="Push and set it to track the remote"
          />
        </Code>
        <SubCard title="Open the PR on GitHub">
          <ol className="ml-5 flex list-decimal flex-col gap-1.5">
            <li>Go to the repo on GitHub — you&rsquo;ll see a banner to &ldquo;Compare &amp; pull request&rdquo;</li>
            <li>Add a descriptive title summarizing the change</li>
            <li>In the description, include what you changed and why</li>
            <li>Request a review from the facilitator</li>
          </ol>
        </SubCard>

        <SubCard title="PR Checklist">
          <p className="mb-2 text-(--color-ink-soft)">Before requesting review, double-check:</p>
          <ul className="flex flex-col gap-1.5">
            {[
              'Is your branch up to date with main?',
              'Is the diff small and focused (only your card file)?',
              'Does your description explain the "why"?',
              'Did you request a reviewer?',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="size-4 rounded border-(--color-edge) accent-(--color-accent)"
                  disabled
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SubCard>
      </Step>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-(--color-edge-soft) bg-(--color-surface)/50 p-6 md:p-8">
      <h2 className="mb-4 flex items-baseline gap-3 text-xl font-semibold text-(--color-accent)">
        <span className="font-mono text-base text-(--color-ink-muted)">
          {n}.
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-(--color-ink-soft) leading-relaxed">
        {children}
      </div>
    </section>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-(--color-canvas) px-1.5 py-0.5 font-mono text-xs text-(--color-accent)">
      {children}
    </code>
  )
}

function Code({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-(--color-edge-soft) bg-(--color-canvas) p-3">
      {label ? (
        <p className="mb-2 text-xs font-semibold text-(--color-ink-muted)">{label}:</p>
      ) : null}
      <div className="flex flex-col gap-2 font-mono text-sm">{children}</div>
    </div>
  )
}

function Line({ cmd, desc }: { cmd: string; desc: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <code className="text-(--color-ink)">{cmd}</code>
      <span className="text-xs text-(--color-ink-muted)">{desc}</span>
    </div>
  )
}

function SubCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-(--color-edge-soft) bg-(--color-canvas)/40 p-4">
      <p className="mb-2 text-sm font-semibold text-(--color-ink)">{title}</p>
      <div className="text-sm text-(--color-ink-soft)">{children}</div>
    </div>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-(--color-accent)/30 bg-(--color-accent)/5 px-4 py-3 text-sm">
      {children}
    </div>
  )
}
