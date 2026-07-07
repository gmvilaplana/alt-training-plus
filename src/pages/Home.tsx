import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import HeroCard from '../components/HeroCard'

type HeroCardSpec = {
  text: string
  rotation: number
  sizeClass: string
  paddingClass: string
  hoverBg: string
  hoverInk?: string
  /** Floating drift: y amplitude in px, r in deg, full cycle duration s, delay s */
  drift: { y: number; r: number; duration: number; delay: number }
  /** Shadow width pulse: duration s, delay s — each card pulses on its own phase */
  shadow: { duration: number; delay: number }
}

const cards: HeroCardSpec[] = [
  {
    text: 'LATAM',
    rotation: -4,
    sizeClass: 'text-7xl md:text-9xl',
    paddingClass: 'px-14 py-4 md:px-20 md:py-5',
    hoverBg: '#ef8665', // peach
    hoverInk: '#2a0f06',
    drift: { y: 10, r: 0.9, duration: 2.0, delay: 0 },
    shadow: { duration: 1.4, delay: 0 },
  },
  {
    text: 'ALT',
    rotation: 3,
    sizeClass: 'text-7xl md:text-9xl',
    paddingClass: 'px-14 py-4 md:px-20 md:py-5',
    hoverBg: '#263c65', // navy
    hoverInk: '#cfd9ef',
    drift: { y: 12, r: 1.3, duration: 2.4, delay: 0.2 },
    shadow: { duration: 1.7, delay: 0.35 },
  },
  {
    text: 'TRAINING',
    rotation: -2,
    sizeClass: 'text-7xl md:text-9xl',
    paddingClass: 'px-12 py-4 md:px-18 md:py-5',
    hoverBg: '#f5d795', // amber
    hoverInk: '#3a2a05',
    drift: { y: 9, r: 0.7, duration: 2.2, delay: 0.4 },
    shadow: { duration: 1.5, delay: 0.7 },
  },
]

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useGSAP(
    () => {
      const heroCards = gsap.utils.toArray<HTMLElement>('.hero-card')
      const shadows = gsap.utils.toArray<HTMLElement>('.hero-shadow')

      // Resting rotations first so GSAP owns the transform from the start.
      heroCards.forEach((card) => {
        const r = Number(card.dataset.rotation ?? 0)
        gsap.set(card, { rotation: r })
      })

      // Entrance — slide in only (no opacity hide) so a stalled animation
      // never leaves the elements invisible.
      gsap.from('.hero-card', {
        y: 28,
        stagger: 0.14,
        duration: 0.75,
        ease: 'power2.out',
      })
      gsap.from('.hero-cta', {
        y: 14,
        delay: 0.95,
        duration: 0.5,
        ease: 'power2.out',
      })

      // Idle floating per card.
      heroCards.forEach((card, i) => {
        const spec = cards[i]?.drift ?? { y: 8, r: 0.8, duration: 2.2, delay: 0 }
        const base = Number(card.dataset.rotation ?? 0)
        gsap.to(card, {
          y: spec.y,
          rotation: base + spec.r,
          duration: spec.duration,
          delay: 1.1 + spec.delay,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      // Shadow: offset down-right, grows on BOTH sides subtly.
      // transformOrigin center → small symmetric breathe outward.
      shadows.forEach((sh, i) => {
        const spec = cards[i]?.shadow ?? { duration: 1.4, delay: 0 }
        gsap.set(sh, {
          x: 6,
          y: 14,
          transformOrigin: 'center center',
        })
        gsap.to(sh, {
          scaleX: 1.06,
          duration: spec.duration,
          delay: 0.5 + spec.delay,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    },
    { scope: root },
  )

  return (
    <main
      ref={root}
      className="relative flex min-h-screen flex-col items-center justify-center gap-14 px-6 py-12"
    >
      <div className="flex flex-col items-center gap-3">
        {cards.map((c) => (
          <HeroCard key={c.text} {...c} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('/gallery')}
        className="hero-cta rounded-2xl bg-(--color-accent) px-10 py-4 text-base font-semibold text-(--color-paper-ink) transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_18px_rgba(0,229,204,0.25)]"
      >
        Start activity
      </button>
    </main>
  )
}
