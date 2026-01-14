import type { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import BaseHeaderShareLinkButton from '@app/web/features/base/components/BaseHeaderShareLinkButton'
import { BaseJoinRequest } from '@app/web/features/base/join-requests/components/BaseJoinRequest'
import type { BasePageData } from '@app/web/server/bases/getBase'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import Link from 'next/link'
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
}) => {
  const isBaseMember = user?.bases?.some(
    (membership) => membership.base.id === base.id,
  )
  const isBaseCreator = user?.id === base.createdById
  return (
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
              user={user}
              className="fr-justify-content-center fr-align-items-center"
              base={base}
              withBadge={!base.isPublic}
              context="base"
            />
            {canWrite && (isBaseMember || isBaseCreator) ? (
              <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-2v fr-mt-2w ">
                <Link
                  data-testid="base-edition-button"
                  className="fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left fr-width-full fr-justify-content-center"
                  href={`/bases/${base.slug}/editer`}
                  prefetch={false}
                >
                  Modifier la base
                </Link>
                {!base.isPublic && (
                  <BaseHeaderShareLinkButton
                    base={base}
                    enabled={!!base.shareableLink?.enabled}
                  />
                )}
              </div>
            ) : (
              base.isPublic && (
                <div className="fr-flex fr-flex-gap-4v fr-direction-column fr-direction-sm-row fr-mt-2w fr-width-full fr-justify-content-center fr-align-items-center">
                  <div className="fr-flex fr-flex-gap-2v fr-direction-row fr-justify-content-center">
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
                  <div className="fr-border-left fr-hidden fr-unhidden-sm fr-ml-2v">
                    <div className="fr-ml-2w">
                      <BaseJoinRequest user={user} base={base} size="small">
                        <Badge severity="info" noIcon>
                          <span
                            className="ri-loader-line fr-mr-1w"
                            aria-hidden
                          />
                          Demande à rejoindre la base en attente
                        </Badge>
                      </BaseJoinRequest>
                    </div>
                  </div>
                  <div className="fr-hidden-sm">
                    <BaseJoinRequest user={user} base={base} size="small">
                      <Badge severity="info" noIcon>
                        <span className="ri-loader-line fr-mr-1w" aria-hidden />
                        Demande à rejoindre la base en attente
                      </Badge>
                    </BaseJoinRequest>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BaseHeader
