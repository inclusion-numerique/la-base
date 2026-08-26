// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayBillingBudgetAlertNotificationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the budget alert. If not provided, it will be retrieved from the notification.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification#budget_alert_id DataScalewayBillingBudgetAlertNotification#budget_alert_id}
  */
  readonly budgetAlertId?: string;
  /**
  * The ID of the budget alert notification to retrieve.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification#notification_id DataScalewayBillingBudgetAlertNotification#notification_id}
  */
  readonly notificationId: string;
  /**
  * The organization ID. If not provided, the default organization configured in the provider is used.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification#organization_id DataScalewayBillingBudgetAlertNotification#organization_id}
  */
  readonly organizationId?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification scaleway_billing_budget_alert_notification}
*/
export class DataScalewayBillingBudgetAlertNotification extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_billing_budget_alert_notification";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayBillingBudgetAlertNotification resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayBillingBudgetAlertNotification to import
  * @param importFromId The id of the existing DataScalewayBillingBudgetAlertNotification that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayBillingBudgetAlertNotification to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_billing_budget_alert_notification", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/data-sources/billing_budget_alert_notification scaleway_billing_budget_alert_notification} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayBillingBudgetAlertNotificationConfig
  */
  public constructor(scope: Construct, id: string, config: DataScalewayBillingBudgetAlertNotificationConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_billing_budget_alert_notification',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.81.0',
        providerVersionConstraint: '>= 2.81.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._budgetAlertId = config.budgetAlertId;
    this._notificationId = config.notificationId;
    this._organizationId = config.organizationId;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // budget_alert_id - computed: true, optional: true, required: false
  private _budgetAlertId?: string; 
  public get budgetAlertId() {
    return this.getStringAttribute('budget_alert_id');
  }
  public set budgetAlertId(value: string) {
    this._budgetAlertId = value;
  }
  public resetBudgetAlertId() {
    this._budgetAlertId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get budgetAlertIdInput() {
    return this._budgetAlertId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // notification_id - computed: false, optional: false, required: true
  private _notificationId?: string; 
  public get notificationId() {
    return this.getStringAttribute('notification_id');
  }
  public set notificationId(value: string) {
    this._notificationId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get notificationIdInput() {
    return this._notificationId;
  }

  // organization_id - computed: true, optional: true, required: false
  private _organizationId?: string; 
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }
  public set organizationId(value: string) {
    this._organizationId = value;
  }
  public resetOrganizationId() {
    this._organizationId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get organizationIdInput() {
    return this._organizationId;
  }

  // recipients - computed: true, optional: false, required: false
  public get recipients() {
    return cdktf.Fn.tolist(this.getListAttribute('recipients'));
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
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
      budget_alert_id: cdktf.stringToTerraform(this._budgetAlertId),
      notification_id: cdktf.stringToTerraform(this._notificationId),
      organization_id: cdktf.stringToTerraform(this._organizationId),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      budget_alert_id: {
        value: cdktf.stringToHclTerraform(this._budgetAlertId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      notification_id: {
        value: cdktf.stringToHclTerraform(this._notificationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      organization_id: {
        value: cdktf.stringToHclTerraform(this._organizationId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
