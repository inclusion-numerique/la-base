// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcGatewayNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * Remove DHCP config on this network on destroy
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#cleanup_dhcp VpcGatewayNetwork#cleanup_dhcp}
  */
  readonly cleanupDhcp?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway DHCP config
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#dhcp_id VpcGatewayNetwork#dhcp_id}
  */
  readonly dhcpId?: string;
  /**
  * Enable DHCP config on this network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#enable_dhcp VpcGatewayNetwork#enable_dhcp}
  */
  readonly enableDhcp?: boolean | cdktf.IResolvable;
  /**
  * Enable masquerade on this network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#enable_masquerade VpcGatewayNetwork#enable_masquerade}
  */
  readonly enableMasquerade?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway where connect to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#gateway_id VpcGatewayNetwork#gateway_id}
  */
  readonly gatewayId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#id VpcGatewayNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the private network where connect to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#private_network_id VpcGatewayNetwork#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * The static IP address in CIDR on this network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#static_address VpcGatewayNetwork#static_address}
  */
  readonly staticAddress?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#zone VpcGatewayNetwork#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#timeouts VpcGatewayNetwork#timeouts}
  */
  readonly timeouts?: VpcGatewayNetworkTimeouts;
}
export interface VpcGatewayNetworkTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#create VpcGatewayNetwork#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#default VpcGatewayNetwork#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#delete VpcGatewayNetwork#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#read VpcGatewayNetwork#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network#update VpcGatewayNetwork#update}
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network scaleway_vpc_gateway_network}
*/
export class VpcGatewayNetwork extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_gateway_network";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_gateway_network scaleway_vpc_gateway_network} Resource
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
    this._cleanupDhcp = config.cleanupDhcp;
    this._dhcpId = config.dhcpId;
    this._enableDhcp = config.enableDhcp;
    this._enableMasquerade = config.enableMasquerade;
    this._gatewayId = config.gatewayId;
    this._id = config.id;
    this._privateNetworkId = config.privateNetworkId;
    this._staticAddress = config.staticAddress;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cleanup_dhcp - computed: false, optional: true, required: false
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

  // static_address - computed: false, optional: true, required: false
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
      timeouts: vpcGatewayNetworkTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
