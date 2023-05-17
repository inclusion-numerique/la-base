// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayContainerConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the Container
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container#container_id DataScalewayContainer#container_id}
  */
  readonly containerId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container#id DataScalewayContainer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The container name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container#name DataScalewayContainer#name}
  */
  readonly name?: string;
  /**
  * The ID of the Container namespace
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container#namespace_id DataScalewayContainer#namespace_id}
  */
  readonly namespaceId: string;
  /**
  * The region of the resource
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container#region DataScalewayContainer#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container scaleway_container}
*/
export class DataScalewayContainer extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_container";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container scaleway_container} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayContainerConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayContainerConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_container',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.19.0',
        providerVersionConstraint: '= 2.19.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._containerId = config.containerId;
    this._id = config.id;
    this._name = config.name;
    this._namespaceId = config.namespaceId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // container_id - computed: false, optional: true, required: false
  private _containerId?: string; 
  public get containerId() {
    return this.getStringAttribute('container_id');
  }
  public set containerId(value: string) {
    this._containerId = value;
  }
  public resetContainerId() {
    this._containerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get containerIdInput() {
    return this._containerId;
  }

  // cpu_limit - computed: true, optional: false, required: false
  public get cpuLimit() {
    return this.getNumberAttribute('cpu_limit');
  }

  // cron_status - computed: true, optional: false, required: false
  public get cronStatus() {
    return this.getStringAttribute('cron_status');
  }

  // deploy - computed: true, optional: false, required: false
  public get deploy() {
    return this.getBooleanAttribute('deploy');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // domain_name - computed: true, optional: false, required: false
  public get domainName() {
    return this.getStringAttribute('domain_name');
  }

  // environment_variables - computed: true, optional: false, required: false
  private _environmentVariables = new cdktf.StringMap(this, "environment_variables");
  public get environmentVariables() {
    return this._environmentVariables;
  }

  // error_message - computed: true, optional: false, required: false
  public get errorMessage() {
    return this.getStringAttribute('error_message');
  }

  // http_option - computed: true, optional: false, required: false
  public get httpOption() {
    return this.getStringAttribute('http_option');
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

  // max_concurrency - computed: true, optional: false, required: false
  public get maxConcurrency() {
    return this.getNumberAttribute('max_concurrency');
  }

  // max_scale - computed: true, optional: false, required: false
  public get maxScale() {
    return this.getNumberAttribute('max_scale');
  }

  // memory_limit - computed: true, optional: false, required: false
  public get memoryLimit() {
    return this.getNumberAttribute('memory_limit');
  }

  // min_scale - computed: true, optional: false, required: false
  public get minScale() {
    return this.getNumberAttribute('min_scale');
  }

  // name - computed: false, optional: true, required: false
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

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // privacy - computed: true, optional: false, required: false
  public get privacy() {
    return this.getStringAttribute('privacy');
  }

  // protocol - computed: true, optional: false, required: false
  public get protocol() {
    return this.getStringAttribute('protocol');
  }

  // region - computed: false, optional: true, required: false
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

  // registry_image - computed: true, optional: false, required: false
  public get registryImage() {
    return this.getStringAttribute('registry_image');
  }

  // registry_sha256 - computed: true, optional: false, required: false
  public get registrySha256() {
    return this.getStringAttribute('registry_sha256');
  }

  // secret_environment_variables - computed: true, optional: false, required: false
  private _secretEnvironmentVariables = new cdktf.StringMap(this, "secret_environment_variables");
  public get secretEnvironmentVariables() {
    return this._secretEnvironmentVariables;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // timeout - computed: true, optional: false, required: false
  public get timeout() {
    return this.getNumberAttribute('timeout');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      container_id: cdktf.stringToTerraform(this._containerId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
