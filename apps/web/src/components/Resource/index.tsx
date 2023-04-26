import React from 'react'
import Card from '@codegouvfr/react-dsfr/Card'
import { ResourceItem } from '@app/web/server/resources'

const ResourceCard = ({ resource }: { resource: ResourceItem }) => (
  <Card
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Fix dynamic route
    linkProps={{ href: `/ressources/${resource.slug}` }}
    title={resource.title}
  />
)

export default ResourceCard
