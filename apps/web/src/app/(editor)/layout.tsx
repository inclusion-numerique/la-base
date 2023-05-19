import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'

const EditorLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  const createResourceHref = user
    ? '/?creer-une-ressource'
    : '/connexion?suivant=/?creer-une-ressource'

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header
        user={user}
        createResource={
          <Link
            href={createResourceHref}
            className="fr-btn fr-icon-edit-box-line"
          >
            Créer une ressource
          </Link>
        }
        backLink
      />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
export default EditorLayout
