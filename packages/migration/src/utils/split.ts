export const split = <T>(
  data: T[],
  decision: (item: T) => boolean,
): [T[], T[]] => {
  const left: T[] = []
  const right: T[] = []
  for (const item of data) {
    if (decision(item)) {
      left.push(item)
    } else {
      right.push(item)
    }
  }
  return [left, right]
}
