/**
 * Les tâches destructrices des tests e2e vident la base sans confirmation. Rien ne les
 * empêchait de le faire sur la base de développement : il suffit que `DATABASE_URL` la
 * désigne au moment où Cypress s'exécute, ce qui arrive dès qu'on lance la suite sans
 * surcharger l'environnement. Un `.env` par défaut a ainsi déjà effacé une base locale.
 *
 * On exige donc que la base porte un nom qui l'identifie comme jetable. La CI utilise
 * `test`, une base dédiée en local s'appelle `e2e` : les deux passent, `la-base` non.
 */
const disposableDatabaseNames = /^(test|e2e)(_|-|$)/

const databaseNameFrom = (databaseUrl: string): string | null => {
  try {
    return new URL(databaseUrl).pathname.replace(/^\//, '') || null
  } catch {
    return null
  }
}

export const assertDisposableDatabase = (taskName: string): void => {
  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    throw new Error(
      `${taskName} : DATABASE_URL n'est pas défini. Cette tâche vide la base, elle exige une base jetable.`,
    )
  }

  const databaseName = databaseNameFrom(databaseUrl)

  if (!databaseName || !disposableDatabaseNames.test(databaseName)) {
    throw new Error(
      [
        `${taskName} vide entièrement la base « ${databaseName ?? databaseUrl} », dont le nom ne l'identifie pas comme jetable.`,
        `Les noms acceptés commencent par "test" ou "e2e".`,
        ``,
        `Pour lancer les tests e2e sans risque, montez une base dédiée :`,
        `  docker run -d --name la-base-e2e -e POSTGRES_USER=e2e -e POSTGRES_PASSWORD=e2e \\`,
        `    -e POSTGRES_DB=e2e -p 55444:5432 postgres:14.0`,
        `  DATABASE_URL="postgresql://e2e:e2e@localhost:55444/e2e" pnpm -F @app/web prisma migrate deploy`,
        ``,
        `puis démarrez l'application et Cypress avec ce même DATABASE_URL.`,
      ].join('\n'),
    )
  }
}
