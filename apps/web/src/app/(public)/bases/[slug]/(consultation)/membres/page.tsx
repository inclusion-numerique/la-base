import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import BaseMembers from '@app/web/components/Base/Members/BaseMembers'
import React from 'react'

const BaseMembersPage = async ({
  params,
}: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const {
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  return (
    <BaseMembers
      base={base}
      canAddAdmin={hasPermission('AddBaseAdmin')}
      canAddMember={hasPermission('AddBaseMember')}
      canChangeMemberRole={hasPermission('ChangeBaseMemberRole')}
    />
  )
}

export default BaseMembersPage
