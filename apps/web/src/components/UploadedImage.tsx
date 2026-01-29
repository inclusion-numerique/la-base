'use client'

import type { AccessibleImageProps } from '@app/ui/utils/imageAccessibility'
import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'
import Image from 'next/image'
import type { ComponentProps } from 'react'

const UploadedImage = ({
  alt,
  ...rest
}: Omit<ComponentProps<typeof Image>, 'loader' | 'alt'> &
  AccessibleImageProps) => (
  <Image {...rest} alt={alt} loader={uploadedImageLoader} />
)
export default UploadedImage
