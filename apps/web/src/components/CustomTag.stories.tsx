import type { Meta, StoryObj } from '@storybook/nextjs'
import CustomTag, { TagColor } from './CustomTag'

const meta: Meta<typeof CustomTag> = {
  title: 'Component/CustomTag',
  component: CustomTag,
}

export default meta

type Story = StoryObj<typeof CustomTag>

export const Default: Story = {
  name: 'Custom tag',
  args: {
    color: TagColor.GREEN,
    label: 'Tag',
    icon: 'fr-icon-earth-fill',
  },
}
