import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchBase from '@app/web/app/administration/bases/AdministrationSearchBase'
import { BasesDataTableSearchParams } from '@app/web/app/administration/bases/BasesDataTable'
import BasesTable from '@app/web/app/administration/bases/BasesTable'
import { getBasesListPageData } from '@app/web/app/administration/bases/getBasesListPageData'
import { numberToString } from '@app/web/utils/formatNumber'

const AdministrationBasesPage = async ({
  searchParams = {},
}: {
  searchParams?: BasesDataTableSearchParams
}) => {
  const data = await getBasesListPageData({
    searchParams,
  })

  return (
    <>
      <AdministrationPageContainer>
        <AdministrationBreadcrumbs currentPage="Bases" />
        <AdministrationTitle icon="ri-stack-line">Bases</AdministrationTitle>
        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher parmi les {numberToString(data.totalCount)} bases
          </p>
          <AdministrationSearchBase searchParams={searchParams} />
        </div>
      </AdministrationPageContainer>
      <AdministrationPageContainer size="full">
        <BasesTable
          data={data.searchResult}
          searchParams={searchParams}
          baseHref="/administration/bases"
        />
      </AdministrationPageContainer>
    </>
  )
}

export default AdministrationBasesPage
