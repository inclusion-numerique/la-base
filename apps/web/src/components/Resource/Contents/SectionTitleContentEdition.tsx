import InputFormField from '@app/ui/components/Form/InputFormField'
import { type SectionTitlePayload } from '@app/web/server/resources/feature/Content'
import { resourceSectionTitleMaxLength } from '@app/web/server/rpc/resource/utils'
import type { UseFormReturn } from 'react-hook-form'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceSectionTitleMaxLength} caractères`

const SectionTitleContentEdition = ({
  form: { control, watch },
}: {
  form: UseFormReturn<SectionTitlePayload>
}) => {
  const title = watch('title')
  return (
    <InputFormField
      data-testid="section-title-input"
      control={control}
      path="title"
      label="Titre de la section"
      hint="Les titres de sections permettent de créer des ancres afin que les visiteurs se rendent directement sur une position précise de votre ressource."
      info={titleInfo(title ?? '')}
    />
  )
}

export default SectionTitleContentEdition
