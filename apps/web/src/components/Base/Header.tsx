import React from 'react'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { FilteredBase } from '@app/web/server/bases/authorization'
import { BasePageData } from '@app/web/server/bases/getBase'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Breadcrumbs from '../Breadcrumbs'
import CopyLinkButton from '../CopyLinkButton'
import ViewsAndMetadata from './ViewsAndMetadata'
import styles from './Header.module.css'
import Images from './Images'

const Header = ({
  base,
  isMember,
}: {
  base: FilteredBase | BasePageData
  isMember?: boolean
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs currentPage={base.title} />
      <Images base={base} />
      <div className={styles.baseInfo}>
        <h2>{base.title}</h2>
        <ViewsAndMetadata base={base} withBadge />
        {isMember ? (
          <Link
            data-testid="base-edition-button"
            className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-edit-line fr-mt-2w"
            href={`/bases/${base.slug}/editer`}
          >
            Modifier la base
          </Link>
        ) : (
          <div className={styles.buttons}>
            <Button iconId="fr-icon-user-heart-line" size="small">
              Suivre
            </Button>
            {base.email && (
              <Link
                className="fr-btn--sm fr-btn fr-btn--secondary fr-icon-mail-line fr-btn--icon-left"
                href={`mailto:${base.email}`}
              >
                Contacter
              </Link>
            )}
            <Button
              iconId="fr-icon-warning-line"
              size="small"
              priority="secondary"
            >
              Signaler
            </Button>
            <CopyLinkButton
              url={getServerUrl(`/bases/${base.slug}`, true)}
              priority="secondary"
            >
              Partager
            </CopyLinkButton>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default Header
