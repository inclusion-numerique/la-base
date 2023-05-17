import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'

const TextEdition = ({
  form: { control },
}: {
  form: UseFormReturn<AddContentCommand | EditContentCommand>
}) => {
  return (
    <InputFormField
      control={control}
      path="payload.text"
      label="Tapez votre texte"
    />
  )
}

export default TextEdition
