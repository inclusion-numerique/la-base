import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import type { Meta, StoryObj } from '@storybook/react'
import ProfileCardSkeleton from './ProfileCardSkeleton'

export default {
  title: 'Profile/Skeleton',
  component: ProfileCardSkeleton,
} as Meta<typeof ProfileCardSkeleton>

type Story = StoryObj<typeof ProfileCardSkeleton>

const StoryArguments: Story = { args: {} }

export const Desktop = mediumContainerStory(StoryArguments)

export const Mobile = mobileStory(StoryArguments)
