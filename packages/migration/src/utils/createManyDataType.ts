import { Prisma } from '@prisma/migration-client'
import Enumerable = Prisma.Enumerable
import PrismaPromise = Prisma.PrismaPromise

export type CreateManyDataType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => PrismaPromise<Enumerable<any>>,
> = Exclude<Parameters<T>[0], undefined>['data']
