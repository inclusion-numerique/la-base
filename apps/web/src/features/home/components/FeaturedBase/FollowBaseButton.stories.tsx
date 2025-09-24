import type { Meta, StoryObj } from '@storybook/nextjs'
import FollowBaseButton from './FollowBaseButton'

const BASE = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  title: 'Nom de la base',
  followedBy: [{ id: '0', followerId: '0', follower: true }],
}

const meta = {
  title: "Page d'accueil/Suivre une base",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Suivre une base",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39435',
      },
    ],
  },
  component: FollowBaseButton,
  tags: ['autodocs'],
} satisfies Meta<typeof FollowBaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const FollowBaseNotFollowing: Story = {
  args: {
    userId: '0',
    ...BASE,
    followedBy: [
      {
        id: '1',
        followerId: '1',
        follower: true,
      },
    ],
  },
}
FollowBaseNotFollowing.storyName =
  "Page d'accueil - Suivre une base - base non suivie"

export const FollowBaseFollowing: Story = {
  args: { userId: '0', ...BASE },
}
FollowBaseFollowing.storyName = "Page d'accueil - Suivre une base - base suivie"

export const FollowBaseNotLoggedIn: Story = {
  args: BASE,
}
FollowBaseNotLoggedIn.storyName =
  "Page d'accueil - Suivre une base - non connecté"
