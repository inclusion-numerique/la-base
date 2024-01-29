import React, { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PrivateBox from '@app/web/components/PrivateBox'
import { BaseRouteParams } from '@app/web/app/(public)/bases/[slug]/baseRouteParams'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import BaseHeader from '@app/web/components/Base/BaseHeader'
import BaseMenu from '@app/web/components/Base/BaseMenu'
import { prismaClient } from '@app/web/prismaClient'
import { metadataTitle } from '@app/web/app/metadataTitle'

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
  const { user, authorizations } = await getBasePageContext(params.slug)

  if (!authorizations.authorized) {
    return (
      <>
        <BaseHeader
          base={authorizations.base}
          isMember={authorizations.isMember}
          user={user}
        />
        <PrivateBox type="Base" />
      </>
    )
  }
  return (
    <>
      <BaseHeader
        base={authorizations.base}
        isMember={authorizations.isMember}
        user={user}
      />
      <BaseMenu base={authorizations.base} />
      <div className="fr-container fr-container--medium fr-mb-50v">
        {children}
      </div>
    </>
  )
}

export default BaseLayout
