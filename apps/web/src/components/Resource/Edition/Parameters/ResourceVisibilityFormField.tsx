import React, { Dispatch, SetStateAction } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'
import { PrivacyTag } from '@app/web/components/PrivacyTags'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import ResourceBaseRichRadioElement from '../../ResourceBaseRichRadioElement'

const ResourceVisibilityFormField = <T extends FieldValues>({
  control,
  resource,
  path,
  user,
  setIsPublic,
}: {
  control: Control<T>
  path: Path<T>
  resource: Resource | ResourceProjectionWithContext
  user: SessionUser
  setIsPublic?: Dispatch<SetStateAction<boolean | null>>
}) => (
  <Controller
    control={control}
    name={path}
    render={({ field: { onChange, name, value }, fieldState: { error } }) => {
      const booleanValue = value as boolean | null | undefined
      const stringValue =
        booleanValue === undefined || booleanValue === null
          ? null
          : booleanValue.toString()

      return (
        <fieldset
          className="fr-fieldset"
          id="radio-rich"
          aria-labelledby="radio-rich-legend radio-rich-messages"
        >
          {resource.base
            ? !resource.base.isPublic && (
                <Notice
                  data-testid="notice-private-base"
                  className="fr-mx-2v fr-mt-4v fr-mb-4v"
                  title="En publiant votre ressource dans une base privée, vous ne pourrez pas la rendre publique."
                />
              )
            : !user.isPublic && (
                <Notice
                  data-testid="notice-private-profile"
                  className="fr-mx-2v fr-mt-4v fr-mb-4v"
                  title="En publiant votre ressource dans un profil privé, vous ne pourrez pas la rendre publique."
                />
              )}
          <ResourceBaseRichRadioElement
            id="radio-resource-public"
            data-testid="visibility-radio-resource-public"
            name={name}
            value={stringValue}
            radioValue="true"
            disabled={!(resource.base ? resource.base.isPublic : user.isPublic)}
            onChange={() => {
              if (setIsPublic) {
                setIsPublic(true)
              }
              onChange(true)
            }}
          >
            <div className="fr-mr-1w">
              Ressource publique
              <p className="fr-text--xs fr-hint-text fr-mb-0">
                Visible par tous les visiteurs.
              </p>
            </div>
            <PrivacyTag isPublic />
          </ResourceBaseRichRadioElement>
          <ResourceBaseRichRadioElement
            id="radio-resource-private"
            data-testid="visibility-radio-resource-private"
            name={name}
            value={stringValue}
            radioValue="false"
            onChange={() => {
              if (setIsPublic) {
                setIsPublic(false)
              }
              onChange(false)
            }}
          >
            <div className="fr-mr-1w">
              Ressource privée
              <p className="fr-text--xs fr-hint-text fr-mb-0">
                Visible uniquement par vous et les contributeurs que vous avez
                invités.
              </p>
            </div>
            <PrivacyTag />
          </ResourceBaseRichRadioElement>
          {error && (
            <p
              className="fr-error-text"
              id="input-form-field__isPublic__error"
              data-testid="input-form-field__isPublic__error"
            >
              {error.message}
            </p>
          )}
        </fieldset>
      )
    }}
  />
)

export default ResourceVisibilityFormField
