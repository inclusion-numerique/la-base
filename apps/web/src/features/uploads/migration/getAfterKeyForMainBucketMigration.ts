export const beforeMainBucket = 'la-base-uploads-main'
export const beforeLegacyBucket = 'la-base-legacy-uploads'
export const afterBucket = 'la-base-uploads'

/**
 * This function is used to migrate the main bucket to the new one
 * e.g. for images :
 *   'images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/user/3c108679-6452-4f96-8e0e-57f1d1a54893/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp'
 *   -> 'main/images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp'
 */
export const getAfterKeyForMainBucketMigration = (key: string) => {
  if (key.startsWith('images/')) {
    const parts = key.split('/')
    const imageId = parts[1]
    const filename = parts.at(-1)
    return `main/images/${imageId}/${filename}`
  }

  return `main/${key}`
}
