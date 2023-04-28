// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcPrivateNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network#id VpcPrivateNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the private network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network#name VpcPrivateNetwork#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network#project_id VpcPrivateNetwork#project_id}
  */
  readonly projectId?: string;
  /**
  * The tags associated with private network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network#tags VpcPrivateNetwork#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network#zone VpcPrivateNetwork#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network scaleway_vpc_private_network}
*/
export class VpcPrivateNetwork extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_private_network";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/vpc_private_network scaleway_vpc_private_network} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcPrivateNetworkConfig = {}
  */
  public constructor(scope: Construct, id: string, config: VpcPrivateNetworkConfig = {}) {
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
    this._projectId = config.projectId;
    this._tags = config.tags;
    this._zone = config.zone;
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

  // name - computed: true, optional: true, required: false
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

  // project_id - computed: true, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
