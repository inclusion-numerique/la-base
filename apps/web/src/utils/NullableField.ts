// Helper type to ensure fields default to `null` only if they are `undefined` in T
export type NullableField<T, K extends keyof T> = T[K] extends never
  ? null
  : T[K]
