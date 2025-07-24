import CategoryPage, {
  type CategoryPageUrlParams,
} from '@app/web/app/(public)/(categories)/_components/CategoryPage'

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
