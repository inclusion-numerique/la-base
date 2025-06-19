// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesHeadStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the head stage of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage#head_stage_id EdgeServicesHeadStage#head_stage_id}
  */
  readonly headStageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage#id EdgeServicesHeadStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage#pipeline_id EdgeServicesHeadStage#pipeline_id}
  */
  readonly pipelineId: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage scaleway_edge_services_head_stage}
*/
export class EdgeServicesHeadStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_head_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesHeadStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesHeadStage to import
  * @param importFromId The id of the existing EdgeServicesHeadStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesHeadStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_head_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_head_stage scaleway_edge_services_head_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesHeadStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesHeadStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_head_stage',
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
    this._headStageId = config.headStageId;
    this._id = config.id;
    this._pipelineId = config.pipelineId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // head_stage_id - computed: true, optional: true, required: false
  private _headStageId?: string; 
  public get headStageId() {
    return this.getStringAttribute('head_stage_id');
  }
  public set headStageId(value: string) {
    this._headStageId = value;
  }
  public resetHeadStageId() {
    this._headStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get headStageIdInput() {
    return this._headStageId;
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

  // pipeline_id - computed: false, optional: false, required: true
  private _pipelineId?: string; 
  public get pipelineId() {
    return this.getStringAttribute('pipeline_id');
  }
  public set pipelineId(value: string) {
    this._pipelineId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pipelineIdInput() {
    return this._pipelineId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      head_stage_id: cdktf.stringToTerraform(this._headStageId),
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      head_stage_id: {
        value: cdktf.stringToHclTerraform(this._headStageId),
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
      pipeline_id: {
        value: cdktf.stringToHclTerraform(this._pipelineId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
