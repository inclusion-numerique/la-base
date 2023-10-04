import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import styles from './ResourceInformations.module.css'
import ResourceIndexation from './ResourceIndexation'

const ResourceInformations = ({ resource }: { resource: Resource }) => (
  <>
    <h6 id="informations" className={styles.title}>
      Informations sur la resource
    </h6>
    <ResourceIndexation resource={resource} withLink />
  </>
)

export default ResourceInformations
