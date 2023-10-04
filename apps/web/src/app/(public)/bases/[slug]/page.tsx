import { notFound } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/server/bases/getBase'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import EmptyResources from '@app/web/components/Base/EmptyResources'
import Resources from '@app/web/components/Resource/List/Resources'
import { filterAccess } from '@app/web/server/bases/authorization'
import PrivateBox from '@app/web/components/PrivateBox'

const BasePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const base = await basePageQuery(decodeURI(params.slug), user)

  if (!base) {
    notFound()
  }

  const authorizations = filterAccess(base, user)
  return authorizations.authorized ? (
    <>
      <Header base={authorizations.base} isMember={authorizations.isMember} />
      <Menu base={authorizations.base} current="resources" />
      <div className="fr-container fr-mb-4w">
        {authorizations.base.resources.length === 0 ? (
          <EmptyResources isMember={authorizations.isMember} />
        ) : (
          <Resources
            resources={authorizations.base.resources}
            user={user}
            isConnectedUser={authorizations.isMember}
          />
        )}
      </div>
    </>
  ) : (
    <>
      <Header base={authorizations.base} />
      <PrivateBox type="Base" />
    </>
  )
}

export default BasePage
