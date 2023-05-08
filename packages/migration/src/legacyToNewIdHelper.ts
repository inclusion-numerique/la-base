export type MigratedModel = { legacyId: number | null; id: string }

export type LegacyToNewIdHelper = (legacyId: number) => string

export const createLegacyToNewIdHelper = <T extends MigratedModel>(
  data: T[],
  createNotFoundErrorMessage?: (model: { legacyId: number }) => string,
): ((legacyId: number) => string) => {
  const idsMap = new Map(
    data
      .filter(
        (item): item is T & { legacyId: number } => item.legacyId !== null,
      )
      .map(({ legacyId, id }) => [legacyId, id]),
  )

  return (legacyId: number) => {
    const newId = idsMap.get(legacyId)
    if (!newId) {
      throw new Error(
        createNotFoundErrorMessage
          ? createNotFoundErrorMessage({ legacyId })
          : `Model with legacyId ${legacyId} not found`,
      )
    }
    return newId
  }
}

export const createLegacyToNewKeyHelper = <
  T extends { legacyKey: string | null; key: string },
>(
  data: T[],
  createNotFoundErrorMessage?: (model: { legacyKey: string }) => string,
): ((legacyKey: string) => string) => {
  const keysMap = new Map(
    data
      .filter(
        (item): item is T & { legacyKey: string } => item.legacyKey !== null,
      )
      .map(({ legacyKey, key }) => [legacyKey, key]),
  )

  return (legacyKey: string) => {
    const newKey = keysMap.get(legacyKey)
    if (!newKey) {
      throw new Error(
        createNotFoundErrorMessage
          ? createNotFoundErrorMessage({ legacyKey })
          : `Model with legacyKey ${legacyKey} not found`,
      )
    }
    return newKey
  }
}
