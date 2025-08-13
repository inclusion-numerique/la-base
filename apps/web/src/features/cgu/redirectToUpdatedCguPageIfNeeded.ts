import { SessionUser } from '@app/web/auth/sessionUser'
import { redirect } from 'next/navigation'
import { currentCguVersion } from './components/CurrentCgu'

export const redirectToUpdatedCguPageIfNeeded = (user: SessionUser | null) => {
  if (!user) {
    return
  }
  if (!user.lastCguAcceptedAt || user.cguVersion !== currentCguVersion) {
    return redirect('/cgu/mise-a-jour')
  }
}
