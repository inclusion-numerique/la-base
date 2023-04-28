// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface ContainerConfig extends cdktf.TerraformMetaArguments {
  /**
  * The amount of vCPU computing resources to allocate to each container. Defaults to 70.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#cpu_limit Container#cpu_limit}
  */
  readonly cpuLimit?: number;
  /**
  * This allows you to control your production environment
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#deploy Container#deploy}
  */
  readonly deploy?: boolean | cdktf.IResolvable;
  /**
  * The container description
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#description Container#description}
  */
  readonly description?: string;
  /**
  * The environment variables to be injected into your container at runtime.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#environment_variables Container#environment_variables}
  */
  readonly environmentVariables?: { [key: string]: string };
  /**
  * HTTP traffic configuration
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#http_option Container#http_option}
  */
  readonly httpOption?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#id Container#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The maximum the number of simultaneous requests your container can handle at the same time. Defaults to 50.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#max_concurrency Container#max_concurrency}
  */
  readonly maxConcurrency?: number;
  /**
  * The maximum of number of instances this container can scale to. Default to 20.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#max_scale Container#max_scale}
  */
  readonly maxScale?: number;
  /**
  * The memory computing resources in MB to allocate to each container. Defaults to 128.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#memory_limit Container#memory_limit}
  */
  readonly memoryLimit?: number;
  /**
  * The minimum of running container instances continuously. Defaults to 0.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#min_scale Container#min_scale}
  */
  readonly minScale?: number;
  /**
  * The container name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#name Container#name}
  */
  readonly name?: string;
  /**
  * The container namespace associated
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#namespace_id Container#namespace_id}
  */
  readonly namespaceId: string;
  /**
  * The port to expose the container. Defaults to 8080
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#port Container#port}
  */
  readonly port?: number;
  /**
  * The privacy type define the way to authenticate to your container
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#privacy Container#privacy}
  */
  readonly privacy?: string;
  /**
  * The communication protocol http1 or h2c. Defaults to http1.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#protocol Container#protocol}
  */
  readonly protocol?: string;
  /**
  * The scaleway registry image address
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#registry_image Container#registry_image}
  */
  readonly registryImage?: string;
  /**
  * The sha256 of your source registry image, changing it will re-apply the deployment. Can be any string
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#registry_sha256 Container#registry_sha256}
  */
  readonly registrySha256?: string;
  /**
  * The secret environment variables to be injected into your container at runtime.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#secret_environment_variables Container#secret_environment_variables}
  */
  readonly secretEnvironmentVariables?: { [key: string]: string };
  /**
  * The container status
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#status Container#status}
  */
  readonly status?: string;
  /**
  * The maximum amount of time in seconds during which your container can process a request before we stop it. Defaults to 300s.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#timeout Container#timeout}
  */
  readonly timeout?: number;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#timeouts Container#timeouts}
  */
  readonly timeouts?: ContainerTimeouts;
}
export interface ContainerTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#create Container#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#default Container#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#delete Container#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#read Container#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container#update Container#update}
  */
  readonly update?: string;
}

export function containerTimeoutsToTerraform(struct?: ContainerTimeouts | cdktf.IResolvable): any {
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

export class ContainerTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): ContainerTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: ContainerTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container scaleway_container}
*/
export class Container extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_container";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/container scaleway_container} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options ContainerConfig
  */
  public constructor(scope: Construct, id: string, config: ContainerConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_container',
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
    this._cpuLimit = config.cpuLimit;
    this._deploy = config.deploy;
    this._description = config.description;
    this._environmentVariables = config.environmentVariables;
    this._httpOption = config.httpOption;
    this._id = config.id;
    this._maxConcurrency = config.maxConcurrency;
    this._maxScale = config.maxScale;
    this._memoryLimit = config.memoryLimit;
    this._minScale = config.minScale;
    this._name = config.name;
    this._namespaceId = config.namespaceId;
    this._port = config.port;
    this._privacy = config.privacy;
    this._protocol = config.protocol;
    this._registryImage = config.registryImage;
    this._registrySha256 = config.registrySha256;
    this._secretEnvironmentVariables = config.secretEnvironmentVariables;
    this._status = config.status;
    this._timeout = config.timeout;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cpu_limit - computed: true, optional: true, required: false
  private _cpuLimit?: number; 
  public get cpuLimit() {
    return this.getNumberAttribute('cpu_limit');
  }
  public set cpuLimit(value: number) {
    this._cpuLimit = value;
  }
  public resetCpuLimit() {
    this._cpuLimit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cpuLimitInput() {
    return this._cpuLimit;
  }

  // cron_status - computed: true, optional: false, required: false
  public get cronStatus() {
    return this.getStringAttribute('cron_status');
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

  // environment_variables - computed: true, optional: true, required: false
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

  // error_message - computed: true, optional: false, required: false
  public get errorMessage() {
    return this.getStringAttribute('error_message');
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

  // max_concurrency - computed: true, optional: true, required: false
  private _maxConcurrency?: number; 
  public get maxConcurrency() {
    return this.getNumberAttribute('max_concurrency');
  }
  public set maxConcurrency(value: number) {
    this._maxConcurrency = value;
  }
  public resetMaxConcurrency() {
    this._maxConcurrency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get maxConcurrencyInput() {
    return this._maxConcurrency;
  }

  // max_scale - computed: true, optional: true, required: false
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

  // memory_limit - computed: true, optional: true, required: false
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

  // min_scale - computed: true, optional: true, required: false
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

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }

  // privacy - computed: false, optional: true, required: false
  private _privacy?: string; 
  public get privacy() {
    return this.getStringAttribute('privacy');
  }
  public set privacy(value: string) {
    this._privacy = value;
  }
  public resetPrivacy() {
    this._privacy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privacyInput() {
    return this._privacy;
  }

  // protocol - computed: false, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // registry_image - computed: true, optional: true, required: false
  private _registryImage?: string; 
  public get registryImage() {
    return this.getStringAttribute('registry_image');
  }
  public set registryImage(value: string) {
    this._registryImage = value;
  }
  public resetRegistryImage() {
    this._registryImage = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get registryImageInput() {
    return this._registryImage;
  }

  // registry_sha256 - computed: false, optional: true, required: false
  private _registrySha256?: string; 
  public get registrySha256() {
    return this.getStringAttribute('registry_sha256');
  }
  public set registrySha256(value: string) {
    this._registrySha256 = value;
  }
  public resetRegistrySha256() {
    this._registrySha256 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get registrySha256Input() {
    return this._registrySha256;
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

  // status - computed: true, optional: true, required: false
  private _status?: string; 
  public get status() {
    return this.getStringAttribute('status');
  }
  public set status(value: string) {
    this._status = value;
  }
  public resetStatus() {
    this._status = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statusInput() {
    return this._status;
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new ContainerTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: ContainerTimeouts) {
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
      cpu_limit: cdktf.numberToTerraform(this._cpuLimit),
      deploy: cdktf.booleanToTerraform(this._deploy),
      description: cdktf.stringToTerraform(this._description),
      environment_variables: cdktf.hashMapper(cdktf.stringToTerraform)(this._environmentVariables),
      http_option: cdktf.stringToTerraform(this._httpOption),
      id: cdktf.stringToTerraform(this._id),
      max_concurrency: cdktf.numberToTerraform(this._maxConcurrency),
      max_scale: cdktf.numberToTerraform(this._maxScale),
      memory_limit: cdktf.numberToTerraform(this._memoryLimit),
      min_scale: cdktf.numberToTerraform(this._minScale),
      name: cdktf.stringToTerraform(this._name),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      port: cdktf.numberToTerraform(this._port),
      privacy: cdktf.stringToTerraform(this._privacy),
      protocol: cdktf.stringToTerraform(this._protocol),
      registry_image: cdktf.stringToTerraform(this._registryImage),
      registry_sha256: cdktf.stringToTerraform(this._registrySha256),
      secret_environment_variables: cdktf.hashMapper(cdktf.stringToTerraform)(this._secretEnvironmentVariables),
      status: cdktf.stringToTerraform(this._status),
      timeout: cdktf.numberToTerraform(this._timeout),
      timeouts: containerTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
