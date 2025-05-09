import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { testSessionUser } from '@app/web/test/testSessionUser'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'
import { creatorUser, date, resource, updated } from './cardsStoriesHelpers'

export default {
  title: 'Ressource/Cards/Ressource publiée dans un profil',
  component: ResourceCard,
} as Meta<typeof ResourceCard>

type Story = StoryObj<typeof ResourceCard>

const Template = (props: ComponentProps<typeof ResourceCard>) => (
  <ResourcesListWrapper>
    <ResourceCard {...props} />
  </ResourcesListWrapper>
)

const VisitorPublishedPublicArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-1`,
    baseId: null,
    base: null,
    published: date,
    lastPublished: date,
  },
  user: testSessionUser,
  isContributor: false,
}

const VisitorPublishedPublicUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-2`,
    baseId: null,
    base: null,
    published: date,
    updated,
    lastPublished: updated,
  },
  user: testSessionUser,
  isContributor: false,
}

const VisitorPublishedPrivateArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-3`,
    baseId: null,
    base: null,
    published: date,
    lastPublished: date,
    isPublic: false,
  },
  user: testSessionUser,
  isContributor: false,
}

const VisitorPublishedPrivateUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-4`,
    baseId: null,
    base: null,
    published: date,
    updated,
    lastPublished: updated,
    isPublic: false,
  },
  user: testSessionUser,
  isContributor: false,
}

const EditorDraftStoryArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-5`,
    baseId: null,
    base: null,
    published: null,
    lastPublished: null,
  },
  user: creatorUser,
  isContributor: true,
  isDraft: true,
}

const EditorDraftUpdatedArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-6`,
    baseId: null,
    base: null,
    published: null,
    lastPublished: null,
    updated,
  },
  user: creatorUser,
  isContributor: true,
  isDraft: true,
}

const EditorPublishedPublicArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-7`,
    baseId: null,
    base: null,
    published: date,
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPublicUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-8`,
    baseId: null,
    base: null,
    published: date,
    updated,
    lastPublished: updated,
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPublicNotPublishedUpdatesArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-9`,
    baseId: null,
    base: null,
    published: date,
    updated,
    lastPublished: new Date('2023-01-01'),
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPrivateArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-10`,
    baseId: null,
    base: null,
    published: date,
    isPublic: false,
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPrivateUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-11`,
    baseId: null,
    base: null,
    published: date,
    isPublic: false,
    updated,
    lastPublished: updated,
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPrivateNotPublishedUpdatesArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-12`,
    baseId: null,
    base: null,
    published: date,
    isPublic: false,
    updated,
    lastPublished: new Date('2024-01-01'),
  },
  user: creatorUser,
  isContributor: true,
}

export const VisitorPublishedInBase: Story = mediumContainerStory({
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Publiée en public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29206&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en public avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29209&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en privée',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29215&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en privée avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29218&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Brouillon',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29179&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Brouillon modifié',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29182&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29185&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en public avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29188&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en public avec des modifications non publiées',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29191&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en privé',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29194&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en privé avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29197&t=i9GYiv7b09UnqrXx-4',
      },
      {
        type: 'figma',
        name: 'Publiée en privé avec des modifications non publiées',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29200&t=i9GYiv7b09UnqrXx-4',
      },
    ],
  },
  render: () => (
    <>
      <Template {...VisitorPublishedPublicArguments} />
      <Template {...VisitorPublishedPublicUpdatedArguments} />
      <Template {...VisitorPublishedPrivateArguments} />
      <Template {...VisitorPublishedPrivateUpdatedArguments} />
      <Template {...EditorDraftStoryArguments} />
      <Template {...EditorDraftUpdatedArguments} />
      <Template {...EditorPublishedPublicArguments} />
      <Template {...EditorPublishedPublicUpdatedArguments} />
      <Template {...EditorPublishedPublicNotPublishedUpdatesArguments} />
      <Template {...EditorPublishedPrivateArguments} />
      <Template {...EditorPublishedPrivateUpdatedArguments} />
      <Template {...EditorPublishedPrivateNotPublishedUpdatesArguments} />
    </>
  ),
})
VisitorPublishedInBase.storyName = 'Ressource publiée dans un profil'

export const VisitorPublishedInBaseMobile: Story = mobileStory({
  parameters: {
    design: [
      {
        type: 'figma',
        name: 'Visiteur - Publiée en public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173828&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Visiteur - Publiée en public avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173831&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Visiteur - Publiée en privée',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173837&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Visiteur - Publiée en privée avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173840&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Brouillon',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173801&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Brouillon modifié',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173804&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en public',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173807&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en public avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173810&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en public avec des modifications non publiées',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173813&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en privé',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173816&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en privé avec mise à jour',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173819&t=2gdxVbP0ENf648Yt-4',
      },
      {
        type: 'figma',
        name: 'Contributeur - Publiée en privé avec des modifications non publiées',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173822&t=2gdxVbP0ENf648Yt-4',
      },
    ],
  },
  render: () => (
    <>
      <Template {...VisitorPublishedPublicArguments} />
      <Template {...VisitorPublishedPublicUpdatedArguments} />
      <Template {...VisitorPublishedPrivateArguments} />
      <Template {...VisitorPublishedPrivateUpdatedArguments} />
      <Template {...EditorDraftStoryArguments} />
      <Template {...EditorDraftUpdatedArguments} />
      <Template {...EditorPublishedPublicArguments} />
      <Template {...EditorPublishedPublicUpdatedArguments} />
      <Template {...EditorPublishedPublicNotPublishedUpdatesArguments} />
      <Template {...EditorPublishedPrivateArguments} />
      <Template {...EditorPublishedPrivateUpdatedArguments} />
      <Template {...EditorPublishedPrivateNotPublishedUpdatesArguments} />
    </>
  ),
})
VisitorPublishedInBaseMobile.storyName =
  'Ressource publiée dans un profil (mobile)'
