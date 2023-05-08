type NoUndefinedField<T> = {
  [P in keyof T]-?: NonNullable<T[P]>
}

export const removeNullAndUndefinedValues = <T>(data: T): NoUndefinedField<T> =>
  Object.fromEntries(
    Object.entries(data as Record<string, unknown>).filter(
      ([, value]) => value !== null && value !== undefined,
    ),
  ) as NoUndefinedField<T>
