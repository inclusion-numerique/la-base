import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import type { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { metadataTitle } from '@app/web/app/metadataTitle'
import PrivateBox from '@app/web/components/PrivateBox'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import BaseHeader, {
  headerSkipLink,
} from '@app/web/features/base/components/BaseHeader'
import BaseMenu from '@app/web/features/base/components/BaseMenu'
import { prismaClient } from '@app/web/prismaClient'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { type PropsWithChildren } from 'react'

export const generateMetadata = async ({
  params,
}: BaseRouteParams): Promise<Metadata> => {
  const { slug } = await params

  const base = await prismaClient.base.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
      description: true,
    },
  })
  if (!base) {
    notFound()
  }

  return {
    title: metadataTitle(base.title),
    description: base.description || undefined,
  }
}
const BaseLayout = async ({
  params,
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  const { slug } = await params

  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  const canWrite = hasPermission('WriteBase')
  const canView = hasPermission('ReadBaseData')

  if (!canView) {
    return (
      <>
        <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
        <BaseHeader base={base} canWrite={false} user={user} />
        <main id={contentId}>
          <PrivateBox type="Base" />
        </main>
      </>
    )
  }
  return (
    <>
      <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
      <BaseHeader base={base} canWrite={canWrite} user={user} />
      <main id={contentId}>
        <BaseMenu base={base} />
        <div className="fr-container fr-container--medium fr-mb-16w">
          {children}
        </div>
      </main>
    </>
  )
}

export default BaseLayout
