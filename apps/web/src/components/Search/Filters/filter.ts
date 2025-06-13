import type { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  type Category as ThemeCategory,
  categoryThemesOptions,
} from '@app/web/themes/themes'
import { type SearchFilterSelectOption } from './SearchFilters'

export type FilterKey =
  | 'themes'
  | 'supportTypes'
  | 'targetAudiences'
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
  option: SelectOption | SearchFilterSelectOption
}

export function isCategoryComplete(
  category: ThemeCategory,
  selectedThematics: ThematicSelection[],
): boolean {
  const categoryOptions = categoryThemesOptions[category]
  const selectedCategoryOptions = selectedThematics.filter((item) => {
    const option = item.option as SearchFilterSelectOption
    return option.extra?.category === category
  })
  return categoryOptions.length === selectedCategoryOptions.length
}
