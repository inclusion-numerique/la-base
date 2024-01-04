import React, { ReactNode } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import { PrivacyTag } from './PrivacyTags'
import ResourceBaseRichRadioElement from './Resource/ResourceBaseRichRadioElement'

const VisibilityField = <T extends { isPublic: boolean }>({
  control,
  disabled,
  model,
  publicTitle,
  publicHint,
  privateTitle,
  privateHint,
}: {
  control: Control<T>
  disabled?: boolean
  model: string
  publicTitle: ReactNode
  publicHint?: ReactNode
  privateTitle?: ReactNode
  privateHint?: ReactNode
}) => (
  <Controller
    control={control}
    name={'isPublic' as Path<T>}
    render={({ field: { onChange, name, value }, fieldState: { error } }) => (
      <fieldset
        className="fr-fieldset"
        id="radio-rich"
        aria-labelledby="radio-rich-legend radio-rich-messages"
      >
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-public`}
          disabled={disabled}
          data-testid={`visibility-radio-${model.toLowerCase()}-public`}
          name={name}
          value={value == null ? null : value.toString()}
          radioValue="true"
          onChange={() => onChange(true)}
        >
          <div className="fr-mr-1w">
            {publicTitle}
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              {publicHint ?? 'Visible par tous les visiteurs.'}
            </p>
          </div>
          <PrivacyTag isPublic />
        </ResourceBaseRichRadioElement>
        <ResourceBaseRichRadioElement
          id={`radio-${model.toLowerCase()}-private`}
          data-testid={`visibility-radio-${model.toLowerCase()}-private`}
          disabled={disabled}
          name={name}
          value={value == null ? null : value.toString()}
          radioValue="false"
          onChange={() => onChange(false)}
        >
          <div className="fr-mr-1w">
            {privateTitle}
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              {privateHint ??
                'Accessible uniquement aux membres et aux administrateurs que vous inviterez.'}
            </p>
          </div>
          <PrivacyTag />
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
