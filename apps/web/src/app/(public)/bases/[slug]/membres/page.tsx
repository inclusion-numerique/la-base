import { notFound } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/server/bases/getBase'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/bases/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import Members from '@app/web/components/Base/Members/Members'

const BaseMembersPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
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
        <Members
          base={base}
          isMember={authorizations.isMember}
          isAdmin={authorizations.isAdmin}
        />
      </div>
    </>
  ) : (
    <>
      <Header base={authorizations.base} />
      <PrivateBox type="Base" />
    </>
  )
}

export default BaseMembersPage
