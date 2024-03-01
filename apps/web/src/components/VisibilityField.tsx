import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import ResourceBaseRichRadioElement from './Resource/ResourceBaseRichRadioElement'
import { PrivacyTag } from './PrivacyTags'

const VisibilityField = <T extends FieldValues>({
  control,
  disabled,
  model,
  publicTitle,
  publicHint,
  privateTitle,
  privateHint,
  path,
  setIsPublic,
  label,
  asterisk,
}: {
  control: Control<T>
  disabled?: boolean
  model: string
  publicTitle: ReactNode
  publicHint: ReactNode
  privateTitle: ReactNode
  privateHint: ReactNode
  path: Path<T>
  setIsPublic?: Dispatch<SetStateAction<boolean | null>>
  label?: ReactNode
  asterisk?: boolean
}) => (
  <Controller
    control={control}
    name={path}
    render={({ field: { onChange, name, value }, fieldState: { error } }) => (
      <fieldset
        className="fr-fieldset"
        id="radio-rich"
        aria-labelledby="radio-rich-legend radio-rich-messages"
      >
        {!!label && (
          <legend
            id="radio-rich-legend"
            className="fr-label fr-mb-2v fr-ml-1-5v"
          >
            {label} {asterisk && <RedAsterisk />}
          </legend>
        )}
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-public`}
          disabled={disabled}
          data-testid={`visibility-radio-${model.toLowerCase()}-public`}
          name={name}
          value={value == null ? null : `${value}`}
          radioValue="true"
          onChange={() => {
            if (setIsPublic) {
              setIsPublic(true)
            }
            onChange(true)
          }}
        >
          <div className="fr-flex-grow-1 fr-mr-1w">
            {publicTitle}
            <p className="fr-text--xs fr-hint-text fr-mb-0">{publicHint}</p>
          </div>
          <div className="fr-ml-3w">
            <PrivacyTag isPublic />
          </div>
        </ResourceBaseRichRadioElement>
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-private`}
          data-testid={`visibility-radio-${model.toLowerCase()}-private`}
          disabled={disabled}
          name={name}
          value={value == null ? null : `${value}`}
          radioValue="false"
          onChange={() => {
            if (setIsPublic) {
              setIsPublic(false)
            }
            onChange(false)
          }}
        >
          <div className="fr-flex-grow-1 fr-mr-1w">
            {privateTitle}
            <p className="fr-text--xs fr-hint-text fr-mb-0">{privateHint}</p>
          </div>
          <div className="fr-ml-3w">
            <PrivacyTag />
          </div>
        </ResourceBaseRichRadioElement>
        {error && (
          <p className="fr-error-text" id="input-form-field__isPublic__error">
            {error.message}
          </p>
        )}
      </fieldset>
    )}
  />
)

export default VisibilityField
