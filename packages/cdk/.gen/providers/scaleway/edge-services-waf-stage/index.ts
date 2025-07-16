// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesWafStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the backend stage to forward requests to after the WAF stage
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#backend_stage_id EdgeServicesWafStage#backend_stage_id}
  */
  readonly backendStageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#id EdgeServicesWafStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Mode defining WAF behavior (`disable`/`log_only`/`enable`)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#mode EdgeServicesWafStage#mode}
  */
  readonly mode?: string;
  /**
  * The sensitivity level (`1`,`2`,`3`,`4`) to use when classifying requests as malicious. With a high level, requests are more likely to be classed as malicious, and false positives are expected. With a lower level, requests are more likely to be classed as benign
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#paranoia_level EdgeServicesWafStage#paranoia_level}
  */
  readonly paranoiaLevel: number;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#pipeline_id EdgeServicesWafStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#project_id EdgeServicesWafStage#project_id}
  */
  readonly projectId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage scaleway_edge_services_waf_stage}
*/
export class EdgeServicesWafStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_waf_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesWafStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesWafStage to import
  * @param importFromId The id of the existing EdgeServicesWafStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesWafStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_waf_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_waf_stage scaleway_edge_services_waf_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesWafStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesWafStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_waf_stage',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.57.0',
        providerVersionConstraint: '>= 2.57.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._backendStageId = config.backendStageId;
    this._id = config.id;
    this._mode = config.mode;
    this._paranoiaLevel = config.paranoiaLevel;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_stage_id - computed: true, optional: true, required: false
  private _backendStageId?: string; 
  public get backendStageId() {
    return this.getStringAttribute('backend_stage_id');
  }
  public set backendStageId(value: string) {
    this._backendStageId = value;
  }
  public resetBackendStageId() {
    this._backendStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendStageIdInput() {
    return this._backendStageId;
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

  // mode - computed: true, optional: true, required: false
  private _mode?: string; 
  public get mode() {
    return this.getStringAttribute('mode');
  }
  public set mode(value: string) {
    this._mode = value;
  }
  public resetMode() {
    this._mode = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get modeInput() {
    return this._mode;
  }

  // paranoia_level - computed: false, optional: false, required: true
  private _paranoiaLevel?: number; 
  public get paranoiaLevel() {
    return this.getNumberAttribute('paranoia_level');
  }
  public set paranoiaLevel(value: number) {
    this._paranoiaLevel = value;
  }
  // Temporarily expose input value. Use with caution.
  public get paranoiaLevelInput() {
    return this._paranoiaLevel;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backend_stage_id: cdktf.stringToTerraform(this._backendStageId),
      id: cdktf.stringToTerraform(this._id),
      mode: cdktf.stringToTerraform(this._mode),
      paranoia_level: cdktf.numberToTerraform(this._paranoiaLevel),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      backend_stage_id: {
        value: cdktf.stringToHclTerraform(this._backendStageId),
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
      mode: {
        value: cdktf.stringToHclTerraform(this._mode),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      paranoia_level: {
        value: cdktf.numberToHclTerraform(this._paranoiaLevel),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      pipeline_id: {
        value: cdktf.stringToHclTerraform(this._pipelineId),
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
