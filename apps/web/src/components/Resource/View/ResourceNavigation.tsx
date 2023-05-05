import React from 'react'
import Link from 'next/link'
import { Resource } from '@app/web/server/resources'

const ResourceNavigation = ({ resource: { slug } }: { resource: Resource }) => (
  <Link className="fr-btn" href={`/ressources/${slug}/editer`}>
    Modifier
  </Link>
)

export default ResourceNavigation
