import SearchFilterOption from '@app/ui/components/Form/Filters/SearchFilterOption'
import { FilterKey } from '@app/ui/components/Form/Filters/filter'
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
  <>
    {options.map((option) => (
      <SearchFilterOption
        data-testid={`${dataTestId}-${option.value}`}
        key={option.value}
        option={option}
        selected={selectedOptions.some(
          (selectedOption) => selectedOption.value === option.value,
        )}
        onSelect={(o) => onClick(o)}
      />
    ))}
  </>
)

export default SelectOptionsList
