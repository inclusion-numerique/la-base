// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AutoscalingInstancePolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Action to execute when the metric-based condition is met
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#action AutoscalingInstancePolicy#action}
  */
  readonly action: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#id AutoscalingInstancePolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * ID of the instance group related to this policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#instance_group_id AutoscalingInstancePolicy#instance_group_id}
  */
  readonly instanceGroupId: string;
  /**
  * The policy name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#name AutoscalingInstancePolicy#name}
  */
  readonly name?: string;
  /**
  * Priority of this policy compared to all other scaling policies. This determines the processing order. The lower the number, the higher the priority
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#priority AutoscalingInstancePolicy#priority}
  */
  readonly priority: number;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#project_id AutoscalingInstancePolicy#project_id}
  */
  readonly projectId?: string;
  /**
  * How to use the number defined in `value` when determining by how many Instances to scale up/down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#type AutoscalingInstancePolicy#type}
  */
  readonly type: string;
  /**
  * Value representing the magnitude of the scaling action to take for the Instance group. Depending on the `type` parameter, this number could represent a total number of Instances in the group, a number of Instances to add, or a percentage to scale the group by
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#value AutoscalingInstancePolicy#value}
  */
  readonly value: number;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#zone AutoscalingInstancePolicy#zone}
  */
  readonly zone?: string;
  /**
  * metric block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#metric AutoscalingInstancePolicy#metric}
  */
  readonly metric?: AutoscalingInstancePolicyMetric[] | cdktf.IResolvable;
}
export interface AutoscalingInstancePolicyMetric {
  /**
  * How the values sampled for the `metric` should be aggregated
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#aggregate AutoscalingInstancePolicy#aggregate}
  */
  readonly aggregate: string;
  /**
  * Custom metric to use for this policy. This must be stored in Scaleway Cockpit. The metric forms the basis of the condition that will be checked to determine whether a scaling action should be triggered
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#cockpit_metric_name AutoscalingInstancePolicy#cockpit_metric_name}
  */
  readonly cockpitMetricName?: string;
  /**
  * Managed metric to use for this policy. These are available by default in Cockpit without any configuration or `node_exporter`. The chosen metric forms the basis of the condition that will be checked to determine whether a scaling action should be triggered
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#managed_metric AutoscalingInstancePolicy#managed_metric}
  */
  readonly managedMetric?: string;
  /**
  * Name or description of the metric policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#name AutoscalingInstancePolicy#name}
  */
  readonly name: string;
  /**
  * Operator used when comparing the threshold value of the chosen `metric` to the actual sampled and aggregated value
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#operator AutoscalingInstancePolicy#operator}
  */
  readonly operator: string;
  /**
  * Interval of time, in minutes, during which metric is sampled
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#sampling_range_min AutoscalingInstancePolicy#sampling_range_min}
  */
  readonly samplingRangeMin?: number;
  /**
  * Threshold value to measure the aggregated sampled `metric` value against. Combined with the `operator` field, determines whether a scaling action should be triggered
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#threshold AutoscalingInstancePolicy#threshold}
  */
  readonly threshold?: number;
}

export function autoscalingInstancePolicyMetricToTerraform(struct?: AutoscalingInstancePolicyMetric | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    aggregate: cdktf.stringToTerraform(struct!.aggregate),
    cockpit_metric_name: cdktf.stringToTerraform(struct!.cockpitMetricName),
    managed_metric: cdktf.stringToTerraform(struct!.managedMetric),
    name: cdktf.stringToTerraform(struct!.name),
    operator: cdktf.stringToTerraform(struct!.operator),
    sampling_range_min: cdktf.numberToTerraform(struct!.samplingRangeMin),
    threshold: cdktf.numberToTerraform(struct!.threshold),
  }
}


export function autoscalingInstancePolicyMetricToHclTerraform(struct?: AutoscalingInstancePolicyMetric | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    aggregate: {
      value: cdktf.stringToHclTerraform(struct!.aggregate),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    cockpit_metric_name: {
      value: cdktf.stringToHclTerraform(struct!.cockpitMetricName),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    managed_metric: {
      value: cdktf.stringToHclTerraform(struct!.managedMetric),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    operator: {
      value: cdktf.stringToHclTerraform(struct!.operator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    sampling_range_min: {
      value: cdktf.numberToHclTerraform(struct!.samplingRangeMin),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    threshold: {
      value: cdktf.numberToHclTerraform(struct!.threshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstancePolicyMetricOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AutoscalingInstancePolicyMetric | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._aggregate !== undefined) {
      hasAnyValues = true;
      internalValueResult.aggregate = this._aggregate;
    }
    if (this._cockpitMetricName !== undefined) {
      hasAnyValues = true;
      internalValueResult.cockpitMetricName = this._cockpitMetricName;
    }
    if (this._managedMetric !== undefined) {
      hasAnyValues = true;
      internalValueResult.managedMetric = this._managedMetric;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._operator !== undefined) {
      hasAnyValues = true;
      internalValueResult.operator = this._operator;
    }
    if (this._samplingRangeMin !== undefined) {
      hasAnyValues = true;
      internalValueResult.samplingRangeMin = this._samplingRangeMin;
    }
    if (this._threshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.threshold = this._threshold;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstancePolicyMetric | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._aggregate = undefined;
      this._cockpitMetricName = undefined;
      this._managedMetric = undefined;
      this._name = undefined;
      this._operator = undefined;
      this._samplingRangeMin = undefined;
      this._threshold = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._aggregate = value.aggregate;
      this._cockpitMetricName = value.cockpitMetricName;
      this._managedMetric = value.managedMetric;
      this._name = value.name;
      this._operator = value.operator;
      this._samplingRangeMin = value.samplingRangeMin;
      this._threshold = value.threshold;
    }
  }

  // aggregate - computed: false, optional: false, required: true
  private _aggregate?: string; 
  public get aggregate() {
    return this.getStringAttribute('aggregate');
  }
  public set aggregate(value: string) {
    this._aggregate = value;
  }
  // Temporarily expose input value. Use with caution.
  public get aggregateInput() {
    return this._aggregate;
  }

  // cockpit_metric_name - computed: false, optional: true, required: false
  private _cockpitMetricName?: string; 
  public get cockpitMetricName() {
    return this.getStringAttribute('cockpit_metric_name');
  }
  public set cockpitMetricName(value: string) {
    this._cockpitMetricName = value;
  }
  public resetCockpitMetricName() {
    this._cockpitMetricName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cockpitMetricNameInput() {
    return this._cockpitMetricName;
  }

  // managed_metric - computed: false, optional: true, required: false
  private _managedMetric?: string; 
  public get managedMetric() {
    return this.getStringAttribute('managed_metric');
  }
  public set managedMetric(value: string) {
    this._managedMetric = value;
  }
  public resetManagedMetric() {
    this._managedMetric = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get managedMetricInput() {
    return this._managedMetric;
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // operator - computed: false, optional: false, required: true
  private _operator?: string; 
  public get operator() {
    return this.getStringAttribute('operator');
  }
  public set operator(value: string) {
    this._operator = value;
  }
  // Temporarily expose input value. Use with caution.
  public get operatorInput() {
    return this._operator;
  }

  // sampling_range_min - computed: false, optional: true, required: false
  private _samplingRangeMin?: number; 
  public get samplingRangeMin() {
    return this.getNumberAttribute('sampling_range_min');
  }
  public set samplingRangeMin(value: number) {
    this._samplingRangeMin = value;
  }
  public resetSamplingRangeMin() {
    this._samplingRangeMin = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get samplingRangeMinInput() {
    return this._samplingRangeMin;
  }

  // threshold - computed: false, optional: true, required: false
  private _threshold?: number; 
  public get threshold() {
    return this.getNumberAttribute('threshold');
  }
  public set threshold(value: number) {
    this._threshold = value;
  }
  public resetThreshold() {
    this._threshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get thresholdInput() {
    return this._threshold;
  }
}

export class AutoscalingInstancePolicyMetricList extends cdktf.ComplexList {
  public internalValue? : AutoscalingInstancePolicyMetric[] | cdktf.IResolvable

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
  public get(index: number): AutoscalingInstancePolicyMetricOutputReference {
    return new AutoscalingInstancePolicyMetricOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy scaleway_autoscaling_instance_policy}
*/
export class AutoscalingInstancePolicy extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_instance_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AutoscalingInstancePolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AutoscalingInstancePolicy to import
  * @param importFromId The id of the existing AutoscalingInstancePolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AutoscalingInstancePolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_instance_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_policy scaleway_autoscaling_instance_policy} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AutoscalingInstancePolicyConfig
  */
  public constructor(scope: Construct, id: string, config: AutoscalingInstancePolicyConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_instance_policy',
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
    this._action = config.action;
    this._id = config.id;
    this._instanceGroupId = config.instanceGroupId;
    this._name = config.name;
    this._priority = config.priority;
    this._projectId = config.projectId;
    this._type = config.type;
    this._value = config.value;
    this._zone = config.zone;
    this._metric.internalValue = config.metric;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
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

  // instance_group_id - computed: false, optional: false, required: true
  private _instanceGroupId?: string; 
  public get instanceGroupId() {
    return this.getStringAttribute('instance_group_id');
  }
  public set instanceGroupId(value: string) {
    this._instanceGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceGroupIdInput() {
    return this._instanceGroupId;
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

  // priority - computed: false, optional: false, required: true
  private _priority?: number; 
  public get priority() {
    return this.getNumberAttribute('priority');
  }
  public set priority(value: number) {
    this._priority = value;
  }
  // Temporarily expose input value. Use with caution.
  public get priorityInput() {
    return this._priority;
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

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // value - computed: false, optional: false, required: true
  private _value?: number; 
  public get value() {
    return this.getNumberAttribute('value');
  }
  public set value(value: number) {
    this._value = value;
  }
  // Temporarily expose input value. Use with caution.
  public get valueInput() {
    return this._value;
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

  // metric - computed: false, optional: true, required: false
  private _metric = new AutoscalingInstancePolicyMetricList(this, "metric", false);
  public get metric() {
    return this._metric;
  }
  public putMetric(value: AutoscalingInstancePolicyMetric[] | cdktf.IResolvable) {
    this._metric.internalValue = value;
  }
  public resetMetric() {
    this._metric.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get metricInput() {
    return this._metric.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      action: cdktf.stringToTerraform(this._action),
      id: cdktf.stringToTerraform(this._id),
      instance_group_id: cdktf.stringToTerraform(this._instanceGroupId),
      name: cdktf.stringToTerraform(this._name),
      priority: cdktf.numberToTerraform(this._priority),
      project_id: cdktf.stringToTerraform(this._projectId),
      type: cdktf.stringToTerraform(this._type),
      value: cdktf.numberToTerraform(this._value),
      zone: cdktf.stringToTerraform(this._zone),
      metric: cdktf.listMapper(autoscalingInstancePolicyMetricToTerraform, true)(this._metric.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      action: {
        value: cdktf.stringToHclTerraform(this._action),
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
      priority: {
        value: cdktf.numberToHclTerraform(this._priority),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      value: {
        value: cdktf.numberToHclTerraform(this._value),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      metric: {
        value: cdktf.listMapperHcl(autoscalingInstancePolicyMetricToHclTerraform, true)(this._metric.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AutoscalingInstancePolicyMetricList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
