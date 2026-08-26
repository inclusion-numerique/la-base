// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayAutoscalingInstancePolicyConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#id DataScalewayAutoscalingInstancePolicy#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * ID of the instance group related to this policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#instance_group_id DataScalewayAutoscalingInstancePolicy#instance_group_id}
  */
  readonly instanceGroupId?: string;
  /**
  * The ID of the instance policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#instance_policy_id DataScalewayAutoscalingInstancePolicy#instance_policy_id}
  */
  readonly instancePolicyId?: string;
  /**
  * The policy name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#name DataScalewayAutoscalingInstancePolicy#name}
  */
  readonly name?: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#zone DataScalewayAutoscalingInstancePolicy#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayAutoscalingInstancePolicyMetric {
}

export function dataScalewayAutoscalingInstancePolicyMetricToTerraform(struct?: DataScalewayAutoscalingInstancePolicyMetric): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayAutoscalingInstancePolicyMetricToHclTerraform(struct?: DataScalewayAutoscalingInstancePolicyMetric): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayAutoscalingInstancePolicyMetricOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayAutoscalingInstancePolicyMetric | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayAutoscalingInstancePolicyMetric | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // aggregate - computed: true, optional: false, required: false
  public get aggregate() {
    return this.getStringAttribute('aggregate');
  }

  // cockpit_metric_name - computed: true, optional: false, required: false
  public get cockpitMetricName() {
    return this.getStringAttribute('cockpit_metric_name');
  }

  // managed_metric - computed: true, optional: false, required: false
  public get managedMetric() {
    return this.getStringAttribute('managed_metric');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // operator - computed: true, optional: false, required: false
  public get operator() {
    return this.getStringAttribute('operator');
  }

  // sampling_range_min - computed: true, optional: false, required: false
  public get samplingRangeMin() {
    return this.getNumberAttribute('sampling_range_min');
  }

  // threshold - computed: true, optional: false, required: false
  public get threshold() {
    return this.getNumberAttribute('threshold');
  }
}

export class DataScalewayAutoscalingInstancePolicyMetricList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayAutoscalingInstancePolicyMetricOutputReference {
    return new DataScalewayAutoscalingInstancePolicyMetricOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy scaleway_autoscaling_instance_policy}
*/
export class DataScalewayAutoscalingInstancePolicy extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_instance_policy";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayAutoscalingInstancePolicy resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayAutoscalingInstancePolicy to import
  * @param importFromId The id of the existing DataScalewayAutoscalingInstancePolicy that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayAutoscalingInstancePolicy to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_instance_policy", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/autoscaling_instance_policy scaleway_autoscaling_instance_policy} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayAutoscalingInstancePolicyConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayAutoscalingInstancePolicyConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_instance_policy',
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
    this._instancePolicyId = config.instancePolicyId;
    this._name = config.name;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // action - computed: true, optional: false, required: false
  public get action() {
    return this.getStringAttribute('action');
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

  // instance_policy_id - computed: false, optional: true, required: false
  private _instancePolicyId?: string; 
  public get instancePolicyId() {
    return this.getStringAttribute('instance_policy_id');
  }
  public set instancePolicyId(value: string) {
    this._instancePolicyId = value;
  }
  public resetInstancePolicyId() {
    this._instancePolicyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instancePolicyIdInput() {
    return this._instancePolicyId;
  }

  // metric - computed: true, optional: false, required: false
  private _metric = new DataScalewayAutoscalingInstancePolicyMetricList(this, "metric", false);
  public get metric() {
    return this._metric;
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

  // priority - computed: true, optional: false, required: false
  public get priority() {
    return this.getNumberAttribute('priority');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // value - computed: true, optional: false, required: false
  public get value() {
    return this.getNumberAttribute('value');
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
      instance_policy_id: cdktf.stringToTerraform(this._instancePolicyId),
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
      instance_policy_id: {
        value: cdktf.stringToHclTerraform(this._instancePolicyId),
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
