// Luly Schaab — Product Designer.
// "Starry night → daytime" card: a deep blue / violet / black night sky with a
// glowing moon and twinkling amber stars. On hover, a day-sky gradient fades
// in, the stars dim, and the moon warms into a rayed sun (all via GSAP).

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Star field — position (% of card) and size (px) for each twinkle.
const STARS = [
  { top: 12, left: 10, s: 2 },
  { top: 22, left: 30, s: 3 },
  { top: 8, left: 52, s: 2 },
  { top: 30, left: 67, s: 2 },
  { top: 16, left: 84, s: 3 },
  { top: 44, left: 18, s: 2 },
  { top: 50, left: 44, s: 2 },
  { top: 38, left: 90, s: 2 },
  { top: 62, left: 26, s: 3 },
  { top: 70, left: 58, s: 2 },
  { top: 76, left: 12, s: 2 },
  { top: 56, left: 80, s: 2 },
]

export default function LulySchaabCard() {
  const container = useRef<HTMLElement>(null)
  const tl = useRef<ReturnType<typeof gsap.timeline> | null>(null)

  useGSAP(
    () => {
      // lock the resting state to NIGHT so the day layer never leaks through
      // before a hover (GSAP owns these props, so set them explicitly).
      gsap.set('.day-layer', { opacity: 0 })
      gsap.set('.moon-icon', { opacity: 1, scale: 1 })
      gsap.set('.sun-icon', { opacity: 0, scale: 0.6, rotate: 0 })

      // idle: stars softly twinkle (opacity + scale), forever, out of sync.
      gsap.to('.star', {
        opacity: 0.3,
        scale: 0.55,
        duration: 1.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.12, from: 'random' },
      })

      // entrance: type the name out letter by letter, then blink a caret.
      gsap.set(['.char', '.caret'], { opacity: 0 })
      gsap
        .timeline({ delay: 0.2 })
        .to('.char', { opacity: 1, duration: 0.04, ease: 'none', stagger: 0.08 })
        .to('.caret', { opacity: 1, duration: 0.1 })
        .to('.caret', {
          opacity: 0,
          duration: 0.5,
          ease: 'steps(1)',
          repeat: -1,
          yoyo: true,
        })

      // hover: night → day. Paused timeline, played/reversed on enter/leave.
      tl.current = gsap
        .timeline({ paused: true, defaults: { duration: 0.7, ease: 'power2.out' } })
        .to('.day-layer', { opacity: 1 }, 0)
        .to('.stars-group', { opacity: 0, duration: 0.4 }, 0)
        .to('.moon-icon', { opacity: 0, scale: 0.5, duration: 0.45 }, 0)
        .to('.sun-icon', { opacity: 1, scale: 1, rotate: 45, duration: 0.9 }, 0)
        .to('.sky-ink', { color: '#241803' }, 0)
    },
    { scope: container },
  )

  return (
    <article
      ref={container}
      onMouseEnter={() => tl.current?.play()}
      onMouseLeave={() => tl.current?.reverse()}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 md:p-9"
      style={{ background: 'linear-gradient(150deg, #0b1026 0%, #241a52 48%, #060512 100%)' }}
    >
      {/* day-sky layer — revealed on hover */}
      <div
        aria-hidden
        className="day-layer absolute inset-0 opacity-0"
        style={{ background: 'linear-gradient(150deg, #7ec8f0 0%, #bfe3ff 45%, #ffe6a8 100%)' }}
      />

      {/* depth vignette so neither sky reads flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/35"
      />

      {/* twinkling stars — 4-point sparkles, scaled up to read as stars */}
      <div aria-hidden className="stars-group absolute inset-0">
        {STARS.map((st, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className="star absolute"
            style={{
              top: `${st.top}%`,
              left: `${st.left}%`,
              width: st.s * 5,
              height: st.s * 5,
              filter: 'drop-shadow(0 0 4px rgba(255,233,168,0.9))',
            }}
          >
            <path
              d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"
              fill="#ffe9a8"
            />
          </svg>
        ))}
      </div>

      {/* celestial body — crescent moon at night, rayed sun at day */}
      <div aria-hidden className="absolute top-6 right-7 size-16 md:size-20">
        {/* MOON (night) — full moon: radial gradient for volume + soft craters */}
        <svg
          viewBox="0 0 100 100"
          className="moon-icon absolute inset-0"
          style={{ filter: 'drop-shadow(0 0 14px rgba(207,217,239,0.65))' }}
        >
          <defs>
            <radialGradient id="luly-moon-g" cx="40%" cy="36%" r="72%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="68%" stopColor="#e7ecff" />
              <stop offset="100%" stopColor="#c6cff0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="36" fill="url(#luly-moon-g)" />
          <circle cx="42" cy="40" r="6" fill="#0b1026" opacity="0.07" />
          <circle cx="61" cy="58" r="9" fill="#0b1026" opacity="0.06" />
          <circle cx="56" cy="34" r="4" fill="#0b1026" opacity="0.06" />
        </svg>

        {/* SUN (day) — disc + radiating rays, hidden until hover */}
        <div
          className="sun-icon absolute inset-0"
          style={{ filter: 'drop-shadow(0 0 18px rgba(255,216,77,0.7))' }}
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <line
                key={i}
                x1="50"
                y1="3"
                x2="50"
                y2="15"
                transform={`rotate(${i * 30} 50 50)`}
                stroke="#ffd84d"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </svg>
          <span className="absolute inset-[28%] rounded-full bg-[#ffd84d]" />
        </div>
      </div>

      {/* content — eyebrow up top, name + phrase anchored at the bottom */}
      <div className="sky-ink relative flex h-full flex-col justify-between text-(--color-theme-navy-ink)">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] opacity-80">
          <span aria-hidden className="size-1 rounded-full bg-[#ffd84d]" />
          Product Designer · MMXXVI
        </span>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-4xl leading-[0.92] tracking-tight md:text-6xl">
            <span className="block">
              {[...'Luly'].map((ch, i) => (
                <span key={i} className="char">
                  {ch}
                </span>
              ))}
            </span>
            <span className="block">
              {[...'Schaab'].map((ch, i) => (
                <span key={i} className="char">
                  {ch}
                </span>
              ))}
              <span className="caret ml-1 inline-block h-[0.78em] w-[0.09em] rounded-full bg-[#ffd84d] align-baseline" />
            </span>
          </h2>
          <p className="max-w-[26ch] text-sm leading-relaxed opacity-85">
            Me gusta el diseño, el motion y toy crazy. ✨
          </p>
        </div>
      </div>
    </article>
  )
}
