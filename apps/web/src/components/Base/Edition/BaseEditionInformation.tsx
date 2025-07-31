'use client'

import EmptyValue from '@app/ui/components/EmptyValue'
import MaybeEmptyValue from '@app/ui/components/MaybeEmptyValue'
import { createToast } from '@app/ui/toast/createToast'
import EditCard from '@app/web/components/EditCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BasePageData } from '@app/web/server/bases/getBase'
import {
  type UpdateBaseInformationsCommand,
  UpdateBaseInformationsCommandValidation,
} from '@app/web/server/bases/updateBase'
import { trpc } from '@app/web/trpc'
import { getDepartmentName } from '@app/web/utils/departments'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
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
  const router = useRouter()

  return (
    <EditCard
      noBorder
      id="informations"
      mutation={async (data) => {
        const result = await mutate.mutateAsync({ id: base.id, data })
        router.push(`/bases/${result.slug}/editer`)
        router.refresh()
        createToast({
          priority: 'success',
          message: <>Les informations ont bien été enregistrées</>,
        })
      }}
      noRefresh
      form={form}
      title="Informations de la base"
      titleAs="h2"
      edition={<BaseInformationsEdition form={form} />}
      view={
        <>
          <div className="fr-text-mention--grey">Nom de la base</div>
          <div
            className="fr-text-label--grey fr-text--medium fr-mb-2w"
            data-testid="base-information-title"
          >
            {base.title}
          </div>
          <>
            <div className="fr-text-mention--grey">Département</div>
            <div
              className="fr-text-label--grey fr-text--medium fr-mb-2w"
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
              className="fr-text-label--grey fr-text--medium"
              data-testid="base-information-description"
              dangerouslySetInnerHTML={{
                __html: base.description,
              }}
            />
          ) : (
            <div
              className="fr-text-label--grey"
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
