import React from 'react'
import LoadingSearchResults from '@app/web/components/Search/LoadingSearchResults'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const SearchLoading = () => <LoadingSearchResults searchParams={null} />

export default SearchLoading
