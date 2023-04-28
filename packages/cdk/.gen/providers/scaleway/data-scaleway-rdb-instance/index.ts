// https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DataScalewayRdbInstanceConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance#id DataScalewayRdbInstance#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The ID of the RDB instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance#instance_id DataScalewayRdbInstance#instance_id}
  */
  readonly instanceId?: string;
  /**
  * Name of the database instance
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance#name DataScalewayRdbInstance#name}
  */
  readonly name?: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance#region DataScalewayRdbInstance#region}
  */
  readonly region?: string;
}
export interface DataScalewayRdbInstanceLoadBalancer {
}

export function dataScalewayRdbInstanceLoadBalancerToTerraform(struct?: DataScalewayRdbInstanceLoadBalancer): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayRdbInstanceLoadBalancerOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayRdbInstanceLoadBalancer | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayRdbInstanceLoadBalancer | undefined) {
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

export class DataScalewayRdbInstanceLoadBalancerList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayRdbInstanceLoadBalancerOutputReference {
    return new DataScalewayRdbInstanceLoadBalancerOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayRdbInstancePrivateNetwork {
}

export function dataScalewayRdbInstancePrivateNetworkToTerraform(struct?: DataScalewayRdbInstancePrivateNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayRdbInstancePrivateNetworkOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayRdbInstancePrivateNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayRdbInstancePrivateNetwork | undefined) {
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

  // ip_net - computed: true, optional: false, required: false
  public get ipNet() {
    return this.getStringAttribute('ip_net');
  }

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
  }

  // pn_id - computed: true, optional: false, required: false
  public get pnId() {
    return this.getStringAttribute('pn_id');
  }

  // port - computed: true, optional: false, required: false
  public get port() {
    return this.getNumberAttribute('port');
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }
}

export class DataScalewayRdbInstancePrivateNetworkList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayRdbInstancePrivateNetworkOutputReference {
    return new DataScalewayRdbInstancePrivateNetworkOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface DataScalewayRdbInstanceReadReplicas {
}

export function dataScalewayRdbInstanceReadReplicasToTerraform(struct?: DataScalewayRdbInstanceReadReplicas): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class DataScalewayRdbInstanceReadReplicasOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): DataScalewayRdbInstanceReadReplicas | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DataScalewayRdbInstanceReadReplicas | undefined) {
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

export class DataScalewayRdbInstanceReadReplicasList extends cdktf.ComplexList {

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
  public get(index: number): DataScalewayRdbInstanceReadReplicasOutputReference {
    return new DataScalewayRdbInstanceReadReplicasOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance scaleway_rdb_instance}
*/
export class DataScalewayRdbInstance extends cdktf.TerraformDataSource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_rdb_instance";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.17.0/docs/data-sources/rdb_instance scaleway_rdb_instance} Data Source
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DataScalewayRdbInstanceConfig = {}
  */
  public constructor(scope: Construct, id: string, config: DataScalewayRdbInstanceConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_rdb_instance',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._name = config.name;
    this._region = config.region;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // backup_same_region - computed: true, optional: false, required: false
  public get backupSameRegion() {
    return this.getBooleanAttribute('backup_same_region');
  }

  // backup_schedule_frequency - computed: true, optional: false, required: false
  public get backupScheduleFrequency() {
    return this.getNumberAttribute('backup_schedule_frequency');
  }

  // backup_schedule_retention - computed: true, optional: false, required: false
  public get backupScheduleRetention() {
    return this.getNumberAttribute('backup_schedule_retention');
  }

  // certificate - computed: true, optional: false, required: false
  public get certificate() {
    return this.getStringAttribute('certificate');
  }

  // disable_backup - computed: true, optional: false, required: false
  public get disableBackup() {
    return this.getBooleanAttribute('disable_backup');
  }

  // endpoint_ip - computed: true, optional: false, required: false
  public get endpointIp() {
    return this.getStringAttribute('endpoint_ip');
  }

  // endpoint_port - computed: true, optional: false, required: false
  public get endpointPort() {
    return this.getNumberAttribute('endpoint_port');
  }

  // engine - computed: true, optional: false, required: false
  public get engine() {
    return this.getStringAttribute('engine');
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

  // init_settings - computed: true, optional: false, required: false
  private _initSettings = new cdktf.StringMap(this, "init_settings");
  public get initSettings() {
    return this._initSettings;
  }

  // instance_id - computed: false, optional: true, required: false
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  public resetInstanceId() {
    this._instanceId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
  }

  // is_ha_cluster - computed: true, optional: false, required: false
  public get isHaCluster() {
    return this.getBooleanAttribute('is_ha_cluster');
  }

  // load_balancer - computed: true, optional: false, required: false
  private _loadBalancer = new DataScalewayRdbInstanceLoadBalancerList(this, "load_balancer", false);
  public get loadBalancer() {
    return this._loadBalancer;
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

  // node_type - computed: true, optional: false, required: false
  public get nodeType() {
    return this.getStringAttribute('node_type');
  }

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // password - computed: true, optional: false, required: false
  public get password() {
    return this.getStringAttribute('password');
  }

  // private_network - computed: true, optional: false, required: false
  private _privateNetwork = new DataScalewayRdbInstancePrivateNetworkList(this, "private_network", false);
  public get privateNetwork() {
    return this._privateNetwork;
  }

  // project_id - computed: true, optional: false, required: false
  public get projectId() {
    return this.getStringAttribute('project_id');
  }

  // read_replicas - computed: true, optional: false, required: false
  private _readReplicas = new DataScalewayRdbInstanceReadReplicasList(this, "read_replicas", false);
  public get readReplicas() {
    return this._readReplicas;
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

  // settings - computed: true, optional: false, required: false
  private _settings = new cdktf.StringMap(this, "settings");
  public get settings() {
    return this._settings;
  }

  // tags - computed: true, optional: false, required: false
  public get tags() {
    return this.getListAttribute('tags');
  }

  // user_name - computed: true, optional: false, required: false
  public get userName() {
    return this.getStringAttribute('user_name');
  }

  // volume_size_in_gb - computed: true, optional: false, required: false
  public get volumeSizeInGb() {
    return this.getNumberAttribute('volume_size_in_gb');
  }

  // volume_type - computed: true, optional: false, required: false
  public get volumeType() {
    return this.getStringAttribute('volume_type');
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      id: cdktf.stringToTerraform(this._id),
      instance_id: cdktf.stringToTerraform(this._instanceId),
      name: cdktf.stringToTerraform(this._name),
      region: cdktf.stringToTerraform(this._region),
    };
  }
}
