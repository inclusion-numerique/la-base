/** biome-ignore-all lint/suspicious/noConsole: debug */
import { SessionUser } from '@app/web/auth/sessionUser'
import { redirect } from 'next/navigation'

export const redirectToNewsFeedOnboarding = (user: SessionUser | null) => {
  // Only redirect if user is logged in but has no newsFeed record at all
  // If user has a newsFeed record (even with hasCompleteOnboarding: false), they've made a decision
  if (!user) {
    console.log('redirectToNewsFeedOnboarding: user is null')
    return
  }
  console.log('redirectToNewsFeedOnboarding: user.newsFeed', user.newsFeed)
  if (!user.newsFeed) {
    console.log(
      'redirectToNewsFeedOnboarding: user has no newsFeed, we redirect',
    )
    return redirect('/fil-d-actualite/onboarding')
  }
}
