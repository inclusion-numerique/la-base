'use client'

import { useEffect, useRef } from 'react'

/**
 * Client component that trigger registerResourceView
 */
const RegisterResourceView = ({ resourceSlug }: { resourceSlug: string }) => {
  // Useful for dev mode where useEffect is called twice
  const registered = useRef<string>(null)
  useEffect(() => {
    if (registered.current === resourceSlug) {
      return
    }
    registered.current = resourceSlug

    // We don't care if the request fails, we'll get a Sentry error from api route handler
    // Use simple fetch instead of trpc for lightweight request on this particular feature
    fetch(`/ressources/${resourceSlug}/register-view`, { method: 'POST' })
  }, [resourceSlug])

  return null
}

export default RegisterResourceView
