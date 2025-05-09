import Newsletter from '@app/web/app/(public)/Newsletter'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Card from '@app/web/components/Card'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Centre d'aide`),
}

const CardIcon = ({
  backgroundColor,
  color = backgroundColor,
  icon,
}: {
  backgroundColor: 'yellow-tournesol' | 'info'
  color?: string
  icon: string
}) => (
  <div className="fr-mx-3w fr-mt-5w">
    <span
      role="img"
      className={`fr-background-contrast--${backgroundColor} fr-text-action-high--${color} ${icon} ri-xl fr-p-2w fr-border-radius--8`}
      aria-hidden
    />
  </div>
)

const CardLink = ({ href }: { href: string }) => (
  <div className="fr-link">
    <Link href={href}>
      En savoir plus <span className="ri-arrow-right-line" />
    </Link>
  </div>
)

const ContentPolicyPage = () => (
  <>
    <SkipLinksPortal />
    <main id={contentId} className="fr-container fr-mb-15w">
      <Breadcrumbs currentPage="Centre d'aide" />
      <div className="fr-text--center fr-mb-6w">
        <h1 className="fr-text-title--blue-france">
          Comment pouvons-nous vous aider&nbsp;?
        </h1>
        <p className="fr-text--xl">
          Retrouvez différentes catégories pour vous guider dans l’usage de la
          plateforme.
        </p>
      </div>
      <div className="fr-container--medium fr-mx-auto fr-light-b">
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12">
            <Card
              title="Pour bien commencer"
              description="En savoir plus sur Les Bases du numérique d’intérêt général et comment
        créer votre compte."
              titleAs="div"
              header={
                <CardIcon
                  backgroundColor="yellow-tournesol"
                  icon="ri-flashlight-line"
                />
              }
            >
              <CardLink href="centre-d-aide/pour-bien-commencer" />
            </Card>
          </div>
          <div className="fr-col-md-6 fr-col-12">
            <Card
              title="Un profil"
              description="Le profil est un espace personnel de création, de collecte et de publication de ressources."
              titleAs="div"
              header={
                <CardIcon
                  backgroundColor="info"
                  color="blue-france"
                  icon="ri-account-circle-line"
                />
              }
            >
              <CardLink href="centre-d-aide/le-profil" />
            </Card>
          </div>
          <div className="fr-col-md-6 fr-col-12">
            <Card
              title="Une base"
              description="Une base est un espace collaboratif entre plusieurs membres souhaitant produire et/ou publier des ressources en commun."
              titleAs="div"
              header={
                <CardIcon
                  backgroundColor="info"
                  color="blue-france"
                  icon="ri-team-line"
                />
              }
            >
              <CardLink href="centre-d-aide/une-base" />
            </Card>
          </div>
          <div className="fr-col-md-6 fr-col-12">
            <Card
              title="Les ressources"
              description="Une ressource est une fiche traitant d'un sujet particulier (trame d’atelier, initiative, documentation diverse, etc...)."
              titleAs="div"
              header={
                <CardIcon
                  backgroundColor="info"
                  color="blue-france"
                  icon="ri-file-text-line"
                />
              }
            >
              <CardLink href="centre-d-aide/les-ressources" />
            </Card>
          </div>
          <div className="fr-col-md-6 fr-col-12">
            <Card
              title="Les collections"
              description="Les collections sont des dossiers qui vous permettent d’enregistrer et d’organiser des ressources."
              titleAs="div"
              header={
                <CardIcon
                  backgroundColor="info"
                  color="blue-france"
                  icon="ri-folder-2-line"
                />
              }
            >
              <CardLink href="centre-d-aide/les-collections" />
            </Card>
          </div>
        </div>
      </div>
    </main>
    <Newsletter />
  </>
)
export default ContentPolicyPage
