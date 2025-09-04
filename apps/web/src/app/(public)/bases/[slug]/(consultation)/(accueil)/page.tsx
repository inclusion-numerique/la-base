import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import BaseDetails from '@app/web/components/Base/BaseDetails'

const BaseAProposPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const { base } = await getBasePageContext(slug)

  return <BaseDetails base={base} />
}

export default BaseAProposPage
