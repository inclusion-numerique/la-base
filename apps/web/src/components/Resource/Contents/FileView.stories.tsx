import { Meta, StoryObj } from '@storybook/react'
import { ComponentProps } from 'react'
import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import FileView from './FileView'

export default {
  title: 'Ressource/Content/File/View',
  component: FileView,
} as Meta<typeof FileView>

type Story = StoryObj<typeof FileView>

const Template = (props: ComponentProps<typeof FileView>) => (
  <ResourceWrapper>
    <FileView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof FileView>) => (
  <Template {...props} />
)

export const Desktop: Story = {
  render,
  args: {
    content: {
      title: 'Titre du fichier',
      file: {
        name: 'PDF68_version-longue.pdf',
        size: 73_000,
        key: 'file-key',
        mimeType: 'application/pdf',
      },
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
    },
  },
}

export const Mobile = mobileStory(Desktop)
