import { Meta, StoryObj } from '@storybook/react'
import { mediumContainerStory, mobileStory } from '@app/storybook/storyHelper'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { testSessionUser } from '@app/web/test/testSessionUser'
import ProfileCard from './ProfileCard'

const profile = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  name: 'Jean Biche',
  image: null,
  firstName: 'Jean',
  lastName: 'Biche',
  followedBy: [],
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

export default {
  title: 'Profile/Card',
  component: ProfileCard,
} as Meta<typeof ProfileCard>

type Story = StoryObj<typeof ProfileCard>

const AvecImageStory: Story = {
  args: {
    profile: {
      ...profile,
      image: {
        id: 'portrait',
        altText: 'Jean Biche',
      },
    },
    user: testSessionUser,
  },
}

export const AvecImage = mediumContainerStory(AvecImageStory)

export const AvecImageMobile = mobileStory(AvecImageStory)

const NonSuiviStory: Story = { args: { profile } }

export const NonSuivi = mediumContainerStory(NonSuiviStory)

export const NonSuiviMobile = mobileStory(NonSuiviStory)

const SuiviStory: Story = {
  args: {
    profile: {
      ...profile,
      followedBy: [{ id: testSessionUser.id }],
    },
    user: testSessionUser,
  },
}

export const Suivi = mediumContainerStory(SuiviStory)

export const SuiviMobile = mobileStory(SuiviStory)
