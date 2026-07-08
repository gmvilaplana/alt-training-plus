import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Brutalist dark card. EVERY letter is a monospaced VARIABLE font (Roboto Mono,
// wght 100–700); each glyph's weight tracks its distance to the cursor —
// closest = heaviest. Mono = constant advance width across weights, so the
// morph never reflows and the name is measured to always fit the card.
const NAME = ['GUI', 'FERREIRA']
const MAX_CHARS = 8 // longest line, drives the fit math
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@100..700&display=swap'

// split text into weight-reactive letters
function VarText({ children, w = 400 }: { children: string; w?: number }) {
  return (
    <>
      {children.split('').map((ch, i) => (
        <span
          key={i}
          data-l
          style={{ '--w': w, fontVariationSettings: '"wght" var(--w)' } as React.CSSProperties}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </>
  )
}

export default function GuilhermeFerreiraCard() {
  const cardRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const card = cardRef.current
      const nameEl = nameRef.current
      if (!card || !nameEl) return

      // load the variable font (one file, no other file touched)
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = FONT_HREF
      document.head.appendChild(link)

      // every letter on the card, not just the name
      const letters = Array.from(card.querySelectorAll<HTMLElement>('[data-l]'))
      const setW = letters.map((el) => gsap.quickTo(el, '--w', { duration: 0.3, ease: 'power2.out' }))

      // HARD RULE: name always fits — size from measured card box, both axes
      const fit = () => {
        const cw = card.clientWidth
        const ch = card.clientHeight
        const widthFit = (cw - cw * 0.16) / (MAX_CHARS * 0.62) // mono glyph ≈ 0.62em
        const heightFit = (ch - ch * 0.34) / (NAME.length * 0.98)
        nameEl.style.fontSize = `${Math.min(widthFit, heightFit)}px`
      }
      fit()
      const ro = new ResizeObserver(fit)
      ro.observe(card)

      // idle: rolling weight wave so the type breathes untouched
      const idle = gsap.fromTo(
        letters,
        { '--w': 200 },
        { '--w': 650, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
          stagger: { each: 0.05, from: 'start', yoyo: true, repeat: -1 } },
      )

      const onMove = (e: PointerEvent) => {
        const R = card.clientWidth * 0.55
        letters.forEach((el, i) => {
          const r = el.getBoundingClientRect()
          const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2))
          setW[i](gsap.utils.clamp(100, 700, gsap.utils.mapRange(0, R, 700, 100, dist)))
        })
      }
      const onEnter = () => idle.pause()
      const onLeave = () => {
        gsap.to(letters, { '--w': 380, duration: 0.5, ease: 'power2.out',
          onComplete: () => { idle.restart(true) } })
      }
      card.addEventListener('pointerenter', onEnter)
      card.addEventListener('pointermove', onMove)
      card.addEventListener('pointerleave', onLeave)

      return () => {
        card.removeEventListener('pointerenter', onEnter)
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
        idle.kill()
        ro.disconnect()
        link.remove()
      }
    },
    { scope: cardRef },
  )

  return (
    <article
      ref={cardRef}
      style={{ fontFamily: "'Roboto Mono', ui-monospace, monospace" }}
      className="relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-none bg-[#0b0b0b] p-8 text-[#efece6] md:p-9"
    >
      {/* brutalist grid wash + hard offset frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg,#fff 0 1px,transparent 1px 44px),repeating-linear-gradient(90deg,#fff 0 1px,transparent 1px 44px)',
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-3 border-2 border-[#efece6]" />

      {/* eyebrow — solid block, mono, hoverable */}
      <div className="relative flex items-center justify-between text-xs uppercase tracking-[0.2em]">
        <span className="bg-(--color-theme-peach) px-2 py-1 text-(--color-theme-peach-ink)">
          <VarText w={560}>Product Designer</VarText>
        </span>
        <span className="opacity-60">
          <VarText w={560}>MMXXVI</VarText>
        </span>
      </div>

      {/* name — variable-weight letters, measured to fit */}
      <div ref={nameRef} className="relative select-none leading-[0.98] tracking-tight">
        {NAME.map((word) => (
          <div key={word} className="flex">
            <VarText w={380}>{word}</VarText>
          </div>
        ))}
      </div>

      {/* supporting — mono, raw, hoverable */}
      <p className="relative text-sm tracking-tight text-[#efece6]/70">
        <span className="text-(--color-theme-peach)">// </span>
        <VarText w={380}>Product and Motion Designer</VarText>
      </p>
    </article>
  )
}
