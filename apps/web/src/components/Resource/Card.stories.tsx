import { Meta, StoryObj } from '@storybook/react'
import { ResourceItem } from '@app/web/server/resources'
import Card from './Card'

const resource: ResourceItem = {
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-ligne-très-longues',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae turpis sed vitae vel. Venenatis adipiscing elit.',
  created: new Date('1998-07-12'),
}

export default {
  title: 'Resource/Card',
  component: Card,
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    resource,
  },
}
export const DefaultMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    resource,
  },
}

export const WithImage: Story = {
  args: {
    resource,
    withImage: true,
  },
}

export const WithoutImageConnected: Story = {
  args: {
    resource,
    connected: true,
  },
}

export const WithImageConnected: Story = {
  args: {
    resource,
    connected: true,
    withImage: true,
  },
}
