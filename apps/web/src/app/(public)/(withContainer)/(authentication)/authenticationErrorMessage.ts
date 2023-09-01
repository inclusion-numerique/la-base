export const signinErrorMessage = (error?: string): string | undefined => {
  if (!error) {
    return error
  }

  if (error === 'OAuthAccountNotLinked') {
    return 'Vous venez de vous connecter par un nouvelle méthode. Par sécurité, veuillez utiliser la méthode de connexion que vous avez utilisé initialement.'
  }
  return 'Erreur de connexion, veuillez réessayer.'
}
