import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

export default function KevinCouduresCard() {
  const container = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.from(".pop", {
        scale: 0,
        y: 24,
        rotation: -10,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(2)",
        stagger: 0.08,
        transformOrigin: "bottom center",
      })
      gsap.to(".sway", {
        rotation: 3,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 90%",
      })
    },
    { scope: container },
  )

  const onEnter = () => {
    gsap.to(".sword", { y: -18, rotation: -8, duration: 0.5, ease: "back.out(2)" })
    gsap.to(".shield", { scale: 1.1, rotation: -4, duration: 0.4, ease: "back.out(2)" })
    gsap.to(".crown", { y: -6, scale: 1.08, duration: 0.4, ease: "back.out(2)" })
    gsap.to(".banner", { scaleX: 1, opacity: 1, duration: 0.45, ease: "back.out(1.7)" })
  }
  const onLeave = () => {
    gsap.to(".sword", { y: 0, rotation: 0, duration: 0.5, ease: "power2.out" })
    gsap.to(".shield", { scale: 1, rotation: 0, duration: 0.4, ease: "power2.out" })
    gsap.to(".crown", { y: 0, scale: 1, duration: 0.4, ease: "power2.out" })
    gsap.to(".banner", { scaleX: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
  }

  return (
    <article
      ref={container}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-(--color-theme-amber) p-8 text-(--color-theme-amber-ink) md:p-9"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(255,250,235,0.55), transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(124,45,18,0.35), transparent 60%), repeating-linear-gradient(45deg, rgba(124,45,18,0.04) 0 2px, transparent 2px 6px)",
      }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-[#7c2d12]/30" />
      <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-[#7c2d12]/40" />
      <div aria-hidden className="pointer-events-none absolute inset-3 rounded-xl border border-[#7c2d12]/15" style={{ boxShadow: "inset 0 0 30px rgba(124,45,18,0.15)" }} />

      <svg aria-hidden viewBox="0 0 60 50" className="pop sway absolute top-7 right-9 size-16 drop-shadow-[2px_3px_0_rgba(58,29,12,0.35)]">
        <path d="M5 35 L5 15 L18 28 L30 8 L42 28 L55 15 L55 35 Z" fill="#c9a86b" stroke="#7c2d12" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="5" cy="13" r="3" fill="#7c2d12" />
        <circle cx="30" cy="6" r="3" fill="#7c2d12" />
        <circle cx="55" cy="13" r="3" fill="#7c2d12" />
        <rect x="5" y="35" width="50" height="5" fill="#7c2d12" />
        <circle cx="30" cy="22" r="2" fill="#fff" />
      </svg>
      <div className="crown absolute top-7 right-9 size-16" aria-hidden />

      <svg aria-hidden viewBox="0 0 60 70" className="pop shield absolute right-7 bottom-8 size-28 drop-shadow-[3px_5px_0_rgba(58,29,12,0.4)]">
        <path d="M30 5 L55 12 L52 45 Q30 68 8 45 L5 12 Z" fill="#7c2d12" stroke="#c9a86b" strokeWidth="3" />
        <path d="M30 12 L48 17 L46 42 Q30 60 14 42 L12 17 Z" fill="none" stroke="#c9a86b" strokeWidth="1" opacity="0.6" />
        <text x="30" y="44" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" fill="#c9a86b">K</text>
      </svg>

      <svg aria-hidden viewBox="0 0 20 90" className="pop sword absolute top-12 left-[46%] h-36 drop-shadow-[2px_3px_0_rgba(58,29,12,0.35)]">
        <polygon points="10,2 12.5,10 7.5,10" fill="#e5e5e5" stroke="#5a5a5a" strokeWidth="0.5" />
        <rect x="8.5" y="10" width="3" height="55" fill="#d4d4d4" stroke="#5a5a5a" strokeWidth="0.4" />
        <line x1="10" y1="12" x2="10" y2="62" stroke="#9a9a9a" strokeWidth="0.5" />
        <rect x="2" y="64" width="16" height="3.5" rx="1" fill="#c9a86b" stroke="#7c2d12" strokeWidth="0.6" />
        <rect x="8.5" y="67.5" width="3" height="13" fill="#7c2d12" />
        <circle cx="10" cy="83" r="4" fill="#c9a86b" stroke="#7c2d12" strokeWidth="1" />
      </svg>

      <div className="banner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center opacity-0 scale-x-0 pointer-events-none">
        <div className="relative bg-[#7c2d12] px-5 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f5e6c8] shadow-[3px_4px_0_rgba(58,29,12,0.4)]">
          ⚔ En Garde ⚔
          <span className="absolute -left-2 top-1/2 -translate-y-1/2 size-0 border-y-[14px] border-y-transparent border-r-[8px] border-r-[#7c2d12]" />
          <span className="absolute -right-2 top-1/2 -translate-y-1/2 size-0 border-y-[14px] border-y-transparent border-l-[8px] border-l-[#7c2d12]" />
        </div>
      </div>

      <div className="relative flex h-full flex-col justify-between">
        <span className="pop text-xs font-bold uppercase tracking-[0.22em] text-[#7c2d12]">
          ⚜ Design Manager · Anno MMXXVI
        </span>

        <div className="flex flex-col gap-2">
          <h2 className="pop text-4xl leading-[0.95] font-bold tracking-tight md:text-5xl" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", color: "#3a1d0c" }}>
            Sir Kevin
            <br />
            <span className="text-2xl italic font-normal text-[#7c2d12] md:text-3xl">of Coudures</span>
          </h2>
          <p className="pop max-w-[30ch] text-sm leading-relaxed text-[#5a3520]">
            Wielder of pixels, keeper of grids — defender of the design realm.
          </p>
        </div>
      </div>
    </article>
  )
}
