import type { SelectOption } from '@app/ui/components/Form/utils/options'

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
