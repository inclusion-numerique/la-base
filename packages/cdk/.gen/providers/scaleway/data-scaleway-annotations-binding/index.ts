// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/annotations_binding
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayAnnotationsBindingConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the annotation binding to retrieve.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/annotations_binding#binding_id DataScalewayAnnotationsBinding#binding_id}
  */
  readonly bindingId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/annotations_binding scaleway_annotations_binding}
*/
export class DataScalewayAnnotationsBinding extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_annotations_binding";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayAnnotationsBinding resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayAnnotationsBinding to import
  * @param importFromId The id of the existing DataScalewayAnnotationsBinding that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/annotations_binding#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayAnnotationsBinding to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_annotations_binding", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/annotations_binding scaleway_annotations_binding} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayAnnotationsBindingConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayAnnotationsBindingConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_annotations_binding',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.81.0',
        providerVersionConstraint: '>= 2.81.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._bindingId = config.bindingId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // binding_id - computed: false, optional: false, required: true
  private _bindingId?: string; 
  public get bindingId() {
    return this.getStringAttribute('binding_id');
  }
  public set bindingId(value: string) {
    this._bindingId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get bindingIdInput() {
    return this._bindingId;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // key_id - computed: true, optional: false, required: false
  public get keyId() {
    return this.getStringAttribute('key_id');
  }

  // srn - computed: true, optional: false, required: false
  public get srn() {
    return this.getStringAttribute('srn');
  }

  // value_id - computed: true, optional: false, required: false
  public get valueId() {
    return this.getStringAttribute('value_id');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      binding_id: cdktf.stringToTerraform(this._bindingId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      binding_id: {
        value: cdktf.stringToHclTerraform(this._bindingId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
