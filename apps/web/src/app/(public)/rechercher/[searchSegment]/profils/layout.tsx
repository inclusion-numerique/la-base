import React, { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher des profils'),
}

const ProfilesSearchLayout = ({
  children,
  params,
}: PropsWithChildren<{
  params: {
    searchSegment: string
  }
}>) => {
  const searchParams = searchParamsFromSegment(params.searchSegment)

  return (
    <>
      <SearchMenu activeTab="profils" searchParams={searchParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        {children}
      </div>
    </>
  )
}

export default ProfilesSearchLayout
