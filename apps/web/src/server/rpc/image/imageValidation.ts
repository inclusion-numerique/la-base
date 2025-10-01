import {
  fileValidation,
  type ServerFileValidationOptions,
} from '@app/ui/components/Form/utils/fileValidation.server'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { z } from 'zod'

export const imageMaxSize = 10_000_000
export const imageAllowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp']

export const imageAllowedExtensions = imageAllowedMimeTypes.map(
  (mimeType) => mimeType.split('/')[1],
)

export const imageUploadHint = (
  size?: { h: number; w: number } | null,
): string => {
  const hintSize: string = size
    ? `Résolution recommandée : ${size.w}x${size.h} px. `
    : ``

  return `${hintSize}Taille maximale : ${formatByteSize(
    imageMaxSize,
  )}. Formats supportés : ${imageAllowedExtensions.join(', ')}.`
}

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

const cropErrorMessage = 'Veuillez choisir une zone à recadrer valide'
const normalizedCropValue = z
  .number()
  .min(0, cropErrorMessage)
  .max(1, cropErrorMessage)

const cropValidation = {
  cropHeight: normalizedCropValue.default(defaultCropValues.cropHeight),
  cropWidth: normalizedCropValue.default(defaultCropValues.cropWidth),
  cropTop: normalizedCropValue.default(defaultCropValues.cropTop),
  cropLeft: normalizedCropValue.default(defaultCropValues.cropLeft),
}

export const ImageValidation = z.object({
  file: fileValidation(imageFileValidationOptions),
  altText: z.string().nullish(),
  ...cropValidation,
})

export const UpdateImageValidation = z.object({
  id: z.string(),
  ...cropValidation,
})

export type ImageData = z.infer<typeof ImageValidation>
export type UpdateImageData = z.infer<typeof UpdateImageValidation>
