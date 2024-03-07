export const numberToString = (value: number) => value.toLocaleString('fr-FR')

export const numberToPercentage = (value: number) =>
  `${value.toPrecision(value >= 100 ? 3 : 2).toLocaleString()}%`
