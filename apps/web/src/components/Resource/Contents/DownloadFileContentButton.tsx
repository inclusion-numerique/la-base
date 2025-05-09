'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useFileDownload } from '@app/web/hooks/useFileDownload'
import Button, { type ButtonProps } from '@codegouvfr/react-dsfr/Button'
import * as Sentry from '@sentry/nextjs'

const DownloadFileContentButton = ({
  fileKey,
  filename,
  ...buttonProps
}: {
  className?: string
  fileKey: string
  filename: string
} & Omit<ButtonProps, 'onClick' | 'disabled'>) => {
  const fileDownload = useFileDownload()

  const onClick = () => {
    fileDownload.download(fileKey, filename).catch((error) => {
      Sentry.captureException(error)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors du téléchargement du fichier',
      })
    })
  }

  const disabled = fileDownload.isLoading

  return (
    <Button
      type="button"
      onClick={onClick}
      disabled={disabled}
      {...(buttonProps as ButtonProps.WithIcon)}
    />
  )
}

export default withTrpc(DownloadFileContentButton)
