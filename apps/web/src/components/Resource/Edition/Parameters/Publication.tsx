'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import {
  UpdateResourcePublicationCommand,
  UpdateResourcePublicationCommandValidation,
} from '@app/web/server/resources/parameters'
import EditCard from '@app/web/components/EditCard'
import ResourceBaseRichRadio from '../../ResourceBaseRichRadio'
import PublicationView from './PublicationView'

const Publication = ({
  resource,
  user,
}: {
  resource: Resource
  user: SessionUser
}) => {
  const form = useForm<UpdateResourcePublicationCommand>({
    resolver: zodResolver(UpdateResourcePublicationCommandValidation),
    defaultValues: {
      baseId: resource.baseId,
    },
  })
  const mutate = trpc.resource.mutateParameters.useMutation()

  return (
    <EditCard
      id="publication"
      title="Ressource publiée dans"
      form={form}
      mutation={async (data) => {
        await mutate.mutateAsync({ id: resource.id, data })
      }}
      edition={
        <ResourceBaseRichRadio
          control={form.control}
          path="baseId"
          user={user}
          disabled={form.formState.isSubmitting}
        />
      }
      view={<PublicationView resource={resource} user={user} />}
    />
  )
}

export default withTrpc(Publication)
