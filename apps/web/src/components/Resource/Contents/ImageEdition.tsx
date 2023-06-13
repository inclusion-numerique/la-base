import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { ContentPayload } from '@app/web/server/resources/feature/Content'

const ImageEdition = ({
  form: { control },
}: {
  form: UseFormReturn<ContentPayload>
}) => (
  <InputFormField
    data-testid="section-title-input"
    control={control}
    path="title"
    label="Titre de la section"
    hint="Les titres de sections permettent de créer des ancres afin que les visiteurs se rendent directement sur une position précise de votre ressource."
  />
)

export default ImageEdition
