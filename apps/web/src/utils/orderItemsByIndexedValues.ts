import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

export const orderItemsByIndexMap = <T extends { id: string }>(
  items: T[],
  indexMap: Map<string, number>,
): T[] => {
  // Sort the items using resultIndexById as their new index
  const sortedItems = Array.from<T>({
    length: indexMap.size,
  })

  for (const item of items) {
    const sortedIndex = indexMap.get(item.id)
    if (sortedIndex === undefined) {
      throw new Error(`Item with id ${item.id} not found in search results`)
    }
    sortedItems[sortedIndex] = item
  }

  // If the items size is not complete, some items will be undefined
  return sortedItems.filter(isDefinedAndNotNull)
}

export const orderItemsByIndexedValues = <T extends { id: string }>(
  items: T[],
  indexedValues: string[],
): T[] => {
  const indexMap = new Map<string, number>(
    indexedValues.map((id, index) => [id, index]),
  )

  return orderItemsByIndexMap(items, indexMap)
}
