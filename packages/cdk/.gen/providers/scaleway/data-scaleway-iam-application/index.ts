// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayIamApplicationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the IAM application
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application#application_id DataScalewayIamApplication#application_id}
  */
  readonly applicationId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application#id DataScalewayIamApplication#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the iam application
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application#name DataScalewayIamApplication#name}
  */
  readonly name?: string;
  /**
  * The organization_id the application is associated to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application#organization_id DataScalewayIamApplication#organization_id}
  */
  readonly organizationId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application scaleway_iam_application}
*/
export class DataScalewayIamApplication extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iam_application";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iam_application scaleway_iam_application} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayIamApplicationConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayIamApplicationConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iam_application',
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
    this._applicationId = config.applicationId;
    this._id = config.id;
    this._name = config.name;
    this._organizationId = config.organizationId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // application_id - computed: false, optional: true, required: false
  private _applicationId?: string; 
  public get applicationId() {
    return this.getStringAttribute('application_id');
  }
  public set applicationId(value: string) {
    this._applicationId = value;
  }
  public resetApplicationId() {
    this._applicationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get applicationIdInput() {
    return this._applicationId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // description - computed: true, optional: false, required: false
  public get description() {
    return this.getStringAttribute('description');
  }

  // editable - computed: true, optional: false, required: false
  public get editable() {
    return this.getBooleanAttribute('editable');
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

  // organization_id - computed: false, optional: true, required: false
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      application_id: cdktf.stringToTerraform(this._applicationId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      organization_id: cdktf.stringToTerraform(this._organizationId),
    };
  }
}
