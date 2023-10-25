import { useEffect, useRef } from 'react'
import { useDsfrModalIsBound } from '@app/web/hooks/useDsfrModalIsBound'

export type UseModalVisibilityOptions =
  | {
      onOpened?: () => void
      onClosed: () => void
    }
  | {
      onOpened: () => void
      onClosed?: () => void
    }
  | {
      onOpened: () => void
      onClosed: () => void
    }

/**
 * Allow to execute callbacks AFTER modal close/open animation is finished
 */
export const useModalVisibility = (
  modalId: string,
  { onOpened, onClosed }: UseModalVisibilityOptions,
) => {
  const modalIsBound = useDsfrModalIsBound(modalId)

  const modalRef = useRef<HTMLDialogElement>()
  if (modalIsBound && !modalRef.current) {
    modalRef.current =
      document.body.querySelector<HTMLDialogElement>(
        `dialog[id="${modalId}"]`,
      ) ?? undefined
  }

  const listenedModal = useRef<HTMLDialogElement | undefined>(modalRef.current)
  const listener = useRef<() => void>()

  useEffect(() => {
    // Disable observer on previous element if element change
    if (listener.current) {
      listenedModal.current?.removeEventListener(
        'transitionend',
        listener.current,
      )
    }

    const modal = modalRef.current

    if (modal) {
      const listenerCallback = () => {
        if (listenedModal.current !== modal) {
          return
        }

        const isModalOpen = modal.classList.contains('fr-modal--opened')
        if (isModalOpen && onOpened) {
          onOpened()
        } else if (!isModalOpen && onClosed) {
          onClosed()
        }
      }
      modal.addEventListener('transitionend', listenerCallback)

      listenedModal.current = modal
      listener.current = listenerCallback
    }

    return () => {
      if (listener.current) {
        listenedModal.current?.removeEventListener(
          'transitionend',
          listener.current,
        )
      }
    }
  }, [modalIsBound, onOpened, onClosed])
}
