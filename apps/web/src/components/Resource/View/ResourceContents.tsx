import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import ContentView from '@app/web/components/Resource/Contents/ContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from './ResourceContents.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const ResourceContents = ({
  resource: { title, description, contents, image, created, updated },
  contentRefs,
  visibleRefIndex,
}: {
  resource: Resource
  contentRefs: React.MutableRefObject<
    Record<string, React.RefObject<HTMLDivElement>>
  >
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
      {contents.map((content) => (
        <div
          key={content.id}
          ref={contentRefs.current[content.id]}
          id={`section-${content.id}`}
          className={styles.content}
        >
          <ContentView content={content} />
          <hr className="fr-mt-5w fr-mb-2w" />
        </div>
      ))}
    </>
  )
}

export default ResourceContents
