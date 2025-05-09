import type {
  BasePermission,
  BaseRole,
} from '@app/web/authorization/models/baseAuthorization'
import type {
  CollectionPermission,
  CollectionRole,
} from '@app/web/authorization/models/collectionAuthorization'
import type {
  ProfilePermission,
  ProfileRole,
} from '@app/web/authorization/models/profileAuthorization'
import type {
  ResourcePermission,
  ResourceRole,
} from '@app/web/authorization/models/resourceAuthorization'
import type { UserSecurityRole } from '@app/web/authorization/userSecurityRole'

export type Role =
  | UserSecurityRole
  | ProfileRole
  | ResourceRole
  | BaseRole
  | CollectionRole

export type Permission =
  | ProfilePermission
  | ResourcePermission
  | BasePermission
  | CollectionPermission
