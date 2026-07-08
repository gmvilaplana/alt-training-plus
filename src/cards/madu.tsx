// Madu — Designer.
// Chic + playful: soft pink→white gradient, embossed inner frame, uppercase
// serif name layered over gently floating blobs, footer micro-text.
// GSAP entrance + idle float (no useEffect).

import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function MaduCard() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      // entrance — content settles in with a soft rise
      gsap.from('[data-rise]', {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.09,
      })

      // living gradient — center it via GSAP (so rotation/scale/x/y compose
      // with the centering), then a faster endless swirl + breathing scale
      gsap.set('[data-gradient]', { xPercent: -50, yPercent: -50, transformOrigin: 'center' })
      gsap.to('[data-gradient]', {
        rotation: 360,
        duration: 5.5,
        repeat: -1,
        ease: 'none',
      })
      gsap.to('[data-gradient]', {
        scale: 1.2,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // follow the cursor — glide the gradient hotspot toward the pointer
      const el = root.current!
      const moveX = gsap.quickTo('[data-gradient]', 'x', { duration: 0.9, ease: 'power2.out' })
      const moveY = gsap.quickTo('[data-gradient]', 'y', { duration: 0.9, ease: 'power2.out' })
      // photo acts as the cursor — glide it toward the pointer position
      const photoX = gsap.quickTo('[data-photo]', 'x', { duration: 0.18, ease: 'power3.out' })
      const photoY = gsap.quickTo('[data-photo]', 'y', { duration: 0.18, ease: 'power3.out' })
      gsap.set('[data-photo]', { xPercent: -50, yPercent: -50 })
      const showPhoto = gsap.quickTo('[data-photo]', 'opacity', { duration: 0.25, ease: 'power2.out' })
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        moveX(px * 180)
        moveY(py * 180)
        photoX(e.clientX - r.left)
        photoY(e.clientY - r.top)
      }
      const onEnter = (e: PointerEvent) => {
        const r = el.getBoundingClientRect()
        // start the cow at the cursor so it doesn't slide in from a corner
        gsap.set('[data-photo]', { x: e.clientX - r.left, y: e.clientY - r.top })
        showPhoto(1)
      }
      const onLeave = () => {
        moveX(0)
        moveY(0)
        showPhoto(0)
      }
      el.addEventListener('pointerenter', onEnter)
      el.addEventListener('pointermove', onMove)
      el.addEventListener('pointerleave', onLeave)

      // gentle idle float — blobs drift on their own timelines
      gsap.to('[data-blob="a"]', {
        x: 24,
        y: 20,
        scale: 1.08,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
      gsap.to('[data-blob="b"]', {
        x: -20,
        y: -18,
        scale: 1.12,
        duration: 8.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      return () => {
        el.removeEventListener('pointerenter', onEnter)
        el.removeEventListener('pointermove', onMove)
        el.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: root },
  )

  return (
    <article
      ref={root}
      className="relative aspect-[16/10] cursor-none overflow-hidden rounded-2xl p-8 md:p-9"
      style={{
        backgroundColor: '#7a0450',
        color: '#ffffff',
        fontFamily:
          '"Akzidenz-Grotesk", "Akzidenz Grotesk", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      {/* load the display font for the name (scoped to this card) */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Mea+Culpa&display=swap');`}</style>

      {/* animated gradient layer — oversized so the slow swirl never shows an edge */}
      <div
        aria-hidden
        data-gradient
        className="absolute left-1/2 top-1/2 h-[240%] w-[240%]"
        style={{
          background:
            'radial-gradient(60% 60% at 32% 28%, #fbb6d0 0%, #f98680 26%, #f65590 48%, #fa4571 68%, #da0985 88%, #7a0450 100%)',
        }}
      />

      {/* soft floating blobs */}
      <span
        aria-hidden
        data-blob="a"
        className="absolute -top-16 -right-12 size-56 rounded-full bg-white/60 blur-3xl"
      />
      <span
        aria-hidden
        data-blob="b"
        className="absolute -bottom-14 -left-10 size-52 rounded-full blur-3xl"
        style={{ backgroundColor: 'rgba(250,69,113,0.55)' }}
      />

      {/* film-grain overlay — inline SVG noise, blended for a richer surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* content stack — eyebrow up, tagline down, name centered over the middle */}
      <div className="relative flex h-full flex-col items-center justify-between text-center">
        <div
          data-rise
          className="flex items-center gap-2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] opacity-80 md:text-[11px]"
        >
          <span aria-hidden className="text-sm leading-none">♥</span>
          Product Design Intern · MMXXVI
          <span aria-hidden className="text-sm leading-none">♥</span>
        </div>

        <p
          data-rise
          className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] opacity-80 md:text-[11px]"
        >
          Treat People With Matcha
        </p>
      </div>

      {/* display name — centered in the dead middle of the card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <h2
          data-rise
          className="text-7xl font-medium leading-[0.85] tracking-tight md:text-9xl"
          style={{
            fontFamily: '"Mea Culpa", "Snell Roundhand", "Segoe Script", cursive',
            color: '#ffffff',
          }}
        >
          Madu
        </h2>
      </div>

      {/* hover cursor — the matcha cow follows the pointer (public/matcha-cow.png) */}
      <img
        src="/matcha-cow.png"
        alt="Madu's matcha cow"
        data-photo
        className="pointer-events-none absolute left-0 top-0 z-10 w-14 object-contain opacity-0 drop-shadow-[0_6px_16px_rgba(74,3,48,0.45)] md:w-16"
      />
    </article>
  )
}
