import classNames from 'classnames'
import { type PropsWithChildren } from 'react'
import type { FieldValues, Path, PathValue } from 'react-hook-form'
import styles from './ResourceBaseRichRadioElement.module.css'

const ResourceBaseRichRadioElement = <T extends FieldValues>({
  id,
  name,
  disabled,
  value,
  radioValue,
  onChange,
  children,
  'data-testid': dataTestId,
}: PropsWithChildren<{
  id: string
  name: string
  disabled?: boolean
  radioValue: string | null
  value: string | null
  onChange: (value: PathValue<T, Path<T>>) => void
  'data-testid'?: string
}>) => (
  <div className="fr-fieldset__element">
    <div
      className={classNames('fr-radio-group', 'fr-radio-rich', styles.radio)}
    >
      <input
        id={id}
        type="radio"
        onChange={() => {
          onChange(radioValue as PathValue<T, Path<T>>)
        }}
        name={name}
        checked={value === radioValue}
        value={radioValue === null ? '' : radioValue}
        disabled={disabled}
        data-testid={dataTestId}
      />
      <label
        className="fr-label"
        htmlFor={id}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (disabled) {
            return
          }
          // XXX React dsfr seems to not trigger input event on a label click
          // Keyboard tab + space still works
          onChange(radioValue as PathValue<T, Path<T>>)
        }}
        onKeyDown={(event) => {
          if (disabled) {
            return
          }
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onChange(radioValue as PathValue<T, Path<T>>)
          }
        }}
      >
        {children}
      </label>
    </div>
  </div>
)

export default ResourceBaseRichRadioElement
