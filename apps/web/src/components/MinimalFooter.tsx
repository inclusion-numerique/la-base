import { publicFooterProps } from '@app/web/app/(public)/PublicFooter'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'
import { FooterBottomItem } from '@codegouvfr/react-dsfr/Footer'
import classNames from 'classnames'
import React from 'react'
import styles from './MinimalFooter.module.css'

const MinimalFooter = async () => {
  const initialTheme = await getServerDsfrTheme()

  return (
    <footer
      role="contentinfo"
      id="fr-footer"
      className={classNames(
        'fr-footer__bottom fr-px-8v fr-no-print',
        styles.footer,
      )}
    >
      <ul className="fr-footer__bottom-list">
        {...publicFooterProps.bottomItems.map((bottomItem, index) => (
          <li className="fr-footer__bottom-item" key={index}>
            {'text' in bottomItem ? (
              <FooterBottomItem bottomItem={bottomItem} />
            ) : (
              bottomItem
            )}
          </li>
        ))}
        <li className="fr-footer__bottom-item">
          <SwitchTheme key="switch-theme" initialTheme={initialTheme} />
        </li>
      </ul>
    </footer>
  )
}

export default MinimalFooter
