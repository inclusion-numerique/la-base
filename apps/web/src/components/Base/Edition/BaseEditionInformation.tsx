'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import sanitizeHtml from 'sanitize-html'
import { zodResolver } from '@hookform/resolvers/zod'
import MaybeEmptyValue from '@app/ui/components/MaybeEmptyValue'
import EmptyValue from '@app/ui/components/EmptyValue'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import EditCard from '@app/web/components/EditCard'
import { BasePageData } from '@app/web/server/bases/getBase'
import {
  UpdateBaseInformationsCommand,
  UpdateBaseInformationsCommandValidation,
} from '@app/web/server/bases/updateBase'
import { getDepartmentName } from '@app/web/utils/departments'
import BaseInformationsEdition from '../BaseInformationsEdition'

const BaseEditionInformation = ({ base }: { base: BasePageData }) => {
  const form = useForm<UpdateBaseInformationsCommand>({
    resolver: zodResolver(UpdateBaseInformationsCommandValidation),
    defaultValues: {
      title: base.title,
      department: base.department || undefined,
      description: base.description || undefined,
    },
  })
  const mutate = trpc.base.mutate.useMutation()

  return (
    <EditCard
      id="informations"
      mutation={async (data) => {
        await mutate.mutateAsync({ id: base.id, data })
      }}
      form={form}
      title="Informations de la base"
      edition={<BaseInformationsEdition form={form} />}
      view={
        <>
          <div className="fr-text-mention--grey">Nom de la base</div>
          <div
            className="fr-text-mention--grey fr-text--medium fr-mb-2w"
            data-testid="base-information-title"
          >
            {base.title}
          </div>
          <>
            <div className="fr-text-mention--grey">Département</div>
            <div
              className="fr-text-mention--grey fr-text--medium fr-mb-2w"
              data-testid="base-information-department"
            >
              <MaybeEmptyValue
                value={base.department && getDepartmentName(base.department)}
              />
            </div>
          </>
          <div className="fr-text-mention--grey">Description</div>
          {base.description ? (
            <div
              className="fr-text-mention--grey fr-text--medium"
              data-testid="base-information-description"
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(base.description),
              }}
            />
          ) : (
            <div
              className="fr-text-mention--grey"
              data-testid="base-information-description"
            >
              <EmptyValue />
            </div>
          )}
        </>
      }
    />
  )
}

export default withTrpc(BaseEditionInformation)
