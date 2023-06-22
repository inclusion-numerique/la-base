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

export const Brouillon: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    canPublish: false,
    unPublishedEdits: false,
  },
}

export const BrouillonEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVING,
    canPublish: false,
    unPublishedEdits: false,
  },
}

export const BrouillonModifié: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    canPublish: true,
    unPublishedEdits: true,
  },
}

export const Publique: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    canPublish: false,
    unPublishedEdits: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PrivéeEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.PRIVATE,
    editionState: ResourceEditionState.SAVING,
    canPublish: false,
    unPublishedEdits: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PubliqueModifiée: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    canPublish: true,
    unPublishedEdits: true,
  },
}
