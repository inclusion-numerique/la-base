// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MnqSnsCredentialsConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#id MnqSnsCredentials#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The credentials name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#name MnqSnsCredentials#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#project_id MnqSnsCredentials#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#region MnqSnsCredentials#region}
  */
  readonly region?: string;
  /**
  * permissions block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#permissions MnqSnsCredentials#permissions}
  */
  readonly permissions?: MnqSnsCredentialsPermissions;
}
export interface MnqSnsCredentialsPermissions {
  /**
  * Allow manage the associated resource
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#can_manage MnqSnsCredentials#can_manage}
  */
  readonly canManage?: boolean | cdktf.IResolvable;
  /**
  * Allow publish messages to the service
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#can_publish MnqSnsCredentials#can_publish}
  */
  readonly canPublish?: boolean | cdktf.IResolvable;
  /**
  * Allow receive messages from the service
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#can_receive MnqSnsCredentials#can_receive}
  */
  readonly canReceive?: boolean | cdktf.IResolvable;
}

export function mnqSnsCredentialsPermissionsToTerraform(struct?: MnqSnsCredentialsPermissionsOutputReference | MnqSnsCredentialsPermissions): any {
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


export function mnqSnsCredentialsPermissionsToHclTerraform(struct?: MnqSnsCredentialsPermissionsOutputReference | MnqSnsCredentialsPermissions): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    can_manage: {
      value: cdktf.booleanToHclTerraform(struct!.canManage),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    can_publish: {
      value: cdktf.booleanToHclTerraform(struct!.canPublish),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    can_receive: {
      value: cdktf.booleanToHclTerraform(struct!.canReceive),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MnqSnsCredentialsPermissionsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqSnsCredentialsPermissions | undefined {
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

  public set internalValue(value: MnqSnsCredentialsPermissions | undefined) {
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

  // can_manage - computed: true, optional: true, required: false
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

  // can_publish - computed: true, optional: true, required: false
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

  // can_receive - computed: true, optional: true, required: false
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

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials scaleway_mnq_sns_credentials}
*/
export class MnqSnsCredentials extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mnq_sns_credentials";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MnqSnsCredentials resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MnqSnsCredentials to import
  * @param importFromId The id of the existing MnqSnsCredentials that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MnqSnsCredentials to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_mnq_sns_credentials", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/mnq_sns_credentials scaleway_mnq_sns_credentials} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MnqSnsCredentialsConfig = {}
  */
  public constructor(scope: Construct, id: string, config: MnqSnsCredentialsConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mnq_sns_credentials',
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
    this._id = config.id;
    this._name = config.name;
    this._projectId = config.projectId;
    this._region = config.region;
    this._permissions.internalValue = config.permissions;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_key - computed: true, optional: false, required: false
  public get accessKey() {
    return this.getStringAttribute('access_key');
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

  // secret_key - computed: true, optional: false, required: false
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }

  // permissions - computed: false, optional: true, required: false
  private _permissions = new MnqSnsCredentialsPermissionsOutputReference(this, "permissions");
  public get permissions() {
    return this._permissions;
  }
  public putPermissions(value: MnqSnsCredentialsPermissions) {
    this._permissions.internalValue = value;
  }
  public resetPermissions() {
    this._permissions.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get permissionsInput() {
    return this._permissions.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      permissions: mnqSnsCredentialsPermissionsToTerraform(this._permissions.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      permissions: {
        value: mnqSnsCredentialsPermissionsToHclTerraform(this._permissions.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MnqSnsCredentialsPermissionsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
