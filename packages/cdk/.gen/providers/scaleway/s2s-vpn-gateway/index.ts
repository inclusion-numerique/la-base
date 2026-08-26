// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface S2SVpnGatewayConfig extends cdktf.TerraformMetaArguments {
  /**
  * The VPN gateway type (commercial offer type)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#gateway_type S2SVpnGateway#gateway_type}
  */
  readonly gatewayType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#id S2SVpnGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the IPAM private IPv4 address to attach to the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#ipam_private_ipv4_id S2SVpnGateway#ipam_private_ipv4_id}
  */
  readonly ipamPrivateIpv4Id?: string;
  /**
  * The ID of the IPAM private IPv6 address to attach to the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#ipam_private_ipv6_id S2SVpnGateway#ipam_private_ipv6_id}
  */
  readonly ipamPrivateIpv6Id?: string;
  /**
  * The name of the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#name S2SVpnGateway#name}
  */
  readonly name?: string;
  /**
  * The ID of the Private Network to attach to the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#private_network_id S2SVpnGateway#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#project_id S2SVpnGateway#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#region S2SVpnGateway#region}
  */
  readonly region?: string;
  /**
  * The list of tags to apply to the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#tags S2SVpnGateway#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#zone S2SVpnGateway#zone}
  */
  readonly zone?: string;
  /**
  * public_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#public_config S2SVpnGateway#public_config}
  */
  readonly publicConfig?: S2SVpnGatewayPublicConfig[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#timeouts S2SVpnGateway#timeouts}
  */
  readonly timeouts?: S2SVpnGatewayTimeouts;
}
export interface S2SVpnGatewayPublicConfig {
  /**
  *  The ID of the IPAM IPv4 address to use as the public IP for the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#ipam_ipv4_id S2SVpnGateway#ipam_ipv4_id}
  */
  readonly ipamIpv4Id?: string;
  /**
  *  The ID of the IPAM IPv6 address to use as the public IP for the VPN gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#ipam_ipv6_id S2SVpnGateway#ipam_ipv6_id}
  */
  readonly ipamIpv6Id?: string;
}

export function s2SVpnGatewayPublicConfigToTerraform(struct?: S2SVpnGatewayPublicConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ipam_ipv4_id: cdktf.stringToTerraform(struct!.ipamIpv4Id),
    ipam_ipv6_id: cdktf.stringToTerraform(struct!.ipamIpv6Id),
  }
}


export function s2SVpnGatewayPublicConfigToHclTerraform(struct?: S2SVpnGatewayPublicConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ipam_ipv4_id: {
      value: cdktf.stringToHclTerraform(struct!.ipamIpv4Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    ipam_ipv6_id: {
      value: cdktf.stringToHclTerraform(struct!.ipamIpv6Id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class S2SVpnGatewayPublicConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnGatewayPublicConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ipamIpv4Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipamIpv4Id = this._ipamIpv4Id;
    }
    if (this._ipamIpv6Id !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipamIpv6Id = this._ipamIpv6Id;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnGatewayPublicConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._ipamIpv4Id = undefined;
      this._ipamIpv6Id = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._ipamIpv4Id = value.ipamIpv4Id;
      this._ipamIpv6Id = value.ipamIpv6Id;
    }
  }

  // ipam_ipv4_id - computed: false, optional: true, required: false
  private _ipamIpv4Id?: string; 
  public get ipamIpv4Id() {
    return this.getStringAttribute('ipam_ipv4_id');
  }
  public set ipamIpv4Id(value: string) {
    this._ipamIpv4Id = value;
  }
  public resetIpamIpv4Id() {
    this._ipamIpv4Id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamIpv4IdInput() {
    return this._ipamIpv4Id;
  }

  // ipam_ipv6_id - computed: false, optional: true, required: false
  private _ipamIpv6Id?: string; 
  public get ipamIpv6Id() {
    return this.getStringAttribute('ipam_ipv6_id');
  }
  public set ipamIpv6Id(value: string) {
    this._ipamIpv6Id = value;
  }
  public resetIpamIpv6Id() {
    this._ipamIpv6Id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamIpv6IdInput() {
    return this._ipamIpv6Id;
  }
}

export class S2SVpnGatewayPublicConfigList extends cdktf.ComplexList {
  public internalValue? : S2SVpnGatewayPublicConfig[] | cdktf.IResolvable

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
  public get(index: number): S2SVpnGatewayPublicConfigOutputReference {
    return new S2SVpnGatewayPublicConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnGatewayTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#create S2SVpnGateway#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#default S2SVpnGateway#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#delete S2SVpnGateway#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#read S2SVpnGateway#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#update S2SVpnGateway#update}
  */
  readonly update?: string;
}

export function s2SVpnGatewayTimeoutsToTerraform(struct?: S2SVpnGatewayTimeouts | cdktf.IResolvable): any {
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


export function s2SVpnGatewayTimeoutsToHclTerraform(struct?: S2SVpnGatewayTimeouts | cdktf.IResolvable): any {
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

export class S2SVpnGatewayTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): S2SVpnGatewayTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: S2SVpnGatewayTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway scaleway_s2s_vpn_gateway}
*/
export class S2SVpnGateway extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_s2s_vpn_gateway";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a S2SVpnGateway resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the S2SVpnGateway to import
  * @param importFromId The id of the existing S2SVpnGateway that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the S2SVpnGateway to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_s2s_vpn_gateway", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_gateway scaleway_s2s_vpn_gateway} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options S2SVpnGatewayConfig
  */
  public constructor(scope: Construct, id: string, config: S2SVpnGatewayConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_s2s_vpn_gateway',
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
    this._gatewayType = config.gatewayType;
    this._id = config.id;
    this._ipamPrivateIpv4Id = config.ipamPrivateIpv4Id;
    this._ipamPrivateIpv6Id = config.ipamPrivateIpv6Id;
    this._name = config.name;
    this._privateNetworkId = config.privateNetworkId;
    this._projectId = config.projectId;
    this._region = config.region;
    this._tags = config.tags;
    this._zone = config.zone;
    this._publicConfig.internalValue = config.publicConfig;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // asn - computed: true, optional: false, required: false
  public get asn() {
    return this.getNumberAttribute('asn');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // gateway_type - computed: false, optional: false, required: true
  private _gatewayType?: string; 
  public get gatewayType() {
    return this.getStringAttribute('gateway_type');
  }
  public set gatewayType(value: string) {
    this._gatewayType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayTypeInput() {
    return this._gatewayType;
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

  // ipam_private_ipv4_id - computed: true, optional: true, required: false
  private _ipamPrivateIpv4Id?: string; 
  public get ipamPrivateIpv4Id() {
    return this.getStringAttribute('ipam_private_ipv4_id');
  }
  public set ipamPrivateIpv4Id(value: string) {
    this._ipamPrivateIpv4Id = value;
  }
  public resetIpamPrivateIpv4Id() {
    this._ipamPrivateIpv4Id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamPrivateIpv4IdInput() {
    return this._ipamPrivateIpv4Id;
  }

  // ipam_private_ipv6_id - computed: true, optional: true, required: false
  private _ipamPrivateIpv6Id?: string; 
  public get ipamPrivateIpv6Id() {
    return this.getStringAttribute('ipam_private_ipv6_id');
  }
  public set ipamPrivateIpv6Id(value: string) {
    this._ipamPrivateIpv6Id = value;
  }
  public resetIpamPrivateIpv6Id() {
    this._ipamPrivateIpv6Id = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamPrivateIpv6IdInput() {
    return this._ipamPrivateIpv6Id;
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

  // private_network_id - computed: false, optional: false, required: true
  private _privateNetworkId?: string; 
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
  public set privateNetworkId(value: string) {
    this._privateNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdInput() {
    return this._privateNetworkId;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: true, required: false
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
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

  // public_config - computed: false, optional: true, required: false
  private _publicConfig = new S2SVpnGatewayPublicConfigList(this, "public_config", false);
  public get publicConfig() {
    return this._publicConfig;
  }
  public putPublicConfig(value: S2SVpnGatewayPublicConfig[] | cdktf.IResolvable) {
    this._publicConfig.internalValue = value;
  }
  public resetPublicConfig() {
    this._publicConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicConfigInput() {
    return this._publicConfig.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new S2SVpnGatewayTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: S2SVpnGatewayTimeouts) {
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
      gateway_type: cdktf.stringToTerraform(this._gatewayType),
      id: cdktf.stringToTerraform(this._id),
      ipam_private_ipv4_id: cdktf.stringToTerraform(this._ipamPrivateIpv4Id),
      ipam_private_ipv6_id: cdktf.stringToTerraform(this._ipamPrivateIpv6Id),
      name: cdktf.stringToTerraform(this._name),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
      public_config: cdktf.listMapper(s2SVpnGatewayPublicConfigToTerraform, true)(this._publicConfig.internalValue),
      timeouts: s2SVpnGatewayTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      gateway_type: {
        value: cdktf.stringToHclTerraform(this._gatewayType),
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
      ipam_private_ipv4_id: {
        value: cdktf.stringToHclTerraform(this._ipamPrivateIpv4Id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      ipam_private_ipv6_id: {
        value: cdktf.stringToHclTerraform(this._ipamPrivateIpv6Id),
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
      private_network_id: {
        value: cdktf.stringToHclTerraform(this._privateNetworkId),
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
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_config: {
        value: cdktf.listMapperHcl(s2SVpnGatewayPublicConfigToHclTerraform, true)(this._publicConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "S2SVpnGatewayPublicConfigList",
      },
      timeouts: {
        value: s2SVpnGatewayTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "S2SVpnGatewayTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
