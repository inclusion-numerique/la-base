// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayLbIpConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip#id DataScalewayLbIp#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The IP address
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip#ip_address DataScalewayLbIp#ip_address}
  */
  readonly ipAddress?: string;
  /**
  * The ID of the IP address
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip#ip_id DataScalewayLbIp#ip_id}
  */
  readonly ipId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip scaleway_lb_ip}
*/
export class DataScalewayLbIp extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_lb_ip";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/lb_ip scaleway_lb_ip} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayLbIpConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayLbIpConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_lb_ip',
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
    this._id = config.id;
    this._ipAddress = config.ipAddress;
    this._ipId = config.ipId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

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

  // ip_address - computed: false, optional: true, required: false
  private _ipAddress?: string; 
  public get ipAddress() {
    return this.getStringAttribute('ip_address');
  }
  public set ipAddress(value: string) {
    this._ipAddress = value;
  }
  public resetIpAddress() {
    this._ipAddress = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipAddressInput() {
    return this._ipAddress;
  }

  // ip_id - computed: false, optional: true, required: false
  private _ipId?: string; 
  public get ipId() {
    return this.getStringAttribute('ip_id');
  }
  public set ipId(value: string) {
    this._ipId = value;
  }
  public resetIpId() {
    this._ipId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipIdInput() {
    return this._ipId;
  }

  // lb_id - computed: true, optional: false, required: false
  public get lbId() {
    return this.getStringAttribute('lb_id');
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // region - computed: true, optional: false, required: false
  public get region() {
    return this.getStringAttribute('region');
  }

  // reverse - computed: true, optional: false, required: false
  public get reverse() {
    return this.getStringAttribute('reverse');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      ip_address: cdktf.stringToTerraform(this._ipAddress),
      ip_id: cdktf.stringToTerraform(this._ipId),
    };
  }
}
