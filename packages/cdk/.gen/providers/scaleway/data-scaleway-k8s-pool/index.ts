// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayK8SPoolConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the cluster on which this pool will be created
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#cluster_id DataScalewayK8SPool#cluster_id}
  */
  readonly clusterId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#id DataScalewayK8SPool#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the cluster
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#name DataScalewayK8SPool#name}
  */
  readonly name?: string;
  /**
  * The ID of the pool
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#pool_id DataScalewayK8SPool#pool_id}
  */
  readonly poolId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#region DataScalewayK8SPool#region}
  */
  readonly region?: string;
  /**
  * Size of the pool
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool#size DataScalewayK8SPool#size}
  */
  readonly size?: number;
}
export interface DataScalewayK8SPoolNodes {
}

export function dataScalewayK8SPoolNodesToTerraform(struct?: DataScalewayK8SPoolNodes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayK8SPoolNodesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayK8SPoolNodes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayK8SPoolNodes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // public_ip - computed: true, optional: false, required: false
  public get publicIp() {
    return this.getStringAttribute('public_ip');
  }

  // public_ip_v6 - computed: true, optional: false, required: false
  public get publicIpV6() {
    return this.getStringAttribute('public_ip_v6');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }
}

export class DataScalewayK8SPoolNodesList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayK8SPoolNodesOutputReference {
    return new DataScalewayK8SPoolNodesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayK8SPoolUpgradePolicy {
}

export function dataScalewayK8SPoolUpgradePolicyToTerraform(struct?: DataScalewayK8SPoolUpgradePolicy): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayK8SPoolUpgradePolicyOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayK8SPoolUpgradePolicy | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayK8SPoolUpgradePolicy | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // max_surge - computed: true, optional: false, required: false
  public get maxSurge() {
    return this.getNumberAttribute('max_surge');
  }

  // max_unavailable - computed: true, optional: false, required: false
  public get maxUnavailable() {
    return this.getNumberAttribute('max_unavailable');
  }
}

export class DataScalewayK8SPoolUpgradePolicyList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayK8SPoolUpgradePolicyOutputReference {
    return new DataScalewayK8SPoolUpgradePolicyOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool scaleway_k8s_pool}
*/
export class DataScalewayK8SPool extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_k8s_pool";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/k8s_pool scaleway_k8s_pool} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayK8SPoolConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayK8SPoolConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_k8s_pool',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.19.0',
        providerVersionConstraint: '= 2.19.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._clusterId = config.clusterId;
    this._id = config.id;
    this._name = config.name;
    this._poolId = config.poolId;
    this._region = config.region;
    this._size = config.size;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // autohealing - computed: true, optional: false, required: false
  public get autohealing() {
    return this.getBooleanAttribute('autohealing');
  }

  // autoscaling - computed: true, optional: false, required: false
  public get autoscaling() {
    return this.getBooleanAttribute('autoscaling');
  }

  // cluster_id - computed: false, optional: true, required: false
  private _clusterId?: string; 
  public get clusterId() {
    return this.getStringAttribute('cluster_id');
  }
  public set clusterId(value: string) {
    this._clusterId = value;
  }
  public resetClusterId() {
    this._clusterId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get clusterIdInput() {
    return this._clusterId;
  }

  // container_runtime - computed: true, optional: false, required: false
  public get containerRuntime() {
    return this.getStringAttribute('container_runtime');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // current_size - computed: true, optional: false, required: false
  public get currentSize() {
    return this.getNumberAttribute('current_size');
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

  // kubelet_args - computed: true, optional: false, required: false
  private _kubeletArgs = new cdktf.StringMap(this, "kubelet_args");
  public get kubeletArgs() {
    return this._kubeletArgs;
  }

  // max_size - computed: true, optional: false, required: false
  public get maxSize() {
    return this.getNumberAttribute('max_size');
  }

  // min_size - computed: true, optional: false, required: false
  public get minSize() {
    return this.getNumberAttribute('min_size');
  }

  // name - computed: false, optional: true, required: false
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  public resetName() {
    this._name = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // node_type - computed: true, optional: false, required: false
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }

  // nodes - computed: true, optional: false, required: false
  private _nodes = new DataScalewayK8SPoolNodesList(this, "nodes", false);
  public get nodes() {
    return this._nodes;
  }

  // placement_group_id - computed: true, optional: false, required: false
  public get placementGroupId() {
    return this.getStringAttribute('placement_group_id');
  }

  // pool_id - computed: false, optional: true, required: false
  private _poolId?: string; 
  public get poolId() {
    return this.getStringAttribute('pool_id');
  }
  public set poolId(value: string) {
    this._poolId = value;
  }
  public resetPoolId() {
    this._poolId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get poolIdInput() {
    return this._poolId;
  }

  // region - computed: false, optional: true, required: false
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

  // root_volume_size_in_gb - computed: true, optional: false, required: false
  public get rootVolumeSizeInGb() {
    return this.getNumberAttribute('root_volume_size_in_gb');
  }

  // root_volume_type - computed: true, optional: false, required: false
  public get rootVolumeType() {
    return this.getStringAttribute('root_volume_type');
  }

  // size - computed: false, optional: true, required: false
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  public resetSize() {
    this._size = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // upgrade_policy - computed: true, optional: false, required: false
  private _upgradePolicy = new DataScalewayK8SPoolUpgradePolicyList(this, "upgrade_policy", false);
  public get upgradePolicy() {
    return this._upgradePolicy;
  }

  // version - computed: true, optional: false, required: false
  public get version() {
    return this.getStringAttribute('version');
  }

  // wait_for_pool_ready - computed: true, optional: false, required: false
  public get waitForPoolReady() {
    return this.getBooleanAttribute('wait_for_pool_ready');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cluster_id: cdktf.stringToTerraform(this._clusterId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      pool_id: cdktf.stringToTerraform(this._poolId),
      region: cdktf.stringToTerraform(this._region),
      size: cdktf.numberToTerraform(this._size),
    };
  }
}
