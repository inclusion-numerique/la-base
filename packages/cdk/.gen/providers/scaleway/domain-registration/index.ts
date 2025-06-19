// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DomainRegistrationConfig extends cdktf.TerraformMetaArguments {
  /**
  * Enable or disable auto-renewal of the domain.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#auto_renew DomainRegistration#auto_renew}
  */
  readonly autoRenew?: boolean | cdktf.IResolvable;
  /**
  * Enable or disable dnssec for the domain.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#dnssec DomainRegistration#dnssec}
  */
  readonly dnssec?: boolean | cdktf.IResolvable;
  /**
  * List of domain names to be managed.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#domain_names DomainRegistration#domain_names}
  */
  readonly domainNames: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#duration_in_years DomainRegistration#duration_in_years}
  */
  readonly durationInYears?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#id DomainRegistration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * ID of the owner contact. Either `owner_contact_id` or `owner_contact` must be provided.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#owner_contact_id DomainRegistration#owner_contact_id}
  */
  readonly ownerContactId?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#project_id DomainRegistration#project_id}
  */
  readonly projectId?: string;
  /**
  * owner_contact block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#owner_contact DomainRegistration#owner_contact}
  */
  readonly ownerContact?: DomainRegistrationOwnerContact;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#timeouts DomainRegistration#timeouts}
  */
  readonly timeouts?: DomainRegistrationTimeouts;
}
export interface DomainRegistrationAdministrativeContactExtensionEu {
}

export function domainRegistrationAdministrativeContactExtensionEuToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionEuToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionEuOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionEu | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // european_citizenship - computed: true, optional: false, required: false
  public get europeanCitizenship() {
    return this.getStringAttribute('european_citizenship');
  }
}

export class DomainRegistrationAdministrativeContactExtensionEuList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionEuOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionEuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFrAssociationInfo {
}

export function domainRegistrationAdministrativeContactExtensionFrAssociationInfoToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrAssociationInfoToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFrAssociationInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // publication_jo - computed: true, optional: false, required: false
  public get publicationJo() {
    return this.getStringAttribute('publication_jo');
  }

  // publication_jo_page - computed: true, optional: false, required: false
  public get publicationJoPage() {
    return this.getNumberAttribute('publication_jo_page');
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrAssociationInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo {
}

export function domainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // code_auth_afnic - computed: true, optional: false, required: false
  public get codeAuthAfnic() {
    return this.getStringAttribute('code_auth_afnic');
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFrDunsInfo {
}

export function domainRegistrationAdministrativeContactExtensionFrDunsInfoToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrDunsInfoToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFrDunsInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // duns_id - computed: true, optional: false, required: false
  public get dunsId() {
    return this.getStringAttribute('duns_id');
  }

  // local_id - computed: true, optional: false, required: false
  public get localId() {
    return this.getStringAttribute('local_id');
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrDunsInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFrIndividualInfo {
}

export function domainRegistrationAdministrativeContactExtensionFrIndividualInfoToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrIndividualInfoToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFrIndividualInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // whois_opt_in - computed: true, optional: false, required: false
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrIndividualInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFrTrademarkInfo {
}

export function domainRegistrationAdministrativeContactExtensionFrTrademarkInfoToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrTrademarkInfoToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFrTrademarkInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // trademark_inpi - computed: true, optional: false, required: false
  public get trademarkInpi() {
    return this.getStringAttribute('trademark_inpi');
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrTrademarkInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContactExtensionFr {
}

export function domainRegistrationAdministrativeContactExtensionFrToTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactExtensionFrToHclTerraform(struct?: DomainRegistrationAdministrativeContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactExtensionFrOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // association_info - computed: true, optional: false, required: false
  private _associationInfo = new DomainRegistrationAdministrativeContactExtensionFrAssociationInfoList(this, "association_info", false);
  public get associationInfo() {
    return this._associationInfo;
  }

  // code_auth_afnic_info - computed: true, optional: false, required: false
  private _codeAuthAfnicInfo = new DomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoList(this, "code_auth_afnic_info", false);
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }

  // duns_info - computed: true, optional: false, required: false
  private _dunsInfo = new DomainRegistrationAdministrativeContactExtensionFrDunsInfoList(this, "duns_info", false);
  public get dunsInfo() {
    return this._dunsInfo;
  }

  // individual_info - computed: true, optional: false, required: false
  private _individualInfo = new DomainRegistrationAdministrativeContactExtensionFrIndividualInfoList(this, "individual_info", false);
  public get individualInfo() {
    return this._individualInfo;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // trademark_info - computed: true, optional: false, required: false
  private _trademarkInfo = new DomainRegistrationAdministrativeContactExtensionFrTrademarkInfoList(this, "trademark_info", false);
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
}

export class DomainRegistrationAdministrativeContactExtensionFrList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactExtensionFrOutputReference {
    return new DomainRegistrationAdministrativeContactExtensionFrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationAdministrativeContact {
}

export function domainRegistrationAdministrativeContactToTerraform(struct?: DomainRegistrationAdministrativeContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationAdministrativeContactToHclTerraform(struct?: DomainRegistrationAdministrativeContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationAdministrativeContactOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationAdministrativeContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationAdministrativeContact | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // address_line_1 - computed: true, optional: false, required: false
  public get addressLine1() {
    return this.getStringAttribute('address_line_1');
  }

  // address_line_2 - computed: true, optional: false, required: false
  public get addressLine2() {
    return this.getStringAttribute('address_line_2');
  }

  // city - computed: true, optional: false, required: false
  public get city() {
    return this.getStringAttribute('city');
  }

  // company_identification_code - computed: true, optional: false, required: false
  public get companyIdentificationCode() {
    return this.getStringAttribute('company_identification_code');
  }

  // company_name - computed: true, optional: false, required: false
  public get companyName() {
    return this.getStringAttribute('company_name');
  }

  // country - computed: true, optional: false, required: false
  public get country() {
    return this.getStringAttribute('country');
  }

  // email - computed: true, optional: false, required: false
  public get email() {
    return this.getStringAttribute('email');
  }

  // email_alt - computed: true, optional: false, required: false
  public get emailAlt() {
    return this.getStringAttribute('email_alt');
  }

  // extension_eu - computed: true, optional: false, required: false
  private _extensionEu = new DomainRegistrationAdministrativeContactExtensionEuList(this, "extension_eu", false);
  public get extensionEu() {
    return this._extensionEu;
  }

  // extension_fr - computed: true, optional: false, required: false
  private _extensionFr = new DomainRegistrationAdministrativeContactExtensionFrList(this, "extension_fr", false);
  public get extensionFr() {
    return this._extensionFr;
  }

  // extension_nl - computed: true, optional: false, required: false
  public get extensionNl() {
    return this.getListAttribute('extension_nl');
  }

  // fax_number - computed: true, optional: false, required: false
  public get faxNumber() {
    return this.getStringAttribute('fax_number');
  }

  // firstname - computed: true, optional: false, required: false
  public get firstname() {
    return this.getStringAttribute('firstname');
  }

  // lang - computed: true, optional: false, required: false
  public get lang() {
    return this.getStringAttribute('lang');
  }

  // lastname - computed: true, optional: false, required: false
  public get lastname() {
    return this.getStringAttribute('lastname');
  }

  // legal_form - computed: true, optional: false, required: false
  public get legalForm() {
    return this.getStringAttribute('legal_form');
  }

  // phone_number - computed: true, optional: false, required: false
  public get phoneNumber() {
    return this.getStringAttribute('phone_number');
  }

  // resale - computed: true, optional: false, required: false
  public get resale() {
    return this.getBooleanAttribute('resale');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // vat_identification_code - computed: true, optional: false, required: false
  public get vatIdentificationCode() {
    return this.getStringAttribute('vat_identification_code');
  }

  // whois_opt_in - computed: true, optional: false, required: false
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }

  // zip - computed: true, optional: false, required: false
  public get zip() {
    return this.getStringAttribute('zip');
  }
}

export class DomainRegistrationAdministrativeContactList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationAdministrativeContactOutputReference {
    return new DomainRegistrationAdministrativeContactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationDsRecordDigestPublicKey {
}

export function domainRegistrationDsRecordDigestPublicKeyToTerraform(struct?: DomainRegistrationDsRecordDigestPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationDsRecordDigestPublicKeyToHclTerraform(struct?: DomainRegistrationDsRecordDigestPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationDsRecordDigestPublicKeyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationDsRecordDigestPublicKey | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationDsRecordDigestPublicKey | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // key - computed: true, optional: false, required: false
  public get key() {
    return this.getStringAttribute('key');
  }
}

export class DomainRegistrationDsRecordDigestPublicKeyList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationDsRecordDigestPublicKeyOutputReference {
    return new DomainRegistrationDsRecordDigestPublicKeyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationDsRecordDigest {
}

export function domainRegistrationDsRecordDigestToTerraform(struct?: DomainRegistrationDsRecordDigest): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationDsRecordDigestToHclTerraform(struct?: DomainRegistrationDsRecordDigest): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationDsRecordDigestOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationDsRecordDigest | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationDsRecordDigest | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // digest - computed: true, optional: false, required: false
  public get digest() {
    return this.getStringAttribute('digest');
  }

  // public_key - computed: true, optional: false, required: false
  private _publicKey = new DomainRegistrationDsRecordDigestPublicKeyList(this, "public_key", false);
  public get publicKey() {
    return this._publicKey;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DomainRegistrationDsRecordDigestList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationDsRecordDigestOutputReference {
    return new DomainRegistrationDsRecordDigestOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationDsRecordPublicKey {
}

export function domainRegistrationDsRecordPublicKeyToTerraform(struct?: DomainRegistrationDsRecordPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationDsRecordPublicKeyToHclTerraform(struct?: DomainRegistrationDsRecordPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationDsRecordPublicKeyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationDsRecordPublicKey | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationDsRecordPublicKey | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // key - computed: true, optional: false, required: false
  public get key() {
    return this.getStringAttribute('key');
  }
}

export class DomainRegistrationDsRecordPublicKeyList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationDsRecordPublicKeyOutputReference {
    return new DomainRegistrationDsRecordPublicKeyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationDsRecord {
}

export function domainRegistrationDsRecordToTerraform(struct?: DomainRegistrationDsRecord): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationDsRecordToHclTerraform(struct?: DomainRegistrationDsRecord): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationDsRecordOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationDsRecord | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationDsRecord | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // algorithm - computed: true, optional: false, required: false
  public get algorithm() {
    return this.getStringAttribute('algorithm');
  }

  // digest - computed: true, optional: false, required: false
  private _digest = new DomainRegistrationDsRecordDigestList(this, "digest", false);
  public get digest() {
    return this._digest;
  }

  // key_id - computed: true, optional: false, required: false
  public get keyId() {
    return this.getNumberAttribute('key_id');
  }

  // public_key - computed: true, optional: false, required: false
  private _publicKey = new DomainRegistrationDsRecordPublicKeyList(this, "public_key", false);
  public get publicKey() {
    return this._publicKey;
  }
}

export class DomainRegistrationDsRecordList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationDsRecordOutputReference {
    return new DomainRegistrationDsRecordOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionEu {
}

export function domainRegistrationTechnicalContactExtensionEuToTerraform(struct?: DomainRegistrationTechnicalContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionEuToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionEuOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionEu | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // european_citizenship - computed: true, optional: false, required: false
  public get europeanCitizenship() {
    return this.getStringAttribute('european_citizenship');
  }
}

export class DomainRegistrationTechnicalContactExtensionEuList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionEuOutputReference {
    return new DomainRegistrationTechnicalContactExtensionEuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFrAssociationInfo {
}

export function domainRegistrationTechnicalContactExtensionFrAssociationInfoToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrAssociationInfoToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFrAssociationInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // publication_jo - computed: true, optional: false, required: false
  public get publicationJo() {
    return this.getStringAttribute('publication_jo');
  }

  // publication_jo_page - computed: true, optional: false, required: false
  public get publicationJoPage() {
    return this.getNumberAttribute('publication_jo_page');
  }
}

export class DomainRegistrationTechnicalContactExtensionFrAssociationInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo {
}

export function domainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // code_auth_afnic - computed: true, optional: false, required: false
  public get codeAuthAfnic() {
    return this.getStringAttribute('code_auth_afnic');
  }
}

export class DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFrDunsInfo {
}

export function domainRegistrationTechnicalContactExtensionFrDunsInfoToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrDunsInfoToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFrDunsInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // duns_id - computed: true, optional: false, required: false
  public get dunsId() {
    return this.getStringAttribute('duns_id');
  }

  // local_id - computed: true, optional: false, required: false
  public get localId() {
    return this.getStringAttribute('local_id');
  }
}

export class DomainRegistrationTechnicalContactExtensionFrDunsInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFrIndividualInfo {
}

export function domainRegistrationTechnicalContactExtensionFrIndividualInfoToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrIndividualInfoToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFrIndividualInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // whois_opt_in - computed: true, optional: false, required: false
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }
}

export class DomainRegistrationTechnicalContactExtensionFrIndividualInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFrTrademarkInfo {
}

export function domainRegistrationTechnicalContactExtensionFrTrademarkInfoToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrTrademarkInfoToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFrTrademarkInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // trademark_inpi - computed: true, optional: false, required: false
  public get trademarkInpi() {
    return this.getStringAttribute('trademark_inpi');
  }
}

export class DomainRegistrationTechnicalContactExtensionFrTrademarkInfoList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContactExtensionFr {
}

export function domainRegistrationTechnicalContactExtensionFrToTerraform(struct?: DomainRegistrationTechnicalContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactExtensionFrToHclTerraform(struct?: DomainRegistrationTechnicalContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactExtensionFrOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // association_info - computed: true, optional: false, required: false
  private _associationInfo = new DomainRegistrationTechnicalContactExtensionFrAssociationInfoList(this, "association_info", false);
  public get associationInfo() {
    return this._associationInfo;
  }

  // code_auth_afnic_info - computed: true, optional: false, required: false
  private _codeAuthAfnicInfo = new DomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoList(this, "code_auth_afnic_info", false);
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }

  // duns_info - computed: true, optional: false, required: false
  private _dunsInfo = new DomainRegistrationTechnicalContactExtensionFrDunsInfoList(this, "duns_info", false);
  public get dunsInfo() {
    return this._dunsInfo;
  }

  // individual_info - computed: true, optional: false, required: false
  private _individualInfo = new DomainRegistrationTechnicalContactExtensionFrIndividualInfoList(this, "individual_info", false);
  public get individualInfo() {
    return this._individualInfo;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // trademark_info - computed: true, optional: false, required: false
  private _trademarkInfo = new DomainRegistrationTechnicalContactExtensionFrTrademarkInfoList(this, "trademark_info", false);
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
}

export class DomainRegistrationTechnicalContactExtensionFrList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactExtensionFrOutputReference {
    return new DomainRegistrationTechnicalContactExtensionFrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationTechnicalContact {
}

export function domainRegistrationTechnicalContactToTerraform(struct?: DomainRegistrationTechnicalContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function domainRegistrationTechnicalContactToHclTerraform(struct?: DomainRegistrationTechnicalContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DomainRegistrationTechnicalContactOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DomainRegistrationTechnicalContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTechnicalContact | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // address_line_1 - computed: true, optional: false, required: false
  public get addressLine1() {
    return this.getStringAttribute('address_line_1');
  }

  // address_line_2 - computed: true, optional: false, required: false
  public get addressLine2() {
    return this.getStringAttribute('address_line_2');
  }

  // city - computed: true, optional: false, required: false
  public get city() {
    return this.getStringAttribute('city');
  }

  // company_identification_code - computed: true, optional: false, required: false
  public get companyIdentificationCode() {
    return this.getStringAttribute('company_identification_code');
  }

  // company_name - computed: true, optional: false, required: false
  public get companyName() {
    return this.getStringAttribute('company_name');
  }

  // country - computed: true, optional: false, required: false
  public get country() {
    return this.getStringAttribute('country');
  }

  // email - computed: true, optional: false, required: false
  public get email() {
    return this.getStringAttribute('email');
  }

  // email_alt - computed: true, optional: false, required: false
  public get emailAlt() {
    return this.getStringAttribute('email_alt');
  }

  // extension_eu - computed: true, optional: false, required: false
  private _extensionEu = new DomainRegistrationTechnicalContactExtensionEuList(this, "extension_eu", false);
  public get extensionEu() {
    return this._extensionEu;
  }

  // extension_fr - computed: true, optional: false, required: false
  private _extensionFr = new DomainRegistrationTechnicalContactExtensionFrList(this, "extension_fr", false);
  public get extensionFr() {
    return this._extensionFr;
  }

  // extension_nl - computed: true, optional: false, required: false
  public get extensionNl() {
    return this.getListAttribute('extension_nl');
  }

  // fax_number - computed: true, optional: false, required: false
  public get faxNumber() {
    return this.getStringAttribute('fax_number');
  }

  // firstname - computed: true, optional: false, required: false
  public get firstname() {
    return this.getStringAttribute('firstname');
  }

  // lang - computed: true, optional: false, required: false
  public get lang() {
    return this.getStringAttribute('lang');
  }

  // lastname - computed: true, optional: false, required: false
  public get lastname() {
    return this.getStringAttribute('lastname');
  }

  // legal_form - computed: true, optional: false, required: false
  public get legalForm() {
    return this.getStringAttribute('legal_form');
  }

  // phone_number - computed: true, optional: false, required: false
  public get phoneNumber() {
    return this.getStringAttribute('phone_number');
  }

  // resale - computed: true, optional: false, required: false
  public get resale() {
    return this.getBooleanAttribute('resale');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // vat_identification_code - computed: true, optional: false, required: false
  public get vatIdentificationCode() {
    return this.getStringAttribute('vat_identification_code');
  }

  // whois_opt_in - computed: true, optional: false, required: false
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }

  // zip - computed: true, optional: false, required: false
  public get zip() {
    return this.getStringAttribute('zip');
  }
}

export class DomainRegistrationTechnicalContactList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DomainRegistrationTechnicalContactOutputReference {
    return new DomainRegistrationTechnicalContactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DomainRegistrationOwnerContactExtensionEu {
  /**
  * Indicates the European citizenship of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#european_citizenship DomainRegistration#european_citizenship}
  */
  readonly europeanCitizenship?: string;
}

export function domainRegistrationOwnerContactExtensionEuToTerraform(struct?: DomainRegistrationOwnerContactExtensionEuOutputReference | DomainRegistrationOwnerContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    european_citizenship: cdktf.stringToTerraform(struct!.europeanCitizenship),
  }
}


export function domainRegistrationOwnerContactExtensionEuToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionEuOutputReference | DomainRegistrationOwnerContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    european_citizenship: {
      value: cdktf.stringToHclTerraform(struct!.europeanCitizenship),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionEuOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._europeanCitizenship !== undefined) {
      hasAnyValues = true;
      internalValueResult.europeanCitizenship = this._europeanCitizenship;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionEu | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._europeanCitizenship = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._europeanCitizenship = value.europeanCitizenship;
    }
  }

  // european_citizenship - computed: false, optional: true, required: false
  private _europeanCitizenship?: string; 
  public get europeanCitizenship() {
    return this.getStringAttribute('european_citizenship');
  }
  public set europeanCitizenship(value: string) {
    this._europeanCitizenship = value;
  }
  public resetEuropeanCitizenship() {
    this._europeanCitizenship = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get europeanCitizenshipInput() {
    return this._europeanCitizenship;
  }
}
export interface DomainRegistrationOwnerContactExtensionFrAssociationInfo {
  /**
  * Publication date in the Official Journal (RFC3339 format) for association information.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#publication_jo DomainRegistration#publication_jo}
  */
  readonly publicationJo?: string;
  /**
  * Page number of the publication in the Official Journal for association information.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#publication_jo_page DomainRegistration#publication_jo_page}
  */
  readonly publicationJoPage?: number;
}

export function domainRegistrationOwnerContactExtensionFrAssociationInfoToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference | DomainRegistrationOwnerContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    publication_jo: cdktf.stringToTerraform(struct!.publicationJo),
    publication_jo_page: cdktf.numberToTerraform(struct!.publicationJoPage),
  }
}


export function domainRegistrationOwnerContactExtensionFrAssociationInfoToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference | DomainRegistrationOwnerContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    publication_jo: {
      value: cdktf.stringToHclTerraform(struct!.publicationJo),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    publication_jo_page: {
      value: cdktf.numberToHclTerraform(struct!.publicationJoPage),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._publicationJo !== undefined) {
      hasAnyValues = true;
      internalValueResult.publicationJo = this._publicationJo;
    }
    if (this._publicationJoPage !== undefined) {
      hasAnyValues = true;
      internalValueResult.publicationJoPage = this._publicationJoPage;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFrAssociationInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._publicationJo = undefined;
      this._publicationJoPage = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._publicationJo = value.publicationJo;
      this._publicationJoPage = value.publicationJoPage;
    }
  }

  // publication_jo - computed: false, optional: true, required: false
  private _publicationJo?: string; 
  public get publicationJo() {
    return this.getStringAttribute('publication_jo');
  }
  public set publicationJo(value: string) {
    this._publicationJo = value;
  }
  public resetPublicationJo() {
    this._publicationJo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicationJoInput() {
    return this._publicationJo;
  }

  // publication_jo_page - computed: false, optional: true, required: false
  private _publicationJoPage?: number; 
  public get publicationJoPage() {
    return this.getNumberAttribute('publication_jo_page');
  }
  public set publicationJoPage(value: number) {
    this._publicationJoPage = value;
  }
  public resetPublicationJoPage() {
    this._publicationJoPage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicationJoPageInput() {
    return this._publicationJoPage;
  }
}
export interface DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo {
  /**
  * AFNIC authorization code for the contact (specific to French domains).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#code_auth_afnic DomainRegistration#code_auth_afnic}
  */
  readonly codeAuthAfnic?: string;
}

export function domainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference | DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    code_auth_afnic: cdktf.stringToTerraform(struct!.codeAuthAfnic),
  }
}


export function domainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference | DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    code_auth_afnic: {
      value: cdktf.stringToHclTerraform(struct!.codeAuthAfnic),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._codeAuthAfnic !== undefined) {
      hasAnyValues = true;
      internalValueResult.codeAuthAfnic = this._codeAuthAfnic;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._codeAuthAfnic = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._codeAuthAfnic = value.codeAuthAfnic;
    }
  }

  // code_auth_afnic - computed: false, optional: true, required: false
  private _codeAuthAfnic?: string; 
  public get codeAuthAfnic() {
    return this.getStringAttribute('code_auth_afnic');
  }
  public set codeAuthAfnic(value: string) {
    this._codeAuthAfnic = value;
  }
  public resetCodeAuthAfnic() {
    this._codeAuthAfnic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeAuthAfnicInput() {
    return this._codeAuthAfnic;
  }
}
export interface DomainRegistrationOwnerContactExtensionFrDunsInfo {
  /**
  * DUNS ID associated with the domain owner (for French domains).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#duns_id DomainRegistration#duns_id}
  */
  readonly dunsId?: string;
  /**
  * Local identifier of the domain owner (for French domains).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#local_id DomainRegistration#local_id}
  */
  readonly localId?: string;
}

export function domainRegistrationOwnerContactExtensionFrDunsInfoToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference | DomainRegistrationOwnerContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    duns_id: cdktf.stringToTerraform(struct!.dunsId),
    local_id: cdktf.stringToTerraform(struct!.localId),
  }
}


export function domainRegistrationOwnerContactExtensionFrDunsInfoToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference | DomainRegistrationOwnerContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    duns_id: {
      value: cdktf.stringToHclTerraform(struct!.dunsId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    local_id: {
      value: cdktf.stringToHclTerraform(struct!.localId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dunsId !== undefined) {
      hasAnyValues = true;
      internalValueResult.dunsId = this._dunsId;
    }
    if (this._localId !== undefined) {
      hasAnyValues = true;
      internalValueResult.localId = this._localId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFrDunsInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dunsId = undefined;
      this._localId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dunsId = value.dunsId;
      this._localId = value.localId;
    }
  }

  // duns_id - computed: false, optional: true, required: false
  private _dunsId?: string; 
  public get dunsId() {
    return this.getStringAttribute('duns_id');
  }
  public set dunsId(value: string) {
    this._dunsId = value;
  }
  public resetDunsId() {
    this._dunsId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dunsIdInput() {
    return this._dunsId;
  }

  // local_id - computed: false, optional: true, required: false
  private _localId?: string; 
  public get localId() {
    return this.getStringAttribute('local_id');
  }
  public set localId(value: string) {
    this._localId = value;
  }
  public resetLocalId() {
    this._localId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get localIdInput() {
    return this._localId;
  }
}
export interface DomainRegistrationOwnerContactExtensionFrIndividualInfo {
  /**
  * Whether the individual contact has opted into WHOIS publishing.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#whois_opt_in DomainRegistration#whois_opt_in}
  */
  readonly whoisOptIn?: boolean | cdktf.IResolvable;
}

export function domainRegistrationOwnerContactExtensionFrIndividualInfoToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference | DomainRegistrationOwnerContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    whois_opt_in: cdktf.booleanToTerraform(struct!.whoisOptIn),
  }
}


export function domainRegistrationOwnerContactExtensionFrIndividualInfoToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference | DomainRegistrationOwnerContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    whois_opt_in: {
      value: cdktf.booleanToHclTerraform(struct!.whoisOptIn),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._whoisOptIn !== undefined) {
      hasAnyValues = true;
      internalValueResult.whoisOptIn = this._whoisOptIn;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFrIndividualInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._whoisOptIn = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._whoisOptIn = value.whoisOptIn;
    }
  }

  // whois_opt_in - computed: false, optional: true, required: false
  private _whoisOptIn?: boolean | cdktf.IResolvable; 
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }
  public set whoisOptIn(value: boolean | cdktf.IResolvable) {
    this._whoisOptIn = value;
  }
  public resetWhoisOptIn() {
    this._whoisOptIn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whoisOptInInput() {
    return this._whoisOptIn;
  }
}
export interface DomainRegistrationOwnerContactExtensionFrTrademarkInfo {
  /**
  * Trademark information from INPI (French extension).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#trademark_inpi DomainRegistration#trademark_inpi}
  */
  readonly trademarkInpi?: string;
}

export function domainRegistrationOwnerContactExtensionFrTrademarkInfoToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference | DomainRegistrationOwnerContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    trademark_inpi: cdktf.stringToTerraform(struct!.trademarkInpi),
  }
}


export function domainRegistrationOwnerContactExtensionFrTrademarkInfoToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference | DomainRegistrationOwnerContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    trademark_inpi: {
      value: cdktf.stringToHclTerraform(struct!.trademarkInpi),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._trademarkInpi !== undefined) {
      hasAnyValues = true;
      internalValueResult.trademarkInpi = this._trademarkInpi;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFrTrademarkInfo | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._trademarkInpi = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._trademarkInpi = value.trademarkInpi;
    }
  }

  // trademark_inpi - computed: false, optional: true, required: false
  private _trademarkInpi?: string; 
  public get trademarkInpi() {
    return this.getStringAttribute('trademark_inpi');
  }
  public set trademarkInpi(value: string) {
    this._trademarkInpi = value;
  }
  public resetTrademarkInpi() {
    this._trademarkInpi = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trademarkInpiInput() {
    return this._trademarkInpi;
  }
}
export interface DomainRegistrationOwnerContactExtensionFr {
  /**
  * Mode of the French extension (e.g., 'individual', 'duns', 'association', etc.).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#mode DomainRegistration#mode}
  */
  readonly mode?: string;
  /**
  * association_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#association_info DomainRegistration#association_info}
  */
  readonly associationInfo?: DomainRegistrationOwnerContactExtensionFrAssociationInfo;
  /**
  * code_auth_afnic_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#code_auth_afnic_info DomainRegistration#code_auth_afnic_info}
  */
  readonly codeAuthAfnicInfo?: DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo;
  /**
  * duns_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#duns_info DomainRegistration#duns_info}
  */
  readonly dunsInfo?: DomainRegistrationOwnerContactExtensionFrDunsInfo;
  /**
  * individual_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#individual_info DomainRegistration#individual_info}
  */
  readonly individualInfo?: DomainRegistrationOwnerContactExtensionFrIndividualInfo;
  /**
  * trademark_info block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#trademark_info DomainRegistration#trademark_info}
  */
  readonly trademarkInfo?: DomainRegistrationOwnerContactExtensionFrTrademarkInfo;
}

export function domainRegistrationOwnerContactExtensionFrToTerraform(struct?: DomainRegistrationOwnerContactExtensionFrOutputReference | DomainRegistrationOwnerContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    mode: cdktf.stringToTerraform(struct!.mode),
    association_info: domainRegistrationOwnerContactExtensionFrAssociationInfoToTerraform(struct!.associationInfo),
    code_auth_afnic_info: domainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToTerraform(struct!.codeAuthAfnicInfo),
    duns_info: domainRegistrationOwnerContactExtensionFrDunsInfoToTerraform(struct!.dunsInfo),
    individual_info: domainRegistrationOwnerContactExtensionFrIndividualInfoToTerraform(struct!.individualInfo),
    trademark_info: domainRegistrationOwnerContactExtensionFrTrademarkInfoToTerraform(struct!.trademarkInfo),
  }
}


export function domainRegistrationOwnerContactExtensionFrToHclTerraform(struct?: DomainRegistrationOwnerContactExtensionFrOutputReference | DomainRegistrationOwnerContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    mode: {
      value: cdktf.stringToHclTerraform(struct!.mode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    association_info: {
      value: domainRegistrationOwnerContactExtensionFrAssociationInfoToHclTerraform(struct!.associationInfo),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrAssociationInfoList",
    },
    code_auth_afnic_info: {
      value: domainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct!.codeAuthAfnicInfo),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoList",
    },
    duns_info: {
      value: domainRegistrationOwnerContactExtensionFrDunsInfoToHclTerraform(struct!.dunsInfo),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrDunsInfoList",
    },
    individual_info: {
      value: domainRegistrationOwnerContactExtensionFrIndividualInfoToHclTerraform(struct!.individualInfo),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrIndividualInfoList",
    },
    trademark_info: {
      value: domainRegistrationOwnerContactExtensionFrTrademarkInfoToHclTerraform(struct!.trademarkInfo),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrTrademarkInfoList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactExtensionFrOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._mode !== undefined) {
      hasAnyValues = true;
      internalValueResult.mode = this._mode;
    }
    if (this._associationInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.associationInfo = this._associationInfo?.internalValue;
    }
    if (this._codeAuthAfnicInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.codeAuthAfnicInfo = this._codeAuthAfnicInfo?.internalValue;
    }
    if (this._dunsInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.dunsInfo = this._dunsInfo?.internalValue;
    }
    if (this._individualInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.individualInfo = this._individualInfo?.internalValue;
    }
    if (this._trademarkInfo?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.trademarkInfo = this._trademarkInfo?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._mode = undefined;
      this._associationInfo.internalValue = undefined;
      this._codeAuthAfnicInfo.internalValue = undefined;
      this._dunsInfo.internalValue = undefined;
      this._individualInfo.internalValue = undefined;
      this._trademarkInfo.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._mode = value.mode;
      this._associationInfo.internalValue = value.associationInfo;
      this._codeAuthAfnicInfo.internalValue = value.codeAuthAfnicInfo;
      this._dunsInfo.internalValue = value.dunsInfo;
      this._individualInfo.internalValue = value.individualInfo;
      this._trademarkInfo.internalValue = value.trademarkInfo;
    }
  }

  // mode - computed: false, optional: true, required: false
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  public resetMode() {
    this._mode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // association_info - computed: false, optional: true, required: false
  private _associationInfo = new DomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference(this, "association_info");
  public get associationInfo() {
    return this._associationInfo;
  }
  public putAssociationInfo(value: DomainRegistrationOwnerContactExtensionFrAssociationInfo) {
    this._associationInfo.internalValue = value;
  }
  public resetAssociationInfo() {
    this._associationInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get associationInfoInput() {
    return this._associationInfo.internalValue;
  }

  // code_auth_afnic_info - computed: false, optional: true, required: false
  private _codeAuthAfnicInfo = new DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference(this, "code_auth_afnic_info");
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }
  public putCodeAuthAfnicInfo(value: DomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo) {
    this._codeAuthAfnicInfo.internalValue = value;
  }
  public resetCodeAuthAfnicInfo() {
    this._codeAuthAfnicInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get codeAuthAfnicInfoInput() {
    return this._codeAuthAfnicInfo.internalValue;
  }

  // duns_info - computed: false, optional: true, required: false
  private _dunsInfo = new DomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference(this, "duns_info");
  public get dunsInfo() {
    return this._dunsInfo;
  }
  public putDunsInfo(value: DomainRegistrationOwnerContactExtensionFrDunsInfo) {
    this._dunsInfo.internalValue = value;
  }
  public resetDunsInfo() {
    this._dunsInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dunsInfoInput() {
    return this._dunsInfo.internalValue;
  }

  // individual_info - computed: false, optional: true, required: false
  private _individualInfo = new DomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference(this, "individual_info");
  public get individualInfo() {
    return this._individualInfo;
  }
  public putIndividualInfo(value: DomainRegistrationOwnerContactExtensionFrIndividualInfo) {
    this._individualInfo.internalValue = value;
  }
  public resetIndividualInfo() {
    this._individualInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get individualInfoInput() {
    return this._individualInfo.internalValue;
  }

  // trademark_info - computed: false, optional: true, required: false
  private _trademarkInfo = new DomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference(this, "trademark_info");
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
  public putTrademarkInfo(value: DomainRegistrationOwnerContactExtensionFrTrademarkInfo) {
    this._trademarkInfo.internalValue = value;
  }
  public resetTrademarkInfo() {
    this._trademarkInfo.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get trademarkInfoInput() {
    return this._trademarkInfo.internalValue;
  }
}
export interface DomainRegistrationOwnerContact {
  /**
  * Primary address line for the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#address_line_1 DomainRegistration#address_line_1}
  */
  readonly addressLine1: string;
  /**
  * Secondary address line for the contact (optional).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#address_line_2 DomainRegistration#address_line_2}
  */
  readonly addressLine2?: string;
  /**
  * City of the contact's address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#city DomainRegistration#city}
  */
  readonly city: string;
  /**
  * Company identification code (e.g., SIREN/SIRET in France) for the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#company_identification_code DomainRegistration#company_identification_code}
  */
  readonly companyIdentificationCode: string;
  /**
  * Name of the company associated with the contact (if applicable).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#company_name DomainRegistration#company_name}
  */
  readonly companyName?: string;
  /**
  * Country code of the contact's address (ISO format).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#country DomainRegistration#country}
  */
  readonly country: string;
  /**
  * Primary email address of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#email DomainRegistration#email}
  */
  readonly email: string;
  /**
  * Alternative email address for the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#email_alt DomainRegistration#email_alt}
  */
  readonly emailAlt?: string;
  /**
  * Extension details specific to Dutch domain registrations.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#extension_nl DomainRegistration#extension_nl}
  */
  readonly extensionNl?: string[];
  /**
  * Fax number for the contact (if available).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#fax_number DomainRegistration#fax_number}
  */
  readonly faxNumber?: string;
  /**
  * First name of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#firstname DomainRegistration#firstname}
  */
  readonly firstname: string;
  /**
  * Preferred language of the contact (e.g., 'en_US', 'fr_FR').
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#lang DomainRegistration#lang}
  */
  readonly lang?: string;
  /**
  * Last name of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#lastname DomainRegistration#lastname}
  */
  readonly lastname: string;
  /**
  * Legal form of the contact (e.g., 'individual' or 'organization').
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#legal_form DomainRegistration#legal_form}
  */
  readonly legalForm: string;
  /**
  * Primary phone number of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#phone_number DomainRegistration#phone_number}
  */
  readonly phoneNumber: string;
  /**
  * Indicates if the contact is used for resale purposes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#resale DomainRegistration#resale}
  */
  readonly resale?: boolean | cdktf.IResolvable;
  /**
  * State or region of the contact.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#state DomainRegistration#state}
  */
  readonly state?: string;
  /**
  * VAT identification code of the contact, if applicable.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#vat_identification_code DomainRegistration#vat_identification_code}
  */
  readonly vatIdentificationCode: string;
  /**
  * Indicates whether the contact has opted into WHOIS publishing.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#whois_opt_in DomainRegistration#whois_opt_in}
  */
  readonly whoisOptIn?: boolean | cdktf.IResolvable;
  /**
  * Postal code of the contact's address.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#zip DomainRegistration#zip}
  */
  readonly zip: string;
  /**
  * extension_eu block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#extension_eu DomainRegistration#extension_eu}
  */
  readonly extensionEu?: DomainRegistrationOwnerContactExtensionEu;
  /**
  * extension_fr block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#extension_fr DomainRegistration#extension_fr}
  */
  readonly extensionFr?: DomainRegistrationOwnerContactExtensionFr;
}

export function domainRegistrationOwnerContactToTerraform(struct?: DomainRegistrationOwnerContactOutputReference | DomainRegistrationOwnerContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address_line_1: cdktf.stringToTerraform(struct!.addressLine1),
    address_line_2: cdktf.stringToTerraform(struct!.addressLine2),
    city: cdktf.stringToTerraform(struct!.city),
    company_identification_code: cdktf.stringToTerraform(struct!.companyIdentificationCode),
    company_name: cdktf.stringToTerraform(struct!.companyName),
    country: cdktf.stringToTerraform(struct!.country),
    email: cdktf.stringToTerraform(struct!.email),
    email_alt: cdktf.stringToTerraform(struct!.emailAlt),
    extension_nl: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.extensionNl),
    fax_number: cdktf.stringToTerraform(struct!.faxNumber),
    firstname: cdktf.stringToTerraform(struct!.firstname),
    lang: cdktf.stringToTerraform(struct!.lang),
    lastname: cdktf.stringToTerraform(struct!.lastname),
    legal_form: cdktf.stringToTerraform(struct!.legalForm),
    phone_number: cdktf.stringToTerraform(struct!.phoneNumber),
    resale: cdktf.booleanToTerraform(struct!.resale),
    state: cdktf.stringToTerraform(struct!.state),
    vat_identification_code: cdktf.stringToTerraform(struct!.vatIdentificationCode),
    whois_opt_in: cdktf.booleanToTerraform(struct!.whoisOptIn),
    zip: cdktf.stringToTerraform(struct!.zip),
    extension_eu: domainRegistrationOwnerContactExtensionEuToTerraform(struct!.extensionEu),
    extension_fr: domainRegistrationOwnerContactExtensionFrToTerraform(struct!.extensionFr),
  }
}


export function domainRegistrationOwnerContactToHclTerraform(struct?: DomainRegistrationOwnerContactOutputReference | DomainRegistrationOwnerContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    address_line_1: {
      value: cdktf.stringToHclTerraform(struct!.addressLine1),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    address_line_2: {
      value: cdktf.stringToHclTerraform(struct!.addressLine2),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    city: {
      value: cdktf.stringToHclTerraform(struct!.city),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    company_identification_code: {
      value: cdktf.stringToHclTerraform(struct!.companyIdentificationCode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    company_name: {
      value: cdktf.stringToHclTerraform(struct!.companyName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    country: {
      value: cdktf.stringToHclTerraform(struct!.country),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    email: {
      value: cdktf.stringToHclTerraform(struct!.email),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    email_alt: {
      value: cdktf.stringToHclTerraform(struct!.emailAlt),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extension_nl: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.extensionNl),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    fax_number: {
      value: cdktf.stringToHclTerraform(struct!.faxNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    firstname: {
      value: cdktf.stringToHclTerraform(struct!.firstname),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    lang: {
      value: cdktf.stringToHclTerraform(struct!.lang),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    lastname: {
      value: cdktf.stringToHclTerraform(struct!.lastname),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    legal_form: {
      value: cdktf.stringToHclTerraform(struct!.legalForm),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    phone_number: {
      value: cdktf.stringToHclTerraform(struct!.phoneNumber),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    resale: {
      value: cdktf.booleanToHclTerraform(struct!.resale),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    state: {
      value: cdktf.stringToHclTerraform(struct!.state),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    vat_identification_code: {
      value: cdktf.stringToHclTerraform(struct!.vatIdentificationCode),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    whois_opt_in: {
      value: cdktf.booleanToHclTerraform(struct!.whoisOptIn),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    zip: {
      value: cdktf.stringToHclTerraform(struct!.zip),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    extension_eu: {
      value: domainRegistrationOwnerContactExtensionEuToHclTerraform(struct!.extensionEu),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionEuList",
    },
    extension_fr: {
      value: domainRegistrationOwnerContactExtensionFrToHclTerraform(struct!.extensionFr),
      isBlock: true,
      type: "list",
      storageClassType: "DomainRegistrationOwnerContactExtensionFrList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationOwnerContactOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): DomainRegistrationOwnerContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._addressLine1 !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressLine1 = this._addressLine1;
    }
    if (this._addressLine2 !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressLine2 = this._addressLine2;
    }
    if (this._city !== undefined) {
      hasAnyValues = true;
      internalValueResult.city = this._city;
    }
    if (this._companyIdentificationCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.companyIdentificationCode = this._companyIdentificationCode;
    }
    if (this._companyName !== undefined) {
      hasAnyValues = true;
      internalValueResult.companyName = this._companyName;
    }
    if (this._country !== undefined) {
      hasAnyValues = true;
      internalValueResult.country = this._country;
    }
    if (this._email !== undefined) {
      hasAnyValues = true;
      internalValueResult.email = this._email;
    }
    if (this._emailAlt !== undefined) {
      hasAnyValues = true;
      internalValueResult.emailAlt = this._emailAlt;
    }
    if (this._extensionNl !== undefined) {
      hasAnyValues = true;
      internalValueResult.extensionNl = this._extensionNl;
    }
    if (this._faxNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.faxNumber = this._faxNumber;
    }
    if (this._firstname !== undefined) {
      hasAnyValues = true;
      internalValueResult.firstname = this._firstname;
    }
    if (this._lang !== undefined) {
      hasAnyValues = true;
      internalValueResult.lang = this._lang;
    }
    if (this._lastname !== undefined) {
      hasAnyValues = true;
      internalValueResult.lastname = this._lastname;
    }
    if (this._legalForm !== undefined) {
      hasAnyValues = true;
      internalValueResult.legalForm = this._legalForm;
    }
    if (this._phoneNumber !== undefined) {
      hasAnyValues = true;
      internalValueResult.phoneNumber = this._phoneNumber;
    }
    if (this._resale !== undefined) {
      hasAnyValues = true;
      internalValueResult.resale = this._resale;
    }
    if (this._state !== undefined) {
      hasAnyValues = true;
      internalValueResult.state = this._state;
    }
    if (this._vatIdentificationCode !== undefined) {
      hasAnyValues = true;
      internalValueResult.vatIdentificationCode = this._vatIdentificationCode;
    }
    if (this._whoisOptIn !== undefined) {
      hasAnyValues = true;
      internalValueResult.whoisOptIn = this._whoisOptIn;
    }
    if (this._zip !== undefined) {
      hasAnyValues = true;
      internalValueResult.zip = this._zip;
    }
    if (this._extensionEu?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.extensionEu = this._extensionEu?.internalValue;
    }
    if (this._extensionFr?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.extensionFr = this._extensionFr?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationOwnerContact | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._addressLine1 = undefined;
      this._addressLine2 = undefined;
      this._city = undefined;
      this._companyIdentificationCode = undefined;
      this._companyName = undefined;
      this._country = undefined;
      this._email = undefined;
      this._emailAlt = undefined;
      this._extensionNl = undefined;
      this._faxNumber = undefined;
      this._firstname = undefined;
      this._lang = undefined;
      this._lastname = undefined;
      this._legalForm = undefined;
      this._phoneNumber = undefined;
      this._resale = undefined;
      this._state = undefined;
      this._vatIdentificationCode = undefined;
      this._whoisOptIn = undefined;
      this._zip = undefined;
      this._extensionEu.internalValue = undefined;
      this._extensionFr.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._addressLine1 = value.addressLine1;
      this._addressLine2 = value.addressLine2;
      this._city = value.city;
      this._companyIdentificationCode = value.companyIdentificationCode;
      this._companyName = value.companyName;
      this._country = value.country;
      this._email = value.email;
      this._emailAlt = value.emailAlt;
      this._extensionNl = value.extensionNl;
      this._faxNumber = value.faxNumber;
      this._firstname = value.firstname;
      this._lang = value.lang;
      this._lastname = value.lastname;
      this._legalForm = value.legalForm;
      this._phoneNumber = value.phoneNumber;
      this._resale = value.resale;
      this._state = value.state;
      this._vatIdentificationCode = value.vatIdentificationCode;
      this._whoisOptIn = value.whoisOptIn;
      this._zip = value.zip;
      this._extensionEu.internalValue = value.extensionEu;
      this._extensionFr.internalValue = value.extensionFr;
    }
  }

  // address_line_1 - computed: false, optional: false, required: true
  private _addressLine1?: string; 
  public get addressLine1() {
    return this.getStringAttribute('address_line_1');
  }
  public set addressLine1(value: string) {
    this._addressLine1 = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addressLine1Input() {
    return this._addressLine1;
  }

  // address_line_2 - computed: false, optional: true, required: false
  private _addressLine2?: string; 
  public get addressLine2() {
    return this.getStringAttribute('address_line_2');
  }
  public set addressLine2(value: string) {
    this._addressLine2 = value;
  }
  public resetAddressLine2() {
    this._addressLine2 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressLine2Input() {
    return this._addressLine2;
  }

  // city - computed: false, optional: false, required: true
  private _city?: string; 
  public get city() {
    return this.getStringAttribute('city');
  }
  public set city(value: string) {
    this._city = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cityInput() {
    return this._city;
  }

  // company_identification_code - computed: false, optional: false, required: true
  private _companyIdentificationCode?: string; 
  public get companyIdentificationCode() {
    return this.getStringAttribute('company_identification_code');
  }
  public set companyIdentificationCode(value: string) {
    this._companyIdentificationCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get companyIdentificationCodeInput() {
    return this._companyIdentificationCode;
  }

  // company_name - computed: false, optional: true, required: false
  private _companyName?: string; 
  public get companyName() {
    return this.getStringAttribute('company_name');
  }
  public set companyName(value: string) {
    this._companyName = value;
  }
  public resetCompanyName() {
    this._companyName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get companyNameInput() {
    return this._companyName;
  }

  // country - computed: false, optional: false, required: true
  private _country?: string; 
  public get country() {
    return this.getStringAttribute('country');
  }
  public set country(value: string) {
    this._country = value;
  }
  // Temporarily expose input value. Use with caution.
  public get countryInput() {
    return this._country;
  }

  // email - computed: false, optional: false, required: true
  private _email?: string; 
  public get email() {
    return this.getStringAttribute('email');
  }
  public set email(value: string) {
    this._email = value;
  }
  // Temporarily expose input value. Use with caution.
  public get emailInput() {
    return this._email;
  }

  // email_alt - computed: false, optional: true, required: false
  private _emailAlt?: string; 
  public get emailAlt() {
    return this.getStringAttribute('email_alt');
  }
  public set emailAlt(value: string) {
    this._emailAlt = value;
  }
  public resetEmailAlt() {
    this._emailAlt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get emailAltInput() {
    return this._emailAlt;
  }

  // extension_nl - computed: true, optional: true, required: false
  private _extensionNl?: string[]; 
  public get extensionNl() {
    return this.getListAttribute('extension_nl');
  }
  public set extensionNl(value: string[]) {
    this._extensionNl = value;
  }
  public resetExtensionNl() {
    this._extensionNl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionNlInput() {
    return this._extensionNl;
  }

  // fax_number - computed: false, optional: true, required: false
  private _faxNumber?: string; 
  public get faxNumber() {
    return this.getStringAttribute('fax_number');
  }
  public set faxNumber(value: string) {
    this._faxNumber = value;
  }
  public resetFaxNumber() {
    this._faxNumber = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get faxNumberInput() {
    return this._faxNumber;
  }

  // firstname - computed: false, optional: false, required: true
  private _firstname?: string; 
  public get firstname() {
    return this.getStringAttribute('firstname');
  }
  public set firstname(value: string) {
    this._firstname = value;
  }
  // Temporarily expose input value. Use with caution.
  public get firstnameInput() {
    return this._firstname;
  }

  // lang - computed: true, optional: true, required: false
  private _lang?: string; 
  public get lang() {
    return this.getStringAttribute('lang');
  }
  public set lang(value: string) {
    this._lang = value;
  }
  public resetLang() {
    this._lang = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get langInput() {
    return this._lang;
  }

  // lastname - computed: false, optional: false, required: true
  private _lastname?: string; 
  public get lastname() {
    return this.getStringAttribute('lastname');
  }
  public set lastname(value: string) {
    this._lastname = value;
  }
  // Temporarily expose input value. Use with caution.
  public get lastnameInput() {
    return this._lastname;
  }

  // legal_form - computed: false, optional: false, required: true
  private _legalForm?: string; 
  public get legalForm() {
    return this.getStringAttribute('legal_form');
  }
  public set legalForm(value: string) {
    this._legalForm = value;
  }
  // Temporarily expose input value. Use with caution.
  public get legalFormInput() {
    return this._legalForm;
  }

  // phone_number - computed: false, optional: false, required: true
  private _phoneNumber?: string; 
  public get phoneNumber() {
    return this.getStringAttribute('phone_number');
  }
  public set phoneNumber(value: string) {
    this._phoneNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get phoneNumberInput() {
    return this._phoneNumber;
  }

  // resale - computed: false, optional: true, required: false
  private _resale?: boolean | cdktf.IResolvable; 
  public get resale() {
    return this.getBooleanAttribute('resale');
  }
  public set resale(value: boolean | cdktf.IResolvable) {
    this._resale = value;
  }
  public resetResale() {
    this._resale = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get resaleInput() {
    return this._resale;
  }

  // state - computed: false, optional: true, required: false
  private _state?: string; 
  public get state() {
    return this.getStringAttribute('state');
  }
  public set state(value: string) {
    this._state = value;
  }
  public resetState() {
    this._state = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get stateInput() {
    return this._state;
  }

  // vat_identification_code - computed: false, optional: false, required: true
  private _vatIdentificationCode?: string; 
  public get vatIdentificationCode() {
    return this.getStringAttribute('vat_identification_code');
  }
  public set vatIdentificationCode(value: string) {
    this._vatIdentificationCode = value;
  }
  // Temporarily expose input value. Use with caution.
  public get vatIdentificationCodeInput() {
    return this._vatIdentificationCode;
  }

  // whois_opt_in - computed: false, optional: true, required: false
  private _whoisOptIn?: boolean | cdktf.IResolvable; 
  public get whoisOptIn() {
    return this.getBooleanAttribute('whois_opt_in');
  }
  public set whoisOptIn(value: boolean | cdktf.IResolvable) {
    this._whoisOptIn = value;
  }
  public resetWhoisOptIn() {
    this._whoisOptIn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get whoisOptInInput() {
    return this._whoisOptIn;
  }

  // zip - computed: false, optional: false, required: true
  private _zip?: string; 
  public get zip() {
    return this.getStringAttribute('zip');
  }
  public set zip(value: string) {
    this._zip = value;
  }
  // Temporarily expose input value. Use with caution.
  public get zipInput() {
    return this._zip;
  }

  // extension_eu - computed: false, optional: true, required: false
  private _extensionEu = new DomainRegistrationOwnerContactExtensionEuOutputReference(this, "extension_eu");
  public get extensionEu() {
    return this._extensionEu;
  }
  public putExtensionEu(value: DomainRegistrationOwnerContactExtensionEu) {
    this._extensionEu.internalValue = value;
  }
  public resetExtensionEu() {
    this._extensionEu.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionEuInput() {
    return this._extensionEu.internalValue;
  }

  // extension_fr - computed: false, optional: true, required: false
  private _extensionFr = new DomainRegistrationOwnerContactExtensionFrOutputReference(this, "extension_fr");
  public get extensionFr() {
    return this._extensionFr;
  }
  public putExtensionFr(value: DomainRegistrationOwnerContactExtensionFr) {
    this._extensionFr.internalValue = value;
  }
  public resetExtensionFr() {
    this._extensionFr.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extensionFrInput() {
    return this._extensionFr.internalValue;
  }
}
export interface DomainRegistrationTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#create DomainRegistration#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#default DomainRegistration#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#delete DomainRegistration#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#read DomainRegistration#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#update DomainRegistration#update}
  */
  readonly update?: string;
}

export function domainRegistrationTimeoutsToTerraform(struct?: DomainRegistrationTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function domainRegistrationTimeoutsToHclTerraform(struct?: DomainRegistrationTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read: {
      value: cdktf.stringToHclTerraform(struct!.read),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class DomainRegistrationTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DomainRegistrationTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DomainRegistrationTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._read = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._default = value.default;
      this._delete = value.delete;
      this._read = value.read;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // default - computed: false, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration scaleway_domain_registration}
*/
export class DomainRegistration extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_domain_registration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DomainRegistration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DomainRegistration to import
  * @param importFromId The id of the existing DomainRegistration that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DomainRegistration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_domain_registration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/domain_registration scaleway_domain_registration} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DomainRegistrationConfig
  */
  public constructor(scope: Construct, id: string, config: DomainRegistrationConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_domain_registration',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.53.0',
        providerVersionConstraint: '>= 2.53.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._autoRenew = config.autoRenew;
    this._dnssec = config.dnssec;
    this._domainNames = config.domainNames;
    this._durationInYears = config.durationInYears;
    this._id = config.id;
    this._ownerContactId = config.ownerContactId;
    this._projectId = config.projectId;
    this._ownerContact.internalValue = config.ownerContact;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // administrative_contact - computed: true, optional: false, required: false
  private _administrativeContact = new DomainRegistrationAdministrativeContactList(this, "administrative_contact", false);
  public get administrativeContact() {
    return this._administrativeContact;
  }

  // auto_renew - computed: false, optional: true, required: false
  private _autoRenew?: boolean | cdktf.IResolvable; 
  public get autoRenew() {
    return this.getBooleanAttribute('auto_renew');
  }
  public set autoRenew(value: boolean | cdktf.IResolvable) {
    this._autoRenew = value;
  }
  public resetAutoRenew() {
    this._autoRenew = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoRenewInput() {
    return this._autoRenew;
  }

  // dnssec - computed: false, optional: true, required: false
  private _dnssec?: boolean | cdktf.IResolvable; 
  public get dnssec() {
    return this.getBooleanAttribute('dnssec');
  }
  public set dnssec(value: boolean | cdktf.IResolvable) {
    this._dnssec = value;
  }
  public resetDnssec() {
    this._dnssec = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnssecInput() {
    return this._dnssec;
  }

  // domain_names - computed: false, optional: false, required: true
  private _domainNames?: string[]; 
  public get domainNames() {
    return this.getListAttribute('domain_names');
  }
  public set domainNames(value: string[]) {
    this._domainNames = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNamesInput() {
    return this._domainNames;
  }

  // ds_record - computed: true, optional: false, required: false
  private _dsRecord = new DomainRegistrationDsRecordList(this, "ds_record", false);
  public get dsRecord() {
    return this._dsRecord;
  }

  // duration_in_years - computed: false, optional: true, required: false
  private _durationInYears?: number; 
  public get durationInYears() {
    return this.getNumberAttribute('duration_in_years');
  }
  public set durationInYears(value: number) {
    this._durationInYears = value;
  }
  public resetDurationInYears() {
    this._durationInYears = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get durationInYearsInput() {
    return this._durationInYears;
  }

  // id - computed: true, optional: true, required: false
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  public resetId() {
    this._id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // owner_contact_id - computed: true, optional: true, required: false
  private _ownerContactId?: string; 
  public get ownerContactId() {
    return this.getStringAttribute('owner_contact_id');
  }
  public set ownerContactId(value: string) {
    this._ownerContactId = value;
  }
  public resetOwnerContactId() {
    this._ownerContactId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerContactIdInput() {
    return this._ownerContactId;
  }

  // project_id - computed: true, optional: true, required: false
  private _projectId?: string; 
  public get projectId() {
    return this.getStringAttribute('project_id');
  }
  public set projectId(value: string) {
    this._projectId = value;
  }
  public resetProjectId() {
    this._projectId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get projectIdInput() {
    return this._projectId;
  }

  // task_id - computed: true, optional: false, required: false
  public get taskId() {
    return this.getStringAttribute('task_id');
  }

  // technical_contact - computed: true, optional: false, required: false
  private _technicalContact = new DomainRegistrationTechnicalContactList(this, "technical_contact", false);
  public get technicalContact() {
    return this._technicalContact;
  }

  // owner_contact - computed: false, optional: true, required: false
  private _ownerContact = new DomainRegistrationOwnerContactOutputReference(this, "owner_contact");
  public get ownerContact() {
    return this._ownerContact;
  }
  public putOwnerContact(value: DomainRegistrationOwnerContact) {
    this._ownerContact.internalValue = value;
  }
  public resetOwnerContact() {
    this._ownerContact.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerContactInput() {
    return this._ownerContact.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DomainRegistrationTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DomainRegistrationTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      auto_renew: cdktf.booleanToTerraform(this._autoRenew),
      dnssec: cdktf.booleanToTerraform(this._dnssec),
      domain_names: cdktf.listMapper(cdktf.stringToTerraform, false)(this._domainNames),
      duration_in_years: cdktf.numberToTerraform(this._durationInYears),
      id: cdktf.stringToTerraform(this._id),
      owner_contact_id: cdktf.stringToTerraform(this._ownerContactId),
      project_id: cdktf.stringToTerraform(this._projectId),
      owner_contact: domainRegistrationOwnerContactToTerraform(this._ownerContact.internalValue),
      timeouts: domainRegistrationTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      auto_renew: {
        value: cdktf.booleanToHclTerraform(this._autoRenew),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      dnssec: {
        value: cdktf.booleanToHclTerraform(this._dnssec),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      domain_names: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._domainNames),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      duration_in_years: {
        value: cdktf.numberToHclTerraform(this._durationInYears),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      owner_contact_id: {
        value: cdktf.stringToHclTerraform(this._ownerContactId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      owner_contact: {
        value: domainRegistrationOwnerContactToHclTerraform(this._ownerContact.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "DomainRegistrationOwnerContactList",
      },
      timeouts: {
        value: domainRegistrationTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "DomainRegistrationTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
