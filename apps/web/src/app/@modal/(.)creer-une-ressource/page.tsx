import CreateResourceModal from '@app/web/app/@modal/(.)creer-une-ressource/CreateResourceModal'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'

const CreateResourceModalPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/creer-une-ressource')
  }

  return <CreateResourceModal user={user} />
}

export default CreateResourceModalPage
