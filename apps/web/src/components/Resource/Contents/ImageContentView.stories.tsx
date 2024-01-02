import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import ImageContentView from './ImageContentView'

export default {
  title: 'Ressource/Content/Image/View',
  component: ImageContentView,
} as Meta<typeof ImageContentView>

type Story = StoryObj<typeof ImageContentView>

const Template = (props: ComponentProps<typeof ImageContentView>) => (
  <ResourceWrapper>
    <ImageContentView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof ImageContentView>) => (
  <Template {...props} />
)

export const Paysage: Story = {
  render,
  args: {
    content: {
      title: 'Titre de l’image',
      imageAltText: 'Image de paysage',
      image: {
        id: 'paysage.webp',
        width: 3156,
        height: 1476,
        altText: '',
        upload: {
          name: 'paysage.webp',
          key: 'image-key',
        },
      },
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
    },
  },
}

export const PaysageMobile = mobileStory(Paysage)

export const Portrait: Story = {
  render,
  args: {
    content: {
      title: 'Titre de l’image',
      imageAltText: 'Image de paysage',
      image: {
        id: 'portrait.webp',
        width: 1920,
        height: 2880,
        altText: '',
        upload: {
          name: 'portrait.webp',
          key: 'image-key',
        },
      },
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
    },
  },
}

export const PortraitMobile = mobileStory(Portrait)
