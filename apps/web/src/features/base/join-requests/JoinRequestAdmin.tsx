import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import BaseImage from '@app/web/components/BaseImage'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import BaseJoinRequestButtons from '@app/web/features/base/join-requests/components/BaseJoinRequestButtons'
import { BaseJoinRequestByToken } from '@app/web/features/base/join-requests/db/getBaseJoinRequestByToken'
import Notice from '@codegouvfr/react-dsfr/Notice'
import classNames from 'classnames'
import Link from 'next/link'
import styles from './JoinRequestAdmin.module.css'

const formatApplicantName = (applicant: {
  name?: string | null
  firstName?: string | null
  lastName?: string | null
  email: string
}) => {
  if (applicant.firstName && applicant.lastName) {
    return `${applicant.firstName} ${applicant.lastName}`
  }
  if (applicant.name) {
    return applicant.name
  }
  return applicant.email
}

export const JoinRequestAdmin = ({
  joinRequest,
  baseMembersCount,
  baseTitle,
  user,
}: {
  joinRequest: BaseJoinRequestByToken
  baseMembersCount: number
  baseTitle: string
  user: SessionUser | null
}) => {
  const applicantName = formatApplicantName(joinRequest.applicant)

  return (
    <div className="fr-grid-row fr-height-full">
      <div className="fr-col-md-6 fr-col-12">
        <div className="fr-flex fr-align-items-center fr-mx-auto fr-height-full ">
          <div className="fr-mx-auto fr-flex fr-container--slim fr-direction-column fr-flex-gap-10v fr-justify-content-space-between fr-p-4v fr-p-md-12v">
            <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
              <LesBasesSvgLogo />
              <span className="fr-text-md--xl fr-text--medium fr-mb-0">
                Les Bases du numérique d&apos;intérêt général
              </span>
            </div>
            <div>
              <h1 className="fr-text-title--blue-france">
                Demande pour rejoindre une base
              </h1>
              <p className="fr-text--lg fr-text--medium">
                {applicantName} souhaite rejoindre la base {baseTitle}.
              </p>
              <p>En acceptant cette demande, ce membre pourra&nbsp;:</p>
              <ul>
                <li>Créer & publier des ressources via cette base</li>
                <li>Contribuer aux ressources publiées sur cette base</li>
                <li>Voir les ressources privées</li>
                <li>Inviter d&apos;autres membres</li>
              </ul>
            </div>
            {!joinRequest.isCurrentUserAdmin && (
              <Notice
                title={
                  <span className="fr-text--regular fr-text-default--grey">
                    Vous devez être administrateur de cette base pour traiter
                    cette demande.
                  </span>
                }
              />
            )}
            <div className="fr-text--center">
              <BaseJoinRequestButtons joinRequest={joinRequest} user={user} />
              <Link
                className="fr-link"
                target="_blank"
                rel="noreferrer"
                href="/"
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
                base={{
                  id: joinRequest.base.id,
                  image: joinRequest.base.image,
                }}
                size={96}
              />
              <span className="fr-text--lg fr-mb-0 fr-text--bold">
                {baseTitle}
              </span>
              {joinRequest.base.description && (
                <div
                  className={classNames(
                    'fr-text-default--grey',
                    styles.description,
                  )}
                  dangerouslySetInnerHTML={{
                    __html: joinRequest.base.description,
                  }}
                />
              )}
              {/* <BaseMetadata
                user={null}
                base={{
                  ...joinRequest.base,
                  followedByData: null,
                }}
                context="card"
              /> */}
              <BasePrivacyTag small isPublic={joinRequest.base.isPublic} />
            </div>
            <div className="fr-text--lg fr-mb-0 fr-text--bold fr-text-label--blue-france">
              <span className="fr-icon-account-circle-line fr-mr-2v" />
              <span className="fr-text--bold">
                {baseMembersCount} membre{sPluriel(baseMembersCount)} dans la
                base
              </span>
            </div>

            <div className="fr-mt-6v fr-pt-6v fr-border--top">
              <div className="fr-text--lg fr-mb-2v fr-text--bold fr-text-label--blue-france">
                Demandeur
              </div>
              <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
                {/* {joinRequest.applicant.image ? (
                  <img
                    src={joinRequest.applicant.image}
                    alt=""
                    className="fr-border-radius--8"
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="fr-icon-account-circle-line ri-2x fr-text-default--grey" />
                )} */}
                <div>
                  <div className="fr-text--bold">{applicantName}</div>
                  <div className="fr-text--sm fr-text-default--grey">
                    {joinRequest.applicant.email}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
