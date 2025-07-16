import { getProcessedImageKey } from '@app/web/server/image/getProcessedImageKey'

describe('getProcessedImageKey', () => {
  it('should return the correct key', () => {
    const image = {
      id: 'ffc774ce-e916-4af7-9ae1-70d8cc1aa25d',
      uploadKey:
        'main/user/3c108679-6452-4f96-8e0e-57f1d1a54893/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png',
      cropTop: 0,
      cropHeight: 1,
      cropLeft: 0,
      cropWidth: 1,
    }
    const processedImageKey = getProcessedImageKey({
      image,
      quality: 100,
      width: 256,
    })
    expect(processedImageKey).toBe(
      'main/images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp',
    )
  })
})
