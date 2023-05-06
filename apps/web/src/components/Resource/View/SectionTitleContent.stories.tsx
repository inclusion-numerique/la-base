import { Meta, StoryObj } from '@storybook/react'
import SectionTitleContent from '@app/web/components/Resource/View/SectionTitleContent'

export default {
  title: 'Content/SectionTitle/View',
  component: SectionTitleContent,
} as Meta<typeof SectionTitleContent>

type Story = StoryObj<typeof SectionTitleContent>

export const Default: Story = {
  name: 'View',
  args: {
    content: { title: 'Titre de la section' },
  },
}
