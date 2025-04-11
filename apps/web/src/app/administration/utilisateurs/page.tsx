import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchUtilisateur'
import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import UtilisateursTable from '@app/web/app/administration/utilisateurs/UtilisateursTable'
import { getUsersListPageData } from '@app/web/app/administration/utilisateurs/getUsersListPageData'
import { metadataTitle } from '@app/web/app/metadataTitle'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import { numberToString } from '@app/web/utils/formatNumber'

export const metadata = {
  title: metadataTitle('Utilisateurs'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams = {},
}: {
  searchParams?: UtilisateursDataTableSearchParams
}) => {
  const data = await getUsersListPageData({
    searchParams,
  })

  return (
    <>
      <AdministrationPageContainer>
        <AdministrationBreadcrumbs currentPage="Utilisateurs" />
        <AdministrationTitle icon="fr-icon-team-line">
          Utilisateurs
        </AdministrationTitle>

        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france  fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher parmi les {numberToString(data.totalCount)} utilisateurs
          </p>
          <AdministrationSearchUtilisateur searchParams={searchParams} />
        </div>
      </AdministrationPageContainer>
      <AdministrationPageContainer size="full">
        <UtilisateursTable
          data={data.searchResult}
          searchParams={searchParams}
          baseHref="/administration/utilisateurs"
        />
      </AdministrationPageContainer>
    </>
  )
}

export default Page
