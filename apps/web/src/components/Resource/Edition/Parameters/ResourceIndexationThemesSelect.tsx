import {
  FilterKey,
  ThematicSelection,
} from '@app/ui/components/Form/Filters/filter'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import { themesLimit } from '@app/web/server/resources/feature/PublishResource'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  Category,
  categoryThemesOptions,
  themeCategories,
  themeOptions,
} from '@app/web/themes/themes'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import React, { useState } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import styles from './ResourceIndexationThemesSelect.module.css'

const modal = createModal({
  id: 'resource-indexation-thematics-select-modal',
  isOpenedByDefault: false,
})

const ResourceIndexationThemesSelect = <T extends FieldValues>({
  control,
  themesPath,
  required,
  'data-testid': dataTestId,
}: {
  control: Control<T>
  themesPath: FieldPath<T>
  required?: boolean
  'data-testid'?: string
}) => {
  const [modalSelected, setModalSelected] = useState<ThematicSelection[]>([])

  return (
    <Controller
      control={control}
      name={themesPath}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        // Convert current value to ThematicSelection format
        const currentValue = value || []
        const displaySelected = currentValue
          .map((theme: string) => {
            const option = themeOptions.find((opt) => opt.value === theme)
            const category =
              themeCategories[theme as keyof typeof themeCategories]

            if (!option || !category) {
              return null
            }

            return {
              category: 'themes' as FilterKey,
              option: {
                ...option,
                extra: {
                  category,
                },
              },
            }
          })
          .filter(Boolean) as ThematicSelection[]

        const handleOpenModal = () => {
          setModalSelected([...displaySelected])
          modal.open()
        }

        const handleOnSelect = (option: SelectOption, category: FilterKey) => {
          const isAlreadySelected = modalSelected.some(
            (item) =>
              item.category === category && item.option.value === option.value,
          )

          if (isAlreadySelected) {
            setModalSelected(
              modalSelected.filter(
                (item) =>
                  !(
                    item.category === category &&
                    item.option.value === option.value
                  ),
              ),
            )
          } else {
            setModalSelected([...modalSelected, { category, option }])
          }
        }

        const applyThematics = () => {
          onChange(modalSelected.map((item) => item.option.value))
          modal.close()
        }

        return (
          <div
            className={classNames('fr-select-group', {
              'fr-select-group--error': !!error,
            })}
          >
            <div className="fr-flex fr-direction-column">
              <label className="fr-label" htmlFor={themesPath}>
                Thématiques {required && <RedAsterisk />}
                <span className="fr-hint-text">
                  Quelles sont les principales thématiques abordées par la
                  ressource ?
                  <br />
                  Sélectionner jusqu'à {themesLimit} thématiques.
                </span>
              </label>
              <div className="fr-mt-md-4v">
                <Button
                  data-testid={dataTestId}
                  priority="secondary"
                  type="button"
                  className="fr-width-full fr-flex fr-justify-content-center"
                  onClick={handleOpenModal}
                >
                  Ajouter des thématiques
                  <span className="ri-add-line fr-ml-2v" />
                </Button>
                <div className="fr-flex fr-flex-wrap fr-flex-gap-2v fr-mt-4v">
                  {displaySelected.map((selected) => {
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
                        option={{
                          label: selected.option.label,
                          disabled: false,
                        }}
                        onClick={() =>
                          handleOnSelect(selected.option, 'themes')
                        }
                      />
                    )
                  })}
                </div>
                {error && (
                  <p id={`${themesPath}__error`} className="fr-error-text">
                    {error.message}
                  </p>
                )}
              </div>
            </div>
            <modal.Component
              title={
                'Sélectionnez les thématiques abordées dans votre ressource'
              }
              className={styles.filtersThematicsModal}
              buttons={[
                {
                  priority: 'secondary',
                  type: 'button',
                  onClick: () => modal.close(),
                  children: 'Annuler',
                  doClosesModal: true,
                },
                {
                  priority: 'primary',
                  type: 'button',
                  nativeButtonProps: {
                    'data-testid': 'indexation-themes-select-apply',
                  },
                  onClick: applyThematics,
                  children: 'Valider ma sélection',
                },
              ]}
            >
              <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                  <span className="fr-hint-text fr-text--md fr-mb-0">
                    Sélectionnez 5 thématiques maximum
                  </span>
                  <div className="fr-flex fr-direction-column fr-flex-gap-12v">
                    {Object.entries(categoryThemesOptions).map(
                      ([key, value]) => {
                        const optionsWithDisabled = value.map((option) => {
                          const isAlreadySelected = modalSelected.some(
                            (item) => item.option.value === option.value,
                          )
                          return {
                            ...option,
                            disabled:
                              modalSelected.length === themesLimit &&
                              !isAlreadySelected,
                          }
                        })
                        return (
                          <SearchThematicsCategory
                            key={key}
                            data-testid={dataTestId}
                            onSelect={handleOnSelect}
                            selected={modalSelected}
                            category={key as Category}
                            options={optionsWithDisabled}
                            withHint
                          />
                        )
                      },
                    )}
                  </div>
                </div>
                <div className="fr-mt-10v fr-border--top">
                  {error && <p className="fr-error-text">{error.message}</p>}
                </div>
              </div>
            </modal.Component>
          </div>
        )
      }}
    />
  )
}

export default ResourceIndexationThemesSelect
