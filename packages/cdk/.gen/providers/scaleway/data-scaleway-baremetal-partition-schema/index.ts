// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayBaremetalPartitionSchemaConfig extends cdktf.TerraformMetaArguments {
  /**
  * Mount point must be an absolute path
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#ext_4_mountpoint DataScalewayBaremetalPartitionSchema#ext_4_mountpoint}
  */
  readonly ext4Mountpoint?: string;
  /**
  * set extra ext_4 partition
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#extra_partition DataScalewayBaremetalPartitionSchema#extra_partition}
  */
  readonly extraPartition?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#id DataScalewayBaremetalPartitionSchema#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * ID of the server offer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#offer_id DataScalewayBaremetalPartitionSchema#offer_id}
  */
  readonly offerId: string;
  /**
  * The base image of the server
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#os_id DataScalewayBaremetalPartitionSchema#os_id}
  */
  readonly osId: string;
  /**
  * set swap partition
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#swap DataScalewayBaremetalPartitionSchema#swap}
  */
  readonly swap?: boolean | cdktf.IResolvable;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema scaleway_baremetal_partition_schema}
*/
export class DataScalewayBaremetalPartitionSchema extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_baremetal_partition_schema";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayBaremetalPartitionSchema resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayBaremetalPartitionSchema to import
  * @param importFromId The id of the existing DataScalewayBaremetalPartitionSchema that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayBaremetalPartitionSchema to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_baremetal_partition_schema", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/baremetal_partition_schema scaleway_baremetal_partition_schema} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayBaremetalPartitionSchemaConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayBaremetalPartitionSchemaConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_baremetal_partition_schema',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.57.0',
        providerVersionConstraint: '>= 2.57.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._ext4Mountpoint = config.ext4Mountpoint;
    this._extraPartition = config.extraPartition;
    this._id = config.id;
    this._offerId = config.offerId;
    this._osId = config.osId;
    this._swap = config.swap;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // ext_4_mountpoint - computed: false, optional: true, required: false
  private _ext4Mountpoint?: string; 
  public get ext4Mountpoint() {
    return this.getStringAttribute('ext_4_mountpoint');
  }
  public set ext4Mountpoint(value: string) {
    this._ext4Mountpoint = value;
  }
  public resetExt4Mountpoint() {
    this._ext4Mountpoint = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ext4MountpointInput() {
    return this._ext4Mountpoint;
  }

  // extra_partition - computed: false, optional: true, required: false
  private _extraPartition?: boolean | cdktf.IResolvable; 
  public get extraPartition() {
    return this.getBooleanAttribute('extra_partition');
  }
  public set extraPartition(value: boolean | cdktf.IResolvable) {
    this._extraPartition = value;
  }
  public resetExtraPartition() {
    this._extraPartition = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get extraPartitionInput() {
    return this._extraPartition;
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

  // json_partition - computed: true, optional: false, required: false
  public get jsonPartition() {
    return this.getStringAttribute('json_partition');
  }

  // offer_id - computed: false, optional: false, required: true
  private _offerId?: string; 
  public get offerId() {
    return this.getStringAttribute('offer_id');
  }
  public set offerId(value: string) {
    this._offerId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get offerIdInput() {
    return this._offerId;
  }

  // os_id - computed: false, optional: false, required: true
  private _osId?: string; 
  public get osId() {
    return this.getStringAttribute('os_id');
  }
  public set osId(value: string) {
    this._osId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get osIdInput() {
    return this._osId;
  }

  // swap - computed: false, optional: true, required: false
  private _swap?: boolean | cdktf.IResolvable; 
  public get swap() {
    return this.getBooleanAttribute('swap');
  }
  public set swap(value: boolean | cdktf.IResolvable) {
    this._swap = value;
  }
  public resetSwap() {
    this._swap = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get swapInput() {
    return this._swap;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      ext_4_mountpoint: cdktf.stringToTerraform(this._ext4Mountpoint),
      extra_partition: cdktf.booleanToTerraform(this._extraPartition),
      id: cdktf.stringToTerraform(this._id),
      offer_id: cdktf.stringToTerraform(this._offerId),
      os_id: cdktf.stringToTerraform(this._osId),
      swap: cdktf.booleanToTerraform(this._swap),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      ext_4_mountpoint: {
        value: cdktf.stringToHclTerraform(this._ext4Mountpoint),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      extra_partition: {
        value: cdktf.booleanToHclTerraform(this._extraPartition),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      offer_id: {
        value: cdktf.stringToHclTerraform(this._offerId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      os_id: {
        value: cdktf.stringToHclTerraform(this._osId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      swap: {
        value: cdktf.booleanToHclTerraform(this._swap),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
