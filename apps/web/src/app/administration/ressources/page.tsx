import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchResource from '@app/web/app/administration/ressources/AdministrationSearchResource'
import { getResourcesListPageData } from '@app/web/app/administration/ressources/getResourcesListPageData'
import type { ResourcesDataTableSearchParams } from '@app/web/app/administration/ressources/ResourcesDataTable'
import ResourcesTable from '@app/web/app/administration/ressources/ResourcesTable'
import { numberToString } from '@app/web/utils/formatNumber'

const AdministrationRessourcesPage = async ({
  searchParams,
}: {
  searchParams: Promise<ResourcesDataTableSearchParams>
}) => {
  const listParams = await searchParams
  const data = await getResourcesListPageData({
    searchParams: listParams,
  })
  return (
    <>
      <AdministrationPageContainer>
        <AdministrationBreadcrumbs currentPage="Ressources" />
        <AdministrationTitle icon="ri-article-line">
          Ressources
        </AdministrationTitle>
        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher parmi les {numberToString(data.totalCount)} ressources
          </p>
          <AdministrationSearchResource searchParams={listParams} />
        </div>
      </AdministrationPageContainer>
      <AdministrationPageContainer size="full">
        <ResourcesTable
          data={data.searchResult}
          searchParams={listParams}
          baseHref="/administration/ressources"
        />
      </AdministrationPageContainer>
    </>
  )
}

export default AdministrationRessourcesPage
