import {
  FilterKey,
  ThematicSelection,
} from '@app/ui/components/Form/Filters/filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import { themesLimit } from '@app/web/server/resources/feature/PublishResource'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  Category,
  categoryThemesOptions,
} from '@app/web/themes/themes'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { useState } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { Filter } from 'turndown'
import styles from './ResourceIndexationThemesSelect.module.css'

const modal = createModal({
  id: 'resource-indexation-thematics-select-modal',
  isOpenedByDefault: false,
})

const ResourceIndexationThemesSelect = <T extends FieldValues>({
  control,
  themesPath,
  'data-testid': dataTestId,
}: {
  control: Control<T>
  themesPath: FieldPath<T>
  'data-testid'?: string
}) => {
  const [internalSelected, setInternalSelected] = useState<ThematicSelection[]>(
    [],
  )

  const handleOnSelect = (option: SelectOption, category: FilterKey) => {
    if (internalSelected.length < themesLimit) {
      const isAlreadySelected = internalSelected.some(
        (item) =>
          item.category === category && item.option.value === option.value,
      )

      if (isAlreadySelected) {
        setInternalSelected(
          internalSelected.filter(
            (item) =>
              !(
                item.category === category && item.option.value === option.value
              ),
          ),
        )
      } else {
        setInternalSelected([...internalSelected, { category, option }])
      }
    }
  }

  return (
    <>
      <Button
        data-testid={dataTestId}
        priority="secondary"
        className="fr-width-full fr-flex fr-justify-content-center"
        onClick={() => modal.open()}
      >
        Ajouter des thématiques
        <span className="ri-add-line fr-ml-2v" />
      </Button>
      <div className="fr-flex fr-flex-wrap fr-flex-gap-2v">
        {internalSelected.map((selected) => {
          const category = selected.option.extra?.category as Category
          const className = CATEGORY_VARIANTS_TAG[category].unselected
          const categoryIconClassName = classNames(
            CATEGORY_VARIANTS[category].icon,
            CATEGORY_VARIANTS[category].color,
          )
          return (
            <ThematicOptionBadge
              key={selected.option.value}
              categoryIconClassName={categoryIconClassName}
              className={className}
              textClassName="fr-text-label--grey"
              option={{ label: selected.option.label, disabled: false }}
            />
          )
        })}
      </div>
      <modal.Component
        title={'Sélectionnez les thématiques abordées dans votre ressource'}
        className={styles.filtersThematicsModal}
      >
        <Controller
          control={control}
          name={themesPath}
          render={({ field: { onChange }, fieldState: { error } }) => {
            const applyThematics = () => {
              onChange(internalSelected.map((item) => item.option.value))
              modal.close()
            }

            return (
              <>
                <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                    <span className="fr-hint-text fr-text--md fr-mb-0">
                      Sélectionnez 5 thématiques maximum
                    </span>
                    <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                      {Object.entries(categoryThemesOptions).map(
                        ([key, value]) => (
                          <SearchThematicsCategory
                            key={key}
                            disabled={internalSelected.length === themesLimit}
                            onSelect={handleOnSelect}
                            selected={internalSelected}
                            category={key as Category}
                            options={value}
                            withHint
                          />
                        ),
                      )}
                    </div>
                  </div>
                  <div className="fr-mt-10v fr-border--top">
                    {error && <p className="fr-error-text">{error.message}</p>}
                    <div className="fr-flex fr-justify-content-end fr-flex-gap-4v fr-pt-8v">
                      <Button
                        priority="secondary"
                        onClick={() => modal.close()}
                      >
                        Annuler
                      </Button>
                      <Button priority="primary" onClick={applyThematics}>
                        Valider ma sélection
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )
          }}
        />
      </modal.Component>
    </>
  )
}

export default ResourceIndexationThemesSelect
