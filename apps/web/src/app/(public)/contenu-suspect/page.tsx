import { SuspiciousContentError } from '@app/web/components/ServerError'

export const metadata = {
  title: 'Contenu suspect détecté',
}

export default function ContenuSuspectPage() {
  return <SuspiciousContentError />
}
