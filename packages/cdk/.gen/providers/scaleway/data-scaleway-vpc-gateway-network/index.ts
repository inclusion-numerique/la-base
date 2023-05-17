// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcGatewayNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the public gateway DHCP config
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#dhcp_id DataScalewayVpcGatewayNetwork#dhcp_id}
  */
  readonly dhcpId?: string;
  /**
  * Enable masquerade on this network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#enable_masquerade DataScalewayVpcGatewayNetwork#enable_masquerade}
  */
  readonly enableMasquerade?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway where connect to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#gateway_id DataScalewayVpcGatewayNetwork#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * The ID of the gateway network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#gateway_network_id DataScalewayVpcGatewayNetwork#gateway_network_id}
  */
  readonly gatewayNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#id DataScalewayVpcGatewayNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the private network where connect to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network#private_network_id DataScalewayVpcGatewayNetwork#private_network_id}
  */
  readonly privateNetworkId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network scaleway_vpc_gateway_network}
*/
export class DataScalewayVpcGatewayNetwork extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_gateway_network";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/vpc_gateway_network scaleway_vpc_gateway_network} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcGatewayNetworkConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcGatewayNetworkConfig = {}) {
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
    this._dhcpId = config.dhcpId;
    this._enableMasquerade = config.enableMasquerade;
    this._gatewayId = config.gatewayId;
    this._gatewayNetworkId = config.gatewayNetworkId;
    this._id = config.id;
    this._privateNetworkId = config.privateNetworkId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cleanup_dhcp - computed: true, optional: false, required: false
  public get cleanupDhcp() {
    return this.getBooleanAttribute('cleanup_dhcp');
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

  // enable_dhcp - computed: true, optional: false, required: false
  public get enableDhcp() {
    return this.getBooleanAttribute('enable_dhcp');
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

  // gateway_id - computed: false, optional: true, required: false
  private _gatewayId?: string; 
  public get gatewayId() {
    return this.getStringAttribute('gateway_id');
  }
  public set gatewayId(value: string) {
    this._gatewayId = value;
  }
  public resetGatewayId() {
    this._gatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gatewayIdInput() {
    return this._gatewayId;
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

  // private_network_id - computed: false, optional: true, required: false
  private _privateNetworkId?: string; 
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
  public set privateNetworkId(value: string) {
    this._privateNetworkId = value;
  }
  public resetPrivateNetworkId() {
    this._privateNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdInput() {
    return this._privateNetworkId;
  }

  // static_address - computed: true, optional: false, required: false
  public get staticAddress() {
    return this.getStringAttribute('static_address');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      dhcp_id: cdktf.stringToTerraform(this._dhcpId),
      enable_masquerade: cdktf.booleanToTerraform(this._enableMasquerade),
      gateway_id: cdktf.stringToTerraform(this._gatewayId),
      gateway_network_id: cdktf.stringToTerraform(this._gatewayNetworkId),
      id: cdktf.stringToTerraform(this._id),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
    };
  }
}
