import classNames from 'classnames'
import React, { PropsWithChildren } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import styles from './ResourceBaseRichRadio.module.css'

const ResourceBaseRichRadioElement = <T extends FieldValues>({
  id,
  name,
  disabled,
  value,
  radioValue,
  onChange,
  children,
}: PropsWithChildren<{
  id: string
  name: string
  disabled?: boolean
  radioValue: string | null
  value: string | null
  onChange: (value: PathValue<T, Path<T>>) => void
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
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/no-noninteractive-element-interactions */}
      <label
        className="fr-label"
        htmlFor={id}
        onClick={() => {
          // XXX React dsfr seems to not trigger input event on a label click
          // Keyboard tab + space still works
          onChange(value as PathValue<T, Path<T>>)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            onChange(value as PathValue<T, Path<T>>)
          }
        }}
      >
        {children}
      </label>
    </div>
  </div>
)

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
  // There will be bases with collaboration access in the future
  const bases = user.ownedBases
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
                className="fr-mx-2v fr-mt-4v fr-mb-4v"
                title="En tant que créateur de cette ressource, elle sera directement ajoutée à votre profil."
              />
              <ResourceBaseRichRadioElement
                id={profileRadioId}
                name={name}
                value={null}
                radioValue={value}
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
