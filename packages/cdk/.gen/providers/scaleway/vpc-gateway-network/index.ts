// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcGatewayNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * Remove DHCP config on this network on destroy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#cleanup_dhcp VpcGatewayNetwork#cleanup_dhcp}
  */
  readonly cleanupDhcp?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway DHCP config
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#dhcp_id VpcGatewayNetwork#dhcp_id}
  */
  readonly dhcpId?: string;
  /**
  * Enable DHCP config on this network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#enable_dhcp VpcGatewayNetwork#enable_dhcp}
  */
  readonly enableDhcp?: boolean | cdktf.IResolvable;
  /**
  * Enable masquerade on this network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#enable_masquerade VpcGatewayNetwork#enable_masquerade}
  */
  readonly enableMasquerade?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway where connect to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#gateway_id VpcGatewayNetwork#gateway_id}
  */
  readonly gatewayId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#id VpcGatewayNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the private network where connect to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#private_network_id VpcGatewayNetwork#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * The static IP address in CIDR on this network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#static_address VpcGatewayNetwork#static_address}
  */
  readonly staticAddress?: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#zone VpcGatewayNetwork#zone}
  */
  readonly zone?: string;
  /**
  * ipam_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#ipam_config VpcGatewayNetwork#ipam_config}
  */
  readonly ipamConfig?: VpcGatewayNetworkIpamConfig[] | cdktf.IResolvable;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#timeouts VpcGatewayNetwork#timeouts}
  */
  readonly timeouts?: VpcGatewayNetworkTimeouts;
}
export interface VpcGatewayNetworkIpamConfig {
  /**
  * Use this IPAM-booked IP ID as the Gateway's IP in this Private Network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#ipam_ip_id VpcGatewayNetwork#ipam_ip_id}
  */
  readonly ipamIpId?: string;
  /**
  * Defines whether the default route is enabled on that Gateway Network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#push_default_route VpcGatewayNetwork#push_default_route}
  */
  readonly pushDefaultRoute?: boolean | cdktf.IResolvable;
}

export function vpcGatewayNetworkIpamConfigToTerraform(struct?: VpcGatewayNetworkIpamConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    ipam_ip_id: cdktf.stringToTerraform(struct!.ipamIpId),
    push_default_route: cdktf.booleanToTerraform(struct!.pushDefaultRoute),
  }
}


export function vpcGatewayNetworkIpamConfigToHclTerraform(struct?: VpcGatewayNetworkIpamConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    ipam_ip_id: {
      value: cdktf.stringToHclTerraform(struct!.ipamIpId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    push_default_route: {
      value: cdktf.booleanToHclTerraform(struct!.pushDefaultRoute),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class VpcGatewayNetworkIpamConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): VpcGatewayNetworkIpamConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._ipamIpId !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipamIpId = this._ipamIpId;
    }
    if (this._pushDefaultRoute !== undefined) {
      hasAnyValues = true;
      internalValueResult.pushDefaultRoute = this._pushDefaultRoute;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcGatewayNetworkIpamConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._ipamIpId = undefined;
      this._pushDefaultRoute = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._ipamIpId = value.ipamIpId;
      this._pushDefaultRoute = value.pushDefaultRoute;
    }
  }

  // ipam_ip_id - computed: true, optional: true, required: false
  private _ipamIpId?: string; 
  public get ipamIpId() {
    return this.getStringAttribute('ipam_ip_id');
  }
  public set ipamIpId(value: string) {
    this._ipamIpId = value;
  }
  public resetIpamIpId() {
    this._ipamIpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamIpIdInput() {
    return this._ipamIpId;
  }

  // push_default_route - computed: false, optional: true, required: false
  private _pushDefaultRoute?: boolean | cdktf.IResolvable; 
  public get pushDefaultRoute() {
    return this.getBooleanAttribute('push_default_route');
  }
  public set pushDefaultRoute(value: boolean | cdktf.IResolvable) {
    this._pushDefaultRoute = value;
  }
  public resetPushDefaultRoute() {
    this._pushDefaultRoute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pushDefaultRouteInput() {
    return this._pushDefaultRoute;
  }
}

export class VpcGatewayNetworkIpamConfigList extends cdktf.ComplexList {
  public internalValue? : VpcGatewayNetworkIpamConfig[] | cdktf.IResolvable

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
  public get(index: number): VpcGatewayNetworkIpamConfigOutputReference {
    return new VpcGatewayNetworkIpamConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface VpcGatewayNetworkTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#create VpcGatewayNetwork#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#default VpcGatewayNetwork#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#delete VpcGatewayNetwork#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#read VpcGatewayNetwork#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#update VpcGatewayNetwork#update}
  */
  readonly update?: string;
}

export function vpcGatewayNetworkTimeoutsToTerraform(struct?: VpcGatewayNetworkTimeouts | cdktf.IResolvable): any {
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


export function vpcGatewayNetworkTimeoutsToHclTerraform(struct?: VpcGatewayNetworkTimeouts | cdktf.IResolvable): any {
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

export class VpcGatewayNetworkTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VpcGatewayNetworkTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: VpcGatewayNetworkTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network scaleway_vpc_gateway_network}
*/
export class VpcGatewayNetwork extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_gateway_network";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcGatewayNetwork resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcGatewayNetwork to import
  * @param importFromId The id of the existing VpcGatewayNetwork that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcGatewayNetwork to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_gateway_network", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/vpc_gateway_network scaleway_vpc_gateway_network} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcGatewayNetworkConfig
  */
  public constructor(scope: Construct, id: string, config: VpcGatewayNetworkConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_gateway_network',
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
    this._cleanupDhcp = config.cleanupDhcp;
    this._dhcpId = config.dhcpId;
    this._enableDhcp = config.enableDhcp;
    this._enableMasquerade = config.enableMasquerade;
    this._gatewayId = config.gatewayId;
    this._id = config.id;
    this._privateNetworkId = config.privateNetworkId;
    this._staticAddress = config.staticAddress;
    this._zone = config.zone;
    this._ipamConfig.internalValue = config.ipamConfig;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cleanup_dhcp - computed: true, optional: true, required: false
  private _cleanupDhcp?: boolean | cdktf.IResolvable; 
  public get cleanupDhcp() {
    return this.getBooleanAttribute('cleanup_dhcp');
  }
  public set cleanupDhcp(value: boolean | cdktf.IResolvable) {
    this._cleanupDhcp = value;
  }
  public resetCleanupDhcp() {
    this._cleanupDhcp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cleanupDhcpInput() {
    return this._cleanupDhcp;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // dhcp_id - computed: false, optional: true, required: false
  private _dhcpId?: string; 
  public get dhcpId() {
    return this.getStringAttribute('dhcp_id');
  }
  public set dhcpId(value: string) {
    this._dhcpId = value;
  }
  public resetDhcpId() {
    this._dhcpId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dhcpIdInput() {
    return this._dhcpId;
  }

  // enable_dhcp - computed: false, optional: true, required: false
  private _enableDhcp?: boolean | cdktf.IResolvable; 
  public get enableDhcp() {
    return this.getBooleanAttribute('enable_dhcp');
  }
  public set enableDhcp(value: boolean | cdktf.IResolvable) {
    this._enableDhcp = value;
  }
  public resetEnableDhcp() {
    this._enableDhcp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableDhcpInput() {
    return this._enableDhcp;
  }

  // enable_masquerade - computed: false, optional: true, required: false
  private _enableMasquerade?: boolean | cdktf.IResolvable; 
  public get enableMasquerade() {
    return this.getBooleanAttribute('enable_masquerade');
  }
  public set enableMasquerade(value: boolean | cdktf.IResolvable) {
    this._enableMasquerade = value;
  }
  public resetEnableMasquerade() {
    this._enableMasquerade = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableMasqueradeInput() {
    return this._enableMasquerade;
  }

  // gateway_id - computed: false, optional: false, required: true
  private _gatewayId?: string; 
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }
  public set gatewayId(value: string) {
    this._gatewayId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIdInput() {
    return this._gatewayId;
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

  // mac_address - computed: true, optional: false, required: false
  public get macAddress() {
    return this.getStringAttribute('mac_address');
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

  // static_address - computed: true, optional: true, required: false
  private _staticAddress?: string; 
  public get staticAddress() {
    return this.getStringAttribute('static_address');
  }
  public set staticAddress(value: string) {
    this._staticAddress = value;
  }
  public resetStaticAddress() {
    this._staticAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get staticAddressInput() {
    return this._staticAddress;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // ipam_config - computed: false, optional: true, required: false
  private _ipamConfig = new VpcGatewayNetworkIpamConfigList(this, "ipam_config", false);
  public get ipamConfig() {
    return this._ipamConfig;
  }
  public putIpamConfig(value: VpcGatewayNetworkIpamConfig[] | cdktf.IResolvable) {
    this._ipamConfig.internalValue = value;
  }
  public resetIpamConfig() {
    this._ipamConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipamConfigInput() {
    return this._ipamConfig.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new VpcGatewayNetworkTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VpcGatewayNetworkTimeouts) {
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
      cleanup_dhcp: cdktf.booleanToTerraform(this._cleanupDhcp),
      dhcp_id: cdktf.stringToTerraform(this._dhcpId),
      enable_dhcp: cdktf.booleanToTerraform(this._enableDhcp),
      enable_masquerade: cdktf.booleanToTerraform(this._enableMasquerade),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      id: cdktf.stringToTerraform(this._id),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
      static_address: cdktf.stringToTerraform(this._staticAddress),
      zone: cdktf.stringToTerraform(this._zone),
      ipam_config: cdktf.listMapper(vpcGatewayNetworkIpamConfigToTerraform, true)(this._ipamConfig.internalValue),
      timeouts: vpcGatewayNetworkTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cleanup_dhcp: {
        value: cdktf.booleanToHclTerraform(this._cleanupDhcp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      dhcp_id: {
        value: cdktf.stringToHclTerraform(this._dhcpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_dhcp: {
        value: cdktf.booleanToHclTerraform(this._enableDhcp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enable_masquerade: {
        value: cdktf.booleanToHclTerraform(this._enableMasquerade),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      gateway_id: {
        value: cdktf.stringToHclTerraform(this._gatewayId),
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
      private_network_id: {
        value: cdktf.stringToHclTerraform(this._privateNetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      static_address: {
        value: cdktf.stringToHclTerraform(this._staticAddress),
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
      ipam_config: {
        value: cdktf.listMapperHcl(vpcGatewayNetworkIpamConfigToHclTerraform, true)(this._ipamConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "VpcGatewayNetworkIpamConfigList",
      },
      timeouts: {
        value: vpcGatewayNetworkTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "VpcGatewayNetworkTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
