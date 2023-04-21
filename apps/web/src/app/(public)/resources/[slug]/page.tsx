import React from 'react'
import BreadCrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { notFound } from 'next/navigation'
import { getResource, getResourcesSlug } from '@app/web/server/resources'

export const dynamic = 'force-static'

// populate the [slug] dynamic segment
export const generateStaticParams = (): Promise<{ slug: string }[]> =>
  getResourcesSlug()

const ResourcePage = async ({ params }: { params: { slug: string } }) => {
  const resource = await getResource(decodeURI(params.slug))
  if (!resource) {
    notFound()
  }

  return (
    <>
      <BreadCrumb
        currentPageLabel={resource.title}
        homeLinkProps={{
          href: '/',
        }}
        segments={[{ label: 'Resources', linkProps: { href: '/resources' } }]}
      />
      <h1>{resource.title}</h1>
    </>
  )
}

export default ResourcePage
