'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import {
  ChangeBaseCommand,
  ChangeBaseCommandValidation,
} from '@app/web/server/resources/feature/ChangeBase'
import { Resource } from '@app/web/server/resources/getResource'
import EditCard from '@app/web/components/EditCard'
import ResourceBaseRichRadio from '../../ResourceBaseRichRadio'
import ResourcePublicationView from './ResourcePublicationView'

const ResourcePublication = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const form = useForm<ChangeBaseCommand>({
    resolver: zodResolver(ChangeBaseCommandValidation),
    defaultValues: {
      name: 'ChangeBase',
      payload: {
        resourceId: resource.id,
        baseId: resource.baseId,
      },
    },
  })
  const mutate = trpc.resource.mutate.useMutation()

  return (
    <EditCard
      id="publication"
      title="Ressource publiée dans"
      titleAs="h2"
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync(data)
      }}
      edition={
        <ResourceBaseRichRadio
          control={form.control}
          path="payload.baseId"
          user={user}
          disabled={form.formState.isSubmitting}
        />
      }
      view={<ResourcePublicationView resource={resource} user={user} />}
    />
  )
}

export default withTrpc(ResourcePublication)
