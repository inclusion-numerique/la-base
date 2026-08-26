// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayAutoscalingInstanceGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group#id DataScalewayAutoscalingInstanceGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the instance group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group#instance_group_id DataScalewayAutoscalingInstanceGroup#instance_group_id}
  */
  readonly instanceGroupId?: string;
  /**
  * The Instance group name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group#name DataScalewayAutoscalingInstanceGroup#name}
  */
  readonly name?: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group#zone DataScalewayAutoscalingInstanceGroup#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayAutoscalingInstanceGroupCapacity {
}

export function dataScalewayAutoscalingInstanceGroupCapacityToTerraform(struct?: DataScalewayAutoscalingInstanceGroupCapacity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayAutoscalingInstanceGroupCapacityToHclTerraform(struct?: DataScalewayAutoscalingInstanceGroupCapacity): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayAutoscalingInstanceGroupCapacityOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayAutoscalingInstanceGroupCapacity | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayAutoscalingInstanceGroupCapacity | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cooldown_delay - computed: true, optional: false, required: false
  public get cooldownDelay() {
    return this.getNumberAttribute('cooldown_delay');
  }

  // max_replicas - computed: true, optional: false, required: false
  public get maxReplicas() {
    return this.getNumberAttribute('max_replicas');
  }

  // min_replicas - computed: true, optional: false, required: false
  public get minReplicas() {
    return this.getNumberAttribute('min_replicas');
  }
}

export class DataScalewayAutoscalingInstanceGroupCapacityList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayAutoscalingInstanceGroupCapacityOutputReference {
    return new DataScalewayAutoscalingInstanceGroupCapacityOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayAutoscalingInstanceGroupLoadBalancer {
}

export function dataScalewayAutoscalingInstanceGroupLoadBalancerToTerraform(struct?: DataScalewayAutoscalingInstanceGroupLoadBalancer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayAutoscalingInstanceGroupLoadBalancerToHclTerraform(struct?: DataScalewayAutoscalingInstanceGroupLoadBalancer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayAutoscalingInstanceGroupLoadBalancerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayAutoscalingInstanceGroupLoadBalancer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayAutoscalingInstanceGroupLoadBalancer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // backend_ids - computed: true, optional: false, required: false
  public get backendIds() {
    return this.getListAttribute('backend_ids');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // private_network_id - computed: true, optional: false, required: false
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
}

export class DataScalewayAutoscalingInstanceGroupLoadBalancerList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayAutoscalingInstanceGroupLoadBalancerOutputReference {
    return new DataScalewayAutoscalingInstanceGroupLoadBalancerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group scaleway_autoscaling_instance_group}
*/
export class DataScalewayAutoscalingInstanceGroup extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_instance_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayAutoscalingInstanceGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayAutoscalingInstanceGroup to import
  * @param importFromId The id of the existing DataScalewayAutoscalingInstanceGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayAutoscalingInstanceGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_instance_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_group scaleway_autoscaling_instance_group} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayAutoscalingInstanceGroupConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayAutoscalingInstanceGroupConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_instance_group',
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
    this._instanceGroupId = config.instanceGroupId;
    this._name = config.name;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // capacity - computed: true, optional: false, required: false
  private _capacity = new DataScalewayAutoscalingInstanceGroupCapacityList(this, "capacity", false);
  public get capacity() {
    return this._capacity;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // delete_servers_on_destroy - computed: true, optional: false, required: false
  public get deleteServersOnDestroy() {
    return this.getBooleanAttribute('delete_servers_on_destroy');
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

  // instance_group_id - computed: false, optional: true, required: false
  private _instanceGroupId?: string; 
  public get instanceGroupId() {
    return this.getStringAttribute('instance_group_id');
  }
  public set instanceGroupId(value: string) {
    this._instanceGroupId = value;
  }
  public resetInstanceGroupId() {
    this._instanceGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceGroupIdInput() {
    return this._instanceGroupId;
  }

  // load_balancer - computed: true, optional: false, required: false
  private _loadBalancer = new DataScalewayAutoscalingInstanceGroupLoadBalancerList(this, "load_balancer", false);
  public get loadBalancer() {
    return this._loadBalancer;
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

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // template_id - computed: true, optional: false, required: false
  public get templateId() {
    return this.getStringAttribute('template_id');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // zone - computed: false, optional: true, required: false
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_group_id: cdktf.stringToTerraform(this._instanceGroupId),
      name: cdktf.stringToTerraform(this._name),
      zone: cdktf.stringToTerraform(this._zone),
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
      instance_group_id: {
        value: cdktf.stringToHclTerraform(this._instanceGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
