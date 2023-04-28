// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayTemDomainConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the tem domain
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain#domain_id DataScalewayTemDomain#domain_id}
  */
  readonly domainId?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain#id DataScalewayTemDomain#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The domain name used when sending emails
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain#name DataScalewayTemDomain#name}
  */
  readonly name?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain#region DataScalewayTemDomain#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain scaleway_tem_domain}
*/
export class DataScalewayTemDomain extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_tem_domain";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/tem_domain scaleway_tem_domain} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayTemDomainConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayTemDomainConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_tem_domain',
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
    this._domainId = config.domainId;
    this._id = config.id;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // accept_tos - computed: true, optional: false, required: false
  public get acceptTos() {
    return this.getBooleanAttribute('accept_tos');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // dkim_config - computed: true, optional: false, required: false
  public get dkimConfig() {
    return this.getStringAttribute('dkim_config');
  }

  // domain_id - computed: false, optional: true, required: false
  private _domainId?: string; 
  public get domainId() {
    return this.getStringAttribute('domain_id');
  }
  public set domainId(value: string) {
    this._domainId = value;
  }
  public resetDomainId() {
    this._domainId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get domainIdInput() {
    return this._domainId;
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

  // last_error - computed: true, optional: false, required: false
  public get lastError() {
    return this.getStringAttribute('last_error');
  }

  // last_valid_at - computed: true, optional: false, required: false
  public get lastValidAt() {
    return this.getStringAttribute('last_valid_at');
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

  // next_check_at - computed: true, optional: false, required: false
  public get nextCheckAt() {
    return this.getStringAttribute('next_check_at');
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

  // revoked_at - computed: true, optional: false, required: false
  public get revokedAt() {
    return this.getStringAttribute('revoked_at');
  }

  // smtp_host - computed: true, optional: false, required: false
  public get smtpHost() {
    return this.getStringAttribute('smtp_host');
  }

  // smtp_port - computed: true, optional: false, required: false
  public get smtpPort() {
    return this.getNumberAttribute('smtp_port');
  }

  // smtp_port_alternative - computed: true, optional: false, required: false
  public get smtpPortAlternative() {
    return this.getNumberAttribute('smtp_port_alternative');
  }

  // smtp_port_unsecure - computed: true, optional: false, required: false
  public get smtpPortUnsecure() {
    return this.getNumberAttribute('smtp_port_unsecure');
  }

  // smtps_port - computed: true, optional: false, required: false
  public get smtpsPort() {
    return this.getNumberAttribute('smtps_port');
  }

  // smtps_port_alternative - computed: true, optional: false, required: false
  public get smtpsPortAlternative() {
    return this.getNumberAttribute('smtps_port_alternative');
  }

  // spf_config - computed: true, optional: false, required: false
  public get spfConfig() {
    return this.getStringAttribute('spf_config');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      domain_id: cdktf.stringToTerraform(this._domainId),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
