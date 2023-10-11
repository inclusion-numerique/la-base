import { snakeCase } from 'change-case'

export const enumArrayToSnakeCaseStringArray = <T extends string>(
  enumArray: T[],
): string[] => enumArray.map((item) => snakeCase(item))
