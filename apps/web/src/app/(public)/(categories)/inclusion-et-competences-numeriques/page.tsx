import React from 'react'
import CategoryPage, {
  CategoryPageUrlParams,
} from '@app/web/app/(public)/(categories)/_components/CategoryPage'

const InclusionEtCompetencesNumeriquesPage = ({
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
    category="Inclusion & compétences numériques"
  />
)

export default InclusionEtCompetencesNumeriquesPage
