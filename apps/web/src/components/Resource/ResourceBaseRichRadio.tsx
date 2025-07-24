import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import ResourceBaseRichRadioElement from './ResourceBaseRichRadioElement'

const ResourceBaseRichRadio = <T extends FieldValues>({
  user,
  control,
  path,
  disabled,
}: {
  user: SessionUser
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
}) => {
  const bases = user.bases.map(({ base }) => base)
  const profileRadioId = `base-profile-radio`
  const id = 'resource-base-rich-radio'

  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onChange, name, value }, fieldState: { error } }) => (
        <fieldset
          className="fr-fieldset"
          id="radio-rich"
          aria-labelledby="radio-rich-legend radio-rich-messages"
        >
          {bases.length === 0 ? (
            <Notice
              className="fr-mx-2v fr-mt-4v"
              title="Actuellement, vous n’êtes pas membre d’une base. Cette ressource sera donc ajoutée à votre profil."
            />
          ) : (
            <>
              <Notice
                className="fr-mx-2v fr-my-4v"
                title="En tant que créateur de cette ressource, elle sera toujours visible sur votre profil."
              />
              <ResourceBaseRichRadioElement
                data-testid="resource-base-profil"
                id={profileRadioId}
                name={name}
                value={value}
                radioValue={null}
                disabled={disabled}
                onChange={onChange}
              >
                <span>Ajouter uniquement à mon profil</span>
                <ProfilePrivacyTag isPublic={user.isPublic} />
              </ResourceBaseRichRadioElement>
              <p
                className="fr-fieldset__legend--regular fr-fieldset__legend fr-mt-4v"
                id="radio-rich-legend"
              >
                Ajouter également cette ressource à l’une de vos bases&nbsp;:
              </p>
              {bases.map((base, index) => (
                <ResourceBaseRichRadioElement
                  key={base.id}
                  data-testid={`resource-base-${index.toString()}`}
                  id={`base-radio-${index.toString()}`}
                  name={name}
                  value={value}
                  radioValue={base.id}
                  disabled={disabled}
                  onChange={onChange}
                >
                  <span>{base.title}</span>
                  <BasePrivacyTag isPublic={base.isPublic} />
                </ResourceBaseRichRadioElement>
              ))}
            </>
          )}
          {error && (
            <div
              className="fr-messages-group"
              id={`${id}__error`}
              aria-live="assertive"
            >
              <p className="fr-message fr-message--error">{error.message}</p>
            </div>
          )}
          <div
            className="fr-messages-group"
            id="radio-rich-messages"
            aria-live="assertive"
          />
        </fieldset>
      )}
    />
  )
}

export default ResourceBaseRichRadio
