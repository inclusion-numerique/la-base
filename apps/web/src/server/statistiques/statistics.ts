export const sum = (a: number, b: number) => a + b

export const percentage = (value: number, total: number) =>
  total === 0 ? 0 : Math.round((value * 100) / total)

export const computeCumulative = <T extends Record<string, any>>(
  data: T[],
  numericalKeys: (keyof T)[],
): T[] => {
  const cumulativeData: T[] = []

  for (let i = 0; i < data.length; i++) {
    const currentItem = { ...data[i] }

    for (const key of numericalKeys) {
      let cumulativeValue = currentItem[key] as number

      for (let j = 0; j < i; j++) {
        cumulativeValue += data[j][key] as number
      }

      currentItem[key] = cumulativeValue as T[keyof T]
    }

    cumulativeData.push(currentItem)
  }

  return cumulativeData
}
