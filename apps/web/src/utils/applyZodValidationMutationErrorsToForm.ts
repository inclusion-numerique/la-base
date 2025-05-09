import type { AppRouter } from '@app/web/server/rpc/appRouter'
import { getZodValidationMutationError } from '@app/web/utils/getZodValidationMutationError'
import type { TRPCClientError } from '@trpc/client'
import type { FieldPath, FieldValues } from 'react-hook-form'
import type { UseFormSetError } from 'react-hook-form/dist/types/form'

export const applyZodValidationMutationErrorsToForm = <T extends FieldValues>(
  mutationError: unknown,
  setError: UseFormSetError<T>,
): mutationError is TRPCClientError<AppRouter> => {
  const zodErrors = getZodValidationMutationError(mutationError)
  if (zodErrors) {
    for (const errorData of zodErrors) {
      setError(errorData.path.join('.') as FieldPath<T>, {
        message: errorData.message,
        type: 'custom',
      })
    }
    return true
  }
  return false
}
