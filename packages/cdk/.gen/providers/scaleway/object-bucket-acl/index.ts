// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ObjectBucketAclConfig extends cdktf.TerraformMetaArguments {
  /**
  * ACL of the bucket: either 'public-read' or 'private'.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#acl ObjectBucketAcl#acl}
  */
  readonly acl?: string;
  /**
  * The bucket name.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#bucket ObjectBucketAcl#bucket}
  */
  readonly bucket: string;
  /**
  * The project ID as owner.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#expected_bucket_owner ObjectBucketAcl#expected_bucket_owner}
  */
  readonly expectedBucketOwner?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#id ObjectBucketAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#project_id ObjectBucketAcl#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#region ObjectBucketAcl#region}
  */
  readonly region?: string;
  /**
  * access_control_policy block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#access_control_policy ObjectBucketAcl#access_control_policy}
  */
  readonly accessControlPolicy?: ObjectBucketAclAccessControlPolicy;
}
export interface ObjectBucketAclAccessControlPolicyGrantGrantee {
  /**
  * The project ID owner of the grantee.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#id ObjectBucketAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
  /**
  * Type of grantee. Valid values: `CanonicalUser`
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#type ObjectBucketAcl#type}
  */
  readonly type: string;
}

export function objectBucketAclAccessControlPolicyGrantGranteeToTerraform(struct?: ObjectBucketAclAccessControlPolicyGrantGranteeOutputReference | ObjectBucketAclAccessControlPolicyGrantGrantee): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    id: cdktf.stringToTerraform(struct!.id),
    type: cdktf.stringToTerraform(struct!.type),
  }
}

export class ObjectBucketAclAccessControlPolicyGrantGranteeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObjectBucketAclAccessControlPolicyGrantGrantee | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._type !== undefined) {
      hasAnyValues = true;
      internalValueResult.type = this._type;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketAclAccessControlPolicyGrantGrantee | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._id = undefined;
      this._type = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._id = value.id;
      this._type = value.type;
    }
  }

  // display_name - computed: true, optional: false, required: false
  public get displayName() {
    return this.getStringAttribute('display_name');
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }
}
export interface ObjectBucketAclAccessControlPolicyGrant {
  /**
  * Logging permissions assigned to the grantee for the bucket.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#permission ObjectBucketAcl#permission}
  */
  readonly permission: string;
  /**
  * grantee block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#grantee ObjectBucketAcl#grantee}
  */
  readonly grantee?: ObjectBucketAclAccessControlPolicyGrantGrantee;
}

export function objectBucketAclAccessControlPolicyGrantToTerraform(struct?: ObjectBucketAclAccessControlPolicyGrant | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    permission: cdktf.stringToTerraform(struct!.permission),
    grantee: objectBucketAclAccessControlPolicyGrantGranteeToTerraform(struct!.grantee),
  }
}

export class ObjectBucketAclAccessControlPolicyGrantOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): ObjectBucketAclAccessControlPolicyGrant | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._permission !== undefined) {
      hasAnyValues = true;
      internalValueResult.permission = this._permission;
    }
    if (this._grantee?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.grantee = this._grantee?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketAclAccessControlPolicyGrant | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._permission = undefined;
      this._grantee.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._permission = value.permission;
      this._grantee.internalValue = value.grantee;
    }
  }

  // permission - computed: false, optional: false, required: true
  private _permission?: string; 
  public get permission() {
    return this.getStringAttribute('permission');
  }
  public set permission(value: string) {
    this._permission = value;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionInput() {
    return this._permission;
  }

  // grantee - computed: false, optional: true, required: false
  private _grantee = new ObjectBucketAclAccessControlPolicyGrantGranteeOutputReference(this, "grantee");
  public get grantee() {
    return this._grantee;
  }
  public putGrantee(value: ObjectBucketAclAccessControlPolicyGrantGrantee) {
    this._grantee.internalValue = value;
  }
  public resetGrantee() {
    this._grantee.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get granteeInput() {
    return this._grantee.internalValue;
  }
}

export class ObjectBucketAclAccessControlPolicyGrantList extends cdktf.ComplexList {
  public internalValue? : ObjectBucketAclAccessControlPolicyGrant[] | cdktf.IResolvable

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
  public get(index: number): ObjectBucketAclAccessControlPolicyGrantOutputReference {
    return new ObjectBucketAclAccessControlPolicyGrantOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface ObjectBucketAclAccessControlPolicyOwner {
  /**
  * The project ID of the grantee.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#display_name ObjectBucketAcl#display_name}
  */
  readonly displayName?: string;
  /**
  * The display ID of the project.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#id ObjectBucketAcl#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id: string;
}

export function objectBucketAclAccessControlPolicyOwnerToTerraform(struct?: ObjectBucketAclAccessControlPolicyOwnerOutputReference | ObjectBucketAclAccessControlPolicyOwner): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    display_name: cdktf.stringToTerraform(struct!.displayName),
    id: cdktf.stringToTerraform(struct!.id),
  }
}

export class ObjectBucketAclAccessControlPolicyOwnerOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObjectBucketAclAccessControlPolicyOwner | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._displayName !== undefined) {
      hasAnyValues = true;
      internalValueResult.displayName = this._displayName;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketAclAccessControlPolicyOwner | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._displayName = undefined;
      this._id = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._displayName = value.displayName;
      this._id = value.id;
    }
  }

  // display_name - computed: true, optional: true, required: false
  private _displayName?: string; 
  public get displayName() {
    return this.getStringAttribute('display_name');
  }
  public set displayName(value: string) {
    this._displayName = value;
  }
  public resetDisplayName() {
    this._displayName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get displayNameInput() {
    return this._displayName;
  }

  // id - computed: false, optional: false, required: true
  private _id?: string; 
  public get id() {
    return this.getStringAttribute('id');
  }
  public set id(value: string) {
    this._id = value;
  }
  // Temporarily expose input value. Use with caution.
  public get idInput() {
    return this._id;
  }
}
export interface ObjectBucketAclAccessControlPolicy {
  /**
  * grant block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#grant ObjectBucketAcl#grant}
  */
  readonly grant?: ObjectBucketAclAccessControlPolicyGrant[] | cdktf.IResolvable;
  /**
  * owner block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl#owner ObjectBucketAcl#owner}
  */
  readonly owner: ObjectBucketAclAccessControlPolicyOwner;
}

export function objectBucketAclAccessControlPolicyToTerraform(struct?: ObjectBucketAclAccessControlPolicyOutputReference | ObjectBucketAclAccessControlPolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    grant: cdktf.listMapper(objectBucketAclAccessControlPolicyGrantToTerraform, true)(struct!.grant),
    owner: objectBucketAclAccessControlPolicyOwnerToTerraform(struct!.owner),
  }
}

export class ObjectBucketAclAccessControlPolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): ObjectBucketAclAccessControlPolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._grant?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.grant = this._grant?.internalValue;
    }
    if (this._owner?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.owner = this._owner?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: ObjectBucketAclAccessControlPolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._grant.internalValue = undefined;
      this._owner.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._grant.internalValue = value.grant;
      this._owner.internalValue = value.owner;
    }
  }

  // grant - computed: false, optional: true, required: false
  private _grant = new ObjectBucketAclAccessControlPolicyGrantList(this, "grant", true);
  public get grant() {
    return this._grant;
  }
  public putGrant(value: ObjectBucketAclAccessControlPolicyGrant[] | cdktf.IResolvable) {
    this._grant.internalValue = value;
  }
  public resetGrant() {
    this._grant.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get grantInput() {
    return this._grant.internalValue;
  }

  // owner - computed: false, optional: false, required: true
  private _owner = new ObjectBucketAclAccessControlPolicyOwnerOutputReference(this, "owner");
  public get owner() {
    return this._owner;
  }
  public putOwner(value: ObjectBucketAclAccessControlPolicyOwner) {
    this._owner.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ownerInput() {
    return this._owner.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl scaleway_object_bucket_acl}
*/
export class ObjectBucketAcl extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_object_bucket_acl";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/object_bucket_acl scaleway_object_bucket_acl} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ObjectBucketAclConfig
  */
  public constructor(scope: Construct, id: string, config: ObjectBucketAclConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_object_bucket_acl',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.17.0',
        providerVersionConstraint: '>= 2.16.3'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._acl = config.acl;
    this._bucket = config.bucket;
    this._expectedBucketOwner = config.expectedBucketOwner;
    this._id = config.id;
    this._projectId = config.projectId;
    this._region = config.region;
    this._accessControlPolicy.internalValue = config.accessControlPolicy;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // acl - computed: false, optional: true, required: false
  private _acl?: string; 
  public get acl() {
    return this.getStringAttribute('acl');
  }
  public set acl(value: string) {
    this._acl = value;
  }
  public resetAcl() {
    this._acl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get aclInput() {
    return this._acl;
  }

  // bucket - computed: false, optional: false, required: true
  private _bucket?: string; 
  public get bucket() {
    return this.getStringAttribute('bucket');
  }
  public set bucket(value: string) {
    this._bucket = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketInput() {
    return this._bucket;
  }

  // expected_bucket_owner - computed: false, optional: true, required: false
  private _expectedBucketOwner?: string; 
  public get expectedBucketOwner() {
    return this.getStringAttribute('expected_bucket_owner');
  }
  public set expectedBucketOwner(value: string) {
    this._expectedBucketOwner = value;
  }
  public resetExpectedBucketOwner() {
    this._expectedBucketOwner = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expectedBucketOwnerInput() {
    return this._expectedBucketOwner;
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

  // region - computed: true, optional: true, required: false
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  public resetRegion() {
    this._region = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // access_control_policy - computed: false, optional: true, required: false
  private _accessControlPolicy = new ObjectBucketAclAccessControlPolicyOutputReference(this, "access_control_policy");
  public get accessControlPolicy() {
    return this._accessControlPolicy;
  }
  public putAccessControlPolicy(value: ObjectBucketAclAccessControlPolicy) {
    this._accessControlPolicy.internalValue = value;
  }
  public resetAccessControlPolicy() {
    this._accessControlPolicy.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get accessControlPolicyInput() {
    return this._accessControlPolicy.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      acl: cdktf.stringToTerraform(this._acl),
      bucket: cdktf.stringToTerraform(this._bucket),
      expected_bucket_owner: cdktf.stringToTerraform(this._expectedBucketOwner),
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      access_control_policy: objectBucketAclAccessControlPolicyToTerraform(this._accessControlPolicy.internalValue),
    };
  }
}
