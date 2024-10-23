export const compareFromArrayIndex = <T>(a: T, b: T, index: T[]) =>
  index.indexOf(a) - index.indexOf(b)
