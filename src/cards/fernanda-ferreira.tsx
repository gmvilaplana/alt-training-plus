// Fernanda Ferreira — Design Intern.
// An Impressionist "Water Lilies" card (after Monet): a bright pastel pond with
// irregular rippling water, detailed floating lily pads and a bloom resting on
// one, the name in cursive script. GSAP paints the scene in and keeps the water
// breathing — and on hover a little school of fish darts beneath the surface.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Detailed lily pad: a disc with the classic wedge notch + radial veins.
const PAD_PATH = 'M50 50 L94 62 A46 46 0 1 1 94 38 Z'
const VEINS = [60, 100, 140, 180, 220, 260, 300].map((deg) => {
  const r = (deg * Math.PI) / 180
  return { x: 50 + 43 * Math.cos(r), y: 50 + 43 * Math.sin(r) }
})
const PADS = [
  { top: 22, left: 70, size: 90, rot: 130, c: '#8ecb9f', d: '#4f8f6b' }, // holds the bloom
  { top: 57, left: 3, size: 82, rot: 20, c: '#7cbf94', d: '#478060' },
  { top: 71, left: 60, size: 60, rot: 250, c: '#9ad4a8', d: '#569171' },
]
const STROKES = [
  { top: 16, left: 12, w: 120, h: 26, c: '#f7c8dd', r: -16 },
  { top: 46, left: 58, w: 140, h: 22, c: '#cdbff0', r: 10 },
  { top: 86, left: 16, w: 120, h: 22, c: '#c4dcf3', r: -12 },
]
const WAVE = 'M-40 0 Q -10 -7 20 0 T 80 0 T 140 0 T 200 0 T 260 0 T 320 0 T 380 0 T 440 0'
// A little school — each fish gets its own color, lane, size and pace.
// (No pink — that would read as the flower coming loose.) They swim on a
// continuous loop: dur = time to cross, gap = pause off-screen before re-entry,
// delay = initial offset so they spread out across the pond.
const FISH = [
  { c: '#f4a259', top: 60, w: 50, dur: 3.4, gap: 1.2, delay: 0 },
  { c: '#e05a49', top: 42, w: 42, dur: 4.0, gap: 2.0, delay: 0.6 },
  { c: '#f2c744', top: 74, w: 38, dur: 3.7, gap: 1.6, delay: 1.1 },
  { c: '#3f8fd6', top: 33, w: 34, dur: 4.4, gap: 2.4, delay: 1.8 },
  { c: '#8f7bd0', top: 82, w: 46, dur: 3.1, gap: 1.0, delay: 0.4 },
]

export default function FernandaFerreiraCard() {
  const container = useRef<HTMLElement>(null)
  const cursive = "'Snell Roundhand','Apple Chancery','Segoe Script','Brush Script MT',cursive"

  useGSAP(
    () => {
      gsap.from('.paint-in', { opacity: 0, scale: 0.86, duration: 1.1, ease: 'power2.out', stagger: { each: 0.09, from: 'random' } })
      gsap.from('.script-name', { opacity: 0, y: 16, duration: 1, delay: 0.5, ease: 'power3.out' })
      gsap.to('.drift', { y: '+=9', x: '+=6', duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: 0.7, from: 'random' } })
      gsap.to('.wave', { x: '+=24', duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.6 })
      gsap.to('.caustic', { x: '+=16', y: '+=10', duration: 11, ease: 'sine.inOut', repeat: -1, yoyo: true })
      // NOTE: the flower is grouped INTO its pad's wrapper (below), so it drifts
      // together with the pad via the shared `.drift` tween above.

      // fish are hidden and parked off-screen until the pointer enters the card.
      gsap.set('.fish', { opacity: 0, left: '-22%', y: 0 })
    },
    { scope: container },
  )

  // The school appears ONLY on hover: on mouse-enter we spawn each fish's
  // looping swim (created here, not in useGSAP, so it reliably plays); on
  // mouse-leave we fade them out and kill the loops.
  const showFish = () => {
    const el = container.current
    if (!el) return
    gsap.to(el.querySelectorAll('.fish'), { opacity: 0.95, duration: 0.3, overwrite: 'auto' })
    FISH.forEach((f, i) => {
      const fish = el.querySelectorAll(`.fish-${i}`)
      gsap.set(fish, { left: '-22%', y: 0 })
      gsap.to(fish, { left: '122%', duration: f.dur, ease: 'none', repeat: -1, repeatDelay: f.gap, delay: f.delay, overwrite: 'auto' })
      gsap.to(fish, { y: '+=11', duration: 0.7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: f.delay })
      gsap.to(el.querySelectorAll(`.fish-${i} .tail`), { rotation: 20, transformOrigin: 'left center', duration: 0.15, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    })
  }
  const hideFish = () => {
    const el = container.current
    if (!el) return
    const fish = el.querySelectorAll('.fish')
    const tails = el.querySelectorAll('.fish .tail')
    gsap.to(fish, {
      opacity: 0,
      duration: 0.3,
      overwrite: 'auto',
      onComplete: () => {
        fish.forEach((n) => gsap.killTweensOf(n))
        tails.forEach((n) => gsap.killTweensOf(n))
        gsap.set(fish, { left: '-22%', y: 0 })
      },
    })
  }

  return (
    <article
      ref={container}
      onMouseEnter={showFish}
      onMouseLeave={hideFish}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 md:p-9"
      style={{
        background:
          'radial-gradient(120% 95% at 18% 12%, #d7ecf3 0%, transparent 55%),' +
          'radial-gradient(115% 100% at 88% 92%, #cbbcee 0%, transparent 60%),' +
          'linear-gradient(158deg, #c3e8dd 0%, #a7d3d9 46%, #9cc0e4 100%)',
      }}
    >
      {/* irregular pond mottling — turbulence caustics drifting over the water */}
      <svg aria-hidden className="caustic pointer-events-none absolute inset-0 h-full w-full mix-blend-soft-light" style={{ opacity: 0.4 }}>
        <filter id="ff-caustic"><feTurbulence type="fractalNoise" baseFrequency="0.018 0.045" numOctaves="3" seed="11" stitchTiles="stitch" /><feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.93  0 0 0 0 0.99  0 0 0 0.6 0" /></filter>
        <rect x="-10%" y="-10%" width="120%" height="120%" filter="url(#ff-caustic)" />
      </svg>

      {/* irregular ripple lines — gentle waves displaced by noise for a real-pond surface */}
      <svg aria-hidden viewBox="0 0 400 250" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full">
        <filter id="ff-ripple"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves="2" seed="4" result="n" /><feDisplacementMap in="SourceGraphic" in2="n" scale="24" xChannelSelector="R" yChannelSelector="G" /></filter>
        <g filter="url(#ff-ripple)">
          {[24, 60, 96, 132, 168, 204, 236].map((y, i) => (
            <path key={i} className="wave" d={WAVE} transform={`translate(0 ${y})`} fill="none" stroke={i % 2 ? 'rgba(255,255,255,0.3)' : 'rgba(110,140,175,0.24)'} strokeWidth="1.4" />
          ))}
        </g>
      </svg>

      {/* reflection dabs */}
      {STROKES.map((s, i) => (
        <span key={i} aria-hidden className="paint-in drift absolute rounded-full blur-lg" style={{ top: `${s.top}%`, left: `${s.left}%`, width: s.w, height: s.h, background: s.c, transform: `rotate(${s.r}deg)`, opacity: 0.55 }} />
      ))}

      {/* fish — above the water texture but BEFORE the pads, so they are clearly
          visible on the surface yet still slip UNDER each lily pad */}
      {FISH.map((f, i) => (
        <svg key={i} aria-hidden viewBox="-12 0 74 30" className={`fish fish-${i} pointer-events-none absolute`} style={{ top: `${f.top}%`, width: f.w, height: f.w * 0.42, filter: 'drop-shadow(0 2px 3px rgba(30,50,80,0.35))' }}>
          <g className="tail"><path d="M8 15 L-6 4 L-1 15 L-6 26 Z" fill={f.c} /></g>
          <ellipse cx="30" cy="15" rx="22" ry="10" fill={f.c} />
          <path d="M30 5 Q40 8 44 15 Q40 22 30 25 Z" fill="rgba(0,0,0,0.15)" />
          <circle cx="46" cy="12" r="2" fill="#1a2440" />
        </svg>
      ))}

      {/* detailed lily pads (index 0 holds the bloom and is grouped below) */}
      {PADS.map((p, i) =>
        i === 0 ? null : (
          <svg key={i} aria-hidden viewBox="0 0 100 100" className="paint-in drift absolute" style={{ top: `${p.top}%`, left: `${p.left}%`, width: p.size, height: p.size, transform: `rotate(${p.rot}deg)`, filter: 'drop-shadow(0 4px 7px rgba(31,74,62,0.28))' }}>
            <defs>
              <radialGradient id={`pad${i}`} cx="42%" cy="38%" r="65%"><stop offset="0%" stopColor={p.c} /><stop offset="100%" stopColor={p.d} /></radialGradient>
            </defs>
            <path d={PAD_PATH} fill={`url(#pad${i})`} />
            <path d={PAD_PATH} fill="none" stroke="#e8f6ec" strokeOpacity="0.35" strokeWidth="1.5" />
            {VEINS.map((v, j) => <line key={j} x1="50" y1="50" x2={v.x} y2={v.y} stroke={p.d} strokeOpacity="0.55" strokeWidth="1.2" />)}
          </svg>
        ),
      )}

      {/* flower pad + bloom grouped in ONE wrapper, so the bloom drifts WITH the
          pad it sits on (the wrapper carries the shared `.drift` motion) */}
      <div className="paint-in drift absolute" style={{ top: `${PADS[0].top}%`, left: `${PADS[0].left}%`, width: PADS[0].size, height: PADS[0].size }}>
        <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" style={{ transform: `rotate(${PADS[0].rot}deg)`, filter: 'drop-shadow(0 4px 7px rgba(31,74,62,0.28))' }}>
          <defs>
            <radialGradient id="pad0" cx="42%" cy="38%" r="65%"><stop offset="0%" stopColor={PADS[0].c} /><stop offset="100%" stopColor={PADS[0].d} /></radialGradient>
          </defs>
          <path d={PAD_PATH} fill="url(#pad0)" />
          <path d={PAD_PATH} fill="none" stroke="#e8f6ec" strokeOpacity="0.35" strokeWidth="1.5" />
          {VEINS.map((v, j) => <line key={j} x1="50" y1="50" x2={v.x} y2={v.y} stroke={PADS[0].d} strokeOpacity="0.55" strokeWidth="1.2" />)}
        </svg>
        <svg aria-hidden viewBox="0 0 100 100" className="absolute" style={{ top: '50%', left: '50%', width: 52, height: 52, transform: 'translate(-50%,-50%)', filter: 'drop-shadow(0 3px 6px rgba(120,60,90,0.3))' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="34" rx="8" ry="20" transform={`rotate(${i * 45} 50 50)`} fill={i % 2 ? '#fbd0e2' : '#f7b6d1'} opacity="0.95" />
          ))}
          <circle cx="50" cy="50" r="9" fill="#fbe6a4" />
        </svg>
      </div>

      {/* content */}
      <div className="relative flex h-full flex-col justify-between" style={{ color: '#2c2a55' }}>
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em]" style={{ opacity: 0.72 }}>
          <span aria-hidden className="size-1.5 rounded-full" style={{ background: '#f7b6d1' }} />
          Design Intern · MMXXVI
        </span>
        <div className="flex flex-col gap-1">
          <h2 className="script-name text-5xl leading-[0.95] md:text-6xl" style={{ fontFamily: cursive, color: '#2a2752' }}>
            Fernanda Ferreira
          </h2>
          <p className="max-w-[27ch] text-sm leading-relaxed" style={{ opacity: 0.82 }}>
            Turning ideas into pixel-perfect UI. 🎨
          </p>
        </div>
      </div>
    </article>
  )
}
