import React from 'react'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Button from '@codegouvfr/react-dsfr/Button'
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
