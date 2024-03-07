'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Notice from '@codegouvfr/react-dsfr/Notice'
import ResourceIndexationView from '@app/web/components/Resource/View/ResourceIndexationView'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  ChangeIndexationCommand,
  ChangeIndexationCommandValidation,
} from '@app/web/server/resources/feature/ChangeIndexation'
import { Resource } from '@app/web/server/resources/getResource'
import EditCard from '@app/web/components/EditCard'
import { hasIndexation } from '@app/web/utils/indexation'
import ResourceIndexationEdition from '@app/web/components/Resource/Edition/Parameters/ResourceIndexationEdition'
import styles from './ResourceIndexation.module.css'

const ResourceIndexation = ({ resource }: { resource: Resource }) => {
  const form = useForm<ChangeIndexationCommand>({
    resolver: zodResolver(ChangeIndexationCommandValidation),
    defaultValues: {
      name: 'ChangeIndexation',
      payload: {
        resourceId: resource.id,
        themes: resource.themes,
        supportTypes: resource.supportTypes,
        targetAudiences: resource.targetAudiences,
      },
    },
  })
  const mutate = trpc.resource.mutate.useMutation()
  return (
    <EditCard
      className="fr-mt-3w"
      id="indexation"
      title="Indexation"
      titleAs="h2"
      description="L’indexation permettra aux autres utilisateurs de la base de trouver votre ressource via le moteur de recherche."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync(data)
      }}
      edition={
        <ResourceIndexationEdition
          control={form.control}
          themesPath="payload.themes"
          supportTypesPath="payload.supportTypes"
          targetAudiencesPath="payload.targetAudiences"
        />
      }
      view={
        hasIndexation(resource) ? (
          <ResourceIndexationView
            resource={resource}
            withDescription
            supportTypes
            targetAudiences
            themes
          />
        ) : (
          <Notice
            data-testid="resource-empty-indexation"
            className={styles.emptyIndexation}
            title="Vous n’avez pas renseigné d’indexation pour votre ressource."
          />
        )
      }
    />
  )
}

export default withTrpc(ResourceIndexation)
