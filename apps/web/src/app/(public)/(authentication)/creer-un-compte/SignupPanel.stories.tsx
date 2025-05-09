import { mobileStoryParameters } from '@app/storybook/storyHelper'
import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SignupPanel> = {
  title: 'SignupPanel',
  component: SignupPanel,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=5574-34313&t=IaARn0o9n5mR7w18-4',
    },
  },
}

export default meta

type Story = StoryObj<typeof SignupPanel>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: mobileStoryParameters,
}
