import React from 'react'
import { Resource } from '@app/web/server/resources'
import PublishedInInformation from '../PublishedInInformation'
import EditionActionBar from './EditionActionBar'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import Separator from '../../Separator/Separator'
import EditableContent from './EditableContent'
import styles from './Edition.module.css'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import EditableImage from './EditableImage'
import AddContentButton from './AddContentButton'

const Edition = ({ resource }: { resource: Resource }) => (
  <>
    <div className="fr-container fr-pb-30v">
      <EditableContent>
        <PublishedInInformation resource={resource} />
      </EditableContent>
      <Separator className="fr-my-4w" />
      <div className="fr-mb-5w">
        <EditableImage />
      </div>
      <EditableContent>
        <div className={styles.title}>Titre & description de la ressource</div>
      </EditableContent>
      <h3>{resource.title}</h3>
      <div className="fr-text--xl">{resource.description}</div>
      <Separator className="fr-my-4w" />
      <div className={styles.title}>Contenu de la ressource</div>
      <AddContentButton />
    </div>
    <EditionActionBar
      publishedState={ResourcePublishedState.DRAFT}
      modificationState={ResourceModificationState.MODIFIED}
      actionLabel="Publier la ressource"
    />
  </>
)

export default Edition
