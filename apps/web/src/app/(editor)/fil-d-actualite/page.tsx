import { NewsFeedOnboardingDone } from '@app/web/features/fil-d-actualite/onboarding/components/NewsFeedOnboardingDoneModal'

export default async function NewsFeedPage({
  searchParams,
}: {
  searchParams: Promise<{ onboarding: string | undefined }>
}) {
  const { onboarding } = await searchParams
  return (
    <div>
      <NewsFeedOnboardingDone fromOnboarding={!!onboarding} />
      fil d'actu
    </div>
  )
}
