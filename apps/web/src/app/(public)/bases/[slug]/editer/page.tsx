import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import {
  BasePermissions,
  baseAuthorization,
} from '@app/web/authorization/models/baseAuthorization'
import BaseEdition from '@app/web/components/Base/Edition/BaseEdition'
import BaseEditionHeader, {
  headerSkipLink,
} from '@app/web/components/Base/Edition/BaseEditionHeader'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { prismaClient } from '@app/web/prismaClient'
import { basePageQuery } from '@app/web/server/bases/getBase'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> => {
  const { slug } = await params

  const base = await prismaClient.base.findUnique({
    where: {
      slug,
    },
    select: {
      title: true,
    },
  })
  if (!base) {
    notFound()
  }

  return {
    title: metadataTitle(`Editeur de base - ${base.title}`),
  }
}

const BaseEditionPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/bases/${slug}/editer`)
  }
  const base = await basePageQuery(decodeURI(slug), user)

  if (!base) {
    notFound()
  }

  const { hasPermission } = baseAuthorization(base, user)

  if (!hasPermission(BasePermissions.WriteBase)) {
    redirect(`/bases/${slug}`)
  }

  return (
    <>
      <SkipLinksPortal links={[headerSkipLink, ...defaultSkipLinks]} />
      <BaseEditionHeader base={base} />
      <main id={contentId}>
        <BaseEdition
          base={base}
          canDelete={hasPermission(BasePermissions.DeleteBase)}
        />
      </main>
    </>
  )
}

export default BaseEditionPage
