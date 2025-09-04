import {
  format as dateFnsFormat,
  type FormatOptions,
  setDefaultOptions,
} from 'date-fns'
import { fr } from 'date-fns/locale'

setDefaultOptions({ locale: fr })

export function formatDate(
  date: Date,
  format: string,
  options?: FormatOptions,
): string
export function formatDate(
  date: Date | undefined,
  format: string,
  options?: FormatOptions,
): string | undefined
export function formatDate(
  date: Date | null,
  format: string,
  options?: FormatOptions,
): string | null
export function formatDate(
  date: Date | undefined | null,
  format: string,
  options?: FormatOptions,
): string | undefined | null
export function formatDate(
  date: Date | undefined | null,
  format: string,
  options?: FormatOptions,
): string | undefined | null {
  if (!date) {
    return date
  }
  return dateFnsFormat(date, format, options)
}

type DateFormatter = {
  (date: Date): string
  (date: Date | null): string | null
  (date: Date | undefined): string | undefined
  (date: Date | null | undefined): string | null | undefined
}

export const dateFormatter = (
  format: string,
  options?: FormatOptions,
): DateFormatter =>
  ((date) => formatDate(date, format, options)) as DateFormatter
