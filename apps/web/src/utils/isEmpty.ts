import { isDefinedAndNotNull } from './isDefinedAndNotNull'

export const isEmpty = <T>(value: T | T[] | null | undefined): boolean =>
  Array.isArray(value)
    ? value.length === 0
    : !isDefinedAndNotNull(value) || value === ''
