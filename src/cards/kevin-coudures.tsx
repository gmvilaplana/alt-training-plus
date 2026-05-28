// Kevin Coudures — Design Manager.
// A handcrafted "woolly / felt-craft" castle landscape (inspired by yarn-
// art platformers): a knitted sky, stitched felt mountains and hills, a
// yarn-ball sun and a stone castle with stitched seams + button windows.
// Soft drop-shadows fake the depth/relief. On HOVER the castle unfolds
// like a pop-up book and the sun (a ball of wool) spins. Text lives in the
// open sky above the castle so it never overlaps.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function KevinCouduresCard() {
  const root = useRef<HTMLElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const sun = useRef<gsap.core.Tween | null>(null)

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('.castle', { transformOrigin: '50% 100%', rotateX: 92, yPercent: 38, autoAlpha: 0 })
      gsap.from(root.current, { autoAlpha: 0, y: 16, duration: 0.5, ease: 'power2.out' })
      gsap.from('.landscape', { yPercent: 28, autoAlpha: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 0.1 })
      gsap.to('.cloud', { x: 12, duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6 })

      // the wool-ball sun spins ONLY while hovering
      sun.current = gsap.to('.sun', { rotate: 360, transformOrigin: '50% 50%', duration: 6, ease: 'none', repeat: -1, paused: true })

      // hover — the castle pops up like a paper book, then the flags wave
      tl.current = gsap.timeline({ paused: true })
        .to('.castle', { rotateX: 0, yPercent: 0, autoAlpha: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0)
        .to('.flag', { rotate: -12, transformOrigin: '0% 100%', duration: 0.4, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 0.35)
    },
    { scope: root },
  )

  const onEnter = contextSafe(() => { tl.current?.play(); sun.current?.play() })
  const onLeave = contextSafe(() => { tl.current?.reverse(); sun.current?.pause() })

  // shared stitched-seam look
  const seam = { strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const }

  return (
    <article
      ref={root}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 text-[#16314f] [perspective:1000px] [background:repeating-linear-gradient(45deg,rgba(255,255,255,0.16)_0_2px,transparent_2px_7px),repeating-linear-gradient(-45deg,rgba(20,60,110,0.08)_0_2px,transparent_2px_7px),linear-gradient(to_bottom,#daf2fd,#a9e0f7,#7ec8ec)] md:p-9"
    >
      {/* shared defs: soft shadow + woolly gradients */}
      <svg className="pointer-events-none absolute size-0" aria-hidden>
        <defs>
          <filter id="kc-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.6" stdDeviation="1.8" floodColor="#15321f" floodOpacity="0.32" />
          </filter>
          <radialGradient id="kc-sun" cx="38%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#ffe89a" /><stop offset="62%" stopColor="#ffd23f" /><stop offset="100%" stopColor="#eaa42a" />
          </radialGradient>
          <linearGradient id="kc-stone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d2d8df" /><stop offset="100%" stopColor="#abb3bd" />
          </linearGradient>
          <linearGradient id="kc-hill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#82d06d" /><stop offset="100%" stopColor="#57aa49" />
          </linearGradient>
        </defs>
      </svg>

      {/* sun — a ball of wool, spins on hover */}
      <svg className="sun absolute top-5 right-6 size-16 md:size-20" viewBox="0 0 100 100" aria-hidden>
        <circle cx="50" cy="50" r="30" fill="url(#kc-sun)" filter="url(#kc-soft)" />
        <g fill="none" stroke="#e09f26" strokeWidth="2.4" {...seam} opacity="0.65">
          <path d="M26 42 Q50 30 74 46" /><path d="M24 54 Q50 50 76 58" /><path d="M28 66 Q50 66 70 70" />
        </g>
        <circle cx="50" cy="50" r="30" fill="none" stroke="#f4ad2a" strokeWidth="2" strokeDasharray="3 3.5" />
      </svg>

      {/* clouds — felt puffs with a stitched edge */}
      <svg className="cloud absolute top-7 left-7 h-6 md:h-7" viewBox="0 0 120 50" aria-hidden fill="#fdfefe" stroke="#cfe2ee" strokeWidth="2.4" strokeDasharray="5 3.5" {...seam}>
        <ellipse cx="35" cy="32" rx="26" ry="15" /><ellipse cx="62" cy="26" rx="23" ry="17" /><ellipse cx="86" cy="34" rx="21" ry="13" />
      </svg>
      <svg className="cloud absolute top-[40%] left-[60%] h-5 opacity-90" viewBox="0 0 120 50" aria-hidden fill="#fdfefe" stroke="#cfe2ee" strokeWidth="2.6" strokeDasharray="5 3.5" {...seam}>
        <ellipse cx="35" cy="32" rx="24" ry="13" /><ellipse cx="64" cy="28" rx="21" ry="15" /><ellipse cx="88" cy="34" rx="19" ry="11" />
      </svg>

      {/* ── scene, anchored to the bottom (below the text) ── */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[55%] [perspective:900px]">
        {/* felt mountains with stitched snow caps — full width, every peak capped */}
        <svg className="landscape absolute bottom-0 h-[92%] w-full" viewBox="0 0 320 110" preserveAspectRatio="none">
          <path d="M0 110 L44 44 L92 94 L150 20 L210 92 L268 38 L320 78 L320 110Z" fill="#8aa6c4" stroke="#6e89a8" strokeWidth="2.6" strokeDasharray="6 4" {...seam} filter="url(#kc-soft)" />
          <path d="M44 44 L60 66 L28 66Z M150 20 L169 46 L131 46Z M268 38 L286 62 L250 62Z" fill="#fbfdff" stroke="#d7e3ee" strokeWidth="2.2" strokeDasharray="5 3.5" {...seam} />
        </svg>
        {/* knitted green hills */}
        <svg className="landscape absolute bottom-0 h-[58%] w-full" viewBox="0 0 320 70" preserveAspectRatio="none">
          <path d="M0 70 Q80 16 160 40 T320 28 V70Z" fill="url(#kc-hill)" />
          <path d="M0 70 Q90 42 180 56 T320 50 V70Z" fill="#4f9e44" />
        </svg>
        <svg className="landscape absolute bottom-[7%] h-[2px] w-full" viewBox="0 0 320 2" preserveAspectRatio="none" aria-hidden>
          <line x1="0" y1="1" x2="320" y2="1" stroke="#3f8438" strokeWidth="2" strokeDasharray="7 5" />
        </svg>

        {/* the woolly stone castle — solid body, folds at rest, pops on hover */}
        <svg className="castle absolute bottom-[8%] left-1/2 h-[80%] -translate-x-1/2" viewBox="0 0 120 92" preserveAspectRatio="xMidYMax meet">
          {/* soft ground shadow (lives inside the castle so it pops + hides with it) */}
          <ellipse cx="57" cy="91" rx="50" ry="4" fill="#173417" opacity="0.18" />
          <path d="M12 92 V30 h7 v-6 h7 v6 h7 v-6 h7 v6 h7 v-6 h7 v6 h7 v-6 h7 v6 h7 v-6 h7 v6 h7 v-6 h7 v6 h6 V92Z" fill="url(#kc-stone)" stroke="#7c848d" strokeWidth="1.8" strokeDasharray="4 2.5" {...seam} />
          <path d="M46 30 V18 h6 v-5 h6 v5 h6 v-5 h6 v5 h6 V30Z" fill="#c4cbd2" stroke="#7c848d" strokeWidth="1.8" strokeDasharray="4 2.5" {...seam} />
          {/* arched felt gate */}
          <path d="M50 92 V60 a10 10 0 0 1 20 0 V92Z" fill="#8a5226" stroke="#5a3416" strokeWidth="1.8" strokeDasharray="4 2.5" {...seam} />
          {/* button windows */}
          <g fill="#42506b" stroke="#2c3850" strokeWidth="1.2">
            <circle cx="23" cy="48" r="5" /><circle cx="89" cy="48" r="5" /><circle cx="56" cy="24" r="3.6" /><circle cx="64" cy="24" r="3.6" />
          </g>
          <g fill="#aeb9d6">
            <circle cx="21.5" cy="47" r="0.9" /><circle cx="24.5" cy="49" r="0.9" /><circle cx="87.5" cy="47" r="0.9" /><circle cx="90.5" cy="49" r="0.9" />
          </g>
          {/* yarn flags */}
          <g className="flag"><rect x="18" y="6" width="1.8" height="20" fill="#5a4632" /><path d="M19 6 H31 L27 11 L31 16 H19Z" fill="#e0483b" stroke="#b5392f" strokeWidth="1.2" strokeDasharray="3 2" {...seam} /></g>
          <g className="flag"><rect x="96" y="6" width="1.8" height="20" fill="#5a4632" /><path d="M97 6 H109 L105 11 L109 16 H97Z" fill="#3b7fe0" stroke="#2f66b5" strokeWidth="1.2" strokeDasharray="3 2" {...seam} /></g>
        </svg>

        {/* foreground grass with a stitched hem */}
        <svg className="absolute bottom-0 h-[15%] w-full" viewBox="0 0 320 20" preserveAspectRatio="none" aria-hidden>
          <rect width="320" height="20" fill="#3f8a39" />
        </svg>
      </div>

      {/* ── text — in the open sky, above the castle ── */}
      <div className="relative z-10 flex flex-col gap-1.5">
        <span className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.24em] uppercase opacity-80 md:text-xs">
          <span aria-hidden className="size-1.5 rotate-45 bg-[#e0483b]" />
          Design Manager · MMXXVI
        </span>
        <h2 className="[font-family:var(--font-display)] text-4xl leading-[0.92] font-bold tracking-tight uppercase text-[#14233b] drop-shadow-[0_2px_4px_rgba(255,255,255,0.6)] md:text-5xl">
          Kevin Coudures
        </h2>
        <p className="flex items-center gap-2 text-sm font-medium tracking-wide text-[#244065]">
          <span aria-hidden>❄</span>
          Winter is coming.
        </p>
      </div>
    </article>
  )
}
