import type { Meta, StoryObj } from '@storybook/react'
import { resource } from '@app/web/components/Resource/Cards/cardsStoriesHelpers'
import {
  FeaturedResource,
  type FeaturedResourceProps,
} from './FeaturedResource'

const FEATURED_RESSOURCE: FeaturedResourceProps['resource'] = resource

const meta = {
  title: "Page d'accueil/Ressource à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Ressource à la une publiée dans une base",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=11395-86067',
      },
    ],
  },
  component: FeaturedResource,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedResource>

export default meta
type Story = StoryObj<typeof meta>

export const PublishedInBase: Story = {
  args: { resource: FEATURED_RESSOURCE, user: null },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInBase.storyName =
  "Page d'accueil - Ressource à la une publiée dans une base"

export const PublishedInProfileProfile: Story = {
  args: {
    resource: {
      ...FEATURED_RESSOURCE,
      base: null,
    },
    user: null,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInProfileProfile.storyName =
  "Page d'accueil - Ressource à la une publiée dans un profil public"

export const PublishedInPrivateProfile: Story = {
  args: {
    resource: {
      ...FEATURED_RESSOURCE,
      base: null,
      createdBy: {
        ...FEATURED_RESSOURCE.createdBy,
        isPublic: false,
      },
    },
    user: null,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedResource {...args} />
    </div>
  ),
}
PublishedInPrivateProfile.storyName =
  "Page d'accueil - Ressource à la une publiée dans un profil privé"
