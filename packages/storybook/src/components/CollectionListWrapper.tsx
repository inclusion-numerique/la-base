import { PropsWithChildren } from 'react'

/**
 * Collection cards are always in a context of a max-width container.
 */
export const CollectionListWrapper = ({ children }: PropsWithChildren) => (
  <div
    style={{
      maxWidth: 384 + 32,
      padding: 16,
      margin: '0 auto',
    }}
  >
    {children}
  </div>
)
