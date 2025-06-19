import { isBrowser } from '@app/web/utils/isBrowser'
import 'client-only'
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
        event.returnValue = 'Your unsaved changes will be lost'
      }
    }
    window.addEventListener('beforeunload', confirmLeave)

    return () => {
      window.removeEventListener('beforeunload', confirmLeave)
    }
  }, [isDirty])
}
