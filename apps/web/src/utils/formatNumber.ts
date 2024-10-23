export const numberToString = (value: number) => value.toLocaleString('fr-FR')

export const numberToPercentage = (value: number) =>
  `${value.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  })} %`
