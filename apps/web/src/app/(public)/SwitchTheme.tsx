'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import { isBrowser } from '@app/web/utils/isBrowser'

const getThemeFromHtmlTag = () => {
  if (!isBrowser) {
    return 'light'
  }

  // Get data-fr-scheme tag from html tag
  const htmlTag = document.getElementsByTagName('html')[0]
  const theme = htmlTag?.getAttribute('data-fr-scheme')
  return theme ?? 'light'
}

const setThemeToHtmlTag = (theme: 'light' | 'dark') => {
  if (!isBrowser) {
    return
  }
  const htmlTag = document.getElementsByTagName('html')[0]
  htmlTag?.setAttribute('data-fr-scheme', theme)
}

const SwitchTheme = () => {
  const [currentTheme, setCurrentTheme] = useState(getThemeFromHtmlTag())

  const changeThemeTo = currentTheme === 'light' ? 'dark' : 'light'

  const onChangeTheme = () => {
    setThemeToHtmlTag(changeThemeTo)
  }

  useEffect(() => {
    if (!isBrowser) {
      return
    }

    const observer = new MutationObserver(() => {
      setCurrentTheme(getThemeFromHtmlTag())
    })

    observer.observe(document.getElementsByTagName('html')[0], {
      attributes: true,
      attributeFilter: ['data-fr-scheme'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <button
      type="button"
      onClick={onChangeTheme}
      className="fr-btn fr-btn--tertiary-no-outline"
    >
      <span
        className={classNames(
          'fr-icon--sm fr-mr-1-5v',
          changeThemeTo === 'light' ? 'fr-icon-sun-line' : 'fr-icon-moon-line',
        )}
      />
      Basculer en thème {changeThemeTo === 'light' ? 'clair' : 'foncé'}
    </button>
  )
}

export default SwitchTheme
