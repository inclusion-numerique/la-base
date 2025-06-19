import type { Image } from '@prisma/client'

export const defaultCropValues = {
  cropHeight: 1,
  cropWidth: 1,
  cropTop: 0,
  cropLeft: 0,
} satisfies Pick<Image, 'cropHeight' | 'cropWidth' | 'cropTop' | 'cropLeft'>
