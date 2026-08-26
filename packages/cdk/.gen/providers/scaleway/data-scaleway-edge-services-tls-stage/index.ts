// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayEdgeServicesTlsStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#id DataScalewayEdgeServicesTlsStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#pipeline_id DataScalewayEdgeServicesTlsStage#pipeline_id}
  */
  readonly pipelineId?: string;
  /**
  * Secret ID to filter for. Only TLS stages with this Secret ID will be returned
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#secret_id DataScalewayEdgeServicesTlsStage#secret_id}
  */
  readonly secretId?: string;
  /**
  * Secret region to filter for. Only TLS stages with a Secret in this region will be returned
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#secret_region DataScalewayEdgeServicesTlsStage#secret_region}
  */
  readonly secretRegion?: string;
  /**
  * The ID of the TLS stage
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#tls_stage_id DataScalewayEdgeServicesTlsStage#tls_stage_id}
  */
  readonly tlsStageId?: string;
}
export interface DataScalewayEdgeServicesTlsStageSecrets {
}

export function dataScalewayEdgeServicesTlsStageSecretsToTerraform(struct?: DataScalewayEdgeServicesTlsStageSecrets): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayEdgeServicesTlsStageSecretsToHclTerraform(struct?: DataScalewayEdgeServicesTlsStageSecrets): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayEdgeServicesTlsStageSecretsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataScalewayEdgeServicesTlsStageSecrets | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayEdgeServicesTlsStageSecrets | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // secret_id - computed: true, optional: false, required: false
  public get secretId() {
    return this.getStringAttribute('secret_id');
  }
}

export class DataScalewayEdgeServicesTlsStageSecretsList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DataScalewayEdgeServicesTlsStageSecretsOutputReference {
    return new DataScalewayEdgeServicesTlsStageSecretsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage scaleway_edge_services_tls_stage}
*/
export class DataScalewayEdgeServicesTlsStage extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_tls_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayEdgeServicesTlsStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayEdgeServicesTlsStage to import
  * @param importFromId The id of the existing DataScalewayEdgeServicesTlsStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayEdgeServicesTlsStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_tls_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/edge_services_tls_stage scaleway_edge_services_tls_stage} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayEdgeServicesTlsStageConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayEdgeServicesTlsStageConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_tls_stage',
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
    this._secretId = config.secretId;
    this._secretRegion = config.secretRegion;
    this._tlsStageId = config.tlsStageId;
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

  // certificate_expires_at - computed: true, optional: false, required: false
  public get certificateExpiresAt() {
    return this.getStringAttribute('certificate_expires_at');
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

  // managed_certificate - computed: true, optional: false, required: false
  public get managedCertificate() {
    return this.getBooleanAttribute('managed_certificate');
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

  // route_stage_id - computed: true, optional: false, required: false
  public get routeStageId() {
    return this.getStringAttribute('route_stage_id');
  }

  // secret_id - computed: false, optional: true, required: false
  private _secretId?: string; 
  public get secretId() {
    return this.getStringAttribute('secret_id');
  }
  public set secretId(value: string) {
    this._secretId = value;
  }
  public resetSecretId() {
    this._secretId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretIdInput() {
    return this._secretId;
  }

  // secret_region - computed: false, optional: true, required: false
  private _secretRegion?: string; 
  public get secretRegion() {
    return this.getStringAttribute('secret_region');
  }
  public set secretRegion(value: string) {
    this._secretRegion = value;
  }
  public resetSecretRegion() {
    this._secretRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretRegionInput() {
    return this._secretRegion;
  }

  // secrets - computed: true, optional: false, required: false
  private _secrets = new DataScalewayEdgeServicesTlsStageSecretsList(this, "secrets", false);
  public get secrets() {
    return this._secrets;
  }

  // tls_stage_id - computed: false, optional: true, required: false
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // waf_stage_id - computed: true, optional: false, required: false
  public get wafStageId() {
    return this.getStringAttribute('waf_stage_id');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      secret_id: cdktf.stringToTerraform(this._secretId),
      secret_region: cdktf.stringToTerraform(this._secretRegion),
      tls_stage_id: cdktf.stringToTerraform(this._tlsStageId),
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
      secret_id: {
        value: cdktf.stringToHclTerraform(this._secretId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secret_region: {
        value: cdktf.stringToHclTerraform(this._secretRegion),
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
