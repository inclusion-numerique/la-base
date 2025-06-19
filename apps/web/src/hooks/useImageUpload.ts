import type { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { createToast } from '@app/ui/toast/createToast'
import type { FieldValues, UseFormReturn } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import { trpc } from '../trpc'
import { getZodValidationMutationError } from '../utils/getZodValidationMutationError'
import { useFileUpload } from './useFileUpload'

export const useImageUpload = <T extends FieldValues>(
  form: UseFormReturn<T>,
) => {
  const createImage = trpc.image.create.useMutation()

  const updateImage = trpc.image.update.useMutation()

  const imageUpload = useFileUpload()

  return async (
    imageToUpload: CroppedImageType | undefined,
    path: FieldPath<T>,
  ) => {
    try {
      if (!imageToUpload) return

      if (imageToUpload.file) {
        const uploaded = await imageUpload.upload(imageToUpload.file)
        if ('error' in uploaded) {
          form.setError(path, { message: uploaded.error })
          return null
        }

        return await createImage.mutateAsync({
          ...imageToUpload,
          file: uploaded,
        })
      }

      if (imageToUpload.id) {
        return await updateImage.mutateAsync({
          ...imageToUpload,
          id: imageToUpload.id,
        })
      }
    } catch (error) {
      const zodError = getZodValidationMutationError(error)
      if (zodError && zodError.length > 0) {
        form.setError(path, { message: zodError[0].message })
      } else {
        createToast({
          priority: 'error',
          message: 'Une erreur est survenue, merci de réessayer ultérieurement',
        })
      }
      return null
    }
  }
}
