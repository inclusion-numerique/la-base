import { Meta, StoryObj } from '@storybook/react'
import CroppedUpload from './CroppedUpload'

const meta: Meta<typeof CroppedUpload> = {
  title: 'DSFR Component/Crop upload',
  component: CroppedUpload,
}

export default meta

type Story = StoryObj<typeof CroppedUpload>

export const Default: Story = {
  name: 'Cadrage par défaut',
  args: {
    ratio: 20 / 9,
    height: 128,
  },
}

export const Round: Story = {
  name: 'Cadrage rond',
  args: {
    round: true,
    height: 128,
    ratio: 1,
  },
}
