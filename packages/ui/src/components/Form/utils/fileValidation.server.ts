import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { z } from 'zod'

export const maximumFileSizeInBytes = 100_000_000

export const fileUploadHint: string = `Taille maximale : ${formatByteSize(
  maximumFileSizeInBytes,
)}. Tous les formats sont supportés.`

export const fileMimeTypeValidation = (
  allowedTypes: string[],
  message?: string,
) => z.string().refine((value) => allowedTypes.includes(value), message)

export const fileSizeValidation = (
  maxSizeInBytes: number,
  message?: string | ((maxSize: number) => string),
) =>
  z
    .number()
    .int()
    .max(
      maxSizeInBytes,
      message
        ? typeof message === 'string'
          ? message
          : message(maxSizeInBytes)
        : undefined,
    )

const fileSizeValidationErrorMessage = (maxSize: number) =>
  `La taille du fichier doit être inférieure à ${formatByteSize(maxSize)}`

export type ServerFileValidationOptions = {
  requiredMessage?: string
  maxSizeInBytes?: number
  maxSizeMessage?: string | ((maxSize: number) => string)
  acceptedMimeTypes?: string[]
  acceptedMimeTypesMessage?: string
}
export const fileValidation = ({
  requiredMessage = 'Veuillez choisir un fichier',
  maxSizeInBytes = maximumFileSizeInBytes,
  maxSizeMessage = fileSizeValidationErrorMessage,
  acceptedMimeTypes,
  acceptedMimeTypesMessage = "Ce type de fichier n'est pas accepté",
}: ServerFileValidationOptions) => {
  const sizeValidation = maxSizeInBytes
    ? fileSizeValidation(maxSizeInBytes, maxSizeMessage)
    : undefined

  const typeValidation = acceptedMimeTypes
    ? fileMimeTypeValidation(acceptedMimeTypes, acceptedMimeTypesMessage)
    : undefined

  return z.object(
    {
      key: z.string({ required_error: 'Veuillez téléverser un fichier' }),
      mimeType:
        acceptedMimeTypes && typeValidation
          ? z
              .string()
              .refine(
                (value) => !value || typeValidation.safeParse(value).success,
                acceptedMimeTypesMessage,
              )
          : z.string(),
      name: z.string(),
      size:
        maxSizeInBytes && sizeValidation
          ? z
              .number()
              .refine(
                (value) => !value || sizeValidation.safeParse(value).success,
                typeof maxSizeMessage === 'function'
                  ? maxSizeMessage(maxSizeInBytes)
                  : maxSizeMessage,
              )
          : z.number().int().positive(),
    },
    { required_error: requiredMessage },
  )
}

export const optionalFileValidation = (options: ServerFileValidationOptions) =>
  fileValidation(options).nullish()
