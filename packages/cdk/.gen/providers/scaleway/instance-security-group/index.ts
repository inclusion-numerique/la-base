// https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';

// Configuration

export interface InstanceSecurityGroupConfig extends cdktf.TerraformMetaArguments {
  /**
  * The description of the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#description InstanceSecurityGroup#description}
  */
  readonly description?: string;
  /**
  * Enable blocking of SMTP on IPv4 and IPv6
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#enable_default_security InstanceSecurityGroup#enable_default_security}
  */
  readonly enableDefaultSecurity?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#external_rules InstanceSecurityGroup#external_rules}
  */
  readonly externalRules?: boolean | cdktf.IResolvable;
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#id InstanceSecurityGroup#id}
  *
  * Please be aware that the id field is automatically added to all resources in Terraform providers using a Terraform provider SDK version below 2.
  * If you experience problems setting this value it might not be settable. Please take a look at the provider documentation to ensure it should be settable.
  */
  readonly id?: string;
  /**
  * Default inbound traffic policy for this security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#inbound_default_policy InstanceSecurityGroup#inbound_default_policy}
  */
  readonly inboundDefaultPolicy?: string;
  /**
  * The name of the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#name InstanceSecurityGroup#name}
  */
  readonly name?: string;
  /**
  * Default outbound traffic policy for this security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#outbound_default_policy InstanceSecurityGroup#outbound_default_policy}
  */
  readonly outboundDefaultPolicy?: string;
  /**
  * The project_id you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#project_id InstanceSecurityGroup#project_id}
  */
  readonly projectId?: string;
  /**
  * The stateful value of the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#stateful InstanceSecurityGroup#stateful}
  */
  readonly stateful?: boolean | cdktf.IResolvable;
  /**
  * The tags associated with the security group
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#tags InstanceSecurityGroup#tags}
  */
  readonly tags?: string[];
  /**
  * The zone you want to attach the resource to
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#zone InstanceSecurityGroup#zone}
  */
  readonly zone?: string;
  /**
  * inbound_rule block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#inbound_rule InstanceSecurityGroup#inbound_rule}
  */
  readonly inboundRule?: InstanceSecurityGroupInboundRule[] | cdktf.IResolvable;
  /**
  * outbound_rule block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#outbound_rule InstanceSecurityGroup#outbound_rule}
  */
  readonly outboundRule?: InstanceSecurityGroupOutboundRule[] | cdktf.IResolvable;
  /**
  * timeouts block
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#timeouts InstanceSecurityGroup#timeouts}
  */
  readonly timeouts?: InstanceSecurityGroupTimeouts;
}
export interface InstanceSecurityGroupInboundRule {
  /**
  * Action when rule match request (drop or accept)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#action InstanceSecurityGroup#action}
  */
  readonly action: string;
  /**
  * Ip address for this rule (e.g: 1.1.1.1). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#ip InstanceSecurityGroup#ip}
  */
  readonly ip?: string;
  /**
  * Ip range for this rule (e.g: 192.168.1.0/24). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#ip_range InstanceSecurityGroup#ip_range}
  */
  readonly ipRange?: string;
  /**
  * Network port for this rule
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#port InstanceSecurityGroup#port}
  */
  readonly port?: number;
  /**
  * Computed port range for this rule (e.g: 1-1024, 22-22)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#port_range InstanceSecurityGroup#port_range}
  */
  readonly portRange?: string;
  /**
  * Protocol for this rule (TCP, UDP, ICMP or ANY)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#protocol InstanceSecurityGroup#protocol}
  */
  readonly protocol?: string;
}

export function instanceSecurityGroupInboundRuleToTerraform(struct?: InstanceSecurityGroupInboundRule | cdktf.IResolvable): any {
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

export class InstanceSecurityGroupInboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceSecurityGroupInboundRule | cdktf.IResolvable | undefined {
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

  public set internalValue(value: InstanceSecurityGroupInboundRule | cdktf.IResolvable | undefined) {
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

export class InstanceSecurityGroupInboundRuleList extends cdktf.ComplexList {
  public internalValue? : InstanceSecurityGroupInboundRule[] | cdktf.IResolvable

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
  public get(index: number): InstanceSecurityGroupInboundRuleOutputReference {
    return new InstanceSecurityGroupInboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface InstanceSecurityGroupOutboundRule {
  /**
  * Action when rule match request (drop or accept)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#action InstanceSecurityGroup#action}
  */
  readonly action: string;
  /**
  * Ip address for this rule (e.g: 1.1.1.1). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#ip InstanceSecurityGroup#ip}
  */
  readonly ip?: string;
  /**
  * Ip range for this rule (e.g: 192.168.1.0/24). Only one of ip or ip_range should be provided
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#ip_range InstanceSecurityGroup#ip_range}
  */
  readonly ipRange?: string;
  /**
  * Network port for this rule
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#port InstanceSecurityGroup#port}
  */
  readonly port?: number;
  /**
  * Computed port range for this rule (e.g: 1-1024, 22-22)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#port_range InstanceSecurityGroup#port_range}
  */
  readonly portRange?: string;
  /**
  * Protocol for this rule (TCP, UDP, ICMP or ANY)
  * 
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#protocol InstanceSecurityGroup#protocol}
  */
  readonly protocol?: string;
}

export function instanceSecurityGroupOutboundRuleToTerraform(struct?: InstanceSecurityGroupOutboundRule | cdktf.IResolvable): any {
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

export class InstanceSecurityGroupOutboundRuleOutputReference extends cdktf.ComplexObject {
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

  public get internalValue(): InstanceSecurityGroupOutboundRule | cdktf.IResolvable | undefined {
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

  public set internalValue(value: InstanceSecurityGroupOutboundRule | cdktf.IResolvable | undefined) {
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

export class InstanceSecurityGroupOutboundRuleList extends cdktf.ComplexList {
  public internalValue? : InstanceSecurityGroupOutboundRule[] | cdktf.IResolvable

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
  public get(index: number): InstanceSecurityGroupOutboundRuleOutputReference {
    return new InstanceSecurityGroupOutboundRuleOutputReference(this.terraformResource, this.terraformAttribute, index, this.wrapsSet);
  }
}
export interface InstanceSecurityGroupTimeouts {
  /**
  * Docs at Terraform Registry: {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group#default InstanceSecurityGroup#default}
  */
  readonly default?: string;
}

export function instanceSecurityGroupTimeoutsToTerraform(struct?: InstanceSecurityGroupTimeouts | cdktf.IResolvable): any {
  if (!cdktf.canInspect(struct) || cdktf.Tokenization.isResolvable(struct)) { return struct; }
  if (cdktf.isComplexElement(struct)) {
    throw new Error("A complex element was used as configuration, this is not supported: https://cdk.tf/complex-object-as-configuration");
  }
  return {
    default: cdktf.stringToTerraform(struct!.default),
  }
}

export class InstanceSecurityGroupTimeoutsOutputReference extends cdktf.ComplexObject {
  private isEmptyObject = false;
  private resolvableValue?: cdktf.IResolvable;

  /**
  * @param terraformResource The parent resource
  * @param terraformAttribute The attribute on the parent resource this class is referencing
  */
  public constructor(terraformResource: cdktf.IInterpolatingParent, terraformAttribute: string) {
    super(terraformResource, terraformAttribute, false);
  }

  public get internalValue(): InstanceSecurityGroupTimeouts | cdktf.IResolvable | undefined {
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

  public set internalValue(value: InstanceSecurityGroupTimeouts | cdktf.IResolvable | undefined) {
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
* Represents a {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group scaleway_instance_security_group}
*/
export class InstanceSecurityGroup extends cdktf.TerraformResource {

  // =================
  // STATIC PROPERTIES
  // =================
  public static readonly tfResourceType = "scaleway_instance_security_group";

  // ===========
  // INITIALIZER
  // ===========

  /**
  * Create a new {@link https://registry.terraform.io/providers/scaleway/scaleway/2.21.0/docs/resources/instance_security_group scaleway_instance_security_group} Resource
  *
  * @param scope The scope in which to define this construct
  * @param id The scoped construct ID. Must be unique amongst siblings in the same scope
  * @param options InstanceSecurityGroupConfig = {}
  */
  public constructor(scope: Construct, id: string, config: InstanceSecurityGroupConfig = {}) {
    super(scope, id, {
      terraformResourceType: 'scaleway_instance_security_group',
      terraformGeneratorMetadata: {
        providerName: 'scaleway',
        providerVersion: '2.21.0',
        providerVersionConstraint: '>= 2.21.0'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle,
      provisioners: config.provisioners,
      connection: config.connection,
      forEach: config.forEach
    });
    this._description = config.description;
    this._enableDefaultSecurity = config.enableDefaultSecurity;
    this._externalRules = config.externalRules;
    this._id = config.id;
    this._inboundDefaultPolicy = config.inboundDefaultPolicy;
    this._name = config.name;
    this._outboundDefaultPolicy = config.outboundDefaultPolicy;
    this._projectId = config.projectId;
    this._stateful = config.stateful;
    this._tags = config.tags;
    this._zone = config.zone;
    this._inboundRule.internalValue = config.inboundRule;
    this._outboundRule.internalValue = config.outboundRule;
    this._timeouts.internalValue = config.timeouts;
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // description - computed: false, optional: true, required: false
  private _description?: string; 
  public get description() {
    return this.getStringAttribute('description');
  }
  public set description(value: string) {
    this._description = value;
  }
  public resetDescription() {
    this._description = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get descriptionInput() {
    return this._description;
  }

  // enable_default_security - computed: false, optional: true, required: false
  private _enableDefaultSecurity?: boolean | cdktf.IResolvable; 
  public get enableDefaultSecurity() {
    return this.getBooleanAttribute('enable_default_security');
  }
  public set enableDefaultSecurity(value: boolean | cdktf.IResolvable) {
    this._enableDefaultSecurity = value;
  }
  public resetEnableDefaultSecurity() {
    this._enableDefaultSecurity = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get enableDefaultSecurityInput() {
    return this._enableDefaultSecurity;
  }

  // external_rules - computed: false, optional: true, required: false
  private _externalRules?: boolean | cdktf.IResolvable; 
  public get externalRules() {
    return this.getBooleanAttribute('external_rules');
  }
  public set externalRules(value: boolean | cdktf.IResolvable) {
    this._externalRules = value;
  }
  public resetExternalRules() {
    this._externalRules = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get externalRulesInput() {
    return this._externalRules;
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

  // inbound_default_policy - computed: false, optional: true, required: false
  private _inboundDefaultPolicy?: string; 
  public get inboundDefaultPolicy() {
    return this.getStringAttribute('inbound_default_policy');
  }
  public set inboundDefaultPolicy(value: string) {
    this._inboundDefaultPolicy = value;
  }
  public resetInboundDefaultPolicy() {
    this._inboundDefaultPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get inboundDefaultPolicyInput() {
    return this._inboundDefaultPolicy;
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

  // outbound_default_policy - computed: false, optional: true, required: false
  private _outboundDefaultPolicy?: string; 
  public get outboundDefaultPolicy() {
    return this.getStringAttribute('outbound_default_policy');
  }
  public set outboundDefaultPolicy(value: string) {
    this._outboundDefaultPolicy = value;
  }
  public resetOutboundDefaultPolicy() {
    this._outboundDefaultPolicy = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get outboundDefaultPolicyInput() {
    return this._outboundDefaultPolicy;
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

  // stateful - computed: false, optional: true, required: false
  private _stateful?: boolean | cdktf.IResolvable; 
  public get stateful() {
    return this.getBooleanAttribute('stateful');
  }
  public set stateful(value: boolean | cdktf.IResolvable) {
    this._stateful = value;
  }
  public resetStateful() {
    this._stateful = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get statefulInput() {
    return this._stateful;
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

  // inbound_rule - computed: false, optional: true, required: false
  private _inboundRule = new InstanceSecurityGroupInboundRuleList(this, "inbound_rule", false);
  public get inboundRule() {
    return this._inboundRule;
  }
  public putInboundRule(value: InstanceSecurityGroupInboundRule[] | cdktf.IResolvable) {
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
  private _outboundRule = new InstanceSecurityGroupOutboundRuleList(this, "outbound_rule", false);
  public get outboundRule() {
    return this._outboundRule;
  }
  public putOutboundRule(value: InstanceSecurityGroupOutboundRule[] | cdktf.IResolvable) {
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
  private _timeouts = new InstanceSecurityGroupTimeoutsOutputReference(this, "timeouts");
  public get timeouts() {
    return this._timeouts;
  }
  public putTimeouts(value: InstanceSecurityGroupTimeouts) {
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
      description: cdktf.stringToTerraform(this._description),
      enable_default_security: cdktf.booleanToTerraform(this._enableDefaultSecurity),
      external_rules: cdktf.booleanToTerraform(this._externalRules),
      id: cdktf.stringToTerraform(this._id),
      inbound_default_policy: cdktf.stringToTerraform(this._inboundDefaultPolicy),
      name: cdktf.stringToTerraform(this._name),
      outbound_default_policy: cdktf.stringToTerraform(this._outboundDefaultPolicy),
      project_id: cdktf.stringToTerraform(this._projectId),
      stateful: cdktf.booleanToTerraform(this._stateful),
      tags: cdktf.listMapper(cdktf.stringToTerraform, false)(this._tags),
      zone: cdktf.stringToTerraform(this._zone),
      inbound_rule: cdktf.listMapper(instanceSecurityGroupInboundRuleToTerraform, true)(this._inboundRule.internalValue),
      outbound_rule: cdktf.listMapper(instanceSecurityGroupOutboundRuleToTerraform, true)(this._outboundRule.internalValue),
      timeouts: instanceSecurityGroupTimeoutsToTerraform(this._timeouts.internalValue),
    };
  }
}
