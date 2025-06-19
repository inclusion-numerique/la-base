import type { SessionUser } from '@app/web/auth/sessionUser'
import type { AppContext } from '@app/web/server/rpc/createContext'
import type { TRPCRequestInfo } from '@trpc/server/http'

export const testContextInfo = {
  accept: null,
  type: 'unknown',
  isBatchCall: false,
  calls: [],
  connectionParams: null,
  signal: new AbortController().signal,
  url: null,
} satisfies TRPCRequestInfo

export const createTestContext = ({
  user,
  resHeaders,
  info,
  req,
}: {
  user: SessionUser | null
  resHeaders?: Headers
  req?: Request
  info?: TRPCRequestInfo
}): AppContext => ({
  resHeaders: resHeaders ?? (null as unknown as Headers),
  req: req ?? (null as unknown as Request),
  info: info ?? testContextInfo,
  user,
  sessionToken: 'test-session-token',
})
