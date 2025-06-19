import type { ModalProps } from '@codegouvfr/react-dsfr/Modal'
import type { JSX } from 'react'

export type CreateModalReturn = {
  buttonProps: {
    /** Only for analytics, feel free to overwrite */
    id: string
    'aria-controls': string
    'data-fr-opened': boolean
  }
  Component: (props: ModalProps) => JSX.Element
  close: () => void
  open: () => void
  isOpenedByDefault: boolean
  id: string
}
