import { notFound } from 'next/navigation'
import React from 'react'
import { basePageQuery } from '@app/web/server/bases/getBase'
import Header from '@app/web/components/Base/Header'
import Menu from '@app/web/components/Base/Menu'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { filterAccess } from '@app/web/server/bases/authorization'
import PrivateBox from '@app/web/components/PrivateBox'
import Details from '@app/web/components/Base/Details'

const BaseDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  const base = await basePageQuery(decodeURI(params.slug), user)

  if (!base) {
    notFound()
  }

  const authorizations = filterAccess(base, user)
  return authorizations.authorized ? (
    <>
      <Header base={base} isMember={authorizations.isMember} />
      <Menu base={base} current="a-propos" />
      <Details base={base} />
    </>
  ) : (
    <>
      <Header base={authorizations.base} />
      <PrivateBox type="Base" />
    </>
  )
}

export default BaseDetailsPage
