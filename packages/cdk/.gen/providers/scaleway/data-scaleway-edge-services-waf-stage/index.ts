// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayEdgeServicesWafStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage#id DataScalewayEdgeServicesWafStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage#pipeline_id DataScalewayEdgeServicesWafStage#pipeline_id}
  */
  readonly pipelineId?: string;
  /**
  * The ID of the WAF stage
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage#waf_stage_id DataScalewayEdgeServicesWafStage#waf_stage_id}
  */
  readonly wafStageId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage scaleway_edge_services_waf_stage}
*/
export class DataScalewayEdgeServicesWafStage extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_waf_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayEdgeServicesWafStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayEdgeServicesWafStage to import
  * @param importFromId The id of the existing DataScalewayEdgeServicesWafStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayEdgeServicesWafStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_waf_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_waf_stage scaleway_edge_services_waf_stage} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayEdgeServicesWafStageConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayEdgeServicesWafStageConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_waf_stage',
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
    this._id = config.id;
    this._pipelineId = config.pipelineId;
    this._wafStageId = config.wafStageId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_stage_id - computed: true, optional: false, required: false
  public get backendStageId() {
    return this.getStringAttribute('backend_stage_id');
  }

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

  // mode - computed: true, optional: false, required: false
  public get mode() {
    return this.getStringAttribute('mode');
  }

  // paranoia_level - computed: true, optional: false, required: false
  public get paranoiaLevel() {
    return this.getNumberAttribute('paranoia_level');
  }

  // pipeline_id - computed: false, optional: true, required: false
  private _pipelineId?: string; 
  public get pipelineId() {
    return this.getStringAttribute('pipeline_id');
  }
  public set pipelineId(value: string) {
    this._pipelineId = value;
  }
  public resetPipelineId() {
    this._pipelineId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pipelineIdInput() {
    return this._pipelineId;
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // waf_stage_id - computed: false, optional: true, required: false
  private _wafStageId?: string; 
  public get wafStageId() {
    return this.getStringAttribute('waf_stage_id');
  }
  public set wafStageId(value: string) {
    this._wafStageId = value;
  }
  public resetWafStageId() {
    this._wafStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get wafStageIdInput() {
    return this._wafStageId;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      waf_stage_id: cdktf.stringToTerraform(this._wafStageId),
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
      pipeline_id: {
        value: cdktf.stringToHclTerraform(this._pipelineId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      waf_stage_id: {
        value: cdktf.stringToHclTerraform(this._wafStageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
