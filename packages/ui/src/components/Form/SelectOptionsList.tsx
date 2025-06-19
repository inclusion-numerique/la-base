import type { SelectInputOption } from '@app/ui/components/Form/utils/options'
import React from 'react'

const SelectOptionsList = ({ options }: { options: SelectInputOption[] }) => (
  <>
    {options.map((option) =>
      option.hidden ? null : 'options' in option ? (
        <optgroup
          key={option.label}
          label={option.label}
          disabled={option.disabled}
        >
          <SelectOptionsList options={option.options} />
        </optgroup>
      ) : (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ),
    )}
    )
  </>
)

export default SelectOptionsList
