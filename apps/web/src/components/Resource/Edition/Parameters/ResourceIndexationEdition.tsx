import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import {
  supportTypesLimit,
  targetAudiencesLimit,
  themesLimit,
} from '@app/web/server/resources/feature/PublishResource'
import { supportTypeOptions } from '@app/web/themes/supportTypes'
import { targetAudienceOptions } from '@app/web/themes/targetAudiences'
import { themeOptions } from '@app/web/themes/themes'
import React from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

const ResourceIndexationEdition = <T extends FieldValues>({
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
      defaultOptionLabel="Sélectionnez une thématique"
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
      defaultOptionLabel="Sélectionnez une type de support"
      options={supportTypeOptions}
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
      defaultOptionLabel="Sélectionnez un public"
      options={targetAudienceOptions}
    />
  </>
)

export default ResourceIndexationEdition
