// https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayTemOfferSubscriptionConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription#id DataScalewayTemOfferSubscription#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription#project_id DataScalewayTemOfferSubscription#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription#region DataScalewayTemOfferSubscription#region}
  */
  readonly region?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription scaleway_tem_offer_subscription}
*/
export class DataScalewayTemOfferSubscription extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_tem_offer_subscription";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayTemOfferSubscription resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayTemOfferSubscription to import
  * @param importFromId The id of the existing DataScalewayTemOfferSubscription that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayTemOfferSubscription to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_tem_offer_subscription", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.57.0/docs/data-sources/tem_offer_subscription scaleway_tem_offer_subscription} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayTemOfferSubscriptionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayTemOfferSubscriptionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_tem_offer_subscription',
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
    this._id = config.id;
    this._projectId = config.projectId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // cancellation_available_at - computed: true, optional: false, required: false
  public get cancellationAvailableAt() {
    return this.getStringAttribute('cancellation_available_at');
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

  // included_monthly_emails - computed: true, optional: false, required: false
  public get includedMonthlyEmails() {
    return this.getNumberAttribute('included_monthly_emails');
  }

  // max_custom_blocklists_per_domain - computed: true, optional: false, required: false
  public get maxCustomBlocklistsPerDomain() {
    return this.getNumberAttribute('max_custom_blocklists_per_domain');
  }

  // max_dedicated_ips - computed: true, optional: false, required: false
  public get maxDedicatedIps() {
    return this.getNumberAttribute('max_dedicated_ips');
  }

  // max_domains - computed: true, optional: false, required: false
  public get maxDomains() {
    return this.getNumberAttribute('max_domains');
  }

  // max_webhooks_per_domain - computed: true, optional: false, required: false
  public get maxWebhooksPerDomain() {
    return this.getNumberAttribute('max_webhooks_per_domain');
  }

  // offer_name - computed: true, optional: false, required: false
  public get offerName() {
    return this.getStringAttribute('offer_name');
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

  // region - computed: true, optional: true, required: false
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

  // sla - computed: true, optional: false, required: false
  public get sla() {
    return this.getNumberAttribute('sla');
  }

  // subscribed_at - computed: true, optional: false, required: false
  public get subscribedAt() {
    return this.getStringAttribute('subscribed_at');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      region: {
        value: cdktf.stringToHclTerraform(this._region),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
