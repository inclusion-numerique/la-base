import { SessionUser } from '@app/web/auth/sessionUser'
import { redirect } from 'next/navigation'

export const redirectToNewsFeedOnboarding = (user: SessionUser | null) => {
  if (!user || user.newsFeed) {
    return
  }

  return redirect('/fil-d-actualite/onboarding')
}
