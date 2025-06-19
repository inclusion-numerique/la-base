// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcPublicGatewayConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#id DataScalewayVpcPublicGateway#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * name of the gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#name DataScalewayVpcPublicGateway#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#project_id DataScalewayVpcPublicGateway#project_id}
  */
  readonly projectId?: string;
  /**
  * The ID of the public gateway
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#public_gateway_id DataScalewayVpcPublicGateway#public_gateway_id}
  */
  readonly publicGatewayId?: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#zone DataScalewayVpcPublicGateway#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway scaleway_vpc_public_gateway}
*/
export class DataScalewayVpcPublicGateway extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayVpcPublicGateway resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayVpcPublicGateway to import
  * @param importFromId The id of the existing DataScalewayVpcPublicGateway that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayVpcPublicGateway to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_public_gateway", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/data-sources/vpc_public_gateway scaleway_vpc_public_gateway} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcPublicGatewayConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcPublicGatewayConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway',
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
    this._publicGatewayId = config.publicGatewayId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // allowed_ip_ranges - computed: true, optional: false, required: false
  public get allowedIpRanges() {
    return cdktf.Fn.tolist(this.getListAttribute('allowed_ip_ranges'));
  }

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // bastion_enabled - computed: true, optional: false, required: false
  public get bastionEnabled() {
    return this.getBooleanAttribute('bastion_enabled');
  }

  // bastion_port - computed: true, optional: false, required: false
  public get bastionPort() {
    return this.getNumberAttribute('bastion_port');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // enable_smtp - computed: true, optional: false, required: false
  public get enableSmtp() {
    return this.getBooleanAttribute('enable_smtp');
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

  // ip_id - computed: true, optional: false, required: false
  public get ipId() {
    return this.getStringAttribute('ip_id');
  }

  // move_to_ipam - computed: true, optional: false, required: false
  public get moveToIpam() {
    return this.getBooleanAttribute('move_to_ipam');
  }

  // name - computed: false, optional: true, required: false
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

  // project_id - computed: false, optional: true, required: false
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

  // public_gateway_id - computed: false, optional: true, required: false
  private _publicGatewayId?: string; 
  public get publicGatewayId() {
    return this.getStringAttribute('public_gateway_id');
  }
  public set publicGatewayId(value: string) {
    this._publicGatewayId = value;
  }
  public resetPublicGatewayId() {
    this._publicGatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicGatewayIdInput() {
    return this._publicGatewayId;
  }

  // refresh_ssh_keys - computed: true, optional: false, required: false
  public get refreshSshKeys() {
    return this.getStringAttribute('refresh_ssh_keys');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // upstream_dns_servers - computed: true, optional: false, required: false
  public get upstreamDnsServers() {
    return this.getListAttribute('upstream_dns_servers');
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
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      public_gateway_id: cdktf.stringToTerraform(this._publicGatewayId),
      zone: cdktf.stringToTerraform(this._zone),
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
      public_gateway_id: {
        value: cdktf.stringToHclTerraform(this._publicGatewayId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
