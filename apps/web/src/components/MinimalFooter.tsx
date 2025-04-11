import { FooterBottomItem } from '@codegouvfr/react-dsfr/Footer'
import classNames from 'classnames'
import React from 'react'
import { publicFooterProps } from '@app/web/app/(public)/PublicFooter'
import SwitchTheme from '@app/web/app/(public)/SwitchTheme'
import { getServerDsfrTheme } from '@app/web/app/getServerDsfrTheme'
import styles from './MinimalFooter.module.css'

const MinimalFooter = () => (
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
        // eslint-disable-next-line react/no-array-index-key
        <li className="fr-footer__bottom-item" key={index}>
          {'text' in bottomItem ? (
            <FooterBottomItem bottomItem={bottomItem} />
          ) : (
            bottomItem
          )}
        </li>
      ))}
      <li className="fr-footer__bottom-item">
        <SwitchTheme key="switch-theme" initialTheme={getServerDsfrTheme()} />
      </li>
    </ul>
  </footer>
)

export default MinimalFooter
