import { Meta, StoryObj } from '@storybook/react'
import Header from '@app/web/components/Header'
import { testSessionUser } from '@app/web/test/testSessionUser'

export default {
  title: 'Header',
  component: Header,
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const SignedOut: Story = {
  name: 'Utilisateur non connecté',
}

export const SignedInNoBases: Story = {
  name: 'Utilisateur connecté - Sans bases',
  args: { user: testSessionUser },
}

export const SignedInWithBases: Story = {
  name: 'Utilisateur connecté - Avec bases',
  args: {
    user: {
      ...testSessionUser,
      ownedBases: [
        { id: 'a', title: 'Ma première base', slug: 'a', isPublic: true },
      ],
      bases: [
        {
          isAdmin: true,
          base: {
            id: 'b',
            title: 'Une autre base',
            slug: 'b',
            isPublic: false,
            collections: [],
          },
        },
      ],
      createdResources: [],
      resources: [],
    },
  },
}

/* TODO: components not working, issue with storybook and next/navigation
export const SignedOutBacklink: Story = {
  name: 'Avec lien de retour',
  args: { backLink: true },
}
*/
