// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AutoscalingInstanceGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * Whether to delete all instances in this group when the group is destroyed. Set to `true` to tear them down, `false` (the default) leaves them running
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#delete_servers_on_destroy AutoscalingInstanceGroup#delete_servers_on_destroy}
  */
  readonly deleteServersOnDestroy?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#id AutoscalingInstanceGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The Instance group name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#name AutoscalingInstanceGroup#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#project_id AutoscalingInstanceGroup#project_id}
  */
  readonly projectId?: string;
  /**
  * The tags associated with the Instance group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#tags AutoscalingInstanceGroup#tags}
  */
  readonly tags?: string[];
  /**
  * ID of the Instance template to attach to the Instance group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#template_id AutoscalingInstanceGroup#template_id}
  */
  readonly templateId: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#zone AutoscalingInstanceGroup#zone}
  */
  readonly zone?: string;
  /**
  * capacity block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#capacity AutoscalingInstanceGroup#capacity}
  */
  readonly capacity?: AutoscalingInstanceGroupCapacity[] | cdktf.IResolvable;
  /**
  * load_balancer block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#load_balancer AutoscalingInstanceGroup#load_balancer}
  */
  readonly loadBalancer?: AutoscalingInstanceGroupLoadBalancer[] | cdktf.IResolvable;
}
export interface AutoscalingInstanceGroupCapacity {
  /**
  * Time (in seconds) after a scaling action during which requests to carry out a new scaling action will be denied
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#cooldown_delay AutoscalingInstanceGroup#cooldown_delay}
  */
  readonly cooldownDelay?: number;
  /**
  * The maximum count of Instances for the Instance group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#max_replicas AutoscalingInstanceGroup#max_replicas}
  */
  readonly maxReplicas?: number;
  /**
  * The minimum count of Instances for the Instance group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#min_replicas AutoscalingInstanceGroup#min_replicas}
  */
  readonly minReplicas?: number;
}

export function autoscalingInstanceGroupCapacityToTerraform(struct?: AutoscalingInstanceGroupCapacity | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cooldown_delay: cdktf.numberToTerraform(struct!.cooldownDelay),
    max_replicas: cdktf.numberToTerraform(struct!.maxReplicas),
    min_replicas: cdktf.numberToTerraform(struct!.minReplicas),
  }
}


export function autoscalingInstanceGroupCapacityToHclTerraform(struct?: AutoscalingInstanceGroupCapacity | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cooldown_delay: {
      value: cdktf.numberToHclTerraform(struct!.cooldownDelay),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    max_replicas: {
      value: cdktf.numberToHclTerraform(struct!.maxReplicas),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    min_replicas: {
      value: cdktf.numberToHclTerraform(struct!.minReplicas),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstanceGroupCapacityOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AutoscalingInstanceGroupCapacity | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cooldownDelay !== undefined) {
      hasAnyValues = true;
      internalValueResult.cooldownDelay = this._cooldownDelay;
    }
    if (this._maxReplicas !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxReplicas = this._maxReplicas;
    }
    if (this._minReplicas !== undefined) {
      hasAnyValues = true;
      internalValueResult.minReplicas = this._minReplicas;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstanceGroupCapacity | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cooldownDelay = undefined;
      this._maxReplicas = undefined;
      this._minReplicas = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cooldownDelay = value.cooldownDelay;
      this._maxReplicas = value.maxReplicas;
      this._minReplicas = value.minReplicas;
    }
  }

  // cooldown_delay - computed: false, optional: true, required: false
  private _cooldownDelay?: number; 
  public get cooldownDelay() {
    return this.getNumberAttribute('cooldown_delay');
  }
  public set cooldownDelay(value: number) {
    this._cooldownDelay = value;
  }
  public resetCooldownDelay() {
    this._cooldownDelay = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cooldownDelayInput() {
    return this._cooldownDelay;
  }

  // max_replicas - computed: false, optional: true, required: false
  private _maxReplicas?: number; 
  public get maxReplicas() {
    return this.getNumberAttribute('max_replicas');
  }
  public set maxReplicas(value: number) {
    this._maxReplicas = value;
  }
  public resetMaxReplicas() {
    this._maxReplicas = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxReplicasInput() {
    return this._maxReplicas;
  }

  // min_replicas - computed: false, optional: true, required: false
  private _minReplicas?: number; 
  public get minReplicas() {
    return this.getNumberAttribute('min_replicas');
  }
  public set minReplicas(value: number) {
    this._minReplicas = value;
  }
  public resetMinReplicas() {
    this._minReplicas = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minReplicasInput() {
    return this._minReplicas;
  }
}

export class AutoscalingInstanceGroupCapacityList extends cdktf.ComplexList {
  public internalValue? : AutoscalingInstanceGroupCapacity[] | cdktf.IResolvable

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
  public get(index: number): AutoscalingInstanceGroupCapacityOutputReference {
    return new AutoscalingInstanceGroupCapacityOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AutoscalingInstanceGroupLoadBalancer {
  /**
  * The Load Balancer backend IDs
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#backend_ids AutoscalingInstanceGroup#backend_ids}
  */
  readonly backendIds?: string[];
  /**
  * The ID of the load balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#id AutoscalingInstanceGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the Private Network attached to the Load Balancer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#private_network_id AutoscalingInstanceGroup#private_network_id}
  */
  readonly privateNetworkId?: string;
}

export function autoscalingInstanceGroupLoadBalancerToTerraform(struct?: AutoscalingInstanceGroupLoadBalancer | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    backend_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.backendIds),
    id: cdktf.stringToTerraform(struct!.id),
    private_network_id: cdktf.stringToTerraform(struct!.privateNetworkId),
  }
}


export function autoscalingInstanceGroupLoadBalancerToHclTerraform(struct?: AutoscalingInstanceGroupLoadBalancer | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    backend_ids: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.backendIds),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    private_network_id: {
      value: cdktf.stringToHclTerraform(struct!.privateNetworkId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstanceGroupLoadBalancerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AutoscalingInstanceGroupLoadBalancer | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._backendIds !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendIds = this._backendIds;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._privateNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateNetworkId = this._privateNetworkId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstanceGroupLoadBalancer | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._backendIds = undefined;
      this._id = undefined;
      this._privateNetworkId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._backendIds = value.backendIds;
      this._id = value.id;
      this._privateNetworkId = value.privateNetworkId;
    }
  }

  // backend_ids - computed: false, optional: true, required: false
  private _backendIds?: string[]; 
  public get backendIds() {
    return this.getListAttribute('backend_ids');
  }
  public set backendIds(value: string[]) {
    this._backendIds = value;
  }
  public resetBackendIds() {
    this._backendIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backendIdsInput() {
    return this._backendIds;
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

  // private_network_id - computed: false, optional: true, required: false
  private _privateNetworkId?: string; 
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
  public set privateNetworkId(value: string) {
    this._privateNetworkId = value;
  }
  public resetPrivateNetworkId() {
    this._privateNetworkId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdInput() {
    return this._privateNetworkId;
  }
}

export class AutoscalingInstanceGroupLoadBalancerList extends cdktf.ComplexList {
  public internalValue? : AutoscalingInstanceGroupLoadBalancer[] | cdktf.IResolvable

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
  public get(index: number): AutoscalingInstanceGroupLoadBalancerOutputReference {
    return new AutoscalingInstanceGroupLoadBalancerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group scaleway_autoscaling_instance_group}
*/
export class AutoscalingInstanceGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_instance_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AutoscalingInstanceGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AutoscalingInstanceGroup to import
  * @param importFromId The id of the existing AutoscalingInstanceGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AutoscalingInstanceGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_instance_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_group scaleway_autoscaling_instance_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AutoscalingInstanceGroupConfig
  */
  public constructor(scope: Construct, id: string, config: AutoscalingInstanceGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_instance_group',
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
    this._deleteServersOnDestroy = config.deleteServersOnDestroy;
    this._id = config.id;
    this._name = config.name;
    this._projectId = config.projectId;
    this._tags = config.tags;
    this._templateId = config.templateId;
    this._zone = config.zone;
    this._capacity.internalValue = config.capacity;
    this._loadBalancer.internalValue = config.loadBalancer;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // delete_servers_on_destroy - computed: false, optional: true, required: false
  private _deleteServersOnDestroy?: boolean | cdktf.IResolvable; 
  public get deleteServersOnDestroy() {
    return this.getBooleanAttribute('delete_servers_on_destroy');
  }
  public set deleteServersOnDestroy(value: boolean | cdktf.IResolvable) {
    this._deleteServersOnDestroy = value;
  }
  public resetDeleteServersOnDestroy() {
    this._deleteServersOnDestroy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteServersOnDestroyInput() {
    return this._deleteServersOnDestroy;
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

  // name - computed: true, optional: true, required: false
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

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return this.getListAttribute('tags');
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // template_id - computed: false, optional: false, required: true
  private _templateId?: string; 
  public get templateId() {
    return this.getStringAttribute('template_id');
  }
  public set templateId(value: string) {
    this._templateId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get templateIdInput() {
    return this._templateId;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
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

  // capacity - computed: false, optional: true, required: false
  private _capacity = new AutoscalingInstanceGroupCapacityList(this, "capacity", false);
  public get capacity() {
    return this._capacity;
  }
  public putCapacity(value: AutoscalingInstanceGroupCapacity[] | cdktf.IResolvable) {
    this._capacity.internalValue = value;
  }
  public resetCapacity() {
    this._capacity.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get capacityInput() {
    return this._capacity.internalValue;
  }

  // load_balancer - computed: false, optional: true, required: false
  private _loadBalancer = new AutoscalingInstanceGroupLoadBalancerList(this, "load_balancer", false);
  public get loadBalancer() {
    return this._loadBalancer;
  }
  public putLoadBalancer(value: AutoscalingInstanceGroupLoadBalancer[] | cdktf.IResolvable) {
    this._loadBalancer.internalValue = value;
  }
  public resetLoadBalancer() {
    this._loadBalancer.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loadBalancerInput() {
    return this._loadBalancer.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      delete_servers_on_destroy: cdktf.booleanToTerraform(this._deleteServersOnDestroy),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      template_id: cdktf.stringToTerraform(this._templateId),
      zone: cdktf.stringToTerraform(this._zone),
      capacity: cdktf.listMapper(autoscalingInstanceGroupCapacityToTerraform, true)(this._capacity.internalValue),
      load_balancer: cdktf.listMapper(autoscalingInstanceGroupLoadBalancerToTerraform, true)(this._loadBalancer.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      delete_servers_on_destroy: {
        value: cdktf.booleanToHclTerraform(this._deleteServersOnDestroy),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
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
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      template_id: {
        value: cdktf.stringToHclTerraform(this._templateId),
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
      capacity: {
        value: cdktf.listMapperHcl(autoscalingInstanceGroupCapacityToHclTerraform, true)(this._capacity.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AutoscalingInstanceGroupCapacityList",
      },
      load_balancer: {
        value: cdktf.listMapperHcl(autoscalingInstanceGroupLoadBalancerToHclTerraform, true)(this._loadBalancer.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AutoscalingInstanceGroupLoadBalancerList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
