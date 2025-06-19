import { RefObject, useCallback, useEffect, useRef, useState } from 'react'

export const useScrollToBottom = ({
  containerRef,
  ignoreOffset: _ignoreOffset = 30,
}: {
  containerRef: RefObject<HTMLElement | null>
  ignoreOffset?: number // The offset above which a user not scrolled to the bottom will disable the behavior
}) => {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true)

  const isAutoScrolling = useRef(false)

  // vérifie la position du scroll
  const onScroll = useCallback(() => {
    // Do not listen if currently auto scrolling
    // TODO if user is scrolling manually, we should disable auto scrolling
    if (isAutoScrolling.current) {
      return
    }

    const container = containerRef.current
    if (!container) return
    const { scrollTop, scrollHeight, clientHeight } = container
    const threshold = 20 // tolérance en pixels
    // si le scroll est quasiment en bas, on considère que c'est le bas
    if (scrollTop + clientHeight >= scrollHeight - threshold) {
      setIsScrolledToBottom(true)
    } else {
      setIsScrolledToBottom(false)
    }
  }, [containerRef.current])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('scroll', onScroll)
    // vérifier la position initiale du scroll
    onScroll()

    return () => container.removeEventListener('scroll', onScroll)
  }, [containerRef.current, onScroll])

  const scrollToBottom = useCallback(() => {
    const containerElement = containerRef.current

    if (!containerElement) {
      return
    }
    setIsScrolledToBottom(true)

    const { scrollTop, scrollHeight, clientHeight } = containerElement

    const lastElement = containerElement.lastElementChild ?? containerElement

    const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight

    if (!isScrolledToBottom) {
      isAutoScrolling.current = true

      lastElement.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'end',
      })
      setTimeout(() => {
        isAutoScrolling.current = false
      }, 750)
    }
  }, [containerRef.current])

  return { scrollToBottom, isScrolledToBottom }
}
