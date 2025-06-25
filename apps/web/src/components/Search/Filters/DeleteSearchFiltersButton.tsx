import { searchUrl } from '@app/web/server/search/searchQueryParams'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const DeleteSearchFiltersButton = () => {
  const router = useRouter()

  const onClick = () => {
    router.push(
      searchUrl('ressources', {
        query: null,
        themes: [],
        resourceTypes: [],
        beneficiaries: [],
        professionalSectors: [],
        departements: [],
      }),
    )
  }
  return (
    <Button
      priority="tertiary no outline"
      size="small"
      iconId="fr-icon-close-circle-line"
      iconPosition="left"
      className="fr-whitespace-nowrap"
      onClick={onClick}
    >
      Effacer les filtres
    </Button>
  )
}

export default DeleteSearchFiltersButton
