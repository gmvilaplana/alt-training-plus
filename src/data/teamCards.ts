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
  /** Optional CSS `background` value revealed on hover (gradients, patterns, etc.) */
  themeBg?: string
}

const marsSpaceBg = [
  'radial-gradient(1.5px 1.5px at 12% 18%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1px 1px at 38% 12%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1.5px 1.5px at 68% 28%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1px 1px at 82% 18%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1px 1px at 22% 48%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1.5px 1.5px at 55% 42%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1px 1px at 88% 52%, #ffffff 50%, transparent 51%)',
  'radial-gradient(1px 1px at 8% 70%, #ffffff 50%, transparent 51%)',
  'radial-gradient(ellipse 80% 45% at 50% 115%, #ff7849 0%, #c1440e 25%, #6b1f0c 55%, transparent 80%)',
  'linear-gradient(180deg, #050818 0%, #0a0f2e 60%, #1a1240 100%)',
].join(', ')

export const teamCards: TeamCard[] = [
  {
    name: 'Juan Vilaplana',
    role: 'Workshop Facilitator',
    skill: 'Turning git fear into git muscle memory.',
    theme: 'teal',
    emoji: '🧭',
  },
  {
    name: 'Kevin Coudures',
    role: 'Explorador Marciano',
    skill: 'Plantando banderas en cada PR — próxima parada: Marte.',
    theme: 'peach',
    emoji: '🪐',
    themeBg: marsSpaceBg,
  },
  {
    name: 'Your Name Here',
    role: 'Your Role',
    skill: 'Add your own card by opening a PR — see the README.',
    theme: 'navy',
    emoji: '✨',
  },
]
