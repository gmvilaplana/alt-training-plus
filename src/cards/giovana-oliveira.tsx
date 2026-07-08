// Giovana Oliveira — Designer @ Poatek.
// Refined pink flamingos (S-curve necks, long jointed legs, downward two-tone
// beaks) in three poses on a deep-red field. GSAP entrance + idle sway + tilt.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

type BirdProps = { className?: string; flip?: boolean }

// shared pink palette, defined once and referenced by every flamingo
function PinkDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="flBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9cbb" />
          <stop offset="1" stopColor="#e05b87" />
        </linearGradient>
        <linearGradient id="flWing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffc9db" />
          <stop offset="1" stopColor="#f79ab9" />
        </linearGradient>
      </defs>
    </svg>
  )
}

// thin jointed legs with the backward "knee" bend + subtle webbed feet
function Legs({ oneLeg = false }: { oneLeg?: boolean }) {
  return (
    <g fill="none" stroke="#f2a6c0" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M104 170 L110 236 L100 264" />
      <path d="M100 264 l-11 5 M100 264 l11 4" strokeWidth="4" />
      {oneLeg ? (
        <path d="M124 172 L134 202 L120 214" />
      ) : (
        <>
          <path d="M126 172 L132 236 L142 264" />
          <path d="M142 264 l-11 4 M142 264 l11 5" strokeWidth="4" />
        </>
      )}
    </g>
  )
}

// elongated body, wing with feather seams, tail tuft — shared by all poses
function Body() {
  return (
    <g>
      <path d="M58 150 q-16 -6 -22 6 q13 5 24 -2 Z" fill="#c24d75" />
      <ellipse cx="112" cy="150" rx="54" ry="33" fill="url(#flBody)" transform="rotate(-6 112 150)" />
      <path d="M66 150 q42 -28 96 -6 q-20 30 -62 30 q-24 0 -34 -24 Z" fill="url(#flWing)" />
      <path d="M92 150 q30 -12 60 -2" stroke="#c24d75" strokeWidth="2" fill="none" opacity="0.4" />
      <path d="M88 158 q32 -10 62 2" stroke="#c24d75" strokeWidth="2" fill="none" opacity="0.32" />
    </g>
  )
}

// pose 1 — standing on one leg, S-neck up, head to the side
function FlamingoOneLeg({ className, flip }: BirdProps) {
  return (
    <svg viewBox="0 0 220 300" className={className} aria-hidden>
      <g transform={flip ? 'scale(-1,1) translate(-220,0)' : undefined}>
        <Legs oneLeg />
        <Body />
        <path d="M158 140 C 182 118, 150 90, 170 64" fill="none" stroke="url(#flBody)" strokeWidth="13" strokeLinecap="round" />
        <circle cx="172" cy="58" r="12" fill="url(#flBody)" />
        <path d="M182 56 q16 3 18 15 q-11 3 -17 -4 q-5 -6 -1 -11 Z" fill="#f6b3c8" />
        <path d="M198 68 q4 7 -3 11 q-6 -3 -7 -9 q5 -2 10 -2 Z" fill="#24161b" />
        <circle cx="174" cy="55" r="2.4" fill="#24161b" />
      </g>
    </svg>
  )
}

// pose 2 — neck curved down, "drinking"
function FlamingoDrinking({ className, flip }: BirdProps) {
  return (
    <svg viewBox="0 0 220 300" className={className} aria-hidden>
      <g transform={flip ? 'scale(-1,1) translate(-220,0)' : undefined}>
        <Legs />
        <Body />
        <path d="M156 138 C 190 150, 196 208, 168 226" fill="none" stroke="url(#flBody)" strokeWidth="13" strokeLinecap="round" />
        <circle cx="166" cy="228" r="11" fill="url(#flBody)" />
        <path d="M158 233 q-4 12 5 17 q7 -3 6 -14 Z" fill="#f6b3c8" />
        <path d="M160 248 q-1 7 6 8 q3 -5 1 -11 Z" fill="#24161b" />
        <circle cx="168" cy="224" r="2.3" fill="#24161b" />
      </g>
    </svg>
  )
}

// pose 3 — standing, gentle S-neck, looking to the side
function FlamingoLooking({ className, flip }: BirdProps) {
  return (
    <svg viewBox="0 0 220 300" className={className} aria-hidden>
      <g transform={flip ? 'scale(-1,1) translate(-220,0)' : undefined}>
        <Legs />
        <Body />
        <path d="M158 140 C 176 116, 158 86, 176 70" fill="none" stroke="url(#flBody)" strokeWidth="13" strokeLinecap="round" />
        <circle cx="176" cy="66" r="12" fill="url(#flBody)" />
        <path d="M166 62 q-14 -2 -20 8 q9 6 18 1 q6 4 9 -2 q-2 -8 -7 -7 Z" fill="#f6b3c8" />
        <path d="M148 70 q-6 4 -1 9 q6 -1 8 -7 Z" fill="#24161b" />
        <circle cx="172" cy="62" r="2.4" fill="#24161b" />
      </g>
    </svg>
  )
}

// distribute the poses — big foreground pair + one small, faded, further back
const FLAMINGOS = [
  { Comp: FlamingoOneLeg, cls: 'right-0 bottom-0 w-36 opacity-100 md:w-52', flip: true },
  { Comp: FlamingoDrinking, cls: 'left-1 bottom-1 w-32 opacity-95 md:w-44', flip: false },
  { Comp: FlamingoLooking, cls: 'right-1/3 top-0 w-20 opacity-40 md:w-24', flip: true },
]

export default function GiovanaOliveiraCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from('[data-bird]', {
        scale: 0.7,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.6)',
        stagger: 0.1,
      })
      gsap.to('[data-bird]', {
        y: (i) => (i % 2 ? -8 : 8),
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      })
      gsap.from('[data-reveal]', {
        y: 22,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
      })
    },
    { scope: root },
  )

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = root.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, {
      rotateY: px * 7,
      rotateX: -py * 7,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    })
  }

  const onLeave = () => {
    if (root.current)
      gsap.to(root.current, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'power3.out' })
  }

  return (
    <article
      ref={root}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ backgroundColor: '#c1121f' }}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 text-white [transform-style:preserve-3d] md:p-9"
    >
      {/* self-contained font load — file lives in public/, works for everyone */}
      <style>{`@font-face{font-family:"Makcasa 2";src:url("/makcasa.ttf") format("truetype");font-display:swap;}`}</style>

      {/* depth wash so the red isn't flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_100%,rgba(0,0,0,0.35),transparent_60%)]"
      />

      {/* the flamingos */}
      <PinkDefs />
      {FLAMINGOS.map(({ Comp, cls, flip }, i) => (
        <span key={i} data-bird aria-hidden className={`pointer-events-none absolute ${cls}`}>
          <Comp flip={flip} className="w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.3)]" />
        </span>
      ))}

      {/* film grain for a printed-poster texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* content stack — eyebrow, name + description grouped at the top */}
      <div className="relative flex h-full flex-col justify-start gap-3">
        <span
          data-reveal
          className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-85 md:text-xs"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-[#f6a7c2]" />
          Designer · Poatek · MMXXVI
        </span>

        <div className="flex max-w-[62%] flex-col gap-2">
          <h2
            data-reveal
            style={{ fontFamily: '"Makcasa 2", "Permanent Marker", cursive' }}
            className="text-5xl leading-[0.9] tracking-tight drop-shadow-[0_3px_0_rgba(0,0,0,0.25)] md:text-7xl"
          >
            Giovana
            <br />
            Oliveira
          </h2>
          <p data-reveal className="text-sm leading-relaxed opacity-80">
            Building thoughtful interfaces where color, motion, and clean code meet.
          </p>
        </div>
      </div>

      {/* footer brand mark */}
      <span
        data-reveal
        aria-hidden
        className="absolute right-7 bottom-6 font-mono text-[10px] tracking-[0.3em] text-white/60"
      >
        Latam · ALT
      </span>
    </article>
  )
}
