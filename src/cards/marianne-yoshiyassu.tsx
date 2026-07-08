// Marianne Yoshiyassu — Design Director.
// Sailor-Moon-flavored trading card: a blue→purple night sky with drifting
// sparkles, a pastel crystal-lotus medallion (public/crystal-flower.png),
// dark-pink corset laces threading the left corner, and a gold vintage frame.
// GSAP drives a subtle staggered entrance, a slow shimmer on the gold, a gentle
// twinkle on the sparkles, and a soft breathing glow on the lotus.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// light-pink gradient clipped to the glyphs
const nameFont = {
  fontFamily: '"Fleur De Leah", cursive',
  backgroundImage: 'linear-gradient(160deg, #ffe3f1 0%, #ffb8dc 50%, #ff9ecb 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  filter: 'drop-shadow(0 1px 7px rgba(255,158,203,0.5))',
} as const

// bigger pink/purple 4-point sparkles that drift in the background
const FLOATERS = [
  { t: '20%', l: '30%', s: 13, c: '#ff9ecb' }, { t: '36%', l: '80%', s: 17, c: '#c9a0ff' },
  { t: '66%', l: '20%', s: 15, c: '#e08cff' }, { t: '56%', l: '64%', s: 11, c: '#ffb3e6' },
  { t: '82%', l: '82%', s: 13, c: '#b98cff' },
]

// tiny sparkles scattered across the sky
const SPARKLES = [
  { t: '12%', l: '20%', s: 3, o: 0.7 }, { t: '18%', l: '60%', s: 2, o: 0.5 },
  { t: '30%', l: '40%', s: 2, o: 0.6 }, { t: '24%', l: '86%', s: 3, o: 0.75 },
  { t: '46%', l: '14%', s: 2, o: 0.5 }, { t: '58%', l: '52%', s: 3, o: 0.65 },
  { t: '66%', l: '30%', s: 2, o: 0.5 }, { t: '74%', l: '74%', s: 2, o: 0.6 },
  { t: '84%', l: '46%', s: 3, o: 0.7 }, { t: '40%', l: '70%', s: 2, o: 0.45 },
  { t: '54%', l: '90%', s: 2, o: 0.6 }, { t: '90%', l: '18%', s: 2, o: 0.5 },
]

export default function MarianneYoshiyassuCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-reveal]', {
        y: 18, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1,
      })
      gsap.to('[data-shine]', {
        opacity: 0.4, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
      })
      // idle: sparkles twinkle at random
      gsap.to('[data-sparkle]', {
        opacity: 0.15, scale: 0.5, duration: 1.6, repeat: -1, yoyo: true,
        ease: 'sine.inOut', stagger: { each: 0.2, from: 'random' },
      })
      // the crystal lotus gently breathes its glow
      gsap.to('[data-flower]', {
        scale: 1.04, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut',
        transformOrigin: '50% 60%',
      })
      // floating sparkles drift up/down and twinkle
      gsap.to('[data-float]', {
        y: -16, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' },
      })
      gsap.to('[data-float]', {
        rotation: 25, opacity: 0.45, scale: 0.8, duration: 2.2, repeat: -1, yoyo: true,
        ease: 'sine.inOut', stagger: { each: 0.35, from: 'random' }, transformOrigin: '50% 50%',
      })
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 text-(--color-theme-navy-ink) md:p-9"
    >
      {/* 1. night sky — blue→purple with a pink moon-glow from the top */}
      <div aria-hidden className="absolute inset-0" style={{
        background:
          'radial-gradient(70% 55% at 78% 8%, rgba(255,150,205,0.28), transparent 60%),' +
          'radial-gradient(90% 80% at 12% 100%, rgba(120,90,220,0.35), transparent 62%),' +
          'linear-gradient(150deg, #1b2a72 0%, #34277a 48%, #5a3690 100%)',
      }} />

      {/* 2. sparkles — tiny white pinpoints + bigger drifting pink/purple stars */}
      {SPARKLES.map((s, i) => (
        <span key={i} data-sparkle aria-hidden className="absolute rounded-full bg-white" style={{
          top: s.t, left: s.l, width: s.s, height: s.s, opacity: s.o,
          boxShadow: '0 0 6px rgba(255,220,245,0.95)',
        }} />
      ))}
      {FLOATERS.map((f, i) => (
        <svg key={`f${i}`} data-float aria-hidden viewBox="0 0 24 24" className="absolute"
          style={{ top: f.t, left: f.l, width: f.s, height: f.s, filter: `drop-shadow(0 0 5px ${f.c})` }}>
          <path fill={f.c}
            d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" />
        </svg>
      ))}

      {/* 3. dark-pink corset laces threading the bottom-left corner */}
      <svg aria-hidden viewBox="0 0 120 200" preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-4 -left-4 h-[62%] w-24">
        <g stroke="#c81d68" strokeWidth="3.4" strokeLinecap="round" fill="none"
          style={{ filter: 'drop-shadow(0 0 3px rgba(200,29,104,0.6))' }}>
          <line x1="8" y1="10" x2="8" y2="190" opacity="0.35" />
          <line x1="52" y1="10" x2="52" y2="190" opacity="0.35" />
          <path d="M8 20 L52 44 M52 20 L8 44 M8 60 L52 84 M52 60 L8 84 M8 100 L52 124 M52 100 L8 124 M8 140 L52 164 M52 140 L8 164" />
        </g>
        {[20, 44, 60, 84, 100, 124, 140, 164].map((y, i) => (
          <circle key={i} cx={i % 2 ? 52 : 8} cy={y} r="2.4" fill="#ff9ecb" />
        ))}
      </svg>

      {/* 4. gold vintage frame (double rule) */}
      <div data-shine aria-hidden className="pointer-events-none absolute inset-2.5 rounded-xl"
        style={{ border: '1px solid rgba(230,196,120,0.6)', boxShadow: 'inset 0 0 22px rgba(230,196,120,0.10)' }} />
      <div aria-hidden className="pointer-events-none absolute inset-[15px] rounded-lg"
        style={{ border: '1px solid rgba(255,158,203,0.22)' }} />

      {/* crystal-lotus medallion (the attached artwork) */}
      <img
        data-reveal
        data-flower
        src="/crystal-flower.png"
        alt=""
        aria-hidden
        loading="lazy"
        className="absolute top-8 right-3 size-28 object-contain md:size-32"
        style={{ filter: 'drop-shadow(0 0 10px rgba(255,170,225,0.85))' }}
      />

      {/* 7. thin rule above the footer */}
      <span data-shine aria-hidden className="absolute right-8 bottom-14 left-8 h-px"
        style={{ background: 'rgba(255,158,203,0.4)' }} />

      {/* 8. content */}
      <div className="relative flex h-full flex-col justify-between">
        <span data-reveal className="flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.24em] opacity-80 md:text-[10px]">
          <span aria-hidden className="size-1 rounded-full" style={{ background: '#ff9ecb' }} />
          Design Director · 2026 · 07
        </span>

        <div className="flex flex-col gap-1 pb-5">
          {/* load the Fleur De Leah script face, scoped to this card */}
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Fleur+De+Leah&display=swap');`}</style>
          <h2 data-reveal style={nameFont} className="text-3xl leading-[1.05] md:text-5xl">
            Marianne
            <br />
            Yoshiyassu
          </h2>
          <p data-reveal className="max-w-[26ch] text-sm leading-relaxed opacity-85">
            In the name of the moon.
          </p>
        </div>
      </div>
    </article>
  )
}
