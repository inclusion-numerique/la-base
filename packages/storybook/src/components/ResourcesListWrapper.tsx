import { PropsWithChildren } from 'react'

/**
 * Resources list (cards) are always in a context of a max-width container.
 */
export const ResourcesListWrapper = ({ children }: PropsWithChildren) => (
  <div
    style={{
      maxWidth: 792 + 32,
      padding: 16,
      margin: '0 auto',
    }}
  >
    {children}
  </div>
)
