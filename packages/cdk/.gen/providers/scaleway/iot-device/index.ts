// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotDeviceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Allow plain and server-authenticated SSL connections in addition to mutually-authenticated ones
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#allow_insecure IotDevice#allow_insecure}
  */
  readonly allowInsecure?: boolean | cdktf.IResolvable;
  /**
  * Allow multiple connections
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#allow_multiple_connections IotDevice#allow_multiple_connections}
  */
  readonly allowMultipleConnections?: boolean | cdktf.IResolvable;
  /**
  * The description of the device
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#description IotDevice#description}
  */
  readonly description?: string;
  /**
  * The ID of the hub on which this device will be created
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#hub_id IotDevice#hub_id}
  */
  readonly hubId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#id IotDevice#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the device
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#name IotDevice#name}
  */
  readonly name: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#region IotDevice#region}
  */
  readonly region?: string;
  /**
  * certificate block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#certificate IotDevice#certificate}
  */
  readonly certificate?: IotDeviceCertificate;
  /**
  * message_filters block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#message_filters IotDevice#message_filters}
  */
  readonly messageFilters?: IotDeviceMessageFilters;
}
export interface IotDeviceCertificate {
  /**
  * X509 PEM encoded certificate of the device
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#crt IotDevice#crt}
  */
  readonly crt?: string;
}

export function iotDeviceCertificateToTerraform(struct?: IotDeviceCertificateOutputReference | IotDeviceCertificate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    crt: cdktf.stringToTerraform(struct!.crt),
  }
}


export function iotDeviceCertificateToHclTerraform(struct?: IotDeviceCertificateOutputReference | IotDeviceCertificate): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    crt: {
      value: cdktf.stringToHclTerraform(struct!.crt),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotDeviceCertificateOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotDeviceCertificate | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._crt !== undefined) {
      hasAnyValues = true;
      internalValueResult.crt = this._crt;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotDeviceCertificate | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._crt = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._crt = value.crt;
    }
  }

  // crt - computed: true, optional: true, required: false
  private _crt?: string; 
  public get crt() {
    return this.getStringAttribute('crt');
  }
  public set crt(value: string) {
    this._crt = value;
  }
  public resetCrt() {
    this._crt = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get crtInput() {
    return this._crt;
  }

  // key - computed: true, optional: false, required: false
  public get key() {
    return this.getStringAttribute('key');
  }
}
export interface IotDeviceMessageFiltersPublish {
  /**
  * Publish message filter policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#policy IotDevice#policy}
  */
  readonly policy?: string;
  /**
  * List of topics in the set
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#topics IotDevice#topics}
  */
  readonly topics?: string[];
}

export function iotDeviceMessageFiltersPublishToTerraform(struct?: IotDeviceMessageFiltersPublishOutputReference | IotDeviceMessageFiltersPublish): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    policy: cdktf.stringToTerraform(struct!.policy),
    topics: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.topics),
  }
}


export function iotDeviceMessageFiltersPublishToHclTerraform(struct?: IotDeviceMessageFiltersPublishOutputReference | IotDeviceMessageFiltersPublish): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    policy: {
      value: cdktf.stringToHclTerraform(struct!.policy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topics: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.topics),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotDeviceMessageFiltersPublishOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotDeviceMessageFiltersPublish | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._policy !== undefined) {
      hasAnyValues = true;
      internalValueResult.policy = this._policy;
    }
    if (this._topics !== undefined) {
      hasAnyValues = true;
      internalValueResult.topics = this._topics;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotDeviceMessageFiltersPublish | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._policy = undefined;
      this._topics = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._policy = value.policy;
      this._topics = value.topics;
    }
  }

  // policy - computed: false, optional: true, required: false
  private _policy?: string; 
  public get policy() {
    return this.getStringAttribute('policy');
  }
  public set policy(value: string) {
    this._policy = value;
  }
  public resetPolicy() {
    this._policy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyInput() {
    return this._policy;
  }

  // topics - computed: false, optional: true, required: false
  private _topics?: string[]; 
  public get topics() {
    return this.getListAttribute('topics');
  }
  public set topics(value: string[]) {
    this._topics = value;
  }
  public resetTopics() {
    this._topics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsInput() {
    return this._topics;
  }
}
export interface IotDeviceMessageFiltersSubscribe {
  /**
  * Subscribe message filter policy
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#policy IotDevice#policy}
  */
  readonly policy?: string;
  /**
  * List of topics in the set
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#topics IotDevice#topics}
  */
  readonly topics?: string[];
}

export function iotDeviceMessageFiltersSubscribeToTerraform(struct?: IotDeviceMessageFiltersSubscribeOutputReference | IotDeviceMessageFiltersSubscribe): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    policy: cdktf.stringToTerraform(struct!.policy),
    topics: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.topics),
  }
}


export function iotDeviceMessageFiltersSubscribeToHclTerraform(struct?: IotDeviceMessageFiltersSubscribeOutputReference | IotDeviceMessageFiltersSubscribe): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    policy: {
      value: cdktf.stringToHclTerraform(struct!.policy),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    topics: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.topics),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotDeviceMessageFiltersSubscribeOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotDeviceMessageFiltersSubscribe | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._policy !== undefined) {
      hasAnyValues = true;
      internalValueResult.policy = this._policy;
    }
    if (this._topics !== undefined) {
      hasAnyValues = true;
      internalValueResult.topics = this._topics;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotDeviceMessageFiltersSubscribe | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._policy = undefined;
      this._topics = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._policy = value.policy;
      this._topics = value.topics;
    }
  }

  // policy - computed: false, optional: true, required: false
  private _policy?: string; 
  public get policy() {
    return this.getStringAttribute('policy');
  }
  public set policy(value: string) {
    this._policy = value;
  }
  public resetPolicy() {
    this._policy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get policyInput() {
    return this._policy;
  }

  // topics - computed: false, optional: true, required: false
  private _topics?: string[]; 
  public get topics() {
    return this.getListAttribute('topics');
  }
  public set topics(value: string[]) {
    this._topics = value;
  }
  public resetTopics() {
    this._topics = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicsInput() {
    return this._topics;
  }
}
export interface IotDeviceMessageFilters {
  /**
  * publish block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#publish IotDevice#publish}
  */
  readonly publish?: IotDeviceMessageFiltersPublish;
  /**
  * subscribe block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#subscribe IotDevice#subscribe}
  */
  readonly subscribe?: IotDeviceMessageFiltersSubscribe;
}

export function iotDeviceMessageFiltersToTerraform(struct?: IotDeviceMessageFiltersOutputReference | IotDeviceMessageFilters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    publish: iotDeviceMessageFiltersPublishToTerraform(struct!.publish),
    subscribe: iotDeviceMessageFiltersSubscribeToTerraform(struct!.subscribe),
  }
}


export function iotDeviceMessageFiltersToHclTerraform(struct?: IotDeviceMessageFiltersOutputReference | IotDeviceMessageFilters): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    publish: {
      value: iotDeviceMessageFiltersPublishToHclTerraform(struct!.publish),
      isBlock: true,
      type: "list",
      storageClassType: "IotDeviceMessageFiltersPublishList",
    },
    subscribe: {
      value: iotDeviceMessageFiltersSubscribeToHclTerraform(struct!.subscribe),
      isBlock: true,
      type: "list",
      storageClassType: "IotDeviceMessageFiltersSubscribeList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class IotDeviceMessageFiltersOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): IotDeviceMessageFilters | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._publish?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.publish = this._publish?.internalValue;
    }
    if (this._subscribe?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.subscribe = this._subscribe?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotDeviceMessageFilters | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._publish.internalValue = undefined;
      this._subscribe.internalValue = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._publish.internalValue = value.publish;
      this._subscribe.internalValue = value.subscribe;
    }
  }

  // publish - computed: false, optional: true, required: false
  private _publish = new IotDeviceMessageFiltersPublishOutputReference(this, "publish");
  public get publish() {
    return this._publish;
  }
  public putPublish(value: IotDeviceMessageFiltersPublish) {
    this._publish.internalValue = value;
  }
  public resetPublish() {
    this._publish.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publishInput() {
    return this._publish.internalValue;
  }

  // subscribe - computed: false, optional: true, required: false
  private _subscribe = new IotDeviceMessageFiltersSubscribeOutputReference(this, "subscribe");
  public get subscribe() {
    return this._subscribe;
  }
  public putSubscribe(value: IotDeviceMessageFiltersSubscribe) {
    this._subscribe.internalValue = value;
  }
  public resetSubscribe() {
    this._subscribe.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subscribeInput() {
    return this._subscribe.internalValue;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device scaleway_iot_device}
*/
export class IotDevice extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iot_device";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a IotDevice resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the IotDevice to import
  * @param importFromId The id of the existing IotDevice that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the IotDevice to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_iot_device", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/iot_device scaleway_iot_device} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotDeviceConfig
  */
  public constructor(scope: Construct, id: string, config: IotDeviceConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iot_device',
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
    this._allowInsecure = config.allowInsecure;
    this._allowMultipleConnections = config.allowMultipleConnections;
    this._description = config.description;
    this._hubId = config.hubId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
    this._certificate.internalValue = config.certificate;
    this._messageFilters.internalValue = config.messageFilters;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // allow_insecure - computed: false, optional: true, required: false
  private _allowInsecure?: boolean | cdktf.IResolvable; 
  public get allowInsecure() {
    return this.getBooleanAttribute('allow_insecure');
  }
  public set allowInsecure(value: boolean | cdktf.IResolvable) {
    this._allowInsecure = value;
  }
  public resetAllowInsecure() {
    this._allowInsecure = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allowInsecureInput() {
    return this._allowInsecure;
  }

  // allow_multiple_connections - computed: false, optional: true, required: false
  private _allowMultipleConnections?: boolean | cdktf.IResolvable; 
  public get allowMultipleConnections() {
    return this.getBooleanAttribute('allow_multiple_connections');
  }
  public set allowMultipleConnections(value: boolean | cdktf.IResolvable) {
    this._allowMultipleConnections = value;
  }
  public resetAllowMultipleConnections() {
    this._allowMultipleConnections = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get allowMultipleConnectionsInput() {
    return this._allowMultipleConnections;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // hub_id - computed: false, optional: false, required: true
  private _hubId?: string; 
  public get hubId() {
    return this.getStringAttribute('hub_id');
  }
  public set hubId(value: string) {
    this._hubId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get hubIdInput() {
    return this._hubId;
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

  // is_connected - computed: true, optional: false, required: false
  public get isConnected() {
    return this.getBooleanAttribute('is_connected');
  }

  // last_activity_at - computed: true, optional: false, required: false
  public get lastActivityAt() {
    return this.getStringAttribute('last_activity_at');
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

  // certificate - computed: false, optional: true, required: false
  private _certificate = new IotDeviceCertificateOutputReference(this, "certificate");
  public get certificate() {
    return this._certificate;
  }
  public putCertificate(value: IotDeviceCertificate) {
    this._certificate.internalValue = value;
  }
  public resetCertificate() {
    this._certificate.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get certificateInput() {
    return this._certificate.internalValue;
  }

  // message_filters - computed: false, optional: true, required: false
  private _messageFilters = new IotDeviceMessageFiltersOutputReference(this, "message_filters");
  public get messageFilters() {
    return this._messageFilters;
  }
  public putMessageFilters(value: IotDeviceMessageFilters) {
    this._messageFilters.internalValue = value;
  }
  public resetMessageFilters() {
    this._messageFilters.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageFiltersInput() {
    return this._messageFilters.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      allow_insecure: cdktf.booleanToTerraform(this._allowInsecure),
      allow_multiple_connections: cdktf.booleanToTerraform(this._allowMultipleConnections),
      description: cdktf.stringToTerraform(this._description),
      hub_id: cdktf.stringToTerraform(this._hubId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
      certificate: iotDeviceCertificateToTerraform(this._certificate.internalValue),
      message_filters: iotDeviceMessageFiltersToTerraform(this._messageFilters.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      allow_insecure: {
        value: cdktf.booleanToHclTerraform(this._allowInsecure),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      allow_multiple_connections: {
        value: cdktf.booleanToHclTerraform(this._allowMultipleConnections),
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
      hub_id: {
        value: cdktf.stringToHclTerraform(this._hubId),
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
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      certificate: {
        value: iotDeviceCertificateToHclTerraform(this._certificate.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotDeviceCertificateList",
      },
      message_filters: {
        value: iotDeviceMessageFiltersToHclTerraform(this._messageFilters.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "IotDeviceMessageFiltersList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
