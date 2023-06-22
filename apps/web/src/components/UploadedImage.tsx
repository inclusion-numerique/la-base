'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'
import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'

const UploadedImage = ({
  alt,
  ...rest
}: Omit<ComponentProps<typeof Image>, 'loader'>) => (
  <Image {...rest} alt={alt ?? ''} loader={uploadedImageLoader} />
)
export default UploadedImage
