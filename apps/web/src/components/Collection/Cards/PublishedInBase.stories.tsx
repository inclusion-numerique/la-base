import { CollectionListWrapper } from '@app/storybook/components/CollectionListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { collectionInBase } from './cardsStoriesHelpers'

export default {
  title: 'Collection/Collections publiée dans une base',
  component: CollectionCard,
} as Meta<typeof CollectionCard>

type Story = StoryObj<typeof CollectionCard>

const Template = (props: ComponentProps<typeof CollectionCard>) => (
  <CollectionListWrapper>
    <CollectionCard {...props} />
  </CollectionListWrapper>
)
const dates = {
  created: new Date('2024-01-01'),
  updated: new Date('2024-01-01'),
}
// visiteur qui voit une collection publique dans une base
const VisitorCollectionInBaseArguments: ComponentProps<typeof CollectionCard> =
  {
    collection: {
      ...collectionInBase,
      isPublic: true,
      isFavorites: false,
      slug: `${collectionInBase.slug}-1`,
      ...dates,
    },
    canWrite: false,
  }

// contributeur qui voit une collection privée dans une base
const ContributorPrivateCollectionInBaseArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInBase,
    isPublic: false,
    isFavorites: false,
    slug: `${collectionInBase.slug}-2`,
    ...dates,
  },
  canWrite: true,
}

export const PublishedInBase: Story = mediumContainerStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?m=dev&node-id=4336-353420&t=zaFroVHWh70gk8K5-1',
    },
  },
  render: () => (
    <>
      <Template {...VisitorCollectionInBaseArguments} />
      <Template {...ContributorPrivateCollectionInBaseArguments} />
    </>
  ),
})
PublishedInBase.storyName = 'Collection publiée dans une base'

export const PublishedInBaseMobile: Story = mobileStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?m=dev&node-id=4336-353420&t=zaFroVHWh70gk8K5-1',
    },
  },
  render: () => (
    <>
      <Template {...VisitorCollectionInBaseArguments} />
      <Template {...ContributorPrivateCollectionInBaseArguments} />
    </>
  ),
})
PublishedInBaseMobile.storyName = 'Collection publiée dans une base (mobile)'
