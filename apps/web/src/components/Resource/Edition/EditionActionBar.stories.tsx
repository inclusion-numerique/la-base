import { Meta, StoryObj } from '@storybook/react'
import EditionActionBar from './EditionActionBar'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import { ResourceModificationState } from '../enums/ResourceModificationState'

export default {
  title: 'Ressource/EditionActionBar',
  component: EditionActionBar,
  argTypes: {
    action: { action: 'clicked' },
    modificationState: {
      options: [...Object.values(ResourceModificationState), null],
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
    modificationState: ResourceModificationState.SAVED,
    actionLabel: 'Publier la ressource',
  },
}

export const Modification: Story = {
  name: "Modification d'une ressource déjà publiée",
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    modificationState: ResourceModificationState.MODIFIED,
    actionLabel: 'Publier les modifications',
  },
}
