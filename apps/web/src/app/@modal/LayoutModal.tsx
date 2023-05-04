import { PropsWithChildren } from 'react'
import CloseModalButton from '@app/web/app/@modal/CloseModalButton'

const LayoutModal = ({ children }: PropsWithChildren) => (
  <dialog
    id="layout-modal"
    aria-labelledby="modal-title"
    className="fr-modal fr-modal--opened"
    aria-modal="true"
    open
  >
    <div className="fr-container fr-container--fluid fr-container-md">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
          <div className="fr-modal__body">
            <div className="fr-modal__header">
              <CloseModalButton />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  </dialog>
)
export default LayoutModal
