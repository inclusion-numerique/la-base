import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourcesListWrapper } from '@app/storybook/components/ResourcesListWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { testSessionUser } from '@app/web/test/testSessionUser'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Card from './Card'

const resource = {
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: new Date('1998-07-12'),
  updated: new Date('2022-07-12'),
  base: { title: 'Titre de la base', slug: 'titre-de-la-base', isPublic: true },
  isPublic: true,
  createdBy: {
    id: '1',
    name: 'Jean Biche',
  },
  image: null,
} satisfies ResourceListItem

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

export const SansImage: Story = {
  args: {
    resource,
  },
  render,
}

export const SansImageMobile = mobileStory(SansImage)

export const AvecImage: Story = {
  args: {
    resource: {
      ...resource,
      image: { id: 'portrait.webp', altText: 'Texte alternatif' },
    },
  },
  render,
}

export const AvecImageMobile = mobileStory(AvecImage)

export const UtilisateurConnectéAvecImage: Story = {
  args: {
    resource: {
      ...resource,
      image: { id: 'paysage.webp', altText: 'Texte alternatif' },
    },
    user: testSessionUser,
  },
  render,
}
export const UtilisateurConnectéAvecImageMobile = mobileStory(
  UtilisateurConnectéAvecImage,
)

export const UtilisateurConnectéSansImage: Story = {
  args: {
    resource,
    user: testSessionUser,
  },
  render,
}
export const UtilisateurConnectéSansImageMobile = mobileStory(
  UtilisateurConnectéSansImage,
)
