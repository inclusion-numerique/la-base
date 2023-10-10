import React from 'react'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Banner.module.css'

const Banner = () => (
  <div className={styles.container}>
    <div className="fr-container">
      <h1 className="fr-mb-2w">La Base du numérique d’intérêt général</h1>
      <p className="fr-text--xl fr-mb-6w">
        La plateforme collaborative de partage de ressources & communs
        numériques à l’échelle nationale.
      </p>
      <SearchBar />
    </div>
  </div>
)

export default Banner
