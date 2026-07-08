import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

// A letter on a pink desk: cream paper sheet with faint ruled lines, a small
// pixel-character stamp in the top-right, signed in cursive at the bottom-left.
// Hover: neon-pink glow, cursor-driven 3D tilt, parallax + a moving light sheen.
export default function AnnaGuercioCard() {
  const root = useRef<HTMLElement>(null)
  const rotX = useRef<(v: number) => void>(() => {})
  const rotY = useRef<(v: number) => void>(() => {})

  const { contextSafe } = useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      gsap.set(root.current, { transformPerspective: 900, transformOrigin: "center" })
      gsap.set(q("[data-char]"), { rotate: 3 })
      rotX.current = gsap.quickTo(root.current, "rotationX", { duration: 0.5, ease: "power3" })
      rotY.current = gsap.quickTo(root.current, "rotationY", { duration: 0.5, ease: "power3" })

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q("[data-paper]"), { y: 16, opacity: 0, duration: 0.6 })
        .from(q("[data-char]"), { scale: 0.6, opacity: 0, rotate: -10, duration: 0.6, ease: "back.out(1.7)" }, 0.2)
        .from(q("[data-sign]"), { y: 12, opacity: 0, duration: 0.6, stagger: 0.12 }, 0.3)
      gsap.to(q("[data-char]"), { y: -3, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 })
      gsap.to(q("[data-star]"), {
        opacity: 0.3,
        duration: 1.3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.45, from: "random" },
      })
    },
    { scope: root },
  )

  const onMove = contextSafe((e: React.MouseEvent) => {
    const el = root.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rotY.current((px - 0.5) * 14)
    rotX.current((0.5 - py) * 10)
    el.style.setProperty("--mx", `${px * 100}%`)
    el.style.setProperty("--my", `${py * 100}%`)
    gsap.to(el.querySelector("[data-char]"), { x: (px - 0.5) * -16, duration: 0.5, ease: "power3" })
    gsap.to(el.querySelector("[data-signblock]"), { x: (px - 0.5) * 10, y: (py - 0.5) * 6, duration: 0.6, ease: "power3" })
  })

  const onEnter = contextSafe(() => {
    gsap.to(root.current!.querySelector("[data-char]"), { scale: 1.2, rotate: -4, duration: 0.4, ease: "back.out(2.2)" })
  })

  const onLeave = contextSafe(() => {
    const el = root.current!
    rotX.current(0)
    rotY.current(0)
    gsap.to(el.querySelector("[data-char]"), { x: 0, scale: 1, rotate: 3, duration: 0.5, ease: "power3" })
    gsap.to(el.querySelector("[data-signblock]"), { x: 0, y: 0, duration: 0.5, ease: "power3" })
  })

  return (
    <article
      ref={root}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative aspect-[16/10] overflow-hidden rounded-2xl p-6 shadow-[0_0_0_0_rgba(255,45,155,0)] transition-shadow duration-300 will-change-transform hover:shadow-[0_0_26px_5px_rgba(255,45,155,0.6),inset_0_0_0_2px_#ff2fa0] md:p-8"
      style={{ background: "repeating-linear-gradient(90deg, #f3aecb 0 7px, #d64d80 7px 14px)" }}
    >
      {/* soft light on the pink surface */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent" />

      {/* the letter — cream paper sheet */}
      <div
        data-paper
        className="relative flex h-full flex-col justify-end rounded-lg bg-[#fbf7ee] p-6 shadow-[0_10px_28px_rgba(122,18,51,0.35)] md:p-8"
        style={{
          backgroundImage: "repeating-linear-gradient(#fbf7ee 0 27px, rgba(122,18,51,0.07) 27px 28px)",
        }}
      >
        {/* aged paper texture — worn shading at the corners + faint grain */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg mix-blend-multiply"
          style={{
            backgroundImage: [
              "radial-gradient(130px 130px at 0% 0%, rgba(120,84,44,0.20), transparent 68%)",
              "radial-gradient(130px 130px at 100% 0%, rgba(120,84,44,0.20), transparent 68%)",
              "radial-gradient(150px 150px at 0% 100%, rgba(120,84,44,0.22), transparent 68%)",
              "radial-gradient(150px 150px at 100% 100%, rgba(120,84,44,0.22), transparent 68%)",
              "radial-gradient(rgba(120,90,60,0.10) 0.5px, transparent 0.7px)",
            ].join(", "),
            backgroundSize: "auto, auto, auto, auto, 4px 4px",
          }}
        />

        {/* cursor-following light sheen (appears on hover) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-lg opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.9), transparent 60%)",
          }}
        />

        {/* small pink stars scattered in the empty areas of the letter */}
        {[
          { pos: "top-[44%] right-7", size: 15, rot: -8, op: 0.7 },
          { pos: "bottom-7 right-9", size: 11, rot: 14, op: 0.8 },
          { pos: "top-[62%] left-8", size: 9, rot: -14, op: 0.6 },
          { pos: "top-16 left-[55%]", size: 8, rot: 6, op: 0.65 },
        ].map((s, i) => (
          <svg
            key={i}
            data-star
            viewBox="0 0 24 24"
            aria-hidden
            fill="#e8477f"
            className={`pointer-events-none absolute ${s.pos}`}
            style={{ width: s.size, height: s.size, opacity: s.op, transform: `rotate(${s.rot}deg)` }}
          >
            <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.6 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
          </svg>
        ))}

        {/* Brazilian postage stamp + return address, top-left of the letter */}
        <div data-sign className="absolute top-4 left-5 flex items-center gap-2">
          <svg
            viewBox="0 0 48 56"
            aria-hidden
            fill="none"
            stroke="#e8477f"
            strokeLinecap="round"
            className="w-[34px] shrink-0 -rotate-6 md:w-[38px]"
          >
            {/* perforated stamp edge (dotted) + inner frame */}
            <rect x="2" y="2" width="44" height="52" rx="2" strokeWidth="2" strokeDasharray="0.5 3.5" />
            <rect x="6.5" y="6.5" width="35" height="43" rx="1" strokeWidth="0.9" strokeOpacity="0.7" />
            {/* line-art globe motif */}
            <circle cx="24" cy="23" r="9" strokeWidth="1.2" />
            <ellipse cx="24" cy="23" rx="3.8" ry="9" strokeWidth="0.9" />
            <line x1="15" y1="23" x2="33" y2="23" strokeWidth="0.9" />
            <text x="24" y="45.5" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="6.5" fontWeight="700" fill="#e8477f" stroke="none" letterSpacing="1">
              BRASIL
            </text>
          </svg>
          <span className="font-mono text-[9px] tracking-[0.14em] text-[#8a8f94] italic md:text-[10px]">
            São Paulo, Brasil
          </span>
        </div>

        {/* pixel-character stamp, top-right corner of the letter */}
        <img
          data-char
          src="/anna-gra-nobg.png"
          alt="Pixel-art character of Anna"
          className="absolute top-4 right-4 w-[29px] object-contain drop-shadow-[0_3px_6px_rgba(122,18,51,0.25)] md:w-[33px]"
        />

        {/* signature — bottom-left, like the closing of a letter */}
        <div data-signblock className="flex flex-col items-start text-left">
          <h2
            data-sign
            className="text-5xl font-bold whitespace-nowrap capitalize leading-none text-[#e8477f] md:text-6xl"
            style={{ fontFamily: "'Snell Roundhand', 'Brush Script MT', 'Segoe Script', cursive" }}
          >
            Anna Guercio
          </h2>
          <p
            data-sign
            className="mt-1 text-[10px] font-bold whitespace-nowrap tracking-[0.18em] text-[#3a3a3a] uppercase md:text-[11px]"
          >
            Product Designer
          </p>
        </div>
      </div>
    </article>
  )
}
