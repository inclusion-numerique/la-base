import BlockWithLabel from '@app/ui/components/BlockWithLabel'
import ExternalLink from '@app/ui/components/ExternalLink'
import { getProfilePageContext } from '@app/web/app/(public)/profils/[slug]/(consultation)/getProfilePageContext'
import type { ProfilRouteParams } from '@app/web/app/(public)/profils/[slug]/profilRouteParams'
import IconInSquare from '@app/web/components/IconInSquare'
import EmptyProfileInformations from '@app/web/components/Profile/EmptyProfileInformations'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { getDepartmentName } from '@app/web/utils/departments'
import Link from 'next/link'
import React from 'react'

const hasInformations = (profile: ProfilePageData): boolean =>
  profile.description != null || profile.department != null

const hasSocialNetwork = (profile: ProfilePageData): boolean =>
  profile.facebook != null ||
  profile.twitter != null ||
  profile.linkedin != null

const hasContact = (profile: ProfilePageData): boolean =>
  (profile.emailIsPublic && profile.email != null) || profile.website != null

const AProposPage = async ({ params }: ProfilRouteParams) => {
  const { slug } = await params
  const {
    profile,
    authorization: { hasPermission, hasRole },
  } = await getProfilePageContext(slug)

  return hasInformations(profile) ||
    hasInformations(profile) ||
    hasContact(profile) ? (
    <>
      <div className="fr-flex fr-align-items-center fr-flex-gap-5v fr-mb-6w">
        <IconInSquare iconId="ri-information-line" />
        <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">À propos</h2>
      </div>
      <hr />
      <div className="fr-grid-row">
        {hasInformations(profile) && (
          <div className="fr-col-8">
            <h3 className="fr-h6 fr-mb-1w">Informations</h3>
            <BlockWithLabel
              label="Description"
              canDisplay={profile.description}
            >
              {!!profile.description && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: profile.description,
                  }}
                />
              )}
            </BlockWithLabel>
            <BlockWithLabel label="Département" canDisplay={profile.department}>
              {!!profile.department && getDepartmentName(profile.department)}
            </BlockWithLabel>
          </div>
        )}
        {(hasContact(profile) || hasSocialNetwork(profile)) && (
          <div className="fr-col">
            {hasContact(profile) && (
              <>
                <h3 className="fr-h6 fr-mb-1w">Contact</h3>
                <BlockWithLabel
                  label="Adresse mail de contact"
                  canDisplay={profile.emailIsPublic && profile.email}
                >
                  <Link href={`mailto:${profile.email}`} className="fr-link">
                    {profile.email}
                  </Link>
                </BlockWithLabel>
                <BlockWithLabel
                  label="Site internet"
                  canDisplay={profile.website}
                >
                  <ExternalLink href={profile.website}>
                    {profile.website}
                  </ExternalLink>
                </BlockWithLabel>
              </>
            )}
            {hasSocialNetwork(profile) && (
              <>
                <h3 className="fr-h6 fr-mb-1w">Me suivre</h3>
                <div className="fr-flex fr-flex-wrap fr-flex-gap-5v">
                  <ExternalLink
                    href={profile.facebook}
                    icon="ri-facebook-circle-fill"
                  >
                    Facebook
                  </ExternalLink>
                  <ExternalLink href={profile.twitter} icon="ri-twitter-fill">
                    X (Twitter)
                  </ExternalLink>
                  <ExternalLink
                    href={profile.linkedin}
                    icon="ri-linkedin-box-fill"
                  >
                    Linkedin
                  </ExternalLink>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <EmptyProfileInformations
      canWrite={hasPermission('WriteProfile')}
      isOwner={hasRole('ProfileOwner')}
    />
  )
}

export default AProposPage
