import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import {
  supportTypesLimit,
  targetAudiencesLimit,
  themesLimit,
} from '@app/web/server/resources/feature/PublishResource'
import { themeOptions } from '@app/web/themes/themes'

const IndexationEdition = <T extends FieldValues>({
  control,
  themesPath,
  supportTypesPath,
  targetAudiencesPath,
  required,
}: {
  control: Control<T>
  themesPath: Path<T>
  supportTypesPath: Path<T>
  targetAudiencesPath: Path<T>
  required?: boolean
}) => (
  <>
    <MultipleSelectFormField
      data-testid="indexation-themes-select"
      asterisk={required}
      label="Thématiques"
      hint={
        <>
          Quelles sont les principales thématiques abordées par la ressource ?
          <br />
          Sélectionnez jusqu’à {themesLimit} thématiques.
        </>
      }
      control={control}
      limit={themesLimit}
      path={themesPath}
      defaultOption
      defaultOptionLabel="Selectionnez une thématique"
      options={themeOptions}
    />
    <MultipleSelectFormField
      data-testid="indexation-support-types-select"
      asterisk={required}
      label="Type de support"
      hint={
        <>
          Type de support (article, fiche, guide...).
          <br />
          Sélectionnez jusqu’à {supportTypesLimit} types.
        </>
      }
      control={control}
      limit={supportTypesLimit}
      path={supportTypesPath}
      defaultOption
      defaultOptionLabel="Selectionnez une type de support"
      options={[
        { name: 'Support 1', value: 'support-1' },
        { name: 'Support 2', value: 'support-2' },
        { name: 'Support 3', value: 'support-3' },
      ]}
    />
    <MultipleSelectFormField
      data-testid="indexation-targetAudiences-select"
      asterisk={required}
      label="Publics cibles"
      hint={
        <>
          Quel est le public visé par la ressource ?<br />
          Sélectionnez jusqu’à {targetAudiencesLimit} publics.
        </>
      }
      control={control}
      limit={targetAudiencesLimit}
      path={targetAudiencesPath}
      defaultOption
      defaultOptionLabel="Selectionnez un public"
      options={[
        { name: 'Public 1', value: 'target-1' },
        { name: 'Public 2', value: 'target-2' },
        { name: 'Public 3', value: 'target-3' },
      ]}
    />
  </>
)

export default IndexationEdition
