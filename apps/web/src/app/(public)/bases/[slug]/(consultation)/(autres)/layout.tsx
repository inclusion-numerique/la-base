import type { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { type PropsWithChildren } from 'react'

const BaseOtherPageLayout = async ({
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  return (
    <div className="fr-container fr-container--medium fr-mb-24w">
      {children}
    </div>
  )
}

export default BaseOtherPageLayout
