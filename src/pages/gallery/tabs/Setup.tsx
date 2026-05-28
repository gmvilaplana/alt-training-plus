export default function Setup() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-(--color-ink-soft) leading-relaxed">
        Before the workshop starts, make sure each of the four items below is
        installed and working. Each section has two options:{' '}
        <strong>(a)</strong> a terminal command if you&rsquo;re comfortable
        with the CLI, and <strong>(b)</strong> a prompt you can paste into
        Claude Code if you&rsquo;d rather not touch the terminal.
      </p>

      <Tip>
        If you don&rsquo;t have Claude Code yet, do <strong>section 3</strong>{' '}
        first — you&rsquo;ll need it to use the (b) prompts below.
      </Tip>

      <Step n={1} title="Node.js 20+ and npm">
        <Block label="(a) Terminal">
          <Code>{`node --version    # should print v20.x.x or higher
npm --version`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            macOS: <C>brew install node@20</C> · Windows: download the LTS
            installer from <a className="underline" href="https://nodejs.org">nodejs.org</a> ·
            Linux: <C>curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs</C>
          </p>
        </Block>
        <Block label="(b) Claude Code prompt">
          <Quote>
            Check whether Node.js version 20 or higher and <C>npm</C> are
            installed on my system. Run <C>node --version</C> and{' '}
            <C>npm --version</C> and tell me the result. If Node is missing
            or older than 20, give me the exact command to install it on my
            OS (I&rsquo;m on <strong>[macOS / Windows / Linux]</strong>).
          </Quote>
        </Block>
      </Step>

      <Step n={2} title="git configured with your name and email">
        <Block label="(a) Terminal">
          <Code>{`git --version
git config --global user.name
git config --global user.email`}</Code>
          <p className="text-sm text-(--color-ink-muted)">If either is empty, set them once:</p>
          <Code>{`git config --global user.name "Your Name"
git config --global user.email "you@telus.com"`}</Code>
        </Block>
        <Block label="(b) Claude Code prompt">
          <Quote>
            Check whether <C>git</C> is installed and that <C>user.name</C>{' '}
            and <C>user.email</C> are configured globally. If anything is
            missing, set my git <C>user.name</C> to{' '}
            <strong>&quot;[Your Name]&quot;</strong> and <C>user.email</C> to{' '}
            <strong>&quot;[you@telus.com]&quot;</strong> with{' '}
            <C>git config --global</C>.
          </Quote>
        </Block>
      </Step>

      <Step n={3} title="VS Code with the Claude Code extension">
        <Block label="Install">
          <ol className="ml-5 flex list-decimal flex-col gap-1.5 text-(--color-ink-soft)">
            <li>
              Install <strong>VS Code</strong> from{' '}
              <a className="underline" href="https://code.visualstudio.com">code.visualstudio.com</a>{' '}
              if you don&rsquo;t have it.
            </li>
            <li>
              VS Code → Extensions sidebar (<C>Cmd/Ctrl + Shift + X</C>) →
              search <strong>&ldquo;Claude Code&rdquo;</strong> → Install.
            </li>
            <li>
              Open the Claude Code panel and sign in when prompted.
            </li>
          </ol>
        </Block>
        <Block label="Optional terminal check">
          <Code>{`code --list-extensions | grep -i claude`}</Code>
        </Block>
      </Step>

      <Step n={4} title="GitHub access to this repo">
        <Block label="(a) Terminal">
          <Code>{`gh --version
gh auth status`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            If <C>gh</C> is missing: macOS <C>brew install gh</C> · Windows{' '}
            <C>winget install --id GitHub.cli</C> · Linux see{' '}
            <a className="underline" href="https://github.com/cli/cli/blob/trunk/docs/install_linux.md">cli docs</a>.
          </p>
          <Code>{`gh auth login   # follow the prompts, HTTPS + browser auth`}</Code>
        </Block>
        <Block label="(b) Claude Code prompt">
          <Quote>
            Check whether the GitHub CLI (<C>gh</C>) is installed and that
            I&rsquo;m authenticated by running <C>gh --version</C> and{' '}
            <C>gh auth status</C>. If <C>gh</C> is missing, give me the
            install command for{' '}
            <strong>[macOS / Windows / Linux]</strong> and then walk me
            through <C>gh auth login</C> step by step.
          </Quote>
        </Block>
      </Step>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-(--color-edge-soft) bg-(--color-surface)/50 p-6 md:p-8">
      <h2 className="mb-4 flex items-baseline gap-3 text-xl font-semibold text-(--color-accent)">
        <span className="font-mono text-base text-(--color-ink-muted)">
          {String(n).padStart(2, '0')}
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-(--color-ink)">{label}</p>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-(--color-edge-soft) bg-(--color-canvas) p-3 font-mono text-sm leading-relaxed text-(--color-ink-soft)">
      <code>{children}</code>
    </pre>
  )
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-(--color-canvas) px-1.5 py-0.5 font-mono text-xs text-(--color-accent)">
      {children}
    </code>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-lg border-l-2 border-(--color-accent) bg-(--color-canvas)/60 px-4 py-3 text-(--color-ink-soft) italic">
      {children}
    </blockquote>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-(--color-accent)/30 bg-(--color-accent)/5 px-4 py-3 text-sm text-(--color-ink-soft)">
      💡 {children}
    </div>
  )
}
