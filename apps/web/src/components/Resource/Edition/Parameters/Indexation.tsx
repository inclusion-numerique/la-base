'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import {
  UpdateResourceIndexationCommand,
  UpdateResourceIndexationCommandValidation,
} from '@app/web/server/resources/parameters'
import EditCard from '@app/web/components/EditCard'
import { hasIndexation } from '@app/web/utils/indexation'
import ResourceIndexation from '../../View/ResourceIndexation'
import IndexationEdition from './IndexationEdition'
import styles from './Indexation.module.css'

const Indexation = ({ resource }: { resource: Resource }) => {
  const form = useForm<UpdateResourceIndexationCommand>({
    resolver: zodResolver(UpdateResourceIndexationCommandValidation),
    defaultValues: {
      themes: resource.themes,
      supportTypes: resource.supportTypes,
      targetAudiences: resource.targetAudiences,
    },
  })
  const mutate = trpc.resource.mutateParameters.useMutation()
  return (
    <EditCard
      className="fr-mt-3w"
      id="indexation"
      title="Indexation"
      description="L’indexation permettra aux autres utilisateurs de la base de trouver votre ressource via le moteur de recherche."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync({ id: resource.id, data })
      }}
      edition={
        <IndexationEdition
          control={form.control}
          themesPath="themes"
          supportTypesPath="supportTypes"
          targetAudiencesPath="targetAudiences"
        />
      }
      view={
        hasIndexation(resource) ? (
          <ResourceIndexation resource={resource} withDescription />
        ) : (
          <Notice
            data-testId="resource-empty-indexation"
            className={styles.emptyIndexation}
            title="Vous n’avez pas renseigné d’indexation pour votre ressource."
          />
        )
      }
    />
  )
}

export default withTrpc(Indexation)
