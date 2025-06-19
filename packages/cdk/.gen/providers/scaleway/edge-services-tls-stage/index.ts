// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesTlsStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The backend stage ID the TLS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#backend_stage_id EdgeServicesTlsStage#backend_stage_id}
  */
  readonly backendStageId?: string;
  /**
  * The cache stage ID the TLS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#cache_stage_id EdgeServicesTlsStage#cache_stage_id}
  */
  readonly cacheStageId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#id EdgeServicesTlsStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Set to true when Scaleway generates and manages a Let's Encrypt certificate for the TLS stage/custom endpoint
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#managed_certificate EdgeServicesTlsStage#managed_certificate}
  */
  readonly managedCertificate?: boolean | cdktf.IResolvable;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#pipeline_id EdgeServicesTlsStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#project_id EdgeServicesTlsStage#project_id}
  */
  readonly projectId?: string;
  /**
  * The route stage ID the TLS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#route_stage_id EdgeServicesTlsStage#route_stage_id}
  */
  readonly routeStageId?: string;
  /**
  * The WAF stage ID the TLS stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#waf_stage_id EdgeServicesTlsStage#waf_stage_id}
  */
  readonly wafStageId?: string;
  /**
  * secrets block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#secrets EdgeServicesTlsStage#secrets}
  */
  readonly secrets?: EdgeServicesTlsStageSecrets[] | cdktf.IResolvable;
}
export interface EdgeServicesTlsStageSecrets {
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#region EdgeServicesTlsStage#region}
  */
  readonly region?: string;
  /**
  * The ID of the Secret
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#secret_id EdgeServicesTlsStage#secret_id}
  */
  readonly secretId?: string;
}

export function edgeServicesTlsStageSecretsToTerraform(struct?: EdgeServicesTlsStageSecrets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    region: cdktf.stringToTerraform(struct!.region),
    secret_id: cdktf.stringToTerraform(struct!.secretId),
  }
}


export function edgeServicesTlsStageSecretsToHclTerraform(struct?: EdgeServicesTlsStageSecrets | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    region: {
      value: cdktf.stringToHclTerraform(struct!.region),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    secret_id: {
      value: cdktf.stringToHclTerraform(struct!.secretId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesTlsStageSecretsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): EdgeServicesTlsStageSecrets | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._region !== undefined) {
      hasAnyValues = true;
      internalValueResult.region = this._region;
    }
    if (this._secretId !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretId = this._secretId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesTlsStageSecrets | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._region = undefined;
      this._secretId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._region = value.region;
      this._secretId = value.secretId;
    }
  }

  // region - computed: true, optional: true, required: false
  private _region?: string; 
  public get region() {
    return this.getStringAttribute('region');
  }
  public set region(value: string) {
    this._region = value;
  }
  public resetRegion() {
    this._region = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get regionInput() {
    return this._region;
  }

  // secret_id - computed: true, optional: true, required: false
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
}

export class EdgeServicesTlsStageSecretsList extends cdktf.ComplexList {
  public internalValue? : EdgeServicesTlsStageSecrets[] | cdktf.IResolvable

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
  public get(index: number): EdgeServicesTlsStageSecretsOutputReference {
    return new EdgeServicesTlsStageSecretsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage scaleway_edge_services_tls_stage}
*/
export class EdgeServicesTlsStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_tls_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesTlsStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesTlsStage to import
  * @param importFromId The id of the existing EdgeServicesTlsStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesTlsStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_tls_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_tls_stage scaleway_edge_services_tls_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesTlsStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesTlsStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_tls_stage',
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
    this._id = config.id;
    this._managedCertificate = config.managedCertificate;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
    this._routeStageId = config.routeStageId;
    this._wafStageId = config.wafStageId;
    this._secrets.internalValue = config.secrets;
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

  // managed_certificate - computed: true, optional: true, required: false
  private _managedCertificate?: boolean | cdktf.IResolvable; 
  public get managedCertificate() {
    return this.getBooleanAttribute('managed_certificate');
  }
  public set managedCertificate(value: boolean | cdktf.IResolvable) {
    this._managedCertificate = value;
  }
  public resetManagedCertificate() {
    this._managedCertificate = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managedCertificateInput() {
    return this._managedCertificate;
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

  // route_stage_id - computed: true, optional: true, required: false
  private _routeStageId?: string; 
  public get routeStageId() {
    return this.getStringAttribute('route_stage_id');
  }
  public set routeStageId(value: string) {
    this._routeStageId = value;
  }
  public resetRouteStageId() {
    this._routeStageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeStageIdInput() {
    return this._routeStageId;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // waf_stage_id - computed: true, optional: true, required: false
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

  // secrets - computed: false, optional: true, required: false
  private _secrets = new EdgeServicesTlsStageSecretsList(this, "secrets", false);
  public get secrets() {
    return this._secrets;
  }
  public putSecrets(value: EdgeServicesTlsStageSecrets[] | cdktf.IResolvable) {
    this._secrets.internalValue = value;
  }
  public resetSecrets() {
    this._secrets.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretsInput() {
    return this._secrets.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backend_stage_id: cdktf.stringToTerraform(this._backendStageId),
      cache_stage_id: cdktf.stringToTerraform(this._cacheStageId),
      id: cdktf.stringToTerraform(this._id),
      managed_certificate: cdktf.booleanToTerraform(this._managedCertificate),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
      route_stage_id: cdktf.stringToTerraform(this._routeStageId),
      waf_stage_id: cdktf.stringToTerraform(this._wafStageId),
      secrets: cdktf.listMapper(edgeServicesTlsStageSecretsToTerraform, true)(this._secrets.internalValue),
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
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      managed_certificate: {
        value: cdktf.booleanToHclTerraform(this._managedCertificate),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
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
      route_stage_id: {
        value: cdktf.stringToHclTerraform(this._routeStageId),
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
      secrets: {
        value: cdktf.listMapperHcl(edgeServicesTlsStageSecretsToHclTerraform, true)(this._secrets.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EdgeServicesTlsStageSecretsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
