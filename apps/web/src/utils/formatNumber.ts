export const numberToString = (value: number) => value?.toLocaleString('fr-FR')

export const optionalNumberToString = <T>(
  value?: number | null,
  defaultValue?: T,
): string | T =>
  typeof value === 'number' ? numberToString(value) : (defaultValue ?? '')

export const numberToPercentage = (value: number) =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })} %`
