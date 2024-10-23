// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayBillingInvoicesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices#id DataScalewayBillingInvoices#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The invoice type. It can either be `periodic` or `purchase`
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices#invoice_type DataScalewayBillingInvoices#invoice_type}
  */
  readonly invoiceType?: string;
  /**
  * Invoice's start date is greater or equal to `started_after`
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices#started_after DataScalewayBillingInvoices#started_after}
  */
  readonly startedAfter?: string;
  /**
  * Invoice's start date precedes `started_before`
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices#started_before DataScalewayBillingInvoices#started_before}
  */
  readonly startedBefore?: string;
}
export interface DataScalewayBillingInvoicesInvoices {
}

export function dataScalewayBillingInvoicesInvoicesToTerraform(struct?: DataScalewayBillingInvoicesInvoices): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayBillingInvoicesInvoicesToHclTerraform(struct?: DataScalewayBillingInvoicesInvoices): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayBillingInvoicesInvoicesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayBillingInvoicesInvoices | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayBillingInvoicesInvoices | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // billing_period - computed: true, optional: false, required: false
  public get billingPeriod() {
    return this.getStringAttribute('billing_period');
  }

  // due_date - computed: true, optional: false, required: false
  public get dueDate() {
    return this.getStringAttribute('due_date');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // invoice_type - computed: true, optional: false, required: false
  public get invoiceType() {
    return this.getStringAttribute('invoice_type');
  }

  // issued_date - computed: true, optional: false, required: false
  public get issuedDate() {
    return this.getStringAttribute('issued_date');
  }

  // number - computed: true, optional: false, required: false
  public get number() {
    return this.getNumberAttribute('number');
  }

  // organization_name - computed: true, optional: false, required: false
  public get organizationName() {
    return this.getStringAttribute('organization_name');
  }

  // seller_name - computed: true, optional: false, required: false
  public get sellerName() {
    return this.getStringAttribute('seller_name');
  }

  // start_date - computed: true, optional: false, required: false
  public get startDate() {
    return this.getStringAttribute('start_date');
  }

  // state - computed: true, optional: false, required: false
  public get state() {
    return this.getStringAttribute('state');
  }

  // stop_date - computed: true, optional: false, required: false
  public get stopDate() {
    return this.getStringAttribute('stop_date');
  }

  // total_discount - computed: true, optional: false, required: false
  public get totalDiscount() {
    return this.getStringAttribute('total_discount');
  }

  // total_tax - computed: true, optional: false, required: false
  public get totalTax() {
    return this.getStringAttribute('total_tax');
  }

  // total_taxed - computed: true, optional: false, required: false
  public get totalTaxed() {
    return this.getStringAttribute('total_taxed');
  }

  // total_undiscount - computed: true, optional: false, required: false
  public get totalUndiscount() {
    return this.getStringAttribute('total_undiscount');
  }

  // total_untaxed - computed: true, optional: false, required: false
  public get totalUntaxed() {
    return this.getStringAttribute('total_untaxed');
  }
}

export class DataScalewayBillingInvoicesInvoicesList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayBillingInvoicesInvoicesOutputReference {
    return new DataScalewayBillingInvoicesInvoicesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices scaleway_billing_invoices}
*/
export class DataScalewayBillingInvoices extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_billing_invoices";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayBillingInvoices resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayBillingInvoices to import
  * @param importFromId The id of the existing DataScalewayBillingInvoices that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayBillingInvoices to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_billing_invoices", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/billing_invoices scaleway_billing_invoices} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayBillingInvoicesConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayBillingInvoicesConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_billing_invoices',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.42.1',
        providerVersionConstraint: '>= 2.42.1'
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
    this._invoiceType = config.invoiceType;
    this._startedAfter = config.startedAfter;
    this._startedBefore = config.startedBefore;
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

  // invoice_type - computed: false, optional: true, required: false
  private _invoiceType?: string; 
  public get invoiceType() {
    return this.getStringAttribute('invoice_type');
  }
  public set invoiceType(value: string) {
    this._invoiceType = value;
  }
  public resetInvoiceType() {
    this._invoiceType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get invoiceTypeInput() {
    return this._invoiceType;
  }

  // invoices - computed: true, optional: false, required: false
  private _invoices = new DataScalewayBillingInvoicesInvoicesList(this, "invoices", false);
  public get invoices() {
    return this._invoices;
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // started_after - computed: false, optional: true, required: false
  private _startedAfter?: string; 
  public get startedAfter() {
    return this.getStringAttribute('started_after');
  }
  public set startedAfter(value: string) {
    this._startedAfter = value;
  }
  public resetStartedAfter() {
    this._startedAfter = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startedAfterInput() {
    return this._startedAfter;
  }

  // started_before - computed: false, optional: true, required: false
  private _startedBefore?: string; 
  public get startedBefore() {
    return this.getStringAttribute('started_before');
  }
  public set startedBefore(value: string) {
    this._startedBefore = value;
  }
  public resetStartedBefore() {
    this._startedBefore = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get startedBeforeInput() {
    return this._startedBefore;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      invoice_type: cdktf.stringToTerraform(this._invoiceType),
      started_after: cdktf.stringToTerraform(this._startedAfter),
      started_before: cdktf.stringToTerraform(this._startedBefore),
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
      invoice_type: {
        value: cdktf.stringToHclTerraform(this._invoiceType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      started_after: {
        value: cdktf.stringToHclTerraform(this._startedAfter),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      started_before: {
        value: cdktf.stringToHclTerraform(this._startedBefore),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
