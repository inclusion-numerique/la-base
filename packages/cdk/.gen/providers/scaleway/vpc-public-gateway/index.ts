// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcPublicGatewayConfig extends cdktf.TerraformMetaArguments {
  /**
  * Set a definitive list of IP ranges (in CIDR notation) allowed to connect to the SSH bastion
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#allowed_ip_ranges VpcPublicGateway#allowed_ip_ranges}
  */
  readonly allowedIpRanges?: string[];
  /**
  * Enable SSH bastion on the gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#bastion_enabled VpcPublicGateway#bastion_enabled}
  */
  readonly bastionEnabled?: boolean | cdktf.IResolvable;
  /**
  * Port of the SSH bastion
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#bastion_port VpcPublicGateway#bastion_port}
  */
  readonly bastionPort?: number;
  /**
  * Enable SMTP on the gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#enable_smtp VpcPublicGateway#enable_smtp}
  */
  readonly enableSmtp?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#id VpcPublicGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * attach an existing IP to the gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#ip_id VpcPublicGateway#ip_id}
  */
  readonly ipId?: string;
  /**
  * Put a Public Gateway in IPAM mode, so that it can be used with the Public Gateways API v2
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#move_to_ipam VpcPublicGateway#move_to_ipam}
  */
  readonly moveToIpam?: boolean | cdktf.IResolvable;
  /**
  * name of the gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#name VpcPublicGateway#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#project_id VpcPublicGateway#project_id}
  */
  readonly projectId?: string;
  /**
  * Trigger a refresh of the SSH keys for a given Public Gateway by changing this field's value
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#refresh_ssh_keys VpcPublicGateway#refresh_ssh_keys}
  */
  readonly refreshSshKeys?: string;
  /**
  * The tags associated with public gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#tags VpcPublicGateway#tags}
  */
  readonly tags?: string[];
  /**
  * gateway type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#type VpcPublicGateway#type}
  */
  readonly type: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#zone VpcPublicGateway#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#timeouts VpcPublicGateway#timeouts}
  */
  readonly timeouts?: VpcPublicGatewayTimeouts;
}
export interface VpcPublicGatewayTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#create VpcPublicGateway#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#default VpcPublicGateway#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#delete VpcPublicGateway#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#read VpcPublicGateway#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#update VpcPublicGateway#update}
  */
  readonly update?: string;
}

export function vpcPublicGatewayTimeoutsToTerraform(struct?: VpcPublicGatewayTimeouts | cdktf.IResolvable): any {
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


export function vpcPublicGatewayTimeoutsToHclTerraform(struct?: VpcPublicGatewayTimeouts | cdktf.IResolvable): any {
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

export class VpcPublicGatewayTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VpcPublicGatewayTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: VpcPublicGatewayTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway scaleway_vpc_public_gateway}
*/
export class VpcPublicGateway extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcPublicGateway resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcPublicGateway to import
  * @param importFromId The id of the existing VpcPublicGateway that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcPublicGateway to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_public_gateway", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/vpc_public_gateway scaleway_vpc_public_gateway} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcPublicGatewayConfig
  */
  public constructor(scope: Construct, id: string, config: VpcPublicGatewayConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.57.0',
        providerVersionConstraint: '>= 2.57.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._allowedIpRanges = config.allowedIpRanges;
    this._bastionEnabled = config.bastionEnabled;
    this._bastionPort = config.bastionPort;
    this._enableSmtp = config.enableSmtp;
    this._id = config.id;
    this._ipId = config.ipId;
    this._moveToIpam = config.moveToIpam;
    this._name = config.name;
    this._projectId = config.projectId;
    this._refreshSshKeys = config.refreshSshKeys;
    this._tags = config.tags;
    this._type = config.type;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // allowed_ip_ranges - computed: true, optional: true, required: false
  private _allowedIpRanges?: string[]; 
  public get allowedIpRanges() {
    return cdktf.Fn.tolist(this.getListAttribute('allowed_ip_ranges'));
  }
  public set allowedIpRanges(value: string[]) {
    this._allowedIpRanges = value;
  }
  public resetAllowedIpRanges() {
    this._allowedIpRanges = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allowedIpRangesInput() {
    return this._allowedIpRanges;
  }

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // bastion_enabled - computed: false, optional: true, required: false
  private _bastionEnabled?: boolean | cdktf.IResolvable; 
  public get bastionEnabled() {
    return this.getBooleanAttribute('bastion_enabled');
  }
  public set bastionEnabled(value: boolean | cdktf.IResolvable) {
    this._bastionEnabled = value;
  }
  public resetBastionEnabled() {
    this._bastionEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bastionEnabledInput() {
    return this._bastionEnabled;
  }

  // bastion_port - computed: true, optional: true, required: false
  private _bastionPort?: number; 
  public get bastionPort() {
    return this.getNumberAttribute('bastion_port');
  }
  public set bastionPort(value: number) {
    this._bastionPort = value;
  }
  public resetBastionPort() {
    this._bastionPort = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bastionPortInput() {
    return this._bastionPort;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enable_smtp - computed: true, optional: true, required: false
  private _enableSmtp?: boolean | cdktf.IResolvable; 
  public get enableSmtp() {
    return this.getBooleanAttribute('enable_smtp');
  }
  public set enableSmtp(value: boolean | cdktf.IResolvable) {
    this._enableSmtp = value;
  }
  public resetEnableSmtp() {
    this._enableSmtp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableSmtpInput() {
    return this._enableSmtp;
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

  // ip_id - computed: true, optional: true, required: false
  private _ipId?: string; 
  public get ipId() {
    return this.getStringAttribute('ip_id');
  }
  public set ipId(value: string) {
    this._ipId = value;
  }
  public resetIpId() {
    this._ipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipIdInput() {
    return this._ipId;
  }

  // move_to_ipam - computed: false, optional: true, required: false
  private _moveToIpam?: boolean | cdktf.IResolvable; 
  public get moveToIpam() {
    return this.getBooleanAttribute('move_to_ipam');
  }
  public set moveToIpam(value: boolean | cdktf.IResolvable) {
    this._moveToIpam = value;
  }
  public resetMoveToIpam() {
    this._moveToIpam = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get moveToIpamInput() {
    return this._moveToIpam;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
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

  // refresh_ssh_keys - computed: false, optional: true, required: false
  private _refreshSshKeys?: string; 
  public get refreshSshKeys() {
    return this.getStringAttribute('refresh_ssh_keys');
  }
  public set refreshSshKeys(value: string) {
    this._refreshSshKeys = value;
  }
  public resetRefreshSshKeys() {
    this._refreshSshKeys = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get refreshSshKeysInput() {
    return this._refreshSshKeys;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return this.getListAttribute('tags');
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // upstream_dns_servers - computed: true, optional: false, required: false
  public get upstreamDnsServers() {
    return this.getListAttribute('upstream_dns_servers');
  }

  // zone - computed: true, optional: true, required: false
  private _zone?: string; 
  public get zone() {
    return this.getStringAttribute('zone');
  }
  public set zone(value: string) {
    this._zone = value;
  }
  public resetZone() {
    this._zone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zoneInput() {
    return this._zone;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new VpcPublicGatewayTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VpcPublicGatewayTimeouts) {
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
      allowed_ip_ranges: cdktf.listMapper(cdktf.stringToTerraform, false)(this._allowedIpRanges),
      bastion_enabled: cdktf.booleanToTerraform(this._bastionEnabled),
      bastion_port: cdktf.numberToTerraform(this._bastionPort),
      enable_smtp: cdktf.booleanToTerraform(this._enableSmtp),
      id: cdktf.stringToTerraform(this._id),
      ip_id: cdktf.stringToTerraform(this._ipId),
      move_to_ipam: cdktf.booleanToTerraform(this._moveToIpam),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      refresh_ssh_keys: cdktf.stringToTerraform(this._refreshSshKeys),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      zone: cdktf.stringToTerraform(this._zone),
      timeouts: vpcPublicGatewayTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      allowed_ip_ranges: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._allowedIpRanges),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      bastion_enabled: {
        value: cdktf.booleanToHclTerraform(this._bastionEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      bastion_port: {
        value: cdktf.numberToHclTerraform(this._bastionPort),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      enable_smtp: {
        value: cdktf.booleanToHclTerraform(this._enableSmtp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ip_id: {
        value: cdktf.stringToHclTerraform(this._ipId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      move_to_ipam: {
        value: cdktf.booleanToHclTerraform(this._moveToIpam),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      refresh_ssh_keys: {
        value: cdktf.stringToHclTerraform(this._refreshSshKeys),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      timeouts: {
        value: vpcPublicGatewayTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "VpcPublicGatewayTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
