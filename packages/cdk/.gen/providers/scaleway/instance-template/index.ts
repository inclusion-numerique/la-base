// https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface InstanceTemplateConfig extends cdktf.TerraformMetaArguments {
  /**
  * The IDs of the filesystems to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#filesystem_ids InstanceTemplate#filesystem_ids}
  */
  readonly filesystemIds?: string[];
  /**
  * The name of the Instance Template. If not provided, a random name will be generated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#name InstanceTemplate#name}
  */
  readonly name?: string;
  /**
  * The ID of the placement group to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#placement_group_id InstanceTemplate#placement_group_id}
  */
  readonly placementGroupId?: string;
  /**
  * The IDs of the private networks to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#private_networks InstanceTemplate#private_networks}
  */
  readonly privateNetworks?: string[];
  /**
  * The project ID the Instance Template belongs to. Defaults to the provider's project ID.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#project_id InstanceTemplate#project_id}
  */
  readonly projectId?: string;
  /**
  * The number of public IPv4 to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#public_ipv4_count InstanceTemplate#public_ipv4_count}
  */
  readonly publicIpv4Count?: number;
  /**
  * The number of public IPv6 to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#public_ipv6_count InstanceTemplate#public_ipv6_count}
  */
  readonly publicIpv6Count?: number;
  /**
  * The ID of the security group to attach to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#security_group_id InstanceTemplate#security_group_id}
  */
  readonly securityGroupId?: string;
  /**
  * The tags that will be assigned to the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#server_tags InstanceTemplate#server_tags}
  */
  readonly serverTags?: string[];
  /**
  * The commercial type of the server defined by the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#server_type InstanceTemplate#server_type}
  */
  readonly serverType: string;
  /**
  * The tags associated with the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#tags InstanceTemplate#tags}
  */
  readonly tags?: string[];
  /**
  * The specs of the volumes of the servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#volumes InstanceTemplate#volumes}
  */
  readonly volumes?: InstanceTemplateVolumes[] | cdktf.IResolvable;
  /**
  * The ID of the IAM SSH key used to encrypt the initial admin password on a Windows server. This will be repeated on all servers created using the Instance Template.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#windows_rdp_ssh_key_id InstanceTemplate#windows_rdp_ssh_key_id}
  */
  readonly windowsRdpSshKeyId?: string;
  /**
  * The zone the Instance Template is in.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#zone InstanceTemplate#zone}
  */
  readonly zone?: string;
}
export interface InstanceTemplateVolumes {
  /**
  * The ID of the base snapshot for the volume.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#base_snapshot_id InstanceTemplate#base_snapshot_id}
  */
  readonly baseSnapshotId?: string;
  /**
  * The label of the image used as base for the volume.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#image_label InstanceTemplate#image_label}
  */
  readonly imageLabel?: string;
  /**
  * The name of volume. If not provided, a random name will be generated.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#name InstanceTemplate#name}
  */
  readonly name?: string;
  /**
  * The performance IOPS of the volume.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#perf_iops InstanceTemplate#perf_iops}
  */
  readonly perfIops?: number;
  /**
  * The size of the volume in gigabytes.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#size_in_gb InstanceTemplate#size_in_gb}
  */
  readonly sizeInGb: number;
  /**
  * The tags associated with the volume.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#tags InstanceTemplate#tags}
  */
  readonly tags?: string[];
  /**
  * The type of volume.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#volume_type InstanceTemplate#volume_type}
  */
  readonly volumeType: string;
}

export function instanceTemplateVolumesToTerraform(struct?: InstanceTemplateVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    base_snapshot_id: cdktf.stringToTerraform(struct!.baseSnapshotId),
    image_label: cdktf.stringToTerraform(struct!.imageLabel),
    name: cdktf.stringToTerraform(struct!.name),
    perf_iops: cdktf.numberToTerraform(struct!.perfIops),
    size_in_gb: cdktf.numberToTerraform(struct!.sizeInGb),
    tags: cdktf.listMapper(cdktf.stringToTerraform, false)(struct!.tags),
    volume_type: cdktf.stringToTerraform(struct!.volumeType),
  }
}


export function instanceTemplateVolumesToHclTerraform(struct?: InstanceTemplateVolumes | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    base_snapshot_id: {
      value: cdktf.stringToHclTerraform(struct!.baseSnapshotId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    image_label: {
      value: cdktf.stringToHclTerraform(struct!.imageLabel),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
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
    size_in_gb: {
      value: cdktf.numberToHclTerraform(struct!.sizeInGb),
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
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class InstanceTemplateVolumesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceTemplateVolumes | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._baseSnapshotId !== undefined) {
      hasAnyValues = true;
      internalValueResult.baseSnapshotId = this._baseSnapshotId;
    }
    if (this._imageLabel !== undefined) {
      hasAnyValues = true;
      internalValueResult.imageLabel = this._imageLabel;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._perfIops !== undefined) {
      hasAnyValues = true;
      internalValueResult.perfIops = this._perfIops;
    }
    if (this._sizeInGb !== undefined) {
      hasAnyValues = true;
      internalValueResult.sizeInGb = this._sizeInGb;
    }
    if (this._tags !== undefined) {
      hasAnyValues = true;
      internalValueResult.tags = this._tags;
    }
    if (this._volumeType !== undefined) {
      hasAnyValues = true;
      internalValueResult.volumeType = this._volumeType;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceTemplateVolumes | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._baseSnapshotId = undefined;
      this._imageLabel = undefined;
      this._name = undefined;
      this._perfIops = undefined;
      this._sizeInGb = undefined;
      this._tags = undefined;
      this._volumeType = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._baseSnapshotId = value.baseSnapshotId;
      this._imageLabel = value.imageLabel;
      this._name = value.name;
      this._perfIops = value.perfIops;
      this._sizeInGb = value.sizeInGb;
      this._tags = value.tags;
      this._volumeType = value.volumeType;
    }
  }

  // base_snapshot_id - computed: false, optional: true, required: false
  private _baseSnapshotId?: string; 
  public get baseSnapshotId() {
    return this.getStringAttribute('base_snapshot_id');
  }
  public set baseSnapshotId(value: string) {
    this._baseSnapshotId = value;
  }
  public resetBaseSnapshotId() {
    this._baseSnapshotId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get baseSnapshotIdInput() {
    return this._baseSnapshotId;
  }

  // image_label - computed: false, optional: true, required: false
  private _imageLabel?: string; 
  public get imageLabel() {
    return this.getStringAttribute('image_label');
  }
  public set imageLabel(value: string) {
    this._imageLabel = value;
  }
  public resetImageLabel() {
    this._imageLabel = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get imageLabelInput() {
    return this._imageLabel;
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

  // size_in_gb - computed: false, optional: false, required: true
  private _sizeInGb?: number; 
  public get sizeInGb() {
    return this.getNumberAttribute('size_in_gb');
  }
  public set sizeInGb(value: number) {
    this._sizeInGb = value;
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
}

export class InstanceTemplateVolumesList extends cdktf.ComplexList {
  public internalValue? : InstanceTemplateVolumes[] | cdktf.IResolvable

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
  public get(index: number): InstanceTemplateVolumesOutputReference {
    return new InstanceTemplateVolumesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template scaleway_instance_template}
*/
export class InstanceTemplate extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_template";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a InstanceTemplate resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the InstanceTemplate to import
  * @param importFromId The id of the existing InstanceTemplate that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the InstanceTemplate to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_instance_template", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.83.1/docs/resources/instance_template scaleway_instance_template} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options InstanceTemplateConfig
  */
  public constructor(scope: Construct, id: string, config: InstanceTemplateConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_template',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.83.1',
        providerVersionConstraint: '~> 2.83.1'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._filesystemIds = config.filesystemIds;
    this._name = config.name;
    this._placementGroupId = config.placementGroupId;
    this._privateNetworks = config.privateNetworks;
    this._projectId = config.projectId;
    this._publicIpv4Count = config.publicIpv4Count;
    this._publicIpv6Count = config.publicIpv6Count;
    this._securityGroupId = config.securityGroupId;
    this._serverTags = config.serverTags;
    this._serverType = config.serverType;
    this._tags = config.tags;
    this._volumes.internalValue = config.volumes;
    this._windowsRdpSshKeyId = config.windowsRdpSshKeyId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // filesystem_ids - computed: false, optional: true, required: false
  private _filesystemIds?: string[]; 
  public get filesystemIds() {
    return cdktf.Fn.tolist(this.getListAttribute('filesystem_ids'));
  }
  public set filesystemIds(value: string[]) {
    this._filesystemIds = value;
  }
  public resetFilesystemIds() {
    this._filesystemIds = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get filesystemIdsInput() {
    return this._filesystemIds;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
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

  // private_networks - computed: false, optional: true, required: false
  private _privateNetworks?: string[]; 
  public get privateNetworks() {
    return cdktf.Fn.tolist(this.getListAttribute('private_networks'));
  }
  public set privateNetworks(value: string[]) {
    this._privateNetworks = value;
  }
  public resetPrivateNetworks() {
    this._privateNetworks = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworksInput() {
    return this._privateNetworks;
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

  // public_ipv4_count - computed: true, optional: true, required: false
  private _publicIpv4Count?: number; 
  public get publicIpv4Count() {
    return this.getNumberAttribute('public_ipv4_count');
  }
  public set publicIpv4Count(value: number) {
    this._publicIpv4Count = value;
  }
  public resetPublicIpv4Count() {
    this._publicIpv4Count = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpv4CountInput() {
    return this._publicIpv4Count;
  }

  // public_ipv6_count - computed: true, optional: true, required: false
  private _publicIpv6Count?: number; 
  public get publicIpv6Count() {
    return this.getNumberAttribute('public_ipv6_count');
  }
  public set publicIpv6Count(value: number) {
    this._publicIpv6Count = value;
  }
  public resetPublicIpv6Count() {
    this._publicIpv6Count = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicIpv6CountInput() {
    return this._publicIpv6Count;
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

  // server_tags - computed: false, optional: true, required: false
  private _serverTags?: string[]; 
  public get serverTags() {
    return this.getListAttribute('server_tags');
  }
  public set serverTags(value: string[]) {
    this._serverTags = value;
  }
  public resetServerTags() {
    this._serverTags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serverTagsInput() {
    return this._serverTags;
  }

  // server_type - computed: false, optional: false, required: true
  private _serverType?: string; 
  public get serverType() {
    return this.getStringAttribute('server_type');
  }
  public set serverType(value: string) {
    this._serverType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get serverTypeInput() {
    return this._serverType;
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

  // volumes - computed: false, optional: true, required: false
  private _volumes = new InstanceTemplateVolumesList(this, "volumes", false);
  public get volumes() {
    return this._volumes;
  }
  public putVolumes(value: InstanceTemplateVolumes[] | cdktf.IResolvable) {
    this._volumes.internalValue = value;
  }
  public resetVolumes() {
    this._volumes.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumesInput() {
    return this._volumes.internalValue;
  }

  // windows_rdp_ssh_key_id - computed: false, optional: true, required: false
  private _windowsRdpSshKeyId?: string; 
  public get windowsRdpSshKeyId() {
    return this.getStringAttribute('windows_rdp_ssh_key_id');
  }
  public set windowsRdpSshKeyId(value: string) {
    this._windowsRdpSshKeyId = value;
  }
  public resetWindowsRdpSshKeyId() {
    this._windowsRdpSshKeyId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get windowsRdpSshKeyIdInput() {
    return this._windowsRdpSshKeyId;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      filesystem_ids: cdktf.listMapper(cdktf.stringToTerraform, false)(this._filesystemIds),
      name: cdktf.stringToTerraform(this._name),
      placement_group_id: cdktf.stringToTerraform(this._placementGroupId),
      private_networks: cdktf.listMapper(cdktf.stringToTerraform, false)(this._privateNetworks),
      project_id: cdktf.stringToTerraform(this._projectId),
      public_ipv4_count: cdktf.numberToTerraform(this._publicIpv4Count),
      public_ipv6_count: cdktf.numberToTerraform(this._publicIpv6Count),
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      server_tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._serverTags),
      server_type: cdktf.stringToTerraform(this._serverType),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      volumes: cdktf.listMapper(instanceTemplateVolumesToTerraform, false)(this._volumes.internalValue),
      windows_rdp_ssh_key_id: cdktf.stringToTerraform(this._windowsRdpSshKeyId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      filesystem_ids: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._filesystemIds),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
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
      private_networks: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._privateNetworks),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      public_ipv4_count: {
        value: cdktf.numberToHclTerraform(this._publicIpv4Count),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      public_ipv6_count: {
        value: cdktf.numberToHclTerraform(this._publicIpv6Count),
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
      server_tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._serverTags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      server_type: {
        value: cdktf.stringToHclTerraform(this._serverType),
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
      volumes: {
        value: cdktf.listMapperHcl(instanceTemplateVolumesToHclTerraform, false)(this._volumes.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "InstanceTemplateVolumesList",
      },
      windows_rdp_ssh_key_id: {
        value: cdktf.stringToHclTerraform(this._windowsRdpSshKeyId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
