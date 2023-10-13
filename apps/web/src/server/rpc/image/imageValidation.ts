import { z } from 'zod'
import {
  ServerFileValidationOptions,
  fileValidation,
} from '@app/ui/components/Form/utils/fileValidation.server'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'

export const imageMaxSize = 5_000_000
export const imageAllowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

export const imageAllowedExtensions = imageAllowedMimeTypes.map(
  (mimeType) => mimeType.split('/')[1],
)

export const imageUploadHint = `Taille maximale : ${formatByteSize(
  imageMaxSize,
)}. Formats supportés : ${imageAllowedExtensions.join(', ')}.`

export const imageFileValidationOptions = {
  maxSizeInBytes: imageMaxSize,
  acceptedMimeTypes: imageAllowedMimeTypes,
  requiredMessage: 'Veuillez choisir une image',
  acceptedMimeTypesMessage: `Veuillez choisir une image parmi les formats suivants : ${imageAllowedExtensions.join(
    ', ',
  )}`,
  maxSizeMessage: `Veuillez choisir une image de moins de ${formatByteSize(
    imageMaxSize,
  )}`,
} satisfies ServerFileValidationOptions

export const ImageValidation = z.object({
  file: fileValidation(imageFileValidationOptions),
  altText: z.string().nullish(),
  cropHeight: z.number().min(0).max(1).default(defaultCropValues.cropHeight),
  cropWidth: z.number().min(0).max(1).default(defaultCropValues.cropWidth),
  cropTop: z.number().min(0).max(1).default(defaultCropValues.cropTop),
  cropLeft: z.number().min(0).max(1).default(defaultCropValues.cropLeft),
})

export type ImageData = z.infer<typeof ImageValidation>
