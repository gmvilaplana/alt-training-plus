import { useRef, type PointerEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Botanical daisy field — closed buds bloom open on hover, nearest the
// cursor first, rippling across the field. Sage greens, warm whites,
// buttery-yellow centers over a pastel gradient sky.
type Bloom = { x: number; y: number; s: number }

// Hand-drawn watering can used as the custom mouse cursor (hotspot at the
// rose, so blooms open where the "water" falls).
const WATERING_CAN = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'>` +
    `<path d='M20 20 q7 -12 16 -2' fill='none' stroke='#4f6e4c' stroke-width='2.5' stroke-linecap='round'/>` +
    `<path d='M18 26 q-8 0 -11 -8' fill='none' stroke='#4f6e4c' stroke-width='2.5' stroke-linecap='round'/>` +
    `<path d='M18 20 h18 a2 2 0 0 1 2 2 v12 a4 4 0 0 1 -4 4 h-14 a4 4 0 0 1 -4 -4 v-12 a2 2 0 0 1 2 -2 z' fill='#8fb08a' stroke='#4f6e4c' stroke-width='2'/>` +
    `<ellipse cx='27' cy='20' rx='9' ry='2.6' fill='#a6c3a0' stroke='#4f6e4c' stroke-width='1.5'/>` +
    `<ellipse cx='6' cy='16' rx='4' ry='2.6' fill='#a6c3a0' stroke='#4f6e4c' stroke-width='1.5' transform='rotate(-40 6 16)'/>` +
    `<g stroke='#8fc7e0' stroke-width='1.6' stroke-linecap='round'><line x1='5' y1='20' x2='4' y2='24'/><line x1='8' y1='20' x2='7' y2='25'/><line x1='11' y1='21' x2='10' y2='25'/></g>` +
    `</svg>`,
)}`

const FLOWERS: Bloom[] = Array.from({ length: 17 }).map((_, i) => ({
  x: 26 + ((i * 97) % 442),
  y: 118 + ((i * 53) % 152),
  s: 0.5 + ((i * 7) % 5) / 10,
}))

function Flower({ x, y, s }: Bloom) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`scale(${s})`}>
        <path d="M0 2 Q-4 22 1 44" fill="none" stroke="#6f9a5d" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="7" cy="23" rx="7" ry="3.2" fill="#84ad70" transform="rotate(32 7 23)" />
        <circle r="4.6" fill="#9bb488" />
        <g data-petals data-fx={x} data-fy={y}>
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="-9"
              rx="3.4"
              ry="8"
              fill="#fdfaf0"
              stroke="#eee5cf"
              strokeWidth="0.5"
              transform={`rotate(${i * 30})`}
            />
          ))}
          <circle r="4.8" fill="#eec24f" />
          <circle r="2.6" fill="#f7d98a" />
        </g>
      </g>
    </g>
  )
}

export default function YsabelliLimaCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.set('[data-petals]', { scale: 0.001, transformOrigin: '50% 50%' })
      gsap.from('[data-field]', { opacity: 0, duration: 1, ease: 'power2.out' })
      gsap.from('[data-reveal]', { y: 14, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.16 })
    },
    { scope: root },
  )

  const bloom = (e: PointerEvent<HTMLElement>) => {
    const el = root.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = ((e.clientX - rect.left) / rect.width) * 480
    const cy = ((e.clientY - rect.top) / rect.height) * 300
    el.querySelectorAll<SVGGElement>('[data-petals]').forEach((p) => {
      if (p.dataset.open === '1') return
      const d = Math.hypot(Number(p.dataset.fx) - cx, Number(p.dataset.fy) - cy)
      if (d < 150) {
        p.dataset.open = '1'
        gsap.to(p, { scale: 1, duration: 0.75, delay: (d / 150) * 0.4, ease: 'back.out(1.7)', transformOrigin: '50% 50%' })
      }
    })
  }

  const close = () => {
    const el = root.current
    if (!el) return
    el.querySelectorAll<SVGGElement>('[data-petals]').forEach((p, i) => {
      p.dataset.open = ''
      gsap.to(p, { scale: 0.001, duration: 0.55, delay: (i % 6) * 0.03, ease: 'power2.in', transformOrigin: '50% 50%' })
    })
  }

  return (
    <article
      ref={root}
      onPointerMove={bloom}
      onPointerLeave={close}
      style={{ cursor: `url("${WATERING_CAN}") 6 16, auto` }}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#e7e0cf] p-8 text-[#2f4a37] md:p-9"
    >
      {/* pastel sky + sage daisy field */}
      <svg data-field viewBox="0 0 480 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9ccbe8" />
            <stop offset="0.4" stopColor="#bfe0f0" />
            <stop offset="0.72" stopColor="#dcecdf" />
            <stop offset="1" stopColor="#d2e2c6" />
          </linearGradient>
          <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fef0cc" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fef0cc" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="480" height="300" fill="url(#sky)" />
        <circle cx="384" cy="58" r="92" fill="url(#sun)" />
        <path d="M0 150 Q120 132 240 148 T480 142 V300 H0 Z" fill="#c7dcbf" opacity="0.55" />
        <path d="M0 210 Q140 192 260 208 T480 204 V300 H0 Z" fill="#b3cfa6" opacity="0.6" />
        {FLOWERS.map((f, i) => (
          <Flower key={i} {...f} />
        ))}
      </svg>

      {/* aged paper grain + soft glow behind the text for legibility */}
      <div aria-hidden className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.06)_0,rgba(255,255,255,0.06)_1px,transparent_1px,transparent_5px)] opacity-40 mix-blend-soft-light" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-2/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(248,245,237,0.82),transparent_70%)] blur-md" />

      {/* text hierarchy */}
      <div className="pointer-events-none relative flex h-full flex-col items-center justify-center gap-2 text-center">
        <span data-reveal className="text-[0.68rem] font-semibold tracking-[0.34em] text-[#6f8570] uppercase">
          Team ALT · Designer
        </span>
        <h2
          data-reveal
          className="font-serif text-4xl leading-[1.05] font-medium tracking-tight text-[#2f4a37] drop-shadow-[0_1px_2px_rgba(255,255,255,0.6)] md:text-6xl"
        >
          Ysabelli Lima
        </h2>
        <p data-reveal className="text-[0.7rem] tracking-[0.22em] text-[#7c8577] italic md:text-xs">
          Cultivating ideas
        </p>
      </div>
    </article>
  )
}
