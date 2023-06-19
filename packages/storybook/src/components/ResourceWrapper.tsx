import React, { PropsWithChildren } from 'react'

/**
 * Resources and resource editor are always in a context of a max-width container.
 */
export const ResourceWrapper = ({ children }: PropsWithChildren) => (
  <div
    style={{
      maxWidth: 588 + 32,
      padding: 16,
      margin: '0 auto',
    }}
  >
    {children}
  </div>
)
