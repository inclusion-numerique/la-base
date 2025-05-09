'use client'

import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import type { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import type { UseFormReturn } from 'react-hook-form'

const TextContentEdition = ({
  form,
}: {
  form: UseFormReturn<ClientContentPayload>
}) => <RichInputFormField data-testid="text-input" form={form} path="text" />

export default TextContentEdition
