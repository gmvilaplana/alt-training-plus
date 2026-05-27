import { Box, Card, StackView, Typography } from '@telus-uds/components-web'
import type { CardStyle, TeamCard } from '../data/teamCards'

const DARK_STYLES: ReadonlySet<CardStyle> = new Set(['dark', 'darker', 'darkest'])

export function TeamCardView({ card }: { card: TeamCard }) {
  const inverse = DARK_STYLES.has(card.style)
  return (
    <Card variant={{ style: card.style }}>
      <StackView space={2}>
        {card.emoji ? (
          <Typography block variant={{ size: 'h2', inverse }}>
            {card.emoji}
          </Typography>
        ) : null}
        <Typography block tag="h2" variant={{ size: 'h3', inverse }}>
          {card.name}
        </Typography>
        <Typography block variant={{ size: 'eyebrow', inverse }}>
          {card.role}
        </Typography>
        <Box top={2}>
          <Typography block variant={{ inverse }}>
            {card.skill}
          </Typography>
        </Box>
      </StackView>
    </Card>
  )
}
