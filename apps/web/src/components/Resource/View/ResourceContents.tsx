import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import ContentView from '@app/web/components/Resource/Contents/ContentView'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { Resource } from '@app/web/server/resources/getResource'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import { getResourceSectionIdAttribute } from '@app/web/components/Resource/View/getResourceSectionIdAttribute'
import styles from './ResourceContents.module.css'
import ResourceSideMenu from './ResourceSideMenu'

const PublishedAndUpdated = ({
  className,
  updated,
  created,
}: {
  className?: string
  created: Date
  updated: Date
}) => {
  const publishedDay = dateAsDay(created)
  const updatedDay = dateAsDay(updated)

  return (
    <div className={classNames('fr-text--xs fr-mb-0', className)}>
      <b className="fr-mr-1w">Publié le {dateAsDay(created)}</b>
      {publishedDay !== updatedDay && (
        <>
          <span className={styles.publishedAndUpdatedSeparator} />
          <span className="fr-ml-1w">
            {publishedDay !== updatedDay && ` Mis à jour le ${updatedDay}`}
          </span>
        </>
      )}
    </div>
  )
}

const ResourceContents = ({
  resource: { title, description, contents, image, created, updated },
}: {
  resource: Resource
}) => (
  <>
    <div className={styles.dateInformations}>
      <PublishedAndUpdated
        created={created}
        updated={updated}
        className="fr-hidden fr-unhidden-lg"
      />
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
      <div className={styles.imageContainer}>
        <ResponsiveUploadedImage
          id={image.id}
          alt={image.altText ?? ''}
          breakpoints={[
            { media: '(max-width: 320px)', width: 320 - 32 },
            { media: '(max-width: 576px)', width: 576 - 32 },
            { media: '(max-width: 768px)', width: 768 - 32 },
            { media: '(min-width: 768px)', width: 588 },
          ]}
        />
      </div>
    ) : null}
    <PublishedAndUpdated
      created={created}
      updated={updated}
      className={classNames('fr-hidden-lg', !!image && 'fr-mt-4v')}
    />
    <h3 className={classNames('fr-mb-2w', styles.title)}>{title}</h3>
    <p className="fr-text--lg fr-mb-0">{description}</p>
    <Badge className="fr-hidden-md fr-my-1w" small noIcon severity="success">
      Très recommandée
    </Badge>
    <hr id="contenu" className="fr-hidden fr-unhidden-md fr-mt-8v" />
    <ResourcesViewsAndMetadata className={styles.viewsAndMetadata} />
    <div className="fr-hidden-md fr-mb-8v">
      <ResourceSideMenu contents={contents} />
    </div>
    {contents.map((content, index) => (
      <div
        key={content.id}
        id={`${getResourceSectionIdAttribute(content, index)}`}
        className={classNames(styles.content, index === 0 && 'is-first')}
      >
        <ContentView content={content} />
      </div>
    ))}
  </>
)

export default ResourceContents
