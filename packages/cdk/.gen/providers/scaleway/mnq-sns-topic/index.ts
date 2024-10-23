// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MnqSnsTopicConfig extends cdktf.TerraformMetaArguments {
  /**
  * SNS access key
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#access_key MnqSnsTopic#access_key}
  */
  readonly accessKey: string;
  /**
  * Specifies whether to enable content-based deduplication.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#content_based_deduplication MnqSnsTopic#content_based_deduplication}
  */
  readonly contentBasedDeduplication?: boolean | cdktf.IResolvable;
  /**
  * Whether the topic is a FIFO topic. If true, the topic name must end with .fifo
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#fifo_topic MnqSnsTopic#fifo_topic}
  */
  readonly fifoTopic?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#id MnqSnsTopic#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Name of the SNS Topic.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#name MnqSnsTopic#name}
  */
  readonly name?: string;
  /**
  * Creates a unique name beginning with the specified prefix.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#name_prefix MnqSnsTopic#name_prefix}
  */
  readonly namePrefix?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#project_id MnqSnsTopic#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#region MnqSnsTopic#region}
  */
  readonly region?: string;
  /**
  * SNS secret key
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#secret_key MnqSnsTopic#secret_key}
  */
  readonly secretKey: string;
  /**
  * SNS endpoint
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#sns_endpoint MnqSnsTopic#sns_endpoint}
  */
  readonly snsEndpoint?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic scaleway_mnq_sns_topic}
*/
export class MnqSnsTopic extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mnq_sns_topic";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MnqSnsTopic resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MnqSnsTopic to import
  * @param importFromId The id of the existing MnqSnsTopic that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MnqSnsTopic to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_mnq_sns_topic", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/mnq_sns_topic scaleway_mnq_sns_topic} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MnqSnsTopicConfig
  */
  public constructor(scope: Construct, id: string, config: MnqSnsTopicConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mnq_sns_topic',
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
    this._fifoTopic = config.fifoTopic;
    this._id = config.id;
    this._name = config.name;
    this._namePrefix = config.namePrefix;
    this._projectId = config.projectId;
    this._region = config.region;
    this._secretKey = config.secretKey;
    this._snsEndpoint = config.snsEndpoint;
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

  // arn - computed: true, optional: false, required: false
  public get arn() {
    return this.getStringAttribute('arn');
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

  // fifo_topic - computed: true, optional: true, required: false
  private _fifoTopic?: boolean | cdktf.IResolvable; 
  public get fifoTopic() {
    return this.getBooleanAttribute('fifo_topic');
  }
  public set fifoTopic(value: boolean | cdktf.IResolvable) {
    this._fifoTopic = value;
  }
  public resetFifoTopic() {
    this._fifoTopic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fifoTopicInput() {
    return this._fifoTopic;
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

  // owner - computed: true, optional: false, required: false
  public get owner() {
    return this.getStringAttribute('owner');
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

  // sns_endpoint - computed: false, optional: true, required: false
  private _snsEndpoint?: string; 
  public get snsEndpoint() {
    return this.getStringAttribute('sns_endpoint');
  }
  public set snsEndpoint(value: string) {
    this._snsEndpoint = value;
  }
  public resetSnsEndpoint() {
    this._snsEndpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get snsEndpointInput() {
    return this._snsEndpoint;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      access_key: cdktf.stringToTerraform(this._accessKey),
      content_based_deduplication: cdktf.booleanToTerraform(this._contentBasedDeduplication),
      fifo_topic: cdktf.booleanToTerraform(this._fifoTopic),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      name_prefix: cdktf.stringToTerraform(this._namePrefix),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      secret_key: cdktf.stringToTerraform(this._secretKey),
      sns_endpoint: cdktf.stringToTerraform(this._snsEndpoint),
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
      fifo_topic: {
        value: cdktf.booleanToHclTerraform(this._fifoTopic),
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
      sns_endpoint: {
        value: cdktf.stringToHclTerraform(this._snsEndpoint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
