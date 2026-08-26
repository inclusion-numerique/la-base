// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayDomainRegistrationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The domain name to look up (e.g. example.com).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration#domain_name DataScalewayDomainRegistration#domain_name}
  */
  readonly domainName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration#id DataScalewayDomainRegistration#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration#project_id DataScalewayDomainRegistration#project_id}
  */
  readonly projectId?: string;
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionEu {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionEuToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionEuToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionEuOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionEu | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionEuList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionEuOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionEuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfo {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfo | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfo | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfo {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfo | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfo {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfo | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfo {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfo | undefined) {
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

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContactExtensionFr {
}

export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactExtensionFrToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // association_info - computed: true, optional: false, required: false
  private _associationInfo = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrAssociationInfoList(this, "association_info", false);
  public get associationInfo() {
    return this._associationInfo;
  }

  // code_auth_afnic_info - computed: true, optional: false, required: false
  private _codeAuthAfnicInfo = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrCodeAuthAfnicInfoList(this, "code_auth_afnic_info", false);
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }

  // duns_info - computed: true, optional: false, required: false
  private _dunsInfo = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrDunsInfoList(this, "duns_info", false);
  public get dunsInfo() {
    return this._dunsInfo;
  }

  // individual_info - computed: true, optional: false, required: false
  private _individualInfo = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrIndividualInfoList(this, "individual_info", false);
  public get individualInfo() {
    return this._individualInfo;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // trademark_info - computed: true, optional: false, required: false
  private _trademarkInfo = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrTrademarkInfoList(this, "trademark_info", false);
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
}

export class DataScalewayDomainRegistrationAdministrativeContactExtensionFrList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactExtensionFrOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactExtensionFrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationAdministrativeContact {
}

export function dataScalewayDomainRegistrationAdministrativeContactToTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationAdministrativeContactToHclTerraform(struct?: DataScalewayDomainRegistrationAdministrativeContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationAdministrativeContactOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationAdministrativeContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationAdministrativeContact | undefined) {
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
  private _extensionEu = new DataScalewayDomainRegistrationAdministrativeContactExtensionEuList(this, "extension_eu", false);
  public get extensionEu() {
    return this._extensionEu;
  }

  // extension_fr - computed: true, optional: false, required: false
  private _extensionFr = new DataScalewayDomainRegistrationAdministrativeContactExtensionFrList(this, "extension_fr", false);
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

export class DataScalewayDomainRegistrationAdministrativeContactList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationAdministrativeContactOutputReference {
    return new DataScalewayDomainRegistrationAdministrativeContactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationDsRecordDigestPublicKey {
}

export function dataScalewayDomainRegistrationDsRecordDigestPublicKeyToTerraform(struct?: DataScalewayDomainRegistrationDsRecordDigestPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationDsRecordDigestPublicKeyToHclTerraform(struct?: DataScalewayDomainRegistrationDsRecordDigestPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationDsRecordDigestPublicKeyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationDsRecordDigestPublicKey | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationDsRecordDigestPublicKey | undefined) {
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

export class DataScalewayDomainRegistrationDsRecordDigestPublicKeyList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationDsRecordDigestPublicKeyOutputReference {
    return new DataScalewayDomainRegistrationDsRecordDigestPublicKeyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationDsRecordDigest {
}

export function dataScalewayDomainRegistrationDsRecordDigestToTerraform(struct?: DataScalewayDomainRegistrationDsRecordDigest): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationDsRecordDigestToHclTerraform(struct?: DataScalewayDomainRegistrationDsRecordDigest): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationDsRecordDigestOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationDsRecordDigest | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationDsRecordDigest | undefined) {
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
  private _publicKey = new DataScalewayDomainRegistrationDsRecordDigestPublicKeyList(this, "public_key", false);
  public get publicKey() {
    return this._publicKey;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataScalewayDomainRegistrationDsRecordDigestList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationDsRecordDigestOutputReference {
    return new DataScalewayDomainRegistrationDsRecordDigestOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationDsRecordPublicKey {
}

export function dataScalewayDomainRegistrationDsRecordPublicKeyToTerraform(struct?: DataScalewayDomainRegistrationDsRecordPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationDsRecordPublicKeyToHclTerraform(struct?: DataScalewayDomainRegistrationDsRecordPublicKey): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationDsRecordPublicKeyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationDsRecordPublicKey | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationDsRecordPublicKey | undefined) {
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

export class DataScalewayDomainRegistrationDsRecordPublicKeyList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationDsRecordPublicKeyOutputReference {
    return new DataScalewayDomainRegistrationDsRecordPublicKeyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationDsRecord {
}

export function dataScalewayDomainRegistrationDsRecordToTerraform(struct?: DataScalewayDomainRegistrationDsRecord): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationDsRecordToHclTerraform(struct?: DataScalewayDomainRegistrationDsRecord): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationDsRecordOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationDsRecord | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationDsRecord | undefined) {
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
  private _digest = new DataScalewayDomainRegistrationDsRecordDigestList(this, "digest", false);
  public get digest() {
    return this._digest;
  }

  // key_id - computed: true, optional: false, required: false
  public get keyId() {
    return this.getNumberAttribute('key_id');
  }

  // public_key - computed: true, optional: false, required: false
  private _publicKey = new DataScalewayDomainRegistrationDsRecordPublicKeyList(this, "public_key", false);
  public get publicKey() {
    return this._publicKey;
  }
}

export class DataScalewayDomainRegistrationDsRecordList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationDsRecordOutputReference {
    return new DataScalewayDomainRegistrationDsRecordOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionEu {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionEuToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionEuToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionEuOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionEu | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionEuList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionEuOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionEuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfo {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfo | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfo | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfo {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfo | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfo {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfo | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfo {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfo | undefined) {
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

export class DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContactExtensionFr {
}

export function dataScalewayDomainRegistrationOwnerContactExtensionFrToTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactExtensionFrToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // association_info - computed: true, optional: false, required: false
  private _associationInfo = new DataScalewayDomainRegistrationOwnerContactExtensionFrAssociationInfoList(this, "association_info", false);
  public get associationInfo() {
    return this._associationInfo;
  }

  // code_auth_afnic_info - computed: true, optional: false, required: false
  private _codeAuthAfnicInfo = new DataScalewayDomainRegistrationOwnerContactExtensionFrCodeAuthAfnicInfoList(this, "code_auth_afnic_info", false);
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }

  // duns_info - computed: true, optional: false, required: false
  private _dunsInfo = new DataScalewayDomainRegistrationOwnerContactExtensionFrDunsInfoList(this, "duns_info", false);
  public get dunsInfo() {
    return this._dunsInfo;
  }

  // individual_info - computed: true, optional: false, required: false
  private _individualInfo = new DataScalewayDomainRegistrationOwnerContactExtensionFrIndividualInfoList(this, "individual_info", false);
  public get individualInfo() {
    return this._individualInfo;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // trademark_info - computed: true, optional: false, required: false
  private _trademarkInfo = new DataScalewayDomainRegistrationOwnerContactExtensionFrTrademarkInfoList(this, "trademark_info", false);
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
}

export class DataScalewayDomainRegistrationOwnerContactExtensionFrList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactExtensionFrOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactExtensionFrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationOwnerContact {
}

export function dataScalewayDomainRegistrationOwnerContactToTerraform(struct?: DataScalewayDomainRegistrationOwnerContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationOwnerContactToHclTerraform(struct?: DataScalewayDomainRegistrationOwnerContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationOwnerContactOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationOwnerContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationOwnerContact | undefined) {
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
  private _extensionEu = new DataScalewayDomainRegistrationOwnerContactExtensionEuList(this, "extension_eu", false);
  public get extensionEu() {
    return this._extensionEu;
  }

  // extension_fr - computed: true, optional: false, required: false
  private _extensionFr = new DataScalewayDomainRegistrationOwnerContactExtensionFrList(this, "extension_fr", false);
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

export class DataScalewayDomainRegistrationOwnerContactList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationOwnerContactOutputReference {
    return new DataScalewayDomainRegistrationOwnerContactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionEu {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionEuToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionEuToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionEu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionEuOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionEu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionEu | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionEuList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionEuOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionEuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfo {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfo | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfo | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfo {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfo | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfo {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfo | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfo {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfo): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfo | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfo | undefined) {
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

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContactExtensionFr {
}

export function dataScalewayDomainRegistrationTechnicalContactExtensionFrToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactExtensionFrToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContactExtensionFr): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContactExtensionFr | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContactExtensionFr | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // association_info - computed: true, optional: false, required: false
  private _associationInfo = new DataScalewayDomainRegistrationTechnicalContactExtensionFrAssociationInfoList(this, "association_info", false);
  public get associationInfo() {
    return this._associationInfo;
  }

  // code_auth_afnic_info - computed: true, optional: false, required: false
  private _codeAuthAfnicInfo = new DataScalewayDomainRegistrationTechnicalContactExtensionFrCodeAuthAfnicInfoList(this, "code_auth_afnic_info", false);
  public get codeAuthAfnicInfo() {
    return this._codeAuthAfnicInfo;
  }

  // duns_info - computed: true, optional: false, required: false
  private _dunsInfo = new DataScalewayDomainRegistrationTechnicalContactExtensionFrDunsInfoList(this, "duns_info", false);
  public get dunsInfo() {
    return this._dunsInfo;
  }

  // individual_info - computed: true, optional: false, required: false
  private _individualInfo = new DataScalewayDomainRegistrationTechnicalContactExtensionFrIndividualInfoList(this, "individual_info", false);
  public get individualInfo() {
    return this._individualInfo;
  }

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // trademark_info - computed: true, optional: false, required: false
  private _trademarkInfo = new DataScalewayDomainRegistrationTechnicalContactExtensionFrTrademarkInfoList(this, "trademark_info", false);
  public get trademarkInfo() {
    return this._trademarkInfo;
  }
}

export class DataScalewayDomainRegistrationTechnicalContactExtensionFrList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactExtensionFrOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactExtensionFrOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRegistrationTechnicalContact {
}

export function dataScalewayDomainRegistrationTechnicalContactToTerraform(struct?: DataScalewayDomainRegistrationTechnicalContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayDomainRegistrationTechnicalContactToHclTerraform(struct?: DataScalewayDomainRegistrationTechnicalContact): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayDomainRegistrationTechnicalContactOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRegistrationTechnicalContact | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRegistrationTechnicalContact | undefined) {
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
  private _extensionEu = new DataScalewayDomainRegistrationTechnicalContactExtensionEuList(this, "extension_eu", false);
  public get extensionEu() {
    return this._extensionEu;
  }

  // extension_fr - computed: true, optional: false, required: false
  private _extensionFr = new DataScalewayDomainRegistrationTechnicalContactExtensionFrList(this, "extension_fr", false);
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

export class DataScalewayDomainRegistrationTechnicalContactList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRegistrationTechnicalContactOutputReference {
    return new DataScalewayDomainRegistrationTechnicalContactOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration scaleway_domain_registration}
*/
export class DataScalewayDomainRegistration extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_domain_registration";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayDomainRegistration resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayDomainRegistration to import
  * @param importFromId The id of the existing DataScalewayDomainRegistration that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayDomainRegistration to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_domain_registration", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/domain_registration scaleway_domain_registration} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayDomainRegistrationConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayDomainRegistrationConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_domain_registration',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.81.0',
        providerVersionConstraint: '>= 2.81.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._domainName = config.domainName;
    this._id = config.id;
    this._projectId = config.projectId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // administrative_contact - computed: true, optional: false, required: false
  private _administrativeContact = new DataScalewayDomainRegistrationAdministrativeContactList(this, "administrative_contact", false);
  public get administrativeContact() {
    return this._administrativeContact;
  }

  // auto_renew - computed: true, optional: false, required: false
  public get autoRenew() {
    return this.getBooleanAttribute('auto_renew');
  }

  // dnssec - computed: true, optional: false, required: false
  public get dnssec() {
    return this.getBooleanAttribute('dnssec');
  }

  // domain_name - computed: false, optional: false, required: true
  private _domainName?: string; 
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }
  public set domainName(value: string) {
    this._domainName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNameInput() {
    return this._domainName;
  }

  // domain_names - computed: true, optional: false, required: false
  public get domainNames() {
    return this.getListAttribute('domain_names');
  }

  // ds_record - computed: true, optional: false, required: false
  private _dsRecord = new DataScalewayDomainRegistrationDsRecordList(this, "ds_record", false);
  public get dsRecord() {
    return this._dsRecord;
  }

  // duration_in_years - computed: true, optional: false, required: false
  public get durationInYears() {
    return this.getNumberAttribute('duration_in_years');
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

  // owner_contact - computed: true, optional: false, required: false
  private _ownerContact = new DataScalewayDomainRegistrationOwnerContactList(this, "owner_contact", false);
  public get ownerContact() {
    return this._ownerContact;
  }

  // owner_contact_id - computed: true, optional: false, required: false
  public get ownerContactId() {
    return this.getStringAttribute('owner_contact_id');
  }

  // project_id - computed: false, optional: true, required: false
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
  private _technicalContact = new DataScalewayDomainRegistrationTechnicalContactList(this, "technical_contact", false);
  public get technicalContact() {
    return this._technicalContact;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      domain_name: cdktf.stringToTerraform(this._domainName),
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      domain_name: {
        value: cdktf.stringToHclTerraform(this._domainName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
