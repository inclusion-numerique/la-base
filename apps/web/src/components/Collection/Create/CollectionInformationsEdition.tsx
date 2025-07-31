import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import {
  collectionDescriptionMaxLength,
  collectionTitleMaxLength,
} from '@app/web/server/collections/collectionConstraints'
import type { CreateCollectionCommand } from '@app/web/server/collections/createCollection'
import { htmlToText } from '@app/web/utils/htmlToText'
import type { UseFormReturn } from 'react-hook-form'

export const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${collectionTitleMaxLength} caractères`
const descriptionInfo = (description?: string | null) =>
  `${
    description ? htmlToText(description).length : 0
  }/${collectionDescriptionMaxLength} caractères`

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
      menuBar={false}
      data-testid="collection-description-input"
      disabled={form.formState.isSubmitting}
      label="Description"
      hint="Text de description additionnel"
      form={form}
      path="description"
      info={descriptionInfo}
      size="small"
      allowHeadings={false}
    />
  </>
)

export default CollectionInformationsEdition
