import { Meta, StoryObj } from '@storybook/react'
import Filters from '@app/web/components/Search/Filters/Filters'
import { categoryThemesOptions } from '@app/web/themes/themes'
import { supportTypeOptions } from '@app/web/themes/supportTypes'
import { targetAudienceOptions } from '@app/web/themes/targetAudiences'

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
        id: 'themes',
        label: 'Thématique',
        options: categoryThemesOptions,
      },
      {
        multiple: false,
        id: 'supportTypes',
        label: 'Type de support',
        options: supportTypeOptions,
      },
      {
        multiple: false,
        id: 'targetAudiences',
        label: 'Public cible',
        options: targetAudienceOptions,
      },
    ],
  },
}
