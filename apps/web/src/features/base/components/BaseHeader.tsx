import type { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import type { BasePageData } from '@app/web/server/bases/getBase'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import Link from 'next/link'
import React from 'react'
import BaseImages from '../../../components/Base/BaseImages'
import Breadcrumbs from '../../../components/Breadcrumbs'
import CopyLinkButton from '../../../components/CopyLinkButton'
import styles from './BaseHeader.module.css'
import BaseMetadata from './BaseMetadata'

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
    <div>
      <div className="fr-container">
        <Breadcrumbs currentPage={base.title} className="fr-m-0 fr-py-2w" />
      </div>
      <div className={styles.imageContainer}>
        <BaseImages base={base} />
      </div>
      <div className="fr-container">
        <div
          id={headerId}
          className="fr-flex-sm fr-align-items-center fr-direction-column fr-text--center fr-pt-3w fr-pb-6w"
        >
          <h1 className="fr-h2 fr-page-title fr-mb-2v">{base.title}</h1>
          <BaseMetadata
            className="fr-justify-content-center"
            base={base}
            withBadge={!base.isPublic}
            context="base"
          />
          {canWrite ? (
            <div>
              <Link
                data-testid="base-edition-button"
                className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left fr-width-full fr-justify-content-center"
                href={`/bases/${base.slug}/editer`}
                prefetch={false}
              >
                Modifier la base
              </Link>
            </div>
          ) : (
            base.isPublic && (
              <div className="fr-flex fr-flex-gap-2v fr-direction-row fr-mt-2w fr-width-full fr-justify-content-center">
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
                    <Tooltip title="Contacter">
                      <Button
                        size="small"
                        title="Contacter"
                        iconId="fr-icon-mail-line"
                        priority="secondary"
                        linkProps={{
                          href: `mailto:${base.email}`,
                        }}
                      />
                    </Tooltip>
                  </div>
                )}
                <div>
                  <CopyLinkButton
                    priority="secondary"
                    title="Partager"
                    size="small"
                    className="fr-m-0"
                    url={getServerUrl(`/bases/${base.slug}`, {
                      absolutePath: true,
                    })}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  </div>
)

export default BaseHeader
