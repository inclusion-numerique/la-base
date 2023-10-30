// https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface DocumentdbPrivateNetworkEndpointConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#id DocumentdbPrivateNetworkEndpoint#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Instance on which the endpoint is attached
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#instance_id DocumentdbPrivateNetworkEndpoint#instance_id}
  */
  readonly instanceId: string;
  /**
  * The IP with the given mask within the private subnet
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#ip_net DocumentdbPrivateNetworkEndpoint#ip_net}
  */
  readonly ipNet?: string;
  /**
  * The port of your private service
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#port DocumentdbPrivateNetworkEndpoint#port}
  */
  readonly port?: number;
  /**
  * The private network ID
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#private_network_id DocumentdbPrivateNetworkEndpoint#private_network_id}
  */
  readonly privateNetworkId: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#region DocumentdbPrivateNetworkEndpoint#region}
  */
  readonly region?: string;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#zone DocumentdbPrivateNetworkEndpoint#zone}
  */
  readonly zone?: string;
  /**
  * timeouts block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#timeouts DocumentdbPrivateNetworkEndpoint#timeouts}
  */
  readonly timeouts?: DocumentdbPrivateNetworkEndpointTimeouts;
}
export interface DocumentdbPrivateNetworkEndpointTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#default DocumentdbPrivateNetworkEndpoint#default}
  */
  readonly default?: string;
}

export function documentdbPrivateNetworkEndpointTimeoutsToTerraform(struct?: DocumentdbPrivateNetworkEndpointTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}

export class DocumentdbPrivateNetworkEndpointTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): DocumentdbPrivateNetworkEndpointTimeouts | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._default !== undefined) {
      hasAnyValues = true;
      internalValueResult.default = this._default;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: DocumentdbPrivateNetworkEndpointTimeouts | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._default = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._default = value.default;
    }
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
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint scaleway_documentdb_private_network_endpoint}
*/
export class DocumentdbPrivateNetworkEndpoint extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_documentdb_private_network_endpoint";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a DocumentdbPrivateNetworkEndpoint resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the DocumentdbPrivateNetworkEndpoint to import
  * @param importFromId The id of the existing DocumentdbPrivateNetworkEndpoint that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the DocumentdbPrivateNetworkEndpoint to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_documentdb_private_network_endpoint", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.31.0/docs/resources/documentdb_private_network_endpoint scaleway_documentdb_private_network_endpoint} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options DocumentdbPrivateNetworkEndpointConfig
  */
  public constructor(scope: Construct, id: string, config: DocumentdbPrivateNetworkEndpointConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_documentdb_private_network_endpoint',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.31.0',
        providerVersionConstraint: '>= 2.31.0'
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
    this._ipNet = config.ipNet;
    this._port = config.port;
    this._privateNetworkId = config.privateNetworkId;
    this._region = config.region;
    this._zone = config.zone;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // hostname - computed: true, optional: false, required: false
  public get hostname() {
    return this.getStringAttribute('hostname');
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

  // ip - computed: true, optional: false, required: false
  public get ip() {
    return this.getStringAttribute('ip');
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

  // name - computed: true, optional: false, required: false
  public get name() {
    return this.getStringAttribute('name');
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

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new DocumentdbPrivateNetworkEndpointTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: DocumentdbPrivateNetworkEndpointTimeouts) {
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
      ip_net: cdktf.stringToTerraform(this._ipNet),
      port: cdktf.numberToTerraform(this._port),
      private_network_id: cdktf.stringToTerraform(this._privateNetworkId),
      region: cdktf.stringToTerraform(this._region),
      zone: cdktf.stringToTerraform(this._zone),
      timeouts: documentdbPrivateNetworkEndpointTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
