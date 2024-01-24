import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Déconnexion',
}

const SignoutPage = () => (
  <>
    <Breadcrumbs currentPage="Déconnexion" />
    <AuthCard>
      <h2>Déconnexion</h2>
      <p>Êtes-vous sur de vouloir vous déconnecter&nbsp;?</p>
      <ul className="fr-btns-group">
        <li>
          <SignoutButton />
        </li>
      </ul>
      <div className="fr-grid-row fr-grid-row--center">
        <Link href="/">Retour</Link>
      </div>
    </AuthCard>
  </>
)

export default SignoutPage
