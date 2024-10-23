// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface K8SClusterConfig extends cdktf.TerraformMetaArguments {
  /**
  * The list of admission plugins to enable on the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#admission_plugins K8SCluster#admission_plugins}
  */
  readonly admissionPlugins?: string[];
  /**
  * Additional Subject Alternative Names for the Kubernetes API server certificate
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#apiserver_cert_sans K8SCluster#apiserver_cert_sans}
  */
  readonly apiserverCertSans?: string[];
  /**
  * The CNI plugin of the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#cni K8SCluster#cni}
  */
  readonly cni: string;
  /**
  * Delete additional resources like block volumes, load-balancers and the private network (if empty) on cluster deletion
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#delete_additional_resources K8SCluster#delete_additional_resources}
  */
  readonly deleteAdditionalResources: boolean | cdktf.IResolvable;
  /**
  * The description of the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#description K8SCluster#description}
  */
  readonly description?: string;
  /**
  * The list of feature gates to enable on the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#feature_gates K8SCluster#feature_gates}
  */
  readonly featureGates?: string[];
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#id K8SCluster#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#name K8SCluster#name}
  */
  readonly name: string;
  /**
  * The ID of the cluster's private network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#private_network_id K8SCluster#private_network_id}
  */
  readonly privateNetworkId?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#project_id K8SCluster#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#region K8SCluster#region}
  */
  readonly region?: string;
  /**
  * The tags associated with the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#tags K8SCluster#tags}
  */
  readonly tags?: string[];
  /**
  * The type of cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#type K8SCluster#type}
  */
  readonly type?: string;
  /**
  * The version of the cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#version K8SCluster#version}
  */
  readonly version: string;
  /**
  * auto_upgrade block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#auto_upgrade K8SCluster#auto_upgrade}
  */
  readonly autoUpgrade?: K8SClusterAutoUpgrade;
  /**
  * autoscaler_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#autoscaler_config K8SCluster#autoscaler_config}
  */
  readonly autoscalerConfig?: K8SClusterAutoscalerConfig;
  /**
  * open_id_connect_config block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#open_id_connect_config K8SCluster#open_id_connect_config}
  */
  readonly openIdConnectConfig?: K8SClusterOpenIdConnectConfig;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#timeouts K8SCluster#timeouts}
  */
  readonly timeouts?: K8SClusterTimeouts;
}
export interface K8SClusterKubeconfig {
}

export function k8SClusterKubeconfigToTerraform(struct?: K8SClusterKubeconfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function k8SClusterKubeconfigToHclTerraform(struct?: K8SClusterKubeconfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class K8SClusterKubeconfigOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): K8SClusterKubeconfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: K8SClusterKubeconfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // cluster_ca_certificate - computed: true, optional: false, required: false
  public get clusterCaCertificate() {
    return this.getStringAttribute('cluster_ca_certificate');
  }

  // config_file - computed: true, optional: false, required: false
  public get configFile() {
    return this.getStringAttribute('config_file');
  }

  // host - computed: true, optional: false, required: false
  public get host() {
    return this.getStringAttribute('host');
  }

  // token - computed: true, optional: false, required: false
  public get token() {
    return this.getStringAttribute('token');
  }
}

export class K8SClusterKubeconfigList extends cdktf.ComplexList {

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
  public get(index: number): K8SClusterKubeconfigOutputReference {
    return new K8SClusterKubeconfigOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface K8SClusterAutoUpgrade {
  /**
  * Enables the Kubernetes patch version auto upgrade
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#enable K8SCluster#enable}
  */
  readonly enable: boolean | cdktf.IResolvable;
  /**
  * Day of the maintenance window
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#maintenance_window_day K8SCluster#maintenance_window_day}
  */
  readonly maintenanceWindowDay: string;
  /**
  * Start hour of the 2-hour maintenance window
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#maintenance_window_start_hour K8SCluster#maintenance_window_start_hour}
  */
  readonly maintenanceWindowStartHour: number;
}

export function k8SClusterAutoUpgradeToTerraform(struct?: K8SClusterAutoUpgradeOutputReference | K8SClusterAutoUpgrade): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    enable: cdktf.booleanToTerraform(struct!.enable),
    maintenance_window_day: cdktf.stringToTerraform(struct!.maintenanceWindowDay),
    maintenance_window_start_hour: cdktf.numberToTerraform(struct!.maintenanceWindowStartHour),
  }
}


export function k8SClusterAutoUpgradeToHclTerraform(struct?: K8SClusterAutoUpgradeOutputReference | K8SClusterAutoUpgrade): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    enable: {
      value: cdktf.booleanToHclTerraform(struct!.enable),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    maintenance_window_day: {
      value: cdktf.stringToHclTerraform(struct!.maintenanceWindowDay),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    maintenance_window_start_hour: {
      value: cdktf.numberToHclTerraform(struct!.maintenanceWindowStartHour),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class K8SClusterAutoUpgradeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): K8SClusterAutoUpgrade | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._enable !== undefined) {
      hasAnyValues = true;
      internalValueResult.enable = this._enable;
    }
    if (this._maintenanceWindowDay !== undefined) {
      hasAnyValues = true;
      internalValueResult.maintenanceWindowDay = this._maintenanceWindowDay;
    }
    if (this._maintenanceWindowStartHour !== undefined) {
      hasAnyValues = true;
      internalValueResult.maintenanceWindowStartHour = this._maintenanceWindowStartHour;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: K8SClusterAutoUpgrade | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._enable = undefined;
      this._maintenanceWindowDay = undefined;
      this._maintenanceWindowStartHour = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._enable = value.enable;
      this._maintenanceWindowDay = value.maintenanceWindowDay;
      this._maintenanceWindowStartHour = value.maintenanceWindowStartHour;
    }
  }

  // enable - computed: false, optional: false, required: true
  private _enable?: boolean | cdktf.IResolvable; 
  public get enable() {
    return this.getBooleanAttribute('enable');
  }
  public set enable(value: boolean | cdktf.IResolvable) {
    this._enable = value;
  }
  // Temporarily expose input value. Use with caution.
  public get enableInput() {
    return this._enable;
  }

  // maintenance_window_day - computed: false, optional: false, required: true
  private _maintenanceWindowDay?: string; 
  public get maintenanceWindowDay() {
    return this.getStringAttribute('maintenance_window_day');
  }
  public set maintenanceWindowDay(value: string) {
    this._maintenanceWindowDay = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maintenanceWindowDayInput() {
    return this._maintenanceWindowDay;
  }

  // maintenance_window_start_hour - computed: false, optional: false, required: true
  private _maintenanceWindowStartHour?: number; 
  public get maintenanceWindowStartHour() {
    return this.getNumberAttribute('maintenance_window_start_hour');
  }
  public set maintenanceWindowStartHour(value: number) {
    this._maintenanceWindowStartHour = value;
  }
  // Temporarily expose input value. Use with caution.
  public get maintenanceWindowStartHourInput() {
    return this._maintenanceWindowStartHour;
  }
}
export interface K8SClusterAutoscalerConfig {
  /**
  * Detect similar node groups and balance the number of nodes between them
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#balance_similar_node_groups K8SCluster#balance_similar_node_groups}
  */
  readonly balanceSimilarNodeGroups?: boolean | cdktf.IResolvable;
  /**
  * Disable the scale down feature of the autoscaler
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#disable_scale_down K8SCluster#disable_scale_down}
  */
  readonly disableScaleDown?: boolean | cdktf.IResolvable;
  /**
  * Type of resource estimator to be used in scale up
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#estimator K8SCluster#estimator}
  */
  readonly estimator?: string;
  /**
  * Type of node group expander to be used in scale up
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#expander K8SCluster#expander}
  */
  readonly expander?: string;
  /**
  * Pods with priority below cutoff will be expendable. They can be killed without any consideration during scale down and they don't cause scale up. Pods with null priority (PodPriority disabled) are non expendable
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#expendable_pods_priority_cutoff K8SCluster#expendable_pods_priority_cutoff}
  */
  readonly expendablePodsPriorityCutoff?: number;
  /**
  * Ignore DaemonSet pods when calculating resource utilization for scaling down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#ignore_daemonsets_utilization K8SCluster#ignore_daemonsets_utilization}
  */
  readonly ignoreDaemonsetsUtilization?: boolean | cdktf.IResolvable;
  /**
  * Maximum number of seconds the cluster autoscaler waits for pod termination when trying to scale down a node
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#max_graceful_termination_sec K8SCluster#max_graceful_termination_sec}
  */
  readonly maxGracefulTerminationSec?: number;
  /**
  * How long after scale up that scale down evaluation resumes
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#scale_down_delay_after_add K8SCluster#scale_down_delay_after_add}
  */
  readonly scaleDownDelayAfterAdd?: string;
  /**
  * How long a node should be unneeded before it is eligible for scale down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#scale_down_unneeded_time K8SCluster#scale_down_unneeded_time}
  */
  readonly scaleDownUnneededTime?: string;
  /**
  * Node utilization level, defined as sum of requested resources divided by capacity, below which a node can be considered for scale down
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#scale_down_utilization_threshold K8SCluster#scale_down_utilization_threshold}
  */
  readonly scaleDownUtilizationThreshold?: number;
}

export function k8SClusterAutoscalerConfigToTerraform(struct?: K8SClusterAutoscalerConfigOutputReference | K8SClusterAutoscalerConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    balance_similar_node_groups: cdktf.booleanToTerraform(struct!.balanceSimilarNodeGroups),
    disable_scale_down: cdktf.booleanToTerraform(struct!.disableScaleDown),
    estimator: cdktf.stringToTerraform(struct!.estimator),
    expander: cdktf.stringToTerraform(struct!.expander),
    expendable_pods_priority_cutoff: cdktf.numberToTerraform(struct!.expendablePodsPriorityCutoff),
    ignore_daemonsets_utilization: cdktf.booleanToTerraform(struct!.ignoreDaemonsetsUtilization),
    max_graceful_termination_sec: cdktf.numberToTerraform(struct!.maxGracefulTerminationSec),
    scale_down_delay_after_add: cdktf.stringToTerraform(struct!.scaleDownDelayAfterAdd),
    scale_down_unneeded_time: cdktf.stringToTerraform(struct!.scaleDownUnneededTime),
    scale_down_utilization_threshold: cdktf.numberToTerraform(struct!.scaleDownUtilizationThreshold),
  }
}


export function k8SClusterAutoscalerConfigToHclTerraform(struct?: K8SClusterAutoscalerConfigOutputReference | K8SClusterAutoscalerConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    balance_similar_node_groups: {
      value: cdktf.booleanToHclTerraform(struct!.balanceSimilarNodeGroups),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    disable_scale_down: {
      value: cdktf.booleanToHclTerraform(struct!.disableScaleDown),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    estimator: {
      value: cdktf.stringToHclTerraform(struct!.estimator),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expander: {
      value: cdktf.stringToHclTerraform(struct!.expander),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    expendable_pods_priority_cutoff: {
      value: cdktf.numberToHclTerraform(struct!.expendablePodsPriorityCutoff),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    ignore_daemonsets_utilization: {
      value: cdktf.booleanToHclTerraform(struct!.ignoreDaemonsetsUtilization),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    max_graceful_termination_sec: {
      value: cdktf.numberToHclTerraform(struct!.maxGracefulTerminationSec),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    scale_down_delay_after_add: {
      value: cdktf.stringToHclTerraform(struct!.scaleDownDelayAfterAdd),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scale_down_unneeded_time: {
      value: cdktf.stringToHclTerraform(struct!.scaleDownUnneededTime),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    scale_down_utilization_threshold: {
      value: cdktf.numberToHclTerraform(struct!.scaleDownUtilizationThreshold),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class K8SClusterAutoscalerConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): K8SClusterAutoscalerConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._balanceSimilarNodeGroups !== undefined) {
      hasAnyValues = true;
      internalValueResult.balanceSimilarNodeGroups = this._balanceSimilarNodeGroups;
    }
    if (this._disableScaleDown !== undefined) {
      hasAnyValues = true;
      internalValueResult.disableScaleDown = this._disableScaleDown;
    }
    if (this._estimator !== undefined) {
      hasAnyValues = true;
      internalValueResult.estimator = this._estimator;
    }
    if (this._expander !== undefined) {
      hasAnyValues = true;
      internalValueResult.expander = this._expander;
    }
    if (this._expendablePodsPriorityCutoff !== undefined) {
      hasAnyValues = true;
      internalValueResult.expendablePodsPriorityCutoff = this._expendablePodsPriorityCutoff;
    }
    if (this._ignoreDaemonsetsUtilization !== undefined) {
      hasAnyValues = true;
      internalValueResult.ignoreDaemonsetsUtilization = this._ignoreDaemonsetsUtilization;
    }
    if (this._maxGracefulTerminationSec !== undefined) {
      hasAnyValues = true;
      internalValueResult.maxGracefulTerminationSec = this._maxGracefulTerminationSec;
    }
    if (this._scaleDownDelayAfterAdd !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleDownDelayAfterAdd = this._scaleDownDelayAfterAdd;
    }
    if (this._scaleDownUnneededTime !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleDownUnneededTime = this._scaleDownUnneededTime;
    }
    if (this._scaleDownUtilizationThreshold !== undefined) {
      hasAnyValues = true;
      internalValueResult.scaleDownUtilizationThreshold = this._scaleDownUtilizationThreshold;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: K8SClusterAutoscalerConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._balanceSimilarNodeGroups = undefined;
      this._disableScaleDown = undefined;
      this._estimator = undefined;
      this._expander = undefined;
      this._expendablePodsPriorityCutoff = undefined;
      this._ignoreDaemonsetsUtilization = undefined;
      this._maxGracefulTerminationSec = undefined;
      this._scaleDownDelayAfterAdd = undefined;
      this._scaleDownUnneededTime = undefined;
      this._scaleDownUtilizationThreshold = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._balanceSimilarNodeGroups = value.balanceSimilarNodeGroups;
      this._disableScaleDown = value.disableScaleDown;
      this._estimator = value.estimator;
      this._expander = value.expander;
      this._expendablePodsPriorityCutoff = value.expendablePodsPriorityCutoff;
      this._ignoreDaemonsetsUtilization = value.ignoreDaemonsetsUtilization;
      this._maxGracefulTerminationSec = value.maxGracefulTerminationSec;
      this._scaleDownDelayAfterAdd = value.scaleDownDelayAfterAdd;
      this._scaleDownUnneededTime = value.scaleDownUnneededTime;
      this._scaleDownUtilizationThreshold = value.scaleDownUtilizationThreshold;
    }
  }

  // balance_similar_node_groups - computed: false, optional: true, required: false
  private _balanceSimilarNodeGroups?: boolean | cdktf.IResolvable; 
  public get balanceSimilarNodeGroups() {
    return this.getBooleanAttribute('balance_similar_node_groups');
  }
  public set balanceSimilarNodeGroups(value: boolean | cdktf.IResolvable) {
    this._balanceSimilarNodeGroups = value;
  }
  public resetBalanceSimilarNodeGroups() {
    this._balanceSimilarNodeGroups = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get balanceSimilarNodeGroupsInput() {
    return this._balanceSimilarNodeGroups;
  }

  // disable_scale_down - computed: false, optional: true, required: false
  private _disableScaleDown?: boolean | cdktf.IResolvable; 
  public get disableScaleDown() {
    return this.getBooleanAttribute('disable_scale_down');
  }
  public set disableScaleDown(value: boolean | cdktf.IResolvable) {
    this._disableScaleDown = value;
  }
  public resetDisableScaleDown() {
    this._disableScaleDown = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableScaleDownInput() {
    return this._disableScaleDown;
  }

  // estimator - computed: false, optional: true, required: false
  private _estimator?: string; 
  public get estimator() {
    return this.getStringAttribute('estimator');
  }
  public set estimator(value: string) {
    this._estimator = value;
  }
  public resetEstimator() {
    this._estimator = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get estimatorInput() {
    return this._estimator;
  }

  // expander - computed: false, optional: true, required: false
  private _expander?: string; 
  public get expander() {
    return this.getStringAttribute('expander');
  }
  public set expander(value: string) {
    this._expander = value;
  }
  public resetExpander() {
    this._expander = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expanderInput() {
    return this._expander;
  }

  // expendable_pods_priority_cutoff - computed: false, optional: true, required: false
  private _expendablePodsPriorityCutoff?: number; 
  public get expendablePodsPriorityCutoff() {
    return this.getNumberAttribute('expendable_pods_priority_cutoff');
  }
  public set expendablePodsPriorityCutoff(value: number) {
    this._expendablePodsPriorityCutoff = value;
  }
  public resetExpendablePodsPriorityCutoff() {
    this._expendablePodsPriorityCutoff = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get expendablePodsPriorityCutoffInput() {
    return this._expendablePodsPriorityCutoff;
  }

  // ignore_daemonsets_utilization - computed: false, optional: true, required: false
  private _ignoreDaemonsetsUtilization?: boolean | cdktf.IResolvable; 
  public get ignoreDaemonsetsUtilization() {
    return this.getBooleanAttribute('ignore_daemonsets_utilization');
  }
  public set ignoreDaemonsetsUtilization(value: boolean | cdktf.IResolvable) {
    this._ignoreDaemonsetsUtilization = value;
  }
  public resetIgnoreDaemonsetsUtilization() {
    this._ignoreDaemonsetsUtilization = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ignoreDaemonsetsUtilizationInput() {
    return this._ignoreDaemonsetsUtilization;
  }

  // max_graceful_termination_sec - computed: false, optional: true, required: false
  private _maxGracefulTerminationSec?: number; 
  public get maxGracefulTerminationSec() {
    return this.getNumberAttribute('max_graceful_termination_sec');
  }
  public set maxGracefulTerminationSec(value: number) {
    this._maxGracefulTerminationSec = value;
  }
  public resetMaxGracefulTerminationSec() {
    this._maxGracefulTerminationSec = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxGracefulTerminationSecInput() {
    return this._maxGracefulTerminationSec;
  }

  // scale_down_delay_after_add - computed: false, optional: true, required: false
  private _scaleDownDelayAfterAdd?: string; 
  public get scaleDownDelayAfterAdd() {
    return this.getStringAttribute('scale_down_delay_after_add');
  }
  public set scaleDownDelayAfterAdd(value: string) {
    this._scaleDownDelayAfterAdd = value;
  }
  public resetScaleDownDelayAfterAdd() {
    this._scaleDownDelayAfterAdd = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleDownDelayAfterAddInput() {
    return this._scaleDownDelayAfterAdd;
  }

  // scale_down_unneeded_time - computed: false, optional: true, required: false
  private _scaleDownUnneededTime?: string; 
  public get scaleDownUnneededTime() {
    return this.getStringAttribute('scale_down_unneeded_time');
  }
  public set scaleDownUnneededTime(value: string) {
    this._scaleDownUnneededTime = value;
  }
  public resetScaleDownUnneededTime() {
    this._scaleDownUnneededTime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleDownUnneededTimeInput() {
    return this._scaleDownUnneededTime;
  }

  // scale_down_utilization_threshold - computed: false, optional: true, required: false
  private _scaleDownUtilizationThreshold?: number; 
  public get scaleDownUtilizationThreshold() {
    return this.getNumberAttribute('scale_down_utilization_threshold');
  }
  public set scaleDownUtilizationThreshold(value: number) {
    this._scaleDownUtilizationThreshold = value;
  }
  public resetScaleDownUtilizationThreshold() {
    this._scaleDownUtilizationThreshold = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get scaleDownUtilizationThresholdInput() {
    return this._scaleDownUtilizationThreshold;
  }
}
export interface K8SClusterOpenIdConnectConfig {
  /**
  * A client id that all tokens must be issued for
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#client_id K8SCluster#client_id}
  */
  readonly clientId: string;
  /**
  * JWT claim to use as the user's group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#groups_claim K8SCluster#groups_claim}
  */
  readonly groupsClaim?: string[];
  /**
  * Prefix prepended to group claims
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#groups_prefix K8SCluster#groups_prefix}
  */
  readonly groupsPrefix?: string;
  /**
  * URL of the provider which allows the API server to discover public signing keys
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#issuer_url K8SCluster#issuer_url}
  */
  readonly issuerUrl: string;
  /**
  * Multiple key=value pairs that describes a required claim in the ID Token
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#required_claim K8SCluster#required_claim}
  */
  readonly requiredClaim?: string[];
  /**
  * JWT claim to use as the user name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#username_claim K8SCluster#username_claim}
  */
  readonly usernameClaim?: string;
  /**
  * Prefix prepended to username
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#username_prefix K8SCluster#username_prefix}
  */
  readonly usernamePrefix?: string;
}

export function k8SClusterOpenIdConnectConfigToTerraform(struct?: K8SClusterOpenIdConnectConfigOutputReference | K8SClusterOpenIdConnectConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    client_id: cdktf.stringToTerraform(struct!.clientId),
    groups_claim: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.groupsClaim),
    groups_prefix: cdktf.stringToTerraform(struct!.groupsPrefix),
    issuer_url: cdktf.stringToTerraform(struct!.issuerUrl),
    required_claim: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.requiredClaim),
    username_claim: cdktf.stringToTerraform(struct!.usernameClaim),
    username_prefix: cdktf.stringToTerraform(struct!.usernamePrefix),
  }
}


export function k8SClusterOpenIdConnectConfigToHclTerraform(struct?: K8SClusterOpenIdConnectConfigOutputReference | K8SClusterOpenIdConnectConfig): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    client_id: {
      value: cdktf.stringToHclTerraform(struct!.clientId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    groups_claim: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.groupsClaim),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    groups_prefix: {
      value: cdktf.stringToHclTerraform(struct!.groupsPrefix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    issuer_url: {
      value: cdktf.stringToHclTerraform(struct!.issuerUrl),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    required_claim: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.requiredClaim),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    username_claim: {
      value: cdktf.stringToHclTerraform(struct!.usernameClaim),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    username_prefix: {
      value: cdktf.stringToHclTerraform(struct!.usernamePrefix),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class K8SClusterOpenIdConnectConfigOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): K8SClusterOpenIdConnectConfig | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._clientId !== undefined) {
      hasAnyValues = true;
      internalValueResult.clientId = this._clientId;
    }
    if (this._groupsClaim !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupsClaim = this._groupsClaim;
    }
    if (this._groupsPrefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.groupsPrefix = this._groupsPrefix;
    }
    if (this._issuerUrl !== undefined) {
      hasAnyValues = true;
      internalValueResult.issuerUrl = this._issuerUrl;
    }
    if (this._requiredClaim !== undefined) {
      hasAnyValues = true;
      internalValueResult.requiredClaim = this._requiredClaim;
    }
    if (this._usernameClaim !== undefined) {
      hasAnyValues = true;
      internalValueResult.usernameClaim = this._usernameClaim;
    }
    if (this._usernamePrefix !== undefined) {
      hasAnyValues = true;
      internalValueResult.usernamePrefix = this._usernamePrefix;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: K8SClusterOpenIdConnectConfig | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._clientId = undefined;
      this._groupsClaim = undefined;
      this._groupsPrefix = undefined;
      this._issuerUrl = undefined;
      this._requiredClaim = undefined;
      this._usernameClaim = undefined;
      this._usernamePrefix = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._clientId = value.clientId;
      this._groupsClaim = value.groupsClaim;
      this._groupsPrefix = value.groupsPrefix;
      this._issuerUrl = value.issuerUrl;
      this._requiredClaim = value.requiredClaim;
      this._usernameClaim = value.usernameClaim;
      this._usernamePrefix = value.usernamePrefix;
    }
  }

  // client_id - computed: false, optional: false, required: true
  private _clientId?: string; 
  public get clientId() {
    return this.getStringAttribute('client_id');
  }
  public set clientId(value: string) {
    this._clientId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get clientIdInput() {
    return this._clientId;
  }

  // groups_claim - computed: false, optional: true, required: false
  private _groupsClaim?: string[]; 
  public get groupsClaim() {
    return this.getListAttribute('groups_claim');
  }
  public set groupsClaim(value: string[]) {
    this._groupsClaim = value;
  }
  public resetGroupsClaim() {
    this._groupsClaim = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupsClaimInput() {
    return this._groupsClaim;
  }

  // groups_prefix - computed: false, optional: true, required: false
  private _groupsPrefix?: string; 
  public get groupsPrefix() {
    return this.getStringAttribute('groups_prefix');
  }
  public set groupsPrefix(value: string) {
    this._groupsPrefix = value;
  }
  public resetGroupsPrefix() {
    this._groupsPrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get groupsPrefixInput() {
    return this._groupsPrefix;
  }

  // issuer_url - computed: false, optional: false, required: true
  private _issuerUrl?: string; 
  public get issuerUrl() {
    return this.getStringAttribute('issuer_url');
  }
  public set issuerUrl(value: string) {
    this._issuerUrl = value;
  }
  // Temporarily expose input value. Use with caution.
  public get issuerUrlInput() {
    return this._issuerUrl;
  }

  // required_claim - computed: false, optional: true, required: false
  private _requiredClaim?: string[]; 
  public get requiredClaim() {
    return this.getListAttribute('required_claim');
  }
  public set requiredClaim(value: string[]) {
    this._requiredClaim = value;
  }
  public resetRequiredClaim() {
    this._requiredClaim = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get requiredClaimInput() {
    return this._requiredClaim;
  }

  // username_claim - computed: false, optional: true, required: false
  private _usernameClaim?: string; 
  public get usernameClaim() {
    return this.getStringAttribute('username_claim');
  }
  public set usernameClaim(value: string) {
    this._usernameClaim = value;
  }
  public resetUsernameClaim() {
    this._usernameClaim = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get usernameClaimInput() {
    return this._usernameClaim;
  }

  // username_prefix - computed: false, optional: true, required: false
  private _usernamePrefix?: string; 
  public get usernamePrefix() {
    return this.getStringAttribute('username_prefix');
  }
  public set usernamePrefix(value: string) {
    this._usernamePrefix = value;
  }
  public resetUsernamePrefix() {
    this._usernamePrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get usernamePrefixInput() {
    return this._usernamePrefix;
  }
}
export interface K8SClusterTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#create K8SCluster#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#default K8SCluster#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#delete K8SCluster#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#read K8SCluster#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#update K8SCluster#update}
  */
  readonly update?: string;
}

export function k8SClusterTimeoutsToTerraform(struct?: K8SClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function k8SClusterTimeoutsToHclTerraform(struct?: K8SClusterTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    read: {
      value: cdktf.stringToHclTerraform(struct!.read),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class K8SClusterTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): K8SClusterTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: K8SClusterTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._read = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._default = value.default;
      this._delete = value.delete;
      this._read = value.read;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // default - computed: false, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster scaleway_k8s_cluster}
*/
export class K8SCluster extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_k8s_cluster";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a K8SCluster resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the K8SCluster to import
  * @param importFromId The id of the existing K8SCluster that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the K8SCluster to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_k8s_cluster", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/k8s_cluster scaleway_k8s_cluster} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options K8SClusterConfig
  */
  public constructor(scope: Construct, id: string, config: K8SClusterConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_k8s_cluster',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.42.1',
        providerVersionConstraint: '>= 2.42.1'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._admissionPlugins = config.admissionPlugins;
    this._apiserverCertSans = config.apiserverCertSans;
    this._cni = config.cni;
    this._deleteAdditionalResources = config.deleteAdditionalResources;
    this._description = config.description;
    this._featureGates = config.featureGates;
    this._id = config.id;
    this._name = config.name;
    this._privateNetworkId = config.privateNetworkId;
    this._projectId = config.projectId;
    this._region = config.region;
    this._tags = config.tags;
    this._type = config.type;
    this._version = config.version;
    this._autoUpgrade.internalValue = config.autoUpgrade;
    this._autoscalerConfig.internalValue = config.autoscalerConfig;
    this._openIdConnectConfig.internalValue = config.openIdConnectConfig;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // admission_plugins - computed: false, optional: true, required: false
  private _admissionPlugins?: string[]; 
  public get admissionPlugins() {
    return this.getListAttribute('admission_plugins');
  }
  public set admissionPlugins(value: string[]) {
    this._admissionPlugins = value;
  }
  public resetAdmissionPlugins() {
    this._admissionPlugins = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get admissionPluginsInput() {
    return this._admissionPlugins;
  }

  // apiserver_cert_sans - computed: false, optional: true, required: false
  private _apiserverCertSans?: string[]; 
  public get apiserverCertSans() {
    return this.getListAttribute('apiserver_cert_sans');
  }
  public set apiserverCertSans(value: string[]) {
    this._apiserverCertSans = value;
  }
  public resetApiserverCertSans() {
    this._apiserverCertSans = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get apiserverCertSansInput() {
    return this._apiserverCertSans;
  }

  // apiserver_url - computed: true, optional: false, required: false
  public get apiserverUrl() {
    return this.getStringAttribute('apiserver_url');
  }

  // cni - computed: false, optional: false, required: true
  private _cni?: string; 
  public get cni() {
    return this.getStringAttribute('cni');
  }
  public set cni(value: string) {
    this._cni = value;
  }
  // Temporarily expose input value. Use with caution.
  public get cniInput() {
    return this._cni;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // delete_additional_resources - computed: false, optional: false, required: true
  private _deleteAdditionalResources?: boolean | cdktf.IResolvable; 
  public get deleteAdditionalResources() {
    return this.getBooleanAttribute('delete_additional_resources');
  }
  public set deleteAdditionalResources(value: boolean | cdktf.IResolvable) {
    this._deleteAdditionalResources = value;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteAdditionalResourcesInput() {
    return this._deleteAdditionalResources;
  }

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // feature_gates - computed: false, optional: true, required: false
  private _featureGates?: string[]; 
  public get featureGates() {
    return this.getListAttribute('feature_gates');
  }
  public set featureGates(value: string[]) {
    this._featureGates = value;
  }
  public resetFeatureGates() {
    this._featureGates = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get featureGatesInput() {
    return this._featureGates;
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

  // kubeconfig - computed: true, optional: false, required: false
  private _kubeconfig = new K8SClusterKubeconfigList(this, "kubeconfig", false);
  public get kubeconfig() {
    return this._kubeconfig;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
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

  // type - computed: true, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // upgrade_available - computed: true, optional: false, required: false
  public get upgradeAvailable() {
    return this.getBooleanAttribute('upgrade_available');
  }

  // version - computed: false, optional: false, required: true
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // wildcard_dns - computed: true, optional: false, required: false
  public get wildcardDns() {
    return this.getStringAttribute('wildcard_dns');
  }

  // auto_upgrade - computed: false, optional: true, required: false
  private _autoUpgrade = new K8SClusterAutoUpgradeOutputReference(this, "auto_upgrade");
  public get autoUpgrade() {
    return this._autoUpgrade;
  }
  public putAutoUpgrade(value: K8SClusterAutoUpgrade) {
    this._autoUpgrade.internalValue = value;
  }
  public resetAutoUpgrade() {
    this._autoUpgrade.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoUpgradeInput() {
    return this._autoUpgrade.internalValue;
  }

  // autoscaler_config - computed: false, optional: true, required: false
  private _autoscalerConfig = new K8SClusterAutoscalerConfigOutputReference(this, "autoscaler_config");
  public get autoscalerConfig() {
    return this._autoscalerConfig;
  }
  public putAutoscalerConfig(value: K8SClusterAutoscalerConfig) {
    this._autoscalerConfig.internalValue = value;
  }
  public resetAutoscalerConfig() {
    this._autoscalerConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get autoscalerConfigInput() {
    return this._autoscalerConfig.internalValue;
  }

  // open_id_connect_config - computed: false, optional: true, required: false
  private _openIdConnectConfig = new K8SClusterOpenIdConnectConfigOutputReference(this, "open_id_connect_config");
  public get openIdConnectConfig() {
    return this._openIdConnectConfig;
  }
  public putOpenIdConnectConfig(value: K8SClusterOpenIdConnectConfig) {
    this._openIdConnectConfig.internalValue = value;
  }
  public resetOpenIdConnectConfig() {
    this._openIdConnectConfig.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get openIdConnectConfigInput() {
    return this._openIdConnectConfig.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new K8SClusterTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: K8SClusterTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      admission_plugins: cdktf.listMapper(cdktf.stringToTerraform, false)(this._admissionPlugins),
      apiserver_cert_sans: cdktf.listMapper(cdktf.stringToTerraform, false)(this._apiserverCertSans),
      cni: cdktf.stringToTerraform(this._cni),
      delete_additional_resources: cdktf.booleanToTerraform(this._deleteAdditionalResources),
      description: cdktf.stringToTerraform(this._description),
      feature_gates: cdktf.listMapper(cdktf.stringToTerraform, false)(this._featureGates),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      version: cdktf.stringToTerraform(this._version),
      auto_upgrade: k8SClusterAutoUpgradeToTerraform(this._autoUpgrade.internalValue),
      autoscaler_config: k8SClusterAutoscalerConfigToTerraform(this._autoscalerConfig.internalValue),
      open_id_connect_config: k8SClusterOpenIdConnectConfigToTerraform(this._openIdConnectConfig.internalValue),
      timeouts: k8SClusterTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      admission_plugins: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._admissionPlugins),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      apiserver_cert_sans: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._apiserverCertSans),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      cni: {
        value: cdktf.stringToHclTerraform(this._cni),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      delete_additional_resources: {
        value: cdktf.booleanToHclTerraform(this._deleteAdditionalResources),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      description: {
        value: cdktf.stringToHclTerraform(this._description),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      feature_gates: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._featureGates),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
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
      private_network_id: {
        value: cdktf.stringToHclTerraform(this._privateNetworkId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
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
      type: {
        value: cdktf.stringToHclTerraform(this._type),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      auto_upgrade: {
        value: k8SClusterAutoUpgradeToHclTerraform(this._autoUpgrade.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "K8SClusterAutoUpgradeList",
      },
      autoscaler_config: {
        value: k8SClusterAutoscalerConfigToHclTerraform(this._autoscalerConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "K8SClusterAutoscalerConfigList",
      },
      open_id_connect_config: {
        value: k8SClusterOpenIdConnectConfigToHclTerraform(this._openIdConnectConfig.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "K8SClusterOpenIdConnectConfigList",
      },
      timeouts: {
        value: k8SClusterTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "K8SClusterTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
