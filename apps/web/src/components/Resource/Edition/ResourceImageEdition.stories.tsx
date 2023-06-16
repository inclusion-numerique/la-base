import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { sendCommandMock } from '@app/storybook/mocks/sendCommandMock'
import { mobileStory } from '@app/storybook/storyHelper'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import ResourceImageEdition from '@app/web/components/Resource/Edition/ResourceImageEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

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
        setEditing={() => {}}
        sendCommand={sendCommandMock}
      />
    </ResourceWrapper>
  ),
)

export const Ajout = {
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
          id: 'paysage.webp',
        },
      }}
      editing=""
    />
  ),
}
export const RemplacementMobile = mobileStory(Remplacement)
