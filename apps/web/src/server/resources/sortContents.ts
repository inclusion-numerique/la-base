export const sortContents = <T extends { order: number }>(a: T, b: T) =>
  b.order - a.order
