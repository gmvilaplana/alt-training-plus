// Agatha Shibuya — Designer.
// Cyberpunk: Edgerunners styling, inverted — neon-yellow field, black name,
// hot-pink text, neon-pink accents. Rubik Glitch name that flicks blue, a
// Japanese marquee, an animated hazard stripe, and a full-on TV-static
// glitch storm on hover (GSAP).

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const NEON = '#ff2fd6' // neon-pink accents
const HOT = '#ff1493' // hot-pink text
const BLUE = '#00d4ff' // neon-blue glitch
const MARQUEE = '日本語がわかりません　✦　'.repeat(8)
// vivid, anisotropic fractal noise → rainbow wavy analog snow (on-hover)
const STATIC =
  "url(\"data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.012 0.42' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='2.6'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")"

export default function AgathaShibuyaCard() {
  const rootRef = useRef<HTMLElement>(null)
  const faceRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const stripeRef = useRef<HTMLDivElement>(null)
  const staticRef = useRef<HTMLDivElement>(null)
  const rollRef = useRef<HTMLDivElement>(null)
  const turbRef = useRef<SVGFETurbulenceElement>(null)
  const dispRef = useRef<SVGFEDisplacementMapElement>(null)

  useGSAP(
    () => {
      const root = rootRef.current!
      const face = faceRef.current!

      gsap.from(face, { autoAlpha: 0, y: 14, duration: 0.7, ease: 'power2.out' })
      gsap.to('.a-orb', { scale: 1.18, opacity: 0.55, duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.a-cursor', { opacity: 0, duration: 0.55, repeat: -1, yoyo: true, ease: 'steps(1)' })
      // name blinks black → neon blue → black in the blink of an eye
      gsap
        .timeline({ repeat: -1, repeatDelay: 1 })
        .set('.a-name', { color: BLUE })
        .set('.a-name', { color: '#000' }, '+=0.04')
      gsap.to('.a-glitch', {
        x: () => gsap.utils.random([-3, -2, 2, 3]),
        opacity: () => gsap.utils.random([0.5, 0.9]),
        duration: 0.01,
        repeat: -1,
        repeatRefresh: true,
        repeatDelay: 1.8,
        yoyo: true,
        ease: 'none',
      })
      // infinite marquee, left → right (two identical halves = seamless)
      gsap.fromTo(marqueeRef.current, { xPercent: -50 }, { xPercent: 0, duration: 24, repeat: -1, ease: 'none' })
      // hazard stripe scrolls right → left (28.28px = one 45° stripe period)
      gsap.fromTo(
        stripeRef.current,
        { backgroundPosition: '0px 0px' },
        { backgroundPosition: '-56.57px 0px', duration: 2, repeat: -1, ease: 'none' },
      )

      // ── on-hover TV-static storm ──────────────────────────────────
      // dense rainbow snow: fast frames, big position jumps, near-opaque
      const staticTween = gsap.to(staticRef.current, {
        paused: true,
        duration: 0.045,
        repeat: -1,
        repeatRefresh: true,
        ease: 'steps(1)',
        backgroundPosition: () => `${gsap.utils.random(-200, 200)}px ${gsap.utils.random(-200, 200)}px`,
        opacity: () => gsap.utils.random(0.6, 1),
      })
      // vertical-hold "roll bar" sweeping down the screen
      const rollTween = gsap.fromTo(
        rollRef.current,
        { yPercent: -140 },
        { yPercent: 340, duration: 0.55, repeat: -1, ease: 'none', paused: true },
      )
      // whole picture jitters/tears like a mistuned CRT
      const jumpTween = gsap.to(face, {
        paused: true,
        duration: 0.05,
        repeat: -1,
        repeatRefresh: true,
        ease: 'steps(1)',
        x: () => gsap.utils.random(-7, 7),
        y: () => gsap.utils.random(-4, 4),
        skewX: () => gsap.utils.random(-2.5, 2.5),
      })
      const fx = [staticTween, rollTween, jumpTween]
      const onEnter = () => {
        gsap.set([staticRef.current, rollRef.current], { autoAlpha: 1 })
        gsap.set(face, { filter: 'url(#a-warp)' })
        // ramp the wavy displacement up + churn the noise seed so it "flows"
        gsap.to(dispRef.current, { attr: { scale: 30 }, duration: 0.2, ease: 'power2.out' })
        gsap.fromTo(turbRef.current, { attr: { seed: 1 } }, { attr: { seed: 90 }, duration: 3, repeat: -1, ease: 'none' })
        fx.forEach((t) => t.play())
      }
      const onLeave = () => {
        fx.forEach((t) => t.pause())
        gsap.killTweensOf(turbRef.current)
        gsap.to(face, { x: 0, y: 0, skewX: 0, duration: 0.15 })
        gsap.to(dispRef.current, { attr: { scale: 0 }, duration: 0.2, onComplete: () => gsap.set(face, { filter: 'none' }) })
        gsap.to([staticRef.current, rollRef.current], { autoAlpha: 0, duration: 0.2 })
      }
      root.addEventListener('mouseenter', onEnter)
      root.addEventListener('mouseleave', onLeave)
      return () => {
        root.removeEventListener('mouseenter', onEnter)
        root.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: rootRef },
  )

  return (
    <article
      ref={rootRef}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#fcee0a] font-mono text-black"
    >
      {/* React 19 hoists + dedupes this into <head> — loads Rubik Glitch */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap" precedence="default" />

      {/* wavy displacement filter — applied to the whole face while hovered */}
      <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
        <filter id="a-warp" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.01 0.38" numOctaves={2} seed={2} result="t" />
          <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="t" scale={0} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <div ref={faceRef} className="relative h-full w-full p-8 md:p-9">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(115% 85% at 88% 6%, rgba(255,47,214,0.28), transparent 52%), radial-gradient(95% 85% at 4% 104%, rgba(0,0,0,0.20), transparent 58%), #fcee0a',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{ background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.14) 0 1px, transparent 1px 3px)' }}
        />
        <div
          ref={stripeRef}
          aria-hidden
          className="absolute top-0 right-0 left-0 h-2"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, ${NEON} 0 10px, #000 10px 20px)` }}
        />
        <span aria-hidden className="a-orb absolute -bottom-16 -left-12 size-52 rounded-full blur-3xl" style={{ background: `${NEON}55` }} />
        <span aria-hidden className="pointer-events-none absolute top-6 left-4 size-5 border-t border-l border-black" />
        <span aria-hidden className="pointer-events-none absolute top-6 right-4 size-5 border-t border-r" style={{ borderColor: NEON }} />

        <div className="relative flex h-full flex-col justify-between pb-7">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] md:text-xs" style={{ color: HOT }}>
            <span className="a-orb size-1.5 rounded-full" style={{ background: NEON, boxShadow: `0 0 8px 2px ${NEON}` }} />
            ONLINE · SYS.MMXXVI · DESIGN
          </span>

          <div className="flex flex-col gap-3">
            <h2 className="relative text-5xl leading-[0.9] tracking-tight md:text-6xl" style={{ fontFamily: '"Rubik Glitch", system-ui' }}>
              <span className="a-glitch absolute inset-0" style={{ color: BLUE }} aria-hidden>
                Agatha
                <br />
                Shibuya
              </span>
              <span className="a-name relative" style={{ color: '#000' }}>
                Agatha
                <br />
                Shibuya
              </span>
            </h2>
            <p className="flex items-center gap-1 text-sm leading-relaxed" style={{ color: HOT }}>
              <span>&gt;</span>
              Feed the machineee!
              <span className="a-cursor ml-0.5 inline-block h-4 w-[7px]" style={{ background: NEON }} aria-hidden />
            </p>
          </div>
        </div>

        {/* looping "I don't know japanese" marquee, pinned to the bottom edge */}
        <div
          className="absolute inset-x-0 bottom-0 flex h-7 items-center overflow-hidden border-t border-black/25"
          style={{ background: 'rgba(0,0,0,0.06)' }}
        >
          <div ref={marqueeRef} className="flex w-max whitespace-nowrap text-xs tracking-[0.35em]" style={{ color: HOT }}>
            <span>{MARQUEE}</span>
            <span aria-hidden>{MARQUEE}</span>
          </div>
        </div>

        {/* rainbow static snow + rolling black tear — hidden until hover */}
        <div
          ref={staticRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0"
          style={{ backgroundImage: STATIC }}
        />
        <div
          ref={rollRef}
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-30 h-9 opacity-0"
          style={{
            backgroundColor: '#000',
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 24px, rgba(255,255,255,0.9) 24px 36px, transparent 36px 66px)',
          }}
        />
      </div>
    </article>
  )
}
