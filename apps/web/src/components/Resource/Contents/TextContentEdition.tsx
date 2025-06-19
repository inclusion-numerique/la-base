'use client'

import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import { TextPayload } from '@app/web/server/resources/feature/Content'
import type { UseFormReturn } from 'react-hook-form'

const TextContentEdition = ({
  form,
}: {
  form: UseFormReturn<TextPayload>
}) => <RichInputFormField data-testid="text-input" form={form} path="text" />

export default TextContentEdition
