import { ResourceWrapper } from '@app/storybook/components/ResourceWrapper'
import { mobileStory } from '@app/storybook/storyHelper'
import type { Meta, StoryObj } from '@storybook/nextjs'
import type { ComponentProps } from 'react'
import FileContentView from './FileContentView'

export default {
  title: 'Ressource/Content/File/View',
  component: FileContentView,
} as Meta<typeof FileContentView>

type Story = StoryObj<typeof FileContentView>

const Template = (props: ComponentProps<typeof FileContentView>) => (
  <ResourceWrapper>
    <FileContentView {...props} />
  </ResourceWrapper>
)

const render = (props: ComponentProps<typeof FileContentView>) => (
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
