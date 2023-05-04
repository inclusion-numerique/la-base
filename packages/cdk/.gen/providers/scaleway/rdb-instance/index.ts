// https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RdbInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Boolean to store logical backups in the same region as the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#backup_same_region RdbInstance#backup_same_region}
  */
  readonly backupSameRegion?: boolean | cdktf.IResolvable;
  /**
  * Backup schedule frequency in hours
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#backup_schedule_frequency RdbInstance#backup_schedule_frequency}
  */
  readonly backupScheduleFrequency?: number;
  /**
  * Backup schedule retention in days
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#backup_schedule_retention RdbInstance#backup_schedule_retention}
  */
  readonly backupScheduleRetention?: number;
  /**
  * Disable automated backup for the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#disable_backup RdbInstance#disable_backup}
  */
  readonly disableBackup?: boolean | cdktf.IResolvable;
  /**
  * Database's engine version id
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#engine RdbInstance#engine}
  */
  readonly engine: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#id RdbInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Map of engine settings to be set at database initialisation.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#init_settings RdbInstance#init_settings}
  */
  readonly initSettings?: { [key: string]: string };
  /**
  * Enable or disable high availability for the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#is_ha_cluster RdbInstance#is_ha_cluster}
  */
  readonly isHaCluster?: boolean | cdktf.IResolvable;
  /**
  * Name of the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#name RdbInstance#name}
  */
  readonly name?: string;
  /**
  * The type of database instance you want to create
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#node_type RdbInstance#node_type}
  */
  readonly nodeType: string;
  /**
  * Password for the first user of the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#password RdbInstance#password}
  */
  readonly password?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#project_id RdbInstance#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#region RdbInstance#region}
  */
  readonly region?: string;
  /**
  * Map of engine settings to be set on a running instance.
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#settings RdbInstance#settings}
  */
  readonly settings?: { [key: string]: string };
  /**
  * List of tags ["tag1", "tag2", ...] attached to a database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#tags RdbInstance#tags}
  */
  readonly tags?: string[];
  /**
  * Identifier for the first user of the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#user_name RdbInstance#user_name}
  */
  readonly userName?: string;
  /**
  * Volume size (in GB) when volume_type is not lssd
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#volume_size_in_gb RdbInstance#volume_size_in_gb}
  */
  readonly volumeSizeInGb?: number;
  /**
  * Type of volume where data are stored
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#volume_type RdbInstance#volume_type}
  */
  readonly volumeType?: string;
  /**
  * private_network block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#private_network RdbInstance#private_network}
  */
  readonly privateNetwork?: RdbInstancePrivateNetwork;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#timeouts RdbInstance#timeouts}
  */
  readonly timeouts?: RdbInstanceTimeouts;
}
export interface RdbInstanceLoadBalancer {
}

export function rdbInstanceLoadBalancerToTerraform(struct?: RdbInstanceLoadBalancer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class RdbInstanceLoadBalancerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): RdbInstanceLoadBalancer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbInstanceLoadBalancer | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // endpoint_id - computed: true, optional: false, required: false
  public get endpointId() {
    return this.getStringAttribute('endpoint_id');
  }

  // hostname - computed: true, optional: false, required: false
  public get hostname() {
    return this.getStringAttribute('hostname');
  }

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }
}

export class RdbInstanceLoadBalancerList extends cdktf.ComplexList {

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
  public get(index: number): RdbInstanceLoadBalancerOutputReference {
    return new RdbInstanceLoadBalancerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface RdbInstanceReadReplicas {
}

export function rdbInstanceReadReplicasToTerraform(struct?: RdbInstanceReadReplicas): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class RdbInstanceReadReplicasOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): RdbInstanceReadReplicas | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbInstanceReadReplicas | undefined) {
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

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }
}

export class RdbInstanceReadReplicasList extends cdktf.ComplexList {

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
  public get(index: number): RdbInstanceReadReplicasOutputReference {
    return new RdbInstanceReadReplicasOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface RdbInstancePrivateNetwork {
  /**
  * The endpoint ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#endpoint_id RdbInstance#endpoint_id}
  */
  readonly endpointId?: string;
  /**
  * The hostname of your endpoint
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#hostname RdbInstance#hostname}
  */
  readonly hostname?: string;
  /**
  * The IP of your private service
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#ip RdbInstance#ip}
  */
  readonly ip?: string;
  /**
  * The IP network address within the private subnet
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#ip_net RdbInstance#ip_net}
  */
  readonly ipNet?: string;
  /**
  * The name of your private service
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#name RdbInstance#name}
  */
  readonly name?: string;
  /**
  * The private network ID
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#pn_id RdbInstance#pn_id}
  */
  readonly pnId: string;
  /**
  * The port of your private service
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#port RdbInstance#port}
  */
  readonly port?: number;
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#zone RdbInstance#zone}
  */
  readonly zone?: string;
}

export function rdbInstancePrivateNetworkToTerraform(struct?: RdbInstancePrivateNetworkOutputReference | RdbInstancePrivateNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    endpoint_id: cdktf.stringToTerraform(struct!.endpointId),
    hostname: cdktf.stringToTerraform(struct!.hostname),
    ip: cdktf.stringToTerraform(struct!.ip),
    ip_net: cdktf.stringToTerraform(struct!.ipNet),
    name: cdktf.stringToTerraform(struct!.name),
    pn_id: cdktf.stringToTerraform(struct!.pnId),
    port: cdktf.numberToTerraform(struct!.port),
    zone: cdktf.stringToTerraform(struct!.zone),
  }
}

export class RdbInstancePrivateNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RdbInstancePrivateNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._endpointId !== undefined) {
      hasAnyValues = true;
      internalValueResult.endpointId = this._endpointId;
    }
    if (this._hostname !== undefined) {
      hasAnyValues = true;
      internalValueResult.hostname = this._hostname;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._ipNet !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipNet = this._ipNet;
    }
    if (this._name !== undefined) {
      hasAnyValues = true;
      internalValueResult.name = this._name;
    }
    if (this._pnId !== undefined) {
      hasAnyValues = true;
      internalValueResult.pnId = this._pnId;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._zone !== undefined) {
      hasAnyValues = true;
      internalValueResult.zone = this._zone;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbInstancePrivateNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._endpointId = undefined;
      this._hostname = undefined;
      this._ip = undefined;
      this._ipNet = undefined;
      this._name = undefined;
      this._pnId = undefined;
      this._port = undefined;
      this._zone = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._endpointId = value.endpointId;
      this._hostname = value.hostname;
      this._ip = value.ip;
      this._ipNet = value.ipNet;
      this._name = value.name;
      this._pnId = value.pnId;
      this._port = value.port;
      this._zone = value.zone;
    }
  }

  // endpoint_id - computed: true, optional: true, required: false
  private _endpointId?: string; 
  public get endpointId() {
    return this.getStringAttribute('endpoint_id');
  }
  public set endpointId(value: string) {
    this._endpointId = value;
  }
  public resetEndpointId() {
    this._endpointId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get endpointIdInput() {
    return this._endpointId;
  }

  // hostname - computed: true, optional: true, required: false
  private _hostname?: string; 
  public get hostname() {
    return this.getStringAttribute('hostname');
  }
  public set hostname(value: string) {
    this._hostname = value;
  }
  public resetHostname() {
    this._hostname = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get hostnameInput() {
    return this._hostname;
  }

  // ip - computed: true, optional: true, required: false
  private _ip?: string; 
  public get ip() {
    return this.getStringAttribute('ip');
  }
  public set ip(value: string) {
    this._ip = value;
  }
  public resetIp() {
    this._ip = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipInput() {
    return this._ip;
  }

  // ip_net - computed: true, optional: true, required: false
  private _ipNet?: string; 
  public get ipNet() {
    return this.getStringAttribute('ip_net');
  }
  public set ipNet(value: string) {
    this._ipNet = value;
  }
  public resetIpNet() {
    this._ipNet = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipNetInput() {
    return this._ipNet;
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
}
export interface RdbInstanceTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#create RdbInstance#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#default RdbInstance#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#delete RdbInstance#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#read RdbInstance#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance#update RdbInstance#update}
  */
  readonly update?: string;
}

export function rdbInstanceTimeoutsToTerraform(struct?: RdbInstanceTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    create: cdktf.stringToTerraform(struct!.create),
    default: cdktf.stringToTerraform(struct!.default),
    delete: cdktf.stringToTerraform(struct!.delete),
    read: cdktf.stringToTerraform(struct!.read),
    update: cdktf.stringToTerraform(struct!.update),
  }
}

export class RdbInstanceTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RdbInstanceTimeouts | cdktf.IResolvable | undefined {
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
    if (this._read !== undefined) {
      hasAnyValues = true;
      internalValueResult.read = this._read;
    }
    if (this._update !== undefined) {
      hasAnyValues = true;
      internalValueResult.update = this._update;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbInstanceTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._create = undefined;
      this._default = undefined;
      this._delete = undefined;
      this._read = undefined;
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
      this._read = value.read;
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

  // read - computed: false, optional: true, required: false
  private _read?: string; 
  public get read() {
    return this.getStringAttribute('read');
  }
  public set read(value: string) {
    this._read = value;
  }
  public resetRead() {
    this._read = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get readInput() {
    return this._read;
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance scaleway_rdb_instance}
*/
export class RdbInstance extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_rdb_instance";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_instance scaleway_rdb_instance} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RdbInstanceConfig
  */
  public constructor(scope: Construct, id: string, config: RdbInstanceConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_rdb_instance',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.18.0',
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
    this._backupSameRegion = config.backupSameRegion;
    this._backupScheduleFrequency = config.backupScheduleFrequency;
    this._backupScheduleRetention = config.backupScheduleRetention;
    this._disableBackup = config.disableBackup;
    this._engine = config.engine;
    this._id = config.id;
    this._initSettings = config.initSettings;
    this._isHaCluster = config.isHaCluster;
    this._name = config.name;
    this._nodeType = config.nodeType;
    this._password = config.password;
    this._projectId = config.projectId;
    this._region = config.region;
    this._settings = config.settings;
    this._tags = config.tags;
    this._userName = config.userName;
    this._volumeSizeInGb = config.volumeSizeInGb;
    this._volumeType = config.volumeType;
    this._privateNetwork.internalValue = config.privateNetwork;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backup_same_region - computed: true, optional: true, required: false
  private _backupSameRegion?: boolean | cdktf.IResolvable; 
  public get backupSameRegion() {
    return this.getBooleanAttribute('backup_same_region');
  }
  public set backupSameRegion(value: boolean | cdktf.IResolvable) {
    this._backupSameRegion = value;
  }
  public resetBackupSameRegion() {
    this._backupSameRegion = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupSameRegionInput() {
    return this._backupSameRegion;
  }

  // backup_schedule_frequency - computed: true, optional: true, required: false
  private _backupScheduleFrequency?: number; 
  public get backupScheduleFrequency() {
    return this.getNumberAttribute('backup_schedule_frequency');
  }
  public set backupScheduleFrequency(value: number) {
    this._backupScheduleFrequency = value;
  }
  public resetBackupScheduleFrequency() {
    this._backupScheduleFrequency = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupScheduleFrequencyInput() {
    return this._backupScheduleFrequency;
  }

  // backup_schedule_retention - computed: true, optional: true, required: false
  private _backupScheduleRetention?: number; 
  public get backupScheduleRetention() {
    return this.getNumberAttribute('backup_schedule_retention');
  }
  public set backupScheduleRetention(value: number) {
    this._backupScheduleRetention = value;
  }
  public resetBackupScheduleRetention() {
    this._backupScheduleRetention = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get backupScheduleRetentionInput() {
    return this._backupScheduleRetention;
  }

  // certificate - computed: true, optional: false, required: false
  public get certificate() {
    return this.getStringAttribute('certificate');
  }

  // disable_backup - computed: false, optional: true, required: false
  private _disableBackup?: boolean | cdktf.IResolvable; 
  public get disableBackup() {
    return this.getBooleanAttribute('disable_backup');
  }
  public set disableBackup(value: boolean | cdktf.IResolvable) {
    this._disableBackup = value;
  }
  public resetDisableBackup() {
    this._disableBackup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get disableBackupInput() {
    return this._disableBackup;
  }

  // endpoint_ip - computed: true, optional: false, required: false
  public get endpointIp() {
    return this.getStringAttribute('endpoint_ip');
  }

  // endpoint_port - computed: true, optional: false, required: false
  public get endpointPort() {
    return this.getNumberAttribute('endpoint_port');
  }

  // engine - computed: false, optional: false, required: true
  private _engine?: string; 
  public get engine() {
    return this.getStringAttribute('engine');
  }
  public set engine(value: string) {
    this._engine = value;
  }
  // Temporarily expose input value. Use with caution.
  public get engineInput() {
    return this._engine;
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

  // init_settings - computed: false, optional: true, required: false
  private _initSettings?: { [key: string]: string }; 
  public get initSettings() {
    return this.getStringMapAttribute('init_settings');
  }
  public set initSettings(value: { [key: string]: string }) {
    this._initSettings = value;
  }
  public resetInitSettings() {
    this._initSettings = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initSettingsInput() {
    return this._initSettings;
  }

  // is_ha_cluster - computed: false, optional: true, required: false
  private _isHaCluster?: boolean | cdktf.IResolvable; 
  public get isHaCluster() {
    return this.getBooleanAttribute('is_ha_cluster');
  }
  public set isHaCluster(value: boolean | cdktf.IResolvable) {
    this._isHaCluster = value;
  }
  public resetIsHaCluster() {
    this._isHaCluster = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isHaClusterInput() {
    return this._isHaCluster;
  }

  // load_balancer - computed: true, optional: false, required: false
  private _loadBalancer = new RdbInstanceLoadBalancerList(this, "load_balancer", false);
  public get loadBalancer() {
    return this._loadBalancer;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
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

  // read_replicas - computed: true, optional: false, required: false
  private _readReplicas = new RdbInstanceReadReplicasList(this, "read_replicas", false);
  public get readReplicas() {
    return this._readReplicas;
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

  // settings - computed: true, optional: true, required: false
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

  // private_network - computed: false, optional: true, required: false
  private _privateNetwork = new RdbInstancePrivateNetworkOutputReference(this, "private_network");
  public get privateNetwork() {
    return this._privateNetwork;
  }
  public putPrivateNetwork(value: RdbInstancePrivateNetwork) {
    this._privateNetwork.internalValue = value;
  }
  public resetPrivateNetwork() {
    this._privateNetwork.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkInput() {
    return this._privateNetwork.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new RdbInstanceTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RdbInstanceTimeouts) {
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
      backup_same_region: cdktf.booleanToTerraform(this._backupSameRegion),
      backup_schedule_frequency: cdktf.numberToTerraform(this._backupScheduleFrequency),
      backup_schedule_retention: cdktf.numberToTerraform(this._backupScheduleRetention),
      disable_backup: cdktf.booleanToTerraform(this._disableBackup),
      engine: cdktf.stringToTerraform(this._engine),
      id: cdktf.stringToTerraform(this._id),
      init_settings: cdktf.hashMapper(cdktf.stringToTerraform)(this._initSettings),
      is_ha_cluster: cdktf.booleanToTerraform(this._isHaCluster),
      name: cdktf.stringToTerraform(this._name),
      node_type: cdktf.stringToTerraform(this._nodeType),
      password: cdktf.stringToTerraform(this._password),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      settings: cdktf.hashMapper(cdktf.stringToTerraform)(this._settings),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      user_name: cdktf.stringToTerraform(this._userName),
      volume_size_in_gb: cdktf.numberToTerraform(this._volumeSizeInGb),
      volume_type: cdktf.stringToTerraform(this._volumeType),
      private_network: rdbInstancePrivateNetworkToTerraform(this._privateNetwork.internalValue),
      timeouts: rdbInstanceTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
