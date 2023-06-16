import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'

const meta: Meta<typeof SigninPanel> = {
  title: 'SigninPanel',
  component: SigninPanel,
}

export default meta

type Story = StoryObj<typeof SigninPanel>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: mobileStory,
}
