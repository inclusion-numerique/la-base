import { useEffect, useRef } from 'react'

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
  modal: HTMLDialogElement | undefined,
  { onOpened, onClosed }: UseModalVisibilityOptions,
) => {
  const listenedModal = useRef<HTMLDialogElement | undefined>(modal)
  const listener = useRef<() => void>()

  useEffect(() => {
    // Disable observer on previous element if element change
    if (listener.current) {
      listenedModal.current?.removeEventListener(
        'transitionend',
        listener.current,
      )
    }

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
  }, [modal, onOpened, onClosed])
}
