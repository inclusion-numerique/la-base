import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { metadataTitle } from '@app/web/app/metadataTitle'
import PrivateBox from '@app/web/components/PrivateBox'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import BaseHeader, {
  headerSkipLink,
} from '@app/web/features/base/components/BaseHeader'
import BaseMenu from '@app/web/features/base/components/BaseMenu'
import BaseJoinRequestFormModal from '@app/web/features/base/join-requests/components/BaseJoinRequestFormModal'

import { isShareToken } from '@app/web/features/base/share/utils/isShareToken'
import { resolveShareableLinkToken } from '@app/web/features/shareableLink/db/resolveShareableLinkToken'
import { prismaClient } from '@app/web/prismaClient'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type PropsWithChildren } from 'react'

export const generateMetadata = async ({
  params,
}: BaseRouteParams): Promise<Metadata> => {
  const { slug } = await params

  // we dont want to index the shareable link token
  if (isShareToken(slug)) {
    const tokenResult = await resolveShareableLinkToken(slug, 'base')
    if (!tokenResult) {
      notFound()
    }

    const base = await prismaClient.base.findUnique({
      where: { slug: tokenResult.base?.slug },
      select: { title: true, description: true },
    })

    if (!base) {
      notFound()
    }

    return {
      title: metadataTitle(base.title),
      description: base.description || undefined,
      robots: 'noindex, nofollow',
    }
  }

  const base = await prismaClient.base.findUnique({
    where: {
      slug: slug,
    },
    select: {
      title: true,
      description: true,
      isPublic: true,
    },
  })
  if (!base) {
    notFound()
  }

  return {
    title: metadataTitle(base.title),
    description: base.description || undefined,
    robots: base.isPublic ? undefined : 'noindex, nofollow',
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
        <BaseHeader base={base} canWrite={false} user={user} />x
        <main id={contentId}>
          <PrivateBox type="Base" />
        </main>
        <BaseJoinRequestFormModal user={user} base={base} />
      </>
    )
  }

  return (
    <>
      <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
      <BaseHeader base={base} canWrite={canWrite} user={user} />
      <main id={contentId} className="fr-overflow-hidden">
        <BaseMenu base={base} slug={slug} />
        {children}
      </main>
      <BaseJoinRequestFormModal user={user} base={base} />
    </>
  )
}

export default BaseLayout
