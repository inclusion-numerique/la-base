import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { testSessionUser } from '@app/web/test/testSessionUser'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentProps } from 'react'
import { creatorUser, date, resource, updated } from './cardsStoriesHelpers'

export default {
  title: 'Ressource/Cards/Ressource publiée dans une base',
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
    published: date,
    lastPublished: date,
    isPublic: false,
  },
  user: testSessionUser,
  isContributor: false,
}

const EditorDraftArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-4`,
    published: null,
    lastPublished: null,
  },
  user: creatorUser,
  isContributor: true,
  isDraft: true,
}

const EditorDraftUpdatedStoryArguments: ComponentProps<typeof ResourceCard> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-5`,
    published: null,
    lastPublished: null,
    updated,
  },
  user: creatorUser,
  isContributor: true,
  isDraft: true,
}

const EditorPublishedPublicArguments: ComponentProps<typeof ResourceCard> = {
  resource: { ...resource, slug: `${resource.slug}-6`, published: date },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPublicUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-7`,
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
    slug: `${resource.slug}-8`,
    published: date,
    updated,
    lastPublished: new Date('2023-01-01'),
  },
  user: creatorUser,
  isContributor: true,
}

const EditorPublishedPrivateStoryArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-9`,
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
    slug: `${resource.slug}-10`,
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
    slug: `${resource.slug}-11`,
    published: date,
    isPublic: false,
    updated,
    lastPublished: new Date('2024-01-01'),
  },
  user: creatorUser,
  isContributor: true,
}

const VisitorPublishedPrivateUpdatedArguments: ComponentProps<
  typeof ResourceCard
> = {
  resource: {
    ...resource,
    slug: `${resource.slug}-12`,
    published: date,
    updated,
    lastPublished: updated,
    isPublic: false,
  },
  user: testSessionUser,
  isContributor: false,
}

export const VisitorPublishedInBase: Story = mediumContainerStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29255&t=i9GYiv7b09UnqrXx-4',
    },
  },
  render: () => (
    <>
      <Template {...VisitorPublishedPublicArguments} />
      <Template {...VisitorPublishedPublicUpdatedArguments} />
      <Template {...VisitorPublishedPrivateArguments} />
      <Template {...VisitorPublishedPrivateUpdatedArguments} />
      <Template {...EditorDraftArguments} />
      <Template {...EditorDraftUpdatedStoryArguments} />
      <Template {...EditorPublishedPublicArguments} />
      <Template {...EditorPublishedPublicUpdatedArguments} />
      <Template {...EditorPublishedPublicNotPublishedUpdatesArguments} />
      <Template {...EditorPublishedPrivateStoryArguments} />
      <Template {...EditorPublishedPrivateUpdatedArguments} />
      <Template {...EditorPublishedPrivateNotPublishedUpdatesArguments} />
    </>
  ),
})
VisitorPublishedInBase.storyName = 'Ressource publiée dans une base'

export const VisitorPublishedInBaseMobile: Story = mobileStory({
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-56871&t=2gdxVbP0ENf648Yt-4',
    },
  },
  render: () => (
    <>
      <Template {...VisitorPublishedPublicArguments} />
      <Template {...VisitorPublishedPublicUpdatedArguments} />
      <Template {...VisitorPublishedPrivateArguments} />
      <Template {...VisitorPublishedPrivateUpdatedArguments} />
      <Template {...EditorDraftArguments} />
      <Template {...EditorDraftUpdatedStoryArguments} />
      <Template {...EditorPublishedPublicArguments} />
      <Template {...EditorPublishedPublicUpdatedArguments} />
      <Template {...EditorPublishedPublicNotPublishedUpdatesArguments} />
      <Template {...EditorPublishedPrivateStoryArguments} />
      <Template {...EditorPublishedPrivateUpdatedArguments} />
      <Template {...EditorPublishedPrivateNotPublishedUpdatesArguments} />
    </>
  ),
})
VisitorPublishedInBaseMobile.storyName =
  'Ressource publiée dans une base (mobile)'
