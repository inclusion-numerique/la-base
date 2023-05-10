import React from 'react'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import SectionTitleContent from '@app/web/components/Resource/View/SectionTitleContent'
import TextContent from '@app/web/components/Resource/View/TextContent'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource, ResourceContent } from '@app/web/server/resources'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from './ResourceContents.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const getContent = (content: ResourceContent) => {
  switch (content.type) {
    case 'Text': {
      return <TextContent content={content} />
    }
    case 'SectionTitle': {
      return <SectionTitleContent content={content} />
    }
    default: {
      return (
        <Alert
          severity="info"
          title={`Type de contenu ${content.type} en cours d'implémentation`}
        />
      )
    }
  }
}

const ResourceContents = ({
  resource: { title, description, contents, image, created, updated },
  contentRefs,
  visibleRefIndex,
}: {
  resource: Resource
  contentRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>
  visibleRefIndex: number | null
}) => {
  const publishedDay = dateAsDay(created)
  const updatedDay = dateAsDay(updated)
  return (
    <>
      <div className={styles.dateInformations}>
        <div className="fr-text--xs fr-mb-0">
          <b className="fr-mr-2w">Publié le {dateAsDay(created)}</b>
          {publishedDay !== updatedDay && ` Modifié le ${updatedDay}`}
        </div>
        <div className="fr-hidden fr-unhidden-md">
          <Button
            className="fr-mr-1w"
            title="Télécharger la ressource"
            iconId="fr-icon-download-line"
            priority="tertiary"
            size="small"
          />
          <Button
            title="Partager la ressource"
            iconId="fr-icon-links-line"
            priority="tertiary"
            size="small"
          />
        </div>
      </div>
      {image ? (
        <ResponsiveUploadedImage
          id={image.id}
          alt={image.altText ?? ''}
          className={styles.image}
          breakpoints={[
            { media: '(max-width: 320px)', width: 320 - 32 },
            { media: '(max-width: 576px)', width: 576 - 32 },
            { media: '(max-width: 768px)', width: 768 - 32 },
            { media: '(min-width: 768px)', width: 800 },
          ]}
        />
      ) : null}{' '}
      <h3 className="fr-mb-2w">{title}</h3>
      <p className="fr-text--lg fr-mb-0">{description}</p>
      <Badge className="fr-hidden-md fr-my-1w" small noIcon severity="success">
        Très recommandée
      </Badge>
      <hr className="fr-hidden fr-unhidden-md fr-mt-4w" />
      <ResourcesViewsAndMetadata />
      <div className="fr-hidden-md fr-my-4w">
        <ResourceSideMenu
          visibleRefIndex={visibleRefIndex}
          contents={contents}
        />
      </div>
      <hr className="fr-mt-6v fr-mb-2v" />
      {contents.map((content, index) => (
        <div
          key={content.id}
          ref={contentRefs.current[index]}
          id={`section-${index + 1}`}
        >
          {getContent(content)}
        </div>
      ))}
    </>
  )
}

export default ResourceContents
