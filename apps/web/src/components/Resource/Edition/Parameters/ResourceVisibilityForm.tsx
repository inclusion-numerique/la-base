'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import {
  ChangeVisibilityCommand,
  ChangeVisibilityCommandValidation,
} from '@app/web/server/resources/feature/ChangeVisibility'
import EditCard from '@app/web/components/EditCard'
import { PrivacyTag } from '../../../PrivacyTags'
import ResourceVisibilityFormField from './ResourceVisibilityFormField'

const getVisibilityText = (resource: Resource) => {
  if (resource.isPublic) {
    return 'Visible par tous les visiteurs.'
  }

  if (resource.base && !resource.base.isPublic) {
    return 'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.'
  }

  return 'Visible uniquement par vous et les contributeurs que vous avez invités.'
}

const ResourceVisibilityForm = ({
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

  useEffect(() => {
    if (form.getValues('payload.isPublic')) {
      const canBePublic = resource.base ? resource.base.isPublic : user.isPublic
      if (!canBePublic) {
        form.setValue('payload.isPublic', false)
      }
    }
  }, [resource, user])

  const mutate = trpc.resource.mutate.useMutation()

  return (
    <EditCard
      className="fr-mt-3w"
      id="visibilite"
      title="Visibilité de la ressource"
      description="Choisissez qui peut voir votre ressource."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync(data)
      }}
      edition={
        <ResourceVisibilityFormField
          resource={resource}
          user={user}
          path="payload.isPublic"
          control={form.control}
        />
      }
      view={
        <div className="fr-flex fr-align-items-center">
          <div className="fr-flex-grow-1 fr-mr-1w">
            <span className="fr-text-label--grey">
              {resource.isPublic ? 'Ressource publique' : 'Ressource privée'}
            </span>
            <p
              className="fr-text--xs fr-hint-text "
              data-testid="resource-visibility"
            >
              {getVisibilityText(resource)}
            </p>
          </div>
          <div>
            <PrivacyTag isPublic={resource.isPublic ?? undefined} />
          </div>
        </div>
      }
    />
  )
}

export default withTrpc(ResourceVisibilityForm)
