import { metadataTitle } from '@app/web/app/metadataTitle'
import SearchMenu from '@app/web/components/Search/SearchMenu'
import { searchParamsFromSegment } from '@app/web/server/search/searchQueryParams'
import type { Metadata } from 'next'
import { type PropsWithChildren } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Rechercher des profils'),
}

const ProfilesSearchLayout = async ({
  params,
  children,
}: PropsWithChildren<{
  params: Promise<{
    searchSegment: string
  }>
}>) => {
  const { searchSegment } = await params

  const searchExecutionParams = searchParamsFromSegment(searchSegment)

  return (
    <>
      <SearchMenu activeTab="profils" searchParams={searchExecutionParams} />
      <div className="fr-container fr-container--medium fr-mb-30v">
        {children}
      </div>
    </>
  )
}

export default ProfilesSearchLayout
