import { Meta, StoryObj } from '@storybook/react'
import CreateResourceModal from '@app/web/app/@modal/(.)creer-une-ressource/CreateResourceModal'
import { testSessionUser } from '@app/web/test/testSessionUser'

export default {
  title: 'CreateResourceModal',
  component: CreateResourceModal,
} as Meta<typeof CreateResourceModal>

type Story = StoryObj<typeof CreateResourceModal>

// TODO Cannot make story because of useRouter usage

export const NoBases: Story = {
  name: 'Utilisateur Sans base',
  args: { user: testSessionUser },
}

export const WithBases: Story = {
  name: 'Utilisateur avec bases',
  args: {
    user: {
      ...testSessionUser,
      ownedBases: [
        { id: 'a', title: 'Ma première base', slug: 'a', isPublic: true },
        { id: 'b', title: 'Une autre base', slug: 'b', isPublic: false },
      ],
    },
  },
}
