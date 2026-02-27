import styles from '@app/ui/components/Form/Filters/SearchFilter.module.css'
import SearchFilterOption from '@app/ui/components/Form/Filters/SearchFilterOption'
import type { SelectOption } from '@app/ui/components/Form/utils/options'

const SelectOptionsList = ({
  'data-testid': dataTestId,
  options,
  selectedOptions,
  onClick,
}: {
  'data-testid': string | undefined
  options: SelectOption[]
  selectedOptions: SelectOption[]
  onClick: (option: SelectOption) => void
}) => (
  <ul className="fr-raw-list">
    {options.map((option, index) => (
      <li className={styles.optionListItem} key={option.value}>
        <SearchFilterOption
          data-testid={`${dataTestId}-${option.value}`}
          id={`select-options-list-${index}`}
          option={option}
          selected={selectedOptions.some(
            (selectedOption) => selectedOption.value === option.value,
          )}
          onSelect={(o) => onClick(o)}
        />
      </li>
    ))}
  </ul>
)

export default SelectOptionsList
