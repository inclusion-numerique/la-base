import { Decimal } from 'decimal.js'
import superjson from 'superjson'
import type { SuperJSONResult } from 'superjson/dist/types'

superjson.registerCustom<Decimal, string>(
  {
    isApplicable: (v): v is Decimal => Decimal.isDecimal(v),
    serialize: (v) => v.toJSON(),
    deserialize: (v) => new Decimal(v),
  },
  'decimal.js',
)

/** ⚠️ When serializing server data to pass to client components it becomes available to the browser.
 * Always check what is included in the data you serialize before passing it to a client component.
 */

// Helper type to obfuscate serialized data
// We need the unused <T> to carry the type on deserialization.
// biome-ignore lint/correctness/noUnusedVariables: we need the type to be carried on deserialization
export type Serialized<T> = { __serialized: symbol }

export const serialize = <T>(data: T): Serialized<T> =>
  superjson.serialize(data) as never as Serialized<T>

export const deserialize = <T>(data: Serialized<T>): T =>
  superjson.deserialize(data as never as SuperJSONResult)

export const transformer = { serialize, deserialize }
