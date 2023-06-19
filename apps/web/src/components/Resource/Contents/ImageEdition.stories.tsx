import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Meta, StoryObj } from '@storybook/react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { ComponentProps } from 'react'
import { EditContentCommandValidation } from '@app/web/server/resources/feature/EditContent'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import ImageEdition from './ImageEdition'

export default {
  title: 'Ressource/Content/Image/Edition',
  component: ImageEdition,
} as Meta<typeof ImageEdition>

type Story = StoryObj<typeof ImageEdition>

const Template = withTrpc(
  ({ content }: Pick<ComponentProps<typeof ImageEdition>, 'content'>) => {
    const form = useForm<ClientContentPayload & { type: 'Image' }>({
      resolver: zodResolver(EditContentCommandValidation),
      reValidateMode: 'onChange',
      mode: 'all',
      defaultValues: {},
    })

    return (
      <ResourceWrapper>
        <form>
          <ImageEdition content={content} form={form} />
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
      imageAltText: null,
      image: null,
    },
  },
}

export const AjouterMobile = mobileStory(Ajouter)

export const Remplacer: Story = {
  render,
  args: {
    content: {
      imageAltText: 'Un paysage',
      image: {
        id: 'paysage.webp',
        altText: '',
        width: 3156,
        height: 1476,
        upload: {
          name: 'paysage.webp',
          key: 'paysage.webp',
        },
      },
    },
  },
}

export const RemplacerMobile = mobileStory(Remplacer)
