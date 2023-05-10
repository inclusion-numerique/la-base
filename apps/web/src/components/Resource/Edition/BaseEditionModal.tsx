import { createModal } from '@codegouvfr/react-dsfr/Modal'

export const { BaseModal, openBaseModal, baseModalNativeButtonProps } =
  createModal({
    name: 'base',
    isOpenedByDefault: false,
  })
