'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import IconInSquare from '@app/web/components/IconInSquare'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { OpenResetLinkConfirmationModal } from '@app/web/features/shareableLink/components/OpenResetLinkConfirmationModal'
import ResetLinkConfirmationModal from '@app/web/features/shareableLink/components/ResetLinkConfirmationModal'
import type { BasePageData, BaseResource } from '@app/web/server/bases/getBase'
import type { Resource } from '@app/web/server/resources/getResource'
import {
  UpdateShareableLinkCommand,
  UpdateShareableLinkCommandValidation,
} from '@app/web/server/shareableLink/shareableLink'
import { trpc } from '@app/web/trpc'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './ShareLinkModal.module.css'

export const ShareLinkDynamicModal = createDynamicModal({
  isOpenedByDefault: false,
  id: 'share-link-modal',
  initialState: {
    type: null as 'base' | 'resource' | null,
    base: null as BasePageData | null,
    resource: null as Resource | BaseResource | null,
  },
})

const ShareLink = () => {
  const { type, base, resource } = ShareLinkDynamicModal.useState()
  const entity = base || resource
  const entityType = type

  const [shareLink, setShareLink] = useState(entity?.shareableLink)
  const form = useForm<UpdateShareableLinkCommand>({
    defaultValues: {
      enabled: !!entity?.shareableLink?.enabled,
      baseId: entityType === 'base' ? entity?.id : undefined,
      resourceId: entityType === 'resource' ? entity?.id : undefined,
    },
    resolver: zodResolver(UpdateShareableLinkCommandValidation),
  })
  const { control, handleSubmit, watch, reset } = form

  const shareableLinkMutation = trpc.shareableLink.shareLink.useMutation()

  const shareUrl = shareLink?.enabled
    ? getServerUrl(
        `/${entityType === 'base' ? 'bases' : 'ressources'}/${shareLink.id}`,
        { absolutePath: true },
      )
    : null

  const onSubmit = async (data: UpdateShareableLinkCommand) => {
    try {
      const result = await shareableLinkMutation.mutateAsync(data)
      setShareLink({ ...result, enabled: data.enabled })

      createToast({
        priority: 'success',
        message: data.enabled
          ? 'Lien de partage activé'
          : 'Lien de partage désactivé',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la modification du lien de partage',
      })
    }
  }

  const copyToClipboard = async () => {
    if (!shareUrl) return

    try {
      await navigator.clipboard.writeText(shareUrl)
      createToast({
        priority: 'success',
        message: 'Lien copié dans le presse-papiers',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la copie du lien',
      })
    }
  }

  const enabledValue = watch('enabled')
  const isSubmitting = shareableLinkMutation.isPending

  useEffect(() => {
    if (entity) {
      setShareLink(entity.shareableLink)
      reset({
        enabled: !!entity.shareableLink?.enabled,
        baseId: entityType === 'base' ? entity.id : undefined,
        resourceId: entityType === 'resource' ? entity.id : undefined,
      })
    }
  }, [entity, entityType, reset])

  // biome-ignore lint/correctness/useExhaustiveDependencies: dont need the onsubmit in the deps array
  useEffect(() => {
    if (!!entity && enabledValue !== !!shareLink?.enabled) {
      onSubmit({
        enabled: enabledValue,
        baseId: entityType === 'base' ? entity?.id : undefined,
        resourceId: entityType === 'resource' ? entity?.id : undefined,
      })
    }
  }, [enabledValue, shareLink, entityType, entity, entity?.id])

  if (!entity || !entityType) {
    return null
  }

  return (
    <>
      <ResetLinkConfirmationModal />
      <ShareLinkDynamicModal.Component
        size="medium"
        title={`Partager votre ${
          entityType === 'base' ? 'base' : 'ressource'
        } privée via un lien`}
        className={styles.modalContainer}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className={classNames(
              styles.shareToggle,
              'fr-mb-4w fr-px-3w fr-py-2w fr-border fr-border-radius--8 fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-4v',
            )}
          >
            <IconInSquare iconId="ri-link" size="medium-large" />
            <ToggleFormField
              classes={{ fieldsetElement: 'fr-mb-0' }}
              className="fr-mb-0"
              control={control}
              showCheckedHint={false}
              path="enabled"
              label="Lien de partage"
              hint={`Toute personne ayant le lien peut voir tous les contenus de votre ${
                entityType === 'base' ? 'base' : 'ressource'
              }.`}
              labelPosition="left"
              disabled={isSubmitting}
              checkedLabel="Activé"
              uncheckedLabel="Désactivé"
            />
          </div>

          <div className="fr-flex fr-direction-column fr-flex-gap-4v">
            <div className="fr-width-full">
              <Button
                priority="primary"
                className="fr-width-full fr-flex fr-justify-content-center"
                onClick={copyToClipboard}
                disabled={isSubmitting || !shareUrl}
                type="button"
              >
                Copier le lien
                <span className="ri-link fr-ml-1w" aria-hidden />
              </Button>
            </div>
            <div className="fr-width-full fr-flex fr-justify-content-center">
              <OpenResetLinkConfirmationModal
                shareableLinkId={shareLink?.id}
                entityType={entityType}
              />
            </div>
          </div>
        </form>
      </ShareLinkDynamicModal.Component>
    </>
  )
}

export default withTrpc(ShareLink)
