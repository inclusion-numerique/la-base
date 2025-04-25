import React from 'react'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/membres/searchParams'
import BaseMembers from '@app/web/features/base/members/components/BaseMembers'

const BaseMembersPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ tri: BaseMembersSortType }>
}) => {
  const { tri } = await searchParams
  const { slug } = await params
  const membersOrderBy = tri || 'Alphabetique'
  const user = await getSessionUser()
  const {
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug, membersOrderBy)

  return (
    <BaseMembers
      sortBy={membersOrderBy}
      base={base}
      canAddAdmin={hasPermission('AddBaseAdmin')}
      canAddMember={hasPermission('AddBaseMember')}
      canChangeMemberRole={hasPermission('ChangeBaseMemberRole')}
      user={user}
    />
  )
}

export default BaseMembersPage
