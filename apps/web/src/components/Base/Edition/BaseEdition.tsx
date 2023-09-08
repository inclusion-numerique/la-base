import React from 'react'
import classNames from 'classnames'
import { BasePageData } from '@app/web/server/bases/getBase'
import baseStyles from '../Create/CreateBase.module.css'
import SideMenu from './SideMenu'
import styles from './BaseEdition.module.css'
import BaseDeletion from './BaseDeletion'

const BaseEdition = ({ base }: { base: BasePageData }) => (
  <div className={classNames('fr-container', styles.container)}>
    <SideMenu />

    <div className={classNames('fr-mt-3w', baseStyles.card)} id="supprimer">
      <h5 className="fr-mb-1w">Supprimer la base</h5>
      <p className="fr-text--sm fr-hint-text fr-mb-0 wip">
        Texte explicatif sur la suppression des données ?
      </p>
      <hr className="fr-mt-4w fr-pb-4w" />
      <BaseDeletion base={base} />
    </div>
  </div>
)

export default BaseEdition
