import type { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  categoryThemesOptions,
  type Category as ThemeCategory,
} from '@app/web/themes/themes'

export type FilterKey =
  | 'themes'
  | 'resourceTypes'
  | 'beneficiaries'
  | 'professionalSectors'
  | 'departements'

export type Category =
  | { multiple: false; id: FilterKey; label: string; options: SelectOption[] }
  | {
      multiple: true
      id: FilterKey
      label: string
      options: { [key in string]: SelectOption[] }
    }

export interface ThematicSelection {
  category: FilterKey
  option: SelectOption
}

export function isCategoryComplete(
  category: ThemeCategory,
  selectedThematics: ThematicSelection[],
): boolean {
  const categoryOptions = categoryThemesOptions[category]
  const selectedCategoryOptions = selectedThematics.filter((item) => {
    const option = item.option
    return option.extra?.category === category
  })
  return categoryOptions.length === selectedCategoryOptions.length
}
