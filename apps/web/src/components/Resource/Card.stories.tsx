import { Meta, StoryObj } from '@storybook/react'
import { ResourceListItem } from '@app/web/server/resources'
import { testSessionUser } from '@app/web/test/testSessionUser'
import Card from './Card'

const resource = {
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-ligne-très-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: new Date('1998-07-12'),
  updated: new Date('2022-07-12'),
  base: { title: 'Titre de la base', slug: 'titre-de-la-base' },
  createdBy: {
    id: '1',
    name: 'Jean Biche',
  },
} satisfies ResourceListItem

export default {
  title: 'Ressource/Card',
  component: Card,
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Default: Story = {
  name: 'Ressource',
  args: {
    resource,
  },
}

export const WithImage: Story = {
  name: 'Ressource avec image',
  args: {
    resource,
    withImage: true,
  },
}

export const WithImageConnected: Story = {
  name: 'Ressource utilisateur connecté avec image',
  args: {
    resource,
    user: testSessionUser,
    withImage: true,
  },
}

export const WithoutImageConnected: Story = {
  name: 'Ressource utilisateur connecté',
  args: {
    resource,
    user: testSessionUser,
  },
}

export const DefaultMobile: Story = {
  name: 'Mobile - Ressource',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    resource,
  },
}

export const WithImageMobile: Story = {
  name: 'Mobile - Ressource avec image',
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    resource,
    withImage: true,
  },
}
