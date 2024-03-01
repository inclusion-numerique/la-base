'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import EditCard from '@app/web/components/EditCard'
import VisibilityField from '@app/web/components/VisibilityField'
import {
  UpdateBaseVisibilityCommand,
  UpdateBaseVisibilityCommandValidation,
} from '@app/web/server/bases/updateBase'
import { BasePageData } from '@app/web/server/bases/getBase'
import Visibility from '@app/web/components/Visibility'

const {
  Component: PrivateModal,
  open: openPrivateModal,
  close: closePrivateModal,
} = createModal({
  id: 'base-private-visibility',
  isOpenedByDefault: false,
})

const visibilityTexts = {
  publicTitle: 'Base publique',
  privateTitle: 'Base privée',
  publicHint:
    'Tout le monde peut vous suivre et visiter votre base pour y retrouver les contenus publics.',
  privateHint:
    'Les contenus & informations de votre base sont masqués aux visiteurs.',
}

const BaseVisibilityForm = ({
  base,
  className,
}: {
  base: BasePageData
  className?: string
}) => {
  const router = useRouter()
  const [visibility, setVisibility] = useState<UpdateBaseVisibilityCommand>({
    isPublic: base.isPublic,
  })
  const form = useForm<UpdateBaseVisibilityCommand>({
    resolver: zodResolver(UpdateBaseVisibilityCommandValidation),
    defaultValues: {
      isPublic: base.isPublic,
    },
  })
  const mutate = trpc.base.mutate.useMutation()
  const hasPublicResources = base.resources.some(
    (resource) => resource.isPublic,
  )

  return (
    <>
      {hasPublicResources && (
        <PrivateModal
          title={
            <>
              <span className="fr-icon-arrow-right-line" /> Rendre privée ma
              base
            </>
          }
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              disabled: mutate.isPending,
              type: 'button',
            },
            {
              title: 'Continuer',
              children: 'Continuer',
              type: 'button',
              disabled: mutate.isPending,
              nativeButtonProps: {
                'data-testid': 'visibility-modal-continue-button',
              },
              onClick: async () => {
                await mutate.mutateAsync({ id: base.id, data: visibility })
                router.refresh()
                closePrivateModal()
              },
            },
          ]}
        >
          Votre base et l’ensemble des ressources et collections publiques lui
          appartenant seront également privés et ne seront plus visibles du
          public, mis à part des éventuels contributeurs invités sur vos
          ressources.
        </PrivateModal>
      )}
      <EditCard
        id="visibilite"
        noRefresh
        mutation={async (data) => {
          if (data.isPublic || !hasPublicResources) {
            await mutate.mutateAsync({ id: base.id, data })
            router.refresh()
            createToast({
              priority: 'success',
              message: (
                <>
                  La visibilité de la base <strong>{base.title}</strong> a bien
                  été modifiée
                </>
              ),
            })
          } else {
            setVisibility(data)
            openPrivateModal()
          }
        }}
        className={className}
        title="Visibilité de la base"
        description="Choisissez la visibilité de votre base."
        form={form}
        edition={
          <VisibilityField
            model="base"
            path="isPublic"
            control={form.control}
            {...visibilityTexts}
          />
        }
        view={
          <Visibility isPublic={base.isPublic ?? false} {...visibilityTexts} />
        }
      />
    </>
  )
}

export default withTrpc(BaseVisibilityForm)
