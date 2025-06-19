import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import type { ImageLoader } from 'next/image'

export const uploadedImageLoader: ImageLoader = ({
  src,
  ...params
}: {
  src: string
}) =>
  `/images/${src}.webp?${new URLSearchParams(
    removeNullAndUndefinedValues(params),
  ).toString()}`
