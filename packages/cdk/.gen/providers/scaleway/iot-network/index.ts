// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IotNetworkConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the hub on which this network will be created
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#hub_id IotNetwork#hub_id}
  */
  readonly hubId: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#id IotNetwork#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#name IotNetwork#name}
  */
  readonly name: string;
  /**
  * The prefix that will be prepended to all topics for this Network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#topic_prefix IotNetwork#topic_prefix}
  */
  readonly topicPrefix?: string;
  /**
  * The type of the network
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#type IotNetwork#type}
  */
  readonly type: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#timeouts IotNetwork#timeouts}
  */
  readonly timeouts?: IotNetworkTimeouts;
}
export interface IotNetworkTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#default IotNetwork#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network#delete IotNetwork#delete}
  */
  readonly delete?: string;
}

export function iotNetworkTimeoutsToTerraform(struct?: IotNetworkTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
  }
}

export class IotNetworkTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): IotNetworkTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: IotNetworkTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._default = undefined;
      this._delete = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._default = value.default;
      this._delete = value.delete;
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network scaleway_iot_network}
*/
export class IotNetwork extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iot_network";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iot_network scaleway_iot_network} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IotNetworkConfig
  */
  public constructor(scope: Construct, id: string, config: IotNetworkConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iot_network',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.17.0',
        providerVersionConstraint: '>= 2.16.3'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._hubId = config.hubId;
    this._id = config.id;
    this._name = config.name;
    this._topicPrefix = config.topicPrefix;
    this._type = config.type;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // endpoint - computed: true, optional: false, required: false
  public get endpoint() {
    return this.getStringAttribute('endpoint');
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

  // secret - computed: true, optional: false, required: false
  public get secret() {
    return this.getStringAttribute('secret');
  }

  // topic_prefix - computed: false, optional: true, required: false
  private _topicPrefix?: string; 
  public get topicPrefix() {
    return this.getStringAttribute('topic_prefix');
  }
  public set topicPrefix(value: string) {
    this._topicPrefix = value;
  }
  public resetTopicPrefix() {
    this._topicPrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get topicPrefixInput() {
    return this._topicPrefix;
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new IotNetworkTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: IotNetworkTimeouts) {
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
      hub_id: cdktf.stringToTerraform(this._hubId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      topic_prefix: cdktf.stringToTerraform(this._topicPrefix),
      type: cdktf.stringToTerraform(this._type),
      timeouts: iotNetworkTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
