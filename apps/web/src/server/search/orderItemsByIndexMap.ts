import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'

export const orderItemsByIndexMap = <T extends { id: string }>(
  items: T[],
  indexMap: Map<string, number>,
): T[] => {
  const result: T[] = Array.from({ length: indexMap.size })

  for (const item of items) {
    const sortedIndex = indexMap.get(item.id)
    if (sortedIndex === undefined) {
      throw new Error(`Item with id ${item.id} not found in search results`)
    }
    result[sortedIndex] = item
  }

  // If the items size is not complete, some items will be undefined
  return result.filter(isDefinedAndNotNull)
}
