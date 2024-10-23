// https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface VpcPublicGatewayDhcpConfig extends cdktf.TerraformMetaArguments {
  /**
  * The address of the DHCP server. This will be the gateway's address in the private network. Defaults to the first address of the subnet
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#address VpcPublicGatewayDhcp#address}
  */
  readonly address?: string;
  /**
  * TLD given to hostnames in the Private Network. Allowed characters are `a-z0-9-.`. Defaults to the slugified Private Network name if created along a GatewayNetwork, or else to `priv`.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#dns_local_name VpcPublicGatewayDhcp#dns_local_name}
  */
  readonly dnsLocalName?: string;
  /**
  * Additional DNS search paths.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#dns_search VpcPublicGatewayDhcp#dns_search}
  */
  readonly dnsSearch?: string[];
  /**
  * Override the DNS server list pushed to DHCP clients, instead of the gateway itself.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#dns_servers_override VpcPublicGatewayDhcp#dns_servers_override}
  */
  readonly dnsServersOverride?: string[];
  /**
  * Whether to enable dynamic pooling of IPs. By turning the dynamic pool off, only pre-existing DHCP reservations will be handed out. Defaults to true.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#enable_dynamic VpcPublicGatewayDhcp#enable_dynamic}
  */
  readonly enableDynamic?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#id VpcPublicGatewayDhcp#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * High IP (included) of the dynamic address pool. Defaults to the last address of the subnet.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#pool_high VpcPublicGatewayDhcp#pool_high}
  */
  readonly poolHigh?: string;
  /**
  * Low IP (included) of the dynamic address pool. Defaults to the second address of the subnet.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#pool_low VpcPublicGatewayDhcp#pool_low}
  */
  readonly poolLow?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#project_id VpcPublicGatewayDhcp#project_id}
  */
  readonly projectId?: string;
  /**
  * Whether the gateway should push a default route to DHCP clients or only hand out IPs. Defaults to true.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#push_default_route VpcPublicGatewayDhcp#push_default_route}
  */
  readonly pushDefaultRoute?: boolean | cdktf.IResolvable;
  /**
  * Whether the gateway should push custom DNS servers to clients. This allows for instance hostname -> IP resolution. Defaults to true.
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#push_dns_server VpcPublicGatewayDhcp#push_dns_server}
  */
  readonly pushDnsServer?: boolean | cdktf.IResolvable;
  /**
  * After how long, in seconds, a DHCP client will query for a new lease if previous renews fail. Must be 30s lower than `valid_lifetime`. Defaults to 51m (3060s).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#rebind_timer VpcPublicGatewayDhcp#rebind_timer}
  */
  readonly rebindTimer?: number;
  /**
  * After how long, in seconds, a renew will be attempted. Must be 30s lower than `rebind_timer`. Defaults to 50m (3000s).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#renew_timer VpcPublicGatewayDhcp#renew_timer}
  */
  readonly renewTimer?: number;
  /**
  * Subnet for the DHCP server
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#subnet VpcPublicGatewayDhcp#subnet}
  */
  readonly subnet: string;
  /**
  * For how long, in seconds, will DHCP entries will be valid. Defaults to 1h (3600s).
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#valid_lifetime VpcPublicGatewayDhcp#valid_lifetime}
  */
  readonly validLifetime?: number;
  /**
  * The zone you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#zone VpcPublicGatewayDhcp#zone}
  */
  readonly zone?: string;
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp scaleway_vpc_public_gateway_dhcp}
*/
export class VpcPublicGatewayDhcp extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_vpc_public_gateway_dhcp";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a VpcPublicGatewayDhcp resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the VpcPublicGatewayDhcp to import
  * @param importFromId The id of the existing VpcPublicGatewayDhcp that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the VpcPublicGatewayDhcp to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_vpc_public_gateway_dhcp", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.42.1/docs/resources/vpc_public_gateway_dhcp scaleway_vpc_public_gateway_dhcp} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options VpcPublicGatewayDhcpConfig
  */
  public constructor(scope: Construct, id: string, config: VpcPublicGatewayDhcpConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_vpc_public_gateway_dhcp',
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
    this._address = config.address;
    this._dnsLocalName = config.dnsLocalName;
    this._dnsSearch = config.dnsSearch;
    this._dnsServersOverride = config.dnsServersOverride;
    this._enableDynamic = config.enableDynamic;
    this._id = config.id;
    this._poolHigh = config.poolHigh;
    this._poolLow = config.poolLow;
    this._projectId = config.projectId;
    this._pushDefaultRoute = config.pushDefaultRoute;
    this._pushDnsServer = config.pushDnsServer;
    this._rebindTimer = config.rebindTimer;
    this._renewTimer = config.renewTimer;
    this._subnet = config.subnet;
    this._validLifetime = config.validLifetime;
    this._zone = config.zone;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // address - computed: true, optional: true, required: false
  private _address?: string; 
  public get address() {
    return this.getStringAttribute('address');
  }
  public set address(value: string) {
    this._address = value;
  }
  public resetAddress() {
    this._address = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get addressInput() {
    return this._address;
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // dns_local_name - computed: true, optional: true, required: false
  private _dnsLocalName?: string; 
  public get dnsLocalName() {
    return this.getStringAttribute('dns_local_name');
  }
  public set dnsLocalName(value: string) {
    this._dnsLocalName = value;
  }
  public resetDnsLocalName() {
    this._dnsLocalName = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsLocalNameInput() {
    return this._dnsLocalName;
  }

  // dns_search - computed: true, optional: true, required: false
  private _dnsSearch?: string[]; 
  public get dnsSearch() {
    return this.getListAttribute('dns_search');
  }
  public set dnsSearch(value: string[]) {
    this._dnsSearch = value;
  }
  public resetDnsSearch() {
    this._dnsSearch = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsSearchInput() {
    return this._dnsSearch;
  }

  // dns_servers_override - computed: true, optional: true, required: false
  private _dnsServersOverride?: string[]; 
  public get dnsServersOverride() {
    return this.getListAttribute('dns_servers_override');
  }
  public set dnsServersOverride(value: string[]) {
    this._dnsServersOverride = value;
  }
  public resetDnsServersOverride() {
    this._dnsServersOverride = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dnsServersOverrideInput() {
    return this._dnsServersOverride;
  }

  // enable_dynamic - computed: true, optional: true, required: false
  private _enableDynamic?: boolean | cdktf.IResolvable; 
  public get enableDynamic() {
    return this.getBooleanAttribute('enable_dynamic');
  }
  public set enableDynamic(value: boolean | cdktf.IResolvable) {
    this._enableDynamic = value;
  }
  public resetEnableDynamic() {
    this._enableDynamic = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableDynamicInput() {
    return this._enableDynamic;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
  }

  // pool_high - computed: true, optional: true, required: false
  private _poolHigh?: string; 
  public get poolHigh() {
    return this.getStringAttribute('pool_high');
  }
  public set poolHigh(value: string) {
    this._poolHigh = value;
  }
  public resetPoolHigh() {
    this._poolHigh = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get poolHighInput() {
    return this._poolHigh;
  }

  // pool_low - computed: true, optional: true, required: false
  private _poolLow?: string; 
  public get poolLow() {
    return this.getStringAttribute('pool_low');
  }
  public set poolLow(value: string) {
    this._poolLow = value;
  }
  public resetPoolLow() {
    this._poolLow = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get poolLowInput() {
    return this._poolLow;
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

  // push_default_route - computed: true, optional: true, required: false
  private _pushDefaultRoute?: boolean | cdktf.IResolvable; 
  public get pushDefaultRoute() {
    return this.getBooleanAttribute('push_default_route');
  }
  public set pushDefaultRoute(value: boolean | cdktf.IResolvable) {
    this._pushDefaultRoute = value;
  }
  public resetPushDefaultRoute() {
    this._pushDefaultRoute = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pushDefaultRouteInput() {
    return this._pushDefaultRoute;
  }

  // push_dns_server - computed: true, optional: true, required: false
  private _pushDnsServer?: boolean | cdktf.IResolvable; 
  public get pushDnsServer() {
    return this.getBooleanAttribute('push_dns_server');
  }
  public set pushDnsServer(value: boolean | cdktf.IResolvable) {
    this._pushDnsServer = value;
  }
  public resetPushDnsServer() {
    this._pushDnsServer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get pushDnsServerInput() {
    return this._pushDnsServer;
  }

  // rebind_timer - computed: true, optional: true, required: false
  private _rebindTimer?: number; 
  public get rebindTimer() {
    return this.getNumberAttribute('rebind_timer');
  }
  public set rebindTimer(value: number) {
    this._rebindTimer = value;
  }
  public resetRebindTimer() {
    this._rebindTimer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get rebindTimerInput() {
    return this._rebindTimer;
  }

  // renew_timer - computed: true, optional: true, required: false
  private _renewTimer?: number; 
  public get renewTimer() {
    return this.getNumberAttribute('renew_timer');
  }
  public set renewTimer(value: number) {
    this._renewTimer = value;
  }
  public resetRenewTimer() {
    this._renewTimer = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get renewTimerInput() {
    return this._renewTimer;
  }

  // subnet - computed: false, optional: false, required: true
  private _subnet?: string; 
  public get subnet() {
    return this.getStringAttribute('subnet');
  }
  public set subnet(value: string) {
    this._subnet = value;
  }
  // Temporarily expose input value. Use with caution.
  public get subnetInput() {
    return this._subnet;
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // valid_lifetime - computed: true, optional: true, required: false
  private _validLifetime?: number; 
  public get validLifetime() {
    return this.getNumberAttribute('valid_lifetime');
  }
  public set validLifetime(value: number) {
    this._validLifetime = value;
  }
  public resetValidLifetime() {
    this._validLifetime = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get validLifetimeInput() {
    return this._validLifetime;
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
      address: cdktf.stringToTerraform(this._address),
      dns_local_name: cdktf.stringToTerraform(this._dnsLocalName),
      dns_search: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dnsSearch),
      dns_servers_override: cdktf.listMapper(cdktf.stringToTerraform, false)(this._dnsServersOverride),
      enable_dynamic: cdktf.booleanToTerraform(this._enableDynamic),
      id: cdktf.stringToTerraform(this._id),
      pool_high: cdktf.stringToTerraform(this._poolHigh),
      pool_low: cdktf.stringToTerraform(this._poolLow),
      project_id: cdktf.stringToTerraform(this._projectId),
      push_default_route: cdktf.booleanToTerraform(this._pushDefaultRoute),
      push_dns_server: cdktf.booleanToTerraform(this._pushDnsServer),
      rebind_timer: cdktf.numberToTerraform(this._rebindTimer),
      renew_timer: cdktf.numberToTerraform(this._renewTimer),
      subnet: cdktf.stringToTerraform(this._subnet),
      valid_lifetime: cdktf.numberToTerraform(this._validLifetime),
      zone: cdktf.stringToTerraform(this._zone),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      address: {
        value: cdktf.stringToHclTerraform(this._address),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dns_local_name: {
        value: cdktf.stringToHclTerraform(this._dnsLocalName),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      dns_search: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dnsSearch),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      dns_servers_override: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._dnsServersOverride),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      enable_dynamic: {
        value: cdktf.booleanToHclTerraform(this._enableDynamic),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      id: {
        value: cdktf.stringToHclTerraform(this._id),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pool_high: {
        value: cdktf.stringToHclTerraform(this._poolHigh),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      pool_low: {
        value: cdktf.stringToHclTerraform(this._poolLow),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      project_id: {
        value: cdktf.stringToHclTerraform(this._projectId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      push_default_route: {
        value: cdktf.booleanToHclTerraform(this._pushDefaultRoute),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      push_dns_server: {
        value: cdktf.booleanToHclTerraform(this._pushDnsServer),
        isBlock: false,
        type: "simple",
        storageClassType: "boolean",
      },
      rebind_timer: {
        value: cdktf.numberToHclTerraform(this._rebindTimer),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      renew_timer: {
        value: cdktf.numberToHclTerraform(this._renewTimer),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      subnet: {
        value: cdktf.stringToHclTerraform(this._subnet),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      valid_lifetime: {
        value: cdktf.numberToHclTerraform(this._validLifetime),
        isBlock: false,
        type: "simple",
        storageClassType: "number",
      },
      zone: {
        value: cdktf.stringToHclTerraform(this._zone),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
