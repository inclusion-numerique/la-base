export const orderItemsByIndexMap = <T extends { id: string }>(
  items: T[],
  indexMap: Map<string, number>,
): T[] => {
  // Sort the items using resultIndexById as their new index
  const sortedItems = Array.from<T>({
    length: items.length,
  })

  for (const item of items) {
    const sortedIndex = indexMap.get(item.id)
    if (sortedIndex === undefined) {
      throw new Error(`Item with id ${item.id} not found in search results`)
    }
    sortedItems[sortedIndex] = item
  }

  return sortedItems
}
