// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesDnsStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The backend stage ID the DNS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#backend_stage_id EdgeServicesDnsStage#backend_stage_id}
  */
  readonly backendStageId?: string;
  /**
  * The cache stage ID the DNS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#cache_stage_id EdgeServicesDnsStage#cache_stage_id}
  */
  readonly cacheStageId?: string;
  /**
  * Fully Qualified Domain Name (in the format subdomain.example.com) to attach to the stage
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#fqdns EdgeServicesDnsStage#fqdns}
  */
  readonly fqdns?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#id EdgeServicesDnsStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#pipeline_id EdgeServicesDnsStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#project_id EdgeServicesDnsStage#project_id}
  */
  readonly projectId?: string;
  /**
  * The TLS stage ID the DNS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#tls_stage_id EdgeServicesDnsStage#tls_stage_id}
  */
  readonly tlsStageId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage scaleway_edge_services_dns_stage}
*/
export class EdgeServicesDnsStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_dns_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesDnsStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesDnsStage to import
  * @param importFromId The id of the existing EdgeServicesDnsStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesDnsStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_dns_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_dns_stage scaleway_edge_services_dns_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesDnsStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesDnsStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_dns_stage',
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
    this._backendStageId = config.backendStageId;
    this._cacheStageId = config.cacheStageId;
    this._fqdns = config.fqdns;
    this._id = config.id;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
    this._tlsStageId = config.tlsStageId;
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

  // cache_stage_id - computed: true, optional: true, required: false
  private _cacheStageId?: string; 
  public get cacheStageId() {
    return this.getStringAttribute('cache_stage_id');
  }
  public set cacheStageId(value: string) {
    this._cacheStageId = value;
  }
  public resetCacheStageId() {
    this._cacheStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cacheStageIdInput() {
    return this._cacheStageId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // fqdns - computed: true, optional: true, required: false
  private _fqdns?: string[]; 
  public get fqdns() {
    return this.getListAttribute('fqdns');
  }
  public set fqdns(value: string[]) {
    this._fqdns = value;
  }
  public resetFqdns() {
    this._fqdns = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fqdnsInput() {
    return this._fqdns;
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

  // tls_stage_id - computed: true, optional: true, required: false
  private _tlsStageId?: string; 
  public get tlsStageId() {
    return this.getStringAttribute('tls_stage_id');
  }
  public set tlsStageId(value: string) {
    this._tlsStageId = value;
  }
  public resetTlsStageId() {
    this._tlsStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tlsStageIdInput() {
    return this._tlsStageId;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
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
      cache_stage_id: cdktf.stringToTerraform(this._cacheStageId),
      fqdns: cdktf.listMapper(cdktf.stringToTerraform, false)(this._fqdns),
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
      tls_stage_id: cdktf.stringToTerraform(this._tlsStageId),
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
      cache_stage_id: {
        value: cdktf.stringToHclTerraform(this._cacheStageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fqdns: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._fqdns),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tls_stage_id: {
        value: cdktf.stringToHclTerraform(this._tlsStageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
