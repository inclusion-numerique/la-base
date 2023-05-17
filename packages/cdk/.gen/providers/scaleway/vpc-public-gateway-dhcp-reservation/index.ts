// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcPublicGatewayDhcpReservationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the owning GatewayNetwork (UUID format).
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#gateway_network_id VpcPublicGatewayDhcpReservation#gateway_network_id}
  */
  readonly gatewayNetworkId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#id VpcPublicGatewayDhcpReservation#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The IP address to give to the machine (IPv4 address).
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#ip_address VpcPublicGatewayDhcpReservation#ip_address}
  */
  readonly ipAddress: string;
  /**
  * The MAC address to give a static entry to.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#mac_address VpcPublicGatewayDhcpReservation#mac_address}
  */
  readonly macAddress: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#zone VpcPublicGatewayDhcpReservation#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#timeouts VpcPublicGatewayDhcpReservation#timeouts}
  */
  readonly timeouts?: VpcPublicGatewayDhcpReservationTimeouts;
}
export interface VpcPublicGatewayDhcpReservationTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#create VpcPublicGatewayDhcpReservation#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#default VpcPublicGatewayDhcpReservation#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#delete VpcPublicGatewayDhcpReservation#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation#update VpcPublicGatewayDhcpReservation#update}
  */
  readonly update?: string;
}

export function vpcPublicGatewayDhcpReservationTimeoutsToTerraform(struct?: VpcPublicGatewayDhcpReservationTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class VpcPublicGatewayDhcpReservationTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): VpcPublicGatewayDhcpReservationTimeouts | cdktf.IResolvable | undefined {
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
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: VpcPublicGatewayDhcpReservationTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation scaleway_vpc_public_gateway_dhcp_reservation}
*/
export class VpcPublicGatewayDhcpReservation extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway_dhcp_reservation";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/vpc_public_gateway_dhcp_reservation scaleway_vpc_public_gateway_dhcp_reservation} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcPublicGatewayDhcpReservationConfig
  */
  public constructor(scope: Construct, id: string, config: VpcPublicGatewayDhcpReservationConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway_dhcp_reservation',
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
    this._gatewayNetworkId = config.gatewayNetworkId;
    this._id = config.id;
    this._ipAddress = config.ipAddress;
    this._macAddress = config.macAddress;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // gateway_network_id - computed: false, optional: false, required: true
  private _gatewayNetworkId?: string; 
  public get gatewayNetworkId() {
    return this.getStringAttribute('gateway_network_id');
  }
  public set gatewayNetworkId(value: string) {
    this._gatewayNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayNetworkIdInput() {
    return this._gatewayNetworkId;
  }

  // hostname - computed: true, optional: false, required: false
  public get hostname() {
    return this.getStringAttribute('hostname');
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

  // ip_address - computed: false, optional: false, required: true
  private _ipAddress?: string; 
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }
  public set ipAddress(value: string) {
    this._ipAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
  }

  // mac_address - computed: false, optional: false, required: true
  private _macAddress?: string; 
  public get macAddress() {
    return this.getStringAttribute('mac_address');
  }
  public set macAddress(value: string) {
    this._macAddress = value;
  }
  // Temporarily expose input value. Use with caution.
  public get macAddressInput() {
    return this._macAddress;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
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
  private _timeouts = new VpcPublicGatewayDhcpReservationTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: VpcPublicGatewayDhcpReservationTimeouts) {
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
      gateway_network_id: cdktf.stringToTerraform(this._gatewayNetworkId),
      id: cdktf.stringToTerraform(this._id),
      ip_address: cdktf.stringToTerraform(this._ipAddress),
      mac_address: cdktf.stringToTerraform(this._macAddress),
      zone: cdktf.stringToTerraform(this._zone),
      timeouts: vpcPublicGatewayDhcpReservationTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
