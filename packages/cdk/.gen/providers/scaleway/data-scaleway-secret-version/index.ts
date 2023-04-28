// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewaySecretVersionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version#id DataScalewaySecretVersion#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version#region DataScalewaySecretVersion#region}
  */
  readonly region?: string;
  /**
  * The revision of secret version
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version#revision DataScalewaySecretVersion#revision}
  */
  readonly revision?: string;
  /**
  * The ID of the secret
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version#secret_id DataScalewaySecretVersion#secret_id}
  */
  readonly secretId?: string;
  /**
  * The Name of the secret
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version#secret_name DataScalewaySecretVersion#secret_name}
  */
  readonly secretName?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version scaleway_secret_version}
*/
export class DataScalewaySecretVersion extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_secret_version";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/secret_version scaleway_secret_version} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewaySecretVersionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewaySecretVersionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_secret_version',
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
    this._id = config.id;
    this._region = config.region;
    this._revision = config.revision;
    this._secretId = config.secretId;
    this._secretName = config.secretName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // data - computed: true, optional: false, required: false
  public get data() {
    return this.getStringAttribute('data');
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

  // revision - computed: false, optional: true, required: false
  private _revision?: string; 
  public get revision() {
    return this.getStringAttribute('revision');
  }
  public set revision(value: string) {
    this._revision = value;
  }
  public resetRevision() {
    this._revision = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get revisionInput() {
    return this._revision;
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

  // secret_name - computed: false, optional: true, required: false
  private _secretName?: string; 
  public get secretName() {
    return this.getStringAttribute('secret_name');
  }
  public set secretName(value: string) {
    this._secretName = value;
  }
  public resetSecretName() {
    this._secretName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get secretNameInput() {
    return this._secretName;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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
      id: cdktf.stringToTerraform(this._id),
      region: cdktf.stringToTerraform(this._region),
      revision: cdktf.stringToTerraform(this._revision),
      secret_id: cdktf.stringToTerraform(this._secretId),
      secret_name: cdktf.stringToTerraform(this._secretName),
    };
  }
}
