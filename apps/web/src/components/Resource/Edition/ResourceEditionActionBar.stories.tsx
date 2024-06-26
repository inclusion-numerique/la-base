import { Meta, StoryObj } from '@storybook/react'
import { createTestResource, createTestUser } from '@app/web/test/helpers'
import { ResourceEditionState } from '../enums/ResourceEditionState'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import ResourceEditionActionBar from './ResourceEditionActionBar'

export default {
  title: 'Ressource/EditionActionBar',
  component: ResourceEditionActionBar,
  argTypes: {
    action: { action: 'clicked' },
    editionState: {
      options: [...Object.values(ResourceEditionState), null],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof ResourceEditionActionBar>

type Story = StoryObj<typeof ResourceEditionActionBar>

const resource = createTestResource(createTestUser())

export const Brouillon: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: false,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}

export const BrouillonEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVING,
    unPublishedEdits: false,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}

export const BrouillonModifié: Story = {
  args: {
    publishedState: ResourcePublishedState.DRAFT,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: true,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}

export const Publique: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: false,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PrivéeEnregistrement: Story = {
  args: {
    publishedState: ResourcePublishedState.PRIVATE,
    editionState: ResourceEditionState.SAVING,
    unPublishedEdits: false,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export const PubliqueModifiée: Story = {
  args: {
    publishedState: ResourcePublishedState.PUBLIC,
    editionState: ResourceEditionState.SAVED,
    unPublishedEdits: true,
    resource,
    isSubmitting: false,
    onDelete: () => {},
    onPublish: () => {},
    publishMode: false,
  },
}
