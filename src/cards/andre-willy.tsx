// André Willy — Senior Product Designer.
// Deep-ocean card: a navy→black base with three parallax SVG wave layers that
// drift continuously and swell + glow on hover. Pure CSS (no hooks, no GSAP),
// all styles scoped under `.andre-card` so nothing leaks into the gallery.

// One wave, two full periods wide so two copies tile seamlessly for the
// infinite horizontal scroll. `currentColor` lets each layer set its own fill.
const WAVE =
  'M0,60 Q120,20 240,60 T480,60 T720,60 T960,60 T1200,60 T1440,60 L1440,120 L0,120 Z'

const STYLES = `
.andre-waves { transition: transform 0.6s ease; }
.andre-card:hover .andre-waves { transform: translateY(-8%); }

.andre-wave {
  position: absolute;
  left: 0;
  display: flex;
  width: 200%;
  height: 55%;
  will-change: transform;
}
.andre-wave svg { width: 50%; height: 100%; display: block; }
.andre-wave svg path { fill: currentColor; }

/* back → front: darker/slower/higher to brighter/faster/lower for depth */
.andre-wave-1 { bottom: 16%; color: #0f3d4a; opacity: 0.5; animation: andre-drift 15s linear infinite; }
.andre-wave-2 { bottom: 7%;  color: #0e7e6f; opacity: 0.7; animation: andre-drift 11s linear infinite reverse; }
.andre-wave-3 { bottom: 0;   color: #12b3a1; opacity: 0.95; animation: andre-drift 8s linear infinite; }

.andre-card:hover .andre-wave-1 { animation-duration: 10s; }
.andre-card:hover .andre-wave-2 { animation-duration: 7s; }
.andre-card:hover .andre-wave-3 { animation-duration: 5s; }

.andre-glow { opacity: 0.35; transition: opacity 0.6s ease; }
.andre-card:hover .andre-glow { opacity: 0.85; }

@keyframes andre-drift {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .andre-wave { animation: none !important; }
}
`

export default function AndreWillyCard() {
  return (
    <article className="andre-card relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--color-theme-navy) p-8 text-(--color-theme-navy-ink) md:p-9">
      <style>{STYLES}</style>

      {/* 1. deep-water base — darken the token navy toward near-black at the floor */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,#22365c_0%,#0c1a30_55%,#050d18_100%)]"
      />

      {/* 2. cyan glow that blooms behind the name on hover */}
      <div
        aria-hidden
        className="andre-glow absolute -left-10 top-1/3 size-56 rounded-full bg-(--color-accent)/40 blur-3xl"
      />

      {/* 3. parallax wave stack pinned to the bottom */}
      <div aria-hidden className="andre-waves pointer-events-none absolute inset-0">
        {[1, 2, 3].map((n) => (
          <div key={n} className={`andre-wave andre-wave-${n}`}>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d={WAVE} />
            </svg>
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
              <path d={WAVE} />
            </svg>
          </div>
        ))}
      </div>

      {/* 4. content stack — eyebrow up, name + supporting down */}
      <div className="relative flex h-full flex-col justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">
          Senior Product Designer
        </span>

        <div className="flex flex-col gap-1.5">
          <h2
            className="font-display text-5xl leading-[0.9] font-semibold tracking-tight text-(--color-ink) md:text-6xl"
            style={{ textShadow: '0 0 22px rgba(0, 229, 204, 0.45)' }}
          >
            André Willy
          </h2>
          <p className="text-sm leading-relaxed opacity-80">Average surfer 🌊</p>
        </div>
      </div>
    </article>
  )
}
