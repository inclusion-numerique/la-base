import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceInformations.module.css'
import ResourceIndexationView from './ResourceIndexationView'

const ResourceInformations = ({ resource }: { resource: Resource }) => (
  <>
    <h6 id="informations" className={styles.title}>
      Informations sur la ressource
    </h6>
    <ResourceIndexationView
      resource={resource}
      withLink
      supportTypes
      targetAudiences
      themes
      titleClassName="fr-text--sm fr-text--medium"
      tagsClassName="fr-mt-1v"
    />
  </>
)

export default ResourceInformations
