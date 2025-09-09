'use client'

import SelectFormField from '@app/ui/components/Form/SelectFormField'
import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import type { UpdateBaseHomePageCustomisationCommand } from '@app/web/server/bases/updateBase'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { HighlightResourcesType } from '@prisma/client'
import { useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'

const BaseHomePageCustomisationEdition = ({
  form,
}: {
  form: UseFormReturn<UpdateBaseHomePageCustomisationCommand>
}) => {
  const [enableHighlightResources, setEnableHighlightResources] = useState(
    !!form.getValues('highlightResources'),
  )

  const handleEnableHighlightResources = () => {
    const newValue = !enableHighlightResources
    setEnableHighlightResources(newValue)

    if (!newValue) {
      form.setValue('highlightResources', null)
    } else {
      form.setValue(
        'highlightResources',
        HighlightResourcesType.LatestPublished,
      )
    }
  }

  const options: SelectOption<HighlightResourcesType>[] = [
    {
      value: HighlightResourcesType.LatestPublished,
      label: 'Les 3 dernières ressources publiées',
    },
    {
      value: HighlightResourcesType.MostViewed,
      label: 'Les 3 ressources les plus vues',
    },
    {
      value: HighlightResourcesType.MostRecommended,
      label: 'Les 3 ressources les plus recommandées',
    },
  ]

  return (
    <div className="fr-flex fr-direction-column">
      <div className="fr-flex fr-direction-column fr-flex-gap-4v">
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <div className="fr-flex fr-direction-column">
            <span className="fr-text-label--grey fr-text--bold">
              Ressources à la une
            </span>
            <span>Mettre en avant une sélection de ressources</span>
          </div>
          <div className="fr-form-group">
            <ToggleSwitch
              label={undefined}
              inputTitle="Mettre en avant une sélection de ressources"
              labelPosition="right"
              defaultChecked={enableHighlightResources}
              onChange={handleEnableHighlightResources}
            />
          </div>
        </div>
        {enableHighlightResources && (
          <>
            <SelectFormField
              className="fr-mb-0"
              control={form.control}
              path="highlightResources"
              label="Choisissez les ressources à mettre en avant"
              options={options}
            />
          </>
        )}
      </div>
      <hr className="fr-mt-4w fr-pb-4w" />
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
        <div className="fr-flex fr-direction-column">
          <span className="fr-text-label--grey fr-text--bold">
            Collections à la une
          </span>
          <span>Mettre en avant vos 3 premières collections</span>
        </div>
        <ToggleFormField
          control={form.control}
          path="highlightCollections"
          className="fr-my-0"
          classes={{ fieldsetElement: 'fr-mb-0' }}
        />
      </div>
      <hr className="fr-mt-4w fr-pb-4w" />
    </div>
  )
}
export default BaseHomePageCustomisationEdition
