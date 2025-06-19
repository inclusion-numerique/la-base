'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import EditCard from '@app/web/components/EditCard'
import Visibility from '@app/web/components/Visibility'
import VisibilityField from '@app/web/components/VisibilityField'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type ChangeVisibilityCommand,
  ChangeVisibilityCommandValidation,
} from '@app/web/server/resources/feature/ChangeVisibility'
import type { Resource } from '@app/web/server/resources/getResource'
import { trpc } from '@app/web/trpc'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const visibilityTexts = (base: { id: string } | null) => ({
  publicTitle: 'Ressource publique',
  privateTitle: 'Ressource privée',
  publicHint: 'Visible par tous les visiteurs.',
  privateHint: base
    ? 'Visible uniquement par les membres de votre base et les contributeurs que vous avez invités.'
    : 'Visible uniquement par vous et les contributeurs que vous avez invités.',
})

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
  }, [resource, user, form.setValue, form.getValues])

  const mutate = trpc.resource.mutate.useMutation()

  return (
    <EditCard
      className="fr-mt-3w"
      id="visibilite"
      title="Visibilité de la ressource"
      titleAs="h2"
      description="Choisissez qui peut voir votre ressource."
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync(data)
      }}
      edition={
        <>
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
            control={form.control}
            disabled={!(resource.base ? resource.base.isPublic : user.isPublic)}
            {...visibilityTexts(resource.base)}
          />
        </>
      }
      view={
        <Visibility
          isPublic={resource.isPublic ?? false}
          {...visibilityTexts(resource.base)}
        />
      }
    />
  )
}

export default withTrpc(ResourceVisibilityForm)
