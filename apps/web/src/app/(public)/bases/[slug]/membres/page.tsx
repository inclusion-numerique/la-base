import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/server/bases/getBase'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import EmptyResources from '@app/web/components/Base/EmptyResources'
import { filterAccess } from '@app/web/server/bases/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import Members from '@app/web/components/Base/List/Members'

const BasePage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/${params.slug}`)
  }

  const base = await basePageQuery(decodeURI(params.slug), user)

  if (!base) {
    notFound()
  }

  const authorizations = filterAccess(base, user)
  return authorizations.authorized ? (
    <>
      <Header base={base} isMember={authorizations.isMember} />
      <Menu base={base} current="members" />
      <div className="fr-container fr-mb-4w">
        {base.members.length === 0 ? (
          <EmptyResources isMember={authorizations.isMember} />
        ) : (
          <Members members={base.members} isAdmin={authorizations.isAdmin} />
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
