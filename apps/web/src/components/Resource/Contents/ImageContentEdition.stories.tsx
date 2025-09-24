import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  ImagePayload,
  ImagePayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentProps } from 'react'
import { useForm } from 'react-hook-form'
import ImageContentEdition from './ImageContentEdition'

export default {
  title: 'Ressource/Content/Image/Edition',
  component: ImageContentEdition,
} as Meta<typeof ImageContentEdition>

type Story = StoryObj<typeof ImageContentEdition>

const Template = withTrpc(
  ({
    content,
  }: Pick<ComponentProps<typeof ImageContentEdition>, 'content'>) => {
    const form = useForm<ImagePayload>({
      resolver: zodResolver(ImagePayloadCommandValidation),
      reValidateMode: 'onChange',
      mode: 'all',
      defaultValues: {},
    })

    return (
      <ResourceWrapper>
        <form>
          <ImageContentEdition content={content} form={form} />
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
        id: 'paysage',
        altText: '',
        width: 3156,
        height: 1476,
        upload: {
          name: 'paysage',
          key: 'paysage',
        },
      },
    },
  },
}

export const RemplacerMobile = mobileStory(Remplacer)
