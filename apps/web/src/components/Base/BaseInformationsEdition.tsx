import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { MandatoryFields } from '@app/web/components/MandatoryFields'
import type { CreateBaseCommand } from '@app/web/server/bases/createBase'
import {
  baseTitleInfoText,
  type UpdateBaseInformationsCommand,
} from '@app/web/server/bases/updateBase'
import { departmentsOptions } from '@app/web/utils/departments'
import type { UseFormReturn } from 'react-hook-form'

const BaseInformationsEdition = ({
  form,
}: {
  form: UseFormReturn<CreateBaseCommand | UpdateBaseInformationsCommand>
}) => (
  <>
    <MandatoryFields />
    <InputFormField
      data-testid="base-title-input"
      control={form.control}
      path="title"
      label="Nom de la base "
      disabled={form.formState.isSubmitting}
      asterisk
      info={baseTitleInfoText}
    />
    <SelectFormField
      data-testid="base-department-select"
      control={form.control}
      disabled={form.formState.isSubmitting}
      path="department"
      label="Département"
      options={[
        { label: 'Selectionner une option', value: '', disabled: true },
        { label: 'Aucun', value: '' },
        ...departmentsOptions,
      ]}
    />
    <RichInputFormField
      data-testid="base-description-input"
      disabled={form.formState.isSubmitting}
      label="Description"
      form={form}
      path="description"
      allowHeadings={false}
    />
  </>
)

export default BaseInformationsEdition
