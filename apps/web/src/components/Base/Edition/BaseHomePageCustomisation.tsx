'use client'

import BaseHomePageCustomisationEdition from '@app/web/components/Base/Edition/BaseHomePageCustomisationEdition'
import { BaseHomePageCustomisationView } from '@app/web/components/Base/Edition/BaseHomePageCustomisationView'
import EditCard from '@app/web/components/EditCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BasePageData } from '@app/web/server/bases/getBase'
import {
  UpdateBaseHomePageCustomisationCommand,
  UpdateBaseHomePageCustomisationCommandValidation,
} from '@app/web/server/bases/updateBase'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { HighlightResourcesType } from '@prisma/client'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const BaseHomePageCustomisation = ({ base }: { base: BasePageData }) => {
  const form = useForm<UpdateBaseHomePageCustomisationCommand>({
    resolver: zodResolver(UpdateBaseHomePageCustomisationCommandValidation),
    defaultValues: {
      highlightCollections: base.highlightCollections,
      highlightResources: base.highlightResources,
    },
  })
  const mutate = trpc.base.mutate.useMutation()
  const resourceDescription =
    base.highlightResources &&
    base.highlightResources === HighlightResourcesType.LatestPublished
      ? 'Vos 3 dernières ressources publiées sont mises en avant.'
      : base.highlightResources === HighlightResourcesType.MostViewed
        ? 'Vos 3 ressources les plus vues sont mises en avant.'
        : 'Vos 3 ressources les plus recommandées sont mises en avant.'

  return (
    <EditCard
      noBorder
      id="personnalisation"
      mutation={async (data) => {
        await mutate.mutateAsync({ id: base.id, data })
      }}
      form={form}
      className="fr-mt-3w"
      title="Personnalisation page d'accueil"
      titleAs="h2"
      description={
        <span className="fr-text--sm">
          Mettez en avant des contenus (ressources, collections...) directement
          sur la page d’accueil de votre base.&nbsp;
          <br className="fr-hidden-sm fr-unhidden" />
          <Link
            href="https://docs.numerique.gouv.fr/docs/d43b7269-474c-4f12-a46d-8002c181dc55/"
            target="_blank"
            rel="noopener noreferrer"
            className="fr-link fr-text--sm"
          >
            En savoir plus
          </Link>
        </span>
      }
      edition={<BaseHomePageCustomisationEdition form={form} />}
      view={
        <div className="fr-flex fr-direction-column fr-flex-gap-3w">
          <BaseHomePageCustomisationView
            title="Ressources à la une"
            description={resourceDescription}
            isEnabled={!!base.highlightResources}
          />
          <hr className="fr-mt-4w fr-pb-4w" />
          <BaseHomePageCustomisationView
            title="Collections à la une"
            description="Vos 3 premières collections sont mises en avant."
            isEnabled={base.highlightCollections}
          />
        </div>
      }
    />
  )
}

export default withTrpc(BaseHomePageCustomisation)
