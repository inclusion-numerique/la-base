// https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface InstanceVolumeConfig extends cdktf.TerraformMetaArguments {
  /**
  * Create a volume based on a image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#from_snapshot_id InstanceVolume#from_snapshot_id}
  */
  readonly fromSnapshotId?: string;
  /**
  * Create a copy of an existing volume
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#from_volume_id InstanceVolume#from_volume_id}
  */
  readonly fromVolumeId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#id InstanceVolume#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the volume
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#name InstanceVolume#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#project_id InstanceVolume#project_id}
  */
  readonly projectId?: string;
  /**
  * The size of the volume in gigabyte
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#size_in_gb InstanceVolume#size_in_gb}
  */
  readonly sizeInGb?: number;
  /**
  * The tags associated with the volume
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#tags InstanceVolume#tags}
  */
  readonly tags?: string[];
  /**
  * The volume type
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#type InstanceVolume#type}
  */
  readonly type: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#zone InstanceVolume#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#timeouts InstanceVolume#timeouts}
  */
  readonly timeouts?: InstanceVolumeTimeouts;
}
export interface InstanceVolumeTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#create InstanceVolume#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#default InstanceVolume#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#delete InstanceVolume#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume#update InstanceVolume#update}
  */
  readonly update?: string;
}

export function instanceVolumeTimeoutsToTerraform(struct?: InstanceVolumeTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class InstanceVolumeTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): InstanceVolumeTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceVolumeTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._default = value.default;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // default - computed: false, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume scaleway_instance_volume}
*/
export class InstanceVolume extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_volume";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/instance_volume scaleway_instance_volume} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options InstanceVolumeConfig
  */
  public constructor(scope: Construct, id: string, config: InstanceVolumeConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_volume',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.18.0',
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
    this._fromSnapshotId = config.fromSnapshotId;
    this._fromVolumeId = config.fromVolumeId;
    this._id = config.id;
    this._name = config.name;
    this._projectId = config.projectId;
    this._sizeInGb = config.sizeInGb;
    this._tags = config.tags;
    this._type = config.type;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // from_snapshot_id - computed: false, optional: true, required: false
  private _fromSnapshotId?: string; 
  public get fromSnapshotId() {
    return this.getStringAttribute('from_snapshot_id');
  }
  public set fromSnapshotId(value: string) {
    this._fromSnapshotId = value;
  }
  public resetFromSnapshotId() {
    this._fromSnapshotId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fromSnapshotIdInput() {
    return this._fromSnapshotId;
  }

  // from_volume_id - computed: false, optional: true, required: false
  private _fromVolumeId?: string; 
  public get fromVolumeId() {
    return this.getStringAttribute('from_volume_id');
  }
  public set fromVolumeId(value: string) {
    this._fromVolumeId = value;
  }
  public resetFromVolumeId() {
    this._fromVolumeId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fromVolumeIdInput() {
    return this._fromVolumeId;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // project_id - computed: true, optional: true, required: false
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

  // server_id - computed: true, optional: false, required: false
  public get serverId() {
    return this.getStringAttribute('server_id');
  }

  // size_in_gb - computed: false, optional: true, required: false
  private _sizeInGb?: number; 
  public get sizeInGb() {
    return this.getNumberAttribute('size_in_gb');
  }
  public set sizeInGb(value: number) {
    this._sizeInGb = value;
  }
  public resetSizeInGb() {
    this._sizeInGb = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInGbInput() {
    return this._sizeInGb;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return this.getListAttribute('tags');
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // type - computed: false, optional: false, required: true
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // zone - computed: true, optional: true, required: false
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new InstanceVolumeTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: InstanceVolumeTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      from_snapshot_id: cdktf.stringToTerraform(this._fromSnapshotId),
      from_volume_id: cdktf.stringToTerraform(this._fromVolumeId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      size_in_gb: cdktf.numberToTerraform(this._sizeInGb),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      type: cdktf.stringToTerraform(this._type),
      zone: cdktf.stringToTerraform(this._zone),
      timeouts: instanceVolumeTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
