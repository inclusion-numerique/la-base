// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayIotHubConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the IOT Hub
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub#hub_id DataScalewayIotHub#hub_id}
  */
  readonly hubId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub#id DataScalewayIotHub#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the hub
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub#name DataScalewayIotHub#name}
  */
  readonly name?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub#region DataScalewayIotHub#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub scaleway_iot_hub}
*/
export class DataScalewayIotHub extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_iot_hub";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/iot_hub scaleway_iot_hub} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayIotHubConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayIotHubConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_iot_hub',
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
    this._hubId = config.hubId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // connected_device_count - computed: true, optional: false, required: false
  public get connectedDeviceCount() {
    return this.getNumberAttribute('connected_device_count');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // device_auto_provisioning - computed: true, optional: false, required: false
  public get deviceAutoProvisioning() {
    return this.getBooleanAttribute('device_auto_provisioning');
  }

  // device_count - computed: true, optional: false, required: false
  public get deviceCount() {
    return this.getNumberAttribute('device_count');
  }

  // disable_events - computed: true, optional: false, required: false
  public get disableEvents() {
    return this.getBooleanAttribute('disable_events');
  }

  // enabled - computed: true, optional: false, required: false
  public get enabled() {
    return this.getBooleanAttribute('enabled');
  }

  // endpoint - computed: true, optional: false, required: false
  public get endpoint() {
    return this.getStringAttribute('endpoint');
  }

  // events_topic_prefix - computed: true, optional: false, required: false
  public get eventsTopicPrefix() {
    return this.getStringAttribute('events_topic_prefix');
  }

  // hub_ca - computed: true, optional: false, required: false
  public get hubCa() {
    return this.getStringAttribute('hub_ca');
  }

  // hub_ca_challenge - computed: true, optional: false, required: false
  public get hubCaChallenge() {
    return this.getStringAttribute('hub_ca_challenge');
  }

  // hub_id - computed: false, optional: true, required: false
  private _hubId?: string; 
  public get hubId() {
    return this.getStringAttribute('hub_id');
  }
  public set hubId(value: string) {
    this._hubId = value;
  }
  public resetHubId() {
    this._hubId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hubIdInput() {
    return this._hubId;
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

  // product_plan - computed: true, optional: false, required: false
  public get productPlan() {
    return this.getStringAttribute('product_plan');
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

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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
      hub_id: cdktf.stringToTerraform(this._hubId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
