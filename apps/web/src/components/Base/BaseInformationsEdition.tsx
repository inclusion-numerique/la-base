import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RichInputFormField from '@app/ui/components/Form/RichInputFormField'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import { departmentsOptions } from '@app/web/utils/departments'
import { CreateBaseCommand } from '@app/web/server/bases/createBase'
import { UpdateBaseInformationsCommand } from '@app/web/server/bases/updateBase'

const BaseInformationsEdition = ({
  form,
}: {
  form: UseFormReturn<CreateBaseCommand | UpdateBaseInformationsCommand>
}) => (
  <>
    <InputFormField
      data-testid="base-title-input"
      control={form.control}
      path="title"
      label="Nom de la base "
      disabled={form.formState.isSubmitting}
      asterisk
    />
    <SelectFormField
      data-testid="base-department-select"
      control={form.control}
      disabled={form.formState.isSubmitting}
      path="department"
      label="Département"
      options={[
        {
          name: 'Selectionner une option',
          value: '',
          disabled: true,
        },
        ...departmentsOptions,
      ]}
    />
    <RichInputFormField
      data-testid="base-description-input"
      disabled={form.formState.isSubmitting}
      label="Description"
      hint="Text de description additionnel"
      form={form}
      path="description"
      allowHeadings={false}
    />
  </>
)

export default BaseInformationsEdition
