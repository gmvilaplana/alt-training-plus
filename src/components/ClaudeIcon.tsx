type Props = {
  className?: string
  title?: string
}

// Claude / Anthropic "sparkle" mark — four curved points.
// Uses currentColor so callers can tint it via Tailwind text color.
export function ClaudeIcon({ className, title = 'Claude' }: Props) {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <path d="M128 4c2 50 20 90 60 124-40 34-58 74-60 124-2-50-20-90-60-124 40-34 58-74 60-124z" />
      <path d="M4 128c50-2 90-20 124-60 34 40 74 58 124 60-50 2-90 20-124 60-34-40-74-58-124-60z" />
    </svg>
  )
}
