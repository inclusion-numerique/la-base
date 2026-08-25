import { PrismaPg } from '@prisma/adapter-pg'

/**
 * Depuis `pg-connection-string` 2.14, `pg` traite `sslmode=require` comme `verify-full`,
 * et le signale lui-même :
 *
 *   SECURITY WARNING: The SSL modes 'prefer', 'require', and 'verify-ca' are treated as
 *   aliases for 'verify-full'.
 *
 * libpq — et le moteur Rust de Prisma 6, qui portait la connexion avant le passage au
 * driver adapter — n'y voient au contraire qu'un chiffrement sans vérification de la
 * chaîne. Le certificat de la base managée Scaleway étant signé par sa propre autorité,
 * la vérification échoue sur « self-signed certificate ».
 *
 * Deux corrections évidentes ne fonctionnent pas, pour des raisons opposées :
 *
 *  - poser le paramètre correctif dans l'URL (`uselibpqcompat=true`, ou l'écriture
 *    `sslmode=no-verify`) la rend inutilisable par `psql` et `pg_restore`, qui restaurent
 *    les sauvegardes à partir de cette même variable — libpq refuse ces deux formes,
 *    « invalid URI query parameter » pour l'une, « invalid sslmode value » pour l'autre ;
 *
 *  - passer `ssl` en configuration à côté de `connectionString` est sans effet : `pg`
 *    applique la chaîne de connexion après la configuration explicite, si bien que le
 *    `sslmode` de l'URL écrase l'option.
 *
 * `sslmode` est donc retiré de la chaîne remise au driver, et la tolérance déclarée en
 * configuration, où plus rien ne l'écrase. La variable d'environnement, elle, n'est pas
 * touchée : les outils libpq continuent de lire `sslmode=require`.
 *
 * Rien de tout cela ne s'applique aux bases locales et de CI, qui ne font pas de TLS :
 * leur URL ne porte pas de `sslmode`, et leur imposer une connexion chiffrée les rendrait
 * injoignables.
 */
const sslModeOf = (connectionString: string | undefined) =>
  /[?&]sslmode=([^&]*)/.exec(connectionString ?? '')?.[1]

const withoutSslMode = (connectionString: string) => {
  const queryStart = connectionString.indexOf('?')

  if (queryStart === -1) return connectionString

  const base = connectionString.slice(0, queryStart)
  const parameters = connectionString
    .slice(queryStart + 1)
    .split('&')
    .filter((parameter) => !parameter.startsWith('sslmode='))

  return parameters.length > 0 ? `${base}?${parameters.join('&')}` : base
}

export const createPrismaPgAdapter = (
  connectionString: string | undefined = process.env.DATABASE_URL,
) => {
  const sslMode = sslModeOf(connectionString)

  if (
    connectionString === undefined ||
    sslMode === undefined ||
    sslMode === 'disable'
  ) {
    return new PrismaPg({ connectionString })
  }

  return new PrismaPg({
    connectionString: withoutSslMode(connectionString),
    ssl: { rejectUnauthorized: false },
  })
}
