import { useState } from 'react'
import { CardGallery } from '../../../components/CardGallery'

const PROMPT = `I'm working on the alt-training-plus repo (Vite + React + Tailwind v4 + GSAP).

Create a new Team Card component for me at \`src/cards/<my-slug>.tsx\`. Use
\`src/cards/_template.tsx\` as the base — copy it, rename the file, and
rename the component.

Here's what I want:

My name: [NAME]
My role: [ROLE]
Vibe / mood: [e.g. "dark and minimal, like a luxury brand"]
Color palette: [e.g. "near-black background, electric lime accent" — or
  one of the theme tokens: teal / navy / amber / peach]
Typography feeling: [e.g. "oversized serif name, tiny mono for the details"]
On hover: [e.g. "the card tilts in 3D as my cursor moves across it"]
One extra detail: [e.g. "a slow animated gradient behind everything"]

Use Tailwind for layout and styling. GSAP is already installed if you want
animations. Make it feel like a real portfolio piece, not a template. Keep
all content inside the \`<article>\` wrapper.`

export default function WarmUpChallenge() {
  return (
    <div className="flex flex-col gap-8">
      <p className="text-(--color-ink-soft) leading-relaxed">
        This is a hands-on challenge: use Claude Code to create a personal
        Team Card with whatever creative spin you want, added directly to
        the gallery below. <strong>Each card is its own file</strong> in{' '}
        <code className="rounded bg-(--color-canvas) px-1.5 py-0.5 font-mono text-xs text-(--color-accent)">
          src/cards/
        </code>{' '}
        — so two people working in parallel won&rsquo;t step on each
        other&rsquo;s changes.
      </p>

      <section className="rounded-2xl border border-(--color-edge-soft) bg-(--color-surface)/50 p-6 md:p-8">
        <h2 className="mb-4 text-xl font-semibold text-(--color-accent)">How it works</h2>
        <ol className="ml-5 flex list-decimal flex-col gap-2 text-(--color-ink-soft)">
          <li>Copy the prompt template below</li>
          <li>Fill in your personal details — name, role, and style preferences</li>
          <li>Paste the prompt into Claude Code and let it build your card</li>
          <li>
            Save and check the Card Gallery at the bottom — your card auto-appears
          </li>
        </ol>
      </section>

      <PromptBlock />

      <Tip>
        <strong>Tips for a great card.</strong> Don&rsquo;t be afraid to iterate
        — ask Claude to refine animations, colors, or layout until your card
        feels right. Run <C>npm run dev</C> and watch the Card Gallery
        update live. Describing a specific vibe (&quot;90s hacker terminal&quot;,
        &quot;museum placard&quot;, &quot;neon Tokyo streetwear&quot;) gives much
        more interesting results.
      </Tip>

      <section>
        <h2 className="mb-2 text-xl font-semibold text-(--color-ink)">Card Gallery</h2>
        <p className="mb-6 text-sm text-(--color-ink-muted)">
          Cards added by the team will appear here. Be the first to add yours!
        </p>
        <CardGallery />
      </section>
    </div>
  )
}

function PromptBlock() {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(PROMPT)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked; user can still select+copy manually
    }
  }

  return (
    <section className="rounded-2xl border border-(--color-edge-soft) bg-(--color-surface)/50 p-6 md:p-8">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold text-(--color-accent)">The Prompt</h2>
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-(--color-edge) bg-(--color-canvas) px-3 py-1.5 font-mono text-xs text-(--color-ink) transition-colors hover:border-(--color-accent) hover:text-(--color-accent)"
        >
          {copied ? '✓ Copied' : 'Copy Prompt'}
        </button>
      </div>
      <p className="mb-4 text-(--color-ink-soft) leading-relaxed">
        Copy this prompt, replace the bracketed placeholders with your own
        details, and paste it into Claude Code. Be as specific or creative
        as you want — the more personality you put in, the better your card
        will be.
      </p>
      <pre className="overflow-x-auto rounded-lg border border-(--color-edge-soft) bg-(--color-canvas) p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-(--color-ink-soft)">
        <code>{PROMPT}</code>
      </pre>
    </section>
  )
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-(--color-canvas) px-1.5 py-0.5 font-mono text-xs text-(--color-accent)">
      {children}
    </code>
  )
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-(--color-accent)/30 bg-(--color-accent)/5 p-5 text-(--color-ink-soft) leading-relaxed">
      {children}
    </div>
  )
}
