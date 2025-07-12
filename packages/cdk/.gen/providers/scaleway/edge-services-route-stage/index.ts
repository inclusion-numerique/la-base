// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesRouteStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#id EdgeServicesRouteStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#pipeline_id EdgeServicesRouteStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#project_id EdgeServicesRouteStage#project_id}
  */
  readonly projectId?: string;
  /**
  * The ID of the WAF stage HTTP requests should be forwarded to when no rules are matched
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#waf_stage_id EdgeServicesRouteStage#waf_stage_id}
  */
  readonly wafStageId?: string;
  /**
  * rule block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#rule EdgeServicesRouteStage#rule}
  */
  readonly rule?: EdgeServicesRouteStageRule[] | cdktf.IResolvable;
}
export interface EdgeServicesRouteStageRuleRuleHttpMatchPathFilter {
  /**
  * The type of filter to match for the HTTP URL path. For now, all path filters must be written in regex and use the `regex` type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#path_filter_type EdgeServicesRouteStage#path_filter_type}
  */
  readonly pathFilterType: string;
  /**
  * The value to be matched for the HTTP URL path
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#value EdgeServicesRouteStage#value}
  */
  readonly value: string;
}

export function edgeServicesRouteStageRuleRuleHttpMatchPathFilterToTerraform(struct?: EdgeServicesRouteStageRuleRuleHttpMatchPathFilterOutputReference | EdgeServicesRouteStageRuleRuleHttpMatchPathFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    path_filter_type: cdktf.stringToTerraform(struct!.pathFilterType),
    value: cdktf.stringToTerraform(struct!.value),
  }
}


export function edgeServicesRouteStageRuleRuleHttpMatchPathFilterToHclTerraform(struct?: EdgeServicesRouteStageRuleRuleHttpMatchPathFilterOutputReference | EdgeServicesRouteStageRuleRuleHttpMatchPathFilter): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    path_filter_type: {
      value: cdktf.stringToHclTerraform(struct!.pathFilterType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    value: {
      value: cdktf.stringToHclTerraform(struct!.value),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesRouteStageRuleRuleHttpMatchPathFilterOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EdgeServicesRouteStageRuleRuleHttpMatchPathFilter | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._pathFilterType !== undefined) {
      hasAnyValues = true;
      internalValueResult.pathFilterType = this._pathFilterType;
    }
    if (this._value !== undefined) {
      hasAnyValues = true;
      internalValueResult.value = this._value;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesRouteStageRuleRuleHttpMatchPathFilter | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._pathFilterType = undefined;
      this._value = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._pathFilterType = value.pathFilterType;
      this._value = value.value;
    }
  }

  // path_filter_type - computed: false, optional: false, required: true
  private _pathFilterType?: string; 
  public get pathFilterType() {
    return this.getStringAttribute('path_filter_type');
  }
  public set pathFilterType(value: string) {
    this._pathFilterType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pathFilterTypeInput() {
    return this._pathFilterType;
  }

  // value - computed: false, optional: false, required: true
  private _value?: string; 
  public get value() {
    return this.getStringAttribute('value');
  }
  public set value(value: string) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
  }
}
export interface EdgeServicesRouteStageRuleRuleHttpMatch {
  /**
  * HTTP methods to filter for. A request using any of these methods will be considered to match the rule. Possible values are `get`, `post`, `put`, `patch`, `delete`, `head`, `options`. All methods will match if none is provided
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#method_filters EdgeServicesRouteStage#method_filters}
  */
  readonly methodFilters?: string[];
  /**
  * path_filter block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#path_filter EdgeServicesRouteStage#path_filter}
  */
  readonly pathFilter?: EdgeServicesRouteStageRuleRuleHttpMatchPathFilter;
}

export function edgeServicesRouteStageRuleRuleHttpMatchToTerraform(struct?: EdgeServicesRouteStageRuleRuleHttpMatchOutputReference | EdgeServicesRouteStageRuleRuleHttpMatch): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    method_filters: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.methodFilters),
    path_filter: edgeServicesRouteStageRuleRuleHttpMatchPathFilterToTerraform(struct!.pathFilter),
  }
}


export function edgeServicesRouteStageRuleRuleHttpMatchToHclTerraform(struct?: EdgeServicesRouteStageRuleRuleHttpMatchOutputReference | EdgeServicesRouteStageRuleRuleHttpMatch): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    method_filters: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.methodFilters),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    path_filter: {
      value: edgeServicesRouteStageRuleRuleHttpMatchPathFilterToHclTerraform(struct!.pathFilter),
      isBlock: true,
      type: "list",
      storageClassType: "EdgeServicesRouteStageRuleRuleHttpMatchPathFilterList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesRouteStageRuleRuleHttpMatchOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EdgeServicesRouteStageRuleRuleHttpMatch | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._methodFilters !== undefined) {
      hasAnyValues = true;
      internalValueResult.methodFilters = this._methodFilters;
    }
    if (this._pathFilter?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.pathFilter = this._pathFilter?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesRouteStageRuleRuleHttpMatch | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._methodFilters = undefined;
      this._pathFilter.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._methodFilters = value.methodFilters;
      this._pathFilter.internalValue = value.pathFilter;
    }
  }

  // method_filters - computed: true, optional: true, required: false
  private _methodFilters?: string[]; 
  public get methodFilters() {
    return this.getListAttribute('method_filters');
  }
  public set methodFilters(value: string[]) {
    this._methodFilters = value;
  }
  public resetMethodFilters() {
    this._methodFilters = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get methodFiltersInput() {
    return this._methodFilters;
  }

  // path_filter - computed: false, optional: true, required: false
  private _pathFilter = new EdgeServicesRouteStageRuleRuleHttpMatchPathFilterOutputReference(this, "path_filter");
  public get pathFilter() {
    return this._pathFilter;
  }
  public putPathFilter(value: EdgeServicesRouteStageRuleRuleHttpMatchPathFilter) {
    this._pathFilter.internalValue = value;
  }
  public resetPathFilter() {
    this._pathFilter.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pathFilterInput() {
    return this._pathFilter.internalValue;
  }
}
export interface EdgeServicesRouteStageRule {
  /**
  * ID of the backend stage that requests matching the rule should be forwarded to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#backend_stage_id EdgeServicesRouteStage#backend_stage_id}
  */
  readonly backendStageId: string;
  /**
  * rule_http_match block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#rule_http_match EdgeServicesRouteStage#rule_http_match}
  */
  readonly ruleHttpMatch?: EdgeServicesRouteStageRuleRuleHttpMatch;
}

export function edgeServicesRouteStageRuleToTerraform(struct?: EdgeServicesRouteStageRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    backend_stage_id: cdktf.stringToTerraform(struct!.backendStageId),
    rule_http_match: edgeServicesRouteStageRuleRuleHttpMatchToTerraform(struct!.ruleHttpMatch),
  }
}


export function edgeServicesRouteStageRuleToHclTerraform(struct?: EdgeServicesRouteStageRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    backend_stage_id: {
      value: cdktf.stringToHclTerraform(struct!.backendStageId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    rule_http_match: {
      value: edgeServicesRouteStageRuleRuleHttpMatchToHclTerraform(struct!.ruleHttpMatch),
      isBlock: true,
      type: "list",
      storageClassType: "EdgeServicesRouteStageRuleRuleHttpMatchList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesRouteStageRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): EdgeServicesRouteStageRule | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._backendStageId !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendStageId = this._backendStageId;
    }
    if (this._ruleHttpMatch?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.ruleHttpMatch = this._ruleHttpMatch?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesRouteStageRule | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._backendStageId = undefined;
      this._ruleHttpMatch.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._backendStageId = value.backendStageId;
      this._ruleHttpMatch.internalValue = value.ruleHttpMatch;
    }
  }

  // backend_stage_id - computed: false, optional: false, required: true
  private _backendStageId?: string; 
  public get backendStageId() {
    return this.getStringAttribute('backend_stage_id');
  }
  public set backendStageId(value: string) {
    this._backendStageId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backendStageIdInput() {
    return this._backendStageId;
  }

  // rule_http_match - computed: false, optional: true, required: false
  private _ruleHttpMatch = new EdgeServicesRouteStageRuleRuleHttpMatchOutputReference(this, "rule_http_match");
  public get ruleHttpMatch() {
    return this._ruleHttpMatch;
  }
  public putRuleHttpMatch(value: EdgeServicesRouteStageRuleRuleHttpMatch) {
    this._ruleHttpMatch.internalValue = value;
  }
  public resetRuleHttpMatch() {
    this._ruleHttpMatch.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleHttpMatchInput() {
    return this._ruleHttpMatch.internalValue;
  }
}

export class EdgeServicesRouteStageRuleList extends cdktf.ComplexList {
  public internalValue? : EdgeServicesRouteStageRule[] | cdktf.IResolvable

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
  public get(index: number): EdgeServicesRouteStageRuleOutputReference {
    return new EdgeServicesRouteStageRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage scaleway_edge_services_route_stage}
*/
export class EdgeServicesRouteStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_route_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesRouteStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesRouteStage to import
  * @param importFromId The id of the existing EdgeServicesRouteStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesRouteStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_route_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/edge_services_route_stage scaleway_edge_services_route_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesRouteStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesRouteStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_route_stage',
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
    this._id = config.id;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
    this._wafStageId = config.wafStageId;
    this._rule.internalValue = config.rule;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // rule - computed: false, optional: true, required: false
  private _rule = new EdgeServicesRouteStageRuleList(this, "rule", false);
  public get rule() {
    return this._rule;
  }
  public putRule(value: EdgeServicesRouteStageRule[] | cdktf.IResolvable) {
    this._rule.internalValue = value;
  }
  public resetRule() {
    this._rule.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ruleInput() {
    return this._rule.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
      waf_stage_id: cdktf.stringToTerraform(this._wafStageId),
      rule: cdktf.listMapper(edgeServicesRouteStageRuleToTerraform, true)(this._rule.internalValue),
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
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
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
      rule: {
        value: cdktf.listMapperHcl(edgeServicesRouteStageRuleToHclTerraform, true)(this._rule.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EdgeServicesRouteStageRuleList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
