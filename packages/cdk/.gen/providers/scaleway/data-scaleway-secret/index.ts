// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewaySecretConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#id DataScalewaySecret#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The secret name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#name DataScalewaySecret#name}
  */
  readonly name?: string;
  /**
  * ID of organization the resource is associated to.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#organization_id DataScalewaySecret#organization_id}
  */
  readonly organizationId?: string;
  /**
  * The project ID the resource is associated to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#project_id DataScalewaySecret#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#region DataScalewaySecret#region}
  */
  readonly region?: string;
  /**
  * The ID of the secret
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret#secret_id DataScalewaySecret#secret_id}
  */
  readonly secretId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret scaleway_secret}
*/
export class DataScalewaySecret extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_secret";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/secret scaleway_secret} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewaySecretConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewaySecretConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_secret',
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
    this._organizationId = config.organizationId;
    this._projectId = config.projectId;
    this._region = config.region;
    this._secretId = config.secretId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
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

  // organization_id - computed: true, optional: true, required: false
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  public resetOrganizationId() {
    this._organizationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
  }

  // project_id - computed: false, optional: true, required: false
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

  // secret_id - computed: false, optional: true, required: false
  private _secretId?: string; 
  public get secretId() {
    return this.getStringAttribute('secret_id');
  }
  public set secretId(value: string) {
    this._secretId = value;
  }
  public resetSecretId() {
    this._secretId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretIdInput() {
    return this._secretId;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // version_count - computed: true, optional: false, required: false
  public get versionCount() {
    return this.getNumberAttribute('version_count');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      organization_id: cdktf.stringToTerraform(this._organizationId),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      secret_id: cdktf.stringToTerraform(this._secretId),
    };
  }
}
