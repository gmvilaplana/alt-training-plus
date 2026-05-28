// POL — Full-Stack Developer.
// Cyberpunk terminal aesthetic: near-black field, neon-mint accents, mono
// type, scanline overlay, glitching name, and a GSAP-driven blinking cursor.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function PolCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // blinking status dot + caret — hard on/off, terminal-style
      gsap.to('[data-blink]', {
        opacity: 0.15,
        duration: 0.55,
        ease: 'steps(1)',
        repeat: -1,
        yoyo: true,
      })

      // intermittent glitch: jitter the two chromatic layers, then settle
      const glitch = gsap.timeline({ repeat: -1, repeatDelay: 2.4 })
      glitch
        .to('[data-glitch]', { x: -3, skewX: -8, duration: 0.05 })
        .to('[data-glitch]', { x: 3, skewX: 6, duration: 0.05 })
        .to('[data-glitch]', { x: 0, skewX: 0, duration: 0.05 })
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#05080b] p-8 font-mono text-(--color-accent) md:p-9"
    >
      {/* depth — radial mint glow so the black isn't flat */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(120%_90%_at_85%_-10%,rgba(0,229,204,0.18),transparent_55%)]"
      />

      {/* scanline overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(0,255,224,0.06) 0px, rgba(0,255,224,0.06) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* terminal frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2.5 rounded-xl border border-(--color-accent)/20"
      />

      {/* content stack — prompt up top, name + skill down low */}
      <div className="relative flex h-full flex-col justify-between">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-(--color-accent)/80 md:text-xs">
          <span
            data-blink
            aria-hidden
            className="size-1.5 rounded-full bg-(--color-accent-bright) shadow-[0_0_8px_var(--color-accent-bright)]"
          />
          &gt; SESSION · MMXXVI
        </span>

        <div className="flex flex-col gap-3">
          {/* glitching display name — three stacked chromatic layers */}
          <h2 className="relative text-4xl font-bold tracking-[0.08em] text-(--color-accent-bright) md:text-6xl">
            <span
              data-glitch
              aria-hidden
              className="absolute inset-0 text-[#ff2e88]/70 mix-blend-screen"
            >
              POL
            </span>
            <span
              data-glitch
              aria-hidden
              className="absolute inset-0 text-(--color-accent)/70 mix-blend-screen"
            >
              POL
            </span>
            <span className="relative">POL</span>
          </h2>

          <p className="max-w-[30ch] text-sm leading-relaxed text-(--color-accent)/70">
            <span className="text-(--color-accent)/45">$ </span>
            Turning coffee into clean commits.
            <span data-blink aria-hidden className="ml-0.5 inline-block">
              ▮
            </span>
          </p>

          <span className="text-[10px] tracking-[0.3em] text-(--color-accent)/45">
            FULL-STACK DEVELOPER · GM2 · ALT
          </span>
        </div>
      </div>
    </article>
  )
}
