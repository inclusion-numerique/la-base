// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MnqSqsQueueConfig extends cdktf.TerraformMetaArguments {
  /**
  * SQS access key
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#access_key MnqSqsQueue#access_key}
  */
  readonly accessKey: string;
  /**
  * Specifies whether to enable content-based deduplication. Allows omitting the deduplication ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#content_based_deduplication MnqSqsQueue#content_based_deduplication}
  */
  readonly contentBasedDeduplication?: boolean | cdktf.IResolvable;
  /**
  * Whether the queue is a FIFO queue. If true, the queue name must end with .fifo
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#fifo_queue MnqSqsQueue#fifo_queue}
  */
  readonly fifoQueue?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#id MnqSqsQueue#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The number of seconds the queue retains a message.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#message_max_age MnqSqsQueue#message_max_age}
  */
  readonly messageMaxAge?: number;
  /**
  * The maximum size of a message. Should be in bytes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#message_max_size MnqSqsQueue#message_max_size}
  */
  readonly messageMaxSize?: number;
  /**
  * The name of the queue. Conflicts with name_prefix.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#name MnqSqsQueue#name}
  */
  readonly name?: string;
  /**
  * Creates a unique name beginning with the specified prefix. Conflicts with name.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#name_prefix MnqSqsQueue#name_prefix}
  */
  readonly namePrefix?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#project_id MnqSqsQueue#project_id}
  */
  readonly projectId?: string;
  /**
  * The number of seconds to wait for a message to arrive in the queue before returning.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#receive_wait_time_seconds MnqSqsQueue#receive_wait_time_seconds}
  */
  readonly receiveWaitTimeSeconds?: number;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#region MnqSqsQueue#region}
  */
  readonly region?: string;
  /**
  * SQS secret key
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#secret_key MnqSqsQueue#secret_key}
  */
  readonly secretKey: string;
  /**
  * The sqs endpoint
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#sqs_endpoint MnqSqsQueue#sqs_endpoint}
  */
  readonly sqsEndpoint?: string;
  /**
  * The number of seconds a message is hidden from other consumers.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#visibility_timeout_seconds MnqSqsQueue#visibility_timeout_seconds}
  */
  readonly visibilityTimeoutSeconds?: number;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#timeouts MnqSqsQueue#timeouts}
  */
  readonly timeouts?: MnqSqsQueueTimeouts;
}
export interface MnqSqsQueueTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#create MnqSqsQueue#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#default MnqSqsQueue#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#delete MnqSqsQueue#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#update MnqSqsQueue#update}
  */
  readonly update?: string;
}

export function mnqSqsQueueTimeoutsToTerraform(struct?: MnqSqsQueueTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function mnqSqsQueueTimeoutsToHclTerraform(struct?: MnqSqsQueueTimeouts | cdktf.IResolvable): any {
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

export class MnqSqsQueueTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): MnqSqsQueueTimeouts | cdktf.IResolvable | undefined {
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
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqSqsQueueTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue scaleway_mnq_sqs_queue}
*/
export class MnqSqsQueue extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mnq_sqs_queue";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MnqSqsQueue resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MnqSqsQueue to import
  * @param importFromId The id of the existing MnqSqsQueue that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MnqSqsQueue to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_mnq_sqs_queue", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sqs_queue scaleway_mnq_sqs_queue} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MnqSqsQueueConfig
  */
  public constructor(scope: Construct, id: string, config: MnqSqsQueueConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mnq_sqs_queue',
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
    this._accessKey = config.accessKey;
    this._contentBasedDeduplication = config.contentBasedDeduplication;
    this._fifoQueue = config.fifoQueue;
    this._id = config.id;
    this._messageMaxAge = config.messageMaxAge;
    this._messageMaxSize = config.messageMaxSize;
    this._name = config.name;
    this._namePrefix = config.namePrefix;
    this._projectId = config.projectId;
    this._receiveWaitTimeSeconds = config.receiveWaitTimeSeconds;
    this._region = config.region;
    this._secretKey = config.secretKey;
    this._sqsEndpoint = config.sqsEndpoint;
    this._visibilityTimeoutSeconds = config.visibilityTimeoutSeconds;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // access_key - computed: false, optional: false, required: true
  private _accessKey?: string; 
  public get accessKey() {
    return this.getStringAttribute('access_key');
  }
  public set accessKey(value: string) {
    this._accessKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get accessKeyInput() {
    return this._accessKey;
  }

  // content_based_deduplication - computed: true, optional: true, required: false
  private _contentBasedDeduplication?: boolean | cdktf.IResolvable; 
  public get contentBasedDeduplication() {
    return this.getBooleanAttribute('content_based_deduplication');
  }
  public set contentBasedDeduplication(value: boolean | cdktf.IResolvable) {
    this._contentBasedDeduplication = value;
  }
  public resetContentBasedDeduplication() {
    this._contentBasedDeduplication = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get contentBasedDeduplicationInput() {
    return this._contentBasedDeduplication;
  }

  // fifo_queue - computed: true, optional: true, required: false
  private _fifoQueue?: boolean | cdktf.IResolvable; 
  public get fifoQueue() {
    return this.getBooleanAttribute('fifo_queue');
  }
  public set fifoQueue(value: boolean | cdktf.IResolvable) {
    this._fifoQueue = value;
  }
  public resetFifoQueue() {
    this._fifoQueue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fifoQueueInput() {
    return this._fifoQueue;
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

  // message_max_age - computed: false, optional: true, required: false
  private _messageMaxAge?: number; 
  public get messageMaxAge() {
    return this.getNumberAttribute('message_max_age');
  }
  public set messageMaxAge(value: number) {
    this._messageMaxAge = value;
  }
  public resetMessageMaxAge() {
    this._messageMaxAge = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageMaxAgeInput() {
    return this._messageMaxAge;
  }

  // message_max_size - computed: false, optional: true, required: false
  private _messageMaxSize?: number; 
  public get messageMaxSize() {
    return this.getNumberAttribute('message_max_size');
  }
  public set messageMaxSize(value: number) {
    this._messageMaxSize = value;
  }
  public resetMessageMaxSize() {
    this._messageMaxSize = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get messageMaxSizeInput() {
    return this._messageMaxSize;
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

  // name_prefix - computed: true, optional: true, required: false
  private _namePrefix?: string; 
  public get namePrefix() {
    return this.getStringAttribute('name_prefix');
  }
  public set namePrefix(value: string) {
    this._namePrefix = value;
  }
  public resetNamePrefix() {
    this._namePrefix = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get namePrefixInput() {
    return this._namePrefix;
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

  // receive_wait_time_seconds - computed: false, optional: true, required: false
  private _receiveWaitTimeSeconds?: number; 
  public get receiveWaitTimeSeconds() {
    return this.getNumberAttribute('receive_wait_time_seconds');
  }
  public set receiveWaitTimeSeconds(value: number) {
    this._receiveWaitTimeSeconds = value;
  }
  public resetReceiveWaitTimeSeconds() {
    this._receiveWaitTimeSeconds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get receiveWaitTimeSecondsInput() {
    return this._receiveWaitTimeSeconds;
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

  // secret_key - computed: false, optional: false, required: true
  private _secretKey?: string; 
  public get secretKey() {
    return this.getStringAttribute('secret_key');
  }
  public set secretKey(value: string) {
    this._secretKey = value;
  }
  // Temporarily expose input value. Use with caution.
  public get secretKeyInput() {
    return this._secretKey;
  }

  // sqs_endpoint - computed: false, optional: true, required: false
  private _sqsEndpoint?: string; 
  public get sqsEndpoint() {
    return this.getStringAttribute('sqs_endpoint');
  }
  public set sqsEndpoint(value: string) {
    this._sqsEndpoint = value;
  }
  public resetSqsEndpoint() {
    this._sqsEndpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqsEndpointInput() {
    return this._sqsEndpoint;
  }

  // url - computed: true, optional: false, required: false
  public get url() {
    return this.getStringAttribute('url');
  }

  // visibility_timeout_seconds - computed: false, optional: true, required: false
  private _visibilityTimeoutSeconds?: number; 
  public get visibilityTimeoutSeconds() {
    return this.getNumberAttribute('visibility_timeout_seconds');
  }
  public set visibilityTimeoutSeconds(value: number) {
    this._visibilityTimeoutSeconds = value;
  }
  public resetVisibilityTimeoutSeconds() {
    this._visibilityTimeoutSeconds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get visibilityTimeoutSecondsInput() {
    return this._visibilityTimeoutSeconds;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new MnqSqsQueueTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: MnqSqsQueueTimeouts) {
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
      access_key: cdktf.stringToTerraform(this._accessKey),
      content_based_deduplication: cdktf.booleanToTerraform(this._contentBasedDeduplication),
      fifo_queue: cdktf.booleanToTerraform(this._fifoQueue),
      id: cdktf.stringToTerraform(this._id),
      message_max_age: cdktf.numberToTerraform(this._messageMaxAge),
      message_max_size: cdktf.numberToTerraform(this._messageMaxSize),
      name: cdktf.stringToTerraform(this._name),
      name_prefix: cdktf.stringToTerraform(this._namePrefix),
      project_id: cdktf.stringToTerraform(this._projectId),
      receive_wait_time_seconds: cdktf.numberToTerraform(this._receiveWaitTimeSeconds),
      region: cdktf.stringToTerraform(this._region),
      secret_key: cdktf.stringToTerraform(this._secretKey),
      sqs_endpoint: cdktf.stringToTerraform(this._sqsEndpoint),
      visibility_timeout_seconds: cdktf.numberToTerraform(this._visibilityTimeoutSeconds),
      timeouts: mnqSqsQueueTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      access_key: {
        value: cdktf.stringToHclTerraform(this._accessKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      content_based_deduplication: {
        value: cdktf.booleanToHclTerraform(this._contentBasedDeduplication),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      fifo_queue: {
        value: cdktf.booleanToHclTerraform(this._fifoQueue),
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
      message_max_age: {
        value: cdktf.numberToHclTerraform(this._messageMaxAge),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      message_max_size: {
        value: cdktf.numberToHclTerraform(this._messageMaxSize),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name_prefix: {
        value: cdktf.stringToHclTerraform(this._namePrefix),
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
      receive_wait_time_seconds: {
        value: cdktf.numberToHclTerraform(this._receiveWaitTimeSeconds),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      secret_key: {
        value: cdktf.stringToHclTerraform(this._secretKey),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      sqs_endpoint: {
        value: cdktf.stringToHclTerraform(this._sqsEndpoint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      visibility_timeout_seconds: {
        value: cdktf.numberToHclTerraform(this._visibilityTimeoutSeconds),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      timeouts: {
        value: mnqSqsQueueTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "MnqSqsQueueTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
