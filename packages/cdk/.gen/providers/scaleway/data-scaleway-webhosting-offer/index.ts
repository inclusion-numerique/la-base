// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayWebhostingOfferConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer#id DataScalewayWebhostingOffer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Exact name of the desired offer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer#name DataScalewayWebhostingOffer#name}
  */
  readonly name?: string;
  /**
  * ID of the desired offer
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer#offer_id DataScalewayWebhostingOffer#offer_id}
  */
  readonly offerId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer#region DataScalewayWebhostingOffer#region}
  */
  readonly region?: string;
}
export interface DataScalewayWebhostingOfferProduct {
}

export function dataScalewayWebhostingOfferProductToTerraform(struct?: DataScalewayWebhostingOfferProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function dataScalewayWebhostingOfferProductToHclTerraform(struct?: DataScalewayWebhostingOfferProduct): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class DataScalewayWebhostingOfferProductOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayWebhostingOfferProduct | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayWebhostingOfferProduct | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // databases_quota - computed: true, optional: false, required: false
  public get databasesQuota() {
    return this.getNumberAttribute('databases_quota');
  }

  // email_accounts_quota - computed: true, optional: false, required: false
  public get emailAccountsQuota() {
    return this.getNumberAttribute('email_accounts_quota');
  }

  // email_storage_quota - computed: true, optional: false, required: false
  public get emailStorageQuota() {
    return this.getNumberAttribute('email_storage_quota');
  }

  // hosting_storage_quota - computed: true, optional: false, required: false
  public get hostingStorageQuota() {
    return this.getNumberAttribute('hosting_storage_quota');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // option - computed: true, optional: false, required: false
  public get option() {
    return this.getBooleanAttribute('option');
  }

  // ram - computed: true, optional: false, required: false
  public get ram() {
    return this.getNumberAttribute('ram');
  }

  // support_included - computed: true, optional: false, required: false
  public get supportIncluded() {
    return this.getBooleanAttribute('support_included');
  }

  // v_cpu - computed: true, optional: false, required: false
  public get vCpu() {
    return this.getNumberAttribute('v_cpu');
  }
}

export class DataScalewayWebhostingOfferProductList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayWebhostingOfferProductOutputReference {
    return new DataScalewayWebhostingOfferProductOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer scaleway_webhosting_offer}
*/
export class DataScalewayWebhostingOffer extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_webhosting_offer";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DataScalewayWebhostingOffer resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DataScalewayWebhostingOffer to import
  * @param importFromId The id of the existing DataScalewayWebhostingOffer that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DataScalewayWebhostingOffer to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_webhosting_offer", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/data-sources/webhosting_offer scaleway_webhosting_offer} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayWebhostingOfferConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayWebhostingOfferConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_webhosting_offer',
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
    this._name = config.name;
    this._offerId = config.offerId;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // billing_operation_path - computed: true, optional: false, required: false
  public get billingOperationPath() {
    return this.getStringAttribute('billing_operation_path');
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

  // offer_id - computed: false, optional: true, required: false
  private _offerId?: string; 
  public get offerId() {
    return this.getStringAttribute('offer_id');
  }
  public set offerId(value: string) {
    this._offerId = value;
  }
  public resetOfferId() {
    this._offerId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get offerIdInput() {
    return this._offerId;
  }

  // price - computed: true, optional: false, required: false
  public get price() {
    return this.getStringAttribute('price');
  }

  // product - computed: true, optional: false, required: false
  private _product = new DataScalewayWebhostingOfferProductList(this, "product", false);
  public get product() {
    return this._product;
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

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      offer_id: cdktf.stringToTerraform(this._offerId),
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
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      offer_id: {
        value: cdktf.stringToHclTerraform(this._offerId),
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
