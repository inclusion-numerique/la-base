import { isBrowser } from '@app/web/utils/isBrowser'

// Define the event handler outside the function scope for reuse
const handlePopState = (event: PopStateEvent) => {
  event.preventDefault()
}

export const replaceRouteWithoutRerender = (path: string) => {
  if (!isBrowser) {
    return
  }

  // Attach event listener within the function scope
  window.addEventListener('popstate', handlePopState)

  if (window.location.pathname !== path) {
    window.history.replaceState(
      { ...window.history.state, as: path, url: path },
      '',
      path,
    )

    // Optionally detach the listener here if it's no longer needed
    window.removeEventListener('popstate', handlePopState)
  }
}
