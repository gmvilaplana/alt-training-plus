// Juan I. Vilaplana — Workshop Facilitator.
// Cyberpunk terminal aesthetic: near-black field, neon-mint accents,
// mono type, scanline overlay, a faux terminal titlebar, a persistent
// RGB-split glitch on the name, a blinking caret, and a live status dot.
// All content is visible at rest — GSAP only ENHANCES (never hides).

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const NEON = '#5ff2c0' // neon mint accent used across the terminal

export default function JuanVilaplanaCard() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // caret: forever blink (visible by default, so it never vanishes).
      gsap.to('.caret', {
        opacity: 0,
        duration: 0.5,
        ease: 'steps(1)',
        repeat: -1,
        yoyo: true,
      })
      // status dot: soft pulse like a live connection.
      gsap.to('.status-dot', {
        opacity: 0.3,
        duration: 0.9,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
      // idle RGB glitch: nudge the colour channels apart in quick bursts.
      gsap.to('.chan-r', {
        x: -3,
        duration: 0.09,
        ease: 'steps(2)',
        repeat: -1,
        repeatDelay: 2.4,
        yoyo: true,
      })
      gsap.to('.chan-b', {
        x: 3,
        duration: 0.09,
        ease: 'steps(2)',
        repeat: -1,
        repeatDelay: 2.4,
        yoyo: true,
      })
    },
    { scope: container },
  )

  return (
    <article
      ref={container}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#070b0d] p-7 font-mono text-(--color-theme-teal-ink) md:p-8"
    >
      {/* depth — radial mint glow from the top-left + directional base */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 0% 0%, rgba(95,242,192,0.16), transparent 55%), linear-gradient(160deg, #0a1417 0%, #070b0d 60%, #05070a 100%)',
        }}
      />
      {/* scanline overlay — thin repeating lines for CRT texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 3px)',
        }}
      />
      {/* decorative neon orb bleeding in from the bottom-right */}
      <span
        aria-hidden
        className="absolute -right-10 -bottom-12 size-48 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(95,242,192,0.18)' }}
      />

      {/* content — terminal titlebar up top, prompt + name anchored down */}
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex flex-col gap-3">
          {/* faux terminal titlebar: traffic lights + host path */}
          <div className="flex items-center justify-between">
            <span aria-hidden className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f56]/80" />
              <span className="size-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="size-2.5 rounded-full bg-[#27c93f]/80" />
            </span>
            <span className="text-[10px] tracking-wide opacity-45">
              juan@latam: ~/alt
            </span>
          </div>
          <span
            className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.28em] uppercase md:text-xs"
            style={{ color: NEON }}
          >
            <span aria-hidden>▓</span> Workshop · Facilitator
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-xs tracking-wide opacity-55">
            <span style={{ color: NEON }}>$</span> whoami --role facilitator
          </span>

          <h2 className="relative text-3xl leading-[0.95] font-semibold tracking-tight text-white md:text-5xl">
            <span
              aria-hidden
              className="chan-r absolute inset-0 -translate-x-px"
              style={{ color: '#ff2e88', mixBlendMode: 'screen' }}
            >
              juan i. vilaplana
            </span>
            <span
              aria-hidden
              className="chan-b absolute inset-0 translate-x-px"
              style={{ color: NEON, mixBlendMode: 'screen' }}
            >
              juan i. vilaplana
            </span>
            <span className="relative">juan i. vilaplana</span>
          </h2>

          <p className="max-w-[32ch] text-xs leading-relaxed opacity-75 md:text-sm">
            <span style={{ color: NEON }}>{'>'}</span> turning git fear into git
            muscle memory
            <span className="caret ml-1 inline-block" style={{ color: NEON }}>
              ▋
            </span>
          </p>

          <span className="mt-1 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase opacity-60">
            <span
              className="status-dot inline-block size-1.5 rounded-full"
              style={{ backgroundColor: NEON }}
            />
            online · Latam · ALT
          </span>
        </div>
      </div>
    </article>
  )
}
