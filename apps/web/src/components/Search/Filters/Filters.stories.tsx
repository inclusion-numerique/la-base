import { Meta, StoryObj } from '@storybook/react'
import Filters from '@app/web/components/Search/Filters/Filters'
import { categoryThemesOptions } from '@app/web/themes/themes'

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
        multiple: true,
        id: 'thematics',
        label: 'Thématique',
        options: categoryThemesOptions,
      },
      {
        multiple: false,
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
        multiple: false,
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
