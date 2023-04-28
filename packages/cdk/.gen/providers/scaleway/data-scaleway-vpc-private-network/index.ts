// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayVpcPrivateNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network#id DataScalewayVpcPrivateNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the private network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network#name DataScalewayVpcPrivateNetwork#name}
  */
  readonly name?: string;
  /**
  * The ID of the private network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network#private_network_id DataScalewayVpcPrivateNetwork#private_network_id}
  */
  readonly privateNetworkId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network scaleway_vpc_private_network}
*/
export class DataScalewayVpcPrivateNetwork extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_private_network";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/vpc_private_network scaleway_vpc_private_network} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayVpcPrivateNetworkConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayVpcPrivateNetworkConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_private_network',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.17.0',
        providerVersionConstraint: '>= 2.16.3'
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
    this._privateNetworkId = config.privateNetworkId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
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
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
    };
  }
}
