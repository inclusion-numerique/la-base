import {
  FilterKey,
  ThematicSelection,
  isCategoryComplete,
} from '@app/ui/components/Form/Filters/filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  Category,
} from '@app/web/themes/themes'
import { Checkbox } from '@codegouvfr/react-dsfr/Checkbox'
import classNames from 'classnames'
import React from 'react'

const SearchThematicsCategory = ({
  'data-testid': dataTestId,
  category,
  options,
  selected,
  onSelect,
  onSelectAllInCategory,
  disabled = false,
  withHint = false,
}: {
  'data-testid'?: string
  category: Category
  options: SelectOption[]
  selected: ThematicSelection[]
  onSelect: (option: SelectOption, category: FilterKey) => void
  onSelectAllInCategory?: (category: FilterKey, selected: boolean) => void
  disabled?: boolean
  withHint?: boolean
}) => {
  const handleOnClick = (opt: SelectOption) => onSelect(opt, 'themes')

  return (
    <div className="fr-flex fr-direction-column fr-flex-gap-6v">
      <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
        <div className="fr-flex fr-direction-column">
          <div className="fr-flex fr-flex-gap-4v fr-align-items-center">
            <span
              className={classNames(
                CATEGORY_VARIANTS[category].color,
                CATEGORY_VARIANTS[category].icon,
                'ri-xl',
              )}
              aria-hidden
            />
            <span
              className={classNames(
                CATEGORY_VARIANTS[category].color,
                'fr-text--xl fr-text--bold fr-text--start fr-mb-0',
              )}
            >
              {category}
            </span>
          </div>
          {!!withHint && (
            <span className="fr-hint-text fr-text--sm fr-mb-0">
              Vous ne trouvez pas la thématique correspondante à votre ressource
              ? Ajouter là à la catégorie.
            </span>
          )}
        </div>
        {!!onSelectAllInCategory && (
          <Checkbox
            options={[
              {
                label: 'Sélectionner toute la catégorie',
                nativeInputProps: {
                  name: category,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    onSelectAllInCategory(
                      category as FilterKey,
                      e.target.checked,
                    )
                  },
                  checked: isCategoryComplete(category, selected),
                },
              },
            ]}
          />
        )}
      </div>
      <div className="fr-flex fr-flex-wrap fr-flex-gap-2v">
        {options.map((opt) => {
          const isSelected = selected.some((s) => s.option.value === opt.value)
          const iconId = isSelected ? 'fr-icon-check-line' : 'fr-icon-add-line'
          const ariaLabelPrefix = isSelected ? 'Retirer' : 'Ajouter'
          const className = isSelected
            ? CATEGORY_VARIANTS_TAG[category].selected
            : CATEGORY_VARIANTS_TAG[category].unselected
          const textClassName = isSelected
            ? 'fr-text-label--white'
            : 'fr-text-label--grey'
          const iconClassName = isSelected
            ? 'fr-text-label--white'
            : 'fr-text-title--blue-france'

          return (
            <ThematicOptionBadge
              key={opt.value}
              data-testid={`${dataTestId}-${opt.value}`}
              disabled={disabled}
              iconId={iconId}
              option={opt}
              ariaLabelPrefix={ariaLabelPrefix}
              onClick={() => handleOnClick(opt)}
              size="md"
              className={className}
              iconClassName={iconClassName}
              textClassName={textClassName}
            />
          )
        })}
      </div>
    </div>
  )
}

export default SearchThematicsCategory
