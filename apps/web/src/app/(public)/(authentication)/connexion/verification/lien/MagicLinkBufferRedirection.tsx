'use client'

import { useEffect } from 'react'

const MagicLinkBufferRedirection = ({ url }: { url: string }) => {
  useEffect(() => {
    window.location.href = url
  }, [url])

  return null
}

export default MagicLinkBufferRedirection
