import { Meta, StoryObj } from '@storybook/react'
import SectionTitleView from './SectionTitleView'

export default {
  title: 'Ressource/Content/SectionTitle/View',
  component: SectionTitleView,
} as Meta<typeof SectionTitleView>

type Story = StoryObj<typeof SectionTitleView>

export const Default: Story = {
  name: 'View',
  args: {
    content: { title: 'Titre de la section' },
  },
}
