import { isBrowser } from '@app/web/utils/isBrowser'

export const download = (url: string, filename?: string) => {
  if (!isBrowser) {
    return
  }
  // Create a link and set the URL using `createObjectURL`
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  if (filename) {
    link.download = filename
  }

  // It needs to be added to the DOM so it can be clicked
  document.body.append(link)
  link.click()

  // To make this work on Firefox we need to wait
  // before removing it.
  requestAnimationFrame(() => {
    link.remove()
  })
}
