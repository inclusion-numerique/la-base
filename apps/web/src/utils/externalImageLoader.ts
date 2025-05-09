import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import type { ImageLoader } from 'next/image'

export const externalImageLoader: ImageLoader = ({
  src,
  ...params
}: {
  src: string
}) =>
  `/images/external?${new URLSearchParams({
    ...removeNullAndUndefinedValues(params),
    src,
  }).toString()}`
