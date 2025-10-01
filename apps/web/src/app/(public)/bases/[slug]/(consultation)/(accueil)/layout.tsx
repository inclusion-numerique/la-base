import type { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { type PropsWithChildren } from 'react'

const BaseHomePageLayout = async ({
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  return (
    <div className="fr-container fr-container--standard fr-mb-24w">
      {children}
    </div>
  )
}

export default BaseHomePageLayout
