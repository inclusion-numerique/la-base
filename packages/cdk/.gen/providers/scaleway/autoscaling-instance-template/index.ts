// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface AutoscalingInstanceTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * Cloud-config to apply to each instance (will be passed in Base64 format)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#cloud_init AutoscalingInstanceTemplate#cloud_init}
  */
  readonly cloudInit?: string;
  /**
  * Name of Instance commercial type
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#commercial_type AutoscalingInstanceTemplate#commercial_type}
  */
  readonly commercialType: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#id AutoscalingInstanceTemplate#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Instance image ID. Can be an ID of a marketplace or personal image. This image must be compatible with `volume` and `commercial_type` template
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#image_id AutoscalingInstanceTemplate#image_id}
  */
  readonly imageId?: string;
  /**
  * The Instance template name
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#name AutoscalingInstanceTemplate#name}
  */
  readonly name?: string;
  /**
  * Instance placement group ID. This is optional, but it is highly recommended to set a preference for Instance location within Availability Zone
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#placement_group_id AutoscalingInstanceTemplate#placement_group_id}
  */
  readonly placementGroupId?: string;
  /**
  * Private Network IDs to attach to the new Instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#private_network_ids AutoscalingInstanceTemplate#private_network_ids}
  */
  readonly privateNetworkIds?: string[];
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#project_id AutoscalingInstanceTemplate#project_id}
  */
  readonly projectId?: string;
  /**
  * Number of flexible IPv4 addresses to attach to the new Instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#public_ips_v4_count AutoscalingInstanceTemplate#public_ips_v4_count}
  */
  readonly publicIpsV4Count?: number;
  /**
  * Number of flexible IPv6 addresses to attach to the new Instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#public_ips_v6_count AutoscalingInstanceTemplate#public_ips_v6_count}
  */
  readonly publicIpsV6Count?: number;
  /**
  * Instance security group ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#security_group_id AutoscalingInstanceTemplate#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * The tags associated with the Instance template
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#tags AutoscalingInstanceTemplate#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#zone AutoscalingInstanceTemplate#zone}
  */
  readonly zone?: string;
  /**
  * volumes block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#volumes AutoscalingInstanceTemplate#volumes}
  */
  readonly volumes?: AutoscalingInstanceTemplateVolumes[] | cdktf.IResolvable;
}
export interface AutoscalingInstanceTemplateVolumesFromEmpty {
  /**
  * Size in GB of the new empty volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#size AutoscalingInstanceTemplate#size}
  */
  readonly size: number;
}

export function autoscalingInstanceTemplateVolumesFromEmptyToTerraform(struct?: AutoscalingInstanceTemplateVolumesFromEmptyOutputReference | AutoscalingInstanceTemplateVolumesFromEmpty): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
  }
}


export function autoscalingInstanceTemplateVolumesFromEmptyToHclTerraform(struct?: AutoscalingInstanceTemplateVolumesFromEmptyOutputReference | AutoscalingInstanceTemplateVolumesFromEmpty): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstanceTemplateVolumesFromEmptyOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AutoscalingInstanceTemplateVolumesFromEmpty | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstanceTemplateVolumesFromEmpty | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
    }
  }

  // size - computed: false, optional: false, required: true
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }
}
export interface AutoscalingInstanceTemplateVolumesFromSnapshot {
  /**
  * Override size (in GB) of the cloned volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#size AutoscalingInstanceTemplate#size}
  */
  readonly size?: number;
  /**
  * ID of the snapshot to clone
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#snapshot_id AutoscalingInstanceTemplate#snapshot_id}
  */
  readonly snapshotId: string;
}

export function autoscalingInstanceTemplateVolumesFromSnapshotToTerraform(struct?: AutoscalingInstanceTemplateVolumesFromSnapshotOutputReference | AutoscalingInstanceTemplateVolumesFromSnapshot): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    size: cdktf.numberToTerraform(struct!.size),
    snapshot_id: cdktf.stringToTerraform(struct!.snapshotId),
  }
}


export function autoscalingInstanceTemplateVolumesFromSnapshotToHclTerraform(struct?: AutoscalingInstanceTemplateVolumesFromSnapshotOutputReference | AutoscalingInstanceTemplateVolumesFromSnapshot): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    size: {
      value: cdktf.numberToHclTerraform(struct!.size),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    snapshot_id: {
      value: cdktf.stringToHclTerraform(struct!.snapshotId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstanceTemplateVolumesFromSnapshotOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): AutoscalingInstanceTemplateVolumesFromSnapshot | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._size !== undefined) {
      hasAnyValues = true;
      internalValueResult.size = this._size;
    }
    if (this._snapshotId !== undefined) {
      hasAnyValues = true;
      internalValueResult.snapshotId = this._snapshotId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstanceTemplateVolumesFromSnapshot | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._size = undefined;
      this._snapshotId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._size = value.size;
      this._snapshotId = value.snapshotId;
    }
  }

  // size - computed: false, optional: true, required: false
  private _size?: number; 
  public get size() {
    return this.getNumberAttribute('size');
  }
  public set size(value: number) {
    this._size = value;
  }
  public resetSize() {
    this._size = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get sizeInput() {
    return this._size;
  }

  // snapshot_id - computed: false, optional: false, required: true
  private _snapshotId?: string; 
  public get snapshotId() {
    return this.getStringAttribute('snapshot_id');
  }
  public set snapshotId(value: string) {
    this._snapshotId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get snapshotIdInput() {
    return this._snapshotId;
  }
}
export interface AutoscalingInstanceTemplateVolumes {
  /**
  * Force the Instance to boot on this volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#boot AutoscalingInstanceTemplate#boot}
  */
  readonly boot?: boolean | cdktf.IResolvable;
  /**
  * The name of the volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#name AutoscalingInstanceTemplate#name}
  */
  readonly name: string;
  /**
  * The maximum IO/s expected, according to the different options available in stock (`5000 | 15000`)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#perf_iops AutoscalingInstanceTemplate#perf_iops}
  */
  readonly perfIops?: number;
  /**
  * List of tags assigned to the volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#tags AutoscalingInstanceTemplate#tags}
  */
  readonly tags?: string[];
  /**
  * Type of the volume
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#volume_type AutoscalingInstanceTemplate#volume_type}
  */
  readonly volumeType: string;
  /**
  * from_empty block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#from_empty AutoscalingInstanceTemplate#from_empty}
  */
  readonly fromEmpty?: AutoscalingInstanceTemplateVolumesFromEmpty;
  /**
  * from_snapshot block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#from_snapshot AutoscalingInstanceTemplate#from_snapshot}
  */
  readonly fromSnapshot?: AutoscalingInstanceTemplateVolumesFromSnapshot;
}

export function autoscalingInstanceTemplateVolumesToTerraform(struct?: AutoscalingInstanceTemplateVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    boot: cdktf.booleanToTerraform(struct!.boot),
    name: cdktf.stringToTerraform(struct!.name),
    perf_iops: cdktf.numberToTerraform(struct!.perfIops),
    tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.tags),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
    from_empty: autoscalingInstanceTemplateVolumesFromEmptyToTerraform(struct!.fromEmpty),
    from_snapshot: autoscalingInstanceTemplateVolumesFromSnapshotToTerraform(struct!.fromSnapshot),
  }
}


export function autoscalingInstanceTemplateVolumesToHclTerraform(struct?: AutoscalingInstanceTemplateVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    boot: {
      value: cdktf.booleanToHclTerraform(struct!.boot),
      isBlock: false,
      type: "simple",
      storageClassType: "boolean",
    },
    name: {
      value: cdktf.stringToHclTerraform(struct!.name),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    perf_iops: {
      value: cdktf.numberToHclTerraform(struct!.perfIops),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
    tags: {
      value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(struct!.tags),
      isBlock: false,
      type: "list",
      storageClassType: "stringList",
    },
    volume_type: {
      value: cdktf.stringToHclTerraform(struct!.volumeType),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    from_empty: {
      value: autoscalingInstanceTemplateVolumesFromEmptyToHclTerraform(struct!.fromEmpty),
      isBlock: true,
      type: "list",
      storageClassType: "AutoscalingInstanceTemplateVolumesFromEmptyList",
    },
    from_snapshot: {
      value: autoscalingInstanceTemplateVolumesFromSnapshotToHclTerraform(struct!.fromSnapshot),
      isBlock: true,
      type: "list",
      storageClassType: "AutoscalingInstanceTemplateVolumesFromSnapshotList",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class AutoscalingInstanceTemplateVolumesOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): AutoscalingInstanceTemplateVolumes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._boot !== undefined) {
      hasAnyValues = true;
      internalValueResult.boot = this._boot;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._perfIops !== undefined) {
      hasAnyValues = true;
      internalValueResult.perfIops = this._perfIops;
    }
    if (this._tags !== undefined) {
      hasAnyValues = true;
      internalValueResult.tags = this._tags;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    if (this._fromEmpty?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.fromEmpty = this._fromEmpty?.internalValue;
    }
    if (this._fromSnapshot?.internalValue !== undefined) {
      hasAnyValues = true;
      internalValueResult.fromSnapshot = this._fromSnapshot?.internalValue;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: AutoscalingInstanceTemplateVolumes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._boot = undefined;
      this._name = undefined;
      this._perfIops = undefined;
      this._tags = undefined;
      this._volumeType = undefined;
      this._fromEmpty.internalValue = undefined;
      this._fromSnapshot.internalValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._boot = value.boot;
      this._name = value.name;
      this._perfIops = value.perfIops;
      this._tags = value.tags;
      this._volumeType = value.volumeType;
      this._fromEmpty.internalValue = value.fromEmpty;
      this._fromSnapshot.internalValue = value.fromSnapshot;
    }
  }

  // boot - computed: false, optional: true, required: false
  private _boot?: boolean | cdktf.IResolvable; 
  public get boot() {
    return this.getBooleanAttribute('boot');
  }
  public set boot(value: boolean | cdktf.IResolvable) {
    this._boot = value;
  }
  public resetBoot() {
    this._boot = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bootInput() {
    return this._boot;
  }

  // name - computed: false, optional: false, required: true
  private _name?: string; 
  public get name() {
    return this.getStringAttribute('name');
  }
  public set name(value: string) {
    this._name = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nameInput() {
    return this._name;
  }

  // perf_iops - computed: false, optional: true, required: false
  private _perfIops?: number; 
  public get perfIops() {
    return this.getNumberAttribute('perf_iops');
  }
  public set perfIops(value: number) {
    this._perfIops = value;
  }
  public resetPerfIops() {
    this._perfIops = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get perfIopsInput() {
    return this._perfIops;
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

  // volume_type - computed: false, optional: false, required: true
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }

  // from_empty - computed: false, optional: true, required: false
  private _fromEmpty = new AutoscalingInstanceTemplateVolumesFromEmptyOutputReference(this, "from_empty");
  public get fromEmpty() {
    return this._fromEmpty;
  }
  public putFromEmpty(value: AutoscalingInstanceTemplateVolumesFromEmpty) {
    this._fromEmpty.internalValue = value;
  }
  public resetFromEmpty() {
    this._fromEmpty.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fromEmptyInput() {
    return this._fromEmpty.internalValue;
  }

  // from_snapshot - computed: false, optional: true, required: false
  private _fromSnapshot = new AutoscalingInstanceTemplateVolumesFromSnapshotOutputReference(this, "from_snapshot");
  public get fromSnapshot() {
    return this._fromSnapshot;
  }
  public putFromSnapshot(value: AutoscalingInstanceTemplateVolumesFromSnapshot) {
    this._fromSnapshot.internalValue = value;
  }
  public resetFromSnapshot() {
    this._fromSnapshot.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get fromSnapshotInput() {
    return this._fromSnapshot.internalValue;
  }
}

export class AutoscalingInstanceTemplateVolumesList extends cdktf.ComplexList {
  public internalValue? : AutoscalingInstanceTemplateVolumes[] | cdktf.IResolvable

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
  public get(index: number): AutoscalingInstanceTemplateVolumesOutputReference {
    return new AutoscalingInstanceTemplateVolumesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template scaleway_autoscaling_instance_template}
*/
export class AutoscalingInstanceTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_autoscaling_instance_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a AutoscalingInstanceTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the AutoscalingInstanceTemplate to import
  * @param importFromId The id of the existing AutoscalingInstanceTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the AutoscalingInstanceTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_autoscaling_instance_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/resources/autoscaling_instance_template scaleway_autoscaling_instance_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options AutoscalingInstanceTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: AutoscalingInstanceTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_autoscaling_instance_template',
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
    this._cloudInit = config.cloudInit;
    this._commercialType = config.commercialType;
    this._id = config.id;
    this._imageId = config.imageId;
    this._name = config.name;
    this._placementGroupId = config.placementGroupId;
    this._privateNetworkIds = config.privateNetworkIds;
    this._projectId = config.projectId;
    this._publicIpsV4Count = config.publicIpsV4Count;
    this._publicIpsV6Count = config.publicIpsV6Count;
    this._securityGroupId = config.securityGroupId;
    this._tags = config.tags;
    this._zone = config.zone;
    this._volumes.internalValue = config.volumes;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cloud_init - computed: false, optional: true, required: false
  private _cloudInit?: string; 
  public get cloudInit() {
    return this.getStringAttribute('cloud_init');
  }
  public set cloudInit(value: string) {
    this._cloudInit = value;
  }
  public resetCloudInit() {
    this._cloudInit = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get cloudInitInput() {
    return this._cloudInit;
  }

  // commercial_type - computed: false, optional: false, required: true
  private _commercialType?: string; 
  public get commercialType() {
    return this.getStringAttribute('commercial_type');
  }
  public set commercialType(value: string) {
    this._commercialType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get commercialTypeInput() {
    return this._commercialType;
  }

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

  // image_id - computed: false, optional: true, required: false
  private _imageId?: string; 
  public get imageId() {
    return this.getStringAttribute('image_id');
  }
  public set imageId(value: string) {
    this._imageId = value;
  }
  public resetImageId() {
    this._imageId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageIdInput() {
    return this._imageId;
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

  // placement_group_id - computed: false, optional: true, required: false
  private _placementGroupId?: string; 
  public get placementGroupId() {
    return this.getStringAttribute('placement_group_id');
  }
  public set placementGroupId(value: string) {
    this._placementGroupId = value;
  }
  public resetPlacementGroupId() {
    this._placementGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get placementGroupIdInput() {
    return this._placementGroupId;
  }

  // private_network_ids - computed: false, optional: true, required: false
  private _privateNetworkIds?: string[]; 
  public get privateNetworkIds() {
    return this.getListAttribute('private_network_ids');
  }
  public set privateNetworkIds(value: string[]) {
    this._privateNetworkIds = value;
  }
  public resetPrivateNetworkIds() {
    this._privateNetworkIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdsInput() {
    return this._privateNetworkIds;
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

  // public_ips_v4_count - computed: false, optional: true, required: false
  private _publicIpsV4Count?: number; 
  public get publicIpsV4Count() {
    return this.getNumberAttribute('public_ips_v4_count');
  }
  public set publicIpsV4Count(value: number) {
    this._publicIpsV4Count = value;
  }
  public resetPublicIpsV4Count() {
    this._publicIpsV4Count = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpsV4CountInput() {
    return this._publicIpsV4Count;
  }

  // public_ips_v6_count - computed: false, optional: true, required: false
  private _publicIpsV6Count?: number; 
  public get publicIpsV6Count() {
    return this.getNumberAttribute('public_ips_v6_count');
  }
  public set publicIpsV6Count(value: number) {
    this._publicIpsV6Count = value;
  }
  public resetPublicIpsV6Count() {
    this._publicIpsV6Count = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpsV6CountInput() {
    return this._publicIpsV6Count;
  }

  // security_group_id - computed: false, optional: true, required: false
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  public resetSecurityGroupId() {
    this._securityGroupId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
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

  // volumes - computed: false, optional: true, required: false
  private _volumes = new AutoscalingInstanceTemplateVolumesList(this, "volumes", false);
  public get volumes() {
    return this._volumes;
  }
  public putVolumes(value: AutoscalingInstanceTemplateVolumes[] | cdktf.IResolvable) {
    this._volumes.internalValue = value;
  }
  public resetVolumes() {
    this._volumes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumesInput() {
    return this._volumes.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      cloud_init: cdktf.stringToTerraform(this._cloudInit),
      commercial_type: cdktf.stringToTerraform(this._commercialType),
      id: cdktf.stringToTerraform(this._id),
      image_id: cdktf.stringToTerraform(this._imageId),
      name: cdktf.stringToTerraform(this._name),
      placement_group_id: cdktf.stringToTerraform(this._placementGroupId),
      private_network_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._privateNetworkIds),
      project_id: cdktf.stringToTerraform(this._projectId),
      public_ips_v4_count: cdktf.numberToTerraform(this._publicIpsV4Count),
      public_ips_v6_count: cdktf.numberToTerraform(this._publicIpsV6Count),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
      volumes: cdktf.listMapper(autoscalingInstanceTemplateVolumesToTerraform, true)(this._volumes.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      cloud_init: {
        value: cdktf.stringToHclTerraform(this._cloudInit),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      commercial_type: {
        value: cdktf.stringToHclTerraform(this._commercialType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      image_id: {
        value: cdktf.stringToHclTerraform(this._imageId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      placement_group_id: {
        value: cdktf.stringToHclTerraform(this._placementGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_network_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._privateNetworkIds),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_ips_v4_count: {
        value: cdktf.numberToHclTerraform(this._publicIpsV4Count),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      public_ips_v6_count: {
        value: cdktf.numberToHclTerraform(this._publicIpsV6Count),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      security_group_id: {
        value: cdktf.stringToHclTerraform(this._securityGroupId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      volumes: {
        value: cdktf.listMapperHcl(autoscalingInstanceTemplateVolumesToHclTerraform, true)(this._volumes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "AutoscalingInstanceTemplateVolumesList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
