export const databasePasswordSecretName = (namespace: string) =>
  `DATABASE_PASSWORD_${namespace.replaceAll('-', '_').toUpperCase()}`
