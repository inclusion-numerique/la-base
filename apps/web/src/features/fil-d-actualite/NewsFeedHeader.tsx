import Badge from '@codegouvfr/react-dsfr/Badge'

export const NewsFeedHeader = () => (
  <div className="fr-flex fr-direction-column fr-col-8 fr-ml-auto fr-flex-gap-2v">
    <span className="fr-text--xl fr-mb-0">
      Découvrez les dernières publications liés à vos préférences
    </span>
    <Badge severity="new" small>
      4 nouvelles ressources depuis votre dernière visite
    </Badge>
  </div>
)
