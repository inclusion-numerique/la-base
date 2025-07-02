'use client'

import type { SessionUser } from '@app/web/auth/sessionUser'
import { canAccessAdministration } from '@app/web/authorization/administrationAuthorizations'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import Link from 'next/link'
import React from 'react'

export const HeaderUserMenu = ({ user }: { user: SessionUser }) => {
  const bases = user.bases.map(({ base }) => base)

  return (
    <ul>
      <li className="fr-border-top fr-border-bottom fr-my-md-0 fr-my-1w fr-py-md-0 fr-py-1w">
        <Link
          className="fr-btn fr-flex fr-align-items-center fr-border-bottom-0"
          href={`/profils/${user.slug}`}
        >
          <RoundProfileImage className="fr-mr-3v" user={user} />
          <span>
            {user.name ? (
              <>
                <p className="fr-text--bold fr-text--md fr-mb-0 fr-text-default--grey">
                  {user.name}
                </p>
                <p className="fr-text--sm fr-text-mention--grey fr-mb-0">
                  {user.email}
                </p>
              </>
            ) : (
              <p className="fr-text--bold fr-text--md fr-mb-0">{user.email}</p>
            )}
            <span className="fr-text-title--blue-france fr-text--sm fr-mb-0">
              Voir mon profil
            </span>
          </span>
        </Link>
      </li>
      {bases.length > 0 ? (
        <>
          <li>
            <p className="fr-text-mention--grey fr-text--sm fr-p-1w fr-pl-md-2w fr-pl-1w">
              Mes bases
            </p>
          </li>
          {bases.map(({ slug, title }) => (
            <li key={slug}>
              <Link
                className="fr-btn fr-text--sm fr-border-bottom-0"
                href={`/bases/${slug}`}
                style={{
                  boxShadow: 'none',
                  borderBottom: undefined,
                }}
              >
                <span className="fr-icon-home-4-line fr-icon--sm fr-mr-1w fr-text-label--blue-france" />
                <span className="fr-text-mention--black fr-text--normal">
                  {title}
                </span>
              </Link>
            </li>
          ))}
        </>
      ) : null}
      <li>
        <Link
          className="fr-btn fr-text--sm fr-border-bottom-0"
          href="/bases/creer"
          style={{ boxShadow: 'none' }}
        >
          <span className="fr-icon-add-line fr-icon--sm fr-mr-1w fr-text-label--blue-france" />
          <span className="fr-text-mention--black fr-text--normal">
            Créer une base
          </span>
        </Link>
      </li>
      {canAccessAdministration(user) && (
        <li>
          <Link
            className="fr-btn fr-text--sm fr-border-top"
            href="/administration"
          >
            <span className="fr-icon-settings-5-line fr-icon--sm fr-mr-1w fr-text-label--blue-france" />
            Administration
          </Link>
        </li>
      )}
      <li>
        <Link className="fr-btn fr-text--sm fr-border-top" href="/deconnexion">
          <span className="fr-icon-logout-box-r-line fr-icon--sm fr-mr-1w fr-text-label--blue-france" />
          <span className="fr-text-mention--black fr-text--normal">
            Se déconnecter
          </span>
        </Link>
      </li>
    </ul>
  )
}
