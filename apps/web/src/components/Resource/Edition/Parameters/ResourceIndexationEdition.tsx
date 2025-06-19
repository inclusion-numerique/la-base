import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import {
  beneficiariesLimit,
  professionalSectorsLimit,
  resourceTypesLimit,
  themesLimit,
} from '@app/web/server/resources/feature/PublishResource'
import { beneficiariesOptions } from '@app/web/themes/beneficiairies'
import { professionalSectorsOptions } from '@app/web/themes/professionalSectors'
import { resourceTypesOptions } from '@app/web/themes/resourceTypes'
import { themeOptions } from '@app/web/themes/themes'
import React from 'react'
import type { Control, FieldValues, Path } from 'react-hook-form'

const ResourceIndexationEdition = <T extends FieldValues>({
  control,
  themesPath,
  resourceTypesPath,
  beneficiariesPath,
  professionalSectorsPath,
  required,
}: {
  control: Control<T>
  themesPath: Path<T>
  resourceTypesPath: Path<T>
  beneficiariesPath: Path<T>
  professionalSectorsPath: Path<T>
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
          Sélectionnez jusqu'à {themesLimit} thématiques.
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
      data-testid="indexation-resource-types-select"
      asterisk={required}
      label="Type de ressource"
      hint={
        <>
          Type de ressource (article, fiche, guide...).
          <br />
          Sélectionnez jusqu'à {resourceTypesLimit} types.
        </>
      }
      control={control}
      limit={resourceTypesLimit}
      path={resourceTypesPath}
      defaultOption
      defaultOptionLabel="Sélectionnez un type de ressource"
      options={resourceTypesOptions}
    />
    <MultipleSelectFormField
      data-testid="indexation-beneficiaries-select"
      asterisk={required}
      label="Bénéficiaires"
      hint={
        <>
          Quel est le public visé par la ressource ?<br />
          Sélectionnez jusqu'à {beneficiariesLimit} bénéficiaires.
        </>
      }
      control={control}
      limit={beneficiariesLimit}
      path={beneficiariesPath}
      defaultOption
      defaultOptionLabel="Sélectionnez un bénéficiaire"
      options={beneficiariesOptions}
    />
    <MultipleSelectFormField
      data-testid="indexation-professional-sectors-select"
      asterisk={required}
      label="Secteurs professionnels"
      hint={
        <>
          Quels sont les secteurs professionnels concernés ?<br />
          Sélectionnez jusqu'à {professionalSectorsLimit} secteurs.
        </>
      }
      control={control}
      limit={professionalSectorsLimit}
      path={professionalSectorsPath}
      defaultOption
      defaultOptionLabel="Sélectionnez un secteur professionnel"
      options={professionalSectorsOptions}
    />
  </>
)

export default ResourceIndexationEdition
