import { Box, Divider, StackView, Typography } from '@telus-uds/components-web'
import { TeamCardView } from './components/TeamCardView'
import { teamCards } from './data/teamCards'

export default function App() {
  return (
    <Box tag="main" horizontal={{ xs: 3, md: 6 }} vertical={{ xs: 4, md: 8 }}>
      <StackView space={{ xs: 4, md: 6 }}>
        <StackView space={2}>
          <Typography block variant={{ size: 'eyebrow' }}>
            alt-training-plus
          </Typography>
          <Typography block tag="h1" variant={{ size: 'display2' }}>
            The Team Cards Workshop
          </Typography>
          <Typography block variant={{ size: 'large' }}>
            A hands-on git + PR workshop. Clone this repo, add your own card
            with Claude Code in VS Code, open a PR, and watch it ship.
          </Typography>
        </StackView>

        <Divider />

        <StackView space={3}>
          <Typography block tag="h2" variant={{ size: 'h2' }}>
            Team Gallery
          </Typography>
          <StackView
            direction={{ xs: 'column', md: 'row' }}
            space={{ xs: 2, md: 3 }}
            tokens={{ flexWrap: 'wrap' }}
          >
            {teamCards.map((card) => (
              <Box key={card.name} tokens={{ flexBasis: 320, flexGrow: 1 }}>
                <TeamCardView card={card} />
              </Box>
            ))}
          </StackView>
        </StackView>
      </StackView>
    </Box>
  )
}
