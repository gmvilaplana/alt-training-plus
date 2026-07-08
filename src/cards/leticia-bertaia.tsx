// LETICIA BERTAIA — Designer. A toy aquarium: bright turquoise water, googly
// cartoon fish that chase the cursor like a little school, swaying seaweed,
// rising bubbles and colourful gravel. GSAP gives the name gravity — it plops
// in, bounces, then bobs underwater.

import { useRef, type MouseEvent } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const NAME = 'Leticia Bertaia'
const BUBBLES = [
  { left: '16%', size: 13, bottom: '14%' },
  { left: '33%', size: 8, bottom: '26%' },
  { left: '52%', size: 10, bottom: '10%' },
  { left: '70%', size: 7, bottom: '22%' },
  { left: '86%', size: 12, bottom: '16%' },
]
const PEBBLES = ['#ff7a6b', '#ffcf5c', '#4fe0d0', '#b06cf0', '#ff9f68', '#5cc9ff', '#ff7a6b', '#ffcf5c', '#4fe0d0', '#ff9f68', '#b06cf0', '#5cc9ff', '#ff7a6b', '#ffcf5c']
const FISH = [
  { body: '#ff8a3d', fin: '#ef6d1f', pos: 'right-[9%] top-[15%]', w: 'w-16', dur: 0.5, ox: -26, oy: -8 },
  { body: '#c579f2', fin: '#a24fe0', pos: 'left-[62%] top-[60%]', w: 'w-12', dur: 0.85, ox: 42, oy: 34 },
]

function Fish({ body, fin }: { body: string; fin: string }) {
  return (
    <svg viewBox="0 0 60 40" className="block h-auto w-full">
      <path d="M22 20 L4 8 L4 32 Z" fill={fin} />
      <path d="M30 9 Q36 -1 44 9" fill={fin} />
      <ellipse cx="35" cy="20" rx="21" ry="13" fill={body} stroke="rgba(4,32,30,0.55)" strokeWidth="1.5" />
      <path d="M27 12 Q30 20 27 28" stroke={fin} strokeWidth="4" fill="none" opacity="0.7" />
      <circle cx="46" cy="16" r="6" fill="#fff" />
      <circle cx="47.6" cy="16.6" r="2.8" fill="#08201e" />
      <circle cx="45" cy="14.4" r="1.1" fill="#fff" />
      <path d="M42 27 Q46 31.5 50 26" stroke="#08201e" strokeWidth="1.7" fill="none" strokeLinecap="round" />
    </svg>
  )
}

export default function LeticiaBertaiaCard() {
  const root = useRef<HTMLElement>(null)
  const els = useRef<HTMLElement[]>([])
  const movers = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc; fx: gsap.QuickToFunc }[]>([])

  const { contextSafe } = useGSAP(
    () => {
      // gravity — the name plops in with a wobble, then bobs underwater
      const tl = gsap.timeline({
        onComplete: () =>
          gsap.to('.drop-char', { y: '+=5', rotation: '+=2', duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: { each: 0.1, from: 'random' } }),
      })
      tl.from('.drop-char', { y: -210, rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: 1.1, ease: 'bounce.out', stagger: 0.05 })

      // splash ripple, seaweed sway, rising bubbles, gentle fish wiggle
      gsap.fromTo('[data-ripple]', { scale: 0.2, opacity: 0.6, xPercent: -50, yPercent: -50 }, { scale: 2.4, opacity: 0, duration: 2.2, ease: 'power2.out', repeat: -1, repeatDelay: 1.3 })
      gsap.to('[data-weed]', { rotation: 7, transformOrigin: 'bottom center', duration: 2.3, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.5 })
      gsap.to('[data-fish] svg', { y: 3, rotation: 2, duration: 1.8, ease: 'sine.inOut', repeat: -1, yoyo: true, stagger: 0.4 })
      gsap.utils.toArray<HTMLElement>('[data-bubble]').forEach((b, i) =>
        gsap.to(b, { y: -260 - i * 6, opacity: 0, duration: 4 + (i % 3), delay: i * 0.6, repeat: -1, ease: 'power1.in' }),
      )

      // smoothed cursor-followers, one per fish (each with its own lag)
      els.current = gsap.utils.toArray<HTMLElement>('[data-fish]')
      movers.current = els.current.map((el, i) => ({
        x: gsap.quickTo(el, 'x', { duration: FISH[i].dur, ease: 'power3' }),
        y: gsap.quickTo(el, 'y', { duration: FISH[i].dur, ease: 'power3' }),
        fx: gsap.quickTo(el, 'scaleX', { duration: 0.25, ease: 'power2' }),
      }))
    },
    { scope: root },
  )

  // fish chase the pointer as a little school, flipping to face where they head
  const onMove = contextSafe((e: MouseEvent<HTMLElement>) => {
    const r = root.current!.getBoundingClientRect()
    const mx = e.clientX - r.left
    const my = e.clientY - r.top
    movers.current.forEach((m, i) => {
      const el = els.current[i]
      const tx = mx - (el.offsetLeft + el.offsetWidth / 2) + FISH[i].ox
      const ty = my - (el.offsetTop + el.offsetHeight / 2) + FISH[i].oy
      m.x(tx)
      m.y(ty)
      m.fx(tx < 0 ? -1 : 1)
    })
  })

  // let the school drift back to its resting spots
  const onLeave = contextSafe(() => movers.current.forEach((m) => (m.x(0), m.y(0))))

  return (
    <article ref={root} onMouseMove={onMove} onMouseLeave={onLeave} className="relative aspect-[16/10] overflow-hidden rounded-2xl p-8 text-white md:p-9">
      {/* 1. bright, cheerful water + surface glow + light shaft */}
      <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #35e1d1 0%, #16b6ac 38%, #0a8194 72%, #075d74 100%)' }} />
      <div aria-hidden className="absolute inset-0" style={{ background: 'radial-gradient(120% 55% at 50% -12%, rgba(220,255,250,0.5), transparent 60%)' }} />
      <div aria-hidden className="absolute -top-8 left-1/4 h-[150%] w-24 -rotate-12 bg-white/15 blur-2xl" />

      {/* 2. waterline + splash ripple */}
      <div aria-hidden className="absolute inset-x-0 top-[22%] h-px bg-white/55 shadow-[0_0_12px_2px_rgba(255,255,255,0.35)]" />
      <span data-ripple aria-hidden className="absolute left-1/2 top-[22%] size-14 rounded-full border-2 border-white/60" />

      {/* 3. bubbles */}
      {BUBBLES.map((b, i) => (
        <span key={i} data-bubble aria-hidden className="absolute rounded-full bg-white/35 ring-1 ring-white/50" style={{ left: b.left, bottom: b.bottom, width: b.size, height: b.size }} />
      ))}

      {/* 4. googly cartoon fish — they follow the cursor */}
      {FISH.map((f, i) => (
        <div key={i} data-fish aria-hidden className={`absolute ${f.pos} ${f.w} drop-shadow-[0_3px_6px_rgba(0,0,0,0.2)]`}>
          <Fish body={f.body} fin={f.fin} />
        </div>
      ))}

      {/* 5. swaying seaweed */}
      <div data-weed aria-hidden className="pointer-events-none absolute bottom-2 left-[8%] h-20 w-8">
        <Seaweed />
      </div>
      <div data-weed aria-hidden className="pointer-events-none absolute bottom-2 right-[10%] h-28 w-11">
        <Seaweed />
      </div>

      {/* 6. colourful gravel bed */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 flex items-end">
        {PEBBLES.map((c, i) => (
          <span key={i} className="flex-1 rounded-t-full" style={{ background: c, height: 14 + (i % 4) * 6, marginLeft: -3 }} />
        ))}
      </div>

      {/* 7. glass tank frame */}
      <div aria-hidden className="pointer-events-none absolute inset-2.5 rounded-xl border-2 border-white/25" />
      <div aria-hidden className="pointer-events-none absolute inset-x-2.5 top-2.5 h-6 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent" />

      {/* content — eyebrow up top, name + supporting down low */}
      <div className="relative flex h-full flex-col justify-between">
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
          <span aria-hidden className="size-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          Designer
        </span>

        {/* name — centered between the eyebrow and the supporting text */}
        <h2
          className="text-4xl leading-[0.95] font-black tracking-tight text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.4)] md:text-6xl"
          style={{ fontFamily: 'var(--font-display)' }}
          aria-label={NAME}
        >
          {NAME.split('').map((ch, i) =>
            ch === ' ' ? (
              <span key={i} aria-hidden className="inline-block w-3 md:w-4" />
            ) : (
              <span key={i} aria-hidden className="drop-char inline-block">
                {ch}
              </span>
            ),
          )}
        </h2>

        <div className="flex flex-col gap-2.5">
          <p className="max-w-[32ch] text-sm font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            A designer who makes good ideas swim.
          </p>

          <span className="text-[10px] font-bold tracking-[0.25em] text-white/70">
            BUBBLES INCLUDED
          </span>
        </div>
      </div>
    </article>
  )
}

function Seaweed() {
  return (
    <svg viewBox="0 0 40 80" className="h-full w-full">
      <path d="M13 80 C4 60 24 52 12 32 C4 16 20 8 15 0" stroke="#37c26a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M27 80 C35 62 18 54 28 36 C34 22 22 14 28 4" stroke="#2aa758" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  )
}
