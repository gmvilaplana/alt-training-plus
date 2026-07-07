// Mercedes Perez — Product Designer.
// "Wizarding" aesthetic: a midnight-purple night sky lit by candle-gold and a
// starfield that begins to glimmer at rest and fully ignites on hover. The
// cursor becomes a magic wand that leaves a trail of twinkling stars in its
// wake. GSAP drives the entrance, the idle shimmer, and the hover spell.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const STAR_PATH = 'M12 0 l2.1 9.9 9.9 2.1 -9.9 2.1 -2.1 9.9 -2.1 -9.9 -9.9 -2.1 9.9 -2.1 Z'

const shine = {
  backgroundImage: 'linear-gradient(180deg,#fbeec2 0%,#e3c373 50%,#a9772f 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as const

// background stars — a few start brighter so the sky already glimmers at rest
const STARS = [
  { t: '14%', l: '16%', s: 2, o: 0.65 }, { t: '10%', l: '54%', s: 3, o: 0.3 },
  { t: '20%', l: '82%', s: 2, o: 0.7 }, { t: '34%', l: '30%', s: 2, o: 0.35 },
  { t: '44%', l: '68%', s: 3, o: 0.6 }, { t: '58%', l: '12%', s: 2, o: 0.4 },
  { t: '64%', l: '90%', s: 2, o: 0.7 }, { t: '78%', l: '60%', s: 3, o: 0.3 },
  { t: '86%', l: '30%', s: 2, o: 0.55 }, { t: '50%', l: '48%', s: 2, o: 0.4 },
  { t: '28%', l: '94%', s: 2, o: 0.65 }, { t: '70%', l: '76%', s: 2, o: 0.35 },
]

export default function MercedesPerezCard() {
  const root = useRef<HTMLElement>(null)
  const cursor = useRef<SVGSVGElement>(null)
  const trail = useRef<HTMLDivElement>(null)
  const twinkle = useRef<gsap.core.Tween | null>(null)
  const moveTo = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)
  const last = useRef({ x: 0, y: 0 })

  const { contextSafe } = useGSAP(
    () => {
      gsap.from('[data-reveal]', {
        y: 22, autoAlpha: 0, duration: 0.85, ease: 'power3.out', stagger: 0.12,
      })
      // idle: stars softly glimmer (start glowing)
      twinkle.current = gsap.to('[data-star]', {
        opacity: 0.9, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut',
        stagger: { each: 0.22, from: 'random' },
      })
      // smooth followers for the wand cursor
      moveTo.current = {
        x: gsap.quickTo(cursor.current, 'x', { duration: 0.18, ease: 'power3' }),
        y: gsap.quickTo(cursor.current, 'y', { duration: 0.18, ease: 'power3' }),
      }
    },
    { scope: root },
  )

  // drop a fading star at (x, y) — a step of the wand's trail
  const dropStar = contextSafe((x: number, y: number) => {
    if (!trail.current) return
    const size = 9 + Math.random() * 8
    const el = document.createElement('span')
    el.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${size}px;height:${size}px;margin:${-size / 2}px;pointer-events:none;`
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#fbeec2" style="filter:drop-shadow(0 0 5px rgba(251,238,194,.9))"><path d="${STAR_PATH}"/></svg>`
    trail.current.appendChild(el)
    gsap.fromTo(el, { scale: 0.2, opacity: 1, rotation: 0 },
      { scale: 1, rotation: 110, duration: 0.25, ease: 'back.out(2)' })
    gsap.to(el, {
      opacity: 0, y: -18 - Math.random() * 14, scale: 0.35, duration: 0.75, delay: 0.16,
      ease: 'power2.out', onComplete: () => el.remove(),
    })
  })

  const onMove = contextSafe((e: React.MouseEvent) => {
    const r = root.current!.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    moveTo.current?.x(x)
    moveTo.current?.y(y)
    if (Math.hypot(x - last.current.x, y - last.current.y) > 15) {
      last.current = { x, y }
      dropStar(x, y)
    }
  })

  const cast = contextSafe(() => {
    gsap.to(cursor.current, { autoAlpha: 1, duration: 0.2 })
    twinkle.current?.pause()
    gsap.to('[data-star]', { opacity: 1, scale: 1.6, duration: 0.5, ease: 'power2.out' })
    gsap.to('[data-name]', { filter: 'drop-shadow(0 0 24px rgba(251,238,194,0.85))', duration: 0.4 })
    gsap.to('[data-frame]', { opacity: 1, duration: 0.4 })
  })
  const dispel = contextSafe(() => {
    gsap.to(cursor.current, { autoAlpha: 0, duration: 0.25 })
    gsap.to('[data-star]', {
      scale: 1, opacity: 0.6, duration: 0.5, ease: 'power2.out',
      onComplete: () => twinkle.current?.play(),
    })
    gsap.to('[data-name]', { filter: 'drop-shadow(0 0 12px rgba(216,178,90,0.4))', duration: 0.5 })
    gsap.to('[data-frame]', { opacity: 0.65, duration: 0.5 })
  })

  // 🥚 easter egg — hovering the word "spells" strikes Harry's scar across the card
  const strikeScar = contextSafe(() => {
    gsap.timeline({ defaults: { overwrite: 'auto' } })
      .set('[data-scar]', { scale: 1 })
      .fromTo('[data-scar]', { autoAlpha: 0 }, { autoAlpha: 0.16, duration: 0.12 })
      .to('[data-scar]', { autoAlpha: 0.06, duration: 0.1 })
      .to('[data-scar]', { autoAlpha: 0.12, duration: 0.4, ease: 'sine.out' })
  })
  const fadeScar = contextSafe(() => {
    gsap.to('[data-scar]', { autoAlpha: 0, duration: 0.45, overwrite: true })
  })

  return (
    <article
      ref={root}
      onMouseEnter={cast}
      onMouseLeave={dispel}
      onMouseMove={onMove}
      className="relative aspect-[16/10] cursor-none overflow-hidden rounded-2xl p-8 text-(--color-theme-amber-ink) md:p-9"
    >
      {/* base: midnight-purple night sky + candle-gold glow from below */}
      <div aria-hidden className="absolute inset-0" style={{
        background:
          'radial-gradient(85% 65% at 50% 118%, rgba(216,178,90,0.20), transparent 62%),' +
          'radial-gradient(130% 130% at 50% -12%, #2c2052 0%, #170f36 46%, #0a0717 100%)',
      }} />

      {/* starfield — some already glimmering at rest */}
      {STARS.map((s, i) => (
        <span key={i} data-star aria-hidden className="absolute rounded-full bg-[#fbeec2]" style={{
          top: s.t, left: s.l, width: s.s, height: s.s, opacity: s.o,
          boxShadow: '0 0 6px rgba(251,238,194,0.85)',
        }} />
      ))}

      {/* 🥚 easter-egg scar — Harry's lightning bolt, hidden until "spells" is hovered */}
      <svg data-scar aria-hidden viewBox="0 0 220 200" preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-0"
        style={{ filter: 'drop-shadow(0 0 14px rgba(251,238,194,0.5))' }} fill="#fbeec2">
        <path d="M124 6 L72 98 L104 98 L84 194 L156 80 L120 80 L148 6 Z" />
      </svg>

      {/* glowing double gold frame */}
      <div data-frame aria-hidden className="pointer-events-none absolute inset-3 rounded-lg" style={{
        opacity: 0.65, border: '1px solid rgba(216,178,90,0.7)',
        boxShadow: '0 0 18px rgba(216,178,90,0.25), inset 0 0 26px rgba(216,178,90,0.12)',
      }} />
      <div aria-hidden className="pointer-events-none absolute inset-[18px] rounded-md" style={{ border: '1px solid rgba(216,178,90,0.3)' }} />

      {/* the wand's star trail lives here */}
      <div ref={trail} aria-hidden className="pointer-events-none absolute inset-0" />

      {/* content */}
      <div className="relative flex h-full flex-col items-center justify-between text-center">
        <span data-reveal style={shine} className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-80">
          Product Designer · MMXXVI
        </span>

        <div className="flex flex-col items-center gap-3">
          <h2 data-reveal data-name
            style={{ fontFamily: 'Georgia, "Times New Roman", "Hoefler Text", serif', filter: 'drop-shadow(0 0 10px rgba(216,178,90,0.35))', ...shine }}
            className="text-4xl font-medium leading-[1] tracking-tight md:text-5xl">
            Mercedes
            <br />
            Pérez
          </h2>
          <p data-reveal className="text-xs leading-relaxed text-(--color-theme-amber-ink)/70 md:text-sm">
            Casting product{' '}
            <span onMouseEnter={strikeScar} onMouseLeave={fadeScar}>spells</span>{' '}
            with AI.
          </p>
        </div>
      </div>

      {/* the magic-wand cursor (follows the pointer) */}
      <svg ref={cursor} aria-hidden width="44" height="44" viewBox="0 0 48 48"
        className="pointer-events-none absolute top-0 left-0 z-20 opacity-0"
        style={{ marginLeft: -7, marginTop: -7, filter: 'drop-shadow(0 0 6px rgba(251,238,194,0.9))' }}
        fill="none">
        <line x1="13" y1="13" x2="40" y2="40" stroke="#7a5418" strokeWidth="3.4" strokeLinecap="round" />
        <line x1="13" y1="13" x2="40" y2="40" stroke="#d8b25a" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 8 l1.7 4.6 4.6 1.7 -4.6 1.7 -1.7 4.6 -1.7 -4.6 -4.6 -1.7 4.6 -1.7 Z" fill="#fbeec2" />
      </svg>
    </article>
  )
}
