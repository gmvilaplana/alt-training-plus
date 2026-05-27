export type TeamCard = {
  /** Display name shown on the card */
  name: string
  /** Role or job title */
  role: string
  /** A short skill, phrase, or fun fact */
  skill: string
  /** Accent color used for the card border/highlight (any valid CSS color) */
  accent: string
  /** Optional emoji shown next to the name */
  emoji?: string
}

export const teamCards: TeamCard[] = [
  {
    name: 'Juan Vilaplana',
    role: 'Workshop Facilitator',
    skill: 'Turning git fear into git muscle memory.',
    accent: '#2dd4bf',
    emoji: '🧭',
  },
  {
    name: 'Your Name Here',
    role: 'Your Role',
    skill: 'Add your own card by opening a PR — see the README.',
    accent: '#a78bfa',
    emoji: '✨',
  },
]
