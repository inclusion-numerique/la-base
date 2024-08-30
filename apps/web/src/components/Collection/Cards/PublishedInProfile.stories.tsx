import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import { CollectionListWrapper } from '@app/storybook/components/CollectionListWrapper'
import { testSessionUser } from '@app/web/test/testSessionUser'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import {
  collectionInBase,
  collectionInProfile,
  creatorUser,
} from './cardsStoriesHelpers'

export default {
  title: 'Collection/Collections publiée dans un profil',
  component: CollectionCard,
} as Meta<typeof CollectionCard>

type Story = StoryObj<typeof CollectionCard>

const Template = (props: ComponentProps<typeof CollectionCard>) => (
  <CollectionListWrapper>
    <CollectionCard {...props} />
  </CollectionListWrapper>
)

// visiteur qui voit une collection publique dans un profil
const VisitorCollectionInProfileArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInProfile,
    isPublic: true,
    slug: `${collectionInProfile.slug}-1`,
  },
  user: testSessionUser,
}

// contributeur qui voit une collection privée dans un profil
const ContributorPrivateCollectionInProfileArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInProfile,
    isPublic: false,
    slug: `${collectionInBase.slug}-2`,
    createdBy: testSessionUser,
  },
  user: creatorUser,
}

export const PublishedInProfile: Story = mediumContainerStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?m=dev&node-id=4336-353420&t=zaFroVHWh70gk8K5-1',
    },
  },
  render: () => (
    <>
      <Template {...VisitorCollectionInProfileArguments} />
      <Template {...ContributorPrivateCollectionInProfileArguments} />
    </>
  ),
})
PublishedInProfile.storyName = 'Collection publiée dans un profil'

export const PublishedInProfileMobile: Story = mobileStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?m=dev&node-id=4336-353420&t=zaFroVHWh70gk8K5-1',
    },
  },
  render: () => (
    <>
      <Template {...VisitorCollectionInProfileArguments} />
      <Template {...ContributorPrivateCollectionInProfileArguments} />
    </>
  ),
})
PublishedInProfileMobile.storyName =
  'Collection publiée dans un profil (mobile)'
