import 'client-only'
import { isBrowser } from '@app/web/utils/isBrowser'
import { useEffect } from 'react'
import type { FieldValues } from 'react-hook-form'
import type { FormState } from 'react-hook-form/dist/types/form'

export const usePreventUnsavedChanges = <T extends FieldValues>({
  formState: { isDirty },
}: {
  formState: FormState<T>
}) => {
  useEffect(() => {
    if (isBrowser) {
      return
    }
    const confirmLeave = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        // eslint-disable-next-line no-param-reassign
        event.returnValue = 'Your unsaved changes will be lost'
      }
    }
    window.addEventListener('beforeunload', confirmLeave)

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('beforeunload', confirmLeave)
    }
  }, [isDirty])
}
