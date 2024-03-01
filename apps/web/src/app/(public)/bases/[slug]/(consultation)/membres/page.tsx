import React from 'react'
import BaseMembers from '@app/web/components/Base/Members/BaseMembers'
import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'

const BaseMembersPage = async ({ params }: { params: { slug: string } }) => {
  const {
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(params.slug)

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
