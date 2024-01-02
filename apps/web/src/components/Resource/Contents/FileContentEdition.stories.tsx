import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { ComponentProps } from 'react'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import FileContentEdition from './FileContentEdition'

export default {
  title: 'Ressource/Content/File/Edition',
  component: FileContentEdition,
} as Meta<typeof FileContentEdition>

type Story = StoryObj<typeof FileContentEdition>

const Template = withTrpc(
  ({ content }: Pick<ComponentProps<typeof FileContentEdition>, 'content'>) => {
    const form = useForm<ClientContentPayload & { type: 'File' }>({
      resolver: zodResolver(EditContentCommandValidation),
      reValidateMode: 'onChange',
      mode: 'all',
      defaultValues: {},
    })

    return (
      <ResourceWrapper>
        <form>
          <FileContentEdition content={content} form={form} />
        </form>
      </ResourceWrapper>
    )
  },
)

const render = (props: ComponentProps<typeof Template>) => (
  <Template {...props} />
)

export const Ajouter: Story = {
  render,
  args: {
    content: {
      file: null,
    },
  },
}

export const AjouterMobile = mobileStory(Ajouter)

export const Remplacer: Story = {
  render,
  args: {
    content: {
      file: {
        name: 'Lorem_ipsum.pdf',
        size: 123_456,
        key: 'Lorem_ipsum.pdf',
        mimeType: 'application/pdf',
      },
    },
  },
}

export const RemplacerMobile = mobileStory(Remplacer)
