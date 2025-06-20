import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import styles from './SearchFilter.module.css'

const SearchFilterOption = ({
  'data-testid': dataTestId,
  option,
  onSelect,
  selected,
}: {
  'data-testid'?: string
  option: SelectOption
  selected?: boolean
  onSelect: (option: SelectOption) => void
}) => (
  <>
    <button
      data-testid={dataTestId}
      key={option.value}
      type="button"
      className={styles.option}
      onClick={() => {
        onSelect(option)
      }}
    >
      <div className="fr-flex fr-direction-column fr-align-items-start">
        {option.label}
        {!!option.hint && (
          <span className={classNames(styles.hint, 'fr-text--xs fr-mb-0')}>
            {option.hint}
          </span>
        )}
      </div>
      <span
        className={classNames(
          'fr-flex fr-align-items-center fr-icon--sm fr-icon-check-line fr-text-title--blue-france',
          !selected && 'fr-hidden',
        )}
      />
    </button>
    <hr className={styles.separator} />
  </>
)

export default SearchFilterOption
