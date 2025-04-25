import type { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import type { Meta, StoryObj } from '@storybook/react'
import { FeaturedProfil } from './FeaturedProfil'

const meta = {
  title: "Page d'accueil/Profil à la une",
  parameters: {
    layout: 'centered',
    design: [
      {
        type: 'figma',
        name: "Page d'accueil - Profil à la une",
        url: 'https://www.figma.com/file/Rk4NNQVYRBE0bJZ6i5mrfU/Les-Bases---V.2?node-id=10461-39471',
      },
    ],
  },
  component: FeaturedProfil,
  tags: ['autodocs'],
} satisfies Meta<typeof FeaturedProfil>

export default meta
type Story = StoryObj<typeof meta>

const profile = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  name: 'Jean Biche',
  image: null,
  firstName: 'Jean',
  lastName: 'Biche',
  followedBy: [],
  email: 'jean.biche@example.com',
  slug: 'jean-biche',
  _count: { followedBy: 4 },
  resourceEvent: [
    { resourceId: 'a' },
    { resourceId: 'b' },
    { resourceId: 'c' },
    { resourceId: 'd' },
  ],
  resources: [
    {
      resourceId: 'b',
    },
  ],
  createdResources: [
    {
      id: 'c',
    },
    {
      id: 'd',
    },
  ],
} satisfies ProfileListItem

export const Profile: Story = {
  args: {
    profile,
    user: null,
  },
  render: (args) => (
    <div style={{ width: '380px' }}>
      <FeaturedProfil {...args} />
    </div>
  ),
}
Profile.storyName = "Page d'accueil - Profil à la une"
