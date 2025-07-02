export const loginIntents = [
  'enregistrer-ressource-dans-collection',
  'enregistrer-collection',
  'suivre-une-base-ou-un-profil',
] as const

export type LoginIntent = (typeof loginIntents)[number]
export const loginUrl = ({
  intent,
  next,
}: {
  intent?: LoginIntent
  next?: string
}) => {
  const queryParams = []

  if (intent) {
    queryParams.push(`intention=${encodeURIComponent(intent)}`)
  }

  if (next) {
    queryParams.push(`suivant=${encodeURIComponent(next)}`)
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : ''

  return `/connexion${queryString}`
}

export const defaultLoginTitle = `Se connecter`
export const loginTitles: { [intent in LoginIntent]: string } = {
  'enregistrer-ressource-dans-collection':
    'Connectez vous pour enregistrer une ressource dans une collection',
  'enregistrer-collection': 'Connectez vous pour enregistrer une collection',
  'suivre-une-base-ou-un-profil':
    'Connectez vous pour suivre une base ou un profil',
}

export const getLoginTitle = (intent?: string | string[] | null) => {
  if (typeof intent !== 'string') {
    return defaultLoginTitle
  }

  if (intent in loginTitles) {
    return loginTitles[intent as LoginIntent]
  }

  return defaultLoginTitle
}

export type LoginSearchParams = {
  intention?: LoginIntent
  suivant?: string
}
