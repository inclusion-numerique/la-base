import { Resource } from '@app/web/server/resources'
import React from 'react'
import TextContent from '@app/web/components/Resource/View/TextContent'
import SectionTitleContent from '@app/web/components/Resource/View/SectionTitleContent'
import Alert from '@codegouvfr/react-dsfr/Alert'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import styles from './ResourceContents.module.css'

const ResourceContents = ({
  resource: { title, description, contents, image },
}: {
  resource: Resource
}) => (
  <>
    <div>
      <div>PUBLIE LE</div>
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
    ) : null}
    <h1>{title}</h1>
    <p>{description}</p>
    <hr />
    <ResourcesViewsAndMetadata />
    <hr className="fr-mt-6v fr-mb-2v" />
    {contents.map((content) => {
      switch (content.type) {
        case 'Text': {
          return <TextContent key={content.id} content={content} />
        }
        case 'SectionTitle': {
          return <SectionTitleContent key={content.id} content={content} />
        }
        default: {
          return (
            <Alert
              severity="info"
              key={content.id}
              title={`Type de contenu ${content.type} en cours d'implémentation`}
            />
          )
        }
      }
    })}
    <pre>{JSON.stringify(contents, null, 2)}</pre>
  </>
)

export default ResourceContents
