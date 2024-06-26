import React from 'react'
import CategoryPage, {
  CategoryPageUrlParams,
} from '@app/web/app/(public)/(categories)/_components/CategoryPage'

const CultureNumeriquePage = ({
  params,
  searchParams,
}: {
  params: {
    searchSegment: string
  }
  searchParams: CategoryPageUrlParams
}) => (
  <CategoryPage
    params={params}
    searchParams={searchParams}
    category="Culture numérique"
  />
)

export default CultureNumeriquePage
