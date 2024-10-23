const getDateValue = (date: Date | null | undefined, defaultValue: number) =>
  date?.getTime() ?? defaultValue

export const compareDates = (
  a: Date | null | undefined,
  b: Date | null | undefined,
  nullsFirst = true,
) =>
  getDateValue(a, nullsFirst ? Number.MIN_VALUE : Number.MAX_VALUE) -
  getDateValue(b, nullsFirst ? Number.MIN_VALUE : Number.MAX_VALUE)
