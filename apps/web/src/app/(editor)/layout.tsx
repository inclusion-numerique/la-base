import React, { PropsWithChildren } from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Header from '@app/web/components/Header'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'

const EditorLayout = async ({ children }: PropsWithChildren) => {
  const user = await getSessionUser()

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}
    >
      <Header
        user={user}
        createResource={
          user ? <CreateResourceButton baseId={null} /> : undefined
        }
        backLink
      />
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}
export default EditorLayout
