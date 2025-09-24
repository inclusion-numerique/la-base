import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { sendCommandMock } from '@app/storybook/mocks/sendCommandMock'
import { mobileStory } from '@app/storybook/storyHelper'
import ResourceImageEdition from '@app/web/components/Resource/Edition/ResourceImageEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { noop } from '@app/web/utils/noop'
import type { Meta, StoryObj } from '@storybook/react'
import type { ComponentProps } from 'react'

export default {
  title: 'Ressource/ImageEdition',
  component: ResourceImageEdition,
} as Meta<typeof ResourceImageEdition>

type Story = StoryObj<typeof ResourceImageEdition>

const Template = withTrpc(
  ({
    resource,
    editing,
  }: Pick<
    ComponentProps<typeof ResourceImageEdition>,
    'resource' | 'editing'
  >) => (
    <ResourceWrapper>
      <ResourceImageEdition
        resource={resource}
        editing={editing}
        setEditing={noop}
        sendCommand={sendCommandMock}
      />
    </ResourceWrapper>
  ),
)

export const Ajout: Story = {
  render: () => (
    <Template
      resource={{
        id: '1',
        image: null,
      }}
      editing=""
    />
  ),
}

export const AjoutMobile = mobileStory(Ajout)

export const Remplacement: Story = {
  render: () => (
    <Template
      resource={{
        id: '1',
        image: {
          altText: 'Text alternatif',
          id: 'paysage',
        },
      }}
      editing=""
    />
  ),
}
export const RemplacementMobile = mobileStory(Remplacement)
