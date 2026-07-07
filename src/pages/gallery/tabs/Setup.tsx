import { ClaudeIcon } from '../../../components/ClaudeIcon'
import { CopyButton } from '../../../components/CopyButton'

const PROMPT_BREW = `Check whether Homebrew is installed on my Mac by running \`brew --version\`. If it's missing, install it with the official installer: \`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"\`. On Apple Silicon, also run the two "Next steps" PATH commands it prints at the end. When you're done, confirm \`brew --version\` works.`

const PROMPT_GH = `Install the GitHub CLI on my Mac with \`brew install gh\`, then confirm it worked by running \`gh --version\`.`

const PROMPT_LOGIN = `Log me in to GitHub from the terminal with \`gh auth login\`. Walk me through it choosing GitHub.com, HTTPS, and "Login with a web browser". When it's finished, run \`gh auth status\` to confirm I'm authenticated.`

const PROMPT_VERSIONS = `Check my Node.js, npm, and git versions by running \`node --version\`, \`npm --version\`, and \`git --version\`. I want Node 20 or higher. If Node/npm or git are missing (or Node is older than 20), install them with Homebrew (\`brew install node\` and \`brew install git\`). Then set my git identity with \`git config --global user.name\` and \`git config --global user.email\`.`

const PROMPT_VSCODE = `Install Visual Studio Code on my Mac with \`brew install --cask visual-studio-code\`, then confirm it worked by running \`code --version\`.`

const PROMPT_CLONE = `Clone the repo \`https://github.com/gmvilaplana/alt-training-plus.git\` into my current directory, \`cd\` into it, run \`npm install\`, and then start the dev server with \`npm run dev\`. Once it's running, tell me the local URL it's serving on so I can open it in the browser.`

export default function Setup() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-(--color-ink-soft) leading-relaxed">
        Work through these seven steps <strong>in order</strong> before the
        workshop starts. Each one gives you two options: <strong>(a)</strong> a
        terminal command if you&rsquo;re comfortable with the CLI, or{' '}
        <strong>(b)</strong> a prompt you can paste straight into the{' '}
        <strong>Claude Code app</strong> and let it do the work.
      </p>

      <Tip>
        You already have the <strong>Claude Code app</strong> installed, so the
        (b) prompts work from step&nbsp;1 — <strong>step 6</strong> just adds
        Claude Code to VS Code as an extension. Everything here targets macOS;
        not on a Mac? Ping the facilitator on Slack.
      </Tip>

      <Step n={1} title="Install Homebrew">
        <p className="text-(--color-ink-soft) leading-relaxed">
          Homebrew is the package manager we&rsquo;ll use to install everything
          else.
        </p>
        <Block label="(a) Terminal">
          <Code>{`brew --version   # prints a version if already installed`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            If it&rsquo;s missing, install it, then restart Terminal:
          </p>
          <Code>{`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            On Apple Silicon, run the two <strong>Next steps</strong> PATH
            commands the installer prints at the end.
          </p>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_BREW}>
            Check whether Homebrew is installed on my Mac by running{' '}
            <C>brew --version</C>. If it&rsquo;s missing, install it with the
            official installer. On Apple Silicon, also run the two{' '}
            <strong>Next steps</strong> PATH commands it prints. When
            you&rsquo;re done, confirm <C>brew --version</C> works.
          </Quote>
        </Block>
      </Step>

      <Step n={2} title="Install the GitHub CLI (gh)">
        <p className="text-(--color-ink-soft) leading-relaxed">
          <C>gh</C> lets you log in to GitHub and open pull requests without
          leaving the terminal.
        </p>
        <Block label="(a) Terminal">
          <Code>{`brew install gh
gh --version`}</Code>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_GH}>
            Install the GitHub CLI on my Mac with <C>brew install gh</C>, then
            confirm it worked by running <C>gh --version</C>.
          </Quote>
        </Block>
      </Step>

      <Step n={3} title="Log in to GitHub">
        <p className="text-(--color-ink-soft) leading-relaxed">
          Authenticate <C>gh</C> with your account. Pick{' '}
          <strong>GitHub.com → HTTPS → Login with a web browser</strong> and
          follow the prompts.
        </p>
        <Block label="(a) Terminal">
          <Code>{`gh auth login
gh auth status   # should show you as logged in`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            You&rsquo;ll also need access to{' '}
            <C>gmvilaplana/alt-training-plus</C> — ping the facilitator on
            Slack if you can&rsquo;t see the repo.
          </p>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_LOGIN}>
            Log me in to GitHub from the terminal with <C>gh auth login</C>.
            Walk me through it choosing GitHub.com, HTTPS, and &ldquo;Login
            with a web browser&rdquo;. When it&rsquo;s finished, run{' '}
            <C>gh auth status</C> to confirm I&rsquo;m authenticated.
          </Quote>
        </Block>
      </Step>

      <Step n={4} title="Check your npm and git versions">
        <p className="text-(--color-ink-soft) leading-relaxed">
          Confirm Node.js/<C>npm</C> and <C>git</C> are present and current.
        </p>
        <Block label="(a) Terminal">
          <Code>{`node --version   # want v20.x.x or higher
npm --version
git --version`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            Missing or too old? Install with Homebrew, then set your identity:
          </p>
          <Code>{`brew install node   # Node.js 20+ and npm
brew install git
git config --global user.name "Your Name"
git config --global user.email "you@telus.com"`}</Code>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_VERSIONS}>
            Check my Node.js, <C>npm</C>, and <C>git</C> versions. I want Node
            20 or higher. If Node/npm or git are missing (or Node is too old),
            install them with Homebrew. Then set my git identity with{' '}
            <C>git config --global user.name</C> and <C>user.email</C>.
          </Quote>
        </Block>
      </Step>

      <Step n={5} title="Install VS Code">
        <p className="text-(--color-ink-soft) leading-relaxed">
          Visual Studio Code is the editor we&rsquo;ll run Claude Code inside.
        </p>
        <Block label="(a) Terminal">
          <Code>{`brew install --cask visual-studio-code
code --version`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            Prefer clicking? Download it from{' '}
            <a className="underline" href="https://code.visualstudio.com">code.visualstudio.com</a>{' '}
            instead.
          </p>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_VSCODE}>
            Install Visual Studio Code on my Mac with{' '}
            <C>brew install --cask visual-studio-code</C>, then confirm it
            worked by running <C>code --version</C>.
          </Quote>
        </Block>
      </Step>

      <Step n={6} title="Add Claude Code to VS Code">
        <p className="text-(--color-ink-soft) leading-relaxed">
          You already have the Claude Code app — this step connects it to VS
          Code as an extension so you can run it right inside the editor.
        </p>
        <Block label="Install">
          <ol className="ml-5 flex list-decimal flex-col gap-1.5 text-(--color-ink-soft)">
            <li>
              Open VS Code → Extensions sidebar (<C>Cmd + Shift + X</C>).
            </li>
            <li>
              Search <strong>&ldquo;Claude Code&rdquo;</strong> → click{' '}
              <strong>Install</strong>.
            </li>
            <li>
              Open the Claude Code panel and <strong>sign in</strong> when
              prompted.
            </li>
          </ol>
        </Block>
        <Block label="Optional terminal check">
          <Code>{`code --list-extensions | grep -i claude`}</Code>
        </Block>
      </Step>

      <Step n={7} title="Clone and run the site locally">
        <p className="text-(--color-ink-soft) leading-relaxed">
          Last step. Clone the repo, install dependencies, and start the dev
          server. After this you&rsquo;re ready for the{' '}
          <strong>Your First PR</strong> tab.
        </p>
        <Block label="(a) Terminal">
          <Code>{`git clone https://github.com/gmvilaplana/alt-training-plus.git
cd alt-training-plus
npm install
npm run dev`}</Code>
          <p className="text-sm text-(--color-ink-muted)">
            The dev server prints a URL like <C>http://localhost:5173</C> —
            open it in your browser to see the site running locally.
          </p>
        </Block>
        <Block label="(b) Claude Code prompt" withClaudeIcon>
          <Quote copyText={PROMPT_CLONE}>
            Clone the repo{' '}
            <C>https://github.com/gmvilaplana/alt-training-plus.git</C>{' '}
            into my current directory, <C>cd</C> into it, run{' '}
            <C>npm install</C>, and then start the dev server with{' '}
            <C>npm run dev</C>. Once it&rsquo;s running, tell me the local
            URL it&rsquo;s serving on so I can open it in the browser.
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

function Block({
  label,
  withClaudeIcon = false,
  children,
}: {
  label: string
  withClaudeIcon?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="flex items-center gap-1.5 text-sm font-semibold text-(--color-ink)">
        <span>{label}</span>
        {withClaudeIcon ? (
          <ClaudeIcon className="size-3.5 text-[#d97757]" title="Claude Code" />
        ) : null}
      </p>
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

function Quote({
  children,
  copyText,
}: {
  children: React.ReactNode
  copyText?: string
}) {
  return (
    <blockquote className="relative rounded-lg border-l-2 border-(--color-accent) bg-(--color-canvas)/60 px-4 py-3 text-(--color-ink-soft) italic">
      {copyText ? (
        <CopyButton
          text={copyText}
          className="absolute top-2 right-2"
          label="Copy prompt"
        />
      ) : null}
      <div className={copyText ? 'pr-10' : undefined}>{children}</div>
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
