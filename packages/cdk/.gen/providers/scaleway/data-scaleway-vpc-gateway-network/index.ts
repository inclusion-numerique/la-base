// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcGatewayNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the public gateway DHCP config
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#dhcp_id DataScalewayVpcGatewayNetwork#dhcp_id}
  */
  readonly dhcpId?: string;
  /**
  * Enable masquerade on this network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#enable_masquerade DataScalewayVpcGatewayNetwork#enable_masquerade}
  */
  readonly enableMasquerade?: boolean | cdktf.IResolvable;
  /**
  * The ID of the public gateway where connect to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#gateway_id DataScalewayVpcGatewayNetwork#gateway_id}
  */
  readonly gatewayId?: string;
  /**
  * The ID of the gateway network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#gateway_network_id DataScalewayVpcGatewayNetwork#gateway_network_id}
  */
  readonly gatewayNetworkId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#id DataScalewayVpcGatewayNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the private network where connect to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#private_network_id DataScalewayVpcGatewayNetwork#private_network_id}
  */
  readonly privateNetworkId?: string;
}
export interface DataScalewayVpcGatewayNetworkIpamConfig {
}

export function dataScalewayVpcGatewayNetworkIpamConfigToTerraform(struct?: DataScalewayVpcGatewayNetworkIpamConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayVpcGatewayNetworkIpamConfigToHclTerraform(struct?: DataScalewayVpcGatewayNetworkIpamConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayVpcGatewayNetworkIpamConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataScalewayVpcGatewayNetworkIpamConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayVpcGatewayNetworkIpamConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // ipam_ip_id - computed: true, optional: false, required: false
  public get ipamIpId() {
    return this.getStringAttribute('ipam_ip_id');
  }

  // push_default_route - computed: true, optional: false, required: false
  public get pushDefaultRoute() {
    return this.getBooleanAttribute('push_default_route');
  }
}

export class DataScalewayVpcGatewayNetworkIpamConfigList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayVpcGatewayNetworkIpamConfigOutputReference {
    return new DataScalewayVpcGatewayNetworkIpamConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network scaleway_vpc_gateway_network}
*/
export class DataScalewayVpcGatewayNetwork extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_gateway_network";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcGatewayNetwork resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcGatewayNetwork to import
  * @param importFromId The id of the existing DataScalewayVpcGatewayNetwork that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcGatewayNetwork to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_gateway_network", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/vpc_gateway_network scaleway_vpc_gateway_network} Data Source
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
        providerVersion: '2.42.1',
        providerVersionConstraint: '>= 2.42.1'
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

  // ipam_config - computed: true, optional: false, required: false
  private _ipamConfig = new DataScalewayVpcGatewayNetworkIpamConfigList(this, "ipam_config", false);
  public get ipamConfig() {
    return this._ipamConfig;
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      dhcp_id: {
        value: cdktf.stringToHclTerraform(this._dhcpId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
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
      private_network_id: {
        value: cdktf.stringToHclTerraform(this._privateNetworkId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
