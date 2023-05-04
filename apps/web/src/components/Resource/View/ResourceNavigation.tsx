import { Resource } from '@app/web/server/resources'
import React from 'react'
import Link from 'next/link'
import { SessionUser } from '@app/web/auth/sessionUser'

const ResourceNavigation = ({
  resource: { slug },
  user,
}: {
  resource: Resource
  user?: SessionUser | null
}) => {
  const menu = []
  return (
    <Link className="fr-btn" href={`/ressources/${slug}/editer`}>
      Modifier
    </Link>
  )
}

export default ResourceNavigation
