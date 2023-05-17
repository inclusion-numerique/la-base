// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayDomainRecordConfig extends cdktf.TerraformMetaArguments {
  /**
  * The data of the record
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#data DataScalewayDomainRecord#data}
  */
  readonly data?: string;
  /**
  * The zone you want to add the record in
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#dns_zone DataScalewayDomainRecord#dns_zone}
  */
  readonly dnsZone?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#id DataScalewayDomainRecord#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The name of the record
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#name DataScalewayDomainRecord#name}
  */
  readonly name?: string;
  /**
  * The ID of the record
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#record_id DataScalewayDomainRecord#record_id}
  */
  readonly recordId?: string;
  /**
  * The type of the record
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record#type DataScalewayDomainRecord#type}
  */
  readonly type?: string;
}
export interface DataScalewayDomainRecordGeoIpMatches {
}

export function dataScalewayDomainRecordGeoIpMatchesToTerraform(struct?: DataScalewayDomainRecordGeoIpMatches): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayDomainRecordGeoIpMatchesOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRecordGeoIpMatches | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRecordGeoIpMatches | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // continents - computed: true, optional: false, required: false
  public get continents() {
    return this.getListAttribute('continents');
  }

  // countries - computed: true, optional: false, required: false
  public get countries() {
    return this.getListAttribute('countries');
  }

  // data - computed: true, optional: false, required: false
  public get data() {
    return this.getStringAttribute('data');
  }
}

export class DataScalewayDomainRecordGeoIpMatchesList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRecordGeoIpMatchesOutputReference {
    return new DataScalewayDomainRecordGeoIpMatchesOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRecordGeoIp {
}

export function dataScalewayDomainRecordGeoIpToTerraform(struct?: DataScalewayDomainRecordGeoIp): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayDomainRecordGeoIpOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRecordGeoIp | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRecordGeoIp | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // matches - computed: true, optional: false, required: false
  private _matches = new DataScalewayDomainRecordGeoIpMatchesList(this, "matches", false);
  public get matches() {
    return this._matches;
  }
}

export class DataScalewayDomainRecordGeoIpList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRecordGeoIpOutputReference {
    return new DataScalewayDomainRecordGeoIpOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRecordHttpService {
}

export function dataScalewayDomainRecordHttpServiceToTerraform(struct?: DataScalewayDomainRecordHttpService): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayDomainRecordHttpServiceOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRecordHttpService | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRecordHttpService | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // ips - computed: true, optional: false, required: false
  public get ips() {
    return this.getListAttribute('ips');
  }

  // must_contain - computed: true, optional: false, required: false
  public get mustContain() {
    return this.getStringAttribute('must_contain');
  }

  // strategy - computed: true, optional: false, required: false
  public get strategy() {
    return this.getStringAttribute('strategy');
  }

  // url - computed: true, optional: false, required: false
  public get url() {
    return this.getStringAttribute('url');
  }

  // user_agent - computed: true, optional: false, required: false
  public get userAgent() {
    return this.getStringAttribute('user_agent');
  }
}

export class DataScalewayDomainRecordHttpServiceList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRecordHttpServiceOutputReference {
    return new DataScalewayDomainRecordHttpServiceOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRecordView {
}

export function dataScalewayDomainRecordViewToTerraform(struct?: DataScalewayDomainRecordView): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayDomainRecordViewOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRecordView | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRecordView | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // data - computed: true, optional: false, required: false
  public get data() {
    return this.getStringAttribute('data');
  }

  // subnet - computed: true, optional: false, required: false
  public get subnet() {
    return this.getStringAttribute('subnet');
  }
}

export class DataScalewayDomainRecordViewList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRecordViewOutputReference {
    return new DataScalewayDomainRecordViewOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayDomainRecordWeighted {
}

export function dataScalewayDomainRecordWeightedToTerraform(struct?: DataScalewayDomainRecordWeighted): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayDomainRecordWeightedOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayDomainRecordWeighted | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayDomainRecordWeighted | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
  }

  // weight - computed: true, optional: false, required: false
  public get weight() {
    return this.getNumberAttribute('weight');
  }
}

export class DataScalewayDomainRecordWeightedList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayDomainRecordWeightedOutputReference {
    return new DataScalewayDomainRecordWeightedOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record scaleway_domain_record}
*/
export class DataScalewayDomainRecord extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_domain_record";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/data-sources/domain_record scaleway_domain_record} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayDomainRecordConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayDomainRecordConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_domain_record',
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
    this._data = config.data;
    this._dnsZone = config.dnsZone;
    this._id = config.id;
    this._name = config.name;
    this._recordId = config.recordId;
    this._type = config.type;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // data - computed: false, optional: true, required: false
  private _data?: string; 
  public get data() {
    return this.getStringAttribute('data');
  }
  public set data(value: string) {
    this._data = value;
  }
  public resetData() {
    this._data = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dataInput() {
    return this._data;
  }

  // dns_zone - computed: false, optional: true, required: false
  private _dnsZone?: string; 
  public get dnsZone() {
    return this.getStringAttribute('dns_zone');
  }
  public set dnsZone(value: string) {
    this._dnsZone = value;
  }
  public resetDnsZone() {
    this._dnsZone = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsZoneInput() {
    return this._dnsZone;
  }

  // geo_ip - computed: true, optional: false, required: false
  private _geoIp = new DataScalewayDomainRecordGeoIpList(this, "geo_ip", false);
  public get geoIp() {
    return this._geoIp;
  }

  // http_service - computed: true, optional: false, required: false
  private _httpService = new DataScalewayDomainRecordHttpServiceList(this, "http_service", false);
  public get httpService() {
    return this._httpService;
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

  // keep_empty_zone - computed: true, optional: false, required: false
  public get keepEmptyZone() {
    return this.getBooleanAttribute('keep_empty_zone');
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

  // priority - computed: true, optional: false, required: false
  public get priority() {
    return this.getNumberAttribute('priority');
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // record_id - computed: false, optional: true, required: false
  private _recordId?: string; 
  public get recordId() {
    return this.getStringAttribute('record_id');
  }
  public set recordId(value: string) {
    this._recordId = value;
  }
  public resetRecordId() {
    this._recordId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get recordIdInput() {
    return this._recordId;
  }

  // root_zone - computed: true, optional: false, required: false
  public get rootZone() {
    return this.getBooleanAttribute('root_zone');
  }

  // ttl - computed: true, optional: false, required: false
  public get ttl() {
    return this.getNumberAttribute('ttl');
  }

  // type - computed: false, optional: true, required: false
  private _type?: string; 
  public get type() {
    return this.getStringAttribute('type');
  }
  public set type(value: string) {
    this._type = value;
  }
  public resetType() {
    this._type = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get typeInput() {
    return this._type;
  }

  // view - computed: true, optional: false, required: false
  private _view = new DataScalewayDomainRecordViewList(this, "view", false);
  public get view() {
    return this._view;
  }

  // weighted - computed: true, optional: false, required: false
  private _weighted = new DataScalewayDomainRecordWeightedList(this, "weighted", false);
  public get weighted() {
    return this._weighted;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      data: cdktf.stringToTerraform(this._data),
      dns_zone: cdktf.stringToTerraform(this._dnsZone),
      id: cdktf.stringToTerraform(this._id),
      name: cdktf.stringToTerraform(this._name),
      record_id: cdktf.stringToTerraform(this._recordId),
      type: cdktf.stringToTerraform(this._type),
    };
  }
}
