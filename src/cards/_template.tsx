// ┌──────────────────────────────────────────────────────────────────────┐
// │  COPY THIS FILE                                                       │
// │  1. Duplicate this file to `src/cards/<your-name>.tsx`                │
// │  2. Rename the component below                                        │
// │  3. Edit freely — gradients, GSAP, emojis, anything is fair game      │
// │  4. Save → your card auto-appears in the Warm-up Challenge gallery    │
// │                                                                       │
// │  Tailwind theme tokens you can use as backgrounds:                    │
// │    --color-theme-teal   / --color-theme-teal-ink                      │
// │    --color-theme-navy   / --color-theme-navy-ink                      │
// │    --color-theme-amber  / --color-theme-amber-ink                     │
// │    --color-theme-peach  / --color-theme-peach-ink                     │
// │                                                                       │
// │  Files starting with `_` are ignored by the card discovery.           │
// └──────────────────────────────────────────────────────────────────────┘

export default function YourNameCard() {
  return (
    <article className="relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-(--color-theme-navy) p-7 text-(--color-theme-navy-ink)">
      <span className="font-mono text-xs uppercase tracking-[0.16em] opacity-70">
        Your Role
      </span>
      <h2 className="text-2xl font-semibold leading-tight">Your Name</h2>
      <p className="text-base leading-relaxed opacity-90">
        Your skill, fact, or favorite phrase.
      </p>
    </article>
  )
}
