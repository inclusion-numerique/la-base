'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourcePrivacyTag } from '@app/web/components/PrivacyTags'
import {
  UpdateResourceVisibilityCommand,
  UpdateResourceVisibilityCommandValidation,
} from '@app/web/server/resources/parameters'
import EditCard from '@app/web/components/EditCard'
import VisibilityEdition from './VisibilityEdition'

const Visibility = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const form = useForm<UpdateResourceVisibilityCommand>({
    resolver: zodResolver(UpdateResourceVisibilityCommandValidation),
    defaultValues: {
      isPublic: resource.isPublic === null ? undefined : resource.isPublic,
    },
  })
  const mutate = trpc.resource.mutateParameters.useMutation()

  return (
    <EditCard
      className="fr-mt-3w"
      id="visibilite"
      title="Visibilité de la ressource"
      description="Choisissez la visibilité de votre ressource."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync({ id: resource.id, data })
      }}
      edition={
        <VisibilityEdition
          resource={resource}
          user={user}
          path="isPublic"
          control={form.control}
        />
      }
      view={
        <>
          <p className="fr-text--sm" data-testid="resource-visibility">
            {resource.isPublic
              ? 'Votre ressource est publique. Vous pouvez passez votre ressource en privée si vous le souhaitez.'
              : 'Votre ressource est privée. Vous pouvez passez votre ressource en publique si vous le souhaitez.'}
          </p>
          <ResourcePrivacyTag isPublic={resource.isPublic || false} />
        </>
      }
    />
  )
}

export default withTrpc(Visibility)
