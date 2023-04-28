// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayRdbDatabaseBackupConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the Backup
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup#backup_id DataScalewayRdbDatabaseBackup#backup_id}
  */
  readonly backupId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup#id DataScalewayRdbDatabaseBackup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Instance on which the user is created
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup#instance_id DataScalewayRdbDatabaseBackup#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Name of the backup.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup#name DataScalewayRdbDatabaseBackup#name}
  */
  readonly name?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup#region DataScalewayRdbDatabaseBackup#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup scaleway_rdb_database_backup}
*/
export class DataScalewayRdbDatabaseBackup extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_rdb_database_backup";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_database_backup scaleway_rdb_database_backup} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayRdbDatabaseBackupConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayRdbDatabaseBackupConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_rdb_database_backup',
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
    this._backupId = config.backupId;
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backup_id - computed: false, optional: true, required: false
  private _backupId?: string; 
  public get backupId() {
    return this.getStringAttribute('backup_id');
  }
  public set backupId(value: string) {
    this._backupId = value;
  }
  public resetBackupId() {
    this._backupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupIdInput() {
    return this._backupId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // database_name - computed: true, optional: false, required: false
  public get databaseName() {
    return this.getStringAttribute('database_name');
  }

  // expires_at - computed: true, optional: false, required: false
  public get expiresAt() {
    return this.getStringAttribute('expires_at');
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

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // instance_name - computed: true, optional: false, required: false
  public get instanceName() {
    return this.getStringAttribute('instance_name');
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

  // size - computed: true, optional: false, required: false
  public get size() {
    return this.getNumberAttribute('size');
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
      backup_id: cdktf.stringToTerraform(this._backupId),
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
