'use client'

import EditCard from '@app/web/components/EditCard'
import { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import ResourceLicenceFields from '@app/web/features/resources/licence/components/ResourceLicenceFields'
import ResourceLicenceView from '@app/web/features/resources/licence/components/ResourceLicenceView'
import {
  ChangeLicenceCommand,
  ChangeLicenceCommandValidation,
} from '@app/web/server/resources/feature/ResourceChangeLicence'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const ResourceLicenceForm = ({
  resource,
  sendCommand,
}: {
  resource: ResourceProjectionWithContext
  sendCommand?: SendCommand
}) => {
  const form = useForm<ChangeLicenceCommand>({
    resolver: zodResolver(ChangeLicenceCommandValidation),
    defaultValues: {
      name: 'ChangeLicence',
      payload: {
        resourceId: resource.id,
        licence: resource.licence,
      },
    },
  })
  const mutate = trpc.resource.mutate.useMutation()

  const handleMutation = async (data: ChangeLicenceCommand) => {
    if (sendCommand) {
      await sendCommand(data)
    } else {
      await mutate.mutateAsync(data)
    }
  }

  return (
    <EditCard
      noBorder
      className="fr-mt-3w"
      id="visibilite"
      title="Licence de la ressource"
      titleAs="h2"
      description={
        <span>
          Choisissez sous quelle licence vous souhaitez publier votre ressource.
          <br />
          <Link
            href="https://docs.numerique.gouv.fr/docs/db7ae3db-2d42-4791-a5f6-c665bab99da4/"
            target="_blank"
            rel="noopener noreferrer"
            className="fr-text--sm fr-link"
          >
            En savoir plus
          </Link>
        </span>
      }
      form={form}
      mutation={handleMutation}
      edition={
        <ResourceLicenceFields control={form.control} path="payload.licence" />
      }
      view={<ResourceLicenceView resource={resource} />}
    />
  )
}

export default withTrpc(ResourceLicenceForm)
