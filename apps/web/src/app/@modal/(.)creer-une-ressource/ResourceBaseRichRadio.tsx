/* eslint react/jsx-props-no-spreading: 0 */
import { SessionUser } from '@app/web/auth/sessionUser'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import classNames from 'classnames'
import {
  BasePrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import React from 'react'
import styles from './ResourceBaseRichRadio.module.css'

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
      render={({
        field: { onChange, name, value },
        fieldState: { invalid, error, isDirty },
      }) => (
        <fieldset
          className="fr-fieldset"
          id="radio-rich"
          aria-labelledby="radio-rich-legend radio-rich-messages"
        >
          <div className="fr-fieldset__element">
            <div
              className={classNames(
                'fr-radio-group',
                'fr-radio-rich',
                styles.radio,
              )}
            >
              <input
                id={profileRadioId}
                type="radio"
                onChange={(event) => {
                  console.log('ON PROFILE CHANGE', event)
                  onChange(null)
                }}
                name={name}
                checked={value === null}
                value=""
                disabled={disabled}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                className="fr-label"
                htmlFor={profileRadioId}
                onClick={() => {
                  // XXX React dsfr seems to not triger input event on a label click
                  // Keyboard tab + space still works
                  onChange(null)
                }}
              >
                <span>Ajouter à mon profil</span>
                <ProfilePrivacyTag isPublic />
              </label>
            </div>
          </div>
          <p
            className="fr-fieldset__legend--regular fr-fieldset__legend fr-mt-4v"
            id="radio-rich-legend"
          >
            Ajouter cette ressource à l’une de vos bases&nbsp;:
          </p>
          {bases.map((base, index) => {
            const baseRadioId = `base-radio-${index.toString()}`
            return (
              <div key={base.id} className="fr-fieldset__element">
                <div
                  className={classNames(
                    'fr-radio-group',
                    'fr-radio-rich',
                    styles.radio,
                  )}
                >
                  <input
                    id={id}
                    type="radio"
                    onChange={() => {
                      onChange(base.id)
                    }}
                    checked={value === base.id}
                    value={base.id}
                    name={name}
                    disabled={disabled}
                  />
                  <label
                    className="fr-label"
                    htmlFor={baseRadioId}
                    onClick={() => {
                      // XXX React dsfr seems to not triger input event on a label click
                      // Keyboard tab + space still works
                      onChange(base.id)
                    }}
                  >
                    <span>{base.title}</span>
                    <BasePrivacyTag />
                  </label>
                </div>
              </div>
            )
          })}
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
