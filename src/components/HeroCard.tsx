import { type CSSProperties, useState } from 'react'

type Props = {
  text: string
  /** Initial tilt in degrees, e.g. -4 / 3 / -2. Applied via data-rotation
   *  so GSAP can own the transform without React fighting it. */
  rotation: number
  /** Tailwind text size utilities, e.g. 'text-7xl md:text-9xl' */
  sizeClass: string
  /** Tailwind padding utilities to control card width and height */
  paddingClass: string
  /** Background color shown on hover. CSS color string. */
  hoverBg: string
  /** Text color on hover */
  hoverInk?: string
}

export default function HeroCard({
  text,
  rotation,
  sizeClass,
  paddingClass,
  hoverBg,
  hoverInk = '#0a1a18',
}: Props) {
  const [hovered, setHovered] = useState(false)

  const paperStyle: CSSProperties = {
    backgroundColor: hovered ? hoverBg : 'var(--color-paper)',
    color: hovered ? hoverInk : 'var(--color-paper-ink)',
    transition: 'background-color 320ms ease, color 320ms ease',
  }

  return (
    <div
      className="hero-card relative inline-block cursor-default will-change-transform"
      data-rotation={rotation}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Solid teal shadow. GSAP owns the transform (offset + scaleX pulse). */}
      <span
        aria-hidden
        className="hero-shadow pointer-events-none absolute inset-0 rounded-[3px] bg-(--color-accent)"
      />
      {/* Paper card */}
      <div
        className={`relative rounded-[3px] text-center ${paddingClass}`}
        style={paperStyle}
      >
        <span
          className={`block leading-[0.95] tracking-tight ${sizeClass}`}
          style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
