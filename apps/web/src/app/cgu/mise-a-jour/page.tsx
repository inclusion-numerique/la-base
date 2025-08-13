import { metadataTitle } from '@app/web/app/metadataTitle'
import UpdatedCguPage from '@app/web/features/cgu/components/UpdatedCguPage'
import type { Metadata } from 'next'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Mise à jour des CGU'),
}

const CguMiseAJourPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ suivant?: string }>
}) => {
  const { suivant } = await searchParams
  return <UpdatedCguPage suivant={suivant} />
}

export default CguMiseAJourPage
