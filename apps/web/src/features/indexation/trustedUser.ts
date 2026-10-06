/**
 * Utilisateur "de confiance" : ses contenus publics peuvent être indexés par
 * les moteurs de recherche. Les autres restent visibles sur le site mais sont
 * servis en noindex, pour retirer tout intérêt au SEO parasite (articles
 * commerciaux publiés pour profiter de l'autorité du domaine).
 */

// Vues cumulées sur les ressources publiques à partir desquelles un compte est de confiance
export const trustedUserMinPublicResourcesViews = 1000

// Ancienneté minimale du compte pour être de confiance par les vues ou les
// recommandations, et du compte qui recommande pour que sa recommandation compte
export const trustedUserMinAccountAgeInDays = 30

// Note minimale d'un avis pour compter comme recommandation (3 : "Oui", 4 : "Beaucoup")
export const recommendationMinRating = 3

const dayInMilliseconds = 24 * 60 * 60 * 1000

// Un compte créé avant cette date a l'ancienneté requise
export const getMinAccountAgeCreatedBefore = (now: Date) =>
  new Date(now.getTime() - trustedUserMinAccountAgeInDays * dayInMilliseconds)

export type TrustedUserSignals = {
  email: string
  emailVerified: Date | null
  created: Date
  // Ressources publiées, publiques et non supprimées dont l'utilisateur est le créateur
  publicResourcesViewsCount: number
  // Recommandée par un compte ancien, ni créateur ni contributeur de la ressource
  hasRecommendedPublicResource: boolean
}

/**
 * Compare le domaine de l'email (après le @, en minuscules) : "gouv.fr" ou un
 * sous-domaine. "fauxgouv.fr" et "gouv.fr.exemple.com" ne sont pas acceptés.
 */
export const isGouvFrEmail = (email: string) => {
  const domain = email
    .slice(email.lastIndexOf('@') + 1)
    .trim()
    .toLowerCase()

  return domain === 'gouv.fr' || domain.endsWith('.gouv.fr')
}

export const isTrustedUser = (
  {
    email,
    emailVerified,
    created,
    publicResourcesViewsCount,
    hasRecommendedPublicResource,
  }: TrustedUserSignals,
  now: Date = new Date(),
) => {
  if (emailVerified && isGouvFrEmail(email)) {
    return true
  }

  if (created > getMinAccountAgeCreatedBefore(now)) {
    return false
  }

  return (
    publicResourcesViewsCount >= trustedUserMinPublicResourcesViews ||
    hasRecommendedPublicResource
  )
}
