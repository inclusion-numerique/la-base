import { Meta, StoryObj } from '@storybook/react'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import BaseCard from './Card'

const base = {
  id: 'f41d4215-aee5-4b39-95c9-60484df15de9',
  title: 'Conseiller numérique France Services - contributions',
  slug: 'conseiller-numérique-france-services-contributions',
  isPublic: true,
  department: '08 - Ardennes',
  image: null,
  coverImage: null,
  _count: { resources: 8 },
} satisfies BaseListItem

export default {
  title: 'Base/Card',
  component: BaseCard,
} as Meta<typeof BaseCard>

type Story = StoryObj<typeof BaseCard>

export const Default: Story = { args: { base } }
