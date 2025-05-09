import { mobileStoryParameters } from '@app/storybook/storyHelper'
import Header from '@app/web/components/Header'
import { testSessionUser } from '@app/web/test/testSessionUser'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Header',
  component: Header,
  parameters: {
    design: [
      {
        name: 'Header',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=609-103798&t=MbwOB3HnF8uqKTBI-1',
      },
      {
        name: 'Menu',
        type: 'figma',
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=8128-59572&t=MbwOB3HnF8uqKTBI-4',
      },
    ],
  },
} as Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const SignedOut: Story = {
  name: 'Utilisateur non connecté',
}

export const SignedOutMobile: Story = {
  name: 'Utilisateur non connecté - mobile',
  parameters: mobileStoryParameters,
}

export const SignedInNoBases: Story = {
  name: 'Utilisateur connecté - Sans bases',
  args: { user: testSessionUser },
}

export const SignedInNoBasesMobile: Story = {
  name: 'Utilisateur connecté - Sans bases - Mobile',
  args: { user: testSessionUser },
  parameters: mobileStoryParameters,
}

export const SignedInWithBases: Story = {
  name: 'Utilisateur connecté - Avec bases',
  args: {
    user: {
      ...testSessionUser,
      ownedBases: [
        {
          id: 'a',
          title: 'Ma première base',
          slug: 'a',
          isPublic: true,
          collections: [],
          savedCollections: [],
          image: null,
        },
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
            savedCollections: [],
            image: null,
          },
        },
      ],
      createdResources: [],
      resources: [],
    },
  },
}

export const SignedInWithBasesMobile: Story = {
  name: 'Utilisateur connecté - Avec bases - Mobile',
  args: {
    user: {
      ...testSessionUser,
      ownedBases: [
        {
          id: 'a',
          title: 'Ma première base',
          slug: 'a',
          isPublic: true,
          collections: [],
          savedCollections: [],
          image: null,
        },
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
            savedCollections: [],
            image: null,
          },
        },
      ],
      createdResources: [],
      resources: [],
    },
  },
  parameters: mobileStoryParameters,
}

/* TODO: components not working, issue with storybook and next/navigation
export const SignedOutBacklink: Story = {
  name: 'Avec lien de retour',
  args: { backLink: true },
}
*/
