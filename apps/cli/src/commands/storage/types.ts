export type OrphanCategory =
  | 'no-upload-record'
  | 'upload-no-image'
  | 'image-no-entity'
  | 'orphaned-webp-cache'
  | 'legacy-unreferenced'

export type OrphanedFile = {
  key: string
  size: number
  lastModified?: Date
  category: OrphanCategory
  reason: string
}
