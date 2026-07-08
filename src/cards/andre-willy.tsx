// André Willy — Senior Product Designer.
// Deep-ocean card: a navy→black base with three parallax SVG wave layers that
// drift continuously and swell + glow on hover. Pure CSS (no hooks, no GSAP),
// all styles scoped under `.andre-card` so nothing leaks into the gallery.

// One wave, spanning the full 1440 width so two copies tile seamlessly for the
// infinite horizontal scroll. `currentColor` lets each layer set its own fill.
// Calm-sea shape: 4 wide, low swells (amplitude ~12 around the y=72 midline).
// The even segment count makes the start/end slope match, so the loop is
// seamless — keep both endpoints at y=72 if you reshape it.
const WAVE =
  'M0,72 Q180,60 360,72 T720,72 T1080,72 T1440,72 L1440,120 L0,120 Z'

// Breaking wave (provided as wave.svg): a wide 994×197 band with a curling
// crest, pale-mint fill. On hover it sweeps across the card left→right.
// See the `.andre-roll-wave` rules for the motion.
const WAVE_CREST =
  'M484.031 100.558C470.426 77.6448 471.858 38.2629 530.573 28.9545C389.865 -71.5738 280.995 115.526 0 196.804H993.941C891.876 161.287 804.288 106.414 621.213 135.581C519.81 151.737 497.635 123.471 484.031 100.558Z'

const STYLES = `
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
.andre-wave-1 { bottom: 16%; color: #0f3d4a; opacity: 0.5; animation: andre-drift 30s linear infinite; }
.andre-wave-2 { bottom: 7%;  color: #0e7e6f; opacity: 0.7; animation: andre-drift 23s linear infinite reverse; }
.andre-wave-3 { bottom: 0;   color: #12b3a1; opacity: 0.95; animation: andre-drift 17s linear infinite; }

.andre-glow { opacity: 0.35; transition: opacity 0.6s ease; }
.andre-card:hover .andre-glow { opacity: 0.85; }

/* the provided wave sweeps across left→right on hover */
.andre-roll-wave {
  fill: #b5fbf6;
  transform-origin: 50% 100%;
  transform: translateX(-110%) scale(0.6);
  opacity: 0;
  filter: drop-shadow(0 0 12px rgba(0, 229, 204, 0.45));
}
.andre-card:hover .andre-roll-wave { animation: andre-roll 2.6s linear; }
@keyframes andre-roll {
  0%   { transform: translateX(-110%) scale(0.6); opacity: 0; }
  15%  { opacity: 1; }
  50%  { transform: translateX(-25%)  scale(1);   opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(60%)   scale(0.6); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .andre-card:hover .andre-roll-wave { animation: none; }
}

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

      {/* 4. the provided wave sweeps across from the left on hover */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
        <svg viewBox="0 0 994 197" className="andre-roll-wave absolute -bottom-1.5 left-0 h-[63%] w-auto">
          <path d={WAVE_CREST} />
        </svg>
      </div>

      {/* 5. content stack — eyebrow up, name + supporting down */}
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
          <p className="text-sm leading-relaxed opacity-90">Average surfer 🌊</p>
        </div>
      </div>
    </article>
  )
}
