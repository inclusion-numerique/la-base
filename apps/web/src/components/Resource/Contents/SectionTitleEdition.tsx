import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import { resourceSectionTitleMaxLength } from '@app/web/server/rpc/resource/utils'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceSectionTitleMaxLength} caractères`

const SectionTitleEdition = ({
  form: { control, watch },
}: {
  form: UseFormReturn<AddContentCommand | EditContentCommand>
}) => {
  const title = watch('payload.title')
  return (
    <InputFormField
      control={control}
      path="payload.title"
      label="Titre de la section"
      hint="Les titres de sections permettent de créer des ancres afin que les visiteurs se rendent directement sur une position précise de votre ressource."
      info={titleInfo(title)}
    />
  )
}

export default SectionTitleEdition
