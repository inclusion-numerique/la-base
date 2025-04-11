'use client'

import { createToast } from '@app/ui/toast/createToast'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'

const CopyToClipboardButton = ({
  value,
  title = 'Copier',
  ...buttonProps
}: Omit<ButtonProps.Common, 'iconId' | 'title'> & {
  value: string
  title?: string
}) => (
  <Button
    size="small"
    onClick={() => {
      navigator.clipboard.writeText(value)
      createToast({
        message: 'Copié dans le presse-papier',
        priority: 'info',
        duration: 3000,
      })
    }}
    title={title}
    priority="tertiary"
    iconId="ri-file-copy-line"
    {...buttonProps}
  />
)

export default CopyToClipboardButton
