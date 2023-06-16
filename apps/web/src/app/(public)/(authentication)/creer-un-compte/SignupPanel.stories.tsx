import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'

const meta: Meta<typeof SignupPanel> = {
  title: 'SignupPanel',
  component: SignupPanel,
}

export default meta

type Story = StoryObj<typeof SignupPanel>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: mobileStory,
}
