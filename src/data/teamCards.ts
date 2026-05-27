export type CardTheme = 'teal' | 'navy' | 'amber' | 'peach'

export type TeamCard = {
  /** Display name shown on the card */
  name: string
  /** Role or job title */
  role: string
  /** A short skill, phrase, or fun fact */
  skill: string
  /** Color theme inspired by the TELUS Design Playbook */
  theme: CardTheme
  /** Optional emoji shown above the name */
  emoji?: string
}

export const teamCards: TeamCard[] = [
  {
    name: 'Juan Vilaplana',
    role: 'Workshop Facilitator',
    skill: 'Turning git fear into git muscle memory.',
    theme: 'teal',
    emoji: '🧭',
  },
  {
    name: 'Your Name Here',
    role: 'Your Role',
    skill: 'Add your own card by opening a PR — see the README.',
    theme: 'navy',
    emoji: '✨',
  },
]
