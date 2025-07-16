import { getAfterKeyForMainBucketMigration } from './getAfterKeyForMainBucketMigration'

describe('getAfterKeyForMainBucketMigration', () => {
  it('should return the correct key for an image', () => {
    const key =
      'images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/user/3c108679-6452-4f96-8e0e-57f1d1a54893/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp'
    const result = getAfterKeyForMainBucketMigration(key)
    expect(result).toBe(
      'main/images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp',
    )
  })

  it('should return the correct key for a non-image', () => {
    const key = 'user/id123/test.pdf'
    const result = getAfterKeyForMainBucketMigration(key)
    expect(result).toBe('main/user/id123/test.pdf')
  })
})
