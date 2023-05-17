// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayContainerNamespaceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace#id DataScalewayContainerNamespace#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the container namespace
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace#name DataScalewayContainerNamespace#name}
  */
  readonly name?: string;
  /**
  * The ID of the Container namespace
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace#namespace_id DataScalewayContainerNamespace#namespace_id}
  */
  readonly namespaceId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace#region DataScalewayContainerNamespace#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace scaleway_container_namespace}
*/
export class DataScalewayContainerNamespace extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_container_namespace";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/container_namespace scaleway_container_namespace} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayContainerNamespaceConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayContainerNamespaceConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_container_namespace',
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
    this._id = config.id;
    this._name = config.name;
    this._namespaceId = config.namespaceId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // destroy_registry - computed: true, optional: false, required: false
  public get destroyRegistry() {
    return this.getBooleanAttribute('destroy_registry');
  }

  // environment_variables - computed: true, optional: false, required: false
  private _environmentVariables = new cdktf.StringMap(this, "environment_variables");
  public get environmentVariables() {
    return this._environmentVariables;
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

  // namespace_id - computed: false, optional: true, required: false
  private _namespaceId?: string; 
  public get namespaceId() {
    return this.getStringAttribute('namespace_id');
  }
  public set namespaceId(value: string) {
    this._namespaceId = value;
  }
  public resetNamespaceId() {
    this._namespaceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get namespaceIdInput() {
    return this._namespaceId;
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
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

  // registry_endpoint - computed: true, optional: false, required: false
  public get registryEndpoint() {
    return this.getStringAttribute('registry_endpoint');
  }

  // registry_namespace_id - computed: true, optional: false, required: false
  public get registryNamespaceId() {
    return this.getStringAttribute('registry_namespace_id');
  }

  // secret_environment_variables - computed: true, optional: false, required: false
  private _secretEnvironmentVariables = new cdktf.StringMap(this, "secret_environment_variables");
  public get secretEnvironmentVariables() {
    return this._secretEnvironmentVariables;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      namespace_id: cdktf.stringToTerraform(this._namespaceId),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
