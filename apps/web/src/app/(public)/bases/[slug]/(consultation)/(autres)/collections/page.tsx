import { getBasePageContext } from '@app/web/app/(public)/bases/[slug]/(consultation)/getBasePageContext'
import { BasePermissions } from '@app/web/authorization/models/baseAuthorization'
import { CreateCollectionButton } from '@app/web/components/Collection/CreateCollectionButton'
import Collections from '@app/web/components/Collection/List/Collections'
import EmptyBox from '@app/web/components/EmptyBox'
import Link from 'next/link'

const BaseCollectionsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const {
    authorization: { hasPermission },
    base,
  } = await getBasePageContext(slug)

  const canWrite = hasPermission(BasePermissions.WriteBase)

  const { collections, id } = base
  return (
    <Collections
      collections={collections}
      withCreation={canWrite}
      baseId={id}
      baseSlug={slug}
      collectionsLabel="Collections"
      emptyBox={
        canWrite ? (
          <EmptyBox
            title="Vous n’avez pas de collection dans cette base"
            titleAs="h3"
          >
            <p>
              Créez une collection pour organiser et partager facilement des
              ressources.&nbsp;
              <Link
                href="https://docs.numerique.gouv.fr/docs/5f8d928b-2fd7-4f4a-b8fd-ca9c841dc841/"
                className="fr-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                En savoir plus
              </Link>
            </p>
            <div data-testid="create-resource-button">
              <CreateCollectionButton
                baseId={id}
                title="Créer une collection"
              />
            </div>
          </EmptyBox>
        ) : (
          <EmptyBox title="Cette base n’a pas créé de collections" titleAs="h3">
            Revenez plus tard ou suivez cette base afin d’être tenu informé de
            ses prochaines publications.
          </EmptyBox>
        )
      }
    />
  )
}

export default BaseCollectionsPage
