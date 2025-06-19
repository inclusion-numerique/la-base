import { metadataTitle } from '@app/web/app/metadataTitle'
import AddOpenedOnboardingCookie from '@app/web/app/nouveautes/AddOpenedOnboardingCookie'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import styles from './NouveautesLayout.module.css'

export const metadata: Metadata = {
  title: metadataTitle('Nouveautés'),
}
const NouveautesLayout = ({ children }: PropsWithChildren) => (
  <>
    <div className={styles.container}>{children}</div>
    <AddOpenedOnboardingCookie />
  </>
)

export default NouveautesLayout
