import { notFound, redirect } from 'next/navigation'
import React from 'react'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { basePageQuery } from '@app/web/server/bases/getBase'
import BaseEditionHeader, {
  headerSkipLink,
} from '@app/web/components/Base/Edition/BaseEditionHeader'
import BaseEdition from '@app/web/components/Base/Edition/BaseEdition'
import { filterAccess } from '@app/web/server/bases/authorization'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

const BaseEditionPage = async ({ params }: { params: { slug: string } }) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/${params.slug}/editer`)
  }
  const base = await basePageQuery(decodeURI(params.slug), user)

  if (!base) {
    notFound()
  }

  const authorizations = filterAccess(base, user)
  if (!authorizations.authorized || !authorizations.isMember) {
    redirect(`/bases/${params.slug}`)
  }

  return (
    <>
      <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
      <BaseEditionHeader base={base} />
      <main id={contentId}>
        <BaseEdition base={base} isAdmin={authorizations.isAdmin} />
      </main>
    </>
  )
}

export default BaseEditionPage
