// https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/data-sources/instance_ip
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInstanceIpConfig extends cdktf.TerraformMetaArguments {
  /**
  * The IP address
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/data-sources/instance_ip#address DataScalewayInstanceIp#address}
  */
  readonly address?: string;
  /**
  * The ID of the IP address
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/data-sources/instance_ip#id DataScalewayInstanceIp#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/data-sources/instance_ip scaleway_instance_ip}
*/
export class DataScalewayInstanceIp extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_ip";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/data-sources/instance_ip scaleway_instance_ip} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInstanceIpConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInstanceIpConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_ip',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.18.0',
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
    this._address = config.address;
    this._id = config.id;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // address - computed: false, optional: true, required: false
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  public resetAddress() {
    this._address = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // id - computed: false, optional: true, required: false
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

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // reverse - computed: true, optional: false, required: false
  public get reverse() {
    return this.getStringAttribute('reverse');
  }

  // server_id - computed: true, optional: false, required: false
  public get serverId() {
    return this.getStringAttribute('server_id');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
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
      address: cdktf.stringToTerraform(this._address),
      id: cdktf.stringToTerraform(this._id),
    };
  }
}
