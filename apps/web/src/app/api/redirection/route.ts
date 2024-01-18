import { NextResponse } from 'next/server'
import { mapLegacyPath } from '@app/web/legacyRedirection/legacyRedirection'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const handler = async (request: Request) => {
  const baseUrl = process.env.BASE_URL
  const httpsBase = `https://${baseUrl ?? ''}`
  const requestUrl = new URL(request.url)

  const originParam = requestUrl.searchParams.get('origin') ?? ''

  let originUrl: URL

  try {
    originUrl = new URL(originParam)
  } catch {
    return new NextResponse(
      JSON.stringify({ error: '"origin" query parameter must be a valid URL' }),
      { status: 400 },
    )
  }

  console.log('HTTPS BASE', httpsBase)

  const migratedPath = await mapLegacyPath(originUrl)

  const redirectTo = `${httpsBase}${migratedPath}`

  console.log('REDIRECTTO', redirectTo)

  // 301 permanent and post => get
  return NextResponse.redirect(redirectTo, { status: 301 })
}
export { handler as GET, handler as POST }
