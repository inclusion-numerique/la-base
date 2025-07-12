// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcPublicGatewayDhcpReservationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the owning GatewayNetwork (UUID format).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#gateway_network_id DataScalewayVpcPublicGatewayDhcpReservation#gateway_network_id}
  */
  readonly gatewayNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#id DataScalewayVpcPublicGatewayDhcpReservation#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The MAC address to give a static entry to.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#mac_address DataScalewayVpcPublicGatewayDhcpReservation#mac_address}
  */
  readonly macAddress?: string;
  /**
  * The ID of dhcp entry reservation
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#reservation_id DataScalewayVpcPublicGatewayDhcpReservation#reservation_id}
  */
  readonly reservationId?: string;
  /**
  * Wait the MAC address in dhcp entries
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#wait_for_dhcp DataScalewayVpcPublicGatewayDhcpReservation#wait_for_dhcp}
  */
  readonly waitForDhcp?: boolean | cdktf.IResolvable;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#zone DataScalewayVpcPublicGatewayDhcpReservation#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation scaleway_vpc_public_gateway_dhcp_reservation}
*/
export class DataScalewayVpcPublicGatewayDhcpReservation extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway_dhcp_reservation";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcPublicGatewayDhcpReservation resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcPublicGatewayDhcpReservation to import
  * @param importFromId The id of the existing DataScalewayVpcPublicGatewayDhcpReservation that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcPublicGatewayDhcpReservation to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_public_gateway_dhcp_reservation", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/vpc_public_gateway_dhcp_reservation scaleway_vpc_public_gateway_dhcp_reservation} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcPublicGatewayDhcpReservationConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcPublicGatewayDhcpReservationConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway_dhcp_reservation',
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
    this._gatewayNetworkId = config.gatewayNetworkId;
    this._id = config.id;
    this._macAddress = config.macAddress;
    this._reservationId = config.reservationId;
    this._waitForDhcp = config.waitForDhcp;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // gateway_network_id - computed: false, optional: true, required: false
  private _gatewayNetworkId?: string; 
  public get gatewayNetworkId() {
    return this.getStringAttribute('gateway_network_id');
  }
  public set gatewayNetworkId(value: string) {
    this._gatewayNetworkId = value;
  }
  public resetGatewayNetworkId() {
    this._gatewayNetworkId = undefined;
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

  // ip_address - computed: true, optional: false, required: false
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }

  // mac_address - computed: false, optional: true, required: false
  private _macAddress?: string; 
  public get macAddress() {
    return this.getStringAttribute('mac_address');
  }
  public set macAddress(value: string) {
    this._macAddress = value;
  }
  public resetMacAddress() {
    this._macAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get macAddressInput() {
    return this._macAddress;
  }

  // reservation_id - computed: false, optional: true, required: false
  private _reservationId?: string; 
  public get reservationId() {
    return this.getStringAttribute('reservation_id');
  }
  public set reservationId(value: string) {
    this._reservationId = value;
  }
  public resetReservationId() {
    this._reservationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get reservationIdInput() {
    return this._reservationId;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // wait_for_dhcp - computed: false, optional: true, required: false
  private _waitForDhcp?: boolean | cdktf.IResolvable; 
  public get waitForDhcp() {
    return this.getBooleanAttribute('wait_for_dhcp');
  }
  public set waitForDhcp(value: boolean | cdktf.IResolvable) {
    this._waitForDhcp = value;
  }
  public resetWaitForDhcp() {
    this._waitForDhcp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get waitForDhcpInput() {
    return this._waitForDhcp;
  }

  // zone - computed: false, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      gateway_network_id: cdktf.stringToTerraform(this._gatewayNetworkId),
      id: cdktf.stringToTerraform(this._id),
      mac_address: cdktf.stringToTerraform(this._macAddress),
      reservation_id: cdktf.stringToTerraform(this._reservationId),
      wait_for_dhcp: cdktf.booleanToTerraform(this._waitForDhcp),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      gateway_network_id: {
        value: cdktf.stringToHclTerraform(this._gatewayNetworkId),
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
      mac_address: {
        value: cdktf.stringToHclTerraform(this._macAddress),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      reservation_id: {
        value: cdktf.stringToHclTerraform(this._reservationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      wait_for_dhcp: {
        value: cdktf.booleanToHclTerraform(this._waitForDhcp),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
