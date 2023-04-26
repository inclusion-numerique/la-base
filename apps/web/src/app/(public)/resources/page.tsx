import React from 'react'
import { getResourcesList } from '@app/web/server/resources'
import ResourceCard from '@app/web/components/Resource'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'

export const revalidate = 0

const Resources = async () => {
  const resources = await getResourcesList()

  return (
    <>
      <Breadcrumb
        currentPageLabel="Resources"
        homeLinkProps={{
          href: '/',
        }}
        segments={[]}
      />
      {resources.map((resource) => (
        <ResourceCard key={resource.title} resource={resource} />
      ))}
    </>
  )
}

export default Resources
