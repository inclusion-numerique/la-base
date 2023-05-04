import React from 'react'
import { Resource } from '@app/web/server/resources'
import PublishedInInformation from '../PublishedInInformation'
import EditionActionBar from './EditionActionBar'
import { ResourcePublishedState } from '../enums/ResourcePublishedState'
import Separator from '../../Separator/Separator'
import EditableContent from './EditableContent'
import { ResourceModificationState } from '../enums/ResourceModificationState'
import EditableImage from './EditableImage'
import AddContentButton from './AddContentButton'
import TitleEdition from './TitleEdition'
import styles from './Edition.module.css'

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
      <TitleEdition resource={resource} />
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
