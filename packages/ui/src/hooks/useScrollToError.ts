import { useEffect } from 'react'
import type { FieldErrors, FieldValues } from 'react-hook-form'

export const scrollToError = () => {
  const errorElement = document.querySelector(
    'form .fr-error-text, form .fr-message--error',
  )
  if (!errorElement) {
    return
  }
  errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

export const useScrollToError = <TFieldValues extends FieldValues>({
  errors,
}: {
  errors: FieldErrors<TFieldValues>
}) => {
  useEffect(() => {
    const errorsvalues = Object.values(errors)
    if (errorsvalues.length > 0) {
      scrollToError()
    }
  }, [errors])

  return {
    trigger: scrollToError,
  }
}
