// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInstancePrivateNicConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#id DataScalewayInstancePrivateNic#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The private network ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#private_network_id DataScalewayInstancePrivateNic#private_network_id}
  */
  readonly privateNetworkId?: string;
  /**
  * The ID of the Private NIC
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#private_nic_id DataScalewayInstancePrivateNic#private_nic_id}
  */
  readonly privateNicId?: string;
  /**
  * The server ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#server_id DataScalewayInstancePrivateNic#server_id}
  */
  readonly serverId: string;
  /**
  * The tags associated with the private-nic
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#tags DataScalewayInstancePrivateNic#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic#zone DataScalewayInstancePrivateNic#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic scaleway_instance_private_nic}
*/
export class DataScalewayInstancePrivateNic extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_private_nic";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/instance_private_nic scaleway_instance_private_nic} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInstancePrivateNicConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInstancePrivateNicConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_private_nic',
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
    this._privateNetworkId = config.privateNetworkId;
    this._privateNicId = config.privateNicId;
    this._serverId = config.serverId;
    this._tags = config.tags;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // private_nic_id - computed: false, optional: true, required: false
  private _privateNicId?: string; 
  public get privateNicId() {
    return this.getStringAttribute('private_nic_id');
  }
  public set privateNicId(value: string) {
    this._privateNicId = value;
  }
  public resetPrivateNicId() {
    this._privateNicId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNicIdInput() {
    return this._privateNicId;
  }

  // server_id - computed: false, optional: false, required: true
  private _serverId?: string; 
  public get serverId() {
    return this.getStringAttribute('server_id');
  }
  public set serverId(value: string) {
    this._serverId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverIdInput() {
    return this._serverId;
  }

  // tags - computed: false, optional: true, required: false
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
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
      private_nic_id: cdktf.stringToTerraform(this._privateNicId),
      server_id: cdktf.stringToTerraform(this._serverId),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
