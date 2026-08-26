// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayEdgeServicesDnsStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the DNS stage
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage#dns_stage_id DataScalewayEdgeServicesDnsStage#dns_stage_id}
  */
  readonly dnsStageId?: string;
  /**
  * FQDN to filter for (in the format subdomain.example.com)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage#fqdn DataScalewayEdgeServicesDnsStage#fqdn}
  */
  readonly fqdn?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage#id DataScalewayEdgeServicesDnsStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage#pipeline_id DataScalewayEdgeServicesDnsStage#pipeline_id}
  */
  readonly pipelineId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage scaleway_edge_services_dns_stage}
*/
export class DataScalewayEdgeServicesDnsStage extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_dns_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayEdgeServicesDnsStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayEdgeServicesDnsStage to import
  * @param importFromId The id of the existing DataScalewayEdgeServicesDnsStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayEdgeServicesDnsStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_dns_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_dns_stage scaleway_edge_services_dns_stage} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayEdgeServicesDnsStageConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayEdgeServicesDnsStageConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_dns_stage',
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
    this._dnsStageId = config.dnsStageId;
    this._fqdn = config.fqdn;
    this._id = config.id;
    this._pipelineId = config.pipelineId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backend_stage_id - computed: true, optional: false, required: false
  public get backendStageId() {
    return this.getStringAttribute('backend_stage_id');
  }

  // cache_stage_id - computed: true, optional: false, required: false
  public get cacheStageId() {
    return this.getStringAttribute('cache_stage_id');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // default_fqdn - computed: true, optional: false, required: false
  public get defaultFqdn() {
    return this.getStringAttribute('default_fqdn');
  }

  // dns_stage_id - computed: false, optional: true, required: false
  private _dnsStageId?: string; 
  public get dnsStageId() {
    return this.getStringAttribute('dns_stage_id');
  }
  public set dnsStageId(value: string) {
    this._dnsStageId = value;
  }
  public resetDnsStageId() {
    this._dnsStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsStageIdInput() {
    return this._dnsStageId;
  }

  // fqdn - computed: false, optional: true, required: false
  private _fqdn?: string; 
  public get fqdn() {
    return this.getStringAttribute('fqdn');
  }
  public set fqdn(value: string) {
    this._fqdn = value;
  }
  public resetFqdn() {
    this._fqdn = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fqdnInput() {
    return this._fqdn;
  }

  // fqdns - computed: true, optional: false, required: false
  public get fqdns() {
    return this.getListAttribute('fqdns');
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

  // tls_stage_id - computed: true, optional: false, required: false
  public get tlsStageId() {
    return this.getStringAttribute('tls_stage_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // wildcard_domain - computed: true, optional: false, required: false
  public get wildcardDomain() {
    return this.getBooleanAttribute('wildcard_domain');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      dns_stage_id: cdktf.stringToTerraform(this._dnsStageId),
      fqdn: cdktf.stringToTerraform(this._fqdn),
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      dns_stage_id: {
        value: cdktf.stringToHclTerraform(this._dnsStageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      fqdn: {
        value: cdktf.stringToHclTerraform(this._fqdn),
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
