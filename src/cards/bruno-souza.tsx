// Bruno Souza — "An Unexpected Journey" quest-scroll contract.
// A hand-drawn Middle-earth artifact: weathered parchment (candlelight,
// burns, stains, grain), an ornate frame (corner compass roses, midpoint
// diamonds), and a pen-and-ink map layer — a cross-hatched mountain range,
// a dotted travel path with red waypoints, Smaug, and a quill & inkwell.
// Uncial Antiqua throughout; role in burgundy. GSAP: entrance, candle
// flicker, seal stamp, hover glow-bloom + subtle tilt.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const uncial: React.CSSProperties = { fontFamily: "'Uncial Antiqua', 'Georgia', serif" }
const CORNERS = ['top-3.5 left-3.5', 'top-3.5 right-3.5', 'bottom-3.5 left-3.5', 'bottom-3.5 right-3.5']
const MIDS = [
  'top-[15px] left-1/2 -translate-x-1/2', 'bottom-[15px] left-1/2 -translate-x-1/2',
  'left-[15px] top-1/2 -translate-y-1/2', 'right-[15px] top-1/2 -translate-y-1/2',
]

function CompassRose() {
  return (
    <svg viewBox="0 0 44 44" className="size-full">
      <circle cx="22" cy="22" r="17" fill="none" stroke="#3a2a12" strokeWidth="0.8" />
      <circle cx="22" cy="22" r="13" fill="none" stroke="#3a2a12" strokeWidth="0.5" opacity="0.6" />
      <g fill="#3a2a12">
        <path d="M22 3 L25 20 22 22 19 20Z M41 22 L24 25 22 22 24 19Z M22 41 L19 24 22 22 25 24Z M3 22 L20 19 22 22 20 25Z" />
        <g transform="rotate(45 22 22)" opacity="0.5">
          <path d="M22 9 L24 21 22 22 20 21Z M35 22 L23 24 22 22 23 20Z M22 35 L20 23 22 22 24 23Z M9 22 L21 20 22 22 21 24Z" />
        </g>
      </g>
      <circle cx="22" cy="22" r="2.4" fill="#3a2a12" />
    </svg>
  )
}

const STEP_POOL = 14

export default function BrunoSouzaCard() {
  const root = useRef<HTMLElement>(null)
  const steps = useRef<(SVGSVGElement | null)[]>([])
  const step = useRef({ i: 0, x: 0, y: 0, placed: false, foot: 1 })

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(steps.current.filter(Boolean), { xPercent: -50, yPercent: -50, autoAlpha: 0, transformOrigin: '50% 50%' })
    },
    { scope: root },
  )

  const onMove = contextSafe((e: React.MouseEvent) => {
    const r = root.current!.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    // drop a footprint each time the cursor walks a step's distance
    const s = step.current
    const dx = x - s.x, dy = y - s.y
    if (!s.placed || Math.hypot(dx, dy) > 26) {
      const el = steps.current[s.i % STEP_POOL]
      s.i++; s.foot *= -1
      if (el) {
        const rad = Math.atan2(dy, dx)
        gsap.killTweensOf(el)
        gsap.set(el, {
          x: x + Math.cos(rad + Math.PI / 2) * 6 * s.foot,
          y: y + Math.sin(rad + Math.PI / 2) * 6 * s.foot,
          rotation: (rad * 180) / Math.PI + 90,
          scaleX: s.foot,
        })
        gsap.fromTo(el, { autoAlpha: 0.9 }, { autoAlpha: 0, duration: 1.3, ease: 'power1.out' })
      }
      s.x = x; s.y = y; s.placed = true
    }
  })

  return (
    <article
      ref={root}
      onMouseMove={onMove}
      className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[#e2cfa0] p-9 text-[#2f2110] md:p-10"
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap" />

      {/* parchment tone + faint stains */}
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(22%_30%_at_80%_28%,rgba(90,58,20,0.20),transparent_60%),radial-gradient(18%_24%_at_20%_74%,rgba(90,58,20,0.16),transparent_60%),radial-gradient(120%_120%_at_30%_20%,#efe0b4,transparent_55%)]" />

      {/* hand-drawn map illustration */}
      <svg aria-hidden viewBox="0 0 400 250" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <g stroke="#2f2110" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.4">
          {/* mountain range winding across the bottom */}
          <path d="M0 238 L40 206 64 222 98 182 128 216 162 176 198 212 234 170 270 208 302 186 338 216 372 190 400 218 L400 250 0 250Z" fill="rgba(47,33,16,0.06)" strokeWidth="1.4" />
          {/* ridges + cross-hatching on the peaks */}
          <path d="M98 182 L114 238 M162 176 L152 238 M234 170 L248 238 M302 186 L296 238" strokeWidth="0.7" opacity="0.8" />
          <path d="M150 196 l10 6 M144 208 l14 8 M226 194 l12 7 M220 208 l16 9 M90 200 l-9 6 M84 212 l-12 7" strokeWidth="0.6" opacity="0.7" />
        </g>
        {/* animated travel route marching toward the mountain */}
        <path className="tc-route" d="M40 214 C96 206 104 166 152 160 C196 155 212 176 236 168" fill="none" stroke="#5a3212" strokeWidth="2.2" strokeDasharray="2 8" strokeLinecap="round" opacity="0.85" />
        <g stroke="#8f2a22" strokeWidth="2.4" strokeLinecap="round" opacity="0.95">
          <circle cx="40" cy="214" r="2.6" fill="#8f2a22" stroke="none" />
          <path d="M233 165 l6 6 M239 165 l-6 6" />
        </g>
        {/* Smaug, circling in red ink */}
        <path className="tc-dragon" transform="translate(316 40) scale(0.62)" fill="#8f2a22" opacity="0.8"
          d="M0 22 C10 6 30 2 48 8 C39 11 35 17 39 22 C52 17 66 21 74 32 C60 27 51 32 45 38 C56 38 62 45 61 54 C52 45 43 45 36 50 C32 38 21 31 10 32 C5 29 0 27 0 22Z" />
      </svg>

      {/* candlelight — flickers */}
      <div aria-hidden className="tc-glow absolute inset-0 opacity-55 [background:radial-gradient(85%_70%_at_32%_26%,rgba(255,206,120,0.5),transparent_60%)] mix-blend-soft-light" />
      {/* burn edges + vignette */}
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(140%_130%_at_50%_50%,transparent_46%,rgba(52,28,6,0.30)_82%,rgba(28,14,2,0.6))]" />
      {/* paper grain */}
      <svg aria-hidden className="absolute inset-0 size-full opacity-[0.12] mix-blend-multiply">
        <filter id="tc-grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" /></filter>
        <rect width="100%" height="100%" filter="url(#tc-grain)" />
      </svg>

      {/* legibility washes — calm the background behind the text */}
      <div aria-hidden className="absolute inset-x-6 top-[25%] h-1/2 [background:radial-gradient(72%_100%_at_50%_45%,rgba(234,223,188,0.94),rgba(234,223,188,0.42)_55%,transparent_78%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#e2cfa0]/90 via-[#e2cfa0]/50 to-transparent" />

      {/* quill & inkwell sketch, lower-left corner */}
      <svg aria-hidden viewBox="0 0 120 120" className="absolute bottom-4 left-5 h-20 -rotate-6 opacity-[0.28] md:h-24">
        <g fill="#2f2110">
          <ellipse cx="30" cy="98" rx="20" ry="6" /><path d="M12 78 h36 v14 a6 6 0 0 1-6 6 h-24 a6 6 0 0 1-6-6z" />
          <ellipse cx="30" cy="78" rx="18" ry="5" fill="#1e1408" />
          <path d="M40 66 C56 52 76 40 102 22 C90 44 70 60 48 72 Z" opacity="0.85" />
        </g>
        <path d="M32 82 C60 50 84 30 108 12" stroke="#2f2110" strokeWidth="2" fill="none" />
      </svg>

      {/* ornate frame + corner roses + midpoint diamonds */}
      <div aria-hidden className="pointer-events-none absolute inset-3 rounded-[6px] border-2 border-[#3a2a12]/55" />
      <div aria-hidden className="pointer-events-none absolute inset-[18px] rounded-[4px] border border-[#3a2a12]/30" />
      {CORNERS.map((c) => <div key={c} aria-hidden className={`absolute ${c} size-9 opacity-75 md:size-11`}><CompassRose /></div>)}
      {MIDS.map((m) => <div key={m} aria-hidden className={`absolute ${m} size-2 rotate-45 border border-[#3a2a12]/60 bg-[#e2cfa0]`} />)}

      {/* wax seal */}
      <svg viewBox="0 0 100 100" className="tc-seal absolute right-7 bottom-7 z-20 size-16 drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)] md:size-[74px]">
        <path d="M50 5 55 12 64 8 66 18 76 18 74 28 83 33 77 41 84 50 76 58 82 67 72 71 73 82 63 80 60 90 51 85 43 92 36 84 26 87 25 76 15 76 18 66 9 60 16 51 8 42 17 36 13 26 23 25 22 15 32 17 37 8 46 13Z" fill="#7c211b" />
        <circle cx="49" cy="49" r="30" fill="#8f2a22" stroke="#5c130f" strokeWidth="2" />
        <text x="49" y="59" textAnchor="middle" fontSize="30" fill="#3d0d0a" style={uncial}>B</text>
      </svg>

      {/* footprint trail — follows the cursor like steps on the map */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[5]">
        {Array.from({ length: STEP_POOL }).map((_, i) => (
          <svg
            key={i}
            ref={(el) => { steps.current[i] = el }}
            viewBox="0 0 20 28"
            className="absolute left-0 top-0 h-5 w-3.5 opacity-0 drop-shadow-[0_1px_1px_rgba(240,230,200,0.7)]"
          >
            <g fill="#3a2a12">
              <ellipse cx="10" cy="18" rx="5.4" ry="8" />
              <circle cx="6.4" cy="8.5" r="1.5" /><circle cx="9.6" cy="5.6" r="1.9" />
              <circle cx="12.6" cy="6.2" r="1.6" /><circle cx="14.7" cy="8.4" r="1.3" />
            </g>
          </svg>
        ))}
      </div>

      {/* content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-between text-center" style={uncial}>
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-lg leading-tight tracking-[0.14em] text-[#241a0b] [text-shadow:0_1px_3px_rgba(240,230,200,0.95),0.6px_0.6px_0_rgba(58,42,18,0.35)] md:text-2xl">
            An Unexpected Journey
          </h2>
          <svg viewBox="0 0 200 12" className="h-2.5 w-40 opacity-70">
            <g stroke="#3a2a12" strokeWidth="1" fill="#3a2a12">
              <line x1="4" y1="6" x2="82" y2="6" /><line x1="118" y1="6" x2="196" y2="6" />
              <path d="M100 1 106 6 100 11 94 6Z" /><circle cx="86" cy="6" r="1.8" /><circle cx="114" cy="6" r="1.8" />
            </g>
          </svg>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-xs tracking-[0.22em] text-[#5a3d16] md:text-sm">— herein summoned —</p>
          <h1 className="text-4xl leading-none text-[#1e1507] [text-shadow:0_1px_4px_rgba(240,230,200,0.98),0.6px_0.6px_0_rgba(58,42,18,0.3)] md:text-6xl">Bruno Souza</h1>
          <p className="mt-1.5 text-xl tracking-wide text-[#6f1119] [text-shadow:0_1px_2px_rgba(240,230,200,0.9)] md:text-2xl">Scribe of the Fellowship</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="font-[Georgia,serif] text-xs italic tracking-wide text-[#4a3618] md:text-sm">
            To the Fellowship of ALT · MMXXVI
          </p>
          <svg viewBox="0 0 30 14" className="h-3 w-8 opacity-70"><path d="M2 13 L9 3 L13 8 L18 2 L28 13" fill="none" stroke="#3a2a12" strokeWidth="1.2" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </article>
  )
}
