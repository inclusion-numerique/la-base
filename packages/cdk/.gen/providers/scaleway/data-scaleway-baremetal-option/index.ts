// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayBaremetalOptionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option#id DataScalewayBaremetalOption#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Exact label of the desired option
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option#name DataScalewayBaremetalOption#name}
  */
  readonly name?: string;
  /**
  * The ID of the option
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option#option_id DataScalewayBaremetalOption#option_id}
  */
  readonly optionId?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option#zone DataScalewayBaremetalOption#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option scaleway_baremetal_option}
*/
export class DataScalewayBaremetalOption extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_baremetal_option";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/baremetal_option scaleway_baremetal_option} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayBaremetalOptionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayBaremetalOptionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_baremetal_option',
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
    this._optionId = config.optionId;
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

  // manageable - computed: true, optional: false, required: false
  public get manageable() {
    return this.getBooleanAttribute('manageable');
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

  // option_id - computed: false, optional: true, required: false
  private _optionId?: string; 
  public get optionId() {
    return this.getStringAttribute('option_id');
  }
  public set optionId(value: string) {
    this._optionId = value;
  }
  public resetOptionId() {
    this._optionId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get optionIdInput() {
    return this._optionId;
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
      option_id: cdktf.stringToTerraform(this._optionId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
