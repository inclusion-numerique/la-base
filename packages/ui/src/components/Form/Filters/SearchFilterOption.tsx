import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import { useId } from 'react'
import styles from './SearchFilter.module.css'

const SearchFilterOption = ({
  'data-testid': dataTestId,
  id,
  option,
  onSelect,
  selected,
}: {
  'data-testid'?: string
  id?: string
  option: SelectOption
  selected?: boolean
  onSelect: (option: SelectOption) => void
}) => {
  const generatedId = useId()
  const optionId = `search-filter-${generatedId}${id ? `-${id}` : ''}`
  const handleToggle = () => {
    onSelect(option)
  }

  return (
    <>
      <input
        checked={!!selected}
        className={styles.optionInput}
        data-testid={dataTestId}
        id={optionId}
        type="checkbox"
        onChange={handleToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault()
            handleToggle()
          }
        }}
      />
      <label className={styles.option} htmlFor={optionId}>
        <span className="fr-flex fr-direction-column fr-align-items-start fr-text--start">
          <span className="fr-text--sm fr-text--normal fr-mb-0">
            {option.label}
          </span>
          {!!option.hint && (
            <span className={classNames(styles.hint, 'fr-text--xs fr-mb-0')}>
              {option.hint}
            </span>
          )}
        </span>
        <span
          className={classNames(
            'fr-flex fr-align-items-center fr-icon--sm fr-icon-check-line fr-text-title--blue-france',
            !selected && 'fr-hidden',
          )}
        />
      </label>
      <hr className={styles.separator} />
    </>
  )
}

export default SearchFilterOption
