import CategoryPage, {
  type CategoryPageUrlParams,
} from '@app/web/app/(public)/(categories)/_components/CategoryPage'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: metadataTitle(
    'Rechercher des ressources sur le thème des communs et de la souveraineté',
  ),
}

const CommunsEtSouverainetePage = async ({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: {
  params: Promise<{
    searchSegment: string
  }>
  searchParams: Promise<CategoryPageUrlParams>
}) => {
  const params = await paramsPromise
  const searchParams = await searchParamsPromise
  return (
    <CategoryPage
      params={params}
      searchParams={searchParams}
      category="Communs & souveraineté"
    />
  )
}

export default CommunsEtSouverainetePage
