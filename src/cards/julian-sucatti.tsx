// Julian Sucatti — F1 racing card. Black field, neon red/blue speed streaks,
// a waving checkered flag (SVG checker warped by turbulence). GSAP entrance +
// continuous idle; on hover the name rockets off the right edge with an
// F1 rev (Web Audio), and the streaks light up to full.

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function JulianSucattiCard() {
  const root = useRef<HTMLElement>(null)
  const name = useRef<HTMLHeadingElement>(null)
  const w1 = useRef<HTMLSpanElement>(null) // "Julian"
  const w2 = useRef<HTMLSpanElement>(null) // "Sucatti"
  const streakIdle = useRef<gsap.core.Tween | null>(null)
  const audioCtx = useRef<AudioContext | null>(null)

  // synth an F1 engine rev with the Web Audio API (no audio file needed):
  // stacked detuned saws for the engine, a lowpass that opens as it revs,
  // and a filtered-noise whoosh for the speed.
  const rev = () => {
    try {
      audioCtx.current ??= new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const ctx = audioCtx.current
      if (ctx.state === 'suspended') void ctx.resume()
      const t = ctx.currentTime
      const dur = 0.95

      const master = ctx.createGain()
      master.gain.setValueAtTime(0.0001, t)
      master.gain.exponentialRampToValueAtTime(0.3, t + 0.06)
      master.gain.setValueAtTime(0.3, t + 0.5)
      master.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      master.connect(ctx.destination)

      // lowpass opens as the engine climbs, then closes — the "rev brighten"
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.Q.value = 6
      filter.frequency.setValueAtTime(380, t)
      filter.frequency.exponentialRampToValueAtTime(4800, t + 0.38)
      filter.frequency.exponentialRampToValueAtTime(1400, t + dur)
      filter.connect(master)

      // engine — detuned saw stack, launch contour then ease off
      for (const detune of [-9, 0, 7, 19]) {
        const o = ctx.createOscillator()
        o.type = 'sawtooth'
        o.detune.value = detune
        o.frequency.setValueAtTime(58, t)
        o.frequency.exponentialRampToValueAtTime(320, t + 0.26) // launch
        o.frequency.exponentialRampToValueAtTime(240, t + 0.44) // shift
        o.frequency.exponentialRampToValueAtTime(140, t + dur) // ease off
        o.connect(filter)
        o.start(t)
        o.stop(t + dur + 0.02)
      }

      // speed whoosh — bandpassed white noise swell
      const noise = ctx.createBufferSource()
      const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
      const data = buf.getChannelData(0)
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
      noise.buffer = buf
      const bp = ctx.createBiquadFilter()
      bp.type = 'bandpass'
      bp.frequency.value = 1300
      bp.Q.value = 0.7
      const ng = ctx.createGain()
      ng.gain.setValueAtTime(0.0001, t)
      ng.gain.exponentialRampToValueAtTime(0.07, t + 0.22)
      ng.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      noise.connect(bp).connect(ng).connect(master)
      noise.start(t)
      noise.stop(t + dur)
    } catch {
      /* audio unavailable — ignore */
    }
  }

  const { contextSafe } = useGSAP(
    () => {
      gsap.set('.f1-flag', { skewY: -4 })

      // entrance
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.f1-streak', { xPercent: 170, opacity: 0, duration: 0.6, stagger: 0.06 })
        .from('.f1-flag', { xPercent: 40, opacity: 0, duration: 0.8 }, '<')
        .from('.f1-eyebrow', { y: -14, opacity: 0, duration: 0.4 }, '<0.1')
        .from(name.current, { x: -90, opacity: 0, skewX: 14, duration: 0.7 }, '<')
        .from('.f1-support', { y: 16, opacity: 0, duration: 0.5 }, '<0.2')

      // idle — streaks sit dim + latent (hover speeds this up), flag ripples
      streakIdle.current = gsap.fromTo(
        '.f1-streak',
        { opacity: 0.4 },
        { opacity: 0.8, x: 9, duration: 1.3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.4, stagger: { each: 0.12, from: 'random' } },
      )
      gsap.to('.f1-flag', { skewX: 4, x: 6, duration: 2.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.3 })
      gsap.to('.f1-disp', { attr: { scale: 42 }, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.3 })
    },
    { scope: root },
  )

  // hover — rev + the two words race, blast ALL the way off the right edge
  // until they fully disappear (Sucatti chases Julian), then re-enter from
  // the left. Streaks light up to full.
  const launch = contextSafe(() => {
    rev()
    gsap
      .timeline()
      .to([w1.current, w2.current], { x: -18, skewX: 8, duration: 0.1, ease: 'power2.in' })
      .to(w1.current, { x: 560, skewX: -24, opacity: 0, duration: 0.36, ease: 'power3.in' })
      .to(w2.current, { x: 680, skewX: -26, opacity: 0, duration: 0.36, ease: 'power3.in' }, '<0.1')
      .set([w1.current, w2.current], { x: -280, skewX: 18 })
      .to([w1.current, w2.current], { x: 0, skewX: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.06 })

    streakIdle.current?.timeScale(3.2)
    gsap.fromTo(
      '.f1-streak',
      { scaleX: 1 },
      { scaleX: 1.35, xPercent: -22, duration: 0.22, ease: 'power3.out', yoyo: true, repeat: 1, stagger: { each: 0.03, from: 'end' } },
    )
  })

  const reset = contextSafe(() => streakIdle.current?.timeScale(1))

  return (
    <article
      ref={root}
      onMouseEnter={launch}
      onMouseLeave={reset}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black p-8 text-white md:p-9"
    >
      {/* depth glow */}
      <span aria-hidden className="absolute top-1/3 -left-16 size-56 rounded-full bg-[#e10600]/30 blur-3xl" />
      <span aria-hidden className="absolute bottom-1/4 right-1/4 size-52 rounded-full bg-[#e10600]/25 blur-3xl" />

      {/* waving checkered flag (SVG checker warped by a turbulence filter) */}
      <svg
        aria-hidden
        className="f1-flag absolute inset-y-0 right-0 h-full w-[58%] opacity-70 mix-blend-screen"
        viewBox="0 0 300 200"
        preserveAspectRatio="xMidYMid slice"
        style={{
          WebkitMaskImage: 'linear-gradient(to left, black 35%, transparent 100%)',
          maskImage: 'linear-gradient(to left, black 35%, transparent 100%)',
        }}
      >
        <defs>
          <pattern id="jsChecker" width="22" height="22" patternUnits="userSpaceOnUse">
            <rect width="11" height="11" fill="#fff" />
            <rect x="11" y="11" width="11" height="11" fill="#fff" />
          </pattern>
          <filter id="jsWave" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.008 0.022" numOctaves={2} seed={4} result="n" />
            <feDisplacementMap className="f1-disp" in="SourceGraphic" in2="n" scale={20} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <rect width="300" height="200" fill="url(#jsChecker)" filter="url(#jsWave)" />
      </svg>

      {/* neon speed streaks — soft bloom behind + sharp glowing cores */}
      <div aria-hidden className="absolute inset-0">
        <span className="f1-streak absolute top-[26%] right-0 h-3 w-3/4 origin-right rounded-full bg-gradient-to-l from-[#e10600]/55 to-transparent blur-md" />
        <span className="f1-streak absolute top-[44%] right-0 h-3 w-4/5 origin-right rounded-full bg-gradient-to-l from-[#1463ff]/50 to-transparent blur-md" />
        <span className="f1-streak absolute top-[60%] right-0 h-2.5 w-3/5 origin-right rounded-full bg-gradient-to-l from-[#e10600]/40 to-transparent blur-md" />
        <span className="f1-streak absolute top-[24%] right-0 h-[3px] w-3/4 origin-right rounded-full bg-gradient-to-l from-[#ff2b25] via-[#e10600]/80 to-transparent shadow-[0_0_14px_#e10600]" />
        <span className="f1-streak absolute top-[31%] right-0 h-px w-2/3 origin-right rounded-full bg-gradient-to-l from-white via-white/80 to-transparent shadow-[0_0_12px_#fff]" />
        <span className="f1-streak absolute top-[42%] right-0 h-[3px] w-[85%] origin-right rounded-full bg-gradient-to-l from-[#3b82ff] via-[#1463ff]/80 to-transparent shadow-[0_0_14px_#1463ff]" />
        <span className="f1-streak absolute top-[50%] right-0 h-px w-1/2 origin-right rounded-full bg-gradient-to-l from-white/85 to-transparent shadow-[0_0_10px_#fff]" />
        <span className="f1-streak absolute top-[58%] right-0 h-[3px] w-3/5 origin-right rounded-full bg-gradient-to-l from-[#ff2b25] to-transparent shadow-[0_0_12px_#e10600]" />
        <span className="f1-streak absolute top-[66%] right-0 h-px w-2/5 origin-right rounded-full bg-gradient-to-l from-[#1463ff]/90 to-transparent shadow-[0_0_10px_#1463ff]" />
      </div>

      {/* content stack — gap keeps a minimum breathing room above the name */}
      <div className="relative flex h-full flex-col justify-between gap-5">
        <span className="f1-eyebrow flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/90 [text-shadow:0_2px_6px_#000000f2] md:text-xs">
          <span aria-hidden className="size-1.5 rounded-sm bg-[#e10600] shadow-[0_0_6px_#e10600]" />
          Team GM2 · Driver N°01 · 2026
        </span>

        <div className="flex flex-col gap-3.5">
          <h2
            ref={name}
            className="flex flex-col gap-1 leading-[0.82] uppercase italic tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {/* top word — black weight, ~20% smaller, like "RACING" */}
            <span
              ref={w1}
              className="inline-block origin-left text-5xl text-white md:text-7xl"
              style={{ fontWeight: 900 }}
            >
              Julian
            </span>
            {/* dominant black-weight word — like "FLAG" */}
            <span
              ref={w2}
              className="inline-block origin-left text-6xl text-[#e10600] md:text-8xl"
              style={{ fontWeight: 900 }}
            >
              Sucatti
            </span>
          </h2>
          {/* footer line with the F1 start-lights motif — like "BACKGROUND" */}
          <div className="f1-support flex items-center gap-2.5">
            <span aria-hidden className="flex gap-1">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="size-1.5 rounded-full bg-[#e10600] shadow-[0_0_6px_#e10600]" />
              ))}
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white md:text-sm">
              Lights out. Go.
            </p>
          </div>
        </div>
      </div>

      {/* telemetry rule */}
      <span
        aria-hidden
        className="absolute right-8 bottom-6 left-8 h-px bg-gradient-to-r from-transparent via-white/25 to-[#e10600]/60"
      />
    </article>
  )
}
