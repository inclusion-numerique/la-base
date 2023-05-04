import { Resource } from '@app/web/server/resources'
import React from 'react'
import { SessionUser } from '@app/web/auth/sessionUser'
import TextContent from '@app/web/components/Resource/View/TextContent'
import SectionTitleContent from '@app/web/components/Resource/View/SectionTitleContent'
import Alert from '@codegouvfr/react-dsfr/Alert'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import styles from './ResourceContents.module.css'

const ResourceContents = ({
  resource: { title, description, contents },
  user,
}: {
  resource: Resource
  user?: SessionUser | null
}) => {
  const menu = []
  return (
    <>
      <div>
        <div>PUBLIE LE</div>
        <picture>IMAGE TODO</picture>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <hr />
      <ResourcesViewsAndMetadata />
      <hr className="fr-mt-6v fr-mb-2v" />
      {contents.map((content, index) => {
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
      })}
      <pre>{JSON.stringify(contents, null, 2)}</pre>
    </>
  )
}

export default ResourceContents
