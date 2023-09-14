import React from 'react'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getBases } from '@app/web/server/bases/getBasesList'
import BaseCard from '@app/web/components/Base/Card/Card'

export const revalidate = 0

const Bases = async () => {
  const user = await getSessionUser()
  if (!user) {
    return notFound()
  }
  const bases = await getBases(user)
  return (
    <>
      <Breadcrumbs currentPage="Bases" />

      <h1 className="wip">Bases</h1>
      {bases.map((base) => (
        <BaseCard key={base.id} base={base} />
      ))}
    </>
  )
}

export default Bases
