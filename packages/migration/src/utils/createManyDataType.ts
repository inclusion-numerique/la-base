export type CreateManyDataType<
  T extends (params: { data: unknown[] }) => Promise<unknown>,
> = Exclude<Parameters<T>[0], undefined>['data']
