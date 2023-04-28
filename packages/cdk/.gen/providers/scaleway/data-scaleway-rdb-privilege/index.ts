// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayRdbPrivilegeConfig extends cdktf.TerraformMetaArguments {
  /**
  * Database name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege#database_name DataScalewayRdbPrivilege#database_name}
  */
  readonly databaseName: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege#id DataScalewayRdbPrivilege#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Instance on which the database is created
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege#instance_id DataScalewayRdbPrivilege#instance_id}
  */
  readonly instanceId: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege#region DataScalewayRdbPrivilege#region}
  */
  readonly region?: string;
  /**
  * User name
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege#user_name DataScalewayRdbPrivilege#user_name}
  */
  readonly userName: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege scaleway_rdb_privilege}
*/
export class DataScalewayRdbPrivilege extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_rdb_privilege";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_privilege scaleway_rdb_privilege} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayRdbPrivilegeConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayRdbPrivilegeConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_rdb_privilege',
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
    this._databaseName = config.databaseName;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._userName = config.userName;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // database_name - computed: false, optional: false, required: true
  private _databaseName?: string; 
  public get databaseName() {
    return this.getStringAttribute('database_name');
  }
  public set databaseName(value: string) {
    this._databaseName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get databaseNameInput() {
    return this._databaseName;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // permission - computed: true, optional: false, required: false
  public get permission() {
    return this.getStringAttribute('permission');
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

  // user_name - computed: false, optional: false, required: true
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      database_name: cdktf.stringToTerraform(this._databaseName),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      user_name: cdktf.stringToTerraform(this._userName),
    };
  }
}
