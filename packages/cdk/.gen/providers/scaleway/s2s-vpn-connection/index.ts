// https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface S2SVpnConnectionConfig extends cdktf.TerraformMetaArguments {
  /**
  * The ID of the customer gateway to attach to the connection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#customer_gateway_id S2SVpnConnection#customer_gateway_id}
  */
  readonly customerGatewayId?: string;
  /**
  * Defines whether route propagation is enabled or not
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#enable_route_propagation S2SVpnConnection#enable_route_propagation}
  */
  readonly enableRoutePropagation?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#id S2SVpnConnection#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Defines who initiates the IPsec tunnel
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#initiation_policy S2SVpnConnection#initiation_policy}
  */
  readonly initiationPolicy?: string;
  /**
  * Defines IP version of the IPSec Tunnel
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#is_ipv6 S2SVpnConnection#is_ipv6}
  */
  readonly isIpv6?: boolean | cdktf.IResolvable;
  /**
  * The name of the connection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#name S2SVpnConnection#name}
  */
  readonly name?: string;
  /**
  * The project_id you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#project_id S2SVpnConnection#project_id}
  */
  readonly projectId?: string;
  /**
  * The region you want to attach the resource to
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#region S2SVpnConnection#region}
  */
  readonly region?: string;
  /**
  * The list of tags to apply to the connection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#tags S2SVpnConnection#tags}
  */
  readonly tags?: string[];
  /**
  * The ID of the VPN gateway to attach to the connection
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#vpn_gateway_id S2SVpnConnection#vpn_gateway_id}
  */
  readonly vpnGatewayId?: string;
  /**
  * bgp_config_ipv4 block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#bgp_config_ipv4 S2SVpnConnection#bgp_config_ipv4}
  */
  readonly bgpConfigIpv4?: S2SVpnConnectionBgpConfigIpv4[] | cdktf.IResolvable;
  /**
  * bgp_config_ipv6 block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#bgp_config_ipv6 S2SVpnConnection#bgp_config_ipv6}
  */
  readonly bgpConfigIpv6?: S2SVpnConnectionBgpConfigIpv6[] | cdktf.IResolvable;
  /**
  * esp_ciphers block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#esp_ciphers S2SVpnConnection#esp_ciphers}
  */
  readonly espCiphers?: S2SVpnConnectionEspCiphers[] | cdktf.IResolvable;
  /**
  * ikev2_ciphers block
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#ikev2_ciphers S2SVpnConnection#ikev2_ciphers}
  */
  readonly ikev2Ciphers?: S2SVpnConnectionIkev2Ciphers[] | cdktf.IResolvable;
}
export interface S2SVpnConnectionBgpSessionIpv4 {
}

export function s2SVpnConnectionBgpSessionIpv4ToTerraform(struct?: S2SVpnConnectionBgpSessionIpv4): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function s2SVpnConnectionBgpSessionIpv4ToHclTerraform(struct?: S2SVpnConnectionBgpSessionIpv4): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class S2SVpnConnectionBgpSessionIpv4OutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionBgpSessionIpv4 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionBgpSessionIpv4 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // peer_private_ip - computed: true, optional: false, required: false
  public get peerPrivateIp() {
    return this.getStringAttribute('peer_private_ip');
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // routing_policy_id - computed: true, optional: false, required: false
  public get routingPolicyId() {
    return this.getStringAttribute('routing_policy_id');
  }
}

export class S2SVpnConnectionBgpSessionIpv4List extends cdktf.ComplexList {

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
  public get(index: number): S2SVpnConnectionBgpSessionIpv4OutputReference {
    return new S2SVpnConnectionBgpSessionIpv4OutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnConnectionBgpSessionIpv6 {
}

export function s2SVpnConnectionBgpSessionIpv6ToTerraform(struct?: S2SVpnConnectionBgpSessionIpv6): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
  }
}


export function s2SVpnConnectionBgpSessionIpv6ToHclTerraform(struct?: S2SVpnConnectionBgpSessionIpv6): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
  };
  return attrs;
}

export class S2SVpnConnectionBgpSessionIpv6OutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionBgpSessionIpv6 | undefined {
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionBgpSessionIpv6 | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
    }
  }

  // peer_private_ip - computed: true, optional: false, required: false
  public get peerPrivateIp() {
    return this.getStringAttribute('peer_private_ip');
  }

  // private_ip - computed: true, optional: false, required: false
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }

  // routing_policy_id - computed: true, optional: false, required: false
  public get routingPolicyId() {
    return this.getStringAttribute('routing_policy_id');
  }
}

export class S2SVpnConnectionBgpSessionIpv6List extends cdktf.ComplexList {

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
  public get(index: number): S2SVpnConnectionBgpSessionIpv6OutputReference {
    return new S2SVpnConnectionBgpSessionIpv6OutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnConnectionBgpConfigIpv4 {
  /**
  * The BGP peer IP on customer side
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#peer_private_ip S2SVpnConnection#peer_private_ip}
  */
  readonly peerPrivateIp?: string;
  /**
  * The BGP peer IP on Scaleway side
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#private_ip S2SVpnConnection#private_ip}
  */
  readonly privateIp?: string;
  /**
  * The ID of the routing policy to use for BGP route filtering
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#routing_policy_id S2SVpnConnection#routing_policy_id}
  */
  readonly routingPolicyId: string;
}

export function s2SVpnConnectionBgpConfigIpv4ToTerraform(struct?: S2SVpnConnectionBgpConfigIpv4 | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    peer_private_ip: cdktf.stringToTerraform(struct!.peerPrivateIp),
    private_ip: cdktf.stringToTerraform(struct!.privateIp),
    routing_policy_id: cdktf.stringToTerraform(struct!.routingPolicyId),
  }
}


export function s2SVpnConnectionBgpConfigIpv4ToHclTerraform(struct?: S2SVpnConnectionBgpConfigIpv4 | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    peer_private_ip: {
      value: cdktf.stringToHclTerraform(struct!.peerPrivateIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    private_ip: {
      value: cdktf.stringToHclTerraform(struct!.privateIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    routing_policy_id: {
      value: cdktf.stringToHclTerraform(struct!.routingPolicyId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class S2SVpnConnectionBgpConfigIpv4OutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionBgpConfigIpv4 | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._peerPrivateIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerPrivateIp = this._peerPrivateIp;
    }
    if (this._privateIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateIp = this._privateIp;
    }
    if (this._routingPolicyId !== undefined) {
      hasAnyValues = true;
      internalValueResult.routingPolicyId = this._routingPolicyId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionBgpConfigIpv4 | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._peerPrivateIp = undefined;
      this._privateIp = undefined;
      this._routingPolicyId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._peerPrivateIp = value.peerPrivateIp;
      this._privateIp = value.privateIp;
      this._routingPolicyId = value.routingPolicyId;
    }
  }

  // peer_private_ip - computed: false, optional: true, required: false
  private _peerPrivateIp?: string; 
  public get peerPrivateIp() {
    return this.getStringAttribute('peer_private_ip');
  }
  public set peerPrivateIp(value: string) {
    this._peerPrivateIp = value;
  }
  public resetPeerPrivateIp() {
    this._peerPrivateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerPrivateIpInput() {
    return this._peerPrivateIp;
  }

  // private_ip - computed: false, optional: true, required: false
  private _privateIp?: string; 
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }
  public set privateIp(value: string) {
    this._privateIp = value;
  }
  public resetPrivateIp() {
    this._privateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpInput() {
    return this._privateIp;
  }

  // routing_policy_id - computed: false, optional: false, required: true
  private _routingPolicyId?: string; 
  public get routingPolicyId() {
    return this.getStringAttribute('routing_policy_id');
  }
  public set routingPolicyId(value: string) {
    this._routingPolicyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get routingPolicyIdInput() {
    return this._routingPolicyId;
  }
}

export class S2SVpnConnectionBgpConfigIpv4List extends cdktf.ComplexList {
  public internalValue? : S2SVpnConnectionBgpConfigIpv4[] | cdktf.IResolvable

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
  public get(index: number): S2SVpnConnectionBgpConfigIpv4OutputReference {
    return new S2SVpnConnectionBgpConfigIpv4OutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnConnectionBgpConfigIpv6 {
  /**
  * The BGP peer IP on customer side
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#peer_private_ip S2SVpnConnection#peer_private_ip}
  */
  readonly peerPrivateIp?: string;
  /**
  * The BGP peer IP on Scaleway side
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#private_ip S2SVpnConnection#private_ip}
  */
  readonly privateIp?: string;
  /**
  * The ID of the routing policy to use for BGP route filtering
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#routing_policy_id S2SVpnConnection#routing_policy_id}
  */
  readonly routingPolicyId: string;
}

export function s2SVpnConnectionBgpConfigIpv6ToTerraform(struct?: S2SVpnConnectionBgpConfigIpv6 | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    peer_private_ip: cdktf.stringToTerraform(struct!.peerPrivateIp),
    private_ip: cdktf.stringToTerraform(struct!.privateIp),
    routing_policy_id: cdktf.stringToTerraform(struct!.routingPolicyId),
  }
}


export function s2SVpnConnectionBgpConfigIpv6ToHclTerraform(struct?: S2SVpnConnectionBgpConfigIpv6 | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    peer_private_ip: {
      value: cdktf.stringToHclTerraform(struct!.peerPrivateIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    private_ip: {
      value: cdktf.stringToHclTerraform(struct!.privateIp),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    routing_policy_id: {
      value: cdktf.stringToHclTerraform(struct!.routingPolicyId),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class S2SVpnConnectionBgpConfigIpv6OutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionBgpConfigIpv6 | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._peerPrivateIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.peerPrivateIp = this._peerPrivateIp;
    }
    if (this._privateIp !== undefined) {
      hasAnyValues = true;
      internalValueResult.privateIp = this._privateIp;
    }
    if (this._routingPolicyId !== undefined) {
      hasAnyValues = true;
      internalValueResult.routingPolicyId = this._routingPolicyId;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionBgpConfigIpv6 | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._peerPrivateIp = undefined;
      this._privateIp = undefined;
      this._routingPolicyId = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._peerPrivateIp = value.peerPrivateIp;
      this._privateIp = value.privateIp;
      this._routingPolicyId = value.routingPolicyId;
    }
  }

  // peer_private_ip - computed: false, optional: true, required: false
  private _peerPrivateIp?: string; 
  public get peerPrivateIp() {
    return this.getStringAttribute('peer_private_ip');
  }
  public set peerPrivateIp(value: string) {
    this._peerPrivateIp = value;
  }
  public resetPeerPrivateIp() {
    this._peerPrivateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get peerPrivateIpInput() {
    return this._peerPrivateIp;
  }

  // private_ip - computed: false, optional: true, required: false
  private _privateIp?: string; 
  public get privateIp() {
    return this.getStringAttribute('private_ip');
  }
  public set privateIp(value: string) {
    this._privateIp = value;
  }
  public resetPrivateIp() {
    this._privateIp = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get privateIpInput() {
    return this._privateIp;
  }

  // routing_policy_id - computed: false, optional: false, required: true
  private _routingPolicyId?: string; 
  public get routingPolicyId() {
    return this.getStringAttribute('routing_policy_id');
  }
  public set routingPolicyId(value: string) {
    this._routingPolicyId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get routingPolicyIdInput() {
    return this._routingPolicyId;
  }
}

export class S2SVpnConnectionBgpConfigIpv6List extends cdktf.ComplexList {
  public internalValue? : S2SVpnConnectionBgpConfigIpv6[] | cdktf.IResolvable

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
  public get(index: number): S2SVpnConnectionBgpConfigIpv6OutputReference {
    return new S2SVpnConnectionBgpConfigIpv6OutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnConnectionEspCiphers {
  /**
  * The Diffie-Hellman group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#dh_group S2SVpnConnection#dh_group}
  */
  readonly dhGroup?: string;
  /**
  * The encryption algorithm
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#encryption S2SVpnConnection#encryption}
  */
  readonly encryption: string;
  /**
  * The integrity/hash algorithm
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#integrity S2SVpnConnection#integrity}
  */
  readonly integrity?: string;
}

export function s2SVpnConnectionEspCiphersToTerraform(struct?: S2SVpnConnectionEspCiphers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dh_group: cdktf.stringToTerraform(struct!.dhGroup),
    encryption: cdktf.stringToTerraform(struct!.encryption),
    integrity: cdktf.stringToTerraform(struct!.integrity),
  }
}


export function s2SVpnConnectionEspCiphersToHclTerraform(struct?: S2SVpnConnectionEspCiphers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dh_group: {
      value: cdktf.stringToHclTerraform(struct!.dhGroup),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    encryption: {
      value: cdktf.stringToHclTerraform(struct!.encryption),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    integrity: {
      value: cdktf.stringToHclTerraform(struct!.integrity),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class S2SVpnConnectionEspCiphersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionEspCiphers | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dhGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.dhGroup = this._dhGroup;
    }
    if (this._encryption !== undefined) {
      hasAnyValues = true;
      internalValueResult.encryption = this._encryption;
    }
    if (this._integrity !== undefined) {
      hasAnyValues = true;
      internalValueResult.integrity = this._integrity;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionEspCiphers | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._dhGroup = undefined;
      this._encryption = undefined;
      this._integrity = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._dhGroup = value.dhGroup;
      this._encryption = value.encryption;
      this._integrity = value.integrity;
    }
  }

  // dh_group - computed: false, optional: true, required: false
  private _dhGroup?: string; 
  public get dhGroup() {
    return this.getStringAttribute('dh_group');
  }
  public set dhGroup(value: string) {
    this._dhGroup = value;
  }
  public resetDhGroup() {
    this._dhGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dhGroupInput() {
    return this._dhGroup;
  }

  // encryption - computed: false, optional: false, required: true
  private _encryption?: string; 
  public get encryption() {
    return this.getStringAttribute('encryption');
  }
  public set encryption(value: string) {
    this._encryption = value;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionInput() {
    return this._encryption;
  }

  // integrity - computed: false, optional: true, required: false
  private _integrity?: string; 
  public get integrity() {
    return this.getStringAttribute('integrity');
  }
  public set integrity(value: string) {
    this._integrity = value;
  }
  public resetIntegrity() {
    this._integrity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get integrityInput() {
    return this._integrity;
  }
}

export class S2SVpnConnectionEspCiphersList extends cdktf.ComplexList {
  public internalValue? : S2SVpnConnectionEspCiphers[] | cdktf.IResolvable

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
  public get(index: number): S2SVpnConnectionEspCiphersOutputReference {
    return new S2SVpnConnectionEspCiphersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface S2SVpnConnectionIkev2Ciphers {
  /**
  * The Diffie-Hellman group
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#dh_group S2SVpnConnection#dh_group}
  */
  readonly dhGroup?: string;
  /**
  * The encryption algorithm
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#encryption S2SVpnConnection#encryption}
  */
  readonly encryption: string;
  /**
  * The integrity/hash algorithm
  *
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#integrity S2SVpnConnection#integrity}
  */
  readonly integrity?: string;
}

export function s2SVpnConnectionIkev2CiphersToTerraform(struct?: S2SVpnConnectionIkev2Ciphers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    dh_group: cdktf.stringToTerraform(struct!.dhGroup),
    encryption: cdktf.stringToTerraform(struct!.encryption),
    integrity: cdktf.stringToTerraform(struct!.integrity),
  }
}


export function s2SVpnConnectionIkev2CiphersToHclTerraform(struct?: S2SVpnConnectionIkev2Ciphers | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  const attrs = {
    dh_group: {
      value: cdktf.stringToHclTerraform(struct!.dhGroup),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    encryption: {
      value: cdktf.stringToHclTerraform(struct!.encryption),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
    integrity: {
      value: cdktf.stringToHclTerraform(struct!.integrity),
      isBlock: false,
      type: "simple",
      storageClassType: "string",
    },
  };

  // remove undefined attributes
  return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined));
}

export class S2SVpnConnectionIkev2CiphersOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): S2SVpnConnectionIkev2Ciphers | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._dhGroup !== undefined) {
      hasAnyValues = true;
      internalValueResult.dhGroup = this._dhGroup;
    }
    if (this._encryption !== undefined) {
      hasAnyValues = true;
      internalValueResult.encryption = this._encryption;
    }
    if (this._integrity !== undefined) {
      hasAnyValues = true;
      internalValueResult.integrity = this._integrity;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: S2SVpnConnectionIkev2Ciphers | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._dhGroup = undefined;
      this._encryption = undefined;
      this._integrity = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._dhGroup = value.dhGroup;
      this._encryption = value.encryption;
      this._integrity = value.integrity;
    }
  }

  // dh_group - computed: false, optional: true, required: false
  private _dhGroup?: string; 
  public get dhGroup() {
    return this.getStringAttribute('dh_group');
  }
  public set dhGroup(value: string) {
    this._dhGroup = value;
  }
  public resetDhGroup() {
    this._dhGroup = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get dhGroupInput() {
    return this._dhGroup;
  }

  // encryption - computed: false, optional: false, required: true
  private _encryption?: string; 
  public get encryption() {
    return this.getStringAttribute('encryption');
  }
  public set encryption(value: string) {
    this._encryption = value;
  }
  // Temporarily expose input value. Use with caution.
  public get encryptionInput() {
    return this._encryption;
  }

  // integrity - computed: false, optional: true, required: false
  private _integrity?: string; 
  public get integrity() {
    return this.getStringAttribute('integrity');
  }
  public set integrity(value: string) {
    this._integrity = value;
  }
  public resetIntegrity() {
    this._integrity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get integrityInput() {
    return this._integrity;
  }
}

export class S2SVpnConnectionIkev2CiphersList extends cdktf.ComplexList {
  public internalValue? : S2SVpnConnectionIkev2Ciphers[] | cdktf.IResolvable

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
  public get(index: number): S2SVpnConnectionIkev2CiphersOutputReference {
    return new S2SVpnConnectionIkev2CiphersOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}

/**
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection scaleway_s2s_vpn_connection}
*/
export class S2SVpnConnection extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_s2s_vpn_connection";

  // ==============
  // STATIC Methods
  // ==============
  /**
  * Generates CDKTF code for importing a S2SVpnConnection resource upon running "cdktf plan <stack-name>"
  * @param scope The scope in which to define this construct
  * @param importToId The construct id used in the generated config for the S2SVpnConnection to import
  * @param importFromId The id of the existing S2SVpnConnection that should be imported. Refer to the {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection#import import section} in the documentation of this resource for the id to use
  * @param provider? Optional instance of the provider where the S2SVpnConnection to import is found
  */
  public static generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: cdktf.TerraformProvider) {
        return new cdktf.ImportableResource(scope, importToId, { terraformResourceType: "scaleway_s2s_vpn_connection", importId: importFromId, provider });
      }

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.81.0/docs/resources/s2s_vpn_connection scaleway_s2s_vpn_connection} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options S2SVpnConnectionConfig = {}
  */
  public constructor(scope: Construct, id: string, config: S2SVpnConnectionConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_s2s_vpn_connection',
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
    this._customerGatewayId = config.customerGatewayId;
    this._enableRoutePropagation = config.enableRoutePropagation;
    this._id = config.id;
    this._initiationPolicy = config.initiationPolicy;
    this._isIpv6 = config.isIpv6;
    this._name = config.name;
    this._projectId = config.projectId;
    this._region = config.region;
    this._tags = config.tags;
    this._vpnGatewayId = config.vpnGatewayId;
    this._bgpConfigIpv4.internalValue = config.bgpConfigIpv4;
    this._bgpConfigIpv6.internalValue = config.bgpConfigIpv6;
    this._espCiphers.internalValue = config.espCiphers;
    this._ikev2Ciphers.internalValue = config.ikev2Ciphers;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // bgp_session_ipv4 - computed: true, optional: false, required: false
  private _bgpSessionIpv4 = new S2SVpnConnectionBgpSessionIpv4List(this, "bgp_session_ipv4", false);
  public get bgpSessionIpv4() {
    return this._bgpSessionIpv4;
  }

  // bgp_session_ipv6 - computed: true, optional: false, required: false
  private _bgpSessionIpv6 = new S2SVpnConnectionBgpSessionIpv6List(this, "bgp_session_ipv6", false);
  public get bgpSessionIpv6() {
    return this._bgpSessionIpv6;
  }

  // bgp_status_ipv4 - computed: true, optional: false, required: false
  public get bgpStatusIpv4() {
    return this.getStringAttribute('bgp_status_ipv4');
  }

  // bgp_status_ipv6 - computed: true, optional: false, required: false
  public get bgpStatusIpv6() {
    return this.getStringAttribute('bgp_status_ipv6');
  }

  // created_at - computed: true, optional: false, required: false
  public get createdAt() {
    return this.getStringAttribute('created_at');
  }

  // customer_gateway_id - computed: true, optional: true, required: false
  private _customerGatewayId?: string; 
  public get customerGatewayId() {
    return this.getStringAttribute('customer_gateway_id');
  }
  public set customerGatewayId(value: string) {
    this._customerGatewayId = value;
  }
  public resetCustomerGatewayId() {
    this._customerGatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get customerGatewayIdInput() {
    return this._customerGatewayId;
  }

  // enable_route_propagation - computed: true, optional: true, required: false
  private _enableRoutePropagation?: boolean | cdktf.IResolvable; 
  public get enableRoutePropagation() {
    return this.getBooleanAttribute('enable_route_propagation');
  }
  public set enableRoutePropagation(value: boolean | cdktf.IResolvable) {
    this._enableRoutePropagation = value;
  }
  public resetEnableRoutePropagation() {
    this._enableRoutePropagation = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableRoutePropagationInput() {
    return this._enableRoutePropagation;
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

  // initiation_policy - computed: true, optional: true, required: false
  private _initiationPolicy?: string; 
  public get initiationPolicy() {
    return this.getStringAttribute('initiation_policy');
  }
  public set initiationPolicy(value: string) {
    this._initiationPolicy = value;
  }
  public resetInitiationPolicy() {
    this._initiationPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get initiationPolicyInput() {
    return this._initiationPolicy;
  }

  // is_ipv6 - computed: true, optional: true, required: false
  private _isIpv6?: boolean | cdktf.IResolvable; 
  public get isIpv6() {
    return this.getBooleanAttribute('is_ipv6');
  }
  public set isIpv6(value: boolean | cdktf.IResolvable) {
    this._isIpv6 = value;
  }
  public resetIsIpv6() {
    this._isIpv6 = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get isIpv6Input() {
    return this._isIpv6;
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

  // organization_id - computed: true, optional: false, required: false
  public get organizationId() {
    return this.getStringAttribute('organization_id');
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

  // route_propagation_enabled - computed: true, optional: false, required: false
  public get routePropagationEnabled() {
    return this.getBooleanAttribute('route_propagation_enabled');
  }

  // secret_id - computed: true, optional: false, required: false
  public get secretId() {
    return this.getStringAttribute('secret_id');
  }

  // secret_version - computed: true, optional: false, required: false
  public get secretVersion() {
    return this.getNumberAttribute('secret_version');
  }

  // status - computed: true, optional: false, required: false
  public get status() {
    return this.getStringAttribute('status');
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

  // tunnel_status - computed: true, optional: false, required: false
  public get tunnelStatus() {
    return this.getStringAttribute('tunnel_status');
  }

  // updated_at - computed: true, optional: false, required: false
  public get updatedAt() {
    return this.getStringAttribute('updated_at');
  }

  // vpn_gateway_id - computed: true, optional: true, required: false
  private _vpnGatewayId?: string; 
  public get vpnGatewayId() {
    return this.getStringAttribute('vpn_gateway_id');
  }
  public set vpnGatewayId(value: string) {
    this._vpnGatewayId = value;
  }
  public resetVpnGatewayId() {
    this._vpnGatewayId = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get vpnGatewayIdInput() {
    return this._vpnGatewayId;
  }

  // bgp_config_ipv4 - computed: false, optional: true, required: false
  private _bgpConfigIpv4 = new S2SVpnConnectionBgpConfigIpv4List(this, "bgp_config_ipv4", false);
  public get bgpConfigIpv4() {
    return this._bgpConfigIpv4;
  }
  public putBgpConfigIpv4(value: S2SVpnConnectionBgpConfigIpv4[] | cdktf.IResolvable) {
    this._bgpConfigIpv4.internalValue = value;
  }
  public resetBgpConfigIpv4() {
    this._bgpConfigIpv4.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bgpConfigIpv4Input() {
    return this._bgpConfigIpv4.internalValue;
  }

  // bgp_config_ipv6 - computed: false, optional: true, required: false
  private _bgpConfigIpv6 = new S2SVpnConnectionBgpConfigIpv6List(this, "bgp_config_ipv6", false);
  public get bgpConfigIpv6() {
    return this._bgpConfigIpv6;
  }
  public putBgpConfigIpv6(value: S2SVpnConnectionBgpConfigIpv6[] | cdktf.IResolvable) {
    this._bgpConfigIpv6.internalValue = value;
  }
  public resetBgpConfigIpv6() {
    this._bgpConfigIpv6.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get bgpConfigIpv6Input() {
    return this._bgpConfigIpv6.internalValue;
  }

  // esp_ciphers - computed: false, optional: true, required: false
  private _espCiphers = new S2SVpnConnectionEspCiphersList(this, "esp_ciphers", false);
  public get espCiphers() {
    return this._espCiphers;
  }
  public putEspCiphers(value: S2SVpnConnectionEspCiphers[] | cdktf.IResolvable) {
    this._espCiphers.internalValue = value;
  }
  public resetEspCiphers() {
    this._espCiphers.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get espCiphersInput() {
    return this._espCiphers.internalValue;
  }

  // ikev2_ciphers - computed: false, optional: true, required: false
  private _ikev2Ciphers = new S2SVpnConnectionIkev2CiphersList(this, "ikev2_ciphers", false);
  public get ikev2Ciphers() {
    return this._ikev2Ciphers;
  }
  public putIkev2Ciphers(value: S2SVpnConnectionIkev2Ciphers[] | cdktf.IResolvable) {
    this._ikev2Ciphers.internalValue = value;
  }
  public resetIkev2Ciphers() {
    this._ikev2Ciphers.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ikev2CiphersInput() {
    return this._ikev2Ciphers.internalValue;
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      customer_gateway_id: cdktf.stringToTerraform(this._customerGatewayId),
      enable_route_propagation: cdktf.booleanToTerraform(this._enableRoutePropagation),
      id: cdktf.stringToTerraform(this._id),
      initiation_policy: cdktf.stringToTerraform(this._initiationPolicy),
      is_ipv6: cdktf.booleanToTerraform(this._isIpv6),
      name: cdktf.stringToTerraform(this._name),
      project_id: cdktf.stringToTerraform(this._projectId),
      region: cdktf.stringToTerraform(this._region),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      vpn_gateway_id: cdktf.stringToTerraform(this._vpnGatewayId),
      bgp_config_ipv4: cdktf.listMapper(s2SVpnConnectionBgpConfigIpv4ToTerraform, true)(this._bgpConfigIpv4.internalValue),
      bgp_config_ipv6: cdktf.listMapper(s2SVpnConnectionBgpConfigIpv6ToTerraform, true)(this._bgpConfigIpv6.internalValue),
      esp_ciphers: cdktf.listMapper(s2SVpnConnectionEspCiphersToTerraform, true)(this._espCiphers.internalValue),
      ikev2_ciphers: cdktf.listMapper(s2SVpnConnectionIkev2CiphersToTerraform, true)(this._ikev2Ciphers.internalValue),
    };
  }

  protected synthesizeHclAttributes(): { [name: string]: any } {
    const attrs = {
      customer_gateway_id: {
        value: cdktf.stringToHclTerraform(this._customerGatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      enable_route_propagation: {
        value: cdktf.booleanToHclTerraform(this._enableRoutePropagation),
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
      initiation_policy: {
        value: cdktf.stringToHclTerraform(this._initiationPolicy),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      is_ipv6: {
        value: cdktf.booleanToHclTerraform(this._isIpv6),
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
      tags: {
        value: cdktf.listMapperHcl(cdktf.stringToHclTerraform, false)(this._tags),
        isBlock: false,
        type: "list",
        storageClassType: "stringList",
      },
      vpn_gateway_id: {
        value: cdktf.stringToHclTerraform(this._vpnGatewayId),
        isBlock: false,
        type: "simple",
        storageClassType: "string",
      },
      bgp_config_ipv4: {
        value: cdktf.listMapperHcl(s2SVpnConnectionBgpConfigIpv4ToHclTerraform, true)(this._bgpConfigIpv4.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "S2SVpnConnectionBgpConfigIpv4List",
      },
      bgp_config_ipv6: {
        value: cdktf.listMapperHcl(s2SVpnConnectionBgpConfigIpv6ToHclTerraform, true)(this._bgpConfigIpv6.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "S2SVpnConnectionBgpConfigIpv6List",
      },
      esp_ciphers: {
        value: cdktf.listMapperHcl(s2SVpnConnectionEspCiphersToHclTerraform, true)(this._espCiphers.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "S2SVpnConnectionEspCiphersList",
      },
      ikev2_ciphers: {
        value: cdktf.listMapperHcl(s2SVpnConnectionIkev2CiphersToHclTerraform, true)(this._ikev2Ciphers.internalValue),
        isBlock: true,
        type: "list",
        storageClassType: "S2SVpnConnectionIkev2CiphersList",
      },
    };

    // remove undefined attributes
    return Object.fromEntries(Object.entries(attrs).filter(([_, value]) => value !== undefined && value.value !== undefined ))
  }
}
