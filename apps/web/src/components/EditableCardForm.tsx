'use client'

import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { useRouter } from 'next/navigation'
import { type ReactNode, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { FieldValues } from 'react-hook-form/dist/types/fields'
import EditableCard from './EditableCard'

const EditableCardForm = <T extends FieldValues>({
  id,
  title,
  subtitle,
  preview,
  editing,
  form,
  onSave,
}: {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  preview: ReactNode
  editing: ReactNode
  form: UseFormReturn<T>
  onSave: (data: T) => Promise<void>
  buttons?: {
    children: ReactNode
    form?: string
    type?: 'button' | 'submit' | 'reset'
  }[]
}) => {
  const isLoading =
    form.formState.isSubmitting || form.formState.isSubmitSuccessful
  const [isEditMode, setEditMode] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: T) => {
    try {
      await onSave(data)
      setTimeout(() => form.reset(data))
      router.refresh()
      setEditMode(false)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <EditableCard
      id={id}
      title={title}
      subtitle={subtitle}
      editModeState={[isEditMode, setEditMode]}
      preview={preview}
      disabled={isLoading}
      editing={
        <form id={`${id}-form`} onSubmit={form.handleSubmit(onSubmit)}>
          {editing}
        </form>
      }
    />
  )
}

export default EditableCardForm
