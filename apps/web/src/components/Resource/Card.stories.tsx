import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Card from './Card'

const date = new Date('1998-07-12')
const resource = {
  id: '7a7a8e12-3fdb-4485-8f9d-112bce55d302',
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: date,
  updated: date,
  published: date,
  base: { title: 'Titre de la base', slug: 'titre-de-la-base', isPublic: true },
  isPublic: true,
  createdBy: {
    id: '1',
    name: 'Jean Biche',
  },
  image: null,
} satisfies ResourceListItem
const creatorUser = { ...testSessionUser, id: resource.createdBy.id }

export default {
  title: 'Ressource/Card',
  component: Card,
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

const Template = (props: ComponentProps<typeof Card>) => (
  <ResourcesListWrapper>
    <Card {...props} />
  </ResourcesListWrapper>
)

const render = (props: ComponentProps<typeof Card>) => <Template {...props} />

export const BrouillonSansImage: Story = {
  args: {
    resource: { ...resource, published: null },
    user: creatorUser,
  },
  render,
}

export const BrouillonAvecImage: Story = {
  args: {
    resource: {
      ...resource,
      published: null,
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
    user: creatorUser,
  },
  render,
}

export const BrouillonModifiéSansImage: Story = {
  args: {
    resource: { ...resource, updated: new Date(), published: null },
    user: creatorUser,
  },
  render,
}

export const BrouillonModifiéAvecImage: Story = {
  args: {
    resource: {
      ...resource,
      updated: new Date(),
      published: null,
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
    user: creatorUser,
  },
  render,
}

export const SansImageVueContributeur: Story = {
  args: {
    resource,
    user: creatorUser,
  },
  render,
}

export const AvecImageVueContributeur: Story = {
  args: {
    resource: {
      ...resource,
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
    user: creatorUser,
  },
  render,
}

export const SansImageVueVisiteur: Story = {
  args: {
    resource,
    user: testSessionUser,
  },
  render,
}

export const AvecImageVueVisiteur: Story = {
  args: {
    resource: {
      ...resource,
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
    user: testSessionUser,
  },
  render,
}

export const ModificationsNonPubliéesSansImageVueContributeur: Story = {
  args: {
    resource: { ...resource, updated: new Date() },
    user: creatorUser,
  },
  render,
}

export const ModificationsNonPubliéesAvecImageVueContributeur: Story = {
  args: {
    resource: {
      ...resource,
      updated: new Date(),
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
    user: creatorUser,
  },
  render,
}

export const AvecImageVueVisiteurMobile = mobileStory(AvecImageVueVisiteur)

export const ModificationsNonPubliéesAvecImageVueContributeurMobile =
  mobileStory(ModificationsNonPubliéesAvecImageVueContributeur)
