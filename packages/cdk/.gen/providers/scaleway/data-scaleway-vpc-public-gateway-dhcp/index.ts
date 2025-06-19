// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcPublicGatewayDhcpConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the public gateway DHCP configuration
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp#dhcp_id DataScalewayVpcPublicGatewayDhcp#dhcp_id}
  */
  readonly dhcpId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp#id DataScalewayVpcPublicGatewayDhcp#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp scaleway_vpc_public_gateway_dhcp}
*/
export class DataScalewayVpcPublicGatewayDhcp extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway_dhcp";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcPublicGatewayDhcp resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcPublicGatewayDhcp to import
  * @param importFromId The id of the existing DataScalewayVpcPublicGatewayDhcp that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcPublicGatewayDhcp to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_public_gateway_dhcp", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway_dhcp scaleway_vpc_public_gateway_dhcp} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcPublicGatewayDhcpConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcPublicGatewayDhcpConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway_dhcp',
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
    this._dhcpId = config.dhcpId;
    this._id = config.id;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // address - computed: true, optional: false, required: false
  public get address() {
    return this.getStringAttribute('address');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // dhcp_id - computed: false, optional: false, required: true
  private _dhcpId?: string; 
  public get dhcpId() {
    return this.getStringAttribute('dhcp_id');
  }
  public set dhcpId(value: string) {
    this._dhcpId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get dhcpIdInput() {
    return this._dhcpId;
  }

  // dns_local_name - computed: true, optional: false, required: false
  public get dnsLocalName() {
    return this.getStringAttribute('dns_local_name');
  }

  // dns_search - computed: true, optional: false, required: false
  public get dnsSearch() {
    return this.getListAttribute('dns_search');
  }

  // dns_servers_override - computed: true, optional: false, required: false
  public get dnsServersOverride() {
    return this.getListAttribute('dns_servers_override');
  }

  // enable_dynamic - computed: true, optional: false, required: false
  public get enableDynamic() {
    return this.getBooleanAttribute('enable_dynamic');
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // pool_high - computed: true, optional: false, required: false
  public get poolHigh() {
    return this.getStringAttribute('pool_high');
  }

  // pool_low - computed: true, optional: false, required: false
  public get poolLow() {
    return this.getStringAttribute('pool_low');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // push_default_route - computed: true, optional: false, required: false
  public get pushDefaultRoute() {
    return this.getBooleanAttribute('push_default_route');
  }

  // push_dns_server - computed: true, optional: false, required: false
  public get pushDnsServer() {
    return this.getBooleanAttribute('push_dns_server');
  }

  // rebind_timer - computed: true, optional: false, required: false
  public get rebindTimer() {
    return this.getNumberAttribute('rebind_timer');
  }

  // renew_timer - computed: true, optional: false, required: false
  public get renewTimer() {
    return this.getNumberAttribute('renew_timer');
  }

  // subnet - computed: true, optional: false, required: false
  public get subnet() {
    return this.getStringAttribute('subnet');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // valid_lifetime - computed: true, optional: false, required: false
  public get validLifetime() {
    return this.getNumberAttribute('valid_lifetime');
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
      id: cdktf.stringToTerraform(this._id),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
