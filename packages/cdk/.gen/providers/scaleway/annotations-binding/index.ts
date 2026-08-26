// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AnnotationsBindingConfig extends cdktf.TerraformMetaArguments {
  /**
  * Scaleway Resource Number to associate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding#srn AnnotationsBinding#srn}
  */
  readonly srn: string;
  /**
  * ID of the value to associate.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding#value_id AnnotationsBinding#value_id}
  */
  readonly valueId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding scaleway_annotations_binding}
*/
export class AnnotationsBinding extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_annotations_binding";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AnnotationsBinding resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AnnotationsBinding to import
  * @param importFromId The id of the existing AnnotationsBinding that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AnnotationsBinding to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_annotations_binding", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/annotations_binding scaleway_annotations_binding} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AnnotationsBindingConfig
  */
  public constructor(scope: Construct, id: string, config: AnnotationsBindingConfig) {
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
    this._srn = config.srn;
    this._valueId = config.valueId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // key_id - computed: true, optional: false, required: false
  public get keyId() {
    return this.getStringAttribute('key_id');
  }

  // srn - computed: false, optional: false, required: true
  private _srn?: string; 
  public get srn() {
    return this.getStringAttribute('srn');
  }
  public set srn(value: string) {
    this._srn = value;
  }
  // Temporarily expose input value. Use with caution.
  public get srnInput() {
    return this._srn;
  }

  // value_id - computed: false, optional: false, required: true
  private _valueId?: string; 
  public get valueId() {
    return this.getStringAttribute('value_id');
  }
  public set valueId(value: string) {
    this._valueId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueIdInput() {
    return this._valueId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      srn: cdktf.stringToTerraform(this._srn),
      value_id: cdktf.stringToTerraform(this._valueId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      srn: {
        value: cdktf.stringToHclTerraform(this._srn),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      value_id: {
        value: cdktf.stringToHclTerraform(this._valueId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
