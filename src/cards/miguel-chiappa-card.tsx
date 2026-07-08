// Miguel Chiappa — Designer.
// A playable Pioneer CDJ-2000 deck. PLAY pauses/resumes the platter, waveform
// and playhead; CUE snaps the playhead back to the start; the HI/MID/LOW knobs
// turn on drag (and reshape the waveform); the tempo fader scrubs BPM + speed.
// Dark deck body over a red glow that follows the cursor, tilting in 3D.

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const BARS = Array.from({ length: 72 }, (_, i) =>
  18 + Math.abs(Math.sin(i * 0.55) + Math.sin(i * 0.19) * 0.7 + Math.sin(i * 1.3) * 0.3) * 62,
)
const KNOBS = ['HI', 'MID', 'LOW'] as const

export default function MiguelChiappaCard() {
  const root = useRef<HTMLElement>(null)
  const tw = useRef<Record<string, gsap.core.Tween>>({})
  const scratch = useRef({ active: false, angle: 0, prog: 0 })
  const [playing, setPlaying] = useState(true)
  const [tempo, setTempo] = useState(140)
  const [knobs, setKnobs] = useState([-40, 0, 40])

  const { contextSafe } = useGSAP(
    () => {
      gsap.from(root.current, { autoAlpha: 0, y: 16, duration: 0.5, ease: 'power2.out' })
      gsap.to('.cdj-cuelight', { opacity: 0.25, duration: 0.5, ease: 'steps(1)', repeat: -1, yoyo: true })
      tw.current.platter = gsap.to('.cdj-platter', { rotate: 360, transformOrigin: '50% 50%', duration: 3.2, ease: 'none', repeat: -1 })
      tw.current.wave = gsap.to('.wave-bar', { scaleY: () => gsap.utils.random(0.35, 1), duration: 0.28, ease: 'sine.inOut', stagger: { each: 0.015, from: 'center' }, repeat: -1, yoyo: true, repeatRefresh: true })
      tw.current.playhead = gsap.fromTo('.cdj-playhead', { left: '4%' }, { left: '96%', duration: 6, ease: 'none', repeat: -1 })
      tw.current.needle = gsap.fromTo('.cdj-needle', { left: '2%' }, { left: '98%', duration: 6, ease: 'none', repeat: -1 })
    },
    { scope: root },
  )

  const setRunning = (run: boolean) => {
    setPlaying(run)
    Object.values(tw.current).forEach((t) => (run ? t.play() : t.pause()))
  }
  const togglePlay = () => setRunning(!playing)
  const cue = () => { tw.current.playhead?.progress(0); tw.current.needle?.progress(0); setRunning(false) }

  // scratch — grab the jog wheel to spin it and scrub the playback position
  const scratchStart = contextSafe((e: React.PointerEvent) => {
    e.stopPropagation()
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2
    const angleAt = (x: number, y: number) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI
    scratch.current = { active: true, angle: angleAt(e.clientX, e.clientY), prog: tw.current.needle?.progress() ?? 0 }
    ;[tw.current.platter, tw.current.playhead, tw.current.needle].forEach((t) => t?.pause())
    const move = (ev: PointerEvent) => {
      let d = angleAt(ev.clientX, ev.clientY) - scratch.current.angle
      if (d > 180) d -= 360
      if (d < -180) d += 360
      scratch.current.angle += d
      gsap.set('.cdj-platter', { rotate: `+=${d}` })
      scratch.current.prog = gsap.utils.clamp(0, 1, scratch.current.prog + d / 720)
      tw.current.playhead?.progress(scratch.current.prog)
      tw.current.needle?.progress(scratch.current.prog)
    }
    const up = () => {
      scratch.current.active = false
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      if (!playing) return
      // rebuild the spin from wherever the platter ended up, then resume playback
      const cur = Number(gsap.getProperty('.cdj-platter', 'rotation')) || 0
      tw.current.platter?.kill()
      tw.current.platter = gsap.to('.cdj-platter', { rotate: cur + 360, transformOrigin: '50% 50%', duration: 3.2, ease: 'none', repeat: -1 })
      tw.current.platter.timeScale(tempo / 140)
      tw.current.playhead?.play()
      tw.current.needle?.play()
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  })

  // vertical pointer-drag helper — reports pixels dragged upward
  const drag = (e: React.PointerEvent, onDelta: (d: number) => void) => {
    e.stopPropagation()
    const y0 = e.clientY
    const move = (ev: PointerEvent) => onDelta(y0 - ev.clientY)
    const up = () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up) }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }
  const turnKnob = (i: number) => (e: React.PointerEvent) => {
    const start = knobs[i]
    drag(e, (d) => setKnobs((k) => k.map((v, j) => (j === i ? gsap.utils.clamp(-150, 150, start + d * 1.5) : v))))
  }
  const dragTempo = (e: React.PointerEvent) => {
    const start = tempo
    drag(e, (d) => {
      const t = gsap.utils.clamp(120, 160, start + d * 0.2)
      setTempo(t)
      Object.values(tw.current).forEach((x) => x.timeScale(t / 140))
    })
  }

  const onMove = contextSafe((e: React.MouseEvent) => {
    const el = root.current
    if (!el || scratch.current.active) return
    const r = el.getBoundingClientRect()
    const gx = ((e.clientX - r.left) / r.width) * 100
    const gy = ((e.clientY - r.top) / r.height) * 100
    gsap.to(el, { rotateY: (gx / 100 - 0.5) * 12, rotateX: -(gy / 100 - 0.5) * 12, duration: 0.4, ease: 'power2.out' })
    gsap.to('.cdj-glow', { '--gx': `${gx}%`, '--gy': `${gy}%`, opacity: 0.9, duration: 0.5, ease: 'power2.out' })
  })
  const onLeave = contextSafe(() => {
    gsap.to(root.current, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' })
    gsap.to('.cdj-glow', { opacity: 0, duration: 0.6, ease: 'power3.out' })
  })

  const eq = 1 + (knobs[0] + knobs[1] + knobs[2]) / 900
  const faderTop = ((160 - tempo) / 40) * 100

  return (
    <article
      ref={root}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative aspect-[16/10] touch-none overflow-hidden rounded-2xl border border-white/12 bg-[#0a1018] p-7 font-mono text-[#dfe4ea] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] [perspective:900px] [transform-style:preserve-3d] md:p-8"
    >
      <div aria-hidden className="cdj-glow absolute inset-0 opacity-0 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,30%),rgba(63,180,224,0.6)_0%,rgba(20,90,150,0.28)_38%,transparent_66%)]" />
      {/* CDJ-style bezel line just inside the edge */}
      <div aria-hidden className="pointer-events-none absolute inset-2.5 rounded-xl border border-[#3fb4e0]/20" />

      <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: 'translateZ(35px)' }}>
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-[0.22em] whitespace-nowrap uppercase text-[#ff9b2e] md:text-xs">
          <span className="flex items-center gap-2">
            <span className={`cdj-cuelight size-2 rounded-full bg-[#ff2e4d] shadow-[0_0_8px_#ff2e4d] ${playing ? '' : 'opacity-40'}`} />
            Pioneer · CDJ-2000
          </span>
          <span className="text-[#5ffbc1]">{tempo.toFixed(1)} BPM</span>
        </div>

        <div className="relative overflow-hidden rounded-md border border-white/10 bg-black/55 px-4 py-3 shadow-[inset_0_0_20px_rgba(0,0,0,0.7)]">
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[9px] font-semibold uppercase tracking-[0.3em] text-[#ff9b2e]/80">Now Playing:</span>
              <h2 className="[font-family:var(--font-display)] text-xl leading-[0.9] font-bold tracking-tight text-white uppercase drop-shadow-[0_0_14px_rgba(95,251,193,0.5)] md:text-3xl">
                Miguel Chiappa
              </h2>
            </div>
            <span className="text-[10px] tracking-widest text-[#5ffbc1]/70">{playing ? 'PLAYING' : 'CUE'}</span>
          </div>
          {/* main waveform — mirrored around a center axis, fixed center playhead */}
          <div className="relative mt-3 h-16">
            <span aria-hidden className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-[#4fd8ff]/20" />
            <div className="flex h-full items-center gap-px" style={{ filter: `brightness(${eq})` }}>
              {BARS.map((h, i) => (
                <span key={i} className="wave-bar flex-1 rounded-[1px] [background:linear-gradient(to_bottom,#cdf6ff_0%,#3fb4e0_50%,#cdf6ff_100%)]" style={{ height: `${h}%` }} />
              ))}
            </div>
            <span aria-hidden className="cdj-needle absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-[#ff2e4d] shadow-[0_0_8px_#ff2e4d]" />
          </div>
          {/* full-track overview strip with a moving position marker */}
          <div className="relative mt-2 h-2 overflow-hidden rounded-sm bg-black/60">
            <div aria-hidden className="absolute inset-0 opacity-50 [background:repeating-linear-gradient(90deg,#2b8fb8_0_1px,transparent_1px_3px)]" />
            <span className="cdj-playhead absolute top-0 h-full w-[2px] bg-[#ff9b2e] shadow-[0_0_6px_#ff9b2e]" />
          </div>
          <p className="mt-1.5 text-[10px] tracking-wide text-[#dfe4ea]/55 md:text-xs">
            <span className="text-[#ff9b2e]">▸</span> dubstep-electronic set · all future
          </p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-end gap-2.5">
            <button onClick={cue} className="grid size-12 place-items-center rounded-md border border-[#ff9b2e]/50 bg-[#ff9b2e]/15 text-[9px] font-bold tracking-widest text-[#ff9b2e] transition active:scale-90 md:size-14">
              CUE
            </button>
            <button onClick={togglePlay} className={`grid size-12 place-items-center rounded-md border text-lg transition active:scale-90 md:size-14 ${playing ? 'border-[#35e06a]/60 bg-[#35e06a]/20 text-[#35e06a] shadow-[0_0_16px_rgba(53,224,106,0.4)]' : 'border-white/20 bg-white/5 text-white/70'}`}>
              {playing ? '❚❚' : '▶'}
            </button>
          </div>

          <div className="mb-1 flex items-end gap-3">
            {KNOBS.map((k, i) => (
              <div key={k} className="flex flex-col items-center gap-1">
                <span onPointerDown={turnKnob(i)} className="relative grid size-7 cursor-grab touch-none place-items-center rounded-full border border-white/15 bg-[#22252c] shadow-[inset_0_2px_3px_rgba(0,0,0,0.6)] active:cursor-grabbing md:size-8">
                  <span className="absolute h-1/2 w-[2px] origin-bottom bg-[#5ffbc1]" style={{ transform: `rotate(${knobs[i]}deg)` }} />
                </span>
                <span className="text-[8px] tracking-widest text-white/45">{k}</span>
              </div>
            ))}
            <div onPointerDown={dragTempo} className="relative ml-1 h-14 w-5 cursor-ns-resize touch-none rounded-full border border-white/20 bg-black/70 shadow-[inset_0_0_6px_rgba(0,0,0,0.8)]">
              <span aria-hidden className="absolute top-1 bottom-1 left-1/2 w-px -translate-x-1/2 bg-white/20" />
              <span className="absolute left-1/2 flex h-5 w-7 items-center justify-center rounded-sm bg-gradient-to-b from-[#c2c8d2] to-[#4a4f59] shadow-[0_1px_4px_rgba(0,0,0,0.7)] ring-1 ring-black/50" style={{ top: `${faderTop}%`, transform: 'translate(-50%,-50%)' }}>
                <span aria-hidden className="h-px w-4 bg-[#3fb4e0] shadow-[0_0_5px_#3fb4e0]" />
              </span>
            </div>
          </div>

          <div onPointerDown={scratchStart} className="relative grid size-24 cursor-grab touch-none place-items-center rounded-full bg-[radial-gradient(circle_at_38%_32%,#3a3e46,#141519_70%)] shadow-[0_0_0_3px_rgba(255,255,255,0.05),0_10px_24px_rgba(0,0,0,0.6)] select-none active:cursor-grabbing md:size-28">
            <div className="cdj-platter absolute inset-2 rounded-full border border-white/10 [background:repeating-conic-gradient(rgba(255,255,255,0.05)_0deg_6deg,transparent_6deg_12deg)]">
              <span className="absolute top-1 left-1/2 h-3 w-[2px] -translate-x-1/2 rounded bg-[#ff2e4d] shadow-[0_0_8px_#ff2e4d]" />
            </div>
            <div className="relative grid size-12 place-items-center rounded-full bg-black text-center text-[7px] leading-tight tracking-widest text-[#5ffbc1] md:size-14">
              MC<br />DECK
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
