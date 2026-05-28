import { useState } from 'react'
import { CardGallery } from '../../../components/CardGallery'

const PROMPT = `You are helping me add my personal Team Card to the alt-training-plus repo.
Stack: Vite + React 19 + TypeScript + Tailwind CSS v4 + GSAP. The gallery
auto-discovers every file in \`src/cards/*.tsx\` via
\`import.meta.glob\`, so adding a file is enough — there is no index to update.

GOAL
Create ONE new file at \`src/cards/<my-slug>.tsx\` with a single default-
exported React component that renders ONLY my card. Once saved, the card
appears automatically at \`/gallery/warm-up\`.

HARD RULES (do not violate — these prevent merge conflicts and broken builds)
1. CREATE exactly one new file. Path must match
   \`src/cards/<slug>.tsx\` where <slug> is kebab-case (lowercase letters,
   digits, hyphens). Example: \`juan-vilaplana.tsx\`.
2. DO NOT modify any other file. Specifically: do not touch
   \`src/cards/_template.tsx\`, \`src/components/CardGallery.tsx\`,
   \`src/pages/**\`, \`src/App.tsx\`, \`src/index.css\`, \`README.md\`,
   \`package.json\`, or \`index.html\`.
3. The component must \`export default\` a function whose JSX returns a
   single root \`<article>\` element with all card content inside.
4. Use Tailwind utilities for layout. For colors, prefer the theme tokens
   already in the project:
     bg-(--color-theme-teal)    text-(--color-theme-teal-ink)
     bg-(--color-theme-navy)    text-(--color-theme-navy-ink)
     bg-(--color-theme-amber)   text-(--color-theme-amber-ink)
     bg-(--color-theme-peach)   text-(--color-theme-peach-ink)
   Custom hex values are OK if a token doesn't fit, but stay restrained.
5. If you use GSAP, import \`{ gsap }\` from \`gsap\` and the \`useGSAP\`
   hook from \`@gsap/react\` (both already installed). Do NOT use
   \`useEffect\` for animations.
6. Do not import from another file in \`src/cards/\` — each card must be
   self-contained.
7. Keep the file under ~120 lines so it's easy to review.
8. Make sure \`npm run build\` would still pass (valid TSX, no missing
   imports, no broken JSX, all props typed).

CREATIVE FREEDOM
The rules above are about scope and build safety, NOT about look and feel.
Inside the \`<article>\`, go wild:
- Any colors (theme tokens, custom hex, gradients, animated gradients).
- Any layout (grid, absolute layers, masks, blur, mix-blend-mode).
- Any fonts already loaded in the project (Avenir Next default, Antonio,
  Bebas Neue) or any system font.
- Any GSAP animation — entrance, hover, idle, scroll-driven.
- Inline SVG, emojis, patterns, glitch effects, lighting, depth — anything
  that makes the card feel uniquely yours.
- Static images are OK too: drop the file into \`public/\` (e.g.
  \`public/my-photo.jpg\`) and reference it as \`/my-photo.jpg\` in an
  \`<img>\`. (Adding to \`public/\` is allowed; modifying existing files
  there is not.)

MY DETAILS — replace the brackets before sending
- File name:          src/cards/[my-slug].tsx
- Component name:     [MyNameCard]     (PascalCase, ends with "Card")
- Display name:       [NAME]
- Role:               [ROLE]
- Skill / phrase:     [SKILL]
- Vibe / mood:        [e.g. "dark and minimal, like a luxury brand"]
- Hover or idle motion (optional): [e.g. "card tilts in 3D as the cursor moves"]
- Extra creative detail (optional): [e.g. "a slow animated gradient behind everything"]

OUTPUT
Write the file and stop. Don't touch anything else. After you finish, tell
me the path you created and remind me to run \`npm run dev\` and open
\`/gallery/warm-up\` to verify.`

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
