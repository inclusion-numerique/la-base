// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MnqCredentialConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#id MnqCredential#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the Credential
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#name MnqCredential#name}
  */
  readonly name?: string;
  /**
  * The ID of the Namespace associated to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#namespace_id MnqCredential#namespace_id}
  */
  readonly namespaceId: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#region MnqCredential#region}
  */
  readonly region?: string;
  /**
  * nats_credentials block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#nats_credentials MnqCredential#nats_credentials}
  */
  readonly natsCredentials?: MnqCredentialNatsCredentials;
  /**
  * sqs_sns_credentials block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#sqs_sns_credentials MnqCredential#sqs_sns_credentials}
  */
  readonly sqsSnsCredentials?: MnqCredentialSqsSnsCredentials;
}
export interface MnqCredentialNatsCredentials {
}

export function mnqCredentialNatsCredentialsToTerraform(struct?: MnqCredentialNatsCredentialsOutputReference | MnqCredentialNatsCredentials): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class MnqCredentialNatsCredentialsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqCredentialNatsCredentials | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqCredentialNatsCredentials | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // content - computed: true, optional: false, required: false
  public get content() {
    return this.getStringAttribute('content');
  }
}
export interface MnqCredentialSqsSnsCredentialsPermissions {
  /**
  * Allow manage the associated resource
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#can_manage MnqCredential#can_manage}
  */
  readonly canManage?: boolean | cdktf.IResolvable;
  /**
  * Allow publish messages to the service
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#can_publish MnqCredential#can_publish}
  */
  readonly canPublish?: boolean | cdktf.IResolvable;
  /**
  * Allow receive messages from the service
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#can_receive MnqCredential#can_receive}
  */
  readonly canReceive?: boolean | cdktf.IResolvable;
}

export function mnqCredentialSqsSnsCredentialsPermissionsToTerraform(struct?: MnqCredentialSqsSnsCredentialsPermissionsOutputReference | MnqCredentialSqsSnsCredentialsPermissions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    can_manage: cdktf.booleanToTerraform(struct!.canManage),
    can_publish: cdktf.booleanToTerraform(struct!.canPublish),
    can_receive: cdktf.booleanToTerraform(struct!.canReceive),
  }
}

export class MnqCredentialSqsSnsCredentialsPermissionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqCredentialSqsSnsCredentialsPermissions | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._canManage !== undefined) {
      hasAnyValues = true;
      internalValueResult.canManage = this._canManage;
    }
    if (this._canPublish !== undefined) {
      hasAnyValues = true;
      internalValueResult.canPublish = this._canPublish;
    }
    if (this._canReceive !== undefined) {
      hasAnyValues = true;
      internalValueResult.canReceive = this._canReceive;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqCredentialSqsSnsCredentialsPermissions | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._canManage = undefined;
      this._canPublish = undefined;
      this._canReceive = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._canManage = value.canManage;
      this._canPublish = value.canPublish;
      this._canReceive = value.canReceive;
    }
  }

  // can_manage - computed: false, optional: true, required: false
  private _canManage?: boolean | cdktf.IResolvable; 
  public get canManage() {
    return this.getBooleanAttribute('can_manage');
  }
  public set canManage(value: boolean | cdktf.IResolvable) {
    this._canManage = value;
  }
  public resetCanManage() {
    this._canManage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get canManageInput() {
    return this._canManage;
  }

  // can_publish - computed: false, optional: true, required: false
  private _canPublish?: boolean | cdktf.IResolvable; 
  public get canPublish() {
    return this.getBooleanAttribute('can_publish');
  }
  public set canPublish(value: boolean | cdktf.IResolvable) {
    this._canPublish = value;
  }
  public resetCanPublish() {
    this._canPublish = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get canPublishInput() {
    return this._canPublish;
  }

  // can_receive - computed: false, optional: true, required: false
  private _canReceive?: boolean | cdktf.IResolvable; 
  public get canReceive() {
    return this.getBooleanAttribute('can_receive');
  }
  public set canReceive(value: boolean | cdktf.IResolvable) {
    this._canReceive = value;
  }
  public resetCanReceive() {
    this._canReceive = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get canReceiveInput() {
    return this._canReceive;
  }
}
export interface MnqCredentialSqsSnsCredentials {
  /**
  * permissions block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential#permissions MnqCredential#permissions}
  */
  readonly permissions?: MnqCredentialSqsSnsCredentialsPermissions;
}

export function mnqCredentialSqsSnsCredentialsToTerraform(struct?: MnqCredentialSqsSnsCredentialsOutputReference | MnqCredentialSqsSnsCredentials): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    permissions: mnqCredentialSqsSnsCredentialsPermissionsToTerraform(struct!.permissions),
  }
}

export class MnqCredentialSqsSnsCredentialsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqCredentialSqsSnsCredentials | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._permissions?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.permissions = this._permissions?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqCredentialSqsSnsCredentials | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._permissions.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._permissions.internalValue = value.permissions;
    }
  }

  // access_key - computed: true, optional: false, required: false
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }

  // secret_key - computed: true, optional: false, required: false
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }

  // permissions - computed: false, optional: true, required: false
  private _permissions = new MnqCredentialSqsSnsCredentialsPermissionsOutputReference(this, "permissions");
  public get permissions() {
    return this._permissions;
  }
  public putPermissions(value: MnqCredentialSqsSnsCredentialsPermissions) {
    this._permissions.internalValue = value;
  }
  public resetPermissions() {
    this._permissions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionsInput() {
    return this._permissions.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential scaleway_mnq_credential}
*/
export class MnqCredential extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mnq_credential";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/mnq_credential scaleway_mnq_credential} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MnqCredentialConfig
  */
  public constructor(scope: Construct, id: string, config: MnqCredentialConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mnq_credential',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.19.0',
        providerVersionConstraint: '= 2.19.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._id = config.id;
    this._name = config.name;
    this._namespaceId = config.namespaceId;
    this._region = config.region;
    this._natsCredentials.internalValue = config.natsCredentials;
    this._sqsSnsCredentials.internalValue = config.sqsSnsCredentials;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // name - computed: true, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // namespace_id - computed: false, optional: false, required: true
  private _namespaceId?: string; 
  public get namespaceId() {
    return this.getStringAttribute('namespace_id');
  }
  public set namespaceId(value: string) {
    this._namespaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get namespaceIdInput() {
    return this._namespaceId;
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
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

  // nats_credentials - computed: false, optional: true, required: false
  private _natsCredentials = new MnqCredentialNatsCredentialsOutputReference(this, "nats_credentials");
  public get natsCredentials() {
    return this._natsCredentials;
  }
  public putNatsCredentials(value: MnqCredentialNatsCredentials) {
    this._natsCredentials.internalValue = value;
  }
  public resetNatsCredentials() {
    this._natsCredentials.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get natsCredentialsInput() {
    return this._natsCredentials.internalValue;
  }

  // sqs_sns_credentials - computed: false, optional: true, required: false
  private _sqsSnsCredentials = new MnqCredentialSqsSnsCredentialsOutputReference(this, "sqs_sns_credentials");
  public get sqsSnsCredentials() {
    return this._sqsSnsCredentials;
  }
  public putSqsSnsCredentials(value: MnqCredentialSqsSnsCredentials) {
    this._sqsSnsCredentials.internalValue = value;
  }
  public resetSqsSnsCredentials() {
    this._sqsSnsCredentials.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqsSnsCredentialsInput() {
    return this._sqsSnsCredentials.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      region: cdktf.stringToTerraform(this._region),
      nats_credentials: mnqCredentialNatsCredentialsToTerraform(this._natsCredentials.internalValue),
      sqs_sns_credentials: mnqCredentialSqsSnsCredentialsToTerraform(this._sqsSnsCredentials.internalValue),
    };
  }
}
