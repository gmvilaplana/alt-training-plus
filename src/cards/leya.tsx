// LEYA — Galactic Product Designer.
// Deep-space card: Orbitron name in spaced uppercase, a twinkling canvas
// starfield, a soft blue/gold lightsaber glow, and a lightsaber cursor.
// Hover the card to play an inside-the-card Star Wars opening crawl.

import { useEffect, useRef } from 'react'

// Lightsaber cursor — blue glowing blade + black hilt, hotspot at the tip (8 2).
const SABER =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iMCAwIDE2IDQyIj48cmVjdCB4PSI2IiB5PSIyIiB3aWR0aD0iNCIgaGVpZ2h0PSIyOCIgcng9IjIiIGZpbGw9IiM0ZmMzZjciLz48cmVjdCB4PSI3LjEiIHk9IjIiIHdpZHRoPSIxLjgiIGhlaWdodD0iMjgiIHJ4PSIwLjkiIGZpbGw9IiNlYWY4ZmYiLz48cmVjdCB4PSI1IiB5PSIzMCIgd2lkdGg9IjYiIGhlaWdodD0iMTAiIHJ4PSIxLjIiIGZpbGw9IiMwYTBhMGEiLz48cmVjdCB4PSI1IiB5PSIzMyIgd2lkdGg9IjYiIGhlaWdodD0iMS40IiBmaWxsPSIjNGE0YTRhIi8+PC9zdmc+'

// Scoped styles — Orbitron face, lightsaber glow, and the opening-crawl
// animation. Everything is namespaced under `.leya-card` so it can't leak
// into the rest of the gallery.
const STYLES = `
.leya-card {
  container-type: inline-size; /* lets the name/tagline scale with the tile */
  font-family: "Orbitron", system-ui, sans-serif;
  cursor: url("${SABER}") 8 2, auto;
  box-shadow:
    0 0 2px rgba(255, 232, 31, 0.4),
    0 0 14px rgba(79, 195, 247, 0.55),
    0 0 38px rgba(79, 195, 247, 0.3),
    inset 0 0 26px rgba(79, 195, 247, 0.12);
  transition: box-shadow 0.4s ease;
}
.leya-card:hover {
  box-shadow:
    0 0 3px rgba(255, 232, 31, 0.6),
    0 0 22px rgba(79, 195, 247, 0.8),
    0 0 54px rgba(79, 195, 247, 0.45),
    inset 0 0 30px rgba(79, 195, 247, 0.18);
}
.leya-name {
  /* Star Wars logo treatment — hollow letters: transparent fill + bold
     gold outline (#ffe81f) with a soft gold glow. Fluid size/tracking so
     "LEYA" fills the tile without overflowing a narrow gallery column. */
  font-size: clamp(2.6rem, 12cqw, 4.4rem);
  letter-spacing: 0.06em;
  color: transparent;
  -webkit-text-stroke: 2px #ffe81f;
  text-stroke: 2px #ffe81f;
  text-shadow: 0 0 14px rgba(255, 232, 31, 0.55), 0 0 32px rgba(255, 232, 31, 0.3);
}

/* Opening-crawl overlay — contained by the card, never fixed. */
.leya-crawl {
  opacity: 0;
  visibility: hidden;
  perspective: 300px;
  transition: opacity 0.5s ease, visibility 0.5s ease;
}
.leya-card:hover .leya-crawl {
  opacity: 1;
  visibility: visible;
}
.leya-crawl-inner {
  /* anchored to the bottom edge so the first line enters the card the
     instant you hover — no long blank lead-in */
  bottom: 0;
  left: 7%;
  right: 7%;
  transform-origin: 50% 100%;
  transform: rotateX(25deg) translateY(100%);
  -webkit-mask-image: linear-gradient(to top, #000 45%, transparent 92%);
  mask-image: linear-gradient(to top, #000 45%, transparent 92%);
}
/* run the scroll only while hovering so it restarts each time */
.leya-card:hover .leya-crawl-inner {
  animation: leya-crawl 13s linear infinite;
}
@keyframes leya-crawl {
  0%   { transform: rotateX(25deg) translateY(100%); }
  100% { transform: rotateX(25deg) translateY(-170%); }
}
@media (prefers-reduced-motion: reduce) {
  .leya-card:hover .leya-crawl-inner { animation: none; transform: rotateX(25deg) translateY(-10%); }
}
`

type Star = { x: number; y: number; r: number; a: number; t: number; s: number }

export default function LeyaCard() {
  const stars = useRef<HTMLCanvasElement>(null)
  const audioCtx = useRef<AudioContext | null>(null)
  const lastPlay = useRef(0)

  // Lightsaber activation hum — fully synthesized with the Web Audio API
  // (no audio files). A quick "vwoom" sweep settles into a wobbling low hum
  // with a harmonic layer for body. Created/resumed inside the handler to
  // satisfy browser autoplay policies; debounced to 800ms between plays.
  const playLightsaberSound = () => {
    const t = performance.now()
    if (t - lastPlay.current < 800) return // debounce
    lastPlay.current = t

    if (!audioCtx.current) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctor) return
      audioCtx.current = new Ctor()
    }
    const ctx = audioCtx.current
    if (ctx.state === 'suspended') void ctx.resume()

    const now = ctx.currentTime
    const ATTACK = 0.15 // "vwoom" sweep
    const HUM = 0.6 // continuous hum
    const end = now + ATTACK + HUM

    // Master gain envelope: fast attack (0.01s) → sustain → 0.3s fade-out.
    const master = ctx.createGain()
    master.gain.setValueAtTime(0.0001, now)
    master.gain.linearRampToValueAtTime(0.9, now + 0.01)
    master.gain.setValueAtTime(0.9, end - 0.3)
    master.gain.exponentialRampToValueAtTime(0.0001, end)

    // Gentle lowpass to keep the saw warm rather than buzzy.
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.value = 900
    master.connect(lp).connect(ctx.destination)

    // Body oscillator: sweep 80→180Hz, then settle to a ~90Hz hum.
    const main = ctx.createOscillator()
    main.type = 'sawtooth'
    main.frequency.setValueAtTime(80, now)
    main.frequency.exponentialRampToValueAtTime(180, now + ATTACK)
    main.frequency.exponentialRampToValueAtTime(90, now + ATTACK + 0.12)
    main.connect(master)

    // LFO: wobble the hum ±3Hz at 8Hz.
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 8
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 3
    lfo.connect(lfoGain).connect(main.frequency)

    // Harmonic layer (~180Hz, lower gain) for richness.
    const harm = ctx.createOscillator()
    harm.type = 'sine'
    harm.frequency.value = 180
    const harmGain = ctx.createGain()
    harmGain.gain.value = 0.15
    harm.connect(harmGain).connect(master)

    for (const osc of [main, lfo, harm]) {
      osc.start(now)
      osc.stop(end + 0.05)
    }
  }

  // Browsers block audio until a real user gesture — a hover (mouseenter)
  // does NOT count. So we unlock (create + resume) the AudioContext on the
  // first click/keypress/touch anywhere on the page; after that the hover
  // hum plays. Still nothing is created on page load.
  useEffect(() => {
    const unlock = () => {
      if (!audioCtx.current) {
        const Ctor =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (Ctor) audioCtx.current = new Ctor()
      }
      void audioCtx.current?.resume()
    }
    window.addEventListener('pointerdown', unlock)
    window.addEventListener('keydown', unlock)
    return () => {
      window.removeEventListener('pointerdown', unlock)
      window.removeEventListener('keydown', unlock)
      void audioCtx.current?.close()
    }
  }, [])

  // Twinkling starfield drawn on a canvas sized to the card (no images).
  useEffect(() => {
    const el = stars.current
    if (!el) return
    const ctx = el.getContext('2d')
    if (!ctx) return
    const canvas = el // local handle so we mutate the DOM node, not the ref

    let field: Star[] = []
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      const count = Math.max(40, Math.floor((canvas.clientWidth * canvas.clientHeight) / 1400))
      field = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.3,
        t: i, // deterministic phase offset, no shared global
        s: Math.random() * 0.02 + 0.006,
      }))
    }

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      for (const st of field) {
        st.t += st.s
        const alpha = st.a * (0.6 + 0.4 * Math.sin(st.t))
        ctx.beginPath()
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <article
      className="leya-card relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#4fc3f7]/35 bg-[#080c18]/90 text-[#f4f7ff]"
      aria-label="Business card for Leya, galactic product designer"
    >
      <style>{STYLES}</style>

      {/* 1. deep-space base */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,#0b1020_0%,#05060d_60%,#000_100%)]"
      />

      {/* 2. twinkling starfield */}
      <canvas ref={stars} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* 3. base content — name + tagline, centered */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <h2 className="leya-name font-black leading-none" onMouseEnter={playLightsaberSound}>
          LEYA
        </h2>
        <p className="mt-[4cqw] max-w-[30ch] font-normal uppercase leading-relaxed tracking-[0.16em] text-[#9fb6d4]" style={{ fontSize: 'clamp(0.55rem, 2.6cqw, 0.78rem)' }}>
          Designing the future of the galaxy, one screen at a time.
        </p>
      </div>

      {/* 4. opening-crawl overlay — revealed on hover */}
      <div aria-hidden className="leya-crawl absolute inset-0 z-20 flex justify-center overflow-hidden bg-black">
        <div className="leya-crawl-inner absolute text-center font-semibold italic leading-relaxed text-[#ffe81f]" style={{ fontSize: 'clamp(0.6rem, 3.2cqw, 0.92rem)' }}>
          <div className="mb-2 font-extrabold tracking-[0.08em]" style={{ fontSize: 'clamp(0.74rem, 3.8cqw, 1.1rem)' }}>
            Episode I — A Designer Awakens
          </div>
          In a universe overflowing with broken interfaces and dark patterns, one
          designer rose from the Outer Rim. Armed with Figma and an iron will,
          Leya set out to craft experiences that would bring balance to the Force
          — and to the UX.
        </div>
      </div>
    </article>
  )
}
