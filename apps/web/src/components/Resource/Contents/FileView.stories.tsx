import { Meta, StoryObj } from '@storybook/react'
import FileView from './FileView'

export default {
  title: 'Ressource/Content/File/View',
  component: FileView,
} as Meta<typeof FileView>

type Story = StoryObj<typeof FileView>

export const Default: Story = {
  name: 'Desktop',
  args: {
    content: {
      title: 'Titre du fichier',
      file: {
        name: 'PDF68.pdf',
        size: 73_000,
        key: 'file-key',
        mimeType: 'application/pdf',
      },
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
    },
  },
}

export const MobileDefault: Story = {
  name: 'Mobile',
  args: {
    content: {
      title: 'Titre du fichier',
      file: {
        name: 'PDF68.pdf',
        size: 73_000,
        key: 'file-key',
        mimeType: 'application/pdf',
      },
      caption:
        'Cras gravida dolor volutpat orci eleifend, sit amet lacinia mi egestas. Vivamus non lorem vitae justo rhoncus tincidunt. Nulla pulvinar nisi vitae odio elementum, nec sollicitudin dui dapibus.',
    },
  },
  parameters: {
    chromatic: { viewports: [320, 568] },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
}
