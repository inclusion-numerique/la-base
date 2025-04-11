import { redirect } from 'next/navigation'

const Page = () => {
  redirect('/administration/utilisateurs')
  return null
}

export default Page
