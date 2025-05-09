import { mediumContainerStory } from '@app/storybook/storyHelper'
import CollectionDates from '@app/web/components/Collection/CollectionDates'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

export default {
  title: 'Collection/Dates de collection',
  component: CollectionDates,
} as Meta<typeof CollectionDates>

type Story = StoryObj<typeof CollectionDates>

const Template = (props: ComponentProps<typeof CollectionDates>) => (
  <CollectionDates {...props} />
)

const dates = {
  created: new Date('2024-01-01'),
  updated: new Date('2024-01-01'),
}

const CollectionSameDatesArguments: ComponentProps<typeof CollectionDates> = {
  collection: {
    ...dates,
  },
}

const CollectionDifferentDatesArguments: ComponentProps<
  typeof CollectionDates
> = {
  collection: {
    ...dates,
    updated: new Date('2024-01-02'),
  },
}

export const CollectionsDates: Story = mediumContainerStory({
  render: () => (
    <>
      <Template {...CollectionSameDatesArguments} />
      <Template {...CollectionDifferentDatesArguments} />
    </>
  ),
})

CollectionsDates.storyName = 'Dates de collection (publication / modification)'
