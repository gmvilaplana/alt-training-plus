type Props = {
  text: string
  /** Tilt in degrees, e.g. -4 / 3 / -2 */
  rotation: number
  /** Tailwind text size utilities, e.g. 'text-7xl md:text-9xl' */
  sizeClass: string
  /** Tailwind padding utilities to control card width and height */
  paddingClass: string
}

export default function HeroCard({ text, rotation, sizeClass, paddingClass }: Props) {
  return (
    <div
      className="hero-card relative inline-block"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* teal shadow underneath, offset down-right */}
      <span
        aria-hidden
        className="absolute inset-0 translate-x-[6px] translate-y-[6px] rounded-[3px] bg-[--color-accent]"
      />
      {/* paper card */}
      <div
        className={`relative rounded-[3px] bg-[--color-paper] text-[--color-paper-ink] ${paddingClass}`}
      >
        <span
          className={`block leading-none tracking-tight ${sizeClass}`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {text}
        </span>
      </div>
    </div>
  )
}
