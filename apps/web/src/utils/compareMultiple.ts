// Return first unequal compare
export const compareMultiple = (...comparisons: number[]) => {
  for (const comparison of comparisons) {
    if (comparison !== 0) {
      return comparison
    }
  }
  return 0
}
