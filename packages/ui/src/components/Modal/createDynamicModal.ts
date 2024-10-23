import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { create } from 'zustand'

type DynamicModalState<T> = {
  state: T
  setState: (state: T) => void
}

export const createDynamicModal = <T>({
  id,
  isOpenedByDefault,
  initialState,
}: {
  id: string
  isOpenedByDefault: boolean
  initialState: T
}) => {
  const createModalReturn = createModal({
    id,
    isOpenedByDefault,
  })

  const useModalStore = create<DynamicModalState<T>>((set) => ({
    state: initialState,
    setState: (state: T) => set({ state }),
  }))

  const useState = () => useModalStore((state) => state.state)

  const useOpen = () => {
    const setState = useModalStore((state) => state.setState)
    return (openState: T) => {
      // console.log('OPENING', { openState })
      setState(openState)
      // Sometimes dsfr has not bound the modal yet, and open() fails.
      // We want to retry 5 times before failing, with a 200ms delay
      let retries = 5
      const openIfBound = () => {
        try {
          createModalReturn.open()
        } catch (error) {
          if (retries > 0) {
            setTimeout(openIfBound, 200)
            retries -= 1
            return
          }
          throw error
        }
      }
      openIfBound()
    }
  }

  return { ...createModalReturn, useOpen, useState }
}

export type DynamicModalReturn<T> = ReturnType<typeof createDynamicModal<T>>
