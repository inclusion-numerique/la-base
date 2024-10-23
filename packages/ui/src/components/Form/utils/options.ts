import type { ReactNode } from 'react'

export type SelectOption<
  T = string,
  E extends Record<string, unknown> = Record<string, unknown>,
> = {
  label: string
  value: T
  disabled?: boolean
  hidden?: boolean
  hint?: string
  extra?: E
}

export type SelectOptionGroup<T extends string = string> = {
  label: string
  options: SelectOption<T>[]
  disabled?: boolean
  hidden?: boolean
}

export type SelectInputOption<T extends string = string> =
  | SelectOption<T>
  | SelectOptionGroup<T>

export type RichRadioOption<T extends string = string> = {
  label: string
  image?: string | ReactNode
  imageAlt?: string
  value: T
  hint?: string
  disabled?: boolean
}

export const labelsToOptions = <T extends string>(
  object: Record<T, string>,
  { hints }: { hints?: Partial<Record<T, string>> } = {},
): SelectOption<T>[] =>
  Object.entries(object).map(([value, label]) =>
    hints
      ? ({
          label,
          value,
          hint: hints[value as T],
        } as SelectOption<T>)
      : ({ label, value } as SelectOption<T>),
  )

export const optionsWithEmptyValue = <T extends string>(
  options: SelectOption<T>[],
): SelectOption<T>[] => [
  { label: '', value: '' } as SelectOption<T>,
  ...options,
]
