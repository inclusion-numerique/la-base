import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import BaseImage from '@app/web/components/BaseImage'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import BaseMetadata from '@app/web/features/base/components/BaseMetadata'
import BaseInvitationButtons from '@app/web/features/base/invitation/components/BaseInvitationButtons'
import { BaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import Link from 'next/link'

export const JoinBase = ({
  invitation,
  baseMembersCount,
  baseTitle,
}: {
  invitation: BaseInvitation
  baseMembersCount: number
  baseTitle: string
}) => (
  <div className="fr-grid-row fr-height-full">
    <div className="fr-col-md-6 fr-col-12">
      <div className="fr-flex fr-align-items-center fr-mx-auto fr-height-full ">
        <div className="fr-mx-auto fr-flex fr-container--slim fr-direction-column fr-flex-gap-10v fr-justify-content-space-between fr-px-12v">
          <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
            <LesBasesSvgLogo />
            <span className="fr-text--xl fr-text--semi-bold fr-mb-0">
              Les Bases du numérique d&apos;intérêt général
            </span>
          </div>
          <div>
            <h1 className="fr-text-title--blue-france">Rejoindre une base</h1>
            <p className="fr-text--lg fr-text--semi-bold">
              Vous êtes invité par {invitation.invitedBy?.name} à rejoindre la
              base {baseTitle}.
            </p>
            <p>En rejoignant cette base, vous pourrez&nbsp;:</p>
            <ul>
              <li>Créer & publier des ressources via cette base</li>
              <li>Contribuer aux ressources publiés sur cette base</li>
              <li>Voir les ressources privées</li>
              <li>Inviter d&apos;autres membres</li>
            </ul>
          </div>
          <div className="fr-text--center">
            <BaseInvitationButtons invitation={invitation} />
            <Link
              className="fr-link"
              target="_blank"
              rel="noreferrer"
              href="/centre-d-aide"
            >
              En savoir plus sur Les Bases du numérique d&apos;intérêt général
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-col-6 fr-hidden fr-unhidden-md fr-background-alt--blue-france">
      <div className="fr-flex fr-align-items-center fr-mx-auto fr-p-8w">
        <div
          className="fr-background-default--grey fr-border-radius--16 fr-p-12v"
          style={{ maxWidth: '443px' }}
        >
          <div className="fr-flex fr-direction-column fr-flex-gap-3v fr-border--bottom fr-pb-8v fr-mb-8v">
            <BaseImage
              base={{ id: invitation.base.id, image: invitation.base.image }}
              size={96}
            />
            <span className="fr-text--lg fr-mb-0 fr-text--bold">
              {baseTitle}
            </span>
            {invitation.base.description && (
              <div
                className="fr-text-default--grey"
                dangerouslySetInnerHTML={{
                  __html: invitation.base.description,
                }}
              />
            )}
            <BaseMetadata base={invitation.base} context="card" />
          </div>
          <div className="fr-text--lg fr-mb-0 fr-text--bold fr-text-label--blue-france">
            <span className="fr-icon-account-circle-line fr-mr-2v" />
            <span className="fr-text--bold">
              {baseMembersCount} membre{sPluriel(baseMembersCount)} dans la base
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
