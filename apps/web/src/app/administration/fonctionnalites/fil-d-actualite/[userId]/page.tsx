import AdministrationBreadcrumbs from '@app/web/app/administration/AdministrationBreadcrumbs'
import AdministrationPageContainer from '@app/web/app/administration/AdministrationPageContainer'
import AdministrationTitle from '@app/web/app/administration/AdministrationTitle'
import { getNewsFeedDetailPageData } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/[userId]/getNewsFeedDetailPageData'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { professionalSectorsLabels } from '@app/web/themes/professionalSectors'
import { themeLabels } from '@app/web/themes/themes'
import { dateAsDayAndTime } from '@app/web/utils/dateAsDayAndTime'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { notFound } from 'next/navigation'

export const metadata = {
  title: metadataTitle("Fil d'actualité - Détail"),
}
export const dynamic = 'force-dynamic'
export const revalidate = 0

const Page = async ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = await params
  const data = await getNewsFeedDetailPageData(userId)

  if (!data) {
    notFound()
  }

  return (
    <AdministrationPageContainer>
      <AdministrationBreadcrumbs
        currentPage={data.user.name ?? data.user.email}
        parents={[
          { label: 'Fonctionnalités', linkProps: { href: '#' } },
          {
            label: "Fil d'actualité",
            linkProps: {
              href: '/administration/fonctionnalites/fil-d-actualite',
            },
          },
        ]}
      />
      <AdministrationTitle icon="ri-newspaper-line">
        {data.user.name ?? data.user.email}
      </AdministrationTitle>

      <div className="fr-mb-4v">
        <Button
          size="small"
          priority="secondary"
          linkProps={{
            href: `/administration/utilisateurs/${data.user.id}`,
          }}
          iconId="fr-icon-arrow-right-line"
          iconPosition="right"
        >
          Voir la fiche utilisateur
        </Button>
      </div>

      <div className="fr-border-radius--8 fr-border fr-p-6v fr-mb-6v">
        <h2 className="fr-h5 fr-mb-4v">Informations</h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">Nom</p>
            <p className="fr-mb-3v">{data.user.name ?? '-'}</p>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">Email</p>
            <p className="fr-mb-3v">{data.user.email}</p>
          </div>
        </div>
      </div>

      <div className="fr-border-radius--8 fr-border fr-p-6v fr-mb-6v">
        <h2 className="fr-h5 fr-mb-4v">Préférences du fil</h2>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">
              Newsletter mensuelle
            </p>
            <div className="fr-mb-3v">
              <Badge
                severity={data.monthlyNewsletter ? 'success' : 'warning'}
                small
              >
                {data.monthlyNewsletter ? 'Oui' : 'Non'}
              </Badge>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">
              Onboarding complété
            </p>
            <div className="fr-mb-3v">
              <Badge
                severity={data.hasCompleteOnboarding ? 'success' : 'warning'}
                small
              >
                {data.hasCompleteOnboarding ? 'Oui' : 'Non'}
              </Badge>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">
              Dernière ouverture
            </p>
            <p className="fr-mb-3v">
              {data.lastOpenedAt
                ? dateAsDayAndTime(data.lastOpenedAt)
                : 'Jamais'}
            </p>
          </div>
          <div className="fr-col-12 fr-col-md-6">
            <p className="fr-text--sm fr-mb-1v fr-text-mention--grey">
              Créé le
            </p>
            <p className="fr-mb-3v">{dateAsDayAndTime(data.created)}</p>
          </div>
        </div>
      </div>

      <div className="fr-border-radius--8 fr-border fr-p-6v fr-mb-6v">
        <h2 className="fr-h5 fr-mb-4v">Thèmes ({data.themes.length})</h2>
        {data.themes.length === 0 ? (
          <p className="fr-text--sm fr-text-mention--grey">
            Aucun thème sélectionné
          </p>
        ) : (
          <ul className="fr-tags-group">
            {data.themes.map((theme) => (
              <li key={theme}>
                <Tag>{themeLabels[theme]}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="fr-border-radius--8 fr-border fr-p-6v fr-mb-6v">
        <h2 className="fr-h5 fr-mb-4v">
          Secteurs professionnels ({data.professionalSectors.length})
        </h2>
        {data.professionalSectors.length === 0 ? (
          <p className="fr-text--sm fr-text-mention--grey">
            Aucun secteur sélectionné
          </p>
        ) : (
          <ul className="fr-tags-group">
            {data.professionalSectors.map((sector) => (
              <li key={sector}>
                <Tag>{professionalSectorsLabels[sector]}</Tag>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdministrationPageContainer>
  )
}

export default Page
