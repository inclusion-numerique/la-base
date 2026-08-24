import { useEffect } from 'react'
import { FieldValues, UseFormWatch, WatchObserver } from 'react-hook-form'

/**
 * We use this hook to listen to form changes as unsubscription must be managed on our side.
 * Simply calling watch() is not enough as it creates a new subscription for each render.
 *
 * see https://www.react-hook-form.com/api/useform/watch/
 */
export const useWatchSubscription = <TFieldValues extends FieldValues>(
  watch: UseFormWatch<TFieldValues>,
  callback: WatchObserver<TFieldValues>,
) => {
  useEffect(() => {
    const subscription = watch(callback)
    return () => subscription.unsubscribe()
  }, [watch, callback])
}
