import { CollectionListWrapper } from '@app/storybook/components/CollectionListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import CollectionCard from '@app/web/components/Collection/Cards/CollectionCard'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { collectionInBase, collectionInProfile } from './cardsStoriesHelpers'

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

const dates = {
  created: new Date('2024-01-01'),
  updated: new Date('2024-01-01'),
}

// visiteur qui voit une collection publique dans un profil
const VisitorCollectionInProfileArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInProfile,
    isPublic: true,
    isFavorites: false,
    slug: `${collectionInProfile.slug}-1`,
    ...dates,
  },
  canWrite: false,
}

// contributeur qui voit une collection privée dans un profil
const ContributorPrivateCollectionInProfileArguments: ComponentProps<
  typeof CollectionCard
> = {
  collection: {
    ...collectionInProfile,
    isPublic: false,
    isFavorites: false,
    slug: `${collectionInBase.slug}-2`,
    ...dates,
  },
  canWrite: false,
}

// contributeur qui voit une collection depuis son profil et qui est propriétaire de la collection
const ContributorOwnerCollectionInProfileArguments: ComponentProps<
  typeof CollectionCard
> = {
  ...ContributorPrivateCollectionInProfileArguments,
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
      <Template {...ContributorOwnerCollectionInProfileArguments} />
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
      <Template {...ContributorOwnerCollectionInProfileArguments} />
    </>
  ),
})
PublishedInProfileMobile.storyName =
  'Collection publiée dans un profil (mobile)'
