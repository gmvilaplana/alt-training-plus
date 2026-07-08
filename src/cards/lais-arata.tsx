// LAIS ARATA — Product Designer.
// Memphis aesthetic: cream field, candy colors (hot pink / cyan / yellow),
// thick black outlines, and scattered geometric confetti (squiggle, zigzag,
// triangle, plus, dot-grid, circles). Loud and playful, with a gentle idle
// animation so the shapes drift, wobble, and pulse. Nothing sits behind the
// text — decor lives in the top / center / right negative space only.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function LaisArataCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // gentle floating bob — shapes drift up and back down, out of sync
      gsap.to('[data-float]', {
        y: -9,
        duration: 1.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.35, from: 'random' },
      })
      // slow full rotation for the plus sign
      gsap.to('[data-spin]', {
        rotation: '+=360',
        duration: 9,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
      // triangle tilts back and forth
      gsap.to('[data-wobble]', {
        rotation: 14,
        duration: 2.2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        transformOrigin: '50% 50%',
      })
      // circles breathe
      gsap.to('[data-pulse]', {
        scale: 1.07,
        duration: 1.6,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        transformOrigin: '50% 50%',
      })
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl border-[3px] border-[#672394] bg-[#e8e6d9] p-8 text-[#672394] md:p-9"
    >
      {/* ── decorative confetti — top / center / right only ───────────── */}

      {/* dot-grid patch, center (clear of the name) */}
      <span
        data-float
        aria-hidden
        className="absolute left-[46%] top-[52%] size-16 opacity-80"
        style={{
          backgroundImage: 'radial-gradient(#672394 1.6px, transparent 1.7px)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* big cyan circle, bottom-right */}
      <span
        data-pulse
        aria-hidden
        className="absolute -bottom-10 -right-8 size-40 rounded-full border-[3px] border-[#672394] bg-[#0cb2c0]"
      />

      {/* yellow disc stacked over it */}
      <span
        data-pulse
        aria-hidden
        className="absolute bottom-6 right-10 size-16 rounded-full border-[3px] border-[#672394] bg-[#fad141]"
      />

      {/* hollow circle, center-right */}
      <span
        data-float
        aria-hidden
        className="absolute right-16 top-[46%] size-9 rounded-full border-[3px] border-[#672394]"
      />

      {/* filled hot-pink triangle, top-right */}
      <svg
        data-wobble
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute right-7 top-6 h-14 w-14"
      >
        <polygon
          points="50,6 94,94 6,94"
          fill="#f725a0"
          stroke="#672394"
          strokeWidth="7"
          strokeLinejoin="round"
        />
      </svg>

      {/* plus sign, top-center */}
      <svg
        data-spin
        aria-hidden
        viewBox="0 0 40 40"
        className="absolute right-32 top-8 h-9 w-9"
      >
        <path
          d="M20 4 V36 M4 20 H36"
          fill="none"
          stroke="#0cb2c0"
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>

      {/* squiggle, center */}
      <svg
        data-float
        aria-hidden
        viewBox="0 0 120 24"
        className="absolute left-[42%] top-[34%] h-6 w-28"
      >
        <path
          d="M2 12 C 12 2, 22 22, 32 12 S 52 2, 62 12 S 82 22, 92 12 S 112 2, 118 12"
          fill="none"
          stroke="#f725a0"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

      {/* zigzag, upper-right */}
      <svg
        data-float
        aria-hidden
        viewBox="0 0 120 20"
        className="absolute right-6 top-[30%] h-5 w-24"
      >
        <polyline
          points="2,18 14,2 26,18 38,2 50,18 62,2 74,18"
          fill="none"
          stroke="#fad141"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── content stack (always on top, nothing behind it) ──────────── */}
      <div className="relative flex h-full flex-col justify-between">
        {/* eyebrow on a chunky yellow tag */}
        <span className="w-fit rotate-[-2deg] border-[3px] border-[#672394] bg-[#fad141] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_#672394] md:text-xs">
          Product Designer · 2026
        </span>

        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Laís
            <br />
            <span className="text-[#f725a0] [text-shadow:3px_3px_0_#672394]">
              Arata
            </span>
          </h2>

          <p className="max-w-[26ch] border-l-[3px] border-[#672394] pl-3 text-sm font-medium leading-relaxed">
            Vibrant colors, zero regrets.
          </p>
        </div>
      </div>
    </article>
  )
}
