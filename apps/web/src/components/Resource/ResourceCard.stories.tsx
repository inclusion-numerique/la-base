import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import { addDays } from 'date-fns'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import { testResourceDescription } from '@app/web/test/helpers'

const date = new Date('2023-01-31')
const nextDay = addDays(date, 1)

const resource = {
  id: '7a7a8e12-3fdb-4485-8f9d-112bce55d302',
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  excerpt: generateResourceExcerpt(testResourceDescription),
  created: date,
  updated: date,
  published: date,
  lastPublished: date,
  deleted: null,
  createdById: '1',
  baseId: 'base-id',
  base: {
    id: 'base-id',
    title: 'Titre de la base',
    slug: 'titre-de-la-base',
    isPublic: true,
    image: null,
    members: [],
  },
  isPublic: true,
  createdBy: {
    id: '1',
    slug: 'jean-biche',
    name: 'Jean Biche',
    firstName: 'Jean',
    lastName: 'Biche',
    image: { id: 'portrait', altText: 'Texte alternatif' },
    isPublic: true,
  },
  feedbackAverage: 0,
  image: null,
  collections: [],
  contributors: [],
  _count: {
    resourceFeedback: 0,
    collections: 0,
    views: 0,
  },
} satisfies ResourceListItem
const creatorUser = { ...testSessionUser, id: resource.createdBy.id }

export default {
  title: 'Ressource/Card',
  component: ResourceCard,
  parameters: {
    design: [
      {
        name: 'Desktop',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10993-29171&t=MbwOB3HnF8uqKTBI-4',
      },
      {
        name: 'Mobile',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173793&t=MbwOB3HnF8uqKTBI-4',
      },
      {
        name: 'Action desktop',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10981-173773&t=MbwOB3HnF8uqKTBI-4',
      },
      {
        name: 'Action mobile',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10998-59330&t=MbwOB3HnF8uqKTBI-4',
      },
    ],
  },
} as Meta<typeof ResourceCard>

type Story = StoryObj<typeof ResourceCard>

const Template = (props: ComponentProps<typeof ResourceCard>) => (
  <ResourcesListWrapper>
    <ResourceCard {...props} />
  </ResourcesListWrapper>
)

const render = (props: ComponentProps<typeof ResourceCard>) => (
  <Template {...props} />
)

const BrouillonSansImageStory: Story = {
  args: {
    resource: { ...resource, published: null, lastPublished: null },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const BrouillonSansImage = mediumContainerStory(BrouillonSansImageStory)
export const BrouillonSansImageMobile = mobileStory(BrouillonSansImageStory)

const BrouillonAvecImageStory: Story = {
  args: {
    resource: {
      ...resource,
      published: null,
      lastPublished: null,
      image: { id: 'portrait', altText: 'Texte alternatif' },
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const BrouillonAvecImage = mediumContainerStory(BrouillonAvecImageStory)
export const BrouillonAvecImageMobile = mobileStory(BrouillonAvecImageStory)

const BrouillonModifiéSansImageStory: Story = {
  args: {
    resource: {
      ...resource,
      updated: new Date(),
      published: null,
      lastPublished: null,
      base: null,
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const BrouillonModifiéSansImage = mediumContainerStory(
  BrouillonModifiéSansImageStory,
)
export const BrouillonModifiéSansImageMobile = mobileStory(
  BrouillonModifiéSansImageStory,
)

const BrouillonModifiéAvecImageStory: Story = {
  args: {
    resource: {
      ...resource,
      updated: new Date(),
      published: null,
      lastPublished: null,
      image: { id: 'portrait', altText: 'Texte alternatif' },
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const BrouillonModifiéAvecImage = mediumContainerStory(
  BrouillonModifiéAvecImageStory,
)
export const BrouillonModifiéAvecImageMobile = mobileStory(
  BrouillonModifiéAvecImageStory,
)

const PublieeSansImageVueContributeurStory: Story = {
  args: {
    resource,
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const PublieeSansImageVueContributeur = mediumContainerStory(
  PublieeSansImageVueContributeurStory,
)
export const PublieeSansImageVueContributeurMobile = mobileStory(
  PublieeSansImageVueContributeurStory,
)

const RePublieeAvecImageVueContributeurStory: Story = {
  args: {
    resource: {
      ...resource,
      lastPublished: nextDay,
      image: { id: 'portrait', altText: 'Texte alternatif' },
    },
    user: creatorUser,
    isContributor: true,
  },
  render,
}

export const RePublieeAvecImageVueContributeur = mediumContainerStory(
  RePublieeAvecImageVueContributeurStory,
)
export const RePublieeAvecImageVueContributeurMobile = mobileStory(
  RePublieeAvecImageVueContributeurStory,
)

const SansImageVueVisiteurStory: Story = {
  args: {
    resource,
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const SansImageVueVisiteur = mediumContainerStory(
  SansImageVueVisiteurStory,
)
export const SansImageVueVisiteurMobile = mobileStory(SansImageVueVisiteurStory)

const ModificationsNonPubliéesAvecImageVueVisiteurStory: Story = {
  args: {
    resource: {
      ...resource,
      updated: nextDay,
      image: { id: 'portrait', altText: 'Texte alternatif' },
    },
    user: testSessionUser,
    isContributor: false,
  },
  render,
}

export const ModificationsNonPubliéesAvecImageVueVisiteur =
  mediumContainerStory(ModificationsNonPubliéesAvecImageVueVisiteurStory)
export const ModificationsNonPubliéesAvecImageVueVisiteurMobile = mobileStory(
  ModificationsNonPubliéesAvecImageVueVisiteurStory,
)

const ModificationsNonPubliéesSansImageVueContributeurStory: Story = {
  args: {
    resource: { ...resource, updated: nextDay },
    user: creatorUser,
    isContributor: false,
  },
  render,
}

export const ModificationsNonPubliéesSansImageVueContributeur =
  mediumContainerStory(ModificationsNonPubliéesSansImageVueContributeurStory)
export const ModificationsNonPubliéesSansImageVueContributeurMobile =
  mobileStory(ModificationsNonPubliéesSansImageVueContributeurStory)

const ModificationsNonPubliéesAvecImageVueContributeurStory: Story = {
  args: {
    resource: {
      ...resource,
      updated: new Date(),
      image: { id: 'portrait', altText: 'Texte alternatif' },
    },
    user: creatorUser,
    isContributor: false,
  },
  render,
}

export const ModificationsNonPubliéesAvecImageVueContributeur =
  mediumContainerStory(ModificationsNonPubliéesAvecImageVueContributeurStory)
export const ModificationsNonPubliéesAvecImageVueContributeurMobile =
  mobileStory(ModificationsNonPubliéesAvecImageVueContributeurStory)
