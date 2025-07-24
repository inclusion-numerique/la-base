import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { SessionUser } from '@app/web/auth/sessionUser'
import Card from '@app/web/components/Card'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import VisibilityField from '@app/web/components/VisibilityField'
import ResourceLicenceForm from '@app/web/features/resources/licence/components/ResourceLicenceForm'
import type { PublishCommand } from '@app/web/server/resources/feature/PublishResource'
import type { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import InviteContributors from '../Contributors/InviteResourceContributors'
import ResourceIndexationEdition from './Parameters/ResourceIndexationEdition'
import ResourcePublicationView from './Parameters/ResourcePublicationView'
import ResourceBaseEdition from './ResourceBaseEdition'
import styles from './ResourcePublication.module.css'

const visibilityTexts = (base: { id: string } | null) => ({
  publicTitle: 'Ressource publique',
  privateTitle: 'Ressource privée',
  publicHint: 'Visible par tous les visiteurs.',
  privateHint: base
    ? 'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.'
    : 'Visible uniquement par vous et les contributeurs que vous avez invités.',
})

const ResourcePublication = ({
  resource,
  user,
  sendCommand,
  form: { control, setValue },
}: {
  resource: ResourceProjectionWithContext
  user: SessionUser
  sendCommand: SendCommand
  form: UseFormReturn<PublishCommand>
}) => {
  const [isPublic, setIsPublic] = useState<boolean | null>(() => {
    const canBePublic = resource.base ? resource.base.isPublic : user.isPublic
    return canBePublic ? null : false
  })

  useEffect(() => {
    if (isPublic) {
      const canBePublic = resource.base ? resource.base.isPublic : user.isPublic
      if (!canBePublic) {
        setIsPublic(false)
        setValue('payload.isPublic', false)
      }
    }
  }, [resource, user, isPublic, setValue])
  return (
    <>
      <h1 className={styles.title}>Qui peut consulter votre ressource ?</h1>
      <p>
        Choisissez qui peut voir et/ou éditer votre ressource. Vous pourrez
        modifier vos choix à tout moment dans les paramètres de votre ressource.
      </p>
      <div className="fr-p-4w fr-mt-3w fr-border-radius--8 fr-border">
        <ResourceBaseEdition
          resource={resource}
          user={user}
          sendCommand={sendCommand}
        >
          <h2 className="fr-mb-0 fr-h5 fr-text-label--blue-france">
            Ressource publiée dans
          </h2>
        </ResourceBaseEdition>
        <hr className={classNames(styles.separator, 'fr-mt-4w fr-pb-4w')} />
        <ResourcePublicationView resource={resource} user={user} />
      </div>
      <Card
        noBorder
        className="fr-mt-3w fr-border-radius--8 fr-border"
        title="Visibilité de la ressource"
        titleAs="h2"
        titleClassName="fr-text-label--blue-france"
        description="Choisissez qui peut voir votre ressource."
        contentSeparator
      >
        {resource.base
          ? !resource.base.isPublic && (
              <Notice
                data-testid="notice-private-base"
                className="fr-mx-2v fr-my-4v"
                title="En publiant votre ressource dans une base privée, vous ne pourrez pas la rendre publique."
              />
            )
          : !user.isPublic && (
              <Notice
                data-testid="notice-private-profile"
                className="fr-mx-2v fr-my-4v"
                title="En publiant votre ressource dans un profil privé, vous ne pourrez pas la rendre publique."
              />
            )}
        <VisibilityField
          model="resource"
          path="payload.isPublic"
          control={control}
          disabled={!(resource.base ? resource.base.isPublic : user.isPublic)}
          setIsPublic={setIsPublic}
          {...visibilityTexts(resource.base)}
        />
      </Card>
      <ResourceLicenceForm resource={resource} sendCommand={sendCommand} />
      {isPublic && (
        <Card
          data-testid="indexation-box"
          title="Indexation"
          titleClassName="fr-text-label--blue-france"
          className="fr-mt-3w fr-border-radius--8 fr-border"
          noBorder
          titleAs="h2"
          description={
            <>
              L’indexation permettra aux autres utilisateurs de la base de
              trouver votre ressource via le moteur de recherche.
              <br />
              <span className="fr-text--sm fr-hint-text fr-mb-0">
                Les champs avec <RedAsterisk /> sont obligatoires.
              </span>
            </>
          }
          contentSeparator
        >
          <ResourceIndexationEdition
            themesPath="payload.themes"
            resourceTypesPath="payload.resourceTypes"
            beneficiariesPath="payload.beneficiaries"
            professionalSectorsPath="payload.professionalSectors"
            required
            control={control}
          />
        </Card>
      )}
      {isPublic === false && (
        <Card
          className="fr-mt-3w fr-border-radius--8 fr-border"
          data-testid="contributors-box"
          noBorder
          title="Contributeurs"
          titleClassName="fr-text-label--blue-france"
          titleAs="h2"
          description="Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs et supprimer la ressource."
          contentSeparator
        >
          <InviteContributors resource={resource} />
        </Card>
      )}
    </>
  )
}

export default ResourcePublication
