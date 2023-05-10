import { Route } from 'next'
import React from 'react'
import { Tag } from '@codegouvfr/react-dsfr/Tag'
import styles from './ResourceInformations.module.css'

const thematiques = [
  'Insertion professionnelle',
  ' Communication en ligne / réseaux sociaux',
  'Insertion professionnelle 2',
]
const supports = ['Support pédagogique', 'Logiciel / Application']
const publics = ['Public cible 1', 'Public cible 2']

const ResourceInformations = () => (
  <>
    <h6 id="informations">Informations sur la resource</h6>
    <p className="fr-text--sm fr-mb-1w">
      <b>Thématiques</b>
    </p>
    <div className={styles.tags}>
      {thematiques.map((thematique) => (
        <Tag key={thematique} linkProps={{ href: '#' as Route }}>
          {thematique}
        </Tag>
      ))}
    </div>
    <p className="fr-text--sm fr-mb-1w">
      <b>Type de support</b>
    </p>
    <div className={styles.tags}>
      {supports.map((support) => (
        <Tag key={support} linkProps={{ href: '#' as Route }}>
          {support}
        </Tag>
      ))}
    </div>
    <p className="fr-text--sm fr-mb-1w">
      <b>Publics cibles</b>
    </p>
    <div className={styles.tags}>
      {publics.map((p) => (
        <Tag key={p} linkProps={{ href: '#' as Route }}>
          {p}
        </Tag>
      ))}
    </div>
  </>
)

export default ResourceInformations
