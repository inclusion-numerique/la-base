import React, { PropsWithChildren } from 'react'
import PublicFooter from '@app/web/app/(public)/PublicFooter'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import CreateResourceFormModal from '@app/web/components/Resource/CreateResourceFormModal'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header
        user={user}
        createResource={user ? <CreateResourceButton /> : undefined}
      />
      <div style={{ flex: 1 }}>
        <div className="fr-container">{children}</div>
      </div>
      <PublicFooter />
      {user ? <CreateResourceFormModal user={user} /> : null}
    </div>
  )
}

export default PublicLayout
