import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import BaseDetails from '@app/web/components/Base/BaseDetails'
import BaseHomePageHighlights from '@app/web/components/Base/BaseHomePageHighlights'

const BaseAProposPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const user = await getSessionUser()

  const { slug } = await params
  const { base } = await getBasePageContext(slug)

  return (
    <>
      <BaseDetails base={base} />
      <BaseHomePageHighlights base={base} user={user} />
    </>
  )
}

export default BaseAProposPage
