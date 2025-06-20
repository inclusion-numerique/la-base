import SearchFilters from '@app/web/components/Search/Filters/SearchFilters'
import { beneficiariesOptions } from '@app/web/themes/beneficiairies'
import { professionalSectorsOptions } from '@app/web/themes/professionalSectors'
import { resourceTypesOptions } from '@app/web/themes/resourceTypes'
import { categoryThemesOptions } from '@app/web/themes/themes'
import type { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'component/Filters',
  component: SearchFilters,
} as Meta<typeof SearchFilters>

type Story = StoryObj<typeof SearchFilters>

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
        id: 'resourceTypes',
        label: 'Type de ressource',
        options: resourceTypesOptions,
      },
      {
        multiple: false,
        id: 'beneficiaries',
        label: 'Bénéficiaires',
        options: beneficiariesOptions,
      },
      {
        multiple: false,
        id: 'professionalSectors',
        label: 'Secteurs professionnels',
        options: professionalSectorsOptions,
      },
    ],
  },
}
