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
 * Le paramètre correctif de `pg` (`uselibpqcompat=true`, ou l'écriture `sslmode=no-verify`)
 * ne peut pas être posé dans l'URL : celle-ci est aussi consommée par `psql` et
 * `pg_restore` lors de la restauration des sauvegardes, et libpq refuse ces deux formes —
 * « invalid URI query parameter » pour l'une, « invalid sslmode value » pour l'autre.
 * Le relâchement est donc déclaré ici, côté driver.
 *
 * Il n'est appliqué que si l'URL demande effectivement TLS : les bases locales et celles
 * de la CI n'en font pas, et leur imposer une connexion chiffrée les rendrait injoignables.
 */
const requiresTls = (connectionString: string | undefined) => {
  const sslMode = /[?&]sslmode=([^&]*)/.exec(connectionString ?? '')?.[1]

  return sslMode !== undefined && sslMode !== 'disable'
}

export const createPrismaPgAdapter = (
  connectionString: string | undefined = process.env.DATABASE_URL,
) =>
  new PrismaPg({
    connectionString,
    ...(requiresTls(connectionString)
      ? { ssl: { rejectUnauthorized: false } }
      : {}),
  })
