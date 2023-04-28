// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface InstanceImageConfig extends cdktf.TerraformMetaArguments {
  /**
  * The IDs of the additional volumes attached to the image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#additional_volume_ids InstanceImage#additional_volume_ids}
  */
  readonly additionalVolumeIds?: string[];
  /**
  * Architecture of the image (default = x86_64)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#architecture InstanceImage#architecture}
  */
  readonly architecture?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#id InstanceImage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#name InstanceImage#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#project_id InstanceImage#project_id}
  */
  readonly projectId?: string;
  /**
  * If true, the image will be public
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#public InstanceImage#public}
  */
  readonly public?: boolean | cdktf.IResolvable;
  /**
  * UUID of the snapshot from which the image is to be created
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#root_volume_id InstanceImage#root_volume_id}
  */
  readonly rootVolumeId: string;
  /**
  * List of tags ["tag1", "tag2", ...] attached to the image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#tags InstanceImage#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#zone InstanceImage#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#timeouts InstanceImage#timeouts}
  */
  readonly timeouts?: InstanceImageTimeouts;
}
export interface InstanceImageAdditionalVolumes {
}

export function instanceImageAdditionalVolumesToTerraform(struct?: InstanceImageAdditionalVolumes): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class InstanceImageAdditionalVolumesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceImageAdditionalVolumes | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceImageAdditionalVolumes | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // creation_date - computed: true, optional: false, required: false
  public get creationDate() {
    return this.getStringAttribute('creation_date');
  }

  // export_uri - computed: true, optional: false, required: false
  public get exportUri() {
    return this.getStringAttribute('export_uri');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // modification_date - computed: true, optional: false, required: false
  public get modificationDate() {
    return this.getStringAttribute('modification_date');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // organization - computed: true, optional: false, required: false
  public get organization() {
    return this.getStringAttribute('organization');
  }

  // project - computed: true, optional: false, required: false
  public get project() {
    return this.getStringAttribute('project');
  }

  // server - computed: true, optional: false, required: false
  private _server = new cdktf.StringMap(this, "server");
  public get server() {
    return this._server;
  }

  // size - computed: true, optional: false, required: false
  public get size() {
    return this.getNumberAttribute('size');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // volume_type - computed: true, optional: false, required: false
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }
}

export class InstanceImageAdditionalVolumesList extends cdktf.ComplexList {

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
  public get(index: number): InstanceImageAdditionalVolumesOutputReference {
    return new InstanceImageAdditionalVolumesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface InstanceImageTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#create InstanceImage#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#default InstanceImage#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#delete InstanceImage#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#read InstanceImage#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image#update InstanceImage#update}
  */
  readonly update?: string;
}

export function instanceImageTimeoutsToTerraform(struct?: InstanceImageTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class InstanceImageTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): InstanceImageTimeouts | cdktf.IResolvable | undefined {
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
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceImageTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._read = undefined;
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
      this._read = value.read;
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

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image scaleway_instance_image}
*/
export class InstanceImage extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_image";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/resources/instance_image scaleway_instance_image} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options InstanceImageConfig
  */
  public constructor(scope: Construct, id: string, config: InstanceImageConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_image',
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
    this._additionalVolumeIds = config.additionalVolumeIds;
    this._architecture = config.architecture;
    this._id = config.id;
    this._name = config.name;
    this._projectId = config.projectId;
    this._public = config.public;
    this._rootVolumeId = config.rootVolumeId;
    this._tags = config.tags;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // additional_volume_ids - computed: false, optional: true, required: false
  private _additionalVolumeIds?: string[]; 
  public get additionalVolumeIds() {
    return this.getListAttribute('additional_volume_ids');
  }
  public set additionalVolumeIds(value: string[]) {
    this._additionalVolumeIds = value;
  }
  public resetAdditionalVolumeIds() {
    this._additionalVolumeIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get additionalVolumeIdsInput() {
    return this._additionalVolumeIds;
  }

  // additional_volumes - computed: true, optional: false, required: false
  private _additionalVolumes = new InstanceImageAdditionalVolumesList(this, "additional_volumes", false);
  public get additionalVolumes() {
    return this._additionalVolumes;
  }

  // architecture - computed: false, optional: true, required: false
  private _architecture?: string; 
  public get architecture() {
    return this.getStringAttribute('architecture');
  }
  public set architecture(value: string) {
    this._architecture = value;
  }
  public resetArchitecture() {
    this._architecture = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get architectureInput() {
    return this._architecture;
  }

  // creation_date - computed: true, optional: false, required: false
  public get creationDate() {
    return this.getStringAttribute('creation_date');
  }

  // from_server_id - computed: true, optional: false, required: false
  public get fromServerId() {
    return this.getStringAttribute('from_server_id');
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

  // modification_date - computed: true, optional: false, required: false
  public get modificationDate() {
    return this.getStringAttribute('modification_date');
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

  // public - computed: false, optional: true, required: false
  private _public?: boolean | cdktf.IResolvable; 
  public get public() {
    return this.getBooleanAttribute('public');
  }
  public set public(value: boolean | cdktf.IResolvable) {
    this._public = value;
  }
  public resetPublic() {
    this._public = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicInput() {
    return this._public;
  }

  // root_volume_id - computed: false, optional: false, required: true
  private _rootVolumeId?: string; 
  public get rootVolumeId() {
    return this.getStringAttribute('root_volume_id');
  }
  public set rootVolumeId(value: string) {
    this._rootVolumeId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get rootVolumeIdInput() {
    return this._rootVolumeId;
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
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
  private _timeouts = new InstanceImageTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: InstanceImageTimeouts) {
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
      additional_volume_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._additionalVolumeIds),
      architecture: cdktf.stringToTerraform(this._architecture),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      public: cdktf.booleanToTerraform(this._public),
      root_volume_id: cdktf.stringToTerraform(this._rootVolumeId),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
      timeouts: instanceImageTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
