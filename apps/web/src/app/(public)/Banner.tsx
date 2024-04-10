import React from 'react'
import Link from 'next/link'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Banner.module.css'

const Banner = () => (
  <div className={styles.container}>
    <div className="fr-container">
      <h1 className="fr-mb-4v">Les Bases du numérique d’intérêt général</h1>
      <p className="fr-text--xl fr-mb-12v">
        La plateforme collaborative de partage de ressources & communs
        numériques à l’échelle nationale.
      </p>
      <SearchBar />
      <div className="fr-my-4v">
        <Link href="/rechercher/tout/ressources" className="fr-link">
          <span className="fr-icon--sm fr-icon-file-text-line fr-mr-1v" />
          Voir toutes les ressources
        </Link>
      </div>
    </div>
  </div>
)

export default Banner
