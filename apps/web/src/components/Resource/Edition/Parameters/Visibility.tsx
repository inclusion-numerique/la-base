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
  ChangeVisibilityCommand,
  ChangeVisibilityCommandValidation,
} from '@app/web/server/resources/feature/ChangeVisibility'
import EditCard from '@app/web/components/EditCard'
import VisibilityEdition from './VisibilityEdition'

const getVisibilityText = (resource: Resource) => {
  if (resource.isPublic) {
    return 'Votre ressource est publique. Vous pouvez passer votre ressource en privée si vous le souhaitez.'
  }

  if (resource.base) {
    if (!resource.base.isPublic) {
      return 'Votre ressource est dans une base privée. Vous ne pouvez pas changer sa visibilité.'
    }
  } else if (!resource.createdBy.isPublic) {
    return 'Votre ressource est dans un profil privé. Vous ne pouvez pas changer sa visibilité.'
  }

  return 'Votre ressource est privée. Vous pouvez passer votre ressource en publique si vous le souhaitez.'
}

const Visibility = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const form = useForm<ChangeVisibilityCommand>({
    resolver: zodResolver(ChangeVisibilityCommandValidation),
    defaultValues: {
      name: 'ChangeVisibility',
      payload: {
        resourceId: resource.id,
        isPublic: resource.isPublic === null ? undefined : resource.isPublic,
      },
    },
  })
  const mutate = trpc.resource.mutate.useMutation()

  return (
    <EditCard
      className="fr-mt-3w"
      id="visibilite"
      title="Visibilité de la ressource"
      description="Choisissez la visibilité de votre ressource."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync(data)
      }}
      edition={
        <VisibilityEdition
          resource={resource}
          user={user}
          path="payload.isPublic"
          control={form.control}
        />
      }
      view={
        <>
          <p className="fr-text--sm" data-testid="resource-visibility">
            {getVisibilityText(resource)}
          </p>
          <ResourcePrivacyTag isPublic={resource.isPublic || false} />
        </>
      }
    />
  )
}

export default withTrpc(Visibility)
