import { useEffect, useRef, useState } from 'react'
import { isBrowser } from '@app/web/utils/isBrowser'

/**
 * DSFR Modal need to be bound by dsfr js lib before being used.
 * This hooks allow to wait for the binding on first load before rendering.
 */
export const useDsfrModalIsBound = (dialogId: string) => {
  const [bound, setBound] = useState(
    // eslint-disable-next-line unicorn/prefer-query-selector
    isBrowser ? !!document.getElementById(dialogId)?.dataset.frJsModal : false,
  )

  const observerRef = useRef<MutationObserver>()

  useEffect(() => {
    if (isBrowser && !observerRef.current && !bound) {
      // Do nothing if already bound

      // eslint-disable-next-line unicorn/prefer-query-selector
      const element = document.getElementById(dialogId)

      if (element) {
        // Do nothing if element is not in the dom

        const observer = new MutationObserver((records) => {
          // There should be only one record
          const dialog = records.pop()?.target as HTMLDialogElement | undefined

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

    return () => {
      observerRef.current?.disconnect()
      observerRef.current = undefined
    }
  }, [bound, dialogId, setBound])

  return bound
}
