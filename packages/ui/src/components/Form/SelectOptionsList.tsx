import SearchFilterOption from '@app/ui/components/Form/Filters/SearchFilterOption'
import type { SelectOption } from '@app/ui/components/Form/utils/options'

const SelectOptionsList = ({
  options,
  selectedOptions,
  onClick,
}: {
  options: SelectOption[]
  selectedOptions: SelectOption[]
  onClick: (option: SelectOption) => void
}) => (
  <>
    {options.map((option) => (
      <SearchFilterOption
        key={option.value}
        option={option}
        selected={selectedOptions.some((selectedOption) => selectedOption.value === option.value)}
        onSelect={(o) => onClick(o)}
      />
    ))}
  </>
)

export default SelectOptionsList
