import Link from 'next/link'
import EmptyBox from '../EmptyBox'

const EmptyProfileInformations = ({
  isOwner,
  canWrite,
}: {
  isOwner: boolean
  canWrite: boolean
}) => (
  <EmptyBox
    title={
      isOwner
        ? 'Vous n’avez pas encore partagé vos informations sur votre profil'
        : 'Ce profil ne partage pas d’informations'
    }
  >
    {canWrite ? (
      <>
        <p className="fr-mb-0">
          Présentez-vous et partagez vos informations de contact.
        </p>
        <Link
          data-testid="empty-profile-edition-button"
          className="fr-mt-4w fr-btn fr-icon-edit-line fr-btn--icon-left"
          href="./modifier"
        >
          Modifier le profil
        </Link>
      </>
    ) : (
      <p className="fr-mb-0">
        Revenez plus tard ou suivez ce profil afin d’être tenu informé de ses
        prochaines publications.
      </p>
    )}
  </EmptyBox>
)

export default EmptyProfileInformations
