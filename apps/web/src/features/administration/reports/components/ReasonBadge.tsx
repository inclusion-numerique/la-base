import { Badge } from '@codegouvfr/react-dsfr/Badge'

export const ReasonBadge = ({ reason }: { reason: string }) => {
  const getReasonLabel = (reason: string) => {
    switch (reason) {
      case 'Inappropriate':
        return 'Le contenu est inapproprié'
      case 'Outdated':
        return 'Le contenu est obsolète'
      case 'Errors':
        return 'Il y a des erreurs'
      case 'Duplicate':
        return "C'est le doublon d'une autre ressource"
      default:
        return reason
    }
  }
  return (
    <Badge severity="warning" className="fr-text--uppercase">
      {getReasonLabel(reason)}
    </Badge>
  )
}
