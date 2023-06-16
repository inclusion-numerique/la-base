import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { resourceSectionTitleMaxLength } from '@app/web/server/rpc/resource/utils'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceSectionTitleMaxLength} caractères`

const SectionTitleEdition = ({
  form: { control, watch },
}: {
  form: UseFormReturn<ClientContentPayload>
}) => {
  const title = watch('title')
  return (
    <InputFormField
      data-testid="section-title-input"
      control={control}
      path="title"
      label="Titre de la section"
      hint="Les titres de sections permettent de créer des ancres afin que les visiteurs se rendent directement sur une position précise de votre ressource."
      info={titleInfo(title)}
    />
  )
}

export default SectionTitleEdition
