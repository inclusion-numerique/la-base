// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface BillingBudgetAlertNotificationConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the budget alert to create notification for.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification#budget_alert_id BillingBudgetAlertNotification#budget_alert_id}
  */
  readonly budgetAlertId: string;
  /**
  * List of email addresses to receive email notifications. Precisely one of sms_phone_numbers, email_addresses, or webhook_urls must be set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification#email_addresses BillingBudgetAlertNotification#email_addresses}
  */
  readonly emailAddresses?: string[];
  /**
  * List of phone numbers to receive SMS notifications. Precisely one of sms_phone_numbers, email_addresses, or webhook_urls must be set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification#sms_phone_numbers BillingBudgetAlertNotification#sms_phone_numbers}
  */
  readonly smsPhoneNumbers?: string[];
  /**
  * List of webhook URLs to receive webhook notifications. Precisely one of sms_phone_numbers, email_addresses, or webhook_urls must be set.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification#webhook_urls BillingBudgetAlertNotification#webhook_urls}
  */
  readonly webhookUrls?: string[];
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification scaleway_billing_budget_alert_notification}
*/
export class BillingBudgetAlertNotification extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_billing_budget_alert_notification";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a BillingBudgetAlertNotification resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the BillingBudgetAlertNotification to import
  * @param importFromId The id of the existing BillingBudgetAlertNotification that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the BillingBudgetAlertNotification to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_billing_budget_alert_notification", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/billing_budget_alert_notification scaleway_billing_budget_alert_notification} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options BillingBudgetAlertNotificationConfig
  */
  public constructor(scope: Construct, id: string, config: BillingBudgetAlertNotificationConfig) {
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
    this._emailAddresses = config.emailAddresses;
    this._smsPhoneNumbers = config.smsPhoneNumbers;
    this._webhookUrls = config.webhookUrls;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // budget_alert_id - computed: false, optional: false, required: true
  private _budgetAlertId?: string; 
  public get budgetAlertId() {
    return this.getStringAttribute('budget_alert_id');
  }
  public set budgetAlertId(value: string) {
    this._budgetAlertId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get budgetAlertIdInput() {
    return this._budgetAlertId;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // email_addresses - computed: false, optional: true, required: false
  private _emailAddresses?: string[]; 
  public get emailAddresses() {
    return cdktf.Fn.tolist(this.getListAttribute('email_addresses'));
  }
  public set emailAddresses(value: string[]) {
    this._emailAddresses = value;
  }
  public resetEmailAddresses() {
    this._emailAddresses = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get emailAddressesInput() {
    return this._emailAddresses;
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // sms_phone_numbers - computed: false, optional: true, required: false
  private _smsPhoneNumbers?: string[]; 
  public get smsPhoneNumbers() {
    return cdktf.Fn.tolist(this.getListAttribute('sms_phone_numbers'));
  }
  public set smsPhoneNumbers(value: string[]) {
    this._smsPhoneNumbers = value;
  }
  public resetSmsPhoneNumbers() {
    this._smsPhoneNumbers = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get smsPhoneNumbersInput() {
    return this._smsPhoneNumbers;
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // webhook_urls - computed: false, optional: true, required: false
  private _webhookUrls?: string[]; 
  public get webhookUrls() {
    return cdktf.Fn.tolist(this.getListAttribute('webhook_urls'));
  }
  public set webhookUrls(value: string[]) {
    this._webhookUrls = value;
  }
  public resetWebhookUrls() {
    this._webhookUrls = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get webhookUrlsInput() {
    return this._webhookUrls;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      budget_alert_id: cdktf.stringToTerraform(this._budgetAlertId),
      email_addresses: cdktf.listMapper(cdktf.stringToTerraform, false)(this._emailAddresses),
      sms_phone_numbers: cdktf.listMapper(cdktf.stringToTerraform, false)(this._smsPhoneNumbers),
      webhook_urls: cdktf.listMapper(cdktf.stringToTerraform, false)(this._webhookUrls),
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
      email_addresses: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._emailAddresses),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      sms_phone_numbers: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._smsPhoneNumbers),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
      webhook_urls: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._webhookUrls),
        isBlock: false,
        type: "set",
        storageClassType: "stringList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
