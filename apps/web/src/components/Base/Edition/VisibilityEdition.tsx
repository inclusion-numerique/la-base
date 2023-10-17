import React from 'react'
import { Control, Controller } from 'react-hook-form'
import ResourceBaseRichRadioElement from '../../Resource/ResourceBaseRichRadioElement'
import { PrivacyTag } from '../../PrivacyTags'

const VisibilityEdition = ({
  control,
  disabled,
}: {
  control: Control<{ isPublic: boolean }>
  disabled?: boolean
}) => (
  <Controller
    control={control}
    name="isPublic"
    render={({ field: { onChange, name, value }, fieldState: { error } }) => (
      <fieldset
        className="fr-fieldset"
        id="radio-rich"
        aria-labelledby="radio-rich-legend radio-rich-messages"
      >
        <ResourceBaseRichRadioElement
          id="radio-base-public"
          disabled={disabled}
          data-testid="visibility-radio-base-public"
          name={name}
          value={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Value is string
            value === undefined || value === null ? null : value.toString()
          }
          radioValue="true"
          onChange={() => {
            onChange(true)
          }}
        >
          <div className="fr-mr-1w">
            Base publique
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              Visible par tous les visiteurs.
            </p>
          </div>
          <PrivacyTag isPublic />
        </ResourceBaseRichRadioElement>
        <ResourceBaseRichRadioElement
          id="radio-base-private"
          disabled={disabled}
          data-testid="visibility-radio-base-private"
          name={name}
          value={
            value === undefined || value === null ? null : value.toString()
          }
          radioValue="false"
          onChange={() => {
            onChange(false)
          }}
        >
          <div className="fr-mr-1w">
            Base privée
            <p className="fr-text--xs fr-hint-text fr-mb-0">
              Accessible uniquement aux membres et aux administrateurs que vous
              inviterez.
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

export default VisibilityEdition