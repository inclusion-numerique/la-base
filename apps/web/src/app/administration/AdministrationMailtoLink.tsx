import classNames from 'classnames'
import Link from 'next/link'

const AdministrationMailtoLink = ({
  email,
  className,
}: {
  email: string
  className?: string
}) => (
  <Link href={`mailto:${email}`} className={classNames('fr-link', className)}>
    {email} <span className="fr-icon-mail-line fr-icon--sm" />
  </Link>
)

export default AdministrationMailtoLink
