// Kevin Coudures — Design Manager (concept-card variant).
// A full-bleed cinematic mixed-reality portrait (public/kevin-portrait.jpg)
// overlaid with technical crop-marks, mono annotations, glass gloss and a
// pill CTA. Fluted-glass bars flip in 3D as the cursor sweeps across, and a
// subtle pulsating sphere replaces the native cursor.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function KevinCoudures2Card() {
  const root = useRef<HTMLElement>(null)

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(root.current, { autoAlpha: 0, scale: 0.97, duration: 0.7, ease: 'power3.out' })
      gsap.from('.anno', { autoAlpha: 0, duration: 0.6, stagger: 0.06, delay: 0.2 })
      gsap.from('.copy', { autoAlpha: 0, y: 16, stagger: 0.09, duration: 0.6, ease: 'power2.out', delay: 0.35 })
      gsap.set('.orb', { xPercent: -50, yPercent: -50, autoAlpha: 0 })
      gsap.set('.orbit', { rotationX: 72 })
      gsap.to('.orbit', { rotationZ: 360, transformOrigin: '50% 50%', duration: 4, ease: 'none', repeat: -1 })
      gsap.to('.orb-beat', { scale: 1.18, transformOrigin: '50% 50%', duration: 0.85, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.fromTo(
        '.orb-ping',
        { scale: 0.7, autoAlpha: 0.4 },
        { scale: 2.4, autoAlpha: 0, transformOrigin: '50% 50%', duration: 1.4, ease: 'power1.out', repeat: -1 },
      )
    },
    { scope: root },
  )

  const onMove = contextSafe((e: React.MouseEvent) => {
    const b = root.current!.getBoundingClientRect()
    const fx = (e.clientX - b.left) / b.width

    // futuristic sphere cursor follows the pointer
    gsap.to('.orb', { x: e.clientX - b.left, y: e.clientY - b.top, duration: 0.15, ease: 'power3.out' })

    // ripple of flipping bars centered on the cursor
    const bars = root.current!.querySelectorAll('.bar')
    const active = fx * (bars.length - 1)
    const sigma = 1.6
    bars.forEach((bar, i) => {
      const d = i - active
      const rot = 72 * (d / sigma) * Math.exp(-(d * d) / (2 * sigma * sigma))
      gsap.to(bar, { rotateY: rot, duration: 0.45, ease: 'power2.out', overwrite: 'auto' })
    })
  })
  const onEnter = contextSafe(() => gsap.to('.orb', { autoAlpha: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }))
  const onLeave = contextSafe(() => {
    gsap.to('.bar', { rotateY: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto' })
    gsap.to('.orb', { autoAlpha: 0, scale: 0.4, duration: 0.25, ease: 'power2.in' })
  })

  return (
    <article
      ref={root}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative aspect-[16/10] cursor-none overflow-hidden rounded-2xl bg-[#0a0b0d] font-mono text-white"
    >
      {/* futuristic sphere cursor */}
      <div className="orb pointer-events-none absolute left-0 top-0 z-30 size-6">
        <span aria-hidden className="orb-ping absolute inset-0 rounded-full bg-cyan-300/25" />
        <span aria-hidden className="orb-beat absolute inset-0 rounded-full bg-cyan-300/20 blur-md" />
        <span
          aria-hidden
          className="orb-beat absolute inset-[5px] rounded-full shadow-[inset_0_0_6px_#c9fbffaa,0_0_10px_#4fd3ff88] [background:radial-gradient(circle_at_34%_28%,#eafeff,#5fd8ff_44%,#0f74ad_76%,#06304d)]"
        />
        <span aria-hidden className="orbit absolute inset-0 rounded-full border border-cyan-200/35" />
      </div>

      {/* full-bleed cinematic mixed-reality portrait */}
      <img
        src="/kevin-portrait.jpg"
        alt="Kevin Coudures wearing a mixed-reality headset"
        className="shot absolute inset-0 size-full scale-110 object-cover object-[50%_28%]"
      />
      {/* cyan grade + legibility gradient toward the copy */}
      <div aria-hidden className="absolute inset-0 [background:radial-gradient(70%_45%_at_50%_50%,#04070fbb_0%,transparent_62%),radial-gradient(75%_45%_at_50%_18%,#1f66c422_0%,transparent_60%)]" />
      {/* fluted-glass bars — strongest in the center, fading to the edges */}
      <div aria-hidden className="absolute inset-0 flex [perspective:900px]">
        {Array.from({ length: 14 }, (_, i) => {
          const d = Math.abs(i / 13 - 0.5) * 2 // 0 center → 1 edges
          const intensity = 1 - d * d // ease-out falloff
          const blur = (0.4 + intensity * 4.6).toFixed(1)
          return (
            <span
              key={i}
              className="bar h-full flex-1 will-change-transform [backface-visibility:hidden] [background:linear-gradient(90deg,rgba(255,255,255,0.18)_0%,rgba(255,255,255,0.02)_24%,transparent_50%,rgba(0,0,0,0.16)_76%,rgba(0,0,0,0.3)_100%)]"
              style={{
                opacity: 0.12 + intensity * 0.88,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
              }}
            />
          )
        })}
      </div>
      {/* glass: top gloss highlight + inner rim */}
      <div aria-hidden className="absolute inset-0 rounded-2xl [background:linear-gradient(160deg,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.04)_16%,transparent_38%)]" />
      <div aria-hidden className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15" />

      {/* technical guide lines + crop marks */}
      <div aria-hidden className="pointer-events-none absolute inset-5 [background:linear-gradient(#ffffff1f_0_0)_left/1px_100%_no-repeat,linear-gradient(#ffffff1f_0_0)_right/1px_100%_no-repeat,linear-gradient(#ffffff1f_0_0)_top/100%_1px_no-repeat,linear-gradient(#ffffff1f_0_0)_bottom/100%_1px_no-repeat]" />
      {['left-4 top-3', 'right-4 top-3', 'left-4 bottom-3', 'right-4 bottom-3'].map((p) => (
        <span key={p} aria-hidden className={`absolute ${p} text-white/30`}>
          +
        </span>
      ))}

      {/* corner mono annotations */}
      <span className="anno absolute bottom-4 left-8 text-[9px] tracking-[0.25em] text-white/45 md:text-[10px]">// CARD CONCEPT</span>
      <span className="anno absolute bottom-4 right-8 text-[9px] tracking-[0.25em] text-white/45 md:text-[10px]">// KEVIN COUDURES</span>

      {/* copy block */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 px-6 text-center">
        <span className="copy text-[9px] tracking-[0.3em] text-white/70 uppercase">Design Manager · MMXXVI</span>
        <h2 className="copy [font-family:var(--font-display)] text-4xl leading-[0.95] font-light tracking-tight drop-shadow-[0_2px_12px_#000c] md:text-5xl">
          Kevin Coudures
        </h2>
        <p className="copy max-w-[36ch] text-[11px] leading-relaxed text-white/80 drop-shadow-[0_1px_8px_#000c] md:text-xs">
          Rewiring systems into motion.
        </p>
        <button className="copy mt-1 cursor-none rounded-full bg-white/10 px-5 py-2 text-[11px] tracking-wide text-white shadow-[0_4px_16px_#0007] ring-1 ring-white/30 backdrop-blur-md transition hover:bg-white/20">
          Enter the flow state ↗
        </button>
      </div>
    </article>
  )
}
