import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import AdministrationSearchUtilisateur from '@app/web/app/administration/utilisateurs/AdministrationSearchUtilisateur'
import type { UtilisateursDataTableSearchParams } from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import UtilisateursTable from '@app/web/app/administration/utilisateurs/UtilisateursTable'
import { getUsersListPageData } from '@app/web/app/administration/utilisateurs/getUsersListPageData'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { numberToString } from '@app/web/utils/formatNumber'
import Button from '@codegouvfr/react-dsfr/Button'

export const metadata = {
  title: metadataTitle('Utilisateurs'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<UtilisateursDataTableSearchParams>
}) => {
  const listParams = await searchParams
  const data = await getUsersListPageData({
    searchParams: listParams,
  })

  return (
    <>
      <AdministrationPageContainer>
        <AdministrationBreadcrumbs currentPage="Utilisateurs" />
        <AdministrationTitle icon="fr-icon-team-line">
          Utilisateurs
        </AdministrationTitle>

        <div className="fr-mb-4v fr-flex fr-justify-content-end">
          <Button
            iconId="fr-icon-delete-bin-line"
            priority="tertiary"
            size="small"
            linkProps={{
              href: '/administration/utilisateurs/suppression-multiple',
            }}
          >
            Suppression multiple
          </Button>
        </div>
        <div className="fr-border-radius--8 fr-py-8v fr-px-10v fr-background-alt--blue-france  fr-mb-6v">
          <p className="fr-text--medium fr-mb-2v">
            Rechercher parmi les {numberToString(data.totalCount)} utilisateurs
          </p>
          <AdministrationSearchUtilisateur searchParams={listParams} />
        </div>
      </AdministrationPageContainer>
      <AdministrationPageContainer size="full">
        <UtilisateursTable
          data={data.searchResult}
          searchParams={listParams}
          baseHref="/administration/utilisateurs"
        />
      </AdministrationPageContainer>
    </>
  )
}

export default Page
