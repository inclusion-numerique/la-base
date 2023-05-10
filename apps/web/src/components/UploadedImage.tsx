'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'
import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'

const UploadedImage = (props: Omit<ComponentProps<typeof Image>, 'loader'>) => (
  <Image {...props} loader={uploadedImageLoader} />
)
export default UploadedImage
