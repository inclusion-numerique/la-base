'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const RouteChangeFocusHandler = () => {
  const pathname = usePathname()
  const isFirstRender = useRef(true)

  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed pathname
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    document.body.focus()
  }, [pathname])

  return null
}

export default RouteChangeFocusHandler
