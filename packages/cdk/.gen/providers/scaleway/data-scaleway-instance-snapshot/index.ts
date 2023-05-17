// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInstanceSnapshotConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot#id DataScalewayInstanceSnapshot#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the snapshot
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot#name DataScalewayInstanceSnapshot#name}
  */
  readonly name?: string;
  /**
  * The ID of the snapshot
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot#snapshot_id DataScalewayInstanceSnapshot#snapshot_id}
  */
  readonly snapshotId?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot#zone DataScalewayInstanceSnapshot#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayInstanceSnapshotImport {
}

export function dataScalewayInstanceSnapshotImportToTerraform(struct?: DataScalewayInstanceSnapshotImport): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayInstanceSnapshotImportOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): DataScalewayInstanceSnapshotImport | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayInstanceSnapshotImport | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // bucket - computed: true, optional: false, required: false
  public get bucket() {
    return this.getStringAttribute('bucket');
  }

  // key - computed: true, optional: false, required: false
  public get key() {
    return this.getStringAttribute('key');
  }
}

export class DataScalewayInstanceSnapshotImportList extends cdktf.ComplexList {

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param wrapsSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  constructor(protected terraformResource: cdktf.IInterpolatingParent, protected terraformAttribute: string, protected wrapsSet: boolean) {
    super(terraformResource, terraformAttribute, wrapsSet)
  }

  /**
  * @param index the index of the item to return
  */
  public get(index: number): DataScalewayInstanceSnapshotImportOutputReference {
    return new DataScalewayInstanceSnapshotImportOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot scaleway_instance_snapshot}
*/
export class DataScalewayInstanceSnapshot extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_snapshot";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_snapshot scaleway_instance_snapshot} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInstanceSnapshotConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInstanceSnapshotConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_snapshot',
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
    this._snapshotId = config.snapshotId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // import - computed: true, optional: false, required: false
  private _import = new DataScalewayInstanceSnapshotImportList(this, "import", false);
  public get import() {
    return this._import;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // size_in_gb - computed: true, optional: false, required: false
  public get sizeInGb() {
    return this.getNumberAttribute('size_in_gb');
  }

  // snapshot_id - computed: false, optional: true, required: false
  private _snapshotId?: string; 
  public get snapshotId() {
    return this.getStringAttribute('snapshot_id');
  }
  public set snapshotId(value: string) {
    this._snapshotId = value;
  }
  public resetSnapshotId() {
    this._snapshotId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get snapshotIdInput() {
    return this._snapshotId;
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // volume_id - computed: true, optional: false, required: false
  public get volumeId() {
    return this.getStringAttribute('volume_id');
  }

  // zone - computed: false, optional: true, required: false
  private _zone?: string; 
  public get zone() {
    return this.getStringAttribute('zone');
  }
  public set zone(value: string) {
    this._zone = value;
  }
  public resetZone() {
    this._zone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get zoneInput() {
    return this._zone;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      snapshot_id: cdktf.stringToTerraform(this._snapshotId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
