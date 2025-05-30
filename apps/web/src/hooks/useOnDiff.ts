import { useRef } from 'react'

/**
 * This previous / current pattern is preferable to useEffect in terms of performance and unintended side effects
 * See react doc "Why you might not need an effect"
 */

export const useOnDiff = <T>(
  value: T,
  onDiff: (newValue: T, oldValue: T | undefined) => void | Promise<void>,
  options?: {
    equalityFunction?: (newValue: T, oldValue: T | undefined) => boolean
  },
) => {
  const previousValue = useRef<T>(undefined)

  const hasDiff = options?.equalityFunction
    ? !options.equalityFunction(value, previousValue.current)
    : value !== previousValue.current

  if (hasDiff) {
    onDiff(value, previousValue.current)
    previousValue.current = value
  }
}
