import { Meta, StoryObj } from '@storybook/react'
import { mobileStoryParameters } from '@app/storybook/storyHelper'
import SigninPanel from '@app/web/app/(public)/(authentication)/connexion/SigninPanel'

const meta: Meta<typeof SigninPanel> = {
  title: 'SigninPanel',
  component: SigninPanel,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=5574-30858&t=IaARn0o9n5mR7w18-4',
    },
  },
}

export default meta

type Story = StoryObj<typeof SigninPanel>

export const Desktop: Story = {}
export const Mobile: Story = {
  parameters: mobileStoryParameters,
}
