// Abstract geometric composition used as the gallery cover hero.
// 100% divs + Tailwind — no SVG, no images.

export function Cover() {
  return (
    <div className="relative h-56 overflow-hidden rounded-3xl bg-(--color-surface-elev) md:h-72">
      {/* big soft teal halo */}
      <span
        aria-hidden
        className="absolute -top-20 left-1/4 size-72 rounded-full bg-(--color-accent)/15 blur-3xl"
      />
      {/* large dark navy rounded rectangle, rotated */}
      <span
        aria-hidden
        className="absolute top-10 left-1/2 h-24 w-40 -translate-x-1/2 rotate-[-8deg] rounded-xl bg-(--color-theme-navy)"
      />
      {/* peach circle, slightly offset */}
      <span
        aria-hidden
        className="absolute top-8 left-[58%] size-12 rounded-full bg-(--color-theme-peach)"
      />
      {/* amber square */}
      <span
        aria-hidden
        className="absolute top-24 left-[44%] size-9 rotate-12 rounded-md bg-(--color-theme-amber-ink)"
      />
      {/* small bright accent dot */}
      <span
        aria-hidden
        className="absolute top-32 left-[52%] size-3 rounded-full bg-(--color-accent) shadow-[0_0_18px_rgba(0,229,204,0.7)]"
      />
      {/* thin teal line, like a flag pole */}
      <span
        aria-hidden
        className="absolute top-6 left-[40%] h-32 w-[3px] rotate-[-8deg] rounded-full bg-(--color-accent)"
      />
      {/* small teal-bg card peek bottom-right */}
      <span
        aria-hidden
        className="absolute right-10 bottom-6 h-12 w-20 rotate-6 rounded-md bg-(--color-theme-teal)"
      />
    </div>
  )
}
