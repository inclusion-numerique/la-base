// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayBaremetalOfferConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#id DataScalewayBaremetalOffer#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Include disabled offers
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#include_disabled DataScalewayBaremetalOffer#include_disabled}
  */
  readonly includeDisabled?: boolean | cdktf.IResolvable;
  /**
  * Exact name of the desired offer
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#name DataScalewayBaremetalOffer#name}
  */
  readonly name?: string;
  /**
  * ID of the desired offer
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#offer_id DataScalewayBaremetalOffer#offer_id}
  */
  readonly offerId?: string;
  /**
  * Period of subscription the desired offer
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#subscription_period DataScalewayBaremetalOffer#subscription_period}
  */
  readonly subscriptionPeriod?: string;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer#zone DataScalewayBaremetalOffer#zone}
  */
  readonly zone?: string;
}
export interface DataScalewayBaremetalOfferCpu {
}

export function dataScalewayBaremetalOfferCpuToTerraform(struct?: DataScalewayBaremetalOfferCpu): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayBaremetalOfferCpuOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayBaremetalOfferCpu | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayBaremetalOfferCpu | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // core_count - computed: true, optional: false, required: false
  public get coreCount() {
    return this.getNumberAttribute('core_count');
  }

  // frequency - computed: true, optional: false, required: false
  public get frequency() {
    return this.getNumberAttribute('frequency');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // thread_count - computed: true, optional: false, required: false
  public get threadCount() {
    return this.getNumberAttribute('thread_count');
  }
}

export class DataScalewayBaremetalOfferCpuList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayBaremetalOfferCpuOutputReference {
    return new DataScalewayBaremetalOfferCpuOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayBaremetalOfferDisk {
}

export function dataScalewayBaremetalOfferDiskToTerraform(struct?: DataScalewayBaremetalOfferDisk): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayBaremetalOfferDiskOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayBaremetalOfferDisk | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayBaremetalOfferDisk | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // capacity - computed: true, optional: false, required: false
  public get capacity() {
    return this.getNumberAttribute('capacity');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataScalewayBaremetalOfferDiskList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayBaremetalOfferDiskOutputReference {
    return new DataScalewayBaremetalOfferDiskOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayBaremetalOfferMemory {
}

export function dataScalewayBaremetalOfferMemoryToTerraform(struct?: DataScalewayBaremetalOfferMemory): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayBaremetalOfferMemoryOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayBaremetalOfferMemory | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayBaremetalOfferMemory | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // capacity - computed: true, optional: false, required: false
  public get capacity() {
    return this.getNumberAttribute('capacity');
  }

  // frequency - computed: true, optional: false, required: false
  public get frequency() {
    return this.getNumberAttribute('frequency');
  }

  // is_ecc - computed: true, optional: false, required: false
  public get isEcc() {
    return this.getBooleanAttribute('is_ecc');
  }

  // type - computed: true, optional: false, required: false
  public get type() {
    return this.getStringAttribute('type');
  }
}

export class DataScalewayBaremetalOfferMemoryList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayBaremetalOfferMemoryOutputReference {
    return new DataScalewayBaremetalOfferMemoryOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer scaleway_baremetal_offer}
*/
export class DataScalewayBaremetalOffer extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_baremetal_offer";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/baremetal_offer scaleway_baremetal_offer} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayBaremetalOfferConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayBaremetalOfferConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_baremetal_offer',
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
    this._id = config.id;
    this._includeDisabled = config.includeDisabled;
    this._name = config.name;
    this._offerId = config.offerId;
    this._subscriptionPeriod = config.subscriptionPeriod;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bandwidth - computed: true, optional: false, required: false
  public get bandwidth() {
    return this.getNumberAttribute('bandwidth');
  }

  // commercial_range - computed: true, optional: false, required: false
  public get commercialRange() {
    return this.getStringAttribute('commercial_range');
  }

  // cpu - computed: true, optional: false, required: false
  private _cpu = new DataScalewayBaremetalOfferCpuList(this, "cpu", false);
  public get cpu() {
    return this._cpu;
  }

  // disk - computed: true, optional: false, required: false
  private _disk = new DataScalewayBaremetalOfferDiskList(this, "disk", false);
  public get disk() {
    return this._disk;
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

  // include_disabled - computed: false, optional: true, required: false
  private _includeDisabled?: boolean | cdktf.IResolvable; 
  public get includeDisabled() {
    return this.getBooleanAttribute('include_disabled');
  }
  public set includeDisabled(value: boolean | cdktf.IResolvable) {
    this._includeDisabled = value;
  }
  public resetIncludeDisabled() {
    this._includeDisabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get includeDisabledInput() {
    return this._includeDisabled;
  }

  // memory - computed: true, optional: false, required: false
  private _memory = new DataScalewayBaremetalOfferMemoryList(this, "memory", false);
  public get memory() {
    return this._memory;
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

  // stock - computed: true, optional: false, required: false
  public get stock() {
    return this.getStringAttribute('stock');
  }

  // subscription_period - computed: false, optional: true, required: false
  private _subscriptionPeriod?: string; 
  public get subscriptionPeriod() {
    return this.getStringAttribute('subscription_period');
  }
  public set subscriptionPeriod(value: string) {
    this._subscriptionPeriod = value;
  }
  public resetSubscriptionPeriod() {
    this._subscriptionPeriod = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get subscriptionPeriodInput() {
    return this._subscriptionPeriod;
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
      id: cdktf.stringToTerraform(this._id),
      include_disabled: cdktf.booleanToTerraform(this._includeDisabled),
      name: cdktf.stringToTerraform(this._name),
      offer_id: cdktf.stringToTerraform(this._offerId),
      subscription_period: cdktf.stringToTerraform(this._subscriptionPeriod),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }
}
