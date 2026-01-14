'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { createToast } from '@app/ui/toast/createToast'
import Card from '@app/web/components/Card'
import IconInSquare from '@app/web/components/IconInSquare'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { OpenResetLinkConfirmationModal } from '@app/web/features/shareableLink/components/OpenResetLinkConfirmationModal'
import ResetLinkConfirmationModal from '@app/web/features/shareableLink/components/ResetLinkConfirmationModal'
import type { BasePageData } from '@app/web/server/bases/getBase'
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

const BaseEditionShareableLink = ({ base }: { base: BasePageData }) => {
  const [shareLink, setShareLink] = useState(base.shareableLink)

  const form = useForm<UpdateShareableLinkCommand>({
    defaultValues: {
      enabled: !!base.shareableLink?.enabled,
      baseId: base.id,
    },
    resolver: zodResolver(UpdateShareableLinkCommandValidation),
  })
  const { control, watch } = form

  const shareableLinkMutation = trpc.shareableLink.shareLink.useMutation()

  const shareUrl = shareLink?.enabled
    ? getServerUrl(`/bases/${shareLink.id}`, { absolutePath: true })
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

  // biome-ignore lint/correctness/useExhaustiveDependencies: onSubmit not wanted in deps array
  useEffect(() => {
    if (enabledValue !== !!shareLink?.enabled) {
      onSubmit({
        enabled: enabledValue,
        baseId: base?.id,
      })
    }
  }, [enabledValue, shareLink, base])

  return (
    <>
      <ResetLinkConfirmationModal />
      <Card
        noBorder
        className="fr-mt-3w fr-border-radius--8 fr-border"
        id="partage"
        title={
          <h2 className="fr-mb-3v fr-h5 fr-text-label--blue-france">
            Partage de la base via un lien
          </h2>
        }
        titleAs="div"
        contentSeparator
      >
        <div className="fr-flex fr-direction-column">
          <div
            className={classNames(
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
              <OpenResetLinkConfirmationModal
                shareableLinkId={shareLink?.id}
                entityType="base"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default withTrpc(BaseEditionShareableLink)
