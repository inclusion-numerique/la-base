// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayInstanceImageConfig extends cdktf.TerraformMetaArguments {
  /**
  * Architecture of the desired image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#architecture DataScalewayInstanceImage#architecture}
  */
  readonly architecture?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#id DataScalewayInstanceImage#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * ID of the desired image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#image_id DataScalewayInstanceImage#image_id}
  */
  readonly imageId?: string;
  /**
  * Select most recent image if multiple match
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#latest DataScalewayInstanceImage#latest}
  */
  readonly latest?: boolean | cdktf.IResolvable;
  /**
  * Exact name of the desired image
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#name DataScalewayInstanceImage#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#project_id DataScalewayInstanceImage#project_id}
  */
  readonly projectId?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image#zone DataScalewayInstanceImage#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image scaleway_instance_image}
*/
export class DataScalewayInstanceImage extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_image";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/instance_image scaleway_instance_image} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayInstanceImageConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayInstanceImageConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_image',
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
    this._architecture = config.architecture;
    this._id = config.id;
    this._imageId = config.imageId;
    this._latest = config.latest;
    this._name = config.name;
    this._projectId = config.projectId;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // additional_volume_ids - computed: true, optional: false, required: false
  public get additionalVolumeIds() {
    return this.getListAttribute('additional_volume_ids');
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

  // default_bootscript_id - computed: true, optional: false, required: false
  public get defaultBootscriptId() {
    return this.getStringAttribute('default_bootscript_id');
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

  // latest - computed: false, optional: true, required: false
  private _latest?: boolean | cdktf.IResolvable; 
  public get latest() {
    return this.getBooleanAttribute('latest');
  }
  public set latest(value: boolean | cdktf.IResolvable) {
    this._latest = value;
  }
  public resetLatest() {
    this._latest = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get latestInput() {
    return this._latest;
  }

  // modification_date - computed: true, optional: false, required: false
  public get modificationDate() {
    return this.getStringAttribute('modification_date');
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

  // public - computed: true, optional: false, required: false
  public get public() {
    return this.getBooleanAttribute('public');
  }

  // root_volume_id - computed: true, optional: false, required: false
  public get rootVolumeId() {
    return this.getStringAttribute('root_volume_id');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
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
      architecture: cdktf.stringToTerraform(this._architecture),
      id: cdktf.stringToTerraform(this._id),
      image_id: cdktf.stringToTerraform(this._imageId),
      latest: cdktf.booleanToTerraform(this._latest),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
