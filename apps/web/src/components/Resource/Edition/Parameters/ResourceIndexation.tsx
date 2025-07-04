'use client'

import ResourceIndexationView from '@app/web/app/(public)/ressources/[slug]/_components/ResourceIndexationView'
import EditCard from '@app/web/components/EditCard'
import ResourceIndexationEdition from '@app/web/components/Resource/Edition/Parameters/ResourceIndexationEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type ChangeIndexationCommand,
  ChangeIndexationCommandValidation,
} from '@app/web/server/resources/feature/ChangeIndexation'
import type { Resource } from '@app/web/server/resources/getResource'
import { trpc } from '@app/web/trpc'
import { hasIndexation } from '@app/web/utils/indexation'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from './ResourceIndexation.module.css'

const ResourceIndexation = ({ resource }: { resource: Resource }) => {
  const form = useForm<ChangeIndexationCommand>({
    resolver: zodResolver(ChangeIndexationCommandValidation),
    defaultValues: {
      name: 'ChangeIndexation',
      payload: {
        resourceId: resource.id,
        themes: resource.themes,
        resourceTypes: resource.resourceTypes,
        beneficiaries: resource.beneficiaries,
        professionalSectors: resource.professionalSectors,
      },
    },
  })

  const mutate = trpc.resource.mutate.useMutation()
  return (
    <EditCard
      noBorder
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
          resourceTypesPath="payload.resourceTypes"
          beneficiariesPath="payload.beneficiaries"
          professionalSectorsPath="payload.professionalSectors"
        />
      }
      view={
        hasIndexation(resource) ? (
          <ResourceIndexationView
            resource={resource}
            withDescription
            resourceTypes
            beneficiaries
            professionalSectors
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
