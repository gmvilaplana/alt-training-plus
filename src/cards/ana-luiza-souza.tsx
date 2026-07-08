// Ana Luiza Souza — Content Designer.
// Travel "postcard" aesthetic: overcast-sky base, airmail striped frame,
// a postage stamp with a fjord illustration, a cancellation postmark, and
// a GSAP hover interaction — the card tilts in 3D as the cursor moves while
// the stamp drifts for parallax depth. Palette: "postcard weather".
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// postcard weather palette
const SKY = '#E7ECEE' // overcast Nordic sky (base)
const INK = '#1F2733' // deep ink navy (text)
const POPPY = '#E1483C' // poppy red
const FJORD = '#3E6E64' // fjord teal
const GOLD = '#D8A93B' // mustard gold

export default function AnaLuizaSouzaCard() {
  const root = useRef<HTMLElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const stamp = useRef<HTMLDivElement>(null)

  useGSAP(
    (_context, contextSafe) => {
      const el = root.current
      if (!el || !contextSafe) return
      const rotX = gsap.quickTo(tilt.current, 'rotationX', { duration: 0.6, ease: 'power3' })
      const rotY = gsap.quickTo(tilt.current, 'rotationY', { duration: 0.6, ease: 'power3' })
      const sx = gsap.quickTo(stamp.current, 'x', { duration: 0.8, ease: 'power3' })
      const sy = gsap.quickTo(stamp.current, 'y', { duration: 0.8, ease: 'power3' })

      const onMove = contextSafe((e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rotY(px * 12)
        rotX(-py * 12)
        sx(px * -20)
        sy(py * -20)
      })
      const onLeave = contextSafe(() => {
        rotX(0)
        rotY(0)
        sx(0)
        sy(0)
      })

      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      }
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl @container"
      style={{ perspective: '900px', backgroundColor: SKY, color: INK }}
    >
      <div
        ref={tilt}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* airmail striped frame */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-2xl p-[7px]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${POPPY} 0 11px, transparent 11px 22px, ${FJORD} 22px 33px, transparent 33px 44px, ${GOLD} 44px 55px, transparent 55px 66px)`,
          }}
        >
          <div className="h-full w-full rounded-xl" style={{ backgroundColor: SKY }} />
        </div>

        {/* depth: soft light + warm vignette so the sky isn't flat */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[7px] rounded-xl"
          style={{
            backgroundImage: `radial-gradient(120% 90% at 18% 12%, rgba(255,255,255,.7), transparent 55%), radial-gradient(140% 120% at 100% 108%, rgba(31,39,51,.14), transparent 60%)`,
          }}
        />

        {/* postage stamp + cancellation postmark (parallax layer) */}
        <div ref={stamp} className="absolute top-[6cqw] right-[7cqw] w-[15cqw] [transform:translateZ(40px)]">
          <div
            className="rotate-3 rounded-[3px] bg-white/85 p-[6%] shadow-md"
            style={{ border: `1px dashed ${INK}55`, outline: `3px solid ${SKY}` }}
          >
            <svg viewBox="0 0 58 70" className="block h-auto w-full">
              <rect x="0" y="0" width="58" height="70" fill={SKY} />
              <circle cx="45" cy="16" r="6.5" fill={GOLD} />
              {/* skyline of buildings */}
              <line x1="18" y1="30" x2="18" y2="23" stroke={INK} strokeWidth="1" />
              <rect x="3" y="41" width="9" height="17" fill={FJORD} />
              <rect x="13" y="30" width="10" height="28" fill={FJORD} />
              <rect x="24.5" y="45" width="8" height="13" fill={POPPY} opacity="0.85" />
              <rect x="34" y="34" width="10" height="24" fill={FJORD} />
              <rect x="45" y="43" width="9" height="15" fill={FJORD} />
              {/* lit windows */}
              {[
                [15, 34], [18.4, 34], [15, 39], [18.4, 39], [36, 38], [39.6, 38],
              ].map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="1.6" height="2.2" fill={SKY} />
              ))}
              <text x="29" y="65" textAnchor="middle" fontSize="7" fontFamily="monospace" letterSpacing="1.5" fill={INK}>
                SP
              </text>
            </svg>
          </div>
          {/* cancellation mark */}
          <svg viewBox="0 0 66 66" className="absolute -bottom-[6cqw] -left-[9cqw] h-[17cqw] w-[17cqw] opacity-45" style={{ color: INK }}>
            <circle cx="33" cy="33" r="24" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="33" cy="33" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M2 30 q8 -4 16 0 t16 0 t16 0 t14 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="M2 37 q8 -4 16 0 t16 0 t16 0 t14 0" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>

        {/* content stack — eyebrow up, name + supporting down.
            Sizes use cqw (container-query units) so the whole composition
            scales with the card width and never clips at small sizes. */}
        <div className="relative flex h-full flex-col justify-between p-[7cqw]">
          {/* header block — eyebrow + metadata line (location · date · brand) */}
          <div className="flex flex-col gap-[1.4cqw]">
            <span className="flex items-center gap-[1.6cqw] whitespace-nowrap text-[2.7cqw] font-semibold uppercase tracking-[0.22em] opacity-80">
              <span aria-hidden className="size-[1.4cqw] shrink-0 rounded-full" style={{ backgroundColor: POPPY }} />
              Post Card · Content Designer
            </span>
            <span className="font-mono text-[2.4cqw] leading-[1.5] tracking-[0.24em]">
              <span style={{ color: FJORD }}>São Paulo · 08 JUL 2026</span>
              <br />
              <span className="opacity-55">Latam · ALT</span>
            </span>
          </div>

          <div className="flex flex-col gap-[1.6cqw]">
            <h2
              className="text-[9.4cqw] leading-[0.9] font-bold tracking-tight whitespace-nowrap uppercase"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ana Luiza Souza
            </h2>
            <span aria-hidden className="mt-[0.6cqw] h-[0.7cqw] w-[12cqw] rounded-full" style={{ backgroundColor: GOLD }} />
            <p className="max-w-[46ch] text-[3.1cqw] leading-relaxed opacity-75">
              Fascinated by the world. Attentive by design.
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
