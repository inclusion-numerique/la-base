// https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface FunctionResourceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Define if the function should be deployed, terraform will wait for function to be deployed
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#deploy FunctionResource#deploy}
  */
  readonly deploy?: boolean | cdktf.IResolvable;
  /**
  * The description of the function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#description FunctionResource#description}
  */
  readonly description?: string;
  /**
  * The environment variables of the function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#environment_variables FunctionResource#environment_variables}
  */
  readonly environmentVariables?: { [key: string]: string };
  /**
  * Handler of the function. Depends on the runtime https://developers.scaleway.com/en/products/functions/api/#create-a-function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#handler FunctionResource#handler}
  */
  readonly handler: string;
  /**
  * HTTP traffic configuration
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#http_option FunctionResource#http_option}
  */
  readonly httpOption?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#id FunctionResource#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Maximum replicas for your function (defaults to 20), our system will scale your functions automatically based on incoming workload, but will never scale the number of replicas above the configured max_scale.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#max_scale FunctionResource#max_scale}
  */
  readonly maxScale?: number;
  /**
  * Memory limit in MB for your function, defaults to 128MB
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#memory_limit FunctionResource#memory_limit}
  */
  readonly memoryLimit?: number;
  /**
  * Minimum replicas for your function, defaults to 0, Note that a function is billed when it gets executed, and using a min_scale greater than 0 will cause your function to run all the time.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#min_scale FunctionResource#min_scale}
  */
  readonly minScale?: number;
  /**
  * The name of the function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#name FunctionResource#name}
  */
  readonly name?: string;
  /**
  * The namespace ID associated with this function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#namespace_id FunctionResource#namespace_id}
  */
  readonly namespaceId: string;
  /**
  * Privacy of the function. Can be either `private` or `public`
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#privacy FunctionResource#privacy}
  */
  readonly privacy: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#project_id FunctionResource#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#region FunctionResource#region}
  */
  readonly region?: string;
  /**
  * Runtime of the function
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#runtime FunctionResource#runtime}
  */
  readonly runtime: string;
  /**
  * The secret environment variables to be injected into your function at runtime.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#secret_environment_variables FunctionResource#secret_environment_variables}
  */
  readonly secretEnvironmentVariables?: { [key: string]: string };
  /**
  * Holds the max duration (in seconds) the function is allowed for responding to a request
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#timeout FunctionResource#timeout}
  */
  readonly timeout?: number;
  /**
  * Location of the zip file to upload containing your function sources
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#zip_file FunctionResource#zip_file}
  */
  readonly zipFile?: string;
  /**
  * The hash of your source zip file, changing it will re-apply function. Can be any string
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#zip_hash FunctionResource#zip_hash}
  */
  readonly zipHash?: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#timeouts FunctionResource#timeouts}
  */
  readonly timeouts?: FunctionResourceTimeouts;
}
export interface FunctionResourceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#create FunctionResource#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#default FunctionResource#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#delete FunctionResource#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#read FunctionResource#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function#update FunctionResource#update}
  */
  readonly update?: string;
}

export function functionResourceTimeoutsToTerraform(struct?: FunctionResourceTimeouts | cdktf.IResolvable): any {
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

export class FunctionResourceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): FunctionResourceTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: FunctionResourceTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function scaleway_function}
*/
export class FunctionResource extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_function";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/function scaleway_function} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options FunctionResourceConfig
  */
  public constructor(scope: Construct, id: string, config: FunctionResourceConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_function',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.18.0',
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
    this._deploy = config.deploy;
    this._description = config.description;
    this._environmentVariables = config.environmentVariables;
    this._handler = config.handler;
    this._httpOption = config.httpOption;
    this._id = config.id;
    this._maxScale = config.maxScale;
    this._memoryLimit = config.memoryLimit;
    this._minScale = config.minScale;
    this._name = config.name;
    this._namespaceId = config.namespaceId;
    this._privacy = config.privacy;
    this._projectId = config.projectId;
    this._region = config.region;
    this._runtime = config.runtime;
    this._secretEnvironmentVariables = config.secretEnvironmentVariables;
    this._timeout = config.timeout;
    this._zipFile = config.zipFile;
    this._zipHash = config.zipHash;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cpu_limit - computed: true, optional: false, required: false
  public get cpuLimit() {
    return this.getNumberAttribute('cpu_limit');
  }

  // deploy - computed: false, optional: true, required: false
  private _deploy?: boolean | cdktf.IResolvable; 
  public get deploy() {
    return this.getBooleanAttribute('deploy');
  }
  public set deploy(value: boolean | cdktf.IResolvable) {
    this._deploy = value;
  }
  public resetDeploy() {
    this._deploy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deployInput() {
    return this._deploy;
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

  // domain_name - computed: true, optional: false, required: false
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }

  // environment_variables - computed: false, optional: true, required: false
  private _environmentVariables?: { [key: string]: string }; 
  public get environmentVariables() {
    return this.getStringMapAttribute('environment_variables');
  }
  public set environmentVariables(value: { [key: string]: string }) {
    this._environmentVariables = value;
  }
  public resetEnvironmentVariables() {
    this._environmentVariables = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get environmentVariablesInput() {
    return this._environmentVariables;
  }

  // handler - computed: false, optional: false, required: true
  private _handler?: string; 
  public get handler() {
    return this.getStringAttribute('handler');
  }
  public set handler(value: string) {
    this._handler = value;
  }
  // Temporarily expose input value. Use with caution.
  public get handlerInput() {
    return this._handler;
  }

  // http_option - computed: false, optional: true, required: false
  private _httpOption?: string; 
  public get httpOption() {
    return this.getStringAttribute('http_option');
  }
  public set httpOption(value: string) {
    this._httpOption = value;
  }
  public resetHttpOption() {
    this._httpOption = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get httpOptionInput() {
    return this._httpOption;
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

  // max_scale - computed: false, optional: true, required: false
  private _maxScale?: number; 
  public get maxScale() {
    return this.getNumberAttribute('max_scale');
  }
  public set maxScale(value: number) {
    this._maxScale = value;
  }
  public resetMaxScale() {
    this._maxScale = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxScaleInput() {
    return this._maxScale;
  }

  // memory_limit - computed: false, optional: true, required: false
  private _memoryLimit?: number; 
  public get memoryLimit() {
    return this.getNumberAttribute('memory_limit');
  }
  public set memoryLimit(value: number) {
    this._memoryLimit = value;
  }
  public resetMemoryLimit() {
    this._memoryLimit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get memoryLimitInput() {
    return this._memoryLimit;
  }

  // min_scale - computed: false, optional: true, required: false
  private _minScale?: number; 
  public get minScale() {
    return this.getNumberAttribute('min_scale');
  }
  public set minScale(value: number) {
    this._minScale = value;
  }
  public resetMinScale() {
    this._minScale = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get minScaleInput() {
    return this._minScale;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // privacy - computed: false, optional: false, required: true
  private _privacy?: string; 
  public get privacy() {
    return this.getStringAttribute('privacy');
  }
  public set privacy(value: string) {
    this._privacy = value;
  }
  // Temporarily expose input value. Use with caution.
  public get privacyInput() {
    return this._privacy;
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

  // runtime - computed: false, optional: false, required: true
  private _runtime?: string; 
  public get runtime() {
    return this.getStringAttribute('runtime');
  }
  public set runtime(value: string) {
    this._runtime = value;
  }
  // Temporarily expose input value. Use with caution.
  public get runtimeInput() {
    return this._runtime;
  }

  // secret_environment_variables - computed: false, optional: true, required: false
  private _secretEnvironmentVariables?: { [key: string]: string }; 
  public get secretEnvironmentVariables() {
    return this.getStringMapAttribute('secret_environment_variables');
  }
  public set secretEnvironmentVariables(value: { [key: string]: string }) {
    this._secretEnvironmentVariables = value;
  }
  public resetSecretEnvironmentVariables() {
    this._secretEnvironmentVariables = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretEnvironmentVariablesInput() {
    return this._secretEnvironmentVariables;
  }

  // timeout - computed: true, optional: true, required: false
  private _timeout?: number; 
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }
  public set timeout(value: number) {
    this._timeout = value;
  }
  public resetTimeout() {
    this._timeout = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutInput() {
    return this._timeout;
  }

  // zip_file - computed: false, optional: true, required: false
  private _zipFile?: string; 
  public get zipFile() {
    return this.getStringAttribute('zip_file');
  }
  public set zipFile(value: string) {
    this._zipFile = value;
  }
  public resetZipFile() {
    this._zipFile = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zipFileInput() {
    return this._zipFile;
  }

  // zip_hash - computed: false, optional: true, required: false
  private _zipHash?: string; 
  public get zipHash() {
    return this.getStringAttribute('zip_hash');
  }
  public set zipHash(value: string) {
    this._zipHash = value;
  }
  public resetZipHash() {
    this._zipHash = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zipHashInput() {
    return this._zipHash;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new FunctionResourceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: FunctionResourceTimeouts) {
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
      deploy: cdktf.booleanToTerraform(this._deploy),
      description: cdktf.stringToTerraform(this._description),
      environment_variables: cdktf.hashMapper(cdktf.stringToTerraform)(this._environmentVariables),
      handler: cdktf.stringToTerraform(this._handler),
      http_option: cdktf.stringToTerraform(this._httpOption),
      id: cdktf.stringToTerraform(this._id),
      max_scale: cdktf.numberToTerraform(this._maxScale),
      memory_limit: cdktf.numberToTerraform(this._memoryLimit),
      min_scale: cdktf.numberToTerraform(this._minScale),
      name: cdktf.stringToTerraform(this._name),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      privacy: cdktf.stringToTerraform(this._privacy),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      runtime: cdktf.stringToTerraform(this._runtime),
      secret_environment_variables: cdktf.hashMapper(cdktf.stringToTerraform)(this._secretEnvironmentVariables),
      timeout: cdktf.numberToTerraform(this._timeout),
      zip_file: cdktf.stringToTerraform(this._zipFile),
      zip_hash: cdktf.stringToTerraform(this._zipHash),
      timeouts: functionResourceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
