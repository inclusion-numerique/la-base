import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import ResourceLicenceDescription from '@app/web/features/resources/licence/components/ResourceLicenceDescription'
import { licenceWordings } from '@app/web/features/resources/licence/licence-wordings'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { ResourceLicence } from '@prisma/client'
import Link from 'next/link'
import React, { type ReactNode } from 'react'
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
} from 'react-hook-form'
import ResourceLicenceLogo from './ResourceLicenceLogo'

const ResourceLicenceFields = <T extends FieldValues>({
  control,
  disabled,
  path,
  label,
  asterisk,
}: {
  control: Control<T>
  disabled?: boolean
  path: Path<T>
  label?: ReactNode
  asterisk?: boolean
}) => (
  <Controller
    control={control}
    name={path}
    render={({ field: { onChange, name, value }, fieldState: { error } }) => (
      <>
        <Notice
          className="fr-mb-4w"
          title={
            <span className="fr-text-default--grey fr-text--regular">
              Si votre structure employeuse et/ou si vous représentez une
              administration publique, vous êtes dans l’obligation d'utiliser la
              licence ouverte&nbsp;
              <Link
                href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                className="fr-link"
                target="_blank"
              >
                Etalab 2.0
              </Link>
            </span>
          }
        />
        <fieldset
          className="fr-fieldset"
          id="radio-licence"
          aria-labelledby="radio-licence-legend radio-licence-messages"
        >
          {!!label && (
            <legend
              id="radio-licence-legend"
              className="fr-label fr-mb-2v fr-ml-1-5v"
            >
              {label} {asterisk && <RedAsterisk />}
            </legend>
          )}
          {Object.entries(licenceWordings).map(
            ([licenceValue, { title, hint }]) => (
              <ResourceBaseRichRadioElement
                key={licenceValue}
                id={`radio-licence-${licenceValue
                  .toLowerCase()
                  .replace(/_/g, '-')}`}
                disabled={disabled}
                data-testid={`licence-radio-${licenceValue
                  .toLowerCase()
                  .replace(/_/g, '-')}`}
                name={name}
                value={value == null ? null : `${value}`}
                radioValue={licenceValue}
                onChange={() => onChange(licenceValue as ResourceLicence)}
              >
                <div className="fr-flex-grow-1 fr-mr-1w">
                  {title}
                  <p className="fr-text--xs fr-hint-text fr-mb-0">{hint}</p>
                </div>
                <div className="fr-hidden fr-unhidden-sm fr-ml-3w">
                  <ResourceLicenceLogo
                    licence={licenceValue as ResourceLicence}
                  />
                </div>
              </ResourceBaseRichRadioElement>
            ),
          )}
          {error && (
            <p className="fr-error-text" id="input-form-field__licence__error">
              {error.message}
            </p>
          )}
        </fieldset>
        <div className="fr-mb-4w">
          <ResourceLicenceDescription licence={value as ResourceLicence} />
        </div>
      </>
    )}
  />
)

export default ResourceLicenceFields
