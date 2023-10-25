import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import {
  CreateCollectionCommand,
  collectionDescriptionMaxLength,
  collectionTitleMaxLength,
} from '@app/web/server/collections/createCollection'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${collectionTitleMaxLength} caractères`
const descriptionInfo = (description?: string | null) =>
  `${description?.length ?? 0}/${collectionDescriptionMaxLength} caractères`

const CollectionInformationsEdition = ({
  form,
}: {
  form: UseFormReturn<CreateCollectionCommand>
}) => (
  <>
    <InputFormField
      data-testid="collection-title-input"
      control={form.control}
      path="title"
      label="Nom de la collection"
      disabled={form.formState.isSubmitting}
      asterisk
      info={titleInfo}
    />
    <RichInputFormField
      data-testid="collection-description-input"
      disabled={form.formState.isSubmitting}
      label="Description"
      hint="Text de description additionnel"
      form={form}
      path="description"
      info={descriptionInfo}
      size="small"
    />
  </>
)

export default CollectionInformationsEdition
