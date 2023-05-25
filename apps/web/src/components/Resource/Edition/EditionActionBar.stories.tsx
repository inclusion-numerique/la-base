import { Meta, StoryObj } from '@storybook/react'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import EditionActionBar from './EditionActionBar'

export default {
  title: 'Ressource/EditionActionBar',
  component: EditionActionBar,
  argTypes: {
    action: { action: 'clicked' },
    editionState: {
      options: [...Object.values(ResourceEditionState), null],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof EditionActionBar>

type Story = StoryObj<typeof EditionActionBar>

export const Default: Story = {
  name: 'Ressource sans contenu crée',
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    actionLabel: 'Publier la ressource',
    actionDisabled: true,
  },
}

export const NewContent: Story = {
  name: 'Nouveau contenu ajouté',
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    actionLabel: 'Publier la ressource',
  },
}

export const Edition: Story = {
  name: "Edition d'une ressource déjà publiée",
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.EDITING,
    actionLabel: 'Publier les editions',
  },
}
