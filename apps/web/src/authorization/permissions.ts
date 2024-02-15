import { UserSecurityRole } from '@app/web/authorization/userSecurityRole'
import {
  ProfilePermission,
  ProfileRole,
} from '@app/web/authorization/models/profileAuthorization'
import {
  ResourcePermission,
  ResourceRole,
} from '@app/web/authorization/models/resourceAuthorization'
import {
  BasePermission,
  BaseRole,
} from '@app/web/authorization/models/baseAuthorization'
import {
  CollectionPermission,
  CollectionRole,
} from '@app/web/authorization/models/collectionAuthorization'

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
