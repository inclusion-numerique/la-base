'use client'

import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'
import Image from 'next/image'
import type { ComponentProps } from 'react'

const UploadedImage = ({
  alt,
  ...rest
}: Omit<ComponentProps<typeof Image>, 'loader'>) => (
  <Image {...rest} alt={alt ?? ''} loader={uploadedImageLoader} />
)
export default UploadedImage
