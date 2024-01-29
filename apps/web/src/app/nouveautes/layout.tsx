import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import AddOpenedOnboardingCookie from '@app/web/app/nouveautes/AddOpenedOnboardingCookie'
import { metadataTitle } from '@app/web/app/metadataTitle'
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
