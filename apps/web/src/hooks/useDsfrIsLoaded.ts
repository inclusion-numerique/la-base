import { isBrowser } from '@app/web/utils/isBrowser'
import { useState } from 'react'

let observer: MutationObserver

export const useDsfrIsLoaded = () => {
  const [loaded, setLoaded] = useState(
    isBrowser ? document.documentElement.dataset.frJs === 'true' : false,
  )
  if (isBrowser && !observer && !loaded) {
    observer = new MutationObserver((records) => {
      // There should be only one record
      const htmlElement = records.pop()?.target as HTMLElement
      if (!htmlElement) {
        return
      }
      setLoaded(htmlElement.dataset.frJs === 'true')
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-fr-js'],
    })
  }

  return loaded
}
