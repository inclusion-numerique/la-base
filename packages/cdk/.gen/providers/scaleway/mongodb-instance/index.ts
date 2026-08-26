// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface MongodbInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#id MongodbInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Enable or disable automatic snapshot scheduling
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#is_snapshot_schedule_enabled MongodbInstance#is_snapshot_schedule_enabled}
  */
  readonly isSnapshotScheduleEnabled?: boolean | cdktf.IResolvable;
  /**
  * Name of the MongoDB cluster
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#name MongodbInstance#name}
  */
  readonly name?: string;
  /**
  * Number of nodes in the instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#node_number MongodbInstance#node_number}
  */
  readonly nodeNumber: number;
  /**
  * Type of node to use for the instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#node_type MongodbInstance#node_type}
  */
  readonly nodeType: string;
  /**
  * Password of the user. Only one of `password` or `password_wo` should be specified.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#password MongodbInstance#password}
  */
  readonly password?: string;
  /**
  * Password of the user in [write-only](https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/guides/using-write-only-arguments) mode. Only one of `password` or `password_wo` should be specified. `password_wo` will not be set in the Terraform state. To update the `password_wo`, you must also update the `password_wo_version`.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#password_wo MongodbInstance#password_wo}
  */
  readonly passwordWo?: string;
  /**
  * The version of the [write-only](https://registry.terraform.io/providers/scaleway/scaleway/latest/docs/guides/using-write-only-arguments) password. To update the `password_wo`, you must also update the `password_wo_version`.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#password_wo_version MongodbInstance#password_wo_version}
  */
  readonly passwordWoVersion?: number;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#project_id MongodbInstance#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#region MongodbInstance#region}
  */
  readonly region?: string;
  /**
  * Map of settings to define for the instance.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#settings MongodbInstance#settings}
  */
  readonly settings?: { [key: string]: string };
  /**
  * Snapshot ID to restore the MongoDB instance from
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#snapshot_id MongodbInstance#snapshot_id}
  */
  readonly snapshotId?: string;
  /**
  * Snapshot schedule frequency in hours
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#snapshot_schedule_frequency_hours MongodbInstance#snapshot_schedule_frequency_hours}
  */
  readonly snapshotScheduleFrequencyHours?: number;
  /**
  * Snapshot schedule retention in days
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#snapshot_schedule_retention_days MongodbInstance#snapshot_schedule_retention_days}
  */
  readonly snapshotScheduleRetentionDays?: number;
  /**
  * List of tags ["tag1", "tag2", ...] attached to a MongoDB instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#tags MongodbInstance#tags}
  */
  readonly tags?: string[];
  /**
  * Name of the user created when the cluster is created
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#user_name MongodbInstance#user_name}
  */
  readonly userName?: string;
  /**
  * MongoDB version of the instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#version MongodbInstance#version}
  */
  readonly version?: string;
  /**
  * Volume size (in GB)
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#volume_size_in_gb MongodbInstance#volume_size_in_gb}
  */
  readonly volumeSizeInGb?: number;
  /**
  * Volume type of the instance
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#volume_type MongodbInstance#volume_type}
  */
  readonly volumeType?: string;
  /**
  * private_ip block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#private_ip MongodbInstance#private_ip}
  */
  readonly privateIp?: MongodbInstancePrivateIp[] | cdktf.IResolvable;
  /**
  * private_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#private_network MongodbInstance#private_network}
  */
  readonly privateNetwork?: MongodbInstancePrivateNetwork;
  /**
  * public_network block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#public_network MongodbInstance#public_network}
  */
  readonly publicNetwork?: MongodbInstancePublicNetwork;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#timeouts MongodbInstance#timeouts}
  */
  readonly timeouts?: MongodbInstanceTimeouts;
}
export interface MongodbInstancePrivateIp {
}

export function mongodbInstancePrivateIpToTerraform(struct?: MongodbInstancePrivateIp | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function mongodbInstancePrivateIpToHclTerraform(struct?: MongodbInstancePrivateIp | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class MongodbInstancePrivateIpOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  * @param complexObjectIndex the index of this item in the list
  * @param complexObjectIsFromSet whether the list is wrapping a set (will add tolist() to be able to access an item via an index)
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string, complexObjectIndex: number, complexObjectIsFromSet: boolean) {
    super(terraformResource, terraformAttribute, complexObjectIsFromSet, complexObjectIndex);
  }

  public get internalValue(): MongodbInstancePrivateIp | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MongodbInstancePrivateIp | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
    }
  }

  // address - computed: true, optional: false, required: false
  public get address() {
    return this.getStringAttribute('address');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }
}

export class MongodbInstancePrivateIpList extends cdktf.ComplexList {
  public internalValue? : MongodbInstancePrivateIp[] | cdktf.IResolvable

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
  public get(index: number): MongodbInstancePrivateIpOutputReference {
    return new MongodbInstancePrivateIpOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface MongodbInstancePrivateNetwork {
  /**
  * The private network ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#pn_id MongodbInstance#pn_id}
  */
  readonly pnId: string;
}

export function mongodbInstancePrivateNetworkToTerraform(struct?: MongodbInstancePrivateNetworkOutputReference | MongodbInstancePrivateNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    pn_id: cdktf.stringToTerraform(struct!.pnId),
  }
}


export function mongodbInstancePrivateNetworkToHclTerraform(struct?: MongodbInstancePrivateNetworkOutputReference | MongodbInstancePrivateNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    pn_id: {
      value: cdktf.stringToHclTerraform(struct!.pnId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MongodbInstancePrivateNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MongodbInstancePrivateNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._pnId !== undefined) {
      hasAnyValues = true;
      internalValueResult.pnId = this._pnId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MongodbInstancePrivateNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._pnId = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._pnId = value.pnId;
    }
  }

  // dns_records - computed: true, optional: false, required: false
  public get dnsRecords() {
    return this.getListAttribute('dns_records');
  }

  // id - computed: true, optional: false, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // ips - computed: true, optional: false, required: false
  public get ips() {
    return this.getListAttribute('ips');
  }

  // pn_id - computed: false, optional: false, required: true
  private _pnId?: string; 
  public get pnId() {
    return this.getStringAttribute('pn_id');
  }
  public set pnId(value: string) {
    this._pnId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get pnIdInput() {
    return this._pnId;
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }
}
export interface MongodbInstancePublicNetwork {
  /**
  * The DNS record of your endpoint
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#dns_record MongodbInstance#dns_record}
  */
  readonly dnsRecord?: string;
  /**
  * ID of the public network
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#id MongodbInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * TCP port of the endpoint
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#port MongodbInstance#port}
  */
  readonly port?: number;
}

export function mongodbInstancePublicNetworkToTerraform(struct?: MongodbInstancePublicNetworkOutputReference | MongodbInstancePublicNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dns_record: cdktf.stringToTerraform(struct!.dnsRecord),
    id: cdktf.stringToTerraform(struct!.id),
    port: cdktf.numberToTerraform(struct!.port),
  }
}


export function mongodbInstancePublicNetworkToHclTerraform(struct?: MongodbInstancePublicNetworkOutputReference | MongodbInstancePublicNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dns_record: {
      value: cdktf.stringToHclTerraform(struct!.dnsRecord),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    id: {
      value: cdktf.stringToHclTerraform(struct!.id),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    port: {
      value: cdktf.numberToHclTerraform(struct!.port),
      isBlock: false,
      type: "simple",
      storageClassType: "number",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MongodbInstancePublicNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): MongodbInstancePublicNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dnsRecord !== undefined) {
      hasAnyValues = true;
      internalValueResult.dnsRecord = this._dnsRecord;
    }
    if (this._id !== undefined) {
      hasAnyValues = true;
      internalValueResult.id = this._id;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MongodbInstancePublicNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._dnsRecord = undefined;
      this._id = undefined;
      this._port = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._dnsRecord = value.dnsRecord;
      this._id = value.id;
      this._port = value.port;
    }
  }

  // dns_record - computed: true, optional: true, required: false
  private _dnsRecord?: string; 
  public get dnsRecord() {
    return this.getStringAttribute('dns_record');
  }
  public set dnsRecord(value: string) {
    this._dnsRecord = value;
  }
  public resetDnsRecord() {
    this._dnsRecord = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsRecordInput() {
    return this._dnsRecord;
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

  // port - computed: true, optional: true, required: false
  private _port?: number; 
  public get port() {
    return this.getNumberAttribute('port');
  }
  public set port(value: number) {
    this._port = value;
  }
  public resetPort() {
    this._port = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portInput() {
    return this._port;
  }
}
export interface MongodbInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#create MongodbInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#default MongodbInstance#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#delete MongodbInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#update MongodbInstance#update}
  */
  readonly update?: string;
}

export function mongodbInstanceTimeoutsToTerraform(struct?: MongodbInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    update: cdktf.stringToTerraform(struct!.update),
  }
}


export function mongodbInstanceTimeoutsToHclTerraform(struct?: MongodbInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    create: {
      value: cdktf.stringToHclTerraform(struct!.create),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    default: {
      value: cdktf.stringToHclTerraform(struct!.default),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    delete: {
      value: cdktf.stringToHclTerraform(struct!.delete),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    update: {
      value: cdktf.stringToHclTerraform(struct!.update),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class MongodbInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): MongodbInstanceTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._create !== undefined) {
      hasAnyValues = true;
      internalValueResult.create = this._create;
    }
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    if (this._delete !== undefined) {
      hasAnyValues = true;
      internalValueResult.delete = this._delete;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: MongodbInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._update = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._create = value.create;
      this._default = value.default;
      this._delete = value.delete;
      this._update = value.update;
    }
  }

  // create - computed: false, optional: true, required: false
  private _create?: string; 
  public get create() {
    return this.getStringAttribute('create');
  }
  public set create(value: string) {
    this._create = value;
  }
  public resetCreate() {
    this._create = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get createInput() {
    return this._create;
  }

  // default - computed: false, optional: true, required: false
  private _default?: string; 
  public get default() {
    return this.getStringAttribute('default');
  }
  public set default(value: string) {
    this._default = value;
  }
  public resetDefault() {
    this._default = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get defaultInput() {
    return this._default;
  }

  // delete - computed: false, optional: true, required: false
  private _delete?: string; 
  public get delete() {
    return this.getStringAttribute('delete');
  }
  public set delete(value: string) {
    this._delete = value;
  }
  public resetDelete() {
    this._delete = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get deleteInput() {
    return this._delete;
  }

  // update - computed: false, optional: true, required: false
  private _update?: string; 
  public get update() {
    return this.getStringAttribute('update');
  }
  public set update(value: string) {
    this._update = value;
  }
  public resetUpdate() {
    this._update = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get updateInput() {
    return this._update;
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance scaleway_mongodb_instance}
*/
export class MongodbInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_mongodb_instance";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a MongodbInstance resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the MongodbInstance to import
  * @param importFromId The id of the existing MongodbInstance that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the MongodbInstance to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_mongodb_instance", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/mongodb_instance scaleway_mongodb_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options MongodbInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: MongodbInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_mongodb_instance',
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
    this._id = config.id;
    this._isSnapshotScheduleEnabled = config.isSnapshotScheduleEnabled;
    this._name = config.name;
    this._nodeNumber = config.nodeNumber;
    this._nodeType = config.nodeType;
    this._password = config.password;
    this._passwordWo = config.passwordWo;
    this._passwordWoVersion = config.passwordWoVersion;
    this._projectId = config.projectId;
    this._region = config.region;
    this._settings = config.settings;
    this._snapshotId = config.snapshotId;
    this._snapshotScheduleFrequencyHours = config.snapshotScheduleFrequencyHours;
    this._snapshotScheduleRetentionDays = config.snapshotScheduleRetentionDays;
    this._tags = config.tags;
    this._userName = config.userName;
    this._version = config.version;
    this._volumeSizeInGb = config.volumeSizeInGb;
    this._volumeType = config.volumeType;
    this._privateIp.internalValue = config.privateIp;
    this._privateNetwork.internalValue = config.privateNetwork;
    this._publicNetwork.internalValue = config.publicNetwork;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
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

  // is_snapshot_schedule_enabled - computed: true, optional: true, required: false
  private _isSnapshotScheduleEnabled?: boolean | cdktf.IResolvable; 
  public get isSnapshotScheduleEnabled() {
    return this.getBooleanAttribute('is_snapshot_schedule_enabled');
  }
  public set isSnapshotScheduleEnabled(value: boolean | cdktf.IResolvable) {
    this._isSnapshotScheduleEnabled = value;
  }
  public resetIsSnapshotScheduleEnabled() {
    this._isSnapshotScheduleEnabled = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isSnapshotScheduleEnabledInput() {
    return this._isSnapshotScheduleEnabled;
  }

  // name - computed: true, optional: true, required: false
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

  // node_number - computed: false, optional: false, required: true
  private _nodeNumber?: number; 
  public get nodeNumber() {
    return this.getNumberAttribute('node_number');
  }
  public set nodeNumber(value: number) {
    this._nodeNumber = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeNumberInput() {
    return this._nodeNumber;
  }

  // node_type - computed: false, optional: false, required: true
  private _nodeType?: string; 
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }
  public set nodeType(value: string) {
    this._nodeType = value;
  }
  // Temporarily expose input value. Use with caution.
  public get nodeTypeInput() {
    return this._nodeType;
  }

  // password - computed: false, optional: true, required: false
  private _password?: string; 
  public get password() {
    return this.getStringAttribute('password');
  }
  public set password(value: string) {
    this._password = value;
  }
  public resetPassword() {
    this._password = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordInput() {
    return this._password;
  }

  // password_wo - computed: false, optional: true, required: false
  private _passwordWo?: string; 
  public get passwordWo() {
    return this.getStringAttribute('password_wo');
  }
  public set passwordWo(value: string) {
    this._passwordWo = value;
  }
  public resetPasswordWo() {
    this._passwordWo = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordWoInput() {
    return this._passwordWo;
  }

  // password_wo_version - computed: false, optional: true, required: false
  private _passwordWoVersion?: number; 
  public get passwordWoVersion() {
    return this.getNumberAttribute('password_wo_version');
  }
  public set passwordWoVersion(value: number) {
    this._passwordWoVersion = value;
  }
  public resetPasswordWoVersion() {
    this._passwordWoVersion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get passwordWoVersionInput() {
    return this._passwordWoVersion;
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

  // settings - computed: false, optional: true, required: false
  private _settings?: { [key: string]: string }; 
  public get settings() {
    return this.getStringMapAttribute('settings');
  }
  public set settings(value: { [key: string]: string }) {
    this._settings = value;
  }
  public resetSettings() {
    this._settings = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get settingsInput() {
    return this._settings;
  }

  // snapshot_id - computed: false, optional: true, required: false
  private _snapshotId?: string; 
  public get snapshotId() {
    return this.getStringAttribute('snapshot_id');
  }
  public set snapshotId(value: string) {
    this._snapshotId = value;
  }
  public resetSnapshotId() {
    this._snapshotId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get snapshotIdInput() {
    return this._snapshotId;
  }

  // snapshot_schedule_frequency_hours - computed: true, optional: true, required: false
  private _snapshotScheduleFrequencyHours?: number; 
  public get snapshotScheduleFrequencyHours() {
    return this.getNumberAttribute('snapshot_schedule_frequency_hours');
  }
  public set snapshotScheduleFrequencyHours(value: number) {
    this._snapshotScheduleFrequencyHours = value;
  }
  public resetSnapshotScheduleFrequencyHours() {
    this._snapshotScheduleFrequencyHours = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get snapshotScheduleFrequencyHoursInput() {
    return this._snapshotScheduleFrequencyHours;
  }

  // snapshot_schedule_retention_days - computed: true, optional: true, required: false
  private _snapshotScheduleRetentionDays?: number; 
  public get snapshotScheduleRetentionDays() {
    return this.getNumberAttribute('snapshot_schedule_retention_days');
  }
  public set snapshotScheduleRetentionDays(value: number) {
    this._snapshotScheduleRetentionDays = value;
  }
  public resetSnapshotScheduleRetentionDays() {
    this._snapshotScheduleRetentionDays = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get snapshotScheduleRetentionDaysInput() {
    return this._snapshotScheduleRetentionDays;
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: string[]; 
  public get tags() {
    return this.getListAttribute('tags');
  }
  public set tags(value: string[]) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags;
  }

  // tls_certificate - computed: true, optional: false, required: false
  public get tlsCertificate() {
    return this.getStringAttribute('tls_certificate');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // user_name - computed: false, optional: true, required: false
  private _userName?: string; 
  public get userName() {
    return this.getStringAttribute('user_name');
  }
  public set userName(value: string) {
    this._userName = value;
  }
  public resetUserName() {
    this._userName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get userNameInput() {
    return this._userName;
  }

  // version - computed: true, optional: true, required: false
  private _version?: string; 
  public get version() {
    return this.getStringAttribute('version');
  }
  public set version(value: string) {
    this._version = value;
  }
  public resetVersion() {
    this._version = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get versionInput() {
    return this._version;
  }

  // volume_size_in_gb - computed: true, optional: true, required: false
  private _volumeSizeInGb?: number; 
  public get volumeSizeInGb() {
    return this.getNumberAttribute('volume_size_in_gb');
  }
  public set volumeSizeInGb(value: number) {
    this._volumeSizeInGb = value;
  }
  public resetVolumeSizeInGb() {
    this._volumeSizeInGb = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeSizeInGbInput() {
    return this._volumeSizeInGb;
  }

  // volume_type - computed: false, optional: true, required: false
  private _volumeType?: string; 
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }
  public set volumeType(value: string) {
    this._volumeType = value;
  }
  public resetVolumeType() {
    this._volumeType = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get volumeTypeInput() {
    return this._volumeType;
  }

  // private_ip - computed: false, optional: true, required: false
  private _privateIp = new MongodbInstancePrivateIpList(this, "private_ip", false);
  public get privateIp() {
    return this._privateIp;
  }
  public putPrivateIp(value: MongodbInstancePrivateIp[] | cdktf.IResolvable) {
    this._privateIp.internalValue = value;
  }
  public resetPrivateIp() {
    this._privateIp.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpInput() {
    return this._privateIp.internalValue;
  }

  // private_network - computed: false, optional: true, required: false
  private _privateNetwork = new MongodbInstancePrivateNetworkOutputReference(this, "private_network");
  public get privateNetwork() {
    return this._privateNetwork;
  }
  public putPrivateNetwork(value: MongodbInstancePrivateNetwork) {
    this._privateNetwork.internalValue = value;
  }
  public resetPrivateNetwork() {
    this._privateNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkInput() {
    return this._privateNetwork.internalValue;
  }

  // public_network - computed: false, optional: true, required: false
  private _publicNetwork = new MongodbInstancePublicNetworkOutputReference(this, "public_network");
  public get publicNetwork() {
    return this._publicNetwork;
  }
  public putPublicNetwork(value: MongodbInstancePublicNetwork) {
    this._publicNetwork.internalValue = value;
  }
  public resetPublicNetwork() {
    this._publicNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get publicNetworkInput() {
    return this._publicNetwork.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new MongodbInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: MongodbInstanceTimeouts) {
    this._timeouts.internalValue = value;
  }
  public resetTimeouts() {
    this._timeouts.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get timeoutsInput() {
    return this._timeouts.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      is_snapshot_schedule_enabled: cdktf.booleanToTerraform(this._isSnapshotScheduleEnabled),
      name: cdktf.stringToTerraform(this._name),
      node_number: cdktf.numberToTerraform(this._nodeNumber),
      node_type: cdktf.stringToTerraform(this._nodeType),
      password: cdktf.stringToTerraform(this._password),
      password_wo: cdktf.stringToTerraform(this._passwordWo),
      password_wo_version: cdktf.numberToTerraform(this._passwordWoVersion),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      settings: cdktf.hashMapper(cdktf.stringToTerraform)(this._settings),
      snapshot_id: cdktf.stringToTerraform(this._snapshotId),
      snapshot_schedule_frequency_hours: cdktf.numberToTerraform(this._snapshotScheduleFrequencyHours),
      snapshot_schedule_retention_days: cdktf.numberToTerraform(this._snapshotScheduleRetentionDays),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      user_name: cdktf.stringToTerraform(this._userName),
      version: cdktf.stringToTerraform(this._version),
      volume_size_in_gb: cdktf.numberToTerraform(this._volumeSizeInGb),
      volume_type: cdktf.stringToTerraform(this._volumeType),
      private_ip: cdktf.listMapper(mongodbInstancePrivateIpToTerraform, true)(this._privateIp.internalValue),
      private_network: mongodbInstancePrivateNetworkToTerraform(this._privateNetwork.internalValue),
      public_network: mongodbInstancePublicNetworkToTerraform(this._publicNetwork.internalValue),
      timeouts: mongodbInstanceTimeoutsToTerraform(this._timeouts.internalValue),
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
      is_snapshot_schedule_enabled: {
        value: cdktf.booleanToHclTerraform(this._isSnapshotScheduleEnabled),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      name: {
        value: cdktf.stringToHclTerraform(this._name),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      node_number: {
        value: cdktf.numberToHclTerraform(this._nodeNumber),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      node_type: {
        value: cdktf.stringToHclTerraform(this._nodeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      password: {
        value: cdktf.stringToHclTerraform(this._password),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      password_wo: {
        value: cdktf.stringToHclTerraform(this._passwordWo),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      password_wo_version: {
        value: cdktf.numberToHclTerraform(this._passwordWoVersion),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
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
      settings: {
        value: cdktf.hashMapperHcl(cdktf.stringToHclTerraform)(this._settings),
        isBlock: false,
        type: "map",
        storageClassType: "stringMap",
      },
      snapshot_id: {
        value: cdktf.stringToHclTerraform(this._snapshotId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      snapshot_schedule_frequency_hours: {
        value: cdktf.numberToHclTerraform(this._snapshotScheduleFrequencyHours),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      snapshot_schedule_retention_days: {
        value: cdktf.numberToHclTerraform(this._snapshotScheduleRetentionDays),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      user_name: {
        value: cdktf.stringToHclTerraform(this._userName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      version: {
        value: cdktf.stringToHclTerraform(this._version),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      volume_size_in_gb: {
        value: cdktf.numberToHclTerraform(this._volumeSizeInGb),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      volume_type: {
        value: cdktf.stringToHclTerraform(this._volumeType),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      private_ip: {
        value: cdktf.listMapperHcl(mongodbInstancePrivateIpToHclTerraform, true)(this._privateIp.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MongodbInstancePrivateIpList",
      },
      private_network: {
        value: mongodbInstancePrivateNetworkToHclTerraform(this._privateNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MongodbInstancePrivateNetworkList",
      },
      public_network: {
        value: mongodbInstancePublicNetworkToHclTerraform(this._publicNetwork.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "MongodbInstancePublicNetworkList",
      },
      timeouts: {
        value: mongodbInstanceTimeoutsToHclTerraform(this._timeouts.internalValue),
        isBlock: true,
        type: "struct",
        storageClassType: "MongodbInstanceTimeouts",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
