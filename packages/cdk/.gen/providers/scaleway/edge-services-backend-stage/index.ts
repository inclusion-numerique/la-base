// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface EdgeServicesBackendStageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#id EdgeServicesBackendStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the pipeline
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#pipeline_id EdgeServicesBackendStage#pipeline_id}
  */
  readonly pipelineId: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#project_id EdgeServicesBackendStage#project_id}
  */
  readonly projectId?: string;
  /**
  * lb_backend_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#lb_backend_config EdgeServicesBackendStage#lb_backend_config}
  */
  readonly lbBackendConfig?: EdgeServicesBackendStageLbBackendConfig[] | cdktf.IResolvable;
  /**
  * s3_backend_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#s3_backend_config EdgeServicesBackendStage#s3_backend_config}
  */
  readonly s3BackendConfig?: EdgeServicesBackendStageS3BackendConfig;
}
export interface EdgeServicesBackendStageLbBackendConfigLbConfig {
  /**
  * Fully Qualified Domain Name (in the format subdomain.example.com) to use in HTTP requests sent towards your Load Balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#domain_name EdgeServicesBackendStage#domain_name}
  */
  readonly domainName?: string;
  /**
  * ID of the frontend linked to the Load Balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#frontend_id EdgeServicesBackendStage#frontend_id}
  */
  readonly frontendId?: string;
  /**
  * ID of the Load Balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#id EdgeServicesBackendStage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Defines whether the Load Balancer's frontend handles SSL connections
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#is_ssl EdgeServicesBackendStage#is_ssl}
  */
  readonly isSsl?: boolean | cdktf.IResolvable;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#zone EdgeServicesBackendStage#zone}
  */
  readonly zone?: string;
}

export function edgeServicesBackendStageLbBackendConfigLbConfigToTerraform(struct?: EdgeServicesBackendStageLbBackendConfigLbConfigOutputReference | EdgeServicesBackendStageLbBackendConfigLbConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    domain_name: cdktf.stringToTerraform(struct!.domainName),
    frontend_id: cdktf.stringToTerraform(struct!.frontendId),
    id: cdktf.stringToTerraform(struct!.id),
    is_ssl: cdktf.booleanToTerraform(struct!.isSsl),
    zone: cdktf.stringToTerraform(struct!.zone),
  }
}


export function edgeServicesBackendStageLbBackendConfigLbConfigToHclTerraform(struct?: EdgeServicesBackendStageLbBackendConfigLbConfigOutputReference | EdgeServicesBackendStageLbBackendConfigLbConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    domain_name: {
      value: cdktf.stringToHclTerraform(struct!.domainName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    frontend_id: {
      value: cdktf.stringToHclTerraform(struct!.frontendId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_ssl: {
      value: cdktf.booleanToHclTerraform(struct!.isSsl),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    zone: {
      value: cdktf.stringToHclTerraform(struct!.zone),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesBackendStageLbBackendConfigLbConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EdgeServicesBackendStageLbBackendConfigLbConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._domainName !== undefined) {
      hasAnyValues = true;
      internalValueResult.domainName = this._domainName;
    }
    if (this._frontendId !== undefined) {
      hasAnyValues = true;
      internalValueResult.frontendId = this._frontendId;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._isSsl !== undefined) {
      hasAnyValues = true;
      internalValueResult.isSsl = this._isSsl;
    }
    if (this._zone !== undefined) {
      hasAnyValues = true;
      internalValueResult.zone = this._zone;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesBackendStageLbBackendConfigLbConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._domainName = undefined;
      this._frontendId = undefined;
      this._id = undefined;
      this._isSsl = undefined;
      this._zone = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._domainName = value.domainName;
      this._frontendId = value.frontendId;
      this._id = value.id;
      this._isSsl = value.isSsl;
      this._zone = value.zone;
    }
  }

  // domain_name - computed: false, optional: true, required: false
  private _domainName?: string; 
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }
  public set domainName(value: string) {
    this._domainName = value;
  }
  public resetDomainName() {
    this._domainName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainNameInput() {
    return this._domainName;
  }

  // frontend_id - computed: false, optional: true, required: false
  private _frontendId?: string; 
  public get frontendId() {
    return this.getStringAttribute('frontend_id');
  }
  public set frontendId(value: string) {
    this._frontendId = value;
  }
  public resetFrontendId() {
    this._frontendId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get frontendIdInput() {
    return this._frontendId;
  }

  // id - computed: false, optional: true, required: false
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

  // is_ssl - computed: false, optional: true, required: false
  private _isSsl?: boolean | cdktf.IResolvable; 
  public get isSsl() {
    return this.getBooleanAttribute('is_ssl');
  }
  public set isSsl(value: boolean | cdktf.IResolvable) {
    this._isSsl = value;
  }
  public resetIsSsl() {
    this._isSsl = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSslInput() {
    return this._isSsl;
  }

  // zone - computed: true, optional: true, required: false
  private _zone?: string; 
  public get zone() {
    return this.getStringAttribute('zone');
  }
  public set zone(value: string) {
    this._zone = value;
  }
  public resetZone() {
    this._zone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zoneInput() {
    return this._zone;
  }
}
export interface EdgeServicesBackendStageLbBackendConfig {
  /**
  * lb_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#lb_config EdgeServicesBackendStage#lb_config}
  */
  readonly lbConfig?: EdgeServicesBackendStageLbBackendConfigLbConfig;
}

export function edgeServicesBackendStageLbBackendConfigToTerraform(struct?: EdgeServicesBackendStageLbBackendConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    lb_config: edgeServicesBackendStageLbBackendConfigLbConfigToTerraform(struct!.lbConfig),
  }
}


export function edgeServicesBackendStageLbBackendConfigToHclTerraform(struct?: EdgeServicesBackendStageLbBackendConfig | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    lb_config: {
      value: edgeServicesBackendStageLbBackendConfigLbConfigToHclTerraform(struct!.lbConfig),
      isBlock: true,
      type: "list",
      storageClassType: "EdgeServicesBackendStageLbBackendConfigLbConfigList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesBackendStageLbBackendConfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): EdgeServicesBackendStageLbBackendConfig | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._lbConfig?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.lbConfig = this._lbConfig?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesBackendStageLbBackendConfig | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._lbConfig.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._lbConfig.internalValue = value.lbConfig;
    }
  }

  // lb_config - computed: false, optional: true, required: false
  private _lbConfig = new EdgeServicesBackendStageLbBackendConfigLbConfigOutputReference(this, "lb_config");
  public get lbConfig() {
    return this._lbConfig;
  }
  public putLbConfig(value: EdgeServicesBackendStageLbBackendConfigLbConfig) {
    this._lbConfig.internalValue = value;
  }
  public resetLbConfig() {
    this._lbConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbConfigInput() {
    return this._lbConfig.internalValue;
  }
}

export class EdgeServicesBackendStageLbBackendConfigList extends cdktf.ComplexList {
  public internalValue? : EdgeServicesBackendStageLbBackendConfig[] | cdktf.IResolvable

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
  public get(index: number): EdgeServicesBackendStageLbBackendConfigOutputReference {
    return new EdgeServicesBackendStageLbBackendConfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface EdgeServicesBackendStageS3BackendConfig {
  /**
  * The name of the Bucket
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#bucket_name EdgeServicesBackendStage#bucket_name}
  */
  readonly bucketName?: string;
  /**
  * The region of the Bucket
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#bucket_region EdgeServicesBackendStage#bucket_region}
  */
  readonly bucketRegion?: string;
  /**
  * Defines whether the bucket website feature is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#is_website EdgeServicesBackendStage#is_website}
  */
  readonly isWebsite?: boolean | cdktf.IResolvable;
}

export function edgeServicesBackendStageS3BackendConfigToTerraform(struct?: EdgeServicesBackendStageS3BackendConfigOutputReference | EdgeServicesBackendStageS3BackendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    bucket_name: cdktf.stringToTerraform(struct!.bucketName),
    bucket_region: cdktf.stringToTerraform(struct!.bucketRegion),
    is_website: cdktf.booleanToTerraform(struct!.isWebsite),
  }
}


export function edgeServicesBackendStageS3BackendConfigToHclTerraform(struct?: EdgeServicesBackendStageS3BackendConfigOutputReference | EdgeServicesBackendStageS3BackendConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    bucket_name: {
      value: cdktf.stringToHclTerraform(struct!.bucketName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    bucket_region: {
      value: cdktf.stringToHclTerraform(struct!.bucketRegion),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    is_website: {
      value: cdktf.booleanToHclTerraform(struct!.isWebsite),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class EdgeServicesBackendStageS3BackendConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): EdgeServicesBackendStageS3BackendConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._bucketName !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketName = this._bucketName;
    }
    if (this._bucketRegion !== undefined) {
      hasAnyValues = true;
      internalValueResult.bucketRegion = this._bucketRegion;
    }
    if (this._isWebsite !== undefined) {
      hasAnyValues = true;
      internalValueResult.isWebsite = this._isWebsite;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: EdgeServicesBackendStageS3BackendConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._bucketName = undefined;
      this._bucketRegion = undefined;
      this._isWebsite = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._bucketName = value.bucketName;
      this._bucketRegion = value.bucketRegion;
      this._isWebsite = value.isWebsite;
    }
  }

  // bucket_name - computed: false, optional: true, required: false
  private _bucketName?: string; 
  public get bucketName() {
    return this.getStringAttribute('bucket_name');
  }
  public set bucketName(value: string) {
    this._bucketName = value;
  }
  public resetBucketName() {
    this._bucketName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketNameInput() {
    return this._bucketName;
  }

  // bucket_region - computed: false, optional: true, required: false
  private _bucketRegion?: string; 
  public get bucketRegion() {
    return this.getStringAttribute('bucket_region');
  }
  public set bucketRegion(value: string) {
    this._bucketRegion = value;
  }
  public resetBucketRegion() {
    this._bucketRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bucketRegionInput() {
    return this._bucketRegion;
  }

  // is_website - computed: false, optional: true, required: false
  private _isWebsite?: boolean | cdktf.IResolvable; 
  public get isWebsite() {
    return this.getBooleanAttribute('is_website');
  }
  public set isWebsite(value: boolean | cdktf.IResolvable) {
    this._isWebsite = value;
  }
  public resetIsWebsite() {
    this._isWebsite = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isWebsiteInput() {
    return this._isWebsite;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage scaleway_edge_services_backend_stage}
*/
export class EdgeServicesBackendStage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_edge_services_backend_stage";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a EdgeServicesBackendStage resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the EdgeServicesBackendStage to import
  * @param importFromId The id of the existing EdgeServicesBackendStage that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the EdgeServicesBackendStage to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_edge_services_backend_stage", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/edge_services_backend_stage scaleway_edge_services_backend_stage} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options EdgeServicesBackendStageConfig
  */
  public constructor(scope: Construct, id: string, config: EdgeServicesBackendStageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_edge_services_backend_stage',
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
    this._id = config.id;
    this._pipelineId = config.pipelineId;
    this._projectId = config.projectId;
    this._lbBackendConfig.internalValue = config.lbBackendConfig;
    this._s3BackendConfig.internalValue = config.s3BackendConfig;
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

  // lb_backend_config - computed: false, optional: true, required: false
  private _lbBackendConfig = new EdgeServicesBackendStageLbBackendConfigList(this, "lb_backend_config", false);
  public get lbBackendConfig() {
    return this._lbBackendConfig;
  }
  public putLbBackendConfig(value: EdgeServicesBackendStageLbBackendConfig[] | cdktf.IResolvable) {
    this._lbBackendConfig.internalValue = value;
  }
  public resetLbBackendConfig() {
    this._lbBackendConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get lbBackendConfigInput() {
    return this._lbBackendConfig.internalValue;
  }

  // s3_backend_config - computed: false, optional: true, required: false
  private _s3BackendConfig = new EdgeServicesBackendStageS3BackendConfigOutputReference(this, "s3_backend_config");
  public get s3BackendConfig() {
    return this._s3BackendConfig;
  }
  public putS3BackendConfig(value: EdgeServicesBackendStageS3BackendConfig) {
    this._s3BackendConfig.internalValue = value;
  }
  public resetS3BackendConfig() {
    this._s3BackendConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get s3BackendConfigInput() {
    return this._s3BackendConfig.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      pipeline_id: cdktf.stringToTerraform(this._pipelineId),
      project_id: cdktf.stringToTerraform(this._projectId),
      lb_backend_config: cdktf.listMapper(edgeServicesBackendStageLbBackendConfigToTerraform, true)(this._lbBackendConfig.internalValue),
      s3_backend_config: edgeServicesBackendStageS3BackendConfigToTerraform(this._s3BackendConfig.internalValue),
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
      lb_backend_config: {
        value: cdktf.listMapperHcl(edgeServicesBackendStageLbBackendConfigToHclTerraform, true)(this._lbBackendConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EdgeServicesBackendStageLbBackendConfigList",
      },
      s3_backend_config: {
        value: edgeServicesBackendStageS3BackendConfigToHclTerraform(this._s3BackendConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "EdgeServicesBackendStageS3BackendConfigList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
