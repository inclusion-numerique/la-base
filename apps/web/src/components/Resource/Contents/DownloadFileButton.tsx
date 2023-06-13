'use client'

import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { useFileDownload } from '@app/web/hooks/useFileDownload'

const DownloadFileButton = ({
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
      console.error('Error downloading file', error)
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

export default withTrpc(DownloadFileButton)
