import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchNewsFeed from '@app/web/app/administration/fonctionnalites/fil-d-actualite/AdministrationSearchNewsFeed'
import { getNewsFeedListPageData } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/getNewsFeedListPageData'
import type { NewsFeedDataTableSearchParams } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedDataTable'
import NewsFeedStats from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedStats'
import NewsFeedTable from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedTable'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { numberToString } from '@app/web/utils/formatNumber'

export const metadata = {
  title: metadataTitle("Fil d'actualité"),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<NewsFeedDataTableSearchParams>
}) => {
  const listParams = await searchParams
  const data = await getNewsFeedListPageData({
    searchParams: listParams,
  })

  return (
    <>
      <AdministrationPageContainer>
        <AdministrationBreadcrumbs
          currentPage="Fil d'actualité"
          parents={[{ label: 'Fonctionnalités', linkProps: { href: '#' } }]}
        />
        <AdministrationTitle icon="ri-newspaper-line">
          Fil d'actualité
        </AdministrationTitle>

        <NewsFeedStats data={data} />

        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher parmi les {numberToString(data.totalCount)} utilisateurs
            du fil d'actualité
          </p>
          <AdministrationSearchNewsFeed searchParams={listParams} />
        </div>
      </AdministrationPageContainer>
      <AdministrationPageContainer size="full">
        <NewsFeedTable
          data={data.searchResult}
          searchParams={listParams}
          baseHref="/administration/fonctionnalites/fil-d-actualite"
        />
      </AdministrationPageContainer>
    </>
  )
}

export default Page
