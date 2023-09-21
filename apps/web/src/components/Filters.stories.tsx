import { Meta, StoryObj } from '@storybook/react'
import Filters from '@app/web/components/Filters'

export default {
  title: 'component/Filters',
  component: Filters,
} as Meta<typeof Filters>

type Story = StoryObj<typeof Filters>

export const Default: Story = {
  name: 'Multiple fitre',
  args: {
    label: 'Affiner la recherche',
    categories: [
      {
        id: 'thematics',
        label: 'Thématique',
        options: [
          {
            value: '1',
            name: 'Thématique 1',
          },
          {
            value: '2',
            name: 'Thématique 2',
          },
          {
            value: '3',
            name: 'Thématique 3',
          },
        ],
      },
      {
        id: 'supports',
        label: 'Type de support',
        options: [
          {
            value: '1',
            name: 'Support 1',
          },
          {
            value: '2',
            name: 'Support 2',
          },
          {
            value: '3',
            name: 'Support 3',
          },
        ],
      },
      {
        id: 'publics',
        label: 'Public cible',
        options: [
          {
            value: '1',
            name: 'Public 1',
          },
          {
            value: '2',
            name: 'Public 2',
          },
          {
            value: '3',
            name: 'Public 3',
          },
        ],
      },
    ],
  },
}
