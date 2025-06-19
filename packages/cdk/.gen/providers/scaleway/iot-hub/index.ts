// https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotHubConfig extends cdktf.TerraformMetaArguments {
  /**
  * Wether to enable the device auto provisioning or not
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#device_auto_provisioning IotHub#device_auto_provisioning}
  */
  readonly deviceAutoProvisioning?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable the hub events or not
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#disable_events IotHub#disable_events}
  */
  readonly disableEvents?: boolean | cdktf.IResolvable;
  /**
  * Whether to enable the hub or not
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#enabled IotHub#enabled}
  */
  readonly enabled?: boolean | cdktf.IResolvable;
  /**
  * Topic prefix for the hub events
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#events_topic_prefix IotHub#events_topic_prefix}
  */
  readonly eventsTopicPrefix?: string;
  /**
  * Custom user provided certificate authority
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#hub_ca IotHub#hub_ca}
  */
  readonly hubCa?: string;
  /**
  * Challenge certificate for the user provided hub CA
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#hub_ca_challenge IotHub#hub_ca_challenge}
  */
  readonly hubCaChallenge?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#id IotHub#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the hub
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#name IotHub#name}
  */
  readonly name: string;
  /**
  * The product plan of the hub
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#product_plan IotHub#product_plan}
  */
  readonly productPlan: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#project_id IotHub#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#region IotHub#region}
  */
  readonly region?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#timeouts IotHub#timeouts}
  */
  readonly timeouts?: IotHubTimeouts;
}
export interface IotHubTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#default IotHub#default}
  */
  readonly default?: string;
}

export function iotHubTimeoutsToTerraform(struct?: IotHubTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}


export function iotHubTimeoutsToHclTerraform(struct?: IotHubTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotHubTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): IotHubTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotHubTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._default = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._default = value.default;
    }
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub scaleway_iot_hub}
*/
export class IotHub extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iot_hub";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotHub resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotHub to import
  * @param importFromId The id of the existing IotHub that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotHub to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_iot_hub", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.53.0/docs/resources/iot_hub scaleway_iot_hub} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotHubConfig
  */
  public constructor(scope: Construct, id: string, config: IotHubConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iot_hub',
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
    this._deviceAutoProvisioning = config.deviceAutoProvisioning;
    this._disableEvents = config.disableEvents;
    this._enabled = config.enabled;
    this._eventsTopicPrefix = config.eventsTopicPrefix;
    this._hubCa = config.hubCa;
    this._hubCaChallenge = config.hubCaChallenge;
    this._id = config.id;
    this._name = config.name;
    this._productPlan = config.productPlan;
    this._projectId = config.projectId;
    this._region = config.region;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // connected_device_count - computed: true, optional: false, required: false
  public get connectedDeviceCount() {
    return this.getNumberAttribute('connected_device_count');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // device_auto_provisioning - computed: false, optional: true, required: false
  private _deviceAutoProvisioning?: boolean | cdktf.IResolvable; 
  public get deviceAutoProvisioning() {
    return this.getBooleanAttribute('device_auto_provisioning');
  }
  public set deviceAutoProvisioning(value: boolean | cdktf.IResolvable) {
    this._deviceAutoProvisioning = value;
  }
  public resetDeviceAutoProvisioning() {
    this._deviceAutoProvisioning = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deviceAutoProvisioningInput() {
    return this._deviceAutoProvisioning;
  }

  // device_count - computed: true, optional: false, required: false
  public get deviceCount() {
    return this.getNumberAttribute('device_count');
  }

  // disable_events - computed: false, optional: true, required: false
  private _disableEvents?: boolean | cdktf.IResolvable; 
  public get disableEvents() {
    return this.getBooleanAttribute('disable_events');
  }
  public set disableEvents(value: boolean | cdktf.IResolvable) {
    this._disableEvents = value;
  }
  public resetDisableEvents() {
    this._disableEvents = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableEventsInput() {
    return this._disableEvents;
  }

  // enabled - computed: false, optional: true, required: false
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

  // endpoint - computed: true, optional: false, required: false
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }

  // events_topic_prefix - computed: false, optional: true, required: false
  private _eventsTopicPrefix?: string; 
  public get eventsTopicPrefix() {
    return this.getStringAttribute('events_topic_prefix');
  }
  public set eventsTopicPrefix(value: string) {
    this._eventsTopicPrefix = value;
  }
  public resetEventsTopicPrefix() {
    this._eventsTopicPrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get eventsTopicPrefixInput() {
    return this._eventsTopicPrefix;
  }

  // hub_ca - computed: false, optional: true, required: false
  private _hubCa?: string; 
  public get hubCa() {
    return this.getStringAttribute('hub_ca');
  }
  public set hubCa(value: string) {
    this._hubCa = value;
  }
  public resetHubCa() {
    this._hubCa = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hubCaInput() {
    return this._hubCa;
  }

  // hub_ca_challenge - computed: false, optional: true, required: false
  private _hubCaChallenge?: string; 
  public get hubCaChallenge() {
    return this.getStringAttribute('hub_ca_challenge');
  }
  public set hubCaChallenge(value: string) {
    this._hubCaChallenge = value;
  }
  public resetHubCaChallenge() {
    this._hubCaChallenge = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hubCaChallengeInput() {
    return this._hubCaChallenge;
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

  // mqtt_ca - computed: true, optional: false, required: false
  public get mqttCa() {
    return this.getStringAttribute('mqtt_ca');
  }

  // mqtt_ca_url - computed: true, optional: false, required: false
  public get mqttCaUrl() {
    return this.getStringAttribute('mqtt_ca_url');
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

  // product_plan - computed: false, optional: false, required: true
  private _productPlan?: string; 
  public get productPlan() {
    return this.getStringAttribute('product_plan');
  }
  public set productPlan(value: string) {
    this._productPlan = value;
  }
  // Temporarily expose input value. Use with caution.
  public get productPlanInput() {
    return this._productPlan;
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new IotHubTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: IotHubTimeouts) {
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
      device_auto_provisioning: cdktf.booleanToTerraform(this._deviceAutoProvisioning),
      disable_events: cdktf.booleanToTerraform(this._disableEvents),
      enabled: cdktf.booleanToTerraform(this._enabled),
      events_topic_prefix: cdktf.stringToTerraform(this._eventsTopicPrefix),
      hub_ca: cdktf.stringToTerraform(this._hubCa),
      hub_ca_challenge: cdktf.stringToTerraform(this._hubCaChallenge),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      product_plan: cdktf.stringToTerraform(this._productPlan),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      timeouts: iotHubTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      device_auto_provisioning: {
        value: cdktf.booleanToHclTerraform(this._deviceAutoProvisioning),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      disable_events: {
        value: cdktf.booleanToHclTerraform(this._disableEvents),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      enabled: {
        value: cdktf.booleanToHclTerraform(this._enabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      events_topic_prefix: {
        value: cdktf.stringToHclTerraform(this._eventsTopicPrefix),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      hub_ca: {
        value: cdktf.stringToHclTerraform(this._hubCa),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      hub_ca_challenge: {
        value: cdktf.stringToHclTerraform(this._hubCaChallenge),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      product_plan: {
        value: cdktf.stringToHclTerraform(this._productPlan),
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
      timeouts: {
        value: iotHubTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "IotHubTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
