import { z } from 'zod'
import { formatByteSize } from '@app/ui/utils/formatByteSize'

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

export type FileValidationOptions = {
  required?: boolean
  requiredMessage?: string
  maxSizeInBytes?: number
  maxSizeMessage?: string | ((maxSize: number) => string)
  acceptedMimeTypes?: string[]
  acceptedMimeTypesMessage?: string
}

export const fileValidation = ({
  required,
  requiredMessage = 'Veuillez choisir un fichier',
  maxSizeInBytes,
  maxSizeMessage = fileSizeValidationErrorMessage,
  acceptedMimeTypes,
  acceptedMimeTypesMessage = "Ce type de fichier n'est pas accepté",
}: FileValidationOptions) => {
  let validation = z.custom<File>()

  if (required) {
    validation = validation.refine(
      (value) => !!value && value instanceof File && value.name.length > 0,
      requiredMessage,
    )
  }
  if (maxSizeInBytes) {
    const sizeValidation = fileSizeValidation(maxSizeInBytes, maxSizeMessage)

    validation = validation.refine(
      (value) =>
        (!required && !value) ||
        (value instanceof File && sizeValidation.safeParse(value.size).success),
      typeof maxSizeMessage === 'function'
        ? maxSizeMessage(maxSizeInBytes)
        : maxSizeMessage,
    )
  }

  if (acceptedMimeTypes) {
    const typeValidation = fileMimeTypeValidation(
      acceptedMimeTypes,
      acceptedMimeTypesMessage,
    )

    validation = validation.refine(
      (value) =>
        (!required && !value) ||
        (value instanceof File && typeValidation.safeParse(value.type).success),
      acceptedMimeTypesMessage,
    )
  }

  return validation
}

export const optionalFileValidation = (options: FileValidationOptions) =>
  fileValidation(options).nullish()
