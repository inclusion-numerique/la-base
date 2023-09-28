import React, { useState } from 'react'
import classNames from 'classnames'
import { Controller, UseFormReturn } from 'react-hook-form'
import Notice from '@codegouvfr/react-dsfr/Notice'
import MultipleSelectFormField from '@app/ui/components/Form/MultipleSelectFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import {
  targetAudiencesLimit,
  PublishCommand,
  supportTypesLimit,
  themesLimit,
} from '@app/web/server/resources/feature/PublishResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { SessionUser } from '@app/web/auth/sessionUser'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import {
  BasePrivacyTag,
  PrivacyTag,
  ProfilePrivacyTag,
} from '@app/web/components/PrivacyTags'
import ResourceBaseRichRadioElement from '@app/web/components/Resource/ResourceBaseRichRadioElement'
import baseStyles from '@app/web/components/Resource/PublishedInInformation.module.css'
import Card from '../../Card'
import InviteContributors from '../Contributors/InviteContributors'
import BaseEdition from './BaseEdition'
import styles from './Publication.module.css'

const Publication = ({
  resource,
  user,
  sendCommand,
  form: { control },
}: {
  resource: ResourceProjectionWithContext
  user: SessionUser
  sendCommand: SendCommand
  form: UseFormReturn<PublishCommand>
}) => {
  const canBePublic = resource.base ? resource.base.isPublic : user.isPublic
  const [isPublic, setIsPublic] = useState<boolean | null>(
    canBePublic ? null : false,
  )

  return (
    <>
      <h3 className={styles.title}>Qui peut consulter votre ressource ?</h3>
      <p>
        Choisissez qui peut voir et/ou éditer votre ressource. Vous pourrez
        modifier vos choix à tout moment dans les paramètres de votre ressource.
      </p>
      <div className={styles.card}>
        <BaseEdition
          resource={resource}
          user={user}
          sendCommand={sendCommand}
          iconText="Modifier"
        >
          <h5 className="fr-mb-0">Ressource publiée dans</h5>
        </BaseEdition>
        <hr className="fr-mt-4w fr-pb-4w" />
        {resource.base ? (
          <div className={styles.baseInfo}>
            <div className={styles.baseName}>
              <div className={baseStyles.circle} />
              <span>{resource.base.title}</span>
            </div>
            <BasePrivacyTag isPublic={resource.base.isPublic} />
          </div>
        ) : (
          resource.createdBy && (
            <div className={styles.baseInfo}>
              <div className={styles.baseName}>
                <div className={baseStyles.circle} />
                <span>Publié par {resource.createdBy.name}</span>
              </div>
              <ProfilePrivacyTag isPublic={user.isPublic} />
            </div>
          )
        )}
      </div>
      <Card title="Visibilité de la ressource" className="fr-mt-3w">
        <Controller
          control={control}
          name="payload.isPublic"
          render={({ field: { onChange, name, value } }) => (
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
                value={
                  value === undefined || value === null
                    ? null
                    : value.toString()
                }
                radioValue="true"
                disabled={!canBePublic}
                onChange={() => {
                  setIsPublic(true)
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
                value={
                  value === undefined || value === null
                    ? null
                    : value.toString()
                }
                radioValue="false"
                onChange={() => {
                  setIsPublic(false)
                  onChange(false)
                }}
              >
                <span className="fr-mr-1w">Ressource privée</span>
                <PrivacyTag />
              </ResourceBaseRichRadioElement>
            </fieldset>
          )}
        />
      </Card>
      {isPublic && (
        <div
          className={classNames('fr-mt-3w', styles.card)}
          data-testid="indexation-box"
        >
          <h5 className="fr-mb-1w">Indexation</h5>
          <p className="fr-text--sm fr-mb-1w">
            L’indexation permettra aux autres utilisateurs de la base de trouver
            votre ressource via le moteur de recherche.
          </p>
          <p className="fr-text--sm fr-hint-text fr-mb-0">
            Les champs avec <RedAsterisk /> sont obligatoires.
          </p>
          <hr className="fr-mt-4w fr-pb-4w" />
          <MultipleSelectFormField
            data-testid="indexation-themes-select"
            asterisk
            label="Thématiques"
            hint={
              <>
                Quelles sont les principales thématiques abordées par la
                ressource ?
                <br />
                Sélectionnez jusqu’à {themesLimit} thématiques.
              </>
            }
            control={control}
            limit={themesLimit}
            path="payload.themes"
            defaultOption
            defaultOptionLabel="Selectionnez une thématique"
            options={[
              { name: 'Thématique 1', value: 'theme-1' },
              { name: 'Thématique 2', value: 'theme-2' },
              { name: 'Thématique 3', value: 'theme-3' },
            ]}
          />
          <MultipleSelectFormField
            data-testid="indexation-support-types-select"
            asterisk
            label="Type de support"
            hint={
              <>
                Type de support (article, fiche, guide...).
                <br />
                Sélectionnez jusqu’à {supportTypesLimit} types.
              </>
            }
            control={control}
            limit={supportTypesLimit}
            path="payload.supportTypes"
            defaultOption
            defaultOptionLabel="Selectionnez une type de support"
            options={[
              { name: 'Thématique 1', value: 'theme-1' },
              { name: 'Thématique 2', value: 'theme-2' },
              { name: 'Thématique 3', value: 'theme-3' },
            ]}
          />
          <MultipleSelectFormField
            data-testid="indexation-targetAudiences-select"
            asterisk
            label="Publics cibles"
            hint={
              <>
                Quel est le public visé par la ressource ?<br />
                Sélectionnez jusqu’à {targetAudiencesLimit} thématiques.
              </>
            }
            control={control}
            limit={targetAudiencesLimit}
            path="payload.targetAudiences"
            defaultOption
            defaultOptionLabel="Selectionnez un public"
            options={[
              { name: 'Thématique 1', value: 'theme-1' },
              { name: 'Thématique 2', value: 'theme-2' },
              { name: 'Thématique 3', value: 'theme-3' },
            ]}
          />
        </div>
      )}
      {isPublic === false && (
        <Card
          title="Contributeurs"
          description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
          className="fr-mt-3w"
          data-testid="contributors-box"
        >
          <InviteContributors resource={resource} />
        </Card>
      )}
    </>
  )
}

export default Publication
