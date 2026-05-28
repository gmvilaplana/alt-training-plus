// Juan I. Vilaplana — Workshop Facilitator.
// Vintage trading card aesthetic: amber field, embossed inner border,
// portrait spot, condensed name typography, numbered footer mark.

export default function JuanVilaplanaCard() {
  return (
    <article className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--color-theme-amber) p-8 text-(--color-theme-amber-ink) md:p-9">
      {/* 1. depth — warm gradient so the amber isn't flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/[0.10] via-transparent to-black/35"
      />

      {/* 2. embossed inner border — the trading-card frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2.5 rounded-xl border border-(--color-theme-amber-ink)/15"
      />

      {/* 3. top-right card number */}
      <span
        aria-hidden
        className="absolute top-5 right-7 font-mono text-[10px] tracking-[0.3em] opacity-50"
      >
        N° 01 / MMXXVI
      </span>

      {/* 4. portrait spot (uses the facilitator avatar already in public/) */}
      <img
        src="/juan.png"
        alt=""
        aria-hidden
        className="absolute top-12 right-7 size-14 rounded-full border-2 border-(--color-theme-amber-ink)/30 object-cover shadow-md md:size-16"
        loading="lazy"
      />

      {/* 5. thin rule above the footer mark */}
      <span
        aria-hidden
        className="absolute right-7 bottom-12 left-7 h-px bg-(--color-theme-amber-ink)/25"
      />

      {/* 6. content stack — eyebrow up, name + supporting down */}
      <div className="relative flex h-full flex-col justify-between">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-70 md:text-xs">
          <span
            aria-hidden
            className="size-1 rounded-full bg-(--color-theme-amber-ink)"
          />
          Workshop · MMXXVI · Facilitator
        </span>

        <div className="flex flex-col gap-2 pb-4">
          <h2 className="text-3xl font-semibold tracking-tight leading-[0.92] md:text-5xl">
            Juan I.
            <br />
            Vilaplana
          </h2>
          <p className="max-w-[26ch] text-sm leading-relaxed opacity-80">
            Turning git fear into git muscle memory.
          </p>
        </div>
      </div>

      {/* 7. footer brand mark */}
      <span
        aria-hidden
        className="absolute right-7 bottom-5 font-mono text-[10px] tracking-[0.3em] opacity-60"
      >
        GM2 · ALT
      </span>
    </article>
  )
}
