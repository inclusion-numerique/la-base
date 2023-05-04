// https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface RdbReadReplicaConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#id RdbReadReplica#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Id of the rdb instance to replicate
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#instance_id RdbReadReplica#instance_id}
  */
  readonly instanceId: string;
  /**
  * The region you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#region RdbReadReplica#region}
  */
  readonly region?: string;
  /**
  * direct_access block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#direct_access RdbReadReplica#direct_access}
  */
  readonly directAccess?: RdbReadReplicaDirectAccess;
  /**
  * private_network block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#private_network RdbReadReplica#private_network}
  */
  readonly privateNetwork?: RdbReadReplicaPrivateNetwork;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#timeouts RdbReadReplica#timeouts}
  */
  readonly timeouts?: RdbReadReplicaTimeouts;
}
export interface RdbReadReplicaDirectAccess {
}

export function rdbReadReplicaDirectAccessToTerraform(struct?: RdbReadReplicaDirectAccessOutputReference | RdbReadReplicaDirectAccess): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}

export class RdbReadReplicaDirectAccessOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RdbReadReplicaDirectAccess | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbReadReplicaDirectAccess | undefined) {
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
export interface RdbReadReplicaPrivateNetwork {
  /**
  * UUID of the private network to be connected to the read replica (UUID format)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#private_network_id RdbReadReplica#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * The IP network address within the private subnet
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#service_ip RdbReadReplica#service_ip}
  */
  readonly serviceIp?: string;
}

export function rdbReadReplicaPrivateNetworkToTerraform(struct?: RdbReadReplicaPrivateNetworkOutputReference | RdbReadReplicaPrivateNetwork): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    private_network_id: cdktf.stringToTerraform(struct!.privateNetworkId),
    service_ip: cdktf.stringToTerraform(struct!.serviceIp),
  }
}

export class RdbReadReplicaPrivateNetworkOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false, 0);
  }

  public get internalValue(): RdbReadReplicaPrivateNetwork | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._privateNetworkId !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateNetworkId = this._privateNetworkId;
    }
    if (this._serviceIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.serviceIp = this._serviceIp;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: RdbReadReplicaPrivateNetwork | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this._privateNetworkId = undefined;
      this._serviceIp = undefined;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this._privateNetworkId = value.privateNetworkId;
      this._serviceIp = value.serviceIp;
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

  // private_network_id - computed: false, optional: false, required: true
  private _privateNetworkId?: string; 
  public get privateNetworkId() {
    return this.getStringAttribute('private_network_id');
  }
  public set privateNetworkId(value: string) {
    this._privateNetworkId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get privateNetworkIdInput() {
    return this._privateNetworkId;
  }

  // service_ip - computed: true, optional: true, required: false
  private _serviceIp?: string; 
  public get serviceIp() {
    return this.getStringAttribute('service_ip');
  }
  public set serviceIp(value: string) {
    this._serviceIp = value;
  }
  public resetServiceIp() {
    this._serviceIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get serviceIpInput() {
    return this._serviceIp;
  }

  // zone - computed: true, optional: false, required: false
  public get zone() {
    return this.getStringAttribute('zone');
  }
}
export interface RdbReadReplicaTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#create RdbReadReplica#create}
  */
  readonly create?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#default RdbReadReplica#default}
  */
  readonly default?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#delete RdbReadReplica#delete}
  */
  readonly delete?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#read RdbReadReplica#read}
  */
  readonly read?: string;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica#update RdbReadReplica#update}
  */
  readonly update?: string;
}

export function rdbReadReplicaTimeoutsToTerraform(struct?: RdbReadReplicaTimeouts | cdktf.IResolvable): any {
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

export class RdbReadReplicaTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): RdbReadReplicaTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: RdbReadReplicaTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica scaleway_rdb_read_replica}
*/
export class RdbReadReplica extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_rdb_read_replica";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.18.0/docs/resources/rdb_read_replica scaleway_rdb_read_replica} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options RdbReadReplicaConfig
  */
  public constructor(scope: Construct, id: string, config: RdbReadReplicaConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_rdb_read_replica',
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
    this._id = config.id;
    this._instanceId = config.instanceId;
    this._region = config.region;
    this._directAccess.internalValue = config.directAccess;
    this._privateNetwork.internalValue = config.privateNetwork;
    this._timeouts.internalValue = config.timeouts;
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

  // instance_id - computed: false, optional: false, required: true
  private _instanceId?: string; 
  public get instanceId() {
    return this.getStringAttribute('instance_id');
  }
  public set instanceId(value: string) {
    this._instanceId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get instanceIdInput() {
    return this._instanceId;
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

  // direct_access - computed: false, optional: true, required: false
  private _directAccess = new RdbReadReplicaDirectAccessOutputReference(this, "direct_access");
  public get directAccess() {
    return this._directAccess;
  }
  public putDirectAccess(value: RdbReadReplicaDirectAccess) {
    this._directAccess.internalValue = value;
  }
  public resetDirectAccess() {
    this._directAccess.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get directAccessInput() {
    return this._directAccess.internalValue;
  }

  // private_network - computed: false, optional: true, required: false
  private _privateNetwork = new RdbReadReplicaPrivateNetworkOutputReference(this, "private_network");
  public get privateNetwork() {
    return this._privateNetwork;
  }
  public putPrivateNetwork(value: RdbReadReplicaPrivateNetwork) {
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
  private _timeouts = new RdbReadReplicaTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: RdbReadReplicaTimeouts) {
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
      instance_id: cdktf.stringToTerraform(this._instanceId),
      region: cdktf.stringToTerraform(this._region),
      direct_access: rdbReadReplicaDirectAccessToTerraform(this._directAccess.internalValue),
      private_network: rdbReadReplicaPrivateNetworkToTerraform(this._privateNetwork.internalValue),
      timeouts: rdbReadReplicaTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
