import { Meta, StoryObj } from '@storybook/react'
import { mobileStory } from '@app/storybook/storyHelper'
import BaseCardSkeleton from './BaseCardSkeleton'

export default {
  title: 'Base/Skeleton',
  component: BaseCardSkeleton,
} as Meta<typeof BaseCardSkeleton>

type Story = StoryObj<typeof BaseCardSkeleton>

export const Full: Story = {
  args: {},
}

export const FullMobile = mobileStory(Full)

export const Compact: Story = {
  args: {
    compact: true,
  },
}

export const CompactMobile = mobileStory(Compact)
