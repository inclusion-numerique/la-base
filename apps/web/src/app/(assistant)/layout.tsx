import React, { PropsWithChildren } from 'react'
import { notFound } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'

const PublicLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  if (user?.role !== 'Admin') {
    notFound()
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <div id="skip-links" />
      <Header
        user={user}
        createResource={
          user ? <CreateResourceButton baseId={null} /> : undefined
        }
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  )
}

export default PublicLayout
