import React from 'react'
import Link from 'next/link'
import { BasePageData } from '@app/web/server/bases/getBase'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import Breadcrumbs from '../Breadcrumbs'
import CopyLinkButton from '../CopyLinkButton'
import BaseMetadata from './BaseMetadata'
import BaseImages from './BaseImages'

const headerId = 'header'
export const headerSkipLink = { label: 'Entête', anchor: `#${headerId}` }

const BaseHeader = ({
  base,
  canWrite,
  user,
}: {
  base: BasePageData
  canWrite?: boolean
  user: SessionUser | null
}) => (
  <div className="fr-background-alt--blue-france">
    <div className="fr-container">
      <Breadcrumbs
        currentPage={base.title}
        className="fr-m-0 fr-pt-2w fr-pb-4w"
      />
      <BaseImages base={base} />
      <div
        id={headerId}
        className="fr-flex-sm fr-align-items-center fr-direction-column fr-text--center fr-pt-3w fr-pb-6w"
      >
        <h1 className="fr-h2 fr-page-title fr-mb-1v">{base.title}</h1>
        <BaseMetadata
          className="fr-justify-content-center"
          base={base}
          withBadge
        />
        {canWrite ? (
          <div>
            <Link
              data-testid="base-edition-button"
              className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left fr-width-full fr-justify-content-center"
              href={`/bases/${base.slug}/editer`}
            >
              Modifier la base
            </Link>
          </div>
        ) : (
          base.isPublic && (
            <div className="fr-flex fr-flex-gap-4v fr-direction-column fr-direction-sm-row fr-mt-2w fr-width-full fr-justify-content-center">
              <div>
                <FollowButton
                  className="fr-width-full fr-justify-content-center"
                  followPriority="primary"
                  user={user}
                  base={base}
                />
              </div>
              {!!base.email && base.emailIsPublic && (
                <div>
                  <Link
                    className="fr-btn--sm fr-btn fr-btn--tertiary fr-icon-mail-line fr-btn--icon-left fr-justify-content-center fr-width-full"
                    href={`mailto:${base.email}`}
                  >
                    Contacter
                  </Link>
                </div>
              )}
              <div>
                <CopyLinkButton
                  size="small"
                  className="fr-justify-content-center fr-width-full"
                  url={getServerUrl(`/bases/${base.slug}`, {
                    absolutePath: true,
                  })}
                >
                  Partager
                </CopyLinkButton>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  </div>
)

export default BaseHeader
