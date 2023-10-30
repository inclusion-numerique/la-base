// https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayDocumentdbInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance#id DataScalewayDocumentdbInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance#instance_id DataScalewayDocumentdbInstance#instance_id}
  */
  readonly instanceId?: string;
  /**
  * The document db instance name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance#name DataScalewayDocumentdbInstance#name}
  */
  readonly name?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance#region DataScalewayDocumentdbInstance#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance scaleway_documentdb_instance}
*/
export class DataScalewayDocumentdbInstance extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_documentdb_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayDocumentdbInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayDocumentdbInstance to import
  * @param importFromId The id of the existing DataScalewayDocumentdbInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayDocumentdbInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_documentdb_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/data-sources/documentdb_instance scaleway_documentdb_instance} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayDocumentdbInstanceConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayDocumentdbInstanceConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_documentdb_instance',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.31.0',
        providerVersionConstraint: '>= 2.31.0'
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
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // engine - computed: true, optional: false, required: false
  public get engine() {
    return this.getStringAttribute('engine');
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

  // is_ha_cluster - computed: true, optional: false, required: false
  public get isHaCluster() {
    return this.getBooleanAttribute('is_ha_cluster');
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

  // node_type - computed: true, optional: false, required: false
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }

  // password - computed: true, optional: false, required: false
  public get password() {
    return this.getStringAttribute('password');
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

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // telemetry_enabled - computed: true, optional: false, required: false
  public get telemetryEnabled() {
    return this.getBooleanAttribute('telemetry_enabled');
  }

  // user_name - computed: true, optional: false, required: false
  public get userName() {
    return this.getStringAttribute('user_name');
  }

  // volume_size_in_gb - computed: true, optional: false, required: false
  public get volumeSizeInGb() {
    return this.getNumberAttribute('volume_size_in_gb');
  }

  // volume_type - computed: true, optional: false, required: false
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
