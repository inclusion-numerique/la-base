import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
import SearchBar from '@app/web/components/Search/SearchBar'
import styles from './Banner.module.css'

const Banner = () => (
  <div className={styles.container}>
    <div className="fr-container">
      <h1 className="fr-mb-4v">Les Bases du numérique d’intérêt général</h1>
      <Notice
        className="fr-notice--new fr-my-10v fr-mx-auto"
        style={{ maxWidth: 640 }}
        title={
          <span className="fr-flex fr-justify-content-space-between fr-align-items-center fr-direction-column fr-direction-md-row fr-flex-gap-1v">
            <span>Bienvenue sur la nouvelle version&nbsp;!</span>
            <Button
              iconId="fr-icon-arrow-right-line"
              priority="tertiary no outline"
              linkProps={{ href: '/nouveautes' }}
              iconPosition="right"
            >
              Découvrir les nouveautés
            </Button>
          </span>
        }
      />
      <p className="fr-text--xl fr-mb-12v">
        La plateforme collaborative de partage de ressources & communs
        numériques à l’échelle nationale.
      </p>
      <SearchBar />
    </div>
  </div>
)

export default Banner
