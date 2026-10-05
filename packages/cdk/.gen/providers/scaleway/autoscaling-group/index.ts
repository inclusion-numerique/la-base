// https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AutoscalingGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * The load balancer configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#load_balancer_configuration AutoscalingGroup#load_balancer_configuration}
  */
  readonly loadBalancerConfiguration?: AutoscalingGroupLoadBalancerConfiguration;
  /**
  * The name of the AutoScaling Group. If not provided, a random name will be generated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#name AutoscalingGroup#name}
  */
  readonly name?: string;
  /**
  * The project ID the AutoScaling Group belongs to. Defaults to the provider's project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#project_id AutoscalingGroup#project_id}
  */
  readonly projectId?: string;
  /**
  * The scaling policy configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#scaling_policy AutoscalingGroup#scaling_policy}
  */
  readonly scalingPolicy: AutoscalingGroupScalingPolicy;
  /**
  * The tags associated with the AutoScaling Group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#tags AutoscalingGroup#tags}
  */
  readonly tags?: string[];
  /**
  * The ID of the Instance Template used to create instances in this group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#template_id AutoscalingGroup#template_id}
  */
  readonly templateId: string;
  /**
  * The zone the AutoScaling Group is in.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#zone AutoscalingGroup#zone}
  */
  readonly zone?: string;
}
export interface AutoscalingGroupLoadBalancerConfigurationAutoHealing {
  /**
  * Whether auto-healing is enabled.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#enabled AutoscalingGroup#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * The grace period for health checks.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#grace_period AutoscalingGroup#grace_period}
  */
  readonly gracePeriod?: string;
}

export function autoscalingGroupLoadBalancerConfigurationAutoHealingToTerraform(struct?: AutoscalingGroupLoadBalancerConfigurationAutoHealing | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enabled: cdktf.booleanToTerraform(struct!.enabled),
    grace_period: cdktf.stringToTerraform(struct!.gracePeriod),
  }
}


export function autoscalingGroupLoadBalancerConfigurationAutoHealingToHclTerraform(struct?: AutoscalingGroupLoadBalancerConfigurationAutoHealing | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enabled: {
      value: cdktf.booleanToHclTerraform(struct!.enabled),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    grace_period: {
      value: cdktf.stringToHclTerraform(struct!.gracePeriod),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingGroupLoadBalancerConfigurationAutoHealingOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AutoscalingGroupLoadBalancerConfigurationAutoHealing | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enabled !== undefined) {
      hasAnyValues = true;
      internalValueResult.enabled = this._enabled;
    }
    if (this._gracePeriod !== undefined) {
      hasAnyValues = true;
      internalValueResult.gracePeriod = this._gracePeriod;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingGroupLoadBalancerConfigurationAutoHealing | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._enabled = undefined;
      this._gracePeriod = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._enabled = value.enabled;
      this._gracePeriod = value.gracePeriod;
    }
  }

  // enabled - computed: true, optional: true, required: false
  private _enabled?: boolean | cdktf.IResolvable; 
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }
  public set enabled(value: boolean | cdktf.IResolvable) {
    this._enabled = value;
  }
  public resetEnabled() {
    this._enabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enabledInput() {
    return this._enabled;
  }

  // grace_period - computed: true, optional: true, required: false
  private _gracePeriod?: string; 
  public get gracePeriod() {
    return this.getStringAttribute('grace_period');
  }
  public set gracePeriod(value: string) {
    this._gracePeriod = value;
  }
  public resetGracePeriod() {
    this._gracePeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get gracePeriodInput() {
    return this._gracePeriod;
  }
}
export interface AutoscalingGroupLoadBalancerConfigurationBackends {
  /**
  * The IP address family (IPv4 or IPv6).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#address_family AutoscalingGroup#address_family}
  */
  readonly addressFamily: string;
  /**
  * The ID of the load balancer backend.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#backend_id AutoscalingGroup#backend_id}
  */
  readonly backendId: string;
  /**
  * The ID of the private network.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#private_network_id AutoscalingGroup#private_network_id}
  */
  readonly privateNetworkId?: string;
}

export function autoscalingGroupLoadBalancerConfigurationBackendsToTerraform(struct?: AutoscalingGroupLoadBalancerConfigurationBackends): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    address_family: cdktf.stringToTerraform(struct!.addressFamily),
    backend_id: cdktf.stringToTerraform(struct!.backendId),
    private_network_id: cdktf.stringToTerraform(struct!.privateNetworkId),
  }
}


export function autoscalingGroupLoadBalancerConfigurationBackendsToHclTerraform(struct?: AutoscalingGroupLoadBalancerConfigurationBackends): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    address_family: {
      value: cdktf.stringToHclTerraform(struct!.addressFamily),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    backend_id: {
      value: cdktf.stringToHclTerraform(struct!.backendId),
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

export class AutoscalingGroupLoadBalancerConfigurationBackendsOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): AutoscalingGroupLoadBalancerConfigurationBackends | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._addressFamily !== undefined) {
      hasAnyValues = true;
      internalValueResult.addressFamily = this._addressFamily;
    }
    if (this._backendId !== undefined) {
      hasAnyValues = true;
      internalValueResult.backendId = this._backendId;
    }
    if (this._privateNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateNetworkId = this._privateNetworkId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingGroupLoadBalancerConfigurationBackends | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._addressFamily = undefined;
      this._backendId = undefined;
      this._privateNetworkId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._addressFamily = value.addressFamily;
      this._backendId = value.backendId;
      this._privateNetworkId = value.privateNetworkId;
    }
  }

  // address_family - computed: true, optional: false, required: true
  private _addressFamily?: string; 
  public get addressFamily() {
    return this.getStringAttribute('address_family');
  }
  public set addressFamily(value: string) {
    this._addressFamily = value;
  }
  // Temporarily expose input value. Use with caution.
  public get addressFamilyInput() {
    return this._addressFamily;
  }

  // backend_id - computed: true, optional: false, required: true
  private _backendId?: string; 
  public get backendId() {
    return this.getStringAttribute('backend_id');
  }
  public set backendId(value: string) {
    this._backendId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backendIdInput() {
    return this._backendId;
  }

  // private_network_id - computed: true, optional: true, required: false
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

export class AutoscalingGroupLoadBalancerConfigurationBackendsList extends cdktf.ComplexList {
  public internalValue? : AutoscalingGroupLoadBalancerConfigurationBackends[] | cdktf.IResolvable

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
  public get(index: number): AutoscalingGroupLoadBalancerConfigurationBackendsOutputReference {
    return new AutoscalingGroupLoadBalancerConfigurationBackendsOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface AutoscalingGroupLoadBalancerConfiguration {
  /**
  * The auto-healing configuration.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#auto_healing AutoscalingGroup#auto_healing}
  */
  readonly autoHealing?: AutoscalingGroupLoadBalancerConfigurationAutoHealing;
  /**
  * The list of load balancer backend configurations.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#backends AutoscalingGroup#backends}
  */
  readonly backends: AutoscalingGroupLoadBalancerConfigurationBackends[] | cdktf.IResolvable;
  /**
  * The ID of the load balancer.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#load_balancer_id AutoscalingGroup#load_balancer_id}
  */
  readonly loadBalancerId: string;
}

export function autoscalingGroupLoadBalancerConfigurationToTerraform(struct?: AutoscalingGroupLoadBalancerConfiguration | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    auto_healing: autoscalingGroupLoadBalancerConfigurationAutoHealingToTerraform(struct!.autoHealing),
    backends: cdktf.listMapper(autoscalingGroupLoadBalancerConfigurationBackendsToTerraform, false)(struct!.backends),
    load_balancer_id: cdktf.stringToTerraform(struct!.loadBalancerId),
  }
}


export function autoscalingGroupLoadBalancerConfigurationToHclTerraform(struct?: AutoscalingGroupLoadBalancerConfiguration | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    auto_healing: {
      value: autoscalingGroupLoadBalancerConfigurationAutoHealingToHclTerraform(struct!.autoHealing),
      isBlock: true,
      type: "struct",
      storageClassType: "AutoscalingGroupLoadBalancerConfigurationAutoHealing",
    },
    backends: {
      value: cdktf.listMapperHcl(autoscalingGroupLoadBalancerConfigurationBackendsToHclTerraform, false)(struct!.backends),
      isBlock: true,
      type: "list",
      storageClassType: "AutoscalingGroupLoadBalancerConfigurationBackendsList",
    },
    load_balancer_id: {
      value: cdktf.stringToHclTerraform(struct!.loadBalancerId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingGroupLoadBalancerConfigurationOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AutoscalingGroupLoadBalancerConfiguration | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._autoHealing?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.autoHealing = this._autoHealing?.internalValue;
    }
    if (this._backends?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.backends = this._backends?.internalValue;
    }
    if (this._loadBalancerId !== undefined) {
      hasAnyValues = true;
      internalValueResult.loadBalancerId = this._loadBalancerId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingGroupLoadBalancerConfiguration | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._autoHealing.internalValue = undefined;
      this._backends.internalValue = undefined;
      this._loadBalancerId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._autoHealing.internalValue = value.autoHealing;
      this._backends.internalValue = value.backends;
      this._loadBalancerId = value.loadBalancerId;
    }
  }

  // auto_healing - computed: true, optional: true, required: false
  private _autoHealing = new AutoscalingGroupLoadBalancerConfigurationAutoHealingOutputReference(this, "auto_healing");
  public get autoHealing() {
    return this._autoHealing;
  }
  public putAutoHealing(value: AutoscalingGroupLoadBalancerConfigurationAutoHealing) {
    this._autoHealing.internalValue = value;
  }
  public resetAutoHealing() {
    this._autoHealing.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoHealingInput() {
    return this._autoHealing.internalValue;
  }

  // backends - computed: true, optional: false, required: true
  private _backends = new AutoscalingGroupLoadBalancerConfigurationBackendsList(this, "backends", false);
  public get backends() {
    return this._backends;
  }
  public putBackends(value: AutoscalingGroupLoadBalancerConfigurationBackends[] | cdktf.IResolvable) {
    this._backends.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get backendsInput() {
    return this._backends.internalValue;
  }

  // load_balancer_id - computed: true, optional: false, required: true
  private _loadBalancerId?: string; 
  public get loadBalancerId() {
    return this.getStringAttribute('load_balancer_id');
  }
  public set loadBalancerId(value: string) {
    this._loadBalancerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get loadBalancerIdInput() {
    return this._loadBalancerId;
  }
}
export interface AutoscalingGroupScalingPolicy {
  /**
  * The target CPU utilization percentage to trigger scaling events.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#cpu_target AutoscalingGroup#cpu_target}
  */
  readonly cpuTarget?: number;
  /**
  * The fixed number of instances for the group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#fixed_size AutoscalingGroup#fixed_size}
  */
  readonly fixedSize?: number;
  /**
  * The maximum number of instances in the group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#maximum_size AutoscalingGroup#maximum_size}
  */
  readonly maximumSize: number;
  /**
  * The target memory utilization percentage to trigger scaling events.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#memory_target AutoscalingGroup#memory_target}
  */
  readonly memoryTarget?: number;
  /**
  * The minimum number of instances in the group.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#minimum_size AutoscalingGroup#minimum_size}
  */
  readonly minimumSize: number;
  /**
  * The cooldown duration after a scale-in event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#scale_in_cooldown AutoscalingGroup#scale_in_cooldown}
  */
  readonly scaleInCooldown?: string;
  /**
  * The number of instances to remove during scale-in event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#scale_in_step AutoscalingGroup#scale_in_step}
  */
  readonly scaleInStep?: number;
  /**
  * The cooldown duration after a scale-out event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#scale_out_cooldown AutoscalingGroup#scale_out_cooldown}
  */
  readonly scaleOutCooldown?: string;
  /**
  * The number of instances to add during scale-out event.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#scale_out_step AutoscalingGroup#scale_out_step}
  */
  readonly scaleOutStep?: number;
}

export function autoscalingGroupScalingPolicyToTerraform(struct?: AutoscalingGroupScalingPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    cpu_target: cdktf.numberToTerraform(struct!.cpuTarget),
    fixed_size: cdktf.numberToTerraform(struct!.fixedSize),
    maximum_size: cdktf.numberToTerraform(struct!.maximumSize),
    memory_target: cdktf.numberToTerraform(struct!.memoryTarget),
    minimum_size: cdktf.numberToTerraform(struct!.minimumSize),
    scale_in_cooldown: cdktf.stringToTerraform(struct!.scaleInCooldown),
    scale_in_step: cdktf.numberToTerraform(struct!.scaleInStep),
    scale_out_cooldown: cdktf.stringToTerraform(struct!.scaleOutCooldown),
    scale_out_step: cdktf.numberToTerraform(struct!.scaleOutStep),
  }
}


export function autoscalingGroupScalingPolicyToHclTerraform(struct?: AutoscalingGroupScalingPolicy | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    cpu_target: {
      value: cdktf.numberToHclTerraform(struct!.cpuTarget),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    fixed_size: {
      value: cdktf.numberToHclTerraform(struct!.fixedSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    maximum_size: {
      value: cdktf.numberToHclTerraform(struct!.maximumSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    memory_target: {
      value: cdktf.numberToHclTerraform(struct!.memoryTarget),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    minimum_size: {
      value: cdktf.numberToHclTerraform(struct!.minimumSize),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scale_in_cooldown: {
      value: cdktf.stringToHclTerraform(struct!.scaleInCooldown),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scale_in_step: {
      value: cdktf.numberToHclTerraform(struct!.scaleInStep),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scale_out_cooldown: {
      value: cdktf.stringToHclTerraform(struct!.scaleOutCooldown),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scale_out_step: {
      value: cdktf.numberToHclTerraform(struct!.scaleOutStep),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingGroupScalingPolicyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): AutoscalingGroupScalingPolicy | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._cpuTarget !== undefined) {
      hasAnyValues = true;
      internalValueResult.cpuTarget = this._cpuTarget;
    }
    if (this._fixedSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.fixedSize = this._fixedSize;
    }
    if (this._maximumSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.maximumSize = this._maximumSize;
    }
    if (this._memoryTarget !== undefined) {
      hasAnyValues = true;
      internalValueResult.memoryTarget = this._memoryTarget;
    }
    if (this._minimumSize !== undefined) {
      hasAnyValues = true;
      internalValueResult.minimumSize = this._minimumSize;
    }
    if (this._scaleInCooldown !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleInCooldown = this._scaleInCooldown;
    }
    if (this._scaleInStep !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleInStep = this._scaleInStep;
    }
    if (this._scaleOutCooldown !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleOutCooldown = this._scaleOutCooldown;
    }
    if (this._scaleOutStep !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleOutStep = this._scaleOutStep;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingGroupScalingPolicy | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._cpuTarget = undefined;
      this._fixedSize = undefined;
      this._maximumSize = undefined;
      this._memoryTarget = undefined;
      this._minimumSize = undefined;
      this._scaleInCooldown = undefined;
      this._scaleInStep = undefined;
      this._scaleOutCooldown = undefined;
      this._scaleOutStep = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._cpuTarget = value.cpuTarget;
      this._fixedSize = value.fixedSize;
      this._maximumSize = value.maximumSize;
      this._memoryTarget = value.memoryTarget;
      this._minimumSize = value.minimumSize;
      this._scaleInCooldown = value.scaleInCooldown;
      this._scaleInStep = value.scaleInStep;
      this._scaleOutCooldown = value.scaleOutCooldown;
      this._scaleOutStep = value.scaleOutStep;
    }
  }

  // cpu_target - computed: false, optional: true, required: false
  private _cpuTarget?: number; 
  public get cpuTarget() {
    return this.getNumberAttribute('cpu_target');
  }
  public set cpuTarget(value: number) {
    this._cpuTarget = value;
  }
  public resetCpuTarget() {
    this._cpuTarget = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuTargetInput() {
    return this._cpuTarget;
  }

  // fixed_size - computed: false, optional: true, required: false
  private _fixedSize?: number; 
  public get fixedSize() {
    return this.getNumberAttribute('fixed_size');
  }
  public set fixedSize(value: number) {
    this._fixedSize = value;
  }
  public resetFixedSize() {
    this._fixedSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fixedSizeInput() {
    return this._fixedSize;
  }

  // maximum_size - computed: false, optional: false, required: true
  private _maximumSize?: number; 
  public get maximumSize() {
    return this.getNumberAttribute('maximum_size');
  }
  public set maximumSize(value: number) {
    this._maximumSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maximumSizeInput() {
    return this._maximumSize;
  }

  // memory_target - computed: false, optional: true, required: false
  private _memoryTarget?: number; 
  public get memoryTarget() {
    return this.getNumberAttribute('memory_target');
  }
  public set memoryTarget(value: number) {
    this._memoryTarget = value;
  }
  public resetMemoryTarget() {
    this._memoryTarget = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memoryTargetInput() {
    return this._memoryTarget;
  }

  // minimum_size - computed: false, optional: false, required: true
  private _minimumSize?: number; 
  public get minimumSize() {
    return this.getNumberAttribute('minimum_size');
  }
  public set minimumSize(value: number) {
    this._minimumSize = value;
  }
  // Temporarily expose input value. Use with caution.
  public get minimumSizeInput() {
    return this._minimumSize;
  }

  // scale_in_cooldown - computed: true, optional: true, required: false
  private _scaleInCooldown?: string; 
  public get scaleInCooldown() {
    return this.getStringAttribute('scale_in_cooldown');
  }
  public set scaleInCooldown(value: string) {
    this._scaleInCooldown = value;
  }
  public resetScaleInCooldown() {
    this._scaleInCooldown = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleInCooldownInput() {
    return this._scaleInCooldown;
  }

  // scale_in_step - computed: true, optional: true, required: false
  private _scaleInStep?: number; 
  public get scaleInStep() {
    return this.getNumberAttribute('scale_in_step');
  }
  public set scaleInStep(value: number) {
    this._scaleInStep = value;
  }
  public resetScaleInStep() {
    this._scaleInStep = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleInStepInput() {
    return this._scaleInStep;
  }

  // scale_out_cooldown - computed: true, optional: true, required: false
  private _scaleOutCooldown?: string; 
  public get scaleOutCooldown() {
    return this.getStringAttribute('scale_out_cooldown');
  }
  public set scaleOutCooldown(value: string) {
    this._scaleOutCooldown = value;
  }
  public resetScaleOutCooldown() {
    this._scaleOutCooldown = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleOutCooldownInput() {
    return this._scaleOutCooldown;
  }

  // scale_out_step - computed: true, optional: true, required: false
  private _scaleOutStep?: number; 
  public get scaleOutStep() {
    return this.getNumberAttribute('scale_out_step');
  }
  public set scaleOutStep(value: number) {
    this._scaleOutStep = value;
  }
  public resetScaleOutStep() {
    this._scaleOutStep = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleOutStepInput() {
    return this._scaleOutStep;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group scaleway_autoscaling_group}
*/
export class AutoscalingGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_group";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AutoscalingGroup resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AutoscalingGroup to import
  * @param importFromId The id of the existing AutoscalingGroup that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AutoscalingGroup to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_group", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/autoscaling_group scaleway_autoscaling_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AutoscalingGroupConfig
  */
  public constructor(scope: Construct, id: string, config: AutoscalingGroupConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_group',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.83.1',
        providerVersionConstraint: '~> 2.83.1'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._loadBalancerConfiguration.internalValue = config.loadBalancerConfiguration;
    this._name = config.name;
    this._projectId = config.projectId;
    this._scalingPolicy.internalValue = config.scalingPolicy;
    this._tags = config.tags;
    this._templateId = config.templateId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // load_balancer_configuration - computed: true, optional: true, required: false
  private _loadBalancerConfiguration = new AutoscalingGroupLoadBalancerConfigurationOutputReference(this, "load_balancer_configuration");
  public get loadBalancerConfiguration() {
    return this._loadBalancerConfiguration;
  }
  public putLoadBalancerConfiguration(value: AutoscalingGroupLoadBalancerConfiguration) {
    this._loadBalancerConfiguration.internalValue = value;
  }
  public resetLoadBalancerConfiguration() {
    this._loadBalancerConfiguration.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get loadBalancerConfigurationInput() {
    return this._loadBalancerConfiguration.internalValue;
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

  // scaling_policy - computed: false, optional: false, required: true
  private _scalingPolicy = new AutoscalingGroupScalingPolicyOutputReference(this, "scaling_policy");
  public get scalingPolicy() {
    return this._scalingPolicy;
  }
  public putScalingPolicy(value: AutoscalingGroupScalingPolicy) {
    this._scalingPolicy.internalValue = value;
  }
  // Temporarily expose input value. Use with caution.
  public get scalingPolicyInput() {
    return this._scalingPolicy.internalValue;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      load_balancer_configuration: autoscalingGroupLoadBalancerConfigurationToTerraform(this._loadBalancerConfiguration.internalValue),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      scaling_policy: autoscalingGroupScalingPolicyToTerraform(this._scalingPolicy.internalValue),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      template_id: cdktf.stringToTerraform(this._templateId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      load_balancer_configuration: {
        value: autoscalingGroupLoadBalancerConfigurationToHclTerraform(this._loadBalancerConfiguration.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "AutoscalingGroupLoadBalancerConfiguration",
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
      scaling_policy: {
        value: autoscalingGroupScalingPolicyToHclTerraform(this._scalingPolicy.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "AutoscalingGroupScalingPolicy",
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
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
