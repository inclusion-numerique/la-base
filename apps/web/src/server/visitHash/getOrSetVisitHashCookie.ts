import { createVisitHash } from '@app/web/server/visitHash/createVisitHash'
import { visitDuration } from '@app/web/server/visitHash/visitDuration'
import { visitHashCookie } from '@app/web/server/visitHash/visitHashCookie'
import { cookies } from 'next/headers'

export const getOrSetVisitHashCookie = async () => {
  // Set visit-hash cookie if not set, for registering resource view on browser page rendered
  const cookieStore = await cookies()

  const visitHash = cookieStore.get(visitHashCookie)?.value

  if (visitHash) {
    return visitHash
  }

  const newVisitHash = createVisitHash()

  cookieStore.set({
    name: visitHashCookie,
    value: newVisitHash,
    httpOnly: true,
    path: '/',
    // Expires in 2 hours
    expires: new Date(Date.now() + visitDuration),
  })

  return newVisitHash
}
