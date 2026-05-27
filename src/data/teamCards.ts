export type CardStyle =
  | 'default'
  | 'light'
  | 'lighter'
  | 'lightest'
  | 'feature'
  | 'feature2'
  | 'feature3'
  | 'feature4'
  | 'dark'
  | 'darker'
  | 'darkest'

export type TeamCard = {
  /** Display name shown on the card */
  name: string
  /** Role or job title */
  role: string
  /** A short skill, phrase, or fun fact */
  skill: string
  /** UDS Card style variant. See https://www.telus.com/universal-design-system/components/allium/card */
  style: CardStyle
  /** Optional emoji shown above the name */
  emoji?: string
}

export const teamCards: TeamCard[] = [
  {
    name: 'Juan Vilaplana',
    role: 'Workshop Facilitator',
    skill: 'Turning git fear into git muscle memory.',
    style: 'feature',
    emoji: '🧭',
  },
  {
    name: 'Your Name Here',
    role: 'Your Role',
    skill: 'Add your own card by opening a PR — see the README.',
    style: 'light',
    emoji: '✨',
  },
]
