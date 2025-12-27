'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { createToast } from '@app/ui/toast/createToast'
import IconInSquare from '@app/web/components/IconInSquare'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  UpdateBaseShareableLinkCommand,
  UpdateBaseShareableLinkCommandValidation,
} from '@app/web/server/bases/baseShareableLink'
import { BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './BaseShareModal.module.css'

export const BaseShareModal = createModal({
  isOpenedByDefault: false,
  id: 'base-share-modal',
})

const BaseShareLink = ({ base }: { base: BasePageData }) => {
  const [shareLink, setShareLink] = useState(base.shareableLink)
  const form = useForm<UpdateBaseShareableLinkCommand>({
    defaultValues: {
      enabled: !!base.shareableLink?.enabled,
      baseId: base.id,
    },
    resolver: zodResolver(UpdateBaseShareableLinkCommandValidation),
  })
  const { control, handleSubmit, watch } = form

  const shareableLinkMutation = trpc.base.shareLink.useMutation()

  const shareUrl = shareLink?.enabled
    ? getServerUrl(`/bases/${shareLink.id}`, { absolutePath: true })
    : null

  const onSubmit = async (data: UpdateBaseShareableLinkCommand) => {
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

  const resetLink = async () => {
    try {
      // Disable and re-enable to generate a new link
      await shareableLinkMutation.mutateAsync({
        baseId: base.id,
        enabled: false,
      })
      const result = await shareableLinkMutation.mutateAsync({
        baseId: base.id,
        enabled: true,
      })
      setShareLink({ ...result, enabled: true })

      createToast({
        priority: 'success',
        message: 'Nouveau lien de partage généré',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la réinitialisation du lien',
      })
    }
  }

  const enabledValue = watch('enabled')
  const isSubmitting = shareableLinkMutation.isPending

  // biome-ignore lint/correctness/useExhaustiveDependencies: dont need the onsubmit in the deps array
  useEffect(() => {
    if (enabledValue !== !!shareLink?.enabled) {
      form.handleSubmit(onSubmit)()
    }
  }, [enabledValue, form, shareLink])

  return (
    <>
      <Button
        disabled={isSubmitting}
        type="button"
        priority="secondary"
        onClick={BaseShareModal.open}
      >
        <span className="ri-link fr-mr-1w" aria-hidden />
        Partager
      </Button>
      <BaseShareModal.Component
        size="medium"
        title="Partager votre base privée via un lien"
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
              hint="Toute personne ayant le lien peut voir tous les contenus de votre base."
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
              <Button
                className="fr-link fr-text--underline fr-flex"
                priority="tertiary no outline"
                onClick={resetLink}
                disabled={isSubmitting}
                type="button"
              >
                Réinitialiser le lien
              </Button>
            </div>
          </div>
        </form>
      </BaseShareModal.Component>
    </>
  )
}

export default withTrpc(BaseShareLink)
