import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PublishCommand } from '@app/web/server/resources/feature/PublishResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { SessionUser } from '@app/web/auth/sessionUser'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import Card from '../../Card'
import InviteContributors from '../Contributors/InviteResourceContributors'
import ResourcePublicationView from './Parameters/ResourcePublicationView'
import ResourceBaseEdition from './ResourceBaseEdition'
import styles from './ResourcePublication.module.css'
import ResourceVisibilityFormField from './Parameters/ResourceVisibilityFormField'
import ResourceIndexationEdition from './Parameters/ResourceIndexationEdition'

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
      <div className={styles.card}>
        <ResourceBaseEdition
          resource={resource}
          user={user}
          sendCommand={sendCommand}
        >
          <h5 className="fr-mb-0">Ressource publiée dans</h5>
        </ResourceBaseEdition>
        <hr className="fr-mt-4w fr-pb-4w" />
        <ResourcePublicationView resource={resource} user={user} />
      </div>
      <Card
        title="Visibilité de la ressource"
        description="Choisissez qui peut voir votre ressource."
        className="fr-mt-3w"
      >
        <ResourceVisibilityFormField
          resource={resource}
          user={user}
          control={control}
          path="payload.isPublic"
          setIsPublic={setIsPublic}
        />
      </Card>
      {isPublic && (
        <Card
          className="fr-mt-3w"
          data-testid="indexation-box"
          title="Indexation"
          description="L’indexation permettra aux autres utilisateurs de la base de trouver votre ressource via le moteur de recherche."
          asterisk
        >
          <ResourceIndexationEdition
            themesPath="payload.themes"
            supportTypesPath="payload.supportTypes"
            targetAudiencesPath="payload.targetAudiences"
            required
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: resource is public !
            control={control}
          />
        </Card>
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

export default ResourcePublication
