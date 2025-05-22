import EmptyBox from '@app/web/components/EmptyBox'
import {
  defaultSearchParams,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import Link from 'next/link'
import React from 'react'
import { CreateBaseButton } from '../../../../components/Base/CreateBaseButton'

const EmptyBases = ({
  canWrite,
  isOwner,
}: {
  canWrite: boolean
  isOwner: boolean
}) => (
  <EmptyBox
    title={
      isOwner
        ? 'Actuellement, vous n’êtes pas membre d’une base'
        : "Ce profil n'est membre d’aucune base"
    }
  >
    {canWrite ? (
      <>
        Une base est une communauté d’utilisateurs qui souhaitent créer, publier
        & contribuer à des ressources dans une démarche collaborative. Vous
        pouvez créer votre propre base ou rejoindre une base existante en vous
        faisant inviter par un administrateur de cette base.
        <div className="fr-mt-8v">
          <CreateBaseButton className="fr-btn--secondary" />
          <Link
            className="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-search-line fr-ml-2w"
            href={searchUrl('bases', defaultSearchParams)}
          >
            Explorer les bases
          </Link>
        </div>
      </>
    ) : (
      <>
        Une base est une communauté d’utilisateurs qui souhaitent créer, publier
        & contribuer à des ressources dans une démarche collaborative.
        <Link
          className="fr-mt-8v fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-search-line"
          href={searchUrl('bases', defaultSearchParams)}
        >
          Explorer les bases
        </Link>
      </>
    )}
  </EmptyBox>
)

export default EmptyBases
