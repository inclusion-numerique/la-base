// TODO This @app/web import is a cyclic dependency. See how to resolve this.
import { getServerBaseUrl } from '@app/web/utils/baseUrl'

export const emailAssetUrl = (assetPath: string): string =>
  `${getServerBaseUrl()}${assetPath}`
