// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface IamGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * List of IDs of the applications attached to the group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#application_ids IamGroup#application_ids}
  */
  readonly applicationIds?: string[];
  /**
  * The description of the iam group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#description IamGroup#description}
  */
  readonly description?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#id IamGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the iam group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#name IamGroup#name}
  */
  readonly name?: string;
  /**
  * ID of organization the resource is associated to.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#organization_id IamGroup#organization_id}
  */
  readonly organizationId?: string;
  /**
  * List of IDs of the users attached to the group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group#user_ids IamGroup#user_ids}
  */
  readonly userIds?: string[];
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group scaleway_iam_group}
*/
export class IamGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iam_group";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/iam_group scaleway_iam_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options IamGroupConfig = {}
  */
  public constructor(scope: Construct, id: string, config: IamGroupConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iam_group',
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
    this._applicationIds = config.applicationIds;
    this._description = config.description;
    this._id = config.id;
    this._name = config.name;
    this._organizationId = config.organizationId;
    this._userIds = config.userIds;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // application_ids - computed: false, optional: true, required: false
  private _applicationIds?: string[]; 
  public get applicationIds() {
    return cdktf.Fn.tolist(this.getListAttribute('application_ids'));
  }
  public set applicationIds(value: string[]) {
    this._applicationIds = value;
  }
  public resetApplicationIds() {
    this._applicationIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get applicationIdsInput() {
    return this._applicationIds;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // user_ids - computed: false, optional: true, required: false
  private _userIds?: string[]; 
  public get userIds() {
    return cdktf.Fn.tolist(this.getListAttribute('user_ids'));
  }
  public set userIds(value: string[]) {
    this._userIds = value;
  }
  public resetUserIds() {
    this._userIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userIdsInput() {
    return this._userIds;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      application_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._applicationIds),
      description: cdktf.stringToTerraform(this._description),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      organization_id: cdktf.stringToTerraform(this._organizationId),
      user_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._userIds),
    };
  }
}
