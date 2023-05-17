// https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface InstanceSecurityGroupRulesConfig extends cdktf.TerraformMetaArguments {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#id InstanceSecurityGroupRules#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * The security group associated with this volume
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#security_group_id InstanceSecurityGroupRules#security_group_id}
  */
  readonly securityGroupId: string;
  /**
  * inbound_rule block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#inbound_rule InstanceSecurityGroupRules#inbound_rule}
  */
  readonly inboundRule?: InstanceSecurityGroupRulesInboundRule[] | cdktf.IResolvable;
  /**
  * outbound_rule block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#outbound_rule InstanceSecurityGroupRules#outbound_rule}
  */
  readonly outboundRule?: InstanceSecurityGroupRulesOutboundRule[] | cdktf.IResolvable;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#timeouts InstanceSecurityGroupRules#timeouts}
  */
  readonly timeouts?: InstanceSecurityGroupRulesTimeouts;
}
export interface InstanceSecurityGroupRulesInboundRule {
  /**
  * Action when rule match request (drop or accept)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#action InstanceSecurityGroupRules#action}
  */
  readonly action: string;
  /**
  * Ip address for this rule (e.g: 1.1.1.1). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#ip InstanceSecurityGroupRules#ip}
  */
  readonly ip?: string;
  /**
  * Ip range for this rule (e.g: 192.168.1.0/24). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#ip_range InstanceSecurityGroupRules#ip_range}
  */
  readonly ipRange?: string;
  /**
  * Network port for this rule
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#port InstanceSecurityGroupRules#port}
  */
  readonly port?: number;
  /**
  * Computed port range for this rule (e.g: 1-1024, 22-22)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#port_range InstanceSecurityGroupRules#port_range}
  */
  readonly portRange?: string;
  /**
  * Protocol for this rule (TCP, UDP, ICMP or ANY)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#protocol InstanceSecurityGroupRules#protocol}
  */
  readonly protocol?: string;
}

export function instanceSecurityGroupRulesInboundRuleToTerraform(struct?: InstanceSecurityGroupRulesInboundRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    ip: cdktf.stringToTerraform(struct!.ip),
    ip_range: cdktf.stringToTerraform(struct!.ipRange),
    port: cdktf.numberToTerraform(struct!.port),
    port_range: cdktf.stringToTerraform(struct!.portRange),
    protocol: cdktf.stringToTerraform(struct!.protocol),
  }
}

export class InstanceSecurityGroupRulesInboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceSecurityGroupRulesInboundRule | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._ipRange !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipRange = this._ipRange;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._portRange !== undefined) {
      hasAnyValues = true;
      internalValueResult.portRange = this._portRange;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceSecurityGroupRulesInboundRule | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._ip = undefined;
      this._ipRange = undefined;
      this._port = undefined;
      this._portRange = undefined;
      this._protocol = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._ip = value.ip;
      this._ipRange = value.ipRange;
      this._port = value.port;
      this._portRange = value.portRange;
      this._protocol = value.protocol;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // ip - computed: false, optional: true, required: false
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

  // ip_range - computed: false, optional: true, required: false
  private _ipRange?: string; 
  public get ipRange() {
    return this.getStringAttribute('ip_range');
  }
  public set ipRange(value: string) {
    this._ipRange = value;
  }
  public resetIpRange() {
    this._ipRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipRangeInput() {
    return this._ipRange;
  }

  // port - computed: false, optional: true, required: false
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

  // port_range - computed: false, optional: true, required: false
  private _portRange?: string; 
  public get portRange() {
    return this.getStringAttribute('port_range');
  }
  public set portRange(value: string) {
    this._portRange = value;
  }
  public resetPortRange() {
    this._portRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portRangeInput() {
    return this._portRange;
  }

  // protocol - computed: false, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }
}

export class InstanceSecurityGroupRulesInboundRuleList extends cdktf.ComplexList {
  public internalValue? : InstanceSecurityGroupRulesInboundRule[] | cdktf.IResolvable

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
  public get(index: number): InstanceSecurityGroupRulesInboundRuleOutputReference {
    return new InstanceSecurityGroupRulesInboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface InstanceSecurityGroupRulesOutboundRule {
  /**
  * Action when rule match request (drop or accept)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#action InstanceSecurityGroupRules#action}
  */
  readonly action: string;
  /**
  * Ip address for this rule (e.g: 1.1.1.1). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#ip InstanceSecurityGroupRules#ip}
  */
  readonly ip?: string;
  /**
  * Ip range for this rule (e.g: 192.168.1.0/24). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#ip_range InstanceSecurityGroupRules#ip_range}
  */
  readonly ipRange?: string;
  /**
  * Network port for this rule
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#port InstanceSecurityGroupRules#port}
  */
  readonly port?: number;
  /**
  * Computed port range for this rule (e.g: 1-1024, 22-22)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#port_range InstanceSecurityGroupRules#port_range}
  */
  readonly portRange?: string;
  /**
  * Protocol for this rule (TCP, UDP, ICMP or ANY)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#protocol InstanceSecurityGroupRules#protocol}
  */
  readonly protocol?: string;
}

export function instanceSecurityGroupRulesOutboundRuleToTerraform(struct?: InstanceSecurityGroupRulesOutboundRule | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    action: cdktf.stringToTerraform(struct!.action),
    ip: cdktf.stringToTerraform(struct!.ip),
    ip_range: cdktf.stringToTerraform(struct!.ipRange),
    port: cdktf.numberToTerraform(struct!.port),
    port_range: cdktf.stringToTerraform(struct!.portRange),
    protocol: cdktf.stringToTerraform(struct!.protocol),
  }
}

export class InstanceSecurityGroupRulesOutboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceSecurityGroupRulesOutboundRule | cdktf.IResolvable | undefined {
    if (this.resolvableValue) {
      return this.resolvableValue;
    }
    let hasAnyValues = this.isEmptyObject;
    const internalValueResult: any = {};
    if (this._action !== undefined) {
      hasAnyValues = true;
      internalValueResult.action = this._action;
    }
    if (this._ip !== undefined) {
      hasAnyValues = true;
      internalValueResult.ip = this._ip;
    }
    if (this._ipRange !== undefined) {
      hasAnyValues = true;
      internalValueResult.ipRange = this._ipRange;
    }
    if (this._port !== undefined) {
      hasAnyValues = true;
      internalValueResult.port = this._port;
    }
    if (this._portRange !== undefined) {
      hasAnyValues = true;
      internalValueResult.portRange = this._portRange;
    }
    if (this._protocol !== undefined) {
      hasAnyValues = true;
      internalValueResult.protocol = this._protocol;
    }
    return hasAnyValues ? internalValueResult : undefined;
  }

  public set internalValue(value: InstanceSecurityGroupRulesOutboundRule | cdktf.IResolvable | undefined) {
    if (value === undefined) {
      this.isEmptyObject = false;
      this.resolvableValue = undefined;
      this._action = undefined;
      this._ip = undefined;
      this._ipRange = undefined;
      this._port = undefined;
      this._portRange = undefined;
      this._protocol = undefined;
    }
    else if (cdktf.Tokenization.isResolvable(value)) {
      this.isEmptyObject = false;
      this.resolvableValue = value;
    }
    else {
      this.isEmptyObject = Object.keys(value).length === 0;
      this.resolvableValue = undefined;
      this._action = value.action;
      this._ip = value.ip;
      this._ipRange = value.ipRange;
      this._port = value.port;
      this._portRange = value.portRange;
      this._protocol = value.protocol;
    }
  }

  // action - computed: false, optional: false, required: true
  private _action?: string; 
  public get action() {
    return this.getStringAttribute('action');
  }
  public set action(value: string) {
    this._action = value;
  }
  // Temporarily expose input value. Use with caution.
  public get actionInput() {
    return this._action;
  }

  // ip - computed: false, optional: true, required: false
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

  // ip_range - computed: false, optional: true, required: false
  private _ipRange?: string; 
  public get ipRange() {
    return this.getStringAttribute('ip_range');
  }
  public set ipRange(value: string) {
    this._ipRange = value;
  }
  public resetIpRange() {
    this._ipRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get ipRangeInput() {
    return this._ipRange;
  }

  // port - computed: false, optional: true, required: false
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

  // port_range - computed: false, optional: true, required: false
  private _portRange?: string; 
  public get portRange() {
    return this.getStringAttribute('port_range');
  }
  public set portRange(value: string) {
    this._portRange = value;
  }
  public resetPortRange() {
    this._portRange = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get portRangeInput() {
    return this._portRange;
  }

  // protocol - computed: false, optional: true, required: false
  private _protocol?: string; 
  public get protocol() {
    return this.getStringAttribute('protocol');
  }
  public set protocol(value: string) {
    this._protocol = value;
  }
  public resetProtocol() {
    this._protocol = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get protocolInput() {
    return this._protocol;
  }
}

export class InstanceSecurityGroupRulesOutboundRuleList extends cdktf.ComplexList {
  public internalValue? : InstanceSecurityGroupRulesOutboundRule[] | cdktf.IResolvable

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
  public get(index: number): InstanceSecurityGroupRulesOutboundRuleOutputReference {
    return new InstanceSecurityGroupRulesOutboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface InstanceSecurityGroupRulesTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules#default InstanceSecurityGroupRules#default}
  */
  readonly default?: string;
}

export function instanceSecurityGroupRulesTimeoutsToTerraform(struct?: InstanceSecurityGroupRulesTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}

export class InstanceSecurityGroupRulesTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): InstanceSecurityGroupRulesTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: InstanceSecurityGroupRulesTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules scaleway_instance_security_group_rules}
*/
export class InstanceSecurityGroupRules extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_security_group_rules";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.19.0/docs/resources/instance_security_group_rules scaleway_instance_security_group_rules} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options InstanceSecurityGroupRulesConfig
  */
  public constructor(scope: Construct, id: string, config: InstanceSecurityGroupRulesConfig) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_security_group_rules',
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
    this._securityGroupId = config.securityGroupId;
    this._inboundRule.internalValue = config.inboundRule;
    this._outboundRule.internalValue = config.outboundRule;
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

  // security_group_id - computed: false, optional: false, required: true
  private _securityGroupId?: string; 
  public get securityGroupId() {
    return this.getStringAttribute('security_group_id');
  }
  public set securityGroupId(value: string) {
    this._securityGroupId = value;
  }
  // Temporarily expose input value. Use with caution.
  public get securityGroupIdInput() {
    return this._securityGroupId;
  }

  // inbound_rule - computed: false, optional: true, required: false
  private _inboundRule = new InstanceSecurityGroupRulesInboundRuleList(this, "inbound_rule", false);
  public get inboundRule() {
    return this._inboundRule;
  }
  public putInboundRule(value: InstanceSecurityGroupRulesInboundRule[] | cdktf.IResolvable) {
    this._inboundRule.internalValue = value;
  }
  public resetInboundRule() {
    this._inboundRule.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inboundRuleInput() {
    return this._inboundRule.internalValue;
  }

  // outbound_rule - computed: false, optional: true, required: false
  private _outboundRule = new InstanceSecurityGroupRulesOutboundRuleList(this, "outbound_rule", false);
  public get outboundRule() {
    return this._outboundRule;
  }
  public putOutboundRule(value: InstanceSecurityGroupRulesOutboundRule[] | cdktf.IResolvable) {
    this._outboundRule.internalValue = value;
  }
  public resetOutboundRule() {
    this._outboundRule.internalValue = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outboundRuleInput() {
    return this._outboundRule.internalValue;
  }

  // timeouts - computed: false, optional: true, required: false
  private _timeouts = new InstanceSecurityGroupRulesTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: InstanceSecurityGroupRulesTimeouts) {
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
      security_group_id: cdktf.stringToTerraform(this._securityGroupId),
      inbound_rule: cdktf.listMapper(instanceSecurityGroupRulesInboundRuleToTerraform, true)(this._inboundRule.internalValue),
      outbound_rule: cdktf.listMapper(instanceSecurityGroupRulesOutboundRuleToTerraform, true)(this._outboundRule.internalValue),
      timeouts: instanceSecurityGroupRulesTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
