// https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MnqQueueConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#id MnqQueue#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The number of seconds the queue retains a message.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#message_max_age MnqQueue#message_max_age}
  */
  readonly messageMaxAge?: number;
  /**
  * The maximum size of a message. Should be in bytes.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#message_max_size MnqQueue#message_max_size}
  */
  readonly messageMaxSize?: number;
  /**
  * The name of the queue. Conflicts with name_prefix.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#name MnqQueue#name}
  */
  readonly name?: string;
  /**
  * Creates a unique name beginning with the specified prefix. Conflicts with name.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#name_prefix MnqQueue#name_prefix}
  */
  readonly namePrefix?: string;
  /**
  * The ID of the Namespace associated to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#namespace_id MnqQueue#namespace_id}
  */
  readonly namespaceId: string;
  /**
  * nats block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#nats MnqQueue#nats}
  */
  readonly nats?: MnqQueueNats;
  /**
  * sqs block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#sqs MnqQueue#sqs}
  */
  readonly sqs?: MnqQueueSqs;
}
export interface MnqQueueNats {
  /**
  * Line jump separated key and seed
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#credentials MnqQueue#credentials}
  */
  readonly credentials: string;
  /**
  * The endpoint of the NATS queue. Can contain a {region} placeholder.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#endpoint MnqQueue#endpoint}
  */
  readonly endpoint?: string;
  /**
  * The retention policy of the queue. See https://docs.nats.io/nats-concepts/jetstream/streams#retentionpolicy for more information.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#retention_policy MnqQueue#retention_policy}
  */
  readonly retentionPolicy?: string;
}

export function mnqQueueNatsToTerraform(struct?: MnqQueueNatsOutputReference | MnqQueueNats): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    credentials: cdktf.stringToTerraform(struct!.credentials),
    endpoint: cdktf.stringToTerraform(struct!.endpoint),
    retention_policy: cdktf.stringToTerraform(struct!.retentionPolicy),
  }
}

export class MnqQueueNatsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqQueueNats | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._credentials !== undefined) {
      hasAnyValues = true;
      internalValueResult.credentials = this._credentials;
    }
    if (this._endpoint !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpoint = this._endpoint;
    }
    if (this._retentionPolicy !== undefined) {
      hasAnyValues = true;
      internalValueResult.retentionPolicy = this._retentionPolicy;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqQueueNats | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._credentials = undefined;
      this._endpoint = undefined;
      this._retentionPolicy = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._credentials = value.credentials;
      this._endpoint = value.endpoint;
      this._retentionPolicy = value.retentionPolicy;
    }
  }

  // credentials - computed: false, optional: false, required: true
  private _credentials?: string; 
  public get credentials() {
    return this.getStringAttribute('credentials');
  }
  public set credentials(value: string) {
    this._credentials = value;
  }
  // Temporarily expose input value. Use with caution.
  public get credentialsInput() {
    return this._credentials;
  }

  // endpoint - computed: false, optional: true, required: false
  private _endpoint?: string; 
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }
  public set endpoint(value: string) {
    this._endpoint = value;
  }
  public resetEndpoint() {
    this._endpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointInput() {
    return this._endpoint;
  }

  // retention_policy - computed: false, optional: true, required: false
  private _retentionPolicy?: string; 
  public get retentionPolicy() {
    return this.getStringAttribute('retention_policy');
  }
  public set retentionPolicy(value: string) {
    this._retentionPolicy = value;
  }
  public resetRetentionPolicy() {
    this._retentionPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get retentionPolicyInput() {
    return this._retentionPolicy;
  }
}
export interface MnqQueueSqs {
  /**
  * The access key of the SQS queue
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#access_key MnqQueue#access_key}
  */
  readonly accessKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#content_based_deduplication MnqQueue#content_based_deduplication}
  */
  readonly contentBasedDeduplication?: boolean | cdktf.IResolvable;
  /**
  * The endpoint of the SQS queue. Can contain a {region} placeholder.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#endpoint MnqQueue#endpoint}
  */
  readonly endpoint?: string;
  /**
  * Whether the queue is a FIFO queue. If true, the queue name must end with .fifo
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#fifo_queue MnqQueue#fifo_queue}
  */
  readonly fifoQueue?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#receive_wait_time_seconds MnqQueue#receive_wait_time_seconds}
  */
  readonly receiveWaitTimeSeconds?: number;
  /**
  * The secret key of the SQS queue
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#secret_key MnqQueue#secret_key}
  */
  readonly secretKey: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue#visibility_timeout_seconds MnqQueue#visibility_timeout_seconds}
  */
  readonly visibilityTimeoutSeconds?: number;
}

export function mnqQueueSqsToTerraform(struct?: MnqQueueSqsOutputReference | MnqQueueSqs): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    access_key: cdktf.stringToTerraform(struct!.accessKey),
    content_based_deduplication: cdktf.booleanToTerraform(struct!.contentBasedDeduplication),
    endpoint: cdktf.stringToTerraform(struct!.endpoint),
    fifo_queue: cdktf.booleanToTerraform(struct!.fifoQueue),
    receive_wait_time_seconds: cdktf.numberToTerraform(struct!.receiveWaitTimeSeconds),
    secret_key: cdktf.stringToTerraform(struct!.secretKey),
    visibility_timeout_seconds: cdktf.numberToTerraform(struct!.visibilityTimeoutSeconds),
  }
}

export class MnqQueueSqsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MnqQueueSqs | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._accessKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.accessKey = this._accessKey;
    }
    if (this._contentBasedDeduplication !== undefined) {
      hasAnyValues = true;
      internalValueResult.contentBasedDeduplication = this._contentBasedDeduplication;
    }
    if (this._endpoint !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpoint = this._endpoint;
    }
    if (this._fifoQueue !== undefined) {
      hasAnyValues = true;
      internalValueResult.fifoQueue = this._fifoQueue;
    }
    if (this._receiveWaitTimeSeconds !== undefined) {
      hasAnyValues = true;
      internalValueResult.receiveWaitTimeSeconds = this._receiveWaitTimeSeconds;
    }
    if (this._secretKey !== undefined) {
      hasAnyValues = true;
      internalValueResult.secretKey = this._secretKey;
    }
    if (this._visibilityTimeoutSeconds !== undefined) {
      hasAnyValues = true;
      internalValueResult.visibilityTimeoutSeconds = this._visibilityTimeoutSeconds;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MnqQueueSqs | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._accessKey = undefined;
      this._contentBasedDeduplication = undefined;
      this._endpoint = undefined;
      this._fifoQueue = undefined;
      this._receiveWaitTimeSeconds = undefined;
      this._secretKey = undefined;
      this._visibilityTimeoutSeconds = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._accessKey = value.accessKey;
      this._contentBasedDeduplication = value.contentBasedDeduplication;
      this._endpoint = value.endpoint;
      this._fifoQueue = value.fifoQueue;
      this._receiveWaitTimeSeconds = value.receiveWaitTimeSeconds;
      this._secretKey = value.secretKey;
      this._visibilityTimeoutSeconds = value.visibilityTimeoutSeconds;
    }
  }

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

  // content_based_deduplication - computed: false, optional: true, required: false
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

  // endpoint - computed: false, optional: true, required: false
  private _endpoint?: string; 
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }
  public set endpoint(value: string) {
    this._endpoint = value;
  }
  public resetEndpoint() {
    this._endpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointInput() {
    return this._endpoint;
  }

  // fifo_queue - computed: false, optional: true, required: false
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue scaleway_mnq_queue}
*/
export class MnqQueue extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mnq_queue";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/mnq_queue scaleway_mnq_queue} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MnqQueueConfig
  */
  public constructor(scope: Construct, id: string, config: MnqQueueConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mnq_queue',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.21.0',
        providerVersionConstraint: '>= 2.21.0'
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
    this._messageMaxAge = config.messageMaxAge;
    this._messageMaxSize = config.messageMaxSize;
    this._name = config.name;
    this._namePrefix = config.namePrefix;
    this._namespaceId = config.namespaceId;
    this._nats.internalValue = config.nats;
    this._sqs.internalValue = config.sqs;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // namespace_id - computed: false, optional: false, required: true
  private _namespaceId?: string; 
  public get namespaceId() {
    return this.getStringAttribute('namespace_id');
  }
  public set namespaceId(value: string) {
    this._namespaceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get namespaceIdInput() {
    return this._namespaceId;
  }

  // nats - computed: false, optional: true, required: false
  private _nats = new MnqQueueNatsOutputReference(this, "nats");
  public get nats() {
    return this._nats;
  }
  public putNats(value: MnqQueueNats) {
    this._nats.internalValue = value;
  }
  public resetNats() {
    this._nats.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get natsInput() {
    return this._nats.internalValue;
  }

  // sqs - computed: false, optional: true, required: false
  private _sqs = new MnqQueueSqsOutputReference(this, "sqs");
  public get sqs() {
    return this._sqs;
  }
  public putSqs(value: MnqQueueSqs) {
    this._sqs.internalValue = value;
  }
  public resetSqs() {
    this._sqs.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sqsInput() {
    return this._sqs.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      message_max_age: cdktf.numberToTerraform(this._messageMaxAge),
      message_max_size: cdktf.numberToTerraform(this._messageMaxSize),
      name: cdktf.stringToTerraform(this._name),
      name_prefix: cdktf.stringToTerraform(this._namePrefix),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      nats: mnqQueueNatsToTerraform(this._nats.internalValue),
      sqs: mnqQueueSqsToTerraform(this._sqs.internalValue),
    };
  }
}
