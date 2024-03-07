import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import Notice from '@codegouvfr/react-dsfr/Notice'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { PublishCommand } from '@app/web/server/resources/feature/PublishResource'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { SessionUser } from '@app/web/auth/sessionUser'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import Card from '@app/web/components/Card'
import VisibilityField from '@app/web/components/VisibilityField'
import InviteContributors from '../Contributors/InviteResourceContributors'
import ResourcePublicationView from './Parameters/ResourcePublicationView'
import ResourceBaseEdition from './ResourceBaseEdition'
import styles from './ResourcePublication.module.css'
import ResourceIndexationEdition from './Parameters/ResourceIndexationEdition'

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
      <div className={styles.card}>
        <ResourceBaseEdition
          resource={resource}
          user={user}
          sendCommand={sendCommand}
        >
          <h2 className="fr-mb-0 fr-h5">Ressource publiée dans</h2>
        </ResourceBaseEdition>
        <hr className="fr-mt-4w fr-pb-4w" />
        <ResourcePublicationView resource={resource} user={user} />
      </div>
      <Card
        title="Visibilité de la ressource"
        titleAs="h2"
        description="Choisissez qui peut voir votre ressource."
        className="fr-mt-3w"
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
      {isPublic && (
        <Card
          data-testid="indexation-box"
          className="fr-mt-3w"
          title="Indexation"
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
            supportTypesPath="payload.supportTypes"
            targetAudiencesPath="payload.targetAudiences"
            required
            control={control}
          />
        </Card>
      )}
      {isPublic === false && (
        <Card
          data-testid="contributors-box"
          className="fr-mt-3w"
          title="Contributeurs"
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
