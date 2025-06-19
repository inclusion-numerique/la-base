// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesCacheStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The backend stage ID the cache stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#backend_stage_id EdgeServicesCacheStage#backend_stage_id}
  */
  readonly backendStageId?: string;
  /**
  * The Time To Live (TTL) in seconds. Defines how long content is cached
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#fallback_ttl EdgeServicesCacheStage#fallback_ttl}
  */
  readonly fallbackTtl?: number;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#id EdgeServicesCacheStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#pipeline_id EdgeServicesCacheStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#project_id EdgeServicesCacheStage#project_id}
  */
  readonly projectId?: string;
  /**
  * Trigger a refresh of the cache by changing this field's value
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#refresh_cache EdgeServicesCacheStage#refresh_cache}
  */
  readonly refreshCache?: string;
  /**
  * The route stage ID the cache stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#route_stage_id EdgeServicesCacheStage#route_stage_id}
  */
  readonly routeStageId?: string;
  /**
  * The WAF stage ID the cache stage will be linked to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#waf_stage_id EdgeServicesCacheStage#waf_stage_id}
  */
  readonly wafStageId?: string;
  /**
  * purge_requests block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#purge_requests EdgeServicesCacheStage#purge_requests}
  */
  readonly purgeRequests?: EdgeServicesCacheStagePurgeRequests[] | cdktf.IResolvable;
}
export interface EdgeServicesCacheStagePurgeRequests {
  /**
  * Defines whether to purge all content
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#all EdgeServicesCacheStage#all}
  */
  readonly all?: boolean | cdktf.IResolvable;
  /**
  * The list of asserts to purge
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#assets EdgeServicesCacheStage#assets}
  */
  readonly assets?: string[];
  /**
  * The pipeline ID in which the purge request will be created
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#pipeline_id EdgeServicesCacheStage#pipeline_id}
  */
  readonly pipelineId?: string;
}

export function edgeServicesCacheStagePurgeRequestsToTerraform(struct?: EdgeServicesCacheStagePurgeRequests | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    all: cdktf.booleanToTerraform(struct!.all),
    assets: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.assets),
    pipeline_id: cdktf.stringToTerraform(struct!.pipelineId),
  }
}


export function edgeServicesCacheStagePurgeRequestsToHclTerraform(struct?: EdgeServicesCacheStagePurgeRequests | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    all: {
      value: cdktf.booleanToHclTerraform(struct!.all),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    assets: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.assets),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    pipeline_id: {
      value: cdktf.stringToHclTerraform(struct!.pipelineId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesCacheStagePurgeRequestsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): EdgeServicesCacheStagePurgeRequests | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._all !== undefined) {
      hasAnyValues = true;
      internalValueResult.all = this._all;
    }
    if (this._assets !== undefined) {
      hasAnyValues = true;
      internalValueResult.assets = this._assets;
    }
    if (this._pipelineId !== undefined) {
      hasAnyValues = true;
      internalValueResult.pipelineId = this._pipelineId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesCacheStagePurgeRequests | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._all = undefined;
      this._assets = undefined;
      this._pipelineId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._all = value.all;
      this._assets = value.assets;
      this._pipelineId = value.pipelineId;
    }
  }

  // all - computed: false, optional: true, required: false
  private _all?: boolean | cdktf.IResolvable; 
  public get all() {
    return this.getBooleanAttribute('all');
  }
  public set all(value: boolean | cdktf.IResolvable) {
    this._all = value;
  }
  public resetAll() {
    this._all = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allInput() {
    return this._all;
  }

  // assets - computed: false, optional: true, required: false
  private _assets?: string[]; 
  public get assets() {
    return this.getListAttribute('assets');
  }
  public set assets(value: string[]) {
    this._assets = value;
  }
  public resetAssets() {
    this._assets = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get assetsInput() {
    return this._assets;
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
}

export class EdgeServicesCacheStagePurgeRequestsList extends cdktf.ComplexList {
  public internalValue? : EdgeServicesCacheStagePurgeRequests[] | cdktf.IResolvable

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
  public get(index: number): EdgeServicesCacheStagePurgeRequestsOutputReference {
    return new EdgeServicesCacheStagePurgeRequestsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage scaleway_edge_services_cache_stage}
*/
export class EdgeServicesCacheStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_cache_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesCacheStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesCacheStage to import
  * @param importFromId The id of the existing EdgeServicesCacheStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesCacheStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_cache_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_cache_stage scaleway_edge_services_cache_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesCacheStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesCacheStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_cache_stage',
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
    this._fallbackTtl = config.fallbackTtl;
    this._id = config.id;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
    this._refreshCache = config.refreshCache;
    this._routeStageId = config.routeStageId;
    this._wafStageId = config.wafStageId;
    this._purgeRequests.internalValue = config.purgeRequests;
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

  // fallback_ttl - computed: false, optional: true, required: false
  private _fallbackTtl?: number; 
  public get fallbackTtl() {
    return this.getNumberAttribute('fallback_ttl');
  }
  public set fallbackTtl(value: number) {
    this._fallbackTtl = value;
  }
  public resetFallbackTtl() {
    this._fallbackTtl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fallbackTtlInput() {
    return this._fallbackTtl;
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

  // refresh_cache - computed: false, optional: true, required: false
  private _refreshCache?: string; 
  public get refreshCache() {
    return this.getStringAttribute('refresh_cache');
  }
  public set refreshCache(value: string) {
    this._refreshCache = value;
  }
  public resetRefreshCache() {
    this._refreshCache = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get refreshCacheInput() {
    return this._refreshCache;
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

  // purge_requests - computed: false, optional: true, required: false
  private _purgeRequests = new EdgeServicesCacheStagePurgeRequestsList(this, "purge_requests", true);
  public get purgeRequests() {
    return this._purgeRequests;
  }
  public putPurgeRequests(value: EdgeServicesCacheStagePurgeRequests[] | cdktf.IResolvable) {
    this._purgeRequests.internalValue = value;
  }
  public resetPurgeRequests() {
    this._purgeRequests.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get purgeRequestsInput() {
    return this._purgeRequests.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      backend_stage_id: cdktf.stringToTerraform(this._backendStageId),
      fallback_ttl: cdktf.numberToTerraform(this._fallbackTtl),
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
      refresh_cache: cdktf.stringToTerraform(this._refreshCache),
      route_stage_id: cdktf.stringToTerraform(this._routeStageId),
      waf_stage_id: cdktf.stringToTerraform(this._wafStageId),
      purge_requests: cdktf.listMapper(edgeServicesCacheStagePurgeRequestsToTerraform, true)(this._purgeRequests.internalValue),
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
      fallback_ttl: {
        value: cdktf.numberToHclTerraform(this._fallbackTtl),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      refresh_cache: {
        value: cdktf.stringToHclTerraform(this._refreshCache),
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
      purge_requests: {
        value: cdktf.listMapperHcl(edgeServicesCacheStagePurgeRequestsToHclTerraform, true)(this._purgeRequests.internalValue),
        isBlock: true,
        type: "set",
        storageClassType: "EdgeServicesCacheStagePurgeRequestsList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
