import { sPluriel } from './sPluriel'

export const pluralize = (expression: string, count: number) =>
  expression
    .split(' ')
    .map((mot) => `${mot}${sPluriel(count)}`)
    .join(' ')
