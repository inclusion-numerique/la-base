import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationInfoCard from '@app/web/app/administration/AdministrationInfoCard'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { metadataTitle } from '@app/web/app/metadataTitle'
import UserMultipleDeletionForm from './UserMultipleDeletionForm'

export const metadata = {
  title: metadataTitle('Utilisateurs - Suppression multiple'),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async () => {
  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs
        currentPage="Suppression multiple"
        parents={[
          {
            label: 'Utilisateurs',
            linkProps: { href: '/administration/utilisateurs' },
          },
        ]}
      />
      <AdministrationTitle icon="fr-icon-user-line">
        Suppression multiple
      </AdministrationTitle>

      <AdministrationInfoCard title="Liste des utilisateurs à supprimer">
        <UserMultipleDeletionForm />
      </AdministrationInfoCard>
    </AdministrationPageContainer>
  )
}

export default Page
