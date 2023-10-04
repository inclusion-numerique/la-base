import React, { Dispatch, SetStateAction } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { SessionUser } from '@app/web/auth/sessionUser'
import { Resource } from '@app/web/server/resources/getResource'
import { PrivacyTag } from '@app/web/components/PrivacyTags'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import ResourceBaseRichRadioElement from '../../ResourceBaseRichRadioElement'

const VisibilityEdition = <T extends FieldValues>({
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
    render={({ field: { onChange, name, value } }) => {
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
            <span className="fr-mr-1w">Ressource publique</span>
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
            <span className="fr-mr-1w">Ressource privée</span>
            <PrivacyTag />
          </ResourceBaseRichRadioElement>
        </fieldset>
      )
    }}
  />
)

export default VisibilityEdition
