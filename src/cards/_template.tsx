// ┌──────────────────────────────────────────────────────────────────────┐
// │  COPY THIS FILE                                                       │
// │  1. Duplicate this file to `src/cards/<your-name>.tsx`                │
// │  2. Rename the component below (PascalCase, ends with "Card")         │
// │  3. Edit freely — start from the structure below, then make it yours  │
// │  4. Save → your card auto-appears in the Warm-up Challenge gallery    │
// │                                                                       │
// │  REQUIRED VISUAL INGREDIENTS (don't remove the structure)             │
// │   1. Aspect-ratio container (already set: aspect-[16/10])             │
// │   2. Background layer with depth (solid color + gradient overlay)     │
// │   3. Eyebrow line (small, uppercase, tracked)                         │
// │   4. Display name (large, dominant)                                   │
// │   5. Supporting line (subtle, one line)                               │
// │   6. Decorative element (the absolute span — change shape/color)      │
// │                                                                       │
// │  THEME TOKENS YOU CAN USE                                             │
// │    bg-(--color-theme-teal)    text-(--color-theme-teal-ink)           │
// │    bg-(--color-theme-navy)    text-(--color-theme-navy-ink)           │
// │    bg-(--color-theme-amber)   text-(--color-theme-amber-ink)          │
// │    bg-(--color-theme-peach)   text-(--color-theme-peach-ink)          │
// │    bg-(--color-accent)        — the bright teal accent                │
// │                                                                       │
// │  Files starting with `_` are ignored by the card discovery.           │
// └──────────────────────────────────────────────────────────────────────┘

export default function YourNameCard() {
  return (
    <article className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--color-theme-navy) p-8 text-(--color-theme-navy-ink) md:p-9">
      {/* 1. depth layer — gradient overlay so the bg isn't flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/30"
      />

      {/* 2. decorative element — change shape, color, position, or replace
          with an <img>, <svg>, or a different pattern. Just keep SOMETHING
          visual here so the card doesn't read as plain text on color. */}
      <span
        aria-hidden
        className="absolute -top-12 -right-10 size-44 rounded-full bg-(--color-accent)/30 blur-3xl"
      />
      <span
        aria-hidden
        className="absolute bottom-6 right-8 h-[3px] w-16 rounded-full bg-(--color-accent)/70"
      />

      {/* 3. content stack — eyebrow on top, name + supporting on bottom */}
      <div className="relative flex h-full flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] opacity-70">
          Your Role · MMXXVI
        </span>

        <div className="flex flex-col gap-2">
          <h2 className="text-3xl leading-[1.05] font-semibold tracking-tight md:text-4xl">
            Your Name
          </h2>
          <p className="max-w-[24ch] text-sm leading-relaxed opacity-80">
            Your skill, fact, or favorite phrase — one short line.
          </p>
        </div>
      </div>
    </article>
  )
}
