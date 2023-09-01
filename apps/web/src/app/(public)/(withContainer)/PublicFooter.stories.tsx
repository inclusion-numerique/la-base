import { Meta, StoryObj } from '@storybook/react'
import { mobileStoryParameters } from '@app/storybook/storyHelper'
import PublicFooter from '@app/web/app/(public)/(withContainer)/PublicFooter'

export default {
  title: 'PublicFooter',
  component: PublicFooter,
} as Meta<typeof PublicFooter>

type Story = StoryObj<typeof PublicFooter>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: mobileStoryParameters,
}
