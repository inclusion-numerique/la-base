import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import { CollectionListWrapper } from '@app/storybook/components/CollectionListWrapper'
import { testSessionUser } from '@app/web/test/testSessionUser'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import { collectionInBase, creatorUser } from './cardsStoriesHelpers'

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

// visiteur qui voit une collection publique dans une base
const VisitorCollectionInBaseArguments: ComponentProps<typeof CollectionCard> =
  {
    collection: {
      ...collectionInBase,
      isPublic: true,
      slug: `${collectionInBase.slug}-1`,
    },
    user: testSessionUser,
  }

// contributeur qui voit une collection privée dans une base
const ContributorPrivateCollectionInBaseArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInBase,
    isPublic: false,
    slug: `${collectionInBase.slug}-2`,
    createdBy: testSessionUser,
  },
  user: creatorUser,
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
