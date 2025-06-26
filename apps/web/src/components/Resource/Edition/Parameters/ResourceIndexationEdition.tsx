import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import ResourceIndexationThemesSelect from '@app/web/components/Resource/Edition/Parameters/ResourceIndexationThemesSelect'
import {
  beneficiariesLimit,
  professionalSectorsLimit,
  resourceTypesLimit,
  themesLimit,
} from '@app/web/server/resources/feature/PublishResource'
import { beneficiariesOptions } from '@app/web/themes/beneficiairies'
import { professionalSectorsOptions } from '@app/web/themes/professionalSectors'
import { resourceTypesOptions } from '@app/web/themes/resourceTypes'
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
    <div className="fr-flex fr-direction-column fr-flex-gap-4v fr-mb-8v">
      <label className="fr-label" htmlFor={themesPath}>
        Thématiques {required && <RedAsterisk />}
        <span className="fr-hint-text">
          Quelles sont les principales thématiques abordées par la ressource ?
          <br />
          Sélectionner jusqu'à {themesLimit} thématiques.
        </span>
      </label>
      <ResourceIndexationThemesSelect
        control={control}
        themesPath={themesPath}
        data-testid="indexation-themes-select"
      />
    </div>
    <MultipleSelectFormField
      data-testid="indexation-resource-types-select"
      asterisk={required}
      label="Type de ressource"
      hint={
        <>
          Type de ressource (article, fiche, guide...).
          <br />
          Sélectionner jusqu'à {resourceTypesLimit} types maximum.
        </>
      }
      control={control}
      limit={resourceTypesLimit}
      path={resourceTypesPath}
      defaultOptionLabel="Sélectionner un type de ressource"
      options={resourceTypesOptions}
    />
    <MultipleSelectFormField
      data-testid="indexation-professional-sectors-select"
      asterisk={required}
      label="Secteurs professionnels"
      hint={
        <>
          Quels sont les secteurs professionnels concernés ?<br />
        </>
      }
      control={control}
      limit={professionalSectorsLimit}
      path={professionalSectorsPath}
      defaultOptionLabel="Sélectionner un secteur professionnel"
      options={professionalSectorsOptions}
    />
    <MultipleSelectFormField
      data-testid="indexation-beneficiaries-select"
      asterisk={false}
      label="Bénéficiaires"
      hint={
        <>
          À quel(s) type(s) de bénéficiaire(s) est destinée votre ressource ?
          <br />
          Sélectionner jusqu'à {beneficiariesLimit} bénéficiaires maximum.
        </>
      }
      control={control}
      limit={beneficiariesLimit}
      path={beneficiariesPath}
      defaultOptionLabel="Sélectionner un bénéficiaire"
      options={beneficiariesOptions}
    />
  </>
)

export default ResourceIndexationEdition
