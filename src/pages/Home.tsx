import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import HeroCard from '../components/HeroCard'

export default function Home() {
  const root = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useGSAP(
    () => {
      gsap.from('.hero-card', {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      })
      gsap.from('.hero-cta', {
        y: 12,
        opacity: 0,
        delay: 0.8,
        duration: 0.5,
        ease: 'power2.out',
      })
    },
    { scope: root },
  )

  return (
    <main
      ref={root}
      className="relative flex min-h-screen flex-col items-center justify-center gap-12 px-6 py-12"
    >
      <div className="flex flex-col items-center gap-3">
        <HeroCard
          text="GM2"
          rotation={-4}
          sizeClass="text-6xl md:text-8xl"
          paddingClass="px-10 py-3 md:px-12 md:py-4"
        />
        <HeroCard
          text="ALT"
          rotation={3}
          sizeClass="text-7xl md:text-9xl"
          paddingClass="px-14 py-4 md:px-20 md:py-5"
        />
        <HeroCard
          text="TRAINING"
          rotation={-2}
          sizeClass="text-7xl md:text-9xl"
          paddingClass="px-12 py-4 md:px-16 md:py-5"
        />
      </div>

      <button
        type="button"
        onClick={() => navigate('/gallery')}
        className="hero-cta rounded-md bg-[--color-accent] px-7 py-3 font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[--color-paper-ink] transition-transform duration-200 hover:scale-[1.04]"
      >
        Start activity
      </button>
    </main>
  )
}
