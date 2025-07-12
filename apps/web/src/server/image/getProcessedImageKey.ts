import { isImageCropped } from '@app/web/utils/imageCrop'
import { Image } from '@prisma/client'

const computeCropKey = ({
  cropTop,
  cropHeight,
  cropLeft,
  cropWidth,
}: {
  cropTop: number
  cropHeight: number
  cropLeft: number
  cropWidth: number
}) =>
  isImageCropped({ cropTop, cropHeight, cropLeft, cropWidth })
    ? `${cropTop}_${cropHeight}_${cropLeft}_${cropWidth}`
    : 'nocrop'

// When an original image is processed, we store it with a unique key depending on the processing parameters
// e.g. :
//  - uploadKey: 'main/user/3c108679-6452-4f96-8e0e-57f1d1a54893/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png'
//  -  id: 'ffc774ce-e916-4af7-9ae1-70d8cc1aa25d'
// -> 'main/images/ffc774ce-e916-4af7-9ae1-70d8cc1aa25d/user/3c108679-6452-4f96-8e0e-57f1d1a54893/uGt8OkKCeJzAroi2QDiog_Logo_Latitudes_TFG_Sticker.png_nocrop_256_100.webp'
export const getProcessedImageKey = ({
  image: { id, uploadKey, cropTop, cropHeight, cropLeft, cropWidth },
  quality,
  width,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
}) => {
  const parts = uploadKey.split('/')
  const namespace = parts[0]
  const filename = parts.at(-1)

  // Add the numbers cropTop, cropHeight, cropLeft, cropWidth as a unique string separted by _
  return `${namespace}/images/${id}/${filename}_${computeCropKey({
    cropTop,
    cropHeight,
    cropLeft,
    cropWidth,
  })}_${width ?? 'original'}_${quality}.webp`
}
