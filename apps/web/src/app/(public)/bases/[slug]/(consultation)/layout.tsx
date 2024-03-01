import React, { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PrivateBox from '@app/web/components/PrivateBox'
import { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import BaseHeader, { headerSkipLink } from '@app/web/components/Base/BaseHeader'
import BaseMenu from '@app/web/components/Base/BaseMenu'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const generateMetadata = async ({
  params: { slug },
}: BaseRouteParams): Promise<Metadata> => {
  const base = await prismaClient.base.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
    },
  })
  if (!base) {
    notFound()
  }

  return {
    title: metadataTitle(base.title),
  }
}
const BaseLayout = async ({
  params,
  children,
}: PropsWithChildren<BaseRouteParams>) => {
  const {
    user,
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(params.slug)

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
        <div className="fr-container fr-container--medium fr-mb-50v">
          {children}
        </div>
      </main>
    </>
  )
}

export default BaseLayout
