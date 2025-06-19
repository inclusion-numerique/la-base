import { isBrowser } from '@app/web/utils/isBrowser'
import { useEffect, useRef, useState } from 'react'

/**
 * DSFR Modal need to be bound by dsfr js lib before being used.
 * This hooks allow to wait for the binding on first load before rendering.
 */
export const useDsfrModalIsBound = (
  dialogId: string,
  onBound?: (element: HTMLElement) => void,
) => {
  const [bound, setBound] = useState(
    isBrowser ? !!document.getElementById(dialogId)?.dataset.frJsModal : false,
  )

  const observerRef = useRef<MutationObserver>(null)

  useEffect(() => {
    if (isBrowser && !observerRef.current && !bound) {
      // Do nothing if already bound

      const element = document.getElementById(dialogId)

      // No-op if element is not in the dom
      if (element) {
        // Bind if state is already ok
        if (element.dataset.frJsModal === 'true') {
          setBound(true)
          onBound?.(element)
        } else {
          const observer = new MutationObserver((records) => {
            // There should be only one record
            const dialog = records.pop()?.target as
              | HTMLDialogElement
              | undefined

            if (!dialog) {
              setBound(false)
              return
            }
            // XXX There is a regression in dsfr, it worked without setTimeout but now, even with the bound dsfr-js attribute
            // The open() function does not work immediately and we have to wait a bit
            setTimeout(() => {
              setBound(dialog.dataset.frJsModal === 'true')
            }, 200)
          })
          observer.observe(element, {
            attributes: true,
            attributeFilter: ['data-fr-js-modal'],
          })

          observerRef.current = observer
        }
      }
    }

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = null
    }
  }, [bound, dialogId, onBound])

  return bound
}
